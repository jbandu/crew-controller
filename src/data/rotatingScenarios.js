import { scenarios } from './scenariosData';

// Scene 1: Shift Start Greetings (Multiple variations)
export const shiftStartScenarios = [
  // Variation 1: Standard Morning Briefing
  {
    type: 'ai-greeting',
    content: `Good morning, Ilango.

**Overnight summary:**
• 2 delays resolved (CM 892, CM 156)
• No escalations
• Fleet positioned per plan

**Today's Watchlist:**
1. CM 208 Crew Legality (high risk)
2. CM 487 BOG Weather (afternoon)
3. CM 135 Connection buffer (tight)
4. CM 801 Crew fatigue (monitor)

4 situations flagged. How can I help?`,
    visualization: 'OperationsOverview'
  },

  // Variation 2: Weather-Heavy Morning
  {
    type: 'ai-greeting',
    content: `Good morning, Ilango.

**Overnight summary:**
• Thunderstorms at BOG, MIA delayed 3 flights
• 1 crew swap completed (CM 225)
• Aircraft HP-1847CMP had minor maintenance

**Today's Weather Watch:**
1. BOG: 75% chance storms 14:00-18:00
2. MEX: Crosswinds 25kt peak (afternoon)
3. PTY: Scattered storms developing
4. GRU: Clear conditions

**High Priority:**
• CM 487, CM 523: Weather exposure
• 4 reserve crew on standby

Weather looks challenging. What's your priority?`,
    visualization: 'NetworkMap',
    data: { weatherOverlay: true }
  },

  // Variation 3: Crew-Focused Briefing
  {
    type: 'ai-greeting',
    content: `Good morning, Ilango.

**Overnight summary:**
• All flights departed on-time
• Reserve crew utilization: 0%
• Clean handoff from night controller

**Crew Status Alert:**
1. F/O Vega: 2h 45m duty remaining (critical)
2. Capt. Martinez: Rest violation risk (CM 225)
3. FA Castillo: Called in sick this morning
4. 3 crew approaching FAR limits today

**Reserve Coverage:**
• 2 Captains, 2 F/Os, 3 FAs available
• All current at PTY

Crew legality is tight today. Ready to begin?`,
    visualization: 'GanttTimeline',
    data: { nowTime: '08:00' }
  },

  // Variation 4: Network Operations View
  {
    type: 'ai-greeting',
    content: `Good morning, Ilango.

**Overnight summary:**
• Network completion: 98.7%
• 1 diversion (CM 762 to SJO - medical)
• Aircraft utilization: optimal

**Copa Network Status:**
• 82 flights scheduled today
• 18 aircraft in rotation
• 15 destinations active
• Morning bank: 8 departures 06:00-09:00

**Watch Items:**
1. CM 208 weather/crew risk
2. CM 391 JFK crew documentation
3. CM 674 maintenance inspection due

Network looks healthy. Where should we focus?`,
    visualization: 'NetworkMap',
    data: { weatherOverlay: false }
  },

  // Variation 5: High-Alert Morning
  {
    type: 'ai-greeting',
    content: `Good morning, Ilango.

**⚠️ PRIORITY ALERTS:**

**CRITICAL:**
• PTY runway closure 06:00-08:30 (emergency landing)
• 8 flights delayed, cascade risk HIGH

**URGENT:**
• CM 417: FA callout, minimum crew not met
• CM 674: Engine fault, aircraft grounded
• Multiple crew approaching duty limits

**Status:**
• 6 reserve crew activated
• Dispatch monitoring weather (BOG, MIA)
• Management notified

This is going to be a challenging morning. Ready?`,
    visualization: 'OperationsOverview'
  }
];

// Scene 3: Disruption Alerts (Using existing scenarios)
// Maps the 6 scenarios to disruption alert format
export const getDisruptionAlert = (scenarioIndex) => {
  const scenario = scenarios[scenarioIndex];

  // Format options text
  const optionsText = scenario.options.length > 0
    ? `\n\n**${scenario.options.length} resolution options:**`
    : '';

  return {
    type: 'ai-alert',
    severity: scenario.cascadeRisk === 'critical' ? 'critical' :
              scenario.cascadeRisk === 'high' ? 'critical' : 'warning',
    title: scenario.title,
    content: `${scenario.trigger}

**Issue:** ${scenario.primaryIssue}

**Cascade Risk:** ${scenario.cascadeRisk.toUpperCase()}
**Time to decision:** ${scenario.timeToDecision}
**Affected flights:** ${scenario.affectedFlights.join(', ')}${optionsText}`,
    visualization: scenario.type === 'cascade_event' ? 'NetworkMap' : 'GanttTimeline',
    data: scenario.type === 'cascade_event' ? { weatherOverlay: true } : { nowTime: '12:00' },
    options: scenario.options,
    scenarioData: scenario
  };
};

