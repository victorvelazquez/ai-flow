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

## Phase 0.5: Complexity Classification (CRITICAL)

**Analyze task scope to determine workflow:**

| Metric        | SIMPLE (⚡) | MEDIUM (📝) | COMPLEX (🏗️)  |
| ------------- | ----------- | ----------- | ------------- |
| Files         | 1           | 2-5         | >5            |
| Lines         | <20         | 20-100      | >100          |
| Tests         | No          | Optional    | Required      |
| Docs          | None        | Minor       | Significant   |
| Architecture  | None        | Minimal     | Major changes |
| Time estimate | <15 min     | 15-60 min   | >60 min       |

**Classification Rules:**

**⚡ SIMPLE Task:**

- Examples: Fix typo, rename variable, update constant, add log, adjust CSS
- **Workflow**: In-chat plan → Execute → Done (NO files created)
- **Context**: Only `ai-instructions.md` if relevant

**📝 MEDIUM Task:**

- Examples: Add method, refactor function, simple bug fix, update API endpoint
- **Workflow**: Create `work.md` only (NO `status.json`) → Execute → Simple archive
- **Context**: Load 2-3 relevant docs

**🏗️ COMPLEX Task:**

- Examples: New feature, major refactor, security fix, multi-file changes
- **Workflow**: Full workflow (`work.md` + `status.json` + branch + archiving)
- **Context**: Load all relevant docs

**Detection Logic:**

```python
if files_affected == 1 and lines_changed < 20 and no_tests_needed and no_architecture_impact:
    complexity = "SIMPLE"
elif files_affected <= 5 and lines_changed <= 100 and architecture_impact == "minimal":
    complexity = "MEDIUM"
else:
    complexity = "COMPLEX"
```

**Show classification:**

```
🔍 Task Complexity: [SIMPLE ⚡ | MEDIUM 📝 | COMPLEX 🏗️]

Detected:
- Files: [N]
- Estimated lines: [~X]
- Tests needed: [Yes/No]
- Architecture impact: [None/Minimal/Major]

Proceeding with [SIMPLE/MEDIUM/COMPLEX] workflow.
```

---

## Phase 1: Analysis & Refinement

**1. Context Loading (Smart & Selective):**

**CRITICAL: Load context based on task complexity and type:**

**IF complexity == "SIMPLE":**

- Load ONLY `ai-instructions.md` if task involves code changes
- Skip all other documentation
- Use existing patterns in nearby code as reference

**IF complexity == "MEDIUM":**

- Load `ai-instructions.md` (core rules)
- Load 1-2 specific docs based on task type:
  - Database changes → `docs/data-model.md`
  - API changes → `docs/api.md`
  - Security → `specs/security.md`
- Skip architecture.md unless creating new patterns

**IF complexity == "COMPLEX":**

- Load `ai-instructions.md` (NEVER/ALWAYS rules)
- Load `docs/architecture.md` (patterns, structure)
- Load task-specific docs:
  - Database → `docs/data-model.md`
  - Security/Auth → `specs/security.md`
  - API → `docs/api.md`
  - Tests → `docs/testing.md`
- Load `docs/code-standards.md` only if creating new files

**Source Documentation (User Stories/Roadmap):**

**IF** `HU-XXX-XXX` or roadmap feature provided:

- **`planning/roadmap.md`**: Load for high-level scope
- **`planning/user-stories/**/HU-XXX-XXX.md`\*\*: Load for detailed requirements

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

## Phase 1.5: SIMPLE Task Fast-Track

**IF complexity == "SIMPLE": Execute immediately without creating files**

1. **Show in-chat plan:**

   ```
   ⚡ SIMPLE Task - Fast Execution

   What: [1-line description]
   File: [path]
   Change: [specific modification]
   Lines: ~[N] (estimated)

   Execute now? (y/n): _
   ```

2. **IF user confirms ('y'):**
   - Make the change immediately
   - Show git diff preview
   - Skip to Phase 3 (no branch creation if already on feature branch)
   - Show: "✅ Done. Run `/flow-commit` to commit."
   - **END WORKFLOW** (no archiving needed)

