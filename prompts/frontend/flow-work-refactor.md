---
description: Internal logic for Refactor implementation within flow-work
---

# AI Flow - Refactor Logic

This file contains the detailed execution logic for code refactoring, imported by `@flow-work.md`.

---
## 🔄 Refactoring Workflow

### 1. Scope Identification
- Map affected files and dependencies.
- Confirm no behavior change is expected.
- Validate against architecture patterns.

### 2. Implementation Strategy
- Use `plan.md` to map extraction/renaming/moving steps.
- Set "No behavior change" as the primary constraint.

### 3. Execution & Safety
- Update imports and references across the codebase.
- **Critical**: Existing tests must pass without modification (unless test itself is refactored).
- Run `/flow-check` to verify no regressions.
- **Update completion status** if refactor was tracked in roadmap/user stories (see Phase 4 Step 1 in flow-work.md).

---
## 🌿 Git Branching Strategy
- Execute `git checkout -b refactor/[slug]`.

---
## 📦 status.json Persistence
Track `percentage` of updated occurrences and updated file paths.
