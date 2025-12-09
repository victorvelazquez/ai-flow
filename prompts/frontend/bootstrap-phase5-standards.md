# Phase 5: Code Standards & Best Practices

**Duration:** 15-20 minutes
**Questions:** ~10 questions
**Output:** docs/code-standards.md, parts of ai-instructions.md

---

## 🎯 Objective

Define coding conventions and standards:

1. File and component naming conventions
2. Code formatting and linting rules
3. Import organization
4. Commit message standards
5. Code review practices

---

## 📋 Questions

### Question 5.1: File Naming Convention

**How will you name your files?**

#### React/Solid

A) ⭐ **PascalCase for components** (Recommended)
   - Components: `UserProfile.tsx`, `Button.tsx`
   - Hooks: `useAuth.ts`, `useLocalStorage.ts`
   - Utils: `formatDate.ts`, `apiClient.ts`
   - Best for: React ecosystem standard

B) **kebab-case for all files**
   - Components: `user-profile.tsx`, `button.tsx`
   - Best for: Consistency with Vue/Angular

C) **camelCase for all files**
   - Components: `userProfile.tsx`, `button.tsx`
   - Best for: JavaScript naming conventions

#### Vue

A) ⭐ **PascalCase for components** (Vue 3 recommended)
   - Components: `UserProfile.vue`, `BaseButton.vue`
   - Composables: `useAuth.ts`, `useLocalStorage.ts`
   - Utils: `formatDate.ts`

B) **kebab-case (Vue 2 style)**
   - Components: `user-profile.vue`, `base-button.vue`

#### Angular

A) ⭐ **kebab-case with suffixes** (Angular standard)
   - Components: `user-profile.component.ts`
   - Services: `auth.service.ts`
   - Modules: `user.module.ts`
   - Guards: `auth.guard.ts`

#### Svelte

A) ⭐ **PascalCase for components**
   - Components: `UserProfile.svelte`, `Button.svelte`

**Your answer:**

---

### Question 5.2: Component Naming Convention

**How will you name components in code?**

A) ⭐ **PascalCase** (All frameworks recommend)
   - Example: `<UserProfile />`, `<Button />`
   - Best for: Standard practice

B) **Named exports vs default exports?**

#### React/Vue/Solid

A) ⭐ **Named exports** (Recommended)
   ```typescript
   export const Button = () => { ... }
   // Usage: import { Button } from './Button'
   ```
   - Pros: Better IDE support, easier refactoring, explicit names
   - Cons: Slightly more verbose

B) **Default exports**
   ```typescript
   export default function Button() { ... }
   // Usage: import Button from './Button'
   ```
   - Pros: Shorter imports
   - Cons: Can rename on import, harder to refactor

**Your answer:**

---

### Question 5.3: Linting & Formatting

**What linting/formatting tools will you use?**

A) ⭐ **ESLint + Prettier** (Recommended)
   - ESLint: Code quality rules
   - Prettier: Code formatting
   - Best for: Most JavaScript/TypeScript projects

B) **ESLint only**
   - Configure ESLint for both linting and formatting
   - Best for: Simpler setup

C) **Biome**
   - All-in-one linter and formatter (faster than ESLint+Prettier)
   - Best for: Monorepos, performance-critical projects

D) **No linting/formatting**
   - Manual code review only
   - Not recommended

**Your answer:**

**If ESLint, which config?**

#### React

A) ⭐ **eslint-config-airbnb** (Strict, popular)
B) **@typescript-eslint/recommended** (TypeScript-focused)
C) **eslint-config-react-app** (Create React App default)
D) **Custom config**

#### Vue

A) ⭐ **eslint-plugin-vue** (Official Vue rules)
B) **@vue/eslint-config-typescript** (Vue + TypeScript)

#### Angular

A) ⭐ **@angular-eslint** (Official Angular ESLint)

**Prettier config:**
- Print width: _____ (default: 80)
- Tabs or spaces: _____ (default: 2 spaces)
- Semicolons: Yes / No (default: Yes)
- Single quotes: Yes / No (default: No)
- Trailing commas: es5 / all / none (default: es5)

---

### Question 5.4: Import Organization

