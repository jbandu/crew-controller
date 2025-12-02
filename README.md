# Crew Controller 4.0

A production-ready AI-powered crew operations interface for Copa Airlines. This demo showcases "A Day in the Life of a Crew Controller" - from shift start to handoff.

## Features

- **2-Pane Modern UI**: Chat interface with dynamic visualizations
- **Real-time AI Assistance**: Proactive alerts and intelligent recommendations
- **Multiple Visualizations**:
  - Operations Overview dashboard
  - Weather Exposure analysis
  - Interactive Gantt Timeline
  - Resolution Preview with cascade impact
  - Shift Report with performance metrics
  - Handoff Briefing for shift transitions
- **Demo Flow Control**: Press `Ctrl+D` to trigger demo scenarios

## Tech Stack

- **React 18** with Vite
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Lucide React** for icons
- **React Markdown** for formatted messages
- **Recharts** for data visualization

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

### Building for Production

```bash
npm run build
npm run preview
```

## Demo Controls

Press `Ctrl+D` to open the demo controls panel. This allows you to trigger different scenes:

1. **Scene 1: Shift Start** - Morning briefing with overnight summary
2. **Scene 3: Disruption Alert** - Critical crew legality issue with resolution options
3. **Scene 5: Shift End** - Performance report card and handoff briefing

## Project Structure

```
src/
├── components/
│   └── CrewController/
│       ├── Header.jsx
│       ├── ChatPanel/
│       │   ├── messages/
│       │   ├── SuggestedQuestions.jsx
│       │   └── InputBar.jsx
│       ├── VisualizationPanel/
│       │   └── visualizations/
│       └── shared/
├── data/
│   ├── copaData.js
│   ├── crewData.js
│   ├── alertData.js
│   ├── shiftReportData.js
│   └── demoScenarios.js
├── hooks/
│   ├── useChat.js
│   └── useVisualization.js
└── styles/
    └── theme.css
```

## Key Features Demonstrated

### Scene 1: Shift Start
- AI greeting with overnight summary
- Today's watchlist with 4 flagged situations
- Suggested questions as clickable chips

### Scene 2: Proactive Analysis
- Weather exposure analysis
- Risk quantification (23 flights, 67 crew, $340K exposure)
- Proactive recommendations

### Scene 3: Disruption Resolution
- Real-time critical alert (crew legality issue)
- 3 resolution options with cost/impact analysis
- Recommended option highlighting
- Interactive Gantt timeline showing the issue

### Scene 4: Resolution Confirmation
- Multi-step execution tracking
- Cascade impact visualization
- Compliance logging (SIELAS §14.3)
- Downstream risk elimination

### Scene 5: Shift End & Handoff
- Animated performance score ring
- Key metrics dashboard
- Learning moment (AI feedback on human decisions)
- Achievements display
- Handoff briefing with open/watch/resolved items

## Domain Context

### Copa Airlines
- **Hub**: PTY (Tocumen International Airport, Panama City)
- **Fleet**: Boeing 737-800, 737 MAX 9
- **Flight numbers**: Start with "CM"
- **Key destinations**: BOG, MIA, GRU, MDE, CUN, LIM, LAX, JFK

### Key Concepts
- **Duty Time**: Total time "on the clock" from report to release
- **Legality**: Crew member is "legal" if within duty limits and properly rested
- **Reserve Crew**: Pilots/FAs on standby, ready to be called in
- **Cascade Effect**: One problem causing more problems downstream

## Customization

### Adding New Visualizations

1. Create a new component in `src/components/CrewController/VisualizationPanel/visualizations/`
2. Add it to `VisualizationRouter.jsx`
3. Reference it in your message data with the `visualization` property

### Adding New Message Types

1. Create a new message component in `src/components/CrewController/ChatPanel/messages/`
2. Add a case for it in the `MessageRenderer` component
3. Use it in your demo scenarios

### Customizing Data

Edit the files in `src/data/` to customize:
- Flight and crew information
- Alert scenarios and options
- Shift report metrics
- Suggested questions

## Performance

The application is optimized for smooth animations and transitions:
- Framer Motion for 60fps animations
- Optimized re-renders with React hooks
- Lazy loading of visualizations
- Efficient state management

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)

## License

This is a demo application for Copa Airlines Crew Controller concept.
