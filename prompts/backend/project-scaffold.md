# AI Bootstrap - Project Scaffold

**YOU ARE AN EXPERT DEVOPS ENGINEER AND PROJECT SETUP SPECIALIST.**

Your mission is to create the initial project structure based on the generated documentation when the user executes `/project-scaffold`.

---

## Command: `/project-scaffold`

### Objective

Generate the complete initial project structure (code skeleton, dependencies, config files, CI/CD) based on the tech stack and architecture defined in the documentation.

### Prerequisites

Before executing this command, ensure:

- ✅ `/bootstrap` completed (documentation generated)
- ✅ `ai-instructions.md` exists with tech stack defined
- ✅ `docs/architecture.md` exists with architecture pattern
- ✅ `docs/code-standards.md` exists with naming conventions

### Duration

⏱️ **Estimated Time:** 90-120 minutes

---

## Workflow: 6 Phases

### Phase 1: Context Analysis (5 minutes - automatic)

**Read existing documentation to understand project setup:**

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 Analyzing Project Documentation
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Reading files:
✅ ai-instructions.md
✅ docs/architecture.md
✅ docs/code-standards.md
✅ docs/data-model.md
✅ docs/testing.md
✅ docs/operations.md

Detected configuration:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📦 Language: {{LANGUAGE}} {{VERSION}}
🚀 Framework: {{FRAMEWORK}} {{FRAMEWORK_VERSION}}
🗄️  Database: {{DATABASE}}
🔐 ORM: {{ORM}}
🏗️  Architecture: {{ARCHITECTURE_PATTERN}}
🧪 Test Framework: {{TEST_FRAMEWORK}}
🎨 Linter: {{LINTER}}
📐 Formatter: {{FORMATTER}}
🐳 Container: {{CONTAINER_TOOL}}
⚙️  CI/CD: {{CI_CD_PLATFORM}}

Project type: {{PROJECT_TYPE}}
API Style: {{API_STYLE}}

Continue with scaffold? (Y/n)
```

**Extract key information:**

- Programming language and version
- Framework and version
- Database type and ORM
- Architecture pattern (Clean, Hexagonal, Layered, MVC)
- Testing strategy
- Code standards (naming, file organization)
- Deployment platform

**Validation:**

If any critical information is missing:

```
⚠️  Missing Critical Information

The following required information is missing:
- [X] Framework not specified in ai-instructions.md
- [X] Architecture pattern not defined in docs/architecture.md

Please complete the documentation first with /bootstrap
or specify these manually now:

Framework: __
Architecture: __
```

---

### Phase 2: Project Initialization (10-15 minutes)

**Execute framework-specific initialization command:**

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🏗️  Phase 2/6: Project Initialization
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⏱️  Est. Time: 10-15 minutes
```

**Framework Detection Logic:**

Based on `ai-instructions.md`, execute the appropriate CLI command:

**Node.js / TypeScript:**

```bash
# NestJS - Initialize in current directory
npx @nestjs/cli new . --package-manager npm --skip-git

# Express + TypeScript - Initialize in current directory
npm init -y
npm install express typescript @types/express @types/node ts-node
npx tsc --init

# Fastify + TypeScript - Initialize in current directory
npm init -y
npm install fastify
npm install -D typescript @types/node tsx

# Koa + TypeScript - Initialize in current directory
npm init -y
npm install koa koa-router
npm install -D typescript @types/koa @types/koa-router
```

**Python:**

```bash
# Django - Initialize in current directory
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install django djangorestframework
django-admin startproject config .

# FastAPI - Initialize in current directory
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install fastapi uvicorn sqlalchemy pydantic

# Flask - Initialize in current directory
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install flask flask-restful flask-sqlalchemy
```

**Go:**

