import OperationsOverview from './visualizations/OperationsOverview';
import WeatherExposure from './visualizations/WeatherExposure';
import LiveWeatherExposure from './visualizations/LiveWeatherExposure';
import GanttTimeline from './visualizations/GanttTimeline';
import ResolutionPreview from './visualizations/ResolutionPreview';
import ShiftReport from './visualizations/ShiftReport';
import NetworkMap from './visualizations/NetworkMap';

const VisualizationRouter = ({ type, data }) => {
  switch (type) {
    case 'OperationsOverview':
      return <OperationsOverview />;
    case 'WeatherExposure':
      return <WeatherExposure />;
    case 'LiveWeatherExposure':
      return <LiveWeatherExposure />;
    case 'NetworkMap':
      return <NetworkMap highlightRoute={data?.highlightRoute} weatherOverlay={data?.weatherOverlay} />;
    case 'GanttTimeline':
      return <GanttTimeline highlightCrew={data?.highlightCrew} nowTime={data?.nowTime} />;
    case 'ResolutionPreview':
      return <ResolutionPreview />;
    case 'ShiftReport':
      return <ShiftReport />;
    default:
      return <OperationsOverview />;
  }
};

export default VisualizationRouter;
