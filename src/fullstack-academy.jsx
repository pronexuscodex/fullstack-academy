import { useState, useEffect, useRef, createContext, useContext } from "react";

const CURRICULUM = [
  {
    id: "foundations",
    title: "Foundations",
    icon: "⚡",
    color: "#6366f1",
    description: "The bedrock every top engineer knows cold",
    topics: [
      {
        id: "html-css",
        title: "HTML & CSS",
        level: "Beginner",
        duration: "3 weeks",
        project: { title: "Personal Portfolio Site", desc: "Build a fully responsive portfolio with dark mode, CSS Grid layouts, animations, and accessibility best practices — your first piece of public work." },
        resources: [
          { name: "The Odin Project — HTML Foundations", url: "https://www.theodinproject.com/paths/foundations/courses/foundations", type: "Course" },
          { name: "Kevin Powell — CSS Full Course (YouTube)", url: "https://www.youtube.com/watch?v=1Rs2ND1ryYc", type: "Video" },
          { name: "web.dev Learn CSS", url: "https://web.dev/learn/css", type: "Interactive" },
          { name: "CSS Tricks — Complete Guide to Grid", url: "https://css-tricks.com/snippets/css/complete-guide-grid/", type: "Reference" },
        ],
        concepts: ["Box model", "Flexbox & Grid", "Responsive design", "CSS variables", "Animations & transitions", "Accessibility (a11y)", "Semantic HTML5"],
        content: `## HTML & CSS — Deep Dive

### Why This Matters
Every pixel users see is HTML and CSS. Companies like Google, Meta, and Stripe have entire teams focused on pixel-perfect UIs. Before touching JavaScript, you must own the structure and style layer.

### Core Concepts

**The Box Model**
Every element is a rectangular box. From inside out: content → padding → border → margin. This single mental model explains 80% of layout bugs.

\`\`\`css
/* box-sizing: border-box makes padding/border part of the width — use it always */
*, *::before, *::after { box-sizing: border-box; }
\`\`\`

**Flexbox vs Grid**
- **Flexbox** = one-dimensional (row OR column). Use for navbars, button groups, centering.
- **Grid** = two-dimensional (rows AND columns). Use for page layouts, card grids.

\`\`\`css
/* Perfect centering — 3 lines */
.container { display: flex; justify-content: center; align-items: center; }

/* Responsive card grid — no media queries needed */
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.5rem; }
\`\`\`

**CSS Custom Properties (Variables)**
\`\`\`css
:root {
  --color-primary: #6366f1;
  --space-md: 1rem;
  --radius: 8px;
}
/* Changing --color-primary updates the entire design system */
\`\`\`

**Responsive Design — Mobile First**
Write styles for mobile first, then use min-width breakpoints to scale up:
\`\`\`css
.card { padding: 1rem; }                          /* mobile */
@media (min-width: 768px) { .card { padding: 2rem; } } /* tablet+ */
\`\`\`

### What Senior Devs Know
1. CSS specificity: inline > id > class > element. Use BEM naming to avoid specificity wars.
2. \`position: sticky\` for navbars. \`position: absolute\` is relative to the nearest positioned ancestor.
3. \`transform\` and \`opacity\` animations are GPU-accelerated. Avoid animating \`width\`, \`height\`, \`top\`, \`left\`.
4. CSS \`clamp()\` for fluid typography: \`font-size: clamp(1rem, 2.5vw, 2rem);\`

### Portfolio Project Checklist
- [ ] Hero section with animated text
- [ ] Responsive nav with hamburger menu
- [ ] Projects grid (CSS Grid)
- [ ] Dark/light mode toggle (CSS variables + JS)
- [ ] Contact form with validation
- [ ] Deployed to Netlify or Vercel`
      },
      {
        id: "javascript",
        title: "JavaScript (Core)",
        level: "Beginner–Intermediate",
        duration: "6 weeks",
        project: { title: "Full-Featured Todo App", desc: "Build a localStorage-backed todo manager with filters, drag-and-drop reordering, and keyboard shortcuts — demonstrating deep JS mastery." },
        resources: [
          { name: "javascript.info — The Modern JS Tutorial", url: "https://javascript.info", type: "Course" },
          { name: "Eloquent JavaScript (free book)", url: "https://eloquentjavascript.net", type: "Book" },
          { name: "Fireship — JavaScript in 100 Seconds", url: "https://www.youtube.com/watch?v=DHjqpvDnNGE", type: "Video" },
          { name: "You Don't Know JS (book series, free)", url: "https://github.com/getify/You-Dont-Know-JS", type: "Book" },
        ],
        concepts: ["ES6+", "Closures & scope", "Promises & async/await", "DOM manipulation", "Event loop", "Prototypes", "Array methods"],
        content: `## JavaScript — Deep Dive

### The Event Loop (What 90% of devs can't explain)
JS is single-threaded. The event loop enables async behavior:

1. **Call Stack** — executes synchronous code
2. **Web APIs** — handles setTimeout, fetch, etc. (browser-managed)  
3. **Callback Queue** — where callbacks wait
4. **Microtask Queue** — where Promises resolve (higher priority than callback queue)

\`\`\`javascript
console.log('1');
setTimeout(() => console.log('2'), 0);
Promise.resolve().then(() => console.log('3'));
console.log('4');
// Output: 1, 4, 3, 2
// Promise (microtask) runs BEFORE setTimeout (macrotask)
\`\`\`

### Closures — The Most Powerful Concept
A closure is a function that "remembers" its outer scope even after the outer function has returned.

\`\`\`javascript
function createCounter() {
  let count = 0; // this variable is "closed over"
  return {
    increment: () => ++count,
    decrement: () => --count,
    value: () => count
  };
}
const counter = createCounter();
counter.increment(); // 1
counter.increment(); // 2
// count is private — can't be accessed directly from outside
\`\`\`

Real use cases: memoization, module pattern, factory functions, React hooks.

### Async Patterns

\`\`\`javascript
// Old way (callback hell)
getUser(id, (user) => {
  getPosts(user.id, (posts) => {
    getComments(posts[0].id, (comments) => { /* ... */ })
  })
});

// Modern way — async/await
async function loadDashboard(userId) {
  try {
    const user = await getUser(userId);
    const posts = await getPosts(user.id);
    const comments = await getComments(posts[0].id);
    return { user, posts, comments };
  } catch (error) {
    console.error('Dashboard load failed:', error);
    throw error;
  }
}

// Parallel fetching (much faster!)
const [user, settings] = await Promise.all([getUser(id), getSettings(id)]);
\`\`\`

### Essential Array Methods (used in every codebase)
\`\`\`javascript
const users = [
  { name: 'Alice', age: 28, active: true },
  { name: 'Bob', age: 22, active: false },
  { name: 'Carol', age: 34, active: true },
];

// map — transform each element
const names = users.map(u => u.name); // ['Alice', 'Bob', 'Carol']

// filter — select elements
const active = users.filter(u => u.active); // [Alice, Carol]

// reduce — accumulate to a single value
const totalAge = users.reduce((sum, u) => sum + u.age, 0); // 84

// find — first match
const alice = users.find(u => u.name === 'Alice');

// Chaining
const avgActiveAge = users
  .filter(u => u.active)
  .reduce((acc, u, _, arr) => acc + u.age / arr.length, 0); // 31
\`\`\`

### Destructuring & Spread (used constantly)
\`\`\`javascript
// Object destructuring with rename + default
const { name: userName = 'Anonymous', age = 0 } = user;

// Array destructuring
const [first, second, ...rest] = [1, 2, 3, 4, 5];

// Spread — merge objects immutably (key for React state)
const updated = { ...user, age: 29 }; // creates new object!
\`\`\`

### What Interviewers Test
1. Explain the event loop
2. Closures and their use cases
3. \`this\` keyword binding rules
4. Prototype chain
5. \`==\` vs \`===\`
6. Promise chaining vs async/await`
      },
    ]
  },
  {
    id: "frontend",
    title: "Frontend",
    icon: "🎨",
    color: "#ec4899",
    description: "React ecosystem used by Meta, Airbnb, Netflix, and thousands of startups",
    topics: [
      {
        id: "react",
        title: "React",
        level: "Intermediate",
        duration: "6 weeks",
        project: { title: "Real-Time Dashboard", desc: "Build a data dashboard with live charts, filterable tables, user auth state, and optimistic UI updates — the kind of app at every tech company." },
        resources: [
          { name: "React Official Docs (react.dev)", url: "https://react.dev/learn", type: "Docs" },
          { name: "Scrimba — Learn React for Free", url: "https://scrimba.com/learn/learnreact", type: "Interactive" },
          { name: "Jack Herrington — React (YouTube Playlist)", url: "https://www.youtube.com/@jherr", type: "Video" },
          { name: "Full Stack Open (Helsinki University)", url: "https://fullstackopen.com/en/", type: "Course" },
        ],
        concepts: ["JSX", "Hooks (useState, useEffect, useContext, useReducer, useMemo)", "Component composition", "State management", "Custom hooks", "Performance optimization", "Error boundaries"],
        content: `## React — Deep Dive

### The Mental Model
React is a UI library based on one idea: **UI = f(state)**. Your UI is a pure function of your application state. When state changes, React re-renders efficiently using a virtual DOM diff.

### Hooks — The Core API

**useState** — local component state
\`\`\`javascript
const [count, setCount] = useState(0);

// NEVER mutate state directly
setCount(count + 1);             // ok but stale closure risk
setCount(prev => prev + 1);      // ✅ always use updater function for counters
\`\`\`

**useEffect** — sync with external systems
\`\`\`javascript
useEffect(() => {
  // runs after render
  const controller = new AbortController();
  
  fetch('/api/user', { signal: controller.signal })
    .then(r => r.json())
    .then(setUser);
  
  // cleanup function — runs before next effect or unmount
  return () => controller.abort();
}, [userId]); // dependency array — re-run when userId changes
\`\`\`

**Common mistakes:**
- Empty \`[]\` = run once (on mount)
- No array = run on every render (usually a bug)
- Missing dependencies = stale closure

**useReducer** — complex state logic
\`\`\`javascript
const initialState = { status: 'idle', data: null, error: null };

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_START': return { ...state, status: 'loading' };
    case 'FETCH_SUCCESS': return { status: 'success', data: action.payload, error: null };
    case 'FETCH_ERROR': return { status: 'error', data: null, error: action.payload };
    default: return state;
  }
}

const [state, dispatch] = useReducer(reducer, initialState);
\`\`\`

### Custom Hooks — The Superpower
Extract stateful logic into reusable hooks:
\`\`\`javascript
function useLocalStorage(key, initialValue) {
  const [stored, setStored] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch { return initialValue; }
  });

  const setValue = (value) => {
    const valueToStore = value instanceof Function ? value(stored) : value;
    setStored(valueToStore);
    window.localStorage.setItem(key, JSON.stringify(valueToStore));
  };

  return [stored, setValue];
}

// Usage — exactly like useState but persisted!
const [theme, setTheme] = useLocalStorage('theme', 'dark');
\`\`\`

### Performance — When and What to Optimize
\`\`\`javascript
// useMemo — cache expensive calculations
const sortedList = useMemo(
  () => items.sort((a, b) => a.price - b.price),
  [items]
);

// useCallback — stable function references for child props
const handleClick = useCallback(() => {
  dispatch({ type: 'INCREMENT' });
}, [dispatch]);

// React.memo — skip re-renders if props unchanged
const ExpensiveComponent = React.memo(({ data }) => {
  return <div>{/* ... */}</div>;
});
\`\`\`

**Rule:** Profile before optimizing. Most performance issues are data fetching, not re-renders.

### Component Patterns Used in Production

**Compound Components** (Radix UI, Headless UI style):
\`\`\`jsx
<Tabs defaultValue="profile">
  <Tabs.List>
    <Tabs.Trigger value="profile">Profile</Tabs.Trigger>
    <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="profile"><ProfileForm /></Tabs.Content>
  <Tabs.Content value="settings"><SettingsForm /></Tabs.Content>
</Tabs>
\`\`\`

**Render Props / Controlled Components** — flexibility at the API level.`
      },
      {
        id: "typescript",
        title: "TypeScript",
        level: "Intermediate",
        duration: "3 weeks",
        project: { title: "Type-Safe API Client", desc: "Build a fully typed REST/GraphQL client library — the kind of internal tooling every company builds for their frontend teams." },
        resources: [
          { name: "TypeScript Official Handbook", url: "https://www.typescriptlang.org/docs/handbook/intro.html", type: "Docs" },
          { name: "Matt Pocock — Total TypeScript (free tutorials)", url: "https://www.totaltypescript.com/tutorials", type: "Interactive" },
          { name: "No BS TS — Jack Herrington (YouTube)", url: "https://www.youtube.com/watch?v=LKVHFHp0rNk", type: "Video" },
          { name: "TypeScript Exercises", url: "https://typescript-exercises.github.io", type: "Practice" },
        ],
        concepts: ["Types vs Interfaces", "Generics", "Union & intersection types", "Type guards", "Utility types", "Declaration files", "tsconfig"],
        content: `## TypeScript — Deep Dive

### Why Every Top Company Requires TypeScript
TypeScript catches ~15% of bugs before runtime. At scale (millions of users, hundreds of engineers), this is enormous. Google, Meta, Microsoft, Stripe all mandate it.

### Types vs Interfaces
\`\`\`typescript
// Interface — open, extendable, use for objects/classes
interface User {
  id: string;
  name: string;
  email: string;
}
interface AdminUser extends User {
  permissions: string[];
}

// Type alias — use for unions, primitives, computed types
type Status = 'idle' | 'loading' | 'success' | 'error';
type UserOrAdmin = User | AdminUser;
\`\`\`

### Generics — The Key to Reusable Code
\`\`\`typescript
// Without generics — not reusable
function getFirstItem(arr: string[]): string { return arr[0]; }

// With generics — works for any type
function getFirst<T>(arr: T[]): T | undefined { return arr[0]; }

const first = getFirst([1, 2, 3]);      // TypeScript infers: number
const name = getFirst(['Alice', 'Bob']); // TypeScript infers: string

// Generic API response wrapper
interface ApiResponse<T> {
  data: T;
  error: string | null;
  loading: boolean;
}

async function fetchUser(id: string): Promise<ApiResponse<User>> {
  const res = await fetch(\`/api/users/\${id}\`);
  const data = await res.json();
  return { data, error: null, loading: false };
}
\`\`\`

### Utility Types (Built-in TypeScript magic)
\`\`\`typescript
interface User { id: string; name: string; email: string; age: number; }

type PartialUser = Partial<User>;          // All fields optional
type RequiredUser = Required<User>;        // All fields required
type UserPreview = Pick<User, 'id' | 'name'>; // Only these fields
type UserWithoutId = Omit<User, 'id'>;    // All except id
type ReadonlyUser = Readonly<User>;        // Can't mutate
type UserMap = Record<string, User>;       // { [key: string]: User }

// Real world — update payload
type UpdateUserPayload = Partial<Omit<User, 'id'>>;
\`\`\`

### Type Guards — Runtime Safety
\`\`\`typescript
type Cat = { meow: () => void };
type Dog = { bark: () => void };

// Type guard function
function isCat(animal: Cat | Dog): animal is Cat {
  return 'meow' in animal;
}

function makeSound(animal: Cat | Dog) {
  if (isCat(animal)) {
    animal.meow(); // TypeScript knows it's a Cat here
  } else {
    animal.bark(); // TypeScript knows it's a Dog here
  }
}
\`\`\``
      },
      {
        id: "nextjs",
        title: "Next.js",
        level: "Intermediate–Advanced",
        duration: "4 weeks",
        project: { title: "Full-Stack E-Commerce Platform", desc: "Server-rendered product pages, cart with server actions, Stripe payments, admin dashboard — a production-grade app used by top companies." },
        resources: [
          { name: "Next.js Official Docs (nextjs.org/learn)", url: "https://nextjs.org/learn", type: "Course" },
          { name: "Vercel YouTube — Next.js Crash Course", url: "https://www.youtube.com/watch?v=Sklc_fQBmcs", type: "Video" },
          { name: "Josh tried coding — Next.js 14 Full Course", url: "https://www.youtube.com/watch?v=wm5gMKuwSYk", type: "Video" },
          { name: "Full Stack Open — Next.js Chapter", url: "https://fullstackopen.com/en/", type: "Course" },
        ],
        concepts: ["App Router", "Server vs Client components", "Server Actions", "Data fetching strategies", "Route handlers", "Middleware", "Image & font optimization"],
        content: `## Next.js — Deep Dive

### The Mental Model: Where Does Code Run?
Next.js extends React with a server layer. Understanding this boundary is everything:

- **Server Components** — run on server, can read DB directly, never sent to client
- **Client Components** — run in browser, can use hooks/events, marked with \`'use client'\`

\`\`\`jsx
// app/dashboard/page.tsx — Server Component (default)
async function DashboardPage() {
  // Direct DB access — no API call needed!
  const user = await db.user.findUnique({ where: { id: session.userId } });
  const stats = await db.analytics.getStats(user.id);

  return (
    <main>
      <h1>Welcome, {user.name}</h1>
      <StatsChart data={stats} /> {/* Client component for interactivity */}
    </main>
  );
}

// app/components/StatsChart.tsx — Client Component
'use client';
import { useState } from 'react';

export function StatsChart({ data }) {
  const [timeRange, setTimeRange] = useState('7d');
  // useState, useEffect, event handlers — all work here
  return <div>/* chart */</div>;
}
\`\`\`

### Data Fetching Strategies
\`\`\`typescript
// 1. Static (SSG) — generated at build time, ultra-fast
export const revalidate = false; // default — never revalidate

// 2. ISR — regenerate every N seconds
export const revalidate = 3600; // refresh hourly

// 3. Dynamic (SSR) — fresh on every request
export const dynamic = 'force-dynamic';

// 4. Granular fetch control
const data = await fetch('https://api.example.com/data', {
  next: { revalidate: 60 }  // cache for 60 seconds
});
\`\`\`

### Server Actions — Full Stack in One File
\`\`\`typescript
// app/actions.ts
'use server';

export async function createPost(formData: FormData) {
  const title = formData.get('title') as string;
  
  // Validate
  if (title.length < 3) throw new Error('Title too short');
  
  // Write to DB
  const post = await db.post.create({ data: { title, userId: session.userId } });
  
  // Revalidate cached pages
  revalidatePath('/posts');
  redirect(\`/posts/\${post.id}\`);
}

// app/posts/new/page.tsx
export default function NewPostPage() {
  return (
    <form action={createPost}> {/* ← Server Action called directly! */}
      <input name="title" placeholder="Post title" />
      <button type="submit">Create Post</button>
    </form>
  );
}
\`\`\`

### File-Based Routing (App Router)
\`\`\`
app/
├── layout.tsx          → Root layout (header/footer)
├── page.tsx            → Homepage (/)
├── dashboard/
│   ├── layout.tsx      → Dashboard layout
│   └── page.tsx        → /dashboard
├── blog/
│   ├── page.tsx        → /blog
│   └── [slug]/         → Dynamic route
│       └── page.tsx    → /blog/my-post
└── api/
    └── webhooks/
        └── route.ts    → /api/webhooks (API endpoint)
\`\`\``
      },
    ]
  },
  {
    id: "backend",
    title: "Backend",
    icon: "⚙️",
    color: "#10b981",
    description: "Node.js, databases, APIs, and system design — what powers everything under the hood",
    topics: [
      {
        id: "nodejs",
        title: "Node.js & Express",
        level: "Intermediate",
        duration: "4 weeks",
        project: { title: "REST API with Auth", desc: "Build a production REST API with JWT auth, rate limiting, file uploads, email verification, and comprehensive error handling." },
        resources: [
          { name: "The Odin Project — NodeJS Course", url: "https://www.theodinproject.com/paths/full-stack-javascript/courses/nodejs", type: "Course" },
          { name: "Traversy Media — Node.js Crash Course", url: "https://www.youtube.com/watch?v=fBNz5xF-Kx4", type: "Video" },
          { name: "Node.js Official Docs", url: "https://nodejs.org/en/docs", type: "Docs" },
          { name: "Hussein Nasser — NodeJS Internals", url: "https://www.youtube.com/c/HusseinNasser-software-engineering", type: "Video" },
        ],
        concepts: ["Event-driven architecture", "Streams", "Express middleware", "REST design", "JWT auth", "File system", "Environment config"],
        content: `## Node.js & Express — Deep Dive

### Node.js Internals
Node.js runs on V8 (Chrome's JS engine) + libuv (async I/O). It's single-threaded but handles thousands of concurrent connections through the event loop and non-blocking I/O.

**Why Node for backends?**
- Same language as frontend (TypeScript everywhere)
- Excellent for I/O-heavy services (APIs, real-time)
- Huge npm ecosystem
- Used by Netflix, LinkedIn, Uber, PayPal

### Express Architecture
\`\`\`typescript
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

const app = express();

// Global middleware — runs on every request
app.use(express.json());
app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(helmet()); // Security headers

// Route-specific middleware
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next(); // pass to next handler
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Routes
app.get('/api/posts', authenticate, async (req, res) => {
  const posts = await db.post.findMany({ where: { userId: req.user.id } });
  res.json({ data: posts });
});
\`\`\`

### Project Structure (Industry Standard)
\`\`\`
src/
├── controllers/    → Route handlers (thin — just HTTP)
├── services/       → Business logic (the real code)
├── repositories/   → Database queries
├── middleware/     → Auth, validation, rate limiting
├── routes/         → Express router setup
├── utils/          → Helpers, constants
└── app.ts          → Express setup
\`\`\`

### Error Handling (What separates juniors from seniors)
\`\`\`typescript
// Custom error class
class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 500,
    public code?: string
  ) {
    super(message);
  }
}

// Global error handler middleware
app.use((err: Error, req, res, next) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: err.message,
      code: err.code
    });
  }
  
  // Log unexpected errors
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});
\`\`\``
      },
      {
        id: "databases",
        title: "Databases (SQL + NoSQL)",
        level: "Intermediate",
        duration: "4 weeks",
        project: { title: "Social Platform Backend", desc: "Model a social graph in PostgreSQL with complex queries — followers, feeds, likes, notifications — using Prisma ORM and Redis caching." },
        resources: [
          { name: "SQLBolt — Interactive SQL", url: "https://sqlbolt.com", type: "Interactive" },
          { name: "Prisma Docs — Data Modeling", url: "https://www.prisma.io/docs", type: "Docs" },
          { name: "Hussein Nasser — PostgreSQL (YouTube)", url: "https://www.youtube.com/watch?v=qw--VYLpxG4", type: "Video" },
          { name: "MongoDB University — Free Courses", url: "https://learn.mongodb.com", type: "Course" },
        ],
        concepts: ["SQL joins & indexes", "ACID transactions", "Prisma ORM", "Data modeling", "Redis caching", "N+1 problem", "Database migrations"],
        content: `## Databases — Deep Dive

### SQL vs NoSQL — When to Use What
- **PostgreSQL (SQL)** — structured data, relations, ACID, analytics. Use for: users, orders, financial records.
- **MongoDB (NoSQL)** — flexible schema, documents, scale writes. Use for: content, logs, catalogs.
- **Redis** — in-memory key-value. Use for: caching, sessions, rate limiting, pub/sub.

Most production apps use 2-3 databases for different needs.

### PostgreSQL — Essential Queries
\`\`\`sql
-- Indexing (most impactful optimization)
CREATE INDEX idx_posts_user_id ON posts(user_id); -- query by user_id 100x faster
CREATE INDEX idx_posts_created ON posts(created_at DESC); -- sorted queries

-- Efficient join
SELECT 
  u.name,
  COUNT(p.id) as post_count,
  AVG(p.likes) as avg_likes
FROM users u
LEFT JOIN posts p ON u.id = p.user_id
WHERE u.created_at > NOW() - INTERVAL '30 days'
GROUP BY u.id, u.name
ORDER BY post_count DESC
LIMIT 20;

-- Transaction — all-or-nothing
BEGIN;
  UPDATE accounts SET balance = balance - 100 WHERE id = 1;
  UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;
-- If either fails, NEITHER happens (ACID atomicity)
\`\`\`

### Prisma ORM (Industry standard)
\`\`\`typescript
// schema.prisma — your database schema as code
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String
  posts     Post[]
  createdAt DateTime @default(now())
}

model Post {
  id       String  @id @default(cuid())
  title    String
  content  String
  author   User    @relation(fields: [userId], references: [id])
  userId   String
  @@index([userId]) // ← always index foreign keys!
}

// Query with relations — no SQL needed
const userWithPosts = await prisma.user.findUnique({
  where: { id },
  include: {
    posts: {
      orderBy: { createdAt: 'desc' },
      take: 10,
    }
  }
});
\`\`\`

### The N+1 Problem (Common interview topic)
\`\`\`typescript
// BAD — N+1 queries (1 for users + N for each user's posts)
const users = await prisma.user.findMany();
for (const user of users) {
  user.posts = await prisma.post.findMany({ where: { userId: user.id } });
  // This fires a new DB query for EACH user!
}

// GOOD — 2 queries total with include
const users = await prisma.user.findMany({
  include: { posts: true } // Prisma batches this into 1 extra query
});
\`\`\`

### Redis Caching Pattern
\`\`\`typescript
async function getUserProfile(userId: string) {
  const cacheKey = \`user:profile:\${userId}\`;
  
  // Check cache first
  const cached = await redis.get(cacheKey);
  if (cached) return JSON.parse(cached);
  
  // Cache miss — query DB
  const user = await prisma.user.findUnique({ where: { id: userId } });
  
  // Store in cache for 5 minutes
  await redis.setex(cacheKey, 300, JSON.stringify(user));
  
  return user;
}
\`\`\``
      },
    ]
  },
  {
    id: "devops",
    title: "DevOps & Cloud",
    icon: "☁️",
    color: "#f59e0b",
    description: "Deploy, scale, and monitor — from localhost to millions of users",
    topics: [
      {
        id: "git",
        title: "Git & GitHub",
        level: "Beginner",
        duration: "1 week",
        project: { title: "Open Source Contribution", desc: "Make a real contribution to an open source project — the best signal on your resume. Fork, branch, PR, code review cycle." },
        resources: [
          { name: "Git — The Simple Guide", url: "https://rogerdudler.github.io/git-guide/", type: "Reference" },
          { name: "Oh My Git! — Interactive Game", url: "https://ohmygit.org", type: "Interactive" },
          { name: "GitHub Skills", url: "https://skills.github.com", type: "Course" },
          { name: "Atlassian — Git Tutorials", url: "https://www.atlassian.com/git/tutorials", type: "Docs" },
        ],
        concepts: ["Branching strategy", "Rebasing", "Cherry-pick", "Stash", "Git hooks", "PR workflows", "Conventional commits"],
        content: `## Git — Deep Dive

### The Commands You Use Daily
\`\`\`bash
# Feature branch workflow (used at every company)
git checkout -b feature/user-auth     # create + switch to branch
git add -p                            # interactive staging (review each change)
git commit -m "feat: add JWT auth"    # conventional commit format
git push origin feature/user-auth     # push to remote
# → Open Pull Request on GitHub

# Keeping your branch up to date
git fetch origin
git rebase origin/main               # replay your commits on top of main
                                     # cleaner history than merge

# Undo mistakes
git restore file.ts                  # discard unstaged changes
git reset HEAD~1                     # undo last commit (keep changes)
git reset --hard HEAD~1              # undo last commit (discard changes)
\`\`\`

### Conventional Commits (Used at Google, Angular, etc.)
\`\`\`
feat: add user authentication        ← new feature
fix: resolve login redirect bug      ← bug fix  
refactor: extract auth middleware     ← no behavior change
docs: update API documentation       ← docs only
test: add auth unit tests            ← tests only
chore: update dependencies           ← maintenance

# Breaking changes
feat!: redesign authentication API   ← triggers major version bump
\`\`\`

### Git Hooks (Automate quality)
\`\`\`bash
# .husky/pre-commit — runs before every commit
npm run lint          # catch style errors
npm run type-check    # catch TypeScript errors
npm run test:unit     # catch broken tests

# Developers can't commit broken code!
\`\`\``
      },
      {
        id: "docker",
        title: "Docker & CI/CD",
        level: "Intermediate",
        duration: "2 weeks",
        project: { title: "Containerized App Pipeline", desc: "Dockerize your Next.js + Node.js app and set up a GitHub Actions pipeline that auto-deploys on every merge to main." },
        resources: [
          { name: "Docker Official Get Started", url: "https://docs.docker.com/get-started/", type: "Docs" },
          { name: "TechWorld with Nana — Docker Tutorial", url: "https://www.youtube.com/watch?v=3c-iBn73dDE", type: "Video" },
          { name: "GitHub Actions Docs", url: "https://docs.github.com/en/actions", type: "Docs" },
          { name: "DevOps Directive — Full Docker Course (free)", url: "https://www.youtube.com/watch?v=RqTEHSBrYFw", type: "Video" },
        ],
        concepts: ["Dockerfile", "docker-compose", "Multi-stage builds", "GitHub Actions", "Automated testing", "Deployment pipelines", "Environment management"],
        content: `## Docker & CI/CD — Deep Dive

### Why Docker?
"It works on my machine" is eliminated. Docker packages your app and all its dependencies into a container that runs identically on any machine — dev, CI, production.

### Production Dockerfile (Multi-stage)
\`\`\`dockerfile
# Stage 1: Dependencies
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# Stage 2: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build

# Stage 3: Production (tiny final image)
FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=deps /app/node_modules ./node_modules

ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", "dist/server.js"]
# Result: ~100MB image instead of ~1GB
\`\`\`

### docker-compose (Local Development)
\`\`\`yaml
# docker-compose.yml
services:
  app:
    build: .
    ports: ["3000:3000"]
    environment:
      DATABASE_URL: postgresql://postgres:password@db:5432/mydb
      REDIS_URL: redis://cache:6379
    depends_on: [db, cache]
    
  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_PASSWORD: password
      POSTGRES_DB: mydb
    volumes:
      - db_data:/var/lib/postgresql/data
      
  cache:
    image: redis:7-alpine
    
volumes:
  db_data:
# Start entire stack: docker-compose up
\`\`\`

### GitHub Actions CI/CD Pipeline
\`\`\`yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - run: npm ci
      - run: npm run type-check
      - run: npm run test
      - run: npm run build

  deploy:
    needs: test  # Only deploy if tests pass!
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to Railway/Render
        run: curl -X POST $&#123;&#123; secrets.DEPLOY_WEBHOOK &#125;&#125;
\`\`\``
      },
    ]
  },
  {
    id: "advanced",
    title: "Advanced Topics",
    icon: "🚀",
    color: "#8b5cf6",
    description: "What separates senior engineers — system design, testing, and architecture",
    topics: [
      {
        id: "system-design",
        title: "System Design",
        level: "Advanced",
        duration: "4 weeks",
        project: { title: "Design Twitter/X Clone Architecture", desc: "Document a complete system design: API gateway, microservices, message queues, CDN, caching layers — present it as a tech spec companies write before building." },
        resources: [
          { name: "System Design Primer (GitHub)", url: "https://github.com/donnemartin/system-design-primer", type: "Course" },
          { name: "ByteByteGo — System Design (YouTube)", url: "https://www.youtube.com/c/ByteByteGo", type: "Video" },
          { name: "Exponent — System Design Interview", url: "https://www.youtube.com/c/ExponentTV", type: "Video" },
          { name: "Martin Fowler — Architecture Patterns", url: "https://martinfowler.com/architecture/", type: "Reference" },
        ],
        concepts: ["Load balancing", "Caching strategies", "Database sharding", "CAP theorem", "Message queues", "API gateways", "Microservices"],
        content: `## System Design — Deep Dive

### The Framework for Any System Design Interview
1. **Clarify requirements** — functional vs non-functional (scale, latency, consistency)
2. **Estimate scale** — users, QPS, storage, bandwidth
3. **Design APIs** — what endpoints/interfaces?
4. **Data model** — schema, which DB, indexes
5. **High-level design** — components and how they connect
6. **Deep dive** — bottlenecks, tradeoffs, failure modes

### Designing a URL Shortener (Classic Interview Question)

**Requirements:**
- Create short URL from long URL
- Redirect short → long
- 100M URLs created/day, 10:1 read/write ratio = 1B redirects/day

**Estimations:**
- QPS: 100M / 86400 ≈ 1,160 writes/sec, ~11,600 reads/sec
- Storage: 500 bytes/URL × 100M/day × 365 × 5 years ≈ 900GB

**Core Design:**
\`\`\`
Client → CDN → Load Balancer → API Servers → Cache (Redis)
                                                  ↓ cache miss
                                            Database (PostgreSQL)
\`\`\`

**URL Generation — Base62 encoding:**
- 62^7 = 3.5 trillion unique URLs (more than enough)
- Use hash of long URL or auto-increment ID → base62 encode

### CAP Theorem (Interview Essentials)
Pick 2 of 3 in a distributed system:
- **Consistency** — all nodes see same data simultaneously
- **Availability** — system always responds
- **Partition Tolerance** — works despite network failures

Real world: partitions happen. Choose CP (banking) or AP (social media).

### Caching Strategies
- **Cache-aside** (most common): check cache → miss → query DB → write to cache
- **Write-through**: write to cache AND DB simultaneously (consistent, slower writes)
- **Write-behind**: write to cache, async write to DB (fast writes, risk of data loss)

**Cache invalidation** is one of the hardest problems in CS:
- TTL (time-to-live): simple, may serve stale data
- Event-driven: invalidate on mutation (complex but fresh)`
      },
      {
        id: "testing",
        title: "Testing",
        level: "Intermediate",
        duration: "2 weeks",
        project: { title: "Test Suite for Auth System", desc: "Write unit tests, integration tests, and E2E tests for a full auth flow. Achieve >90% coverage — the standard at top companies." },
        resources: [
          { name: "Vitest Docs", url: "https://vitest.dev/guide/", type: "Docs" },
          { name: "Testing Library Docs", url: "https://testing-library.com/docs/", type: "Docs" },
          { name: "Playwright Docs", url: "https://playwright.dev/docs/intro", type: "Docs" },
          { name: "Kent C. Dodds — Testing JavaScript (free articles)", url: "https://kentcdodds.com/blog?q=testing", type: "Reference" },
        ],
        concepts: ["Unit tests", "Integration tests", "E2E tests", "Mocking", "Test coverage", "TDD", "Testing React components"],
        content: `## Testing — Deep Dive

### The Testing Trophy
Don't chase 100% coverage. Invest where bugs live:
- **Static** (TypeScript, ESLint) — catch typos, type errors
- **Unit** — test pure functions and utilities  
- **Integration** — test components with real dependencies
- **E2E** — test critical user flows

Most value: Integration > Unit > E2E (for most apps).

### Unit Testing with Vitest
\`\`\`typescript
import { describe, it, expect } from 'vitest';
import { formatCurrency, calculateDiscount } from './utils';

describe('formatCurrency', () => {
  it('formats USD correctly', () => {
    expect(formatCurrency(1234.56, 'USD')).toBe('$1,234.56');
  });
  
  it('handles zero', () => {
    expect(formatCurrency(0, 'USD')).toBe('$0.00');
  });
  
  it('throws on negative values', () => {
    expect(() => formatCurrency(-1, 'USD')).toThrow('Amount must be positive');
  });
});
\`\`\`

### Testing React Components
\`\`\`typescript
import { render, screen, userEvent } from '@testing-library/react';
import { LoginForm } from './LoginForm';

describe('LoginForm', () => {
  it('shows error when email is empty', async () => {
    render(<LoginForm onSubmit={vi.fn()} />);
    
    await userEvent.click(screen.getByRole('button', { name: /sign in/i }));
    
    expect(screen.getByText('Email is required')).toBeInTheDocument();
  });
  
  it('calls onSubmit with credentials', async () => {
    const onSubmit = vi.fn();
    render(<LoginForm onSubmit={onSubmit} />);
    
    await userEvent.type(screen.getByLabelText('Email'), 'user@example.com');
    await userEvent.type(screen.getByLabelText('Password'), 'password123');
    await userEvent.click(screen.getByRole('button', { name: /sign in/i }));
    
    expect(onSubmit).toHaveBeenCalledWith({
      email: 'user@example.com',
      password: 'password123'
    });
  });
});
\`\`\`

### E2E Testing with Playwright
\`\`\`typescript
import { test, expect } from '@playwright/test';

test('user can complete checkout', async ({ page }) => {
  await page.goto('/products');
  await page.click('[data-testid="product-card"]');
  await page.click('button:text("Add to Cart")');
  await page.goto('/cart');
  await page.click('button:text("Checkout")');
  
  await page.fill('[name="card-number"]', '4242424242424242');
  await page.fill('[name="expiry"]', '12/26');
  await page.click('button:text("Pay")');
  
  await expect(page.locator('h1')).toContainText('Order Confirmed');
});
\`\`\``
      },
    ]
  },
];