```bash
# Go + Gin - Initialize in current directory
go mod init {{PROJECT_NAME}}
go get -u github.com/gin-gonic/gin
go get -u gorm.io/gorm
go get -u gorm.io/driver/postgres

# Go + Echo - Initialize in current directory
go mod init {{PROJECT_NAME}}
go get github.com/labstack/echo/v4
```

**Java / Kotlin:**

```bash
# Spring Boot (Maven) - Initialize in current directory
curl https://start.spring.io/starter.zip \
  -d type=maven-project \
  -d language=java \
  -d bootVersion=3.2.0 \
  -d groupId=com.{{COMPANY}} \
  -d artifactId={{PROJECT_NAME}} \
  -d dependencies=web,data-jpa,postgresql \
  -o project.zip
unzip -o project.zip && rm project.zip

# Spring Boot (Kotlin) - Initialize in current directory
curl https://start.spring.io/starter.zip \
  -d type=gradle-project-kotlin \
  -d language=kotlin \
  -d bootVersion=3.2.0 \
  -d groupId=com.{{COMPANY}} \
  -d artifactId={{PROJECT_NAME}} \
  -d dependencies=web,data-jpa,postgresql \
  -o project.zip
unzip -o project.zip && rm project.zip
```

**C# / .NET:**

```bash
# ASP.NET Core Web API - Initialize in current directory
dotnet new webapi -o .
dotnet add package Microsoft.EntityFrameworkCore.Design
dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL
```

**Ruby:**

```bash
# Rails API - Initialize in current directory
rails new . --api --database=postgresql --skip-git
bundle install
```

**PHP:**

```bash
# Laravel - Initialize in current directory
composer create-project laravel/laravel .

# Symfony - Initialize in current directory
composer create-project symfony/skeleton .
composer require symfony/orm-pack
```

**After initialization:**

```
✅ Framework initialized: {{FRAMEWORK}}
✅ Dependencies installed
✅ Base project structure created

📂 Generated structure:
{{LIST_GENERATED_FILES}}

Next: Clean Architecture setup...
```

---

### Phase 3: Clean Architecture Structure (20-30 minutes)

**Transform the framework's default structure to match the architecture pattern defined in `docs/architecture.md`:**

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🏛️  Phase 3/6: Architecture Setup
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⏱️  Est. Time: 20-30 minutes

