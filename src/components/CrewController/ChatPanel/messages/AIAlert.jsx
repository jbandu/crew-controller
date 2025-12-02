import Avatar from '../../shared/Avatar';
import Badge from '../../shared/Badge';
import ReactMarkdown from 'react-markdown';

const AIAlert = ({ title, severity = 'critical', content, timestamp }) => {
  const severityConfig = {
    critical: { variant: 'error', icon: '🚨', label: 'CRITICAL' },
    warning: { variant: 'warning', icon: '⚠️', label: 'WARNING' },
    info: { variant: 'info', icon: 'ℹ️', label: 'INFO' }
  };

  const config = severityConfig[severity] || severityConfig.critical;

  return (
    <div className="flex gap-3 mb-6">
      <Avatar name="AI" size="md" type="ai" />
      <div className="flex-1">
        <div className="bg-bg-card rounded-lg px-4 py-3 border-2 border-red-500/30">
          <div className="flex items-center gap-2 mb-3">
            <Badge variant={config.variant} size="sm">
              {config.icon} {config.label}
            </Badge>
            <h3 className="text-white font-semibold">{title}</h3>
          </div>
          <ReactMarkdown
            className="text-text-primary prose prose-invert prose-sm max-w-none"
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
        {timestamp && (
          <span className="text-xs text-text-muted mt-1 block">
            {timestamp.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
          </span>
        )}
      </div>
    </div>
  );
};

export default AIAlert;