const ROADMAP = [
  { week: "1–3", phase: "Foundations", topics: "HTML, CSS, Git basics", section: "foundations" },
  { week: "4–9", phase: "JavaScript", topics: "Core JS, ES6+, DOM, async", section: "foundations" },
  { week: "10–15", phase: "React", topics: "Hooks, patterns, performance", section: "frontend" },
  { week: "16–18", phase: "TypeScript", topics: "Types, generics, utility types", section: "frontend" },
  { week: "19–22", phase: "Next.js", topics: "App Router, Server Components", section: "frontend" },
  { week: "23–26", phase: "Node.js API", topics: "Express, auth, REST design", section: "backend" },
  { week: "27–30", phase: "Databases", topics: "PostgreSQL, Prisma, Redis", section: "backend" },
  { week: "31–32", phase: "Docker & CI/CD", topics: "Containers, pipelines", section: "devops" },
  { week: "33–36", phase: "System Design", topics: "Architecture, scale, interviews", section: "advanced" },
  { week: "37–38", phase: "Testing", topics: "Unit, integration, E2E", section: "advanced" },
];

// ── Light theme ─────────────────────────────────────────────────────────────
const LIGHT = {
  ink:       "#0D0D0D",
  paper:     "#F7F6F3",
  canvas:    "#FFFFFF",
  accent:    "#1A6BF0",
  accentMid: "#EBF1FD",
  rule:      "#E8E6E1",
  mid:       "#6B6860",
  light:     "#A09D98",
  success:   "#0D9D6B",
  successBg: "#E6F4F0",
  code:      "#1C1C1E",
};

