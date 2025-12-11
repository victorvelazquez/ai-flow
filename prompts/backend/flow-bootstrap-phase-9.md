# AI Flow - Phase 9: Implementation Roadmap 🗺️

**YOU ARE AN EXPERT PROJECT MANAGER AND TECHNICAL ARCHITECT.**

Your mission in Phase 9 is to analyze all project documentation and generate a detailed implementation roadmap with Story Point estimations.

---

## 🎯 Phase 9 Objective

Generate a complete, prioritized implementation roadmap with Fibonacci-based Story Point estimations, organized into Epics, Features, and Tasks following GitHub Projects format.

---

## Prerequisites

Before executing Phase 9, verify:

- ✅ Phase 8 completed (all documentation generated)
- ✅ Project initialized with framework (done in Phase 8)
- ✅ All documentation files exist in `.ai-flow/` directory

---

## Duration

⏱️ **Estimated Time:** 15-30 minutes

---

## Workflow: 6 Steps

### Step 9.1: Documentation Analysis (5-8 minutes - automatic)

**Read and analyze all generated documentation:**

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 Phase 9/9: Implementation Roadmap Generation
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Step 9.1/6: Analyzing Project Documentation...

✅ project-brief.md (business objectives, scope, constraints)
✅ ai-instructions.md (tech stack, framework, ORM)
✅ docs/architecture.md (system design, patterns, components)
✅ docs/data-model.md (entities, relationships, migrations)
✅ docs/api.md (endpoints, request/response formats)
✅ docs/business-flows.md (user journeys, workflows)
✅ docs/code-standards.md (naming, organization, patterns)
✅ docs/testing.md (test strategy, coverage targets)
✅ docs/operations.md (deployment, monitoring, CI/CD)
✅ specs/security.md (authentication, authorization, compliance)
✅ specs/configuration.md (environment variables, integrations)

Extracting structured information...
```

**Extract and analyze:**

1. **Business Context** (from `project-brief.md`):

   - Primary objectives
   - Target users
   - Success metrics
   - Constraints
   - Timeline (if specified)

2. **Technical Stack** (from `ai-instructions.md`):

   - Language and version
   - Framework and version
   - Database and ORM
   - Key libraries

3. **System Architecture** (from `docs/architecture.md`):

   - Architecture pattern (Clean, Hexagonal, Layered, MVC)
   - Layers/modules structure
   - Integration points
   - External services

4. **Data Model** (from `docs/data-model.md`):

   - All entities/models
   - Relationships (1:1, 1:N, N:M)
   - Key fields per entity
   - Validation rules

5. **API Endpoints** (from `docs/api.md`):

   - All routes
   - HTTP methods
   - Authentication requirements
   - Request/response schemas

6. **Business Flows** (from `docs/business-flows.md`):

   - User journeys
   - Critical workflows
   - State transitions

7. **Security Requirements** (from `specs/security.md`):

   - Authentication method
   - Authorization strategy (RBAC, ABAC, etc.)
   - Compliance requirements
   - Security features

8. **Testing Strategy** (from `docs/testing.md`):

   - Unit test coverage target
   - Integration test scope
   - E2E test scenarios
   - Performance tests

9. **Operations** (from `docs/operations.md`):
   - Deployment platform
   - Monitoring tools
   - Logging strategy
   - Backup strategy

**Show analysis summary:**

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📈 Analysis Complete
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎯 Business Scope:
   • {{BUSINESS_OBJECTIVES_COUNT}} primary objectives
   • {{USER_TYPES_COUNT}} user types
   • {{CONSTRAINTS_COUNT}} constraints

🏗️ Technical Scope:
   • {{ENTITIES_COUNT}} database entities
   • {{ENDPOINTS_COUNT}} API endpoints
   • {{BUSINESS_FLOWS_COUNT}} business flows
   • {{INTEGRATIONS_COUNT}} external integrations

🔐 Security Scope:
   • Authentication: {{AUTH_METHOD}}
   • Authorization: {{AUTHZ_METHOD}}
   • Compliance: {{COMPLIANCE_REQUIREMENTS}}

🧪 Testing Scope:
   • Coverage target: {{COVERAGE_TARGET}}%
   • Test types: Unit, Integration, E2E
   • {{ESTIMATED_TEST_COUNT}} tests estimated

Proceeding to Epic definition...
```

---

### Step 9.2: Epic Definition (3-5 minutes - automatic)

**Organize functionality into high-level Epics:**

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 Step 9.2/6: Defining Epics
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**Standard Epic Structure:**

1. **Foundation Epic** (Infrastructure, core setup)
2. **Data Layer Epic** (Entities, repositories, migrations)
3. **Authentication & Authorization Epic** (Security layer)
4. **Core Business Features Epic(s)** (Main functionality by domain)
5. **Integration Epic** (External services, APIs)
6. **Testing & Quality Epic** (Comprehensive test coverage)
7. **Operations & Deployment Epic** (CI/CD, monitoring, docs)

**Epic Estimation Guidelines:**

- **Foundation Epic:** 13-21 SP (depends on framework complexity)
- **Data Layer Epic:** 3-5 SP per simple entity, 8-13 SP per complex entity
- **Auth Epic:** 8 SP (basic JWT) to 21 SP (multi-provider + RBAC + 2FA)
- **Business Epics:** Varies by domain complexity
- **Integration Epic:** 5-8 SP per external service
- **Operations Epic:** 13 SP (standard CI/CD + monitoring)

**Example output:**