Target Architecture: {{ARCHITECTURE_PATTERN}}
File Organization: {{FILE_ORGANIZATION}} (from code-standards.md)
```

**Architecture Pattern: Clean Architecture / Hexagonal**

Create folder structure following the pattern from `docs/architecture.md`:

**Node.js / TypeScript Example (NestJS):**

```
src/
├── core/                          # Domain layer (business rules)
│   ├── entities/                  # Domain entities
│   │   ├── User.entity.ts
│   │   └── index.ts
│   ├── interfaces/                # Port definitions
│   │   ├── repositories/
│   │   │   ├── IUserRepository.ts
│   │   │   └── index.ts
│   │   ├── services/
│   │   │   ├── IAuthService.ts
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── use-cases/                 # Application business logic
│   │   ├── auth/
│   │   │   ├── LoginUseCase.ts
│   │   │   ├── RegisterUseCase.ts
│   │   │   └── index.ts
│   │   └── index.ts
│   └── exceptions/                # Domain exceptions
│       ├── DomainException.ts
│       └── index.ts
│
├── infrastructure/                # Adapters (external concerns)
│   ├── database/
│   │   ├── prisma/               # or typeorm, mongoose, etc.
│   │   │   ├── schema.prisma
│   │   │   └── migrations/
│   │   ├── repositories/         # Repository implementations
│   │   │   ├── PrismaUserRepository.ts
│   │   │   └── index.ts
│   │   └── database.module.ts
│   ├── http/                     # HTTP adapters
│   │   ├── controllers/
│   │   │   ├── AuthController.ts
│   │   │   └── index.ts
│   │   ├── dto/                  # Data transfer objects
│   │   │   ├── LoginDto.ts
│   │   │   └── index.ts
│   │   ├── middleware/
│   │   │   ├── AuthMiddleware.ts
│   │   │   └── index.ts
│   │   └── http.module.ts
│   ├── config/                   # Configuration
│   │   ├── env.config.ts
│   │   └── database.config.ts
│   └── external/                 # External services adapters
│       ├── EmailService.ts
│       └── index.ts
│
├── application/                   # Application services
│   ├── services/
│   │   ├── AuthService.ts
│   │   └── index.ts
│   └── application.module.ts
│
├── shared/                        # Shared utilities
│   ├── utils/
│   │   ├── logger.ts
│   │   └── validation.ts
│   ├── constants/
│   │   └── error-codes.ts
│   └── types/
│       └── index.ts
│
├── app.module.ts                  # Root module
└── main.ts                        # Entry point
```

**Python Example (FastAPI):**

```
app/
├── domain/                        # Core domain
│   ├── entities/
│   │   ├── user.py
│   │   └── __init__.py
│   ├── repositories/              # Interfaces
│   │   ├── user_repository.py
│   │   └── __init__.py
│   ├── services/                  # Interfaces
│   │   ├── auth_service.py
│   │   └── __init__.py
│   └── exceptions/
│       ├── domain_exception.py
│       └── __init__.py
│
├── application/                   # Use cases
│   ├── use_cases/
│   │   ├── auth/
│   │   │   ├── login_use_case.py
│   │   │   └── __init__.py
│   │   └── __init__.py
│   └── __init__.py
│
├── infrastructure/                # Adapters
│   ├── database/
│   │   ├── models/               # SQLAlchemy models
│   │   │   ├── user_model.py
│   │   │   └── __init__.py
│   │   ├── repositories/         # Implementations
│   │   │   ├── sqlalchemy_user_repository.py
│   │   │   └── __init__.py
│   │   └── database.py
│   ├── api/
│   │   ├── routes/
│   │   │   ├── auth_routes.py
│   │   │   └── __init__.py
│   │   ├── dependencies.py
│   │   └── __init__.py
│   ├── config/
│   │   └── settings.py
│   └── __init__.py
│
├── main.py                        # Entry point
└── __init__.py
```

**For each file created, add:**

1. **Copyright header** (if specified in code-standards.md)
2. **Imports organized** according to standards
3. **Basic skeleton** with TODO comments
4. **Type hints/annotations** (TypeScript types, Python type hints, etc.)
5. **Documentation comments** (JSDoc, docstrings, etc.)

**Example generated file (`src/core/entities/User.entity.ts`):**

```typescript
/**
 * User Entity - Domain Model
 *
 * Represents a user in the system with core business rules.
 * Following Clean Architecture principles, this entity is independent
 * of frameworks and external concerns.
 *
 * @see docs/data-model.md for complete entity documentation
 */

export class User {
  constructor(
    public readonly id: string,
    public email: string,
    public username: string,
    private passwordHash: string,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}

  /**
   * TODO: Implement user validation logic
   * - Email format validation
   * - Username constraints
   * - Password strength requirements
   */
  validate(): void {
    // TODO: Add validation logic
    throw new Error('Not implemented');
  }

  /**
   * TODO: Implement password verification
   * Compare provided password with stored hash
   */
  verifyPassword(password: string): boolean {
    // TODO: Add password verification
    throw new Error('Not implemented');
  }

  /**
   * TODO: Implement password update
   * Hash new password and update
   */
  updatePassword(newPassword: string): void {
    // TODO: Add password update logic
    throw new Error('Not implemented');
  }
}
```

**Progress indicator:**

```
Creating architecture structure...

✅ Core layer (12 files)
   ✅ entities/ (3 entities from data-model.md)
   ✅ interfaces/ (8 interfaces)
   ✅ use-cases/ (5 use cases)
   ✅ exceptions/ (1 base exception)

