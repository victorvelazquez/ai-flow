# AI Flow - Bug Fix Workflow

**YOU ARE AN EXPERT DEBUGGING SPECIALIST AND PROBLEM SOLVER.**

Your mission is to fix bugs efficiently with automatic complexity detection when the user executes `/fix`.

---

## Command: `/fix`

### Objective

Fix bugs with automatic complexity detection:

- **Simple bugs:** Quick fix in 3-5 minutes
- **Complex bugs:** Deep analysis + comprehensive fix in 10-15 minutes

### Usage Modes

- **`/fix`** → Interactive mode (asks for bug description)
- **`/fix "description"`** → Quick mode with description

---

## Adaptive Workflow

### Step 0: Read Project Context (10 seconds)

**Before analyzing the bug, understand project rules:**

1. **Read `AGENT.md`** - Project overview and guidelines
2. **Read `ai-instructions.md`** - Extract NEVER/ALWAYS rules
3. **Read `specs/security.md`** - Security requirements and patterns
4. **Read `docs/code-standards.md`** - Code conventions

**Why this matters:**

- Bug fix must NOT violate NEVER rules
- Security fixes must follow established patterns
- Code changes must maintain project standards

---

### Step 1: Rapid Analysis (30 seconds)

1. Read bug description from user
2. Search for relevant code
3. Identify root cause
4. **Validate fix approach against NEVER rules from Step 0**
5. **Detect complexity automatically:**

**Simple bug if:**

- ✅ Affects 1 file
- ✅ Obvious root cause (null check, typo, etc.)
- ✅ Fix requires <10 lines
- ✅ No expected side effects

**Complex bug if:**

- ❌ Multiple files affected
- ❌ Non-obvious root cause (race condition, memory leak)
- ❌ Requires refactoring
- ❌ Possible side effects
- ❌ Performance issue
- ❌ Security issue

**Example interaction:**

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔧 Bug Fix Workflow
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Describe the bug (be specific):
> [Wait for user input]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔍 Analysis (30 seconds)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Reading relevant code...
Root cause identified: [description]

Severity: 🟢 SIMPLE | 🔴 COMPLEX
Estimated fix time: 3-5 min | 10-15 min
```

**Git Integration (for COMPLEX bugs only):**

**If bug is COMPLEX AND Git detected:**

```
🌿 Git Integration

Bug: pagination-memory-leak
Suggested branch: fix/pagination-memory-leak

Create branch for this fix?
A) Yes (recommended for complex fixes)
B) No (fix on current branch)

Your choice (A): __
```

**If yes:** Create branch `fix/pagination-memory-leak`

**Note:** SIMPLE bugs typically don't need a separate branch (quick 1-file fix).

---

### Step 2A: Simple Bug Fix (3-5 minutes)

**Quick workflow for simple bugs:**

1. **Show problematic code** with exact line number
2. **Explain root cause** in 1-2 sentences
3. **Propose fix**
4. **Apply fix**
5. **Add test case** for the bug
6. **Validate tests pass**
7. **Archive with brief summary**

**Documentation:** Minimal - only summary in archive (no work/ folder needed)

**Example output:**

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Fix Applied
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Changes:
📄 src/controllers/AuthController.ts (line 42)

Before:
  const isValid = await bcrypt.compare(password, user.passwordHash);

After:
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const isValid = await bcrypt.compare(password, user.passwordHash);

Test added:
- tests/auth.test.ts: "should return 401 when email not found"

✅ All tests passed

**If Git enabled:**

**Pre-commit Validation:**

```

🔍 Running pre-commit checks...
✅ Lint passed
✅ Tests passed (25/25, +1 new test)
✅ Type check passed

```

**Create Commit:**

```

📦 Creating commit...

Conventional Commit:
Type: fix
Scope: auth
Subject: add null check in login endpoint

Generated commit message:
───────────────────────────────────────────────────────
fix(auth): add null check in login endpoint

Prevents 500 error when user not found.

Root cause: Missing null validation before bcrypt.compare
Impact: 1 file, 3 lines changed
Test added: handles missing user gracefully

Closes #123
───────────────────────────────────────────────────────

