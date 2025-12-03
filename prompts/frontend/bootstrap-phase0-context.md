# Phase 0: Context Discovery (Frontend)

**⚡ AUTOMATED ANALYSIS - Minimal User Input Required**

This phase automatically analyzes your existing frontend codebase to pre-populate answers for the bootstrap questionnaire.

---

## 🎯 Objective

Detect the current frontend stack, architecture patterns, and configuration from existing code to:

1. **Skip redundant questions** - Don't ask what can be detected
2. **Validate assumptions** - Confirm detected patterns with user
3. **Save time** - Reduce questionnaire from ~90 min to ~40 min
4. **Maintain accuracy** - User can override any detection

---

## 📋 Detection Layers (Progressive)

### Layer 0: Cache Check (0-2 seconds)

Check if `.ai-bootstrap/cache/frontend-context.json` exists and is fresh (<7 days old).

**If found:**
```json
{
  "framework": "React",
  "frameworkVersion": "18.2.0",
  "buildTool": "Vite",
  "typescript": true,
  "stateManagement": "Zustand",
  "styling": "Tailwind CSS",
  "componentPattern": "Atomic Design",
  "lastAnalyzed": "2025-01-20T10:30:00Z"
}
```

**Action:** Ask user: "Found cached analysis from X days ago. Use it? (Y/n)"

**If yes:** Skip to validation step

**If no or cache doesn't exist:** Proceed to Layer 1

---

### Layer 1: Fast Metadata Scan (10-20 seconds)

**Purpose:** Detect framework, build tool, package manager, TypeScript

#### Files to Check

1. **package.json** (REQUIRED)
2. **vite.config.* / webpack.config.* / angular.json** (build tool)
3. **tsconfig.json** (TypeScript)
4. **tailwind.config.* / postcss.config.*** (styling)

#### Detection Logic

```typescript
// 1. Read package.json
const pkg = JSON.parse(await fs.readFile('package.json', 'utf-8'));

// 2. Detect UI Framework
const framework =
  pkg.dependencies?.react ? 'React' :
  pkg.dependencies?.vue ? 'Vue' :
  pkg.dependencies?.['@angular/core'] ? 'Angular' :
  pkg.dependencies?.svelte ? 'Svelte' :
  pkg.dependencies?.['solid-js'] ? 'Solid' :
  null;

// 3. Detect Meta-Framework
const metaFramework =
  pkg.dependencies?.next ? 'Next.js' :
  pkg.dependencies?.nuxt ? 'Nuxt' :
  pkg.dependencies?.['@analogjs/platform'] ? 'Analog' :
  pkg.dependencies?.['@sveltejs/kit'] ? 'SvelteKit' :
  pkg.dependencies?.['solid-start'] ? 'Solid Start' :
  null;

// 4. Detect Build Tool
const buildTool =
  await fs.exists('vite.config.ts') || await fs.exists('vite.config.js') ? 'Vite' :
  await fs.exists('webpack.config.js') ? 'Webpack' :
  await fs.exists('angular.json') ? 'Angular CLI' :
  await fs.exists('rollup.config.js') ? 'Rollup' :
  metaFramework ? `${metaFramework} (built-in)` :
  'Unknown';

// 5. Detect TypeScript
const typescript = await fs.exists('tsconfig.json');

// 6. Detect State Management
const stateManagement =
  pkg.dependencies?.zustand ? 'Zustand' :
  pkg.dependencies?.['@reduxjs/toolkit'] ? 'Redux Toolkit' :
  pkg.dependencies?.pinia ? 'Pinia' :
  pkg.dependencies?.['@ngrx/store'] ? 'NgRx' :
  pkg.dependencies?.xstate ? 'XState' :
  null;

// 7. Detect Data Fetching
const dataFetching =
  pkg.dependencies?.['@tanstack/react-query'] || pkg.dependencies?.['@tanstack/vue-query'] ? 'TanStack Query' :
  pkg.dependencies?.swr ? 'SWR' :
  pkg.dependencies?.['@apollo/client'] ? 'Apollo Client' :
  pkg.dependencies?.['@urql/core'] ? 'urql' :
  null;

// 8. Detect Styling
const styling =
  pkg.devDependencies?.tailwindcss || pkg.dependencies?.tailwindcss ? 'Tailwind CSS' :
  pkg.dependencies?.['styled-components'] ? 'Styled Components' :
  pkg.dependencies?.['@emotion/react'] ? 'Emotion' :
  await fs.exists('*.module.css') ? 'CSS Modules' :
  pkg.dependencies?.sass || pkg.devDependencies?.sass ? 'Sass/SCSS' :
  null;

// 9. Detect Component Library
const componentLibrary =
  pkg.dependencies?.['@mui/material'] ? 'Material UI' :
  pkg.dependencies?.['@chakra-ui/react'] ? 'Chakra UI' :
  pkg.dependencies?.antd ? 'Ant Design' :
  pkg.dependencies?.vuetify ? 'Vuetify' :
  pkg.dependencies?.['@angular/material'] ? 'Angular Material' :
  pkg.dependencies?.['@shadcn/ui'] ? 'shadcn/ui' :
  null;

// 10. Detect Testing
const unitTest =
  pkg.devDependencies?.vitest ? 'Vitest' :
  pkg.devDependencies?.jest ? 'Jest' :
  pkg.devDependencies?.['@jest/core'] ? 'Jest' :
  null;

const e2eTest =
  pkg.devDependencies?.['@playwright/test'] ? 'Playwright' :
  pkg.devDependencies?.cypress ? 'Cypress' :
  pkg.devDependencies?.puppeteer ? 'Puppeteer' :
  null;
```

