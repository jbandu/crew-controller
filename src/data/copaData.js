export const copaNetwork = {
  hub: {
    code: 'PTY',
    name: 'Tocumen International',
    city: 'Panama City',
    country: 'Panama',
    coords: [-79.3835, 9.0714]
  },
  destinations: [
    // North America
    { code: 'MIA', city: 'Miami', country: 'United States', region: 'North America', coords: [-80.1918, 25.7617] },
    { code: 'JFK', city: 'New York', country: 'United States', region: 'North America', coords: [-73.7781, 40.6413] },
    { code: 'LAX', city: 'Los Angeles', country: 'United States', region: 'North America', coords: [-118.4085, 33.9425] },
    { code: 'SFO', city: 'San Francisco', country: 'United States', region: 'North America', coords: [-122.3750, 37.6213] },
    { code: 'ORD', city: 'Chicago', country: 'United States', region: 'North America', coords: [-87.9048, 41.9786] },
    { code: 'IAD', city: 'Washington DC', country: 'United States', region: 'North America', coords: [-77.4558, 38.9531] },
    { code: 'MCO', city: 'Orlando', country: 'United States', region: 'North America', coords: [-81.3081, 28.4312] },
    { code: 'FLL', city: 'Fort Lauderdale', country: 'United States', region: 'North America', coords: [-80.1534, 26.0742] },
    { code: 'TPA', city: 'Tampa', country: 'United States', region: 'North America', coords: [-82.5332, 27.9756] },
    { code: 'DEN', city: 'Denver', country: 'United States', region: 'North America', coords: [-104.6731, 39.8561] },
    { code: 'IAH', city: 'Houston', country: 'United States', region: 'North America', coords: [-95.3414, 29.9902] },
    { code: 'LAS', city: 'Las Vegas', country: 'United States', region: 'North America', coords: [-115.1537, 36.0840] },
    { code: 'ATL', city: 'Atlanta', country: 'United States', region: 'North America', coords: [-84.4281, 33.6407] },
    { code: 'BOS', city: 'Boston', country: 'United States', region: 'North America', coords: [-71.0096, 42.3656] },
    { code: 'DFW', city: 'Dallas', country: 'United States', region: 'North America', coords: [-97.0403, 32.8998] },
    { code: 'YUL', city: 'Montreal', country: 'Canada', region: 'North America', coords: [-73.7408, 45.4706] },
    { code: 'YYZ', city: 'Toronto', country: 'Canada', region: 'North America', coords: [-79.6306, 43.6777] },

    // Caribbean & Central America
    { code: 'CUN', city: 'Cancún', country: 'Mexico', region: 'Caribbean', coords: [-86.8515, 21.0365] },
    { code: 'MEX', city: 'Mexico City', country: 'Mexico', region: 'Central America', coords: [-99.0720, 19.4363] },
    { code: 'GDL', city: 'Guadalajara', country: 'Mexico', region: 'Central America', coords: [-103.3117, 20.5218] },
    { code: 'MTY', city: 'Monterrey', country: 'Mexico', region: 'Central America', coords: [-100.1077, 25.7785] },
    { code: 'SJO', city: 'San José', country: 'Costa Rica', region: 'Central America', coords: [-84.2088, 9.9937] },
    { code: 'SAL', city: 'San Salvador', country: 'El Salvador', region: 'Central America', coords: [-89.0557, 13.4409] },
    { code: 'GUA', city: 'Guatemala City', country: 'Guatemala', region: 'Central America', coords: [-90.5275, 14.5833] },
    { code: 'MGA', city: 'Managua', country: 'Nicaragua', region: 'Central America', coords: [-86.1682, 12.1415] },
    { code: 'SAP', city: 'San Pedro Sula', country: 'Honduras', region: 'Central America', coords: [-87.9236, 15.4526] },
    { code: 'TGU', city: 'Tegucigalpa', country: 'Honduras', region: 'Central America', coords: [-87.2172, 14.0608] },
    { code: 'BZE', city: 'Belize City', country: 'Belize', region: 'Central America', coords: [-88.3081, 17.5391] },
    { code: 'SJU', city: 'San Juan', country: 'Puerto Rico', region: 'Caribbean', coords: [-66.0018, 18.4373] },
    { code: 'SDQ', city: 'Santo Domingo', country: 'Dominican Republic', region: 'Caribbean', coords: [-69.6689, 18.4297] },
    { code: 'CUR', city: 'Curaçao', country: 'Curaçao', region: 'Caribbean', coords: [-68.9598, 12.1889] },
    { code: 'AUA', city: 'Aruba', country: 'Aruba', region: 'Caribbean', coords: [-70.0151, 12.5014] },
    { code: 'HAV', city: 'Havana', country: 'Cuba', region: 'Caribbean', coords: [-82.4091, 22.9892] },
    { code: 'MBJ', city: 'Montego Bay', country: 'Jamaica', region: 'Caribbean', coords: [-77.9134, 18.5037] },
    { code: 'POS', city: 'Port of Spain', country: 'Trinidad', region: 'Caribbean', coords: [-61.3373, 10.5953] },
    { code: 'BGI', city: 'Bridgetown', country: 'Barbados', region: 'Caribbean', coords: [-59.4925, 13.0746] },

    // South America - North
    { code: 'BOG', city: 'Bogotá', country: 'Colombia', region: 'South America', coords: [-74.0721, 4.7110] },
    { code: 'MDE', city: 'Medellín', country: 'Colombia', region: 'South America', coords: [-75.4231, 6.1646] },
    { code: 'CTG', city: 'Cartagena', country: 'Colombia', region: 'South America', coords: [-75.5138, 10.4426] },
    { code: 'CLO', city: 'Cali', country: 'Colombia', region: 'South America', coords: [-76.3816, 3.5430] },
    { code: 'BAQ', city: 'Barranquilla', country: 'Colombia', region: 'South America', coords: [-74.7813, 10.8896] },
    { code: 'CCS', city: 'Caracas', country: 'Venezuela', region: 'South America', coords: [-66.9900, 10.6013] },
    { code: 'GYE', city: 'Guayaquil', country: 'Ecuador', region: 'South America', coords: [-79.8839, -2.1575] },
    { code: 'UIO', city: 'Quito', country: 'Ecuador', region: 'South America', coords: [-78.3575, -0.1292] },
    { code: 'LIM', city: 'Lima', country: 'Peru', region: 'South America', coords: [-77.1143, -12.0219] },
    { code: 'CUZ', city: 'Cusco', country: 'Peru', region: 'South America', coords: [-71.9387, -13.5356] },

    // South America - South
    { code: 'GRU', city: 'São Paulo', country: 'Brazil', region: 'South America', coords: [-46.6396, -23.5558] },
    { code: 'GIG', city: 'Rio de Janeiro', country: 'Brazil', region: 'South America', coords: [-43.2502, -22.8099] },
    { code: 'BSB', city: 'Brasília', country: 'Brazil', region: 'South America', coords: [-47.9172, -15.8697] },
    { code: 'MAO', city: 'Manaus', country: 'Brazil', region: 'South America', coords: [-60.0500, -3.0386] },
    { code: 'EZE', city: 'Buenos Aires', country: 'Argentina', region: 'South America', coords: [-58.5358, -34.8222] },
    { code: 'SCL', city: 'Santiago', country: 'Chile', region: 'South America', coords: [-70.7858, -33.3930] },
    { code: 'MVD', city: 'Montevideo', country: 'Uruguay', region: 'South America', coords: [-56.0308, -34.8384] },
    { code: 'ASU', city: 'Asunción', country: 'Paraguay', region: 'South America', coords: [-57.5190, -25.2400] },
    { code: 'LPB', city: 'La Paz', country: 'Bolivia', region: 'South America', coords: [-68.1924, -16.5134] }
  ]
};

export const operationStats = {
  flights: 187,
  crewOnDuty: 412,
  reserves: 24,
  onTimePerformance: 94.2,
  activeAlerts: 4
};
