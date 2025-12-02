import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { copaNetwork as fallbackCopaNetwork } from '../../../../data/copaData';
import { fetchCopaNetwork } from '../../../../services/airportService';
import Badge from '../../shared/Badge';

// Mapbox access token from environment variable
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

// Critical Mapbox CSS - injected to ensure map displays correctly in production
// This is needed because the mapbox-gl.css import may not load properly in some build configurations
const mapboxCriticalCSS = `
  .mapboxgl-map {
    position: absolute !important;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100% !important;
    height: 100% !important;
  }
  .mapboxgl-canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100% !important;
    height: 100% !important;
  }
  .mapboxgl-canvas-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

const NetworkMap = ({ highlightRoute, weatherOverlay = false, onAction }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [containerReady, setContainerReady] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [markersReady, setMarkersReady] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [copaNetwork, setCopaNetwork] = useState(fallbackCopaNetwork); // Start with fallback data
  const [isLoadingNetwork, setIsLoadingNetwork] = useState(true);
  const [weatherLayer, setWeatherLayer] = useState(null); // null, 'clouds', 'precipitation', 'temp', 'wind'
  const allMarkersRef = useRef(new Map()); // Cache all markers by code
  const hubMarkerRef = useRef(null);
  const loadingTimerRef = useRef(null);
  const routesInitializedRef = useRef(false);

  // Inject critical CSS on mount
  useEffect(() => {
    const styleId = 'mapbox-critical-css';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = mapboxCriticalCSS;
      document.head.appendChild(style);
    }
  }, []);

  // Fetch Copa network data from database
  useEffect(() => {
    const loadNetworkData = async () => {
      try {
        setIsLoadingNetwork(true);
        const networkData = await fetchCopaNetwork();
        setCopaNetwork(networkData);
        console.log(`✅ Loaded ${networkData.destinations.length} airports from database`);
      } catch (error) {
        console.warn('⚠️ Failed to load from database, using fallback data:', error.message);
        // Fallback data is already set as initial state
      } finally {
        setIsLoadingNetwork(false);
      }
    };

    loadNetworkData();
  }, []);

  // Use ResizeObserver to detect when container has dimensions
  useEffect(() => {
    if (!mapContainer.current) return;

    const checkDimensions = () => {
      const rect = mapContainer.current?.getBoundingClientRect();
      if (rect && rect.width > 0 && rect.height > 0) {
        setContainerReady(true);
        return true;
      }
      return false;
    };

    // Check immediately
    if (checkDimensions()) return;

    // Use ResizeObserver to watch for dimension changes
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.width > 0 && entry.contentRect.height > 0) {
          setContainerReady(true);
          observer.disconnect();
        }
      }
    });

    observer.observe(mapContainer.current);

    // Also set up a fallback timeout check
    const timeoutId = setTimeout(() => {
      if (!containerReady) {
        checkDimensions();
      }
    }, 500);

    return () => {
      observer.disconnect();
      clearTimeout(timeoutId);
    };
  }, [containerReady]);

  // Initialize map when container is ready
  useEffect(() => {
    if (!containerReady) return;
    if (map.current) return;
    if (!mapContainer.current) return;

    const rect = mapContainer.current.getBoundingClientRect();

    // Check if WebGL is supported
    if (!mapboxgl.supported()) {
      setError('WebGL is not supported in your browser. Please enable hardware acceleration or use a modern browser.');
      return;
    }

    // Check if Mapbox token is available
    if (!mapboxgl.accessToken) {
      setError('Mapbox access token is not configured. Please check your environment variables.');
      return;
    }

    // Check if container has dimensions
    if (rect.width === 0 || rect.height === 0) {
      setError('Map container has no dimensions. Please refresh the page.');
      return;
    }

    try {
      // Initialize map
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/dark-v11',
        center: [-79.3835, 9.0714], // PTY hub
        zoom: 3.5,
        projection: 'globe'
      });
    } catch (err) {
      console.error('Failed to initialize Mapbox GL:', err);
      setError('Failed to initialize the map. Please try refreshing the page.');
      return;
    }

    map.current.on('error', (e) => {
      console.error('Mapbox error:', e);
    });

    map.current.on('style.load', () => {
      // Add fog and atmosphere
      map.current.setFog({
        color: 'rgb(10, 15, 26)',
        'high-color': 'rgb(31, 41, 55)',
        'horizon-blend': 0.02,
        'space-color': 'rgb(6, 10, 18)',
        'star-intensity': 0.6
      });

      setMapLoaded(true);
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [containerReady]);

  // Filter destinations based on region and search
  const filteredDestinations = copaNetwork.destinations.filter(dest => {
    const matchesRegion = selectedRegion === 'all' || dest.region === selectedRegion;
    const matchesSearch = searchTerm === '' ||
      dest.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dest.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dest.country.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesRegion && matchesSearch;
  });

  // Get unique regions
  const regions = ['all', ...new Set(copaNetwork.destinations.map(d => d.region))];

  // Generate mock flight data for a destination
  const generateFlightData = (dest) => {
    const flights = [
      { flight: `CM${Math.floor(Math.random() * 900) + 100}`, departure: '08:30', arrival: '11:45', crew: 'A-12', status: 'On Time' },
      { flight: `CM${Math.floor(Math.random() * 900) + 100}`, departure: '14:20', arrival: '17:35', crew: 'B-08', status: 'On Time' },
      { flight: `CM${Math.floor(Math.random() * 900) + 100}`, departure: '19:15', arrival: '22:30', crew: 'C-05', status: 'Delayed 15min' }
    ];

    return {
      destination: dest,
      dailyFlights: flights.length,
      weeklyFlights: flights.length * 7,
      flights: flights,
      crewAssigned: flights.length * 4,
      nextDeparture: flights[0].departure
    };
  };

  // Handle airport click
  const handleAirportClick = (dest) => {
    setSelectedDestination(dest);

    // 1. Zoom to destination with smooth animation
    map.current?.flyTo({
      center: dest.coords,
      zoom: 6,
      duration: 2000,
      essential: true
    });

    // 2. Trigger AI response
    onAction?.('airportSelected', {
      code: dest.code,
      city: dest.city,
      country: dest.country,
      message: `Tell me about operations to ${dest.city} (${dest.code})`
    });
  };

  // Initialize ALL markers and routes once on map load (cached permanently)
  useEffect(() => {
    if (!mapLoaded || !map.current || routesInitializedRef.current) return;

    setMarkersReady(false);

    // Add hub marker (only once, cached permanently)
    if (!hubMarkerRef.current) {
      const hubEl = document.createElement('div');
      hubEl.className = 'hub-marker';
      hubEl.style.backgroundColor = '#3b82f6';
      hubEl.style.width = '24px';
      hubEl.style.height = '24px';
      hubEl.style.borderRadius = '50%';
      hubEl.style.border = '3px solid white';
      hubEl.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.8)';

      hubMarkerRef.current = new mapboxgl.Marker(hubEl)
        .setLngLat(copaNetwork.hub.coords)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 })
            .setHTML(`<strong>${copaNetwork.hub.name}</strong><br/>${copaNetwork.hub.city}`)
        )
        .addTo(map.current);
    }

    // Create ALL routes once as a single GeoJSON (cached in Mapbox)
    const allRouteFeatures = copaNetwork.destinations.map((dest) => ({
      type: 'Feature',
      properties: {
        code: dest.code,
        region: dest.region,
        highlighted: false
      },
      geometry: {
        type: 'LineString',
        coordinates: [copaNetwork.hub.coords, dest.coords]
      }
    }));

    map.current.addSource('all-routes', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: allRouteFeatures
      }
    });

    map.current.addLayer({
      id: 'all-routes',
      type: 'line',
      source: 'all-routes',
      paint: {
        'line-color': [
          'case',
          ['get', 'highlighted'],
          '#10b981',
          '#3b82f6'
        ],
        'line-width': [
          'case',
          ['get', 'highlighted'],
          3,
          1.5
        ],
        'line-opacity': 0.6
      }
    });

    // Create ALL destination markers once (cached in memory, but DON'T add to map yet)
    copaNetwork.destinations.forEach((dest) => {
      const destEl = document.createElement('div');
      destEl.className = 'dest-marker';
      destEl.style.backgroundColor = '#6b7280';
      destEl.style.width = '12px';
      destEl.style.height = '12px';
      destEl.style.borderRadius = '50%';
      destEl.style.border = '2px solid white';
      destEl.style.boxShadow = '0 0 10px rgba(255, 255, 255, 0.5)';
      destEl.style.cursor = 'pointer';
      destEl.style.transition = 'all 0.2s ease';

      // Add hover effect
      destEl.addEventListener('mouseenter', () => {
        destEl.style.transform = 'scale(1.5)';
        destEl.style.boxShadow = '0 0 15px rgba(59, 130, 246, 0.8)';
      });
      destEl.addEventListener('mouseleave', () => {
        if (selectedDestination?.code !== dest.code) {
          destEl.style.transform = 'scale(1)';
          destEl.style.boxShadow = '0 0 10px rgba(255, 255, 255, 0.5)';
        }
      });

      // Add click handler
      destEl.addEventListener('click', (e) => {
        e.stopPropagation();
        handleAirportClick(dest);
      });

      const marker = new mapboxgl.Marker(destEl)
        .setLngLat(dest.coords)
        .setPopup(
          new mapboxgl.Popup({ offset: 15 })
            .setHTML(`<strong>${dest.city}</strong><br/>${dest.code} - ${dest.country}`)
        );
        // DON'T call .addTo() here - let the filter effect handle visibility

      // Cache marker with destination data
      allMarkersRef.current.set(dest.code, { marker, dest, element: destEl });
    });

    routesInitializedRef.current = true;
    setMarkersReady(true);

  }, [mapLoaded]);

  // Update marker visibility and routes based on filters (instant, no recreation!)
  useEffect(() => {
    if (!mapLoaded || !map.current || !routesInitializedRef.current) return;

    const filteredCodes = new Set(filteredDestinations.map(d => d.code));

    // Show/hide markers based on filter (instant!)
    allMarkersRef.current.forEach(({ marker, dest, element }, code) => {
      const isVisible = filteredCodes.has(code);

      if (isVisible) {
        marker.addTo(map.current);
        // Update highlight color if needed
        const isHighlighted = highlightRoute && highlightRoute.includes(code);
        const isSelected = selectedDestination?.code === code;

        if (isSelected) {
          element.style.backgroundColor = '#3b82f6';
          element.style.transform = 'scale(1.5)';
          element.style.boxShadow = '0 0 20px rgba(59, 130, 246, 1)';
        } else if (isHighlighted) {
          element.style.backgroundColor = '#10b981';
        } else {
          element.style.backgroundColor = '#6b7280';
          element.style.transform = 'scale(1)';
          element.style.boxShadow = '0 0 10px rgba(255, 255, 255, 0.5)';
        }
      } else {
        marker.remove();
      }
    });

    // Update routes layer with filter (uses Mapbox's built-in filtering - super fast!)
    if (map.current.getSource('all-routes')) {
      // Create filter expression
      const codeFilter = ['in', ['get', 'code'], ['literal', Array.from(filteredCodes)]];
      map.current.setFilter('all-routes', codeFilter);

      // Update route highlighting based on selected destination
      if (selectedDestination) {
        const routeData = map.current.getSource('all-routes')._data;
        routeData.features.forEach(feature => {
          feature.properties.highlighted = feature.properties.code === selectedDestination.code;
        });
        map.current.getSource('all-routes').setData(routeData);
      }
    }

  }, [mapLoaded, highlightRoute, weatherOverlay, selectedRegion, searchTerm, filteredDestinations, selectedDestination]);

  // Manage weather tile layers based on weatherLayer state
  useEffect(() => {
    if (!mapLoaded || !map.current) return;

    const OPENWEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

    // Remove existing weather layer if it exists
    if (map.current.getLayer('weather-layer')) {
      map.current.removeLayer('weather-layer');
    }
    if (map.current.getSource('weather-tiles')) {
      map.current.removeSource('weather-tiles');
    }

    // Add new weather layer if one is selected
    if (weatherLayer && OPENWEATHER_API_KEY) {
      const layerUrls = {
        clouds: `https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${OPENWEATHER_API_KEY}`,
        precipitation: `https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${OPENWEATHER_API_KEY}`,
        temp: `https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${OPENWEATHER_API_KEY}`,
        wind: `https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=${OPENWEATHER_API_KEY}`
      };

      map.current.addSource('weather-tiles', {
        type: 'raster',
        tiles: [layerUrls[weatherLayer]],
        tileSize: 256
      });

      map.current.addLayer({
        id: 'weather-layer',
        type: 'raster',
        source: 'weather-tiles',
        paint: {
          'raster-opacity': 0.6
        }
      });
    }
  }, [mapLoaded, weatherLayer]);

  // Show error message if map failed to initialize
  if (error) {
    return (
      <div className="relative w-full h-full flex items-center justify-center bg-bg-primary">
        <div className="max-w-md p-6 bg-bg-card border border-red-500/30 rounded-lg">
          <div className="flex items-start gap-3">
            <div className="text-red-500 text-2xl">⚠️</div>
            <div>
              <h3 className="text-white font-semibold mb-2">Map Unavailable</h3>
              <p className="text-text-secondary text-sm mb-4">{error}</p>
              <div className="text-text-muted text-xs">
                <p className="mb-2">Possible solutions:</p>
                <ul className="list-disc ml-4 space-y-1">
                  <li>Enable hardware acceleration in your browser settings</li>
                  <li>Update your graphics drivers</li>
                  <li>Try using a different browser (Chrome, Firefox, Edge)</li>
                  <li>Check if WebGL is enabled at: <a href="https://get.webgl.org/" target="_blank" rel="noopener noreferrer" className="text-accent-blue hover:underline">get.webgl.org</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="absolute inset-0" />

      {/* Loading Indicator - only on first load */}
      {!markersReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-bg-primary/30 backdrop-blur-sm pointer-events-none">
          <div className="bg-bg-card border border-white/10 rounded-lg p-4 flex items-center gap-3">
            <div className="w-5 h-5 border-2 border-accent-blue border-t-transparent rounded-full animate-spin"></div>
            <span className="text-white text-sm">Initializing network map...</span>
          </div>
        </div>
      )}

      {/* Weather Controls */}
      <div className="absolute top-6 right-6 bg-bg-card border border-white/10 rounded-lg p-4 space-y-3 min-w-[280px]">
        <h3 className="text-white font-semibold mb-2">Weather Overlay</h3>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setWeatherLayer(null)}
            className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
              weatherLayer === null
                ? 'bg-accent-blue text-white'
                : 'bg-bg-primary text-text-secondary hover:bg-bg-primary/80'
            }`}
          >
            Off
          </button>
          <button
            onClick={() => setWeatherLayer('clouds')}
            className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
              weatherLayer === 'clouds'
                ? 'bg-accent-blue text-white'
                : 'bg-bg-primary text-text-secondary hover:bg-bg-primary/80'
            }`}
          >
            ☁️ Clouds
          </button>
          <button
            onClick={() => setWeatherLayer('precipitation')}
            className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
              weatherLayer === 'precipitation'
                ? 'bg-accent-blue text-white'
                : 'bg-bg-primary text-text-secondary hover:bg-bg-primary/80'
            }`}
          >
            🌧️ Precipitation
          </button>
          <button
            onClick={() => setWeatherLayer('temp')}
            className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
              weatherLayer === 'temp'
                ? 'bg-accent-blue text-white'
                : 'bg-bg-primary text-text-secondary hover:bg-bg-primary/80'
            }`}
          >
            🌡️ Temperature
          </button>
          <button
            onClick={() => setWeatherLayer('wind')}
            className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
              weatherLayer === 'wind'
                ? 'bg-accent-blue text-white'
                : 'bg-bg-primary text-text-secondary hover:bg-bg-primary/80'
            }`}
          >
            💨 Wind
          </button>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="absolute top-[180px] right-6 bg-bg-card border border-white/10 rounded-lg p-4 space-y-3 min-w-[280px]">
        <h3 className="text-white font-semibold mb-2">Filter Routes</h3>

        {/* Search Box */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search city, code, or country..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 bg-bg-primary border border-white/10 rounded text-white text-sm placeholder-text-muted focus:outline-none focus:border-accent-blue"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-text-muted hover:text-white"
            >
              ✕
            </button>
          )}
        </div>

        {/* Region Filter */}
        <div>
          <label className="text-text-muted text-xs mb-2 block">Region</label>
          <div className="flex flex-wrap gap-2">
            {regions.map(region => (
              <button
                key={region}
                onClick={() => setSelectedRegion(region)}
                className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                  selectedRegion === region
                    ? 'bg-accent-blue text-white'
                    : 'bg-bg-primary text-text-secondary hover:bg-bg-primary/80'
                }`}
              >
                {region === 'all' ? 'All' : region}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="pt-2 border-t border-white/10">
          <span className="text-text-muted text-xs">
            Showing <span className="text-white font-semibold">{filteredDestinations.length}</span> of{' '}
            <span className="text-white font-semibold">{copaNetwork.destinations.length}</span> destinations
          </span>
        </div>
      </div>

      {/* Map Legend */}
      <div className="absolute bottom-6 left-6 bg-bg-card border border-white/10 rounded-lg p-4 space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-accent-blue border-2 border-white"></div>
          <span className="text-sm text-text-secondary">PTY Hub</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gray-500 border-2 border-white"></div>
          <span className="text-sm text-text-secondary">Destinations</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-0.5 bg-accent-blue"></div>
          <span className="text-sm text-text-secondary">Active Routes</span>
        </div>
        {weatherLayer && (
          <>
            <div className="pt-2 border-t border-white/10 mt-2"></div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-text-secondary font-semibold">
                Weather: {weatherLayer === 'clouds' && '☁️ Clouds'}
                {weatherLayer === 'precipitation' && '🌧️ Precipitation'}
                {weatherLayer === 'temp' && '🌡️ Temperature'}
                {weatherLayer === 'wind' && '💨 Wind Speed'}
              </span>
            </div>
            {weatherLayer === 'temp' && (
              <div className="text-xs text-text-muted">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-2" style={{ background: 'linear-gradient(to right, #0000ff, #00ff00, #ffff00, #ff0000)' }}></div>
                  <span>Cold → Hot</span>
                </div>
              </div>
            )}
            {weatherLayer === 'precipitation' && (
              <div className="text-xs text-text-muted">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-2" style={{ background: 'linear-gradient(to right, #00ff00, #ffff00, #ff0000)' }}></div>
                  <span>Light → Heavy</span>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Network Stats */}
      <div className="absolute top-6 left-6 bg-bg-card border border-white/10 rounded-lg p-4">
        <h3 className="text-white font-semibold mb-3">Network Status</h3>
        <div className="space-y-2">
          <div className="flex justify-between gap-8">
            <span className="text-text-muted text-sm">Destinations:</span>
            <span className="text-white font-semibold">{copaNetwork.destinations.length}</span>
          </div>
          <div className="flex justify-between gap-8">
            <span className="text-text-muted text-sm">Visible Routes:</span>
            <span className="text-white font-semibold">{filteredDestinations.length}</span>
          </div>
          <div className="flex justify-between gap-8">
            <span className="text-text-muted text-sm">Hub Status:</span>
            <Badge variant={weatherOverlay ? 'warning' : 'success'} size="sm">
              {weatherOverlay ? 'Weather Watch' : 'Operational'}
            </Badge>
          </div>
        </div>
      </div>

      {/* Flight Details Panel */}
      {selectedDestination && (() => {
        const flightData = generateFlightData(selectedDestination);
        return (
          <div className="absolute bottom-6 right-6 bg-bg-card border border-white/10 rounded-lg p-4 w-96 max-h-[60vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-white font-semibold text-lg">{selectedDestination.city}</h3>
                <p className="text-text-muted text-sm">{selectedDestination.code} · {selectedDestination.country}</p>
              </div>
              <button
                onClick={() => setSelectedDestination(null)}
                className="text-text-muted hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-bg-primary rounded p-3">
                <p className="text-text-muted text-xs mb-1">Daily Flights</p>
                <p className="text-white text-xl font-semibold">{flightData.dailyFlights}</p>
              </div>
              <div className="bg-bg-primary rounded p-3">
                <p className="text-text-muted text-xs mb-1">Crew Assigned</p>
                <p className="text-white text-xl font-semibold">{flightData.crewAssigned}</p>
              </div>
              <div className="bg-bg-primary rounded p-3">
                <p className="text-text-muted text-xs mb-1">Weekly Flights</p>
                <p className="text-white text-xl font-semibold">{flightData.weeklyFlights}</p>
              </div>
              <div className="bg-bg-primary rounded p-3">
                <p className="text-text-muted text-xs mb-1">Next Departure</p>
                <p className="text-white text-xl font-semibold">{flightData.nextDeparture}</p>
              </div>
            </div>

            {/* Flight Schedule */}
            <div>
              <h4 className="text-white font-semibold mb-3 text-sm">Today's Schedule</h4>
              <div className="space-y-2">
                {flightData.flights.map((flight, idx) => (
                  <div key={idx} className="bg-bg-primary rounded p-3 border border-white/5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-accent-blue font-semibold">{flight.flight}</span>
                      <Badge
                        variant={flight.status === 'On Time' ? 'success' : 'warning'}
                        size="sm"
                      >
                        {flight.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div>
                        <p className="text-text-muted">Departure</p>
                        <p className="text-white font-medium">{flight.departure}</p>
                      </div>
                      <div>
                        <p className="text-text-muted">Arrival</p>
                        <p className="text-white font-medium">{flight.arrival}</p>
                      </div>
                      <div>
                        <p className="text-text-muted">Crew</p>
                        <p className="text-white font-medium">{flight.crew}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="mt-4 pt-4 border-t border-white/10">
              <button
                onClick={() => {
                  map.current?.flyTo({
                    center: copaNetwork.hub.coords,
                    zoom: 3.5,
                    duration: 2000
                  });
                  setSelectedDestination(null);
                }}
                className="w-full px-4 py-2 bg-accent-blue hover:bg-accent-blue/80 text-white rounded text-sm font-medium transition-colors"
              >
                Back to Network View
              </button>
            </div>
          </div>
        );
      })()}
    </div>
  );
};

export default NetworkMap;
