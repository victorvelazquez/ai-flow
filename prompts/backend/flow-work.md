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

| Input Pattern                  | Mode              | Source / Action                                                      |
| ------------------------------ | ----------------- | -------------------------------------------------------------------- |
| `HU-\d{3}-\d{3}`               | `USER_STORY`      | Load from `planning/user-stories/**/HU-XXX-XXX.md`                   |
| `EP-\d{3}`                     | `EPIC`            | Analyze/List User Stories for Epic `EP-XXX`                          |
| `T\d{3}(-T\d{3})?`             | `TASKS`           | Target specific task or range (e.g., `T025-T030`)                    |
| `HU-XXX-XXX TXXX-TXXX`         | `STORY_TASKS`     | Targeted tasks within a specific User Story                          |
| Matches `planning/roadmap.md`  | `ROADMAP_FEATURE` | Extract section from `planning/roadmap.md` (Partial matches allowed) |
| "refactor", "move", "extract"  | `REFACTOR`        | Use `flow-work-refactor.md`                                          |
| "fix", "bug", "error", "falla" | `FIX`             | Detect complexity (Quick vs Complex)                                 |
| "implement", "create", "new"   | `FEATURE`         | Use `flow-work-feature.md`                                           |
| No arguments                   | `RESUME`          | Search for paused work in `.ai-flow/work/`                           |

**2. Detection Logic Details:**

- **USER_STORY / EPIC**: Load metadata from `planning/user-stories/` or `planning/roadmap.md`.
- **ROADMAP_FEATURE**: Fuzzy search in `planning/roadmap.md` for titles like "User Management" or "Feature 2.2".
- **TASK RANGES**: If `T025-T030` is provided, find the parent Story or Feature in current context or roadmap.
- **SIMPLE FIX**: Affects 1 file, obvious cause, <10 lines fix. → Use `flow-work-fix.md` (Quick).
- **COMPLEX FIX**: Multi-file, architectural, performance/security. → Use `flow-work-fix.md` (Deep).

---

## Phase 1: Analysis & Refinement

**1. Context Loading (Multi-Source):**

**CRITICAL**: Regardless of whether a `USER_STORY` ID or a `ROADMAP_FEATURE` name is provided, you MUST attempt to load context from **BOTH** sources:

- **`planning/roadmap.md`**: To understand high-level scope, epic relationships, and technical dependencies.
- **`planning/user-stories/**/HU-XXX-XXX.md`\*\*: To get granular details (Acceptance Criteria, Gherkin Scenarios, QA cases).

**2. Detail Level Detection (if Manual input):**

IF input is manual description (not HU/Roadmap):

```python
detail_level = analyze_description(input)

# Criteria for HIGH detail (Feature):
# - Mentions technology/method (JWT, OAuth, bcrypt, etc.)
# - Describes flow (registration, login, CRUD, etc.)
# - Includes technical constraints (hashing, tokens, validation, etc.)

# Criteria for HIGH detail (Refactor):
# - Describes what to extract/move
# - Mentions destination (file/class)
# - References pattern to follow

# Criteria for HIGH detail (Fix):
# - Describes symptom (error 500, crash, null pointer, etc.)
# - Mentions probable cause
# - Suggests fix approach
```

**3. Interactive Refinement (Conditional):**

**IF detail_level == "HIGH":**

- Skip refinement questions
- Proceed directly to Phase 2 (Planning)
- Show: "✅ Sufficient detail detected. Proceeding with planning..."

**IF detail_level == "MEDIUM":**

- Ask 1-2 targeted questions (only missing items)
- Use Multiple Choice with defaults (⭐)

**IF detail_level == "LOW":**

- Full refinement flow (3-5 questions)
- Use Multiple Choice with defaults (⭐)
- Focus on: approach, scope, constraints, priorities

**Example Interaction (LOW detail):**

