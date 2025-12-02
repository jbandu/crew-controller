import { useState, useEffect } from 'react';

const DemoControls = ({ onTriggerGreeting, onTriggerDisruption, onTriggerShiftEnd }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      if (e.ctrlKey && e.key === 'd') {
        e.preventDefault();
        setVisible(v => !v);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 bg-bg-elevated border border-white/20 rounded-lg p-4 shadow-lg z-50">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-semibold text-white">Demo Controls</h4>
        <button
          onClick={() => setVisible(false)}
          className="text-text-muted hover:text-white text-xs"
        >
          Ctrl+D to hide
        </button>
      </div>
      <div className="flex flex-col gap-2">
        <button
          onClick={onTriggerGreeting}
          className="px-4 py-2 bg-accent-blue hover:bg-blue-600 text-white rounded text-sm font-medium transition-colors"
        >
          Scene 1: Shift Start
        </button>
        <button
          onClick={onTriggerDisruption}
          className="px-4 py-2 bg-accent-red hover:bg-red-600 text-white rounded text-sm font-medium transition-colors"
        >
          Scene 3: Disruption Alert
        </button>
        <button
          onClick={onTriggerShiftEnd}
          className="px-4 py-2 bg-accent-purple hover:bg-purple-600 text-white rounded text-sm font-medium transition-colors"
        >
          Scene 5: Shift End
        </button>
      </div>
    </div>
  );
};

export default DemoControls;
