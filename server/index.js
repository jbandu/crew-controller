#!/usr/bin/env node

import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import pkg from 'pg';
const { Pool } = pkg;

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL ||
                    'postgresql://postgres:postgres@localhost:5432/crew_controller',
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Get all airports
app.get('/api/airports', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        a.*,
        r.name as region_name
      FROM airports a
      LEFT JOIN regions r ON a.region_id = r.id
      ORDER BY a.city
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching airports:', error);
    res.status(500).json({ error: 'Failed to fetch airports' });
  }
});

// Get airport by IATA code
app.get('/api/airports/:code', async (req, res) => {
  try {
    const { code } = req.params;
    const result = await pool.query(`
      SELECT
        a.*,
        r.name as region_name
      FROM airports a
      LEFT JOIN regions r ON a.region_id = r.id
      WHERE a.iata_code = $1
    `, [code.toUpperCase()]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Airport not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching airport:', error);
    res.status(500).json({ error: 'Failed to fetch airport' });
  }
});

// Get all routes from hub
app.get('/api/routes', async (req, res) => {
  try {
    const result = await pool.query(`
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
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching routes:', error);
    res.status(500).json({ error: 'Failed to fetch routes' });
  }
});

// Get network statistics
app.get('/api/stats', async (req, res) => {
  try {
    const result = await pool.query(`
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
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching network stats:', error);
    res.status(500).json({ error: 'Failed to fetch network stats' });
  }
});

// Get airports by region
app.get('/api/regions/:regionName/airports', async (req, res) => {
  try {
    const { regionName } = req.params;
    const result = await pool.query(`
      SELECT
        a.*,
        r.name as region_name
      FROM airports a
      JOIN regions r ON a.region_id = r.id
      WHERE r.name = $1 AND a.is_hub = FALSE
      ORDER BY a.country, a.city
    `, [regionName]);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching regional airports:', error);
    res.status(500).json({ error: 'Failed to fetch regional airports' });
  }
});

// Get upcoming destinations
app.get('/api/destinations/upcoming', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        a.*,
        r.name as region_name
      FROM airports a
      LEFT JOIN regions r ON a.region_id = r.id
      WHERE a.status = 'upcoming'
      ORDER BY a.start_date
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching upcoming destinations:', error);
    res.status(500).json({ error: 'Failed to fetch upcoming destinations' });
  }
});

// Test database connection on startup
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('❌ Database connection failed:', err);
  } else {
    console.log('✅ Database connected:', res.rows[0].now);
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 Copa Airlines API Server`);
  console.log(`📡 Listening on http://localhost:${PORT}`);
  console.log(`🗄️  Database: ${pool.options.connectionString?.split('@')[1] || 'local'}\n`);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('\n👋 SIGTERM received, closing server...');
  await pool.end();
  process.exit(0);
});
