import { useState, useEffect } from 'react';
import { Play, X } from 'lucide-react';

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

  return (
    <>
      {/* Floating Action Button - Always visible, mobile-friendly */}
      {!visible && (
        <button
          onClick={() => setVisible(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-accent-blue hover:bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center z-50 transition-all hover:scale-110 active:scale-95"
          title="Open Demo Controls (Ctrl+D)"
        >
          <Play size={24} fill="white" />
        </button>
      )}

      {/* Demo Controls Panel */}
      {visible && (
        <div className="fixed bottom-6 right-6 bg-bg-elevated border border-white/20 rounded-lg p-4 shadow-2xl z-50 min-w-[280px]">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-semibold text-white">Demo Controls</h4>
            <button
              onClick={() => setVisible(false)}
              className="text-text-muted hover:text-white transition-colors"
              title="Close (Ctrl+D)"
            >
              <X size={20} />
            </button>
          </div>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => {
                onTriggerGreeting();
                setVisible(false);
              }}
              className="px-4 py-2 bg-accent-blue hover:bg-blue-600 text-white rounded text-sm font-medium transition-colors text-left"
            >
              Scene 1: Shift Start
            </button>
            <button
              onClick={() => {
                onTriggerDisruption();
                setVisible(false);
              }}
              className="px-4 py-2 bg-accent-red hover:bg-red-600 text-white rounded text-sm font-medium transition-colors text-left"
            >
              Scene 3: Disruption Alert
            </button>
            <button
              onClick={() => {
                onTriggerShiftEnd();
                setVisible(false);
              }}
              className="px-4 py-2 bg-accent-purple hover:bg-purple-600 text-white rounded text-sm font-medium transition-colors text-left"
            >
              Scene 5: Shift End
            </button>
          </div>
          <div className="mt-3 pt-3 border-t border-white/10 text-xs text-text-muted text-center">
            Keyboard: Ctrl+D
          </div>
        </div>
      )}
    </>
  );
};

export default DemoControls;
