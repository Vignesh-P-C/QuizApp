import { useContext, useState, useEffect, useCallback } from 'react';
import Home from './pages/Home';
import Entry from './pages/Entry';
import Quiz from './pages/Quiz';
import Result from './pages/Result';
import Login from './pages/Login';
import Report from './pages/Report';
import { QuizContext } from './context/QuizContext';

export default function App() {
  const {
    state,
    handleLogin,
    handleLogout,
    handleToggleDark,
    handleNavigate,
    handleStartQuiz,
    handleSubmitQuiz,
    handlePracticeWeakAreas,
  } = useContext(QuizContext);

  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  // Subtle mouse follower
  useEffect(() => {
    let rafId = null;
    const handleMouseMove = (e) => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setMousePos({ x: e.clientX, y: e.clientY });
      });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // Global scroll observer for .animate-on-scroll elements
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('scrolled');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    // Observe all existing .animate-on-scroll elements
    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el);
    });

    // Watch for new elements (in case of dynamic content)
    const mutationObserver = new MutationObserver(() => {
      document.querySelectorAll('.animate-on-scroll:not(.observed)').forEach((el) => {
        el.classList.add('observed');
        observer.observe(el);
      });
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return (
    <div className={state.isDark ? 'dark-root dark' : ''} style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      {/* Ambient glow background */}
      <div className="ambient-glow" />
      {/* Animated mesh grid overlay */}
      <div className="mesh-overlay" />
      {/* Floating background particles */}
      <div className="particle" />
      <div className="particle" />
      <div className="particle" />
      <div className="particle" />
      <div className="particle" />
      {/* Subtle mouse follower glow */}
      <div
        className="mouse-follower"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
          opacity: mousePos.x > 0 ? 1 : 0,
        }}
      />
      {state.page === 'login' && (
        <Login onLogin={handleLogin} isDark={state.isDark} onToggleDark={handleToggleDark} />
      )}
      {state.page === 'home' && (
        <Home
          onNavigate={handleNavigate}
          onStartQuiz={handleStartQuiz}
          onLogout={handleLogout}
          isDark={state.isDark}
          onToggleDark={handleToggleDark}
          userName={state.userName}
          sessionCount={state.sessionHistory.length}
        />
      )}
      {state.page === 'entry' && (
        <Entry
          onNavigate={handleNavigate}
          onStartQuiz={handleStartQuiz}
          isDark={state.isDark}
        />
      )}
      {state.page === 'quiz' && state.questions.length > 0 && (
        <Quiz
          questions={state.questions}
          onNavigate={handleNavigate}
          onSubmitQuiz={handleSubmitQuiz}
          isDark={state.isDark}
        />
      )}
      {state.page === 'result' && (
        <Result
          score={state.score}
          totalQuestions={state.questions.length}
          analysis={state.analysis}
          onNavigate={handleNavigate}
          onPracticeWeakAreas={handlePracticeWeakAreas}
          userName={state.userName}
          isDark={state.isDark}
          questions={state.questions}
          answers={state.answers}
        />
      )}
      {state.page === 'report' && (
        <Report
          sessionHistory={state.sessionHistory}
          onNavigate={handleNavigate}
          userName={state.userName}
          isDark={state.isDark}
        />
      )}
    </div>
  );
}