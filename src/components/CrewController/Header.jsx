import { useState, useEffect } from 'react';
import Avatar from './shared/Avatar';

const Header = ({ controller = 'Ilango', hub = 'PTY', date = 'December 1, 2025' }) => {
  const [currentTime, setCurrentTime] = useState('08:47');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="bg-bg-secondary border-b border-white/10 px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <span className="text-xl font-bold text-white">Copa Airlines</span>
        <span className="text-text-muted">|</span>
        <span className="text-text-secondary">Crew Control • {hub} Hub</span>
      </div>
      <div className="flex items-center gap-6">
        <span className="text-text-secondary">{date}</span>
        <span className="text-text-primary font-mono font-semibold">{currentTime}</span>
        <div className="flex items-center gap-2">
          <Avatar name={controller} size="sm" />
          <span className="text-text-primary">{controller}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
