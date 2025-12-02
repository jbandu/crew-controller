import Avatar from '../../shared/Avatar';
import OptionCard from './OptionCard';

const AIOptions = ({ options, onSelectOption, timestamp }) => {
  return (
    <div className="flex gap-3 mb-6">
      <Avatar name="AI" size="md" type="ai" />
      <div className="flex-1">
        <div className="space-y-3">
          {options.map((option, index) => (
            <OptionCard
              key={option.id}
              option={option}
              index={option.id}
              onSelect={onSelectOption}
              recommended={option.recommended}
            />
          ))}
        </div>
        {timestamp && (
          <span className="text-xs text-text-muted mt-2 block">
            {timestamp.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
          </span>
        )}
      </div>
    </div>
  );
};

export default AIOptions;
