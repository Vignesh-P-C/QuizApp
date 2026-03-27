# 🎓 Quiz Master

> A multi-subject, timed quiz application built with **React**, **Vite**, and **Tailwind CSS** — featuring intelligent performance analysis, adaptive weak-area practice, and a full session reporting system.

---

## Live Demo
https://quiz-app-six-beryl-18.vercel.app

---

## 📋 Table of Contents

- [Overview](#overview)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Subjects & Question Bank](#subjects--question-bank)
- [Quiz Modes](#quiz-modes)
- [Key Features](#key-features)
- [Architecture](#architecture)
- [State Management](#state-management)
- [Bug Fixes Applied](#bug-fixes-applied)
- [Scripts](#scripts)

---

## Overview

Quiz Master is a client-side React SPA designed for self-assessment across five academic subjects. Users log in with a name, email, and password, choose a quiz mode, answer timed questions, and receive a detailed breakdown of their strengths and weaknesses. A dedicated practice mode targets underperforming chapters automatically — no manual configuration needed.

All data is session-scoped and resets on logout, making it privacy-friendly and stateless by design.

---

## Getting Started

### Prerequisites

- Node.js ≥ 18
- npm ≥ 9

### Installation

```bash
# Clone the repo
git clone https://github.com/your-username/quiz-master.git
cd quiz-master

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build

```bash
npm run build
npm run preview
```

---

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
    ├── main.jsx                  # App entry — mounts QuizProvider + App
    ├── App.jsx                   # Page router driven by context state
    ├── index.css                 # Tailwind base directives
    │
    ├── components/
    │   ├── QuestionCard.jsx      # Renders a single question with A/B/C/D options
    │   ├── ProgressBar.jsx       # Shows current question index and % completion
    │   └── Timer.jsx             # Countdown timer with low/critical warnings
    │
    ├── context/
    │   └── QuizContext.jsx       # Global state via useReducer — all app logic lives here
    │
    ├── data/
    │   └── questions.js          # 250 questions across 5 subjects × 5 chapters each
    │
    ├── pages/
    │   ├── Login.jsx             # Validated login form (name, email, password)
    │   ├── Home.jsx              # Mode selection dashboard
    │   ├── Entry.jsx             # Subject selector for Single Subject mode
    │   ├── Quiz.jsx              # Quiz interface with navigator sidebar and modal
    │   ├── Result.jsx            # Score, strengths/weaknesses, quiz summary
    │   └── Report.jsx            # Full session history with stats and progress bars
    │
    └── utils/
        ├── shuffle.js            # Fisher-Yates shuffle utility
        ├── quizGenerator.js      # Quiz assembly logic — filters, selects, shuffles questions
        └── analysis.js           # Scoring, performance analysis, weakness quiz generator
```

---

## Subjects & Question Bank

The question bank contains **250 questions** — 10 per chapter, across 5 chapters per subject.

| Subject         | Chapters                                                                      |
|-----------------|-------------------------------------------------------------------------------|
| **Mathematics** | Algebra, Geometry, Statistics, Calculus, Number Theory                        |
| **Science**     | Physics, Chemistry, Biology, Ecology, Astronomy                               |
| **History**     | Ancient Civilizations, Medieval Period, Modern History, Cultural History, World Events |
| **English**     | Literature, Grammar, Writing, Vocabulary, Poetry                              |
| **Geography**   | Physical Geography, Political Geography, Human Geography, Climate & Weather, Resources |

Each quiz session randomly draws **3 questions per chapter**, ensuring variety across repeated attempts.

---

## Quiz Modes

| Mode | Questions | Description |
|------|-----------|-------------|
| **Single Subject** | 15 (3 per chapter) | Choose one or more subjects; chapters are auto-enumerated |
| **All Subjects** | 45 (3 per chapter × 5 subjects) | Full mixed quiz across the entire question bank |
| **Practice Weak Areas** | Up to 15 | Auto-generated from chapters scoring below 50% accuracy |

---

## Key Features

- **Login with validation** — name (≥2 chars), email format check, password (≥6 chars)
- **Dark / Light mode** — persistent via `localStorage`, togglable on every screen
- **Countdown timer** — scales with question count (1 min/question); auto-submits on expiry
- **Question navigator** — sidebar grid showing answered/unanswered/current status
- **Unanswered question guard** — modal lists skipped questions before allowing submit
- **Performance analysis** — per-chapter accuracy breakdown after every quiz
- **Strengths & weaknesses** — strengths ≥ 70% accuracy, weaknesses < 50% accuracy
- **Adaptive practice** — "Practice Weak Areas" button generates a new quiz from your worst chapters
- **Session report** — full quiz history with scores, subjects, date/time, and a mini progress bar per entry
- **Session isolation** — all history resets on logout; no backend required

---

## Architecture

Quiz Master is a **single-page application (SPA)** with no backend dependency. All routing, state transitions, and data processing happen client-side.

```
┌─────────────────────────────────────────────────────┐
│                    main.jsx                         │
│   QuizProvider (Context + useReducer) wraps App     │
└────────────────────────┬────────────────────────────┘
                         │ provides state + handlers
                         ▼
┌─────────────────────────────────────────────────────┐
│                     App.jsx                         │
│   Reads state.page → renders the correct Page       │
│   Login → Home → Entry/Quiz → Result → Report       │
└──────┬──────────┬──────────┬───────────┬────────────┘
       │          │          │           │
   Login.jsx  Home.jsx   Quiz.jsx    Result.jsx
                │             │
            Entry.jsx    QuestionCard
                         ProgressBar
                         Timer
```

Data flow is strictly **unidirectional**: user actions dispatch to the reducer, which updates state, which re-renders the UI.

---

## State Management

State lives entirely in `QuizContext.jsx` using `useReducer`. All page components receive handlers as props from `App.jsx`, which reads them from context.

### State Shape

```js
{
  page: 'login' | 'home' | 'entry' | 'quiz' | 'result' | 'report',
  mode: 'single' | 'all' | null,
  selectedSubjects: string[],
  questions: Question[],
  answers: { [questionId]: string },
  score: number,
  analysis: AnalysisEntry[],
  userName: string,
  userEmail: string,
  isLoggedIn: boolean,
  isDark: boolean,
  quizMode: 'normal' | 'weakness',
  sessionHistory: SessionEntry[],
}
```

### Reducer Actions

| Action | Triggered By | Effect |
|--------|--------------|--------|
| `LOGIN` | Login form submit | Sets user info, navigates to home |
| `LOGOUT` | Logout button | Resets all state (preserves dark mode) |
| `TOGGLE_DARK` | Theme button | Flips `isDark`, persisted to localStorage |
| `NAVIGATE` | Any page transition | Updates `state.page` |
| `START_QUIZ` | Mode selection | Generates question set, resets quiz state |
| `START_WEAKNESS_QUIZ` | Practice Weak Areas | Generates targeted question set |
| `SUBMIT_QUIZ` | Timer expiry or submit | Calculates score, analysis, appends to history |

---

## Bug Fixes Applied

| File | Bug | Fix Applied |
|------|-----|-------------|
| `shuffle.js` | Used biased `Math.random() - 0.5` comparator sort | Replaced with proper **Fisher-Yates** algorithm |
| `Timer.jsx` | `onTimeUp` in `useEffect` dependency array caused the timer to reset on every answer selection | Moved `onTimeUp` to a `useRef` to stabilise the dependency |
| `QuizContext.jsx` | `const` declarations in `switch` cases without block scope caused lint errors | Wrapped each `case` body in `{}` |
| `analysis.js` | `allQuestions` parameter declared but never used (function pulls from global bank) | Removed dead parameter and updated call sites |
| `QuizContext.jsx` | Empty weakness quiz navigated to quiz page with 0 questions, rendering a blank screen | Added guard in `handlePracticeWeakAreas` — shows alert and aborts if no weak areas found |

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite development server at localhost:5173 |
| `npm run build` | Compile and bundle for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across all source files |
| `npm run format` | Auto-format with Prettier |

---

## Tech Stack

| Technology | Role |
|------------|------|
| React 18 | UI framework, component rendering |
| Vite | Dev server and production bundler |
| Tailwind CSS v3 | Utility-first styling |
| useReducer + Context | Global state management |
| localStorage | Dark mode persistence |

---

## License

MIT — free to use, modify, and distribute.