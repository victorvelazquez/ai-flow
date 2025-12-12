# AI Flow - Feature Development Workflow

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
- **`/feature HU-XXX-XXX`** → Implement specific User Story (from Phase 10)
- **`/feature Feature Name`** → Implement feature from roadmap.md (Phase 9)

---

## Quick Examples

### With User Story (Recommended)

```bash
/feature HU-001-001  # Auto-loads: acceptance criteria, tasks, tests, DoD
# ✅ 0 questions asked, 5 SP, ~1.5h
```

### With Roadmap Feature

```bash
/feature User Entity Repository  # Auto-loads: tasks from roadmap.md
# ✅ 0 questions asked, 12 SP, ~2-3h
```

### Interactive Mode

```bash
/feature new  # AI asks 5 questions, generates plan
# ⏱️ 2-3 min questions, then implementation
```

---

## Workflow: 4 Phases (15-20 minutes)

### Phase 0: Detect Input Mode (5 seconds - automatic)

**Check if User Story ID or Feature name provided:**

```typescript
const input = getArguments(); // From /feature [args]

if (input.match(/^HU-\d{3}-\d{3}$/)) {
  mode = 'USER_STORY';
  storyId = input; // e.g., HU-001-001
  // Load from user-stories/EP-XXX/HU-XXX-XXX.md
} else if (fs.existsSync('roadmap.md')) {
  // Search for Feature in roadmap.md matching input
  const roadmapContent = readFile('roadmap.md');
  const featureMatch = roadmapContent.match(new RegExp(`### Feature.*${input}.*• (\d+) SP`));
  if (featureMatch) {
    mode = 'ROADMAP_FEATURE';
    featureName = input;
    // Extract tasks from roadmap.md
  } else {
    mode = 'INTERACTIVE'; // Fallback to manual questions
  }
} else {
  mode = 'INTERACTIVE'; // No roadmap/user-stories found
}
```

**Mode behavior:**

| Mode              | Source                              | Skip Phase 1             |
| ----------------- | ----------------------------------- | ------------------------ |
| `USER_STORY`      | `user-stories/EP-XXX/HU-XXX-XXX.md` | ✅ Yes (auto-load spec)  |
| `ROADMAP_FEATURE` | `roadmap.md` Feature section        | ✅ Yes (auto-load tasks) |
| `INTERACTIVE`     | Manual questions                    | ❌ No (ask user)         |

---

### Phase 1: Quick Specification (2-3 minutes or AUTO-SKIP)

**IF mode = `USER_STORY`:** _(Skip questions, load from file)_

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚀 Feature Workflow  |  Phase 1/4: Specification (AUTO-LOADED)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📖 Loading User Story: HU-001-001

Source: user-stories/EP-001/HU-001-001.md

✅ Title: Login básico con email y contraseña
✅ Priority: Alta (P0)
✅ Story Points: 5 SP
✅ Acceptance Criteria: 3 scenarios (Gherkin)
✅ Technical Tasks: 6 tasks
✅ Test Cases: 8 QA test cases
✅ Definition of Done: 9 items

Skipping manual questions (spec already defined)...
```

**IF mode = `ROADMAP_FEATURE`:** _(Skip questions, load from roadmap)_

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚀 Feature Workflow  |  Phase 1/4: Specification (AUTO-LOADED)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🗺️ Loading Feature from roadmap.md: User Entity & Repository

✅ Epic: 2 - Data Layer
✅ Priority: P0
✅ Story Points: 12 SP (~2-3d)
✅ Tasks: 8 tasks (T001-T008)
✅ Dependencies: None (foundational)

