import { SUBJECTS } from '../data/questions';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

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
  const [subjectsRef, subjectsVisible] = useIntersectionObserver({ threshold: 0.2 });

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
      className={`min-h-screen p-4 transition-all duration-500 ${
        d
          ? 'bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 animate-gradient-dark'
          : 'bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 animate-gradient'
      }`}
    >
      {/* Top Nav */}
      <div className="max-w-3xl mx-auto flex justify-between items-center mb-10">
        <div className={`text-sm font-semibold animate-fadeInDown ${d ? 'text-slate-300' : 'text-gray-600'}`}>
          👋 Welcome back, <span className={d ? 'text-white' : 'text-gray-900'}>{userName}</span>
        </div>
        <div className="flex items-center gap-3">
          {/* Report Button */}
          <button
            onClick={() => onNavigate('report')}
            className={`hover-card relative text-sm font-semibold px-4 py-2 rounded-xl transition-all ${
              d
                ? 'bg-slate-700/70 text-slate-200 hover:bg-slate-600'
                : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white shadow-sm'
            }`}
          >
            📊 Report
            {sessionCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center pulse-dot">
                {sessionCount}
              </span>
            )}
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={onToggleDark}
            className={`p-3 rounded-2xl transition-all duration-300 hover:scale-110 active:scale-95 wobble-icon ${
              d
                ? 'bg-slate-700/70 text-yellow-400 hover:bg-slate-600'
                : 'bg-white/80 backdrop-blur-sm text-slate-600 hover:bg-white shadow-sm'
            }`}
            title="Toggle theme"
            aria-label="Toggle dark mode"
          >
            <span className="text-lg">{d ? '☀️' : '🌙'}</span>
          </button>

          {/* Logout */}
          <button
            onClick={onLogout}
            className={`text-sm font-semibold px-4 py-2 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 ${
              d
                ? 'bg-red-900/70 text-red-300 hover:bg-red-800'
                : 'bg-red-50/80 text-red-600 hover:bg-red-100 backdrop-blur-sm'
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
            className={`text-5xl font-extrabold tracking-tight mb-3 animate-fadeInUp ${
              d ? 'text-white' : 'text-gray-900'
            }`}
          >
            Quiz Master
          </h1>
          <p className={`text-xl animate-fadeInUp delay-200 ${d ? 'text-slate-400' : 'text-gray-500'}`}>
            Test your knowledge across multiple subjects
          </p>
        </div>

        {/* Mode Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div
            onClick={() => handleModeSelection('single')}
            className={`hover-card p-8 rounded-2xl shadow-lg cursor-pointer transition-all duration-300 border animate-fadeInUp delay-100 ${
              d
                ? 'bg-slate-800/70 border-slate-700/50 hover:border-indigo-500 backdrop-blur-sm'
                : 'bg-white/80 border-gray-100 hover:border-indigo-300 backdrop-blur-sm'
            }`}
          >
            <div className="text-4xl mb-4 float-emoji">📚</div>
            <h2 className={`text-2xl font-bold mb-3 ${d ? 'text-white' : 'text-gray-900'}`}>
              Single Subject
            </h2>
            <p className={`mb-5 text-sm leading-relaxed ${d ? 'text-slate-400' : 'text-gray-500'}`}>
              Choose a specific subject and test yourself with 15 questions (3 per chapter)
            </p>
            <button className="btn-glow w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold py-2.5 px-4 rounded-xl text-sm transition-all">
              Get Started →
            </button>
          </div>

          <div
            onClick={() => handleModeSelection('all')}
            className={`hover-card p-8 rounded-2xl shadow-lg cursor-pointer transition-all duration-300 border animate-fadeInUp delay-200 ${
              d
                ? 'bg-slate-800/70 border-slate-700/50 hover:border-purple-500 backdrop-blur-sm'
                : 'bg-white/80 border-gray-100 hover:border-purple-300 backdrop-blur-sm'
            }`}
          >
            <div className="text-4xl mb-4 float-emoji">🌟</div>
            <h2 className={`text-2xl font-bold mb-3 ${d ? 'text-white' : 'text-gray-900'}`}>
              All Subjects
            </h2>
            <p className={`mb-5 text-sm leading-relaxed ${d ? 'text-slate-400' : 'text-gray-500'}`}>
              Challenge yourself with questions from all 5 subjects (45 questions total)
            </p>
            <button className="btn-glow w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold py-2.5 px-4 rounded-xl text-sm transition-all">
              Get Started →
            </button>
          </div>
        </div>

        {/* Subjects - Scroll Animation */}
        <div
          ref={subjectsRef}
          className={`rounded-2xl shadow-lg p-6 transition-all duration-300 animate-fadeInUp delay-300 ${
            d ? 'bg-slate-800/60 border border-slate-700/50 backdrop-blur-sm' : 'glass-card'
          }`}
        >
          <h3 className={`text-lg font-bold mb-5 ${d ? 'text-white' : 'text-gray-900'}`}>
            <span className="float-emoji">📚</span> Available Subjects
          </h3>
          <div className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 ${subjectsVisible ? 'stagger-fade' : ''}`}>
            {Object.values(SUBJECTS).map((subject, idx) => (
              <div
                key={subject}
                className={`p-4 rounded-xl text-center transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-default ${
                  d
                    ? 'bg-slate-700 border border-slate-600 hover:border-indigo-500 hover:bg-slate-700'
                    : 'bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 hover:border-indigo-300'
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