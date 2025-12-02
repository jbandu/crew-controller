-- Copa Airlines Network Database Schema
-- This schema stores all airports, routes, and operational data

-- Drop existing tables if they exist
DROP TABLE IF EXISTS routes CASCADE;
DROP TABLE IF EXISTS airports CASCADE;
DROP TABLE IF EXISTS regions CASCADE;

-- Regions table (North America, Central America, South America, Caribbean)
CREATE TABLE regions (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Airports table - All Copa Airlines destinations
CREATE TABLE airports (
  id SERIAL PRIMARY KEY,
  iata_code CHAR(3) NOT NULL UNIQUE,
  icao_code CHAR(4),
  name VARCHAR(200) NOT NULL,
  city VARCHAR(100) NOT NULL,
  country VARCHAR(100) NOT NULL,
  region_id INTEGER REFERENCES regions(id),
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  timezone VARCHAR(50),
  is_hub BOOLEAN DEFAULT FALSE,
  status VARCHAR(20) DEFAULT 'active', -- active, upcoming, seasonal
  start_date DATE,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Routes table - Copa Airlines flight routes
CREATE TABLE routes (
  id SERIAL PRIMARY KEY,
  origin_airport_id INTEGER NOT NULL REFERENCES airports(id),
  destination_airport_id INTEGER NOT NULL REFERENCES airports(id),
  flight_number VARCHAR(10),
  frequency_weekly INTEGER, -- Number of flights per week
  aircraft_type VARCHAR(50),
  distance_km INTEGER,
  flight_time_minutes INTEGER,
  status VARCHAR(20) DEFAULT 'active',
  seasonal BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(origin_airport_id, destination_airport_id)
);

-- Create indexes for faster queries
CREATE INDEX idx_airports_iata ON airports(iata_code);
CREATE INDEX idx_airports_country ON airports(country);
CREATE INDEX idx_airports_region ON airports(region_id);
CREATE INDEX idx_airports_hub ON airports(is_hub);
CREATE INDEX idx_routes_origin ON routes(origin_airport_id);
CREATE INDEX idx_routes_destination ON routes(destination_airport_id);
CREATE INDEX idx_routes_status ON routes(status);

-- Add updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply trigger to tables
CREATE TRIGGER update_airports_updated_at BEFORE UPDATE ON airports
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_routes_updated_at BEFORE UPDATE ON routes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Add comments for documentation
COMMENT ON TABLE airports IS 'All Copa Airlines destinations worldwide';
COMMENT ON TABLE routes IS 'Flight routes connecting PTY hub to destinations';
COMMENT ON COLUMN airports.status IS 'active, upcoming, seasonal, discontinued';
COMMENT ON COLUMN airports.is_hub IS 'TRUE for PTY (Tocumen International Airport)';
