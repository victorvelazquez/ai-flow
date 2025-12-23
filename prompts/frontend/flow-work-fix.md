---
description: Internal logic for Bug Fixes within flow-work
---

# AI Flow - Fix Logic

This file contains the detailed execution logic for bug fixes, imported by `@flow-work.md`.

---
## 🔧 Bug Fix Workflow

### 1. Classification
- **QUICK**: 1 file, obvious cause (typo, null check).
- **COMPLEX**: Multiple files, investigation needed.

### 2. Deep Analysis (Complex Fix)
- Create work directory.
- Document root cause in `analysis.md`.
- Map side effects.

### 3. Implementation
- **Test-First Approach**: Add a failing test case that reproduces the bug before fixing it.
- Apply the fix.
- Verify tests pass.
- **Update completion status** if fix was tracked in roadmap/user stories (see Phase 4 Step 1 in flow-work.md).

---
## 🌿 Git Branching Strategy
- **QUICK**: Usually work on current branch.
- **COMPLEX**: Execute `git checkout -b fix/[slug]`.

---
## 📦 status.json Persistence
Track root cause details and verification test status.
