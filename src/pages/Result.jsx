import { useState, useEffect, useCallback } from 'react';
import { getStrengthsAndWeaknesses } from '../utils/analysis';
import ReviewAnswers from '../components/ReviewAnswers';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

export default function Result({
  score,
  totalQuestions,
  analysis,
  onNavigate,
  onPracticeWeakAreas,
  userName,
  isDark,
  questions,
  answers,
}) {
  const [showReview, setShowReview] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [animatedScore, setAnimatedScore] = useState(0);
  const [scoreRef, scoreVisible] = useIntersectionObserver({ threshold: 0.5 });
  const d = isDark;
  const { strengths, weaknesses } = getStrengthsAndWeaknesses(analysis);
  const percentage = Math.round((score / totalQuestions) * 100);

  // Animated number counter
  useEffect(() => {
    if (!scoreVisible) return;
    let start = 0;
    const duration = 1000;
    const steps = 30;
    const increment = percentage / steps;
    const timer = setInterval(() => {
      start += increment;
      if (start >= percentage) {
        setAnimatedScore(percentage);
        clearInterval(timer);
      } else {
        setAnimatedScore(Math.round(start));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [percentage, scoreVisible]);

  // Trigger confetti for good scores
  useEffect(() => {
    if (percentage >= 75) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [percentage]);

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

  const confettiColors = ['#6366f1', '#8b5cf6', '#a855f7', '#ec4899', '#f59e0b', '#10b981', '#3b82f6'];
  const confettiPieces = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    color: confettiColors[i % confettiColors.length],
    delay: `${Math.random() * 0.5}s`,
    size: `${6 + Math.random() * 8}px`,
    rotation: `${Math.random() * 360}deg`,
  }));

  return (
    <div
      className={`min-h-screen p-4 transition-all duration-500 ${
        d
          ? 'bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 animate-gradient-dark'
          : 'bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 animate-gradient'
      }`}
    >
      {/* Confetti Celebration */}
      {showConfetti && confettiPieces.map((piece) => (
        <div
          key={piece.id}
          className="confetti-piece"
          style={{
            left: piece.left,
            backgroundColor: piece.color,
            width: piece.size,
            height: piece.size,
            animationDelay: piece.delay,
            transform: `rotate(${piece.rotation})`,
          }}
        />
      ))}
      <div className="max-w-2xl mx-auto">
        <div
          className={`p-8 rounded-2xl shadow-lg mb-6 transition-all duration-500 animate-fadeInUp ${
            d ? 'bg-slate-800/60 border border-slate-700/50 backdrop-blur-xl' : 'glass-card'
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

          {/* Score - Animated counter */}
          <div ref={scoreRef} className={`text-center mb-8 ${getPerformanceColor()}`}>
            <p className="text-7xl font-black leading-none count-up">{scoreVisible ? animatedScore : 0}%</p>
            <p className={`text-xl font-bold mt-3 ${d ? 'text-slate-200' : 'text-gray-700'}`}>
              {score} / {totalQuestions} correct
            </p>
            <p className="text-base mt-2">{getPerformanceMessage()}</p>
          </div>

          {/* Strengths - Scroll Animation */}
          {strengths.length > 0 && (
            <div
              className={`animate-on-scroll mb-6 p-5 rounded-xl ${
                d ? 'bg-green-900/30 border border-green-800' : 'bg-green-50'
              }`}
            >
              <h3 className={`text-lg font-bold mb-4 ${d ? 'text-green-400' : 'text-green-700'}`}>
                <span className="float-emoji">✅</span> Your Strengths
              </h3>
              <div className="space-y-2 stagger-fade">
                {strengths.map((item, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg border-l-4 border-green-500 hover-card ${
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

          {/* Weaknesses - Scroll Animation */}
          {weaknesses.length > 0 && (
            <div
              className={`animate-on-scroll mb-6 p-5 rounded-xl ${
                d ? 'bg-red-900/30 border border-red-800' : 'bg-red-50'
              }`}
            >
              <h3 className={`text-lg font-bold mb-4 ${d ? 'text-red-400' : 'text-red-700'}`}>
                <span className="float-emoji">📌</span> Areas to Improve
              </h3>
              <div className="space-y-2 stagger-fade">
                {weaknesses.map((item, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg border-l-4 border-red-500 hover-card ${
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

          {/* Summary - Scroll Animation */}
          <div
            className={`animate-on-scroll scale mb-6 p-5 rounded-xl ${
              d ? 'bg-blue-900/20 border border-blue-800/50' : 'bg-blue-50'
            }`}
          >
            <h3 className={`text-lg font-bold mb-4 ${d ? 'text-blue-400' : 'text-blue-700'}`}>
              <span className="float-emoji">📊</span> Quiz Summary
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

          {/* Review Answers Toggle */}
          {questions && questions.length > 0 && (
            <div className="mb-6">
              <button
                onClick={() => setShowReview(!showReview)}
                className={`w-full font-bold py-3 px-4 rounded-xl transition-all text-sm flex items-center justify-center gap-2 ${
                  showReview
                    ? d
                      ? 'bg-slate-700 text-slate-200 hover:bg-slate-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                }`}
              >
                {showReview ? '▲ Hide Answer Review' : '▼ Review Your Answers'}
              </button>

              {showReview && (
                <div className="mt-4 animate-slideDown">
                  <ReviewAnswers
                    questions={questions}
                    answers={answers || {}}
                    isDark={d}
                  />
                </div>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => onNavigate('home')}
              className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3 px-4 rounded-xl transition-all text-sm hover:shadow-lg hover:shadow-blue-500/25 active:scale-95"
            >
              🏠 Home
            </button>
            <button
              onClick={() => onNavigate('report')}
              className={`flex-1 font-bold py-3 px-4 rounded-xl transition-all text-sm hover:shadow-md active:scale-95 ${
                d
                  ? 'bg-slate-700 text-slate-200 hover:bg-slate-600'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              📊 View Report
            </button>
            {weaknesses.length > 0 && (
              <button
                onClick={onPracticeWeakAreas}
                className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-3 px-4 rounded-xl transition-all text-sm hover:shadow-lg hover:shadow-green-500/25 active:scale-95"
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