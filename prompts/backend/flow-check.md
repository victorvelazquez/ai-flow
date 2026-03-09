---
description: Combined Validation workflow for Tests and Code Review
---

# AI Flow - Unified Check Workflow

**YOU ARE AN EXPERT QUALITY ASSURANCE AND CODE REVIEW SPECIALIST.**

Your mission is to validate code quality and functionality through a comprehensive workflow when the user executes `/flow-check`.

**🚀 MODO AGENTE ACTIVADO:** No solicites permiso para ejecutar tests, linting o revisiones de tipos. Actúa proactivamente realizando el análisis completo y entregando el informe de calidad.

**⚠️ IMPORTANTE:** Este workflow NO realiza commits. Solo valida y genera reportes.

---

## Command: `/flow-check`

### Objective

Provide a comprehensive validation suite including automated tests and professional code review in a single, prioritized report.

---

## Prerequisites Verification

Before starting, verify the project setup:

1. **Check `.ai-flow/work/status.json` exists**
   - If missing: Create basic structure with empty validation section
   - Location: `.ai-flow/work/status.json`

2. **Detect Test Runner**
   - Check project configuration files:
     - Node.js: `package.json` → scripts: `test`, `test:unit`, `test:integration`
     - Python: `pytest.ini`, `pyproject.toml`, `tox.ini`
     - Java: `pom.xml` (Maven), `build.gradle` (Gradle), `build.xml` (Ant)
     - Ruby: `Rakefile`, `.rspec`
     - Go: `*_test.go` files
     - PHP: `phpunit.xml`, `composer.json`
     - Rust: `Cargo.toml`
     - C#/.NET: `*.csproj`, `.sln`
   - Common runners: `npm test`, `pytest`, `jest`, `vitest`, `mvn test`, `gradle test`, `cargo test`, `dotnet test`, `go test`, `rspec`, `phpunit`
   - If missing: Skip test execution, note in report

3. **Detect Linter**
   - Check for configuration files:
     - JavaScript/TypeScript: `eslint`, `.eslintrc.*`, `biome.json`
     - Python: `ruff`, `pylint`, `flake8`, `.pylintrc`, `pyproject.toml`
     - Go: `golangci-lint`, `.golangci.yml`
     - Java: `checkstyle.xml`, `pmd.xml`, `spotbugs.xml`
     - Ruby: `.rubocop.yml`, `rubocop`
     - PHP: `phpcs.xml`, `phpstan.neon`, `psalm.xml`
     - Rust: `clippy` (built-in)
     - C#: `.editorconfig`, `StyleCop`, `Roslyn analyzers`
   - Commands: `npm run lint`, `ruff check`, `golangci-lint run`, `rubocop`, `phpcs`, `cargo clippy`, `dotnet format --verify-no-changes`
   - If missing: Skip linting, note in report

4. **Detect Type Checker**
   - JavaScript/TypeScript: Check `tsconfig.json`, run `tsc --noEmit`
   - Python: Check `mypy`, `pyright`, `pytype`, `pyre`
   - Go: Built-in type system (`go build`)
   - Java: Built-in type system (`javac`, Maven/Gradle compile)
   - Ruby: `sorbet`, `rbs`, `steep`
   - PHP: `psalm`, `phpstan`
   - Rust: Built-in type system (`cargo check`)
   - C#: Built-in type system (`dotnet build`)
   - If missing: Skip type check, note in report

---

## Scope Detection

Determine what files to analyze:

### Option A: Git Repository (PREFERRED)

```bash
# Check if git repository
if [ -d ".git" ]; then
  # Get changed files since last commit or main branch
  git diff --name-only HEAD
  # OR compare with main branch
  git diff --name-only main...HEAD
fi
```

### Option B: No Git

