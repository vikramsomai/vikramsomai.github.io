const BLOGS_DATA = [
  {
    id: "future-of-web-dev-2026",
    title: "The Future of Web Development: Beyond React and Angular",
    category: "tech",
    date: "August 6, 2026",
    readTime: "5 min read",
    excerpt: "Explore how frameworks like SolidJS, Qwik, and Astro are redefining web performance, server-first rendering, and why standard hydration patterns are shifting.",
    content: `# The Future of Web Development: Beyond React and Angular

Web development is changing rapidly. For years, **React** and **Angular** have dominated the ecosystem. However, a new wave of frameworks is challenging the status quo by focusing on runtime performance, bundle sizes, and native browser capabilities.

Here is a breakdown of why the paradigm is shifting and what you should watch out for.

## 1. The Hydration Problem
Traditional Single Page Applications (SPAs) send a huge bundle of JavaScript to the client. The browser must download, parse, and execute this bundle to make the static HTML page interactive. This process is called **hydration**.

On mobile devices, hydration can block the main thread for seconds, causing a poor **Interaction to Next Paint (INP)** score.

## 2. Resumability: The Qwik Approach
Instead of hydration, frameworks like **Qwik** introduce *resumability*. Qwik serializes the execution state of the application into the HTML itself. 

When the user interacts with a button:
- Only the specific event handler's JavaScript is fetched and executed.
- There is **zero initial execution cost** for the page.

\`\`\`javascript
// Qwik component example
import { component$, useSignal } from '@builder.io/qwik';

export default component$(() => {
  const count = useSignal(0);
  return (
    <button onClick$={() => count.value++}>
      Count: {count.value}
    </button>
  );
});
\`\`\`

## 3. Fine-Grained Reactivity (SolidJS)
Unlike React, which re-renders the entire component tree on state changes, **SolidJS** uses fine-grained reactivity. It compiles components down to direct DOM updates, meaning only the exact element containing the modified data updates.

> **Key takeaway**: SolidJS matches the raw speed of Vanilla JS while maintaining a declarative JSX syntax.

## Summary Checklist
- [x] Investigate Server Components
- [x] Test out island architecture in Astro
- [ ] Implement fine-grained reactive stores in production apps

Are you ready to move beyond traditional frameworks? Try rebuilding a small project in Astro or SolidJS and witness the performance differences firsthand!`
  },
  {
    id: "mastering-glassmorphism",
    title: "Mastering Glassmorphism: Building Premium UI Components",
    category: "design",
    date: "August 5, 2026",
    readTime: "4 min read",
    excerpt: "Learn the secrets behind premium glassmorphic interfaces: stacking order, subtle gradient borders, backdrop-filters, and light reflection strategies.",
    content: `# Mastering Glassmorphism: Building Premium UI Components

Glassmorphism has become a staple of premium modern web interfaces (including this portfolio!). Done right, it creates an elegant sense of depth and hierarchy. Done wrong, it looks muddy, unreadable, and cheap.

Here is how to master the glassmorphic style using Tailwind CSS and Vanilla CSS.

## The Core Ingredients
To create a realistic frosted glass effect, you need four key layers:

1. **A Vibrant Background**: Glass relies on refraction. Put colorful, blurred abstract blobs behind your panels.
2. **Semi-transparent Fill**: Use a white or dark overlay with high transparency (e.g., \`rgba(255, 255, 255, 0.03)\` or \`rgba(0, 0, 0, 0.4)\`).
3. **Backdrop Blur**: Use the \`backdrop-filter: blur(12px)\` property to diffuse the background.
4. **Thin Border Accent**: A subtle 1px border that simulates light reflecting off the glass edge.

## CSS Implementation
Here is the clean CSS recipe for a premium glass card:

\`\`\`css
.premium-glass-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px); /* Safari support */
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
  transition: all 0.3s ease;
}

.premium-glass-card:hover {
  border-color: rgba(16, 185, 129, 0.3); /* Theme color border glow */
  box-shadow: 0 12px 40px -10px rgba(16, 185, 129, 0.15);
  transform: translateY(-4px);
}
\`\`\`

## Common Pitfalls to Avoid
- **Too opaque background**: If your background alpha is higher than \`0.1\`, the glass effect disappears.
- **No border**: Without a border, the glass blends into the background blobs, losing its shape.
- **Ignoring accessibility**: Ensure your text contrast remains high. Use bold headers and pure white text (\`#ffffff\`) on dark glass cards.`
  },
  {
    id: "portfolio-optimization",
    title: "How I Optimized My Portfolio Loading Speed by 40%",
    category: "development",
    date: "August 4, 2026",
    readTime: "3 min read",
    excerpt: "A deep dive case study into how lazy-loading assets, deferred script executions, font optimization, and reducing repaint regions led to a 99 Lighthouse score.",
    content: `# How I Optimized My Portfolio Loading Speed by 40%

Performance is user experience. When users land on your portfolio, every millisecond counts. A slow-loading portfolio screams amateur.

Here is the step-by-step optimization strategy I used to make this portfolio load almost instantly.

## The Strategy

### 1. Eliminating Render-Blocking Scripts
By default, scripts loaded in the head section block the parser. I added \`defer\` or moved non-critical scripts to the bottom of the body.
Additionally, I loaded custom developer tools and terminal scripts only when requested by the DOM.

### 2. Font Loading Optimization
Google Fonts can introduce noticeable layout shifts (**Cumulative Layout Shift** or CLS). I used the following optimizations:
- Added \`preconnect\` hints for Google Fonts.
- Used \`display=swap\` in the query parameter to ensure immediate rendering with system fallbacks.

\`\`\`html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet" />
\`\`\`

### 3. CSS Transition Hardware Acceleration
Complex animations like our mouse follower trail can lag if not optimized. I forced GPU rendering using \`translate3d\` instead of updating \`top\` / \`left\` styles directly:

\`\`\`javascript
// Bad: causes repaints
blob.style.left = curX + "px";
blob.style.top = curY + "px";

// Good: hardware accelerated
blob.style.transform = \`translate3d(\${curX}px, \${curY}px, 0)\`;
\`\`\`

## The Results
- **First Contentful Paint (FCP)**: Down from 1.4s to 0.7s.
- **Largest Contentful Paint (LCP)**: Down from 2.2s to 1.1s.
- **Lighthouse Performance Score**: Improved from 74 to 99.`
  },
  {
    id: "clean-architecture-nodejs",
    title: "Why Clean Architecture is a Game Changer for Node.js",
    category: "development",
    date: "August 3, 2026",
    readTime: "6 min read",
    excerpt: "Stop mixing database queries in your controllers. Discover how to apply separation of concerns with Use Cases, Entities, and Interface Adapters.",
    content: `# Why Clean Architecture is a Game Changer for Node.js

Many Node.js codebases start simple but quickly degenerate into an unmaintainable "spaghetti" of database queries, business logic, and Express route controllers. 

By applying Robert C. Martin's **Clean Architecture**, we can build software that is independent of frameworks, databases, and UI layers.

## The Dependency Rule
The core principle of Clean Architecture is the **Dependency Rule**: *Source code dependencies must point inwards, towards policy and business logic.*

\`\`\`
   ┌──────────────────────────────────────────────┐
   │                  Frameworks                  │
   │    ┌────────────────────────────────────┐    │
   │    │             Controllers            │    │
   │    │    ┌──────────────────────────┐    │    │
   │    │    │        Use Cases         │    │    │
   │    │    │    ┌────────────────┐    │    │    │
   │    │    │    │    Entities    │    │    │    │
   │    │    │    └────────────────┘    │    │    │
   │    │    └──────────────────────────┘    │    │
   │    └────────────────────────────────────┘    │
   └──────────────────────────────────────────────┘
\`\`\`

- **Entities**: Business objects (e.g. User, Project, Article).
- **Use Cases**: Application-specific business rules (e.g. CreateBlogPost, RegisterUser).
- **Controllers / Presenters**: Map HTTP requests to use case inputs, and format outputs.
- **Frameworks & Drivers**: Express.js, Fastify, Mongoose, PostgreSQL driver, etc.

## Code Example: Create Blog Post
Here is how the inward-pointing dependencies work in code.

### 1. The Entity
\`\`\`javascript
class BlogPost {
  constructor(title, content, date) {
    if (!title) throw new Error("Title is required");
    this.title = title;
    this.content = content;
    this.date = date || new Date();
  }
}
\`\`\`

### 2. The Use Case (No database or Express imports!)
\`\`\`javascript
class CreateBlogPost {
  constructor(blogRepository) {
    this.blogRepository = blogRepository;
  }

  async execute(blogData) {
    const post = new BlogPost(blogData.title, blogData.content);
    return await this.blogRepository.save(post);
  }
}
\`\`\`

By mocking the \`blogRepository\` interface, we can test this business logic instantly without spinning up MongoDB or MySQL. This separation makes your code testable, maintainable, and robust against changes.`
  }
];
