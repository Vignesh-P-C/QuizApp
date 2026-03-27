import { ALL_QUESTIONS, SUBJECTS } from '../data/questions';
import { shuffle } from './shuffle';

export const getRandomQuestions = (count, sourceQuestions) => {
  const shuffled = shuffle(sourceQuestions);
  return shuffled.slice(0, count);
};

export const getQuestionsBySubject = (subject) => {
  return ALL_QUESTIONS.filter((q) => q.subject === subject);
};

export const getQuestionsByChapter = (subject, chapter) => {
  return ALL_QUESTIONS.filter(
    (q) => q.subject === subject && q.chapter === chapter
  );
};

export const getChaptersBySubject = (subject) => {
  const questions = getQuestionsBySubject(subject);
  const chapters = new Set(questions.map((q) => q.chapter));
  return Array.from(chapters);
};

export const generateQuiz = (mode, selectedSubjects = []) => {
  let quizQuestions = [];

  if (mode === 'single' && selectedSubjects.length > 0) {
    selectedSubjects.forEach((subject) => {
      const chapters = getChaptersBySubject(subject);
      chapters.forEach((chapter) => {
        const chapterQuestions = getQuestionsByChapter(subject, chapter);
        const randomQs = getRandomQuestions(3, chapterQuestions);
        quizQuestions.push(...randomQs);
      });
    });
  } else if (mode === 'all') {
    Object.values(SUBJECTS).forEach((subject) => {
      const chapters = getChaptersBySubject(subject);
      chapters.forEach((chapter) => {
        const chapterQuestions = getQuestionsByChapter(subject, chapter);
        const randomQs = getRandomQuestions(3, chapterQuestions);
        quizQuestions.push(...randomQs);
      });
    });
  }

  return shuffle(quizQuestions);
};