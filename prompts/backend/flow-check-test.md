---
description: Technical Reference - Testing Methodology for flow-check
---

# AI Flow - Testing Methodology

This document provides detailed technical reference for test execution and analysis within the `/flow-check` workflow.

---

## 🎯 Overview

Automated testing validates functional correctness and code coverage. This reference covers:

- Test runner detection
- Execution strategies
- Result parsing by framework
- Coverage analysis
- Error handling

---

## 1. Test Runner Detection

### Node.js / JavaScript / TypeScript

**Check `package.json` scripts:**

```json
{
  "scripts": {
    "test": "jest",
    "test:unit": "jest --testPathPattern=unit",
    "test:integration": "jest --testPathPattern=integration",
    "test:coverage": "jest --coverage"
  }
}
```

**Common runners:**

- `jest` - Most popular, React ecosystem
- `vitest` - Fast, Vite ecosystem
- `mocha` + `chai` - Classic combination
- `ava` - Minimalist, concurrent
- `tap` / `tape` - TAP protocol

**Detection priority:**

1. Check `package.json` → `devDependencies` for test framework
2. Look for config files: `jest.config.js`, `vitest.config.ts`
3. Check `test` script in `package.json`
4. Default to `npm test`

### Python

**Common runners:**

- `pytest` - Most popular, feature-rich
- `unittest` - Built-in, standard library
- `nose2` - Extends unittest

**Detection:**

```bash
# Check for pytest
if [ -f "pytest.ini" ] || [ -f "pyproject.toml" ]; then
  pytest --version &> /dev/null && echo "pytest"
fi

# Check for unittest
grep -r "import unittest" tests/ && echo "unittest"
```

**Commands:**

```bash
# pytest with coverage
pytest --cov=src --cov-report=json --json-report --json-report-file=test-results.json -v

# unittest discover
python -m unittest discover -s tests -p "test_*.py" -v
```

### Go

**Built-in test runner:**

```bash
go test -v -coverprofile=coverage.out -json ./...
```

**Detection:** Look for `*_test.go` files

### Java

**Common runners:**

- `JUnit 5` (Jupiter) - Modern standard
- `JUnit 4` - Legacy
- `TestNG` - Alternative framework

**Detection:**

```bash
# Maven
grep "junit" pom.xml && echo "JUnit via Maven"

# Gradle
grep "junit" build.gradle && echo "JUnit via Gradle"
```

**Commands:**

```bash
# Maven
mvn test -Djacoco.skip=false

# Gradle
gradle test jacocoTestReport
```

---

## 2. Execution Strategies

### Full Suite (Default)

**When to use:** Regular checks, CI/CD, pre-merge validation

```bash
# Node.js
npm test -- --coverage --json --outputFile=.ai-flow/cache/test-results.json

# Python
pytest --cov --json-report --json-report-file=.ai-flow/cache/test-results.json

# Go
go test -v -coverprofile=.ai-flow/cache/coverage.out -json ./... 2>&1 | tee .ai-flow/cache/test-results.json
```

### Targeted Tests

**When to use:** Specific file changes, faster feedback

```bash
# Jest - only changed files
npm test -- --onlyChanged --coverage

# pytest - specific module
pytest tests/test_users.py -v

# Go - specific package
go test -v ./pkg/users/...
```

### Watch Mode (Not for /flow-check)

**Note:** Avoid watch mode in validation workflows. Use one-shot execution only.

---

## 3. Result Parsing by Framework

### Jest JSON Output

**Command:**

```bash
npm test -- --json --outputFile=test-results.json --coverage --coverageReporters=json-summary
```

**Parse structure:**

```json
{
  "numTotalTests": 17,
  "numPassedTests": 15,
  "numFailedTests": 2,
  "numPendingTests": 0,
  "testResults": [
    {
      "name": "tests/user.test.ts",
      "status": "failed",
      "assertionResults": [
        {
          "fullName": "User create should validate email",
          "status": "failed",
          "failureMessages": ["Expected email validation..."]
        }
      ]
    }
  ],
  "coverageMap": {...}
}
```

**Coverage from `coverage-summary.json`:**

```json
{
  "total": {
    "lines": { "total": 250, "covered": 196, "pct": 78.4 },
    "statements": { "total": 268, "covered": 210, "pct": 78.35 },
    "functions": { "total": 45, "covered": 38, "pct": 84.44 },
    "branches": { "total": 58, "covered": 42, "pct": 72.41 }
  }
}
```

**Extract:**

- `numPassedTests`, `numFailedTests`, `numTotalTests`
- Failed test details from `testResults[].assertionResults[]`
- Coverage: `total.lines.pct` (use as main metric)

### pytest JSON Report

**Command:**

```bash
pytest --json-report --json-report-file=test-results.json --cov --cov-report=json
```

**Parse structure:**

```json
{
  "summary": {
    "total": 23,
    "passed": 20,
    "failed": 3,
    "skipped": 0
  },
  "tests": [
    {
      "nodeid": "tests/test_user.py::test_create_invalid_email",
      "outcome": "failed",
      "call": {
        "longrepr": "AssertionError: Expected validation error"
      }
    }
  ]
}
```

**Coverage from `coverage.json`:**

```json
{
  "totals": {
    "percent_covered": 82.5,
    "num_statements": 320,
    "covered_lines": 264
  }
}
```

### Go Test JSON Output

**Command:**

```bash
go test -v -json ./... > test-results.json
go test -coverprofile=coverage.out ./...
```

**Parse structure (JSONL format):**

