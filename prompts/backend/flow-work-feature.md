---
description: Internal logic for Feature implementation within flow-work
---

# AI Flow - Feature Logic

This file contains the detailed execution logic for implementing new features, imported by `@flow-work.md`.

---
## 🚀 Feature Implementation Flow

### 1. Specification (auto-skip if User Story)
- Extract requirements from User Story or Roadmap.
- If interactive, ask clarification questions (Multiple Choice).
- Save to `specs/ai-flow/work/[feature]/spec.md`.

### 2. Technical Planning
- Analyze codebase for patterns.
- Generate `plan.md` with Fibonacci estimation.
- Organize tasks into layers (Data, Logic, API, Test, Docs).
- **User Confirmation Required.**

### 3. Progressive Implementation
Choose mode:
- **Auto**: Complete all tasks without pausing.
- **Phase-by-phase**: Pause and validate after each phase.
- **Task-by-task**: Pause after each task.

### 4. Definition of Done (DoD)
- If HU mode: Validate against Gherkin scenarios.
- Run tests and linting.
- Perform security check.
- **Update completion status** in source documents (see Phase 4 Step 1 in flow-work.md).

---
## 🌿 Git Branching Strategy
- Generate slug from name.
- Execute `git checkout -b feature/[slug]`.
- Maintain `status.json` with commit history.

---
## 📦 status.json Persistence
Ensure `progress`, `git`, and `metadata` sections are always updated.
