export const shiftReportData = {
  controller: 'Ilango',
  date: 'December 1, 2025',
  shift: { start: '06:00', end: '14:00', label: 'Day Shift' },
  score: 87,

  metrics: [
    { icon: '⚡', value: '23 min', label: 'Avg Response', subtext: 'vs 45 min target', trend: -49 },
    { icon: '💰', value: '$127K', label: 'Cost Avoided', subtext: null },
    { icon: '✓', value: '4', label: 'Decisions', subtext: '0 escalations' },
    { icon: '🤖', value: '83%', label: 'AI Alignment', subtext: '5/6 accepted' }
  ],

  learningMoment: {
    flight: 'CM 801',
    humanAction: 'chose crew with Lima familiarity over my suggestion',
    result: 'saved 12 minutes on turnaround',
    aiFeedback: "I've updated my model. Future Lima operations will weight station experience more heavily."
  },

  achievements: [
    { icon: '🏆', label: 'Zero Escalations', detail: '5 shifts in a row' },
    { icon: '⚡', label: 'Speed Demon', detail: 'All resolutions under 30 min' }
  ],

  handoff: {
    incoming: { name: 'Maria', shift: '14:00 - 22:00' },
    openItems: [
      {
        type: 'monitor',
        flight: 'CM 487',
        route: 'PTY → BOG',
        issue: 'BOG afternoon thunderstorms',
        actionTaken: 'Reserve Moreno on standby',
        decisionPoint: '15:30',
        instruction: 'If no improvement by 15:30, activate Moreno'
      }
    ],
    watchItems: [
      { type: 'action', label: 'BOG Weather', detail: 'Consider pre-positioning reserve', due: '15:00' },
      { type: 'fyi', label: 'F/O Vega', detail: 'Available tomorrow 05:00 LIM' }
    ],
    resolvedItems: [
      { flight: 'CM 208', action: 'Crew reassignment (Santos)', time: '09:02' },
      { flight: 'CM 135', action: 'Proactive reposition', time: '10:15' },
      { flight: 'CM 801', action: 'Schedule adjustment', time: '11:30' }
    ]
  }
};
