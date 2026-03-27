export default function ProgressBar({ current, total, isDark }) {
  const percentage = (current / total) * 100;
  const d = isDark;

  return (
    <div className="w-full">
      <div className="flex justify-between mb-2">
        <p className={`text-sm font-semibold ${d ? 'text-slate-300' : 'text-gray-700'}`}>
          Question {current} of {total}
        </p>
        <p className={`text-sm font-bold ${d ? 'text-blue-400' : 'text-blue-600'}`}>
          {Math.round(percentage)}%
        </p>
      </div>
      <div className={`w-full rounded-full h-2.5 overflow-hidden ${d ? 'bg-slate-700' : 'bg-gray-200'}`}>
        <div
          className="bg-blue-600 h-full rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}