```json
{"Time":"2026-03-07T10:30:00Z","Action":"pass","Package":"github.com/user/pkg","Test":"TestUserCreate","Elapsed":0.02}
{"Time":"2026-03-07T10:30:01Z","Action":"fail","Package":"github.com/user/pkg","Test":"TestUserValidate","Elapsed":0.01}
```

**Extract:**

- Count lines with `"Action":"pass"` and `"Action":"fail"`
- Parse coverage: `go tool cover -func=coverage.out`

---

## 4. Coverage Analysis

### Coverage Thresholds

**Recommended minimums:**

- **Statements:** 80%
- **Branches:** 75%
- **Functions:** 85%
- **Lines:** 80%

**Priority:** Line coverage is the primary metric for `/flow-check` reports.

### Uncovered Critical Areas

**Flag missing coverage in:**

- Authentication/Authorization logic
- Payment processing
- Data validation
- Error handling paths
- Security-sensitive functions

### Coverage Report Format

```markdown
## Test Coverage

**Overall:** 78.5% ⚠️ (below 80% threshold)

| Metric     | Coverage | Status |
| ---------- | -------- | ------ |
| Lines      | 78.5%    | ⚠️     |
| Statements | 78.4%    | ⚠️     |
| Branches   | 72.4%    | ⚠️     |
| Functions  | 84.4%    | ✅     |

**Uncovered Critical Files:**

- `src/auth/validator.ts` - 45% (security-sensitive)
- `src/payment/processor.ts` - 62% (payment logic)
```

---

## 5. Failed Test Analysis

### Categorize Failures

1. **Assertion Failures** - Logic bugs
2. **Timeout Failures** - Performance issues
3. **Setup/Teardown Failures** - Test infrastructure problems
4. **Flaky Tests** - Intermittent failures (run twice to confirm)

### Extract Failure Details

**Required information:**

- Test name (full describe/it path)
- File location with line number
- Failure message
- Expected vs. actual values
- Stack trace (first 5 lines)

**Format:**

````markdown
### Failed Test 1: User.create should validate email

**File:** [tests/user.test.ts](tests/user.test.ts#L23)
**Error:** AssertionError: Expected email validation to reject invalid format

```typescript
// Expected
expect(result.isValid).toBe(false);

// Received
result.isValid = true;
```
````

**Stack:**

```
at Object.<anonymous> (tests/user.test.ts:23:28)
at processTicksAndRejections (internal/process/task_queues.js:95:5)
```

````

---
## 6. Error Handling

### Command Not Found

```bash
if ! command -v npm &> /dev/null; then
  echo "⚠️ npm not found, skipping tests"
  # Update status.json
  "tests": {"executed": false, "reason": "npm not available"}
fi
````

### Test Command Fails to Execute

```bash
# Capture exit code
npm test
EXIT_CODE=$?

if [ $EXIT_CODE -eq 127 ]; then
  # Command not found
  "tests": {"executed": false, "reason": "test script not configured"}
elif [ $EXIT_CODE -ne 0 ]; then
  # Tests failed (expected)
  "tests": {"executed": true, "passed": false}
fi
```

### Parse Errors

**Fallback to text parsing:**

```bash
# If JSON parse fails, extract from text output
npm test 2>&1 | tee test-output.txt

# Grep for common patterns
PASSED=$(grep -oP '\d+(?= passing)' test-output.txt)
FAILED=$(grep -oP '\d+(?= failing)' test-output.txt)
```

### Timeout Handling

```bash
# Set 5-minute timeout
timeout 300 npm test || {
  EXIT_CODE=$?
  if [ $EXIT_CODE -eq 124 ]; then
    echo "⚠️ Tests timed out after 5 minutes"
    "tests": {"executed": true, "status": "timeout"}
  fi
}
```

---

## 7. Performance Considerations

### Test Execution Time

**Track and report:**

```json
"tests": {
  "duration": "12.3s",
  "slowTests": [
    {"name": "Integration: Payment flow", "duration": "5.2s"},
    {"name": "E2E: User signup", "duration": "3.8s"}
  ]
}
```

**Flag slow tests:** > 2 seconds per test

### Parallel Execution

**Enable when possible:**

```bash
# Jest
npm test -- --maxWorkers=4

# pytest
pytest -n 4  # requires pytest-xdist

# Go (automatic)
go test -v ./...  # runs packages in parallel
```

---

## 8. Integration with status.json

### Complete Test Section Schema

```typescript
interface TestValidation {
  executed: boolean;
  timestamp: string;
  duration: string;

  // Results
  passed: number;
  failed: number;
  skipped: number;
  total: number;
  status: 'passed' | 'failed' | 'timeout' | 'error';
  summary: string; // "15/17 passed (88%)"

  // Coverage
  coverage: number; // Line coverage percentage
  coverageDetails: {
    lines: number;
    statements: number;
    branches: number;
    functions: number;
  };

  // Failures
  failedTests: Array<{
    name: string;
    file: string;
    line?: number;
    error: string;
  }>;

  // Performance
  slowTests?: Array<{
    name: string;
    duration: string;
  }>;

  // Metadata
  runner: string; // "jest", "pytest", "go test"
  command: string; // Actual command executed
}
```

---

## Summary

This reference provides the technical foundation for test execution in `/flow-check`. The orchestrator in `flow-check.md` uses these methodologies to:

1. Detect appropriate test runner
2. Execute tests with coverage
3. Parse results by framework
4. Extract failure details
5. Update status.json
6. Include in final report

For code review methodology, see `flow-check-review.md`.
