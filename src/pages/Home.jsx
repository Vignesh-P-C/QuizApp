import { SUBJECTS } from '../data/questions';

export default function Home({
  onNavigate,
  onStartQuiz,
  onLogout,
  isDark,
  onToggleDark,
  userName,
  sessionCount,
}) {
  const d = isDark;

  const handleModeSelection = (mode) => {
    if (mode === 'all') {
      onStartQuiz(mode, []);
      onNavigate('quiz');
    } else {
      onNavigate('entry');
    }
  };

  return (
    <div
      className={`min-h-screen p-4 transition-colors duration-300 ${
        d
          ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'
          : 'bg-gradient-to-br from-blue-50 to-indigo-100'
      }`}
    >
      {/* Top Nav */}
      <div className="max-w-3xl mx-auto flex justify-between items-center mb-10">
        <div className={`text-sm font-semibold ${d ? 'text-slate-300' : 'text-gray-600'}`}>
          👋 Welcome back, <span className={d ? 'text-white' : 'text-gray-900'}>{userName}</span>
        </div>
        <div className="flex items-center gap-3">
          {/* Report Button */}
          <button
            onClick={() => onNavigate('report')}
            className={`relative text-sm font-semibold px-4 py-2 rounded-xl transition-all ${
              d
                ? 'bg-slate-700 text-slate-200 hover:bg-slate-600'
                : 'bg-white text-gray-700 hover:bg-gray-100 shadow-sm'
            }`}
          >
            📊 Report
            {sessionCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {sessionCount}
              </span>
            )}
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={onToggleDark}
            className={`p-2 rounded-xl transition-all ${
              d
                ? 'bg-slate-700 text-yellow-400 hover:bg-slate-600'
                : 'bg-white text-slate-600 hover:bg-gray-100 shadow-sm'
            }`}
            title="Toggle theme"
          >
            {d ? '☀️' : '🌙'}
          </button>

          {/* Logout */}
          <button
            onClick={onLogout}
            className={`text-sm font-semibold px-4 py-2 rounded-xl transition-all ${
              d
                ? 'bg-red-900 text-red-300 hover:bg-red-800'
                : 'bg-red-50 text-red-600 hover:bg-red-100'
            }`}
          >
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto">
        {/* Title */}
        <div className="text-center mb-12">
          <h1
            className={`text-5xl font-extrabold tracking-tight mb-3 ${
              d ? 'text-white' : 'text-gray-900'
            }`}
          >
            Quiz Master
          </h1>
          <p className={`text-xl ${d ? 'text-slate-400' : 'text-gray-500'}`}>
            Test your knowledge across multiple subjects
          </p>
        </div>

        {/* Mode Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div
            onClick={() => handleModeSelection('single')}
            className={`p-8 rounded-2xl shadow-lg cursor-pointer hover:shadow-xl hover:scale-105 transition-all border ${
              d
                ? 'bg-slate-800 border-slate-700 hover:border-blue-500'
                : 'bg-white border-gray-100 hover:border-blue-200'
            }`}
          >
            <div className="text-4xl mb-4">📚</div>
            <h2 className={`text-2xl font-bold mb-3 ${d ? 'text-white' : 'text-gray-900'}`}>
              Single Subject
            </h2>
            <p className={`mb-5 text-sm leading-relaxed ${d ? 'text-slate-400' : 'text-gray-500'}`}>
              Choose a specific subject and test yourself with 15 questions (3 per chapter)
            </p>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-xl text-sm transition-all">
              Get Started →
            </button>
          </div>

          <div
            onClick={() => handleModeSelection('all')}
            className={`p-8 rounded-2xl shadow-lg cursor-pointer hover:shadow-xl hover:scale-105 transition-all border ${
              d
                ? 'bg-slate-800 border-slate-700 hover:border-indigo-500'
                : 'bg-white border-gray-100 hover:border-indigo-200'
            }`}
          >
            <div className="text-4xl mb-4">🌟</div>
            <h2 className={`text-2xl font-bold mb-3 ${d ? 'text-white' : 'text-gray-900'}`}>
              All Subjects
            </h2>
            <p className={`mb-5 text-sm leading-relaxed ${d ? 'text-slate-400' : 'text-gray-500'}`}>
              Challenge yourself with questions from all 5 subjects (45 questions total)
            </p>
            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 px-4 rounded-xl text-sm transition-all">
              Get Started →
            </button>
          </div>
        </div>

        {/* Subjects */}
        <div
          className={`rounded-2xl shadow-lg p-6 transition-colors ${
            d ? 'bg-slate-800 border border-slate-700' : 'bg-white'
          }`}
        >
          <h3 className={`text-lg font-bold mb-5 ${d ? 'text-white' : 'text-gray-900'}`}>
            Available Subjects
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {Object.values(SUBJECTS).map((subject) => (
              <div
                key={subject}
                className={`p-4 rounded-xl text-center transition-colors ${
                  d
                    ? 'bg-slate-700 border border-slate-600'
                    : 'bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100'
                }`}
              >
                <p className={`font-semibold text-sm ${d ? 'text-slate-200' : 'text-gray-900'}`}>
                  {subject}
                </p>
                <p className={`text-xs mt-1 ${d ? 'text-slate-500' : 'text-gray-500'}`}>
                  5 chapters
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}