import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { copaNetwork } from '../../../../data/copaData';
import Badge from '../../shared/Badge';

// Mapbox access token from environment variable
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

// Debug logging
console.log('[NetworkMap] Module loaded, token exists:', !!mapboxgl.accessToken);

const NetworkMap = ({ highlightRoute, weatherOverlay = false }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [debugInfo, setDebugInfo] = useState({});
  const [containerReady, setContainerReady] = useState(false);
  const initAttempts = useRef(0);

  // Use ResizeObserver to detect when container has dimensions
  useEffect(() => {
    if (!mapContainer.current) return;

    const checkDimensions = () => {
      const rect = mapContainer.current?.getBoundingClientRect();
      if (rect && rect.width > 0 && rect.height > 0) {
        console.log('[NetworkMap] Container ready with dimensions:', rect.width, 'x', rect.height);
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
          console.log('[NetworkMap] ResizeObserver detected dimensions:', entry.contentRect.width, 'x', entry.contentRect.height);
          setContainerReady(true);
          observer.disconnect();
        }
      }
    });

    observer.observe(mapContainer.current);

    // Also set up a fallback timeout check
    const timeoutId = setTimeout(() => {
      if (!containerReady) {
        console.log('[NetworkMap] Timeout check for dimensions');
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
    console.log('[NetworkMap] Init useEffect - containerReady:', containerReady, 'map exists:', !!map.current);

    if (!containerReady) return;
    if (map.current) {
      console.log('[NetworkMap] Map already initialized, skipping');
      return;
    }
    if (!mapContainer.current) {
      console.log('[NetworkMap] No container ref, skipping');
      return;
    }

    initAttempts.current += 1;
    console.log('[NetworkMap] Initialization attempt #', initAttempts.current);

    // Get container dimensions for debugging
    const rect = mapContainer.current.getBoundingClientRect();
    const containerDebug = {
      width: Math.round(rect.width),
      height: Math.round(rect.height),
      top: Math.round(rect.top),
      left: Math.round(rect.left),
      tokenExists: !!mapboxgl.accessToken,
      tokenLength: mapboxgl.accessToken ? mapboxgl.accessToken.length : 0,
      webglSupported: mapboxgl.supported(),
      attempt: initAttempts.current
    };
    console.log('[NetworkMap] Container dimensions:', containerDebug);
    setDebugInfo(containerDebug);

    // Check if WebGL is supported
    if (!mapboxgl.supported()) {
      const errMsg = 'WebGL is not supported in your browser. Please enable hardware acceleration or use a modern browser.';
      console.error('[NetworkMap]', errMsg);
      setError(errMsg);
      return;
    }

    // Check if Mapbox token is available
    if (!mapboxgl.accessToken) {
      const errMsg = 'Mapbox access token is not configured. Please check your environment variables.';
      console.error('[NetworkMap]', errMsg);
      setError(errMsg);
      return;
    }

    // Check if container has dimensions
    if (rect.width === 0 || rect.height === 0) {
      const errMsg = `Map container has no dimensions (${rect.width}x${rect.height}). CSS height chain may be broken.`;
      console.error('[NetworkMap]', errMsg);
      setError(errMsg);
      return;
    }

    try {
      console.log('[NetworkMap] Initializing Mapbox GL map...');
      // Initialize map
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/dark-v11',
        center: [-79.3835, 9.0714], // PTY hub
        zoom: 3.5,
        projection: 'globe'
      });
      console.log('[NetworkMap] Map object created successfully');
    } catch (err) {
      console.error('[NetworkMap] Failed to initialize Mapbox GL:', err);
      setError(`Failed to initialize the map: ${err.message}`);
      return;
    }

    map.current.on('error', (e) => {
      console.error('[NetworkMap] Map error event:', e);
    });

    map.current.on('style.load', () => {
      console.log('[NetworkMap] Style loaded successfully');
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

    map.current.on('load', () => {
      console.log('[NetworkMap] Map fully loaded');
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    return () => {
      console.log('[NetworkMap] Cleanup - removing map');
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
              {/* Debug info panel */}
              <div className="bg-bg-elevated rounded p-3 mb-4 text-xs font-mono">
                <div className="text-text-muted mb-1">Debug Info:</div>
                <div className="text-text-secondary">
                  Container: {debugInfo.width}x{debugInfo.height}<br />
                  Token: {debugInfo.tokenExists ? `Yes (${debugInfo.tokenLength} chars)` : 'No'}<br />
                  WebGL: {debugInfo.webglSupported ? 'Supported' : 'Not Supported'}
                </div>
              </div>
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

      {/* DEBUG PANEL - Remove after fixing */}
      <div className="absolute top-6 right-6 bg-yellow-900/90 border border-yellow-500 rounded-lg p-3 text-xs font-mono z-50 max-w-xs">
        <div className="text-yellow-300 font-bold mb-2">DEBUG INFO</div>
        <div className="text-yellow-100 space-y-1">
          <div>Container: {debugInfo.width || '?'}x{debugInfo.height || '?'}</div>
          <div>Token: {debugInfo.tokenExists ? `Yes (${debugInfo.tokenLength} chars)` : 'NO TOKEN!'}</div>
          <div>WebGL: {debugInfo.webglSupported === undefined ? '?' : debugInfo.webglSupported ? 'Yes' : 'No'}</div>
          <div>Container Ready: {containerReady ? 'Yes' : 'No'}</div>
          <div>Map Loaded: {mapLoaded ? 'Yes' : 'No'}</div>
          <div>Init Attempts: {initAttempts.current}</div>
          {error && <div className="text-red-400">Error: {error}</div>}
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
