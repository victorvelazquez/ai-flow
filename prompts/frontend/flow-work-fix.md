---
description: Internal logic for Bug Fixes within flow-work
---

# AI Flow - Fix Logic

This file contains the detailed execution logic for bug fixes, imported by `@flow-work.md`.

---
## 🔧 Bug Fix Workflow

### 1. Classification
- **QUICK**: 1 file, obvious cause (typo, null check)
- **COMPLEX**: Multiple files, investigation needed

### 2. Analysis & work.md Generation
- **QUICK**: Minimal work.md (objective + 1-2 tasks)
- **COMPLEX**: Full work.md with root cause analysis
  - Document root cause in Objective section
  - Map side effects in Approach section
  - Generate detailed tasks

### 3. Implementation
- **Test-First Approach**: Add failing test that reproduces bug
- Apply the fix following work.md tasks
- Verify tests pass
- **Update completion status** if fix was tracked in roadmap/user stories (see Phase 4 in flow-work.md)

---
## 🌿 Git Branching Strategy
- **QUICK**: Usually work on current branch
  - ⚠️ **Exception:** If on protected branch (`main`, `master`, `develop`, `development`), create fix branch even for quick fixes
- **COMPLEX**: Execute `git checkout -b fix/[slug]`
- **Never commit directly TO protected branches**

---
## 📦 status.json Persistence
Track root cause details and verification test status.
