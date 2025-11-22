# AI Instructions

> **CRITICAL:** Every AI assistant MUST read and follow this document before any work.

---

## 🎯 Project Overview

**Name:** {{PROJECT_NAME}}

**Description:** {{PROJECT_DESCRIPTION}}

**Purpose:** {{PROBLEM_STATEMENT}}

---

## 🏗️ Tech Stack

### Backend
- **Framework:** {{FRAMEWORK}} {{FRAMEWORK_VERSION}}
- **Language:** {{LANGUAGE}} {{LANGUAGE_VERSION}}
- **Runtime:** {{RUNTIME_VERSION}}
- **Type System:** {{TYPE_SYSTEM}}

### Database
- **Primary Database:** {{DATABASE}} {{DATABASE_VERSION}}
- **ORM:** {{ORM}}
- **Migrations:** {{MIGRATION_TOOL}}
{{#IF_CACHE}}- **Cache:** {{CACHE_TYPE}}{{/IF_CACHE}}

### Authentication & Security
- **Auth Method:** {{AUTH_METHOD}}
- **Password Hashing:** {{PASSWORD_HASH_ALGORITHM}}
- **Token Strategy:** {{TOKEN_STRATEGY}}

### Infrastructure
- **Deployment:** {{DEPLOYMENT_PLATFORM}}
- **Containerization:** {{DOCKER_USAGE}}
- **CI/CD:** {{CICD_PLATFORM}}

### Key Libraries
{{KEY_LIBRARIES}}

---

## 🏛️ Architecture

**Pattern:** {{ARCHITECTURE_PATTERN}}

{{ARCHITECTURE_DESCRIPTION}}

**File Organization:** {{FILE_ORGANIZATION}}

---

## ❌ NEVER Rules

**YOU MUST NEVER:**

### Code Quality
- ❌ Use `any` type ({{#IF_TYPESCRIPT}}TypeScript{{/IF_TYPESCRIPT}}) - Always use proper types
- ❌ Leave console.log in production code - Use proper logging
- ❌ Commit commented-out code - Delete it or use git history
- ❌ Hardcode configuration - Use environment variables
- ❌ Skip error handling - Always handle errors appropriately

### Security
- ❌ Store secrets in code - Use environment variables or secrets manager
- ❌ Expose sensitive data in logs - Sanitize all logs
- ❌ Skip input validation - Always validate user input
- ❌ Trust user input - Sanitize and validate everything
- ❌ Use weak password hashing - Use {{PASSWORD_HASH_ALGORITHM}}

### Architecture
- ❌ Put business logic in controllers/routes - Keep controllers thin
- ❌ Access database directly from controllers - Use services/repositories
- ❌ Mix concerns across layers - Respect layer boundaries
- ❌ Create circular dependencies - Design proper dependency flow

### Data
- ❌ Use SELECT * in production - Specify columns explicitly
- ❌ Query databases in loops (N+1) - Use joins or batch queries
- ❌ Forget database transactions for multi-step operations
- ❌ Ignore database indexes - Index frequently queried columns

### Testing
- ❌ Skip tests for new features - Write tests first or alongside code
- ❌ Mock internal business logic - Only mock external dependencies
- ❌ Commit failing tests - All tests must pass before commit

{{CUSTOM_NEVER_RULES}}

---

## ✅ ALWAYS Rules

**YOU MUST ALWAYS:**

### Code Quality
- ✅ Use TypeScript strict mode ({{#IF_TYPESCRIPT}}enabled{{/IF_TYPESCRIPT}})
- ✅ Follow naming conventions from `docs/code-standards.md`
- ✅ Write self-documenting code with clear names
- ✅ Add comments for complex business logic only
- ✅ Keep functions under {{MAX_FUNCTION_LENGTH}} lines
- ✅ Limit cyclomatic complexity to {{MAX_COMPLEXITY}}

### Security
- ✅ Validate all inputs with {{VALIDATION_LIBRARY}}
- ✅ Sanitize data before database queries
- ✅ Use parameterized queries (prevent SQL injection)
- ✅ Implement rate limiting on public endpoints
- ✅ Return generic error messages to users (no stack traces in prod)
- ✅ Log security events (failed logins, permission denials)

### Architecture
- ✅ Follow {{ARCHITECTURE_PATTERN}} pattern strictly
- ✅ Use dependency injection
- ✅ Keep controllers thin (delegate to services)
- ✅ Use DTOs for request/response validation
- ✅ Implement proper error handling with custom error classes

### Data
- ✅ Use transactions for multi-table operations
- ✅ Implement soft deletes if configured ({{#IF_SOFT_DELETES}}enabled{{/IF_SOFT_DELETES}})
- ✅ Add created_at/updated_at timestamps
- ✅ Use database migrations (never manual schema changes)
- ✅ Add indexes for foreign keys and frequently queried fields

### Testing
- ✅ Write unit tests for all services (target: {{UNIT_TEST_COVERAGE}}%+ coverage)
- ✅ Write integration tests for critical flows
- ✅ Mock external dependencies (APIs, email, payments)
- ✅ Use factories/fixtures for test data
- ✅ Run tests before every commit

### API
- ✅ Version APIs ({{API_VERSIONING_STRATEGY}})
- ✅ Use proper HTTP status codes
- ✅ Return consistent error response format
- ✅ Document endpoints with {{API_DOCS_TOOL}}
- ✅ Implement pagination for list endpoints

{{CUSTOM_ALWAYS_RULES}}

---

## 🔄 Development Workflow

### 1. Before Starting a Task
- Read relevant documentation (architecture, security, code standards)
- Understand business requirements
- Check for existing similar implementations
- Plan approach before coding

### 2. While Coding
- Follow TDD if possible (test-first development)
- Commit frequently with conventional commits
- Write clear, descriptive commit messages
- Keep commits focused (one logical change per commit)

### 3. Before Committing
- Run linter: `{{LINT_COMMAND}}`
- Run tests: `{{TEST_COMMAND}}`
- Check test coverage meets minimum ({{MIN_COVERAGE}}%)
- Review your own code changes

### 4. Code Review
- Self-review before requesting review
- Address all review comments
- Update tests if logic changes
- Update documentation if behavior changes

### 5. Deployment
- Follow deployment procedures in `docs/operations.md`
- Update CHANGELOG.md
- Test in staging before production
- Monitor logs after deployment

---

## 🎯 Priorities

When there are trade-offs, prioritize in this order:

1. **{{PRIORITY_1}}** - {{PRIORITY_1_DESCRIPTION}}
2. **{{PRIORITY_2}}** - {{PRIORITY_2_DESCRIPTION}}
3. **{{PRIORITY_3}}** - {{PRIORITY_3_DESCRIPTION}}
4. **{{PRIORITY_4}}** - {{PRIORITY_4_DESCRIPTION}}
5. **{{PRIORITY_5}}** - {{PRIORITY_5_DESCRIPTION}}

---

## 📁 Project Structure

```
{{PROJECT_STRUCTURE}}
```

---

## 🧪 Testing Commands

```bash
# Run all tests
{{TEST_ALL_COMMAND}}

# Run unit tests only
{{TEST_UNIT_COMMAND}}

# Run integration tests
{{TEST_INTEGRATION_COMMAND}}

# Run with coverage
{{TEST_COVERAGE_COMMAND}}

# Run specific test file
{{TEST_SPECIFIC_COMMAND}}
```

---

## 🚀 Common Commands

```bash
# Install dependencies
{{INSTALL_COMMAND}}

# Start development server
{{DEV_COMMAND}}

# Build for production
{{BUILD_COMMAND}}

# Run linter
{{LINT_COMMAND}}

# Format code
{{FORMAT_COMMAND}}

# Run database migrations
{{MIGRATION_RUN_COMMAND}}

# Create new migration
{{MIGRATION_CREATE_COMMAND}}
```

---

## 📚 Key Documentation Files

- `project-brief.md` - Business context and objectives
- `docs/architecture.md` - System architecture and patterns
- `docs/data-architecture.md` - Database schema and relationships
- `docs/code-standards.md` - Detailed coding standards
- `docs/testing.md` - Testing strategy and requirements
- `docs/operations.md` - Deployment and operational procedures
- `specs/security.md` - Security policies and compliance
- `specs/configuration.md` - Environment configuration

---

## 🔐 Environment Variables

See `.env.example` for all required environment variables.

**Critical variables:**
{{CRITICAL_ENV_VARS}}

---

## 🛡️ Security Checklist

Before every feature:
- [ ] Input validation implemented with {{VALIDATION_LIBRARY}}
- [ ] Authentication required (if applicable)
- [ ] Authorization checked (role/permission)
- [ ] Rate limiting applied (if public endpoint)
- [ ] No sensitive data in logs
- [ ] No hardcoded secrets
- [ ] SQL injection prevented (parameterized queries)
- [ ] XSS prevented (output encoding)
- [ ] CSRF protection (if stateful)

---

## 🎨 Code Style Examples

### Controller Example ({{FRAMEWORK}})
```{{LANGUAGE}}
{{CONTROLLER_EXAMPLE}}
```

### Service Example
```{{LANGUAGE}}
{{SERVICE_EXAMPLE}}
```

### Repository Example
```{{LANGUAGE}}
{{REPOSITORY_EXAMPLE}}
```

### DTO Example
```{{LANGUAGE}}
{{DTO_EXAMPLE}}
```

---

## 📞 When in Doubt

1. Check this document first
2. Review `docs/code-standards.md` for specific patterns
3. Look for similar existing implementations in the codebase
4. Ask for clarification before making architectural decisions
5. Prioritize security and maintainability over speed

---

**Remember:** These rules exist to maintain quality, security, and consistency. Following them makes the codebase better for everyone.

**Last Updated:** {{GENERATION_DATE}}

**Generated by:** AI Bootstrap v1.0.0
