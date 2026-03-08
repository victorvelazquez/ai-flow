---
description: Technical Reference - Code Review Methodology for flow-check
---

# AI Flow - Code Review Methodology

This document provides detailed technical reference for the 5-perspective code review within `/flow-check` workflow.

---

## 🎯 Overview

Professional code review analyzes code quality from multiple perspectives. This reference covers:

- Review criteria for each perspective
- Detection patterns and examples
- Prioritization methodology
- Reporting standards

---

## Review Perspectives

### 1. 🔒 Security Analysis

**Objective:** Identify vulnerabilities that could lead to data breaches, unauthorized access, or system compromise.

#### A. SQL Injection

**Pattern to detect:**

```typescript
// ❌ CRITICAL - Direct string concatenation
const query = 'SELECT * FROM users WHERE id = ' + userId;
db.query(query);

// ❌ CRITICAL - Template literals with user input
const query = `DELETE FROM posts WHERE author = '${username}'`;

// ✅ SAFE - Parameterized queries
db.query('SELECT * FROM users WHERE id = ?', [userId]);
db.query('SELECT * FROM users WHERE id = $1', [userId]);
```

**Priority:** 🔴 CRITICAL
**Impact:** Database compromise, data theft, data loss

#### B. XSS Vulnerabilities

**Pattern to detect:**

```typescript
// ❌ CRITICAL - Direct innerHTML with user input
element.innerHTML = userComment;

// ❌ CRITICAL - React dangerouslySetInnerHTML
<div dangerouslySetInnerHTML={{__html: userContent}} />

// ✅ SAFE - Escaped content
element.textContent = userComment;
<div>{userContent}</div>  // React auto-escapes
```

**Priority:** 🔴 CRITICAL (stored XSS), 🟡 WARNING (reflected XSS)
**Impact:** Session hijacking, credential theft, malware injection

#### C. Secrets in Code

**Pattern to detect:**

```typescript
// ❌ CRITICAL - Hardcoded API keys
const API_KEY = 'your_stripe_key_here';
const DB_PASSWORD = 'supersecret123';

// ❌ CRITICAL - AWS credentials
aws.config.update({
  accessKeyId: 'AKIAIOSFODNN7EXAMPLE',
  secretAccessKey: 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY',
});

// ✅ SAFE - Environment variables
const API_KEY = process.env.API_KEY;
const DB_PASSWORD = process.env.DB_PASSWORD;
```

**Patterns to grep:**

- `api_key\s*=\s*["']\w+`
- `password\s*=\s*["']\w+`
- `secret\s*=\s*["']\w+`
- `AKIA[0-9A-Z]{16}` (AWS access key)
- `sk_live_` (Stripe key)

**Priority:** 🔴 CRITICAL
**Impact:** Unauthorized access, account takeover, financial loss

#### D. Authentication/Authorization Issues

**Pattern to detect:**

```typescript
// ❌ WARNING - Missing auth check
app.delete('/api/users/:id', (req, res) => {
  // No authentication check!
  db.users.delete(req.params.id);
});

// ❌ WARNING - Weak session config
session({
  secret: 'keyboard cat', // Weak secret
  cookie: { secure: false }, // No HTTPS requirement
});

// ✅ SAFE - Proper auth middleware
app.delete('/api/users/:id', requireAuth, requireOwnership, (req, res) => {
  db.users.delete(req.params.id);
});
```

**Priority:** 🔴 CRITICAL (no auth on sensitive ops), 🟡 WARNING (weak config)

#### E. CSRF Vulnerabilities

**Pattern to detect:**

```typescript
// ❌ WARNING - State-changing GET request
app.get('/api/users/:id/delete', (req, res) => {
  db.users.delete(req.params.id);
});

// ❌ WARNING - POST without CSRF token
app.post('/api/transfer', (req, res) => {
  // No CSRF protection
});

// ✅ SAFE - POST with CSRF middleware
app.post('/api/transfer', csrfProtection, (req, res) => {
  // Protected
});
```

**Priority:** 🟡 WARNING

---

### 2. ⚡ Performance Analysis

**Objective:** Identify code that causes slow response times, high resource usage, or scalability issues.

#### A. N+1 Query Problem

**Pattern to detect:**