✅ Infrastructure layer (18 files)
   ✅ database/ (schema + 3 repositories)
   ✅ http/ (4 controllers, 6 DTOs, 2 middleware)
   ✅ config/ (3 config files)
   ✅ external/ (2 service adapters)

✅ Application layer (4 files)
   ✅ services/ (3 application services)

✅ Shared utilities (5 files)

Total: 39 files created
```

---

### Phase 4: Testing Infrastructure (15-20 minutes)

**Setup testing framework according to `docs/testing.md`:**

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🧪 Phase 4/6: Testing Setup
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⏱️  Est. Time: 15-20 minutes

Test Strategy: {{TEST_STRATEGY}} (from testing.md)
Coverage Target: {{COVERAGE_TARGET}}%
```

**Install testing dependencies:**

**Node.js / TypeScript:**

```bash
# Jest + Supertest (for NestJS, Express)
npm install -D jest @types/jest ts-jest supertest @types/supertest

# Configure Jest
npx ts-jest config:init
```

**Python:**

```bash
# pytest + httpx (for FastAPI)
pip install pytest pytest-asyncio httpx pytest-cov

# Django
pip install pytest pytest-django factory-boy
```

**Go:**

```bash
# Native testing + testify
go get github.com/stretchr/testify
```

**Create test structure matching source structure:**

```
tests/                              # or __tests__/ for JS
├── unit/                          # Unit tests
│   ├── core/
│   │   ├── entities/
│   │   │   ├── User.entity.test.ts
│   │   │   └── index.ts
│   │   └── use-cases/
│   │       └── auth/
│   │           ├── LoginUseCase.test.ts
│   │           └── RegisterUseCase.test.ts
│   ├── application/
│   │   └── services/
│   │       └── AuthService.test.ts
│   └── infrastructure/
│       └── repositories/
│           └── UserRepository.test.ts
│
├── integration/                   # Integration tests
│   ├── api/
│   │   ├── auth.integration.test.ts
│   │   └── users.integration.test.ts
│   └── database/
│       └── repositories.integration.test.ts
│
├── e2e/                           # End-to-end tests
│   ├── auth-flow.e2e.test.ts
│   └── user-crud.e2e.test.ts
│
├── fixtures/                      # Test data
│   ├── users.fixture.ts
│   └── index.ts
│
├── mocks/                         # Mock implementations
│   ├── MockUserRepository.ts
│   └── index.ts
│
└── setup.ts                       # Test setup/teardown
```

**Create example test files with TODO markers:**

**Example (`tests/unit/core/entities/User.entity.test.ts`):**

```typescript
import { User } from '@/core/entities/User.entity';

describe('User Entity', () => {
  describe('validate', () => {
    it('should validate correct user data', () => {
      // TODO: Implement test
      // Arrange
      const user = new User(
        '123',
        'test@example.com',
        'testuser',
        'hashedpassword',
        new Date(),
        new Date(),
      );

      // Act & Assert
      expect(() => user.validate()).not.toThrow();
    });

    it('should throw error for invalid email', () => {
      // TODO: Implement test
    });

    it('should throw error for short username', () => {
      // TODO: Implement test
    });
  });

  describe('verifyPassword', () => {
    it('should return true for correct password', () => {
      // TODO: Implement test
    });

    it('should return false for incorrect password', () => {
      // TODO: Implement test
    });
  });
});
```

**Create test configuration:**

**Jest config (`jest.config.js`):**

```javascript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/tests'],
  testMatch: ['**/*.test.ts'],
  collectCoverageFrom: ['src/**/*.ts', '!src/**/*.d.ts', '!src/main.ts'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};
```

**Progress:**

```
✅ Testing framework installed: Jest
✅ Test structure created (18 test files with TODOs)
✅ Mock implementations (3 mocks)
✅ Test fixtures (2 fixtures)
✅ Configuration files created
✅ Coverage threshold: 80% (from testing.md)
```

