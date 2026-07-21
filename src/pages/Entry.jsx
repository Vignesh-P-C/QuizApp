import { useState, useContext } from 'react';
import { SUBJECTS } from '../data/questions';
import { QuizContext } from '../context/QuizContext';

export default function Entry({ onNavigate, onStartQuiz, isDark }) {
  const { state } = useContext(QuizContext);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const d = isDark;

  const toggleSubject = (subject) => {
    setSelectedSubjects((prev) =>
      prev.includes(subject)
        ? prev.filter((s) => s !== subject)
        : [...prev, subject]
    );
  };

  const handleStartQuiz = () => {
    if (selectedSubjects.length === 0) {
      alert('Please select at least one subject');
      return;
    }
    onStartQuiz('single', selectedSubjects);
    onNavigate('quiz');
  };

  return (
    <div
      className={`min-h-screen p-4 transition-all duration-500 ${
        d
          ? 'bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 animate-gradient-dark'
          : 'bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 animate-gradient'
      }`}
    >
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => onNavigate('home')}
          className={`mb-6 font-semibold text-sm flex items-center gap-1 transition-all duration-200 hover:scale-105 ${
            d ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-800'
          }`}
        >
          ← Back to Home
        </button>

        <div
          className={`p-8 rounded-2xl shadow-lg transition-all duration-500 animate-fadeInUp ${
            d ? 'bg-slate-800/60 border border-slate-700/50 backdrop-blur-xl' : 'glass-card'
          }`}
        >
          <h1 className={`text-3xl font-extrabold mb-2 animate-fadeInDown ${d ? 'text-white' : 'text-gray-900'}`}>
            <span className="float-emoji">📝</span> Single Subject Quiz
          </h1>
          <p className={`text-sm mb-8 animate-fadeInUp delay-100 ${d ? 'text-slate-400' : 'text-gray-500'}`}>
            Logged in as <strong className={d ? 'text-slate-200' : 'text-gray-700'}>{state.userName}</strong>
          </p>

          <div className="mb-6">
            <label
              className={`block text-sm font-bold mb-4 ${d ? 'text-slate-300' : 'text-gray-700'}`}
            >
              Select Subjects
              <span className={`ml-2 text-xs font-normal ${d ? 'text-slate-500' : 'text-gray-400'}`}>
                (you can choose multiple)
              </span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 stagger-fade">
              {Object.values(SUBJECTS).map((subject) => {
                const selected = selectedSubjects.includes(subject);
                return (
                  <button
                    key={subject}
                    onClick={() => toggleSubject(subject)}
                    className={`hover-card p-4 rounded-xl border-2 transition-all text-left wobble-icon ${
                      selected
                        ? d
                          ? 'border-indigo-400 bg-indigo-800/70 text-white'
                          : 'border-indigo-500 bg-indigo-100 text-indigo-900'
                        : d
                        ? 'border-slate-600 bg-slate-700/50 text-slate-200 hover:border-indigo-400 hover:bg-slate-600/80'
                        : 'border-gray-200 bg-white/80 text-gray-800 hover:border-indigo-400 hover:bg-indigo-50/60'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-300 ${
                          selected
                            ? 'border-white bg-indigo-500 scale-110'
                            : d
                            ? 'border-slate-500'
                            : 'border-gray-300'
                        }`}
                      >
                        {selected && (
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <span                          className={`font-semibold text-sm ${
                            selected
                              ? d
                                ? 'text-white'
                                : 'text-indigo-900'
                              : d
                              ? 'text-slate-200'
                              : 'text-gray-900'
                          }`}
                      >
                        {subject}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div              className={`p-4 rounded-xl mb-6 text-sm animate-fadeInUp delay-300 ${
                d              ? 'bg-indigo-900/20 border border-indigo-800/50 text-indigo-200' : 'bg-indigo-50 text-indigo-800'
              }`}
          >
            📝 You'll answer <strong>15 questions (3 per chapter)</strong> from your selected subject(s).
          </div>

          <button
            onClick={handleStartQuiz}
            disabled={selectedSubjects.length === 0}
            className={`btn-glow w-full font-bold py-3.5 px-4 rounded-xl transition-all text-sm animate-fadeInUp delay-400 ${
              selectedSubjects.length === 0
                ? 'bg-indigo-300 cursor-not-allowed text-gray-800'
                : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg shadow-indigo-500/25'
            }`}
          >
            Start Quiz →
          </button>
        </div>
      </div>
    </div>
  );
}