import { alerts } from './alertData';

export const demoMessages = {
  greeting: {
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

  weatherResponse: {
    type: 'ai-analysis',
    content: `Panama weather is deteriorating. Thunderstorms expected 14:00-18:00.

**If conditions worsen:**
• 23 flights at risk
• 67 crew affected
• $340K potential exposure

**Most vulnerable:** CM 208 (GRU)
F/O Vega hits duty limit if delayed >45 min.

**Recommendation:** Pre-position reserve at PTY now.
F/O Santos is available (10h remaining).`,
    visualization: 'WeatherExposure',
    actions: ['Pre-position Santos', 'Show alternatives']
  },

  disruptionAlert: {
    type: 'ai-alert',
    severity: 'critical',
    title: 'CM 208 Crew Issue',
    content: `Flight delayed 90 min (weather hold at PTY).
F/O Alejandra Vega duty expires at 14:30.
Revised departure 14:15 — **she will be illegal by landing.**

3 resolution options:`,
    visualization: 'GanttTimeline',
    options: alerts[0].options
  },

  resolution: {
    type: 'ai-confirmation',
    content: `Assigning F/O Ricardo Santos to CM 208.

✓ Crew roster updated
✓ Santos notified via CrewApp
✓ Dispatch notified
✓ SIELAS §14.3 compliance logged

Awaiting Santos confirmation...

---

✓ **Santos confirmed.** CM 208 assignment accepted.

F/O Vega released — duty preserved for tomorrow's 05:00 Lima departure.

**Cascade impact:** 3 downstream risks eliminated.
• CM 892 buffer restored
• CM 156 connection secured
• CM 801 crew swap avoided

Next: CM 487 has 62% weather risk.`,
    visualization: 'ResolutionPreview',
    actions: ['Show CM 487', 'Monitor for now']
  },

  shiftEnd: {
    type: 'ai-analysis',
    content: `Your shift ends in 15 minutes. Ready to prepare handoff for Maria?`,
    visualization: 'ShiftReport',
    actions: ['Start Handoff Prep', 'Snooze 10 min']
  }
};
