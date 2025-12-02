-- Seed data for Copa Airlines network
-- As of December 1, 2025

-- Insert regions
INSERT INTO regions (name) VALUES
  ('North America'),
  ('Central America'),
  ('South America'),
  ('Caribbean');

-- Insert airports
-- Note: Coordinates are approximate, adjust as needed for accuracy
INSERT INTO airports (iata_code, icao_code, name, city, country, region_id, latitude, longitude, is_hub, status, notes) VALUES
-- CENTRAL AMERICA (HUB)
('PTY', 'MPTO', 'Tocumen International Airport', 'Panama City', 'Panama', 2, 9.0714, -79.3835, TRUE, 'active', 'Hub of the Americas'),
('DAV', 'MPDA', 'Enrique Malek International Airport', 'David', 'Panama', 2, 8.3910, -82.4349, FALSE, 'active', NULL),

-- NORTH AMERICA - Canada
('YUL', 'CYUL', 'Pierre Elliott Trudeau International Airport', 'Montreal', 'Canada', 1, 45.4706, -73.7408, FALSE, 'active', NULL),
('YYZ', 'CYYZ', 'Toronto Pearson International Airport', 'Toronto', 'Canada', 1, 43.6777, -79.6248, FALSE, 'active', NULL),

-- NORTH AMERICA - Mexico
('CUN', 'MMUN', 'Cancun International Airport', 'Cancun', 'Mexico', 1, 21.0365, -86.8771, FALSE, 'active', NULL),
('GDL', 'MMGL', 'Miguel Hidalgo y Costilla International Airport', 'Guadalajara', 'Mexico', 1, 20.5218, -103.3108, FALSE, 'active', NULL),
('MEX', 'MMMX', 'Benito Juárez International Airport', 'Mexico City', 'Mexico', 1, 19.4363, -99.0721, FALSE, 'active', NULL),
('NLU', 'MMSM', 'Felipe Ángeles International Airport', 'Mexico City', 'Mexico', 1, 19.7431, -99.0116, FALSE, 'active', NULL),
('MTY', 'MMMY', 'Monterrey International Airport', 'Monterrey', 'Mexico', 1, 25.7785, -100.1076, FALSE, 'active', NULL),
('TQO', 'MMTL', 'Felipe Carrillo Puerto International Airport', 'Tulum', 'Mexico', 1, 20.3138, -87.4654, FALSE, 'active', NULL),
('SJD', 'MMSD', 'Los Cabos International Airport', 'Los Cabos', 'Mexico', 1, 23.1518, -109.7211, FALSE, 'upcoming', 'Service begins Dec 4, 2025'),

-- NORTH AMERICA - United States
('ATL', 'KATL', 'Hartsfield–Jackson Atlanta International Airport', 'Atlanta', 'United States', 1, 33.6407, -84.4277, FALSE, 'active', NULL),
('AUS', 'KAUS', 'Austin-Bergstrom International Airport', 'Austin', 'United States', 1, 30.1945, -97.6699, FALSE, 'active', NULL),
('BWI', 'KBWI', 'Baltimore/Washington International Airport', 'Baltimore', 'United States', 1, 39.1774, -76.6684, FALSE, 'active', NULL),
('BOS', 'KBOS', 'Logan International Airport', 'Boston', 'United States', 1, 42.3656, -71.0096, FALSE, 'active', NULL),
('ORD', 'KORD', 'O''Hare International Airport', 'Chicago', 'United States', 1, 41.9742, -87.9073, FALSE, 'active', NULL),
('DEN', 'KDEN', 'Denver International Airport', 'Denver', 'United States', 1, 39.8561, -104.6737, FALSE, 'active', NULL),
('FLL', 'KFLL', 'Fort Lauderdale-Hollywood International Airport', 'Fort Lauderdale', 'United States', 1, 26.0742, -80.1506, FALSE, 'active', NULL),
('LAS', 'KLAS', 'Harry Reid International Airport', 'Las Vegas', 'United States', 1, 36.0840, -115.1537, FALSE, 'active', NULL),
('LAX', 'KLAX', 'Los Angeles International Airport', 'Los Angeles', 'United States', 1, 33.9416, -118.4085, FALSE, 'active', NULL),
('MIA', 'KMIA', 'Miami International Airport', 'Miami', 'United States', 1, 25.7959, -80.2870, FALSE, 'active', NULL),
('JFK', 'KJFK', 'John F. Kennedy International Airport', 'New York', 'United States', 1, 40.6413, -73.7781, FALSE, 'active', NULL),
('MCO', 'KMCO', 'Orlando International Airport', 'Orlando', 'United States', 1, 28.4312, -81.3081, FALSE, 'active', NULL),
('RDU', 'KRDU', 'Raleigh-Durham International Airport', 'Raleigh', 'United States', 1, 35.8801, -78.7880, FALSE, 'active', NULL),
('SAN', 'KSAN', 'San Diego International Airport', 'San Diego', 'United States', 1, 32.7338, -117.1933, FALSE, 'active', 'Launched Jun 2025'),
('SFO', 'KSFO', 'San Francisco International Airport', 'San Francisco', 'United States', 1, 37.6213, -122.3790, FALSE, 'active', NULL),
('TPA', 'KTPA', 'Tampa International Airport', 'Tampa', 'United States', 1, 27.9755, -82.5333, FALSE, 'active', NULL),
('IAD', 'KIAD', 'Dulles International Airport', 'Washington D.C.', 'United States', 1, 38.9531, -77.4565, FALSE, 'active', NULL),