```typescript
// ❌ CRITICAL - N+1 queries
const posts = await db.posts.findAll();
for (const post of posts) {
  post.author = await db.users.findById(post.authorId);  // N queries!
}

// Python example
posts = Post.objects.all()
for post in posts:
    post.author = User.objects.get(id=post.author_id)  # N queries!

// ✅ OPTIMIZED - Single query with JOIN
const posts = await db.posts.findAll({
  include: [{ model: User, as: 'author' }]
});

// Python with select_related
posts = Post.objects.select_related('author').all()
```

**Detection heuristic:**

- Loop over query results
- Database query inside loop
- Could be replaced with JOIN/IN query

**Priority:** 🔴 CRITICAL (user-facing), 🟡 WARNING (background jobs)
**Impact:** Slow response times, database overload, poor scalability

#### B. Memory Leaks

**Pattern to detect:**

```typescript
// ❌ WARNING - Event listener not removed
class Component {
  constructor() {
    eventEmitter.on('update', this.handleUpdate);
    // Missing cleanup in destructor
  }
}

// ❌ WARNING - Circular references
const cache = {};
function addToCache(key, value) {
  cache[key] = value; // Never cleared!
}

// ✅ SAFE - Proper cleanup
class Component {
  constructor() {
    this.handler = this.handleUpdate.bind(this);
    eventEmitter.on('update', this.handler);
  }

  destroy() {
    eventEmitter.off('update', this.handler);
  }
}
```

**Priority:** 🟡 WARNING
**Impact:** Increasing memory usage, eventual crashes

#### C. Blocking Operations

**Pattern to detect:**

```typescript
// ❌ WARNING - Synchronous I/O in request handler
app.get('/data', (req, res) => {
  const data = fs.readFileSync('./large-file.json'); // Blocks event loop!
  res.json(JSON.parse(data));
});

// ❌ WARNING - CPU-intensive in main thread
app.post('/analyze', (req, res) => {
  const result = complexAnalysis(req.body.data); // Blocks for seconds!
  res.json(result);
});

// ✅ OPTIMIZED - Async I/O
app.get('/data', async (req, res) => {
  const data = await fs.promises.readFile('./large-file.json');
  res.json(JSON.parse(data));
});

// ✅ OPTIMIZED - Worker thread
app.post('/analyze', async (req, res) => {
  const result = await workerPool.exec('complexAnalysis', [req.body.data]);
  res.json(result);
});
```

**Priority:** 🔴 CRITICAL (request handlers), 🟡 WARNING (background tasks)

#### D. Inefficient Algorithms

**Pattern to detect:**

```typescript
// ❌ WARNING - Nested loops (O(n²))
for (const item1 of list1) {
  for (const item2 of list2) {
    if (item1.id === item2.id) {
      matches.push(item1);
    }
  }
}

// ✅ OPTIMIZED - Hash map (O(n))
const map = new Map(list2.map((item) => [item.id, item]));
const matches = list1.filter((item) => map.has(item.id));
```

**Priority:** 🟡 WARNING (small datasets), 🔴 CRITICAL (large datasets)

---

### 3. 🧪 Testing Quality

**Objective:** Ensure tests are effective, maintainable, and provide adequate coverage.

#### A. Missing Edge Cases

**Pattern to detect:**

```typescript
// ❌ WARNING - Only happy path tested
describe('validateEmail', () => {
  it('should accept valid email', () => {
    expect(validateEmail('user@example.com')).toBe(true);
  });
  // Missing: null, undefined, empty string, invalid formats
});

// ✅ COMPLETE - Edge cases covered
describe('validateEmail', () => {
  it('should accept valid email', () => {
    expect(validateEmail('user@example.com')).toBe(true);
  });

  it('should reject null', () => {
    expect(validateEmail(null)).toBe(false);
  });

  it('should reject empty string', () => {
    expect(validateEmail('')).toBe(false);
  });

  it('should reject invalid format', () => {
    expect(validateEmail('not-an-email')).toBe(false);
  });
});
```

**Edge cases to check:**

- Null/undefined inputs
- Empty strings/arrays/objects
- Boundary values (0, -1, MAX_INT)
- Special characters
- Very long inputs

**Priority:** 🟡 WARNING (critical functions), 🟢 SUGGESTION (utils)

#### B. Weak Assertions

**Pattern to detect:**

