import { getStrengthsAndWeaknesses } from '../utils/analysis';

export default function Result({
  score,
  totalQuestions,
  analysis,
  onNavigate,
  onPracticeWeakAreas,
  userName,
  isDark,
}) {
  const d = isDark;
  const { strengths, weaknesses } = getStrengthsAndWeaknesses(analysis);
  const percentage = Math.round((score / totalQuestions) * 100);

  const getPerformanceMessage = () => {
    if (percentage >= 90) return 'Outstanding performance! 🏆';
    if (percentage >= 75) return 'Great job! 🎉';
    if (percentage >= 60) return 'Good effort! 👍';
    if (percentage >= 50) return 'Keep practicing! 💪';
    return 'More practice needed! 📚';
  };

  const getPerformanceColor = () => {
    if (percentage >= 90) return 'text-green-500';
    if (percentage >= 75) return 'text-blue-500';
    if (percentage >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div
      className={`min-h-screen p-4 transition-colors duration-300 ${
        d
          ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'
          : 'bg-gradient-to-br from-blue-50 to-indigo-100'
      }`}
    >
      <div className="max-w-2xl mx-auto">
        <div
          className={`p-8 rounded-2xl shadow-lg mb-6 transition-colors ${
            d ? 'bg-slate-800 border border-slate-700' : 'bg-white'
          }`}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className={`text-4xl font-extrabold mb-2 ${d ? 'text-white' : 'text-gray-900'}`}>
              Quiz Complete!
            </h1>
            <p className={`text-lg ${d ? 'text-slate-400' : 'text-gray-500'}`}>
              Well done, <strong className={d ? 'text-white' : 'text-gray-900'}>{userName}</strong>!
            </p>
          </div>

          {/* Score */}
          <div className={`text-center mb-8 ${getPerformanceColor()}`}>
            <p className="text-7xl font-black leading-none">{percentage}%</p>
            <p className={`text-xl font-bold mt-3 ${d ? 'text-slate-200' : 'text-gray-700'}`}>
              {score} / {totalQuestions} correct
            </p>
            <p className="text-base mt-2">{getPerformanceMessage()}</p>
          </div>

          {/* Strengths */}
          {strengths.length > 0 && (
            <div
              className={`mb-6 p-5 rounded-xl ${
                d ? 'bg-green-900/30 border border-green-800' : 'bg-green-50'
              }`}
            >
              <h3 className={`text-lg font-bold mb-4 ${d ? 'text-green-400' : 'text-green-700'}`}>
                ✅ Your Strengths
              </h3>
              <div className="space-y-2">
                {strengths.map((item, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg border-l-4 border-green-500 ${
                      d ? 'bg-slate-800' : 'bg-white'
                    }`}
                  >
                    <p className={`font-semibold text-sm ${d ? 'text-slate-200' : 'text-gray-900'}`}>
                      {item.subject} — {item.chapter}
                    </p>
                    <p className={`text-xs mt-0.5 ${d ? 'text-slate-400' : 'text-gray-500'}`}>
                      {item.correct}/{item.total} correct ({item.accuracy}%)
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Weaknesses */}
          {weaknesses.length > 0 && (
            <div
              className={`mb-6 p-5 rounded-xl ${
                d ? 'bg-red-900/30 border border-red-800' : 'bg-red-50'
              }`}
            >
              <h3 className={`text-lg font-bold mb-4 ${d ? 'text-red-400' : 'text-red-700'}`}>
                📌 Areas to Improve
              </h3>
              <div className="space-y-2">
                {weaknesses.map((item, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg border-l-4 border-red-500 ${
                      d ? 'bg-slate-800' : 'bg-white'
                    }`}
                  >
                    <p className={`font-semibold text-sm ${d ? 'text-slate-200' : 'text-gray-900'}`}>
                      {item.subject} — {item.chapter}
                    </p>
                    <p className={`text-xs mt-0.5 ${d ? 'text-slate-400' : 'text-gray-500'}`}>
                      {item.correct}/{item.total} correct ({item.accuracy}%)
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Summary */}
          <div
            className={`mb-6 p-5 rounded-xl ${
              d ? 'bg-blue-900/20 border border-blue-800/50' : 'bg-blue-50'
            }`}
          >
            <h3 className={`text-lg font-bold mb-4 ${d ? 'text-blue-400' : 'text-blue-700'}`}>
              📊 Quiz Summary
            </h3>
            <div className={`grid grid-cols-2 gap-3 text-sm ${d ? 'text-slate-300' : 'text-gray-700'}`}>
              {[
                ['Total Questions', totalQuestions],
                ['Correct Answers', score],
                ['Wrong Answers', totalQuestions - score],
                ['Accuracy', `${percentage}%`],
              ].map(([label, val]) => (
                <div
                  key={label}
                  className={`p-3 rounded-lg ${d ? 'bg-slate-800' : 'bg-white'}`}
                >
                  <p className={`text-xs ${d ? 'text-slate-500' : 'text-gray-400'}`}>{label}</p>
                  <p className={`font-bold text-lg ${d ? 'text-white' : 'text-gray-900'}`}>{val}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => onNavigate('home')}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl transition-all text-sm"
            >
              🏠 Home
            </button>
            <button
              onClick={() => onNavigate('report')}
              className={`flex-1 font-bold py-3 px-4 rounded-xl transition-all text-sm ${
                d
                  ? 'bg-slate-700 text-slate-200 hover:bg-slate-600'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              📊 View Report
            </button>
            {weaknesses.length > 0 && (
              <button
                onClick={onPracticeWeakAreas}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-xl transition-all text-sm"
              >
                🔄 Practice Weak Areas
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}