> 📝 I need to clarify some details for this feature:
>
> 1. What authentication provider should we use? [default: A]
>    A) JWT (Local) ⭐
>    B) OAuth2 (Google/GitHub)
>    C) Firebase Auth
> 2. Should we implement audit logs for this? [default: B]
>    A) Yes
>    B) No ⭐
>
> Your answers (or Enter for defaults): \_

**4. Refined Objective Generation (if Manual):**

After refinement, generate clear objective statement:

```
✅ Refined Objective:

[Clear 1-2 paragraph description of WHAT will be implemented]

**Scope**:
- [List in-scope items]

**Out of Scope**:
- [List out-of-scope items]

Is this correct? (Yes/Edit/Cancel): _
```

**5. Documentation Compliance Check:**

Read relevant documentation:

- `ai-instructions.md` (NEVER/ALWAYS rules)
- `docs/architecture.md` (patterns, structure)
- `docs/code-standards.md` (naming, quality)
- IF auth/security: `specs/security.md`
- IF database: `docs/data-model.md`
- IF API: `docs/api.md`

Compare refined objective against documentation:

**IF deviation detected:**

```
🚨 POTENTIAL DEVIATION

From [document]:
❌ NEVER: [rule being violated]
✅ ALWAYS: [rule being ignored]

Your request: [conflicting part]

Options:
A) Modify request to align with documentation
B) Proceed with deviation (requires justification)
C) Cancel

Your choice: _
```

**IF user chooses B (Override):**

```
⚠️ OVERRIDE CONFIRMATION

You are implementing something that deviates from:
- [list violated documents/rules]

Type "I UNDERSTAND THE RISKS" to proceed: _

Provide justification: _
```

---

## Phase 2: Planning & Documentation

**1. Read Required Documentation (MANDATORY)**

Before generating work.md, read relevant documentation:

- `ai-instructions.md` → Extract NEVER/ALWAYS rules
- `docs/architecture.md` → Identify layer, pattern, file structure
- `docs/code-standards.md` → Extract naming conventions, quality rules
- IF touching database: `docs/data-model.md`
- IF auth/security: `specs/security.md`
- IF creating/modifying API: `docs/api.md`
- IF tests required: `docs/testing.md`

**2. Analyze Existing Codebase (MANDATORY)**

Find similar features/patterns in codebase:

- Identify existing files to use as reference (e.g., ProductService.ts for UserService.ts)
- Check naming conventions in actual code
- Verify architectural consistency
- Look for reusable components/services

**3. Generate work.md**

Create single consolidated file: `.ai-flow/work/[task-name]/work.md`

**Structure** (~30-40 lines):

```markdown
# [Type]: [Feature Name]

## Context

**Source**: HU-001-002 | Roadmap 2.3 | Manual [+ DEVIATION if override]
**SP**: 5 | **Branch**: feature/user-auth | **Deps**: None

## Objective

[1-2 clear paragraphs describing WHAT will be implemented]

## Documentation Constraints

**Read**: ai-instructions.md, architecture.md, code-standards.md, [security.md]

**Key Rules**:

- ✅ ALWAYS: [List specific rules that apply]
- ❌ NEVER: [List specific prohibitions]
- 📐 Pattern: [Architectural pattern from docs]
- 📁 Location: [File structure from architecture.md]

## Approach

**Layer**: [Data | Business Logic | API | UI]
**Files**: [List files to create/modify]
**Reference**: [Existing file to follow as pattern]

**Phases**:

1. [Phase 1 description]
2. [Phase 2 description]
3. [Phase 3 description]
4. [Phase 4 description]

## Tasks

[SEE TASK GENERATION LOGIC BELOW]

## Validation

- [ ] All NEVER/ALWAYS rules followed
- [ ] Tests pass (coverage per docs/testing.md)
- [ ] No hardcoded secrets
- [ ] Follows existing patterns
- [ ] [Add specific validations based on type]
```