-- CENTRAL AMERICA
('BZE', 'MZBZ', 'Philip S. W. Goldson International Airport', 'Belize City', 'Belize', 2, 17.5392, -88.3082, FALSE, 'active', NULL),
('LIR', 'MRLB', 'Guanacaste (Daniel Oduber Quirós) International Airport', 'Liberia', 'Costa Rica', 2, 10.5933, -85.5444, FALSE, 'active', NULL),
('SJO', 'MROC', 'Juan Santamaría International Airport', 'San José', 'Costa Rica', 2, 9.9939, -84.2088, FALSE, 'active', NULL),
('SAL', 'MSLP', 'El Salvador International Airport (Saint Oscar Romero)', 'San Salvador', 'El Salvador', 2, 13.4409, -89.0557, FALSE, 'active', NULL),
('GUA', 'MGGT', 'La Aurora International Airport', 'Guatemala City', 'Guatemala', 2, 14.5833, -90.5275, FALSE, 'active', NULL),
('XPL', 'MHSC', 'Palmerola International Airport', 'Comayagua', 'Honduras', 2, 14.3829, -87.6235, FALSE, 'active', 'Serves Tegucigalpa'),
('SAP', 'MHSP', 'Ramón Villeda Morales International Airport', 'San Pedro Sula', 'Honduras', 2, 15.4526, -87.9236, FALSE, 'active', NULL),
('MGA', 'MNMG', 'Augusto C. Sandino International Airport', 'Managua', 'Nicaragua', 2, 12.1415, -86.1682, FALSE, 'active', NULL),

-- SOUTH AMERICA - Argentina
('EZE', 'SAEZ', 'Ministro Pistarini International Airport', 'Buenos Aires', 'Argentina', 3, -34.8222, -58.5358, FALSE, 'active', NULL),
('COR', 'SACO', 'Ambrosio Taravella International Airport', 'Córdoba', 'Argentina', 3, -31.3238, -64.2080, FALSE, 'active', NULL),
('MDZ', 'SAME', 'El Plumerillo International Airport', 'Mendoza', 'Argentina', 3, -32.8317, -68.7929, FALSE, 'active', NULL),
('ROS', 'SAAR', 'Islas Malvinas International Airport', 'Rosario', 'Argentina', 3, -32.9036, -60.7850, FALSE, 'active', NULL),
('SLA', 'SASA', 'Martín Miguel de Güemes International Airport', 'Salta', 'Argentina', 3, -24.8560, -65.4862, FALSE, 'active', 'Launched Sep 2025'),
('TUC', 'SANT', 'Teniente General Benjamín Matienzo International Airport', 'Tucumán', 'Argentina', 3, -26.8409, -65.1050, FALSE, 'active', 'Launched Sep 2025'),

-- SOUTH AMERICA - Bolivia
('VVI', 'SLVR', 'Viru Viru International Airport', 'Santa Cruz', 'Bolivia', 3, -17.6448, -63.1354, FALSE, 'active', NULL),

-- SOUTH AMERICA - Brazil
('CNF', 'SBCF', 'Tancredo Neves International Airport', 'Belo Horizonte', 'Brazil', 3, -19.6244, -43.9719, FALSE, 'active', NULL),
('BSB', 'SBBR', 'Brasília International Airport', 'Brasília', 'Brazil', 3, -15.8711, -47.9186, FALSE, 'active', NULL),
('VCP', 'SBKP', 'Viracopos International Airport', 'Campinas', 'Brazil', 3, -23.0074, -47.1345, FALSE, 'active', NULL),
('FLN', 'SBFL', 'Hercílio Luz International Airport', 'Florianópolis', 'Brazil', 3, -27.6703, -48.5473, FALSE, 'active', NULL),
('MAO', 'SBEG', 'Eduardo Gomes International Airport', 'Manaus', 'Brazil', 3, -3.0386, -60.0497, FALSE, 'active', NULL),
('POA', 'SBPA', 'Salgado Filho International Airport', 'Porto Alegre', 'Brazil', 3, -29.9944, -51.1714, FALSE, 'active', NULL),
('GIG', 'SBGL', 'Galeão International Airport', 'Rio de Janeiro', 'Brazil', 3, -22.8099, -43.2505, FALSE, 'active', NULL),
('GRU', 'SBGR', 'São Paulo/Guarulhos International Airport', 'São Paulo', 'Brazil', 3, -23.4356, -46.4731, FALSE, 'active', NULL),
('SSA', 'SBSV', 'Deputado Luís Eduardo Magalhães International Airport', 'Salvador', 'Brazil', 3, -12.9086, -38.3229, FALSE, 'upcoming', 'Resumes Jan 7, 2026'),

