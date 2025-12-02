export const costOptions = [
  {
    id: 1,
    label: 'F/O Santos (Reserve)',
    cost: 0,
    time: 12,
    risk: 'low',
    recommended: true,
    breakdown: [
      { component: 'Reserve Activation', cost: 0, notes: 'Already on reserve pay' },
      { component: 'Crew Transport', cost: 0, notes: 'At PTY airport' },
      { component: 'Delay Impact', cost: 0, notes: 'No delay' },
      { component: 'Passenger Impact', cost: 0, notes: 'No rebooking' }
    ]
  },
  {
    id: 2,
    label: 'F/O Moreno (Inbound CM 892)',
    cost: 450,
    time: 22,
    risk: 'medium',
    breakdown: [
      { component: 'Standby Extension', cost: 200, notes: 'Duty extension premium' },
      { component: 'Crew Meals', cost: 50, notes: 'Extended duty allowance' },
      { component: 'Connection Risk', cost: 200, notes: 'Buffer time reduced' }
    ]
  },
  {
    id: 3,
    label: 'Crew Swap with CM 487',
    cost: 2100,
    time: 35,
    risk: 'medium',
    breakdown: [
      { component: 'CM 487 Delay (35 min)', cost: 1200, notes: 'Bogotá departure delayed' },
      { component: 'Passenger Rebooking', cost: 600, notes: '12 missed connections' },
      { component: 'Ground Transport', cost: 300, notes: 'Crew taxi between gates' }
    ]
  }
];
