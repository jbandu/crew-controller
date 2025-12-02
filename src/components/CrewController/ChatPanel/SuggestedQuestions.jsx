import { Trash2 } from 'lucide-react';
import { suggestedQuestions } from '../../../data/suggestedQuestions';

const SuggestedQuestions = ({ onSelect, onClear }) => {
  return (
    <div className="px-6 py-4 border-t border-white/10">
      <div className="flex items-center gap-3">
        <div className="flex-1 flex flex-wrap gap-2">
          {suggestedQuestions.map(q => (
            <button
              key={q.id}
              className="inline-flex items-center gap-2 px-3 py-2 bg-bg-elevated hover:bg-bg-card border border-white/10 hover:border-white/20 rounded-lg text-sm text-text-secondary hover:text-text-primary transition-all"
              onClick={() => onSelect(q)}
            >
              <span>{q.icon}</span>
              <span>{q.short}</span>
            </button>
          ))}
        </div>
        {onClear && (
          <button
            onClick={onClear}
            className="flex-shrink-0 inline-flex items-center gap-2 px-3 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 hover:border-red-500/50 rounded-lg text-sm text-red-400 hover:text-red-300 transition-all"
            title="Clear conversation"
          >
            <Trash2 size={16} />
            <span>Clear</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default SuggestedQuestions;