#### Layer 1 Output

```
✅ DETECTED:

Framework: React 18.2.0 (with Next.js 14.0.0)
Build Tool: Vite 5.0.0
TypeScript: Yes
State Management: Zustand 4.4.0
Data Fetching: TanStack Query 5.0.0
Styling: Tailwind CSS 3.3.0
Component Library: None
Testing: Vitest + Playwright

Continue to Layer 2 for structural analysis? (Y/n)
```

---

### Layer 2: Structural Analysis (30-90 seconds)

**Purpose:** Analyze component structure, routing, and architecture patterns

#### Files to Analyze

- **Component files:** `src/**/*.{jsx,tsx,vue,svelte}`
- **Routes:** `src/routes/**`, `src/pages/**`, `app/**`
- **Store files:** `src/store/**`, `src/state/**`
- **Config files:** `src/config/**`

#### Detection Patterns

```typescript
// 1. Component Pattern Detection
const componentPattern = detectComponentPattern(srcFiles);

function detectComponentPattern(files: string[]): string {
  const hasAtomic = files.some(f =>
    f.includes('/atoms/') || f.includes('/molecules/') || f.includes('/organisms/')
  );
  const hasFeatures = files.some(f => f.includes('/features/'));
  const hasDomains = files.some(f => f.includes('/domains/'));
  const hasPages = files.some(f => f.includes('/pages/'));

  if (hasAtomic) return 'Atomic Design';
  if (hasFeatures) return 'Feature-based';
  if (hasDomains) return 'Domain-driven';
  if (hasPages) return 'Pages-based';
  return 'Flat';
}

// 2. Routing Strategy
const routingStrategy = detectRouting(srcFiles);

function detectRouting(files: string[]): string {
  const hasAppDir = files.some(f => f.startsWith('app/'));
  const hasPagesDir = files.some(f => f.startsWith('pages/'));
  const hasSrcRoutes = files.some(f => f.includes('/routes/'));

  if (hasAppDir) return 'App Router (Next.js 13+)';
  if (hasPagesDir) return 'Pages Router';
  if (hasSrcRoutes) return 'File-based routing';

  // Check for react-router/vue-router in code
  const hasReactRouter = files.some(f => {
    const content = fs.readFileSync(f, 'utf-8');
    return content.includes('react-router-dom');
  });

  if (hasReactRouter) return 'React Router (code-based)';
  return 'Unknown';
}

// 3. API Integration Pattern
const apiPattern = detectAPIPattern(srcFiles);

function detectAPIPattern(files: string[]): string {
  const hasApiDir = files.some(f => f.includes('/api/'));
  const hasServicesDir = files.some(f => f.includes('/services/'));
  const hasHooksDir = files.some(f => f.includes('/hooks/use') && f.includes('query'));

  if (hasHooksDir) return 'Custom hooks with TanStack Query';
  if (hasServicesDir) return 'Service layer pattern';
  if (hasApiDir) return 'API client pattern';
  return 'Unknown';
}

// 4. Component Examples (Extract 2-3 representative components)
const componentExamples = extractComponentExamples(srcFiles);

function extractComponentExamples(files: string[]): Component[] {
  // Find 2-3 well-structured components
  const candidates = files.filter(f => {
    const content = fs.readFileSync(f, 'utf-8');
    return content.includes('export') && content.length > 50 && content.length < 500;
  });

  return candidates.slice(0, 3).map(file => ({
    name: path.basename(file, path.extname(file)),
    path: file,
    snippet: fs.readFileSync(file, 'utf-8').slice(0, 200)
  }));
}
```

