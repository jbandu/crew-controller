# Crew Controller 4.0

A production-ready AI-powered crew operations interface for Copa Airlines. This demo showcases "A Day in the Life of a Crew Controller" - from shift start to handoff.

## Features

- **2-Pane Modern UI**: Chat interface with dynamic visualizations (40/60 split)
- **Real-time AI Assistance**: Proactive alerts and intelligent recommendations via Claude AI
- **Live Weather Integration**: Real-time weather data from OpenWeather API
- **Interactive Network Map**: 3D Mapbox globe with Copa's hub-and-spoke network
- **10 Visualization Types**: Comprehensive operational dashboards
- **Demo Flow Control**: Press `Ctrl+D` to trigger demo scenarios
- **Playwright E2E Tests**: Comprehensive test suite for automated testing and demos

## Tech Stack

| Category | Technology |
|----------|-----------|
| **Frontend** | React 19, Vite 7 |
| **Styling** | Tailwind CSS 3.4 |
| **Animation** | Framer Motion |
| **Charts** | Recharts |
| **Maps** | Mapbox GL |
| **Icons** | Lucide React |
| **AI** | Anthropic Claude 3.5 Sonnet |
| **Weather** | OpenWeather API |
| **Testing** | Playwright |
| **Backend** | Express.js, PostgreSQL |

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Environment Variables

Create a `.env` file based on `.env.example`:

```env
# Required for map visualization
VITE_MAPBOX_TOKEN=your_mapbox_token

# Required for live weather data
VITE_OPENWEATHER_API_KEY=your_openweather_key

# Optional - for live AI responses
VITE_ANTHROPIC_API_KEY=your_anthropic_key

# Optional - for database features
DATABASE_URL=postgresql://user:pass@localhost:5432/copa
```

### Building for Production

```bash
npm run build
npm run preview
```

### Running Tests

```bash
# Install Playwright browsers (first time only)
npx playwright install

# Run all tests
npm run test

# Run tests with UI
npm run test:ui

# Run demo tests specifically
npm run test:demo

# Run with headed browser (visible)
npm run test:headed
```

## Project Structure

```
crew-controller/
├── src/
│   ├── components/
│   │   └── CrewController/
│   │       ├── index.jsx              # Main layout container
│   │       ├── Header.jsx             # Top bar with controller info
│   │       ├── DemoControls.jsx       # FAB + demo scene triggers
│   │       ├── SettingsModal.jsx      # API key configuration
│   │       ├── ChatPanel/
│   │       │   ├── index.jsx          # Message scroll area
│   │       │   ├── InputBar.jsx       # Text input + send button
│   │       │   ├── SuggestedQuestions.jsx  # Question chips
│   │       │   └── messages/
│   │       │       ├── UserMessage.jsx
│   │       │       ├── AIGreeting.jsx
│   │       │       ├── AIAlert.jsx
│   │       │       ├── AIAnalysis.jsx
│   │       │       ├── AIConfirmation.jsx
│   │       │       ├── AIOptions.jsx
│   │       │       └── OptionCard.jsx
│   │       ├── VisualizationPanel/
│   │       │   ├── index.jsx          # Viz container
│   │       │   ├── VisualizationRouter.jsx  # Routes viz type to component
│   │       │   └── visualizations/
│   │       │       ├── OperationsOverview.jsx
│   │       │       ├── WeatherExposure.jsx
│   │       │       ├── LiveWeatherExposure.jsx
│   │       │       ├── NetworkMap.jsx
│   │       │       ├── GanttTimeline.jsx
│   │       │       ├── ResolutionPreview.jsx
│   │       │       ├── CostComparison.jsx
│   │       │       ├── FatigueHeatmap.jsx
│   │       │       ├── CrewUtilization.jsx
│   │       │       └── ShiftReport/
│   │       │           ├── index.jsx
│   │       │           ├── ReportCard.jsx
│   │       │           ├── ScoreRing.jsx
│   │       │           ├── MetricCard.jsx
│   │       │           ├── LearningMoment.jsx
│   │       │           └── HandoffBriefing.jsx
│   │       └── shared/
│   │           ├── Avatar.jsx
│   │           └── Badge.jsx
│   ├── data/
│   │   ├── copaData.js           # Network hub + destinations
│   │   ├── crewData.js           # Crew roster
│   │   ├── flightData.js         # Flight schedule
│   │   ├── alertData.js          # Alert scenarios
│   │   ├── shiftReportData.js    # Performance metrics
│   │   ├── demoScenarios.js      # Demo messages
│   │   ├── rotatingScenarios.js  # Multiple scene variations
│   │   ├── suggestedQuestions.js # Chat question chips
│   │   ├── costOptions.js        # Resolution cost breakdown
│   │   ├── fatigueData.js        # Crew fatigue timeline
│   │   ├── utilizationData.js    # Crew utilization stats
│   │   ├── mockResponses.js      # Mock AI responses
│   │   └── scenariosData.js      # IROPS scenarios
│   ├── services/
│   │   ├── anthropicService.js   # Claude AI integration
│   │   └── weatherService.js     # OpenWeather API
│   ├── hooks/
│   │   ├── useChat.js            # Message state management
│   │   ├── useVisualization.js   # Viz state management
│   │   └── useCopaNetwork.js     # Network data hook
│   ├── utils/
│   │   └── sounds.js             # Web Audio API sound effects
│   ├── styles/
│   │   └── theme.css             # CSS variables + scrollbar
│   ├── database/
│   │   ├── db.js                 # PostgreSQL connection
│   │   └── setup.js              # Database initialization
│   ├── App.jsx                   # Root component
│   └── main.jsx                  # Entry point
├── server/
│   └── index.js                  # Express backend
├── tests/
│   └── e2e/
│       ├── demo-flows.spec.js    # Demo scenario tests
│       ├── visualizations.spec.js # Visualization tests
│       ├── chat.spec.js          # Chat interaction tests
│       └── demo-pilot/           # Demo-pilot integration
│           ├── narration-hooks.js # Audio narration timing
│           └── full-demo.spec.js  # Complete demo script
├── playwright.config.js          # Playwright configuration
└── package.json
```