```typescript
// ❌ WARNING - Weak assertion
expect(response).toBeTruthy(); // Too vague!
expect(user.id).toBeDefined(); // Could be null

// ✅ STRONG - Specific assertions
expect(response.status).toBe(200);
expect(response.body).toEqual({
  id: expect.any(Number),
  email: 'user@example.com',
});
expect(user.id).toBeGreaterThan(0);
```

**Priority:** 🟢 SUGGESTION

#### C. Test Independence

**Pattern to detect:**

```typescript
// ❌ WARNING - Shared mutable state
let currentUser;

describe('Users', () => {
  it('should create user', () => {
    currentUser = createUser(); // Mutates shared state!
  });

  it('should update user', () => {
    updateUser(currentUser); // Depends on previous test!
  });
});

// ✅ INDEPENDENT - Each test isolated
describe('Users', () => {
  it('should create user', () => {
    const user = createUser();
    expect(user).toBeDefined();
  });

  it('should update user', () => {
    const user = createUser(); // Fresh state
    updateUser(user);
    expect(user.updatedAt).toBeDefined();
  });
});
```

**Priority:** 🟡 WARNING

---

### 4. 📐 Architecture Analysis

**Objective:** Ensure code follows SOLID principles, has proper separation of concerns, and is maintainable.

#### A. Single Responsibility Principle (SRP)

**Pattern to detect:**

```typescript
// ❌ WARNING - Too many responsibilities
class UserService {
  createUser() {
    /* DB logic */
  }
  sendWelcomeEmail() {
    /* Email logic */
  }
  logUserActivity() {
    /* Logging logic */
  }
  validateUserData() {
    /* Validation logic */
  }
  generateReport() {
    /* Reporting logic */
  }
}

// ✅ PROPER - Single responsibility
class UserRepository {
  createUser() {
    /* DB logic only */
  }
}

class EmailService {
  sendWelcomeEmail() {
    /* Email logic only */
  }
}

class UserValidator {
  validate() {
    /* Validation logic only */
  }
}
```

**Detection heuristic:**

- Class > 300 lines
- Class has > 10 methods
- Method names suggest different domains (send*, log*, validate*, generate*)

**Priority:** 🟡 WARNING (large classes), 🟢 SUGGESTION (medium classes)

#### B. DRY Violations (Don't Repeat Yourself)

**Pattern to detect:**

```typescript
// ❌ WARNING - Duplicated code
app.get('/api/users', (req, res) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  // ... handler logic
});

app.get('/api/posts', (req, res) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  // ... handler logic
});

// ✅ DRY - Extracted middleware
const requireAuth = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
};

app.get('/api/users', requireAuth, usersHandler);
app.get('/api/posts', requireAuth, postsHandler);
```

**Detection:** Code blocks with > 5 lines duplicated in 3+ locations

**Priority:** 🟡 WARNING (3+ duplications), 🟢 SUGGESTION (2 duplications)

#### C. High Coupling

**Pattern to detect:**

```typescript
// ❌ WARNING - Tight coupling
class OrderService {
  constructor() {
    this.db = new PostgresDatabase(); // Direct dependency!
    this.emailer = new SendGridEmailer(); // Direct dependency!
    this.logger = new WinstonLogger(); // Direct dependency!
  }
}

// ✅ LOOSE COUPLING - Dependency injection
class OrderService {
  constructor(
    private db: Database, // Interface
    private emailer: EmailService, // Interface
    private logger: Logger // Interface
  ) {}
}
```

**Priority:** 🟡 WARNING

---

### 5. 🎨 Code Quality

**Objective:** Ensure code is readable, maintainable, and follows best practices.

#### A. Naming Clarity

**Pattern to detect:**

```typescript
// ❌ SUGGESTION - Unclear names
const d = new Date();
function proc(x) {
  return x * 2;
}
const arr = getData();

// ✅ CLEAR - Descriptive names
const currentDate = new Date();
function doubleValue(number) {
  return number * 2;
}
const userRecords = getUserData();
```

**Priority:** 🟢 SUGGESTION

#### B. High Complexity

**Pattern to detect:**

```typescript
// ❌ WARNING - High cyclomatic complexity (>10)
function processOrder(order) {
  if (order.type === 'premium') {
    if (order.amount > 1000) {
      if (order.user.verified) {
        if (order.paymentMethod === 'card') {
          // ... nested logic continues
        } else if (order.paymentMethod === 'paypal') {
          // ...
        }
      }
    }
  } else if (order.type === 'standard') {
    // ... more conditions
  }
}

// ✅ REFACTORED - Lower complexity
function processOrder(order) {
  const processor = OrderProcessorFactory.create(order.type);
  return processor.process(order);
}
```

