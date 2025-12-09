# AI Instructions - Full Stack

> **CRITICAL:** Every AI assistant MUST read and follow this document before any work.

---

## 🎯 Project Overview

**Name:** {{PROJECT_NAME}}

**Description:** {{PROJECT_DESCRIPTION}}

**Purpose:** {{PROBLEM_STATEMENT}}

**Target Users:** {{TARGET_USERS}}

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

### Frontend

- **UI Framework:** {{UI_FRAMEWORK}} {{UI_FRAMEWORK_VERSION}}
- **Meta Framework:** {{META_FRAMEWORK}}
- **Build Tool:** {{BUILD_TOOL}}
- **Package Manager:** {{PACKAGE_MANAGER}}

### UI & Components

- **Component Pattern:** {{COMPONENT_PATTERN}}
- **Component Library:** {{COMPONENT_LIBRARY}}
- **Form Management:** {{FORM_LIBRARY}}
- **Icon System:** {{ICON_SYSTEM}}

### State Management

- **State Solution:** {{STATE_MANAGEMENT}}
- **Data Fetching:** {{DATA_FETCHING}}
- **Cache Strategy:** {{CACHE_STRATEGY}}

### Styling

- **Styling Approach:** {{STYLING_APPROACH}}
- **CSS Preprocessor:** {{CSS_PREPROCESSOR}}
- **Design Tokens:** {{DESIGN_TOKENS}}
- **Theme Support:** {{THEME_SUPPORT}}

### Routing

- **Router:** {{ROUTING_LIBRARY}}
- **Route Strategy:** {{ROUTE_STRATEGY}}

### Testing

- **Backend Unit Testing:** {{UNIT_TEST_FRAMEWORK}}
- **Frontend Unit Testing:** {{UNIT_TEST_FRAMEWORK}}
- **Component Testing:** {{COMPONENT_TEST_LIBRARY}}
- **E2E Testing:** {{E2E_FRAMEWORK}}
- **Coverage Target:** {{TEST_COVERAGE_TARGET}}

### Infrastructure

- **Backend Deployment:** {{DEPLOYMENT_PLATFORM}}
- **Frontend Deployment:** {{FRONTEND_DEPLOYMENT_PLATFORM}}
- **Containerization:** {{DOCKER_USAGE}}
- **CI/CD:** {{CICD_PLATFORM}}
- **CDN:** {{CDN_PROVIDER}}
- **Analytics:** {{ANALYTICS_TOOL}}

### Key Libraries

{{KEY_LIBRARIES}}

---

## 🏛️ Architecture

**Backend Pattern:** {{ARCHITECTURE_PATTERN}}

{{ARCHITECTURE_DESCRIPTION}}

**Frontend Pattern:** {{COMPONENT_PATTERN}}

{{FRONTEND_ARCHITECTURE_DESCRIPTION}}

**File Organization:** {{FILE_ORGANIZATION}}

**Folder Structure:**
```
{{FOLDER_STRUCTURE}}
```

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
- ❌ Skip input validation - Always validate user input (backend AND frontend)
- ❌ Trust user input - Sanitize and validate everything
- ❌ Use weak password hashing - Use {{PASSWORD_HASH_ALGORITHM}}
- ❌ Store sensitive data in localStorage - Use httpOnly cookies for tokens
- ❌ Expose API keys in frontend code - Use environment variables + backend proxy
- ❌ Use eval() or Function() constructor - Major security risk

### Backend Architecture

- ❌ Put business logic in controllers/routes - Keep controllers thin
- ❌ Access database directly from controllers - Use services/repositories
- ❌ Mix concerns across layers - Respect layer boundaries
- ❌ Create circular dependencies - Design proper dependency flow

### Backend Data

- ❌ Use SELECT \* in production - Specify columns explicitly
- ❌ Query databases in loops (N+1) - Use joins or batch queries
- ❌ Forget database transactions for multi-step operations
- ❌ Ignore database indexes - Index frequently queried columns

### Frontend Performance

- ❌ Import entire libraries - Use tree-shaking friendly imports
- ❌ Render large lists without virtualization - Use react-window, vue-virtual-scroller
- ❌ Forget to memoize expensive computations - Use useMemo, computed
- ❌ Load all routes upfront - Use code splitting and lazy loading
- ❌ Skip image optimization - Use next/image, nuxt/image, or optimize manually
- ❌ Ignore bundle size - Monitor and optimize regularly

