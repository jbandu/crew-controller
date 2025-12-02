import Anthropic from '@anthropic-ai/sdk';
import { crewMembers } from '../data/crewData';
import { flights } from '../data/flightData';

// Initialize Anthropic client
const initClient = (apiKey) => {
  if (!apiKey) {
    console.warn('No Anthropic API key provided');
    return null;
  }
  return new Anthropic({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true // Note: In production, use a backend proxy
  });
};

// System prompt that gives Claude context about being a crew controller AI
const SYSTEM_PROMPT = `You are an AI assistant for Copa Airlines crew controllers. You help manage airline crew assignments, handle disruptions, and ensure regulatory compliance.

Your role:
- Analyze crew scheduling and duty time situations
- Identify potential legality issues before they become critical
- Suggest solutions that comply with SIELAS union agreement and FAA regulations
- Consider operational costs, passenger impact, and crew welfare
- Provide clear, actionable recommendations
- Answer operational questions about Copa's network, routes, and destinations

Key regulations:
- Maximum duty time: 14 hours
- Minimum rest: 10 hours
- Maximum flight time: 9 hours per day
- Crew must be certified for aircraft type

Copa Airlines Network:
- HUB: PTY (Tocumen International Airport, Panama City, Panama) - "Hub of the Americas"
- NETWORK MODEL: Hub-and-spoke with all flights connecting through PTY
- DESTINATIONS: 80+ destinations across 30+ countries in the Americas
- FLEET: Boeing 737-800, 737 MAX 9
- FLIGHT NUMBERS: CM prefix (e.g., CM 208, CM 451)
- UNION: SIELAS

Key Destinations by Region:
- NORTH AMERICA (28): Miami (MIA), New York JFK, Los Angeles (LAX), San Francisco (SFO), Chicago O'Hare (ORD), Boston (BOS), Washington IAD, Las Vegas (LAS), Orlando (MCO), Fort Lauderdale (FLL), Denver (DEN), Austin (AUS), San Antonio (SAT), Houston IAH, Dallas DFW, Montreal (YUL), Toronto (YYZ), Mexico City (MEX), Guadalajara (GDL), Monterrey (MTY), Cancún (CUN), etc.
- CENTRAL AMERICA (10): San José (SJO), Guatemala City (GUA), San Salvador (SAL), Tegucigalpa (TGU), San Pedro Sula (SAP), Managua (MGA), Liberia (LIR), Belize City (BZE)
- SOUTH AMERICA (44): Bogotá (BOG), Medellín (MDE), Cali (CLO), Barranquilla (BAQ), Cartagena (CTG), Lima (LIM), Cusco (CUZ), Arequipa (AQP), Quito (UIO), Guayaquil (GYE), Santiago (SCL), Buenos Aires (EZE), Córdoba (COR), Mendoza (MDZ), São Paulo (GRU), Rio (GIG), Brasília (BSB), Belo Horizonte (CNF), Recife (REC), Fortaleza (FOR), Salvador (SSA), Curitiba (CWB), Porto Alegre (POA), Montevideo (MVD), Asunción (ASU), La Paz (LPB), Santa Cruz (VVI), Caracas (CCS), Maracaibo (MAR), Valencia (VLN), Barquisimeto (BRM), Salta (SLA), Tucumán (TUC), etc.
- CARIBBEAN (15): Havana (HAV), San Juan (SJU), Santo Domingo (SDQ), Punta Cana (PUJ), Santiago de los Caballeros (STI), Puerto Plata (POP), Kingston (KIN), Montego Bay (MBJ), Bridgetown (BGI), Port of Spain (POS), Willemstad (CUR), Oranjestad (AUA), Philipsburg (SXM), Pointe-à-Pitre (PTP)

When answering questions about routes, weather, or destinations:
- All Copa flights connect through PTY hub
- Consider the hub-and-spoke model in your responses
- For route-specific questions (e.g., "weather between Panama and Miami"), reference both PTY and the destination
- Provide practical operational insights relevant to airline crew operations

Always provide:
1. Clear problem identification
2. 2-3 solution options ranked by recommendation
3. Cost and impact analysis
4. Compliance considerations
5. Timeline for action

Be concise, professional, and action-oriented. Lives and operations depend on quick, accurate decisions.`;

