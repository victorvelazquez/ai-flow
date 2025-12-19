# Pre-PR Quality Checklist

Execute comprehensive quality checks before creating a pull request. Automate verification of code quality, formatting, build integrity, dependencies, and tests.

**Display Behavior:** Show step title (`## Step N/6: Name`) in your response BEFORE executing commands in that step.
---
## Workflow Overview

Execute all steps sequentially. Stop only if critical issues are found.

| Step | Action       | Commands                      | Requires Approval |
| ---- | ------------ | ----------------------------- | ----------------- |
| 1    | **Lint**     | `npm run lint`                | No                |
| 2    | **Format**   | `npm run format:check`        | No                |
| 3    | **Build**    | `npm run build`               | No                |
| 4    | **Deps**     | `npm outdated`, `npm audit`   | No                |
| 5    | **Tests**    | `npm test` + CLI validation   | No                |
| 6    | **Summary**  | Report results                | No                |
---
## 🔍 Step 1/6: Lint

```bash
npm run lint
```

**Report:**

- Error count
- Warning count
- Files with issues

**Example output:**

```
✅ 0 errors, 2 warnings
⚠️ src/cli.ts:45 - unused variable 'temp'
```
---
## 🎨 Step 2/6: Format

```bash
npm run format:check
```

**Report:**

- Files not formatted
- Total files checked
- Suggestion to run `npm run format` if issues found

**Example output:**

```
✅ All files formatted correctly
❌ 3 files not formatted:
  - src/cli.ts
  - src/fs-utils.ts
  - __tests__/cli.test.js
💡 Run: npm run format
```
---
## 🏗️ Step 3/6: Build

```bash
npm run build
```

**Report:**

- TypeScript compilation status
- Error count with file locations
- Type errors with line numbers

**Example output:**

```
✅ Build successful (0 errors)
❌ Build failed with 2 type errors:
  - src/cli.ts:125 - Type 'string' not assignable to 'number'
  - src/fs-utils.ts:45 - Property 'xyz' does not exist
```
---
## 📦 Step 4/6: Deps

```bash
npm outdated
npm audit
```

**Report:**

- Outdated packages (current vs latest)
- Breaking changes (major version bumps)
- Vulnerabilities (severity levels)
- **Version mismatches** between runtime deps and type definitions

**Critical checks:**
- If `@types/*` package is outdated by 2+ major versions → **CRITICAL** (type mismatch)
- If runtime package version doesn't match `@types/*` major version → **CRITICAL** (incompatibility)
- If ESM-only package detected in CommonJS project → **CRITICAL** (module system mismatch)

**Example output:**

```
⚠️ 2 outdated packages:
  - chalk: 5.6.2 → 5.7.0 (minor)
  - commander: 14.0.2 → 15.0.0 (major, breaking)
✅ 0 vulnerabilities

❌ CRITICAL: Type definition mismatch detected:
  - inquirer: ^13.0.1 (runtime, ESM-only)
  - @types/inquirer: 8.2.12 (types, 5 major versions behind)
  → Action: Downgrade inquirer to 8.x OR upgrade @types/inquirer to 9.x
```
---
## 🧪 Step 5/6: Tests

```bash
npm test
```

**Report:**

- Pass/fail count
- Coverage percentage
- Failed test names

**Additional validation:**

- After tests pass, validate CLI execution:
  ```bash
  node dist/cli.js --version
  ```
- If execution fails with `ERR_REQUIRE_ESM` → **CRITICAL** (module mismatch)

**Example output:**

```
✅ 12/12 tests passed
✅ Coverage: 87%
✅ All test suites passed

✅ CLI validation:
  - CLI execution: SUCCESS (v2.0.0)

❌ CRITICAL: CLI execution fails:
  Error [ERR_REQUIRE_ESM]: require() of ES Module inquirer not supported
  → Action: Check Step 4/6 for ESM/CommonJS compatibility issues
```
---
## 📊 Step 6/6: Summary

Provide comprehensive execution report:

```
## Pre-PR Check Results

✅ Lint: 0 errors, 2 warnings
✅ Format: All files formatted correctly
✅ Build: Compilation successful
⚠️ Deps: 2 outdated (1 major)
✅ Tests: 24/24 passed, 87% coverage

📊 Total time: ~3 min
```
---
## Execution Model

| Steps | Action         | User Interaction |
| ----- | -------------- | ---------------- |
| 1-5   | Run checks     | Automatic        |
| 6     | Show summary   | Automatic        |

## Error Handling

### Critical Errors (Stop Immediately)

- ❌ Lint errors (not warnings)
- ❌ Format errors (unformatted files)
- ❌ Build failures (TypeScript compilation errors)
- ❌ Test failures
- ❌ npm audit critical issues
- ❌ **Type definition mismatch** (runtime vs @types/\* version gap > 1 major)
- ❌ **ESM/CommonJS incompatibility** (ERR_REQUIRE_ESM errors)
- ❌ **CLI execution failure** (after successful build)

**Action:** Display error details with file/line numbers and stop execution.

### Non-Critical Issues (Report and Continue)

- ⚠️ Lint warnings
- ⚠️ Outdated dependencies (no breaking changes)
- ⚠️ Minor documentation updates needed
- ⚠️ Low/moderate npm audit warnings

**Action:** Report issues in summary, continue to next step.

## Constraints

**Prohibited:**

- Interactive prompts between steps 1-5
- Continuing after critical errors
- Skipping steps

**Required:**

- Sequential execution (1→6)
- Clear step titles before execution
- Actionable error messages
- Complete summary at end

**Estimated Time:** 3-5 minutes (fully automated)
---
**Reference:** Project quality standards  
**Last Updated:** 2025-12-11