// ── Dark theme ───────────────────────────────────────────────────────────────
const DARK = {
  ink:       "#EDECEA",
  paper:     "#1C1C1E",
  canvas:    "#111111",
  accent:    "#5B9EF8",
  accentMid: "#1A2D50",
  rule:      "#2C2C2E",
  mid:       "#8A8784",
  light:     "#545250",
  success:   "#34D399",
  successBg: "#0A2E1E",
  code:      "#0A0A0C",
};

// ── Section colors ───────────────────────────────────────────────────────────
const SC_LIGHT = {
  foundations: "#1A6BF0",
  frontend:    "#0D9D6B",
  backend:     "#C2410C",
  devops:      "#7C3AED",
  advanced:    "#B45309",
};
const SC_DARK = {
  foundations: "#5B9EF8",
  frontend:    "#34D399",
  backend:     "#FB923C",
  devops:      "#A78BFA",
  advanced:    "#FBBF24",
};

// ── Theme context ────────────────────────────────────────────────────────────
const ThemeCtx = createContext({ T: LIGHT, SC: SC_LIGHT });
const useTheme = () => useContext(ThemeCtx);

const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  * { scrollbar-width: none; -ms-overflow-style: none; }
  *::-webkit-scrollbar { display: none; }
  body { font-family: 'DM Sans', system-ui, sans-serif; }
  a { color: inherit; text-decoration: none; }
  button { font-family: inherit; cursor: pointer; }
  .fa-transition { transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease; }
