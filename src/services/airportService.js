/**
 * Airport Service
 * Handles all API calls related to airports and network data
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

/**
 * Fetch all airports from the database
 */
export const fetchAllAirports = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/airports`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching airports:', error);
    throw error;
  }
};

/**
 * Fetch a specific airport by IATA code
 */
export const fetchAirportByCode = async (iataCode) => {
  try {
    const response = await fetch(`${API_BASE_URL}/airports/${iataCode}`);
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching airport ${iataCode}:`, error);
    throw error;
  }
};

/**
 * Fetch Copa network data (hub + destinations in format needed for map)
 */
export const fetchCopaNetwork = async () => {
  try {
    // Fetch all airports
    const airports = await fetchAllAirports();

    // Find the hub (PTY)
    const hub = airports.find(airport => airport.is_hub);

    if (!hub) {
      throw new Error('Hub airport (PTY) not found in database');
    }

    // Get all non-hub airports (destinations)
    const destinations = airports
      .filter(airport => !airport.is_hub && airport.status === 'active')
      .map(airport => ({
        code: airport.iata_code,
        city: airport.city,
        country: airport.country,
        region: airport.region_name || 'Unknown',
        coords: [parseFloat(airport.longitude), parseFloat(airport.latitude)],
        name: airport.name,
        timezone: airport.timezone,
        status: airport.status
      }));

    // Return in the format expected by the map component
    return {
      hub: {
        code: hub.iata_code,
        name: hub.name,
        city: hub.city,
        country: hub.country,
        coords: [parseFloat(hub.longitude), parseFloat(hub.latitude)]
      },
      destinations
    };
  } catch (error) {
    console.error('Error fetching Copa network:', error);
    throw error;
  }
};

/**
 * Fetch all routes from the hub
 */
export const fetchHubRoutes = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/routes`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching routes:', error);
    throw error;
  }
};

/**
 * Fetch network statistics
 */
export const fetchNetworkStats = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/stats`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching network stats:', error);
    throw error;
  }
};

/**
 * Fetch airports by region
 */
export const fetchAirportsByRegion = async (regionName) => {
  try {
    const response = await fetch(`${API_BASE_URL}/regions/${encodeURIComponent(regionName)}/airports`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching airports for region ${regionName}:`, error);
    throw error;
  }
};

export default {
  fetchAllAirports,
  fetchAirportByCode,
  fetchCopaNetwork,
  fetchHubRoutes,
  fetchNetworkStats,
  fetchAirportsByRegion
};
