import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { copaNetwork } from '../../../../data/copaData';
import Badge from '../../shared/Badge';

// Mapbox access token
mapboxgl.accessToken = 'pk.eyJ1IjoiamJhbmR1IiwiYSI6ImNtYWJzdzkxbzJmYXUybXE5cjI0NGRqMWgifQ.TQgz7S7aiqjG_-4-MEuzeQ';

const NetworkMap = ({ highlightRoute, weatherOverlay = false }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (map.current) return; // Initialize map only once

    // Initialize map
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [-79.3835, 9.0714], // PTY hub
      zoom: 3.5,
      projection: 'globe'
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
      }
    };
  }, []);

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
