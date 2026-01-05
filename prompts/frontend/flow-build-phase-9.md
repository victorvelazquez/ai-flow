## PHASE 9: Implementation Roadmap (Frontend) (5-10 min)

> **Order for this phase:** OPTIONAL. Executed after Phase 8 or on demand.

### Objective
Translate all UX/UI and architectural specifications into a prioritized, actionable implementation plan (Roadmap) with clear milestones and tasks focused on Frontend development.

## Context Variables (Extract from docs)

// turbo
**Before generating tasks, extract these from project documentation:**

```
From ai-instructions.md:
├── LANG: {{LANGUAGE}}           # e.g., TypeScript, JavaScript
├── FRAMEWORK: {{FRAMEWORK}}     # e.g., React, Next.js, Vue, Nuxt, Svelte, Angular
├── SRC: {{SOURCE_DIR}}          # e.g., src/, app/, lib/
├── TESTS: {{TESTS_DIR}}         # e.g., tests/, __tests__/, spec/
└── STYLE: {{STYLING_APPROACH}}  # e.g., Tailwind, CSS Modules, Styled Components

From docs/architecture.md & ui-structure.md:
├── COMP_DIR: {{COMPONENTS_PATH}} # e.g., components/, src/components/
├── PAGE_DIR: {{PAGES_PATH}}      # e.g., pages/, app/, src/views/
├── STORE_DIR: {{STORE_PATH}}     # e.g., store/, state/, context/
├── HOOKS_DIR: {{HOOKS_PATH}}     # e.g., hooks/, composables/
└── ASSETS_DIR: {{ASSETS_PATH}}   # e.g., assets/, public/
```

---

## Task Format (MANDATORY)

```
- [ ] TXXX [CAT] Description • 1 SP → {{path}} | deps: TXXX
```

---

## Categories [CAT]

| Cat | Name       | Description                        | SP Range |
|-----|------------|------------------------------------|----------|
| [U] | UI/Comp    | Atoms, Molecules, Organisms        | 1 SP     |
| [P] | Page       | Page layout, route implementation  | 1-2 SP   |
| [L] | Logic/Hook | Custom hooks, business logic       | 1 SP     |
| [S] | State      | Store actions, reducers, context   | 1 SP     |
| [A] | API/Data   | Fetching, services, transformers   | 1-2 SP   |
| [T] | Test       | Unit, component, e2e tests         | 1-2 SP   |
| [D] | Docs       | Documentation updates              | 1 SP     |

---

## Workflow: 6 Steps

// turbo
### Step 9.1: Extract Context & Inventory

**1. Extract context variables from documentation.**
**2. Extract inventory (Components, Pages, API endpoints).**

### Step 9.2: Coverage Matrix
Ensure every Page/Feature has: [U], [L], [S], [A], [T], [D] as needed.

### Step 9.3: Epic Definition
EP-000: Foundation (Layout, Theme, Store config)
EP-001: Component Library / Atoms
EP-002: Core Features (Login, Dashboard, etc.)
EP-ZZZ: Operations & PWA

### Step 9.4: Task Generation
Generate atomic tasks using the `{{VARIABLE}}` paths.

### Step 9.5: Validate Coverage
Check for gaps.

## Architectural Markers Key

| Marker | Name | Description |
|--------|------|-------------|
| **[U]** | UI/Comp | Atoms, Molecules, Organisms |
| **[P]** | Page | Page layout, route implementation |
| **[L]** | Logic/Hook | Custom hooks, business logic |
| **[S]** | State | Store actions, reducers, context |
| **[A]** | API/Data | Fetching, services, transformers |
| **[T]** | Test | Unit, component, e2e tests |
| **[D]** | Docs | Documentation updates |

---

### Step 9.6: Generate Document (planning/roadmap.md)

---
_Version: 4.2 (Antigravity Optimized)_
_Last Updated: 2025-12-21_
