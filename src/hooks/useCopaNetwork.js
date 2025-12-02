import { useState, useEffect } from 'react';

// API base URL - defaults to localhost for development
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

/**
 * Custom hook for accessing Copa Airlines network data from PostgreSQL database via API
 *
 * @returns {Object} Network data and loading state
 * @property {Array} airports - All Copa Airlines destinations
 * @property {Array} routes - All routes from PTY hub
 * @property {Object} stats - Network statistics (destinations, countries, etc.)
 * @property {Array} upcomingDestinations - New routes coming soon
 * @property {boolean} loading - Loading state
 * @property {string|null} error - Error message if any
 */
export const useCopaNetwork = () => {
  const [airports, setAirports] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [stats, setStats] = useState({
    active_destinations: 0,
    upcoming_destinations: 0,
    countries_served: 0,
    active_routes: 0,
    regions_count: 0
  });
  const [upcomingDestinations, setUpcomingDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNetworkData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch all network data in parallel from API
        const [airportsRes, routesRes, statsRes, upcomingRes] = await Promise.all([
          fetch(`${API_BASE_URL}/airports`),
          fetch(`${API_BASE_URL}/routes`),
          fetch(`${API_BASE_URL}/stats`),
          fetch(`${API_BASE_URL}/destinations/upcoming`)
        ]);

        // Check for errors
        if (!airportsRes.ok || !routesRes.ok || !statsRes.ok || !upcomingRes.ok) {
          throw new Error('Failed to fetch network data from API');
        }

        const [airportsData, routesData, statsData, upcomingData] = await Promise.all([
          airportsRes.json(),
          routesRes.json(),
          statsRes.json(),
          upcomingRes.json()
        ]);

        setAirports(airportsData);
        setRoutes(routesData);
        setStats(statsData);
        setUpcomingDestinations(upcomingData);
      } catch (err) {
        console.error('Error fetching Copa network data:', err);
        setError(err.message || 'Failed to load network data');
      } finally {
        setLoading(false);
      }
    };

    fetchNetworkData();
  }, []); // Empty dependency array - fetch once on mount

  return {
    airports,
    routes,
    stats,
    upcomingDestinations,
    loading,
    error
  };
};

/**
 * Custom hook for accessing airports by region
 *
 * @param {string} regionName - Region name (North America, Central America, South America, Caribbean)
 * @returns {Object} Regional airports data and loading state
 */
export const useRegionalAirports = (regionName) => {
  const [airports, setAirports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!regionName) {
      setLoading(false);
      return;
    }

    const fetchRegionalAirports = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`${API_BASE_URL}/regions/${encodeURIComponent(regionName)}/airports`);

        if (!response.ok) {
          throw new Error('Failed to fetch regional airports');
        }

        const data = await response.json();
        setAirports(data);
      } catch (err) {
        console.error(`Error fetching airports for ${regionName}:`, err);
        setError(err.message || 'Failed to load regional airports');
      } finally {
        setLoading(false);
      }
    };

    fetchRegionalAirports();
  }, [regionName]);

  return { airports, loading, error };
};

/**
 * Get the PTY hub from airports list
 *
 * @param {Array} airports - List of all airports
 * @returns {Object|null} PTY hub airport or null
 */
export const getHub = (airports) => {
  return airports.find(airport => airport.is_hub === true) || null;
};

/**
 * Get active destinations (excluding hub)
 *
 * @param {Array} airports - List of all airports
 * @returns {Array} Active destinations
 */
export const getActiveDestinations = (airports) => {
  return airports.filter(airport =>
    airport.is_hub === false && airport.status === 'active'
  );
};

/**
 * Format coordinates for mapping libraries
 *
 * @param {Object} airport - Airport object with latitude/longitude
 * @returns {Array} [longitude, latitude] for Mapbox
 */
export const formatCoordinates = (airport) => {
  return [parseFloat(airport.longitude), parseFloat(airport.latitude)];
};
