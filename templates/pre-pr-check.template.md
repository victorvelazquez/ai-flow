
# /pre-pr-check — Final Quality Review Before Pull Request

> Use this prompt to ensure code and documentation quality before creating a pull request in **{{PROJECT_NAME}}**.

---

## Instructions for the AI Assistant

You are an AI assistant guiding the user through a comprehensive quality review before creating a pull request, regardless of the tool.

**Objective:** Ensure code quality, documentation accuracy, security, and test coverage before merging changes.

---

## Workflow Steps

Execute each step sequentially. After each step, ask the user to confirm:

- Enter **Y** (yes) to continue to the next step
- Enter **N** (not) to skip this step and continue the workflow

### Step 1: Lint & Fix 🔍

**Actions:**

- Execute linting tool (ESLint, Prettier, etc.)
- Auto-fix correctable issues
- Report remaining warnings/errors
- Show summary of fixes applied

**After completion, ask:**
- Continue to Docs Update & Maintenance? (Y/N)

---

### Step 2: Docs Update & Maintenance 📚

**Actions:**

- Scan for outdated documentation references
- Update README, AGENT.md, and related docs with recent changes
- Suggest improvements for incomplete sections
- Verify links and examples are current
- Check for broken references

**After completion, ask:**
- Continue to Dependency Validation? (Y/N)

---

### Step 3: Dependency Validation 📦

**Actions:**

- Run `npm outdated` or equivalent
- Check for security vulnerabilities (`npm audit`)
- Suggest safe updates for dependencies
- Flag breaking changes or major version updates
- Report any vulnerabilities found

**After completion, ask:**
- Continue to Security Checklist? (Y/N)

---

### Step 4: Security Checklist 🔐

**Actions:**

- Verify no hardcoded secrets or API keys in code
- Check input validation on user-facing functions
- Review authentication/authorization implementations
- Scan for common vulnerabilities (SQL injection, XSS, etc.)
- Validate environment variable usage
- Check for sensitive data in logs

**After completion, ask:**
- Continue to Run Tests? (Y/N)

---

### Step 5: Run Tests 🧪

**Actions:**

- **Unit Tests:** Execute isolated component/function tests
- **Integration Tests:** Test module interactions and API endpoints
- **E2E Tests:** Run end-to-end user flow scenarios (if applicable)
- **Security Tests:** Verify authentication, authorization, and vulnerability scans
- Generate comprehensive coverage report
- Highlight failed tests or low coverage areas
- Suggest additional test cases if needed
- Verify minimum coverage threshold is met

**Test Commands (adapt to your project):**
```bash
npm run test:unit          # Unit tests
npm run test:integration   # Integration tests
npm run test:e2e           # E2E tests
npm test                   # All tests
```

**After completion, ask:**
- Continue to Conventional Commit? (Y/N)

---

### Step 6: Conventional Commit 💾

**Actions:**

- Analyze changed files and group them by type of change:
	- `feat:` for new features
	- `fix:` for bug fixes
	- `docs:` for documentation changes
	- `chore:` for maintenance tasks
- Generate a conventional commit for each group of related changes
- Show the proposed commit messages for review
- Stage and commit each group
- Show the hashes of the created commits

**After completion, ask:**
- Continue to Push to Remote? (Y/N)

---

### Step 7: Push to Remote 🚀

Push all committed changes to the remote repository.

**Command:**
```bash
git push
```

**After completion, ask:**
- Show summary of results? (Y/N)

---

### Step 8: Summary & Pull Request Suggestion 📊

Show summary of changes and actions performed.

**Final Output:**

- ✅ List all executed steps
- 📊 Summary of files modified
- 🧪 Test results and coverage stats
- 🔐 Security and dependency check results
- 💾 Commits created (one for each group of related changes)

**Pull Request Suggestion:**
If all checks passed:
"✅ All quality checks passed! Ready to create a pull request to share improvements with the team/community."

Suggested next steps (optional):
- Review changes one final time
- Create a PR with a descriptive title and body (if your workflow requires it)
- Link related issues
- Request reviewers

---

## Critical Requirements

- ❌ Do NOT skip any requested checks
- ❌ Do NOT proceed to next step without user confirmation
- ✅ Provide clear, actionable feedback for each step
- ✅ Stop immediately if critical issues are found
- ✅ Ask for guidance if unsure about fixes

---

## Configuration

**Project:** {{PROJECT_NAME}}  
**Language:** {{LANGUAGE}}  
**Framework:** {{FRAMEWORK}}  
**Test Command:** {{TEST_COMMAND}}  
**Lint Command:** {{LINT_COMMAND}}  
**Coverage Minimum:** {{MIN_COVERAGE}}%

---

## Notes

- This prompt is designed for the final review before merging or opening a PR.
- You can customize steps or add more checks as needed for **{{PROJECT_NAME}}**.
- For multi-language projects, consider running doc review in all supported languages.
- Skip any step that's not applicable to your project.

---

**Generated by AI Bootstrap — Quality made easy**