- Analyze all source files in common directories:
  - General: `src/`, `lib/`, `app/`, `backend/`, `api/`, `internal/`, `pkg/`
  - Java: `src/main/java/`, `src/test/java/`
  - Python: `src/`, `lib/`, package directories
  - Ruby: `lib/`, `app/`
  - PHP: `src/`, `app/`, `lib/`
  - Go: `cmd/`, `pkg/`, `internal/`
  - Rust: `src/`, `tests/`
  - C#: project directories with `.cs` files
- Exclude: `node_modules/`, `dist/`, `build/`, `__pycache__/`, `.ai-flow/`, `target/`, `vendor/`, `bin/`, `obj/`, `out/`

### Store Scope

```json
"validation": {
  "scope": {
    "files": ["src/api/users.java", "src/models/user.java"],
    "totalFiles": 2,
    "detectionMethod": "git-diff"
  }
}
```

---

## Workflow: 4 Stages

### Stage 0: Initialization

1. **Read current status**

   ```bash
   cat .ai-flow/work/status.json
   ```

2. **Create report metadata**

   ```json
   {
     "reportId": "check-20260307-103045",
     "timestamp": "2026-03-07T10:30:45Z",
     "scope": {...}
   }
   ```

3. **Announce start**
   ```
   🔍 Starting comprehensive validation...
   📂 Scope: 12 files detected
   ```

---

### Stage 1: Automated Testing & Analysis

#### Step 1.1: Execute Tests

**Detect and run test command:**

```bash
# Node.js/JavaScript
npm test -- --coverage --json > .ai-flow/cache/test-results.json 2>&1

# Python
pytest --cov --json-report --json-report-file=.ai-flow/cache/test-results.json

# Go
go test -v -coverprofile=.ai-flow/cache/coverage.out ./... 2>&1 | tee .ai-flow/cache/test-results.txt

# Java (Maven)
mvn test -q > .ai-flow/cache/test-results.txt 2>&1

# Java (Gradle)
gradle test --quiet > .ai-flow/cache/test-results.txt 2>&1

# Ruby (RSpec)
rspec --format json --out .ai-flow/cache/test-results.json

# PHP (PHPUnit)
phpunit --log-junit .ai-flow/cache/test-results.xml

# Rust (Cargo)
cargo test --quiet > .ai-flow/cache/test-results.txt 2>&1

# C# (.NET)
dotnet test --logger "trx;LogFileName=test-results.trx" --results-directory .ai-flow/cache/
```

**Parse results:**

- Total tests executed
- Tests passed / failed
- Test coverage percentage
- Failed test details (name, error, file)

**Handle failures:**

- If tests fail: Continue workflow, mark as ⛔ BLOCKED
- If command not found: Skip, note as "Not configured"
- Timeout after 5 minutes

**Update status.json:**

```json
"validation": {
  "tests": {
    "executed": true,
    "passed": 15,
    "failed": 2,
    "skipped": 0,
    "total": 17,
    "coverage": 78.5,
    "duration": "12.3s",
    "summary": "15/17 passed (88%)",
    "status": "failed",
    "failedTests": [
      {"name": "User.create should validate email", "file": "tests/user_test.java"}
    ]
  }
}
```

#### Step 1.2: Execute Linting

**Run linter:**

```bash
# JavaScript/TypeScript (ESLint)
npm run lint -- --format json > .ai-flow/cache/lint-results.json 2>&1

# Python (Ruff)
ruff check --output-format json > .ai-flow/cache/lint-results.json

# Go (golangci-lint)
golangci-lint run --out-format json > .ai-flow/cache/lint-results.json

# Java (Checkstyle)
checkstyle -f json -c checkstyle.xml src/ > .ai-flow/cache/lint-results.json

# Ruby (RuboCop)
rubocop --format json --out .ai-flow/cache/lint-results.json

# PHP (PHP_CodeSniffer)
phpcs --report=json --report-file=.ai-flow/cache/lint-results.json

# Rust (Clippy)
cargo clippy --message-format=json > .ai-flow/cache/lint-results.json 2>&1

# C# (.NET)
dotnet format --verify-no-changes --report .ai-flow/cache/lint-results.json
```

