// Expanded problem and solution copy for each open-source tool. Written only from the
// description and highlights in portfolioData.js (OPEN_SOURCE_TOOLS). Shown on the tool's own page.
export const OPEN_SOURCE_STORIES = {
  'spec-forge': {
    audience: 'Product managers and tech leads turning customer conversations into specs.',
    problemDetail:
      'Customer discovery produces rich notes, but turning them into a PRD, user stories and tickets is slow, and details get lost on the way.',
    solutionDetail:
      'A three-stage agent pipeline converts discovery calls into a master PRD, Gherkin BDD user stories, and Linear or GitHub tickets. A discovery switcher lets you test three scenarios, and one-click export produces Markdown or Jira files.',
  },
  'context-prism': {
    audience: 'Teams running AI coding assistants or LLM features who need to control inference cost.',
    problemDetail:
      'LLM bills grow with every token sent, and much of the context an agent sends is code it does not need for the task at hand.',
    solutionDetail:
      'An AST-based pruner compresses TypeScript and Python context, cutting it by about 85% in the reference runs. Task-aware model routing sends simpler work to cheaper models, and a semantic cache answers repeat queries at zero cost. An ROI calculator shows the saving.',
  },
  'tictac-court': {
    audience: 'Anyone curious about LLM-driven game mechanics, playable in the browser.',
    problemDetail:
      'Tic-Tac-Toe is a solved game. With perfect play it always ends in a draw, which makes it a poor game to play against an AI.',
    solutionDetail:
      'Players argue their way to a win by persuading an AI arbiter in plain English. Three arbiter personalities (Strict, Comedian, Merciful) rule differently, dynamic board changes keep it fresh, and an infinite Sudden Death protocol guarantees a winner.',
  },
  'brain-gym': {
    audience: 'Professionals who want to keep their reasoning sharp while using AI every day.',
    problemDetail:
      'When AI does the thinking, everyday reasoning can get weaker. Few people practise the mental skills that generative tools make easy to skip.',
    solutionDetail:
      'Short daily sessions combine Fermi estimation drills, Hallucination Hunter logic audits, and spatial Memory Fortress exercises. A 15-level progression map tracks improvement, and the judges run offline, so there is no server to wait on.',
  },
  'roast-hub': {
    audience: 'Founders and developers who want a laugh, and a shareable critique of their pitch or stack.',
    problemDetail:
      'Pitches and tech stacks are often polished rather than challenged. RoastHub takes a playful, deliberately harsh look instead.',
    solutionDetail:
      'The roaster runs entirely in your browser. A comedy engine of 300-plus procedural heuristics works offline, an optional AI Turbo mode uses your own key, and a thermal-receipt exporter makes results easy to share on X, LinkedIn and Reddit.',
  },
  'reverse-ui': {
    audience: 'Frontend developers who want to reuse a UI pattern they have seen on the web.',
    problemDetail:
      'Rebuilding a UI snippet or CSS animation as clean React code usually means rewriting it by hand, with the structure and motion lost along the way.',
    solutionDetail:
      'A four-stage decompiler pipeline turns HTML, CSS, minified DOM and cubic-bezier curves into React 18, Tailwind CSS and Framer Motion components in under 5 ms. It runs entirely in the browser, and a bookmarklet lets you click any element on a page to pick it.',
  },
};
