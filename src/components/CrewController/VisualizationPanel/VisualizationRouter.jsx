import OperationsOverview from './visualizations/OperationsOverview';
import WeatherExposure from './visualizations/WeatherExposure';
import GanttTimeline from './visualizations/GanttTimeline';
import ResolutionPreview from './visualizations/ResolutionPreview';
import ShiftReport from './visualizations/ShiftReport';

const VisualizationRouter = ({ type, data }) => {
  switch (type) {
    case 'OperationsOverview':
      return <OperationsOverview />;
    case 'WeatherExposure':
      return <WeatherExposure />;
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
