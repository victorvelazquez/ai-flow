# Pull Request Description Template

This template is used by `/flow-finish` to generate professional Pull Request descriptions.

## Variables Available

- `{{TASK_TYPE}}` - Type: feature, fix, refactor, etc.
- `{{TASK_TITLE}}` - Descriptive title from work.md objective
- `{{BRANCH_NAME}}` - Current git branch
- `{{STORY_POINTS}}` - Total story points
- `{{DURATION}}` - Time spent (Xh Ymin)
- `{{IMPACT_AREA}}` - Detected area (Backend API, Frontend, Database, etc.)
- `{{CONTEXT}}` - Problem/need description (2-3 lines)
- `{{SOLUTION}}` - Technical approach (2-3 lines)
- `{{MAIN_CHANGES}}` - List of 5-7 significant changes
- `{{TESTS_PASSED}}` - Tests passed count
- `{{TESTS_TOTAL}}` - Total tests
- `{{TESTS_NEW}}` - New tests added
- `{{COVERAGE}}` - Code coverage %
- `{{TOTAL_COMMITS}}` - Number of commits
- `{{FILES_COUNT}}` - Files changed
- `{{LINES_ADDED}}` - Lines added
- `{{LINES_DELETED}}` - Lines deleted
- `{{HAS_BREAKING_CHANGES}}` - true/false
- `{{BREAKING_CHANGES_LIST}}` - List of breaking changes (if any)
- `{{HAS_MIGRATIONS}}` - true/false
- `{{MIGRATION_FILES}}` - Number of migration files
- `{{NEW_ENV_VARS}}` - List of new environment variables
- `{{HAS_NEW_DEPS}}` - true/false
- `{{INSTALL_CMD}}` - Command to install dependencies
- `{{NEW_DEPENDENCIES}}` - List of new dependencies
- `{{COMMIT_HASHES_SUMMARY}}` - Formatted commit links
- `{{PLATFORM}}` - Git platform (GitHub, GitLab, etc.)
- `{{TEST_STEPS}}` - How to test (generated from work.md)
- `{{SECURITY_IMPACT}}` - Security implications assessment (2026 standard)
- `{{PERFORMANCE_IMPACT}}` - Performance analysis (baseline vs after)
- `{{OBSERVABILITY}}` - Logging, metrics, and monitoring changes

---

## Template Structure

```markdown
## {{TASK_TYPE^}}: {{TASK_TITLE}}

> **Branch:** `{{BRANCH_NAME}}` • **Story Points:** {{STORY_POINTS}} SP • **Duration:** {{DURATION}}

---

## 🎯 Change Type

- [{{IS_FEATURE}}] ✨ Feature (new functionality)
- [{{IS_FIX}}] 🐛 Fix (bug fix)
- [{{IS_REFACTOR}}] ♻️ Refactor (no functional change)
- [{{IS_DOCS}}] 📝 Docs (documentation only)
- [{{IS_PERF}}] ⚡ Performance (improvement)
- [{{IS_TEST}}] 🧪 Test (add/improve tests)

## 🎯 Impact Area

**{{IMPACT_AREA}}**

## 💡 Context

{{CONTEXT}}

{{RELATED_ISSUES}}

## ✅ Implemented Solution

{{SOLUTION}}

## 🔧 Main Changes

{{MAIN_CHANGES}}

## 🧪 How to Test

{{TEST_STEPS}}

{{SCREENSHOTS_SECTION}}

## 🔒 Security Impact

{{SECURITY_IMPACT}}

## ⚡ Performance Impact

{{PERFORMANCE_IMPACT}}

## 🔍 Observability

{{OBSERVABILITY}}

## 📊 Validation

| Aspect      | Result                                                        |
| ----------- | ------------------------------------------------------------- |
| 🧪 Tests    | {{TESTS_PASSED}}/{{TESTS_TOTAL}} passing (+{{TESTS_NEW}} new) |
| 📈 Coverage | {{COVERAGE}}%                                                 |
| 🔍 Lint     | ✅ No errors                                                  |
| 📝 Docs     | {{DOCS_STATUS}}                                               |

## 📈 Metrics

| Metric              | Value                                                                |
| ------------------- | -------------------------------------------------------------------- |
| 💾 Commits          | {{TOTAL_COMMITS}} ([view commits]({{COMMIT_HASHES_SUMMARY}}))        |
| 📁 Files            | {{FILES_COUNT}} modified (+{{LINES_ADDED}}/-{{LINES_DELETED}} lines) |
| ⚠️ Breaking Changes | {{BREAKING_CHANGES_STATUS}}                                          |
| ⏱️ Duration         | {{DURATION}} ({{STORY_POINTS}} SP)                                   |

{{BREAKING_CHANGES_DETAILS}}

{{DEPLOYMENT_NOTES}}

## 📦 Dependencies

{{DEPENDENCIES_SECTION}}

## 🔗 References

- **Commits:** {{COMMIT_HASHES_SUMMARY}}
- **Platform:** {{PLATFORM}}
  {{ISSUE_LINKS}}

## ✅ Reviewer Checklist

- [ ] Code follows project standards
- [ ] Logic is clear and well documented
- [ ] Tests cover critical and edge cases
- [ ] No security or performance risks
- [ ] Documentation is up to date
- [ ] No undocumented breaking changes
- [ ] PR size is appropriate (not too large)

{{NEXT_STEPS}}
```

