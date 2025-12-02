#!/usr/bin/env node

/**
 * Database Setup Script
 *
 * This script initializes the Copa Airlines database with schema and seed data.
 *
 * Usage:
 *   Local: npm run db:setup
 *   Railway: This runs automatically on deployment
 *
 * Prerequisites:
 *   - PostgreSQL database created
 *   - DATABASE_URL environment variable set
 */

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import pkg from 'pg';
const { Pool } = pkg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Database configuration
const connectionString = process.env.DATABASE_URL ||
                         process.env.VITE_DATABASE_URL ||
                         'postgresql://postgres:postgres@localhost:5432/crew_controller';

const pool = new Pool({
  connectionString,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

async function runSQL(sqlFile) {
  const filePath = join(__dirname, sqlFile);
  const sql = readFileSync(filePath, 'utf8');

  console.log(`\nExecuting ${sqlFile}...`);
  try {
    await pool.query(sql);
    console.log(`✓ ${sqlFile} executed successfully`);
    return true;
  } catch (error) {
    console.error(`✗ Error executing ${sqlFile}:`, error.message);
    return false;
  }
}

async function checkConnection() {
  try {
    const result = await pool.query('SELECT NOW()');
    console.log('✓ Database connection successful');
    console.log(`  Connected at: ${result.rows[0].now}`);
    return true;
  } catch (error) {
    console.error('✗ Database connection failed:', error.message);
    return false;
  }
}

async function setup() {
  console.log('Copa Airlines Database Setup');
  console.log('============================\n');
  console.log(`Database: ${connectionString.split('@')[1]}`);

  // Check connection
  const connected = await checkConnection();
  if (!connected) {
    console.error('\n⚠ Please ensure PostgreSQL is running and DATABASE_URL is correct');
    process.exit(1);
  }

  // Run schema
  const schemaSuccess = await runSQL('schema.sql');
  if (!schemaSuccess) {
    console.error('\n⚠ Schema creation failed. Aborting.');
    process.exit(1);
  }

  // Run seed data
  const seedSuccess = await runSQL('seed.sql');
  if (!seedSuccess) {
    console.error('\n⚠ Seed data insertion failed. Database may be partially initialized.');
    process.exit(1);
  }

  // Verify data
  console.log('\nVerifying data...');
  try {
    const airportCount = await pool.query('SELECT COUNT(*) FROM airports');
    const routeCount = await pool.query('SELECT COUNT(*) FROM routes');
    const regionCount = await pool.query('SELECT COUNT(*) FROM regions');

    console.log(`✓ Airports: ${airportCount.rows[0].count}`);
    console.log(`✓ Routes: ${routeCount.rows[0].count}`);
    console.log(`✓ Regions: ${regionCount.rows[0].count}`);
  } catch (error) {
    console.error('✗ Verification failed:', error.message);
  }

  console.log('\n✅ Database setup complete!');
  console.log('\nYou can now run the application with: npm run dev\n');

  await pool.end();
  process.exit(0);
}

// Run setup
setup().catch((error) => {
  console.error('\n❌ Setup failed:', error);
  process.exit(1);
});