-- SOUTH AMERICA - Chile
('SCL', 'SCEL', 'Arturo Merino Benítez International Airport', 'Santiago', 'Chile', 3, -33.3930, -70.7858, FALSE, 'active', NULL),

-- SOUTH AMERICA - Colombia
('AXM', 'SKAR', 'El Edén International Airport', 'Armenia', 'Colombia', 3, 4.4528, -75.7664, FALSE, 'active', NULL),
('BAQ', 'SKBQ', 'Ernesto Cortissoz International Airport', 'Barranquilla', 'Colombia', 3, 10.8896, -74.7808, FALSE, 'active', NULL),
('BOG', 'SKBO', 'El Dorado International Airport', 'Bogotá', 'Colombia', 3, 4.7016, -74.1469, FALSE, 'active', NULL),
('BGA', 'SKBG', 'Palonegro International Airport', 'Bucaramanga', 'Colombia', 3, 7.1265, -73.1848, FALSE, 'active', NULL),
('CLO', 'SKCL', 'Alfonso Bonilla Aragón International Airport', 'Cali', 'Colombia', 3, 3.5432, -76.3816, FALSE, 'active', NULL),
('CTG', 'SKCG', 'Rafael Núñez International Airport', 'Cartagena', 'Colombia', 3, 10.4424, -75.5130, FALSE, 'active', NULL),
('CUC', 'SKCC', 'Camilo Daza International Airport', 'Cúcuta', 'Colombia', 3, 7.9278, -72.5115, FALSE, 'active', NULL),
('MDE', 'SKRG', 'José María Córdova International Airport', 'Medellín', 'Colombia', 3, 6.1645, -75.4233, FALSE, 'active', NULL),
('PEI', 'SKPE', 'Matecaña International Airport', 'Pereira', 'Colombia', 3, 4.8127, -75.7395, FALSE, 'active', NULL),
('ADZ', 'SKSP', 'Gustavo Rojas Pinilla International Airport', 'San Andrés', 'Colombia', 3, 12.5836, -81.7112, FALSE, 'active', NULL),
('SMR', 'SKSM', 'Simón Bolívar International Airport', 'Santa Marta', 'Colombia', 3, 11.1196, -74.2306, FALSE, 'active', NULL),

-- SOUTH AMERICA - Ecuador
('GYE', 'SEGU', 'José Joaquín de Olmedo International Airport', 'Guayaquil', 'Ecuador', 3, -2.1574, -79.8838, FALSE, 'active', NULL),
('MEC', 'SEMT', 'Eloy Alfaro International Airport', 'Manta', 'Ecuador', 3, -0.9461, -80.6788, FALSE, 'active', NULL),
('UIO', 'SEQM', 'Mariscal Sucre International Airport', 'Quito', 'Ecuador', 3, -0.1292, -78.3575, FALSE, 'active', NULL),

-- SOUTH AMERICA - Guyana
('GEO', 'SYCJ', 'Cheddi Jagan International Airport', 'Georgetown', 'Guyana', 3, 6.4985, -58.2541, FALSE, 'active', NULL),

-- SOUTH AMERICA - Paraguay
('ASU', 'SGAS', 'Silvio Pettirossi International Airport', 'Asunción', 'Paraguay', 3, -25.2400, -57.5196, FALSE, 'active', NULL),

-- SOUTH AMERICA - Peru
('CIX', 'SPHI', 'FAP Captain José Abelardo Quiñones González International Airport', 'Chiclayo', 'Peru', 3, -6.7876, -79.8281, FALSE, 'active', NULL),
('LIM', 'SPJC', 'Jorge Chávez International Airport', 'Lima', 'Peru', 3, -12.0219, -77.1143, FALSE, 'active', NULL),

-- SOUTH AMERICA - Suriname
('PBM', 'SMJP', 'Johan Adolf Pengel International Airport', 'Paramaribo', 'Suriname', 3, 5.4528, -55.1878, FALSE, 'active', NULL),

-- SOUTH AMERICA - Uruguay
('MVD', 'SUMU', 'Carrasco International Airport', 'Montevideo', 'Uruguay', 3, -34.8384, -56.0308, FALSE, 'active', NULL),

