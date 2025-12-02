const Avatar = ({ name, size = 'md', type = 'user' }) => {
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base'
  };

  const getInitials = (name) => {
    if (!name) return '?';
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name[0].toUpperCase();
  };

  const bgColor = type === 'ai' ? 'bg-accent-blue' : 'bg-accent-purple';

  return (
    <div className={`${sizes[size]} ${bgColor} rounded-full flex items-center justify-center font-semibold text-white`}>
      {type === 'ai' ? '🤖' : getInitials(name)}
    </div>
  );
};

export default Avatar;
