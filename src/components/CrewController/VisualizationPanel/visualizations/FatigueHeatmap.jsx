import { useState } from 'react';

const FatigueHeatmap = ({ crewData, onCrewSelect, onAlertClick }) => {
  const [hoveredCell, setHoveredCell] = useState(null);
  const [selectedCrew, setSelectedCrew] = useState(null);

  const hours = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00'];

  const getStatus = (hoursRemaining) => {
    if (hoursRemaining <= 0) return { color: '#374151', emoji: '⬛', label: 'Illegal', severity: 'illegal' };
    if (hoursRemaining < 1) return { color: '#ef4444', emoji: '🔴', label: '<1h', severity: 'critical' };
    if (hoursRemaining < 2) return { color: '#f97316', emoji: '🟠', label: '1-2h', severity: 'warning' };
    if (hoursRemaining < 4) return { color: '#eab308', emoji: '🟡', label: '2-4h', severity: 'caution' };
    return { color: '#22c55e', emoji: '🟢', label: '>4h', severity: 'ok' };
  };

  const criticalCrew = crewData.filter(c =>
    c.timeline.some(t => t.remaining < 1)
  );

  const handleCrewClick = (crew) => {
    setSelectedCrew(selectedCrew?.id === crew.id ? null : crew);
    onCrewSelect?.(crew);
  };

  return (
    <div className="h-full p-6 overflow-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold text-white">Crew Fatigue Risk</h2>
          <p className="text-gray-400 text-sm">Next 6 hours - Click cell for details</p>
        </div>
        {criticalCrew.length > 0 && (
          <div className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-sm">
            {criticalCrew.length} critical
          </div>
        )}
      </div>

      {/* Heatmap Grid */}
      <div className="bg-white/5 rounded-xl p-4 overflow-x-auto mb-6">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr>
              <th className="text-left text-gray-400 text-sm pb-4 pr-6 w-40">Crew Member</th>
              {hours.map(h => (
                <th key={h} className="text-center text-gray-400 text-sm pb-4 px-1 w-14">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {crewData.map((crew) => {
              const isCritical = crew.timeline.some(t => t.remaining < 1);
              return (
                <tr
                  key={crew.id}
                  className={`border-t border-white/5 ${isCritical ? 'bg-red-500/5' : ''}`}
                >
                  <td className="py-3 pr-6">
                    <button
                      onClick={() => handleCrewClick(crew)}
                      className={`text-left hover:text-blue-400 transition-colors
                        ${selectedCrew?.id === crew.id ? 'text-blue-400' : 'text-white'}`}
                    >
                      <div className="font-medium">{crew.name}</div>
                      <div className="text-gray-500 text-xs">{crew.role} - {crew.currentFlight || 'No flight'}</div>
                    </button>
                  </td>
                  {crew.timeline.map((cell, i) => {
                    const status = getStatus(cell.remaining);
                    const isHovered = hoveredCell?.crewId === crew.id && hoveredCell?.hour === i;

                    return (
                      <td key={i} className="py-3 px-1 text-center">
                        <div className="relative">
                          <button
                            onMouseEnter={() => setHoveredCell({ crewId: crew.id, hour: i, ...cell })}
                            onMouseLeave={() => setHoveredCell(null)}
                            onClick={() => handleCrewClick(crew)}
                            className={`w-10 h-10 rounded-lg flex items-center justify-center
                              transition-all text-lg
                              ${isHovered ? 'scale-125 ring-2 ring-white/50' : 'hover:scale-110'}`}
                            style={{ backgroundColor: `${status.color}22` }}
                          >
                            {status.emoji}
                          </button>

                          {/* Tooltip */}
                          {isHovered && (
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2
                              bg-gray-900 border border-white/20 rounded-lg px-3 py-2
                              text-sm whitespace-nowrap z-10 shadow-xl">
                              <div className="text-white font-medium">{cell.remaining}h remaining</div>
                              <div className="text-gray-400 text-xs">{hours[i]}</div>
                            </div>
                          )}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 mb-6 text-sm">
        <span className="text-gray-400">Legend:</span>
        {[
          { emoji: '🟢', label: '>4h (Safe)' },
          { emoji: '🟡', label: '2-4h (Caution)' },
          { emoji: '🟠', label: '1-2h (Warning)' },
          { emoji: '🔴', label: '<1h (Critical)' },
          { emoji: '⬛', label: 'Illegal' }
        ].map(({ emoji, label }) => (
          <span key={label} className="flex items-center gap-1.5 text-gray-300">
            <span className="text-base">{emoji}</span>
            <span>{label}</span>
          </span>
        ))}
      </div>

      {/* Critical Alerts */}
      {criticalCrew.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-red-400 font-medium flex items-center gap-2">
            <span>Critical Alerts ({criticalCrew.length})</span>
          </h3>
          {criticalCrew.map((crew) => {
            const criticalHour = crew.timeline.findIndex(t => t.remaining < 1);
            const criticalTime = hours[criticalHour] || 'Soon';

            return (
              <button
                key={crew.id}
                onClick={() => onAlertClick?.(crew)}
                className="w-full text-left p-4 bg-red-500/10 border border-red-500/30
                  rounded-xl hover:bg-red-500/20 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-white font-medium">{crew.name}</span>
                    <span className="text-gray-400"> ({crew.role})</span>
                  </div>
                  <span className="text-red-400 text-sm">Illegal by {criticalTime}</span>
                </div>
                <div className="text-gray-400 text-sm mt-1">
                  {crew.currentFlight} at risk - {crew.route}
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Selected Crew Detail */}
      {selectedCrew && (
        <div className="mt-6 bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
          <h3 className="text-blue-400 font-medium mb-3">{selectedCrew.name}</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-400">Role:</span>
              <span className="text-white ml-2">{selectedCrew.role}</span>
            </div>
            <div>
              <span className="text-gray-400">Base:</span>
              <span className="text-white ml-2">{selectedCrew.base}</span>
            </div>
            <div>
              <span className="text-gray-400">Current Flight:</span>
              <span className="text-white ml-2">{selectedCrew.currentFlight || 'None'}</span>
            </div>
            <div>
              <span className="text-gray-400">Duty Remaining:</span>
              <span className="text-white ml-2">{selectedCrew.dutyRemaining}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FatigueHeatmap;
