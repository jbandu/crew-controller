import pkg from 'pg';
const { Pool } = pkg;

// Database connection configuration
const dbConfig = {
  connectionString: import.meta.env.VITE_DATABASE_URL ||
                    import.meta.env.DATABASE_URL ||
                    process.env.DATABASE_URL ||
                    'postgresql://postgres:postgres@localhost:5432/crew_controller',
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
};

// Create connection pool
let pool = null;

const getPool = () => {
  if (!pool) {
    pool = new Pool(dbConfig);

    // Handle pool errors
    pool.on('error', (err) => {
      console.error('Unexpected error on idle database client', err);
    });
  }
  return pool;
};

// Database query helper
export const query = async (text, params) => {
  const start = Date.now();
  try {
    const pool = getPool();
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log('Executed query', { text, duration, rows: res.rowCount });
    return res;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
};

// Get all airports
export const getAllAirports = async () => {
  try {
    const result = await query(`
      SELECT
        a.*,
        r.name as region_name
      FROM airports a
      LEFT JOIN regions r ON a.region_id = r.id
      ORDER BY a.city
    `);
    return result.rows;
  } catch (error) {
    console.error('Error fetching airports:', error);
    return [];
  }
};

// Get airport by IATA code
export const getAirportByCode = async (iataCode) => {
  try {
    const result = await query(`
      SELECT
        a.*,
        r.name as region_name
      FROM airports a
      LEFT JOIN regions r ON a.region_id = r.id
      WHERE a.iata_code = $1
    `, [iataCode]);
    return result.rows[0] || null;
  } catch (error) {
    console.error(`Error fetching airport ${iataCode}:`, error);
    return null;
  }
};

// Get all routes from hub
export const getHubRoutes = async () => {
  try {
    const result = await query(`
      SELECT
        r.*,
        orig.iata_code as origin_code,
        orig.name as origin_name,
        orig.city as origin_city,
        dest.iata_code as destination_code,
        dest.name as destination_name,
        dest.city as destination_city,
        dest.country as destination_country,
        dest.latitude as dest_latitude,
        dest.longitude as dest_longitude
      FROM routes r
      JOIN airports orig ON r.origin_airport_id = orig.id
      JOIN airports dest ON r.destination_airport_id = dest.id
      WHERE orig.is_hub = TRUE AND r.status = 'active'
      ORDER BY dest.city
    `);
    return result.rows;
  } catch (error) {
    console.error('Error fetching hub routes:', error);
    return [];
  }
};

// Get Copa network statistics
export const getNetworkStats = async () => {
  try {
    const result = await query(`
      SELECT
        COUNT(DISTINCT CASE WHEN a.status = 'active' THEN a.id END) as active_destinations,
        COUNT(DISTINCT CASE WHEN a.status = 'upcoming' THEN a.id END) as upcoming_destinations,
        COUNT(DISTINCT a.country) as countries_served,
        COUNT(DISTINCT r.id) FILTER (WHERE r.status = 'active') as active_routes,
        (SELECT COUNT(*) FROM regions) as regions_count
      FROM airports a
      LEFT JOIN routes r ON a.id = r.destination_airport_id
      WHERE a.is_hub = FALSE
    `);
    return result.rows[0];
  } catch (error) {
    console.error('Error fetching network stats:', error);
    return {
      active_destinations: 0,
      upcoming_destinations: 0,
      countries_served: 0,
      active_routes: 0,
      regions_count: 0
    };
  }
};

// Get airports by region
export const getAirportsByRegion = async (regionName) => {
  try {
    const result = await query(`
      SELECT
        a.*,
        r.name as region_name
      FROM airports a
      JOIN regions r ON a.region_id = r.id
      WHERE r.name = $1 AND a.is_hub = FALSE
      ORDER BY a.country, a.city
    `, [regionName]);
    return result.rows;
  } catch (error) {
    console.error(`Error fetching airports for region ${regionName}:`, error);
    return [];
  }
};

// Get upcoming destinations
export const getUpcomingDestinations = async () => {
  try {
    const result = await query(`
      SELECT
        a.*,
        r.name as region_name
      FROM airports a
      LEFT JOIN regions r ON a.region_id = r.id
      WHERE a.status = 'upcoming'
      ORDER BY a.start_date
    `);
    return result.rows;
  } catch (error) {
    console.error('Error fetching upcoming destinations:', error);
    return [];
  }
};

// Close database connection (call on app shutdown)
export const closePool = async () => {
  if (pool) {
    await pool.end();
    pool = null;
  }
};

export default {
  query,
  getAllAirports,
  getAirportByCode,
  getHubRoutes,
  getNetworkStats,
  getAirportsByRegion,
  getUpcomingDestinations,
  closePool
};
