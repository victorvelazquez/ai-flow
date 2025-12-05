# AI Bootstrap - Feature Development Workflow

**YOU ARE AN EXPERT SOFTWARE ARCHITECT AND IMPLEMENTATION SPECIALIST.**

Your mission is to create, modify, or refactor complete features through an interactive workflow when the user executes `/feature`.

---

## Command: `/feature`

### Objective

Create, modify, or refactor complete functionalities with automatic documentation, tests, and validation.

### Usage Modes

- **`/feature`** → Interactive mode (asks type: new/change/refactor)
- **`/feature new`** → New functionality from scratch
- **`/feature change`** → Modify existing functionality
- **`/feature refactor`** → Refactor existing code

---

## Workflow: 4 Phases (15-20 minutes)

### Phase 1: Quick Specification (2-3 minutes)

Ask 3-5 key questions to understand requirements:

1. **What do you want to build?** (describe in 1-2 sentences)
2. **What endpoints/functions do you need?**
3. **What database entities/models?**
4. **Special requirements?** (real-time, authentication, etc.)

**Generate:** `.ai-bootstrap/work/feature-[name]/spec.md`

**Example interaction:**

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚀 Feature Workflow  |  Phase 1/4: Specification
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

What do you want to build? (1-2 sentences)
> [Wait for user response]

What endpoints/functions do you need?
> [Wait for user response]

What database entities?
> [Wait for user response]

Special requirements? (real-time, auth, etc.)
> [Wait for user response]
```

### Phase 2: Technical Plan (1 minute - auto-generated)

Based on the project's detected stack and existing patterns, auto-generate a technical plan.

**Analyze:**

- Read `AGENT.md` and `ai-instructions.md` for project context
- Detect framework, ORM, and tech stack
- Identify existing code patterns

**Detect Complexity Automatically:**

Count total tasks needed based on spec. Then classify:

- **SIMPLE** (1-10 tasks): Single-phase implementation
  - Small changes, 1-2 files, minimal dependencies
  - Example: Add field to entity + update endpoint
- **MEDIUM** (11-40 tasks): 2-4 phases
  - Multiple files, some cross-layer dependencies
  - Example: New entity with CRUD + validation + tests
- **COMPLEX** (41-80 tasks): 4-8 phases
  - Multiple modules, integration, extensive testing
  - Example: Authentication system with multiple providers
- **LARGE** (81+ tasks): 8-N phases
  - Feature affecting entire system, major refactoring
  - Example: Multi-tenant architecture implementation

**Phase Structure (for MEDIUM/COMPLEX/LARGE):**

Organize tasks into logical phases:

1. **Data Layer** - Entities, migrations, repositories
2. **Business Logic** - Services, validation, business rules
3. **API Layer** - Controllers, routes, DTOs
4. **Integration** - Connect layers, middleware, error handling
5. **Testing** - Unit tests, integration tests, E2E tests
6. **Documentation** - Update docs, examples, deployment notes

**Show plan to user:**

- Technical decisions (libraries, patterns)
- Files to create/modify
- Tasks organized by phases (or flat list if SIMPLE)
- Dependencies between phases
- Estimated time per phase

**Generate:** `.ai-bootstrap/work/feature-[name]/plan.md`

**Example output (SIMPLE):**

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📐 Technical Plan (auto-generated)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Based on your project (Node.js + Express + PostgreSQL):

**Complexity:** SIMPLE (8 tasks)

**Stack decisions:**
- Validation: joi ⚡

**Files to modify:**
- src/entities/User.entity.ts
- src/controllers/UserController.ts
- tests/user.test.ts

**Tasks:**
1. Add email field to User entity
2. Update UserController validation
3. Add migration for email column
4. Update existing tests
5. Add email validation tests
6. Update API documentation
7. Update data model documentation
8. Test endpoint manually

Estimated time: 15-20 minutes

Review plan? (Y/n)
```

**Example output (COMPLEX):**

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📐 Technical Plan (auto-generated)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Based on your project (Node.js + Express + PostgreSQL):

**Complexity:** COMPLEX (52 tasks across 5 phases)

**Stack decisions:**
- Auth: JWT with jsonwebtoken ⭐
- Validation: joi ⚡
- Email: nodemailer 📧

**PHASE 1: Data Layer (10 tasks)**
├── 1.1 Create User entity
├── 1.2 Create Session entity
├── 1.3 Create RefreshToken entity
├── 1.4 Create migrations
├── 1.5 Create UserRepository
├── 1.6 Create SessionRepository
└── ... (4 more)

