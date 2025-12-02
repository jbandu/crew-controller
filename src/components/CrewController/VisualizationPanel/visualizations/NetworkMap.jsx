import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { copaNetwork } from '../../../../data/copaData';
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

const NetworkMap = ({ highlightRoute, weatherOverlay = false }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [containerReady, setContainerReady] = useState(false);

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

  useEffect(() => {
    if (!mapLoaded || !map.current) return;

    // Add hub marker
    const hubEl = document.createElement('div');
    hubEl.className = 'hub-marker';
    hubEl.style.backgroundColor = '#3b82f6';
    hubEl.style.width = '24px';
    hubEl.style.height = '24px';
    hubEl.style.borderRadius = '50%';
    hubEl.style.border = '3px solid white';
    hubEl.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.8)';

    new mapboxgl.Marker(hubEl)
      .setLngLat(copaNetwork.hub.coords)
      .setPopup(
        new mapboxgl.Popup({ offset: 25 })
          .setHTML(`<strong>${copaNetwork.hub.name}</strong><br/>${copaNetwork.hub.city}`)
      )
      .addTo(map.current);

    // Add destination markers and routes
    copaNetwork.destinations.forEach((dest) => {
      // Add destination marker
      const destEl = document.createElement('div');
      destEl.className = 'dest-marker';
      destEl.style.backgroundColor = highlightRoute && highlightRoute.includes(dest.code) ? '#10b981' : '#6b7280';
      destEl.style.width = '12px';
      destEl.style.height = '12px';
      destEl.style.borderRadius = '50%';
      destEl.style.border = '2px solid white';
      destEl.style.boxShadow = '0 0 10px rgba(255, 255, 255, 0.5)';

      new mapboxgl.Marker(destEl)
        .setLngLat(dest.coords)
        .setPopup(
          new mapboxgl.Popup({ offset: 15 })
            .setHTML(`<strong>${dest.city}</strong><br/>${dest.code}`)
        )
        .addTo(map.current);

      // Add route line
      const routeId = `route-${dest.code}`;

      if (map.current.getSource(routeId)) {
        map.current.removeLayer(routeId);
        map.current.removeSource(routeId);
      }

      map.current.addSource(routeId, {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: [copaNetwork.hub.coords, dest.coords]
          }
        }
      });

      map.current.addLayer({
        id: routeId,
        type: 'line',
        source: routeId,
        paint: {
          'line-color': highlightRoute && highlightRoute.includes(dest.code) ? '#10b981' : '#3b82f6',
          'line-width': highlightRoute && highlightRoute.includes(dest.code) ? 3 : 1.5,
          'line-opacity': 0.6
        }
      });
    });

    // Add weather overlay if enabled
    if (weatherOverlay) {
      if (!map.current.getSource('weather-overlay')) {
        map.current.addSource('weather-overlay', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: [
              {
                type: 'Feature',
                geometry: {
                  type: 'Point',
                  coordinates: copaNetwork.hub.coords
                },
                properties: {
                  title: 'Thunderstorm Warning',
                  description: '14:00-18:00'
                }
              }
            ]
          }
        });

        map.current.addLayer({
          id: 'weather-warning',
          type: 'circle',
          source: 'weather-overlay',
          paint: {
            'circle-radius': 60,
            'circle-color': '#ef4444',
            'circle-opacity': 0.3,
            'circle-blur': 0.8
          }
        });
      }
    }
  }, [mapLoaded, highlightRoute, weatherOverlay]);

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
        {weatherOverlay && (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-red-500 opacity-50"></div>
            <span className="text-sm text-text-secondary">Weather Alert</span>
          </div>
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
            <span className="text-text-muted text-sm">Active Routes:</span>
            <span className="text-white font-semibold">{copaNetwork.destinations.length}</span>
          </div>
          <div className="flex justify-between gap-8">
            <span className="text-text-muted text-sm">Hub Status:</span>
            <Badge variant={weatherOverlay ? 'warning' : 'success'} size="sm">
              {weatherOverlay ? 'Weather Watch' : 'Operational'}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetworkMap;