### Frontend Accessibility (WCAG {{A11Y_COMPLIANCE}})

- ❌ Use divs for buttons - Use semantic HTML (`<button>`, `<a>`)
- ❌ Forget alt text on images - Every `<img>` needs descriptive alt
- ❌ Skip keyboard navigation support - All interactive elements must be keyboard accessible
- ❌ Ignore color contrast ratios - Minimum 4.5:1 for text (WCAG AA)
- ❌ Remove focus outlines without replacement - Provide visible focus indicators

### Frontend State Management

- ❌ Prop drill more than 2-3 levels - Use context, provide/inject, or state management
- ❌ Store derived data in state - Compute on the fly
- ❌ Forget to clean up subscriptions - Unsubscribe in useEffect cleanup, onUnmounted
- ❌ Use global state for everything - Keep state as local as possible

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

- ✅ Validate all inputs with {{VALIDATION_LIBRARY}} (backend AND frontend)
- ✅ Sanitize data before database queries
- ✅ Use parameterized queries (prevent SQL injection)
- ✅ Implement rate limiting on public endpoints
- ✅ Return generic error messages to users (no stack traces in prod)
- ✅ Log security events (failed logins, permission denials)
- ✅ Sanitize user input to prevent XSS (frontend)
- ✅ Use CSRF tokens for forms
- ✅ Configure Content Security Policy headers

### Backend Architecture

- ✅ Follow {{ARCHITECTURE_PATTERN}} pattern strictly
- ✅ Use dependency injection
- ✅ Keep controllers thin (delegate to services)
- ✅ Use DTOs for request/response validation
- ✅ Implement proper error handling with custom error classes

### Backend Data

