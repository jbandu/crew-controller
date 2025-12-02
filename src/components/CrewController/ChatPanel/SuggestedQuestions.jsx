import { suggestedQuestions } from '../../../data/suggestedQuestions';

const SuggestedQuestions = ({ onSelect }) => {
  return (
    <div className="px-6 py-4 border-t border-white/10">
      <div className="flex flex-wrap gap-2">
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
    </div>
  );
};

export default SuggestedQuestions;
