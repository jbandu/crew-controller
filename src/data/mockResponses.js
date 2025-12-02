/**
 * Mock AI responses for when Anthropic API is unavailable
 * These provide realistic demo functionality
 */

export const mockResponses = {
  cancelFlight: (flightNumber) => ({
    type: 'ai-analysis',
    content: `**🔵 Demo Response - Flight Cancellation Analysis**

Analyzing cancellation impact for ${flightNumber}...

**Immediate Impact:**
• 142 passengers affected (78% connecting)
• 4 crew members released to reserve pool
• Aircraft freed for reassignment

**Downstream Effects:**
• 3 connection complexes affected (MIA, LAX, BOG)
• 11 passengers will misconnect - alternative routings identified
• Expected delay cascade: 15-45 minutes on 2 subsequent flights

**Reserve Crew Availability:**
• FAs: 3 qualified reserves at PTY (response time: 45 min)
• Pilots: 2 qualified sets available
• No compliance issues with standby assignments

**Recommended Actions:**
1. **HIGH PRIORITY**: Notify pax within 10 min - offer rebooking
2. **MEDIUM**: Reassign aircraft to CM 451 (currently delayed for mx)
3. **LOW**: Update crew scheduling system for released crew

**Cost Estimate:** $18,500 (rebooking + comp + ops)

---
*This is a simulated response using demo data. Enable Anthropic API for live analysis.*`,
    visualization: 'ResolutionPreview'
  }),

  compareDays: () => ({
    type: 'ai-analysis',
    content: `**🔵 Demo Response - Operations Comparison**

**Today (Dec 1) vs Last Tuesday (Nov 24)**

**On-Time Performance:**
• Today: 94.2% (17/18 flights on time)
• Nov 24: 91.7% (22/24 flights on time)
• Improvement: +2.5 percentage points

**Crew Duty Status:**
• Today: 4 crew in critical status (>12h duty)
• Nov 24: 7 crew in critical status
• Improvement: 43% reduction

**Weather Impact:**
• Today: 2 stations with weather (MIA thunderstorms, BOG fog)
• Nov 24: 5 stations affected (Caribbean system)
• Improvement: Significantly better conditions

**Reserve Utilization:**
• Today: 3/24 reserves activated (12.5%)
• Nov 24: 8/24 reserves activated (33.3%)
• Improvement: Lower operational stress

**Key Insights:**
- Better weather driving improved OTP
- Proactive crew management reducing duty limit pressures
- More efficient reserve utilization

---
*This is a simulated response using demo data. Enable Anthropic API for live analysis.*`,
    visualization: 'OperationsOverview'
  }),

  bestReserve: () => ({
    type: 'ai-analysis',
    content: `**🔵 Demo Response - Reserve Crew Analysis**

**Top Reserve Recommendation: Captain María Rodriguez**

**Qualifications:**
• Aircraft: 737-800, 737 MAX 9 ✓
• International routes: Certified ✓
• PTY-based: Yes ✓
• Response time: 35 minutes

**Availability Factors:**
• Duty hours remaining today: 9.5 hours
• Rest compliance: Met (11h rest completed)
• Recent utilization: Low (2 activations this month)
• Performance rating: 4.8/5.0

**Alternative Options:**
2. **FO Carlos Mendez** - 45 min response, MAX 9 only, 8.2h remaining
3. **Captain Ana Silva** - 50 min response, both types, 7.8h remaining

**Recommendation Reasoning:**
Rodriguez offers the best combination of quick response time, dual aircraft qualification, and ample duty hours remaining. Her low recent utilization means she's well-rested and likely available.

**Next Steps:**
1. Contact via crew scheduling app (fastest)
2. Confirm availability and position
3. Brief on assignment details
4. Monitor check-in time

---
*This is a simulated response using demo data. Enable Anthropic API for live analysis.*`,
    visualization: 'OperationsOverview'
  }),

  fatigueRisk: () => ({
    type: 'ai-analysis',
    content: `**🔵 Demo Response - Fatigue Risk Analysis (Next 6 Hours)**

**HIGH RISK (Action Required):**
• **CM 208 Crew (PTY-MIA)** - Currently at 11.2h duty
  - Will reach 13.5h by scheduled arrival
  - Risk: Weather delays could push >14h limit
  - **ACTION**: Position backup crew, monitor closely

• **CM 451 Crew (PTY-BOG)** - Currently at 10.8h duty
  - Approaching FDP limit with tight connection
  - Risk: Any delay triggers illegality
  - **ACTION**: Consider reserve crew swap

**MEDIUM RISK (Monitor):**
• CM 312 Crew - At 9.5h duty, should complete within limits
• CM 187 Crew - At 9.1h duty, weather-dependent

**LOW RISK:**
• 14 other crews operating well within compliance
• Average duty time: 6.2 hours

**Weather Factors:**
• MIA: Thunderstorms clearing in 2h (affects CM 208)
• BOG: Fog dissipating (affects CM 451)

**Recommended Actions:**
1. **IMMEDIATE**: Alert CM 208/451 crews - prepare for possible relief
2. **30 MIN**: Position 2 reserve crews on standby
3. **60 MIN**: Recheck weather forecasts, update risk assessment

---
*This is a simulated response using demo data. Enable Anthropic API for live analysis.*`,
    visualization: 'GanttTimeline'
  })
};

/**
 * Get mock response based on user input
 */
export const getMockResponse = (input) => {
  const lowerInput = input.toLowerCase();

  // Flight cancellation
  if (lowerInput.includes('cancel') && (lowerInput.includes('cm ') || lowerInput.includes('flight'))) {
    const flightMatch = input.match(/cm\s*\d+/i);
    const flightNumber = flightMatch ? flightMatch[0].toUpperCase() : 'CM 208';
    return mockResponses.cancelFlight(flightNumber);
  }

  // Compare days/operations
  if (lowerInput.includes('compare') && (lowerInput.includes('today') || lowerInput.includes('tuesday') || lowerInput.includes('day'))) {
    return mockResponses.compareDays();
  }

  // Best reserve
  if ((lowerInput.includes('best') || lowerInput.includes('who')) && lowerInput.includes('reserve')) {
    return mockResponses.bestReserve();
  }

  // Fatigue risk
  if (lowerInput.includes('fatigue') || (lowerInput.includes('crew') && lowerInput.includes('risk'))) {
    return mockResponses.fatigueRisk();
  }

  // Generic fallback
  return {
    type: 'ai-analysis',
    content: `**🔵 Demo Response**

Analyzing your request: "${input}"

This is a simulated response. The system would normally:
- Analyze current crew scheduling data
- Check FAA/SIELAS compliance requirements
- Evaluate operational costs and impacts
- Provide 2-3 ranked solution options
- Include timeline and next steps

**To enable live AI responses:**
1. Add your Anthropic API key to settings
2. Ask questions about Copa Airlines operations
3. Get real-time analysis powered by Claude

---
*This is a simulated response using demo data. Enable Anthropic API for live analysis.*`,
    visualization: 'OperationsOverview'
  };
};