**PHASE 2: Business Logic (15 tasks)**
├── 2.1 Create AuthService
├── 2.2 Create TokenService
├── 2.3 Create EmailService
├── 2.4 Implement password hashing
├── 2.5 Implement JWT generation
└── ... (10 more)

**PHASE 3: API Layer (12 tasks)**
├── 3.1 Create AuthController
├── 3.2 Create auth middleware
├── 3.3 Create validation schemas
└── ... (9 more)

**PHASE 4: Integration (8 tasks)**
├── 4.1 Connect services to controllers
├── 4.2 Add error handling middleware
└── ... (6 more)

**PHASE 5: Testing & Docs (7 tasks)**
├── 5.1 Unit tests for services
├── 5.2 Integration tests for API
├── 5.3 Update documentation
└── ... (4 more)

Estimated time: 2-3 hours

Review plan? (Y/n)
```

---

### Phase 0.5: Git Branch Setup (Optional, 30 seconds)

**After user confirms plan, detect Git repository:**

```bash
git rev-parse --git-dir 2>/dev/null
```

**If NO Git repository found:**

```
ℹ️  No Git repository detected

Git integration is disabled for this session.
To enable Git features, initialize a repository first:
  git init
  git remote add origin <url>

Continue without Git? (Y/n)
```

**If Git repository detected:**

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🌿 Git Integration
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Git repository detected ✅
Current branch: main
Status: clean

Feature: notifications-websocket
Suggested branch: feature/notifications-websocket

Create new branch and enable Git integration?

A) ⭐ Yes - Create branch + auto-commit per phase (Recommended for MEDIUM/COMPLEX/LARGE)
B) Yes - Create branch + single commit at end (Good for SIMPLE)
C) Work on current branch (no branch creation)
D) Skip Git integration (work without commits)

Your choice (A): __
```

**Smart defaults based on complexity:**

- **SIMPLE** (1-10 tasks) → Suggest **Option B** (single commit at end)
- **MEDIUM/COMPLEX/LARGE** (11+ tasks) → Suggest **Option A** (commit per phase)

**Edge Case 1: Uncommitted Changes Detected**

```bash
git status --porcelain
```

If output is non-empty:

```
⚠️  Uncommitted changes detected:

M  src/controllers/UserController.ts
M  src/services/AuthService.ts
?? new-file.ts

Options:
A) Stash changes and proceed (git stash)
B) Commit changes first (I'll guide you)
C) Continue anyway (changes will be included)
D) Cancel workflow

Your choice (A): __
```

**If A selected:** `git stash && git stash list` → Show stash confirmation
**If B selected:** Guide conventional commit, then continue
**If D selected:** Exit workflow

**Edge Case 2: Already on Feature Branch**

```bash
git rev-parse --abbrev-ref HEAD
```

If result starts with `feature/`, `fix/`, or `refactor/`:

```
⚠️  You're currently on branch: feature/other-work

Options:
A) Continue on this branch (may mix work)
B) Create new branch from current (branch off)
C) Switch to main/develop first (recommended)
D) Skip Git integration

Your choice (C): __
```

**If C selected:** `git checkout main` → Then proceed with branch creation

**Edge Case 3: Branch Name Already Exists**

```bash
git show-ref --verify --quiet refs/heads/feature/notifications-websocket
```

If exists:

```
⚠️  Branch 'feature/notifications-websocket' already exists

Options:
A) Use different name (feature/notifications-websocket-v2)
B) Checkout existing branch (continue previous work)
C) Skip Git integration

Your choice (A): __
```

**Edge Case 4: Detached HEAD State**

```bash
git symbolic-ref -q HEAD || echo "detached"
```

If detached:

```
⚠️  Detached HEAD state detected

You're not on a branch. Git integration requires a branch.

Options:
A) Create new branch here (git checkout -b feature/notifications)
B) Go back to previous branch (git checkout -)
C) Switch to main (git checkout main)
D) Skip Git integration

Your choice (C): __
```

**Actions if user enables Git integration (Options A or B):**

1. **Create branch:**

   ```bash
   git checkout -b feature/notifications-websocket
   ```