Skipping manual questions (roadmap already defined)...
```

**IF mode = `INTERACTIVE`:** _(Ask manual questions)_

Ask 3-5 key questions to understand requirements:

1. **What do you want to build?** (describe in 1-2 sentences)
2. **What endpoints/functions do you need?**
3. **What database entities/models?**
4. **Special requirements?** (real-time, authentication, etc.)

**Generate:** `.ai-flow/work/NNN-feature-name/spec.md`

**Example:** `.ai-flow/work/003-user-authentication/spec.md`

**IF loaded from User Story (HU-XXX-XXX):**

- Copy `user-stories/EP-XXX/HU-XXX-XXX.md` → `.ai-flow/work/NNN-HU-XXX-XXX/spec.md`
- Include: User Story format, Acceptance Criteria (Gherkin), Technical Tasks, Test Cases, DoD

**IF loaded from roadmap.md Feature:**

- Extract Feature section → `.ai-flow/work/NNN-feature-name/spec.md`
- Include: Scope, Tasks (T001-T00N), Dependencies, Ready-to-execute command

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

#### Step 2.1: Auto-Assign Feature Number

**Generate sequential feature number for tracking and organization:**

```
🔢 Assigning feature number...

Scanning .ai-flow/work/ directory...
Last feature: 002-notifications
New feature: 003-[feature-name]

Creating: .ai-flow/work/003-[feature-name]/
```

**Numbering Rules:**

- Auto-increment from existing features in `.ai-flow/work/`
- Format: `NNN-feature-name` (e.g., `001-auth`, `002-notifications`)
- Slug: Lowercase, hyphens, no special characters
- If no existing features → Start at `001`

**Example transformations:**

- "User Authentication" → `003-user-authentication`
- "Payment Processing" → `004-payment-processing`
- "Real-Time Notifications" → `005-real-time-notifications`

#### Step 2.2: Analyze Project Context & Load Tasks

**IF mode = `USER_STORY` or `ROADMAP_FEATURE`:** _(Reuse existing tasks)_

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📐 Technical Plan (LOADED from User Story HU-001-001)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Story Points: 5 SP (from roadmap.md)
✅ Tasks: 6 technical tasks (inherited)
✅ Test Cases: 8 QA test cases (from acceptance criteria)
✅ Acceptance Criteria: 3 scenarios (Gherkin Given/When/Then)

**Tasks from User Story:** (execution order with hybrid estimation)

- [ ] [T-001-001] Write User entity tests • 1 SP (~1-2h)
      File: tests/unit/User.spec.ts
      Dependencies: None

- [ ] [T-001-002] Create User entity • 1 SP (~1-2h)
      File: src/domain/entities/User.ts
      Dependencies: T-001-001

- [ ] [T-001-003] Implement AuthService login method • 2 SP (~3-4h)
      File: src/services/AuthService.ts
      Dependencies: T-001-002

- [ ] [T-001-004] Create POST /api/auth/login endpoint • 1 SP (~1-2h)
      File: src/controllers/AuthController.ts
      Dependencies: T-001-003

- [ ] [T-001-005] Write integration tests • 2 SP (~3-4h)
      File: tests/integration/auth.spec.ts
      Dependencies: T-001-003

- [ ] [T-001-006] Validate against Definition of Done • trivial (~15 min)
      - Code review approved
      - Tests passing (unit + integration)
      - QA test cases executed (8/8)
      - Documentation updated
      - Lint/format clean
      Dependencies: T-001-005

**Acceptance Criteria Validation:**

Will verify implementation against:

✅ Scenario 1: Login exitoso
   Dado que el usuario tiene credenciales válidas
   Cuando ingresa email y contraseña correctos
   Entonces recibe JWT token y accede al sistema

✅ Scenario 2: Credenciales inválidas
   Dado que el usuario ingresa credenciales incorrectas
   Cuando intenta iniciar sesión
   Entonces recibe error 401 con mensaje claro

✅ Scenario 3: Rate limiting
   Dado que el usuario falla login 5 veces en 15 minutos
   Cuando intenta login nuevamente
   Entonces recibe error 429 (Too Many Requests)

**QA Test Cases to Execute:**

After implementation, run 8 test cases:
- TC-001-001: Login exitoso (Happy Path)
- TC-001-002: Credenciales inválidas (Error Case)
- TC-001-003: Rate limiting (Edge Case)
- [... 5 more test cases from User Story]

Ready to implement? (Y/n)
```

**IF mode = `INTERACTIVE`:** _(Generate plan from scratch)_

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

**Story Points Estimation (Fibonacci Scale):**

Estimate complexity using industry-standard Fibonacci Story Points:

