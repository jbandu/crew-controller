import { shiftReportData } from '../../../../../data/shiftReportData';
import ScoreRing from './ScoreRing';
import MetricCard from './MetricCard';
import LearningMoment from './LearningMoment';
import Badge from '../../../shared/Badge';

const ReportCard = () => {
  const { score, metrics, learningMoment, achievements } = shiftReportData;

  return (
    <div className="space-y-6">
      {/* Score Section */}
      <div className="bg-bg-card border border-white/10 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-6 text-center">Shift Performance</h3>
        <div className="flex justify-center mb-6">
          <ScoreRing score={score} maxScore={100} />
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-4">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} index={index} />
        ))}
      </div>

      {/* Learning Moment */}
      <LearningMoment {...learningMoment} />

      {/* Achievements */}
      <div className="bg-bg-card border border-white/10 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Achievements</h3>
        <div className="space-y-3">
          {achievements.map((achievement, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-bg-elevated rounded-lg">
              <span className="text-2xl">{achievement.icon}</span>
              <div>
                <div className="text-white font-semibold">{achievement.label}</div>
                <div className="text-text-muted text-sm">{achievement.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReportCard;