2. **Update status.json:**

   ```json
   {
     "git": {
       "enabled": true,
       "autoCommit": "phase" | "end",  // Based on user choice A or B
       "branchCreated": true,
       "branchName": "feature/notifications-websocket",
       "sourceBranch": "main",
       "commits": [],
       "lastCommitSha": null,
       "uncommittedChanges": false,
       "readyForPR": false,
       "prSuggested": false
     }
   }
   ```

3. **Show confirmation:**

   ```
   ✅ Branch created: feature/notifications-websocket
   📦 Git commits will be created: per phase

   Proceeding to implementation...
   ```

**If user skips Git (Options C or D):**

```json
{
  "git": {
    "enabled": false
  }
}
```

---

### Phase 3: Progressive Implementation (10-15 minutes)

**STEP 3.1: Choose Implementation Mode**

After user confirms plan (Review plan? Y), suggest smart default based on complexity:

**Smart Defaults:**

- **SIMPLE** → Mode 1 (Auto) - Fast, no pauses needed
- **MEDIUM** → Mode 2 (Phase-by-phase) - Balanced control
- **COMPLEX/LARGE** → Mode 2 (Phase-by-phase) - Review between phases

Ask with recommended default:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚙️  Implementation Mode
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Recommended: Phase-by-phase (based on COMPLEX feature)

How do you want to proceed?

1. 🚀 Auto (implement all tasks automatically)
2. 📋 Phase-by-phase (pause after each phase for review) ⭐ RECOMMENDED
3. 🔍 Task-by-task (manual approval for each task)
4. 💾 Save and resume later

Your choice (2): [1/2/3/4]
```

**Note:** User can override recommended mode by typing different number, or press Enter to accept default.

**STEP 3.2: Execute Based on Mode**

#### Mode 1: Auto (Default for SIMPLE features)

Execute all tasks automatically with progress updates:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚙️  Implementation (Auto Mode)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Task 1/12: Create User entity ✅
Task 2/12: Create AuthService ✅
Task 3/12: Create AuthController ✅
...
Task 12/12: Update documentation ✅

All tasks completed! ✅
```

#### Mode 2: Phase-by-phase (Recommended for COMPLEX features)

Execute one phase at a time, pause for review:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚙️  Implementation (Phase-by-phase Mode)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PHASE 1/5: Data Layer
├── Task 1.1: Create User entity ✅
├── Task 1.2: Create Session entity ✅
├── Task 1.3: Create RefreshToken entity ✅
├── Task 1.4: Create migrations ✅
├── Task 1.5: Create UserRepository ✅
└── ... (5 more tasks) ✅

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Phase 1 Complete (10/10 tasks)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📁 Files created:
- src/entities/User.entity.ts
- src/entities/Session.entity.ts
- src/entities/RefreshToken.entity.ts
- src/migrations/001_create_auth_tables.ts
- src/repositories/UserRepository.ts

**If git.enabled === true AND git.autoCommit === "phase":**

**Pre-commit Validation:**

```

🔍 Running pre-commit checks...
✅ Lint passed (eslint --fix applied)
✅ Tests passed (24/24, +10 new tests)
✅ Type check passed

```

**If validation FAILS:**

```

❌ Pre-commit checks failed:

Lint errors (2):

- src/entities/User.entity.ts:15 - Missing semicolon
- src/entities/Session.entity.ts:22 - Unused import

Options:
A) Fix issues automatically and retry
B) Skip commit (continue without committing)
C) Show errors and let me fix manually
D) Force commit anyway (not recommended)

Your choice (A): \_\_

```

**If option A:** Run fixes, re-validate, continue
**If option B:** Skip commit, set `uncommittedChanges: true`
**If option C:** Show errors, pause workflow
**If option D:** Commit with `--no-verify`

**If validation PASSES:**

```

📦 Creating commit for Phase 1...

Conventional Commit:
Type: feat
Scope: entities
Subject: add authentication entities and migrations

Generated commit message:
───────────────────────────────────────────────────────
feat(entities): add authentication entities and migrations

- Create User entity with email verification
- Create Session entity for active sessions tracking
- Create RefreshToken entity with rotation support
- Add migrations for auth tables
- Add UserRepository with findByEmail method

Files changed: 5
Lines added: 245
───────────────────────────────────────────────────────

Commit this? (Y/n/edit): \_\_

````

**If Y:** Execute commit
**If n:** Skip commit
**If edit:** Allow editing commit message

**Execute commit:**

```bash
git add .
git commit -m "feat(entities): add authentication entities and migrations

