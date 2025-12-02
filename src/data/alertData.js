export const alerts = [
  {
    id: 'ALERT001',
    type: 'critical',
    title: 'CM 208 Crew Issue',
    flight: 'CM 208',
    route: 'PTY → GRU',
    issue: 'F/O Vega duty expires at 14:30. Flight delayed 90 min — she will be illegal by landing.',
    delayMinutes: 90,
    delayReason: 'Weather hold at PTY',
    crewAffected: 'CM002',
    timeToDecision: '45 min',
    options: [
      {
        id: 1,
        label: 'F/O Ricardo Santos (Reserve)',
        detail: 'At PTY airport • 12-min report time',
        cost: '$0',
        impact: 'None',
        actionLabel: 'Assign Santos',
        recommended: true
      },
      {
        id: 2,
        label: 'F/O Moreno (Inbound CM 892)',
        detail: 'Landing in 22 min • Needs confirmation',
        cost: '$0',
        impact: 'Requires crew confirmation',
        actionLabel: 'Message Crew',
        recommended: false
      },
      {
        id: 3,
        label: 'Crew Swap with CM 487',
        detail: 'Delays Bogotá flight 35 min',
        cost: '$2.1K',
        impact: 'Both flights complete',
        actionLabel: 'View Details',
        recommended: false
      }
    ]
  }
];
