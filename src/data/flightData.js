// Realistic Copa Airlines flight schedule for December 1, 2025
export const flights = [
  // Morning Bank (06:00 - 10:00)
  { id: 'CM208', route: 'PTY-GRU', aircraft: 'HP-1821CMP', type: '737-800', std: '12:45', sta: '19:30', status: 'delayed', delay: 90, reason: 'Weather hold', pax: 154, crew: 8 },
  { id: 'CM417', route: 'PTY-MIA', aircraft: 'HP-1849CMP', type: '737 MAX 9', std: '06:15', sta: '09:42', status: 'on-time', pax: 166, crew: 6 },
  { id: 'CM892', route: 'MIA-PTY', aircraft: 'HP-1852CMP', type: '737-800', std: '06:00', sta: '09:10', status: 'landed', pax: 148, crew: 8 },
  { id: 'CM135', route: 'PTY-MEX', aircraft: 'HP-1825CMP', type: '737-800', std: '07:30', sta: '11:15', status: 'boarding', pax: 142, crew: 6 },
  { id: 'CM487', route: 'PTY-BOG', aircraft: 'HP-1833CMP', type: '737-800', std: '15:30', sta: '18:00', status: 'scheduled', pax: 156, crew: 8 },
  { id: 'CM801', route: 'PTY-LIM', aircraft: 'HP-1841CMP', type: '737 MAX 9', std: '08:45', sta: '12:30', status: 'on-time', pax: 172, crew: 6 },

  // Mid-Morning Bank (10:00 - 14:00)
  { id: 'CM312', route: 'PTY-CUN', aircraft: 'HP-1856CMP', type: '737-800', std: '10:20', sta: '13:45', status: 'on-time', pax: 160, crew: 6 },
  { id: 'CM225', route: 'PTY-MDE', aircraft: 'HP-1829CMP', type: '737-800', std: '11:00', sta: '13:15', status: 'on-time', pax: 138, crew: 6 },
  { id: 'CM156', route: 'PTY-MIA', aircraft: 'HP-1843CMP', type: '737 MAX 9', std: '11:45', sta: '15:12', status: 'on-time', pax: 164, crew: 6 },
  { id: 'CM674', route: 'PTY-LAX', aircraft: 'HP-1838CMP', type: '737 MAX 9', std: '12:30', sta: '17:45', status: 'on-time', pax: 170, crew: 8 },

  // Afternoon Bank (14:00 - 18:00)
  { id: 'CM523', route: 'PTY-SCL', aircraft: 'HP-1847CMP', type: '737 MAX 9', std: '14:15', sta: '21:30', status: 'scheduled', pax: 168, crew: 8 },
  { id: 'CM391', route: 'PTY-JFK', aircraft: 'HP-1834CMP', type: '737 MAX 9', std: '15:00', sta: '20:15', status: 'scheduled', pax: 174, crew: 8 },
  { id: 'CM289', route: 'PTY-SJO', aircraft: 'HP-1827CMP', type: '737-800', std: '16:20', sta: '18:05', status: 'scheduled', pax: 128, crew: 6 },
  { id: 'CM445', route: 'PTY-GUA', aircraft: 'HP-1831CMP', type: '737-800', std: '17:00', sta: '19:30', status: 'scheduled', pax: 144, crew: 6 },

  // Evening Bank (18:00 - 22:00)
  { id: 'CM762', route: 'PTY-EZE', aircraft: 'HP-1845CMP', type: '737 MAX 9', std: '18:45', sta: '02:30', status: 'scheduled', pax: 166, crew: 8 },
  { id: 'CM598', route: 'PTY-CTG', aircraft: 'HP-1822CMP', type: '737-800', std: '19:15', sta: '21:00', status: 'scheduled', pax: 134, crew: 6 },
  { id: 'CM334', route: 'PTY-MIA', aircraft: 'HP-1851CMP', type: '737 MAX 9', std: '20:00', sta: '23:27', status: 'scheduled', pax: 162, crew: 6 },
  { id: 'CM712', route: 'PTY-BOG', aircraft: 'HP-1826CMP', type: '737-800', std: '21:30', sta: '23:45', status: 'scheduled', pax: 152, crew: 8 }
];

