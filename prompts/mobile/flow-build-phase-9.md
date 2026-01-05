## PHASE 9: Implementation Roadmap (Mobile) (5-10 min)

> **Order for this phase:** OPTIONAL. Executed after Phase 8 or on demand.

### Objective
Translate all UX/UI and architectural specifications into a prioritized implementation plan (Roadmap) focused on Mobile development.

## Context Variables (Extract from docs)

// turbo
**Before generating tasks, extract these from project documentation:**

```
From ai-instructions.md:
├── LANG: {{LANGUAGE}}           # e.g., TypeScript, Dart, Swift, Kotlin
├── FRAMEWORK: {{FRAMEWORK}}     # e.g., React Native, Flutter, Native
├── SRC: {{SOURCE_DIR}}          # e.g., src/, lib/
└── TESTS: {{TEST_DIR}}          # e.g., tests/, __tests__/, spec/

From docs/architecture.md & navigation.md:
├── COMP_DIR: {{COMPONENTS_PATH}} # e.g., components/, widgets/
├── SCREEN_DIR: {{SCREENS_PATH}}  # e.g., screens/, pages/
├── NAV_DIR: {{NAV_PATH}}         # e.g., navigation/, router/
└── STORE_DIR: {{STORE_PATH}}     # e.g., store/, state/, provider/
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
| [U] | UI/Comp    | Reusable components/widgets        | 1 SP     |
| [P] | Screen     | Screen layout & logic              | 1-2 SP   |
| [N] | Nav        | Navigation setup, deep links       | 1 SP     |
| [S] | State/Data | State management, local storage    | 1-2 SP   |
| [F] | Native/Feat| Permissions, native modules, SDKs  | 1-2 SP   |
| [T] | Test       | Unit, integration, e2e tests       | 1-2 SP   |
| [D] | Docs       | Documentation updates              | 1 SP     |

---

## Workflow: 6 Steps

// turbo
### Step 9.1: Extract Context & Inventory

**1. Extract context variables.**
**2. Extract inventory (Screens, Components, Permissions).**

### Step 9.2: Coverage Matrix
Ensure every Screen/Feature has: [P], [U], [S], [F], [T], [D].

### Step 9.3: Epic Definition
EP-000: Foundation (Platform setup, Navigation config)
EP-001: Core UI & Theme
EP-002: Main User Journeys
EP-ZZZ: Store Preparation & Deployment

### Step 9.4: Task Generation

### Step 9.5: Validate Coverage

## Architectural Markers Key

| Marker | Name | Description |
|--------|------|-------------|
| **[U]** | UI/Comp | Reusable components/widgets |
| **[P]** | Screen | Screen layout & logic |
| **[N]** | Nav | Navigation setup, deep links |
| **[S]** | State/Data | State management, local storage |
| **[F]** | Native/Feat | Permissions, native modules, SDKs |
| **[T]** | Test | Unit, integration, e2e tests |
| **[D]** | Docs | Documentation updates |

---

### Step 9.6: Generate Document (planning/roadmap.md)

---
_Version: 4.2 (Antigravity Optimized)_
_Last Updated: 2025-12-21_
