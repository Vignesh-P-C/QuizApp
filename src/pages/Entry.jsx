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
      className={`min-h-screen p-4 transition-colors duration-300 ${
        d
          ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'
          : 'bg-gradient-to-br from-blue-50 to-indigo-100'
      }`}
    >
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => onNavigate('home')}
          className={`mb-6 font-semibold text-sm flex items-center gap-1 transition-colors ${
            d ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'
          }`}
        >
          ← Back to Home
        </button>

        <div
          className={`p-8 rounded-2xl shadow-lg transition-colors ${
            d ? 'bg-slate-800 border border-slate-700' : 'bg-white'
          }`}
        >
          <h1 className={`text-3xl font-extrabold mb-2 ${d ? 'text-white' : 'text-gray-900'}`}>
            Single Subject Quiz
          </h1>
          <p className={`text-sm mb-8 ${d ? 'text-slate-400' : 'text-gray-500'}`}>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Object.values(SUBJECTS).map((subject) => {
                const selected = selectedSubjects.includes(subject);
                return (
                  <button
                    key={subject}
                    onClick={() => toggleSubject(subject)}
                    className={`p-4 rounded-xl border-2 transition-all text-left ${
                      selected
                        ? d
                          ? 'border-blue-500 bg-blue-900/30'
                          : 'border-blue-600 bg-blue-50'
                        : d
                        ? 'border-slate-600 bg-slate-700 hover:border-slate-500'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                          selected
                            ? 'border-blue-600 bg-blue-600'
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
                      <span
                        className={`font-semibold text-sm ${
                          selected
                            ? d
                              ? 'text-blue-300'
                              : 'text-blue-700'
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

          <div
            className={`p-4 rounded-xl mb-6 text-sm ${
              d ? 'bg-blue-900/20 border border-blue-800/50 text-blue-300' : 'bg-blue-50 text-blue-800'
            }`}
          >
            📝 You'll answer <strong>15 questions (3 per chapter)</strong> from your selected subject(s).
          </div>

          <button
            onClick={handleStartQuiz}
            disabled={selectedSubjects.length === 0}
            className={`w-full font-bold py-3.5 px-4 rounded-xl transition-all text-sm ${
              selectedSubjects.length === 0
                ? 'bg-blue-300 cursor-not-allowed text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200/50'
            }`}
          >
            Start Quiz →
          </button>
        </div>
      </div>
    </div>
  );
}