import { useState, useEffect } from 'react';

export default function Timer({ initialSeconds, onTimeUp, isDark }) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const d = isDark;

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [onTimeUp]);

  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const displaySeconds = secs < 10 ? `0${secs}` : secs;
  const isLow = seconds <= 60;
  const isCritical = seconds <= 30;

  return (
    <div className="text-center">
      <p className={`text-xs font-semibold uppercase tracking-widest mb-2 ${d ? 'text-slate-400' : 'text-gray-500'}`}>
        Time Remaining
      </p>
      <p
        className={`text-3xl font-black tabular-nums transition-colors ${
          isCritical
            ? 'text-red-500 animate-pulse'
            : isLow
            ? 'text-yellow-500'
            : d
            ? 'text-blue-400'
            : 'text-blue-600'
        }`}
      >
        {minutes}:{displaySeconds}
      </p>
      {isLow && !isCritical && (
        <p className="text-xs text-yellow-500 font-medium mt-1">Running low!</p>
      )}
      {isCritical && (
        <p className="text-xs text-red-500 font-medium mt-1">Hurry up!</p>
      )}
    </div>
  );
}