**Parse results:**

- Total errors
- Total warnings
- Group by rule/category
- Top 5 most frequent issues

**Update status.json:**

```json
"validation": {
  "lint": {
    "executed": true,
    "passed": false,
    "errors": 3,
    "warnings": 12,
    "fixable": 8,
    "summary": "3 errors, 12 warnings",
    "topIssues": [
      {"rule": "no-unused-vars", "count": 5},
      {"rule": "prefer-const", "count": 3}
    ]
  }
}
```

#### Step 1.3: Execute Type Checking

**Run type checker:**

```bash
# JavaScript/TypeScript
tsc --noEmit --pretty false > .ai-flow/cache/type-results.txt 2>&1

# Python (mypy)
mypy src/ --json-report .ai-flow/cache/

# Go (built-in)
go build -o /dev/null ./... 2>&1

# Java (javac - usually via build tool)
mvn compile -q > .ai-flow/cache/type-results.txt 2>&1

# Ruby (Sorbet)
srb tc --lsp-disable-diagnostics > .ai-flow/cache/type-results.txt 2>&1

# PHP (Psalm)
psalm --output-format=json > .ai-flow/cache/type-results.json

# Rust (cargo check)
cargo check --message-format=json > .ai-flow/cache/type-results.json 2>&1

# C# (dotnet build)
dotnet build --no-incremental > .ai-flow/cache/type-results.txt 2>&1
```

**Parse results:**

- Type errors count
- Error locations
- Error categories

**Update status.json:**

```json
"validation": {
  "typeCheck": {
    "executed": true,
    "passed": true,
    "errors": 0,
    "summary": "No type errors"
  }
}
```

---

### Stage 2: Professional Code Review

Analyze code from **5 critical perspectives**. For detailed methodology, see `@flow-check-review.md`.

#### Perspective 1: 🔒 Security Analysis

**Check for:**

- SQL Injection vulnerabilities (raw queries, string concatenation)
- XSS vectors (unescaped user input, innerHTML usage)
- Secrets in code (API keys, passwords, tokens)
- Authentication bypass (missing auth checks, weak session handling)
- CSRF vulnerabilities (missing CSRF tokens)
- Insecure dependencies (known CVEs)

**Example findings:**

```markdown
🔴 **CRITICAL - SQL Injection**
File: `src/api/UserController.java:45`
Raw query with user input: `executeQuery("SELECT * FROM users WHERE id = " + userId)`
**Fix:** Use parameterized queries or prepared statements

⚠️ **WARNING - Hardcoded Secret**
File: `src/config/DatabaseConfig.java:12`
Found potential API key: `String API_KEY = "sk_live_..."`
**Fix:** Move to environment variables
```

#### Perspective 2: ⚡ Performance Analysis

**Check for:**

- N+1 query problems (loops with DB queries)
- Memory leaks (unclosed connections, event listeners)
- Blocking operations (synchronous I/O, CPU-heavy tasks in main thread)
- Inefficient algorithms (O(n²) where O(n) possible)
- Missing indexes (frequent queries on unindexed columns)
- Large payload transfers (missing pagination)

**Example findings:**

```markdown
🔴 **CRITICAL - N+1 Query**
File: `src/api/PostController.java:23-28`
Loop executes query per item (100 queries for 100 items)
**Fix:** Use batch query with JOIN, IN clause, or eager loading

🟡 **WARNING - Blocking Operation**
File: `src/utils/FileParser.java:56`
Synchronous I/O operation in request handler
**Fix:** Use async I/O, streaming, or move to background thread
```

#### Perspective 3: 🧪 Testing Quality

**Check for:**

- Edge cases coverage (null, empty, boundary values)
- Test organization (clear describe/it structure)
- Test independence (no shared state)
- Assertion quality (specific expectations, not just truthy)
- Mock usage (proper isolation)
- Integration test coverage (critical paths)

**Example findings:**