**Task Generation Logic:**

**IF source is User Story:**

```python
tasks = read_user_story_tasks()
if tasks.are_detailed():  # Has: path, constraints, SP, deps
    work_md.tasks = """
**Source**: planning/user-stories/EP-XXX/HU-XXX-XXX.md

Tasks already detailed in User Story (see linked file).

**Summary**: [N] tasks, [X] SP total
- [Brief phase breakdown]
"""
else:
    work_md.tasks = generate_detailed_tasks()
```

**IF source is Roadmap:**

```python
feature = read_roadmap_feature()
if feature.has_detailed_tasks():
    work_md.tasks = """
**Source**: planning/roadmap.md Feature X.X

Tasks already detailed in Roadmap (see linked file).

**Summary**: [N] tasks, [X] SP total
"""
else:
    work_md.tasks = generate_detailed_tasks()
```

**IF source is Manual OR tasks need expansion:**

Generate detailed tasks with this format:

```markdown
## Tasks

**Source**: Manual | Roadmap X.X (expanded) | HU-XXX-XXX (expanded)

- [ ] T001 [D] Create User entity → src/entities/User.ts • 1 SP
  - Follow Product.ts pattern, hash passwords (bcrypt)
- [ ] T002 [L] UserService.register() → src/services/ • 2 SP
  - Validate email, hash password, return JWT (deps: T001)
- [ ] T003 [A] POST /users/register → src/controllers/ • 1 SP
  - Return 201, rate limit, follow api.md (deps: T002)
- [ ] T004 [T] Unit tests → tests/services/ • 2 SP
  - 80% coverage, edge cases (deps: T002)
```

**Task Detail Requirements:**

- Specific file path
- Pattern/reference to follow
- Key constraints from docs
- Dependencies (if applicable)
- Story Points

**4. Generate status.json**

Create: `.ai-flow/work/[task-name]/status.json`

```json
{
  "type": "feature|refactor|fix",
  "source": "HU-001-002|roadmap-2.3|manual",
  "deviation": false,
  "progress": {
    "totalTasks": 4,
    "completedTasks": 0,
    "percentage": 0
  },
  "git": {
    "branchName": "feature/user-auth",
    "commits": []
  },
  "timestamps": {
    "created": "2025-12-22T23:00:00-03:00",
    "lastUpdated": "2025-12-22T23:00:00-03:00"
  },
  "validation": {
    "tests": { "executed": false },
    "lint": { "executed": false }
  }
}
```

**5. User Approval**

Show work.md for review:

```
📄 Generated: .ai-flow/work/[task-name]/work.md

Review work.md? (Yes/Edit/No): _
```

- **Yes**: Proceed to Phase 3
- **Edit**: Allow user to modify work.md, then re-read
- **No**: Cancel workflow

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
   - Follow tasks in `work.md`
   - Update task checkboxes as completed
   - Update `status.json` progress

---

## Phase 4: Finalization & Archiving

**When all tasks in `work.md` are complete (✅) and validated:**

1. **Update Source Documentation (Automatic - ALWAYS UPDATE BOTH IF BOTH EXIST)**:

   **Step 1a: Check and Update User Story (if exists)**
   - Look for User Story reference in `status.json` or work context
   - IF User Story `HU-XXX-XXX` exists:
     - Read `planning/user-stories/EP-XXX/HU-XXX-XXX.md`
     - Mark ALL DoD checklist items as complete: `- [ ]` → `- [x]`
     - Add completion timestamp comment: `<!-- Completed: YYYY-MM-DD HH:MM -->`
     - Save file

   **Step 1b: Check and Update Roadmap (if exists)**
   - Look for Feature reference in `status.json` or work context
   - IF Feature exists in `planning/roadmap.md`:
     - Read `planning/roadmap.md`
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

