---
description: Internal logic for Refactor implementation within flow-work
---

# AI Flow - Refactor Logic

This file contains the detailed execution logic for code refactoring, imported by `@flow-work.md`.

---

## 🔄 Refactoring Workflow

### 1. Scope Identification & work.md Generation

- Map affected files and dependencies
- Confirm no behavior change expected
- Validate against architecture patterns
- Generate work.md with:
  - Clear scope (what to extract/move/rename)
  - Affected files list
  - Step-by-step tasks
  - "No behavior change" constraint

### 2. Implementation

- Follow work.md tasks sequentially
- Update imports and references across codebase
- **Critical**: Existing tests must pass without modification (unless test itself is refactored)

### 3. Validation

- Run `/flow-check` to verify no regressions
- Confirm all tests pass
- **Update completion status** if refactor was tracked in roadmap/user stories (see Phase 4 in flow-work.md)

---

## 🌿 Git Branching Strategy

- Execute `git checkout -b refactor/[slug]`
- **Note:** Creating refactor branches FROM `main`/`master`/`develop`/`development` is correct
- **Never commit directly TO protected branches**

---

## 📦 status.json Persistence

Track `percentage` of updated occurrences and updated file paths.
