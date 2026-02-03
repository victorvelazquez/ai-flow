# Code Standards

> Coding conventions, quality rules, and best practices for {{PROJECT_NAME}}
---
## 🎨 Code Style

### Formatting

**Indentation:** {{INDENTATION}}

**Quote Style:** {{QUOTE_STYLE}}

**Line Length:** {{LINE_LENGTH}} characters max

**Semicolons:** {{SEMICOLON_POLICY}}

**Trailing Commas:** {{TRAILING_COMMA_POLICY}}

### Formatter

**Tool:** {{FORMATTER}}

**Configuration:** `{{FORMATTER_CONFIG_FILE}}`

**Auto-format:** {{AUTO_FORMAT_POLICY}}

```bash
# Format code
{{FORMAT_COMMAND}}
```
---
## 📝 Naming Conventions

### Files

**Style:** {{FILE_NAMING_STYLE}}

**Examples:**
```
{{FILE_NAMING_EXAMPLES}}
```

### Classes and Interfaces

**Style:** PascalCase

**Examples:**
```{{LANGUAGE}}
class UserService {}
class OrderRepository {}
interface {{INTERFACE_EXAMPLE}} {}
```

{{#IF TYPESCRIPT}}
### Interfaces

**Convention:** {{INTERFACE_NAMING_CONVENTION}}

**Examples:**
```typescript
{{#IF I_PREFIX}}
interface IUserService {}
interface IRepository<T> {}
{{ELSE}}
interface UserService {}
interface Repository<T> {}
{{/IF}}
```
{{/IF}}

### Functions and Methods

**Style:** camelCase

**Examples:**
```{{LANGUAGE}}
function getUserById(id: string) {}
async function createOrder(data: OrderDto) {}
```

### Variables

**Style:** camelCase

**Examples:**
```{{LANGUAGE}}
const userName = 'John';
let orderTotal = 0;
const activeUsers = [];
```

### Constants

**Style:** UPPER_SNAKE_CASE

**Examples:**
```{{LANGUAGE}}
const MAX_RETRY_ATTEMPTS = 3;
const API_BASE_URL = 'https://api.example.com';
const DEFAULT_PAGE_SIZE = 20;
```

### Boolean Variables

**Convention:** Use is/has/can/should prefix

**Examples:**
```{{LANGUAGE}}
const isActive = true;
const hasPermission = false;
const canEdit = checkPermissions();
const shouldRefresh = false;
```
---
## 🏗️ Code Organization

### File Structure

**Strategy:** {{FILE_ORGANIZATION_STRATEGY}}

{{#IF FEATURE_BASED}}
### Feature-Based Example

```
src/
  users/
    user.controller.ts
    user.service.ts
    user.repository.ts
    user.dto.ts
    user.entity.ts
    user.spec.ts
    index.ts
```

**Benefits:**
- Clear feature boundaries
- Easy to locate related code
- Supports team ownership
- Facilitates modular architecture

{{/IF}}

{{#IF LAYER_BASED}}
### Layer-Based Example

```
src/
  controllers/
    user.controller.ts
    order.controller.ts
  services/
    user.service.ts
    order.service.ts
  repositories/
    user.repository.ts
    order.repository.ts
```

{{/IF}}

### Import Organization

**Order:**
{{#EACH IMPORT_ORDER}}
{{INDEX}}. {{IMPORT_GROUP_DESCRIPTION}}
{{/EACH}}

**Example:**
```{{LANGUAGE}}
{{IMPORT_ORDER_EXAMPLE}}
```

{{#IF PATH_ALIASES}}
### Path Aliases

**Enabled:** Yes

**Configuration:**
```json
{
  "paths": {
    "@/*": ["src/*"],
    "@/controllers/*": ["src/controllers/*"],
    "@/services/*": ["src/services/*"],
    "@/utils/*": ["src/utils/*"]
  }
}
```

**Usage:**
```{{LANGUAGE}}
import { UserService } from '@/services/user.service';
import { validateEmail } from '@/utils/validation';
```

{{/IF}}
---
## {{#IF TYPESCRIPT}}📘 TypeScript Rules{{ELSE}}📘 Type System{{/IF}}

{{#IF TYPESCRIPT}}
### Strict Mode

**Enabled:** {{STRICT_MODE}}

**Strict Checks:**
- `strict`: {{STRICT}}
- `noImplicitAny`: {{NO_IMPLICIT_ANY}}
- `strictNullChecks`: {{STRICT_NULL_CHECKS}}
- `strictFunctionTypes`: {{STRICT_FUNCTION_TYPES}}
- `strictPropertyInitialization`: {{STRICT_PROPERTY_INIT}}

### Type Rules

- ✅ **Always** specify return types for functions
- ✅ **Always** use interfaces for object shapes
- ✅ **Always** use proper types (never `any`)
- ❌ **Never** use `any` - use `unknown` if type is truly unknown
- ❌ **Never** disable TypeScript errors with `@ts-ignore`
- ✅ **Use** `@ts-expect-error` with comment if absolutely necessary

### Type Preferences

**Interfaces vs Types:**
{{TYPE_VS_INTERFACE_PREFERENCE}}

**Example:**
```typescript
// Interfaces for object shapes
interface User {
  id: string;
  email: string;
  name: string;
}

// Types for unions, intersections
type Status = 'pending' | 'active' | 'suspended';
type UserWithStatus = User & { status: Status };
```

### Generics

**When to use:**
- Reusable components
- Type-safe collections
- Abstract data structures

**Example:**
```typescript
class Repository<T> {
  async findById(id: string): Promise<T | null> {
    // implementation
  }

  async findAll(): Promise<T[]> {
    // implementation
  }
}
```

{{/IF}}
---
## 🚨 Error Handling

### Strategy

{{ERROR_HANDLING_STRATEGY}}

### Custom Error Classes

```{{LANGUAGE}}
{{ERROR_CLASS_EXAMPLE}}
```

### Try-Catch Pattern

```{{LANGUAGE}}
{{TRY_CATCH_EXAMPLE}}
```

### Error Response Format

```json
{{ERROR_RESPONSE_FORMAT}}
```

### Logging Errors

```{{LANGUAGE}}
{{ERROR_LOGGING_EXAMPLE}}
```
---
## 📝 Logging Standards

### Log Levels

**Hierarchy:** DEBUG < INFO < WARN < ERROR < FATAL

**Usage Guidelines:**
- **DEBUG**: Detailed information for debugging (development only)
- **INFO**: General informational messages (request start, successful operations)
- **WARN**: Warning messages (deprecated features, recoverable errors)
- **ERROR**: Error messages (failed operations, exceptions)
- **FATAL**: Critical errors (system failures, unrecoverable errors)

**Default Level:** {{LOG_LEVEL}} ({{LOG_LEVEL_ENVIRONMENT}})

### Log Format

**Format:** {{LOG_FORMAT}} ({{#IF JSON_LOGS}}Structured JSON{{ELSE}}Plain Text{{/IF}})

**Structured Logging Example:**
```json
{
  "timestamp": "2024-01-20T10:30:00Z",
  "level": "info",
  "message": "User logged in successfully",
  "context": {
    "userId": "123",
    "ip": "192.168.1.1",
    "userAgent": "Mozilla/5.0..."
  },
  "requestId": "req-abc123",
  "duration": 45
}
```

**Implementation:**
```{{LANGUAGE}}
{{LOGGING_IMPLEMENTATION_EXAMPLE}}
```

### Log Context

**Always Include:**
- Request ID (for tracing)
- User ID (if authenticated)
- Timestamp
- Log level
- Message

**Optional Context:**
- IP address
- User agent
- Request path
- Response status
- Duration
- Error stack traces

### Logging Best Practices

✅ **DO:**
- Use structured logging (JSON format)
- Include request ID for tracing
- Log at appropriate levels
- Include relevant context
- Sanitize sensitive data (passwords, tokens, PII)
- Use correlation IDs across services

❌ **DON'T:**
- Log sensitive information (passwords, API keys, tokens)
- Log excessive data (full request/response bodies)
- Use console.log in production
- Log in tight loops
- Log PII without consent

### Log Aggregation

**Tool:** {{LOG_AGGREGATION_TOOL}}

**Retention:** {{LOG_RETENTION}} days

**Search:** {{LOG_SEARCH_TOOL}}

**Example Queries:**
```bash
# Find errors in last hour
{{LOG_ERROR_QUERY}}

# Find slow requests
{{LOG_SLOW_QUERY}}

# Find by request ID
{{LOG_REQUEST_ID_QUERY}}
```
---
## 📝 Comments and Documentation

### When to Comment

✅ **DO comment:**
- Complex business logic
- Non-obvious algorithms
- Workarounds for bugs/limitations
- TODOs and FIXMEs
- Public API documentation

❌ **DON'T comment:**
- Obvious code
- What the code does (code should be self-explanatory)
- Outdated information

### Documentation Comments

**Format:** {{DOC_COMMENT_FORMAT}}

{{#IF JSDOC}}
**JSDoc Example:**
```typescript
/**
 * Calculates the total price for an order including tax and discounts
 *
 * @param items - Array of order items
 * @param taxRate - Tax rate as decimal (e.g., 0.15 for 15%)
 * @param discountCode - Optional discount code
 * @returns Total price in cents
 * @throws {InvalidDiscountError} If discount code is invalid
 *
 * @example
 * ```typescript
 * const total = calculateOrderTotal(items, 0.15, 'SAVE10');
 * ```
 */
async function calculateOrderTotal(
  items: OrderItem[],
  taxRate: number,
  discountCode?: string
): Promise<number> {
  // implementation
}
```
{{/IF}}

{{#IF PYTHON_DOCSTRING}}
**Python Docstring Example:**
```python
def calculate_order_total(
    items: List[OrderItem],
    tax_rate: float,
    discount_code: Optional[str] = None
) -> int:
    """
    Calculate the total price for an order including tax and discounts.

    Args:
        items: List of order items
        tax_rate: Tax rate as decimal (e.g., 0.15 for 15%)
        discount_code: Optional discount code

    Returns:
        Total price in cents

    Raises:
        InvalidDiscountError: If discount code is invalid

    Example:
        >>> total = calculate_order_total(items, 0.15, 'SAVE10')
        >>> print(total)
        1599
    """
    # implementation
```
{{/IF}}

### Inline Comments

```{{LANGUAGE}}
// GOOD: Explains WHY
// Using exponential backoff to avoid overwhelming the API
await retryWithBackoff(apiCall, { maxAttempts: 3 });

// BAD: Explains WHAT (obvious from code)
// Loop through users
for (const user of users) {
```

### TODO Comments

**Format:**
```{{LANGUAGE}}
// TODO(username): Description of what needs to be done
// FIXME(username): Description of bug that needs fixing
// HACK(username): Explanation of why this hack exists
```
---
## 🧪 Code Quality Metrics

### Function Complexity

**Maximum Cyclomatic Complexity:** {{MAX_COMPLEXITY}}

**Maximum Function Length:** {{MAX_FUNCTION_LENGTH}} lines

**Maximum Parameters:** {{MAX_PARAMETERS}}

**Maximum Nesting Depth:** {{MAX_NESTING_DEPTH}} levels

### Class Complexity

**Maximum Class Length:** {{MAX_CLASS_LENGTH}} lines

**Maximum Methods per Class:** {{MAX_METHODS_PER_CLASS}}

### File Size

**Maximum File Length:** {{MAX_FILE_LENGTH}} lines

**When to split:** If file exceeds limit or has multiple responsibilities
---
## ✅ Code Quality Rules

### Functions

- ✅ Functions should do ONE thing
- ✅ Use descriptive names (no abbreviations)
- ✅ Keep parameters to minimum (max {{MAX_PARAMETERS}})
- ✅ Use parameter objects for 4+ parameters
- ✅ Return early to avoid nesting
- ❌ No side effects in getters
- ❌ No Boolean parameters (use enums or separate methods)

**Example:**
```{{LANGUAGE}}
{{FUNCTION_QUALITY_EXAMPLE}}
```

### Classes

- ✅ Single Responsibility Principle
- ✅ Open/Closed Principle
- ✅ Liskov Substitution Principle
- ✅ Interface Segregation Principle
- ✅ Dependency Inversion Principle

### DRY (Don't Repeat Yourself)

- ✅ Extract repeated code into functions
- ✅ Use loops instead of copy-paste
- ✅ Create utilities for common operations
- ❌ Copy-paste is a code smell

### KISS (Keep It Simple, Stupid)

- ✅ Simplest solution that works
- ✅ Avoid premature optimization
- ✅ Readable over clever
- ❌ Don't over-engineer
---
## 🔒 Security Coding Standards

### Input Validation

```{{LANGUAGE}}
{{INPUT_VALIDATION_EXAMPLE}}
```

### SQL Injection Prevention

```{{LANGUAGE}}
{{SQL_INJECTION_PREVENTION_EXAMPLE}}
```

### XSS Prevention

```{{LANGUAGE}}
{{XSS_PREVENTION_EXAMPLE}}
```

### Secrets Management

```{{LANGUAGE}}
{{SECRETS_EXAMPLE}}
```
---
## 🧹 Code Smell Detection

### Common Code Smells

| Smell | Description | Solution |
|-------|-------------|----------|
| Long Method | Function over {{MAX_FUNCTION_LENGTH}} lines | Extract methods |
| Large Class | Class over {{MAX_CLASS_LENGTH}} lines | Split responsibilities |
| Long Parameter List | More than {{MAX_PARAMETERS}} parameters | Use parameter object |
| Duplicate Code | Same code in multiple places | Extract to function/class |
| Dead Code | Unused code | Delete it |
| Magic Numbers | Unexplained constants | Use named constants |
| Nested Conditionals | Deep if/else nesting | Use early returns, guard clauses |
---
## 📦 Dependency Management

### Rules

- ✅ Keep dependencies up to date
- ✅ Review security vulnerabilities regularly
- ✅ Use exact versions in production
- ❌ Don't add dependencies for simple utilities
- ❌ Don't use deprecated packages

### Checking for Updates

```bash
{{DEPENDENCY_CHECK_COMMAND}}
```

### Security Audit

```bash
{{SECURITY_AUDIT_COMMAND}}
```
---
## 🔧 Linting

**Tool:** {{LINTER}}

**Configuration:** `{{LINTER_CONFIG_FILE}}`

### Running Linter

```bash
# Check for issues
{{LINT_COMMAND}}

# Auto-fix issues
{{LINT_FIX_COMMAND}}
```

### Critical Rules

{{#EACH LINT_RULE}}
- **{{RULE_NAME}}**: {{RULE_DESCRIPTION}}
{{/EACH}}
---
## ✍️ Git Commit Standards

### Commit Message Format

**Standard:** {{COMMIT_STANDARD}}

{{#IF CONVENTIONAL_COMMITS}}
### Conventional Commits

**Format:**
```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding/updating tests
- `chore`: Maintenance tasks

**Example:**
```
feat(auth): add JWT refresh token rotation

- Implement token rotation on every refresh request
- Store refresh tokens in Redis with expiration
- Add cleanup job for expired tokens

Closes #123
```

{{/IF}}

### Branch Naming

**Convention:** {{BRANCH_NAMING_CONVENTION}}

**Examples:**
```
{{BRANCH_NAMING_EXAMPLES}}
```

### Commit Size

- ✅ Small, focused commits
- ✅ One logical change per commit
- ❌ Don't mix refactoring with feature changes
- ❌ Don't commit broken code
---
## 📋 Code Review Checklist

### Before Requesting Review

- [ ] Code follows all standards in this document
- [ ] Tests written and passing ({{MIN_COVERAGE}}%+ coverage)
- [ ] No linting errors
- [ ] No console.logs or debugger statements
- [ ] Documentation updated (if needed)
- [ ] Self-reviewed the changes
- [ ] Commit messages follow standard

### Reviewer Checklist

- [ ] Code is understandable
- [ ] Logic is correct
- [ ] Edge cases are handled
- [ ] Error handling is appropriate
- [ ] Tests are comprehensive
- [ ] No security vulnerabilities
- [ ] Performance is acceptable
- [ ] Follows architecture patterns
---
## 🎯 Code Examples

### Controller Example

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

### Test Example

```{{LANGUAGE}}
{{TEST_EXAMPLE}}
```
---
## 🚀 Performance Guidelines

### Database

- ✅ Use indexes on foreign keys and frequently queried columns
- ✅ Use `select` to specify columns, not `SELECT *`
- ✅ Use pagination for large result sets
- ✅ Use database transactions for multi-step operations
- ❌ Avoid N+1 queries (use joins or batch queries)
- ❌ Don't query in loops

### API

- ✅ Implement caching for expensive operations
- ✅ Use compression for large responses
- ✅ Implement rate limiting
- ✅ Use async/await for I/O operations
- ❌ Don't block the event loop (Node.js)
- ❌ Don't return excessive data

### Memory

- ✅ Clean up event listeners
- ✅ Close database connections
- ✅ Stream large files
- ❌ Don't load entire files into memory
- ❌ Don't create memory leaks
---
## 📚 Resources

### Official Docs

{{#EACH OFFICIAL_DOC}}
- [{{DOC_NAME}}]({{DOC_URL}})
{{/EACH}}

### Style Guides

{{#EACH STYLE_GUIDE}}
- [{{GUIDE_NAME}}]({{GUIDE_URL}})
{{/EACH}}
---
**Document Version:** 1.0

**Last Updated:** {{GENERATION_DATE}}

**Generated by:** AI Flow v1.0.0


