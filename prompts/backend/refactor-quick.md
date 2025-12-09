# AI Flow - Quick Refactor Workflow

**YOU ARE AN EXPERT REFACTORING SPECIALIST.**

Your mission is to execute small refactorings quickly without the overhead of full spec and planning when the user executes `/refactor-quick`.

---

## Command: `/refactor-quick`

### Objective

Quick refactor for small changes (3-5 minutes) without full specification process.

**Difference from `/feature refactor`:**

| Aspect            | `/feature refactor` | `/refactor-quick` |
| ----------------- | ------------------- | ----------------- |
| **Time**          | 15-20 min           | 3-5 min           |
| **Spec**          | Complete            | Not required      |
| **Plan**          | Detailed            | Implicit/brief    |
| **Documentation** | Complete            | Minimal           |
| **Use**           | Large refactor      | Small refactor    |

### Usage

```bash
/refactor-quick "Extract validateEmail to utils"
/refactor-quick "Rename UserModel to User across codebase"
/refactor-quick "Move auth logic from controller to service"
/refactor-quick "Extract common validation to middleware"
```

---

## Workflow (3-5 minutes)

### Step 0: Read Architecture Context (15 seconds)

**Before refactoring, understand project patterns:**

1. **Read `docs/architecture.md`** - System architecture, design patterns, layering rules
2. **Read `docs/code-standards.md`** - Naming conventions, file organization, code style
3. **Read `ai-instructions.md`** - NEVER Rules (avoid violations during refactor)

**Validate refactor against:**