```
Epics identified:

## 🏗️ Epic 1: Foundation & Infrastructure • 21 SP
   Priority: P0 | Est. Time: ~2 weeks
   Base application setup, core utilities, error handling, logging

## 💾 Epic 2: Data Layer • 34 SP
   Priority: P0 | Est. Time: ~3 weeks
   7 entities, repositories, migrations, seeding

## 🔐 Epic 3: Authentication & Authorization • 21 SP
   Priority: P0 | Est. Time: ~2 weeks
   JWT authentication, RBAC, password reset, 2FA

## 👤 Epic 4: User Management • 13 SP
   Priority: P0 | Est. Time: ~1 week
   User CRUD, profile management, preferences

## 🛒 Epic 5: Product Catalog • 21 SP
   Priority: P0 | Est. Time: ~2 weeks
   Products, categories, search, filters, inventory

## 🛍️ Epic 6: Order Management • 34 SP
   Priority: P1 | Est. Time: ~3 weeks
   Shopping cart, checkout, orders, order tracking

## 💳 Epic 7: Payment Processing • 21 SP
   Priority: P1 | Est. Time: ~2 weeks
   Stripe integration, webhooks, refunds

## 📧 Epic 8: Notifications • 13 SP
   Priority: P2 | Est. Time: ~1 week
   Email notifications, push notifications, preferences

## 📊 Epic 9: Analytics & Reporting • 13 SP
   Priority: P2 | Est. Time: ~1 week
   Admin dashboard, sales reports, user analytics

## 🔧 Epic 10: Operations & Deployment • 13 SP
   Priority: P1 | Est. Time: ~1 week
   CI/CD finalization, monitoring, logging, backups

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 Total: 204 SP (~20 weeks with 1 developer)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

### Step 9.3: Feature Breakdown (5-10 minutes - automatic)

**Break down each Epic into Features with Story Points:**

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔨 Step 9.3/6: Breaking Down Features with Story Points
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**Story Points Reference (Fibonacci Scale):**

```
Story Points | Complexity | Typical Time | Examples
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1 SP         | Trivial    | 1-2 hours    | Add simple field, update enum
2 SP         | Very Small | 2-4 hours    | Simple validation, basic test
3 SP         | Small      | 4-8 hours    | Simple CRUD endpoint, entity
5 SP         | Medium     | 1-2 days     | Complex endpoint with logic
8 SP         | Complex    | 2-3 days     | Auth flow, complex business rule
13 SP        | Large      | 1 week       | Complete module with tests
21 SP        | Very Large | 2 weeks      | Major feature, integration
34 SP        | Epic       | 3 weeks      | Multiple related features
```

---

### Story Points to Time Conversion (Hybrid Estimation)

**Use this table to add time estimates to each task:**

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

> **Note:** Time assumes AI-assisted development (GitHub Copilot, Claude, etc.). Without AI assistance, multiply time estimates by 2-3x.
>
> **Velocity Tracking:** After completing 2-3 features, compare actual time vs estimates to calibrate your team's velocity. Adjust remaining estimates accordingly.

**How to use hybrid estimation:**

- Each task shows **both** Story Points and time: `• 2 SP (~3-4h)`
- Story Points measure **complexity** (stable across teams)
- Time estimates measure **effort** (varies by team velocity)
- Track both to improve estimation accuracy over time

---

### Task Format Reference (Spec-Kit Inspired)

**Every task must follow this format:**

```markdown
- [ ] [TaskID] [Optional:P] [Optional:StoryTag] Description • SP (~time)
      File: exact/path/to/file.ts
      Dependencies: T001, T002 (or "None")
```

**Components explained:**

- **[TaskID]**: Sequential ID in execution order (T001, T002, ..., T099, T100)
- **[P] marker**: ONLY for parallelizable tasks (different files, no blocking deps)
- **[StoryTag]**: Links task to user story ([US1], [US2]) - only in story phases
- **Description**: What to implement (specific, LLM-completable without additional context)
- **• SP (~time)**: Hybrid estimation - Story Points + time (e.g., "2 SP (~3-4h)", "5 SP (~1-2d)")
- **File path**: Exact file where work happens (REQUIRED)
- **Dependencies**: Which tasks must complete first (REQUIRED, even if "None")

**Task Sequencing Rules:**

1. **Tests BEFORE implementation** (TDD approach)
2. **Models → Services → Controllers → Endpoints** (layer dependency order)
3. **Core utilities BEFORE features** that use them
4. **Database migrations BEFORE data access code**
5. **Interfaces BEFORE implementations**

**Parallelization Rules ([P] marker):**

✅ **Use [P] when:**

- Tasks target different files
- No shared dependencies between tasks
- Can run simultaneously (e.g., independent entities, different modules)

❌ **Don't use [P] when:**

- Task depends on another incomplete task
- Same file is modified by multiple tasks
- Shared resource (DB migration, config file, shared service)

**Example task with all components:**

```markdown
- [ ] [T042] [P] Write unit tests for Product entity validation (12 tests) • 2 SP (~3-4h)
      File: tests/unit/entities/Product.entity.spec.ts
      Tests: price validation, stock constraints, name required, category FK
      Dependencies: None (can run parallel with other test tasks)
```

---

**Feature Breakdown Logic:**

For each Epic:

1. Identify all related endpoints (from `docs/api.md`)
2. Identify involved entities (from `docs/data-model.md`)
3. Identify business flows (from `docs/business-flows.md`)
4. Estimate complexity based on:
   - Number of fields and validations
   - Relationships complexity
   - Business logic complexity
   - Testing requirements
   - External integrations

**Feature Template:**

```markdown
### Feature {{NUMBER}}: {{FEATURE_NAME}} • {{SP}} SP (~{{TIME}})

**Scope:** {{ENTITY}} entity + {{ENDPOINT_COUNT}} endpoints + {{TEST_COUNT}} tests

**Tasks:**

- [ ] T0XX [P] Write {{ENTITY}} entity tests • 2 SP (~3-4h) → tests/unit/{{ENTITY}}.spec.ts
- [ ] T0YY Create {{ENTITY}} entity • 2 SP (~3-4h) → src/entities/{{ENTITY}}.ts
- [ ] T0ZZ Create I{{REPOSITORY}} interface • 1 SP (~1-2h) → src/repositories/I{{REPOSITORY}}.ts
- [ ] T0AA Implement {{REPOSITORY}} • 2 SP (~3-4h) → src/repositories/{{REPOSITORY}}.ts (after T0YY, T0ZZ)
- [ ] T0BB Implement {{SERVICE}} business logic • 3 SP (~4-8h) → src/services/{{SERVICE}}.ts (after T0AA)
- [ ] T0CC Create {{CONTROLLER}} endpoints • 2 SP (~3-4h) → src/controllers/{{CONTROLLER}}.ts (after T0BB)
- [ ] T0DD [P] Write integration tests • 2 SP (~3-4h) → tests/integration/{{CONTROLLER}}.spec.ts
- [ ] T0EE [P] Update API docs • 1 SP (~1h) → docs/api.md