| Story Points | Complexity | Typical Time | Example Task                           |
| ------------ | ---------- | ------------ | -------------------------------------- |
| **1 SP**     | Trivial    | 1-2 hours    | Add simple field, update enum          |
| **2 SP**     | Very Small | 2-4 hours    | Basic validation, simple test          |
| **3 SP**     | Small      | 4-8 hours    | Simple CRUD endpoint, basic entity     |
| **5 SP**     | Medium     | 1-2 days     | Complex endpoint with business logic   |
| **8 SP**     | Complex    | 2-3 days     | Auth flow, complex validation          |
| **13 SP**    | Large      | 1 week       | Complete module with full tests        |
| **21 SP**    | Very Large | 2 weeks      | Major feature with integration         |
| **34 SP**    | Epic       | 3 weeks      | Multiple related features (Epic-level) |

> **Note:** Times assume experienced developer with AI assistance.
> Without AI: multiply by 2-3x.

### Story Points to Time Conversion (Hybrid Estimation)

**Use this table to add precise time estimates to each task:**

| Story Points | Time Estimate (solo dev) | Time Range | Example Task                            |
| ------------ | ------------------------ | ---------- | --------------------------------------- |
| **1 SP**     | 1-2 hours                | (~1-2h)    | Add enum value, simple config change    |
| **2 SP**     | 3-4 hours                | (~3-4h)    | Write 5-8 unit tests, basic validation  |
| **3 SP**     | 4-8 hours                | (~4-8h)    | Simple CRUD endpoint, basic entity      |
| **5 SP**     | 1-2 days                 | (~1-2d)    | Complex endpoint with business logic    |
| **8 SP**     | 2-3 days                 | (~2-3d)    | Auth flow, complex validation           |
| **13 SP**    | 1 week                   | (~1w)      | Complete module with full test coverage |
| **21 SP**    | 2 weeks                  | (~2w)      | Major feature with integration          |
| **34 SP**    | 3 weeks                  | (~3w)      | Multiple related features (Epic-level)  |

> **Note:** Time assumes AI-assisted development (Copilot/Claude). Without AI, multiply by 2-3x.
> For team velocity adjustment, track actual time vs estimates after 2-3 features.

### Task Format Reference (Spec-Kit Inspired)

**Every task must follow this format:**

```markdown
- [ ] [TaskID] [Optional:P] Description • SP (~time)
      File: exact/path/to/file.ts
      Dependencies: T001, T002 (or "None")
```

**Components explained:**

- **[TaskID]**: Sequential ID in execution order (T001, T002, ..., T099, T100)
- **[P] marker**: ONLY for parallelizable tasks (different files, no blocking deps)
- **Description**: What to implement (specific, LLM-completable without additional context)
- **• SP (~time)**: Hybrid estimation - Story Points + time (e.g., "2 SP (~3-4h)", "5 SP (~1-2d)")
- **File path**: Exact file where work happens (REQUIRED)
- **Dependencies**: Which tasks must complete first (REQUIRED, even if "None")

**Task Sequencing Rules:**

1. Tests BEFORE implementation (TDD approach) when applicable
2. Models → Services → Controllers → Endpoints
3. Core utilities BEFORE features that use them
4. Database migrations BEFORE data access code
5. Interfaces BEFORE implementations

**Parallelization Rules ([P] marker):**

✅ **Use [P] when:**

- Tasks target different files
- No shared dependencies
- Can run simultaneously (e.g., independent entities, different test suites)

❌ **Don't use [P] when:**

- Task depends on another incomplete task
- Same file is modified
- Shared resource (DB migration, config file)

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

**Generate:** `.ai-flow/work/NNN-feature-name/plan.md`

**Example:** `.ai-flow/work/003-user-authentication/plan.md`

**Example output (SIMPLE):**

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📐 Technical Plan (auto-generated)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Based on your project (Node.js + Express + PostgreSQL):

**Complexity:** SIMPLE (8 tasks) • 3 SP (~15-20 min)
⏱️ **Est. Time:** 15-20 minutes

**Stack decisions:**
- Validation: joi ⚡

