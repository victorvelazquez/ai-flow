# AI Bootstrap - Quick Refactor Workflow

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