---

## Conditional Sections

### Breaking Changes Details (only if HAS_BREAKING_CHANGES = true)

```markdown
## ⚠️ Breaking Changes

{{BREAKING_CHANGES_LIST}}

**Migration Guide:**
{{MIGRATION_GUIDE}}
```

### Deployment Notes (only if SHOW_DEPLOYMENT_NOTES = true)

```markdown
## 🚀 Deployment Notes

{{#if HAS_MIGRATIONS}}

### 🗄️ Database Migrations

**Action Required:** Execute {{MIGRATION_FILES}} migration(s) before deploying.

\`\`\`bash

# Development

npm run migrate:dev

# Production

npm run migrate:prod
\`\`\`

**Rollback plan:** Keep backup before migration, use `migrate:rollback` if issues.
{{/if}}

{{#if NEW_ENV_VARS}}

### 🔐 Environment Variables

Add these variables to your `.env` file:

\`\`\`bash
{{NEW_ENV_VARS}}
\`\`\`

**Production:** Update `.env` in hosting platform before deploy.
{{/if}}

{{#if HAS_NEW_DEPS}}

### 📦 Dependencies

New dependencies added. Install before running:

\`\`\`bash
{{INSTALL_CMD}}
\`\`\`

**New packages:**
{{NEW_DEPENDENCIES}}
{{/if}}
```

### Screenshots Section (only if UI changes detected)

```markdown
## 📸 Screenshots

{{#if HAS_UI_CHANGES}}

### Before

![Before](./docs/screenshots/before.png)

### After

![After](./docs/screenshots/after.png)

💡 **Tip:** Add screenshots showing:

- UI changes (before/after)
- New features in action
- Error states
- Mobile/responsive views (if applicable)
  {{else}}
  _No UI changes in this PR_
  {{/if}}
```

### Dependencies Section

```markdown
{{#if HAS_NEW_DEPS}}
{{NEW_DEPENDENCIES}}
{{else}}
No new dependencies added.
{{/if}}
```

### Issue Links Section

```markdown
{{#if HAS_ISSUES}}

- **Closes:** #{{ISSUE_NUMBER}}
- **Related:** {{RELATED_ISSUES}}
  {{else}}
  _No linked issues_
  {{/if}}
```

### Next Steps Section

```markdown
## 📋 Next Steps

{{#if HAS_MIGRATIONS}}

- [ ] Execute migrations in staging environment
- [ ] Verify migration rollback works
      {{/if}}
      {{#if HAS_NEW_DEPS}}
- [ ] Update production dependencies
      {{/if}}
- [ ] Monitor logs after deployment for 24h
- [ ] Update Jira ticket status to "Ready for QA"
      {{#if HAS_BREAKING_CHANGES}}
- [ ] Notify stakeholders about breaking changes
- [ ] Update API documentation
      {{/if}}
```

---

## Usage in AI Flow

This template is rendered by AI during `/flow-finish` execution with actual values extracted from:

- Work metadata (`work.md`, `status.json`)
- Git history (commits, diffs, stats)
- Test results (if `/flow-check` was executed)
- Deployment detection (migrations, env vars, dependencies)

The AI analyzes this structured context and generates professional descriptions optimized for:

- **GitHub** Pull Requests
- **GitLab** Merge Requests
- **Bitbucket** Pull Requests
- **Azure DevOps** Pull Requests
- **Jira** ticket descriptions
