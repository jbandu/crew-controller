// Multiple IROPS scenarios for realistic demo
export const scenarios = [
  // Scenario 1: Weather Delay + Crew Legality (Original)
  {
    id: 'SCENARIO_001',
    type: 'weather_crew_legality',
    title: 'CM 208 Weather Delay - Crew Legality Issue',
    flight: 'CM208',
    trigger: 'Weather hold at PTY causing 90-minute delay',
    primaryIssue: 'F/O Vega will exceed duty time limits',
    cascadeRisk: 'high',
    affectedFlights: ['CM208', 'CM892', 'CM156'],
    affectedCrew: ['CM002'],
    timeToDecision: '45 min',
    options: [
      {
        id: 1,
        label: 'F/O Ricardo Santos (Reserve)',
        detail: 'At PTY airport • 12-min report time',
        cost: '$0',
        impact: 'None',
        actionLabel: 'Assign Santos',
        recommended: true,
        compliance: 'SIELAS §14.3',
        executionTime: 12
      },
      {
        id: 2,
        label: 'F/O Moreno (Inbound CM 892)',
        detail: 'Landing in 22 min • Needs confirmation',
        cost: '$0',
        impact: 'Requires crew confirmation',
        actionLabel: 'Message Crew',
        recommended: false,
        compliance: 'SIELAS §14.3',
        executionTime: 22
      },
      {
        id: 3,
        label: 'Crew Swap with CM 487',
        detail: 'Delays Bogotá flight 35 min',
        cost: '$2.1K',
        impact: 'Both flights complete',
        actionLabel: 'View Details',
        recommended: false,
        compliance: 'SIELAS §14.3, §18.7',
        executionTime: 45
      }
    ]
  },

  // Scenario 2: Sick Crew - Last Minute Callout
  {
    id: 'SCENARIO_002',
    type: 'sick_crew',
    title: 'CM 417 Sick Crew Callout',
    flight: 'CM417',
    trigger: 'FA Luis Castillo called in sick at 05:30',
    primaryIssue: 'Flight attendant shortage - minimum crew not met',
    cascadeRisk: 'medium',
    affectedFlights: ['CM417'],
    affectedCrew: ['FA002'],
    timeToDecision: '30 min',
    departureTime: '06:15',
    options: [
      {
        id: 1,
        label: 'FA Andrea Lopez (Reserve)',
        detail: 'At PTY airport • 20-min report time',
        cost: '$0',
        impact: 'On-time departure achievable',
        actionLabel: 'Assign Lopez',
        recommended: true,
        compliance: 'FAR 121.391',
        executionTime: 20
      },
      {
        id: 2,
        label: 'FA Miguel Vargas (Home Reserve)',
        detail: 'At home • 90-min commute to airport',
        cost: '$0',
        impact: '70-minute delay',
        actionLabel: 'Call Vargas',
        recommended: false,
        compliance: 'FAR 121.391',
        executionTime: 90
      },
      {
        id: 3,
        label: 'Delay Flight Until Next Shift',
        detail: 'Delays flight 4 hours',
        cost: '$8.2K',
        impact: '154 PAX rebooking + compensation',
        actionLabel: 'Delay Flight',
        recommended: false,
        compliance: 'N/A',
        executionTime: 0
      }
    ]
  },

  // Scenario 3: Mechanical Issue - Aircraft Swap
  {
    id: 'SCENARIO_003',
    type: 'mechanical_aircraft_swap',
    title: 'CM 674 Mechanical Issue - Engine Fault',
    flight: 'CM674',
    trigger: 'Engine #2 fault light - HP-1838CMP grounded',
    primaryIssue: 'Aircraft requires maintenance, need replacement aircraft',
    cascadeRisk: 'high',
    affectedFlights: ['CM674', 'CM523', 'CM762'],
    affectedCrew: ['CM014'],
    timeToDecision: '60 min',
    departureTime: '12:30',
    options: [
      {
        id: 1,
        label: 'Swap with CM 523 Aircraft (HP-1847CMP)',
        detail: 'Delays CM 674 by 45 min, CM 523 by 90 min',
        cost: '$4.5K',
        impact: 'Both flights complete today',
        actionLabel: 'Aircraft Swap',
        recommended: true,
        compliance: 'FAA airworthiness',
        executionTime: 45
      },
      {
        id: 2,
        label: 'Use Reserve Aircraft (HP-1860CMP)',
        detail: 'Currently undergoing scheduled maintenance',
        cost: '$12K',
        impact: 'Rush maintenance completion',
        actionLabel: 'Expedite Maintenance',
        recommended: false,
        compliance: 'FAA maintenance requirements',
        executionTime: 180
      },
      {
        id: 3,
        label: 'Cancel CM 674',
        detail: 'Rebook 170 passengers on partner airlines',
        cost: '$28K',
        impact: 'Crew available for CM 523',
        actionLabel: 'Cancel Flight',
        recommended: false,
        compliance: 'DOT 14 CFR Part 259',
        executionTime: 0
      }
    ]
  },

  // Scenario 4: Crew Rest Violation - Incoming Flight Delayed
  {
    id: 'SCENARIO_004',
    type: 'rest_violation',
    title: 'CM 225 Crew Rest Shortfall',
    flight: 'CM225',
    trigger: 'Crew inbound CM 892 delayed - insufficient rest before next duty',
    primaryIssue: 'Capt. Martinez will not meet 10-hour rest requirement',
    cascadeRisk: 'medium',
    affectedFlights: ['CM225', 'CM892'],
    affectedCrew: ['CM007'],
    timeToDecision: '90 min',
    departureTime: '11:00',
    options: [
      {
        id: 1,
        label: 'Delay CM 225 by 2 hours',
        detail: 'Ensures full 10-hour rest period',
        cost: '$3.2K',
        impact: 'MDE connections affected',
        actionLabel: 'Delay Flight',
        recommended: true,
        compliance: 'SIELAS §12.1, FAR 117.25',
        executionTime: 0
      },
      {
        id: 2,
        label: 'Assign Reserve Captain',
        detail: 'Capt. Silva available after CM 801',
        cost: '$0',
        impact: 'Requires Silva MAX 9 checkout',
        actionLabel: 'Assign Silva',
        recommended: false,
        compliance: 'SIELAS §14.3',
        executionTime: 45
      },
      {
        id: 3,
        label: 'Merge with Later Flight',
        detail: 'Combine with CM 445 evening departure',
        cost: '$6.8K',
        impact: 'Larger aircraft needed',
        actionLabel: 'Merge Flights',
        recommended: false,
        compliance: 'Multiple regulations',
        executionTime: 120
      }
    ]
  },

  // Scenario 5: Cascade Event - Domino Effect
  {
    id: 'SCENARIO_005',
    type: 'cascade_event',
    title: 'Morning Bank Cascade - Multiple Flight Delays',
    flight: 'Multiple',
    trigger: 'PTY runway closure 06:00-08:30 due to emergency landing',
    primaryIssue: '8 flights delayed, crew legality and connections at risk',
    cascadeRisk: 'critical',
    affectedFlights: ['CM417', 'CM892', 'CM135', 'CM208', 'CM801', 'CM312', 'CM225', 'CM156'],
    affectedCrew: ['CM002', 'CM004', 'CM019', 'FA002', 'FA003'],
    timeToDecision: '15 min',
    options: [
      {
        id: 1,
        label: 'Activate Full Reserve Pool',
        detail: 'Call in all 6 reserve crew members',
        cost: '$0',
        impact: 'Minimize delays, preserve connections',
        actionLabel: 'Activate Reserves',
        recommended: true,
        compliance: 'Emergency operations protocol',
        executionTime: 30
      },
      {
        id: 2,
        label: 'Strategic Flight Cancellations',
        detail: 'Cancel 2 flights, consolidate passengers',
        cost: '$45K',
        impact: 'Remaining flights on-time',
        actionLabel: 'Cancel & Consolidate',
        recommended: false,
        compliance: 'DOT regulations',
        executionTime: 60
      },
      {
        id: 3,
        label: 'Accept Delays - Monitor',
        detail: 'Let delays cascade, intervene selectively',
        cost: '$15K',
        impact: 'High passenger dissatisfaction',
        actionLabel: 'Monitor Only',
        recommended: false,
        compliance: 'N/A',
        executionTime: 0
      }
    ]
  },

  // Scenario 6: International Crew Issue - Visa Problem
  {
    id: 'SCENARIO_006',
    type: 'documentation_issue',
    title: 'CM 391 JFK Flight - Crew Documentation Issue',
    flight: 'CM391',
    trigger: 'F/O Ramirez US visa expired - discovered at security',
    primaryIssue: 'Cannot operate international flight without valid documentation',
    cascadeRisk: 'low',
    affectedFlights: ['CM391'],
    affectedCrew: ['CM014'],
    timeToDecision: '45 min',
    departureTime: '15:00',
    options: [
      {
        id: 1,
        label: 'F/O Isabella Torres (Reserve)',
        detail: 'Valid US visa • At airport • 15-min report',
        cost: '$0',
        impact: 'Minimal delay',
        actionLabel: 'Assign Torres',
        recommended: true,
        compliance: 'CBP/TSA requirements',
        executionTime: 15
      },
      {
        id: 2,
        label: 'Emergency Visa Processing',
        detail: 'Contact embassy for emergency clearance',
        cost: '$2.5K',
        impact: '3-hour delay minimum',
        actionLabel: 'Emergency Processing',
        recommended: false,
        compliance: 'US visa regulations',
        executionTime: 180
      },
      {
        id: 3,
        label: 'Delay Until Tomorrow',
        detail: 'Process visa overnight, depart next day',
        cost: '$32K',
        impact: 'Hotel + compensation for 174 PAX',
        actionLabel: 'Delay 24 Hours',
        recommended: false,
        compliance: 'EU 261 equivalent',
        executionTime: 0
      }
    ]
  }
];

// Scenario triggers and conditions
export const scenarioTriggers = {
  timeOfDay: {
    morning: ['SCENARIO_002', 'SCENARIO_005'],
    midday: ['SCENARIO_001', 'SCENARIO_003'],
    afternoon: ['SCENARIO_004', 'SCENARIO_006'],
    evening: ['SCENARIO_001', 'SCENARIO_003']
  },
  weather: ['SCENARIO_001', 'SCENARIO_005'],
  mechanical: ['SCENARIO_003'],
  crew: ['SCENARIO_002', 'SCENARIO_004', 'SCENARIO_006'],
  cascade: ['SCENARIO_005']
};
