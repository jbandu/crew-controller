import { useState } from 'react';
import ReportCard from './ReportCard';
import HandoffBriefing from './HandoffBriefing';

const ShiftReport = () => {
  const [activeTab, setActiveTab] = useState('report');

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-white mb-6">Shift Report</h2>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-white/10">
        <button
          className={`px-4 py-2 font-semibold transition-colors ${
            activeTab === 'report'
              ? 'text-white border-b-2 border-accent-blue'
              : 'text-text-muted hover:text-text-primary'
          }`}
          onClick={() => setActiveTab('report')}
        >
          Performance
        </button>
        <button
          className={`px-4 py-2 font-semibold transition-colors ${
            activeTab === 'handoff'
              ? 'text-white border-b-2 border-accent-blue'
              : 'text-text-muted hover:text-text-primary'
          }`}
          onClick={() => setActiveTab('handoff')}
        >
          Handoff Briefing
        </button>
      </div>

      {/* Content */}
      <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 220px)' }}>
        {activeTab === 'report' ? <ReportCard /> : <HandoffBriefing />}
      </div>
    </div>
  );
};

export default ShiftReport;