// Airport/city information
export const airports = {
  PTY: { name: 'Tocumen International', city: 'Panama City', country: 'Panama', timezone: 'America/Panama' },
  GRU: { name: 'São Paulo-Guarulhos', city: 'São Paulo', country: 'Brazil', timezone: 'America/Sao_Paulo' },
  MIA: { name: 'Miami International', city: 'Miami', country: 'United States', timezone: 'America/New_York' },
  BOG: { name: 'El Dorado International', city: 'Bogotá', country: 'Colombia', timezone: 'America/Bogota' },
  MDE: { name: 'José María Córdova', city: 'Medellín', country: 'Colombia', timezone: 'America/Bogota' },
  CUN: { name: 'Cancún International', city: 'Cancún', country: 'Mexico', timezone: 'America/Cancun' },
  LIM: { name: 'Jorge Chávez International', city: 'Lima', country: 'Peru', timezone: 'America/Lima' },
  LAX: { name: 'Los Angeles International', city: 'Los Angeles', country: 'United States', timezone: 'America/Los_Angeles' },
  JFK: { name: 'John F. Kennedy International', city: 'New York', country: 'United States', timezone: 'America/New_York' },
  MEX: { name: 'Mexico City International', city: 'Mexico City', country: 'Mexico', timezone: 'America/Mexico_City' },
  SCL: { name: 'Arturo Merino Benítez', city: 'Santiago', country: 'Chile', timezone: 'America/Santiago' },
  SJO: { name: 'Juan Santamaría International', city: 'San José', country: 'Costa Rica', timezone: 'America/Costa_Rica' },
  GUA: { name: 'La Aurora International', city: 'Guatemala City', country: 'Guatemala', timezone: 'America/Guatemala' },
  EZE: { name: 'Ministro Pistarini International', city: 'Buenos Aires', country: 'Argentina', timezone: 'America/Argentina/Buenos_Aires' },
  CTG: { name: 'Rafael Núñez International', city: 'Cartagena', country: 'Colombia', timezone: 'America/Bogota' }
};

// Aircraft fleet
export const aircraft = [
  { registration: 'HP-1821CMP', type: '737-800', status: 'active', currentFlight: 'CM208', lastMaintenance: '2025-11-15' },
  { registration: 'HP-1822CMP', type: '737-800', status: 'active', currentFlight: 'CM598', lastMaintenance: '2025-11-20' },
  { registration: 'HP-1825CMP', type: '737-800', status: 'active', currentFlight: 'CM135', lastMaintenance: '2025-11-10' },
  { registration: 'HP-1826CMP', type: '737-800', status: 'active', currentFlight: 'CM712', lastMaintenance: '2025-11-25' },
  { registration: 'HP-1827CMP', type: '737-800', status: 'active', currentFlight: 'CM289', lastMaintenance: '2025-11-18' },
  { registration: 'HP-1829CMP', type: '737-800', status: 'active', currentFlight: 'CM225', lastMaintenance: '2025-11-22' },
  { registration: 'HP-1831CMP', type: '737-800', status: 'active', currentFlight: 'CM445', lastMaintenance: '2025-11-12' },
  { registration: 'HP-1833CMP', type: '737-800', status: 'active', currentFlight: 'CM487', lastMaintenance: '2025-11-28' },
  { registration: 'HP-1834CMP', type: '737 MAX 9', status: 'active', currentFlight: 'CM391', lastMaintenance: '2025-11-19' },
  { registration: 'HP-1838CMP', type: '737 MAX 9', status: 'active', currentFlight: 'CM674', lastMaintenance: '2025-11-16' },
  { registration: 'HP-1841CMP', type: '737 MAX 9', status: 'active', currentFlight: 'CM801', lastMaintenance: '2025-11-24' },
  { registration: 'HP-1843CMP', type: '737 MAX 9', status: 'active', currentFlight: 'CM156', lastMaintenance: '2025-11-21' },
  { registration: 'HP-1845CMP', type: '737 MAX 9', status: 'active', currentFlight: 'CM762', lastMaintenance: '2025-11-17' },
  { registration: 'HP-1847CMP', type: '737 MAX 9', status: 'active', currentFlight: 'CM523', lastMaintenance: '2025-11-26' },
  { registration: 'HP-1849CMP', type: '737 MAX 9', status: 'active', currentFlight: 'CM417', lastMaintenance: '2025-11-14' },
  { registration: 'HP-1851CMP', type: '737 MAX 9', status: 'active', currentFlight: 'CM334', lastMaintenance: '2025-11-23' },
  { registration: 'HP-1852CMP', type: '737-800', status: 'active', currentFlight: 'CM892', lastMaintenance: '2025-11-27' },
  { registration: 'HP-1856CMP', type: '737-800', status: 'active', currentFlight: 'CM312', lastMaintenance: '2025-11-13' }
];