---

### Phase 5: Code Quality Tools (10-15 minutes)

**Setup linters, formatters, and pre-commit hooks according to `docs/code-standards.md`:**

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎨 Phase 5/6: Code Quality Setup
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⏱️  Est. Time: 10-15 minutes
```

**Node.js / TypeScript:**

```bash
# ESLint + Prettier
npm install -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
npm install -D prettier eslint-config-prettier eslint-plugin-prettier

# Husky + lint-staged (pre-commit hooks)
npm install -D husky lint-staged
npx husky init
```

**Python:**

```bash
# Ruff (fast linter + formatter)
pip install ruff

# Or traditional: black + flake8 + isort
pip install black flake8 isort mypy

# pre-commit hooks
pip install pre-commit
```

**Create configuration files:**

**ESLint (`.eslintrc.js`):**

```javascript
module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    'prettier/prettier': 'error',
  },
};
```

**Prettier (`.prettierrc`):**

```json
{
  "semi": true,
  "trailingComma": "all",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2
}
```

**Husky pre-commit hook (`.husky/pre-commit`):**

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npm run lint
npm run format:check
npm run type-check
npm run test:unit
```

**Update `package.json` scripts:**

```json
{
  "scripts": {
    "build": "tsc",
    "start": "node dist/main.js",
    "start:dev": "ts-node src/main.ts",
    "lint": "eslint '{src,tests}/**/*.ts' --fix",
    "format": "prettier --write '{src,tests}/**/*.ts'",
    "format:check": "prettier --check '{src,tests}/**/*.ts'",
    "type-check": "tsc --noEmit",
    "test": "jest",
    "test:unit": "jest --testPathPattern=tests/unit",
    "test:integration": "jest --testPathPattern=tests/integration",
    "test:e2e": "jest --testPathPattern=tests/e2e",
    "test:cov": "jest --coverage",
    "test:watch": "jest --watch",
    "prepare": "husky install"
  }
}
```

**Python equivalent (`pyproject.toml` for Ruff):**

```toml
[tool.ruff]
line-length = 100
target-version = "py311"

[tool.ruff.lint]
select = ["E", "F", "I", "N", "W", "B", "C4", "UP"]
ignore = ["E501"]

[tool.mypy]
python_version = "3.11"
strict = true
```

**Progress:**

```
✅ Linter configured: ESLint (TypeScript)
✅ Formatter configured: Prettier
✅ Pre-commit hooks installed: Husky
✅ Type checking enabled: TypeScript strict mode
✅ Scripts added to package.json (12 scripts)

Pre-commit checks will run:
  • Linting (ESLint)
  • Formatting validation (Prettier)
  • Type checking (tsc)
  • Unit tests (Jest)
```

---

### Phase 6: DevOps Infrastructure (20-30 minutes)

**Setup Docker, CI/CD, and deployment configuration according to `docs/operations.md`:**

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🐳 Phase 6/6: DevOps Setup
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⏱️  Est. Time: 20-30 minutes

Deployment Platform: {{DEPLOYMENT_PLATFORM}}
Container: {{CONTAINER_TOOL}}
CI/CD: {{CI_CD_PLATFORM}}
```

#### 6.1: Docker Setup

**Create Dockerfile (multi-stage for production):**

**Node.js / TypeScript:**

```dockerfile
# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY tsconfig.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY src ./src

# Build application
RUN npm run build

# Stage 2: Production
FROM node:20-alpine AS production

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production dependencies only
RUN npm ci --only=production

# Copy built files from builder
COPY --from=builder /app/dist ./dist

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

USER nodejs

EXPOSE 3000

CMD ["node", "dist/main.js"]
```

**Python / FastAPI:**

```dockerfile
# Stage 1: Build
FROM python:3.11-slim AS builder

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir --user -r requirements.txt

