const OptionCard = ({ option, index, onSelect, recommended }) => {
  return (
    <div
      className={`
        bg-bg-elevated rounded-lg p-4 cursor-pointer transition-all
        border ${recommended ? 'border-green-500/30 bg-green-500/5' : 'border-white/10'}
        hover:border-white/20 hover:bg-white/5
      `}
      onClick={() => onSelect(option)}
    >
      {recommended && (
        <div className="flex items-center gap-1 text-green-400 text-xs font-semibold mb-2">
          <span>✓</span>
          <span>RECOMMENDED</span>
        </div>
      )}

      <div className="flex items-start gap-3 mb-2">
        <span className="flex-shrink-0 w-6 h-6 bg-accent-blue rounded-full flex items-center justify-center text-white text-xs font-bold">
          {index}
        </span>
        <div className="flex-1">
          <span className="text-white font-semibold block mb-1">{option.label}</span>
          <p className="text-text-secondary text-sm">{option.detail}</p>
        </div>
      </div>

      <div className="flex items-center gap-4 text-xs text-text-muted mt-3">
        <span>Cost: <strong className="text-text-primary">{option.cost}</strong></span>
        <span>•</span>
        <span>Impact: <strong className="text-text-primary">{option.impact}</strong></span>
      </div>

      <button className="mt-3 w-full px-4 py-2 bg-accent-blue hover:bg-blue-600 text-white text-sm rounded transition-colors">
        {option.actionLabel}
      </button>
    </div>
  );
};

export default OptionCard;
