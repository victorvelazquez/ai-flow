# Contributing Guide

> How to contribute to {{PROJECT_NAME}}
---
## 🚀 Getting Started

### Prerequisites

{{#EACH PREREQUISITE}}

- {{PREREQUISITE_NAME}} {{PREREQUISITE_VERSION}}
  {{/EACH}}

### Setup

```bash
# Clone repository
git clone {{REPOSITORY_URL}}
cd {{PROJECT_DIR}}

# Install dependencies
{{INSTALL_COMMAND}}

# Copy environment variables
cp .env.example .env

# Setup database
{{DB_SETUP_COMMAND}}

# Run migrations
{{MIGRATION_COMMAND}}

# Start development server
{{DEV_COMMAND}}
```
---
## 🔄 Development Workflow

1. Create feature branch from `main`
2. Make changes
3. Write/update tests
4. Run tests and linting
5. Commit with conventional commits
6. Push and create pull request
7. Address review comments
8. Merge after approval
---
## 🌿 Branch Strategy

**Main Branches:**

- `main` - Production code
- `develop` - Development code (if using GitFlow)

**Feature Branches:**

```
{{BRANCH_NAMING_PATTERN}}
```

**Examples:**

```
feature/add-user-authentication
bugfix/fix-login-redirect
hotfix/patch-security-vulnerability
```
---
## ✅ Before Committing

```bash
# Run linter
{{LINT_COMMAND}}

# Run tests
{{TEST_COMMAND}}

# Check coverage
{{COVERAGE_COMMAND}}
```
---
## 📝 Commit Standards

**Format:** {{COMMIT_FORMAT}}

{{#IF CONVENTIONAL_COMMITS}}
**Example:**

```
feat(auth): add JWT refresh token rotation

- Implement token rotation
- Add Redis storage
- Add cleanup job

Closes #123
```

{{/IF}}
---
## 🔍 Code Review

### Review Checklist

- [ ] Code follows style guide
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] No console.logs
- [ ] No security vulnerabilities
- [ ] Performance acceptable
---
## 📚 Documentation

{{#EACH DOC_LOCATION}}

- **{{DOC_NAME}}**: `{{DOC_PATH}}`
  {{/EACH}}

### Keeping Documentation Updated

As your project evolves, keep documentation synchronized with code changes using the `/flow-docs-sync` command.

**When to update documentation:**

- After adding new API endpoints
- After modifying database entities
- After adding new dependencies
- After changing project structure
- After adding new environment variables

**How to update:**

```
/flow-docs-sync
```

The command will:

1. Detect changes in your codebase
2. Show which documents need updating
3. Ask for confirmation
4. Automatically update affected documents

**For more information:** See the AI Flow README for detailed usage instructions.
---
**Last Updated:** {{GENERATION_DATE}}