- Architecture patterns (don't break established design)
- Code standards (maintain consistency)
- NEVER Rules (don't introduce violations)

---

### Step 1: Identify Scope (30 seconds)

1. **Parse refactor description** from user
2. **Search affected files** using grep/glob
3. **Find all occurrences** of code to refactor
4. **Estimate impact** (lines, files, tests affected)
5. **Validate against architecture patterns from Step 0**

**Example interaction:**

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚡ Quick Refactor
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Refactor: Extract validateEmail to utils

Scanning codebase...
Found 3 files with email validation logic
```

---

### Step 2: Propose Changes (30 seconds)

Show brief plan with affected files:

**Example output:**

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 Refactor Plan
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Files affected: 3
- src/utils/validators.ts (create new file)
- src/controllers/UserController.ts (modify)
- src/controllers/AuthController.ts (modify)

Changes:
1. Create validateEmail() in utils/validators.ts
2. Replace inline validation in UserController (2 locations)
3. Replace inline validation in AuthController (1 location)
4. Update imports in both controllers

Tests to update: 2 files
- tests/user.test.ts
- tests/auth.test.ts

Estimated time: 3-4 minutes

Proceed? (Y/n)
```

---

### Step 3: Execute Refactor (2-3 minutes)

1. **Create new files** if needed
2. **Move/extract code** to new location
3. **Update all usages** of refactored code
4. **Update imports/references** across files
5. **Adjust tests** if needed

**Show progress:**

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚙️  Executing Refactor
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Created src/utils/validators.ts
✅ Extracted validateEmail() function
✅ Updated src/controllers/UserController.ts (2 locations)
✅ Updated src/controllers/AuthController.ts (1 location)
✅ Updated imports
✅ Updated test files
```

---

### Step 4: Validate (30 seconds)

1. **Run tests automatically** (if test command exists)
2. **Verify all tests pass**
3. **Show summary**

**Example output:**

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Refactor Complete!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Changes:
- Created: src/utils/validators.ts
- Modified: src/controllers/UserController.ts (2 locations)
- Modified: src/controllers/AuthController.ts (1 location)
- Updated: 2 test files

Tests: ✅ All 24 tests passed

Summary:
- Extracted validateEmail() to utils
- Removed 15 lines of duplicated code
- Improved code reusability

No documentation update needed (code-only refactor)

Time: 4 minutes
```

**Git Commit (Optional):**

```bash
🔧 Git Commit
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Refactor complete. Create Git commit?

Pre-commit validation:
  ✓ Lint passed
  ✓ Type check passed
  ✓ Tests passed (24 total)

Commit message:
  refactor(validators): extract email validation to utils

  Extracted validateEmail() to utils/validators.ts to reduce
  code duplication across UserController and AuthController.

  Changes:
  - Created validators.ts with validateEmail()
  - Updated UserController (2 locations)
  - Updated AuthController (1 location)
  - Removed 15 lines of duplicate code

Files changed: 3
- src/utils/validators.ts (new)
- src/controllers/UserController.ts
- src/controllers/AuthController.ts

Commit this refactor? (Y/n)
```

**User confirms → Create commit:**

```bash
git add src/utils/ src/controllers/
git commit -m "refactor(validators): extract email validation to utils

Extracted validateEmail() to utils/validators.ts to reduce
code duplication across UserController and AuthController.

Changes:
- Created validators.ts with validateEmail()
- Updated UserController (2 locations)
- Updated AuthController (1 location)
- Removed 15 lines of duplicate code"

# ✅ Committed as: c9d5f31
```

**Final summary with Git info:**

```bash
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Refactor Complete
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Refactor: Extract email validation to utils
Commit: c9d5f31
Files changed: 3
Tests: ✅ 24 passed
Time: 4 minutes

ℹ️  Quick refactor complete. No PR needed for internal refactors.
```

---

## Supported Refactor Types

### 1. Extract Method/Function

**Pattern:** Duplicate code or complex logic → Separate function

**Examples:**

- "Extract email validation to utils"
- "Extract password hashing to auth utils"
- "Extract error handling to middleware"

### 2. Rename

**Pattern:** Variable/function/class rename → Update all references

**Examples:**

- "Rename UserModel to User"
- "Rename getUserData to fetchUserProfile"
- "Rename isValid to isAuthenticated"

### 3. Move Logic

**Pattern:** Logic in wrong place → Move to appropriate layer

**Examples:**

- "Move auth logic from controller to service"
- "Move validation from service to middleware"
- "Move formatting from controller to utils"

### 4. Extract to Utility

**Pattern:** Reusable code → Utility module

**Examples:**

- "Extract date formatting to utils"
- "Extract string helpers to utils"
- "Extract constants to config file"

---

## When NOT to Use

### ❌ Don't use `/refactor-quick` if:

- Refactor affects **>5 files**
- Requires **architectural changes**
- Needs to **modify database schema**
- Requires **detailed planning**
- Has **complex trade-offs** to consider
- **Tests are unclear** how to update

### ✅ In those cases, use `/feature refactor`

The full `/feature refactor` mode provides:

- Complete specification
- Detailed planning
- Comprehensive testing strategy
- Full documentation update

---

## Git Integration

### Overview

The `/refactor-quick` command integrates with Git to:

- Work on **current branch** (no branch creation for small refactors)
- Optionally commit refactor with **Conventional Commits** format
- Single commit at end (after refactor complete)
- **Never push automatically** (always manual review)
- **No PR suggestion** (internal refactors rarely need PRs)

### When Git is Used

**Quick Refactors:**

- ✅ Work on current branch (no isolation needed)
- ✅ Single commit after refactor complete
- ✅ Commit is **optional** (user decides)
- ❌ No branch creation (too lightweight)
- ❌ No PR suggestion (internal change)

**If refactor is large:**

- Suggest using `/feature refactor` instead
- Larger refactors benefit from branch isolation
- Complex refactors need PR review

### Conventional Commits Format

All refactor commits follow this structure:

```
refactor(scope): brief description of refactor

[Detailed explanation of what was refactored and why]

Changes:
- [Change 1]
- [Change 2]
- [Change 3]
```

**Commit Types:**

- `refactor` - Code restructuring without behavior change (always used)
- `style` - Code style/formatting only (rarely)
- `perf` - Performance improvement refactor (if applicable)

**Scopes (examples):**

- `validators` - Validation utilities
- `utils` - General utilities
- `controllers` - Controller layer
- `services` - Service layer
- `middleware` - Middleware components
- `models` - Data models

### Pre-Commit Validation

Before committing, the following checks run automatically:

```bash
1. Lint check (npm run lint)
2. Type check (npm run type-check or tsc --noEmit)
3. Tests (npm test)
```

**If validation fails:**

- Refactor is NOT committed
- User sees clear error message
- Must fix validation issues before retrying
- Can skip with explicit confirmation (not recommended)

### Edge Cases

#### 1. Uncommitted Changes Exist

```
ℹ️  You have uncommitted changes:
  M src/app.ts
  M src/config.ts

Refactor will work on current branch with these changes.
Consider committing or stashing them first.

Continue? (Y/n)
```

#### 2. Tests Fail After Refactor

```
❌ Pre-commit validation failed:

  ✗ Tests failed:
    auth.test.ts: "should validate email format" FAILED

    Expected: validateEmail to be defined
    Received: undefined

Likely cause: Import path incorrect in test file.

Options:
  1. Fix test imports and retry
  2. Skip commit (manual commit later)
  3. Skip validation (⚠️  not recommended)

What would you like to do? (1/2/3)
```

#### 3. Validation Fails

```
❌ Pre-commit validation failed:

  ✗ Lint errors:
    src/utils/validators.ts:12:1 - Missing JSDoc comment

Please fix these issues before committing.

Options:
  1. Fix issues and retry
  2. Skip commit (commit manually later)
  3. Skip validation (⚠️  not recommended)

What would you like to do? (1/2/3)
```

#### 4. Not in a Git Repository

```
ℹ️  Not a Git repository. Skipping version control.

Refactor complete. Changes applied without Git commit.
```

#### 5. Detached HEAD State

```
⚠️  You are in detached HEAD state.

Options:
  1. Create branch from current commit first
  2. Checkout existing branch
  3. Continue without commit

What would you like to do? (1/2/3)
```

#### 6. Large Refactor Detected

```
⚠️  Large refactor detected (8 files changed).

This is too complex for /refactor-quick.

Recommendation: Use `/feature refactor` instead for:
- Branch isolation
- Detailed planning
- PR review process

Continue with /refactor-quick anyway? (Y/n)
```

#### 7. No Tests Available

```
ℹ️  No test framework detected.

Pre-commit validation will skip test execution.
Consider adding tests to prevent regressions.

Continue? (Y/n)
```

#### 8. User Declines Commit

```
Commit this refactor? (Y/n): n

ℹ️  Skipping commit. You can commit manually:

git add src/utils/ src/controllers/
git commit -m "refactor(validators): extract email validation"

Refactor complete without commit.
```

### Workflow Example (Extract Validation)

```bash
# User runs: /refactor-quick "Extract email validation to utils"

# 1. Scan codebase for email validation patterns
# 2. Propose refactor plan (3 files, 2 locations)
# 3. User confirms
# 4. Execute refactor:
#    - Create validators.ts
#    - Extract validateEmail()
#    - Update UserController
#    - Update AuthController
# 5. Run tests automatically
# 6. Tests pass ✓

# 7. Prompt for commit:
🔧 Git Commit
Pre-commit validation:
  ✓ Lint passed
  ✓ Type check passed
  ✓ Tests passed

Commit message:
  refactor(validators): extract email validation to utils
  ...

Commit this refactor? (Y/n)

# 8. User confirms → Commit
git commit -m "..."
# ✅ Committed as: c9d5f31

# 9. Show final summary:
✅ Refactor Complete
Commit: c9d5f31
Files changed: 3
Tests: ✅ 24 passed
Time: 4 minutes
```

### Configuration

Git integration can be configured in `.ai-flow/core/config.json`:

```json
{
  "git": {
    "enabled": true,
    "autoCommit": "end",
    "requireTests": true,
    "requireLint": true,
    "allowSkipValidation": false,
    "autoPush": false
  }
}
```

**Options:**

- `enabled` - Enable/disable Git integration (default: true)
- `autoCommit` - "end" = prompt after refactor, "off" = never prompt
- `requireTests` - Fail if tests don't pass (default: true)
- `requireLint` - Fail if lint errors exist (default: true)
- `allowSkipValidation` - Allow skipping validation (default: false)
- `autoPush` - **Never enable** (default: false, not recommended)

### Commit Message Style

**Good commit message:**

```
refactor(validators): extract email validation to shared utility

Extracted validateEmail() to utils/validators.ts to eliminate
code duplication in UserController and AuthController.

Changes:
- Created validators.ts with validateEmail() and isValidEmail()
- Updated UserController to use shared validator (2 locations)
- Updated AuthController to use shared validator (1 location)
- Added unit tests for validators
- Removed 15 lines of duplicate code

No behavior changes - pure refactor.
```

**Bad commit message:**

```
refactor: cleanup
```

**Why good messages matter:**

- Explains WHAT was refactored
- Explains WHY refactor was needed
- Shows impact (files, lines saved)
- Confirms no behavior change
- Future developers understand intent

### Differences from `/feature refactor`

| Aspect       | `/refactor-quick` | `/feature refactor`          |
| ------------ | ----------------- | ---------------------------- |
| **Branch**   | Current branch    | New branch `refactor/[name]` |
| **Commits**  | Single commit     | Multiple commits (per phase) |
| **PR**       | No suggestion     | PR suggestion                |
| **Scope**    | 1-3 files         | 5+ files                     |
| **Time**     | 3-5 min           | 15-20 min                    |
| **Planning** | Minimal           | Detailed spec                |
| **Docs**     | Minimal           | Complete                     |

---

## Important Rules

### 1. Scope Limitation

- Keep refactors **small and focused**
- One refactor at a time
- If scope grows, suggest `/feature refactor` instead

### 2. Test Preservation

- All existing tests **must pass**
- Update test imports/references
- No behavior changes (pure refactor)

### 3. No Feature Changes

- Refactor **only** - no new features
- No behavior modifications
- No API changes

### 4. Minimal Documentation

- Update docs **only if** public API changed
- Skip docs for internal refactors
- Quick summary sufficient

---

## Example Scenarios

### Scenario 1: Extract Validation

```
User: /refactor-quick "Extract email validation to validators.ts"

AI:
1. Scans for email validation patterns
2. Creates validators.ts with validateEmail()
3. Replaces inline validation (5 locations)
4. Updates imports
5. Tests pass ✅
6. Done in 3 minutes
```

### Scenario 2: Rename Class

```
User: /refactor-quick "Rename UserModel to User"

AI:
1. Finds all UserModel references (23 locations)
2. Renames class definition
3. Updates all imports
4. Updates all type annotations
5. Tests pass ✅
6. Done in 4 minutes
```

### Scenario 3: Move Logic

```
User: /refactor-quick "Move auth logic from AuthController to AuthService"

AI:
1. Identifies auth logic in controller
2. Creates/updates AuthService
3. Moves logic to service layer
4. Updates controller to call service
5. Tests pass ✅
6. Done in 5 minutes
```

---

## Error Handling

### If Scope Too Large:

```
⚠️  This refactor affects 8 files and requires architectural changes.

This is too complex for /refactor-quick.

Recommendation: Use `/feature refactor` instead for:
- Detailed planning
- Comprehensive testing
- Full documentation

Continue anyway? (Y/n)
```

### If Tests Fail:

```
❌ Tests Failed After Refactor

3 tests failing:
- auth.test.ts: "should validate email format"
- user.test.ts: "should reject invalid emails"
- integration.test.ts: "registration flow"

Analyzing failures...
[Shows failure details and suggests fixes]

Fix automatically? (Y/n)
```

---

**BEGIN EXECUTION when user runs `/refactor-quick "description"`**