3. **IF user declines ('n'):**
   - Cancel task
   - **END WORKFLOW**

**Note:** SIMPLE tasks don't create work.md, status.json, or archive records.

---

## Phase 2: Planning & Documentation

**⚠️ SKIP THIS PHASE IF complexity == "SIMPLE"**

**1. Read Required Documentation (Based on Complexity)**

**IF complexity == "MEDIUM":**

- `ai-instructions.md` (core rules)
- Load ONLY task-specific docs:
  - Database → `docs/data-model.md`
  - API → `docs/api.md`
  - Security → `specs/security.md`

**IF complexity == "COMPLEX":**

- `ai-instructions.md` (NEVER/ALWAYS rules)
- `docs/architecture.md` (layer, pattern, structure)
- Task-specific docs:
  - Database → `docs/data-model.md`
  - Security/Auth → `specs/security.md`
  - API → `docs/api.md`
  - Tests → `docs/testing.md`
- `docs/code-standards.md` (only if creating new files)

**2. Analyze Existing Codebase (MANDATORY)**

Find similar features/patterns in codebase:

- Identify existing files to use as reference (e.g., ProductService.ts for UserService.ts)
- Check naming conventions in actual code
- Verify architectural consistency
- Look for reusable components/services

**3. Generate work.md (Conditional)**

**IF complexity == "MEDIUM":**

- Create simplified `.ai-flow/work/[task-name]/work.md` (~15-20 lines)
- Skip status.json

**IF complexity == "COMPLEX":**

- Create full `.ai-flow/work/[task-name]/work.md` (~30-40 lines)
- Create `status.json` (see step 4)

**Structure for MEDIUM tasks** (~15-20 lines):

```markdown
# [Type]: [Feature Name]

**Source**: [HU-XXX | Roadmap X.X | Manual]
**Files**: [2-5 files listed]
**Estimated**: [20-60 min]

## Objective

[1 clear paragraph]

## Tasks

- [ ] Task 1 → path/file.ts
- [ ] Task 2 → path/file.ts
- [ ] Task 3 (optional tests)

## Key Rules

- ✅ [1-2 relevant ALWAYS rules]
- ❌ [1-2 relevant NEVER rules]
```

**Structure for COMPLEX tasks** (~30-40 lines):

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

**4. Generate status.json (ONLY for COMPLEX tasks)**

**IF complexity == "COMPLEX":**

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

**🛡️ CRITICAL: Protected Branch Check**

```bash
git branch --show-current
git status --porcelain
```

**If current branch is protected** (`main`, `master`, `develop`, `development`):

**A) If there are uncommitted changes:**

1.  **Analyze changes to generate branch name:**

    ```bash
    git status --porcelain
    git diff --stat
    ```

    **Detection rules:**
    - **New files** (untracked) → `feature/`
    - **Bug fixes** (keywords: fix, error, bug in commit message or file content) → `fix/`
    - **Refactoring** (modifications without new features) → `refactor/`
    - **Configuration/Dependencies** (package.json, tsconfig, .env, etc.) → `chore/`
    - **Tests only** → `test/`
    - **Documentation only** → `docs/`

    **Naming strategy:**
    - Extract most significant file/module name
    - Remove extensions and path prefixes
    - Convert to kebab-case
    - Limit to 3-4 words max

    **Examples:**

    ```
    src/services/UserService.ts (new)           → feature/user-service
    src/controllers/AuthController.ts (fix)     → fix/auth-controller
    src/utils/validator.ts (modified)           → refactor/validator-utils
    package.json + package-lock.json            → chore/update-dependencies
    src/services/User* + tests/                 → feature/user-management
    Multiple modules (auth + profile)           → feature/auth-profile-integration
    ```

2.  **Warn user:**

    ```
    ⚠️  Working on protected branch '[branch-name]' with uncommitted changes.

    Analyzed changes:
    - [file1] (new)
    - [file2] (modified)
    - [file3] (modified)
    ... [N] more files

    Detected type: [feature|fix|refactor|chore]
    Suggested branch: [type]/[descriptive-slug]
    ```