# Stage 2: Production
FROM python:3.11-slim

WORKDIR /app

# Copy dependencies from builder
COPY --from=builder /root/.local /root/.local

# Copy application
COPY app ./app

# Create non-root user
RUN useradd -m -u 1001 appuser && chown -R appuser:appuser /app
USER appuser

# Update PATH
ENV PATH=/root/.local/bin:$PATH

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

**Create docker-compose.yml for local development:**

```yaml
version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
      target: builder
    container_name: {{PROJECT_NAME}}-app
    ports:
      - "3000:3000"
    environment:
      NODE_ENV: development
      DATABASE_URL: postgresql://user:password@postgres:5432/{{PROJECT_NAME}}
      REDIS_URL: redis://redis:6379
    volumes:
      - ./src:/app/src
    depends_on:
      - postgres
      - redis
    command: npm run start:dev

  postgres:
    image: postgres:16-alpine
    container_name: {{PROJECT_NAME}}-postgres
    ports:
      - "5432:5432"
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
      POSTGRES_DB: {{PROJECT_NAME}}
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    container_name: {{PROJECT_NAME}}-redis
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  redis_data:
```

**Create .dockerignore:**

```
node_modules
npm-debug.log
dist
.git
.env
.vscode
coverage
tests
*.md
.eslintrc.js
.prettierrc
tsconfig.json
```

#### 6.2: CI/CD Setup

**Detect CI/CD platform from operations.md and create appropriate config:**

**GitHub Actions (`.github/workflows/ci.yml`):**

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  test:
    runs-on: ubuntu-latest

    services:
      postgres:
        image: postgres:16
        env:
          POSTGRES_USER: test
          POSTGRES_PASSWORD: test
          POSTGRES_DB: test_db
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 5432:5432

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Lint
        run: npm run lint

      - name: Type check
        run: npm run type-check

      - name: Run tests
        run: npm run test:cov
        env:
          DATABASE_URL: postgresql://test:test@localhost:5432/test_db

      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info

  build:
    runs-on: ubuntu-latest
    needs: test
    if: github.event_name == 'push' && github.ref == 'refs/heads/main'

    steps:
      - uses: actions/checkout@v4

      - name: Setup Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Login to Docker Hub
        uses: docker/login-action@v3
        with:
          username: ${{ secrets.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_PASSWORD }}

      - name: Build and push
        uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: ${{ secrets.DOCKER_USERNAME }}/{{PROJECT_NAME}}:latest
          cache-from: type=registry,ref=${{ secrets.DOCKER_USERNAME }}/{{PROJECT_NAME}}:buildcache
          cache-to: type=registry,ref=${{ secrets.DOCKER_USERNAME }}/{{PROJECT_NAME}}:buildcache,mode=max
```

**GitLab CI (`.gitlab-ci.yml`):**

```yaml
stages:
  - test
  - build
  - deploy

variables:
  POSTGRES_DB: test_db
  POSTGRES_USER: test
  POSTGRES_PASSWORD: test
  DATABASE_URL: 'postgresql://test:test@postgres:5432/test_db'

test:
  stage: test
  image: node:20-alpine
  services:
    - postgres:16
  script:
    - npm ci
    - npm run lint
    - npm run type-check
    - npm run test:cov
  coverage: '/All files[^|]*\|[^|]*\s+([\d\.]+)/'
  artifacts:
    reports:
      coverage_report:
        coverage_format: cobertura
        path: coverage/cobertura-coverage.xml

build:
  stage: build
  image: docker:24
  services:
    - docker:24-dind
  only:
    - main
  script:
    - docker build -t $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA .
    - docker tag $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA $CI_REGISTRY_IMAGE:latest
    - docker push $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA
    - docker push $CI_REGISTRY_IMAGE:latest
