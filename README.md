# Fullstack Academy

**Zero to senior engineer — a self-contained, single-page learning platform for fullstack web development.**

Fullstack Academy is a structured, interactive curriculum that takes you from HTML basics to system design and testing, all inside one React app. No backend, no account, no tracking — everything lives in your browser.

---

## What this actually is

It's two files:

- **`fullstack-academy.jsx`** — the entire app: layout, curriculum content, syntax highlighter, quiz engine, search, and notes.
- **`concepts_data.js`** — the concept-explanation library (77 entries) that powers the Concepts tab and the auto-generated quizzes.

Drop both into a React project, render `<FullstackAcademy />`, and you have a full learning platform — no database, no API keys, no server.

## The curriculum

11 topics across 5 stages, each with written lessons, a portfolio project brief, hand-picked free resources, and a concept deep-dive:

| Stage | Topics |
|---|---|
| **Foundations** | HTML & CSS, JavaScript (Core) |
| **Frontend** | React, TypeScript, Next.js |
| **Backend** | Node.js & Express, Databases (SQL + NoSQL) |
| **DevOps & Cloud** | Git & GitHub, Docker & CI/CD |
| **Advanced** | System Design, Testing |

Every topic ends with a real portfolio-project brief — not "build a todo app," but the kind of project that actually demonstrates the skill on a resume.

## Features

**📖 Written lessons** — each topic has an in-depth markdown lesson with properly syntax-highlighted code examples (JS/TS/JSX/TSX, CSS, SQL, YAML, Bash, JSON, Dockerfile, HTML, Prisma, and Markdown all get real tokenized highlighting, not just a monospace block).

**🧠 Concept explanations** — click any concept (e.g. "Closures & scope," "CAP theorem") to expand a focused explanation: what it is, why it matters, how it works with a real code example, and common pitfalls.

**❓ Auto-generated quizzes** — every topic has a multiple-choice quiz built automatically from its concept data — no separate question bank to maintain. Get a score at the end and retake anytime.

**📝 Personal notes** — a private notebook per topic, autosaved to your browser's local storage. Nothing leaves your machine.

**🔍 Search** — jump straight to any topic or concept from the sidebar; results are grouped and clickable.

**🎥 Embedded video resources** — YouTube resources play inline instead of just linking out, with a search fallback in case a specific video ever gets taken down.

**✅ Progress tracking** — mark topics and concepts complete; your progress bar and stats persist across sessions (local storage only).

**🌗 Light & dark mode**, fully responsive (mobile gets a collapsible sidebar).

## Setup

This is a single React component with no external state/data dependencies beyond `react` itself.

```bash
# inside any React project (Vite, Next.js, CRA, etc.)
npm install react react-dom
```

Then import and render it:

```jsx
import FullstackAcademy from "./fullstack-academy.jsx";

export default function App() {
  return <FullstackAcademy />;
}
```

Make sure `concepts_data.js` sits next to `fullstack-academy.jsx` — it's imported directly:

```js
import { CONCEPT_EXPLANATIONS } from "./concepts_data.js";
```

No environment variables, no API keys, no backend required. Everything — progress, notes, theme preference — is stored in `localStorage` under keys prefixed `fa_`.

## Tech notes

- **Styling**: inline styles only, theme-aware (light/dark tokens), no CSS framework dependency.
- **Syntax highlighting**: a small hand-rolled tokenizer (no external highlighting library) covering JS/TS/JSX/TSX, CSS, SQL, YAML, Bash, JSON, Dockerfile, HTML, Prisma, and Markdown.
- **Persistence**: `localStorage` only — `fa_completed_topics`, `fa_completed_concepts`, `fa_notes`, `fa_theme_dark`.
- **No build-time data fetching**: the curriculum and concept library are both plain JS objects bundled with the app, so it works fully offline once loaded.

## Customizing the curriculum

Everything content-related lives in two places inside `fullstack-academy.jsx`:

- `CURRICULUM` — the array of sections → topics → lessons, resources, and project briefs.
- `CONCEPT_EXPLANATIONS` (imported from `concepts_data.js`) — keyed by `` `${topicId}::${conceptName}` ``, each value is a markdown string starting with a bolded one-line definition (this first sentence is what the quiz engine uses to generate questions, so keep that format if you add new entries).

Add a topic by adding an entry to `CURRICULUM`, then add matching `CONCEPT_EXPLANATIONS` entries for each concept listed in that topic's `concepts` array — the Concepts tab and quiz will pick them up automatically.