`;

function CodeBlock({ code }) {
  const { T } = useTheme();
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div style={{ position: "relative", margin: "1.25rem 0", borderRadius: 6, overflow: "hidden", border: `1px solid #2A2A2E` }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#242428", padding: "7px 14px" }}>
        <div style={{ display: "flex", gap: 6 }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FF5F57" }} />
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FFBD2E" }} />
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#28C840" }} />
        </div>
        <button onClick={copy} style={{ background: "none", border: "none", color: copied ? "#28C840" : "#888", fontSize: 11, fontFamily: "'DM Mono', monospace", cursor: "pointer", letterSpacing: "0.03em" }}>
          {copied ? "copied" : "copy"}
        </button>
      </div>
      <pre style={{ background: T.code, color: "#D4D4D4", padding: "1rem 1.25rem", overflowX: "auto", fontSize: 12.5, lineHeight: 1.7, fontFamily: "'DM Mono', monospace" }}>
        <code>{code}</code>
      </pre>
    </div>
  );
}

function MarkdownContent({ content }) {
  const { T } = useTheme();
  const parts = content.split(/(```[\s\S]*?```)/g);
  return (
    <div style={{ color: T.mid, lineHeight: 1.8, fontSize: 14.5 }}>
      {parts.map((part, i) => {
        if (part.startsWith("```")) {
          const code = part.replace(/^```\w*\n?/, "").replace(/```$/, "");
          return <CodeBlock key={i} code={code} />;
        }
        const html = part
          .replace(/^## (.+)$/gm, `<h2 style="color:${T.ink};font-size:1.05rem;font-weight:600;margin:2rem 0 0.6rem;letter-spacing:-0.01em">$1</h2>`)
          .replace(/^### (.+)$/gm, `<h3 style="color:${T.ink};font-size:0.9rem;font-weight:600;margin:1.5rem 0 0.4rem;text-transform:uppercase;letter-spacing:0.06em;color:${T.light}">$1</h3>`)
          .replace(/\*\*(.+?)\*\*/g, `<strong style="color:${T.ink};font-weight:600">$1</strong>`)
          .replace(/`([^`]+)`/g, `<code style="background:${T.accentMid};color:${T.accent};padding:1px 6px;border-radius:3px;font-size:12px;font-family:'DM Mono',monospace">$1</code>`)
          .replace(/^\d\. (.+)$/gm, `<div style="display:flex;gap:10px;margin:5px 0;padding-left:4px"><span style="color:${T.accent};font-weight:600;font-size:13px;min-width:16px;font-family:'DM Mono',monospace">·</span><span>$1</span></div>`)
          .replace(/^- \[ \] (.+)$/gm, `<div style="display:flex;gap:8px;margin:5px 0;align-items:flex-start"><span style="color:${T.rule};margin-top:2px;font-size:12px">☐</span><span>$1</span></div>`)
          .replace(/^- (.+)$/gm, `<div style="display:flex;gap:10px;margin:4px 0;padding-left:4px"><span style="color:${T.accent};font-weight:600">–</span><span>$1</span></div>`)
          .replace(/\n\n/g, "<br/>");
        return <div key={i} dangerouslySetInnerHTML={{ __html: html }} />;
      })}
    </div>
  );
}

export default function FullstackAcademy() {
  const [activeSection, setActiveSection] = useState("home");
  const [activeTopic, setActiveTopic] = useState(null);
  const [activeTab, setActiveTab] = useState("content");
  const [completedTopics, setCompletedTopics] = useState(new Set());
  const [isDark, setIsDark] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [winW, setWinW] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  const contentRef = useRef(null);

  useEffect(() => {
    const handle = () => setWinW(window.innerWidth);
    window.addEventListener("resize", handle);
    return () => window.removeEventListener("resize", handle);
  }, []);

  const isMobile = winW < 768;
  const T = isDark ? DARK : LIGHT;
  const SECTION_COLORS = isDark ? SC_DARK : SC_LIGHT;

  const allTopics = CURRICULUM.flatMap(s => s.topics);
  const totalTopics = allTopics.length;
  const progress = Math.round((completedTopics.size / totalTopics) * 100);

  const openTopic = (topic) => {
    setActiveTopic(topic);
    setActiveTab("content");
    setActiveSection("topic");
    if (isMobile) setSidebarOpen(false);
    setTimeout(() => contentRef.current?.scrollTo(0, 0), 10);
  };

  const toggleComplete = (topicId) => {
    setCompletedTopics(prev => {
      const next = new Set(prev);
      next.has(topicId) ? next.delete(topicId) : next.add(topicId);
      return next;
    });
  };

  const currentTopicIndex = activeTopic ? allTopics.findIndex(t => t.id === activeTopic.id) : -1;

  // ── SVG Icons ──────────────────────────────────────────────────────────────
  const IconSun = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  );
  const IconMoon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  );
  const IconMenu = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>
    </svg>
  );
  const IconClose = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  );

  return (
    <ThemeCtx.Provider value={{ T, SC: SECTION_COLORS }}>
      <div style={{ display: "flex", height: "100vh", background: T.canvas, color: T.ink, fontFamily: "'DM Sans', system-ui, sans-serif", overflow: "hidden", transition: "background 0.25s, color 0.25s" }}>
        <style>{GLOBAL_CSS}</style>

        {/* ── Mobile backdrop ── */}
        {isMobile && sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            style={{ position: "fixed", inset: 0, zIndex: 40, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(3px)", transition: "opacity 0.2s" }}
          />
        )}

        {/* ── Sidebar ── */}
        <aside style={{
          width: 252,
          background: T.paper,
          borderRight: `1px solid ${T.rule}`,
          display: "flex",
          flexDirection: "column",
          flexShrink: 0,
          transition: "background 0.25s, border-color 0.25s, transform 0.28s cubic-bezier(.4,0,.2,1)",
          ...(isMobile ? {
            position: "fixed",
            top: 0, left: 0, bottom: 0,
            zIndex: 50,
            transform: sidebarOpen ? "translateX(0)" : "translateX(-100%)",
            boxShadow: sidebarOpen ? "4px 0 24px rgba(0,0,0,0.18)" : "none",
          } : {}),
        }}>

          {/* Wordmark + dark toggle */}
          <div style={{ padding: "20px 20px 16px", borderBottom: `1px solid ${T.rule}`, transition: "border-color 0.25s" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
              <button
                onClick={() => { setActiveSection("home"); if (isMobile) setSidebarOpen(false); }}
                style={{ background: "none", border: "none", padding: 0, textAlign: "left", flex: 1 }}
              >
                <div style={{ fontSize: 13, fontWeight: 600, color: T.ink, letterSpacing: "-0.01em", transition: "color 0.25s" }}>Fullstack Academy</div>
                <div style={{ fontSize: 11, color: T.light, marginTop: 1, transition: "color 0.25s" }}>Zero to senior engineer</div>
              </button>
              {/* Dark mode toggle */}
              <button
                onClick={() => setIsDark(d => !d)}
                title={isDark ? "Switch to light mode" : "Switch to dark mode"}
                style={{ background: T.accentMid, border: `1px solid ${T.accent}30`, borderRadius: 7, padding: "5px 7px", color: T.accent, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "background 0.25s, color 0.25s" }}
              >
                {isDark ? <IconSun /> : <IconMoon />}
              </button>
            </div>

            {/* Progress */}
            <div style={{ marginTop: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 7 }}>
                <span style={{ fontSize: 11, color: T.light, transition: "color 0.25s" }}>Progress</span>
                <span style={{ fontSize: 11, fontFamily: "'DM Mono', monospace", color: T.accent, transition: "color 0.25s" }}>{completedTopics.size}/{totalTopics}</span>
              </div>
              <div style={{ height: 3, background: T.rule, borderRadius: 2, overflow: "hidden", transition: "background 0.25s" }}>
                <div style={{ height: "100%", width: `${progress}%`, background: `linear-gradient(90deg, ${T.accent}, ${T.success})`, borderRadius: 2, transition: "width 0.45s cubic-bezier(.4,0,.2,1)" }} />
              </div>
              {progress > 0 && (
                <div style={{ fontSize: 10.5, color: T.light, marginTop: 4, textAlign: "right", fontFamily: "'DM Mono', monospace", transition: "color 0.25s" }}>{progress}% complete</div>
              )}
            </div>
          </div>

          {/* Nav */}
          <nav style={{ flex: 1, overflowY: "auto", padding: "12px 0 24px" }}>
            <button
              onClick={() => { setActiveSection("roadmap"); if (isMobile) setSidebarOpen(false); }}
              style={{ width: "100%", textAlign: "left", padding: "7px 20px", background: activeSection === "roadmap" ? T.accentMid : "none", border: "none", fontSize: 12.5, color: activeSection === "roadmap" ? T.accent : T.mid, fontWeight: activeSection === "roadmap" ? 500 : 400, display: "flex", alignItems: "center", gap: 8, transition: "background 0.15s, color 0.15s" }}
            >
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M2 4h12M2 8h8M2 12h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
              Roadmap
            </button>

            <div style={{ height: 1, background: T.rule, margin: "10px 20px", transition: "background 0.25s" }} />

            {CURRICULUM.map((section) => {
              const sColor = SECTION_COLORS[section.id] || T.accent;
              const sTopics = section.topics;
              return (
                <div key={section.id} style={{ marginBottom: 4 }}>
                  <div style={{ padding: "5px 20px", display: "flex", alignItems: "center", gap: 7 }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: sColor, flexShrink: 0 }} />
                    <span style={{ fontSize: 10.5, fontWeight: 600, color: T.light, textTransform: "uppercase", letterSpacing: "0.07em", transition: "color 0.25s" }}>{section.title}</span>
                  </div>
                  <div style={{ paddingLeft: 28, position: "relative" }}>
                    <div style={{ position: "absolute", left: 22, top: 0, bottom: 0, width: 1, background: T.rule, transition: "background 0.25s" }} />
                    {sTopics.map((topic) => {
                      const isActive = activeTopic?.id === topic.id;
                      const isDone = completedTopics.has(topic.id);
                      return (
                        <button
                          key={topic.id}
                          onClick={() => openTopic(topic)}
                          style={{ width: "100%", textAlign: "left", background: isActive ? T.accentMid : "none", border: "none", padding: "5px 12px 5px 14px", display: "flex", alignItems: "center", gap: 9, position: "relative", borderRadius: 0, transition: "background 0.15s" }}
                        >
                          <div style={{ position: "absolute", left: -8, width: 7, height: 7, borderRadius: "50%", background: isDone ? T.success : isActive ? T.accent : T.canvas, border: `1.5px solid ${isDone ? T.success : isActive ? T.accent : T.rule}`, flexShrink: 0, zIndex: 1, transition: "all 0.2s" }} />
                          <span style={{ fontSize: 12.5, color: isActive ? T.accent : isDone ? T.success : T.mid, fontWeight: isActive ? 500 : 400, lineHeight: 1.3, transition: "color 0.15s" }}>{topic.title}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </nav>
        </aside>

        {/* ── Right column (mobile header + main) ── */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>

          {/* Mobile top bar */}
          {isMobile && (
            <div style={{ height: 52, background: T.paper, borderBottom: `1px solid ${T.rule}`, display: "flex", alignItems: "center", padding: "0 16px", gap: 12, flexShrink: 0, zIndex: 10, transition: "background 0.25s, border-color 0.25s" }}>
              <button
                onClick={() => setSidebarOpen(o => !o)}
                style={{ background: "none", border: "none", color: T.mid, padding: 4, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 6, transition: "color 0.15s" }}
              >
                {sidebarOpen ? <IconClose /> : <IconMenu />}
              </button>
              <span style={{ flex: 1, fontSize: 13.5, fontWeight: 600, color: T.ink, letterSpacing: "-0.01em", transition: "color 0.25s" }}>Fullstack Academy</span>
              {/* Progress pill */}
              <span style={{ fontSize: 11, fontFamily: "'DM Mono', monospace", color: T.accent, background: T.accentMid, padding: "2px 8px", borderRadius: 20, transition: "background 0.25s, color 0.25s" }}>{progress}%</span>
              <button
                onClick={() => setIsDark(d => !d)}
                style={{ background: T.accentMid, border: `1px solid ${T.accent}30`, borderRadius: 7, padding: "5px 7px", color: T.accent, display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.25s, color 0.25s" }}
              >
                {isDark ? <IconSun /> : <IconMoon />}
              </button>
            </div>
          )}

          {/* ── Main content ── */}
          <main ref={contentRef} style={{ flex: 1, overflowY: "auto", background: T.canvas, transition: "background 0.25s" }}>

            {/* ══ HOME ══ */}
            {activeSection === "home" && (
              <div style={{ maxWidth: 820, margin: "0 auto", padding: isMobile ? "32px 20px 64px" : "56px 48px" }}>

                {/* Hero */}
                <div style={{ marginBottom: isMobile ? 36 : 56 }}>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: T.accentMid, border: `1px solid ${T.accent}28`, borderRadius: 20, padding: "4px 12px", marginBottom: 20, transition: "background 0.25s" }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: T.accent, boxShadow: `0 0 0 3px ${T.accent}25` }} />
                    <span style={{ fontSize: 11.5, color: T.accent, fontWeight: 500, transition: "color 0.25s" }}>Free · Self-paced · 38 weeks</span>
                  </div>
                  <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 2.75rem)", fontWeight: 600, color: T.ink, lineHeight: 1.15, letterSpacing: "-0.03em", marginBottom: 16, transition: "color 0.25s" }}>
                    The curriculum that gets<br />engineers hired at top companies.
                  </h1>
                  <p style={{ fontSize: isMobile ? 14.5 : 16, color: T.mid, lineHeight: 1.7, maxWidth: 520, marginBottom: 28, transition: "color 0.25s" }}>
                    Real-world projects, deep explanations, and hand-picked free resources — structured the way a senior engineer at Stripe would structure it.
                  </p>
                  <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
                    <button
                      onClick={() => openTopic(allTopics[0])}
                      style={{ background: T.ink, color: T.canvas, border: "none", padding: "11px 22px", borderRadius: 7, fontSize: 13.5, fontWeight: 500, letterSpacing: "-0.01em", transition: "background 0.25s, color 0.25s, opacity 0.15s" }}
                      onMouseEnter={e => e.currentTarget.style.opacity = "0.82"}
                      onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                    >
                      Start with HTML & CSS →
                    </button>
                    <button
                      onClick={() => setActiveSection("roadmap")}
                      style={{ background: "none", color: T.mid, border: `1px solid ${T.rule}`, padding: "11px 22px", borderRadius: 7, fontSize: 13.5, transition: "border-color 0.15s, color 0.15s" }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = T.ink; e.currentTarget.style.color = T.ink; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = T.rule; e.currentTarget.style.color = T.mid; }}
                    >
                      View roadmap
                    </button>
                  </div>
                </div>

                {/* Stats grid */}
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)", borderTop: `1px solid ${T.rule}`, borderBottom: `1px solid ${T.rule}`, marginBottom: isMobile ? 36 : 52, transition: "border-color 0.25s" }}>
                  {[
                    { n: "38", label: "weeks" },
                    { n: `${totalTopics}`, label: "core topics" },
                    { n: "10+", label: "portfolio projects" },
                    { n: "100%", label: "free resources" },
                  ].map((s, i) => {
                    const isRightCol = isMobile ? i % 2 === 1 : i === 3;
                    const isBottom = isMobile && i >= 2;
                    return (
                      <div key={i} style={{
                        padding: "20px 0",
                        paddingLeft: isMobile ? (i % 2 === 0 ? 0 : 20) : (i === 0 ? 0 : 24),
                        borderRight: isRightCol ? "none" : `1px solid ${T.rule}`,
                        borderBottom: isBottom ? "none" : (isMobile && i < 2 ? `1px solid ${T.rule}` : "none"),
                        transition: "border-color 0.25s",
                      }}>
                        <div style={{ fontSize: isMobile ? 20 : 23, fontWeight: 600, color: T.ink, letterSpacing: "-0.03em", fontFamily: "'DM Mono', monospace", transition: "color 0.25s" }}>{s.n}</div>
                        <div style={{ fontSize: 12, color: T.light, marginTop: 3, transition: "color 0.25s" }}>{s.label}</div>
                      </div>
                    );
                  })}
                </div>

                {/* Curriculum sections */}
                <div>
                  <h2 style={{ fontSize: 11, fontWeight: 600, color: T.light, textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: 20, transition: "color 0.25s" }}>Curriculum</h2>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    {CURRICULUM.map((section) => (
                      <div key={section.id} style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: "16px 0", borderTop: `1px solid ${T.rule}`, transition: "border-color 0.25s" }}>
                        <div style={{ width: 7, height: 7, borderRadius: "50%", background: SECTION_COLORS[section.id], flexShrink: 0, marginTop: 5 }} />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 8, flexWrap: "wrap" }}>
                            <span style={{ fontSize: 14, fontWeight: 600, color: T.ink, transition: "color 0.25s" }}>{section.icon} {section.title}</span>
                            <span style={{ fontSize: 11, color: T.light, flexShrink: 0, transition: "color 0.25s" }}>{section.topics.length} topics</span>
                          </div>
                          <p style={{ fontSize: 13, color: T.mid, marginTop: 3, lineHeight: 1.5, transition: "color 0.25s" }}>{section.description}</p>
                          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 10 }}>
                            {section.topics.map(t => (
                              <button
                                key={t.id}
                                onClick={() => openTopic(t)}
                                style={{ fontSize: 12, color: SECTION_COLORS[section.id], background: "none", border: `1px solid ${T.rule}`, padding: "3px 10px", borderRadius: 20, fontFamily: "inherit", transition: "border-color 0.15s, background 0.15s" }}
                                onMouseEnter={e => { e.currentTarget.style.borderColor = SECTION_COLORS[section.id]; e.currentTarget.style.background = T.accentMid; }}
                                onMouseLeave={e => { e.currentTarget.style.borderColor = T.rule; e.currentTarget.style.background = "none"; }}
                              >
                                {t.title}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                    <div style={{ borderTop: `1px solid ${T.rule}`, transition: "border-color 0.25s" }} />
                  </div>
                </div>
              </div>
            )}

            {/* ══ ROADMAP ══ */}
            {activeSection === "roadmap" && (
              <div style={{ maxWidth: 680, margin: "0 auto", padding: isMobile ? "32px 20px 64px" : "56px 48px" }}>
                <div style={{ marginBottom: 36 }}>
                  <h1 style={{ fontSize: "clamp(1.4rem, 3vw, 1.6rem)", fontWeight: 600, color: T.ink, letterSpacing: "-0.025em", transition: "color 0.25s" }}>Learning Roadmap</h1>
                  <p style={{ fontSize: 14, color: T.mid, marginTop: 6, lineHeight: 1.6, transition: "color 0.25s" }}>38 weeks, sequenced so each skill builds on the last. Don't skip ahead.</p>
                </div>
                <div style={{ position: "relative", paddingLeft: 32 }}>
                  <div style={{ position: "absolute", left: 7, top: 8, bottom: 8, width: 1, background: T.rule, transition: "background 0.25s" }} />
                  {ROADMAP.map((r, i) => {
                    const sColor = SECTION_COLORS[r.section] || T.accent;
                    return (
                      <div key={i} style={{ position: "relative", marginBottom: 26 }}>
                        <div style={{ position: "absolute", left: -28, top: 4, width: 9, height: 9, borderRadius: "50%", background: T.canvas, border: `2px solid ${sColor}`, transition: "background 0.25s" }} />
                        <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                          <span style={{ fontSize: 11, fontFamily: "'DM Mono', monospace", color: T.light, minWidth: 50, flexShrink: 0, paddingTop: 2, transition: "color 0.25s" }}>wk {r.week}</span>
                          <div>
                            <div style={{ fontSize: 13.5, fontWeight: 500, color: T.ink, transition: "color 0.25s" }}>{r.phase}</div>
                            <div style={{ fontSize: 12.5, color: T.mid, marginTop: 2, transition: "color 0.25s" }}>{r.topics}</div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ══ TOPIC ══ */}
            {activeSection === "topic" && activeTopic && (() => {
              const parentSection = CURRICULUM.find(s => s.topics.find(t => t.id === activeTopic.id));
              const sColor = parentSection ? SECTION_COLORS[parentSection.id] : T.accent;
              const nextTopic = allTopics[currentTopicIndex + 1];
              const prevTopic = allTopics[currentTopicIndex - 1];
              const isDone = completedTopics.has(activeTopic.id);

              return (
                <div style={{ maxWidth: 740, margin: "0 auto", padding: isMobile ? "24px 20px 80px" : "40px 48px 80px" }}>

                  {/* Breadcrumb */}
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 28, flexWrap: "wrap" }}>
                    <button
                      onClick={() => setActiveSection("home")}
                      style={{ background: "none", border: "none", color: T.light, fontSize: 12.5, padding: 0, transition: "color 0.15s" }}
                      onMouseEnter={e => e.currentTarget.style.color = T.ink}
                      onMouseLeave={e => e.currentTarget.style.color = T.light}
                    >Home</button>
                    <span style={{ color: T.rule, fontSize: 12 }}>›</span>
                    <span style={{ fontSize: 12.5, color: T.light, transition: "color 0.25s" }}>{parentSection?.title}</span>
                    <span style={{ color: T.rule, fontSize: 12 }}>›</span>
                    <span style={{ fontSize: 12.5, color: T.mid, transition: "color 0.25s" }}>{activeTopic.title}</span>
                  </div>

                  {/* Topic header */}
                  <div style={{ marginBottom: 28 }}>
                    <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 10, flexWrap: "wrap" }}>
                      <span style={{ fontSize: 11, fontWeight: 500, color: sColor, background: sColor + "18", padding: "2px 9px", borderRadius: 20 }}>{activeTopic.level}</span>
                      <span style={{ fontSize: 11, color: T.light, fontFamily: "'DM Mono', monospace", transition: "color 0.25s" }}>{activeTopic.duration}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
                      <h1 style={{ fontSize: "clamp(1.35rem, 3vw, 1.9rem)", fontWeight: 600, color: T.ink, letterSpacing: "-0.025em", lineHeight: 1.2, transition: "color 0.25s" }}>{activeTopic.title}</h1>
                      <button
                        onClick={() => toggleComplete(activeTopic.id)}
                        style={{ flexShrink: 0, display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", border: `1px solid ${isDone ? T.success : T.rule}`, borderRadius: 6, background: isDone ? T.successBg : "none", color: isDone ? T.success : T.mid, fontSize: 12.5, fontWeight: 500, fontFamily: "inherit", transition: "all 0.2s" }}
                      >
                        {isDone ? "✓ Done" : "Mark done"}
                      </button>
                    </div>
                  </div>

                  {/* Project card */}
                  <div style={{ background: T.paper, border: `1px solid ${T.rule}`, borderRadius: 8, padding: "16px 20px", marginBottom: 28, display: "flex", gap: 14, transition: "background 0.25s, border-color 0.25s" }}>
                    <div style={{ fontSize: 18, flexShrink: 0, marginTop: 1 }}>🏗</div>
                    <div>
                      <div style={{ fontSize: 10.5, fontWeight: 600, color: T.light, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 4, transition: "color 0.25s" }}>Portfolio project</div>
                      <div style={{ fontSize: 14, fontWeight: 500, color: T.ink, marginBottom: 4, transition: "color 0.25s" }}>{activeTopic.project.title}</div>
                      <div style={{ fontSize: 13, color: T.mid, lineHeight: 1.55, transition: "color 0.25s" }}>{activeTopic.project.desc}</div>
                    </div>
                  </div>

                  {/* Tabs */}
                  <div style={{ display: "flex", borderBottom: `1px solid ${T.rule}`, marginBottom: 28, transition: "border-color 0.25s" }}>
                    {["content", "resources", "concepts"].map(tab => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        style={{ padding: "9px 18px", background: "none", border: "none", borderBottom: `2px solid ${activeTab === tab ? T.accent : "transparent"}`, color: activeTab === tab ? T.ink : T.light, fontSize: 13, fontWeight: activeTab === tab ? 500 : 400, marginBottom: -1, textTransform: "capitalize", letterSpacing: "0.01em", transition: "color 0.15s, border-color 0.15s" }}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>

                  {/* Content tab */}
                  {activeTab === "content" && <MarkdownContent content={activeTopic.content} />}

                  {/* Resources tab */}
                  {activeTab === "resources" && (
                    <div>
                      <p style={{ fontSize: 13, color: T.mid, marginBottom: 24, lineHeight: 1.6, transition: "color 0.25s" }}>Handpicked free resources — the best available for this topic, ranked by quality.</p>
                      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                        {activeTopic.resources.map((r, i) => {
                          const ytMatch = r.url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/);
                          const videoId = ytMatch ? ytMatch[1] : null;
                          const isYouTube = !!videoId;

                          if (isYouTube) {
                            return (
                              <div key={i}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10, flexWrap: "wrap", gap: 8 }}>
                                  <div>
                                    <div style={{ fontSize: 13.5, fontWeight: 500, color: T.ink, transition: "color 0.25s" }}>{r.name}</div>
                                    <div style={{ fontSize: 11.5, color: T.light, marginTop: 2, transition: "color 0.25s" }}>Video · Free · YouTube</div>
                                  </div>
                                  <a href={r.url} target="_blank" rel="noopener noreferrer"
                                    style={{ fontSize: 11.5, color: T.accent, display: "flex", alignItems: "center", gap: 4, textDecoration: "none", transition: "color 0.25s" }}>
                                    Open in YouTube
                                    <svg width="11" height="11" viewBox="0 0 16 16" fill="none"><path d="M3 13L13 3M13 3H7M13 3V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                  </a>
                                </div>
                                <div style={{ position: "relative", paddingBottom: "56.25%", borderRadius: 8, overflow: "hidden", background: "#000", border: `1px solid ${T.rule}` }}>
                                  <iframe
                                    src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
                                    title={r.name}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
                                  />
                                </div>
                              </div>
                            );
                          }

                          return (
                            <a
                              key={i}
                              href={r.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ display: "flex", alignItems: "center", gap: 14, padding: "13px 16px", border: `1px solid ${T.rule}`, borderRadius: 7, background: T.canvas, transition: "border-color 0.15s, background 0.15s", textDecoration: "none" }}
                              onMouseEnter={e => { e.currentTarget.style.borderColor = T.ink; e.currentTarget.style.background = T.paper; }}
                              onMouseLeave={e => { e.currentTarget.style.borderColor = T.rule; e.currentTarget.style.background = T.canvas; }}
                            >
                              <div style={{ width: 34, height: 34, background: T.paper, borderRadius: 6, border: `1px solid ${T.rule}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, flexShrink: 0, transition: "background 0.25s, border-color 0.25s" }}>
                                {r.type === "Interactive" ? "⌨" : r.type === "Book" ? "◻" : r.type === "Practice" ? "◈" : "⊕"}
                              </div>
                              <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ fontSize: 13.5, fontWeight: 500, color: T.ink, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", transition: "color 0.25s" }}>{r.name}</div>
                                <div style={{ fontSize: 11.5, color: T.light, marginTop: 2, transition: "color 0.25s" }}>{r.type} · Free</div>
                              </div>
                              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, color: T.light }}>
                                <path d="M3 13L13 3M13 3H7M13 3V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Concepts tab */}
                  {activeTab === "concepts" && (
                    <div>
                      <p style={{ fontSize: 13, color: T.mid, marginBottom: 20, lineHeight: 1.6, transition: "color 0.25s" }}>Core concepts in this topic — all covered in depth in the Content tab.</p>
                      <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
                        {activeTopic.concepts.map((c, i) => (
                          <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 0", borderBottom: `1px solid ${T.rule}`, transition: "border-color 0.25s" }}>
                            <span style={{ fontSize: 11, fontFamily: "'DM Mono', monospace", color: T.light, minWidth: 20, transition: "color 0.25s" }}>{String(i + 1).padStart(2, "0")}</span>
                            <span style={{ fontSize: 13.5, color: T.ink, transition: "color 0.25s" }}>{c}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Prev / Next */}
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: 52, paddingTop: 24, borderTop: `1px solid ${T.rule}`, gap: 12, transition: "border-color 0.25s" }}>
                    {prevTopic ? (
                      <button
                        onClick={() => openTopic(prevTopic)}
                        style={{ background: "none", border: `1px solid ${T.rule}`, borderRadius: 6, padding: "10px 16px", textAlign: "left", cursor: "pointer", fontFamily: "inherit", transition: "border-color 0.15s" }}
                        onMouseEnter={e => e.currentTarget.style.borderColor = T.ink}
                        onMouseLeave={e => e.currentTarget.style.borderColor = T.rule}
                      >
                        <div style={{ fontSize: 11, color: T.light, marginBottom: 2 }}>← Previous</div>
                        <div style={{ fontSize: 13, fontWeight: 500, color: T.ink }}>{prevTopic.title}</div>
                      </button>
                    ) : <div />}
                    {nextTopic && (
                        <button
                          onClick={() => openTopic(nextTopic)}
                          style={{
                            background: T.buttonBg,
                            color: T.buttonText,
                            border: "none",
                            borderRadius: 6,
                            padding: "10px 16px",
                            textAlign: "right",
                            cursor: "pointer",
                            fontFamily: "inherit",
                            transition: "opacity 0.15s ease",
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
                          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                        >
                          <div
                            style={{
                              fontSize: 11,
                              color: T.buttonSubtext,
                              marginBottom: 2,
                            }}
                          >
                            Next →
                          </div>

                          <div
                            style={{
                              fontSize: 13,
                              fontWeight: 500,
                              color: T.buttonText,
                            }}
                          >
                            {nextTopic.title}
                          </div>
                        </button>
                      )}
                  </div>
                </div>
              );
            })()}
          </main>
        </div>
      </div>
    </ThemeCtx.Provider>
  );
}