**Files to modify:**
- src/entities/User.entity.ts
- src/controllers/UserController.ts
- tests/user.test.ts

**Tasks:** (execution order with hybrid estimation)

- [ ] [T001] Add email field to User entity • 1 SP (~1-2h)
      File: src/entities/User.entity.ts
      Dependencies: None

- [ ] [T002] Add migration for email column • 1 SP (~1h)
      File: src/migrations/002_add_email_to_users.ts
      Dependencies: T001 (needs entity schema)

- [ ] [T003] [P] Update UserController validation • 1 SP (~1h)
      File: src/controllers/UserController.ts
      Dependencies: T001 (needs entity field)

- [ ] [T004] [P] Update existing user tests • 1 SP (~1h)
      File: tests/user.test.ts
      Dependencies: T001 (can run parallel with T003)

- [ ] [T005] Add email validation tests • 1 SP (~1-2h)
      File: tests/user.test.ts
      Dependencies: T003 (needs controller validation)

- [ ] [T006] [P] Update API documentation • trivial (~15 min)
      File: docs/api.md
      Dependencies: None (can run parallel)

- [ ] [T007] [P] Update data model documentation • trivial (~15 min)
      File: docs/data-model.md
      Dependencies: None (can run parallel)

- [ ] [T008] Test endpoint manually • trivial (~10 min)
      Dependencies: T005 (needs all code complete)

**Parallelization Notes:**
- T003 and T004 can run in parallel (different concerns)
- T006 and T007 can run in parallel (different docs)

**Total:** 3 SP (~15-20 min with AI assistance)

Review plan? (Y/n)
```

**Example output (COMPLEX):**

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📐 Technical Plan (auto-generated)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Based on your project (Node.js + Express + PostgreSQL):

**Complexity:** COMPLEX (52 tasks across 5 phases) • 34 SP (~2-3 hours)
⏱️ **Est. Time:** 2-3 hours (with AI assistance)

**Stack decisions:**
- Auth: JWT with jsonwebtoken ⭐
- Validation: joi ⚡
- Email: nodemailer 📧

## Phase 1: Data Layer • 8 SP (~30-40 min)

**Tasks:** (Test-First approach, execution order)

- [ ] [T001] [P] Write unit tests for User entity (8 tests) • 2 SP (~3-4h)
      File: tests/unit/entities/User.entity.spec.ts
      Tests: email format, password hashing, role validation, timestamps
      Dependencies: None (can run parallel with T003, T005)

- [ ] [T002] Create User entity with validation • 2 SP (~3-4h)
      File: src/entities/User.entity.ts
      Implements: Email regex, password bcrypt, role enum, timestamps
      Dependencies: None

- [ ] [T003] [P] Write unit tests for Session entity (4 tests) • 1 SP (~1-2h)
      File: tests/unit/entities/Session.entity.spec.ts
      Tests: session creation, expiration, invalidation
      Dependencies: None (can run parallel with T001)

- [ ] [T004] Create Session entity • 1 SP (~1-2h)
      File: src/entities/Session.entity.ts
      Implements: User FK, token, expiration, status
      Dependencies: T002 (needs User entity)

- [ ] [T005] [P] Write unit tests for RefreshToken entity (4 tests) • 1 SP (~1-2h)
      File: tests/unit/entities/RefreshToken.entity.spec.ts
      Tests: token generation, rotation, revocation
      Dependencies: None (can run parallel with T001, T003)

- [ ] [T006] Create RefreshToken entity • 1 SP (~1-2h)
      File: src/entities/RefreshToken.entity.ts
      Implements: User FK, token, expiration, rotation tracking
      Dependencies: T002 (needs User entity)

- [ ] [T007] Create database migrations • 1 SP (~1-2h)
      File: src/migrations/001_create_auth_tables.ts
      Creates: users, sessions, refresh_tokens tables with indexes
      Dependencies: T002, T004, T006 (needs all entity schemas)

- [ ] [T008] Create IUserRepository interface • 1 SP (~1h)
      File: src/repositories/interfaces/IUserRepository.ts
      Methods: create, findById, findByEmail, update, delete
      Dependencies: T002 (needs User entity type)

- [ ] [T009] Implement UserRepository • 1 SP (~1-2h)
      File: src/repositories/UserRepository.ts
      Implements: All CRUD methods from IUserRepository
      Dependencies: T002, T008

- [ ] [T010] Create SessionRepository • 1 SP (~1h)
      File: src/repositories/SessionRepository.ts
      Methods: create, findByToken, invalidate, findActiveByUser
      Dependencies: T004 (needs Session entity)

- [ ] [T011] Create RefreshTokenRepository • 1 SP (~1h)
      File: src/repositories/RefreshTokenRepository.ts
      Methods: create, findByToken, revoke, rotateToken
      Dependencies: T006 (needs RefreshToken entity)

**Task Execution Graph (Phase 1):**

```