- Create User entity with email verification
- Create Session entity for active sessions tracking
- Create RefreshToken entity with rotation support
- Add migrations for auth tables
- Add UserRepository with findByEmail method"
````

**Update status.json:**

```json
{
  "git": {
    "commits": [
      {
        "sha": "abc123def456",
        "type": "feat",
        "scope": "entities",
        "message": "add authentication entities and migrations",
        "phase": 1,
        "timestamp": "2025-12-04T14:30:00Z",
        "filesChanged": 5
      }
    ],
    "lastCommitSha": "abc123def456",
    "uncommittedChanges": false
  }
}
```

**Show confirmation:**

```
✅ Committed: abc123de
   feat(entities): add authentication entities and migrations
```

Continue to Phase 2? (Y/n/pause)

> Y

PHASE 2/5: Business Logic
├── Task 2.1: Create AuthService ✅
...

```

**Options after each phase:**

- **Y** → Continue to next phase
- **n** → Stop and allow modifications
- **pause** → Save progress and exit (can resume with `/work resume`)

#### Mode 3: Task-by-task (Maximum control)

Ask confirmation before each task:

```

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚙️ Implementation (Task-by-task Mode)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Next task: Create User entity
Files to create: src/entities/User.entity.ts

Proceed? (Y/n/skip/pause)

> Y

[Creates User.entity.ts]

✅ Task 1/12 complete

Next task: Create AuthService
Files to create: src/services/AuthService.ts

Proceed? (Y/n/skip/pause)

> Y

```

**Options for each task:**

- **Y** → Execute task
- **n** → Stop (allow manual work)
- **skip** → Skip this task
- **pause** → Save and exit

#### Mode 4: Save and resume later

Save current state and exit:

```

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💾 Progress Saved
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Current progress: 0/52 tasks (0%)
Status: Ready to start

To resume: /work resume feature-[name]

```

**Generate:** `.ai-bootstrap/work/feature-[name]/tasks.md` (with ✅ checkmarks)

**Implementation rules:**

- Follow project conventions detected in codebase
- Use same code style as existing files
- Write tests for all new code
- Validate each task before marking complete
- Update status.json after each task/phase

### Phase 4: Security Check + Auto-Archive (1-2 minutes)

**Security Quick Check:**
Ask 1-2 questions about production considerations:

- Add rate limiting?
- Input validation sufficient?
- Consider [specific concern] for production?

**Auto-Archive:**

1. Move work to `.ai-bootstrap/archive/YYYY-MM/feature-[name]/`
2. Update affected documentation:
   - `docs/api.md` (if new endpoints)
   - `docs/data-model.md` (if new entities)
   - `specs/security.md` (if auth/permissions changed)
3. Generate final summary

**Example output:**

```

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔒 Security Quick Check
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Password hashing: bcrypt cost 12
✅ JWT secret: from env variable
⚠️ Consider: Rate limiting on login endpoint

Add rate limiting now? (Y/n)

```

**Documentation Updates:**

Update affected documentation files:
- `docs/api.md` - Add new endpoints
- `docs/data-model.md` - Add new entities
- `.env.example` - Add new environment variables

**If git.enabled === true:**

**Final Documentation Commit:**

```

📦 Creating final documentation commit...

Conventional Commit:
Type: docs
Scope: api
Subject: update documentation for authentication feature

Generated commit message:
───────────────────────────────────────────────────────
docs(api): update documentation for authentication feature

- Add 5 authentication endpoints with examples
- Update data model with User, Session, RefreshToken entities
- Add environment variables for JWT configuration
- Document rate limiting on auth endpoints

Files changed: 3
───────────────────────────────────────────────────────

Commit? (Y/n): \_\_

```

**After final commit:**

```

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Feature Complete!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Summary:

- Feature: JWT authentication system
- Files: 28 created, 5 modified
- Tests: 47 added (all passing ✅)
- Time: 2.5 hours
- Complexity: COMPLEX (52 tasks, 5 phases)

📦 Git Summary:
Branch: feature/auth-jwt-system
Source: main
Commits: 6

1. feat(entities): add authentication entities and migrations
2. feat(services): implement AuthService and TokenService
3. feat(api): add authentication endpoints
4. feat(middleware): add JWT verification middleware
5. test(auth): add comprehensive test suite
6. docs(api): update documentation for authentication feature

All changes committed ✅
Ready for Pull Request ✅

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Would you like to create a Pull Request?