// Scene 5: Shift End Reports (Multiple variations)
export const shiftEndScenarios = [
  // Variation 1: Clean Shift
  {
    type: 'ai-analysis',
    content: `Your shift ends in 15 minutes. Ready to prepare handoff for Maria?

**Shift Performance Summary:**
• 18 flights monitored
• 2 disruptions resolved
• 0 cancellations
• Network completion: 100%

**Actions Taken:**
✓ CM 208: Crew swap (Santos assigned)
✓ CM 417: Reserve FA activated
✓ Weather monitoring: All clear

**For Maria's Shift:**
• CM 487 BOG: Monitor afternoon weather
• CM 225: Crew rest tracking
• All reserve crew released

Handoff briefing ready when you are.`,
    visualization: 'ShiftReport',
    actions: ['Start Handoff Prep', 'Snooze 10 min']
  },

  // Variation 2: Challenging Shift
  {
    type: 'ai-analysis',
    content: `Your shift ends in 15 minutes. It's been a challenging day.

**Shift Performance:**
• 18 flights monitored
• 5 disruptions managed
• 1 flight cancelled (CM 674)
• Network completion: 94.4%

**Major Events:**
✗ CM 674: Engine fault, aircraft grounded
✓ CM 208: Weather delay + crew swap
✓ CM 417: Sick crew replacement
✓ CM 391: Documentation issue resolved
⚠ CM 523: Delayed 90 min (aircraft swap)

**Outstanding Issues:**
• HP-1838CMP in maintenance (ETA 18:00)
• CM 523 passengers rebooking in progress
• 2 crew duty time reports pending

Maria needs a detailed briefing. Ready to prep handoff?`,
    visualization: 'ShiftReport',
    actions: ['Start Handoff Prep', 'Review Details']
  },

  // Variation 3: Crisis Management Shift
  {
    type: 'ai-analysis',
    content: `Your shift ends in 15 minutes. Outstanding work managing the morning crisis.

**Crisis Summary:**
⚠ PTY runway closure 06:00-08:30
• 8 flights delayed (morning bank)
• 6 reserve crew activated
• Network recovery completed by 10:30

**Resolution Actions:**
✓ Full reserve pool activated
✓ Crew legality maintained (0 violations)
✓ All connections recovered
✓ Passenger communications sent

**Final Status:**
• Network back to normal operations
• 2 crew on extended duty (logged)
• Management commendation received
• Cost impact: $15K (within tolerance)

Excellent crisis management, Ilango. Ready for handoff?`,
    visualization: 'NetworkMap',
    data: { weatherOverlay: false },
    actions: ['Start Handoff Prep', 'View Metrics']
  },

  // Variation 4: Weather-Heavy Shift
  {
    type: 'ai-analysis',
    content: `Your shift ends in 15 minutes. Weather made this a tough day.

**Weather Impact Summary:**
🌩 BOG: Thunderstorms delayed 4 flights
🌩 MEX: Crosswinds caused 2 diversions
🌩 PTY: Scattered storms, holding pattern
☀️ Other stations: Normal operations

**Weather-Related Actions:**
✓ 6 flights delayed (avg 47 minutes)
✓ 2 diversions to SJO, managed safely
✓ 4 crew swaps to maintain legality
✓ Reserve crew pre-positioned

**Evening Forecast:**
• Weather clearing at all stations
• Normal operations expected tonight
• No crew legality concerns

Maria's shift should be smoother. Ready to brief her?`,
    visualization: 'LiveWeatherExposure',
    actions: ['Start Handoff Prep', 'Weather Update']
  },

  // Variation 5: Record Performance Shift
  {
    type: 'ai-analysis',
    content: `Your shift ends in 15 minutes. Exceptional performance today!

**Achievement Summary:**
🏆 100% on-time departure rate
🏆 0 disruptions, 0 delays
🏆 Perfect crew legality compliance
🏆 Best shift performance this month

**Operations Highlights:**
• 18 flights: All departed on schedule
• 82 crew members: No issues
• 18 aircraft: Optimal utilization
• Weather: Favorable all stations

**Proactive Actions:**
✓ Pre-positioned crew for afternoon risk
✓ Weather monitoring (no events)
✓ Maintenance coordination (routine)
✓ Zero escalations to management

Outstanding work! Ready to hand off to Maria?`,
    visualization: 'ShiftReport',
    actions: ['Start Handoff Prep', 'View Certificate']
  }
];

// Helper function to get random scenario from array
export const getRandomScenario = (scenarioArray) => {
  const index = Math.floor(Math.random() * scenarioArray.length);
  return scenarioArray[index];
};

// Helper function to get random disruption (Scene 3)
export const getRandomDisruption = () => {
  const scenarioIndex = Math.floor(Math.random() * scenarios.length);
  return getDisruptionAlert(scenarioIndex);
};