3.  **Offer options:**
    - **A)** Create branch: `[type]/[suggested-name]` ⭐
    - **B)** Edit branch name (user provides custom slug)
    - **C)** Stash changes and continue: `git stash`
    - **D)** Cancel

4.  If user chooses A:

    ```bash
    git checkout -b [type]/[suggested-name]
    ```

    Then show:

    ```
    ✅ Created and switched to '[type]/[suggested-name]'

    Next steps:
    1. Run /flow-commit to commit these changes
    2. Return to protected branch: git checkout [protected-branch]
    3. Continue with /flow-work for new task

    Or continue working on this branch if it's your intended work.
    ```

5.  If user chooses B:
    ```
    Enter branch name (without type prefix): _
    ```
    Then create: `[detected-type]/[user-input]`

**B) If NO uncommitted changes:**

- ✅ Proceed normally - creating work branches FROM protected branches is correct workflow
- Protected branches serve as base for new work

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

## Phase 4: Finalization (User-Controlled)

**⚠️ SKIP THIS PHASE IF complexity == "SIMPLE"** (already handled in Phase 1.5)

**Trigger Options:**

- User types: `/flow-work complete`
- All checkboxes in work.md marked complete
- User explicitly requests finalization

**CRITICAL: This phase requires EXPLICIT user confirmations at each step.**

---

### Step 1: Validation Check

```
🔍 Running validation...
```

Execute:

```bash
npm test  # or project-specific test command
npm run lint  # or project-specific lint command
```

Show results:

```
📊 Validation Results

Tests: [✅ Passed | ❌ Failed (N tests)]
Lint: [✅ Clean | ⚠️ N warnings | ❌ N errors]
Coverage: [X%]

Proceed with finalization?

a) Yes, continue ⭐
b) No, let me fix issues
c) Skip validation (not recommended)

Your choice: _
```

- **'b'**: Return to Phase 3 for fixes, END finalization
- **'c'**: Show warning, ask confirmation again, then continue
- **'a'**: Continue to Step 2

---

### Step 2: Source Documentation Update (Interactive)

**Detect source references:**

```python
source = extract_from_work_md_or_status_json()
# Returns: "HU-001-002" | "roadmap-2.3" | "manual" | None
```

**IF source exists (HU or roadmap):**

```
📚 Update Source Documentation?

Found:
- planning/roadmap.md → Feature 2.3 "User Authentication"
- planning/user-stories/EP-001/HU-001-002.md

What to update?

a) Update both ⭐
b) Update roadmap only
c) Update user story only
d) Skip (I'll update manually later)

Your choice: _
```

**Execute selected updates:**

- Read files
- Mark checkboxes as complete: `- [ ]` → `- [x]`
- Add timestamp comment: `<!-- Completed: YYYY-MM-DD HH:MM -->`
- Save files

**Show confirmation:**

```
✅ Updated:
- planning/roadmap.md (Feature 2.3)
- planning/user-stories/EP-001/HU-001-002.md (5/5 DoD items)
```

**IF update fails:**

```
❌ Failed to update [file]: [reason]

Options:
1) Retry update
2) Skip this file
3) Cancel finalization

Your choice: _
```

**IF source is "manual" or None:**

```
⏭️ No source documentation to update (manual task)
```

---

### Step 3: Archiving Decision (Explicit Confirmation)

**Show current state:**

```bash
git diff --stat
git log --oneline origin/[base-branch]..HEAD
```

**Present archiving options:**

```
💾 Task Completion Options

Current work:
- Branch: [branch-name]
- Files changed: [N]
- Commits: [N]
- Duration: [X min]

What do you want to do?

a) Complete & Archive ⭐
   → Record analytics, delete work files, clean state

b) Complete & Keep
   → Record analytics, rename folder to [task]-completed

c) Mark as Paused
   → Keep work files for later resume

d) Cancel
   → Go back to editing

Your choice: _
```

**IF 'a' (Complete & Archive):**

```
✅ Archiving task...
```

