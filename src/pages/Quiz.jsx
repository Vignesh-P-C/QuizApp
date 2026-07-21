import { useState, useCallback, useEffect } from 'react';
import QuestionCard from '../components/QuestionCard';
import ProgressBar from '../components/ProgressBar';
import Timer from '../components/Timer';

export default function Quiz({ questions, onNavigate, onSubmitQuiz, isDark }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showConfirm, setShowConfirm] = useState(false);

  const d = isDark;

  const handleSelectAnswer = (option) => {
    const currentQuestion = questions[currentIndex];
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: option }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) setCurrentIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
  };

  const handleJumpToQuestion = (index) => setCurrentIndex(index);

  const unansweredCount = questions.filter((q) => !answers[q.id]).length;

  const attemptSubmit = () => {
    if (unansweredCount > 0) {
      setShowConfirm(true);
    } else {
      doSubmit();
    }
  };

  const doSubmit = () => {
    onSubmitQuiz(answers);
    onNavigate('result');
  };

  // FIX: Memoized with useCallback so Timer's useEffect dependency doesn't
  // change on every render (which was causing the timer to reset on each
  // answer selection).
  const handleTimeUp = useCallback(() => {
    onSubmitQuiz(answers);
    onNavigate('result');
  }, [answers, onSubmitQuiz, onNavigate]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't capture if typing in an input or modal is open
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || showConfirm) return;

      const currentQuestion = questions[currentIndex];
      if (!currentQuestion) return;

      switch (e.key) {
        case '1':
        case '2':
        case '3':
        case '4': {
          const idx = parseInt(e.key) - 1;
          if (idx < currentQuestion.options.length) {
            e.preventDefault();
            setAnswers((prev) => ({ ...prev, [currentQuestion.id]: currentQuestion.options[idx] }));
          }
          break;
        }
        case 'ArrowLeft':
          e.preventDefault();
          if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
          break;
        case 'ArrowRight':
          e.preventDefault();
          if (currentIndex < questions.length - 1) setCurrentIndex((prev) => prev + 1);
          break;
        case 'Enter': {
          e.preventDefault();
          if (currentIndex === questions.length - 1) {
            attemptSubmit();
          } else {
            setCurrentIndex((prev) => prev + 1);
          }
          break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, questions, showConfirm, answers]);

  const currentQuestion = questions[currentIndex];
  const selectedAnswer = answers[currentQuestion.id] || null;
  const totalTime = questions.length * 60;

  return (
    <div
      className={`min-h-screen p-4 transition-all duration-500 ${
        d
          ? 'bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 animate-gradient-dark'
          : 'bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 animate-gradient'
      }`}
    >
      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div                className={`w-full max-w-md rounded-2xl shadow-2xl p-8 transition-all duration-300 animate-scaleIn ${
                  d ? 'bg-slate-800/90 border border-slate-600/50 backdrop-blur-xl' : 'glass-card'
                }`}
          >
            <div className="text-center">
              <div className="text-5xl mb-4">⚠️</div>
              <h2
                className={`text-2xl font-extrabold mb-3 ${
                  d ? 'text-white' : 'text-gray-900'
                }`}
              >
                Submit Quiz?
              </h2>
              <p
                className={`text-base mb-2 ${d ? 'text-slate-300' : 'text-gray-600'}`}
              >
                You still have{' '}
                <strong
                  className={d ? 'text-yellow-400' : 'text-red-600'}
                >
                  {unansweredCount} question{unansweredCount > 1 ? 's' : ''}
                </strong>{' '}
                unanswered.
              </p>
              <p
                className={`text-sm mb-8 ${d ? 'text-slate-400' : 'text-gray-500'}`}
              >
                Unanswered questions will be marked as incorrect. Are you sure
                you want to submit?
              </p>

              {/* Unanswered Question Numbers */}
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {questions.map((q, idx) =>
                  !answers[q.id] ? (
                    <button
                      key={idx}
                      onClick={() => {
                        setShowConfirm(false);
                        setCurrentIndex(idx);
                      }}
                      className={`w-9 h-9 rounded-lg text-sm font-bold transition-all ${
                        d
                          ? 'bg-yellow-900 text-yellow-300 hover:bg-yellow-800'
                          : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                      }`}
                      title={`Jump to Q${idx + 1}`}
                    >
                      {idx + 1}
                    </button>
                  ) : null
                )}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowConfirm(false)}
                  className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all duration-200 hover:scale-105 active:scale-95 ${
                    d
                      ? 'bg-slate-700 text-slate-200 hover:bg-slate-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Go Back & Review
                </button>
                <button
                  onClick={doSubmit}
                  className="flex-1 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white transition-all duration-200 hover:scale-105 active:scale-95"
                >
                  Submit Anyway
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Quiz Area */}
          <div className="lg:col-span-3">
            <div
              className={`p-8 rounded-2xl shadow-lg transition-all duration-500 question-enter ${
                d ? 'bg-slate-800/60 border border-slate-700/50 backdrop-blur-xl' : 'glass-card'
              }`}
            >
              <ProgressBar
                current={currentIndex + 1}
                total={questions.length}
                isDark={d}
              />

              <div className="mt-8 mb-8">
                <QuestionCard
                  question={currentQuestion}
                  selectedAnswer={selectedAnswer}
                  onSelectAnswer={handleSelectAnswer}
                  isDark={d}
                />
              </div>

              <div className="flex gap-4 justify-between">
                <button
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                  className={`px-6 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 ${
                    d
                      ? 'bg-slate-700 text-slate-200 hover:bg-slate-600'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  ← Previous
                </button>

                {currentIndex < questions.length - 1 ? (
                  <button
                    onClick={handleNext}
                    className="btn-glow px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl font-semibold text-sm transition-all duration-200"
                  >
                    Next →
                  </button>
                ) : (
                  <button
                    onClick={attemptSubmit}
                    className="btn-glow px-6 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white rounded-xl font-semibold text-sm transition-all duration-200"
                  >
                    Submit Quiz ✓
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div
              className={`p-5 rounded-2xl shadow-lg sticky top-4 transition-all duration-500 animate-fadeInUp ${
                d ? 'bg-slate-800/60 border border-slate-700/50 backdrop-blur-xl' : 'glass-card'
              }`}
            >
              <Timer initialSeconds={totalTime} onTimeUp={handleTimeUp} isDark={d} />

              <div className="mt-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className={`text-sm font-bold ${d ? 'text-slate-200' : 'text-gray-900'}`}>
                    Navigator
                  </h3>
                  {unansweredCount > 0 && (
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                        d
                          ? 'bg-yellow-900 text-yellow-300'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {unansweredCount} left
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-5 gap-1.5">
                  {questions.map((q, index) => (
                    <button
                      key={index}
                      onClick={() => handleJumpToQuestion(index)}
                      className={`aspect-square rounded-lg text-xs font-bold transition-all ${
                        index === currentIndex
                          ? 'bg-blue-600 text-white'
                          : answers[q.id]
                          ? d
                            ? 'bg-green-800 text-green-200'
                            : 'bg-green-100 text-green-700'
                          : d
                          ? 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
                <div className={`mt-3 flex gap-3 text-xs ${d ? 'text-slate-400' : 'text-gray-500'}`}>
                  <span className="flex items-center gap-1">
                    <span className="w-3 h-3 rounded-sm bg-blue-600 inline-block" /> Current
                  </span>
                  <span className="flex items-center gap-1">
                    <span className={`w-3 h-3 rounded-sm inline-block ${d ? 'bg-green-800' : 'bg-green-100'}`} /> Done
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}