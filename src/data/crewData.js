export const crewMembers = [
  {
    id: 'CM001',
    name: 'Capt. Julio Herrera',
    role: 'Captain',
    base: 'PTY',
    certifications: ['B737-800', 'B737 MAX 9'],
    status: 'legal',
    currentFlight: 'CM 208',
    dutyRemaining: '6h 12m',
    segments: [
      { flight: 'CM 208', start: '12:45', end: '19:30', status: 'legal', route: 'PTY-GRU' }
    ]
  },
  {
    id: 'CM002',
    name: 'F/O Alejandra Vega',
    role: 'First Officer',
    base: 'PTY',
    certifications: ['B737-800'],
    status: 'critical',
    currentFlight: 'CM 208',
    dutyRemaining: '2h 45m',
    dutyLimit: '14:30',
    alert: 'LEGALITY_VIOLATION',
    segments: [
      { flight: 'CM 208', start: '12:45', end: '19:30', status: 'critical', route: 'PTY-GRU' }
    ]
  },
  {
    id: 'CM003',
    name: 'F/O Ricardo Santos',
    role: 'First Officer',
    base: 'PTY',
    certifications: ['B737-800', 'B737 MAX 9'],
    status: 'reserve',
    dutyRemaining: '10h 00m',
    location: 'PTY Airport - Reserve Room',
    responseTime: 12,
    segments: []
  },
  {
    id: 'CM004',
    name: 'F/O Carlos Moreno',
    role: 'First Officer',
    base: 'PTY',
    certifications: ['B737-800'],
    status: 'inbound',
    currentFlight: 'CM 892',
    arrivalTime: '09:10',
    dutyRemaining: '8h 30m',
    segments: [
      { flight: 'CM 892', start: '06:00', end: '09:10', status: 'legal', route: 'MIA-PTY' }
    ]
  },
  {
    id: 'CM005',
    name: 'Capt. Sofia Martinez',
    role: 'Captain',
    base: 'PTY',
    status: 'legal',
    currentFlight: 'CM 487',
    dutyRemaining: '8h 00m',
    segments: [
      { flight: 'CM 487', start: '15:30', end: '18:00', status: 'warning', route: 'PTY-BOG' }
    ]
  },
  {
    id: 'CM006',
    name: 'F/O Maria Gonzalez',
    role: 'First Officer',
    base: 'PTY',
    status: 'legal',
    currentFlight: 'CM 487',
    dutyRemaining: '7h 30m',
    segments: [
      { flight: 'CM 487', start: '15:30', end: '18:00', status: 'warning', route: 'PTY-BOG' }
    ]
  }
];