T001 [P] ──┐
T003 [P] ──┼──> (Tests can run parallel)
T005 [P] ──┘

T002 ──┬──> T004
├──> T006
├──> T007 (needs T002, T004, T006)
├──> T008 ──> T009
│
└──> T010 (needs T004)
T011 (needs T006)

```

**Parallelization Notes (Phase 1):**
- T001, T003, T005 can run in parallel (different test files)
- T002 is foundational (blocks T004, T006, T008, T009)
- T010 and T011 can run in parallel after T004/T006 complete

## Phase 2: Business Logic • 13 SP (~50-60 min)

**Tasks:**

- [ ] [T012] [P] Write unit tests for AuthService (12 tests) • 3 SP (~4-8h)
      File: tests/unit/services/AuthService.spec.ts
      Tests: register, login, logout, refresh, email verification
      Dependencies: None (can run parallel with T014, T016)

- [ ] [T013] Create AuthService • 3 SP (~4-8h)
      File: src/services/AuthService.ts
      Implements: register, login, logout, refresh, verify email
      Dependencies: T009, T010, T011 (needs all repositories)

- [ ] [T014] [P] Write unit tests for TokenService (8 tests) • 2 SP (~3-4h)
      File: tests/unit/services/TokenService.spec.ts
      Tests: JWT generation, verification, refresh token rotation
      Dependencies: None (can run parallel with T012)

- [ ] [T015] Create TokenService • 2 SP (~3-4h)
      File: src/services/TokenService.ts
      Implements: generateAccessToken, generateRefreshToken, verifyToken
      Dependencies: None (utility service)

- [ ] [T016] [P] Write unit tests for EmailService (6 tests) • 2 SP (~3-4h)
      File: tests/unit/services/EmailService.spec.ts
      Tests: send verification email, send password reset
      Dependencies: None (can run parallel with T012, T014)

- [ ] [T017] Create EmailService • 2 SP (~3-4h)
      File: src/services/EmailService.ts
      Implements: sendVerificationEmail, sendPasswordResetEmail
      Dependencies: None (3rd party wrapper)

- [ ] [T018] Implement password hashing utility • 1 SP (~1-2h)
      File: src/utils/password.util.ts
      Implements: hashPassword, comparePassword using bcrypt
      Dependencies: None

- [ ] [T019] Implement JWT generation logic • 2 SP (~3-4h)
      File: src/utils/jwt.util.ts
      Implements: sign, verify, decode JWT with RS256
      Dependencies: None

- [ ] [T020] Implement refresh token rotation • 2 SP (~3-4h)
      File: src/utils/token-rotation.util.ts
      Implements: rotation detection, security checks
      Dependencies: T015 (needs TokenService)

- [ ] [T021] Implement email verification flow • 1 SP (~1-2h)
      File: src/services/EmailVerificationService.ts
      Implements: generate verification token, verify token
      Dependencies: T017 (needs EmailService)

**Task Execution Graph (Phase 2):**

```

T012 [P] ──┐
T014 [P] ──┼──> (Test suites can run parallel)
T016 [P] ──┘

T009, T010, T011 (from Phase 1) ──> T013 (AuthService)

T015 (TokenService) ──> T020 (Token rotation)
T017 (EmailService) ──> T021 (Email verification)
T018 (Password utils) ──> T013 (used by AuthService)
T019 (JWT utils) ──> T013 (used by AuthService)

