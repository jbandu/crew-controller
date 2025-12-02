import OperationsOverview from './visualizations/OperationsOverview';
import WeatherExposure from './visualizations/WeatherExposure';
import LiveWeatherExposure from './visualizations/LiveWeatherExposure';
import GanttTimeline from './visualizations/GanttTimeline';
import ResolutionPreview from './visualizations/ResolutionPreview';
import ShiftReport from './visualizations/ShiftReport';
import NetworkMap from './visualizations/NetworkMap';
import CostComparison from './visualizations/CostComparison';
import FatigueHeatmap from './visualizations/FatigueHeatmap';
import CrewUtilization from './visualizations/CrewUtilization';

import { costOptions } from '../../../data/costOptions';
import { fatigueData } from '../../../data/fatigueData';
import { utilizationData } from '../../../data/utilizationData';

const VisualizationRouter = ({ type, data, onAction }) => {
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
    case 'CostComparison':
      return (
        <CostComparison
          options={data?.options || costOptions}
          onSelect={(option) => onAction?.('selectOption', option)}
        />
      );
    case 'FatigueHeatmap':
      return (
        <FatigueHeatmap
          crewData={data?.crewData || fatigueData}
          onCrewSelect={(crew) => onAction?.('selectCrew', crew)}
          onAlertClick={(crew) => onAction?.('alertClick', crew)}
        />
      );
    case 'CrewUtilization':
      return (
        <CrewUtilization
          data={data?.utilizationData || utilizationData}
          onCrewSelect={(crew) => onAction?.('selectCrew', crew)}
        />
      );
    default:
      return <OperationsOverview />;
  }
};

export default VisualizationRouter;
