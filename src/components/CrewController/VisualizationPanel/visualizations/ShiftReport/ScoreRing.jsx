import { useState, useEffect } from 'react';

const ScoreRing = ({ score, maxScore = 100 }) => {
  const [animatedScore, setAnimatedScore] = useState(0);
  const percentage = (score / maxScore) * 100;
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  useEffect(() => {
    // Animate count up over 1.5s
    let current = 0;
    const increment = score / 60;
    const timer = setInterval(() => {
      current += increment;
      if (current >= score) {
        setAnimatedScore(score);
        clearInterval(timer);
      } else {
        setAnimatedScore(Math.floor(current));
      }
    }, 25);
    return () => clearInterval(timer);
  }, [score]);

  const getColor = (s) => {
    if (s >= 90) return '#10b981';
    if (s >= 75) return '#3b82f6';
    if (s >= 60) return '#eab308';
    return '#ef4444';
  };

  const getLabel = (s) => {
    if (s >= 90) return 'Excellent';
    if (s >= 75) return 'Good';
    if (s >= 60) return 'Fair';
    return 'Needs Improvement';
  };

  return (
    <div className="relative flex items-center justify-center">
      <svg width="180" height="180" viewBox="0 0 100 100" className="transform -rotate-90">
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="8"
        />
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke={getColor(score)}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          style={{ transition: 'stroke-dashoffset 1.5s ease-out' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="flex items-baseline">
          <span className="text-4xl font-bold text-white">{animatedScore}</span>
          <span className="text-xl text-text-muted ml-1">/{maxScore}</span>
        </div>
        <span className="text-sm font-semibold mt-1" style={{ color: getColor(score) }}>
          {getLabel(score)}
        </span>
      </div>
    </div>
  );
};

export default ScoreRing;
