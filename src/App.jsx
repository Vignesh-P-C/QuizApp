import { useContext } from 'react';
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

  return (
    <div className={state.isDark ? 'dark-root' : ''} style={{ minHeight: '100vh' }}>
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