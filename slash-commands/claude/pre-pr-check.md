# /pre-pr-check — Final Quality Review Before Pull Request

Execute the complete pre-PR quality checklist for this project.

## Instructions for Claude

You are Claude Code guiding the user through a comprehensive quality review before creating a pull request.

**Objective:** Ensure code quality, documentation accuracy, security, and test coverage before merging changes.

---

## Workflow Steps

Execute each step sequentially, asking for confirmation before proceeding:

### 1. Lint & Fix

**Prompt:** "🔍 Run lint & fix to clean up code style? (y/n)"

If yes:

- Run the project's linting tool
- Auto-fix correctable issues
- Report remaining warnings/errors
- Show summary of fixes applied

---

### 2. Docs Update & Maintenance

**Prompt:** "📚 Update and review documentation? (y/n)"

If yes:

- Scan for outdated documentation references
- Update README, AGENT.md, and related docs with recent changes
- Suggest improvements for incomplete sections
- Verify links and examples are current
- Check for broken references

---

### 3. Dependency Validation

**Prompt:** "📦 Validate dependencies for updates and vulnerabilities? (y/n)"

If yes:

- Check for outdated dependencies
- Run security audit
- Suggest safe updates
- Flag breaking changes or major version updates
- Report any vulnerabilities found

---

### 4. Security Checklist

**Prompt:** "🔐 Run security checklist? (y/n)"

If yes:

- Verify no hardcoded secrets or API keys in code
- Check input validation on user-facing functions
- Review authentication/authorization implementations
- Scan for common vulnerabilities (SQL injection, XSS, etc.)
- Validate environment variable usage
- Check for sensitive data in logs

---

### 5. Run Tests

**Prompt:** "🧪 Run all tests and generate coverage report? (y/n)"

If yes:

- Execute full test suite
- Generate coverage report
- Highlight failed tests or low coverage areas
- Suggest additional test cases if needed
- Verify minimum coverage threshold is met

---

### 6. Conventional Commit

**Prompt:** "💾 Commit changes with conventional message? (y/n)"

If yes:

- Analyze changed files
- Generate conventional commit message (feat, fix, docs, chore, etc.)
- Show proposed commit message for review
- Stage and commit changes
- Display commit hash

---

### 7. Summary & Pull Request Suggestion

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