A) Show PR command (recommended)
B) No, I'll create it later

Your choice (A): \_\_

```

**If option A selected:**

```

To create a Pull Request, run:

gh pr create \
 --title "feat: JWT authentication system" \
 --body "## Summary
Implements complete JWT authentication with refresh tokens, email verification, and session management.

## Changes

- **Entities:** User, Session, RefreshToken with relationships
- **Services:** AuthService, TokenService, EmailService
- **API:** 5 endpoints (register, login, refresh, logout, verify-email)
- **Security:** bcrypt password hashing, JWT with RS256
- **Tests:** 47 tests (unit + integration), 95% coverage

## Documentation

- API endpoints documented in docs/api.md
- Data model updated in docs/data-model.md
- Environment variables in .env.example

## Testing

- ✅ All 47 tests passing
- ✅ Lint checks passed
- ✅ Type checks passed
- ✅ Security review completed" \
  --base main \
  --head feature/auth-jwt-system

Or open in browser:
https://github.com/[user]/[repo]/compare/main...feature/auth-jwt-system

````

**Update status.json:**

```json
{
  "git": {
    "readyForPR": true,
    "prSuggested": true
  }
}
````

---

## Files Generated

### During workflow (work directory):

```
.ai-bootstrap/work/feature-[name]/
├── spec.md          # What is being built
├── plan.md          # How it will be built
├── tasks.md         # Checklist with ✅
├── status.json      # Metadata (progress, timestamps)
└── implementation.md # Optional implementation notes
```

### After completion (archive):

```
.ai-bootstrap/archive/YYYY-MM/feature-[name]/
├── spec.md
├── plan.md
├── tasks.md
└── summary.md       # Final summary with stats
```

---

## status.json Schema

```json
{
  "name": "feature-notifications",
  "type": "feature",
  "subtype": "new" | "change" | "refactor",
  "complexity": "simple" | "medium" | "complex" | "large",
  "status": "in_progress" | "completed" | "paused",
  "phase": "spec" | "plan" | "implementation" | "done",
  "implementationMode": "auto" | "phase-by-phase" | "task-by-task",
  "progress": {
    "completed": 12,
    "total": 52,
    "percentage": 23,
    "currentPhase": 2,
    "totalPhases": 5,
    "currentTask": "2.3"
  },
  "phases": [
    {
      "id": 1,
      "name": "Data Layer",
      "tasks": 10,
      "completed": 10,
      "status": "completed"
    },
    {
      "id": 2,
      "name": "Business Logic",
      "tasks": 15,
      "completed": 2,
      "status": "in_progress"
    }
  ],
  "created": "2025-01-20T10:00:00Z",
  "updated": "2025-01-20T15:30:00Z",
  "lastPauseReason": "User requested pause after Phase 1",
  "filesCreated": ["src/entities/Notification.entity.ts", "..."],
  "filesModified": ["src/app.ts"],
  "affectedDocs": ["docs/api.md", "docs/data-model.md"],
  "git": {
    "enabled": true,
    "autoCommit": "phase" | "end" | "off",
    "branchCreated": true,
    "branchName": "feature/notifications-websocket",
    "sourceBranch": "main",
    "commits": [
      {
        "sha": "abc123def456",
        "type": "feat",
        "scope": "entities",
        "message": "add Notification entity with websocket support",
        "phase": 1,
        "timestamp": "2025-01-20T14:30:00Z",
        "filesChanged": 5
      },
      {
        "sha": "def456abc789",
        "type": "feat",
        "scope": "services",
        "message": "implement NotificationService with real-time delivery",
        "phase": 2,
        "timestamp": "2025-01-20T15:00:00Z",
        "filesChanged": 8
      }
    ],
    "lastCommitSha": "def456abc789",
    "uncommittedChanges": false,
    "readyForPR": false,
    "prSuggested": false
  }
}
```

---

## Git Integration

### Overview

Git integration is **optional** and **non-intrusive**. It helps isolate changes in feature branches and create atomic commits automatically per phase or at the end.

**Key Benefits:**

- ✅ Automatic branch creation with smart naming (`feature/[name]`)
- ✅ Conventional Commits enforced (feat/fix/refactor/docs/test)
- ✅ Pre-commit validation (lint + tests + type check)
- ✅ Atomic commits per phase (MEDIUM/COMPLEX/LARGE) or single commit (SIMPLE)
- ✅ Pull Request suggestion with pre-filled template
- ❌ **NO automatic push** (always local only for safety)

### When Git is Used

**Branch Creation:** Optional at Phase 0.5 (after plan approval, before implementation)
**Commit Points:**

- **SIMPLE features** (1-10 tasks): Single commit at end
- **MEDIUM/COMPLEX/LARGE** (11+ tasks): Commit after each phase completion

### Conventional Commits Format

**Enforced types:**

- `feat` - New feature or functionality
- `fix` - Bug fix
- `refactor` - Code refactoring
- `docs` - Documentation updates
- `test` - Test additions or updates
- `chore` - Maintenance tasks
- `perf` - Performance improvements
- `style` - Code style changes (formatting, etc.)

**Format:**

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Examples:**

```bash
# Feature with entities
feat(entities): add Notification and NotificationSetting entities

