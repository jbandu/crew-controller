import Avatar from '../../shared/Avatar';

const UserMessage = ({ content, timestamp }) => {
  return (
    <div className="flex gap-3 mb-6">
      <Avatar name="User" size="md" type="user" />
      <div className="flex-1">
        <div className="bg-bg-elevated rounded-lg px-4 py-3">
          <p className="text-text-primary">{content}</p>
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

export default UserMessage;