**Cyclomatic complexity calculation:**

- Start at 1
- +1 for each: if, else if, for, while, case, &&, ||
- Target: < 10

**Priority:** 🟡 WARNING (>15), 🟢 SUGGESTION (10-15)

#### C. Magic Numbers/Strings

**Pattern to detect:**

```typescript
// ❌ SUGGESTION - Magic numbers
if (user.age > 18) {
  /* ... */
}
if (items.length > 100) {
  /* ... */
}
setTimeout(callback, 5000);

// ✅ NAMED CONSTANTS
const LEGAL_AGE = 18;
const MAX_ITEMS_PER_PAGE = 100;
const RETRY_DELAY_MS = 5000;

if (user.age > LEGAL_AGE) {
  /* ... */
}
if (items.length > MAX_ITEMS_PER_PAGE) {
  /* ... */
}
setTimeout(callback, RETRY_DELAY_MS);
```

**Priority:** 🟢 SUGGESTION

---

## Prioritization Methodology

### 🔴 Critical Issues (Fix Immediately)

**Criteria:**

- Security vulnerabilities (SQLi, XSS, exposed secrets)
- N+1 queries in user-facing endpoints
- Authentication bypass
- Data loss risk
- Production-breaking bugs

**Action:** Block merge/deployment until fixed

### 🟡 Warnings (Fix Before Merge)

**Criteria:**

- Performance issues (blocking ops, memory leaks)
- Architecture violations (high coupling, SRP violations)
- Missing test coverage for critical paths
- Weak security practices (no HTTPS, weak sessions)
- Code duplication (3+ instances)

**Action:** Should fix before merging to main branch

### 🟢 Suggestions (Improvement Opportunities)

**Criteria:**

- Code style improvements
- Minor refactoring opportunities
- Naming improvements
- Missing edge case tests (non-critical)
- Magic numbers

**Action:** Nice to have, can be addressed in future PR

---

## Report Format

### Issue Template

````markdown
### [Priority] [Category] - [Title]

**File:** [path/to/file.ts](path/to/file.ts#L45)
**Category:** Security | Performance | Testing | Architecture | Quality
**Impact:** [Description of impact]
**Effort:** [Estimation - Quick/Medium/Large]

**Description:**
[Detailed description of the issue]

**Current Code:**

```typescript
// Show problematic code
```
````

**Recommended Fix:**

```typescript
// Show improved code
```

**References:**

- [Link to docs/standards]

````

### Example Complete Issue

```markdown
### 🔴 CRITICAL - SQL Injection Vulnerability

**File:** [src/api/users.ts](src/api/users.ts#L45)
**Category:** Security
**Impact:** High - Database compromise, data theft possible
**Effort:** Quick (5 minutes)

**Description:**
Raw SQL query uses string concatenation with user-provided input, allowing SQL injection attacks.

**Current Code:**
```typescript
const userId = req.params.id;
const query = `SELECT * FROM users WHERE id = ${userId}`;
const result = await db.query(query);
````

**Recommended Fix:**

```typescript
const userId = req.params.id;
const query = 'SELECT * FROM users WHERE id = $1';
const result = await db.query(query, [userId]);
```

**References:**

- [OWASP SQL Injection](https://owasp.org/www-community/attacks/SQL_Injection)
- [PostgreSQL Parameterized Queries](https://node-postgres.com/features/queries)

```

---
## Integration with flow-check

This methodology is executed in **Stage 2** of the `/flow-check` workflow:

1. Orchestrator (`flow-check.md`) determines scope (files to review)
2. For each perspective (Security, Performance, etc.):
   - Apply detection patterns from this document
   - Categorize findings by priority
   - Format using issue template
3. Aggregate all issues into final report
4. Update `status.json` with review metrics

---
## Summary

This reference provides the technical foundation for code review in `/flow-check`. The orchestrator uses these criteria to:

1. Analyze code from 5 perspectives
2. Detect issues using pattern matching
3. Prioritize by severity and impact
4. Generate actionable recommendations
5. Format professional reports

For testing methodology, see `flow-check-test.md`.
```