**Parallel:** T0XX, T0DD, T0EE can run together

**Done when:** All endpoints work + tests pass + coverage ≥ {{COVERAGE}}%

**Start:** `/feature new "{{FEATURE_NAME}}"`
```

`````

**Example (Real Project):**

````markdown
### Feature 2.1: User Entity & Repository • 12 SP (~2-3d)

**Scope:** User entity + CRUD endpoints + 12 tests

**Tasks:**

- [ ] T001 [P] Write User entity validation tests • 2 SP (~3-4h) → tests/unit/User.entity.spec.ts
- [ ] T002 Create User entity (email, password, role) • 2 SP (~3-4h) → src/entities/User.entity.ts
- [ ] T003 Create IUserRepository interface • 1 SP (~1-2h) → src/repositories/IUserRepository.ts
- [ ] T004 Implement UserRepository with Prisma • 2 SP (~3-4h) → src/repositories/UserRepository.ts (after T002, T003)
- [ ] T005 Implement UserService business logic • 3 SP (~4-8h) → src/services/UserService.ts (after T004)
- [ ] T006 Create UserController (CRUD endpoints) • 2 SP (~3-4h) → src/controllers/UserController.ts (after T005)
- [ ] T007 [P] Write integration tests (4 tests) • 2 SP (~3-4h) → tests/integration/UserController.spec.ts
- [ ] T008 [P] Update API docs • 1 SP (~1h) → docs/api.md

**Parallel tasks:** T001, T007, T008 (different files)

**Done when:** GET/POST/PUT/DELETE /users working + 12 tests pass + coverage ≥ 80%
`````

---

**Example (Simplified Format):**

```markdown
### Feature 2.1: User Entity & Repository • 12 SP (~2-3d)

**Scope:** User entity + CRUD endpoints + 12 tests

**Tasks:**

- [ ] T001 [P] Write User entity validation tests • 2 SP (~3-4h) → tests/unit/User.entity.spec.ts
- [ ] T002 Create User entity (email, password, role) • 2 SP (~3-4h) → src/entities/User.entity.ts
- [ ] T003 Create IUserRepository interface • 1 SP (~1-2h) → src/repositories/IUserRepository.ts
- [ ] T004 Implement UserRepository with Prisma • 2 SP (~3-4h) → src/repositories/UserRepository.ts (after T002, T003)
- [ ] T005 Implement UserService business logic • 3 SP (~4-8h) → src/services/UserService.ts (after T004)
- [ ] T006 Create UserController (CRUD endpoints) • 2 SP (~3-4h) → src/controllers/UserController.ts (after T005)
- [ ] T007 [P] Write integration tests (4 tests) • 2 SP (~3-4h) → tests/integration/UserController.spec.ts
- [ ] T008 [P] Update API docs • 1 SP (~1h) → docs/api.md

**Parallel tasks:** T001, T007, T008 (different files)

**Done when:** GET/POST/PUT/DELETE /users working + 12 tests pass + coverage ≥ 80%

**Start:** `/feature new "User Entity & Repository"`
```

---

**Original Feature Breakdown Example:**

```markdown
## 💾 Epic 2: Data Layer • 34 SP

### Feature 2.1: User Entity & Repository (Detailed Version) • 5 SP

⏱️ **Est. Time:** 1-2 days (~12-16h total)
🎯 **Priority:** P0
📋 **Dependencies:** None (foundational entity)
🏷️ **User Story:** [US1] As a system, I need to store user data securely

**Scope:**

- Entity: User (id, email, username, passwordHash, role, createdAt, updatedAt)
- Repository: IUserRepository with CRUD operations
- Validation: Email format, username constraints, password strength
- Tests: 8 unit tests, 4 integration tests

**Tasks:** (Test-First, execution order, hybrid estimation)

- [ ] [T001] [P] Write unit tests for User entity validation (8 tests) • 2 SP (~3-4h)
      File: tests/unit/entities/User.entity.spec.ts
      Tests: email format, username constraints, password hashing, role enum, timestamps
      Dependencies: None (can run parallel with other test tasks)

- [ ] [T002] Create User entity with field validation • 2 SP (~3-4h)
      File: src/entities/User.entity.ts
      Implements: Email validation regex, username 3-20 chars, password bcrypt hashing
      Dependencies: None

- [ ] [T003] [P] Create IUserRepository interface • 1 SP (~1-2h)
      File: src/repositories/interfaces/IUserRepository.ts
      Methods: create, findById, findByEmail, findAll, update, delete
      Dependencies: T002 (needs User entity type)

- [ ] [T004] Implement UserRepository with Prisma/TypeORM • 1 SP (~1-2h)
      File: src/repositories/UserRepository.ts
      Implements: All CRUD methods from IUserRepository interface
      Dependencies: T002 (User entity), T003 (interface)

- [ ] [T005] Add database migration for users table • 1 SP (~1-2h)
      File: migrations/001_create_users_table.ts (Prisma) or similar
      Schema: All User fields + indexes (email unique, username unique)
      Dependencies: T002 (User entity schema)

- [ ] [T006] Write integration tests for UserRepository (4 tests) • 2 SP (~3-4h)
      File: tests/integration/repositories/UserRepository.spec.ts
      Tests: CRUD operations, unique constraints, transactions, error handling
      Dependencies: T004 (UserRepository), T005 (migration)

- [ ] [T007] Update data model documentation • 1 SP (~1h)
      File: docs/data-model.md
      Add: User entity schema, relationships, validation rules
      Dependencies: T002 (User entity complete)

**Acceptance Criteria:**

- [ ] User entity validates email format (regex: RFC 5322)
- [ ] Password is hashed with bcrypt (cost factor 10) before storage
- [ ] Repository handles all CRUD operations correctly
- [ ] Migration creates table with correct schema + indexes
- [ ] Test coverage ≥ 80% (measured by Jest/Vitest)
- [ ] No TypeScript errors (strict mode)
- [ ] All 12 tests passing (8 unit + 4 integration)