## Visualizations

| # | Visualization | Description | Data Source |
|---|--------------|-------------|-------------|
| 1 | **OperationsOverview** | Dashboard with flights, crew, OTP, alerts | Static mock |
| 2 | **WeatherExposure** | Weather impact analysis (flights, crew, cost) | Static mock |
| 3 | **LiveWeatherExposure** | Real-time weather from OpenWeather API | Live API |
| 4 | **NetworkMap** | Interactive 3D Mapbox globe with routes | Static + Mapbox |
| 5 | **GanttTimeline** | Crew duty timeline with status colors | Static mock |
| 6 | **ResolutionPreview** | Before/after comparison with cascade impact | Generated |
| 7 | **CostComparison** | Cost analysis bar chart with breakdown | Static mock |
| 8 | **FatigueHeatmap** | Crew fatigue heatmap (6-hour horizon) | Static mock |
| 9 | **CrewUtilization** | Crew status pie + utilization by base | Static mock |
| 10 | **ShiftReport** | Performance score, metrics, handoff briefing | Static mock |

## Demo Controls

Press `Ctrl+D` or click the blue play button (bottom-right) to open demo controls:

| Scene | Name | Description | Visualization |
|-------|------|-------------|---------------|
| 1 | **Shift Start** | Morning briefing with overnight summary | OperationsOverview / NetworkMap |
| 3 | **Disruption Alert** | Critical crew legality issue with options | GanttTimeline |
| 5 | **Shift End** | Performance report card and handoff | ShiftReport |

## Suggested Questions

The chat interface includes clickable question chips:

| Icon | Question | Visualization |
|------|----------|---------------|
| 🌧️ | What's my exposure if Panama weather gets worse? | WeatherExposure |
| 🌍 | Show me real-time weather across Copa network | LiveWeatherExposure |
| ⏱️ | Show crew fatigue risk next 6 hours | FatigueHeatmap |
| 👥 | Show me current crew utilization status | CrewUtilization |
| 👤 | Who's my best reserve at PTY? | ReserveCoverage |
| ✈️ | If I cancel CM 208, what happens? | PassengerImpact |
| 📊 | Compare today vs last Tuesday | DayComparison |
| 🔍 | What caused Miami delays last week? | RootCauseTree |
| 🌐 | Show Copa Airlines route network | NetworkMap |

## Demo-Pilot Integration

This app includes Playwright scripts designed for integration with demo-pilot applications that use Claude/Eleven Labs for dynamic audio narration.

### Narration Hooks

The `tests/e2e/demo-pilot/narration-hooks.js` file exports timing and narration data:

