-- Seed Routes Data for Copa Airlines
-- Based on typical hub-and-spoke operations from PTY
-- Frequencies estimated based on destination importance, distance, and typical patterns
-- Last updated: December 2025

-- Get PTY hub ID
DO $$
DECLARE
  pty_id INTEGER;
BEGIN
  SELECT id INTO pty_id FROM airports WHERE iata_code = 'PTY';

  -- North America - United States (High frequency, larger aircraft)
  -- Major hubs and business destinations
  INSERT INTO routes (origin_airport_id, destination_airport_id, frequency_weekly, aircraft_type, distance_km, flight_time_minutes, status) VALUES
  (pty_id, (SELECT id FROM airports WHERE iata_code = 'MIA'), 21, '737-800', 2200, 165, 'active'),
  (pty_id, (SELECT id FROM airports WHERE iata_code = 'FLL'), 7, '737-800', 2150, 160, 'active'),
  (pty_id, (SELECT id FROM airports WHERE iata_code = 'JFK'), 14, '737 MAX 9', 3400, 255, 'active'),
  (pty_id, (SELECT id FROM airports WHERE iata_code = 'LAX'), 7, '737 MAX 9', 5300, 390, 'active'),
  (pty_id, (SELECT id FROM airports WHERE iata_code = 'SFO'), 7, '737 MAX 9', 5500, 405, 'active'),
  (pty_id, (SELECT id FROM airports WHERE iata_code = 'ORD'), 7, '737 MAX 9', 3800, 285, 'active'),
  (pty_id, (SELECT id FROM airports WHERE iata_code = 'IAD'), 14, '737-800', 3100, 235, 'active'),
  (pty_id, (SELECT id FROM airports WHERE iata_code = 'MCO'), 14, '737-800', 2050, 155, 'active'),
  (pty_id, (SELECT id FROM airports WHERE iata_code = 'TPA'), 7, '737-800', 2100, 160, 'active'),
  (pty_id, (SELECT id FROM airports WHERE iata_code = 'ATL'), 7, '737-800', 2450, 185, 'active'),
  (pty_id, (SELECT id FROM airports WHERE iata_code = 'BOS'), 7, '737 MAX 9', 3500, 265, 'active'),
  (pty_id, (SELECT id FROM airports WHERE iata_code = 'DEN'), 7, '737 MAX 9', 4200, 315, 'active'),
  (pty_id, (SELECT id FROM airports WHERE iata_code = 'LAS'), 7, '737 MAX 9', 5000, 370, 'active'),
  (pty_id, (SELECT id FROM airports WHERE iata_code = 'AUS'), 7, '737-800', 3000, 225, 'active'),
  (pty_id, (SELECT id FROM airports WHERE iata_code = 'BWI'), 7, '737-800', 3050, 230, 'active'),
  (pty_id, (SELECT id FROM airports WHERE iata_code = 'RDU'), 7, '737-800', 2850, 215, 'active'),
  (pty_id, (SELECT id FROM airports WHERE iata_code = 'SAN'), 4, '737 MAX 9', 5100, 380, 'active');

  -- North America - Canada (Medium frequency)
  INSERT INTO routes (origin_airport_id, destination_airport_id, frequency_weekly, aircraft_type, distance_km, flight_time_minutes, status) VALUES
  (pty_id, (SELECT id FROM airports WHERE iata_code = 'YYZ'), 7, '737 MAX 9', 3800, 285, 'active'),
  (pty_id, (SELECT id FROM airports WHERE iata_code = 'YUL'), 7, '737 MAX 9', 4000, 300, 'active');

  -- North America - Mexico (High frequency to major cities)
  INSERT INTO routes (origin_airport_id, destination_airport_id, frequency_weekly, aircraft_type, distance_km, flight_time_minutes, status) VALUES
  (pty_id, (SELECT id FROM airports WHERE iata_code = 'MEX'), 21, '737-800', 2600, 195, 'active'),
  (pty_id, (SELECT id FROM airports WHERE iata_code = 'CUN'), 14, '737-800', 1600, 125, 'active'),
  (pty_id, (SELECT id FROM airports WHERE iata_code = 'GDL'), 7, '737-800', 2800, 210, 'active'),
  (pty_id, (SELECT id FROM airports WHERE iata_code = 'MTY'), 7, '737-800', 3000, 225, 'active'),
  (pty_id, (SELECT id FROM airports WHERE iata_code = 'TQO'), 4, '737-700', 1650, 130, 'active'),
  (pty_id, (SELECT id FROM airports WHERE iata_code = 'SJD'), 4, '737-800', 2900, 220, 'upcoming'),
  (pty_id, (SELECT id FROM airports WHERE iata_code = 'NLU'), 3, '737-800', 2600, 195, 'active');

  -- Central America (Very high frequency - close regional routes)
  INSERT INTO routes (origin_airport_id, destination_airport_id, frequency_weekly, aircraft_type, distance_km, flight_time_minutes, status) VALUES
  (pty_id, (SELECT id FROM airports WHERE iata_code = 'SJO'), 28, '737-700', 550, 55, 'active'),
  (pty_id, (SELECT id FROM airports WHERE iata_code = 'SAL'), 21, '737-700', 850, 75, 'active'),
  (pty_id, (SELECT id FROM airports WHERE iata_code = 'GUA'), 21, '737-800', 1100, 95, 'active'),
  (pty_id, (SELECT id FROM airports WHERE iata_code = 'MGA'), 14, '737-700', 750, 70, 'active'),
  (pty_id, (SELECT id FROM airports WHERE iata_code = 'SAP'), 14, '737-700', 900, 80, 'active'),
  (pty_id, (SELECT id FROM airports WHERE iata_code = 'XPL'), 7, '737-700', 950, 85, 'active'),
  (pty_id, (SELECT id FROM airports WHERE iata_code = 'BZE'), 7, '737-700', 1150, 100, 'active'),
  (pty_id, (SELECT id FROM airports WHERE iata_code = 'LIR'), 7, '737-700', 600, 60, 'active');

  -- Panama Domestic
  INSERT INTO routes (origin_airport_id, destination_airport_id, frequency_weekly, aircraft_type, distance_km, flight_time_minutes, status) VALUES
  (pty_id, (SELECT id FROM airports WHERE iata_code = 'DAV'), 14, '737-700', 320, 45, 'active');

  -- South America - Colombia (Very high frequency - major regional partner)
  INSERT INTO routes (origin_airport_id, destination_airport_id, frequency_weekly, aircraft_type, distance_km, flight_time_minutes, status) VALUES
  (pty_id, (SELECT id FROM airports WHERE iata_code = 'BOG'), 42, '737-800', 1300, 110, 'active'),
  (pty_id, (SELECT id FROM airports WHERE iata_code = 'MDE'), 21, '737-800', 1400, 120, 'active'),
  (pty_id, (SELECT id FROM airports WHERE iata_code = 'CTG'), 14, '737-800', 950, 85, 'active'),
  (pty_id, (SELECT id FROM airports WHERE iata_code = 'CLO'), 14, '737-800', 1450, 125, 'active'),
  (pty_id, (SELECT id FROM airports WHERE iata_code = 'BAQ'), 14, '737-700', 850, 75, 'active'),
  (pty_id, (SELECT id FROM airports WHERE iata_code = 'BGA'), 7, '737-700', 1350, 115, 'active'),
  (pty_id, (SELECT id FROM airports WHERE iata_code = 'CUC'), 7, '737-700', 1500, 130, 'active'),
  (pty_id, (SELECT id FROM airports WHERE iata_code = 'PEI'), 14, '737-700', 1420, 120, 'active'),
  (pty_id, (SELECT id FROM airports WHERE iata_code = 'ADZ'), 7, '737-700', 1100, 95, 'active'),
  (pty_id, (SELECT id FROM airports WHERE iata_code = 'SMR'), 7, '737-700', 900, 80, 'active'),
  (pty_id, (SELECT id FROM airports WHERE iata_code = 'AXM'), 7, '737-700', 1450, 125, 'active');

  -- South America - Venezuela
  INSERT INTO routes (origin_airport_id, destination_airport_id, frequency_weekly, aircraft_type, distance_km, flight_time_minutes, status) VALUES
  (pty_id, (SELECT id FROM airports WHERE iata_code = 'CCS'), 14, '737-800', 1600, 135, 'active'),
  (pty_id, (SELECT id FROM airports WHERE iata_code = 'MAR'), 7, '737-800', 1700, 145, 'active'),
  (pty_id, (SELECT id FROM airports WHERE iata_code = 'VLN'), 7, '737-700', 1650, 140, 'active'),
  (pty_id, (SELECT id FROM airports WHERE iata_code = 'BRM'), 4, '737-700', 1600, 135, 'active'),
  (pty_id, (SELECT id FROM airports WHERE iata_code = 'BLA'), 4, '737-700', 1650, 140, 'active');

  -- South America - Ecuador
  INSERT INTO routes (origin_airport_id, destination_airport_id, frequency_weekly, aircraft_type, distance_km, flight_time_minutes, status) VALUES
  (pty_id, (SELECT id FROM airports WHERE iata_code = 'GYE'), 14, '737-800', 1450, 125, 'active'),
  (pty_id, (SELECT id FROM airports WHERE iata_code = 'UIO'), 14, '737-800', 1600, 135, 'active'),
  (pty_id, (SELECT id FROM airports WHERE iata_code = 'MEC'), 4, '737-700', 1500, 130, 'active');

  -- South America - Peru
  INSERT INTO routes (origin_airport_id, destination_airport_id, frequency_weekly, aircraft_type, distance_km, flight_time_minutes, status) VALUES
  (pty_id, (SELECT id FROM airports WHERE iata_code = 'LIM'), 21, '737-800', 2100, 170, 'active'),
  (pty_id, (SELECT id FROM airports WHERE iata_code = 'CIX'), 4, '737-700', 2000, 165, 'active');

  -- South America - Brazil (Major routes)
  INSERT INTO routes (origin_airport_id, destination_airport_id, frequency_weekly, aircraft_type, distance_km, flight_time_minutes, status) VALUES
  (pty_id, (SELECT id FROM airports WHERE iata_code = 'GRU'), 14, '737 MAX 9', 4400, 325, 'active'),
  (pty_id, (SELECT id FROM airports WHERE iata_code = 'GIG'), 7, '737 MAX 9', 4700, 345, 'active'),
  (pty_id, (SELECT id FROM airports WHERE iata_code = 'BSB'), 7, '737-800', 3900, 290, 'active'),
  (pty_id, (SELECT id FROM airports WHERE iata_code = 'MAO'), 7, '737-800', 2800, 210, 'active'),
  (pty_id, (SELECT id FROM airports WHERE iata_code = 'CNF'), 7, '737-800', 4300, 320, 'active'),
  (pty_id, (SELECT id FROM airports WHERE iata_code = 'POA'), 4, '737-800', 5200, 385, 'active'),
  (pty_id, (SELECT id FROM airports WHERE iata_code = 'FLN'), 4, '737-800', 5100, 380, 'active'),
  (pty_id, (SELECT id FROM airports WHERE iata_code = 'VCP'), 4, '737-800', 4400, 325, 'active'),
  (pty_id, (SELECT id FROM airports WHERE iata_code = 'SSA'), 4, '737-800', 3800, 285, 'upcoming');

  -- South America - Argentina (Multiple destinations)
  INSERT INTO routes (origin_airport_id, destination_airport_id, frequency_weekly, aircraft_type, distance_km, flight_time_minutes, status) VALUES
  (pty_id, (SELECT id FROM airports WHERE iata_code = 'EZE'), 14, '737 MAX 9', 5900, 435, 'active'),
  (pty_id, (SELECT id FROM airports WHERE iata_code = 'COR'), 4, '737-800', 5700, 420, 'active'),
  (pty_id, (SELECT id FROM airports WHERE iata_code = 'MDZ'), 4, '737-800', 6100, 450, 'active'),
  (pty_id, (SELECT id FROM airports WHERE iata_code = 'ROS'), 4, '737-800', 5900, 435, 'active'),
  (pty_id, (SELECT id FROM airports WHERE iata_code = 'SLA'), 2, '737-800', 6200, 455, 'active'),
  (pty_id, (SELECT id FROM airports WHERE iata_code = 'TUC'), 2, '737-800', 6000, 445, 'active');

  -- South America - Chile
  INSERT INTO routes (origin_airport_id, destination_airport_id, frequency_weekly, aircraft_type, distance_km, flight_time_minutes, status) VALUES
  (pty_id, (SELECT id FROM airports WHERE iata_code = 'SCL'), 14, '737 MAX 9', 5800, 430, 'active');

  -- South America - Other countries
  INSERT INTO routes (origin_airport_id, destination_airport_id, frequency_weekly, aircraft_type, distance_km, flight_time_minutes, status) VALUES
  (pty_id, (SELECT id FROM airports WHERE iata_code = 'VVI'), 7, '737-800', 3200, 240, 'active'),
  (pty_id, (SELECT id FROM airports WHERE iata_code = 'ASU'), 7, '737-800', 4800, 355, 'active'),
  (pty_id, (SELECT id FROM airports WHERE iata_code = 'MVD'), 7, '737-800', 5600, 415, 'active'),
  (pty_id, (SELECT id FROM airports WHERE iata_code = 'GEO'), 4, '737-700', 2200, 175, 'active'),
  (pty_id, (SELECT id FROM airports WHERE iata_code = 'PBM'), 4, '737-700', 2400, 190, 'active');

  -- Caribbean (High frequency to tourist destinations)
  INSERT INTO routes (origin_airport_id, destination_airport_id, frequency_weekly, aircraft_type, distance_km, flight_time_minutes, status) VALUES
  (pty_id, (SELECT id FROM airports WHERE iata_code = 'SJU'), 14, '737-800', 1900, 150, 'active'),
  (pty_id, (SELECT id FROM airports WHERE iata_code = 'SDQ'), 14, '737-800', 1650, 135, 'active'),
  (pty_id, (SELECT id FROM airports WHERE iata_code = 'PUJ'), 14, '737-800', 1700, 140, 'active'),
  (pty_id, (SELECT id FROM airports WHERE iata_code = 'CUR'), 14, '737-800', 1100, 95, 'active'),
  (pty_id, (SELECT id FROM airports WHERE iata_code = 'AUA'), 14, '737-800', 1050, 90, 'active'),
  (pty_id, (SELECT id FROM airports WHERE iata_code = 'HAV'), 7, '737-800', 1400, 120, 'active'),
  (pty_id, (SELECT id FROM airports WHERE iata_code = 'MBJ'), 7, '737-700', 1100, 95, 'active'),
  (pty_id, (SELECT id FROM airports WHERE iata_code = 'KIN'), 7, '737-700', 1050, 90, 'active'),
  (pty_id, (SELECT id FROM airports WHERE iata_code = 'POS'), 7, '737-700', 1400, 120, 'active'),
  (pty_id, (SELECT id FROM airports WHERE iata_code = 'BGI'), 7, '737-700', 1800, 145, 'active'),
  (pty_id, (SELECT id FROM airports WHERE iata_code = 'NAS'), 7, '737-800', 1650, 135, 'active'),
  (pty_id, (SELECT id FROM airports WHERE iata_code = 'SXM'), 7, '737-700', 1600, 130, 'active'),
  (pty_id, (SELECT id FROM airports WHERE iata_code = 'SNU'), 4, '737-700', 1450, 125, 'active'),
  (pty_id, (SELECT id FROM airports WHERE iata_code = 'HOG'), 4, '737-700', 1500, 130, 'active'),
  (pty_id, (SELECT id FROM airports WHERE iata_code = 'STI'), 7, '737-700', 1650, 135, 'active'),
  (pty_id, (SELECT id FROM airports WHERE iata_code = 'POP'), 4, '737-700', 1700, 140, 'upcoming');

END $$;

-- Summary statistics
SELECT
  'Routes Summary' as info,
  COUNT(*) as total_routes,
  SUM(frequency_weekly) as total_weekly_flights,
  ROUND(AVG(frequency_weekly), 1) as avg_weekly_frequency,
  SUM(frequency_weekly) / 7 as daily_flights_approx
FROM routes;

-- By aircraft type
SELECT
  aircraft_type,
  COUNT(*) as routes,
  SUM(frequency_weekly) as weekly_flights
FROM routes
GROUP BY aircraft_type
ORDER BY weekly_flights DESC;
