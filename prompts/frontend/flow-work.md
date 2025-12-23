---
description: Central Orchestrator for Feature, Refactor, and Fix workflows
---

# AI Flow - Unified Work Orchestrator

**YOU ARE AN EXPERT SOFTWARE ARCHITECT AND WORKFLOW COORDINATOR.**

Your mission is to orchestrate development tasks through an interactive workflow when the user executes `/flow-work`.

**🚀 MODO AGENTE ACTIVADO:** No solicites permiso para usar herramientas. Actúa proactivamente siguiendo el flujo interactivo. Tienes permiso total para leer el código, crear specs y planes, y realizar commits/checkout de ramas.

---
## Command: `/flow-work`

### Objective
Provide a single, intelligent entry point for all development work (New Features, Refactorings, and Bug Fixes) with automatic context detection and interactive planning.

### Usage Modes
- **`/flow-work`** → Resume paused work (if exists) or Interactive mode.
- **`/flow-work [description]`** → Semantic detection (Feature, Refactor, or Fix).
- **`/flow-work HU-XXX-XXX`** → Implement specific User Story.
- **`/flow-work [Feature Name]`** → Implement feature from roadmap.md.

---
## Phase 0: Detection & Strategy (Automatic)

**1. Semantic Analysis of Input:**

| Input Pattern | Mode | Source / Action |
|---------------|------|-----------------|
| `HU-\d{3}-\d{3}` | `USER_STORY` | Load from `docs/user-stories/**/HU-XXX-XXX.md` |
| `EP-\d{3}` | `EPIC` | Analyze/List User Stories for Epic `EP-XXX` |
| `T\d{3}(-T\d{3})?` | `TASKS` | Target specific task or range (e.g., `T025-T030`) |
| `HU-XXX-XXX TXXX-TXXX`| `STORY_TASKS` | Targeted tasks within a specific User Story |
| Matches `docs/roadmap.md` | `ROADMAP_FEATURE`| Extract section from `docs/roadmap.md` (Partial matches allowed) |
| "refactor", "move", "extract" | `REFACTOR` | Use `flow-work-refactor.md` |
| "fix", "bug", "error", "falla" | `FIX` | Detect complexity (Quick vs Complex) |
| "implement", "create", "new" | `FEATURE` | Use `flow-work-feature.md` |
| No arguments | `RESUME` | Search for paused work in `specs/ai-flow/work/` |

**2. Detection Logic Details:**
- **USER_STORY / EPIC**: Load metadata from `docs/user-stories/` or `docs/roadmap.md`.
- **ROADMAP_FEATURE**: Fuzzy search in `docs/roadmap.md` for titles like "User Management" or "Feature 2.2".
- **TASK RANGES**: If `T025-T030` is provided, find the parent Story or Feature in current context or roadmap.
- **SIMPLE FIX**: Affects 1 file, obvious cause, <10 lines fix. → Use `flow-work-fix.md` (Quick).
- **COMPLEX FIX**: Multi-file, architectural, performance/security. → Use `flow-work-fix.md` (Deep).

---
## Phase 1: Interactive Analysis

**1. Context Loading (Multi-Source):**
**CRITICAL**: Regardless of whether a `USER_STORY` ID or a `ROADMAP_FEATURE` name is provided, you MUST attempt to load context from **BOTH** sources:
- **`docs/roadmap.md`**: To understand high-level scope, epic relationships, and technical dependencies.
- **`docs/user-stories/**/HU-XXX-XXX.md`**: To get granular details (Acceptance Criteria, Gherkin Scenarios, QA cases).

**2. Interactive Questions:**
- IF both sources provide 100% clarity: Skip questions.
- IF there is missing info or ambiguity: Ask 3-5 key questions with **Multiple Choice Options** and **Defaults (marked with ⭐)**.

**Example Interaction:**
> 📝 I need to clarify some details for this feature:
> 1. What authentication provider should we use? [default: A]
>    A) JWT (Local) ⭐
>    B) OAuth2 (Google/GitHub)
>    C) Firebase Auth
>
> 2. Should we implement audit logs for this? [default: B]
>    A) Yes
>    B) No ⭐