**Task Execution Graph:**
```

T001 [P] ──┐
├──> T002 ──┬──> T003 ──> T004 ──┬──> T006
│ │ │
│ └──> T005 ────────────┘
│ │
└─────────────────────────────────┴──> T007

````

**Parallelization Notes:**
- T001 can run parallel to other test tasks (different file)
- T005 can start as soon as T002 completes (don't need to wait for T004)
- T007 (docs) can run while T006 (tests) runs

**Ready-to-execute command:**
```bash
/feature new "User Entity & Repository"
````

---

### Feature 2.2: Product Entity & Repository • 8 SP

⏱️ **Est. Time:** 2-3 days (~16-24h total)
🎯 **Priority:** P0
📋 **Dependencies:** Feature 2.4 (Category entity - needs Category FK)
🏷️ **User Story:** [US2] As a store owner, I need to manage product catalog with search

**Scope:**

- Entity: Product (id, name, description, price, stock, categoryId, images, createdAt, updatedAt)
- Repository: IProductRepository with CRUD + search/filter
- Validation: Price > 0, stock ≥ 0, name required
- Relationships: belongsTo Category
- Tests: 12 unit tests, 6 integration tests

**Tasks:** (Test-First, execution order, hybrid estimation)

- [ ] [T008] [P] Write unit tests for Product entity validation (12 tests) • 3 SP (~4-8h)
      File: tests/unit/entities/Product.entity.spec.ts
      Tests: price validation, stock constraints, name required, category FK, images array
      Dependencies: T007 (Category entity exists for FK testing)

- [ ] [T009] Create Product entity with validation + Category FK • 3 SP (~4-8h)
      File: src/entities/Product.entity.ts
      Implements: Price > 0, stock ≥ 0, name required, belongs to Category relationship
      Dependencies: T007 (Category entity), T008 (tests)

- [ ] [T010] Create IProductRepository interface • 1 SP (~1-2h)
      File: src/repositories/interfaces/IProductRepository.ts
      Methods: CRUD + search(query), filterByCategory(categoryId), updateStock(id, quantity)
      Dependencies: T009 (Product entity)

- [ ] [T011] Implement ProductRepository with search/filter methods • 2 SP (~3-4h)
      File: src/repositories/ProductRepository.ts
      Implements: All CRUD + search (case-insensitive name), filter by category
      Dependencies: T009 (entity), T010 (interface)

- [ ] [T012] Add database migration for products table • 1 SP (~1-2h)
      File: migrations/002_create_products_table.ts
      Schema: All Product fields + FK to categories + indexes (categoryId, name)
      Dependencies: T009 (Product entity schema)

- [ ] [T013] Implement inventory tracking logic • 2 SP (~3-4h)
      File: src/repositories/ProductRepository.ts (extend)
      Logic: Atomic stock decrements, prevent negative stock, transaction support
      Dependencies: T011 (ProductRepository base)

- [ ] [T014] Write integration tests for ProductRepository (6 tests) • 2 SP (~3-4h)
      File: tests/integration/repositories/ProductRepository.spec.ts
      Tests: CRUD, search, filter by category, stock updates, FK constraints
      Dependencies: T011, T012, T013

- [ ] [T015] Write tests for search/filter functionality (4 tests) • 2 SP (~3-4h)
      File: tests/integration/repositories/ProductRepository.search.spec.ts
      Tests: Case-insensitive search, partial match, filter by category, pagination
      Dependencies: T011 (search implementation)

- [ ] [T016] Update data model documentation • 1 SP (~1h)
      File: docs/data-model.md
      Add: Product entity schema, Category relationship, search indexes
      Dependencies: T009 (Product entity complete)

**Acceptance Criteria:**

- [ ] Product validates price > 0 and stock ≥ 0
- [ ] Search by name works (case-insensitive, partial match)
- [ ] Filter by category returns only products in that category
- [ ] Inventory decrements correctly with atomic operations
- [ ] Stock cannot go negative (validation error)
- [ ] Migration includes FK constraint to categories + indexes
- [ ] Test coverage ≥ 80%
- [ ] All 22 tests passing (12 unit + 6 integration + 4 search)

**Task Execution Graph:**

```
T007 (Category) ──> T008 [P] (tests) ──> T009 (entity) ──┬──> T010 (interface) ──> T011 (repo) ──> T013 (inventory)
                                                          │                                            │
                                                          └──> T012 (migration) ─────────────────────┬─┤
                                                                                                     │ │
                                                T014 <──────────────────────────────────────────────┤ │
                                                T015 <────────────────────────────────────────────────┘
                                                T016 <── T009

[P] = Can run parallel with other test tasks
```

**Parallelization Notes:**

- T008 (tests) can run parallel to other entity test tasks
- T014 (integration tests) and T015 (search tests) can run in parallel (different test files)
- T016 (docs) can run while tests are executing

**Ready-to-execute command:**

```bash
/feature new "Product Entity & Repository with search and inventory"
```

[Continue for all features in Epic 2...]

```

---

### Step 9.4: Dependency Graph & Execution Order (2-3 minutes - automatic)

**Generate dependency graph and determine optimal execution order:**

```

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔗 Step 9.4/6: Analyzing Dependencies
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

````

**Dependency Analysis:**

1. **Entity Dependencies** (from `docs/data-model.md`):
   - Entities with no foreign keys can be built first
   - Entities with FKs depend on referenced entities

2. **Feature Dependencies** (logical):
   - Authentication must complete before protected endpoints
   - Data layer must complete before business logic
   - Business logic must complete before integrations

3. **Parallelization Opportunities:**
   - Independent entities can be built in parallel
   - Independent epics (after foundation) can be worked simultaneously

4. **Task-Level Dependencies** (Spec-Kit Inspired):
   - For each Feature, analyze task dependencies at granular level
   - Identify parallelization opportunities **within** Features (not just between)
   - Generate task execution graph per Epic showing exact task order

**Task Dependency Matrix Example:**

