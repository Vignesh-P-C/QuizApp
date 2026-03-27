export default function Report({ sessionHistory, onNavigate, userName, isDark }) {
  const d = isDark;

  const totalQuizzes = sessionHistory.length;
  const avgScore =
    totalQuizzes > 0
      ? Math.round(
          sessionHistory.reduce((sum, h) => sum + h.percentage, 0) / totalQuizzes
        )
      : 0;
  const bestScore =
    totalQuizzes > 0 ? Math.max(...sessionHistory.map((h) => h.percentage)) : 0;

  const getScoreColor = (pct) => {
    if (pct >= 90) return 'text-green-500';
    if (pct >= 75) return 'text-blue-500';
    if (pct >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getScoreBadge = (pct) => {
    if (pct >= 90) return { label: 'Outstanding', cls: d ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-700' };
    if (pct >= 75) return { label: 'Great', cls: d ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-700' };
    if (pct >= 60) return { label: 'Good', cls: d ? 'bg-yellow-900 text-yellow-300' : 'bg-yellow-100 text-yellow-700' };
    return { label: 'Needs Work', cls: d ? 'bg-red-900 text-red-300' : 'bg-red-100 text-red-700' };
  };

  return (
    <div
      className={`min-h-screen p-4 transition-colors duration-300 ${
        d
          ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'
          : 'bg-gradient-to-br from-blue-50 to-indigo-100'
      }`}
    >
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => onNavigate('home')}
            className={`font-semibold text-sm flex items-center gap-1 transition-colors ${
              d ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'
            }`}
          >
            ← Back to Home
          </button>
          <h1 className={`text-2xl font-extrabold ${d ? 'text-white' : 'text-gray-900'}`}>
            Session Report
          </h1>
          <div className={`text-sm font-medium ${d ? 'text-slate-400' : 'text-gray-500'}`}>
            {userName}'s Session
          </div>
        </div>

        {/* Summary Cards */}
        {totalQuizzes > 0 && (
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { label: 'Quizzes Taken', value: totalQuizzes, icon: '📝' },
              { label: 'Average Score', value: `${avgScore}%`, icon: '📊' },
              { label: 'Best Score', value: `${bestScore}%`, icon: '🏆' },
            ].map((stat) => (
              <div
                key={stat.label}
                className={`rounded-2xl p-5 text-center shadow-lg transition-colors ${
                  d ? 'bg-slate-800 border border-slate-700' : 'bg-white'
                }`}
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <p
                  className={`text-2xl font-extrabold ${
                    d ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {stat.value}
                </p>
                <p className={`text-xs font-semibold mt-1 ${d ? 'text-slate-400' : 'text-gray-500'}`}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Quiz History */}
        <div
          className={`rounded-2xl shadow-lg p-6 transition-colors ${
            d ? 'bg-slate-800 border border-slate-700' : 'bg-white'
          }`}
        >
          <h2
            className={`text-xl font-bold mb-6 ${d ? 'text-white' : 'text-gray-900'}`}
          >
            Quiz History
          </h2>

          {totalQuizzes === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📭</div>
              <p className={`text-lg font-semibold ${d ? 'text-slate-300' : 'text-gray-600'}`}>
                No quizzes taken yet
              </p>
              <p className={`text-sm mt-2 ${d ? 'text-slate-500' : 'text-gray-400'}`}>
                Your quiz results will appear here during this session.
              </p>
              <button
                onClick={() => onNavigate('home')}
                className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded-xl text-sm transition-all"
              >
                Take Your First Quiz
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {sessionHistory.map((entry, idx) => {
                const badge = getScoreBadge(entry.percentage);
                return (
                  <div
                    key={entry.id}
                    className={`rounded-xl p-5 border transition-colors ${
                      d
                        ? 'bg-slate-700 border-slate-600'
                        : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                          <span
                            className={`text-xs font-bold px-2.5 py-1 rounded-full ${badge.cls}`}
                          >
                            {badge.label}
                          </span>
                          <span
                            className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                              d
                                ? 'bg-slate-600 text-slate-300'
                                : 'bg-gray-200 text-gray-600'
                            }`}
                          >
                            {entry.mode}
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-3">
                          {entry.subjects.map((s, i) => (
                            <span
                              key={i}
                              className={`text-xs font-semibold px-2 py-0.5 rounded ${
                                d
                                  ? 'bg-blue-900 text-blue-300'
                                  : 'bg-blue-50 text-blue-700'
                              }`}
                            >
                              {s}
                            </span>
                          ))}
                        </div>

                        <div
                          className={`text-sm ${d ? 'text-slate-400' : 'text-gray-500'}`}
                        >
                          <span className="font-semibold">
                            {entry.score}/{entry.total}
                          </span>{' '}
                          correct · {entry.fullDate} at {entry.date}
                        </div>

                        {/* Mini bar */}
                        <div
                          className={`mt-3 h-2 rounded-full overflow-hidden ${
                            d ? 'bg-slate-600' : 'bg-gray-200'
                          }`}
                        >
                          <div
                            className={`h-full rounded-full transition-all ${
                              entry.percentage >= 75
                                ? 'bg-green-500'
                                : entry.percentage >= 50
                                ? 'bg-yellow-500'
                                : 'bg-red-500'
                            }`}
                            style={{ width: `${entry.percentage}%` }}
                          />
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <p
                          className={`text-3xl font-extrabold leading-none ${getScoreColor(
                            entry.percentage
                          )}`}
                        >
                          {entry.percentage}%
                        </p>
                        <p
                          className={`text-xs mt-1 ${
                            d ? 'text-slate-500' : 'text-gray-400'
                          }`}
                        >
                          Quiz #{idx + 1}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {totalQuizzes > 0 && (
          <p
            className={`text-center text-xs mt-4 ${
              d ? 'text-slate-500' : 'text-gray-400'
            }`}
          >
            Report resets when you log out.
          </p>
        )}
      </div>
    </div>
  );
}