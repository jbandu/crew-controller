/**
 * Demo Pilot Narration Hooks
 *
 * This module exports timing, narration text, and synchronization data
 * for use with demo-pilot applications that integrate Claude/Eleven Labs
 * for dynamic audio narration.
 *
 * Usage:
 * ```javascript
 * import { demoNarration, scenes, getSceneNarration } from './narration-hooks.js';
 *
 * // Get all narration for a scene
 * const scene1 = getSceneNarration('shiftStart');
 *
 * // Each step includes:
 * // - id: Unique identifier
 * // - description: What's happening on screen
 * // - narration: Text for TTS (Eleven Labs)
 * // - duration: Estimated display time in ms
 * // - waitFor: Playwright selector to wait for
 * // - action: Playwright action to perform
 * ```
 */

/**
 * Demo configuration
 */
export const demoConfig = {
  appUrl: 'http://localhost:5173',
  defaultPauseBetweenSteps: 500,
  typingSpeed: 50, // ms per character for simulated typing
  viewport: {
    width: 1920,
    height: 1080
  },
  voices: {
    narrator: 'alloy', // Eleven Labs voice for narration
    aiAssistant: 'nova', // Voice for AI responses
  }
};

/**
 * Scene definitions with narration hooks
 */
export const scenes = {
  /**
   * Introduction - App overview
   */
  introduction: {
    id: 'introduction',
    name: 'Introduction',
    description: 'Overview of the Crew Controller application',
    steps: [
      {
        id: 'intro-1',
        description: 'Show application loaded',
        narration: "Welcome to Crew Controller, Copa Airlines' AI-powered crew operations management system. This is a day in the life of Maria Santos, a crew controller at Panama City's Tocumen International Airport.",
        duration: 8000,
        waitFor: 'text=Crew Controller',
        action: null,
      },
      {
        id: 'intro-2',
        description: 'Highlight header section',
        narration: "The interface shows Maria's current shift information: her name, the date, and that she's working from the PTY Hub.",
        duration: 5000,
        waitFor: 'text=PTY Hub',
        action: null,
      },
      {
        id: 'intro-3',
        description: 'Show two-panel layout',
        narration: "The screen is split into two sections: the AI chat panel on the left where Maria interacts with her AI assistant, and the visualization panel on the right showing real-time operational data.",
        duration: 7000,
        waitFor: null,
        action: null,
      }
    ]
  },

  /**
   * Scene 1: Shift Start
   */
  shiftStart: {
    id: 'shiftStart',
    name: 'Shift Start',
    description: 'Morning briefing with overnight summary',
    steps: [
      {
        id: 'shift-1',
        description: 'Open demo controls',
        narration: "Let's start Maria's shift. She clicks the demo control button to begin.",
        duration: 3000,
        waitFor: 'button[title="Open Demo Controls (Ctrl+D)"]',
        action: { type: 'click', selector: 'button[title="Open Demo Controls (Ctrl+D)"]' },
      },
      {
        id: 'shift-2',
        description: 'Click Scene 1 button',
        narration: "Maria clicks Scene 1 to start her shift.",
        duration: 2000,
        waitFor: 'text=Scene 1: Shift Start',
        action: { type: 'click', selector: 'button:has-text("Scene 1: Shift Start")' },
      },
      {
        id: 'shift-3',
        description: 'AI greeting appears',
        narration: "The AI assistant greets Maria with a comprehensive morning briefing. It provides an overnight summary, highlights any issues that occurred during the night shift, and presents today's watchlist of situations requiring attention.",
        duration: 10000,
        waitFor: '.prose',
        action: null,
      },
      {
        id: 'shift-4',
        description: 'Show operations overview',
        narration: "The visualization panel updates to show the Operations Overview dashboard. Maria can see key metrics at a glance: total flights for the day, crew members on duty, on-time performance, and any active alerts.",
        duration: 8000,
        waitFor: null,
        action: null,
      },
      {
        id: 'shift-5',
        description: 'Highlight suggested questions',
        narration: "Below the AI message, suggested questions appear as clickable chips. These provide quick access to common queries Maria might have during her shift.",
        duration: 5000,
        waitFor: 'text=Weather exposure',
        action: null,
      }
    ]
  },

  /**
   * Scene 2: Weather Exploration
   */
  weatherExploration: {
    id: 'weatherExploration',
    name: 'Weather Exploration',
    description: 'Exploring weather exposure across the network',
    steps: [
      {
        id: 'weather-1',
        description: 'Click weather exposure question',
        narration: "Maria notices storm clouds building over the Caribbean. She clicks 'Weather exposure' to understand the potential impact.",
        duration: 4000,
        waitFor: 'text=Weather exposure',
        action: { type: 'click', selector: 'text=Weather exposure' },
      },
      {
        id: 'weather-2',
        description: 'User question appears',
        narration: "Her question appears in the chat: 'What's my exposure if Panama weather gets worse?'",
        duration: 3000,
        waitFor: 'text=exposure if Panama',
        action: null,
      },
      {
        id: 'weather-3',
        description: 'AI analyzes weather impact',
        narration: "The AI analyzes real-time weather data and flight schedules. It calculates that 23 flights could be affected, involving 67 crew members, with a potential cost exposure of $340,000.",
        duration: 8000,
        waitFor: '.prose',
        action: null,
      },
      {
        id: 'weather-4',
        description: 'Weather visualization updates',
        narration: "The visualization panel now shows a detailed weather exposure breakdown, with flights categorized by risk level: high, medium, and low.",
        duration: 6000,
        waitFor: null,
        action: null,
      }
    ]
  },

  /**
   * Scene 3: Network Map
   */
  networkMap: {
    id: 'networkMap',
    name: 'Network Map',
    description: 'Interactive Copa Airlines route network',
    steps: [
      {
        id: 'network-1',
        description: 'Click network map question',
        narration: "Maria wants to see the full network picture. She clicks 'Network map' to view Copa's route network.",
        duration: 3000,
        waitFor: 'text=Network map',
        action: { type: 'click', selector: 'text=Network map' },
      },
      {
        id: 'network-2',
        description: 'Network map loads',
        narration: "An interactive 3D globe appears, centered on Copa's hub at Tocumen International. Blue lines radiate outward showing routes to destinations across North, Central, and South America.",
        duration: 8000,
        waitFor: 'text=Copa Airlines Route Network',
        action: null,
      },
      {
        id: 'network-3',
        description: 'Highlight key destinations',
        narration: "Maria can see connections to major destinations: Miami, Los Angeles, New York, São Paulo, Bogotá, and many more. The map helps her visualize where potential disruptions might cascade through the network.",
        duration: 7000,
        waitFor: null,
        action: null,
      }
    ]
  },

  /**
   * Scene 4: Fatigue Analysis
   */
  fatigueAnalysis: {
    id: 'fatigueAnalysis',
    name: 'Fatigue Analysis',
    description: 'Crew fatigue risk over next 6 hours',
    steps: [
      {
        id: 'fatigue-1',
        description: 'Click fatigue risk question',
        narration: "With weather concerns in mind, Maria checks crew fatigue levels by clicking 'Fatigue risk'.",
        duration: 3000,
        waitFor: 'text=Fatigue risk',
        action: { type: 'click', selector: 'text=Fatigue risk' },
      },
      {
        id: 'fatigue-2',
        description: 'Fatigue heatmap appears',
        narration: "The visualization shows a fatigue heatmap for the next 6 hours. Crew members are listed with color-coded indicators showing their remaining duty time. Green means plenty of time, yellow is caution, orange is warning, and red indicates critical.",
        duration: 9000,
        waitFor: 'text=fatigue',
        action: null,
      },
      {
        id: 'fatigue-3',
        description: 'Identify critical crew',
        narration: "Maria spots First Officer Alejandra Vega in red - she has only 2 hours and 45 minutes of duty time remaining. If the weather causes delays, Alejandra might go illegal before completing her scheduled flights.",
        duration: 8000,
        waitFor: null,
        action: null,
      }
    ]
  },

  /**
   * Scene 5: Disruption Alert
   */
  disruptionAlert: {
    id: 'disruptionAlert',
    name: 'Disruption Alert',
    description: 'Critical crew legality issue with resolution options',
    steps: [
      {
        id: 'disruption-1',
        description: 'Open demo controls for disruption',
        narration: "Suddenly, an alert notification sounds. A critical issue has emerged that requires Maria's immediate attention.",
        duration: 4000,
        waitFor: 'button[title="Open Demo Controls (Ctrl+D)"]',
        action: { type: 'click', selector: 'button[title="Open Demo Controls (Ctrl+D)"]' },
      },
      {
        id: 'disruption-2',
        description: 'Trigger disruption alert',
        narration: "Maria clicks to view the disruption alert.",
        duration: 2000,
        waitFor: 'text=Scene 3: Disruption Alert',
        action: { type: 'click', selector: 'button:has-text("Scene 3: Disruption Alert")' },
      },
      {
        id: 'disruption-3',
        description: 'Alert message appears',
        narration: "A critical alert flashes on screen. Flight CM 208 from Panama to São Paulo has a crew legality issue. Due to the weather delay, First Officer Vega will exceed her duty time limits before the flight can depart.",
        duration: 9000,
        waitFor: 'text=CRITICAL',
        action: null,
      },
      {
        id: 'disruption-4',
        description: 'Show Gantt timeline',
        narration: "The Gantt timeline visualization shows the problem clearly. You can see Vega's duty period extending beyond the legal limit, highlighted in red.",
        duration: 6000,
        waitFor: null,
        action: null,
      },
      {
        id: 'disruption-5',
        description: 'Display resolution options',
        narration: "The AI presents three resolution options, each with cost analysis and impact assessment. The recommended option is highlighted - assigning reserve First Officer Ricardo Santos who has 8 hours of duty time available.",
        duration: 8000,
        waitFor: '[class*="cursor-pointer"]',
        action: null,
      }
    ]
  },

  /**
   * Scene 6: Resolution Selection
   */
  resolutionSelection: {
    id: 'resolutionSelection',
    name: 'Resolution Selection',
    description: 'Selecting and confirming a resolution',
    steps: [
      {
        id: 'resolution-1',
        description: 'Click recommended option',
        narration: "Maria reviews the options and clicks the recommended solution - calling in reserve First Officer Ricardo Santos.",
        duration: 4000,
        waitFor: '[class*="cursor-pointer"]',
        action: { type: 'click', selector: '[class*="cursor-pointer"]:first-child' },
      },
      {
        id: 'resolution-2',
        description: 'Selection confirmation appears',
        narration: "Her selection is confirmed in the chat. The system begins executing the crew swap.",
        duration: 3000,
        waitFor: 'text=Selected',
        action: null,
      },
      {
        id: 'resolution-3',
        description: 'Resolution executed',
        narration: "Within seconds, the AI confirms the resolution has been executed. Ricardo Santos has been assigned to CM 208, notifications have been sent, and compliance has been logged according to SIELAS regulations.",
        duration: 8000,
        waitFor: 'text=Resolution',
        action: null,
      },
      {
        id: 'resolution-4',
        description: 'Show resolution preview',
        narration: "The visualization updates to show a before-and-after comparison. The cascade impact panel shows how this single change prevents downstream delays on three connecting flights.",
        duration: 7000,
        waitFor: null,
        action: null,
      },
      {
        id: 'resolution-5',
        description: 'Highlight time saved',
        narration: "Maria resolved this critical issue in under 30 seconds - a task that previously could have taken 15-20 minutes of phone calls and manual coordination.",
        duration: 5000,
        waitFor: null,
        action: null,
      }
    ]
  },

  /**
   * Scene 7: Shift End
   */
  shiftEnd: {
    id: 'shiftEnd',
    name: 'Shift End',
    description: 'Performance report and handoff briefing',
    steps: [
      {
        id: 'end-1',
        description: 'Open demo controls for shift end',
        narration: "As Maria's shift comes to an end, she prepares to hand off to the incoming controller.",
        duration: 3000,
        waitFor: 'button[title="Open Demo Controls (Ctrl+D)"]',
        action: { type: 'click', selector: 'button[title="Open Demo Controls (Ctrl+D)"]' },
      },
      {
        id: 'end-2',
        description: 'Trigger shift end',
        narration: "She clicks to generate her shift-end report.",
        duration: 2000,
        waitFor: 'text=Scene 5: Shift End',
        action: { type: 'click', selector: 'button:has-text("Scene 5: Shift End")' },
      },
      {
        id: 'end-3',
        description: 'Performance report appears',
        narration: "The Shift Report visualization appears with two tabs: Performance and Handoff. The performance tab shows Maria's shift score - a comprehensive rating based on response time, decision quality, and compliance adherence.",
        duration: 8000,
        waitFor: 'text=Performance',
        action: null,
      },
      {
        id: 'end-4',
        description: 'Show metrics',
        narration: "Key metrics are displayed: disruptions handled, average response time, flights protected, and cost avoidance achieved. Maria handled 8 disruptions with an average response time of just 23 seconds.",
        duration: 7000,
        waitFor: null,
        action: null,
      },
      {
        id: 'end-5',
        description: 'Learning moment',
        narration: "The AI also provides a learning moment - feedback on a decision Maria made that could be improved in the future. This continuous learning helps controllers develop their skills over time.",
        duration: 6000,
        waitFor: null,
        action: null,
      },
      {
        id: 'end-6',
        description: 'Handoff briefing',
        narration: "The handoff briefing summarizes open items requiring attention, situations to watch, and issues resolved during the shift. This ensures a seamless transition to the next controller.",
        duration: 6000,
        waitFor: null,
        action: null,
      }
    ]
  },

  /**
   * Conclusion
   */
  conclusion: {
    id: 'conclusion',
    name: 'Conclusion',
    description: 'Demo wrap-up',
    steps: [
      {
        id: 'conclusion-1',
        description: 'Final summary',
        narration: "This has been a day in the life of a crew controller using Crew Controller 4.0. The AI assistant helped Maria proactively identify issues, quickly resolve disruptions, and maintain compliance - all while keeping the network running smoothly.",
        duration: 10000,
        waitFor: null,
        action: null,
      },
      {
        id: 'conclusion-2',
        description: 'Key benefits',
        narration: "The result: faster decision-making, reduced costs, better crew welfare, and improved on-time performance. Crew Controller transforms reactive firefighting into proactive operations management.",
        duration: 8000,
        waitFor: null,
        action: null,
      },
      {
        id: 'conclusion-3',
        description: 'Thank you',
        narration: "Thank you for watching this demonstration of Crew Controller for Copa Airlines.",
        duration: 4000,
        waitFor: null,
        action: null,
      }
    ]
  }
};