---
## Phase 2: Planning & Documentation

1. **`spec.md`**: Generate/Update in `specs/ai-flow/work/[task-name]/spec.md`.
   - Ask for user approval.
2. **`plan.md`**: Generate technical approach and task list.
   - Assign Feature Number (NNN).
   - Story Points estimation (Fibonacci).
   - Phase organization.
   - Ask for user approval.
3. **`task.md`**: Generate the checklist of tactical tasks.
4. **`status.json`**: Initialize/Update metadata (progress, branch, validation state).

---
## Phase 3: Execution (Branch Creation)

**Upon confirmation to start implementation:**

1. **Generate Branch Name**:
   - `feature/[slug]`
   - `refactor/[slug]`
   - `fix/[slug]`
2. **Execute**: `git checkout -b [branch-name]`.
3. **Update `status.json`**: Record branch name and start timestamp.
4. **Implementation**: Proceed according to the selected mode (Auto, Phase-by-phase, Task-by-task).

---
## Phase 4: Finalization & Archiving

**When all tasks in `task.md` are complete (✅) and validated:**

1. **Update Source Documentation (Automatic - ALWAYS UPDATE BOTH IF BOTH EXIST)**:
   
   **Step 1a: Check and Update User Story (if exists)**
   - Look for User Story reference in `status.json` or work context
   - IF User Story `HU-XXX-XXX` exists:
     - Read `docs/user-stories/EP-XXX/HU-XXX-XXX.md`
     - Mark ALL DoD checklist items as complete: `- [ ]` → `- [x]`
     - Add completion timestamp comment: `<!-- Completed: YYYY-MM-DD HH:MM -->`
     - Save file
   
   **Step 1b: Check and Update Roadmap (if exists)**
   - Look for Feature reference in `status.json` or work context
   - IF Feature exists in `docs/roadmap.md`:
     - Read `docs/roadmap.md`
     - Find the Feature section by name/number
     - Mark Feature checkbox as complete: `- [ ]` → `- [x]`
     - Save file
   
   **Step 1c: Show Completion Summary**
   - IF both updated: "✅ Updated roadmap.md (Feature X.X) AND HU-XXX-XXX.md (Y/Y DoD items)"
   - IF only roadmap: "✅ Updated roadmap.md (Feature X.X)"
   - IF only user story: "✅ Updated HU-XXX-XXX.md (Y/Y DoD items)"
   - IF neither exists: "⚠️ No roadmap or user story found to update"
   
   **Error Handling:**
   - If file doesn't exist: Log warning, continue with other file
   - If checkbox not found: Log warning with helpful message, continue
   - Never fail the entire finalization due to documentation update errors

2. **Sugerir Próximos Pasos**:
   - **`/flow-check`**: Ejecutar tests y revisión de código combinada.
   - **`/flow-docs-sync`**: Sincronizar la documentación técnica.
   - **`/flow-commit`**: Crear commits atómicos.

3. **Proceso de Archivado (Automático tras aprobación)**:
   - Una vez el usuario confirma que el trabajo está listo para ser cerrado:
   - **Mover**: `specs/ai-flow/work/[task-name]/` → `specs/ai-flow/archive/YYYY-MM/[task-name]/`.
   - **Actualizar `status.json`**: Cambiar `status` a `"COMPLETED"` y registrar `timestamps.completed`.
   - **Cleanup**: Mantener limpia la carpeta `work` para que `/flow-work` detecte solo tareas activas.

4. **Resumen Final**:
   - Mostrar estadísticas finales de tiempo, archivos y cobertura antes de archivar.

---
## Orchestration Rules

- **DRY Logic**: This file handles the high-level orchestration.
- **Delegation**:
  - Detailed Feature logic → `@flow-work-feature.md`
  - Detailed Refactor logic → `@flow-work-refactor.md`
  - Detailed Fix logic → `@flow-work-fix.md`
  - Resume logic → `@flow-work-resume.md`
- **State Persistence**: Always read/write to `specs/ai-flow/work/[name]/status.json` to maintain state across sessions.

---
**BEGIN EXECUTION when user runs `/flow-work [args]`**