1. **Extract metadata:**

   ```javascript
   // IF complexity == "COMPLEX" (has status.json):
   analytics = {
     task: '[task-name]',
     type: '[feature|refactor|fix]',
     src: '[HU-001-002|roadmap-2.3|manual]',
     dur: Math.round((completed - created) / 60000), // minutes
     start: timestamps.created,
     end: new Date().toISOString(),
     tasks: progress.totalTasks,
     sp: extract_story_points_from_work_md(),
     commits: git.commits.length,
     valid: validation.tests.passed && validation.lint.passed,
   };

   // IF complexity == "MEDIUM" (only work.md):
   analytics = {
     task: '[task-name]',
     type: '[detected-from-folder-name]',
     src: 'manual',
     dur: estimate_duration_from_git_log(),
     start: get_first_commit_timestamp(),
     end: new Date().toISOString(),
     tasks: count_checkboxes_in_work_md(),
     sp: extract_story_points_from_work_md() || null,
     commits: count_commits_in_branch(),
     valid: validation_passed,
   };
   ```

2. **Append to analytics:**

   ```bash
   echo '{json}' >> .ai-flow/archive/analytics.jsonl
   ```

3. **Delete work folder:**

   ```bash
   rm -rf .ai-flow/work/[task-name]/
   ```

4. **Show confirmation:**

   ```
   ✅ Task archived successfully

   📊 Analytics recorded:
   - Duration: [X] min
   - Story Points: [N]
   - Commits: [N]
   - Validation: [✅ Passed | ❌ Failed]
   ```

**IF 'b' (Complete & Keep):**

1. Record analytics (same as 'a')
2. Rename folder:
   ```bash
   mv .ai-flow/work/[task] .ai-flow/work/[task]-completed/
   ```
3. Show: `✅ Task marked complete. Files kept in: .ai-flow/work/[task]-completed/`

**IF 'c' (Mark as Paused):**

1. Add marker file:
   ```bash
   echo "Paused: $(date)" > .ai-flow/work/[task]/PAUSED
   ```
2. Show: `⏸️ Task paused. Resume with: /flow-work`
3. **END finalization**

**IF 'd' (Cancel):**

1. Show: `❌ Finalization cancelled. Task remains active.`
2. **END finalization**

---

### Step 4: Ticket Summary (Optional)

**Only ask if task was archived (option 'a' or 'b'):**

```
📋 Generate ticket summary?

(For ClickUp, Jira, Linear, Asana, Trello, GitHub Projects, etc.)

y/n: _
```

**IF 'y':**

1. Check if template exists:

   ```bash
   [ -f .ai-flow/prompts/shared/task-summary-template.md ]
   ```

2. **IF template exists:**
   - Read template
   - Extract data from:
     - Last line of `analytics.jsonl`
     - Git stats: `git diff --stat`, `git log --oneline`
     - Branch info
   - Populate template with real data
   - Show formatted summary

3. **IF template doesn't exist:**
   - Generate basic summary:

   ```
   📋 Task Summary

   **Task**: [task-name]
   **Type**: [feature|refactor|fix]
   **Duration**: [X min]
   **Story Points**: [N]
   **Commits**: [N]
   **Branch**: [branch-name]
   **Status**: ✅ Complete

   **Changes**:
   [git diff --stat output]

   **Commits**:
   [git log --oneline output]
   ```

4. Show: `📋 Copy the summary above to your ticket system`

**IF 'n':**

```
⏭️ Skipping ticket summary
```

---

### Step 5: Git Push (Final Step)

```
🚀 Push changes to remote?

git push origin [branch-name]

y/n: _
```

**IF 'y':**

```bash
git push origin [branch-name]
```

Show result:

```
✅ Pushed to origin/[branch-name]

Next steps:
- Create Pull Request/Merge Request
- Request code review
- Update project board
```

**IF 'n':**

```
⏭️ Skipping push

⚠️ Remember to push later:
   git push origin [branch-name]
```

---

### Finalization Complete

```
✅ Task Finalization Complete

📊 Summary:
- [✅|⚠️] Validation passed
- [✅|⏭️] Documentation updated
- [✅|⏭️] Task archived
- [✅|⏭️] Ticket summary generated
- [✅|⏭️] Pushed to remote

Task: [task-name]
Branch: [branch-name]
Duration: [X min]
Commits: [N]

🎉 Great work!
```

**END WORKFLOW**

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