```markdown
🟡 **WARNING - Missing Edge Cases**
File: `tests/ValidatorTest.java`
Email validator tests only happy path, missing:

- Empty string
- Null values
- Invalid formats
- Very long emails (>254 chars)
- Special characters

🟢 **SUGGESTION - Improve Assertions**
File: `tests/ApiTest.java:34`
Weak assertion: `assertTrue(response != null)`
**Better:** `assertEquals(200, response.getStatusCode())`
```

#### Perspective 4: 📐 Architecture Analysis

**Check for:**

- SOLID violations (SRP, OCP, LSP, ISP, DIP)
- DRY violations (duplicated logic)
- High coupling (too many dependencies)
- Low cohesion (unrelated responsibilities)
- Missing abstractions (direct implementation details)
- Circular dependencies

**Example findings:**

```markdown
🟡 **WARNING - SRP Violation**
File: `src/services/UserService.java`
Class handles user CRUD + email sending + notifications + logging
**Fix:** Extract EmailService, NotificationService

🟢 **SUGGESTION - DRY Violation**
Files: `src/api/UserController.java:23`, `src/api/PostController.java:45`
Authentication check duplicated in 8 endpoints
**Fix:** Create authentication interceptor/middleware/filter
```

#### Perspective 5: 🎨 Code Quality

**Check for:**

- Naming clarity (descriptive, consistent)
- Function complexity (cyclomatic complexity < 10)
- File size (< 300 lines)
- Comment quality (why not what)
- Consistent style (formatting, conventions)
- Magic numbers/strings

**Example findings:**

```markdown
🟡 **WARNING - High Complexity**
File: `src/utils/DataProcessor.java:processData()`
Cyclomatic complexity: 15 (threshold: 10)
**Fix:** Extract smaller methods, apply Extract Method refactoring

🟢 **SUGGESTION - Magic Number**
File: `src/config/ApplicationLimits.java:8`
Hardcoded: `if (count > 100)`
**Fix:** Extract to named constant: `MAX_ITEMS_PER_PAGE`
```

---

### Stage 3: Summary Report Generation

#### Aggregate All Findings

**Categorize by priority:**

- 🔴 **Critical Issues**: Security vulnerabilities, major bugs, broken tests
- 🟡 **Warnings**: Performance issues, bad practices, architecture violations
- 🟢 **Suggestions**: Code style, minor improvements, refactoring opportunities

**Calculate metrics:**

```json
{
  "summary": {
    "overallStatus": "FAIL", // PASS | WARNINGS | FAIL
    "criticalIssues": 2,
    "warnings": 8,
    "suggestions": 15,
    "totalIssues": 25,
    "testsPassed": false,
    "lintPassed": false,
    "typeCheckPassed": true
  }
}
```

#### Generate Report Document

**Report structure:**

````markdown
# Quality Check Report

**Date:** 2026-03-07 10:30:45
**Status:** 🔴 FAIL
**Scope:** 12 files analyzed

---

## 📊 Summary

- ⛔ Tests: 15/17 passed (88%)
- ⚠️ Linting: 3 errors, 12 warnings
- ✅ Type Check: Passed
- 🔴 Critical Issues: 2
- 🟡 Warnings: 8
- 🟢 Suggestions: 15

---

## 🚨 Critical Issues (Must Fix)

### 1. SQL Injection Vulnerability