- ✅ Use transactions for multi-table operations
- ✅ Implement soft deletes if configured ({{#IF_SOFT_DELETES}}enabled{{/IF_SOFT_DELETES}})
- ✅ Add created_at/updated_at timestamps
- ✅ Use database migrations (never manual schema changes)
- ✅ Add indexes for foreign keys and frequently queried fields

### Frontend Component Design

- ✅ Keep components focused on one responsibility
- ✅ Use TypeScript for type safety
- ✅ Write PropTypes or TypeScript interfaces for props
- ✅ Use semantic HTML elements
- ✅ Add ARIA attributes when needed
- ✅ Ensure keyboard navigation works

### Frontend Performance

- ✅ Implement code splitting for routes
- ✅ Optimize images (WebP format, lazy loading)
- ✅ Monitor Core Web Vitals: {{WEB_VITALS_TARGETS}}
- ✅ Use production builds for deployment
- ✅ Implement proper caching strategies
- ✅ Debounce search inputs and expensive operations

### Frontend State Management

- ✅ Keep state as close as possible to where it's used
- ✅ Use {{STATE_MANAGEMENT}} for global state
- ✅ Use {{DATA_FETCHING}} for server state
- ✅ Implement optimistic updates for better UX

### API Integration

- ✅ Version APIs ({{API_VERSIONING_STRATEGY}})
- ✅ Use proper HTTP status codes
- ✅ Return consistent error response format
- ✅ Document endpoints with {{API_DOCS_TOOL}}
- ✅ Implement pagination for list endpoints
- ✅ Handle loading, success, and error states (frontend)
- ✅ Cancel requests on component unmount

### Testing

- ✅ Write unit tests for all services (target: {{UNIT_TEST_COVERAGE}}%+ coverage)
- ✅ Write integration tests for critical flows
- ✅ Mock external dependencies (APIs, email, payments)
- ✅ Use factories/fixtures for test data
- ✅ Run tests before every commit
- ✅ Test component behavior, not implementation (frontend)
- ✅ Test accessibility (screen reader compatibility)

{{CUSTOM_ALWAYS_RULES}}

---

## 🔄 Development Workflow

### 1. Before Starting a Task

- Read relevant documentation (architecture, security, code standards)
- Understand business requirements
- Check for existing similar implementations
- Plan approach before coding
- Consider both backend and frontend implications

### 2. While Coding

- Follow TDD if possible (test-first development)
- Commit frequently with conventional commits
- Write clear, descriptive commit messages
- Keep commits focused (one logical change per commit)
- Coordinate backend and frontend changes

### 3. Before Committing

**Backend:**
- Run linter: `{{LINT_COMMAND}}`
- Run tests: `{{TEST_COMMAND}}`
- Check test coverage meets minimum ({{MIN_COVERAGE}}%)

**Frontend:**
- Run linter: `{{PACKAGE_MANAGER}} run lint`
- Run tests: `{{PACKAGE_MANAGER}} run test`
- Build succeeds: `{{PACKAGE_MANAGER}} run build`

### 4. Code Review

- Self-review before requesting review
- Address all review comments
- Update tests if logic changes
- Update documentation if behavior changes
- Verify backend and frontend integration

### 5. Deployment

- Follow deployment procedures in `docs/operations.md`
- Update CHANGELOG.md
- Test in staging before production
- Monitor logs after deployment
- Verify both backend and frontend deployments

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

**Backend:**
```bash
# Run all tests
{{TEST_ALL_COMMAND}}

# Run unit tests only
{{TEST_UNIT_COMMAND}}

# Run integration tests
{{TEST_INTEGRATION_COMMAND}}

# Run with coverage
{{TEST_COVERAGE_COMMAND}}
```

**Frontend:**
```bash
# Run all tests
{{PACKAGE_MANAGER}} run test

# Run with coverage
{{PACKAGE_MANAGER}} run test:coverage

# Run E2E tests
{{PACKAGE_MANAGER}} run test:e2e
```

---

## 🚀 Common Commands

**Backend:**
```bash
# Install dependencies
{{INSTALL_COMMAND}}

# Start development server
{{DEV_COMMAND}}

# Build for production
{{BUILD_COMMAND}}

# Run linter
{{LINT_COMMAND}}

# Run database migrations
{{MIGRATION_RUN_COMMAND}}

# Create new migration
{{MIGRATION_CREATE_COMMAND}}
```

**Frontend:**
```bash
# Install dependencies
{{PACKAGE_MANAGER}} install

# Start development server
{{PACKAGE_MANAGER}} run dev

# Build for production
{{PACKAGE_MANAGER}} run build

# Run linter
{{PACKAGE_MANAGER}} run lint

# Format code
{{PACKAGE_MANAGER}} run format
```

---

## 📚 Key Documentation Files

- `project-brief.md` - Business context and objectives
- `README.md` - Developer setup, commands, repo structure
- `docs/architecture.md` - System architecture and patterns (backend)
- `docs/data-model.md` - Database schema and relationships
- `docs/components.md` - Component architecture (frontend)
- `docs/state-management.md` - State patterns (frontend)
- `docs/code-standards.md` - Detailed coding standards
- `docs/testing.md` - Testing strategy and requirements
- `docs/operations.md` - Deployment and operational procedures
- `docs/business-flows.md` - Business processes and diagrams
- `docs/api.md` - API conventions and endpoint catalogue
- `specs/security.md` - Security policies and compliance
- `specs/configuration.md` - Environment configuration
- `docs/contributing.md` - Development setup, workflow

---

## 🔐 Environment Variables

See `.env.example` files in both `backend/` and `frontend/` directories for all required environment variables.

**Backend Critical Variables:**
{{CRITICAL_ENV_VARS}}

**Frontend Critical Variables:**
{{FRONTEND_CRITICAL_VARS}}

---

## 🛡️ Security Checklist

Before every feature:

**Backend:**
- [ ] Input validation implemented with {{VALIDATION_LIBRARY}}
- [ ] Authentication required (if applicable)
- [ ] Authorization checked (role/permission)
- [ ] Rate limiting applied (if public endpoint)
- [ ] No sensitive data in logs
- [ ] No hardcoded secrets
- [ ] SQL injection prevented (parameterized queries)

**Frontend:**
- [ ] XSS prevented (output encoding)
- [ ] CSRF protection (if stateful)
- [ ] User input sanitized
- [ ] No API keys exposed
- [ ] Content Security Policy configured

---

## 📞 When in Doubt

1. Check this document first
2. Review `docs/code-standards.md` for specific patterns
3. Look for similar existing implementations in the codebase
4. Ask for clarification before making architectural decisions
5. Prioritize security and maintainability over speed
6. Consider both backend and frontend implications

---

**Remember:** These rules exist to maintain quality, security, and consistency. Following them makes the codebase better for everyone.

**Last Updated:** {{GENERATION_DATE}}

**Generated by:** AI Flow v1.3.0