```

**Parallelization Notes (Phase 2):**
- All test tasks (T012, T014, T016) can run in parallel
- T015, T017, T018, T019 can run in parallel (independent utilities)
- T013 blocks on T009, T010, T011 from Phase 1

## Phase 3: API Layer • 8 SP (~30-40 min)

**Tasks:**

- [ ] [T022] [P] Write integration tests for AuthController (10 tests) • 3 SP (~4-8h)
      File: tests/integration/controllers/AuthController.spec.ts
      Tests: POST /register, POST /login, POST /refresh, POST /logout
      Dependencies: None (can run parallel with T024)

- [ ] [T023] Create AuthController • 3 SP (~4-8h)
      File: src/controllers/AuthController.ts
      Implements: register, login, refresh, logout, verifyEmail endpoints
      Dependencies: T013 (needs AuthService)

- [ ] [T024] [P] Write unit tests for auth middleware (6 tests) • 2 SP (~3-4h)
      File: tests/unit/middleware/auth.middleware.spec.ts
      Tests: JWT verification, token extraction, error handling
      Dependencies: None (can run parallel with T022)

- [ ] [T025] Create auth middleware • 2 SP (~3-4h)
      File: src/middleware/auth.middleware.ts
      Implements: requireAuth, optionalAuth, requireRole
      Dependencies: T015 (needs TokenService)

- [ ] [T026] Create validation schemas • 1 SP (~1-2h)
      File: src/validators/auth.validators.ts
      Implements: Joi schemas for register, login, refresh payloads
      Dependencies: None

- [ ] [T027] Create DTOs • 1 SP (~1-2h)
      File: src/dtos/auth.dto.ts
      Implements: RegisterDTO, LoginDTO, AuthResponseDTO
      Dependencies: None

- [ ] [T028] Setup auth routes • 1 SP (~1h)
      File: src/routes/auth.routes.ts
      Implements: Route registration with validation and middleware
      Dependencies: T023, T025, T026 (needs controller, middleware, validators)

**Task Execution Graph (Phase 3):**

```

T022 [P] ──┐
T024 [P] ──┘──> (Test suites can run parallel)

T013 (AuthService) ──> T023 (AuthController)
T015 (TokenService) ──> T025 (Auth middleware)

T026 (Validators) ──┐
T027 (DTOs) ├──> T028 (Routes)
T023 (Controller) ┘
T025 (Middleware) ─┘

```

## Phase 4: Integration • 3 SP (~15-20 min)

**Tasks:**

- [ ] [T029] Connect services to controllers • 1 SP (~1-2h)
      File: src/app.ts
      Implements: Dependency injection setup for controllers
      Dependencies: T023 (needs AuthController)

- [ ] [T030] Add global error handling middleware • 1 SP (~1-2h)
      File: src/middleware/error.middleware.ts
      Implements: Catch all errors, format responses, log errors
      Dependencies: None

- [ ] [T031] Configure CORS and security headers • 1 SP (~1h)
      File: src/middleware/security.middleware.ts
      Implements: CORS config, Helmet setup, rate limiting
      Dependencies: None

- [ ] [T032] Register auth routes in main app • trivial (~30 min)
      File: src/app.ts
      Implements: app.use('/api/auth', authRoutes)
      Dependencies: T028 (needs auth routes)

- [ ] [T033] Add environment variable validation • 1 SP (~1h)
      File: src/config/env.validation.ts
      Implements: Validate JWT_SECRET, DATABASE_URL, EMAIL config
      Dependencies: None

**Task Execution Graph (Phase 4):**

```

T030, T031, T033 [P] ──> (Can run parallel - different concerns)

T028 ──> T029 ──> T032 (Sequential: routes → DI → registration)

