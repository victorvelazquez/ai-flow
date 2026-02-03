## PHASE 10: User Stories Generation (5-10 min)

> **Order for this phase:** OPTIONAL. Executed after Phase 9 or on demand.

### Objective

Generate comprehensive User Stories from the Implementation Roadmap, mapping features to user needs.

---

## User Story Format

```
# HU-XXX-XXX: [User Story Title]

**Epic:** EP-XXX - [Epic Name]
**Priority:** P0 / P1 / P2 / P3
**Story Points:** X SP
**Status:** Not Started

---

## User Story

**As a** [user type],
**I want** [goal/desire],
**So that** [benefit/value].

---

## Acceptance Criteria

- [ ] Given [context], when [action], then [expected result]
- [ ] Given [context], when [action], then [expected result]
- [ ] Given [context], when [action], then [expected result]

---

## Technical Tasks

From planning/roadmap.md:

- [ ] TXXX [CAT] Description • 1 SP → {{path}} | deps: TXXX
- [ ] TXXX [CAT] Description • 1 SP → {{path}} | deps: TXXX

---

## Definition of Done

- [ ] All technical tasks completed
- [ ] All acceptance criteria met
- [ ] Unit tests passing
- [ ] UI tests passing (if applicable)
- [ ] Code reviewed
- [ ] Documentation updated

---

## Notes

[Additional context, dependencies, or considerations]

---

**Created:** 2025-02-03
**Updated:** 2025-02-03
```

---

## Workflow: 4 Steps

### Step 10.1: Extract Epics and Features

**Read planning/roadmap.md and extract:**

```
EPICS FOUND:
├── EP-001: Foundation (15 SP)
├── EP-002: Data Layer (25 SP)
├── EP-003: Business Logic (20 SP)
├── EP-004: UI Foundation (20 SP)
├── EP-005: UI Components (30 SP)
├── EP-006: Controllers (25 SP)
├── EP-007: Features (35 SP)
└── EP-008: Packaging (10 SP)

FEATURES EXTRACTED (from project-brief.md + docs):
├── User Authentication
├── Project Management
├── Task Management
├── File Operations
├── Search & Filter
├── Reports & Export
└── Settings & Preferences
```

---

### Step 10.2: Map Features to User Stories

**Generate User Story for each feature:**

**Example: User Authentication**

```markdown
# HU-001-001: User Login

**Epic:** EP-001 - Foundation
**Priority:** P0
**Story Points:** 8 SP
**Status:** Not Started

---

## User Story

**As a** registered user,
**I want** to log into the application with my credentials,
**So that** I can access my personalized data and settings.

---

## Acceptance Criteria

- [ ] Given I am on the login screen, when I enter valid credentials, then I am redirected to the main window
- [ ] Given I am on the login screen, when I enter invalid credentials, then I see an error message "Invalid username or password"
- [ ] Given I am on the login screen, when I leave fields empty, then the Login button is disabled
- [ ] Given I am logged in, when I close the application, then my session is saved (if "Remember me" is checked)
- [ ] Given I exceed 5 failed login attempts, when I try again, then my account is locked for 15 minutes

---

## Technical Tasks

From planning/roadmap.md:

- [ ] T025 [M] Create User entity (id, username, password, email) • 1 SP → {{SRC}}/{{MODEL_DIR}}/User{{EXT}} | deps: T012
- [ ] T026 [D] Create UserDAO interface • 1 SP → {{SRC}}/{{DAO_DIR}}/UserDAO{{EXT}} | deps: T025
- [ ] T027 [D] Implement UserDAO.findByUsername() • 1 SP → {{SRC}}/{{DAO_DIR}}/UserDAOImpl{{EXT}} | deps: T026
- [ ] T028 [S] Create AuthService • 1 SP → {{SRC}}/{{SERVICE_DIR}}/AuthService{{EXT}} | deps: T027
- [ ] T029 [S] Implement AuthService.login(username, password) • 2 SP → {{SRC}}/{{SERVICE_DIR}}/AuthService{{EXT}} | deps: T028
- [ ] T030 [V] Create LoginDialog UI • 2 SP → {{SRC}}/{{VIEW_DIR}}/LoginDialog{{EXT}} | deps: none
- [ ] T031 [C] Create LoginController • 1 SP → {{SRC}}/{{CONTROLLER_DIR}}/LoginController{{EXT}} | deps: T029,T030

---

## Definition of Done

- [ ] All technical tasks completed (T025-T031)
- [ ] All acceptance criteria met
- [ ] Unit tests for AuthService passing
- [ ] UI tests for LoginDialog passing
- [ ] Code reviewed and merged
- [ ] Documentation updated (docs/FEATURES.md)

---

## Notes

- Password must be hashed (BCrypt) before storing
- Session token stored securely (Preferences API or Keychain)
- Lock mechanism uses timestamp in database
- "Remember me" stores encrypted token

---

**Created:** 2025-02-03
**Updated:** 2025-02-03
```

---

### Step 10.3: Generate Remaining User Stories

**Generate User Stories for all features:**