```javascript
import { demoNarration } from './tests/e2e/demo-pilot/narration-hooks.js';

// Each scene includes:
// - description: What's happening on screen
// - narration: Text for TTS (Eleven Labs)
// - duration: Estimated time in ms
// - waitFor: Selector to wait for before proceeding
```

### Running Demo Scripts

```bash
# Run the full demo with visible browser
npx playwright test tests/e2e/demo-pilot/full-demo.spec.js --headed

# Run with slow motion for narration sync
npx playwright test tests/e2e/demo-pilot/full-demo.spec.js --headed --slow-mo=500
```

## Domain Context

### Copa Airlines

| Attribute | Value |
|-----------|-------|
| **Hub** | PTY (Tocumen International, Panama City) |
| **Fleet** | Boeing 737-800, 737 MAX 9 (18 aircraft) |
| **Flight Prefix** | CM (e.g., CM 208, CM 445) |
| **Key Destinations** | BOG, MIA, GRU, MDE, CUN, LIM, LAX, JFK |

### Key Concepts

| Term | Definition |
|------|------------|
| **Duty Time** | Total time "on the clock" from report to release |
| **Legality** | Crew member is "legal" if within duty limits and properly rested |
| **Reserve Crew** | Pilots/FAs on standby, ready to be called in |
| **Cascade Effect** | One problem causing more problems downstream |
| **SIELAS** | Panama's aviation regulatory framework |
| **FDP** | Flight Duty Period - time from check-in to block-in |

### Crew Roster Sample

| Name | Role | Base | Status |
|------|------|------|--------|
| Alejandra Vega | First Officer | PTY | Critical (2h 45m remaining) |
| Ricardo Santos | First Officer | PTY | Reserve |
| Carlos Mendoza | Captain | PTY | On Duty |
| Miguel Torres | Captain | MIA | Available |

## API Reference

### Chat Hook (useChat)

```javascript
const {
  messages,          // Array of message objects
  isTyping,          // Boolean - AI typing indicator
  sendMessage,       // (content: string) => Promise<response>
  triggerGreeting,   // () => void - Scene 1
  triggerDisruption, // () => void - Scene 3
  selectOption,      // (option: object) => void - Select resolution
  triggerShiftEnd,   // () => void - Scene 5
  clearMessages,     // () => void - Reset chat
  demoStep           // 'init' | 'greeting' | 'disruption' | 'resolved' | 'shiftEnd'
} = useChat();
```

### Visualization Hook (useVisualization)

```javascript
const {
  current,           // Current visualization type string
  data,              // Visualization-specific data object
  isAnimating,       // Boolean - transition in progress
  setVisualization   // (type: string, data?: object) => void
} = useVisualization();
```

### Message Types

```javascript
{
  type: 'user' | 'ai-greeting' | 'ai-alert' | 'ai-analysis' | 'ai-confirmation' | 'ai-options',
  content: string,              // Markdown content
  visualization?: string,       // Visualization to display
  data?: object,                // Visualization-specific data
  severity?: 'critical' | 'warning' | 'info',  // For alerts
  options?: Array<OptionCard>,  // For ai-options type
  id: number,                   // Auto-generated
  timestamp: Date               // Auto-generated
}
```

## Customization

### Adding New Visualizations

1. Create component in `src/components/CrewController/VisualizationPanel/visualizations/`
2. Add case to `VisualizationRouter.jsx`
3. Reference in message data with `visualization` property

### Adding New Message Types

1. Create component in `src/components/CrewController/ChatPanel/messages/`
2. Add case to `MessageRenderer` in `ChatPanel/index.jsx`
3. Use in demo scenarios or mock responses

### Customizing Demo Data

Edit files in `src/data/`:
- `rotatingScenarios.js` - Multiple variations of each scene
- `alertData.js` - Disruption scenarios and resolution options
- `shiftReportData.js` - Performance metrics and achievements
- `suggestedQuestions.js` - Chat question chips

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- WebGL required for NetworkMap

## Scripts Reference

```bash
npm run dev        # Start Vite dev server (http://localhost:5173)
npm run server     # Start Express backend (port 3001)
npm run dev:full   # Run both concurrently
npm run build      # Production build
npm run preview    # Preview production build
npm run lint       # Run ESLint
npm run db:setup   # Initialize database
npm run test       # Run Playwright tests
npm run test:ui    # Run tests with Playwright UI
npm run test:demo  # Run demo tests only
npm run test:headed # Run tests with visible browser
```

## License

This is a demo application for Copa Airlines Crew Controller concept.
