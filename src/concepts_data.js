export const CONCEPT_EXPLANATIONS = {

  // ── HTML & CSS ─────────────────────────────────────────────────────────────
  "html-css::Box model": `**Every HTML element is a rectangular box made of four layers: content, padding, border, and margin — from inside out.**

### Why It Matters
Every layout bug you'll ever face traces back to the box model. Google, Stripe, and every major UI team build their design systems on a solid understanding of it. Without box model mastery you'll fight margins and widths forever.

### How It Works
The default \`box-sizing: content-box\` means \`width\` only sets the content area — padding and border are added on top, breaking intuitive sizing. \`border-box\` fixes this so \`width\` includes everything except margin.

\`\`\`css
/* The one rule every project should start with */
*, *::before, *::after {
  box-sizing: border-box;
}

.card {
  width: 300px;       /* total width: exactly 300px */
  padding: 24px;      /* space inside the border */
  border: 1px solid #e5e7eb;
  margin: 16px;       /* space outside the border */
}

/* Margin collapse: two stacked elements with margin-bottom: 20px
   and margin-top: 16px collapse into ONE 20px gap, not 36px */
.section { margin-bottom: 20px; }
.next    { margin-top: 16px; } /* actual gap = 20px, not 36px */
\`\`\`

### Watch Out For
- Margins between siblings collapse into the larger of the two values — use padding or flexbox gap for predictable spacing
- \`outline\` is not part of the box model — it doesn't affect layout, making it perfect for focus rings
- \`display: inline\` elements ignore vertical padding/margin for layout — use \`inline-block\` or \`flex\` for full control`,

  "html-css::Flexbox & Grid": `**Flexbox is a one-dimensional layout system (row OR column); CSS Grid is two-dimensional (rows AND columns simultaneously).**

### Why It Matters
These two systems replaced virtually every float-based hack that made CSS layout painful for 20 years. Airbnb, Tailwind CSS, and Material UI are built entirely on flexbox and grid. Knowing when to reach for each is a core front-end skill.

### How It Works
Use flexbox for components (navbars, button groups, centering). Use grid for page-level layouts and anything needing both axes.

\`\`\`css
/* ── FLEXBOX ── */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

/* Perfect centering */
.center { display: flex; justify-content: center; align-items: center; }

/* ── CSS GRID ── */
/* Responsive card grid — no media queries needed */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}

/* Named areas for page layout */
.layout {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
  grid-template-columns: 240px 1fr;
}
.header  { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main    { grid-area: main; }
\`\`\`

### Watch Out For
- Flex children with \`flex: 1\` can shrink below content size — add \`min-width: 0\` to fix text overflow
- Grid \`gap\` only creates gaps between cells, not outer edges — use padding on the container for outer spacing
- \`align-items\` in flexbox aligns on the cross axis; in grid it aligns within the cell — they behave differently`,

  "html-css::Responsive design": `**Responsive design means building UIs that adapt to any screen size using fluid layouts, flexible units, and media queries.**

### Why It Matters
Over 60% of global web traffic is mobile. Google uses mobile-first indexing — a non-responsive site gets penalized in search rankings. Every modern company has responsive design as a baseline requirement.

### How It Works
Start with a mobile layout and progressively enhance for larger screens (mobile-first). Use relative units instead of fixed pixels.

\`\`\`css
/* Mobile-first: write base styles for mobile */
.card { padding: 16px; font-size: 1rem; }

/* Enhance for tablet */
@media (min-width: 768px) {
  .card { padding: 24px; }
}

/* Enhance for desktop */
@media (min-width: 1024px) {
  .card { padding: 32px; font-size: 1.125rem; }
}

/* Fluid typography — no breakpoints needed */
h1 { font-size: clamp(1.75rem, 4vw + 1rem, 3rem); }

/* Container query — component-level responsiveness */
@container (min-width: 400px) {
  .card { display: flex; gap: 16px; }
}
\`\`\`

### Watch Out For
- Never use \`px\` for font sizes — it ignores the user's browser font preference; use \`rem\` (1rem = user's base size, usually 16px)
- Don't hide content with \`display: none\` on mobile if it's important — screen readers still announce it and it harms SEO
- Touch targets must be at least 44×44px — test with real devices, not just browser resizing`,

  "html-css::CSS variables": `**CSS custom properties store reusable values in the cascade, scoped to any selector, and can be updated dynamically with JavaScript.**

### Why It Matters
Design systems at GitHub, Shopify (Polaris), and Adobe (Spectrum) are built entirely on CSS variables. Changing \`--color-primary\` in one place updates the entire UI. They also enable dark mode and theming that pure CSS preprocessors can't achieve.

### How It Works
\`\`\`css
:root {
  --color-bg: #ffffff;
  --color-text: #0d0d0d;
  --color-accent: #6366f1;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --radius: 8px;
  --shadow: 0 4px 12px rgba(0,0,0,0.08);
}

/* Dark mode — just re-declare the same variables */
[data-theme="dark"] {
  --color-bg: #111111;
  --color-text: #ededed;
}

/* Component uses semantic tokens, not raw values */
.card {
  background: var(--color-bg);
  color: var(--color-text);
  border-radius: var(--radius);
  padding: var(--space-md);
}

/* Update via JS for dynamic theming */
document.documentElement.style.setProperty('--color-accent', '#ec4899');
\`\`\`

### Watch Out For
- CSS variables are live at runtime; Sass/Less variables are compile-time only — CSS variables can respond to user actions and JS
- Variable names are case-sensitive: \`--Color\` and \`--color\` are two different variables
- IE11 does not support custom properties — but IE11 is effectively dead`,

  "html-css::Animations & transitions": `**CSS transitions smoothly interpolate between two property states; \`@keyframes\` animations define multi-step sequences that run autonomously.**

### Why It Matters
Stripe, Linear, and Vercel are famous for animations that feel native. The key: only animate GPU-composited properties (\`transform\`, \`opacity\`) to maintain 60fps.

### How It Works
\`\`\`css
/* TRANSITIONS — put on the element, not :hover */
.button {
  background: #6366f1;
  transform: translateY(0);
  transition: background 0.15s ease, transform 0.15s ease, box-shadow 0.15s ease;
}
.button:hover {
  background: #4f46e5;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(99,102,241,0.35);
}

/* KEYFRAMES */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}
.modal { animation: fadeIn 0.25s ease forwards; }

/* Staggered list items */
.list-item:nth-child(1) { animation-delay: 0ms; }
.list-item:nth-child(2) { animation-delay: 60ms; }

/* Respect reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
\`\`\`

### Watch Out For
- Only \`transform\` and \`opacity\` are GPU-accelerated — never animate \`width\`, \`height\`, \`top\`, or \`margin\` (they cause layout reflow and drop frames)
- Put \`transition\` on the base state, not \`:hover\` — otherwise the reverse transition won't animate
- Always add \`@media (prefers-reduced-motion)\` for users with vestibular disorders`,

  "html-css::Accessibility (a11y)": `**Accessibility means building products that people with disabilities — visual, motor, auditory, or cognitive — can fully use.**

### Why It Matters
15% of the world has some form of disability. In the US, the ADA requires digital accessibility for many businesses — lawsuits against inaccessible sites have cost companies millions. Apple, Google, and Airbnb employ dedicated accessibility engineers.

### How It Works
\`\`\`html
<!-- BAD: div soup -->
<div class="btn" onclick="submit()">Submit</div>

<!-- GOOD: semantic + keyboard accessible -->
<button type="submit">Submit</button>

<!-- Image alt text: describe the purpose -->
<img src="chart.png" alt="Q3 revenue increased 40% to $2.8M" />
<!-- Decorative images: empty alt -->
<img src="divider.svg" alt="" role="presentation" />

<!-- Form labels MUST be connected -->
<label for="email">Email address</label>
<input type="email" id="email" autocomplete="email" required />

<!-- ARIA only when HTML isn't enough -->
<button
  aria-expanded="false"
  aria-controls="menu"
  aria-label="Open navigation menu"
>☰</button>

<!-- Announce dynamic content to screen readers -->
<div role="status" aria-live="polite">Form saved successfully</div>
\`\`\`

### Watch Out For
- Color alone must never convey information — use icons or text alongside color for colorblind users
- Focus outline must never be removed without a visible replacement — \`outline: none\` without an alternative is an accessibility failure
- Keyboard focus order should follow visual reading order — DOM order matters more than CSS positioning`,

  "html-css::Semantic HTML5": `**Semantic HTML5 elements tell browsers and assistive technologies what role content plays, not just how it looks.**"

### Why It Matters
Screen readers, search engines, and browser reader modes all rely on semantic structure. Google weights content in \`<article>\` and \`<main>\` higher than random \`<div>\` blocks. The React and Vue teams explicitly recommend semantic HTML as the foundation for any component.

### How It Works
\`\`\`html
<header>
  <nav aria-label="Main navigation">
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/blog">Blog</a></li>
    </ul>
  </nav>
</header>

<main>           <!-- unique main content (only one per page!) -->
  <article>      <!-- self-contained: blog post, news article -->
    <header>
      <h1>Understanding CSS Grid</h1>
      <time datetime="2024-01-15">January 15, 2024</time>
    </header>

    <section>    <!-- thematic grouping within the article -->
      <h2>The Basics</h2>
      <p>Grid creates two-dimensional layouts…</p>
    </section>

    <aside>      <!-- tangentially related: author bio, ads -->
      <h3>About the Author</h3>
    </aside>
  </article>
</main>

<footer>
  <p><small>&copy; 2024 MyBlog</small></p>
</footer>
\`\`\`

### Watch Out For
- Use only one \`<h1>\` per page — heading levels must not skip (\`<h1>\` to \`<h3>\` confuses screen reader navigation)
- \`<section>\` should always have a heading; if you don't have one, use \`<div>\` instead
- \`<button>\` is for actions, \`<a>\` is for navigation — never use \`<a href="#">\` as a button`,

  // ── JavaScript ─────────────────────────────────────────────────────────────
  "javascript::ES6+": `**ES6+ (ES2015 and later) is a collection of modern JavaScript syntax that makes code more concise, expressive, and less error-prone.**

### Why It Matters
Every major codebase — React, Vue, Node.js, Stripe's clients — is written in ES6+. Babel and TypeScript compile it for older environments, so you always write modern syntax.

### How It Works
\`\`\`javascript
// Arrow functions — concise, inherit 'this' from outer scope
const add = (a, b) => a + b;
const greet = name => \`Hello, \${name}!\`;

// Destructuring
const { name, age = 0, city: location } = user;  // object: default + rename
const [first, , third, ...rest] = items;           // array: skip, rest

// Spread & rest
const merged = { ...defaults, ...overrides };
const allItems = [...list1, ...list2];
function log(...args) { console.log(...args); }

// Modules
export const PI = 3.14;
export default function calculate() {}
import calculate, { PI } from './math.js';

// Optional chaining & nullish coalescing (ES2020)
const city = user?.address?.city ?? 'Unknown';

// Logical assignment (ES2021)
user.name ??= 'Anonymous';   // assign only if null/undefined
count ||= 1;                  // assign only if falsy
\`\`\`

### Watch Out For
- Arrow functions don't have their own \`this\` — great for callbacks, wrong for object methods
- \`const\` doesn't make objects immutable — it prevents reassignment but properties can still change
- Template literals use backticks, not quotes — easy to mix up`,

  "javascript::Closures & scope": `**A closure is a function that retains access to variables from its outer (lexical) scope, even after that outer function has finished executing.**

### Why It Matters
Closures are the foundation of React Hooks, the module pattern, and memoization. When you call \`useState\`, React uses closures to remember your component's state between renders. Understanding closures separates JavaScript beginners from intermediate developers.

### How It Works
\`\`\`javascript
// Factory function — closure over private state
function createCounter(start = 0) {
  let count = start; // closed-over variable

  return {
    increment() { return ++count; },
    decrement() { return --count; },
    value()     { return count; },
  };
}

const counter = createCounter(10);
counter.increment(); // 11
counter.value();     // 11
// 'count' is private — unreachable from outside

// Real-world: memoization
function memoize(fn) {
  const cache = new Map(); // closed over by returned function

  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

// Common gotcha: closures in loops
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100); // logs 3, 3, 3 (var hoisting!)
}
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100); // logs 0, 1, 2 (let is block-scoped)
}
\`\`\`

### Watch Out For
- Using \`var\` in loops creates a single shared variable; \`let\` creates a new binding per iteration
- Closures holding references to large objects can cause memory leaks if the closure is long-lived
- Stale closures in React \`useEffect\` are a common bug — the effect captures state at render time, not the latest value`,

  "javascript::Promises & async/await": `**A Promise represents a value that will be available in the future; async/await is syntactic sugar over Promises that makes async code read like synchronous code.**

### Why It Matters
Every I/O operation in JavaScript is asynchronous. \`fetch\`, Node.js \`fs.promises\`, Prisma, and Axios all return Promises. Mastering async/await is required to work with any real-world data source.

### How It Works
\`\`\`javascript
// Basic fetch with error handling
async function getUser(id) {
  try {
    const response = await fetch(\`/api/users/\${id}\`);
    if (!response.ok) throw new Error(\`HTTP \${response.status}\`);
    return await response.json();
  } catch (error) {
    console.error('Failed to load user:', error);
    throw error;
  }
}

// Parallel requests — don't await in sequence if independent!
async function loadDashboard(userId) {
  // BAD: sequential — 600ms total
  const user  = await getUser(userId);
  const posts = await getPosts(userId);

  // GOOD: parallel — 300ms total
  const [user, posts, settings] = await Promise.all([
    getUser(userId),
    getPosts(userId),
    getSettings(userId),
  ]);
  return { user, posts, settings };
}

// Timeout pattern
const withTimeout = (promise, ms) =>
  Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Timeout')), ms)
    ),
  ]);
\`\`\`

### Watch Out For
- Forgetting \`await\` returns a Promise object, not the value — TypeScript catches this
- \`await\` in a regular \`forEach\` loop doesn't work — use \`for...of\` or \`Promise.all(array.map(...))\`
- \`try/catch\` only catches rejections if you \`await\` inside the try block`,

  "javascript::DOM manipulation": `**The DOM (Document Object Model) is a tree of objects representing your HTML that JavaScript can read and modify in real time.**

### Why It Matters
Every interaction in a web app goes through the DOM. Even React and Vue manipulate the DOM under the hood. Understanding DOM APIs makes you a better framework user.

### How It Works
\`\`\`javascript
// Querying
const btn    = document.querySelector('#submit-btn');
const inputs = document.querySelectorAll('input[required]');

// Reading & writing
btn.textContent = 'Loading…';    // safe — no HTML parsing
btn.setAttribute('disabled', '');
btn.removeAttribute('disabled');

// Class manipulation
el.classList.add('active');
el.classList.toggle('dark');
el.classList.contains('active'); // → true/false

// Creating and inserting elements
const card = document.createElement('div');
card.className = 'card';
card.textContent = 'New card';
document.querySelector('.grid').append(card);

// Event listeners
btn.addEventListener('click', handleClick);
btn.removeEventListener('click', handleClick); // clean up!

// Event delegation — one listener handles all children
document.querySelector('.list').addEventListener('click', (e) => {
  const item = e.target.closest('.list-item');
  if (item) handleItemClick(item.dataset.id);
});
\`\`\`

### Watch Out For
- Never use \`innerHTML\` with user-supplied content — XSS attack risk; use \`textContent\` instead
- Cache DOM queries — calling \`querySelector\` inside a loop re-queries every iteration
- Always remove event listeners on unmount — forgotten listeners cause memory leaks`,

  "javascript::Event loop": `**The event loop is JavaScript's mechanism for handling asynchronous operations in a single thread — by processing a queue of callbacks whenever the call stack is empty.**

### Why It Matters
The event loop explains why \`setTimeout(fn, 0)\` still runs after synchronous code, why Promises resolve before setTimeout callbacks, and why a CPU-blocking loop freezes the UI. This comes up in nearly every senior JavaScript interview.

### How It Works
\`\`\`javascript
// Execution order
console.log('1 — sync');
setTimeout(() => console.log('2 — macrotask'), 0);
Promise.resolve()
  .then(() => console.log('3 — microtask'))
  .then(() => console.log('4 — microtask 2'));
queueMicrotask(() => console.log('5 — microtask'));
console.log('6 — sync');
// Output: 1, 6, 3, 5, 4, 2
// Sync → microtasks (Promises, queueMicrotask) → macrotasks (setTimeout)

// Blocking the call stack freezes the UI
function blockingWork(ms) {
  const end = Date.now() + ms;
  while (Date.now() < end) {} // NEVER do this
}

// Non-blocking: break work into chunks
function nonBlockingWork(items, fn) {
  let i = 0;
  function processChunk() {
    const deadline = Date.now() + 5; // work for 5ms max
    while (i < items.length && Date.now() < deadline) {
      fn(items[i++]);
    }
    if (i < items.length) setTimeout(processChunk, 0); // yield
  }
  processChunk();
}
\`\`\`

### Watch Out For
- Microtasks (Promises) can starve the event loop — an infinite chain of \`.then()\` blocks macrotasks
- \`async/await\` doesn't make code truly parallel — CPU-heavy work still blocks the thread
- Use Web Workers for true parallelism with heavy computation`,

  "javascript::Prototypes": `**JavaScript's prototype system is an object-based inheritance model where every object has a \`[[Prototype]]\` link to another object, forming a chain for property lookup.**

### Why It Matters
ES6 classes are 100% syntactic sugar over prototypes. Understanding prototypes explains how \`instanceof\` works, why methods work on all arrays, and what React does under the hood with components.

### How It Works
\`\`\`javascript
// Class syntax (ES6) is sugar over prototypes
class Animal {
  constructor(name) {
    this.name = name;       // own property on instance
  }
  speak() {                 // lives on Animal.prototype
    return \`\${this.name} makes a sound.\`;
  }
}

class Dog extends Animal {  // Dog.prototype.__proto__ === Animal.prototype
  speak() {
    return \`\${this.name} barks.\`;
  }
}

const d = new Dog('Rex');
d.speak();                     // 'Rex barks.' — found on Dog.prototype
d.hasOwnProperty('name');      // true — own property
d.hasOwnProperty('speak');     // false — on the prototype

// The chain: d → Dog.prototype → Animal.prototype → Object.prototype → null
// That's why d.toString(), d.hasOwnProperty() work!

// Object.create() — object with specific prototype
const proto = { greet() { return \`Hi, I'm \${this.name}\`; } };
const obj = Object.create(proto);
obj.name = 'Alice';
obj.greet(); // 'Hi, I'm Alice'
\`\`\`

### Watch Out For
- Never extend \`Array.prototype\` or \`Object.prototype\` — it pollutes every array/object in the program
- \`instanceof\` can give false negatives for objects created in a different iframe context
- \`for...in\` iterates inherited properties too — use \`Object.keys()\` to avoid surprises`,

  "javascript::Array methods": `**JavaScript's built-in array methods enable functional, declarative data transformation without mutation.**

### Why It Matters
Real codebases transform data constantly. React rendering relies on \`.map()\` to turn data arrays into JSX. Fluency with array methods is assumed in every JavaScript interview.

### How It Works
\`\`\`javascript
const orders = [
  { id: 1, user: 'Alice', total: 120, status: 'paid' },
  { id: 2, user: 'Bob',   total: 45,  status: 'pending' },
  { id: 3, user: 'Carol', total: 200, status: 'paid' },
];

// map — transform each element
const totals = orders.map(o => o.total); // [120, 45, 200]

// filter — keep elements matching a condition
const paid = orders.filter(o => o.status === 'paid');

// reduce — fold into a single value
const revenue = orders
  .filter(o => o.status === 'paid')
  .reduce((sum, o) => sum + o.total, 0); // 320

// find / findIndex — first match
const aliceFirst = orders.find(o => o.user === 'Alice');

// some / every — boolean checks
const hasUnpaid = orders.some(o => o.status === 'pending');  // true
const allPaid   = orders.every(o => o.status === 'paid');    // false

// flat / flatMap
const tags = [['js', 'ts'], ['react', 'next']];
tags.flat(); // ['js', 'ts', 'react', 'next']

// sort — MUTATES, use spread first
const sorted = [...orders].sort((a, b) => b.total - a.total);
\`\`\`

### Watch Out For
- \`sort()\` mutates the original array — spread first: \`[...arr].sort()\`
- \`reduce()\` without an initial value crashes on empty arrays — always provide the second argument
- \`.forEach()\` returns \`undefined\` — use \`.map()\` if you need a new array`,

  // ── React ──────────────────────────────────────────────────────────────────
  "react::JSX": `**JSX is a syntax extension for JavaScript that looks like HTML but compiles to \`React.createElement()\` calls.**

### Why It Matters
JSX is the core authoring syntax for React, used by Meta, Airbnb, Netflix, and Vercel. Every React component uses JSX. Understanding what it compiles to helps debug render issues.

### How It Works
\`\`\`jsx
function UserCard({ user, onSelect }) {
  const isAdmin = user.role === 'admin';

  return (
    <div className={\`card \${isAdmin ? 'card--admin' : ''}\`}>
      <img src={user.avatar} alt={user.name} />
      <h2>{user.name}</h2>
      {/* Conditional rendering */}
      {isAdmin && <span className="badge">Admin</span>}
      {user.bio ? <p>{user.bio}</p> : <p>No bio provided.</p>}

      {/* Lists must have a stable key */}
      <ul>
        {user.skills.map(skill => (
          <li key={skill.id}>{skill.name}</li>
        ))}
      </ul>

      <button onClick={() => onSelect(user.id)}>Select</button>
    </div>
  );
}
// Compiles to: React.createElement('div', {className:'card'}, ...)
\`\`\`

### Watch Out For
- JSX requires a single root element — wrap siblings in \`<></>\` Fragment to avoid unnecessary DOM nodes
- Use \`className\` not \`class\`, and \`htmlFor\` not \`for\` — JSX is JavaScript, not HTML
- Keys in lists must be stable and unique — using array index as key causes bugs when the list reorders`,

  "react::Hooks (useState, useEffect, useContext, useReducer, useMemo)": `**React Hooks let functional components use state, lifecycle, and context — they replaced class components and are the core API of modern React.**

### Why It Matters
All of React's ecosystem (React Query, Zustand, React Router) is built with hooks. Facebook rewrote React's internals around hooks because they enable sharing stateful logic in a way class components never could.

### How It Works
\`\`\`javascript
// useState — local state
const [count, setCount] = useState(0);
setCount(prev => prev + 1); // updater function when new state depends on old

// useEffect — sync with external systems
useEffect(() => {
  const controller = new AbortController();
  fetch(\`/api/users/\${id}\`, { signal: controller.signal })
    .then(r => r.json()).then(setUser);
  return () => controller.abort(); // cleanup
}, [id]); // re-run when id changes

// useContext — consume context without prop drilling
const { user, signOut } = useContext(AuthContext);

// useReducer — complex state logic
const [state, dispatch] = useReducer(reducer, { status: 'idle', data: null });
dispatch({ type: 'FETCH_SUCCESS', payload: data });

// useMemo — cache expensive computation
const sortedItems = useMemo(
  () => [...items].sort((a, b) => a.price - b.price),
  [items]
);

// useCallback — stable function reference
const handleSubmit = useCallback(async (values) => {
  await saveUser(values);
}, [saveUser]);
\`\`\`

### Watch Out For
- An empty dependency array \`[]\` means "run once on mount" — if you use state/props inside the effect, add them as dependencies
- \`useMemo\` and \`useCallback\` are optimizations, not guarantees — profile before reaching for them
- React 18 batches multiple \`setState\` calls in the same event handler — they don't each trigger a re-render`,

  "react::Component composition": `**Component composition is building complex UIs by combining smaller components through props, children, and slots — rather than inheritance.**

### Why It Matters
Composition is React's primary code reuse mechanism. Libraries like Radix UI, Headless UI, and shadcn/ui are entirely built around it. React's own docs explicitly favor composition over inheritance.

### How It Works
\`\`\`jsx
// 1. children prop — most common pattern
function Card({ children, className = '' }) {
  return <div className={\`card \${className}\`}>{children}</div>;
}

<Card className="featured">
  <h2>Hello</h2>
  <p>Any content here</p>
</Card>

// 2. Named slots via explicit props
function Modal({ title, footer, children }) {
  return (
    <div className="modal">
      <header>{title}</header>
      <main>{children}</main>
      <footer>{footer}</footer>
    </div>
  );
}

<Modal
  title={<h2>Confirm Delete</h2>}
  footer={<><CancelButton /> <DeleteButton /></>}
>
  <p>Are you sure?</p>
</Modal>

// 3. Render props — pass a function returning JSX
function DataList({ items, renderItem }) {
  return <ul>{items.map((item, i) => renderItem(item, i))}</ul>;
}
<DataList items={users} renderItem={(user) => <li key={user.id}>{user.name}</li>} />
\`\`\`

### Watch Out For
- Don't reach for inheritance — if you're extending a component class, use composition (wrap it, don't extend it)
- Prop drilling through many layers is a sign you need context or composition, not more props
- Deeply nested \`children\` can make data flow hard to trace — keep trees reasonably flat`,

  "react::State management": `**State management is how you store, share, and update data in a React app — from local component state to global application state.**

### Why It Matters
As apps grow, state shared between many components (auth, cart, theme) needs to live somewhere accessible without passing props through every level. Choosing the right tool for the scope is a key engineering decision.

### How It Works
\`\`\`javascript
// 1. Local state — for component-only data
const [isOpen, setIsOpen] = useState(false);

// 2. Context — for app-wide data (theme, auth, locale)
const AuthContext = createContext(null);
function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const signIn = async (creds) => { setUser(await login(creds)); };
  return <AuthContext.Provider value={{ user, signIn }}>{children}</AuthContext.Provider>;
}

// 3. Zustand — for complex shared state (no boilerplate)
import { create } from 'zustand';
const useCartStore = create((set) => ({
  items: [],
  addItem: (item) => set(state => ({ items: [...state.items, item] })),
  removeItem: (id) => set(state => ({ items: state.items.filter(i => i.id !== id) })),
}));
const { items, addItem } = useCartStore(); // anywhere in the app

// 4. React Query — for server/async state
const { data: user, isLoading } = useQuery({
  queryKey: ['user', userId],
  queryFn: () => fetch(\`/api/users/\${userId}\`).then(r => r.json()),
  staleTime: 60_000,
});
\`\`\`

### Watch Out For
- Don't put server data (API responses) in Redux or Zustand — use React Query or SWR which handle caching and refetching
- Context re-renders all consumers on value change — split large contexts into focused ones
- Derived state should not be stored — compute it inline or with \`useMemo\``,

  "react::Custom hooks": `**Custom hooks are functions starting with \`use\` that extract and reuse stateful logic between components.**

### Why It Matters
React Query's \`useQuery\`, React Router's \`useNavigate\`, and React Hook Form's \`useForm\` are all custom hooks. They're the primary pattern for sharing logic without changing the component tree.

### How It Works
\`\`\`javascript
// useLocalStorage — persists state to localStorage
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialValue;
    } catch { return initialValue; }
  });
  const setAndStore = useCallback((newValue) => {
    const toStore = newValue instanceof Function ? newValue(value) : newValue;
    setValue(toStore);
    localStorage.setItem(key, JSON.stringify(toStore));
  }, [key, value]);
  return [value, setAndStore];
}

// useFetch — data fetching with loading/error states
function useFetch(url) {
  const [state, setState] = useState({ data: null, loading: true, error: null });
  useEffect(() => {
    let cancelled = false;
    fetch(url).then(r => r.json())
      .then(data => { if (!cancelled) setState({ data, loading: false, error: null }); })
      .catch(error => { if (!cancelled) setState({ data: null, loading: false, error }); });
    return () => { cancelled = true; };
  }, [url]);
  return state;
}

// useDebounce — delay state updates (for search inputs)
function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}
\`\`\`

### Watch Out For
- Custom hooks must start with \`use\` — this tells React's ESLint plugin to enforce hook rules inside them
- Only create a hook when you genuinely share logic between at least two components — don't over-abstract
- Custom hooks don't share state between instances — each component gets its own independent state`,

  "react::Performance optimization": `**React performance optimization prevents unnecessary re-renders and expensive computations using memoization, lazy loading, and code splitting.**

### Why It Matters
Unoptimized React apps with large lists or heavy computation cause visible jank. The rule: profile first with React DevTools, then optimize.

### How It Works
\`\`\`javascript
// React.memo — skip re-render if props didn't change
const ExpensiveList = React.memo(function ExpensiveList({ items, onSelect }) {
  return (
    <ul>
      {items.map(item => <li key={item.id} onClick={() => onSelect(item)}>{item.name}</li>)}
    </ul>
  );
});

const Parent = ({ items, filter }) => {
  // useMemo — cache expensive computation
  const filtered = useMemo(
    () => items.filter(i => i.category === filter).sort((a, b) => a.price - b.price),
    [items, filter]
  );

  // useCallback — stable function reference so memoized child doesn't re-render
  const handleSelect = useCallback((id) => setSelectedId(id), []);

  return <ExpensiveList items={filtered} onSelect={handleSelect} />;
};

// Code splitting — lazy load heavy components
import { lazy, Suspense } from 'react';
const HeavyChart = lazy(() => import('./HeavyChart'));

function Dashboard() {
  return (
    <Suspense fallback={<Spinner />}>
      <HeavyChart data={data} />
    </Suspense>
  );
}
\`\`\`

### Watch Out For
- \`useMemo\` and \`useCallback\` have a cost — use them only when you've profiled and confirmed a real problem
- \`React.memo\` does shallow comparison — objects created inline (\`<Comp data={{}}/>\`) still cause re-renders
- The \`key\` prop on list items is the most impactful performance feature — a wrong key causes React to rebuild the entire list`,

  "react::Error boundaries": `**Error boundaries are React components that catch JavaScript errors in their child component tree and display a fallback UI instead of crashing the entire app.**

### Why It Matters
Without error boundaries, a JavaScript error in any component unmounts the entire React tree — the user sees a blank page. Every production React app uses error boundaries to contain failures.

### How It Works
\`\`\`jsx
import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert" className="error-state">
      <h2>Something went wrong</h2>
      <pre style={{ color: 'red' }}>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

// Wrap any component tree
function App() {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error, info) => logErrorToSentry(error, info)}
    >
      <Dashboard />
    </ErrorBoundary>
  );
}

// Granular boundaries — contain failures to specific sections
function Dashboard() {
  return (
    <div>
      <ErrorBoundary FallbackComponent={WidgetError}>
        <RevenueChart />  {/* error here doesn't affect the rest */}
      </ErrorBoundary>
      <ErrorBoundary FallbackComponent={WidgetError}>
        <UserTable />
      </ErrorBoundary>
    </div>
  );
}

// Trigger manually for async errors
function BrokenComponent() {
  const { showBoundary } = useErrorBoundary();
  useEffect(() => {
    fetchData().catch(showBoundary);
  }, []);
}
\`\`\`

### Watch Out For
- Error boundaries don't catch errors in event handlers — use try/catch there
- Error boundaries don't work with async \`useEffect\` code — call \`showBoundary\` manually
- Place boundaries strategically — one global boundary is a safety net; granular boundaries give a better UX`,

  // ── TypeScript ─────────────────────────────────────────────────────────────
  "typescript::Types vs Interfaces": `**Both describe object shapes; interfaces are for objects and classes with declaration merging, types are for unions, primitives, and computed shapes.**

### Why It Matters
TypeScript is mandatory at Google, Microsoft, and Stripe. The TypeScript team's recommendation: prefer \`interface\` for public API shapes, \`type\` for everything else.

### How It Works
\`\`\`typescript
// INTERFACE — extendable, mergeable
interface User {
  id: string;
  name: string;
  email: string;
}
interface AdminUser extends User {
  permissions: string[];
}
// Declaration merging (augment libraries)
interface Window {
  analytics: Analytics;
}

// TYPE ALIAS — required for unions, intersections, primitives
type Status = 'idle' | 'loading' | 'success' | 'error'; // must use type
type ID = string | number;
type AdminWithAudit = AdminUser & { auditLog: string[] };

// Conditional types (only possible with type)
type NonNullable<T> = T extends null | undefined ? never : T;

// Mapped types
type Readonly<T> = { readonly [K in keyof T]: T[K] };
\`\`\`

### Watch Out For
- Interfaces can be accidentally merged across files — declaring the same interface twice merges them
- \`type\` aliases cannot be re-opened/extended after definition like interfaces can
- Both produce identical JavaScript output — the difference is purely at the type-checking level`,

  "typescript::Generics": `**Generics are type parameters that make functions, classes, and interfaces work with multiple types while preserving type information.**

### Why It Matters
\`Array<T>\`, \`Promise<T>\`, React's \`useState<T>\`, and Prisma's \`findUnique()\` all use generics. Without them, you'd need a separate function for every type or lose type safety with \`any\`.

### How It Works
\`\`\`typescript
// Basic generic function
function getFirst<T>(arr: T[]): T | undefined {
  return arr[0];
}
getFirst([1, 2, 3]);   // TypeScript infers T = number
getFirst(['a', 'b']);   // T = string

// Generic with constraints
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
const name = getProperty({ name: 'Alice', age: 30 }, 'name'); // string
// getProperty(user, 'nonexistent'); // TypeScript error!

// ApiResponse pattern used everywhere
interface ApiResponse<TData> {
  data: TData;
  error: string | null;
  status: number;
}

async function fetchUser(id: string): Promise<ApiResponse<User>> {
  const res = await fetch(\`/api/users/\${id}\`);
  return { data: await res.json(), error: null, status: res.status };
}

// Generic React component
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  keyExtractor: (item: T) => string;
}
function List<T>({ items, renderItem, keyExtractor }: ListProps<T>) {
  return <ul>{items.map(item => <li key={keyExtractor(item)}>{renderItem(item)}</li>)}</ul>;
}
\`\`\`

### Watch Out For
- Avoid \`<T extends any>\` — it defeats the purpose of generics
- Sometimes TypeScript can't infer the generic and you need explicit type arguments: \`getFirst<User>([])\`
- Too many generic parameters (\`<T, U, V, W>\`) makes code unreadable — consider splitting functions`,

  "typescript::Union & intersection types": `**Union types (\`A | B\`) mean a value can be one of several types; intersection types (\`A & B\`) mean a value must satisfy all types simultaneously.**

### Why It Matters
Discriminated unions eliminate entire classes of null-reference bugs. Redux's action types, React's event system, and Prisma's error types all use discriminated unions.

### How It Works
\`\`\`typescript
// DISCRIMINATED UNION — TypeScript narrows the type in branches
type Result<T> =
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error }
  | { status: 'loading' };

function handleResult(result: Result<User>) {
  if (result.status === 'success') {
    console.log(result.data.name); // TypeScript knows 'data' exists
  } else if (result.status === 'error') {
    console.error(result.error.message); // TypeScript knows 'error' exists
  }
}

// INTERSECTION — value must be ALL of these
type Employee = Person & {
  employeeId: string;
  department: string;
};

type AuditedEntity = { createdAt: Date; updatedAt: Date; createdBy: string; };
type Post = BasePost & AuditedEntity & { published: boolean };

// Union with primitives
type ID = string | number;
type Nullable<T> = T | null;
type Maybe<T> = T | null | undefined;
\`\`\`

### Watch Out For
- Intersection of incompatible primitives creates \`never\`: \`string & number\` is impossible
- Large unions can slow down the TypeScript compiler — use discriminated unions or interface hierarchies
- \`A | B\` means "A OR B", not both at the same time — don't confuse with English "and"`,

  "typescript::Type guards": `**Type guards are runtime checks that narrow a variable's TypeScript type from a wider type to a more specific one within a code block.**

### Why It Matters
Type narrowing makes it possible to write safe code without casting (\`as\`). The React codebase and Redux Toolkit rely heavily on type guards to avoid runtime errors at the type-check phase.

### How It Works
\`\`\`typescript
// typeof narrowing — for primitives
function format(value: string | number) {
  if (typeof value === 'string') return value.toUpperCase();
  return value.toFixed(2);
}

// instanceof narrowing — for class instances
function handleError(error: unknown) {
  if (error instanceof Error) console.error(error.message);
  else if (typeof error === 'string') console.error(error);
  else console.error('Unknown error:', error);
}

// in narrowing — for discriminated unions
type Cat = { meow: () => void };
type Dog = { bark: () => void };
function makeSound(animal: Cat | Dog) {
  if ('meow' in animal) animal.meow(); // TypeScript knows: Cat
  else animal.bark();                   // TypeScript knows: Dog
}

// Custom type predicate — reusable guard function
function isUser(value: unknown): value is User {
  return (
    typeof value === 'object' && value !== null &&
    'id' in value && typeof (value as User).id === 'string'
  );
}

const data: unknown = await fetch('/api/user').then(r => r.json());
if (isUser(data)) {
  console.log(data.email); // TypeScript knows: User
}
\`\`\`

### Watch Out For
- \`as SomeType\` (type assertions) bypass type guards — they tell TypeScript "trust me" and remove its safety net
- Custom type predicates (\`value is T\`) are only as safe as their implementation — a wrong predicate causes runtime errors TypeScript won't catch
- \`typeof null\` returns \`'object'\` — always check \`value !== null\` before checking object properties`,

  "typescript::Utility types": `**TypeScript's built-in utility types transform existing types into new ones — making types as reusable and composable as functions.**

### Why It Matters
React uses \`Partial<>\`, \`Required<>\`, and \`Pick<>\` internally. Prisma generates types using \`Omit<>\`. Mastering utility types means you almost never write redundant type definitions.

### How It Works
\`\`\`typescript
interface User {
  id: string; name: string; email: string;
  role: 'admin' | 'user'; password: string; createdAt: Date;
}

type UpdateUserDto = Partial<Omit<User, 'id' | 'createdAt'>>;
// → { name?: string; email?: string; role?: ... }

type PublicUser = Omit<User, 'password'>;  // never expose passwords!
type UserPreview = Pick<User, 'id' | 'name' | 'role'>;
type UserMap = Record<string, User>;        // { [userId: string]: User }

// Function types
type ApiResponse = ReturnType<typeof fetchUser>;    // → Promise<User>
type FetchParams = Parameters<typeof fetch>;         // [url, options?]

// Extract & Exclude — filter union types
type StringOrNumber = string | number | boolean;
type OnlyStrNum = Extract<StringOrNumber, string | number>; // string | number
type NoBoolean  = Exclude<StringOrNumber, boolean>;          // string | number
\`\`\`

### Watch Out For
- \`Partial<T>\` makes ALL fields optional including IDs that should always be present — combine with \`Required<Pick<T, 'id'>>\`
- Utility types create new types at compile time — zero runtime overhead
- Don't nest more than 2-3 utility types — \`Partial<Omit<Required<Pick<T, K>>, L>>\` becomes unreadable`,

  "typescript::Declaration files": `**Declaration files (\`.d.ts\`) describe the types of JavaScript code for TypeScript without containing any implementation.**

### Why It Matters
Every npm package needs type declarations. \`@types/node\`, \`@types/react\`, and \`@types/lodash\` are all declaration files. Understanding them lets you write types for untyped packages and extend existing library types.

### How It Works
\`\`\`typescript
// my-library.d.ts — declaring a module's public API
declare module 'my-utility-lib' {
  export interface Config { timeout: number; retries: number; }
  export function request<T>(url: string, config?: Partial<Config>): Promise<T>;
}

// Augment an existing module (declaration merging)
declare module 'express' {
  interface Request {
    user?: { id: string; role: string }; // added by auth middleware
  }
}

// Ambient declarations — for CDN global variables
declare const __DEV__: boolean;
declare const __VERSION__: string;

// Non-JS file imports (webpack/vite plugins)
declare module '*.svg' {
  const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}

declare module '*.png' {
  const src: string;
  export default src;
}
\`\`\`

### Watch Out For
- \`.d.ts\` files must not have top-level \`import\`/\`export\` unless they're a module — otherwise they're treated as global declarations
- When a library ships its own \`.d.ts\` files, don't also install the \`@types\` version — they can conflict
- Prefer \`@types/package-name\` over writing your own for popular packages`,

  "typescript::tsconfig": `**\`tsconfig.json\` controls which files TypeScript compiles, how strict the type checking is, and what JavaScript gets emitted.**

### Why It Matters
A poorly configured \`tsconfig\` silently allows bugs TypeScript was designed to prevent. Next.js, Prisma, and NestJS all ship with strict base configs. Understanding key options lets you customize without creating security holes.

### How It Works
\`\`\`json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "lib": ["ES2022", "DOM"],
    "outDir": "./dist",

    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,

    "moduleResolution": "Bundler",
    "paths": { "@/*": ["./src/*"] },
    "baseUrl": ".",

    "jsx": "react-jsx",

    "skipLibCheck": true,
    "resolveJsonModule": true,
    "esModuleInterop": true,
    "sourceMap": true
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
\`\`\`

### Watch Out For
- Never turn off \`strict\` to silence errors — it disables \`strictNullChecks\`, TypeScript's most valuable feature
- \`skipLibCheck: true\` is safe for apps but masks type errors in library code you own
- Path aliases in \`tsconfig\` must also be configured in your bundler — TypeScript won't do the runtime remapping`,

  // ── Next.js ────────────────────────────────────────────────────────────────
  "nextjs::App Router": `**The Next.js App Router is a file-system-based routing system in \`/app\` that supports nested layouts, server components, streaming, and React Suspense natively.**

### Why It Matters
Vercel introduced the App Router in Next.js 13 and it's now the default for all new projects. Every Next.js tutorial and Vercel template now uses App Router.

### How It Works
\`\`\`text
app/
├── layout.tsx           ← Root layout (wraps ALL pages)
├── page.tsx             ← Homepage: /
├── loading.tsx          ← Suspense boundary while page loads
├── error.tsx            ← Error boundary for this segment
├── not-found.tsx        ← 404 handler
├── dashboard/
│   ├── layout.tsx       ← Dashboard layout (persists across routes)
│   └── page.tsx         ← Route: /dashboard
├── blog/
│   ├── page.tsx         ← Route: /blog
│   └── [slug]/
│       └── page.tsx     ← Route: /blog/my-post-slug
└── api/
    └── users/
        └── route.ts     ← API endpoint: /api/users
\`\`\`

\`\`\`tsx
// app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body><Nav /><main>{children}</main></body></html>;
}

// app/dashboard/page.tsx — server component (default)
export default async function DashboardPage() {
  const stats = await db.getStats(); // direct DB access!
  return <StatsGrid data={stats} />;
}

// SEO metadata
export async function generateMetadata({ params }) {
  const post = await getPost(params.slug);
  return { title: post.title, description: post.excerpt };
}
\`\`\`

### Watch Out For
- Layouts are not re-rendered on navigation — state in a layout persists between child routes
- \`params\` and \`searchParams\` are passed as props in server components, not via hooks
- \`loading.tsx\` wraps the page in a Suspense boundary automatically`,

  "nextjs::Server vs Client components": `**Server Components run only on the server and can access databases directly; Client Components (\`'use client'\`) run in the browser and can use hooks and event handlers.**

### Why It Matters
Facebook invented Server Components to solve the tension between rich interactivity (needs JS in browser) and performance (less JS = faster). Getting the boundary right eliminates entire categories of data fetching complexity.

### How It Works
\`\`\`tsx
// SERVER COMPONENT (default) — runs on server only
// ✅ Can: async/await, access DB, import server-only libraries
// ❌ Cannot: useState, useEffect, onClick, browser APIs
export default async function UsersPage() {
  const users = await prisma.user.findMany({ orderBy: { createdAt: 'desc' } });
  return (
    <div>
      <h1>Users</h1>
      <UserTable users={users} />  {/* server component */}
      <AddUserButton />             {/* client component */}
    </div>
  );
}

// CLIENT COMPONENT
// ✅ Can: hooks, event handlers, browser APIs
// ❌ Cannot: async at component level, access DB
'use client';
import { useState } from 'react';

export function AddUserButton() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(true)}>Add User</button>
      {open && <AddUserModal onClose={() => setOpen(false)} />}
    </>
  );
}
// PATTERN: push 'use client' as far DOWN the tree as possible
\`\`\`

### Watch Out For
- You cannot import a Server Component inside a Client Component — pass server data as props instead
- \`'use client'\` marks a boundary — all imports within that file also become client code
- Putting \`'use client'\` on layout files turns the entire subtree into client components`,

  "nextjs::Server Actions": `**Server Actions are async functions that run on the server but can be called from client-side code — enabling mutations without building API routes.**

### Why It Matters
Vercel's templates and shadcn/ui form examples all use Server Actions as the primary mutation pattern. They support progressive enhancement — forms work even without JavaScript.

### How It Works
\`\`\`typescript
// app/actions.ts
'use server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createPost(formData: FormData) {
  const title = formData.get('title') as string;
  if (!title || title.length < 3) {
    return { error: 'Title must be at least 3 characters' };
  }

  const post = await prisma.post.create({
    data: { title, userId: await getCurrentUserId() }
  });

  revalidatePath('/posts');      // invalidate cached pages
  redirect(\`/posts/\${post.id}\`);
}

// app/posts/new/page.tsx
'use client';
import { createPost } from '../actions';

export function NewPostForm() {
  const [state, formAction] = useActionState(createPost, null);
  return (
    <form action={formAction}>
      <input name="title" placeholder="Post title" required />
      {state?.error && <p className="error">{state.error}</p>}
      <button type="submit">Publish</button>
    </form>
  );
}
\`\`\`

### Watch Out For
- Validate and sanitize ALL input in Server Actions — they're public endpoints and must treat user input as untrusted
- \`revalidatePath\` / \`revalidateTag\` makes cached pages update after a mutation — forgetting it causes stale data
- Server Actions only run on form submission by default — not during rendering`,

  "nextjs::Data fetching strategies": `**Next.js offers four data fetching strategies — static, ISR, dynamic, and client-side — each with different performance and freshness tradeoffs.**

### Why It Matters
Shopify uses static + ISR for product pages. Vercel's dashboard uses dynamic + client-side. Choosing the wrong strategy is one of the most impactful architectural decisions in a Next.js app.

### How It Works
\`\`\`typescript
// 1. STATIC (SSG) — generated at build time, served from CDN
export default async function BlogPost({ params }) {
  const post = await getPost(params.slug);
  return <Article post={post} />;
}
// No revalidation = never re-fetches → ultra-fast, but stale

// 2. ISR — regenerate every N seconds
export const revalidate = 60; // seconds

// 3. DYNAMIC (SSR) — fetch on every request
export const dynamic = 'force-dynamic';

// 4. Fine-grained fetch cache control
export default async function Page() {
  // Cached for 1 hour
  const config = await fetch('/api/config', { next: { revalidate: 3600 } });

  // Never cached
  const userData = await fetch('/api/me', { cache: 'no-store' });

  // Tagged for on-demand revalidation
  const products = await fetch('/api/products', { next: { tags: ['products'] } });

  return <Dashboard config={config} user={userData} />;
}

// On-demand revalidation (after a Shopify webhook)
import { revalidateTag } from 'next/cache';
export async function POST() {
  await revalidateTag('products');
  return Response.json({ revalidated: true });
}
\`\`\`

### Watch Out For
- Direct Prisma/DB calls are never cached automatically — use \`unstable_cache\` to cache them
- ISR uses stale-while-revalidate — it revalidates on a request AFTER the period expires, not on a timer
- Client-side data fetching still has its place for user-specific data that shouldn't be in server-rendered HTML`,

  "nextjs::Route handlers": `**Route handlers are server-side API endpoints defined in \`route.ts\` files that use the Web Fetch API standards.**

### Why It Matters
Route handlers are how you build REST APIs, webhooks, and third-party integrations in Next.js. Stripe webhooks, GitHub OAuth callbacks, and JSON API endpoints all live here.

### How It Works
\`\`\`typescript
// app/api/users/route.ts
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = Number(searchParams.get('limit') ?? 10);
  const users = await prisma.user.findMany({
    take: limit,
    select: { id: true, name: true, email: true },
  });
  return Response.json(users);
}

export async function POST(request: Request) {
  const body = await request.json();
  if (!body.email || !body.name) {
    return Response.json({ error: 'email and name are required' }, { status: 400 });
  }
  const user = await prisma.user.create({ data: body });
  return Response.json(user, { status: 201 });
}

// Dynamic segment: app/api/users/[id]/route.ts
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const user = await prisma.user.findUnique({ where: { id: params.id } });
  if (!user) return Response.json({ error: 'Not found' }, { status: 404 });
  return Response.json(user);
}
\`\`\`

### Watch Out For
- Route handlers at \`app/api/users/route.ts\` conflict with pages at \`app/api/users/page.tsx\` — you can't have both
- \`request.body\` is a stream that can only be read once — choose \`json()\`, \`text()\`, or \`formData()\` once per request
- CORS is not handled automatically — set \`Access-Control-Allow-Origin\` headers manually or use middleware`,

  "nextjs::Middleware": `**Next.js Middleware runs before every matched request on the Edge runtime — used for auth checks, redirects, A/B testing, and request rewriting.**

### Why It Matters
Middleware runs at the CDN edge in under 1ms, before any page load. Auth libraries like NextAuth, Clerk, and Auth.js all require middleware for session checks.

### How It Works
\`\`\`typescript
// middleware.ts (at project root)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value;
  const { pathname } = request.nextUrl;

  const protectedPaths = ['/dashboard', '/settings', '/admin'];
  const isProtected = protectedPaths.some(p => pathname.startsWith(p));

  if (isProtected && !token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Add security headers
  const response = NextResponse.next();
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  return response;
}

// Only run on these paths
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
\`\`\`

### Watch Out For
- Middleware runs on the Edge runtime — no Node.js APIs (\`fs\`, \`crypto\`, most npm packages)
- Don't do heavy database queries in middleware — it runs on every request and must be milliseconds
- Always add a \`matcher\` — without it, middleware runs on every request including static assets`,

  "nextjs::Image & font optimization": `**\`next/image\` and \`next/font\` automatically optimize images and fonts, serving the right size, format, and loading strategy without any configuration.**

### Why It Matters
Images and fonts are the two biggest contributors to poor Core Web Vitals (LCP and CLS), which directly affect Google search ranking. Vercel reports 10-60% LCP improvements simply by switching from \`<img>\` to \`<Image>\`.

### How It Works
\`\`\`tsx
import Image from 'next/image';
import { Inter } from 'next/font/google';

// Fonts — zero layout shift, no external network request at runtime
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

// Images
export function HeroSection() {
  return (
    // priority: preloads the LCP image (above-the-fold only!)
    <Image src="/hero.jpg" alt="Hero image" width={1200} height={600} priority />
  );
}

// Remote images — configure in next.config.js
// images: { remotePatterns: [{ hostname: 'images.unsplash.com' }] }

// Fill mode — image fills its parent container
<div style={{ position: 'relative', height: '400px' }}>
  <Image
    src={user.avatar}
    alt={user.name}
    fill
    sizes="(max-width: 768px) 100vw, 50vw"
    style={{ objectFit: 'cover' }}
  />
</div>
\`\`\`

### Watch Out For
- Always set \`priority\` on the LCP (largest above-the-fold) image — without it, the browser discovers and loads it too late
- Provide accurate \`sizes\` for fill-mode images — an incorrect value causes downloading a much larger image than needed
- Local fonts loaded with \`next/font/local\` are always zero-network — prefer them over Google Fonts for full control`,

  // ── Node.js ────────────────────────────────────────────────────────────────
  "nodejs::Event-driven architecture": `**Event-driven architecture is a pattern where components communicate by emitting and listening to events — Node.js is built on this model.**

### Why It Matters
Node.js's entire I/O model is event-driven, enabling thousands of concurrent connections in a single thread. LinkedIn, PayPal, and Netflix chose Node.js specifically for its event-driven, non-blocking model.

### How It Works
\`\`\`typescript
import { EventEmitter } from 'events';

class OrderService extends EventEmitter {
  async createOrder(data: OrderData) {
    const order = await db.order.create({ data });
    this.emit('order:created', order);
    if (order.total > 1000) this.emit('order:high-value', order);
    return order;
  }
}

const orders = new OrderService();

// Different parts of the app react to the same event independently
orders.on('order:created', async (order) => {
  await emailService.sendConfirmation(order);
});
orders.on('order:created', async (order) => {
  await inventoryService.reserveItems(order.items);
});
orders.on('order:high-value', async (order) => {
  await notifyAccountManager(order);
});

// Clean up listeners to avoid memory leaks
const handler = (order) => console.log(order);
orders.on('order:created', handler);
orders.off('order:created', handler);
\`\`\`

### Watch Out For
- Default maximum of 10 listeners per event — call \`emitter.setMaxListeners(0)\` to disable the warning if you genuinely need more
- Memory leaks are common with listeners that are never removed — always \`off()\` when a listener's job is done
- Unhandled \`error\` events crash the process — always add an \`error\` listener to every EventEmitter`,

  "nodejs::Streams": `**Streams process data piece-by-piece instead of loading it all into memory — essential for large files, network data, and real-time processing.**

### Why It Matters
Reading a 2GB log file into memory crashes your server. Streams let you process it line by line in constant memory. Node's HTTP, \`fs\`, \`zlib\`, and database cursors are all streams.

### How It Works
\`\`\`typescript
import fs from 'fs';
import zlib from 'zlib';
import readline from 'readline';
import { pipeline } from 'stream/promises';

// BAD: loads 2GB into RAM
const data = fs.readFileSync('huge-file.json'); // 💀

// GOOD: process chunk by chunk — constant memory
const rl = readline.createInterface({
  input: fs.createReadStream('huge-file.csv', { encoding: 'utf8' })
});
for await (const line of rl) {
  await processRow(line.split(','));
}

// Compress a file with pipeline (handles backpressure and errors)
await pipeline(
  fs.createReadStream('large-file.json'),
  zlib.createGzip(),
  fs.createWriteStream('large-file.json.gz')
);

// HTTP response is a Writable stream — stream files to clients
http.createServer((req, res) => {
  res.setHeader('Content-Type', 'video/mp4');
  fs.createReadStream('./video.mp4').pipe(res);
}).listen(3000);
\`\`\`

### Watch Out For
- \`pipe()\` does not handle errors — use \`pipeline()\` from \`stream/promises\` which propagates errors and cleans up
- Backpressure: if a Readable produces data faster than a Writable can consume it, buffers fill up — \`pipeline()\` handles this automatically
- Node.js streams have two modes: flowing and paused — adding a \`data\` event listener switches to flowing; not handling this correctly can cause data loss`,

  "nodejs::Express middleware": `**Express middleware are functions with access to request, response, and next — they form a pipeline processing HTTP requests in sequence.**

### Why It Matters
Every Express API is built on middleware. Authentication, logging, body parsing, CORS, and rate limiting are all middleware. Morgan, Helmet, and cors are popular packages used in production by thousands of companies.

### How It Works
\`\`\`typescript
import express from 'express';
const app = express();

// Global middleware (every request)
app.use(express.json());
app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(helmet());

// Custom logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    console.log(\`\${req.method} \${req.path} → \${res.statusCode} (\${Date.now() - start}ms)\`);
  });
  next(); // MUST call next() or the request hangs forever
});

// Auth middleware — route-specific
const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token required' });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET!);
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
};

app.get('/api/profile', authenticate, async (req, res) => {
  const user = await db.user.findUnique({ where: { id: req.user.id } });
  res.json(user);
});

// Error-handling middleware (4 parameters — must match exactly)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});
\`\`\`

### Watch Out For
- Always call \`next()\` or send a response — forgetting leaves the client hanging
- Error-handling middleware must have exactly 4 parameters — Express identifies it by argument count
- Order matters — register error-handling middleware last, after all routes`,

  "nodejs::REST design": `**REST is an architectural style for APIs that uses HTTP methods, resource-based URLs, and stateless communication.**

### Why It Matters
REST is the dominant API style, used by Twitter, GitHub, Stripe, and Twilio. Stripe's REST API is widely considered the gold standard. Understanding REST is assumed in every backend interview.

### How It Works
\`\`\`text
GET    /api/posts              → list all posts
POST   /api/posts              → create a post
GET    /api/posts/42           → get post 42
PATCH  /api/posts/42           → partially update post 42
DELETE /api/posts/42           → delete post 42

# Nested resources
GET  /api/posts/42/comments    → comments of post 42

# Filtering, sorting, pagination
GET /api/posts?status=published&sort=createdAt:desc&limit=10
\`\`\`

\`\`\`typescript
// Consistent response shape
const successResponse = (res, data, status = 200) =>
  res.status(status).json({ success: true, data });

const errorResponse = (res, message, status, code) =>
  res.status(status).json({ success: false, error: { message, code } });

app.post('/api/posts', async (req, res) => {
  const post = await createPost(req.body);
  return successResponse(res, post, 201); // 201 Created
});

app.get('/api/posts/:id', async (req, res) => {
  const post = await getPost(req.params.id);
  if (!post) return errorResponse(res, 'Post not found', 404);
  return successResponse(res, post);
});
// 200 OK, 201 Created, 204 No Content,
// 400 Bad Request, 401 Unauthorized, 403 Forbidden,
// 404 Not Found, 409 Conflict, 500 Server Error
\`\`\`

### Watch Out For
- Use \`PATCH\` for partial updates, \`PUT\` for full replacements — most APIs misuse \`PUT\`
- Never use verbs in URLs: \`/api/deletePost/42\` is wrong; \`DELETE /api/posts/42\` is correct
- Always version your API: \`/api/v1/posts\` — without versioning, any breaking change breaks all clients`,

  "nodejs::JWT auth": `**JSON Web Tokens are self-contained, signed tokens that carry claims (user ID, role, expiry) and allow stateless authentication without server-side session storage.**

### Why It Matters
Auth0, Firebase Auth, Supabase, and AWS Cognito all issue JWTs. Any server instance can verify a JWT without a database lookup — ideal for microservices and horizontally scaled systems.

### How It Works
\`\`\`typescript
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const ACCESS_SECRET  = process.env.JWT_SECRET!;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;

async function login(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error('Invalid credentials');
  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) throw new Error('Invalid credentials');

  const payload = { sub: user.id, email: user.email, role: user.role };
  const accessToken  = jwt.sign(payload, ACCESS_SECRET,  { expiresIn: '15m' });
  const refreshToken = jwt.sign({ sub: user.id }, REFRESH_SECRET, { expiresIn: '7d' });

  await prisma.refreshToken.create({ data: { token: refreshToken, userId: user.id } });
  return { accessToken, refreshToken };
}

function authenticate(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token required' });
  try {
    req.user = jwt.verify(token, ACCESS_SECRET);
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError')
      return res.status(401).json({ error: 'Token expired', code: 'TOKEN_EXPIRED' });
    res.status(401).json({ error: 'Invalid token' });
  }
}
\`\`\`

### Watch Out For
- JWTs cannot be revoked before expiry — use short expiry for access tokens (15 minutes) and DB-backed refresh tokens for long-lived sessions
- Never store JWTs in \`localStorage\` — XSS attacks can steal them; use \`httpOnly\` cookies instead
- The JWT payload is base64-encoded, not encrypted — never put sensitive data in the payload`,

  "nodejs::File system": `**Node.js's \`fs\` module provides APIs for reading, writing, and manipulating files — with Promise-based, synchronous, and stream interfaces.**

### Why It Matters
File operations are central to backend development: reading config files, processing CSV uploads, generating PDFs, and writing logs. Always use \`fs/promises\` for async operations in request handlers.

### How It Works
\`\`\`typescript
import { readFile, writeFile, mkdir, readdir, stat, unlink } from 'fs/promises';
import { createReadStream } from 'fs';
import { join } from 'path';

// Read a file
const config = JSON.parse(await readFile('./config.json', 'utf8'));

// Write a file
await writeFile('./output.txt', 'Hello World', 'utf8');

// Ensure directory exists (idempotent)
await mkdir('./uploads/2024', { recursive: true });

// Check if file exists
async function fileExists(path: string) {
  try { await stat(path); return true; }
  catch { return false; }
}

// Process large file with stream (memory-efficient)
async function processLargeCSV(filePath: string) {
  const { createInterface } = await import('readline');
  const rl = createInterface({ input: createReadStream(filePath) });
  for await (const line of rl) {
    await processRow(line.split(','));
  }
}

// File uploads with Multer
import multer from 'multer';
const upload = multer({
  dest: 'uploads/',
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
  fileFilter: (req, file, cb) => {
    cb(null, ['image/jpeg', 'image/png'].includes(file.mimetype));
  }
});
\`\`\`

### Watch Out For
- Never use \`fs.readFileSync\` in request handlers — it blocks the event loop
- Always use \`path.join()\` to build file paths — string concatenation enables path traversal attacks (\`../\`)
- Validate and sanitize file names from user input before using them in fs operations`,

  "nodejs::Environment config": `**Environment configuration stores secrets and environment-specific settings in environment variables rather than hardcoding them in source code.**

### Why It Matters
The Twelve-Factor App methodology mandates environment-based config. Hardcoded credentials have caused major data breaches. Every deployment platform is built around environment variables.

### How It Works
\`\`\`bash
# .env — local development (NEVER commit to git!)
DATABASE_URL=postgresql://postgres:password@localhost:5432/myapp
JWT_SECRET=your-secret-here-use-openssl-rand-hex-32
STRIPE_SECRET_KEY=sk_test_...

# .env.example — ALWAYS commit (documents required variables, no real values)
DATABASE_URL=postgresql://user:password@host:5432/dbname
JWT_SECRET=generate-with-openssl-rand-hex-32

# .gitignore — CRITICAL
.env
.env.local
.env.production
\`\`\`

\`\`\`typescript
import { z } from 'zod';

// Validate at startup — fail fast if misconfigured
const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(32),
  NODE_ENV: z.enum(['development', 'test', 'production']),
  PORT: z.coerce.number().default(3000),
  STRIPE_SECRET_KEY: z.string().startsWith('sk_'),
});

const env = envSchema.parse(process.env); // throws if invalid
export { env }; // use this throughout the app

import { env } from './config/env';
const db = new PrismaClient({ datasources: { db: { url: env.DATABASE_URL } } });
\`\`\`

### Watch Out For
- \`process.env\` values are always strings — parse numbers/booleans explicitly
- Use Zod or \`envalid\` to validate at startup — a missing \`DATABASE_URL\` should crash immediately, not 30 seconds later
- Different \`NODE_ENV\` values must be handled correctly — many libraries enable/disable features based on it`,

  // ── Databases ──────────────────────────────────────────────────────────────
  "databases::SQL joins & indexes": `**SQL joins combine rows from multiple tables; indexes are data structures that speed up lookups by orders of magnitude.**

### Why It Matters
A query without an index on a million-row table does a full table scan — potentially 10-100 seconds. Add an index and it returns in milliseconds. This is the single most impactful database optimization and is tested in every backend interview.

### How It Works
\`\`\`sql
-- INNER JOIN — rows that exist in BOTH tables
SELECT users.name, orders.total
FROM orders
INNER JOIN users ON orders.user_id = users.id
WHERE orders.status = 'paid';

-- LEFT JOIN — all users, even with no orders
SELECT users.name, COUNT(orders.id) as order_count
FROM users
LEFT JOIN orders ON orders.user_id = users.id
GROUP BY users.id, users.name
ORDER BY order_count DESC;

-- Composite index — column ORDER matters!
CREATE INDEX idx_orders_user_status ON orders(user_id, status);
-- ↑ speeds up: WHERE user_id = ? AND status = ?
-- ↑ also speeds up: WHERE user_id = ?    (leftmost prefix rule)
-- ✗ does NOT speed up: WHERE status = ?  (not leftmost)

-- EXPLAIN shows the query plan
EXPLAIN ANALYZE
SELECT * FROM orders
WHERE user_id = 42 AND status = 'paid'
ORDER BY created_at DESC LIMIT 10;
-- "Seq Scan" → no index used (bad on large tables)
-- "Index Scan" → index used (good)
\`\`\`

### Watch Out For
- Every index makes writes slower — index selectively, not every column
- \`(a, b)\` composite index doesn't help a query that only filters on \`b\` — leftmost prefix rule
- \`LIKE '%pattern'\` with a leading wildcard cannot use a B-tree index — use full-text search instead`,

  "databases::ACID transactions": `**ACID (Atomicity, Consistency, Isolation, Durability) guarantees database transactions are processed reliably even in the event of errors or crashes.**

### Why It Matters
Without ACID, a bank transfer could debit one account without crediting another if the server crashes mid-transaction. Every banking system, e-commerce checkout, and booking system depends on ACID.

### How It Works
\`\`\`sql
-- ATOMICITY: all or nothing
BEGIN;
  UPDATE accounts SET balance = balance - 500 WHERE id = 1;
  UPDATE accounts SET balance = balance + 500 WHERE id = 2;
COMMIT; -- only persists if BOTH succeed

-- SELECT FOR UPDATE locks the row until commit
BEGIN;
  SELECT stock FROM products WHERE id = 5 FOR UPDATE;
  UPDATE products SET stock = stock - 1 WHERE id = 5 AND stock > 0;
  INSERT INTO order_items (order_id, product_id, qty) VALUES (101, 5, 1);
COMMIT;
\`\`\`

\`\`\`typescript
// Prisma transaction — automatic rollback on error
await prisma.$transaction(async (tx) => {
  const sender = await tx.account.update({
    where: { id: senderId },
    data: { balance: { decrement: amount } },
  });
  if (sender.balance < 0) throw new Error('Insufficient funds'); // auto-rollback!
  await tx.account.update({
    where: { id: receiverId },
    data: { balance: { increment: amount } },
  });
});
\`\`\`

### Watch Out For
- Long-running transactions hold locks and block other queries — keep transactions as short as possible
- \`SELECT FOR UPDATE\` prevents other transactions from modifying the row — use optimistic locking for high-throughput scenarios
- Distributed transactions across multiple databases are extremely complex — design schemas to keep related data in the same database`,

  "databases::Prisma ORM": `**Prisma is a type-safe ORM that auto-generates a fully-typed database client from your schema, eliminating SQL typos and runtime type errors.**

### Why It Matters
Prisma is the most popular ORM in the Node.js/TypeScript ecosystem, surpassing Sequelize and TypeORM. Vercel's templates and most Next.js tutorials use Prisma.

### How It Works
\`\`\`prisma
// schema.prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String
  role      Role     @default(USER)
  posts     Post[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

enum Role { USER ADMIN }

model Post {
  id        String  @id @default(cuid())
  title     String
  published Boolean @default(false)
  author    User    @relation(fields: [authorId], references: [id])
  authorId  String
  @@index([authorId])  // always index foreign keys!
}
\`\`\`

\`\`\`typescript
// Fully typed queries — TypeScript errors if you mistype a field name
const user = await prisma.user.create({
  data: { email: 'alice@example.com', name: 'Alice' }
});

// Relations with include
const postWithAuthor = await prisma.post.findUnique({
  where: { id: postId },
  include: { author: { select: { name: true, email: true } } }
});

// Complex query
const posts = await prisma.post.findMany({
  where: { published: true, author: { role: 'ADMIN' } },
  orderBy: { createdAt: 'desc' },
  take: 10, skip: page * 10,
});
\`\`\`

### Watch Out For
- Always run \`npx prisma generate\` after schema changes — the client won't reflect the new schema otherwise
- Use a module-level PrismaClient singleton — creating a new instance per request exhausts the connection pool
- \`include\` loads all related records — add \`take\`, \`where\`, \`select\` to avoid loading more data than needed`,

  "databases::Data modeling": `**Data modeling is designing how your application's data is structured — defining entities, relationships, and constraints for correctness and performance.**

### Why It Matters
Facebook's social graph, Airbnb's listing/booking system, and Stripe's payment model are famous for their thoughtful data design. A bad data model causes bugs that are impossible to fix without a painful schema migration.

### How It Works
\`\`\`text
-- Social platform data model

Users:      id, email, name, password_hash, created_at
Posts:      id, user_id (FK), title, content, published_at
Tags:       id, name, slug
post_tags:  post_id (FK), tag_id (FK)   ← many-to-many join table
Follows:    follower_id (FK), following_id (FK)
Likes:      user_id (FK), post_id (FK), created_at

Key decisions:
1. Normalization: store tag names once in Tags, not duplicated per post
2. Soft deletes: add deleted_at TIMESTAMP NULL instead of DELETE
   → Preserves audit trail, foreign keys don't break
3. Denormalization for perf: store like_count on Posts to avoid COUNT()
4. UUIDs vs INT IDs:
   → UUIDs: globally unique, safe to expose, harder to enumerate
   → INT: smaller, faster indexes, simpler
\`\`\`

\`\`\`typescript
// Prisma many-to-many with composite primary key
model UserFollow {
  followerId   String
  followingId  String
  createdAt    DateTime @default(now())
  follower     User     @relation("following", fields: [followerId], references: [id])
  following    User     @relation("followers", fields: [followingId], references: [id])
  @@id([followerId, followingId])
  @@index([followingId])
}
\`\`\`

### Watch Out For
- Don't store computed values (age from birthDate) as columns unless there's a performance reason — they go stale
- Avoid EAV tables (\`attributes(entity_id, key, value)\`) — impossible to query efficiently and lose type safety
- Plan for soft deletes from day one — adding them to an existing schema with foreign keys is surprisingly complex`,

  "databases::Redis caching": `**Redis is an in-memory data structure store capable of millions of operations per second — used as a cache, message broker, and session store.**

### Why It Matters
Redis is the standard caching layer at Twitter, GitHub, and Stack Overflow. A database query that takes 50ms returns in under 1ms from Redis. Upstash (serverless Redis) is used in almost every Vercel-deployed app.

### How It Works
\`\`\`typescript
import Redis from 'ioredis';
const redis = new Redis(process.env.REDIS_URL);

// Cache-aside pattern (most common)
async function getUserProfile(userId: string) {
  const cacheKey = \`user:profile:\${userId}\`;
  const cached = await redis.get(cacheKey);
  if (cached) return JSON.parse(cached); // ~0.1ms

  const user = await prisma.user.findUnique({    // ~50ms
    where: { id: userId },
    include: { posts: { take: 5 } }
  });

  await redis.setex(cacheKey, 300, JSON.stringify(user)); // TTL: 5 minutes
  return user;
}

// Invalidate cache when data changes
async function updateUser(userId: string, data: Partial<User>) {
  const updated = await prisma.user.update({ where: { id: userId }, data });
  await redis.del(\`user:profile:\${userId}\`); // bust the cache
  return updated;
}

// Rate limiting
async function checkRateLimit(ip: string, limit = 100, windowSecs = 60) {
  const key = \`ratelimit:\${ip}\`;
  const count = await redis.incr(key);
  if (count === 1) await redis.expire(key, windowSecs);
  return count <= limit;
}
\`\`\`

### Watch Out For
- Redis is NOT durable by default — data can be lost on restart; enable AOF or RDB persistence if durability matters
- Cache invalidation is the hardest problem — when in doubt, use short TTLs (1-5 minutes) rather than event-based invalidation
- Never cache security-sensitive data (passwords, payment info) without encryption`,

  "databases::N+1 problem": `**The N+1 problem occurs when code executes N additional database queries to fetch related data for N already-loaded records — turning 1 query into N+1.**

### Why It Matters
An N+1 bug on a list of 100 users firing 100 extra queries can take a page from 50ms to 5 seconds. This is one of the most common performance killers in real-world apps and frequently asked about in backend interviews.

### How It Works
\`\`\`typescript
// THE PROBLEM — N+1 queries
const users = await prisma.user.findMany();     // Query 1: all users
for (const user of users) {
  user.posts = await prisma.post.findMany({     // N queries (one per user!)
    where: { authorId: user.id }
  });
}
// 100 users = 101 queries. 1000 users = 1001 queries. 💀

// THE SOLUTION — eager loading (2 queries total)
const users = await prisma.user.findMany({
  include: {
    posts: {
      where: { published: true },
      orderBy: { createdAt: 'desc' },
      take: 5,
    }
  }
});
// 2 queries total regardless of user count. ✅

// GraphQL DataLoader — batches per-field queries
import DataLoader from 'dataloader';

const postLoader = new DataLoader(async (userIds: string[]) => {
  const posts = await prisma.post.findMany({
    where: { authorId: { in: userIds as string[] } }
  });
  return userIds.map(id => posts.filter(p => p.authorId === id));
});

const User = {
  posts: (user) => postLoader.load(user.id), // batched into 1 query
};
\`\`\`

### Watch Out For
- Use \`EXPLAIN\` or Prisma's query logging to find N+1 — they often don't surface until production load
- \`include\` fetches all related records — add \`take\`, \`where\`, and \`select\` to limit data
- Deeply nested \`include\` can generate complex JOINs that are slower than the N+1 they replaced`,

  "databases::Database migrations": `**Database migrations are version-controlled scripts that modify the database schema incrementally — enabling teams to evolve their database safely without losing data.**

### Why It Matters
Without migrations, schema changes require manual SQL execution on production, causing drift between developer machines. Prisma Migrate, Flyway, and Rails ActiveRecord migrations all solve this.

### How It Works
\`\`\`bash
# Prisma workflow
npx prisma migrate dev --name add_user_role
# → Generates SQL migration file
# → Applies it to dev database
# → Regenerates the Prisma client

# Migration file: prisma/migrations/20240115_add_user_role/migration.sql
ALTER TABLE "User" ADD COLUMN "role" TEXT NOT NULL DEFAULT 'USER';
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN', 'MODERATOR');
ALTER TABLE "User" ALTER COLUMN "role" TYPE "Role" USING "role"::"Role";

# Apply to production (CI/CD pipeline)
npx prisma migrate deploy
\`\`\`

\`\`\`sql
-- Safe zero-downtime migration for large tables
-- NEVER: ALTER TABLE posts ADD COLUMN view_count INTEGER NOT NULL DEFAULT 0;
-- ↑ Locks the table and rewrites every row — minutes of downtime!

-- SAFE: three-phase approach
-- Phase 1: add nullable
ALTER TABLE posts ADD COLUMN view_count INTEGER;

-- Phase 2: backfill in batches
UPDATE posts SET view_count = 0 WHERE view_count IS NULL LIMIT 10000;
-- run repeatedly until done

-- Phase 3: add constraint
ALTER TABLE posts ALTER COLUMN view_count SET NOT NULL;
\`\`\`

### Watch Out For
- Never edit an already-applied migration — create a new one to fix it; editing breaks migration history on other machines
- Always test migrations against a production-size database in staging — 0.01s on dev can be 30 minutes on 100M rows
- \`CREATE INDEX CONCURRENTLY\` in PostgreSQL is non-blocking; regular \`CREATE INDEX\` locks the table`,

  // ── Git ────────────────────────────────────────────────────────────────────
  "git::Branching strategy": `**A branching strategy is a set of conventions for how a team uses Git branches to manage features, releases, and hotfixes without stepping on each other's work.**

### Why It Matters
GitHub, GitLab, and Atlassian all publish branching strategies because chaotic branching causes merge conflicts and broken main branches. Trunk-based development (used by Google and Meta) and Git Flow are the two dominant strategies.

### How It Works
\`\`\`bash
# TRUNK-BASED DEVELOPMENT (Google, Meta, Vercel)
# Short-lived feature branches — merged to main same day
git checkout -b feat/user-auth
# ... write code, commit often ...
git push origin feat/user-auth
# Open PR → review → squash merge → delete branch
# main is always deployable

# GIT FLOW (larger teams, versioned releases)
main           ← production-ready only
develop        ← integration branch
feature/x      ← branches from develop
release/1.2.0  ← branches from develop when ready
hotfix/1.1.1   ← branches from main for urgent production fixes

# Branch naming conventions
feat/user-authentication
fix/login-redirect-loop
chore/update-dependencies
refactor/extract-auth-middleware
test/auth-unit-tests
\`\`\`

### Watch Out For
- Long-lived branches (> 1 week) create merge hell — commit small, merge often
- Never commit directly to \`main\` in a team — use branch protection rules in GitHub to require PR reviews
- The main branch should always be deployable — if it breaks, it's a P0 incident`,

  "git::Rebasing": `**Git rebase moves your commits onto a new base commit, creating a linear history — as opposed to merge which creates a merge commit preserving branching structure.**

### Why It Matters
Google and Meta enforce linear Git history via rebase. A clean, linear history makes \`git log\` readable, \`git bisect\` effective, and code reviews easier. Understanding rebase vs. merge is a very common Git interview topic.

### How It Works
\`\`\`bash
# Update feature branch with latest main
git checkout feature/user-auth
git fetch origin
git rebase origin/main
# If conflicts: resolve → git add . → git rebase --continue
# To abort: git rebase --abort

# Interactive rebase — rewrite local history before pushing
git rebase -i HEAD~3   # edit last 3 commits

# In the editor:
pick a1b2c3 add login form
squash d4e5f6 fix typo in login form   # squash into previous
reword g7h8i9 add JWT verification     # rename commit

# Result: 2 clean commits instead of 3 messy ones

# Force push after rebase (safer than --force)
git push --force-with-lease origin feature/user-auth
\`\`\`

### Watch Out For
- Never rebase commits already pushed to a shared branch — it rewrites history and causes conflicts for everyone who built on top of it
- After rebasing a pushed branch, you must force-push — use \`--force-with-lease\` which fails if someone else pushed meanwhile
- Rebase conflicts are per-commit — squash first if you have many commits to reduce conflict resolution pain`,

  "git::Cherry-pick": `**Git cherry-pick applies the changes from a specific commit to the current branch — without merging the entire source branch.**

### Why It Matters
When a bug fix lands on a feature branch but must go to production immediately, you cherry-pick just that fix to main. Hotfix workflows and backporting fixes to older release branches both use cherry-pick.

### How It Works
\`\`\`bash
# Find the commit hash
git log --oneline feature/user-auth
# a1b2c3d fix: resolve session timeout on logout
# d4e5f6g feat: add remember-me checkbox

# Apply just the bug fix to main
git checkout main
git cherry-pick a1b2c3d
# → The fix is on main without the rest of the feature branch

# Cherry-pick a range (inclusive)
git cherry-pick a1b2c3d^..g7h8i9j

# Without auto-committing (stage only to edit before committing)
git cherry-pick --no-commit a1b2c3d

# Handle conflicts
git cherry-pick a1b2c3d
# CONFLICT → resolve → git add . → git cherry-pick --continue
# Or: git cherry-pick --abort

# Backport: fix on main, apply to v2 release branch
git checkout release/v2
git cherry-pick $(git log main --grep="fix: security" --format="%H")
\`\`\`

### Watch Out For
- Cherry-picked commits get new hashes — if you later merge the original branch, Git may apply the same changes twice
- Cherry-picking loses context — update the commit message with \`--edit\` when backporting
- If you cherry-pick frequently, your branching strategy may need rethinking`,

  "git::Stash": `**Git stash temporarily shelves uncommitted changes so you can switch context without committing work-in-progress.**

### Why It Matters
Stash is essential for the interrupted-work scenario every developer faces: halfway through a feature, someone reports an urgent bug, you need to switch branches but don't want to commit half-done code.

### How It Works
\`\`\`bash
# Save current changes (working tree becomes clean)
git stash
git stash push -m "WIP: adding payment form"  # with a description

# List stashes
git stash list
# stash@{0}: WIP: adding payment form
# stash@{1}: WIP on main: a1b2c3d

# Apply most recent stash (keeps it in the stash list)
git stash apply

# Apply and remove from list
git stash pop

# Apply specific stash
git stash apply stash@{1}

# Include untracked files (new files not yet tracked)
git stash push -u

# View what's in a stash
git stash show -p stash@{0}

# Create a branch from a stash (most elegant)
git stash branch feature/payment-form stash@{0}
# → creates branch, checks it out, applies the stash

# Clean up
git stash drop stash@{1}
git stash clear  # delete all stashes
\`\`\`

### Watch Out For
- \`git stash\` doesn't include untracked files by default — use \`-u\` to include new files
- Stashes are local only — if you lose the local repo without committing, stashes are lost
- Conflicts when applying stash are resolved like merge conflicts; use \`git stash branch\` for complex conflicts`,

  "git::Git hooks": `**Git hooks are scripts that Git automatically runs before or after specific events — enabling automated quality checks before code gets committed or pushed.**

### Why It Matters
Google, Microsoft, and every serious engineering team run automated checks before code gets committed. Husky (used by React, Next.js, and thousands of projects) makes hooks shareable across teams via package.json.

### How It Works
\`\`\`bash
# Install Husky
npm install --save-dev husky lint-staged
npx husky init
\`\`\`

\`\`\`json
// package.json
{
  "scripts": { "prepare": "husky" },
  "lint-staged": {
    "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.{css,md}": ["prettier --write"]
  }
}
\`\`\`

\`\`\`bash
# .husky/pre-commit — runs before every commit
#!/bin/sh
npx lint-staged     # lint and format only staged files (fast!)
npm run type-check  # TypeScript check

# .husky/commit-msg — enforces conventional commit format
#!/bin/sh
npx commitlint --edit "$1"

# commitlint.config.js
module.exports = {
  extends: ['@commitlint/config-conventional'],
};

# .husky/pre-push — heavier checks before pushing
#!/bin/sh
npm run test:unit
npm run build
\`\`\`

### Watch Out For
- Keep pre-commit hooks fast (< 5 seconds) — slow hooks get bypassed with \`git commit --no-verify\`
- Hooks in \`.git/hooks/\` are not committed — use Husky so all team members share the same hooks
- Hooks can be bypassed with \`--no-verify\` — they're a convenience, not a security mechanism; CI/CD is the true enforcement gate`,

  "git::PR workflows": `**A Pull Request workflow is a team process for reviewing, discussing, and merging code changes — enabling asynchronous collaboration and code quality enforcement.**

### Why It Matters
Pull Requests are how every team from open source (React, Vue) to large companies (Google, Meta) manages code changes. A good PR workflow prevents bugs, spreads knowledge, and creates a paper trail of decisions.

### How It Works
\`\`\`bash
# 1. Create a focused branch
git checkout -b feat/user-auth-flow

# 2. Commit with conventional commits
git commit -m "feat: add JWT token generation on login"
git commit -m "test: add unit tests for auth service"

# 3. Push and open PR
git push origin feat/user-auth-flow

# 4. Keep PR up to date
git fetch origin && git rebase origin/main

# 5. After approval: squash merge for clean history
git checkout main && git merge --squash feat/user-auth-flow
git commit -m "feat: implement JWT authentication flow (#123)"
\`\`\`

Good PR description template:
\`\`\`markdown
## What & Why
Implements JWT-based authentication to replace session cookies.
Closes #42

## How
- Added \`generateToken()\` in \`src/auth/jwt.ts\`
- Refresh token rotation with 7-day TTL stored in DB
- \`authenticate\` middleware applied to protected routes

## Testing
- Unit tests for token generation/verification
- Integration test for the login → refresh → logout flow
\`\`\`

### Watch Out For
- Keep PRs small (< 400 lines) — large PRs get rubber-stamped; split them into logical units
- Don't merge a PR with unresolved review comments
- Auto-merge (when CI passes and approvals are met) is a powerful time-saver once your team trusts the process`,

  "git::Conventional commits": `**Conventional Commits is a specification for commit messages using a structured format, enabling automated changelogs, semantic versioning, and better git history.**

### Why It Matters
Angular, Vue, Next.js, Prisma, and Vite all enforce it. It enables tools like \`semantic-release\` to automatically bump version numbers and generate changelogs.

### How It Works
Format: \`<type>[optional scope]: <description>\`

\`\`\`bash
feat:     new feature → triggers MINOR version bump
fix:      bug fix → triggers PATCH version bump
docs:     documentation changes only
style:    formatting, white-space (no logic change)
refactor: code change that neither fixes a bug nor adds a feature
perf:     performance improvement
test:     adding or updating tests
chore:    maintenance (deps, configs)

# Examples
git commit -m "feat: add OAuth login with Google"
git commit -m "fix: resolve infinite redirect loop on logout"
git commit -m "feat(auth): add two-factor authentication"
git commit -m "refactor(api): extract user validation to middleware"
git commit -m "perf(db): add index on users.email for faster lookups"

# Breaking changes (triggers MAJOR version bump)
git commit -m "feat!: remove v1 API endpoints"
git commit -m "feat: new authentication API" -m "BREAKING CHANGE: /api/v1/auth is removed"

# With commitlint + Husky, invalid messages are rejected:
git commit -m "updated stuff"
# ✗ subject may not be empty [subject-empty]
# ✗ type may not be empty [type-empty]
\`\`\`

### Watch Out For
- The scope is optional but recommended for monorepos: \`feat(checkout):\`, \`fix(payments):\`
- The description must be imperative and lowercase: "add login form" not "Added login form."
- One commit = one logical change — don't mix unrelated changes in a single commit`,

  // ── Docker & CI/CD ─────────────────────────────────────────────────────────
  "docker::Dockerfile": `**A Dockerfile is a script of instructions that Docker reads to automatically build a container image — packaging your app and all its dependencies into a portable, reproducible unit.**

### Why It Matters
"Works on my machine" is eliminated. Docker containers run identically on dev, CI, and production. Kubernetes, AWS ECS, Google Cloud Run, and Railway all run Docker containers.

### How It Works
\`\`\`dockerfile
# Layer order matters — put infrequently-changing lines at the TOP
FROM node:20-alpine        # Alpine = tiny (5MB vs 900MB)
WORKDIR /app

# Copy package files FIRST (own layer — cached unless deps change)
COPY package*.json ./
RUN npm ci --only=production

# Then copy source code (changes more often)
COPY . .
RUN npm run build

# Non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

EXPOSE 3000
CMD ["node", "dist/server.js"]
\`\`\`

\`\`\`bash
# .dockerignore — critical for small image size
node_modules    # rebuilt inside Docker
.git
.env            # secrets NEVER go in images
dist
*.test.ts
README.md
\`\`\`

### Watch Out For
- Every \`RUN\`, \`COPY\`, \`ADD\` creates a new layer — combine related commands with \`&&\` and order for cache efficiency
- Never put secrets (\`.env\`, API keys) in a Dockerfile or image — they're visible to anyone with access to the image
- Use specific image versions (\`node:20-alpine\`) not \`node:latest\` — \`latest\` can break your build when the base image updates`,

  "docker::docker-compose": `**Docker Compose defines and runs multi-container applications with a single \`docker-compose.yml\` — starting your entire stack with one command.**

### Why It Matters
Docker Compose ensures everyone on the team runs the same PostgreSQL version, Redis version, and configuration. It replaces "install PostgreSQL locally, configure it…" with \`docker compose up\`.

### How It Works
\`\`\`yaml
services:
  app:
    build: .
    ports: ["3000:3000"]
    environment:
      DATABASE_URL: postgresql://postgres:secret@db:5432/myapp
      REDIS_URL: redis://cache:6379
    volumes:
      - .:/app                # hot reload
      - /app/node_modules     # don't mount host node_modules
    depends_on:
      db:
        condition: service_healthy  # wait until DB is ready

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: secret
      POSTGRES_DB: myapp
    ports: ["5432:5432"]
    volumes:
      - db_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 5s
      retries: 5

  cache:
    image: redis:7-alpine
    ports: ["6379:6379"]

volumes:
  db_data:

# docker compose up -d          — start in background
# docker compose down -v        — stop and remove volumes (⚠ deletes data)
# docker compose exec app sh    — shell into app container
\`\`\`

### Watch Out For
- Services communicate by service name, not \`localhost\` — connect to \`db:5432\`, not \`localhost:5432\`
- Volume mounts on macOS can be slow for node_modules — always add an anonymous volume for \`/app/node_modules\`
- \`depends_on\` only waits for the container to start, not for the service inside to be ready — use healthcheck`,

  "docker::Multi-stage builds": `**Multi-stage builds use multiple \`FROM\` instructions in one Dockerfile to separate the build environment from the runtime environment, producing minimal production images.**

### Why It Matters
A Node.js app with a full build environment can be 1GB+. The same app compiled for production can be under 100MB. Smaller images = faster deployments, lower costs, smaller attack surface.

### How It Works
\`\`\`dockerfile
# ── Stage 1: Install dependencies ─────────────────────────────
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# ── Stage 2: Build ────────────────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build
RUN npm prune --production  # remove devDependencies

# ── Stage 3: Production runner (only runtime artifacts) ───────
FROM node:20-alpine AS runner
RUN addgroup -S app && adduser -S app -G app
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

USER app
EXPOSE 3000
CMD ["node", "dist/server.js"]
# Result: ~120MB instead of ~1.2GB (10x smaller!)

# Next.js standalone (even smaller):
# next.config.js: output: 'standalone'
COPY --from=builder /app/.next/standalone ./
CMD ["node", "server.js"]
\`\`\`

### Watch Out For
- The final stage must contain everything needed to run — missing a file is only discovered when the container starts
- Use \`AS <name>\` for stages you'll copy from — unnamed stages can't be referenced with \`--from\`
- \`.dockerignore\` applies to all stages — make sure you're not ignoring files needed in early stages`,

  "docker::GitHub Actions": `**GitHub Actions automates testing, building, and deploying code using YAML workflow files that run in response to Git events.**

### Why It Matters
GitHub Actions is the industry standard for CI/CD on GitHub, used by React, Next.js, Prisma, and millions of projects. Vercel, Railway, and Fly.io all integrate directly with it.

### How It Works
\`\`\`yaml
# .github/workflows/ci.yml
name: CI
on:
  push:     { branches: [main] }
  pull_request: { branches: [main] }

jobs:
  test:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:16-alpine
        env: { POSTGRES_PASSWORD: testpw, POSTGRES_DB: testdb }
        ports: ["5432:5432"]
        options: --health-cmd pg_isready --health-interval 5s

    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20', cache: 'npm' }
      - run: npm ci
      - run: npm run type-check
      - run: npm run lint
      - run: npm run test:unit
      - run: npm run test:integration
        env: { DATABASE_URL: postgresql://postgres:testpw@localhost:5432/testdb }

  deploy:
    needs: test           # only deploys if tests pass
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: curl -X POST \${{ secrets.DEPLOY_WEBHOOK_URL }}
\`\`\`

### Watch Out For
- Always pin action versions (\`actions/checkout@v4\`) — using \`@main\` is a supply chain attack risk
- Secrets (\`\${{ secrets.MY_SECRET }}\`) are never logged — don't try to echo them for debugging
- Use \`cache: 'npm'\` to cache node_modules between runs — keeps builds fast and cheap`,

  "docker::Automated testing": `**Automated testing in CI/CD runs your test suite on every code change, providing a safety net that catches regressions before they reach production.**

### Why It Matters
Google, Netflix, and Stripe run tens of thousands of automated tests on every commit. A failing test blocks the merge. Amazon famously measured that bugs caught in testing cost 1/100th of the cost to fix in production.

### How It Works
\`\`\`yaml
name: Test Suite
on: [push, pull_request]

jobs:
  unit-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20', cache: 'npm' }
      - run: npm ci
      - run: npm run test:unit -- --coverage
      - uses: codecov/codecov-action@v4

  integration-tests:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:16
        env: { POSTGRES_PASSWORD: testpw, POSTGRES_DB: testdb }
        ports: ["5432:5432"]
        options: --health-cmd pg_isready --health-interval 5s
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20', cache: 'npm' }
      - run: npm ci
      - run: npx prisma migrate deploy
        env: { DATABASE_URL: postgresql://postgres:testpw@localhost:5432/testdb }
      - run: npm run test:integration
        env: { DATABASE_URL: postgresql://postgres:testpw@localhost:5432/testdb }

  e2e-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20', cache: 'npm' }
      - run: npm ci && npx playwright install --with-deps chromium
      - run: npx playwright test
      - if: failure()
        uses: actions/upload-artifact@v4
        with: { name: playwright-report, path: playwright-report/ }
\`\`\`

### Watch Out For
- Tests must be independent and idempotent — each test sets up its own data and cleans up after itself
- E2E tests are slowest — run them on PR merge only; unit/integration on every push
- Use transaction-based rollback or test-specific databases to prevent test pollution`,

  "docker::Deployment pipelines": `**A deployment pipeline is a series of automated stages — build, test, staging, production — that code must pass through before reaching users.**

### Why It Matters
Netflix deploys thousands of times per day. This scale is only possible with automated deployment pipelines. Manual deployments are error-prone, slow, and undocumented.

### How It Works
\`\`\`yaml
name: Deploy Pipeline
on:
  push: { branches: [main] }

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20', cache: 'npm' }
      - run: npm ci && npm run type-check && npm test

  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Build Docker image
        run: |
          docker build -t myapp:\${{ github.sha }} .
          echo "\${{ secrets.REGISTRY_TOKEN }}" | docker login ghcr.io -u \${{ github.actor }} --password-stdin
          docker push ghcr.io/\${{ github.repository }}:\${{ github.sha }}

  deploy-staging:
    needs: build
    environment: staging      # requires approval if set in GitHub
    runs-on: ubuntu-latest
    steps:
      - run: fly deploy --image ghcr.io/\${{ github.repository }}:\${{ github.sha }} --app myapp-staging
        env: { FLY_API_TOKEN: \${{ secrets.FLY_API_TOKEN }} }

  smoke-test:
    needs: deploy-staging
    runs-on: ubuntu-latest
    steps:
      - run: |
          response=$(curl -s -o /dev/null -w "%{http_code}" https://staging.myapp.com/health)
          [ "$response" = "200" ] || exit 1

  deploy-production:
    needs: smoke-test
    environment: production   # manual approval gate
    runs-on: ubuntu-latest
    steps:
      - run: fly deploy --image ghcr.io/\${{ github.repository }}:\${{ github.sha }} --app myapp
        env: { FLY_API_TOKEN: \${{ secrets.FLY_API_TOKEN }} }
\`\`\`

### Watch Out For
- Always deploy to staging and run smoke tests before production
- Use rollback strategy — blue/green or \`fly deploy --strategy rolling\` lets you roll back in seconds
- Environment secrets must be in CI secrets, never in YAML files`,

  "docker::Environment management": `**Environment management maintains separate, isolated environments (development, staging, production) with their own configurations and databases.**

### Why It Matters
Every professional engineering team operates with at least three environments. Testing on production is dangerous. Stripe, GitHub, and Shopify have entire teams dedicated to environment parity.

### How It Works
\`\`\`bash
# Environment hierarchy
development  → your local machine
test         → automated CI (ephemeral, per pipeline run)
staging      → production mirror (same infra, separate data)
production   → real users

# .env files locally, platform secrets in CI/production
.env.development   → local dev (never commit)
.env.example       → commit this (documents keys, no real values)
# .gitignore: .env .env.local .env.production
\`\`\`

\`\`\`typescript
// Environment-aware configuration with Zod validation
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production', 'staging']),
  DATABASE_URL: z.string(),
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default(
    process.env.NODE_ENV === 'production' ? 'warn' : 'debug'
  ),
  RATE_LIMIT_ENABLED: z.coerce.boolean().default(
    process.env.NODE_ENV === 'production'
  ),
});
export const env = envSchema.parse(process.env);

// Feature flags per environment
const features = {
  betaFeature: env.NODE_ENV !== 'production',
  debugPanel:  env.NODE_ENV === 'development',
  analytics:   env.NODE_ENV === 'production',
};

// Docker Compose override files
// docker-compose.yml         ← base config
// docker-compose.dev.yml     ← dev overrides (volume mounts, debug)
// docker compose -f docker-compose.yml -f docker-compose.dev.yml up
\`\`\`

### Watch Out For
- Staging must use production-like data volumes — 10 rows in staging won't reveal 10M-row production issues
- Never share databases between environments — a staging migration must not affect production
- If production runs on Linux, test on Linux — use Docker locally to match the production OS`,

  // ── System Design ──────────────────────────────────────────────────────────
  "system-design::Load balancing": `**A load balancer distributes incoming traffic across multiple servers to prevent bottlenecks and ensure high availability.**

### Why It Matters
Every service used by millions uses load balancing — AWS ALB, Nginx, HAProxy, Cloudflare. Without a load balancer, adding more servers doesn't help. Netflix runs multiple load balancer tiers handling billions of requests per day.

### How It Works
\`\`\`text
User → DNS → Load Balancer → [Server 1, Server 2, Server 3, ...]
                                     ↓
                              Shared Database

Load balancing algorithms:
- Round Robin:        S1 → S2 → S3 → S1... Simple, works when servers are identical
- Least Connections:  Route to server with fewest active connections
                      Better for variable request durations
- IP Hash:            Same client always hits same server
                      Required for WebSocket or server-side sessions
- Weighted Round Robin: Faster servers get more traffic

Health checks:
- LB pings /health endpoint every 10s
- 2 consecutive failures → remove server from pool
- Server recovers → add back automatically

Layer 4 (Transport) vs Layer 7 (Application):
- L4: routes by IP/TCP without inspecting packets — ultra-fast
- L7: routes by URL path, headers, cookies — flexible
  /api/* → API servers, /static/* → CDN, /ws/* → WebSocket servers
\`\`\`

### Watch Out For
- Stateful servers storing session in memory break with load balancing — store sessions in Redis
- SSL termination at the LB is standard — servers communicate internally over HTTP
- A single load balancer becomes a single point of failure — use an active-passive pair`,

  "system-design::Caching strategies": `**Caching stores copies of expensive computation results in fast storage so they can be served faster on repeated requests.**

### Why It Matters
Facebook serves over 1 trillion cache hits per day. The performance difference between a cached response (0.1ms) and a database query (50-200ms) is 500-2000x.

### How It Works
\`\`\`text
1. CACHE-ASIDE (Lazy Loading) — most common
   Read:  Check cache → hit? Return. Miss? → DB → write cache → return
   Write: Write to DB, invalidate/update cache
   Use for: read-heavy workloads with occasionally changing data

2. WRITE-THROUGH
   Write: → DB AND cache simultaneously
   Trade-off: write latency doubled; cache always consistent

3. WRITE-BEHIND (Write-Back)
   Write: → cache immediately, DB asynchronously
   Trade-off: low write latency; risk of data loss if cache fails

Invalidation strategies:
- TTL (Time To Live): cache expires after N seconds — may serve stale data
- Event-based: invalidate cache when data changes — always fresh, complex
- Short TTL + cache-aside: best of both — simple and fresh enough
\`\`\`

\`\`\`typescript
async function getPopularPosts() {
  const cached = await redis.get('popular:posts');
  if (cached) return JSON.parse(cached); // ~0.1ms

  const posts = await db.posts.findMany({ // ~50ms
    where: { published: true },
    orderBy: { likes: 'desc' },
    take: 20,
  });

  await redis.setex('popular:posts', 300, JSON.stringify(posts)); // 5min TTL
  return posts;
}
\`\`\`

### Watch Out For
- Cache invalidation is the hardest problem in computer science — when in doubt, use short TTLs
- Thundering herd: when a hot key expires, hundreds of requests simultaneously hit the DB — use mutex locks or TTL jitter (+/- random offset)
- Thundering herd protection: set cache to "recomputing" while fetching, return slightly stale data`,

  "system-design::Database sharding": `**Database sharding is horizontal partitioning — splitting a database into smaller pieces (shards) distributed across multiple servers, each responsible for a subset of the data.**

### Why It Matters
When a single database can no longer handle the read/write throughput or storage (typically 5-10TB), sharding is the path forward. Instagram, WhatsApp, and Slack all use database sharding.

### How It Works
\`\`\`text
USER-BASED SHARDING (most common)
- User ID % N shards determines which server stores data
- Shard 0: users 0, 3, 6... → Server A
- Shard 1: users 1, 4, 7... → Server B
✅ User's data is local — fast queries
❌ Cross-user queries need aggregation across shards

GEO-BASED SHARDING
- NA users → US servers, EU users → EU servers (GDPR compliance)
✅ Low latency for users
❌ Uneven distribution if one region grows faster

CONSISTENT HASHING
- Shards arranged in a virtual ring
- Data assigned to the next shard clockwise from its hash
- Adding/removing shards only moves ~1/N of data (not everything)
✅ Minimizes data movement during rebalancing
Used by: Amazon DynamoDB, Apache Cassandra

Cross-shard queries are expensive:
SELECT AVG(order_total) FROM orders; -- must query ALL shards
\`\`\`

### Watch Out For
- Choose the shard key carefully — a poor key (like \`created_at\`) causes hot spots where all recent data hits one shard
- Cross-shard transactions are very hard — design data so related records stay on the same shard
- Resharding with simple modulo sharding is painful — prefer consistent hashing from the start`,

  "system-design::CAP theorem": `**The CAP theorem states a distributed system can only guarantee two of three: Consistency, Availability, and Partition Tolerance.**

### Why It Matters
CAP theorem comes up in every system design interview and explains why distributed databases make different trade-offs. Cassandra prioritizes AP, HBase prioritizes CP. Understanding CAP helps you choose the right database.

### How It Works
\`\`\`text
CONSISTENCY (C): every read gets the most recent write or an error
AVAILABILITY (A): every request gets a non-error response
                  (but might not have the latest data)
PARTITION TOLERANCE (P): system operates even if network messages are dropped

Network partitions ALWAYS happen in distributed systems.
You cannot build a distributed system without P.
The REAL choice: C or A during a partition?

CP (Consistent + Partition Tolerant):
→ Returns error if can't guarantee fresh data
→ Choose when: banking, inventory, financial systems
→ Examples: HBase, MongoDB (strong consistency), ZooKeeper

AP (Available + Partition Tolerant):
→ Always returns data, might be slightly stale
→ Choose when: social media feeds, carts, search indexes
→ Examples: Cassandra, CouchDB, DynamoDB (eventual consistency)

EVENTUAL CONSISTENCY:
After a partition heals, all nodes converge to the same value.
Used by: Amazon shopping cart, DNS, social media like counts
(Your Facebook like count may be off by 1 for a few seconds — that's fine)
\`\`\`

### Watch Out For
- CAP describes a worst-case scenario — most of the time systems provide BOTH C and A, degrading gracefully only during partitions
- "Consistent" in CAP means linearizability — stronger than SQL ACID consistency
- PACELC extends CAP: even without partitions, there's a latency vs. consistency tradeoff`,

  "system-design::Message queues": `**A message queue is an asynchronous communication mechanism that decouples services — producers put messages in the queue, consumers process them independently.**

### Why It Matters
Amazon SQS processes trillions of messages per year. Kafka powers LinkedIn's activity feed (1 trillion messages/day), Stripe's payment processing, and Uber's real-time systems.

### How It Works
\`\`\`text
Producer → [Queue/Topic] → Consumer

TASK QUEUE (point-to-point):
  Each message processed by EXACTLY ONE consumer
  Use for: email sending, image processing, order fulfillment
  Tools: AWS SQS, RabbitMQ, Bull (Redis-based)

PUB/SUB (publish-subscribe):
  Each message delivered to ALL subscribers
  Use for: notifications, event broadcasting, cache invalidation
  Tools: Kafka, Google Pub/Sub, Redis Pub/Sub

REAL WORLD EXAMPLE:
User submits order → HTTP response: "Order received!" (immediate)
                  → publishes "order.created" to queue

Multiple consumers process independently:
→ Consumer 1: charge payment card
→ Consumer 2: send confirmation email
→ Consumer 3: update inventory
→ Consumer 4: notify fulfillment warehouse
\`\`\`

\`\`\`typescript
// BullMQ (Redis-based queue for Node.js)
import { Queue, Worker } from 'bullmq';
const emailQueue = new Queue('emails', { connection: redis });

// Producer — add job, return immediately
await emailQueue.add('welcome-email', { to: user.email, name: user.name }, {
  attempts: 3,
  backoff: { type: 'exponential', delay: 1000 },
});

// Consumer — runs independently, possibly on different server
new Worker('emails', async (job) => {
  await sendEmail(job.data.to, job.data.name);
}, { connection: redis, concurrency: 10 });
\`\`\`

### Watch Out For
- Idempotency is critical — if a worker fails and retries, processing the same message twice must not cause double charges
- Dead letter queues (DLQ) catch messages that fail all retries — always monitor your DLQ
- Consumer group lag is your key reliability metric — alert if it grows unboundedly`,

  "system-design::API gateways": `**An API gateway is a single entry point for all client requests that handles cross-cutting concerns — routing, authentication, rate limiting, and logging — before forwarding to backend services.**

### Why It Matters
Netflix's Zuul, Amazon's API Gateway, and Kong are used at massive scale. Without an API gateway, every microservice must implement its own auth and rate limiting — duplicating code across dozens of services.

### How It Works
\`\`\`text
Client → API Gateway → [Auth Service, User Service, Order Service, Payment Service]

WHAT THE GATEWAY HANDLES:
→ Authentication: validate JWT/API keys before forwarding
→ Authorization: check permissions per route
→ Rate limiting: 100 req/min per IP/user
→ Routing: /api/users/* → User Service, /api/orders/* → Order Service
→ SSL termination: HTTPS from client, HTTP internally
→ Request transformation: translate mobile API v1 to internal v2
→ Response aggregation (BFF pattern): combine multiple service responses
→ Circuit breaking: stop forwarding to unhealthy services

BFF (Backend for Frontend) pattern:
  Mobile → Mobile BFF → (User Service + Order Service + Product Service)
  Web App → Web BFF   → (User Service + Search + Recommendations)
\`\`\`

\`\`\`typescript
// Simple gateway with Express
app.use('/api/users',    authenticate, rateLimit, proxy('http://user-service:3001'));
app.use('/api/orders',   authenticate, rateLimit, proxy('http://order-service:3002'));
app.use('/api/products',               rateLimit, proxy('http://product-service:3003'));

const apiLimiter = rateLimit({
  windowMs: 60 * 1000, max: 100,
  keyGenerator: (req) => req.user?.id || req.ip,
  message: { error: 'Too many requests', retryAfter: 60 }
});
\`\`\`

### Watch Out For
- The API gateway is a single point of failure — deploy multiple instances behind a load balancer
- Don't put business logic in the gateway — keep it as a thin routing/middleware layer
- Gateway latency adds to every request — even 5ms per request becomes significant at scale`,

  "system-design::Microservices": `**Microservices is an architectural style where a large application is broken into small, independently deployable services that communicate via APIs, each owning its own data.**

### Why It Matters
Netflix decomposed their monolith into 700+ microservices and went from releasing every few weeks to multiple times per day. Amazon's migration enabled the AWS business. Uber, Airbnb, and Twitter all use microservices for scale and team independence.

### How It Works
\`\`\`text
MONOLITH vs MICROSERVICES:

MONOLITH:            MICROSERVICES:
┌──────────────┐     ┌─────────┐  ┌─────────┐  ┌──────────┐
│ Users        │     │ User    │  │ Order   │  │ Payment  │
│ Orders       │     │ Service │  │ Service │  │ Service  │
│ Payments     │     │ :3001   │  │ :3002   │  │ :3003    │
│ Notifications│     └─────────┘  └─────────┘  └──────────┘
│ (one deploy) │          ↕  REST/gRPC/Events
└──────────────┘     ┌─────────┐  ┌─────────────┐
                     │ Notif.  │  │ API Gateway │
                     │ Service │  │ (entry pt.) │
                     └─────────┘  └─────────────┘

Each service:
✅ Has its own database (no shared DB!)
✅ Deployed independently (team autonomy)
✅ Scaled independently
✅ Written in any language
❌ Distributed system complexity
❌ Network latency between services
❌ Distributed tracing required to debug

WHEN TO USE MONOLITH FIRST:
< 10 engineers: monolith wins every time.
Microservices solve organizational scale, not technical scale.
\`\`\`

### Watch Out For
- Data consistency across services requires eventual consistency or sagas — no SQL transactions across two databases in different services
- Service discovery (how services find each other) — use Kubernetes Services, Consul, or AWS CloudMap
- Distributed tracing (OpenTelemetry, Jaeger, Datadog) is mandatory — debugging a request touching 6 services is impossible without it`,

  // ── Testing ────────────────────────────────────────────────────────────────
  "testing::Unit tests": `**Unit tests verify the behavior of a single function or module in isolation — without touching databases, networks, or external dependencies.**

### Why It Matters
Unit tests are the fastest (milliseconds each), most abundant, and cheapest tests. Google has billions of them. They form the base of the testing pyramid and catch logic bugs the moment they're introduced.

### How It Works
\`\`\`typescript
// utils/currency.ts — pure function: perfect for unit testing
export function formatCurrency(amount: number, currency: string): string {
  if (amount < 0) throw new RangeError('Amount must be non-negative');
  return new Intl.NumberFormat('en-US', {
    style: 'currency', currency, minimumFractionDigits: 2,
  }).format(amount);
}

export function calculateTax(amount: number, rate: number): number {
  return Math.round(amount * rate * 100) / 100;
}

// currency.test.ts — Vitest
import { describe, it, expect } from 'vitest';
import { formatCurrency, calculateTax } from './currency';

describe('formatCurrency', () => {
  it('formats USD correctly', () => {
    expect(formatCurrency(1234.56, 'USD')).toBe('$1,234.56');
  });
  it('formats zero', () => {
    expect(formatCurrency(0, 'USD')).toBe('$0.00');
  });
  it('throws on negative amount', () => {
    expect(() => formatCurrency(-1, 'USD')).toThrow(RangeError);
    expect(() => formatCurrency(-1, 'USD')).toThrow('non-negative');
  });
});

describe('calculateTax', () => {
  it('calculates 10% tax', () => {
    expect(calculateTax(100, 0.1)).toBe(10);
  });
  it('rounds to 2 decimal places', () => {
    expect(calculateTax(10, 0.333)).toBe(3.33);
  });
});
\`\`\`

### Watch Out For
- If a test takes more than 100ms, it's probably hitting a real database or network — mock those dependencies
- Test behavior, not implementation — don't test that a specific internal function was called; test what the function returns
- Multiple related assertions in one test are fine — split only when assertions are unrelated`,

  "testing::Integration tests": `**Integration tests verify that multiple units work correctly together — testing real interactions between modules, databases, and APIs without mocking everything.**

### Why It Matters
Unit tests verify parts in isolation; integration tests verify the parts assemble correctly. Kent C. Dodds (Testing Library author) argues integration tests provide the most value per line of code.

### How It Works
\`\`\`typescript
import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import request from 'supertest';
import { app } from '../app';
import { prisma } from '../db';

describe('POST /api/posts', () => {
  let authToken: string;

  beforeAll(async () => {
    const res = await request(app).post('/api/auth/login')
      .send({ email: 'test@example.com', password: 'testpass123' });
    authToken = res.body.accessToken;
  });

  beforeEach(async () => {
    await prisma.post.deleteMany(); // clean state before each test
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('creates a post successfully', async () => {
    const res = await request(app)
      .post('/api/posts')
      .set('Authorization', \`Bearer \${authToken}\`)
      .send({ title: 'My Post', content: 'Hello world' })
      .expect(201);

    expect(res.body.data).toMatchObject({ title: 'My Post' });
    expect(res.body.data.id).toBeDefined();

    // Verify it's actually in the DB
    const saved = await prisma.post.findUnique({ where: { id: res.body.data.id } });
    expect(saved?.title).toBe('My Post');
  });

  it('rejects unauthenticated requests', async () => {
    await request(app).post('/api/posts').send({ title: 'Test' }).expect(401);
  });
});
\`\`\`

### Watch Out For
- Use a separate test database — never run integration tests against dev or production data
- Use \`beforeEach\` to clean state, not \`afterEach\` — if a test fails, afterEach won't run, leaving dirty data
- Integration tests are slower — keep them focused on critical paths; don't test every edge case at this level`,

  "testing::E2E tests": `**End-to-end tests simulate real user interactions in a browser — clicking buttons, filling forms, and navigating pages — to verify complete user flows work.**

### Why It Matters
Unit and integration tests can pass while a critical user flow is broken due to a misconfigured deployment or a CSS issue hiding a button. Stripe, Shopify, and GitHub run E2E tests on every deploy. Playwright (from Microsoft) is now the industry standard.

### How It Works
\`\`\`typescript
// playwright.config.ts
import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './e2e',
  baseURL: 'http://localhost:3000',
  use: { screenshot: 'only-on-failure', video: 'retain-on-failure' },
  webServer: { command: 'npm run dev', url: 'http://localhost:3000' },
});

// e2e/checkout.spec.ts
import { test, expect } from '@playwright/test';

test('user can complete a purchase', async ({ page }) => {
  await page.goto('/');
  await page.click('[data-testid="product-card"]:first-child');
  await page.click('button:has-text("Add to Cart")');
  await expect(page.locator('[data-testid="cart-count"]')).toHaveText('1');

  await page.click('[data-testid="checkout-btn"]');
  await page.fill('[name="email"]', 'test@example.com');
  await page.fill('[name="card-number"]', '4242424242424242');
  await page.fill('[name="expiry"]', '12/26');
  await page.fill('[name="cvc"]', '123');
  await page.click('button:has-text("Pay")');

  await expect(page).toHaveURL('/order-confirmation');
  await expect(page.locator('h1')).toContainText('Order Confirmed');
});
\`\`\`

### Watch Out For
- Keep the E2E suite small (20-50 tests for critical paths) — slow and flaky tests erode team trust
- Use \`data-testid\` or Playwright's \`getByRole\` for selectors — never CSS classes which change with redesigns
- Flaky tests must be fixed immediately — a flaky suite that developers ignore is worse than no suite`,

  "testing::Mocking": `**Mocking replaces real dependencies (databases, APIs, timers) with controlled fakes that return predetermined values, making tests fast, reliable, and independent.**

### Why It Matters
Without mocking, unit tests would call real APIs, hit real databases, and send real emails. Mocks make tests deterministic, fast, and safe to run anywhere.

### How It Works
\`\`\`typescript
import { vi, describe, it, expect, beforeEach } from 'vitest';

// Mock a module
vi.mock('../lib/email', () => ({
  sendEmail: vi.fn().mockResolvedValue({ success: true }),
}));

import { sendEmail } from '../lib/email';
import { UserService } from './UserService';

describe('UserService', () => {
  let service: UserService;
  beforeEach(() => {
    service = new UserService();
    vi.clearAllMocks(); // reset all mock call counts
  });

  it('sends welcome email after registration', async () => {
    const user = await service.register({
      email: 'alice@example.com', name: 'Alice', password: 'securepass'
    });

    expect(sendEmail).toHaveBeenCalledOnce();
    expect(sendEmail).toHaveBeenCalledWith({
      to: 'alice@example.com',
      subject: 'Welcome to the app!',
      template: 'welcome',
    });
    expect(user.id).toBeDefined();
  });
});

// Mock timers
vi.useFakeTimers();
setTimeout(() => doSomething(), 5000);
vi.advanceTimersByTime(5000);
expect(doSomething).toHaveBeenCalled();

// Spy on real implementations
const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
expect(spy).toHaveBeenCalledWith('Expected error message');
\`\`\`

### Watch Out For
- Over-mocking leads to tests that always pass regardless of what the code does — only mock external I/O, randomness, and time
- Always restore mocks with \`vi.clearAllMocks()\` in \`beforeEach\` — stale mocks cause mysterious failures
- Mocking internals of the unit under test defeats the purpose of the test`,

  "testing::Test coverage": `**Test coverage measures what percentage of your code is executed by your test suite — tracking which lines, branches, and functions have been tested.**

### Why It Matters
Coverage is a proxy metric, not a goal. Google and Stripe target 70-80%, not 100% — the last 20% is often error handling that costs more to test than it's worth. Coverage below 50% is a warning sign.

### How It Works
\`\`\`bash
# Run tests with coverage
npx vitest run --coverage

# Coverage report:
# File                | % Stmts | % Branch | % Funcs | % Lines |
# auth/jwt.ts         |   95.2  |   87.5   |  100.0  |   95.2  |
# utils/email.ts      |   45.3  |   30.0   |   60.0  |   45.3  | ← needs attention
\`\`\`

\`\`\`typescript
// vitest.config.ts — fail CI if coverage drops below thresholds
export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 70,    // branch coverage is hardest — lower threshold
        statements: 80,
      },
      exclude: [
        'node_modules/**', 'dist/**', '**/*.config.*',
        '**/migrations/**', '**/__tests__/**',
      ],
    },
  },
});
\`\`\`

**What to prioritize:**
- Branch coverage (every if/else path) > line coverage
- Critical business logic (payment, auth) → aim for 90%+
- UI components, config, simple getters → 50-70% is fine

### Watch Out For
- 100% coverage is not proof of good tests — coverage measures execution, not correctness
- Line coverage misses untested branches: \`if (a && b)\` with only \`a=true,b=true\` = 100% line, 0% branch coverage
- Use coverage as a map to find untested areas, not as a target to game`,

  "testing::TDD": `**Test-Driven Development (TDD) is a practice where you write a failing test first, then write minimum code to pass it, then refactor — the "red-green-refactor" cycle.**

### Why It Matters
Kent Beck invented TDD and it's practiced at companies like Pivotal and Thoughtworks. TDD forces you to think about API and behavior before implementation, leading to more testable, loosely-coupled code.

### How It Works
\`\`\`typescript
// STEP 1: RED — write a failing test (feature doesn't exist yet)
describe('PasswordValidator', () => {
  it('requires minimum 8 characters', () => {
    expect(validatePassword('short')).toEqual({
      valid: false, error: 'Password must be at least 8 characters'
    });
  });
  it('requires at least one uppercase letter', () => {
    expect(validatePassword('lowercase1!')).toEqual({
      valid: false, error: 'Password must contain an uppercase letter'
    });
  });
  it('accepts a valid password', () => {
    expect(validatePassword('SecurePass1!')).toEqual({ valid: true });
  });
});

// STEP 2: GREEN — minimum code to make tests pass
export function validatePassword(password: string) {
  if (password.length < 8) return { valid: false, error: 'Password must be at least 8 characters' };
  if (!/[A-Z]/.test(password)) return { valid: false, error: 'Password must contain an uppercase letter' };
  return { valid: true };
}

// STEP 3: REFACTOR — improve while keeping tests green
export function validatePassword(password: string) {
  const rules = [
    { test: (p: string) => p.length >= 8,     error: 'Password must be at least 8 characters' },
    { test: (p: string) => /[A-Z]/.test(p),   error: 'Password must contain an uppercase letter' },
    { test: (p: string) => /[0-9]/.test(p),   error: 'Password must contain a number' },
    { test: (p: string) => /[!@#$%]/.test(p), error: 'Password must contain a special character' },
  ];
  const failed = rules.find(r => !r.test(password));
  return failed ? { valid: false, error: failed.error } : { valid: true };
}
// Tests still pass — refactoring is safe because tests are the guard
\`\`\`

### Watch Out For
- TDD doesn't mean testing everything — it's a design tool for complex logic; trivial code doesn't benefit
- The "green" step must be as simple as possible — don't implement more than the failing test requires
- TDD works best for business logic and utilities; for UI and exploratory code, write tests after understanding the problem`,

  "testing::Testing React components": `**Testing React components means rendering them into a DOM, interacting as a user would, and asserting on what they display — using Testing Library's user-centric query API.**

### Why It Matters
React Testing Library (RTL) is now the de-facto standard for React component testing, replacing Enzyme. The core philosophy: test what the user sees and does, not implementation details.

### How It Works
\`\`\`typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, describe, it, expect } from 'vitest';
import { LoginForm } from './LoginForm';

describe('LoginForm', () => {
  it('renders email and password fields', () => {
    render(<LoginForm onSubmit={vi.fn()} />);
    expect(screen.getByRole('textbox', { name: /email/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('shows validation error when email is empty', async () => {
    const user = userEvent.setup();
    render(<LoginForm onSubmit={vi.fn()} />);
    await user.click(screen.getByRole('button', { name: /sign in/i }));
    expect(screen.getByText('Email is required')).toBeInTheDocument();
  });

  it('calls onSubmit with credentials when valid', async () => {
    const onSubmit = vi.fn();
    const user = userEvent.setup();
    render(<LoginForm onSubmit={onSubmit} />);

    await user.type(screen.getByLabelText(/email/i), 'alice@example.com');
    await user.type(screen.getByLabelText(/password/i), 'SecurePass1!');
    await user.click(screen.getByRole('button', { name: /sign in/i }));

    expect(onSubmit).toHaveBeenCalledWith({
      email: 'alice@example.com',
      password: 'SecurePass1!',
    });
  });
});
\`\`\`

### Watch Out For
- Prefer \`getByRole\`, \`getByLabelText\`, \`getByText\` over \`data-testid\` — they test accessibility simultaneously
- Use \`@testing-library/user-event\` not \`fireEvent\` — \`userEvent\` simulates real browser events including focus and keyboard events
- Avoid testing implementation details — if you change how a component works internally but the UX is the same, tests should not break`,
};