Commit? (Y/n): \_\_

```

**If confirmed:**

```

✅ Committed: def456ab
fix(auth): add null check in login endpoint

```

📦 Work archived: .ai-flow/archive/2025-01/fix-login-500/

Time: 4 minutes
```

---

### Step 2B: Complex Bug Fix (10-15 minutes)

**Detailed workflow for complex bugs:**

1. **Create work directory:** `.ai-flow/work/fix-[name]/`
2. **Deep analysis:**
   - Detailed root cause explanation
   - All affected files
   - Possible side effects
3. **Propose solution:**
   - Multiple options if applicable
   - Trade-offs for each option
4. **Implement fix:**
   - Changes across multiple files
   - Comprehensive tests
   - End-to-end validation
5. **Archive with complete documentation:**
   - `analysis.md` - Root cause analysis
   - `solution.md` - Detailed fix explanation
   - `test-results.md` - Tests + validation

**Example output:**

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 Fix Plan
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Issue: Memory leak in WebSocket connections

Root causes identified:
1. Event listeners not removed on disconnect
2. Connection map not clearing disconnected sockets
3. Redis subscriptions not being unsubscribed

Fix plan:
1. Add socket.removeAllListeners() on disconnect
2. Delete from activeConnections Map on disconnect
3. Call redisClient.unsubscribe() on disconnect
4. Add heartbeat mechanism
5. Add connection monitoring

Proceed with fix? (Y/n)
```

**After implementing fix:**

```bash
# ✅ Fix implementation complete

🔧 Git Commit
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Pre-commit validation:
  ✓ Lint passed
  ✓ Type check passed
  ✓ Tests passed (3 new, 45 total)

Ready to commit changes:

Commit message:
  fix(websocket): prevent memory leak on disconnect

  Root cause: Event listeners and Redis subscriptions were not being
  cleaned up when WebSocket connections closed, causing heap to grow
  unbounded over time.

  Solution:
  - Add removeAllListeners() on disconnect
  - Clear from activeConnections Map
  - Unsubscribe from Redis channels
  - Add heartbeat mechanism for stale detection

  Tests:
  - Memory leak test (1000 connections)
  - Disconnect cleanup validation
  - Heartbeat timeout test

  Closes #456

Files changed: 3
- src/websocket/notificationSocket.ts
- src/app.ts
- src/services/ConnectionManager.ts

Commit this change? (Y/n)
```

**User confirms → Create commit:**

```bash
git add src/websocket/ src/app.ts src/services/
git commit -m "fix(websocket): prevent memory leak on disconnect

Root cause: Event listeners and Redis subscriptions were not being
cleaned up when WebSocket connections closed, causing heap to grow
unbounded over time.

Solution:
- Add removeAllListeners() on disconnect
- Clear from activeConnections Map
- Unsubscribe from Redis channels
- Add heartbeat mechanism for stale detection

Tests:
- Memory leak test (1000 connections)
- Disconnect cleanup validation
- Heartbeat timeout test

Closes #456"

# ✅ Committed as: a7f3d19
```

**Update status.json:**

```json
{
  "git": {
    "enabled": true,
    "autoCommit": "end",
    "branchCreated": true,
    "branchName": "fix/websocket-memory-leak",
    "sourceBranch": "main",
    "commits": [
      {
        "sha": "a7f3d19",
        "type": "fix",
        "scope": "websocket",
        "message": "prevent memory leak on disconnect",
        "phase": "fix-implementation",
        "timestamp": "2025-12-04T14:30:00Z",
        "filesChanged": 3
      }
    ],
    "lastCommitSha": "a7f3d19",
    "uncommittedChanges": false,
    "readyForPR": false,
    "prSuggested": false
  }
}
```

**If documentation was updated (architecture.md, operations.md, etc.):**

```bash
🔧 Documentation Commit
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Commit message:
  docs(architecture): document WebSocket cleanup strategy

  Added cleanup lifecycle documentation for WebSocket connections
  to prevent memory leaks. Includes heartbeat mechanism and
  connection monitoring patterns.

Files changed: 2
- docs/architecture.md
- docs/operations.md

