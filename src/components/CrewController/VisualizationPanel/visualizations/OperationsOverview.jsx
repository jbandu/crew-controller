import { operationStats } from '../../../../data/copaData';
import Badge from '../../shared/Badge';

const StatCard = ({ icon, label, value, trend }) => (
  <div className="bg-bg-card border border-white/10 rounded-lg p-4">
    <div className="flex items-center justify-between mb-2">
      <span className="text-text-muted text-sm">{label}</span>
      <span className="text-2xl">{icon}</span>
    </div>
    <div className="text-2xl font-bold text-white mb-1">{value}</div>
    {trend && (
      <div className={`text-xs ${trend > 0 ? 'text-green-400' : 'text-red-400'}`}>
        {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}% vs yesterday
      </div>
    )}
  </div>
);

const OperationsOverview = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-white mb-6">Operations Overview</h2>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <StatCard
          icon="✈️"
          label="Flights Today"
          value={operationStats.flights}
          trend={2.3}
        />
        <StatCard
          icon="👥"
          label="Crew On Duty"
          value={operationStats.crewOnDuty}
        />
        <StatCard
          icon="⏱️"
          label="On-Time Performance"
          value={`${operationStats.onTimePerformance}%`}
          trend={1.2}
        />
        <StatCard
          icon="🔔"
          label="Active Alerts"
          value={operationStats.activeAlerts}
          trend={-15}
        />
      </div>

      <div className="bg-bg-card border border-white/10 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Reserve Crew Status</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-text-secondary">Available Reserves</span>
            <Badge variant="success">{operationStats.reserves}</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-text-secondary">At PTY Hub</span>
            <span className="text-white font-semibold">18</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-text-secondary">Remote Standby</span>
            <span className="text-white font-semibold">6</span>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-bg-card border border-white/10 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Hub Status</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-text-secondary">PTY - Tocumen International</span>
            <Badge variant="success">Operational</Badge>
          </div>
          <div className="text-sm text-text-muted mt-2">
            Weather: Clear • Temperature: 28°C • Winds: 8kt
          </div>
        </div>
      </div>
    </div>
  );
};

export default OperationsOverview;