#### Layer 2 Output

```
✅ ARCHITECTURE DETECTED:

Component Pattern: Atomic Design
  - atoms/: 12 components
  - molecules/: 23 components
  - organisms/: 8 components

Routing: App Router (Next.js 13+)
  - app/: 15 routes
  - Dynamic routes: 5

API Integration: Custom hooks with TanStack Query
  - hooks/useQuery*.ts: 8 hooks
  - services/api.ts: REST client

Example Components:
  1. atoms/Button.tsx (56 lines) - Reusable button with variants
  2. molecules/UserCard.tsx (89 lines) - User card with avatar
  3. organisms/ProductGrid.tsx (124 lines) - Product grid with pagination

Continue to Layer 3 for deep analysis? (Y/n)
```

---

### Layer 3: Selective Deep Analysis (Optional, 60-120 seconds)

**Purpose:** Extract advanced patterns, conventions, and documentation

**Only proceed if:**
- User confirms (not automatic)
- Project is large (>50 components)
- Accuracy is critical

#### Advanced Detection

```typescript
// 1. Naming Conventions
const namingConvention = analyzeNamingPatterns(srcFiles);

function analyzeNamingPatterns(files: string[]): NamingConvention {
  const componentNames = files.map(f => path.basename(f, path.extname(f)));

  const pascalCase = componentNames.filter(n => /^[A-Z][a-zA-Z0-9]*$/.test(n)).length;
  const camelCase = componentNames.filter(n => /^[a-z][a-zA-Z0-9]*$/.test(n)).length;
  const kebabCase = componentNames.filter(n => /^[a-z][a-z0-9-]*$/.test(n)).length;

  const dominant = Math.max(pascalCase, camelCase, kebabCase);

  return {
    files: dominant === kebabCase ? 'kebab-case' : 'PascalCase',
    components: dominant === pascalCase ? 'PascalCase' : 'camelCase',
    hooks: files.some(f => f.includes('use')) ? 'use* (hooks)' : 'N/A'
  };
}

// 2. Code Quality Patterns
const qualityPatterns = analyzeQualityPatterns(srcFiles);

function analyzeQualityPatterns(files: string[]): QualityPatterns {
  let hasTypeScript = 0;
  let hasPropTypes = 0;
  let hasTests = 0;
  let hasStories = 0;

  files.forEach(file => {
    if (file.endsWith('.ts') || file.endsWith('.tsx')) hasTypeScript++;
    const content = fs.readFileSync(file, 'utf-8');
    if (content.includes('PropTypes')) hasPropTypes++;
  });

  const testFiles = files.filter(f => f.includes('.test.') || f.includes('.spec.'));
  hasTests = testFiles.length;

  const storyFiles = files.filter(f => f.includes('.stories.'));
  hasStories = storyFiles.length;

  return {
    typeScriptCoverage: (hasTypeScript / files.length) * 100,
    propTypesUsage: hasPropTypes > 0,
    testCoverage: `${hasTests} test files`,
    storybookUsage: hasStories > 0
  };
}

// 3. Accessibility Patterns
const a11yPatterns = analyzeAccessibility(srcFiles);

function analyzeAccessibility(files: string[]): A11yPatterns {
  let ariaUsage = 0;
  let semanticHTML = 0;

  files.forEach(file => {
    const content = fs.readFileSync(file, 'utf-8');
    if (content.includes('aria-')) ariaUsage++;
    if (content.includes('<button') || content.includes('<nav') || content.includes('<header')) {
      semanticHTML++;
    }
  });

  return {
    ariaAttributesUsage: ariaUsage > files.length * 0.2 ? 'Frequent' : 'Rare',
    semanticHTMLUsage: semanticHTML > files.length * 0.5 ? 'Good' : 'Needs improvement'
  };
}
```