**How will you organize imports?**

A) ⭐ **Grouped by type** (Recommended)
   ```typescript
   // 1. External libraries
   import React from 'react';
   import { useQuery } from '@tanstack/react-query';

   // 2. Internal modules
   import { Button } from '@/components/Button';
   import { useAuth } from '@/hooks/useAuth';

   // 3. Relative imports
   import { UserCard } from './UserCard';

   // 4. Types
   import type { User } from '@/types';

   // 5. Styles
   import styles from './styles.module.css';
   ```

B) **Alphabetical only**
   - All imports alphabetically sorted
   - Best for: Simpler rule

C) **No specific order**
   - Not recommended

**Your answer:**

**Import alias for src/?**
- `@/` (e.g., `import { Button } from '@/components/Button'`)
- `~/` (e.g., `import { Button } from '~/components/Button'`)
- No alias (relative paths only)

**Auto-import sorting tool:**
- `eslint-plugin-import` + `import/order` rule
- `prettier-plugin-organize-imports`
- Manual

---

### Question 5.5: TypeScript Strictness

**How strict should TypeScript be?**

A) ⭐ **Strict mode** (Recommended)
   ```json
   {
     "strict": true,
     "noUncheckedIndexedAccess": true,
     "noImplicitOverride": true
   }
   ```
   - Catches most type errors
   - Best for: New projects, type safety

B) **Moderate**
   ```json
   {
     "strict": true,
     "noUncheckedIndexedAccess": false
   }
   ```
   - Strict but allows some flexibility

C) **Lenient**
   - Minimal type checking
   - Best for: Migration from JavaScript

**Your answer:**

**`any` type policy:**
A) ❌ Never allow `any` (use `unknown` instead)
B) ⚠️ Allow `any` with eslint warning
C) ✅ Allow `any` freely (not recommended)

---

### Question 5.6: Code Comments

**What's your commenting policy?**

A) ⭐ **JSDoc for public APIs, inline for complex logic**
   ```typescript
   /**
    * Fetches user data from the API
    * @param userId - The user's unique identifier
    * @returns User object or null if not found
    */
   export async function fetchUser(userId: string): Promise<User | null> {
     // Check cache first to avoid unnecessary API call
     const cached = cache.get(userId);
     if (cached) return cached;

     return api.get(`/users/${userId}`);
   }
   ```
   - Best for: Most projects

B) **JSDoc everywhere**
   - Comment all functions, even private ones
   - Best for: Libraries, public APIs

C) **Minimal comments**
   - Self-documenting code only
   - Comments only for "why", not "what"

D) **No comment policy**
   - Up to developers

**Your answer:**

---

### Question 5.7: Component Structure

**How will you structure components?**

A) ⭐ **Collocated files** (Recommended)
   ```
   Button/
   ├── Button.tsx
   ├── Button.test.tsx
   ├── Button.stories.tsx
   ├── Button.module.css
   └── index.ts (re-export)
   ```
   - Best for: Modularity, easy to move/delete

B) **Separate folders**
   ```
   components/Button.tsx
   styles/Button.module.css
   tests/Button.test.tsx
   ```
   - Best for: Simpler structure, smaller projects

C) **Single file components** (Vue SFC style)
   ```vue
   <template>...</template>
   <script>...</script>
   <style>...</style>
   ```
   - Best for: Vue, Svelte

**Your answer:**

---

### Question 5.8: Error Handling Patterns

**How will you handle errors in components?**

A) ⭐ **Error Boundaries + Try-Catch**
   - Error Boundaries: Catch render errors
   - Try-Catch: Catch async errors
   - Best for: React, robust error handling

B) **Global error handler**
   - Vue: `app.config.errorHandler`
   - Angular: `ErrorHandler`
   - Best for: Centralized error logging

C) **Try-Catch everywhere**
   - Manual error handling in each function
   - Best for: Fine-grained control

**Your answer:**

**Error logging:**
- Sentry
- LogRocket
- DataDog
- Console only (development)
- No logging

---

### Question 5.9: Code Review Standards

**What's required for code review approval?**

Select all that apply:

- [ ] Linting passes (no ESLint errors)
- [ ] Tests pass (unit + integration)
- [ ] Code coverage meets threshold (specify: ___%)
- [ ] No TypeScript errors
- [ ] At least 1 approval from team member
- [ ] Self-review (author reviews their own PR)
- [ ] Documentation updated (if public API changed)
- [ ] No console.log statements
- [ ] Accessibility review (for UI changes)

**Minimum approvals required:** _____

**Approval required from:**
A) Any team member
B) Senior/Lead developer
C) Code owner (GitHub CODEOWNERS)

**Your answer:**

---

### Question 5.10: Commit Message Convention

**What commit message format will you use?**

A) ⭐ **Conventional Commits** (Recommended)
   ```
   <type>(<scope>): <subject>

   <body>

   <footer>
   ```
   - Types: feat, fix, docs, style, refactor, test, chore
   - Example: `feat(auth): add Google OAuth login`
   - Best for: Automated changelogs, semantic versioning

B) **Simple descriptive**
   - Example: "Add Google OAuth login"
   - Best for: Small teams, simple projects

C) **No convention**
   - Free-form commit messages

**Your answer:**

**If Conventional Commits, enforce with:**
- commitlint (pre-commit hook)
- Manual review
- No enforcement

**Require commit body for:**
A) All commits
B) Only breaking changes
C) Never required

---

## 📊 Phase 5 Summary

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 PHASE 5 SUMMARY: CODE STANDARDS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

File Naming: [Answer from 5.1]
Component Naming: [Answer from 5.2]
Linting/Formatting: [Answer from 5.3]
Import Organization: [Answer from 5.4]
TypeScript Strictness: [Answer from 5.5]
Code Comments: [Answer from 5.6]
Component Structure: [Answer from 5.7]
Error Handling: [Answer from 5.8]
Code Review: [Answer from 5.9]
Commit Messages: [Answer from 5.10]
Logging Standards: [Answer from 5.11]
Documentation Tools: [Answer from 5.12]

Is this correct? (Y/n)
```

---

## 📝 Document Generation

Generate `docs/code-standards.md` with these placeholders:

- `{{FILE_NAMING_CONVENTION}}` → File naming pattern
- `{{COMPONENT_NAMING}}` → Component naming pattern
- `{{LINTING_TOOLS}}` → ESLint + Prettier / Biome / etc.
- `{{IMPORT_ORGANIZATION}}` → Import order rules
- `{{TYPESCRIPT_STRICTNESS}}` → Strict / Moderate / Lenient
- `{{COMMENT_POLICY}}` → Commenting guidelines
- `{{COMPONENT_STRUCTURE}}` → File structure pattern
- `{{ERROR_HANDLING}}` → Error handling approach
- `{{CODE_REVIEW_RULES}}` → Review requirements
- `{{COMMIT_CONVENTION}}` → Commit message format

Update `ai-instructions.md`:

```markdown
## Code Standards

- **File Naming:** {{FILE_NAMING_CONVENTION}}
- **Component Naming:** {{COMPONENT_NAMING}}
- **Linting:** {{LINTING_TOOLS}}
- **TypeScript:** {{TYPESCRIPT_STRICTNESS}}

### Rules

- ✅ ALWAYS use {{FILE_NAMING_CONVENTION}} for file names
- ✅ ALWAYS use {{COMPONENT_NAMING}} for component names
- ✅ ALWAYS run linter before committing
- ❌ NEVER commit code with ESLint errors
- ❌ NEVER use `any` type (use `unknown` instead)
- ✅ ALWAYS write JSDoc for exported functions
- ✅ ALWAYS use {{IMPORT_ORGANIZATION}} for imports
{{#IF_CONVENTIONAL_COMMITS}}
- ✅ ALWAYS use Conventional Commits format
{{/IF_CONVENTIONAL_COMMITS}}
```

---

## 🚀 Next Steps

```
✅ Phase 5 Complete!

Documents Generated:
  - docs/code-standards.md
  - ai-instructions.md (updated)

Next: Phase 6 - Testing Strategy

Read: .ai-flow/prompts/frontend/bootstrap-phase6-testing.md
```

---

**Last Updated:** 2025-01-XX

**Version:** 1.2.0
