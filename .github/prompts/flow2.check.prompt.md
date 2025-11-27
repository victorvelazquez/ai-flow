# /pre-pr-check — Final Quality Review Before Pull Request

Execute the complete pre-PR quality checklist for this project.

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

- Run the project's linting tool
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

- Check for outdated dependencies
- Run security audit
- Suggest safe updates
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

### Step 8: Summary 📊

**Final Output:**

- ✅ List all executed steps
- 📊 Summary of files modified
- 🧪 Test results and coverage stats
- 🔐 Security and dependency check results
- 💾 Commits created (one for each group of related changes)

**Optional:**
If all checks passed:
"✅ All quality checks passed! You can now create a pull request if desired."

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

**Time Estimate:** 10-20 minutes depending on project size

**BEGIN PRE-PR CHECK NOW**
