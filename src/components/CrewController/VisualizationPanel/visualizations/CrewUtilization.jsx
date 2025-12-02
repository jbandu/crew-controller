import { useState } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const CrewUtilization = ({ data, onCrewSelect }) => {
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [selectedBase, setSelectedBase] = useState(null);
  const [sortBy, setSortBy] = useState('name');
  const [sortDir, setSortDir] = useState('asc');

  const statusData = [
    { name: 'On Duty', value: 412, color: '#10b981' },
    { name: 'Reserve', value: 24, color: '#3b82f6' },
    { name: 'Rest', value: 156, color: '#6b7280' },
    { name: 'Off', value: 89, color: '#374151' }
  ];

  const baseData = [
    { base: 'PTY', utilization: 87, total: 156, onDuty: 136 },
    { base: 'MIA', utilization: 62, total: 89, onDuty: 55 },
    { base: 'BOG', utilization: 71, total: 67, onDuty: 48 },
    { base: 'GRU', utilization: 45, total: 54, onDuty: 24 },
    { base: 'MDE', utilization: 82, total: 46, onDuty: 38 }
  ];

  // Filter crew based on selections
  const filteredCrew = data.crew.filter(c => {
    if (selectedStatus && c.statusLabel !== selectedStatus) return false;
    if (selectedBase && c.base !== selectedBase) return false;
    return true;
  });

  // Sort crew
  const sortedCrew = [...filteredCrew].sort((a, b) => {
    const aVal = a[sortBy];
    const bVal = b[sortBy];
    const dir = sortDir === 'asc' ? 1 : -1;
    return aVal > bVal ? dir : -dir;
  });

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortDir('asc');
    }
  };

  const clearFilters = () => {
    setSelectedStatus(null);
    setSelectedBase(null);
  };

  return (
    <div className="h-full p-6 overflow-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold text-white">Crew Utilization</h2>
          <p className="text-gray-400 text-sm">Click charts to filter - {data.crew.length} total crew</p>
        </div>
        <select className="bg-white/10 text-white rounded-lg px-3 py-2 text-sm border border-white/10">
          <option>Today</option>
          <option>Yesterday</option>
          <option>Last 7 Days</option>
        </select>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Donut Chart */}
        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <h3 className="text-gray-300 font-medium mb-4">By Status</h3>
          <div className="flex items-center gap-4">
            <ResponsiveContainer width={140} height={140}>
              <PieChart>
                <Pie
                  data={statusData}
                  innerRadius={40}
                  outerRadius={60}
                  dataKey="value"
                  onClick={(entry) => setSelectedStatus(
                    selectedStatus === entry.name ? null : entry.name
                  )}
                  className="cursor-pointer"
                >
                  {statusData.map((entry, i) => (
                    <Cell
                      key={i}
                      fill={entry.color}
                      stroke={selectedStatus === entry.name ? '#fff' : 'transparent'}
                      strokeWidth={2}
                      opacity={selectedStatus && selectedStatus !== entry.name ? 0.4 : 1}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2">
              {statusData.map((s) => (
                <button
                  key={s.name}
                  onClick={() => setSelectedStatus(selectedStatus === s.name ? null : s.name)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm w-full
                    transition-all ${selectedStatus === s.name ? 'bg-white/15' : 'hover:bg-white/5'}`}
                >
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: s.color }}
                  />
                  <span className="text-gray-300 flex-1 text-left">{s.name}</span>
                  <span className="text-white font-medium">{s.value}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <h3 className="text-gray-300 font-medium mb-4">By Base</h3>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={baseData} layout="vertical">
              <XAxis type="number" domain={[0, 100]} tick={{ fill: '#9ca3af', fontSize: 12 }} />
              <YAxis
                type="category"
                dataKey="base"
                tick={{ fill: '#9ca3af', fontSize: 12 }}
                width={40}
              />
              <Tooltip
                content={({ payload }) => payload?.[0] && (
                  <div className="bg-gray-900 border border-white/20 p-3 rounded-lg text-sm">
                    <div className="text-white font-medium">{payload[0].payload.base}</div>
                    <div className="text-gray-400">{payload[0].payload.onDuty} / {payload[0].payload.total} crew</div>
                    <div className="text-emerald-400">{payload[0].value}% utilized</div>
                  </div>
                )}
              />
              <Bar
                dataKey="utilization"
                radius={[0, 4, 4, 0]}
                onClick={(entry) => setSelectedBase(
                  selectedBase === entry.base ? null : entry.base
                )}
                className="cursor-pointer"
              >
                {baseData.map((entry, i) => (
                  <Cell
                    key={i}
                    fill={selectedBase === entry.base ? '#3b82f6' : '#3b82f6'}
                    opacity={selectedBase && selectedBase !== entry.base ? 0.4 : 1}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Filter Pills */}
      {(selectedStatus || selectedBase) && (
        <div className="flex items-center gap-2 mb-4">
          <span className="text-gray-400 text-sm">Filters:</span>
          {selectedStatus && (
            <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm flex items-center gap-2">
              {selectedStatus}
              <button onClick={() => setSelectedStatus(null)} className="hover:text-white">×</button>
            </span>
          )}
          {selectedBase && (
            <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm flex items-center gap-2">
              {selectedBase}
              <button onClick={() => setSelectedBase(null)} className="hover:text-white">×</button>
            </span>
          )}
          <button onClick={clearFilters} className="text-gray-400 text-sm hover:text-white ml-2">
            Clear all
          </button>
        </div>
      )}

      {/* Data Table */}
      <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-400 text-sm border-b border-white/10 bg-white/5">
              <th
                className="py-3 px-4 cursor-pointer hover:text-white"
                onClick={() => handleSort('name')}
              >
                Name {sortBy === 'name' && (sortDir === 'asc' ? '↑' : '↓')}
              </th>
              <th
                className="py-3 px-4 cursor-pointer hover:text-white"
                onClick={() => handleSort('statusLabel')}
              >
                Status {sortBy === 'statusLabel' && (sortDir === 'asc' ? '↑' : '↓')}
              </th>
              <th
                className="py-3 px-4 cursor-pointer hover:text-white"
                onClick={() => handleSort('dutyRemaining')}
              >
                Duty Remaining {sortBy === 'dutyRemaining' && (sortDir === 'asc' ? '↑' : '↓')}
              </th>
              <th className="py-3 px-4">Base</th>
              <th className="py-3 px-4">Current Flight</th>
            </tr>
          </thead>
          <tbody>
            {sortedCrew.slice(0, 10).map((crew) => (
              <tr
                key={crew.id}
                onClick={() => onCrewSelect?.(crew)}
                className="border-b border-white/5 cursor-pointer hover:bg-white/5 transition-colors"
              >
                <td className="py-3 px-4">
                  <div className="text-white font-medium">{crew.name}</div>
                  <div className="text-gray-500 text-xs">{crew.role}</div>
                </td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded text-xs font-medium
                    ${crew.status === 'critical' ? 'bg-red-500/20 text-red-400' :
                      crew.status === 'reserve' ? 'bg-blue-500/20 text-blue-400' :
                      crew.status === 'rest' ? 'bg-gray-500/20 text-gray-400' :
                      'bg-emerald-500/20 text-emerald-400'}`}>
                    {crew.statusLabel}
                  </span>
                </td>
                <td className="py-3 px-4 text-gray-300 font-mono">{crew.dutyRemaining}</td>
                <td className="py-3 px-4 text-gray-300">{crew.base}</td>
                <td className="py-3 px-4 text-gray-400">{crew.currentFlight || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {sortedCrew.length > 10 && (
          <div className="py-3 px-4 text-center text-gray-400 text-sm border-t border-white/10">
            Showing 10 of {sortedCrew.length} crew members
          </div>
        )}
      </div>
    </div>
  );
};

export default CrewUtilization;