#### Layer 3 Output

```
✅ DEEP ANALYSIS COMPLETE:

Naming Conventions:
  - Files: PascalCase
  - Components: PascalCase
  - Hooks: use* prefix

Code Quality:
  - TypeScript: 95% coverage
  - PropTypes: Not used (TypeScript instead)
  - Tests: 48 test files (60% coverage)
  - Storybook: Yes (23 stories)

Accessibility:
  - ARIA attributes: Frequent usage
  - Semantic HTML: Good usage
  - Recommended: WCAG 2.1 AA compliance

Analysis complete! Proceeding to validation...
```

---

## ✅ Validation & Confirmation

### Present Findings

After detection, show user a summary and ask for confirmation:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔍 FRONTEND STACK DETECTED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Framework: React 18.2.0 (with Next.js 14.0.0)
✅ Build Tool: Vite 5.0.0
✅ TypeScript: Yes
✅ State Management: Zustand 4.4.0
✅ Data Fetching: TanStack Query 5.0.0
✅ Styling: Tailwind CSS 3.3.0
✅ Component Pattern: Atomic Design
✅ Testing: Vitest + Playwright
✅ Routing: App Router (Next.js 13+)
✅ Component Library: None

Is this correct? (Y/n)
```

### If User Says "Yes"

```
✅ Great! I'll use these detected values.

I'll still ask you questions for:
  - Business requirements (Phase 1)
  - Specific conventions and preferences
  - Performance targets
  - Deployment strategy

This will reduce the questionnaire from ~90 min to ~40 min.

Proceed to Phase 1? (Y/n)
```

### If User Says "No" or Makes Corrections

```
Please correct any incorrect detections:

1. Framework: React 18.2.0 → (Enter new value or press Enter to keep)
2. State Management: Zustand → (Enter new value or press Enter to keep)
...

(After corrections)

✅ Updated! Proceeding to Phase 1...
```

---

## 💾 Cache Storage

Save detected context for future use:

```typescript
// .ai-bootstrap/cache/frontend-context.json
{
  "framework": "React",
  "frameworkVersion": "18.2.0",
  "metaFramework": "Next.js",
  "metaFrameworkVersion": "14.0.0",
  "buildTool": "Vite",
  "buildToolVersion": "5.0.0",
  "typescript": true,
  "stateManagement": "Zustand",
  "dataFetching": "TanStack Query",
  "styling": "Tailwind CSS",
  "componentLibrary": null,
  "componentPattern": "Atomic Design",
  "routing": "App Router",
  "unitTest": "Vitest",
  "e2eTest": "Playwright",
  "namingConvention": "PascalCase",
  "testCoverage": 60,
  "a11yCompliance": "WCAG 2.1 AA",
  "lastAnalyzed": "2025-01-20T10:30:00Z",
  "projectPath": "/Users/username/my-app"
}
```

**Cache invalidation:** 7 days or when package.json is modified

---

## 🚀 Next Steps

After Phase 0 completes:

```
✅ Context analysis complete!

Next: Proceed to Phase 1 (Discovery & UX)

Read: .ai-bootstrap/prompts/frontend/bootstrap-phase1-discovery.md
```

---

**Last Updated:** 2025-01-XX

**Version:** 1.2.0