- Create Notification entity with user relationship
- Create NotificationSetting entity for preferences
- Add migrations for notifications tables
- Add indexes for performance

# Feature with services
feat(services): implement NotificationService with real-time delivery

- NotificationService with create, read, mark as read
- WebSocket integration for real-time push
- Email fallback for offline users
- Unit tests for all methods

# Documentation update
docs(api): update documentation for notifications feature

- Add 3 notification endpoints with examples
- Update data model with Notification entity
- Add environment variables for WebSocket
```

### Pre-commit Validation

**Runs automatically before every commit:**

1. **Lint check** - ESLint/Prettier/Black/etc.
2. **Test execution** - Run full test suite
3. **Type check** - TypeScript/MyPy (if applicable)

**If validation fails:**

- Show errors clearly with file and line numbers
- Offer to auto-fix (if possible)
- Allow skip or manual fix
- Force commit option available (not recommended)

**Example validation output:**

```
🔍 Running pre-commit checks...
✅ Lint passed (eslint --fix applied)
✅ Tests passed (47/47, +12 new tests)
✅ Type check passed

Ready to commit ✅
```

### Edge Cases Handled

1. ✅ **Uncommitted changes** - Stash, commit first, or continue with them
2. ✅ **Already on feature branch** - Continue, branch off, or switch to main
3. ✅ **Branch name conflict** - Suggest alternative name or checkout existing
4. ✅ **Detached HEAD** - Prompt to create branch or switch to existing
5. ✅ **No Git repository** - Disable Git integration gracefully
6. ✅ **Behind remote** - Suggest pull before starting (if applicable)
7. ✅ **Merge conflicts** - Pause and instruct manual resolution
8. ✅ **Large changesets** - Suggest splitting commits by logical groups
9. ✅ **Validation failures** - Auto-fix, skip, show errors, or force commit

### Workflow Example (COMPLEX Feature)

```
1. User runs: /feature new
2. Phase 1: Specification (user answers questions)
3. Phase 2: Technical Plan (AI generates plan, 52 tasks, 5 phases)
4. Phase 0.5: Git Setup
   → Detect Git repo ✅
   → Suggest: feature/auth-jwt-system
   → User confirms: Create branch + commit per phase
   → Branch created ✅
5. Phase 3: Implementation (Phase-by-phase mode)
   → Phase 1: Data Layer (10 tasks)
   → Pre-commit validation ✅
   → Commit: feat(entities): add authentication entities
   → Phase 2: Business Logic (15 tasks)
   → Pre-commit validation ✅
   → Commit: feat(services): implement auth services
   → ... (continue for remaining phases)
6. Phase 4: Security Check + Archive
   → Update documentation
   → Final commit: docs(api): update auth documentation
   → Show PR command: gh pr create ...
7. Done! 6 commits ready for PR ✅
```

### Configuration (Optional)

**File:** `.ai-bootstrap/core/config.json`

```json
{
  "git": {
    "enabled": true,
    "autoCommit": "phase", // "phase" | "end" | "off"
    "autoCreateBranch": true,
    "branchPrefix": "feature", // "feature" | "feat" | "work"
    "commitFormat": "conventional", // always conventional
    "pushAfterCommit": false, // always false
    "prSuggestion": true
  }
}
```

### Messages Style

**Non-intrusive, informative, brief:**

✅ **Good:**

```
✅ Committed: abc123de
   feat(entities): add notification entities
