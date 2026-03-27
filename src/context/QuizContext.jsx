import { createContext, useReducer, useCallback, useEffect } from 'react';
import { generateQuiz } from '../utils/quizGenerator';
import {
  calculateScore,
  analyzePerformance,
  generateWeaknessQuiz,
} from '../utils/analysis';

export const QuizContext = createContext();

const initialState = {
  page: 'login',
  mode: null,
  selectedSubjects: [],
  questions: [],
  answers: {},
  score: 0,
  analysis: [],
  userName: '',
  userEmail: '',
  isLoggedIn: false,
  isDark: false,
  quizMode: 'normal',
  sessionHistory: [], // [{id, date, score, total, subjects, analysis, mode}]
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        userName: action.payload.name,
        userEmail: action.payload.email,
        isLoggedIn: true,
        page: 'home',
        sessionHistory: [],
      };

    case 'LOGOUT':
      return {
        ...initialState,
        isDark: state.isDark,
        page: 'login',
      };

    case 'TOGGLE_DARK':
      return { ...state, isDark: !state.isDark };

    case 'NAVIGATE':
      return { ...state, page: action.payload };

    case 'START_QUIZ': {
      const questions = generateQuiz(action.payload.mode, action.payload.subjects);
      return {
        ...state,
        mode: action.payload.mode,
        selectedSubjects: action.payload.subjects,
        questions,
        answers: {},
        score: 0,
        analysis: [],
        quizMode: 'normal',
      };
    }

    case 'START_WEAKNESS_QUIZ': {
      // FIX: allQuestions arg removed — generateWeaknessQuiz no longer accepts it
      const practiceQuestions = generateWeaknessQuiz(action.payload);
      return {
        ...state,
        questions: practiceQuestions,
        answers: {},
        score: 0,
        analysis: [],
        quizMode: 'weakness',
      };
    }

    case 'SUBMIT_QUIZ': {
      const score = calculateScore(state.questions, action.payload);
      const analysis = analyzePerformance(state.questions, action.payload);
      const historyEntry = {
        id: Date.now(),
        date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        fullDate: new Date().toLocaleDateString(),
        score,
        total: state.questions.length,
        subjects: state.quizMode === 'weakness'
          ? ['Weak Areas Practice']
          : state.mode === 'all'
          ? ['All Subjects']
          : state.selectedSubjects,
        analysis,
        mode: state.quizMode === 'weakness' ? 'Weak Areas' : state.mode === 'all' ? 'All Subjects' : 'Single Subject',
        percentage: Math.round((score / state.questions.length) * 100),
      };
      return {
        ...state,
        answers: action.payload,
        score,
        analysis,
        sessionHistory: [...state.sessionHistory, historyEntry],
      };
    }

    default:
      return state;
  }
};

export function QuizProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Persist dark mode preference
  useEffect(() => {
    const savedDark = localStorage.getItem('quizDarkMode');
    if (savedDark === 'true') {
      dispatch({ type: 'TOGGLE_DARK' });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('quizDarkMode', state.isDark);
  }, [state.isDark]);

  const handleLogin = useCallback((name, email) => {
    dispatch({ type: 'LOGIN', payload: { name, email } });
  }, []);

  const handleLogout = useCallback(() => {
    dispatch({ type: 'LOGOUT' });
  }, []);

  const handleToggleDark = useCallback(() => {
    dispatch({ type: 'TOGGLE_DARK' });
  }, []);

  const handleNavigate = useCallback((page) => {
    dispatch({ type: 'NAVIGATE', payload: page });
  }, []);

  const handleStartQuiz = useCallback((mode, subjects) => {
    dispatch({ type: 'START_QUIZ', payload: { mode, subjects } });
  }, []);

  const handleSubmitQuiz = useCallback((answers) => {
    dispatch({ type: 'SUBMIT_QUIZ', payload: answers });
  }, []);

  // FIX: Guard against empty weakness quiz — show alert and abort instead of
  // navigating to quiz with an empty questions array (which renders a blank screen).
  const handlePracticeWeakAreas = useCallback(() => {
    const practiceQuestions = generateWeaknessQuiz(state.analysis);
    if (practiceQuestions.length === 0) {
      alert('No weak areas found. Great work — keep it up!');
      return;
    }
    dispatch({ type: 'START_WEAKNESS_QUIZ', payload: state.analysis });
    dispatch({ type: 'NAVIGATE', payload: 'quiz' });
  }, [state.analysis]);

  return (
    <QuizContext.Provider
      value={{
        state,
        handleLogin,
        handleLogout,
        handleToggleDark,
        handleNavigate,
        handleStartQuiz,
        handleSubmitQuiz,
        handlePracticeWeakAreas,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}