// Format current operations context for Claude
const formatOperationsContext = (question) => {
  const activeCrew = crewMembers.filter(c => c.status !== 'sick');
  const criticalCrew = crewMembers.filter(c => c.status === 'critical');
  const reserves = crewMembers.filter(c => c.status === 'reserve');

  return `Current Operations Context (Dec 1, 2025 - 08:47):

Active Crew: ${activeCrew.length}
Critical Situations: ${criticalCrew.length}
Available Reserves: ${reserves.length}

${criticalCrew.length > 0 ? `CRITICAL CREW ISSUES:
${criticalCrew.map(c => `- ${c.name}: ${c.currentFlight} - ${c.dutyRemaining} remaining (limit: ${c.dutyLimit || 'N/A'})`).join('\n')}

` : ''}Reserves Available:
${reserves.map(r => `- ${r.name} (${r.certifications.join(', ')}) - ${r.location} - ${r.responseTime} min response`).join('\n')}

User Question: ${question}`;
};

// Main function to get AI response
export const getAIAnalysis = async (question, apiKey) => {
  const client = initClient(apiKey);

  if (!client) {
    return {
      error: 'API key not configured',
      suggestion: 'Add your Anthropic API key to enable live AI analysis'
    };
  }

  try {
    const context = formatOperationsContext(question);

    const message = await client.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: context
        }
      ]
    });

    return {
      content: message.content[0].text,
      model: 'claude-3-5-sonnet',
      usage: message.usage
    };
  } catch (error) {
    console.error('Anthropic API error:', error);
    return {
      error: error.message,
      suggestion: 'Check your API key and network connection'
    };
  }
};

// Function to analyze a specific scenario
export const analyzeScenario = async (scenario, apiKey) => {
  const client = initClient(apiKey);

  if (!client) {
    return {
      error: 'API key not configured'
    };
  }

  try {
    const prompt = `Analyze this IROPS scenario and provide recommendations:

Scenario: ${scenario.title}
Flight: ${scenario.flight}
Issue: ${scenario.primaryIssue}
Trigger: ${scenario.trigger}
Time to Decision: ${scenario.timeToDecision}

Consider:
1. Regulatory compliance (SIELAS, FAA)
2. Operational cost
3. Passenger impact
4. Crew welfare
5. Cascade effects

Provide your top recommendation and reasoning.`;

    const message = await client.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 512,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    });

    return {
      analysis: message.content[0].text,
      model: 'claude-3-5-sonnet'
    };
  } catch (error) {
    console.error('Anthropic API error:', error);
    return {
      error: error.message
    };
  }
};

// Function to get proactive alerts
export const getProactiveAlerts = async (apiKey) => {
  const client = initClient(apiKey);

  if (!client) {
    return {
      error: 'API key not configured'
    };
  }

  try {
    const criticalSituations = crewMembers
      .filter(c => c.status === 'critical' || c.status === 'warning')
      .map(c => `${c.name}: ${c.currentFlight} - ${c.dutyRemaining} remaining`)
      .join('\n');

    const prompt = `Based on current crew status, identify top 3 proactive actions I should take:

Critical/Warning Crew:
${criticalSituations || 'None'}

Consider:
- Upcoming duty time expirations
- Weather forecasts
- Reserve crew positioning
- Connection risks

Format as:
1. [Priority Level] Action - Brief reason
2. [Priority Level] Action - Brief reason
3. [Priority Level] Action - Brief reason`;

    const message = await client.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 384,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    });

    return {
      alerts: message.content[0].text,
      model: 'claude-3-5-sonnet'
    };
  } catch (error) {
    console.error('Anthropic API error:', error);
    return {
      error: error.message
    };
  }
};