```
Epic 2: Data Layer

Feature 2.1: User Entity (5 SP)
├─ T001 [P] Write User entity tests → No deps (can run parallel)
├─ T002 Create User entity → Depends on: None
├─ T003 [P] Create IUserRepository interface → Depends on: T002
├─ T004 Implement UserRepository → Depends on: T002, T003
├─ T005 Add users table migration → Depends on: T002
├─ T006 Write UserRepository integration tests → Depends on: T004, T005
└─ T007 Update data model docs → Depends on: T002

Feature 2.2: Category Entity (3 SP) [Can run PARALLEL to Feature 2.1]
├─ T008 [P] Write Category entity tests → No deps
├─ T009 Create Category entity → Depends on: None
├─ T010 Create CategoryRepository → Depends on: T009
└─ T011 Update data model docs → Depends on: T009

Feature 2.3: Product Entity (8 SP) [BLOCKS on Feature 2.2 - needs Category FK]
├─ T012 Write Product entity tests → Depends on: T009 (Category entity)
├─ T013 Create Product entity with Category FK → Depends on: T009, T012
├─ T014 Create IProductRepository → Depends on: T013
├─ T015 Implement ProductRepository with search → Depends on: T013, T014
├─ T016 Write ProductRepository tests → Depends on: T015
└─ T017 Update data model docs → Depends on: T013
```

**Parallelization Analysis:**

✅ **Feature-Level Parallelization:**
- Feature 2.1 (User) and Feature 2.2 (Category) can run in PARALLEL → 40% time save
- Feature 2.3 (Product) BLOCKS on Feature 2.2 → must wait for Category entity

✅ **Task-Level Parallelization (within Feature 2.1):**
- T001 (tests) can run parallel to T002 (entity) if desired (TDD: run tests first recommended)
- T003 (interface) and T005 (migration) can run in parallel (both depend only on T002)
- T006 (integration tests) and T007 (docs) can run in parallel

⚡ **Team Scaling:**
- With 1 dev: Features run sequentially → ~16 hours (Feature 2.1) + ~8 hours (Feature 2.2) + ~16 hours (Feature 2.3) = 40 hours total
- With 2 devs: Feature 2.1 + 2.2 parallel → ~16 hours + ~16 hours (Product) = 32 hours total (20% save)
- With 3 devs: Task-level parallelization within features → ~28 hours total (30% save)

---

**Generate Mermaid Dependency Graph:**

```mermaid
graph TD
    E1[Epic 1: Foundation] --> E2[Epic 2: Data Layer]
    E1 --> E3[Epic 3: Auth & Authorization]

    E2 --> E4[Epic 4: User Management]
    E3 --> E4

    E2 --> E5[Epic 5: Product Catalog]
    E2 --> E6[Epic 6: Order Management]

    E4 --> E6
    E5 --> E6

    E6 --> E7[Epic 7: Payment Processing]
    E3 --> E7

    E4 --> E8[Epic 8: Notifications]
    E6 --> E8

    E7 --> E9[Epic 9: Analytics]
    E6 --> E9

    E1 --> E10[Epic 10: Operations]
    E7 --> E10
    E8 --> E10
    E9 --> E10

    style E1 fill:#ff6b6b
    style E2 fill:#4ecdc4
    style E3 fill:#ffe66d
    style E4 fill:#a8e6cf
    style E5 fill:#a8e6cf
    style E6 fill:#ffd93d
    style E7 fill:#ffd93d
    style E8 fill:#c7ceea
    style E9 fill:#c7ceea
    style E10 fill:#95e1d3
````

**Execution Order Recommendation:**

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📅 Recommended Execution Order
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Phase 1: Foundation (Weeks 1-2) • 21 SP**
├─ Epic 1: Foundation & Infrastructure
└─ Can start Epic 2 and Epic 3 in parallel after Foundation

**Phase 2: Core Layer (Weeks 3-5) • 55 SP**
├─ Epic 2: Data Layer (blocking) • 34 SP
└─ Epic 3: Authentication & Authorization (parallel) • 21 SP

**Phase 3: Core Features (Weeks 6-8) • 34 SP**
├─ Epic 4: User Management • 13 SP
└─ Epic 5: Product Catalog (parallel) • 21 SP

**Phase 4: Advanced Features (Weeks 9-12) • 55 SP**
├─ Epic 6: Order Management • 34 SP
└─ Epic 7: Payment Processing • 21 SP

**Phase 5: Secondary Features (Weeks 13-15) • 26 SP**
├─ Epic 8: Notifications (parallel) • 13 SP
└─ Epic 9: Analytics (parallel) • 13 SP

**Phase 6: Production Readiness (Weeks 16-17) • 13 SP**
└─ Epic 10: Operations & Deployment

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚡ Parallelization Opportunities:
  • Week 3-5: Data Layer + Auth (2 devs)
  • Week 6-8: User Mgmt + Product Catalog (2 devs)
  • Week 13-15: Notifications + Analytics (2 devs)

With 2 developers: ~12 weeks (40% time savings)
With 3 developers: ~9 weeks (47% time savings)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

### Step 9.5: Generate Roadmap Document (2-5 minutes - automatic)

**Generate `roadmap.md` with complete implementation plan:**

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📝 Step 9.5/6: Generating Roadmap Document
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Writing to roadmap.md...
```

**Roadmap Document Structure:**

````markdown
# 🗺️ Implementation Roadmap: {{PROJECT_NAME}}

> **Generated:** {{DATE}} > **Based on:** Documentation v1.0 (Phases 0-8 complete)
> **Total Estimated:** {{TOTAL_WEEKS}} weeks • {{TOTAL_SP}} SP

---

## 📊 Project Overview

**Problem:** {{PROBLEM_STATEMENT}}