/**
 * Get all scenes as an ordered array
 */
export const getOrderedScenes = () => [
  scenes.introduction,
  scenes.shiftStart,
  scenes.weatherExploration,
  scenes.networkMap,
  scenes.fatigueAnalysis,
  scenes.disruptionAlert,
  scenes.resolutionSelection,
  scenes.shiftEnd,
  scenes.conclusion
];

/**
 * Get narration for a specific scene
 * @param {string} sceneId - Scene identifier
 * @returns {object|null} Scene object or null if not found
 */
export const getSceneNarration = (sceneId) => {
  return scenes[sceneId] || null;
};

/**
 * Get all narration text for TTS generation
 * @returns {Array<{id: string, text: string, duration: number}>}
 */
export const getAllNarrationText = () => {
  const narrations = [];
  const orderedScenes = getOrderedScenes();

  for (const scene of orderedScenes) {
    for (const step of scene.steps) {
      narrations.push({
        id: step.id,
        sceneId: scene.id,
        sceneName: scene.name,
        text: step.narration,
        duration: step.duration
      });
    }
  }

  return narrations;
};

/**
 * Calculate total demo duration
 * @returns {number} Total duration in milliseconds
 */
export const getTotalDuration = () => {
  const orderedScenes = getOrderedScenes();
  let total = 0;

  for (const scene of orderedScenes) {
    for (const step of scene.steps) {
      total += step.duration + demoConfig.defaultPauseBetweenSteps;
    }
  }

  return total;
};

/**
 * Demo narration export for external consumption
 */
export const demoNarration = {
  config: demoConfig,
  scenes,
  getOrderedScenes,
  getSceneNarration,
  getAllNarrationText,
  getTotalDuration
};

export default demoNarration;