```

#### 6.3: Environment Configuration

**Create `.env.example`:**

```bash
# Application
NODE_ENV=development
PORT=3000
APP_NAME={{PROJECT_NAME}}

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/{{PROJECT_NAME}}
DATABASE_POOL_MIN=2
DATABASE_POOL_MAX=10

# Redis (if applicable)
REDIS_URL=redis://localhost:6379

# Authentication (if applicable)
JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRATION=1h
REFRESH_TOKEN_EXPIRATION=7d

# External Services (from docs/operations.md)
# TODO: Add based on integrations specified in documentation

# Monitoring
LOG_LEVEL=info
```

**Create `.gitignore`:**

```
# Dependencies
node_modules/
venv/
__pycache__/

# Build output
dist/
build/
*.pyc
*.pyo

# Environment
.env
.env.local
.env.*.local

# IDE
.vscode/
.idea/
*.swp
*.swo

# Testing
coverage/
.nyc_output/
*.test.ts.snap

# OS
.DS_Store
Thumbs.db

# Logs
logs/
*.log
npm-debug.log*

# Database
*.db
*.sqlite

# Docker
.dockerignore
```

**Progress:**

```
✅ Dockerfile created (multi-stage, optimized)
✅ docker-compose.yml created (app + postgres + redis)
✅ CI/CD pipeline configured: GitHub Actions
   • Test job (lint, type-check, tests with coverage)
   • Build job (Docker image build + push)
✅ .env.example created with all required variables
✅ .gitignore created
✅ .dockerignore created

DevOps setup complete! Ready for:
  • Local development: docker-compose up
  • CI/CD: Push to trigger pipeline
  • Deployment: Docker image available
```

---

## Phase 7: Final Summary & Next Steps (5 minutes)

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ PROJECT SCAFFOLD COMPLETE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 Summary
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Framework initialized: {{FRAMEWORK}} {{VERSION}}
✅ Architecture implemented: {{ARCHITECTURE_PATTERN}}
✅ Files created: {{TOTAL_FILES}}
   • Source files: {{SOURCE_FILES}}
   • Test files: {{TEST_FILES}}
   • Config files: {{CONFIG_FILES}}

✅ Dependencies installed: {{TOTAL_DEPENDENCIES}}
   • Production: {{PROD_DEPENDENCIES}}
   • Development: {{DEV_DEPENDENCIES}}

✅ Code quality tools configured:
   • Linter: {{LINTER}}
   • Formatter: {{FORMATTER}}
   • Pre-commit hooks: ✅

✅ Testing infrastructure:
   • Framework: {{TEST_FRAMEWORK}}
   • Coverage target: {{COVERAGE_TARGET}}%
   • Test files: {{TEST_FILES}}

✅ DevOps setup:
   • Docker: ✅ (Dockerfile + docker-compose.yml)
   • CI/CD: ✅ ({{CI_CD_PLATFORM}})
   • Environment: ✅ (.env.example)

Total time: {{ELAPSED_TIME}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 Next Steps
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. **Review generated structure**
   └─ Check that the architecture matches your expectations

2. **Generate implementation roadmap**
   └─ Run: /project-roadmap
   └─ This will create a complete task breakdown for implementation

3. **Setup environment**
   └─ Copy .env.example to .env
   └─ Fill in real values (database credentials, API keys, etc.)

4. **Verify setup**
   └─ npm run type-check
   └─ npm run lint
   └─ npm run test:unit

5. **Start development**
   └─ docker-compose up (starts app + dependencies)
   └─ Or: npm run start:dev (local development)

6. **Follow roadmap**
   └─ Open .ai-bootstrap/roadmap.md (after running /project-roadmap)
   └─ Execute tasks using /feature command

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📚 Documentation
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Generated documentation is in:
  • AGENT.md - AI assistant entry point
  • ai-instructions.md - Tech stack and rules
  • docs/ - Architecture, data model, code standards, etc.

Share AGENT.md with your team and AI tools for consistent development.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Ready to commit the initial scaffold?

A) ✅ Yes, create initial commit now
B) No, I'll review first and commit manually later

Your choice (A): __
```