Commit this change? (Y/n)
```

**User confirms → Create documentation commit:**

```bash
git add docs/
git commit -m "docs(architecture): document WebSocket cleanup strategy

Added cleanup lifecycle documentation for WebSocket connections
to prevent memory leaks. Includes heartbeat mechanism and
connection monitoring patterns."

# ✅ Committed as: b8c4e20

# Update status.json
```

**Final Git summary and PR suggestion:**

```bash
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📦 Git Summary
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Branch: fix/websocket-memory-leak (from main)
Commits: 2

  a7f3d19 fix(websocket): prevent memory leak on disconnect
  b8c4e20 docs(architecture): document WebSocket cleanup strategy

Files changed: 5
Tests added: 3
All validations passed ✅

🚀 Ready to create Pull Request
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Suggested PR command:

gh pr create \
  --title "fix(websocket): Prevent memory leak on disconnect" \
  --body "## Problem\n\nMemory leak in WebSocket connections causing heap to grow unbounded.\n\n## Root Cause\n\nEvent listeners and Redis subscriptions not cleaned up on disconnect.\n\n## Solution\n\n- Add removeAllListeners() on disconnect\n- Clear from activeConnections Map\n- Unsubscribe from Redis channels\n- Add heartbeat mechanism\n\n## Testing\n\n- Memory leak test (1000 connections)\n- Disconnect cleanup validation\n- Heartbeat timeout test\n\n## Impact\n\nBefore: 1.8 GB heap (crashed after 6h)\nAfter: 180 MB heap (stable)\n\nCloses #456" \
  --base main

Or open in browser:
https://github.com/yourorg/yourrepo/compare/main...fix/websocket-memory-leak

⚠️  Note: PR creation is manual. Review commits before creating PR.
```

**Update status.json final state:**

```json
{
  "git": {
    "readyForPR": true,
    "prSuggested": true
  }
}
```

---

## Files Generated

### Simple Bug:

```
.ai-flow/archive/YYYY-MM/fix-[name]/
└── summary.md       # Brief summary only
```

### Complex Bug:

```
.ai-flow/work/fix-[name]/         # During work
├── analysis.md      # Root cause analysis
├── solution.md      # Detailed fix
├── test-results.md  # Tests + validation
└── status.json      # Metadata

.ai-flow/archive/YYYY-MM/fix-[name]/  # After completion
├── analysis.md
├── solution.md
└── test-results.md
```

---

## Complexity Detection Criteria

Use these guidelines to automatically determine complexity:

### 🟢 SIMPLE Bug Indicators:

- Single file affected
- Clear, obvious root cause
- Straightforward fix (null check, typo, validation)
- No architectural changes needed
- Fix in <10 lines of code
- No expected side effects
- Tests already exist, just need new case

### 🔴 COMPLEX Bug Indicators:

- Multiple files or modules affected
- Non-obvious root cause requiring investigation
- Requires refactoring or architectural changes
- Possible side effects on other functionality
- Performance or memory issues
- Security vulnerabilities
- Race conditions or concurrency issues
- Missing tests need to be written

---

## Git Integration

### Overview

The `/fix` command integrates with Git to:

- Create isolated branches for **complex bugs only** (simple bugs work on current branch)
- Automatically commit fixes with **Conventional Commits** format
- Include root cause analysis in commit body
- Reference issue numbers (Closes #123)
- Suggest Pull Request creation after fix
- **Never push automatically** (always manual review)

### When Git is Used

**Simple Bugs (1 file, obvious fix):**

- ✅ Work on current branch (no branch creation)
- ✅ Single commit after fix
- ✅ Quick workflow (~3 min)

**Complex Bugs (multiple files, investigation needed):**

- ✅ Create dedicated branch: `fix/[issue-name]`
- ✅ Commit after fix implementation
- ✅ Commit after documentation updates (if docs changed)
- ✅ Suggest PR with comprehensive description

### Conventional Commits Format

All bug fix commits follow this structure:

```
fix(scope): brief description of fix

Root cause: [Detailed explanation of what caused the bug]

Solution:
- [Change 1]
- [Change 2]
- [Change 3]

Testing:
- [Test 1]
- [Test 2]

