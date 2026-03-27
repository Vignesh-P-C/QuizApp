# Quiz Master

A React + Tailwind CSS quiz application supporting multiple subjects, timed sessions, performance analysis, and targeted practice for weak areas.

## Getting Started

```bash
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173).

## Project Structure

```
quiz-master/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── .eslintrc.cjs
├── .prettierrc
└── src/
    ├── main.jsx            # App entry point
    ├── App.jsx             # Page router
    ├── index.css           # Tailwind base styles
    ├── components/
    │   ├── QuestionCard.jsx
    │   ├── ProgressBar.jsx
    │   └── Timer.jsx
    ├── context/
    │   └── QuizContext.jsx # Global state via useReducer
    ├── data/
    │   └── questions.js    # 250 questions across 5 subjects
    ├── pages/
    │   ├── Home.jsx
    │   ├── Entry.jsx
    │   ├── Quiz.jsx
    │   └── Result.jsx
    └── utils/
        ├── shuffle.js
        ├── quizGenerator.js
        └── analysis.js
```

## Subjects & Chapters

| Subject     | Chapters                                                        |
|-------------|-----------------------------------------------------------------|
| Mathematics | Algebra, Geometry, Statistics, Calculus, Number Theory          |
| Science     | Physics, Chemistry, Biology, Ecology, Astronomy                 |
| History     | Ancient Civilizations, Medieval Period, Modern History, Cultural History, World Events |
| English     | Literature, Grammar, Writing, Vocabulary, Poetry                |
| Geography   | Physical, Political, Human, Climate & Weather, Resources        |

## Quiz Modes

- **Single Subject** — pick one or more subjects; 3 questions per chapter
- **All Subjects** — 45 questions covering all 5 subjects
- **Practice Weak Areas** — auto-generated after results, targets chapters below 50% accuracy

## Bug Fixes Applied

| File | Bug | Fix |
|------|-----|-----|
| `shuffle.js` | Biased `Math.random() - 0.5` sort | Fisher-Yates algorithm |
| `questions.js` | Same biased shuffle for answer options | Fisher-Yates inline |
| `Timer.jsx` | `onTimeUp` in deps array reset timer on every answer | Moved callback to a `ref` |
| `QuizContext.jsx` | `const` in `switch` cases without `{}` blocks | Wrapped each case in `{}` |
| `QuizContext.jsx` | `userName` never synced to context state on quiz start | Passed via `START_QUIZ` action |
| `Entry.jsx` | `userName` saved to localStorage but not dispatched to context | Passes `userName` to `onStartQuiz` |
| `analysis.js` | `allQuestions` param declared but never used | Removed dead parameter |
| `globals.css` | Tailwind v4 syntax (`@import 'tailwindcss'`) incompatible with v3 project | Removed; `index.css` handles all styles |

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run format` | Format with Prettier |
