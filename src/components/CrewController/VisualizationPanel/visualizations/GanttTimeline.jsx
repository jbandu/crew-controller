import { motion } from 'framer-motion';
import { crewMembers } from '../../../../data/crewData';

const GanttTimeline = ({ highlightCrew, nowTime = '08:47' }) => {
  const timeRange = { start: 6, end: 20 }; // 6 AM to 8 PM
  const hourWidth = 60; // pixels per hour

  const getStatusColor = (status) => ({
    legal: '#22c55e',
    warning: '#eab308',
    critical: '#ef4444',
    reserve: '#3b82f6',
    deadhead: '#a855f7'
  }[status] || '#64748b');

  const calculateLeft = (time) => {
    const [h, m] = time.split(':').map(Number);
    const hours = h + m / 60 - timeRange.start;
    return hours * hourWidth;
  };

  const calculateWidth = (start, end) => {
    const [sh, sm] = start.split(':').map(Number);
    const [eh, em] = end.split(':').map(Number);
    const duration = (eh + em / 60) - (sh + sm / 60);
    return duration * hourWidth;
  };

  const timeLabels = [];
  for (let i = timeRange.start; i <= timeRange.end; i++) {
    timeLabels.push(`${String(i).padStart(2, '0')}:00`);
  }

  return (
    <div className="p-6 overflow-x-auto">
      <h2 className="text-2xl font-bold text-white mb-6">Crew Timeline</h2>

      <div className="relative">
        {/* Time Header */}
        <div className="flex mb-4" style={{ marginLeft: '200px' }}>
          {timeLabels.map((time, i) => (
            <div key={i} className="text-xs text-text-muted" style={{ width: `${hourWidth}px` }}>
              {time}
            </div>
          ))}
        </div>

        {/* NOW Line */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-accent-cyan z-10"
          style={{ left: `${calculateLeft(nowTime) + 200}px` }}
        >
          <div className="absolute -top-2 -left-6 bg-accent-cyan text-white text-xs px-2 py-0.5 rounded font-semibold">
            NOW
          </div>
        </div>

        {/* Crew Rows */}
        {crewMembers.slice(0, 6).map((crew, idx) => (
          <div
            key={crew.id}
            className={`flex items-center mb-3 ${
              highlightCrew === crew.id ? 'bg-accent-blue/10 rounded-lg' : ''
            }`}
          >
            {/* Crew Info */}
            <div className="w-48 pr-4">
              <div className="text-white font-semibold text-sm">{crew.name}</div>
              <div className="text-text-muted text-xs">{crew.role} • {crew.dutyRemaining}</div>
            </div>

            {/* Timeline */}
            <div className="relative h-12 flex-1" style={{ width: `${(timeRange.end - timeRange.start) * hourWidth}px` }}>
              {/* Background grid */}
              {timeLabels.map((_, i) => (
                <div
                  key={i}
                  className="absolute top-0 bottom-0 border-l border-white/5"
                  style={{ left: `${i * hourWidth}px` }}
                />
              ))}

              {/* Segments */}
              {crew.segments.map((seg, segIdx) => (
                <motion.div
                  key={segIdx}
                  className="absolute top-2 h-8 rounded flex items-center justify-center text-xs text-white font-semibold cursor-pointer hover:shadow-lg transition-shadow"
                  style={{
                    left: `${calculateLeft(seg.start)}px`,
                    width: `${calculateWidth(seg.start, seg.end)}px`,
                    backgroundColor: getStatusColor(seg.status)
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 + segIdx * 0.1 }}
                  title={`${seg.flight}: ${seg.route}`}
                >
                  {seg.flight}
                </motion.div>
              ))}

              {/* Duty Limit Line */}
              {crew.dutyLimit && (
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-red-500 z-5"
                  style={{ left: `${calculateLeft(crew.dutyLimit)}px` }}
                >
                  <div className="absolute -top-2 -left-8 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded">
                    LIMIT
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-6 flex items-center gap-4 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: getStatusColor('legal') }} />
          <span className="text-text-secondary">Legal</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: getStatusColor('warning') }} />
          <span className="text-text-secondary">Warning</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: getStatusColor('critical') }} />
          <span className="text-text-secondary">Critical</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: getStatusColor('reserve') }} />
          <span className="text-text-secondary">Reserve</span>
        </div>
      </div>
    </div>
  );
};

export default GanttTimeline;