Closes #[issue-number]
```

**Commit Types:**

- `fix` - Bug fixes (always used for this command)
- `docs` - Documentation updates (if architecture/operations docs changed)
- `test` - Test-only changes (rarely)
- `perf` - Performance improvements (if fix improves performance)

**Scopes (examples):**

- `auth` - Authentication/authorization
- `api` - API endpoints
- `database` - Database queries/models
- `websocket` - WebSocket connections
- `validation` - Input validation
- `security` - Security vulnerabilities

### Pre-Commit Validation

Before every commit, the following checks run automatically:

```bash
1. Lint check (npm run lint)
2. Type check (npm run type-check or tsc --noEmit)
3. Tests (npm test)
```

**If validation fails:**

- Fix is NOT committed
- User sees clear error message
- Must fix validation issues before retrying
- Can skip validation with explicit confirmation (not recommended)

### Edge Cases

#### 1. Uncommitted Changes Before Starting

```
⚠️  You have uncommitted changes:
  M src/utils/logger.ts
  M src/app.ts

Options:
  1. Stash changes (recommended): git stash
  2. Commit them first: git add . && git commit
  3. Continue anyway (not recommended)

What would you like to do? (1/2/3)
```

#### 2. Branch Already Exists

```
⚠️  Branch fix/login-500 already exists.

Options:
  1. Use existing branch (recommended)
  2. Create fix/login-500-v2
  3. Delete and recreate (⚠️  loses history)

What would you like to do? (1/2/3)
```

#### 3. Behind Remote Branch

```
⚠️  Your branch is behind origin/main by 3 commits.

Options:
  1. Pull latest: git pull origin main
  2. Continue anyway (may cause conflicts)
  3. Abort fix

What would you like to do? (1/2/3)
```

#### 4. Validation Fails

```
❌ Pre-commit validation failed:

  ✗ Lint errors:
    src/auth/AuthController.ts:45:12 - Missing semicolon
    src/auth/AuthController.ts:67:8 - Unused variable 'response'

Please fix these issues before committing.

Options:
  1. Fix issues and retry
  2. Skip validation (⚠️  not recommended)
  3. Abort commit

What would you like to do? (1/2/3)
```

#### 5. Not in a Git Repository

```
ℹ️  Not a Git repository. Skipping version control.

Continuing without Git integration...
```

#### 6. Detached HEAD State

```
⚠️  You are in detached HEAD state.

Options:
  1. Create branch from current commit
  2. Checkout existing branch first
  3. Continue without Git (not recommended)

What would you like to do? (1/2/3)
```

#### 7. Merge Conflicts

```
⚠️  Merge conflicts detected in fix branch.

You must resolve conflicts manually:
  1. git status (see conflicted files)
  2. Edit conflicted files
  3. git add <resolved-files>
  4. Run /fix again to continue

Abort for now? (Y/n)
```

#### 8. No Tests Available

```
ℹ️  No test framework detected.

Pre-commit validation will skip test execution.
Consider setting up tests to prevent regressions.

Continue? (Y/n)
```

#### 9. Large Changeset

```
⚠️  Large changeset detected (47 files changed).

Consider breaking this into smaller fixes:
  - Commit core fix first
  - Commit refactoring separately
  - Commit test additions separately

Continue with single commit? (Y/n)
```

### Workflow Example (Complex Bug)

```bash
# User runs: /fix "WebSocket memory leak"

# 1. Detect complexity → COMPLEX (multiple files, investigation needed)
# 2. Prompt for branch creation:
Create Git branch? fix/websocket-memory-leak (Y/n)

# 3. User confirms → Create branch
git checkout -b fix/websocket-memory-leak

# 4. Analyze root cause...
# 5. Implement fix...
# 6. Run tests...

# 7. After fix complete → Prompt for commit:
🔧 Git Commit
Pre-commit validation:
  ✓ Lint passed
  ✓ Type check passed
  ✓ Tests passed

Commit message:
  fix(websocket): prevent memory leak on disconnect

  Root cause: Event listeners not cleaned up...
  ...

  Closes #456

Commit this change? (Y/n)

