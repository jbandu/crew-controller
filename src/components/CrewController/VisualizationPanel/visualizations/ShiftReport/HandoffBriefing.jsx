import { shiftReportData } from '../../../../../data/shiftReportData';
import Badge from '../../../shared/Badge';

const HandoffBriefing = () => {
  const { handoff } = shiftReportData;

  return (
    <div className="space-y-6">
      {/* Incoming Controller */}
      <div className="bg-bg-card border border-white/10 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Handoff To</h3>
          <Badge variant="info">Swing Shift</Badge>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-accent-purple rounded-full flex items-center justify-center text-white font-semibold text-lg">
            M
          </div>
          <div>
            <div className="text-white font-semibold">{handoff.incoming.name}</div>
            <div className="text-text-muted text-sm">{handoff.incoming.shift}</div>
          </div>
        </div>
      </div>

      {/* Open Items */}
      {handoff.openItems.length > 0 && (
        <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">⚠️ Open Items (Action Required)</h3>
          <div className="space-y-4">
            {handoff.openItems.map((item, index) => (
              <div key={index} className="bg-bg-card rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-white">{item.flight}</span>
                  <Badge variant="warning">{item.type.toUpperCase()}</Badge>
                </div>
                <div className="text-sm text-text-secondary mb-2">{item.route}</div>
                <div className="text-sm text-text-primary mb-2">
                  <strong>Issue:</strong> {item.issue}
                </div>
                <div className="text-sm text-text-secondary mb-2">
                  <strong>Action Taken:</strong> {item.actionTaken}
                </div>
                <div className="bg-orange-500/20 border-l-4 border-orange-500 px-3 py-2 mt-3">
                  <div className="text-xs text-text-muted mb-1">Decision Point: {item.decisionPoint}</div>
                  <div className="text-sm text-white font-semibold">{item.instruction}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Watch Items */}
      <div className="bg-bg-card border border-white/10 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">👁️ Watch Items</h3>
        <div className="space-y-2">
          {handoff.watchItems.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-bg-elevated rounded-lg">
              <div className="flex-1">
                <div className="text-white font-semibold text-sm">{item.label}</div>
                <div className="text-text-muted text-xs">{item.detail}</div>
              </div>
              {item.due && (
                <Badge variant="info" size="sm">{item.due}</Badge>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Resolved Items */}
      <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">✓ Resolved This Shift</h3>
        <div className="space-y-2">
          {handoff.resolvedItems.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-bg-card rounded-lg">
              <div>
                <span className="text-white font-semibold">{item.flight}</span>
                <span className="text-text-muted text-sm ml-2">• {item.action}</span>
              </div>
              <span className="text-text-muted text-xs">{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HandoffBriefing;
