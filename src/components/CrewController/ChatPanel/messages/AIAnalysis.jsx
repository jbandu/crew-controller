import Avatar from '../../shared/Avatar';
import ReactMarkdown from 'react-markdown';

const AIAnalysis = ({ content, timestamp, actions }) => {
  return (
    <div className="flex gap-3 mb-6">
      <Avatar name="AI" size="md" type="ai" />
      <div className="flex-1">
        <div className="bg-bg-card rounded-lg px-4 py-3 border border-white/5">
          <div className="text-text-primary prose prose-invert prose-sm max-w-none">
            <ReactMarkdown
              components={{
                p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                ul: ({ children }) => <ul className="list-disc ml-4 mb-2 last:mb-0 space-y-1">{children}</ul>,
                li: ({ children }) => <li className="text-text-secondary">{children}</li>,
                strong: ({ children }) => <strong className="text-white font-semibold">{children}</strong>
              }}
            >
              {content}
            </ReactMarkdown>
          </div>
          {actions && actions.length > 0 && (
            <div className="flex gap-2 mt-4">
              {actions.map((action, idx) => (
                <button
                  key={idx}
                  className="px-3 py-1.5 bg-accent-blue hover:bg-blue-600 text-white text-sm rounded transition-colors"
                >
                  {action}
                </button>
              ))}
            </div>
          )}
        </div>
        {timestamp && (
          <span className="text-xs text-text-muted mt-1 block">
            {timestamp.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
          </span>
        )}
      </div>
    </div>
  );
};

export default AIAnalysis;