-- SOUTH AMERICA - Venezuela
('BLA', 'SVBC', 'General José Antonio Anzoátegui International Airport', 'Barcelona', 'Venezuela', 3, 10.1072, -64.6892, FALSE, 'active', NULL),
('BRM', 'SVJL', 'Jacinto Lara International Airport', 'Barquisimeto', 'Venezuela', 3, 10.0427, -69.3586, FALSE, 'active', NULL),
('CCS', 'SVMI', 'Simón Bolívar International Airport (Maiquetía)', 'Caracas', 'Venezuela', 3, 10.6013, -66.9915, FALSE, 'active', NULL),
('MAR', 'SVMC', 'La Chinita International Airport', 'Maracaibo', 'Venezuela', 3, 10.5582, -71.7279, FALSE, 'active', NULL),
('VLN', 'SVVA', 'Arturo Michelena International Airport', 'Valencia', 'Venezuela', 3, 10.1497, -67.9283, FALSE, 'active', NULL),

-- CARIBBEAN
('AUA', 'TNCA', 'Queen Beatrix International Airport', 'Oranjestad', 'Aruba', 4, 12.5014, -70.0151, FALSE, 'active', NULL),
('NAS', 'MYNN', 'Lynden Pindling International Airport', 'Nassau', 'Bahamas', 4, 25.0390, -77.4662, FALSE, 'active', NULL),
('BGI', 'TBPB', 'Grantley Adams International Airport', 'Bridgetown', 'Barbados', 4, 13.0746, -59.4925, FALSE, 'active', NULL),
('HAV', 'MUHA', 'José Martí International Airport', 'Havana', 'Cuba', 4, 22.9892, -82.4091, FALSE, 'active', NULL),
('HOG', 'MUHG', 'Frank País Airport', 'Holguín', 'Cuba', 4, 20.7856, -76.3151, FALSE, 'active', NULL),
('SNU', 'MUSC', 'Abel Santamaría Airport', 'Santa Clara', 'Cuba', 4, 22.4922, -79.9436, FALSE, 'active', NULL),
('CUR', 'TNCC', 'Hato International Airport', 'Willemstad', 'Curaçao', 4, 12.1889, -68.9598, FALSE, 'active', NULL),
('PUJ', 'MDPC', 'Punta Cana International Airport', 'Punta Cana', 'Dominican Republic', 4, 18.5674, -68.3634, FALSE, 'active', NULL),
('SDQ', 'MDSD', 'Las Américas International Airport', 'Santo Domingo', 'Dominican Republic', 4, 18.4297, -69.6689, FALSE, 'active', NULL),
('POP', 'MDPP', 'Gregorio Luperón International Airport', 'Puerto Plata', 'Dominican Republic', 4, 19.7579, -70.5700, FALSE, 'upcoming', 'Service begins Dec 4, 2025'),
('STI', 'MDST', 'Cibao International Airport', 'Santiago', 'Dominican Republic', 4, 19.4061, -70.6047, FALSE, 'upcoming', 'Resumes Jan 15, 2026'),
('KIN', 'MKJP', 'Norman Manley International Airport', 'Kingston', 'Jamaica', 4, 17.9357, -76.7875, FALSE, 'active', NULL),
('MBJ', 'MKJS', 'Sangster International Airport', 'Montego Bay', 'Jamaica', 4, 18.5037, -77.9133, FALSE, 'active', NULL),
('SJU', 'TJSJ', 'Luis Muñoz Marín International Airport', 'San Juan', 'Puerto Rico', 4, 18.4394, -66.0018, FALSE, 'active', NULL),
('SXM', 'TNCM', 'Princess Juliana International Airport', 'Philipsburg', 'St. Maarten', 4, 18.0410, -63.1088, FALSE, 'active', NULL),
('POS', 'TTPP', 'Piarco International Airport', 'Port of Spain', 'Trinidad and Tobago', 4, 10.5954, -61.3372, FALSE, 'active', NULL);

-- Create routes from PTY hub to all destinations
-- This creates a spoke network from the hub
INSERT INTO routes (origin_airport_id, destination_airport_id, frequency_weekly, status)
SELECT
  (SELECT id FROM airports WHERE iata_code = 'PTY'),
  a.id,
  14, -- Assume 2 flights per day = 14 per week (adjust as needed)
  a.status
FROM airports a
WHERE a.iata_code != 'PTY';

-- Update route count and add reverse routes for completeness
INSERT INTO routes (origin_airport_id, destination_airport_id, frequency_weekly, status)
SELECT
  destination_airport_id,
  origin_airport_id,
  frequency_weekly,
  status
FROM routes
WHERE origin_airport_id = (SELECT id FROM airports WHERE iata_code = 'PTY')
ON CONFLICT (origin_airport_id, destination_airport_id) DO NOTHING;
