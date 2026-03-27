import { getQuestionsByChapter } from './quizGenerator';
import { shuffle } from './shuffle';

export const calculateScore = (questions, answers) => {
  let correct = 0;
  questions.forEach((q) => {
    if (answers[q.id] === q.answer) {
      correct++;
    }
  });
  return correct;
};

export const analyzePerformance = (questions, answers) => {
  const analysis = {};

  questions.forEach((q) => {
    if (!analysis[q.subject]) {
      analysis[q.subject] = {};
    }
    if (!analysis[q.subject][q.chapter]) {
      analysis[q.subject][q.chapter] = {
        total: 0,
        correct: 0,
      };
    }

    analysis[q.subject][q.chapter].total += 1;
    if (answers[q.id] === q.answer) {
      analysis[q.subject][q.chapter].correct += 1;
    }
  });

  const result = [];
  Object.entries(analysis).forEach(([subject, chapters]) => {
    Object.entries(chapters).forEach(([chapter, stats]) => {
      const accuracy = (stats.correct / stats.total) * 100;
      result.push({
        subject,
        chapter,
        ...stats,
        accuracy: Math.round(accuracy),
      });
    });
  });

  return result;
};

export const getStrengthsAndWeaknesses = (analysis) => {
  const strengths = analysis.filter((a) => a.accuracy >= 70);
  const weaknesses = analysis.filter((a) => a.accuracy < 50);

  return { strengths, weaknesses };
};

// Removed unused `allQuestions` parameter — function always pulls from the
// global question bank via getQuestionsByChapter, which is the correct intent
// for a practice session (more variety than the original quiz pool).
export const generateWeaknessQuiz = (analysis) => {
  const weaknesses = analysis
    .filter((a) => a.accuracy < 50)
    .sort((a, b) => a.accuracy - b.accuracy)
    .slice(0, 3);

  if (weaknesses.length === 0) {
    return [];
  }

  let practiceQuestions = [];
  weaknesses.forEach(({ subject, chapter }) => {
    const chapterQuestions = getQuestionsByChapter(subject, chapter);
    const randomQs = shuffle(chapterQuestions).slice(0, Math.min(5, chapterQuestions.length));
    practiceQuestions.push(...randomQs);
  });

  return shuffle(practiceQuestions);
};