```

## Phase 5: Testing & Docs • 2 SP (~10-15 min)

**Tasks:**

- [ ] [T034] Run full test suite and fix issues • 1 SP (~1-2h)
      File: N/A (command: npm test)
      Validates: All 47 tests passing, coverage ≥ 80%
      Dependencies: T001-T033 (needs all tests written)

- [ ] [T035] Integration test for complete auth flow • 1 SP (~1-2h)
      File: tests/integration/auth-flow.spec.ts
      Tests: Full flow from register → login → refresh → logout
      Dependencies: T034 (needs all individual tests passing)

- [ ] [T036] [P] Update API documentation • trivial (~20 min)
      File: docs/api.md
      Updates: Add 5 auth endpoints with request/response examples
      Dependencies: None (can run parallel with T037, T038)

- [ ] [T037] [P] Update data model documentation • trivial (~15 min)
      File: docs/data-model.md
      Updates: Add User, Session, RefreshToken entities with relationships
      Dependencies: None (can run parallel with T036, T038)

- [ ] [T038] [P] Update security documentation • trivial (~15 min)
      File: specs/security.md
      Updates: Document JWT flow, refresh token rotation, password policy
      Dependencies: None (can run parallel with T036, T037)

- [ ] [T039] Add environment variables to .env.example • trivial (~10 min)
      File: .env.example
      Updates: Add JWT_SECRET, JWT_EXPIRATION, REFRESH_TOKEN_EXPIRATION
      Dependencies: None

**Task Execution Graph (Phase 5):**

```

T001-T033 ──> T034 (Run all tests) ──> T035 (E2E flow test)

T036 [P] ──┐
T037 [P] ──┼──> (Documentation updates can run parallel)
T038 [P] ──┘

T039 (env example) ──> (Independent, can run anytime)

```

**Parallelization Notes (Phase 5):**
- All documentation tasks (T036, T037, T038) can run in parallel
- T034 must complete before T035 (E2E depends on unit/integration tests)
- T039 is independent and can run anytime

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
**Total:** 34 SP • 39 tasks • ~2-3 hours with AI assistance
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Parallelization Summary:**
- ✅ Phase 1: 3 test tasks parallel (T001, T003, T005)
- ✅ Phase 2: 3 test tasks + 4 utility tasks parallel
- ✅ Phase 3: 2 test tasks parallel (T022, T024)
- ✅ Phase 4: 3 tasks parallel (T030, T031, T033)
- ✅ Phase 5: 3 documentation tasks parallel (T036, T037, T038)
- ⚡ With 2 devs: ~40% time savings via parallelization
- ⚡ With 3 devs: ~50% time savings via parallelization

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

**Generate:** `.ai-flow/work/NNN-feature-name/tasks.md` (with ✅ checkmarks)

**Example:** `.ai-flow/work/003-user-authentication/tasks.md`

**Implementation rules:**

- Follow project conventions detected in codebase
- Use same code style as existing files
- Write tests for all new code
- Validate each task before marking complete
- Update status.json after each task/phase

### Phase 4: Security Check + Validation + Auto-Archive (1-2 minutes)

**IF mode = `USER_STORY`:** *(Validate against Definition of Done)*

```

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Definition of Done Validation (from HU-001-001)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Validating User Story completion...

✅ Código implementado siguiendo ai-instructions.md
✅ Code review aprobado (mín 1 revisor) [Simulated: Auto-approved by AI]
✅ Tests unitarios escritos (cobertura > 80%) [Coverage: 92%]
✅ Tests de integración pasando [8/8 passing]
✅ Casos de prueba QA ejecutados y aprobados (8/8)
✅ TC-001-001: Login exitoso (Happy Path)
✅ TC-001-002: Credenciales inválidas (Error Case)
✅ TC-001-003: Rate limiting (Edge Case)
... [5 more test cases]
✅ Documentación técnica actualizada (docs/api.md)
✅ Sin errores de lint ni formateo
⚠️ Deploy a staging exitoso [SKIP: Local development]
⚠️ Product Owner aprobó la funcionalidad [SKIP: Manual step]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Acceptance Criteria Verification
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Scenario 1: Login exitoso
Test: TC-001-001 passed
Verified: JWT token returned with valid exp, user_id, role

✅ Scenario 2: Credenciales inválidas
Test: TC-001-002 passed
Verified: 401 status with clear error message

✅ Scenario 3: Rate limiting
Test: TC-001-003 passed
Verified: 429 status after 5 failed attempts in 15 minutes

All acceptance criteria met! ✅