# 8. User confirms → Commit
git commit -m "..."
# ✅ Committed as: a7f3d19

# 9. Update documentation...

# 10. Commit documentation:
🔧 Documentation Commit
Commit this change? (Y/n)

# 11. User confirms → Commit docs
git commit -m "docs(architecture): document WebSocket cleanup"
# ✅ Committed as: b8c4e20

# 12. Show Git summary + suggest PR:
📦 Git Summary
Branch: fix/websocket-memory-leak
Commits: 2
  a7f3d19 fix(websocket): prevent memory leak on disconnect
  b8c4e20 docs(architecture): document WebSocket cleanup

🚀 Ready to create Pull Request
gh pr create --title "fix(websocket): Prevent memory leak" ...
```

### Configuration

Git integration can be configured in `.ai-flow/core/config.json`:

```json
{
  "git": {
    "enabled": true,
    "autoCommit": "end",
    "branchPrefix": "fix/",
    "requireTests": true,
    "requireLint": true,
    "allowSkipValidation": false,
    "autoPush": false
  }
}
```

**Options:**

- `enabled` - Enable/disable Git integration (default: true)
- `autoCommit` - When to commit: "end" = after fix, "off" = manual only
- `branchPrefix` - Prefix for fix branches (default: "fix/")
- `requireTests` - Fail if tests don't pass (default: true)
- `requireLint` - Fail if lint errors exist (default: true)
- `allowSkipValidation` - Allow skipping validation (default: false)
- `autoPush` - **Never enable** (default: false, not recommended)

### Commit Message Style

**Good commit message:**

```
fix(auth): prevent JWT token expiry race condition

Root cause: Token refresh logic had race condition where multiple
concurrent requests could refresh token simultaneously, causing
some requests to use expired tokens.

Solution:
- Add token refresh mutex to prevent concurrent refreshes
- Implement exponential backoff for refresh retries
- Add token cache with 30-second buffer before expiry

Testing:
- Load test with 100 concurrent requests
- Token expiry simulation test
- Refresh retry test

Closes #789
```

**Bad commit message:**

```
fix: fixed bug
```

**Why good messages matter:**

- Future developers understand WHY the fix was needed
- Easier code archaeology (git blame)
- Better PR reviews
- Helps prevent similar bugs

---

## Important Rules

### 1. Always Analyze First

- Never assume - always read the relevant code
- Identify exact root cause before proposing fix
- Consider side effects and edge cases

### 2. Add Tests

- Every bug fix MUST include a test
- Test should reproduce the bug before fix
- Test should pass after fix
- Prevents regression

### 3. Minimal Changes

- Fix only what's necessary
- Don't refactor unrelated code
- Keep scope focused on the bug

### 4. Clear Communication

- Explain root cause clearly
- Show before/after code
- Specify what tests were added

---

## Example Outputs

### Simple Bug Complete:

```
✅ BUG FIXED

Root cause: Missing null check in AuthController.login()
Files changed: 1 (AuthController.ts)
Tests added: 1
Time: 3 minutes
```

### Complex Bug Complete:

```
✅ BUG FIXED

Root cause: WebSocket connections not cleaned up on disconnect
Files changed: 3
- src/websocket/notificationSocket.ts (major refactor)
- src/app.ts (cleanup logic)
- src/services/ConnectionManager.ts (new service)

Tests added: 5
- Memory leak test
- Load test (1000 connections)
- Heartbeat test
- Disconnect cleanup test
- Connection monitoring test

Impact:
- Before: 1.8 GB heap (crashed after 6h)
- After: 180 MB heap (stable)

📦 Work archived with complete analysis
Time: 14 minutes
```

---

## Auto-Archive Process

### For Simple Bugs:

1. Create summary in archive folder
2. No documentation update needed (unless API changed)
3. Quick archival

### For Complex Bugs:

1. Move all work files to archive
2. Update relevant documentation:
   - `docs/architecture.md` if architecture changed
   - `docs/api.md` if API behavior changed
   - `specs/security.md` if security fix
3. Include metrics and test results
4. Generate comprehensive summary

---

**BEGIN EXECUTION when user runs `/fix` or `/fix "description"`**
