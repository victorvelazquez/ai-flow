# AI Bootstrap - Bug Fix Workflow

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
📦 Work archived: .ai-bootstrap/archive/2025-01/fix-login-500/

Time: 3 minutes
```

---

### Step 2B: Complex Bug Fix (10-15 minutes)

**Detailed workflow for complex bugs:**

1. **Create work directory:** `.ai-bootstrap/work/fix-[name]/`
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

---

## Files Generated

### Simple Bug:

```
.ai-bootstrap/archive/YYYY-MM/fix-[name]/
└── summary.md       # Brief summary only
```

### Complex Bug:

```
.ai-bootstrap/work/fix-[name]/         # During work
├── analysis.md      # Root cause analysis
├── solution.md      # Detailed fix
├── test-results.md  # Tests + validation
└── status.json      # Metadata

.ai-bootstrap/archive/YYYY-MM/fix-[name]/  # After completion
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
