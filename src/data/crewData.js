// Expanded crew roster with realistic Latin American names and detailed qualifications
export const crewMembers = [
  // CAPTAINS
  {
    id: 'CM001',
    name: 'Capt. Julio Herrera',
    role: 'Captain',
    base: 'PTY',
    certifications: ['B737-800', 'B737 MAX 9'],
    languages: ['Spanish', 'English'],
    seniorityDate: '2010-03-15',
    status: 'legal',
    currentFlight: 'CM208',
    dutyRemaining: '6h 12m',
    dutyStart: '05:00',
    segments: [
      { flight: 'CM208', start: '12:45', end: '19:30', status: 'legal', route: 'PTY-GRU' }
    ]
  },
  {
    id: 'CM007',
    name: 'Capt. Sofia Martinez',
    role: 'Captain',
    base: 'PTY',
    certifications: ['B737-800', 'B737 MAX 9'],
    languages: ['Spanish', 'English', 'Portuguese'],
    seniorityDate: '2012-06-20',
    status: 'legal',
    currentFlight: 'CM487',
    dutyRemaining: '8h 00m',
    dutyStart: '12:00',
    segments: [
      { flight: 'CM487', start: '15:30', end: '18:00', status: 'warning', route: 'PTY-BOG' }
    ]
  },
  {
    id: 'CM013',
    name: 'Capt. Roberto Silva',
    role: 'Captain',
    base: 'PTY',
    certifications: ['B737-800', 'B737 MAX 9'],
    languages: ['Spanish', 'English'],
    seniorityDate: '2009-11-05',
    status: 'legal',
    currentFlight: 'CM801',
    dutyRemaining: '9h 15m',
    dutyStart: '06:00',
    segments: [
      { flight: 'CM801', start: '08:45', end: '12:30', status: 'legal', route: 'PTY-LIM' }
    ]
  },
  {
    id: 'CM019',
    name: 'Capt. Ana Rojas',
    role: 'Captain',
    base: 'PTY',
    certifications: ['B737-800'],
    languages: ['Spanish', 'English'],
    seniorityDate: '2013-01-18',
    status: 'legal',
    currentFlight: 'CM417',
    dutyRemaining: '7h 30m',
    dutyStart: '04:00',
    segments: [
      { flight: 'CM417', start: '06:15', end: '09:42', status: 'legal', route: 'PTY-MIA' }
    ]
  },

  // FIRST OFFICERS
  {
    id: 'CM002',
    name: 'F/O Alejandra Vega',
    role: 'First Officer',
    base: 'PTY',
    certifications: ['B737-800'],
    languages: ['Spanish', 'English'],
    seniorityDate: '2018-04-22',
    status: 'critical',
    currentFlight: 'CM208',
    dutyRemaining: '2h 45m',
    dutyLimit: '14:30',
    alert: 'LEGALITY_VIOLATION',
    dutyStart: '02:30',
    segments: [
      { flight: 'CM208', start: '12:45', end: '19:30', status: 'critical', route: 'PTY-GRU' }
    ]
  },
  {
    id: 'CM003',
    name: 'F/O Ricardo Santos',
    role: 'First Officer',
    base: 'PTY',
    certifications: ['B737-800', 'B737 MAX 9'],
    languages: ['Spanish', 'English', 'Portuguese'],
    seniorityDate: '2019-08-10',
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
    languages: ['Spanish', 'English'],
    seniorityDate: '2020-02-15',
    status: 'inbound',
    currentFlight: 'CM892',
    arrivalTime: '09:10',
    dutyRemaining: '8h 30m',
    dutyStart: '04:00',
    segments: [
      { flight: 'CM892', start: '06:00', end: '09:10', status: 'legal', route: 'MIA-PTY' }
    ]
  },
  {
    id: 'CM008',
    name: 'F/O Maria Gonzalez',
    role: 'First Officer',
    base: 'PTY',
    certifications: ['B737-800', 'B737 MAX 9'],
    languages: ['Spanish', 'English'],
    seniorityDate: '2019-05-30',
    status: 'legal',
    currentFlight: 'CM487',
    dutyRemaining: '7h 30m',
    dutyStart: '12:30',
    segments: [
      { flight: 'CM487', start: '15:30', end: '18:00', status: 'warning', route: 'PTY-BOG' }
    ]
  },
  {
    id: 'CM014',
    name: 'F/O Diego Ramirez',
    role: 'First Officer',
    base: 'PTY',
    certifications: ['B737 MAX 9'],
    languages: ['Spanish', 'English'],
    seniorityDate: '2021-03-12',
    status: 'legal',
    currentFlight: 'CM674',
    dutyRemaining: '9h 00m',
    dutyStart: '10:00',
    segments: [
      { flight: 'CM674', start: '12:30', end: '17:45', status: 'legal', route: 'PTY-LAX' }
    ]
  },
  {
    id: 'CM020',
    name: 'F/O Isabella Torres',
    role: 'First Officer',
    base: 'PTY',
    certifications: ['B737-800', 'B737 MAX 9'],
    languages: ['Spanish', 'English'],
    seniorityDate: '2020-09-08',
    status: 'reserve',
    dutyRemaining: '12h 00m',
    location: 'PTY Airport - Reserve Room',
    responseTime: 15,
    segments: []
  },

  // FLIGHT ATTENDANTS
  {
    id: 'FA001',
    name: 'FA Paula Mendez',
    role: 'Lead Flight Attendant',
    base: 'PTY',
    certifications: ['B737-800', 'B737 MAX 9', 'Emergency Medical'],
    languages: ['Spanish', 'English', 'Portuguese'],
    seniorityDate: '2015-07-10',
    status: 'legal',
    currentFlight: 'CM208',
    dutyRemaining: '5h 45m',
    dutyStart: '10:00',
    segments: [
      { flight: 'CM208', start: '12:45', end: '19:30', status: 'legal', route: 'PTY-GRU' }
    ]
  },
  {
    id: 'FA002',
    name: 'FA Luis Castillo',
    role: 'Flight Attendant',
    base: 'PTY',
    certifications: ['B737-800', 'B737 MAX 9'],
    languages: ['Spanish', 'English'],
    seniorityDate: '2017-02-28',
    status: 'sick',
    reason: 'Called in sick at 05:30',
    scheduledFlight: 'CM417',
    segments: []
  },
  {
    id: 'FA003',
    name: 'FA Carmen Diaz',
    role: 'Flight Attendant',
    base: 'PTY',
    certifications: ['B737-800', 'B737 MAX 9'],
    languages: ['Spanish', 'English', 'French'],
    seniorityDate: '2016-11-15',
    status: 'legal',
    currentFlight: 'CM801',
    dutyRemaining: '8h 20m',
    dutyStart: '06:30',
    segments: [
      { flight: 'CM801', start: '08:45', end: '12:30', status: 'legal', route: 'PTY-LIM' }
    ]
  },
  {
    id: 'FA004',
    name: 'FA Miguel Vargas',
    role: 'Flight Attendant',
    base: 'PTY',
    certifications: ['B737-800'],
    languages: ['Spanish', 'English'],
    seniorityDate: '2018-06-05',
    status: 'reserve',
    dutyRemaining: '11h 00m',
    location: 'Home - On Call',
    responseTime: 90,
    segments: []
  },
  {
    id: 'FA005',
    name: 'FA Gabriela Ortiz',
    role: 'Lead Flight Attendant',
    base: 'PTY',
    certifications: ['B737-800', 'B737 MAX 9', 'Emergency Medical'],
    languages: ['Spanish', 'English'],
    seniorityDate: '2014-09-20',
    status: 'legal',
    currentFlight: 'CM487',
    dutyRemaining: '7h 15m',
    dutyStart: '13:00',
    segments: [
      { flight: 'CM487', start: '15:30', end: '18:00', status: 'warning', route: 'PTY-BOG' }
    ]
  },
  {
    id: 'FA006',
    name: 'FA Andrea Lopez',
    role: 'Flight Attendant',
    base: 'PTY',
    certifications: ['B737 MAX 9'],
    languages: ['Spanish', 'English', 'Italian'],
    seniorityDate: '2019-12-01',
    status: 'reserve',
    dutyRemaining: '12h 00m',
    location: 'PTY Airport - Reserve Room',
    responseTime: 20,
    segments: []
  }
];

// Crew qualifications matrix
export const qualifications = {
  'B737-800': ['CM001', 'CM007', 'CM013', 'CM019', 'CM002', 'CM003', 'CM004', 'CM008', 'CM020', 'FA001', 'FA002', 'FA003', 'FA004', 'FA005'],
  'B737 MAX 9': ['CM001', 'CM007', 'CM013', 'CM003', 'CM008', 'CM014', 'CM020', 'FA001', 'FA002', 'FA003', 'FA005', 'FA006'],
  'Emergency Medical': ['FA001', 'FA003', 'FA005'],
  'Portuguese': ['CM001', 'CM007', 'CM003', 'FA001'],
  'French': ['FA003']
};

// Crew duty regulations (SIELAS union agreement)
export const dutyRegulations = {
  maxDutyTime: { hours: 14, minutes: 0 },
  minRestTime: { hours: 10, minutes: 0 },
  maxFlightTime: { hours: 9, minutes: 0 },
  maxSectorsPerDay: 4,
  fatigueRiskThreshold: { hours: 11, minutes: 0 }
};
