import { useState, useCallback } from 'react';
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

  const currentQuestion = questions[currentIndex];
  const selectedAnswer = answers[currentQuestion.id] || null;
  const totalTime = questions.length * 60;

  return (
    <div
      className={`min-h-screen p-4 transition-colors duration-300 ${
        d
          ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'
          : 'bg-gradient-to-br from-blue-50 to-indigo-100'
      }`}
    >
      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div
            className={`w-full max-w-md rounded-2xl shadow-2xl p-8 transition-colors ${
              d ? 'bg-slate-800 border border-slate-600' : 'bg-white'
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
                  className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${
                    d
                      ? 'bg-slate-700 text-slate-200 hover:bg-slate-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Go Back & Review
                </button>
                <button
                  onClick={doSubmit}
                  className="flex-1 py-3 rounded-xl font-bold text-sm bg-green-600 hover:bg-green-700 text-white transition-all"
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
              className={`p-8 rounded-2xl shadow-lg transition-colors ${
                d ? 'bg-slate-800 border border-slate-700' : 'bg-white'
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
                  className={`px-6 py-2.5 rounded-xl font-semibold text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed ${
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
                    className="px-6 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-semibold text-sm transition-all"
                  >
                    Next →
                  </button>
                ) : (
                  <button
                    onClick={attemptSubmit}
                    className="px-6 py-2.5 bg-green-600 text-white rounded-xl hover:bg-green-700 font-semibold text-sm transition-all"
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
              className={`p-5 rounded-2xl shadow-lg sticky top-4 transition-colors ${
                d ? 'bg-slate-800 border border-slate-700' : 'bg-white'
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