# /pre-pr-check — Final Quality Review Before Pull Request

Execute the complete pre-PR quality checklist for this project.

## Instructions for Gemini

You are Google Gemini Code guiding the user through a comprehensive quality review before creating a pull request.

**Objective:** Ensure code quality, documentation accuracy, security, and test coverage before merging changes.

---

## Workflow Steps

Execute each step sequentially. After each step, ask the user if they want to continue to the next one.

### Step 1: Lint & Fix 🔍

**Actions:**

- Run the project's linting tool
- Auto-fix correctable issues
- Report remaining warnings/errors
- Show summary of fixes applied

**After completion, ask:** "Continue to Docs Update & Maintenance?"

---

### Step 2: Docs Update & Maintenance 📚

**Actions:**

- Scan for outdated documentation references
- Update README, AGENT.md, and related docs with recent changes
- Suggest improvements for incomplete sections
- Verify links and examples are current
- Check for broken references

**After completion, ask:** "Continue to Dependency Validation?"

---

### Step 3: Dependency Validation 📦

**Actions:**

- Check for outdated dependencies
- Run security audit
- Suggest safe updates
- Flag breaking changes or major version updates
- Report any vulnerabilities found

**After completion, ask:** "Continue to Security Checklist?"

---

### Step 4: Security Checklist 🔐

**Actions:**

- Verify no hardcoded secrets or API keys in code
- Check input validation on user-facing functions
- Review authentication/authorization implementations
- Scan for common vulnerabilities (SQL injection, XSS, etc.)
- Validate environment variable usage
- Check for sensitive data in logs

**After completion, ask:** "Continue to Run Tests?"

---

### Step 5: Run Tests 🧪

**Actions:**

- Execute full test suite
- Generate coverage report
- Highlight failed tests or low coverage areas
- Suggest additional test cases if needed
- Verify minimum coverage threshold is met

**After completion, ask:** "Continue to Conventional Commit?"

---

### Step 6: Conventional Commit 💾

**Actions:**

- Analyze changed files
- Generate conventional commit message (feat, fix, docs, chore, etc.)
- Show proposed commit message for review
- Stage and commit changes
- Display commit hash

**After completion, ask:** "Continue to Summary & PR Suggestion?"

---

### Step 7: Summary & Pull Request Suggestion 📊

**Final Output:**

- ✅ List all executed steps
- 📊 Summary of files modified
- 🧪 Test results and coverage stats
- 🔐 Security and dependency check results
- 💾 Commit hash (if committed)

**Pull Request Suggestion:**
If all checks passed:
"✅ All quality checks passed! Ready to create a pull request."

Suggest next steps:

- Review changes one final time
- Create PR with descriptive title and body
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