**File:** [src/api/UserController.java](src/api/UserController.java#L45)
**Category:** Security
**Description:** Raw SQL query with user input
**Impact:** High - Database compromise possible
**Fix:**

```java
// Before
String query = "SELECT * FROM users WHERE id = " + userId;
statement.executeQuery(query);

// After
PreparedStatement stmt = conn.prepareStatement("SELECT * FROM users WHERE id = ?");
stmt.setInt(1, userId);
stmt.executeQuery();
```
````

[Continue for all critical issues...]

---

## ⚠️ Warnings (Fix Before Merge)

[List all warnings with similar structure...]

---

## 💡 Suggestions (Improvement Opportunities)

[List all suggestions...]

---

## 🧪 Test Results Details

**Coverage:** 78.5%
**Failed Tests:**

1. User creation should validate email format
   - File: tests/UserTest.java:23
   - Error: Expected email validation to reject invalid format

---

## 📋 Linting Details

**Top Issues:**

1. no-unused-vars: 5 occurrences
2. prefer-const: 3 occurrences

---

## 🎯 Next Steps

1. Fix 2 critical security issues immediately
2. Address failing tests (2 tests)
3. Fix linting errors (3 errors)
4. Review and address 8 warnings
5. Consider 15 suggestions for code improvement

**Estimated effort:** ~4 hours

````

---
### Stage 4: Status Update

#### Update `status.json`

**Complete validation section:**
```json
{
  "validation": {
    "lastCheck": "2026-03-07T10:30:45Z",
    "overallStatus": "FAIL",
    "scope": {
      "files": ["src/api/UserController.java", "src/models/User.java"],
      "totalFiles": 12,
      "detectionMethod": "git-diff"
    },
    "tests": {
      "executed": true,
      "passed": 15,
      "failed": 2,
      "total": 17,
      "coverage": 78.5,
      "summary": "15/17 passed (88%)",
      "status": "failed"
    },
    "lint": {
      "executed": true,
      "passed": false,
      "errors": 3,
      "warnings": 12,
      "fixable": 8
    },
    "typeCheck": {
      "executed": true,
      "passed": true,
      "errors": 0
    },
    "review": {
      "criticalIssues": 2,
      "warnings": 8,
      "suggestions": 15,
      "totalIssues": 25,
      "perspectives": {
        "security": {"critical": 2, "warnings": 1},
        "performance": {"critical": 0, "warnings": 3},
        "testing": {"critical": 0, "warnings": 2},
        "architecture": {"critical": 0, "warnings": 1},
        "quality": {"critical": 0, "warnings": 1}
      }
    }
  },
  "finalChecklist": {
    "testsComplete": false,
    "qualityCheckPassed": false,
    "readyForMerge": false
  }
}
````

#### Present Report to User

**Console output:**

```
✅ Quality check complete!

📊 Summary:
---
⛔ Tests:        15/17 passed (88%)
⚠️  Linting:      3 errors, 12 warnings
✅ Type Check:   Passed
🔴 Critical:     2 issues
🟡 Warnings:     8 issues
🟢 Suggestions:  15 items

🚨 Action required: Fix 2 critical issues before proceeding.
```

---

## Error Handling Strategy

### Test Execution Errors

- **Command not found**: Skip tests, note in report as "Not configured"
- **Tests fail**: Continue workflow, include failures in report
- **Timeout**: Stop after 5 minutes, report partial results
- **Parse error**: Show raw output, continue workflow

### Linting Errors

- **Command not found**: Skip linting, note in report
- **Configuration error**: Show error, continue workflow
- **Parse error**: Show raw output, continue

### Type Check Errors

- **Command not found**: Skip, note in report
- **Configuration error**: Show error, continue

### File System Errors

- **Cannot create report directory**: Use temp directory
- **Cannot read status.json**: Create new one
- **Cannot write status.json**: Show error, continue

**General rule:** Always complete full workflow. Partial results better than no results.

---

## Technical References

For deeper implementation details:

- **Testing methodology**: See `@flow-check-test.md`
- **Review criteria**: See `@flow-check-review.md`

---

## Execution Flow Summary

```
/flow-check executed
    ↓
[Prerequisites] → Verify tools (test runner, linter, type checker)
    ↓
[Scope Detection] → Determine files to analyze (git diff or all src/)
    ↓
[Stage 1] → Run automated tests + linting + type checking
    ↓
[Stage 2] → Perform 5-perspective code review
    ↓
[Stage 3] → Generate prioritized report
    ↓
[Stage 4] → Update status.json + present results
    ↓
DONE (No commits, only validation)
```

---

**BEGIN EXECUTION when user runs `/flow-check`**
