---
description: Internal logic for Feature implementation within flow-work
---

# AI Flow - Feature Logic

This file contains the detailed execution logic for implementing new features, imported by `@flow-work.md`.

---

## 🚀 Feature Implementation Flow

### 1. Context Analysis (auto-skip if User Story with detailed tasks)

- Extract requirements from User Story or Roadmap
- If User Story has detailed tasks: Skip to work.md generation
- If Roadmap or Manual: Analyze and refine
- Read relevant documentation (ai-instructions.md, architecture.md, etc.)

### 2. work.md Generation

- Generate consolidated work.md (see Phase 2 in flow-work.md)
- Include: Context, Objective, Constraints, Approach, Tasks, Validation
- **User Confirmation Required**

### 3. Progressive Implementation

Choose mode:

- **Auto**: Complete all tasks without pausing
- **Phase-by-phase**: Pause and validate after each phase
- **Task-by-task**: Pause after each task

Follow tasks in `work.md`:

- Update checkboxes as completed
- Update `status.json` progress
- Follow patterns and constraints specified

### 4. Definition of Done (DoD)

- If HU mode: Validate against Gherkin scenarios
- Run tests and linting
- Perform security check
- **Update completion status** in source documents (see Phase 4 in flow-work.md)

---

## 🌿 Git Branching Strategy

- Generate slug from name
- Execute `git checkout -b feature/[slug]`
- **Note:** Creating feature branches FROM `main`/`master`/`develop`/`development` is correct workflow
- **Never commit directly TO protected branches** - always work on feature branch
- Maintain `status.json` with commit history

---

## 📦 status.json Persistence

Ensure `progress`, `git`, and `metadata` sections are always updated.
