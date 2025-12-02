import { useState } from 'react';

const CostComparison = ({ options, onSelect }) => {
  const [selectedId, setSelectedId] = useState(options[0]?.id);
  const selected = options.find(o => o.id === selectedId);

  // Add "Do Nothing" as worst case
  const allOptions = [
    ...options,
    { id: 'nothing', label: 'Do Nothing', cost: 47000, time: 0, risk: 'critical', breakdown: [
      { component: 'Flight Cancellation', cost: 28000, notes: 'CM 208 cancelled' },
      { component: 'Passenger Rebooking', cost: 12000, notes: '143 passengers' },
      { component: 'Crew Repositioning', cost: 7000, notes: 'Next day recovery' }
    ]}
  ];

  const maxCost = Math.max(...allOptions.map(o => o.cost));

  const getBarColor = (cost, recommended) => {
    if (recommended) return '#10b981';
    if (cost === 0) return '#10b981';
    if (cost > 10000) return '#ef4444';
    return '#3b82f6';
  };

  return (
    <div className="h-full p-6 overflow-auto">
      <h2 className="text-xl font-semibold text-white mb-2">Resolution Cost Comparison</h2>
      <p className="text-gray-400 text-sm mb-6">Click any option to see detailed breakdown</p>

      {/* Bar Chart */}
      <div className="space-y-3 mb-8">
        {allOptions.map((option) => (
          <div
            key={option.id}
            onClick={() => setSelectedId(option.id)}
            className={`p-4 rounded-xl cursor-pointer transition-all
              ${selectedId === option.id
                ? 'bg-white/10 ring-2 ring-blue-500'
                : 'bg-white/5 hover:bg-white/8'}`}
          >
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <span className="text-white font-medium">{option.label}</span>
                {option.recommended && (
                  <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-xs rounded-full">
                    RECOMMENDED
                  </span>
                )}
                {option.risk === 'critical' && (
                  <span className="px-2 py-0.5 bg-red-500/20 text-red-400 text-xs rounded-full">
                    NOT RECOMMENDED
                  </span>
                )}
              </div>
              <span className={`font-mono font-bold text-lg
                ${option.cost === 0 ? 'text-emerald-400' :
                  option.cost > 10000 ? 'text-red-400' : 'text-white'}`}>
                ${option.cost.toLocaleString()}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="h-3 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${Math.max((option.cost / maxCost) * 100, 2)}%`,
                  backgroundColor: getBarColor(option.cost, option.recommended)
                }}
              />
            </div>

            {option.time > 0 && (
              <div className="mt-2 text-gray-400 text-sm">
                {option.time} min resolution time
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Cost Breakdown Table */}
      {selected && (
        <div className="bg-white/5 rounded-xl p-5 border border-white/10">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-white font-medium">{selected.label}</h3>
            <span className={`px-3 py-1 rounded-full text-sm font-medium
              ${selected.recommended ? 'bg-emerald-500/20 text-emerald-400' :
                selected.risk === 'critical' ? 'bg-red-500/20 text-red-400' :
                'bg-blue-500/20 text-blue-400'}`}>
              {selected.recommended ? 'Best Option' :
               selected.risk === 'critical' ? 'Avoid' : 'Alternative'}
            </span>
          </div>

          <table className="w-full mb-4">
            <thead>
              <tr className="text-left text-gray-400 text-sm border-b border-white/10">
                <th className="pb-3">Component</th>
                <th className="pb-3 text-right">Cost</th>
                <th className="pb-3 pl-4">Notes</th>
              </tr>
            </thead>
            <tbody>
              {selected.breakdown?.map((item, i) => (
                <tr key={i} className="border-b border-white/5">
                  <td className="py-3 text-gray-300">{item.component}</td>
                  <td className="py-3 text-right font-mono text-white">
                    ${item.cost.toLocaleString()}
                  </td>
                  <td className="py-3 pl-4 text-gray-500 text-sm">{item.notes}</td>
                </tr>
              ))}
              <tr className="font-bold">
                <td className="pt-3 text-white">TOTAL</td>
                <td className="pt-3 text-right font-mono text-white">
                  ${selected.cost.toLocaleString()}
                </td>
                <td></td>
              </tr>
            </tbody>
          </table>

          {/* Quick Stats */}
          <div className="flex gap-6 text-sm border-t border-white/10 pt-4">
            {selected.time > 0 && (
              <div>
                <span className="text-gray-400">Resolution: </span>
                <span className="text-white">{selected.time} min</span>
              </div>
            )}
            <div>
              <span className="text-gray-400">Risk: </span>
              <span className={
                selected.risk === 'low' ? 'text-emerald-400' :
                selected.risk === 'medium' ? 'text-yellow-400' : 'text-red-400'
              }>
                {selected.risk || 'low'}
              </span>
            </div>
          </div>

          {/* Select Button */}
          {selected.id !== 'nothing' && (
            <button
              onClick={() => onSelect(selected)}
              className="w-full mt-4 py-3 bg-blue-500 hover:bg-blue-600
                text-white rounded-lg font-medium transition-colors"
            >
              Select: {selected.label}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default CostComparison;