**Objectives:**
{{#EACH BUSINESS_OBJECTIVE}}

- {{OBJECTIVE_TITLE}}: {{SUCCESS_METRIC}}
  {{/EACH}}

**Tech Stack:**

- **Framework:** {{FRAMEWORK}} {{VERSION}}
- **Database:** {{DATABASE}} + {{ORM}}
- **Architecture:** {{ARCHITECTURE_PATTERN}}
- **Deployment:** {{DEPLOYMENT_PLATFORM}}

---

## 📈 Story Points Reference

Use this table to translate Story Points to time estimates:

| Story Points | Complexity | Typical Time | Description                                   |
| ------------ | ---------- | ------------ | --------------------------------------------- |
| **1 SP**     | Trivial    | 1-2 hours    | Simple config change, add enum value          |
| **2 SP**     | Very Small | 2-4 hours    | Basic validation, simple test                 |
| **3 SP**     | Small      | 4-8 hours    | Simple CRUD endpoint, basic entity            |
| **5 SP**     | Medium     | 1-2 days     | Complex endpoint with business logic          |
| **8 SP**     | Complex    | 2-3 days     | Auth flow, complex validation, multiple tests |
| **13 SP**    | Large      | 1 week       | Complete module with full test coverage       |
| **21 SP**    | Very Large | 2 weeks      | Major feature with integration                |
| **34 SP**    | Epic       | 3 weeks      | Multiple related features                     |

> **Note:** Times assume experienced developer with AI assistance (GitHub Copilot, Claude, etc.)
> Without AI assistance, multiply time estimates by 2-3x.

---

## 🎯 Epic Overview

{{EPIC_TABLE}}

**Total Estimated Development Time:**

- **1 Developer:** {{SOLO_WEEKS}} weeks ({{SOLO_MONTHS}} months)
- **2 Developers:** {{TWO_DEV_WEEKS}} weeks ({{TWO_DEV_MONTHS}} months)
- **3 Developers:** {{THREE_DEV_WEEKS}} weeks ({{THREE_DEV_MONTHS}} months)

---

## 🔄 5-Phase Execution Model (Spec-Kit Inspired)

Our roadmap follows a battle-tested 5-phase approach for predictable, incremental delivery:

### Phase 0: Setup (Pre-Foundation)

**Goal:** Project initialization
**Duration:** 1-2 days (already done by `/project-scaffold`)

- Repository setup, CI/CD baseline, Docker configuration
- Development environment setup
- Base dependencies installed

### Phase 1: Foundational (Blocking Prerequisites)

**Goal:** Core infrastructure that everything depends on
**Duration:** 2-3 weeks
**Epics:** Foundation, Data Layer (base models only)

**Characteristics:**

- ❌ NO parallelization (everything blocks on these)
- ✅ Must complete BEFORE user story implementation
- 🎯 Establish patterns for entire project

**Example Tasks:**

- [T001-T020] Database connection, ORM setup, migrations
- [T021-T040] Logging, error handling, config management
- [T041-T060] Base entity models (User, Session)

### Phase 2-N: User Stories (Priority-Ordered)

**Goal:** Deliver business value incrementally
**Duration:** Varies per story (1-3 weeks each)
**Epics:** All business features

**Characteristics:**

- ✅ Each story is INDEPENDENTLY deployable
- ✅ High parallelization potential (2-3 devs)
- 🎯 Delivers working software each iteration

**Story Execution Order:**

1. P0 stories (MVP-critical) → [US1], [US2], [US3]
2. P1 stories (high value) → [US4], [US5]
3. P2 stories (nice-to-have) → [US6], [US7]

**Example Story Tasks:**

- [T061] [US1] Write authentication tests
- [T062] [US1] Implement JWT service
- [T063] [US1] Create login endpoint
- [T064] [P] [US2] Write product catalog tests (parallel to US1)

### Phase N: Polish & Cross-Cutting

**Goal:** Production readiness
**Duration:** 1-2 weeks
**Epics:** Operations, Testing, Performance

**Characteristics:**

- ✅ Can run after all critical stories complete
- ✅ Some parallelization (different concerns)
- 🎯 Ensures quality and operability

**Example Tasks:**

- [T200-T210] Performance optimization, caching
- [T211-T220] Security hardening, penetration testing
- [T221-T230] Monitoring, alerting, logging
- [T231-T240] Documentation finalization

### Phase Benefits:

1. **Incremental Delivery**: Ship user stories as they complete
2. **Risk Mitigation**: Foundation issues caught early
3. **Team Scaling**: Multiple stories run in parallel
4. **Predictable Velocity**: Story points per sprint stabilize
5. **Quality Gates**: Each phase has clear exit criteria

---

## 🔗 Dependency Graph

```mermaid
{{DEPENDENCY_GRAPH}}
```

**Legend:**

- 🔴 **Critical Path** (blocking)
- 🟡 **High Priority** (core features)
- 🔵 **Medium Priority** (important)
- 🟢 **Low Priority** (nice-to-have)
- ⚪ **Operations** (ongoing)

---

## 📅 Implementation Phases

### Phase 1: Foundation (Weeks 1-2) • 21 SP

**Goal:** Setup core infrastructure and utilities

#### 🏗️ Epic 1: Foundation & Infrastructure • 21 SP

⏱️ **Est. Time:** 2 weeks • 🎯 **Priority:** P0 (Critical)

**Features:**

##### Feature 1.1: Base Application Configuration • 5 SP

⏱️ **Est. Time:** 1-2 days (~8-12h total) • 🎯 **Priority:** P0 • 📋 **Dependencies:** None
🏷️ **User Story:** [US0] As a developer, I need a robust configuration system

**Tasks:** (Test-First, execution order, hybrid estimation)

- [ ] [T001] [P] Write unit tests for configuration service (5 tests) • 2 SP (~3-4h)
      File: tests/unit/config/ConfigService.spec.ts
      Tests: env var loading, validation, defaults, type conversion, missing var errors
      Dependencies: None (can run parallel with other foundational tests)

- [ ] [T002] Setup configuration service/module • 2 SP (~3-4h)
      File: src/config/ConfigService.ts
      Implements: Load env vars, validate required fields, type-safe access
      Dependencies: None

- [ ] [T003] Configure environment variables (`.env` structure) • 1 SP (~1-2h)
      File: .env.example
      Structure: All required env vars with descriptions and example values
      Dependencies: T002 (know which vars are needed)

- [ ] [T004] Add validation for required env vars • 1 SP (~1-2h)
      File: src/config/ConfigService.ts (extend)
      Logic: Fail-fast on missing vars, clear error messages
      Dependencies: T002 (base service exists)

- [ ] [T005] [P] Create constants file for app-wide values • 1 SP (~1h)
      File: src/constants/index.ts
      Constants: App name, version, default values, enums
      Dependencies: None (can run parallel with other tasks)

- [ ] [T006] Document configuration in specs/configuration.md • 1 SP (~1h)
      File: specs/configuration.md
      Add: All env vars, types, defaults, validation rules
      Dependencies: T002, T003, T004 (config system complete)

**Acceptance Criteria:**

- [ ] App fails fast with clear error if required env var missing
- [ ] Configuration is type-safe (TypeScript interfaces)
- [ ] Test coverage ≥ 80%

**Ready-to-execute command:**

```bash
/feature new "Base application configuration with environment validation"
```

---

[Continue with all features for all epics...]

---

## ✅ Production Readiness Checklist

Before deploying to production, ensure all items are completed:

### Infrastructure

- [ ] All database migrations tested and documented
- [ ] Environment variables documented in `.env.example`
- [ ] Secrets rotated and stored securely (not in code)
- [ ] Docker images built and tagged
- [ ] CI/CD pipeline runs successfully
- [ ] Staging environment tested

### Security

- [ ] Authentication works correctly (JWT/OAuth/etc.)
- [ ] Authorization enforced on all protected endpoints
- [ ] RBAC roles tested (if applicable)
- [ ] Input validation on all endpoints
- [ ] SQL injection prevention verified
- [ ] XSS protection enabled
- [ ] CORS configured correctly
- [ ] Rate limiting implemented
- [ ] Security headers configured (helmet.js or similar)
- [ ] Compliance requirements met ({{COMPLIANCE}})

### Testing

- [ ] Unit test coverage ≥ {{COVERAGE_TARGET}}%
- [ ] Integration tests passing
- [ ] E2E tests covering critical flows
- [ ] Performance tests passed
- [ ] Load testing completed (if required)
- [ ] Security scan completed (OWASP ZAP/similar)

### Documentation

- [ ] API documentation up-to-date (Swagger/OpenAPI)
- [ ] README includes setup instructions
- [ ] Architecture diagrams current
- [ ] Deployment guide written
- [ ] Runbook for common issues
- [ ] Monitoring dashboard configured

### Monitoring & Operations

- [ ] Error tracking configured (Sentry/similar)
- [ ] Application metrics exposed (Prometheus/similar)
- [ ] Log aggregation configured (ELK/similar)
- [ ] Alerting rules defined
- [ ] Backup strategy implemented and tested
- [ ] Rollback procedure documented
- [ ] Health check endpoints working
- [ ] Database backup automated

### Performance

- [ ] Database indexes optimized
- [ ] N+1 queries eliminated
- [ ] Caching strategy implemented (if needed)
- [ ] API response times < {{RESPONSE_TIME_TARGET}}ms
- [ ] Static assets optimized and CDN configured
- [ ] Connection pooling configured

---

## 🚀 Getting Started

### Step 1: Review This Roadmap

- Understand the Epic structure and dependencies
- Identify which features are MVP vs nice-to-have
- Adjust priorities based on business needs

### Step 2: Start Implementation

```bash
# Start with Phase 1, Epic 1, Feature 1.1
/feature new "Base application configuration with environment validation"
```

### Step 3: Follow the Execution Order

- Work through Epics sequentially (respecting dependencies)
- Within an Epic, work through Features in order
- Use `/feature` command for each Feature
- Use `/work` command to track progress

### Step 4: Validate Continuously

After each Feature:

- [ ] Run tests: `npm run test`
- [ ] Check linting: `npm run lint`
- [ ] Check types: `npm run type-check`
- [ ] Update documentation if needed: `/flow-docs-sync`
- [ ] Commit with conventional commits
- [ ] Create PR for review

### Step 5: Track Progress

Update this roadmap as you complete features:

- Change `- [ ]` to `- [x]` for completed tasks
- Track actual time vs estimated
- Adjust remaining estimates based on velocity

---

## 📞 Support

**Questions about this roadmap?**

- Review `AGENT.md` for AI assistant guidance
- Review `docs/` for technical details
- Review `project-brief.md` for business context

**Need to modify the roadmap?**

- Update documentation first (`/flow-bootstrap` or `/flow-docs-sync`)
- Re-run Phase 9 to regenerate roadmap

---

**Generated by:** AI Flow v1.1.0
**Last Updated:** {{TIMESTAMP}}
````

**Progress:**

```
✅ Roadmap document generated
✅ Location: roadmap.md
✅ Total: {{TOTAL_EPICS}} Epics, {{TOTAL_FEATURES}} Features, {{TOTAL_TASKS}} Tasks
✅ Estimated: {{TOTAL_SP}} Story Points (~{{TOTAL_WEEKS}} weeks)
```

---

### Step 9.6: Summary & Next Steps (1 minute)

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ PHASE 9 COMPLETE: ROADMAP GENERATED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 Summary
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Documentation analyzed: {{DOCS_COUNT}} files
✅ Epics defined: {{EPICS_COUNT}}
✅ Features identified: {{FEATURES_COUNT}}
✅ Tasks breakdown: {{TASKS_COUNT}} total tasks
✅ Story Points: {{TOTAL_SP}} SP
✅ Estimated time: {{SOLO_WEEKS}} weeks (1 dev) | {{TWO_DEV_WEEKS}} weeks (2 devs)
✅ Dependency graph: Generated
✅ Execution order: Optimized for parallelization
✅ Roadmap document: roadmap.md

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 What This Roadmap Guarantees
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ **100% Coverage:** Every entity, endpoint, flow, and requirement from
   documentation is included in the roadmap.

✅ **Complete Implementation:** Following this roadmap will result in a
   fully functional, production-ready application.

✅ **Optimal Order:** Dependencies are analyzed. You'll never build
   Feature B before its dependency Feature A.

✅ **Realistic Estimates:** Story Points based on actual complexity
   analysis, not guesswork.

✅ **Ready to Execute:** Each Feature has a `/feature` command ready
   to copy-paste and start implementation.

✅ **Checkpoints:** Production readiness checklist ensures nothing
   is forgotten before deployment.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚀 Next Steps
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. **Open the roadmap**
   └─ Open roadmap.md in your editor

2. **Review and adjust priorities**
   └─ Decide which features are MVP vs future phases
   └─ Adjust P0/P1/P2/P3 priorities if needed

3. **Commit the roadmap**
   └─ git add roadmap.md
   └─ git commit -m "docs: add implementation roadmap with Story Points"

4. **Start implementation**
   └─ Begin with Phase 1, Epic 1, Feature 1.1
   └─ Copy the `/feature` command from roadmap
   └─ Execute: /feature new "Base application configuration..."

5. **Track your progress**
   └─ Mark tasks as complete: - [ ] → - [x]
   └─ Use /work show to see active features
   └─ Update estimates based on actual time

6. **Validate continuously**
   └─ Run tests after each feature
   └─ Use /review for code quality checks
   └─ Update docs with /flow-docs-sync when needed

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💡 Pro Tips
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• **Parallelization:** If you have 2+ devs, check the roadmap for
  Epics marked "Can run in PARALLEL"

• **Story Points:** Your team's velocity will stabilize after 2-3
  features. Adjust remaining estimates accordingly.

• **MVP Strategy:** Filter roadmap for P0 features only for fastest
  time-to-market.

• **Re-generate:** If documentation changes significantly, run
  /flow-bootstrap again (Phases 0-9) to update everything.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Ready to start building? 🚀

Open roadmap.md and let's ship this! 💪

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**ASK USER:**

```
Would you like to:

A) ✅ Start implementing first feature now (recommended)
   → Will execute: /feature new "{{FIRST_FEATURE_NAME}}"

B) 📋 Review roadmap first
   → Will open roadmap.md

C) ✏️ Customize roadmap
   → Will open roadmap.md for editing

Your choice (A/B/C): __
```

---

## Important Notes

### Story Point Calibration

The Story Point estimates are based on:

1. **Complexity factors:**

   - Number of entities involved
   - Business logic complexity
   - Integration complexity
   - Testing requirements
   - Security requirements

2. **Historical data:**

   - Simple CRUD: 3-5 SP
   - Auth systems: 13-21 SP
   - Payment integrations: 13-21 SP
   - Complex business flows: 8-13 SP

3. **AI-assisted development:**
   - Estimates assume use of AI tools (Copilot, Claude, etc.)
   - Without AI: multiply by 2-3x

### Roadmap Adaptability

The generated roadmap is a starting point. Teams should:

- Adjust priorities based on business needs
- Re-estimate after velocity stabilizes (2-3 sprints)
- Re-generate if documentation changes significantly
- Break down large features (21+ SP) into smaller chunks

### Coverage Guarantee

The roadmap generation process ensures:

1. **Every entity** from `docs/data-model.md` has a Feature
2. **Every endpoint** from `docs/api.md` has a Feature
3. **Every business flow** from `docs/business-flows.md` is covered
4. **All security requirements** from `specs/security.md` are included
5. **All integrations** from `specs/configuration.md` are planned
6. **Testing strategy** from `docs/testing.md` is embedded in every Feature
7. **Operations requirements** from `docs/operations.md` are in final Epic

### Validation Logic

Before generating roadmap, validate:

```
⚠️  Validation Errors

Missing documentation:
- [ ] docs/api.md not found
- [ ] docs/business-flows.md not found

Incomplete documentation:
- [ ] No entities defined in docs/data-model.md
- [ ] No endpoints defined in docs/api.md

Please fix documentation and re-run Phase 9
```

---

## Checklist for Phase 9

**9.1 Documentation Analysis:**

- [ ] Read all 11+ documentation files
- [ ] Extract business context
- [ ] Extract technical stack
- [ ] Extract data model (all entities)
- [ ] Extract API endpoints (all routes)
- [ ] Extract business flows
- [ ] Extract security requirements
- [ ] Extract testing strategy
- [ ] Extract operations requirements
- [ ] Show analysis summary

**9.2 Epic Definition:**

- [ ] Define Foundation Epic
- [ ] Define Data Layer Epic
- [ ] Define Authentication & Authorization Epic
- [ ] Define all Business Feature Epics
- [ ] Define Integration Epic (if external services exist)
- [ ] Define Operations & Deployment Epic
- [ ] Estimate Story Points for each Epic
- [ ] Show Epic summary

**9.3 Feature Breakdown:**

- [ ] For each Epic, break down into Features
- [ ] Assign Story Points to each Feature (Fibonacci scale)
- [ ] Define Tasks for each Feature with individual SP
- [ ] Define Acceptance Criteria for each Feature
- [ ] Add ready-to-execute `/feature` command
- [ ] Show Feature summary

**9.4 Dependency Analysis:**

- [ ] Analyze entity dependencies (FK relationships)
- [ ] Analyze logical dependencies (auth → protected endpoints)
- [ ] Identify parallelization opportunities
- [ ] Generate Mermaid dependency graph
- [ ] Generate execution order recommendation
- [ ] Show parallelization opportunities

**9.5 Generate Roadmap Document:**

- [ ] Create `roadmap.md`
- [ ] Include project overview
- [ ] Include Story Points reference table
- [ ] Include Epic overview table
- [ ] Include dependency graph (Mermaid)
- [ ] Include implementation phases
- [ ] Include all Epics with all Features
- [ ] Include production readiness checklist
- [ ] Include getting started guide
- [ ] Show roadmap location

**9.6 Summary & Next Steps:**

- [ ] Show complete summary
- [ ] Show roadmap guarantees
- [ ] Show next steps
- [ ] Show pro tips
- [ ] Ask user: Start first feature, Review, or Customize

**DO NOT:**

- ❌ Skip documentation analysis
- ❌ Generate generic Epics not based on actual docs
- ❌ Assign Story Points arbitrarily
- ❌ Miss any entities, endpoints, or flows
- ❌ Forget dependency analysis
- ❌ Skip parallelization opportunities
- ❌ Generate incomplete roadmap
- ❌ Leave placeholder text in roadmap
- ❌ Forget production readiness checklist

**ESTIMATED TIME:**

- 9.1: Documentation analysis - 5-8 min
- 9.2: Epic definition - 3-5 min
- 9.3: Feature breakdown - 5-10 min
- 9.4: Dependency analysis - 2-3 min
- 9.5: Generate roadmap - 2-5 min
- 9.6: Summary & next steps - 1 min
- **Total: 15-30 minutes**

---

**CONTINUE TO:** End (Phase 9 is the final phase)

**SUCCESS:** Complete implementation roadmap with Story Points generated! Ready to start building! 🚀