3. **Registro de Historial (Automático tras aprobación)**:
   - Una vez el usuario confirma que el trabajo está listo para ser cerrado:
   - **Extraer metadata** de `status.json` y `work.md`:
     ```javascript
     // Campos del registro JSONL (10 campos):
     {
       task: string,        // Nombre de la tarea (ej: "user-auth")
       type: string,        // "feature" | "refactor" | "fix"
       src: string,         // source: "HU-001-002" | "roadmap-2.3" | "manual"
       dur: number,         // duración en minutos (completed - created)
       start: string,       // timestamps.created (ISO 8601)
       end: string,         // timestamps.completed (ISO 8601)
       tasks: number,       // progress.totalTasks
       sp?: number,         // Story Points extraídos de work.md (regex: "• (\d+) SP")
       commits: number,     // git.commits.length
       valid: boolean       // validation.tests.passed && validation.lint.passed
     }
     ```
   - **Actualizar `status.json`**: Registrar `timestamps.completed` (ISO 8601).
   - **Append a `.ai-flow/archive/analytics.jsonl`**: Agregar 1 línea con el objeto JSON (sin espacios ni saltos de línea internos).
   - **Eliminar carpeta**: Remover `.ai-flow/work/[task-name]/` completa (incluye `work.md` y `status.json`).
   - **Cleanup**: Mantener limpia la carpeta `work` para que `/flow-work` detecte solo tareas activas.

4. **Generar Resumen Universal para Sistema de Tickets (Automático)**:

   Después del archivado, generar un resumen completo compatible con ClickUp, Jira, Linear, Asana, Trello, GitHub Projects, Azure DevOps, y cualquier sistema de gestión de tareas.

   **Template Source**: `.ai-flow/prompts/shared/task-summary-template.md`

   **Instrucciones**:
   1. Leer el template completo desde `.ai-flow/prompts/shared/task-summary-template.md`
   2. Extraer datos de las fuentes especificadas en el template:
      - `status.json` (type, timestamps, commits, validation, branch)
      - `work.md` (objective, tasks, story points)
      - `analytics.jsonl` (última línea: duración, sp, commits)
      - `TECH-DEBT.md` (si existe antes de eliminar)
      - Git commands (`git diff --stat`, `git log --oneline`, etc.)
   3. Aplicar inferencia automática según reglas del template:
      - Tags/Labels (Backend, API, Security, etc.)
      - Prioridad (Critical, High, Medium, Low)
      - Scope (módulo principal afectado)
      - Impacto (UX, Security, Performance, Maintainability)
   4. Poblar todos los campos del template con datos reales
   5. Mostrar el resumen completo formateado listo para copiar/pegar

   **Nota**: El template es modular y puede actualizarse independientemente sin modificar este archivo.

5. **Presentación de Resultados**:

   Mostrar resumen del template `.ai-flow/prompts/shared/task-summary-template.md` seguido de:

   ```
   ---

   📋 Copiar el resumen de arriba a tu sistema de tickets
      (ClickUp, Jira, Linear, Asana, Trello, GitHub Projects, etc.)

   ---
   ```

   Luego preguntar al usuario:

   ```
   ¿Deseas hacer push al remoto?

   git push origin [branch-name]

   (y/n): _
   ```

   - Si responde **y**: Ejecutar `git push origin [branch-name]` y mostrar resultado
   - Si responde **n**: Terminar con mensaje "✅ Trabajo completado. Push pendiente."

---

## Orchestration Rules

- **DRY Logic**: This file handles the high-level orchestration.
- **Delegation**:
  - Detailed Feature logic → `@flow-work-feature.md`
  - Detailed Refactor logic → `@flow-work-refactor.md`
  - Detailed Fix logic → `@flow-work-fix.md`
  - Resume logic → `@flow-work-resume.md`
- **State Persistence**: Always read/write to `.ai-flow/work/[name]/status.json` to maintain state across sessions.

---

**BEGIN EXECUTION when user runs `/flow-work [args]`**