**If choice A (recommended):**

```bash
# Initialize git repository (if not already initialized)
git init

# Stage all generated files
git add .

# Create initial commit
git commit -m "chore: initial project scaffold

Generated by AI Bootstrap /project-scaffold command:
- Framework: {{FRAMEWORK}} {{VERSION}}
- Architecture: {{ARCHITECTURE_PATTERN}}
- {{TOTAL_FILES}} files created
- Testing infrastructure configured
- Docker + CI/CD setup complete

Ready for implementation with /project-roadmap"
```

```
✅ Initial commit created

Commit hash: {{COMMIT_HASH}}
Files tracked: {{TOTAL_FILES}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 Next Step: Generate Implementation Roadmap
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Your project structure is ready! Now let's create a detailed implementation plan.

Ready to generate the roadmap with Story Points?

A) ✅ Yes, run /project-roadmap now (recommended)
B) No, I'll review the structure first

Your choice (A): __
```

**If choice A:** Execute `/project-roadmap` automatically

**If choice B:** Show manual next steps:
```
**Manual Next Steps:**
1. Review generated structure ({{TOTAL_FILES}} files)
2. Test build: npm run build (or equivalent)
3. When ready, run: /project-roadmap (15-30 min)
4. Start implementing with: /feature

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## Important Notes

### Existing Code Detection

Before creating any files, check if code already exists:

```bash
# Check for source directories
if [ -d "src" ] || [ -d "app" ] || [ -d "lib" ]; then
  echo "⚠️  Source code detected!"
  echo ""
  echo "Options:"
  echo "A) Validate existing structure (compare with docs)"
  echo "B) Skip scaffold (code already exists)"
  echo "C) Augment (add missing pieces only)"
  echo "D) Backup and rebuild"
  echo ""
  echo "Your choice: __"
fi
```

**If code exists:**

- **Option A (Validate):** Compare existing structure with architecture docs, report differences
- **Option B (Skip):** Exit and suggest `/project-roadmap` directly
- **Option C (Augment):** Only create missing files (tests, Docker, CI/CD)
- **Option D (Backup):** Move existing code to `backup-YYYYMMDD/`, then scaffold

### Framework-Specific Adaptations

The examples above are illustrative. Always adapt to the detected framework:

- **NestJS:** Use modules, decorators, dependency injection
- **Express:** Use middleware pattern, router
- **FastAPI:** Use dependency injection, Pydantic models
- **Django:** Use apps, models, views structure
- **Spring Boot:** Use annotations, components, services
- **Rails:** Use MVC with ActiveRecord

Read the framework's official project structure guide and mirror it while applying the architecture pattern from `docs/architecture.md`.

### TODO Comments

Every generated file should have TODO comments indicating what needs implementation:

```typescript
// TODO: Implement actual business logic
// TODO: Add error handling for [specific case]
// TODO: Add validation for [specific field]
// TODO: Connect to [dependency]
// TODO: Add tests in tests/unit/path/to/file.test.ts
```

This makes it clear what the `/project-roadmap` command will break down into tasks.

---

## Validation Checklist

Before completing, verify:

- [ ] All files compile/parse without syntax errors
- [ ] TypeScript types are strict (no `any`)
- [ ] Dependencies are installed and versions match docs
- [ ] Linter passes on generated code
- [ ] Test structure matches source structure
- [ ] Docker containers start successfully
- [ ] CI/CD pipeline syntax is valid
- [ ] .env.example has all required variables
- [ ] Generated code follows code-standards.md conventions
- [ ] Architecture matches docs/architecture.md pattern

---

**End of /project-scaffold workflow**

**Time:** 90-120 minutes total
**Output:** Complete project skeleton ready for implementation
**Next:** Run `/project-roadmap` to generate task breakdown