```

**IF mode = `ROADMAP_FEATURE` or `INTERACTIVE`:** *(Standard security check)*

**Security Quick Check:**
Ask 1-2 questions about production considerations:

- Add rate limiting?
- Input validation sufficient?
- Consider [specific concern] for production?

**Auto-Archive:**

1. Move work to `.ai-flow/archive/YYYY-MM/feature-[name]/`
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

**IF mode = `USER_STORY`:**

```
Summary:

- User Story: HU-001-001 - Login básico con email y contraseña
- Epic: EP-001 - Autenticación y Seguridad
- Priority: Alta (P0)
- Story Points: 5 SP (estimated) → 4.8 SP (actual)
- Time: 1.5 hours (estimated: 6-8h with AI assistance)
- Files: 6 created, 2 modified
- Tests: 8 added (all passing ✅)

✅ Acceptance Criteria: 3/3 verified
✅ Test Cases: 8/8 executed and passed
✅ Definition of Done: 7/9 completed (2 manual steps pending)

Dependencies resolved:
✅ Blocks: HU-001-002 (OAuth login) - Ready to start
✅ Blocks: HU-002-001 (User CRUD) - Ready to start

📖 User Story Status: COMPLETED ✅
   File: user-stories/EP-001/HU-001-001.md updated with completion date
```

**IF mode = `ROADMAP_FEATURE` or `INTERACTIVE`:**

```
Summary:

- Feature: JWT authentication system
- Files: 28 created, 5 modified
- Tests: 47 added (all passing ✅)
- Time: 2.5 hours
- Complexity: COMPLEX (52 tasks, 5 phases)
```

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
.ai-flow/work/NNN-feature-name/
├── spec.md          # What is being built
├── plan.md          # How it will be built
├── tasks.md         # Checklist with ✅
├── status.json      # Metadata (progress, timestamps)

**Example:** `.ai-flow/work/003-user-authentication/`
└── implementation.md # Optional implementation notes
```

### After completion (archive):

```
.ai-flow/archive/YYYY-MM/NNN-feature-name/
├── spec.md
├── plan.md
├── tasks.md
└── summary.md       # Final summary with stats

**Example:** `.ai-flow/archive/2025-01/003-user-authentication/`
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

**File:** `.ai-flow/core/config.json`

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

📦 Work archived: .ai-flow/archive/2025-01/feature-user-email/

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

📦 Work archived: .ai-flow/archive/2025-01/feature-user-auth/

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

## Common Use Cases

### 1. Sprint Development (with User Stories)

```bash
/feature HU-001-001  # Login: 5 SP, 1.5h
/feature HU-001-002  # OAuth: 3 SP, 1h
/feature HU-002-001  # User CRUD: 8 SP, 2h
# Sprint: 16 SP in 4.5h
```

### 2. Rapid Prototyping (with roadmap)

```bash
/feature User Entity Repository     # 12 SP
/feature Product Entity Repository  # 8 SP
/feature Order Entity Repository    # 5 SP
# Data layer: 25 SP in ~2 days
```

### 3. Feature Not Planned (interactive)

```bash
/feature new
# AI asks: What to build?
> Real-time notifications with WebSockets
# Generates: 24 tasks, 13 SP, ~3h
```

### 4. Bug Fix or Quick Change

```bash
/feature change
# AI asks: What to modify?
> Add rate limiting to login endpoint
# Updates: middleware, tests, docs (~30 min)
```

### 5. Code Quality Improvement

```bash
/feature refactor
# AI asks: What to refactor?
> Extract duplicate validation logic to shared module
# Refactors: 6 files, tests pass, docs updated (~1h)
```

---

## Key Benefits by Mode

| Mode            | Setup   | Validation    | Best For    |
| --------------- | ------- | ------------- | ----------- |
| **HU-XXX-XXX**  | 0 min   | Gherkin + DoD | Scrum teams |
| **Roadmap**     | 0 min   | Standard      | Quick impl  |
| **Interactive** | 2-3 min | Standard      | Exploration |

---

**BEGIN EXECUTION when user runs `/feature`, `/feature new`, `/feature change`, or `/feature refactor`**
