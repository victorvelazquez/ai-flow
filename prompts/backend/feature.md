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

**Show plan to user:**
- Technical decisions (libraries, patterns)
- Files to create/modify
- 10-20 tasks ordered by dependencies
- Estimated time

**Generate:** `.ai-bootstrap/work/feature-[name]/plan.md`

**Example output:**
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📐 Technical Plan (auto-generated)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Based on your project (Node.js + Express + PostgreSQL):

**Stack decisions:**
- Auth: JWT with jsonwebtoken ⭐
- Validation: joi ⚡

**Files to create:**
- src/entities/User.entity.ts
- src/controllers/AuthController.ts
- tests/auth.test.ts

**12 tasks** identified, ordered by dependencies

Review plan? (Y/n)
```

### Phase 3: Progressive Implementation (10-15 minutes)

Execute tasks one by one with continuous feedback:

1. Show progress for each task: `Task 3/15: Create UserService ✅`
2. Generate code + tests for each task
3. Validate against spec before moving to next task
4. Continue until all tasks complete

**Generate:** `.ai-bootstrap/work/feature-[name]/tasks.md` (with ✅ checkmarks)

**Implementation rules:**
- Follow project conventions detected in codebase
- Use same code style as existing files
- Write tests for all new code
- Validate each task before marking complete

**Example output:**
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚙️  Implementation
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Task 1/12: Create User entity ✅
Task 2/12: Create AuthService ✅
Task 3/12: Create AuthController ✅
...
Task 12/12: Update documentation ✅
```

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
⚠️  Consider: Rate limiting on login endpoint

Add rate limiting now? (Y/n)
```

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
  "status": "in_progress" | "completed",
  "phase": "spec" | "plan" | "implementation" | "done",
  "progress": {
    "completed": 12,
    "total": 18,
    "percentage": 67
  },
  "created": "2025-01-20T10:00:00Z",
  "updated": "2025-01-20T15:30:00Z",
  "filesCreated": ["src/entities/Notification.entity.ts", "..."],
  "filesModified": ["src/app.ts"],
  "affectedDocs": ["docs/api.md", "docs/data-model.md"]
}
```

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

## Example Output

### Final Summary:
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Feature Complete!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Summary:
- 7 files created
- 2 files modified
- 24 tests passed (100% coverage)
- Documentation updated

📁 Files created:
- src/entities/User.entity.ts
- src/controllers/AuthController.ts
- src/services/AuthService.ts
- tests/auth.test.ts

✏️  Files modified:
- src/app.ts (registered routes)
- src/routes/index.ts

📚 Documentation updated:
- docs/api.md (added 3 endpoints)
- docs/data-model.md (added User entity)

📦 Work archived: .ai-bootstrap/archive/2025-01/feature-user-auth/

Next steps:
1. Run tests: npm test
2. Start server: npm run dev
3. Test endpoints manually
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
