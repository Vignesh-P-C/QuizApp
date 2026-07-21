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
      <div className="relative inline-flex items-center justify-center">
        <p
          className={`text-3xl font-black tabular-nums transition-all duration-300 ${
            isCritical
              ? 'text-red-500 timer-critical'
              : isLow
              ? 'text-yellow-500'
              : d
              ? 'text-indigo-400'
              : 'text-indigo-600'
          }`}
        >
          {minutes}:{displaySeconds}
        </p>
      </div>
      {/* Mini visual bar */}
      <div className={`mt-3 h-1.5 rounded-full overflow-hidden ${d ? 'bg-slate-700' : 'bg-gray-200'}`}>
        <div
          className={`h-full rounded-full transition-all duration-1000 ${
            isCritical
              ? 'bg-red-500'
              : isLow
              ? 'bg-yellow-500'
              : d
              ? 'bg-indigo-500'
              : 'bg-indigo-500'
          }`}
          style={{ width: `${(seconds / initialSeconds) * 100}%` }}
        />
      </div>
      {isLow && !isCritical && (
        <p className="text-xs text-yellow-500 font-bold mt-2 animate-pulse">Running low!</p>
      )}
      {isCritical && (
        <p className="text-xs text-red-500 font-bold mt-2 timer-critical">Hurry up!</p>
      )}
    </div>
  );
}