```
USER STORIES TO GENERATE:

EP-001: Foundation
├── HU-001-001: User Login (P0, 8 SP)
└── HU-001-002: User Registration (P0, 8 SP)

EP-002: Data Layer
├── HU-002-001: Persist User Data (P0, 5 SP)
├── HU-002-002: Persist Project Data (P0, 5 SP)
└── HU-002-003: Persist Task Data (P0, 5 SP)

EP-003: Business Logic
├── HU-003-001: Validate User Input (P0, 3 SP)
├── HU-003-002: Calculate Project Progress (P1, 5 SP)
└── HU-003-003: Manage Task Status (P1, 5 SP)

EP-004: UI Foundation
├── HU-004-001: Navigate Main Window (P0, 8 SP)
├── HU-004-002: Access Menu Bar (P0, 5 SP)
└── HU-004-003: Use Toolbar (P1, 3 SP)

EP-005: UI Components
├── HU-005-001: Create New Project (P0, 8 SP)
├── HU-005-002: Edit Project Details (P1, 5 SP)
├── HU-005-003: Delete Project (P1, 3 SP)
├── HU-005-004: Create New Task (P0, 8 SP)
├── HU-005-005: Edit Task Details (P1, 5 SP)
└── HU-005-006: Delete Task (P1, 3 SP)

EP-006: Controllers
├── HU-006-001: Handle Button Clicks (P0, 3 SP)
├── HU-006-002: Handle Keyboard Shortcuts (P1, 5 SP)
└── HU-006-003: Handle Drag & Drop (P1, 5 SP)

EP-007: Features
├── HU-007-001: Search Projects (P1, 8 SP)
├── HU-007-002: Filter Tasks (P1, 5 SP)
├── HU-007-003: Export to PDF (P1, 8 SP)
├── HU-007-004: Import from CSV (P2, 8 SP)
└── HU-007-005: Generate Reports (P1, 8 SP)

EP-008: Packaging
├── HU-008-001: Install Application (P0, 3 SP)
└── HU-008-002: Auto-Update Application (P2, 8 SP)

TOTAL: 30 User Stories
```

---

### Step 10.4: Generate planning/user-stories/ structure

**Create directory structure:**

```
planning/
├── roadmap.md (already exists from Phase 9)
└── user-stories/
    ├── EP-001-Foundation/
    │   ├── HU-001-001.md (User Login)
    │   └── HU-001-002.md (User Registration)
    ├── EP-002-Data-Layer/
    │   ├── HU-002-001.md (Persist User Data)
    │   ├── HU-002-002.md (Persist Project Data)
    │   └── HU-002-003.md (Persist Task Data)
    ├── EP-003-Business-Logic/
    │   ├── HU-003-001.md
    │   ├── HU-003-002.md
    │   └── HU-003-003.md
    ├── EP-004-UI-Foundation/
    │   ├── HU-004-001.md
    │   ├── HU-004-002.md
    │   └── HU-004-003.md
    ├── EP-005-UI-Components/
    │   ├── HU-005-001.md
    │   ├── HU-005-002.md
    │   ├── HU-005-003.md
    │   ├── HU-005-004.md
    │   ├── HU-005-005.md
    │   └── HU-005-006.md
    ├── EP-006-Controllers/
    │   ├── HU-006-001.md
    │   ├── HU-006-002.md
    │   └── HU-006-003.md
    ├── EP-007-Features/
    │   ├── HU-007-001.md
    │   ├── HU-007-002.md
    │   ├── HU-007-003.md
    │   ├── HU-007-004.md
    │   └── HU-007-005.md
    └── EP-008-Packaging/
        ├── HU-008-001.md
        └── HU-008-002.md
```

---

### Phase 10 Output

```
✅ User Stories generated!

Created: planning/user-stories/

Summary:
- 30 User Stories created
- 8 Epic directories
- All stories linked to roadmap tasks
- Acceptance criteria defined
- Definition of Done included

File structure:
planning/
├── roadmap.md (180 tasks)
└── user-stories/
    ├── EP-001-Foundation/ (2 stories, 16 SP)
    ├── EP-002-Data-Layer/ (3 stories, 15 SP)
    ├── EP-003-Business-Logic/ (3 stories, 13 SP)
    ├── EP-004-UI-Foundation/ (3 stories, 16 SP)
    ├── EP-005-UI-Components/ (6 stories, 32 SP)
    ├── EP-006-Controllers/ (3 stories, 13 SP)
    ├── EP-007-Features/ (5 stories, 37 SP)
    └── EP-008-Packaging/ (2 stories, 11 SP)

Next steps:
1. Review planning/user-stories/
2. Start implementation with /flow-work HU-001-001
3. Or continue by Epic: /flow-work EP-001

Documentation complete! 🎉
```

---

## Final Summary

```
🎉 ALL PHASES COMPLETE!

You now have:
✅ Phase 0: Project Discovery (existing projects)
✅ Phase 1: Desktop UX & Requirements
✅ Phase 2: UI Components (Swing/JavaFX/SWT)
✅ Phase 3: Architecture (MVC/MVP/MVVM)
✅ Phase 4: Data & Storage
✅ Phase 5: Code Standards
✅ Phase 6: Testing Strategy
✅ Phase 7: Packaging & Deployment
✅ Phase 8: Project Setup & Docs
✅ Phase 9: Implementation Roadmap (180 tasks)
✅ Phase 10: User Stories (30 stories)

Generated files:
📄 project-brief.md
📄 docs/ARCHITECTURE.md
📄 docs/DATABASE.md
📄 docs/DEVELOPMENT.md
📄 docs/DEPLOYMENT.md
📄 planning/roadmap.md
📁 planning/user-stories/ (30 files)
📄 README.md
📄 .gitignore

Ready to start development!

Commands:
- /flow-work HU-001-001 → Implement User Login
- /flow-work EP-001 → Implement Foundation Epic
- /flow-work T001 → Implement specific task
- /flow-check → Review code quality
- /flow-commit → Commit changes

Happy coding! 🚀
```

---

**Last Updated:** 2025-02-03
**Version:** 1.0.0