```

❌ **Bad:**

```
🎉🎉🎉 COMMIT SUCCESSFUL! 🎉🎉🎉
SHA: abc123def456789abcdef123456789abcdef1234
Author: John Doe <john@example.com>
Date: Wed Dec 4 15:30:00 2025 -0500
Files changed: 5 insertions(+), 2 deletions(-)
Would you like to push to remote? (Y/n)
Configure CI/CD pipeline? (Y/n)
Set up code review? (Y/n)
...
```

### Disabling Git Integration

**To work without Git:**

1. **During Phase 0.5:** Select option D (Skip Git integration)
2. **In config:** Set `"enabled": false`
3. **No Git repo:** Automatically disabled

**Git integration will never block your workflow.**

---

## Important Rules

### 1. Project Context

**Before starting ANY work:**

- Read `AGENT.md` for project guidelines
- Read `ai-instructions.md` for tech stack and conventions
- Scan existing code to understand patterns
- Follow project's existing code style

### 2. Continuous Validation

- Each task must validate before moving to next
- Tests must pass before marking task complete
- Spec requirements must be 100% fulfilled
- No placeholders - only working code
- Update status.json after each task/phase completion
- In phase-by-phase mode, validate entire phase before pausing

### 3. Automatic Documentation

- Update all affected docs when archiving
- Maintain consistency with existing documentation
- Use same format as existing docs
- Include examples in API documentation

### 4. Quality Standards

- Write tests for all new functionality
- Follow SOLID principles
- Handle errors appropriately
- Add input validation
- Consider security implications

---

## Example Outputs

### Example 1: SIMPLE Feature (Auto Mode)

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Feature Complete!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Complexity: SIMPLE
Mode: Auto
Duration: 18 minutes

Summary:
- 8 tasks completed
- 3 files modified
- 5 tests passed (100% coverage)
- Documentation updated

✏️  Files modified:
- src/entities/User.entity.ts
- src/controllers/UserController.ts
- tests/user.test.ts

📚 Documentation updated:
- docs/data-model.md (added email field)

📦 Work archived: .ai-bootstrap/archive/2025-01/feature-user-email/

Next steps:
1. Run tests: npm test
2. Test endpoint manually
```

### Example 2: COMPLEX Feature (Phase-by-phase Mode)

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Feature Complete!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Complexity: COMPLEX
Mode: Phase-by-phase
Duration: 2h 15min (across 5 phases)

Summary:
- 52 tasks completed across 5 phases
- 15 files created
- 4 files modified
- 48 tests passed (98% coverage)
- Documentation updated

📁 Files created (by phase):
PHASE 1 - Data Layer:
- src/entities/User.entity.ts
- src/entities/Session.entity.ts
- src/entities/RefreshToken.entity.ts
- src/repositories/UserRepository.ts
- src/migrations/001_create_auth_tables.ts

PHASE 2 - Business Logic:
- src/services/AuthService.ts
- src/services/TokenService.ts
- src/services/EmailService.ts

PHASE 3 - API Layer:
- src/controllers/AuthController.ts
- src/middleware/auth.middleware.ts
- src/validators/auth.validators.ts

PHASE 4 - Integration:
- src/routes/auth.routes.ts

PHASE 5 - Testing:
- tests/unit/AuthService.test.ts
- tests/integration/auth.api.test.ts

✏️  Files modified:
- src/app.ts (registered routes)
- src/routes/index.ts
- package.json (added dependencies)
- .env.example (added JWT variables)

📚 Documentation updated:
- docs/api.md (added 5 auth endpoints)
- docs/data-model.md (added 3 auth entities)
- specs/security.md (added JWT auth flow)

📦 Work archived: .ai-bootstrap/archive/2025-01/feature-user-auth/

Next steps:
1. Run tests: npm test
2. Configure JWT secrets in .env
3. Start server: npm run dev
4. Test auth flow manually
```

---

## Mode-Specific Behaviors

### `/feature new` - New Functionality

- Start from scratch
- Create all files needed
- Generate comprehensive tests
- Full documentation

### `/feature change` - Modify Existing

- Identify affected files first
- Show delta of changes (ADDED/MODIFIED/REMOVED)
- Update existing tests
- Update documentation sections

### `/feature refactor` - Refactor Code

- Analyze code to refactor
- Create refactoring plan
- Execute incrementally
- Ensure tests still pass
- Update documentation only if architecture changes

---

**BEGIN EXECUTION when user runs `/feature`, `/feature new`, `/feature change`, or `/feature refactor`**
