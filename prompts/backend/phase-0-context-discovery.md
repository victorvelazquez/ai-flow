## PHASE 0: Context Discovery (Optional - Existing Projects)

> **This phase is ONLY for existing projects that already have code/documentation.**
> **If starting a new project from scratch, skip directly to Project Scope Selection.**

### 🎯 Objective

Efficiently analyze existing projects using a **layered, incremental approach** that:
- ✅ Minimizes context usage (50-75% reduction)
- ✅ Supports ALL major backend languages and frameworks
- ✅ Provides smart caching for instant re-runs
- ✅ Allows selective deep analysis
- ✅ Handles errors gracefully

### 🏗️ Analysis Architecture

```
Layer 0: Cache Check (2-5 seconds) ──→ Use cached if recent
         ↓ (if no cache or outdated)
Layer 1: Fast Metadata Scan (10-20 seconds, ~1,000-1,500 tokens)
         ↓
Layer 2: Structural Analysis (30-90 seconds, ~2,000-5,000 tokens)
         ↓
Layer 3: Selective Deep Analysis (1-5 minutes, ~5,000-25,000 tokens, OPTIONAL)
         ↓
Result Synthesis & Pre-population
```

---

## 0.0 Check for Existing Analysis (Layer 0)

```
🔍 Checking for previous analysis...
```

**Actions:**

1. Check if `.ai-bootstrap/analysis.json` exists
2. If exists:
   - Read `analyzedAt` timestamp
   - Read `filesAnalyzed` with their timestamps
   - Compare with current project state:
     - Check if key files modified (package.json, composer.json, pom.xml, etc.)
     - Count files added/modified/deleted since last analysis
     - Calculate change ratio

**If recent analysis found (< 24 hours, < 15% files changed):**

```
✅ Found recent analysis from [X hours/minutes] ago

Analysis Summary:
• Project: [Name] ([Language] + [Framework])
• Entities: [X] detected
• Endpoints: [X] detected
• Last analyzed: [timestamp]
• Files changed since: [X] files ([Y]%)

Would you like to:

A) ✅ Use cached analysis (Instant - Recommended)
   Context usage: ~500 tokens
   Time: 2 seconds

B) 🔄 Re-analyze project (Full analysis)
   Context usage: ~8,000-25,000 tokens
   Time: 2-5 minutes

C) 📊 View cached analysis details first, then decide

Your choice: __
```

**If old analysis found (> 24 hours OR > 15% files changed):**

```
⚠️ Found analysis from [X days/hours] ago

Detected changes:
• [X] files modified: [list top 5]
• [X] files added
• [X] files deleted
• Dependencies changed: [Yes/No]

Recommendation: Re-analyze to ensure accuracy

Would you like to:

A) 🔄 Re-analyze (Recommended)
B) ✅ Use cached analysis anyway
C) 🎯 Incremental analysis (only analyze changes)

Your choice: __
```

**If no previous analysis:**

```
🆕 No previous analysis found. Starting fresh analysis...

Proceeding to Layer 1...
```

---

## 0.1 Layer 1: Fast Metadata Scan (10-20 seconds)

```
⚡ Layer 1: Scanning project metadata...

[████████████████████] 100%

This quick scan identifies your tech stack without reading code files.
```

### 0.1.1 Universal Language Detection

**Detect in order of market share for efficiency:**

**1. Node.js/TypeScript/JavaScript (~35% market)**

```
Checking for Node.js project...
• Looking for: package.json, yarn.lock, pnpm-lock.yaml, bun.lockb
```

- If `package.json` exists:
  - Read `dependencies` and `devDependencies` sections only
  - Detect framework by dependency patterns:
    - **NestJS**: `"@nestjs/core"` present
    - **Express**: `"express"` present
    - **Fastify**: `"fastify"` present
    - **Koa**: `"koa"` present
    - **Hapi**: `"@hapi/hapi"` present
    - **AdonisJS**: `"@adonisjs/core"` present
    - **Next.js**: `"next"` present (API routes)
    - **Remix**: `"@remix-run/node"` present
    - **tRPC**: `"@trpc/server"` present
  - Detect ORM:
    - **Prisma**: `"prisma"` in devDependencies + check for `prisma/schema.prisma`
    - **TypeORM**: `"typeorm"` present
    - **Sequelize**: `"sequelize"` present
    - **Mongoose**: `"mongoose"` present
    - **Drizzle**: `"drizzle-orm"` present
    - **MikroORM**: `"@mikro-orm/core"` present
    - **Knex**: `"knex"` present
  - Extract versions for framework and ORM

**2. Python (~25% market)**

```
Checking for Python project...
• Looking for: requirements.txt, pyproject.toml, Pipfile, poetry.lock
```

- If found:
  - Read dependencies list
  - Detect framework:
    - **FastAPI**: `fastapi` present
    - **Django**: `django` present
    - **Django REST Framework**: `djangorestframework` present
    - **Flask**: `flask` present
    - **Tornado**: `tornado` present
    - **Sanic**: `sanic` present
    - **Starlette**: `starlette` present
  - Detect ORM:
    - **SQLAlchemy**: `sqlalchemy` present
    - **Django ORM**: (builtin with Django)
    - **Tortoise ORM**: `tortoise-orm` present
    - **Peewee**: `peewee` present
    - **SQLModel**: `sqlmodel` present
  - Extract versions

**3. PHP (~15% market)**

```
Checking for PHP project...
• Looking for: composer.json, composer.lock
```

- If `composer.json` exists:
  - Read `require` and `require-dev` sections
  - Detect framework:
    - **Laravel**: `"laravel/framework"` present
    - **Symfony**: `"symfony/symfony"` or `"symfony/framework-bundle"` present
    - **CodeIgniter**: `"codeigniter4/framework"` present
    - **Slim**: `"slim/slim"` present
    - **Lumen**: `"laravel/lumen-framework"` present
    - **Yii**: `"yiisoft/yii2"` present
  - Detect ORM:
    - **Eloquent**: (builtin with Laravel/Lumen)
    - **Doctrine**: `"doctrine/orm"` present
    - **Propel**: `"propel/propel"` present
  - Extract PHP version from `require.php` field
  - Extract framework/ORM versions

**4. Java (~15% market)**

```
Checking for Java project...
• Looking for: pom.xml, build.gradle, build.gradle.kts
```

- If `pom.xml` exists (Maven):
  - Parse XML for `<dependencies>`
  - Detect framework:
    - **Spring Boot**: `<artifactId>spring-boot-starter` present
    - **Micronaut**: `<artifactId>micronaut-core` present
    - **Quarkus**: `<artifactId>quarkus-core` present
    - **Vert.x**: `<artifactId>vertx-core` present
    - **Dropwizard**: `<artifactId>dropwizard-core` present
  - Detect ORM:
    - **Hibernate/JPA**: `hibernate-core` or `spring-boot-starter-data-jpa`
    - **MyBatis**: `mybatis` present
    - **jOOQ**: `jooq` present
  - Extract Java version from `<maven.compiler.source>`

- If `build.gradle` or `build.gradle.kts` exists (Gradle):
  - Parse for `dependencies { ... }`
  - Same framework/ORM detection as Maven
  - Extract Java version from `sourceCompatibility`

**5. C#/.NET (~8% market)**

```
Checking for .NET project...
• Looking for: *.csproj, *.sln, Program.cs, Startup.cs
```

- Glob for `*.csproj` files
- If found:
  - Parse XML for `<PackageReference>` elements
  - Detect framework:
    - **ASP.NET Core**: `Microsoft.AspNetCore` package present
    - **Minimal APIs**: Check for `<LangVersion>latest</LangVersion>` + ASP.NET
    - **Nancy**: `Nancy` package present
  - Detect ORM:
    - **Entity Framework Core**: `Microsoft.EntityFrameworkCore` present
    - **Dapper**: `Dapper` present
    - **NHibernate**: `NHibernate` present
  - Extract .NET version from `<TargetFramework>` (e.g., `net8.0`)
  - Extract package versions

**6. Go (~5% market)**

```
Checking for Go project...
• Looking for: go.mod, go.sum
```

- If `go.mod` exists:
  - Parse for `require (...)` block
  - Detect framework:
    - **Gin**: `github.com/gin-gonic/gin` present
    - **Echo**: `github.com/labstack/echo` present
    - **Fiber**: `github.com/gofiber/fiber` present
    - **Chi**: `github.com/go-chi/chi` present
    - **Buffalo**: `github.com/gobuffalo/buffalo` present
  - Detect ORM:
    - **GORM**: `gorm.io/gorm` present
    - **Ent**: `entgo.io/ent` present
    - **sqlx**: `github.com/jmoiron/sqlx` present
    - **sqlc**: `github.com/kyleconroy/sqlc` present
  - Extract Go version from `go 1.xx` line
  - Extract dependency versions

**7. Ruby (~3% market)**

```
Checking for Ruby project...
• Looking for: Gemfile, Gemfile.lock
```

- If `Gemfile` exists:
  - Parse for `gem '...'` lines
  - Detect framework:
    - **Ruby on Rails**: `gem 'rails'` present
    - **Sinatra**: `gem 'sinatra'` present
    - **Hanami**: `gem 'hanami'` present
    - **Grape**: `gem 'grape'` present
  - Detect ORM:
    - **ActiveRecord**: `gem 'activerecord'` or builtin with Rails
    - **Sequel**: `gem 'sequel'` present
    - **ROM**: `gem 'rom'` present
  - Extract Ruby version from `ruby '...'` line
  - Extract gem versions

**8. Kotlin (~2% market)**

```
Checking for Kotlin project...
• Looking for: build.gradle.kts, pom.xml with kotlin plugin
```

- If `build.gradle.kts` exists:
  - Check for `kotlin("jvm")` or `org.jetbrains.kotlin` plugin
  - Detect framework:
    - **Ktor**: `io.ktor:ktor-server-core` present
    - **Spring Boot**: `org.springframework.boot` + kotlin present
    - **Javalin**: `io.javalin:javalin` present
    - **http4k**: `org.http4k` present
  - Detect ORM:
    - **Exposed**: `org.jetbrains.exposed` present
    - **Hibernate**: `org.hibernate` present
  - Extract Kotlin version

**9. Rust (~1% market)**

```
Checking for Rust project...
• Looking for: Cargo.toml, Cargo.lock
```

- If `Cargo.toml` exists:
  - Parse TOML for `[dependencies]`
  - Detect framework:
    - **Actix-web**: `actix-web` present
    - **Rocket**: `rocket` present
    - **Axum**: `axum` present
    - **Warp**: `warp` present
  - Detect ORM:
    - **Diesel**: `diesel` present
    - **SeaORM**: `sea-orm` present
    - **sqlx**: `sqlx` present
  - Extract Rust version from `rust-version` field

**10. Elixir**

```
Checking for Elixir project...
• Looking for: mix.exs
```

- If `mix.exs` exists:
  - Parse for `deps do` section
  - Detect framework:
    - **Phoenix**: `{:phoenix,` present
  - Detect ORM:
    - **Ecto**: `{:ecto,` present (usually with Phoenix)
  - Extract Elixir version

**11. Scala**

```
Checking for Scala project...
• Looking for: build.sbt
```

- If `build.sbt` exists:
  - Parse for `libraryDependencies`
  - Detect framework:
    - **Play Framework**: `"com.typesafe.play"` present
    - **Akka HTTP**: `"com.typesafe.akka" % "akka-http"` present
  - Detect ORM:
    - **Slick**: `"com.typesafe.slick"` present
    - **Quill**: `"io.getquill"` present

**12. Swift**

```
Checking for Swift project...
• Looking for: Package.swift
```

- If `Package.swift` exists:
  - Parse for `.package(url:` lines
  - Detect framework:
    - **Vapor**: `"vapor/vapor"` in URL
  - Detect ORM:
    - **Fluent**: `"vapor/fluent"` in URL (usually with Vapor)

### 0.1.2 Find Existing AI Configurations

**Quick glob search (no file reading yet):**

- `AGENT.md`
- `ai-instructions.md`
- `.clauderules`
- `.cursorrules`
- `.clinerules`
- `.geminirules`
- `.windsurfrules`
- `.github/copilot-instructions.md`

**Record:** Which files exist (paths only)

### 0.1.3 Find Documentation Files

**Quick glob search:**

- `README.md`
- `CLAUDE.md`
- `CONTRIBUTING.md`
- `docs/*.md` (count only)

**Record:** Paths and count

### 0.1.4 Output Layer 1 Results

```
✅ Layer 1 Complete (15 seconds)

📦 Project Detected:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Name: [from package.json/composer.json/etc.]
  Language: [TypeScript/Python/PHP/Java/etc.]
  Version: [language version]
  Package Manager: [npm/composer/maven/etc.]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🚀 Framework: [Name] v[version]
🗄️  ORM/Database: [Name] v[version]

📄 Documentation Found:
  • AI Configs: [X files found: AGENT.md, .clauderules, etc.]
  • Docs: [X files in docs/]
  • README: [Yes/No]

💾 Context Used: ~1,200 tokens
⏱️  Time Elapsed: 15s

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Continue to Layer 2? (Structural analysis - no code reading yet)

A) ✅ Yes - Continue (Recommended)
B) ⏭️  Skip to Layer 3 (Deep analysis)
C) 🛑 Stop here - Use only Layer 1 data

Your choice: __ (Auto-continue in 3s)
```

**Context Usage:** ~1,000-1,500 tokens

---

## 0.2 Layer 2: Structural Analysis (30-90 seconds)

```
🏗️  Layer 2: Analyzing project structure...

This scans directory organization and file counts without reading code.
```

### 0.2.1 Directory Structure Analysis

**Language-specific directory patterns:**

**Node.js/TypeScript:**
```
Scanning directories:
• src/**/* or app/**/* or lib/**/*

Counting files by pattern:
• Controllers: *.controller.{ts,js,tsx,jsx}
• Services: *.service.{ts,js}
• Modules: *.module.{ts,js}
• Entities: *.entity.{ts,js}
• DTOs: *.dto.{ts,js}
• Repositories: *.repository.{ts,js}
• Middleware: *.middleware.{ts,js}
• Guards: *.guard.{ts,js}
• Tests: *.spec.{ts,js}, *.test.{ts,js}
```

**Python:**
```
Scanning directories:
• app/**/*.py or src/**/*.py

Counting files by pattern:
• Views/Controllers: views.py, *_views.py, *_controller.py
• Models: models.py, *_models.py
• Serializers: serializers.py, *_serializers.py
• Services: *_service.py, services.py
• Routes: urls.py, routes.py
• Tests: test_*.py, *_test.py
```

**PHP:**
```
Scanning directories:
• app/**/*.php or src/**/*.php

Counting files by pattern:
• Controllers: app/Http/Controllers/**/*.php, src/Controller/**/*.php
• Models: app/Models/**/*.php, src/Entity/**/*.php
• Middleware: app/Http/Middleware/**/*.php
• Migrations: database/migrations/**/*.php, migrations/**/*.php
• Tests: tests/**/*.php
```

**Java:**
```
Scanning directories:
• src/main/java/**/*.java

Counting files by pattern:
• Controllers: **/*Controller.java
• Services: **/*Service.java
• Repositories: **/*Repository.java
• Entities: **/*Entity.java
• DTOs: **/*DTO.java, **/*Request.java, **/*Response.java
• Tests: src/test/java/**/*Test.java
```

**C#/.NET:**
```
Scanning directories:
• **/*.cs (excluding obj/, bin/)

Counting files by pattern:
• Controllers: **/*Controller.cs
• Services: **/Services/**/*.cs
• Models: **/Models/**/*.cs
• Entities: **/Entities/**/*.cs
• Repositories: **/*Repository.cs
• Tests: **/*Tests.cs, **/*Test.cs
```

**Go:**
```
Scanning directories:
• **/*.go (excluding vendor/)

Counting files by pattern:
• Handlers: *_handler.go, handlers/**/*.go
• Services: *_service.go, services/**/*.go
• Models: *_model.go, models/**/*.go
• Repositories: *_repository.go, repositories/**/*.go
• Tests: *_test.go
```

**Ruby:**
```
Scanning directories:
• app/**/*.rb

Counting files by pattern:
• Controllers: app/controllers/**/*_controller.rb
• Models: app/models/**/*.rb
• Views: app/views/**/*.erb
• Migrations: db/migrate/**/*.rb
• Tests: spec/**/*_spec.rb, test/**/*_test.rb
```

### 0.2.2 Architecture Pattern Detection

**Infer pattern from directory structure:**

- **Feature-based:** Directories like `src/users/`, `src/products/`, `src/orders/`
- **Layer-based:** Directories like `src/controllers/`, `src/services/`, `src/repositories/`
- **Modular Monolith:** Directories like `src/modules/users/`, `src/modules/products/`
- **Hybrid:** Mix of above patterns

### 0.2.3 Schema/Entity Detection (Read ONLY schema files)

**Based on detected ORM:**

**Prisma:**
- Read `prisma/schema.prisma`
- Extract model names only (regex: `model (\w+)`)
- Count total models
- Count relationships (count occurrences of `@relation`)

**TypeORM:**
- Glob `*.entity.{ts,js}`
- Extract entity names from `@Entity()` decorator (regex, no full parsing)
- Count entities

**Sequelize:**
- Glob `models/**/*.{ts,js}`
- Count model files

**Mongoose:**
- Glob `*.schema.{ts,js}` or `models/**/*.{ts,js}`
- Search for `new Schema(` pattern
- Count schemas

**Django:**
- Read `*/models.py` files
- Extract class names inheriting from `models.Model` (regex)
- Count models

**SQLAlchemy:**
- Read `**/models.py` or `**/*_model.py`
- Extract classes with `Base` or `db.Model` (regex)
- Count models

**Eloquent (Laravel):**
- Glob `app/Models/**/*.php`
- Count model files

**Doctrine (Symfony/PHP):**
- Glob `src/Entity/**/*.php`
- Count entity files

**Hibernate/JPA (Java):**
- Glob `**/*Entity.java`
- Count entity files

**Entity Framework (.NET):**
- Glob `**/Models/**/*.cs` or `**/Entities/**/*.cs`
- Count entity files

**GORM (Go):**
- Search for `type.*struct` in `models/**/*.go`
- Count structs

**ActiveRecord (Ruby):**
- Glob `app/models/**/*.rb`
- Count model files

### 0.2.4 Test Coverage Estimation

- Count test files
- Count source files (non-test)
- Calculate ratio: `test_files / source_files`
- Estimate coverage tier:
  - **Low:** < 0.2 ratio (~0-30% coverage)
  - **Medium:** 0.2-0.6 ratio (~30-60% coverage)
  - **High:** > 0.6 ratio (~60%+ coverage)

### 0.2.5 Documentation Maturity Assessment

**Count and categorize docs:**

```
Checking docs/ directory...
• architecture.md [✅ exists / ❌ missing]
• api.md [✅ exists / ❌ missing]
• data-model.md [✅ exists / ❌ missing]
• security.md [✅ exists / ❌ missing]
• testing.md [✅ exists / ❌ missing]
• operations.md [✅ exists / ❌ missing]
• code-standards.md [✅ exists / ❌ missing]
• contributing.md [✅ exists / ❌ missing]
```

**Maturity Level:**
- 🌱 **Minimal:** 0-1 docs → Suggest **MVP or Production-Ready scope**
- 🌿 **Basic:** 2-4 docs → Suggest **Production-Ready scope**
- 🌳 **Comprehensive:** 5-7 docs → Suggest **Production-Ready or Enterprise scope**
- 🏢 **Enterprise:** 8+ docs → Suggest **Enterprise scope**

### 0.2.6 Output Layer 2 Results

```
✅ Layer 2 Complete (60 seconds)

🏛️  Architecture Pattern: [Feature-based/Layer-based/Modular/Hybrid]

📊 Code Structure:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[Language-specific breakdown, e.g., for Node.js:]

  Controllers: [X files]
  Services: [X files]
  Entities: [X files]
  DTOs: [X files]
  Tests: [X files] → Coverage estimate: [Low/Medium/High]

[OR for Python:]

  Views/Controllers: [X files]
  Models: [X files]
  Serializers: [X files]
  Services: [X files]
  Tests: [X files] → Coverage estimate: [Low/Medium/High]

[etc., adapt to detected language]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📂 Organization:
[Example for Feature-based:]
  ✓ src/users/ (3 controllers, 5 services, 2 entities)
  ✓ src/products/ (2 controllers, 3 services, 1 entity)
  ✓ src/orders/ (2 controllers, 4 services, 2 entities)

[OR for Layer-based:]
  ✓ src/controllers/ (7 files)
  ✓ src/services/ (12 files)
  ✓ src/entities/ (5 files)

🗄️  Database Entities: [X detected]
  Key entities: [User, Product, Order, Payment, Invoice, etc.]

📈 Documentation Maturity: [🌱 Minimal / 🌿 Basic / 🌳 Comprehensive / 🏢 Enterprise]
  Found [X] of 8 recommended docs

💾 Context Used: ~3,500 tokens (total: ~4,700)
⏱️  Time Elapsed: 1m 15s

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💡 Recommended Scope: [MVP / Production-Ready / Enterprise]
   (Based on detected maturity level and code complexity)

Continue to Layer 3? (Deep code analysis - reads files)

A) ✅ Yes - Full deep analysis (all areas)
B) 🎯 Selective - Choose specific areas to analyze
C) ⏭️  Skip - Use Layer 1+2 data only (faster, less detailed)

Your choice: __
```

**Context Usage:** ~2,000-5,000 tokens (cumulative: ~3,000-6,500)

---

## 0.3 Layer 3: Selective Deep Analysis (1-5 minutes, OPTIONAL)

```
🔬 Layer 3: Performing deep code analysis...

This reads and parses actual code files for detailed insights.
⚠️  This will use 5,000-25,000 tokens depending on selections.
```

### 0.3.1 Area Selection

**If user chose "Selective", present options:**

```
Which areas should I analyze deeply?

Select areas (use arrow keys, space to select, enter to confirm):

[✓] API Endpoints & Routes
    Parse controllers/routes to extract all endpoints
    ⏱️  Estimated time: 60-90 seconds
    💾 Context cost: ~5,000-10,000 tokens

[✓] Entity Relationships & Data Model
    Read entity/model files to map relationships
    ⏱️  Estimated time: 30-60 seconds
    💾 Context cost: ~3,000-6,000 tokens

[✓] Security Patterns
    Detect auth, validation, rate limiting, CORS
    ⏱️  Estimated time: 20-30 seconds
    💾 Context cost: ~1,000-2,000 tokens

[ ] Testing Infrastructure
    Analyze test files and patterns
    ⏱️  Estimated time: 15-20 seconds
    💾 Context cost: ~1,000-2,000 tokens

[ ] Business Logic Patterns (Advanced)
    Read service files for business flows
    ⏱️  Estimated time: 90-120 seconds
    💾 Context cost: ~8,000-15,000 tokens
    ⚠️  HIGH CONTEXT USAGE

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Total estimated: ~2-3 minutes, ~9,000-18,000 tokens

Or:
A) ✅ Analyze all areas (Maximum detail, ~25,000 tokens)
B) 📋 Use scope-based defaults:
   - MVP scope: Only Security Patterns
   - Production-Ready: Endpoints + Entities + Security
   - Enterprise: All areas

Your choice: __
```

### 0.3.2 Smart File Sampling Strategy

**Don't read ALL files - use stratified sampling:**

```typescript
// Pseudo-algorithm for file sampling

function selectFilesToAnalyze(files: string[], category: string, maxFiles: number = 30) {
  // Priority by category
  const priorities = {
    controllers: 10,
    services: 9,
    entities: 10,
    repositories: 8,
    dto: 7
  };

  // Group by module/feature
  const byModule = groupBy(files, file => file.split('/')[1]);

  // Sample proportionally from each module
  const samples = [];
  const modules = Object.keys(byModule);
  const perModule = Math.ceil(maxFiles / modules.length);

  for (const module of modules) {
    const moduleFiles = byModule[module];
    // Take first N files from each module for diversity
    samples.push(...moduleFiles.slice(0, perModule));

    if (samples.length >= maxFiles) break;
  }

  return samples.slice(0, maxFiles);
}
```

**Sampling Limits by Project Size:**

- **Small (<50 files):** Analyze all
- **Medium (50-200 files):** Sample 40-50 files (stratified)
- **Large (200-500 files):** Sample 50-70 files (stratified)
- **Very Large (>500 files):** Sample 70-100 files (stratified)

### 0.3.3 Context Budget Management

**Monitor token usage actively:**

```
🎯 Context Budget Tracker

Available for analysis: 30,000 tokens
Reserved for phases 1-7: 140,000 tokens
Buffer: 10,000 tokens

Current usage:
[████████░░░░░░░░░░░░] 40% - 12,000 tokens used

Remaining: 18,000 tokens
```

**Stop if approaching limit:**

```
⚠️  Context budget 90% consumed (27,000/30,000 tokens)

Analyzed so far:
✅ 45 of 78 controller files (57%)
✅ 23 of 45 entity files (51%)
⏸️  Pausing analysis to preserve context budget

Would you like to:
A) 📊 Continue with remaining files (may hit limit)
B) ✅ Stop here and use partial analysis (recommended)
C) 🔄 Export current analysis and restart with fresh context

Your choice: __
```

### 0.3.4 Language-Specific Deep Analysis

**Node.js/TypeScript:**

**API Endpoints (NestJS):**
```typescript
// Sample up to 30 controller files
const controllerFiles = glob('**/*.controller.{ts,js}').slice(0, 30);

for (const file of controllerFiles) {
  const content = readFile(file);

  // Extract using regex (faster than full AST parsing)
  const controllerMatch = /@Controller\(['"](.+?)['"]\)/.exec(content);
  const basePath = controllerMatch?.[1] || '';

  const routes = [
    ...content.matchAll(/@Get\(['"](.+?)['"]\)\s+(\w+)/g),
    ...content.matchAll(/@Post\(['"](.+?)['"]\)\s+(\w+)/g),
    ...content.matchAll(/@Put\(['"](.+?)['"]\)\s+(\w+)/g),
    ...content.matchAll(/@Delete\(['"](.+?)['"]\)\s+(\w+)/g),
    ...content.matchAll(/@Patch\(['"](.+?)['"]\)\s+(\w+)/g)
  ];

  for (const [fullMatch, path, handlerName, method] of routes) {
    endpoints.push({
      method: method,
      path: `${basePath}/${path}`,
      handler: handlerName,
      file: file
    });
  }
}
```

**API Endpoints (Express):**
```typescript
const routeFiles = glob('**/routes/**/*.{ts,js}').slice(0, 20);

for (const file of routeFiles) {
  const content = readFile(file);

  const routes = [
    ...content.matchAll(/router\.(get|post|put|delete|patch)\(['"](.+?)['"],\s*(\w+)/g),
    ...content.matchAll(/app\.(get|post|put|delete|patch)\(['"](.+?)['"],\s*(\w+)/g)
  ];

  for (const [, method, path, handler] of routes) {
    endpoints.push({method: method.toUpperCase(), path, handler, file});
  }
}
```

**Entities (Prisma):**
```typescript
// Read prisma/schema.prisma
const schema = readFile('prisma/schema.prisma');

// Extract models
const models = [...schema.matchAll(/model\s+(\w+)\s*\{([^}]+)\}/gs)];

for (const [, modelName, body] of models) {
  const fields = [...body.matchAll(/(\w+)\s+(\w+)(?:\?)?(?:\s+@(\w+))?/g)];

  const entity = {
    name: modelName,
    fields: fields.map(([, name, type, decorator]) => ({
      name,
      type,
      decorator
    })),
    relationships: [...body.matchAll(/@relation\(([^)]+)\)/g)].map(m => m[1])
  };

  entities.push(entity);
}
```

**Python:**

**API Endpoints (FastAPI):**
```python
# Sample router files
routerFiles = glob('**/*routes.py', '**/*router.py')[:20]

for file in routerFiles:
    content = readFile(file)

    # Extract routes using regex
    routes = re.findall(r'@(?:app|router)\.(get|post|put|delete|patch)\([\'"](.+?)[\'"]\)\\s+async def\\s+(\\w+)', content)

    for method, path, handler in routes:
        endpoints.append({
            'method': method.upper(),
            'path': path,
            'handler': handler,
            'file': file
        })
```

**Entities (Django):**
```python
# Read models.py files
modelFiles = glob('**/models.py')[:15]

for file in modelFiles:
    content = readFile(file)

    # Extract model classes
    models = re.findall(r'class\\s+(\\w+)\\(models\\.Model\\):([^\\n]+(?:\\n(?!class)(?!def)[^\\n]+)*)', content)

    for className, body in models:
        fields = re.findall(r'(\\w+)\\s*=\\s*models\\.(\\w+Field)\\(([^)]*)\\)', body)

        entities.append({
            'name': className,
            'fields': [{'name': f[0], 'type': f[1]} for f in fields],
            'file': file
        })
```

**PHP:**

**API Endpoints (Laravel):**
```php
// Read routes/api.php and routes/web.php
$routeFiles = ['routes/api.php', 'routes/web.php'];

foreach ($routeFiles as $file) {
    $content = file_get_contents($file);

    // Extract routes
    preg_match_all('/Route::(get|post|put|delete|patch)\\([\'"](.+?)[\'"],\\s*[\'"]?([^\\)]+)[\'"]?\\)/', $content, $matches, PREG_SET_ORDER);

    foreach ($matches as $match) {
        $endpoints[] = [
            'method' => strtoupper($match[1]),
            'path' => $match[2],
            'handler' => $match[3],
            'file' => $file
        ];
    }
}
```

**Entities (Eloquent):**
```php
// Glob app/Models/*.php
$modelFiles = glob('app/Models/*.php');

foreach ($modelFiles as $file) {
    $content = file_get_contents($file);

    // Extract class name
    preg_match('/class\\s+(\\w+)\\s+extends\\s+Model/', $content, $classMatch);

    if ($classMatch) {
        $entities[] = [
            'name' => $classMatch[1],
            'file' => $file
        ];
    }
}
```

**Java:**

**API Endpoints (Spring Boot):**
```java
// Glob **/*Controller.java (sample 25)
List<String> controllerFiles = glob("**/*Controller.java").subList(0, 25);

for (String file : controllerFiles) {
    String content = readFile(file);

    // Extract base path from @RequestMapping
    Matcher basePathMatcher = Pattern.compile("@RequestMapping\\([\"'](.+?)[\"']\\)").matcher(content);
    String basePath = basePathMatcher.find() ? basePathMatcher.group(1) : "";

    // Extract endpoints
    Matcher routeMatcher = Pattern.compile("@(Get|Post|Put|Delete|Patch)Mapping\\([\"'](.+?)[\"']\\)[^{]+public[^{]+(\\w+)\\(").matcher(content);

    while (routeMatcher.find()) {
        endpoints.add(new Endpoint(
            routeMatcher.group(1).toUpperCase(),
            basePath + routeMatcher.group(2),
            routeMatcher.group(3),
            file
        ));
    }
}
```

**Entities (JPA/Hibernate):**
```java
// Glob **/*Entity.java
List<String> entityFiles = glob("**/*Entity.java").subList(0, 30);

for (String file : entityFiles) {
    String content = readFile(file);

    // Extract entity name
    Matcher classMatcher = Pattern.compile("@Entity[^\\n]+\\s+(?:public\\s+)?class\\s+(\\w+)").matcher(content);

    if (classMatcher.find()) {
        String entityName = classMatcher.group(1);

        // Extract fields with @Column
        Matcher fieldMatcher = Pattern.compile("@Column[^\\n]+\\s+private\\s+(\\w+)\\s+(\\w+)").matcher(content);

        List<Field> fields = new ArrayList<>();
        while (fieldMatcher.find()) {
            fields.add(new Field(fieldMatcher.group(2), fieldMatcher.group(1)));
        }

        entities.add(new Entity(entityName, fields, file));
    }
}
```

**C#/.NET:**

**API Endpoints (ASP.NET Core):**
```csharp
// Glob **/*Controller.cs
var controllerFiles = Directory.GetFiles(".", "*Controller.cs", SearchOption.AllDirectories).Take(25);

foreach (var file in controllerFiles) {
    var content = File.ReadAllText(file);

    // Extract base route from [Route("...")]
    var baseRouteMatch = Regex.Match(content, @"\[Route\([""'](.+?)[""']\)\]");
    var basePath = baseRouteMatch.Success ? baseRouteMatch.Groups[1].Value : "";

    // Extract endpoints
    var routeMatches = Regex.Matches(content, @"\[Http(Get|Post|Put|Delete|Patch)\([""'](.+?)[""']\)\][^\{]+public[^\{]+(\w+)\(");

    foreach (Match match in routeMatches) {
        endpoints.Add(new Endpoint {
            Method = match.Groups[1].Value.ToUpper(),
            Path = basePath + "/" + match.Groups[2].Value,
            Handler = match.Groups[3].Value,
            File = file
        });
    }
}
```

**Entities (Entity Framework):**
```csharp
// Glob **/Models/**/*.cs or **/Entities/**/*.cs
var entityFiles = Directory.GetFiles(".", "*.cs", SearchOption.AllDirectories)
    .Where(f => f.Contains("/Models/") || f.Contains("/Entities/"))
    .Take(30);

foreach (var file in entityFiles) {
    var content = File.ReadAllText(file);

    // Extract class name
    var classMatch = Regex.Match(content, @"public\s+class\s+(\w+)");

    if (classMatch.Success) {
        var entityName = classMatch.Groups[1].Value;

        // Extract properties
        var propMatches = Regex.Matches(content, @"public\s+(\w+(?:<\w+>)?)\s+(\w+)\s*\{\s*get;\s*set;");

        var fields = propMatches.Cast<Match>()
            .Select(m => new Field { Name = m.Groups[2].Value, Type = m.Groups[1].Value })
            .ToList();

        entities.Add(new Entity { Name = entityName, Fields = fields, File = file });
    }
}
```

**Go:**

**API Endpoints (Gin):**
```go
// Read handler files
handlerFiles := filepath.Glob("**/handlers/**/*.go")[:20]

for _, file := range handlerFiles {
    content, _ := ioutil.ReadFile(file)

    // Extract routes using regex
    routeRegex := regexp.MustCompile(`router\.(GET|POST|PUT|DELETE|PATCH)\("(.+?)",\s*(\w+)`)
    matches := routeRegex.FindAllStringSubmatch(string(content), -1)

    for _, match := range matches {
        endpoints = append(endpoints, Endpoint{
            Method:  match[1],
            Path:    match[2],
            Handler: match[3],
            File:    file,
        })
    }
}
```

**Entities (GORM):**
```go
// Read model files
modelFiles := filepath.Glob("**/models/**/*.go")[:20]

for _, file := range modelFiles {
    content, _ := ioutil.ReadFile(file)

    // Extract struct definitions
    structRegex := regexp.MustCompile(`type\s+(\w+)\s+struct\s*\{([^}]+)\}`)
    matches := structRegex.FindAllStringSubmatch(string(content), -1)

    for _, match := range matches {
        structName := match[1]
        body := match[2]

        // Extract fields
        fieldRegex := regexp.MustCompile(`(\w+)\s+(\w+(?:\.\w+)?)`)
        fields := fieldRegex.FindAllStringSubmatch(body, -1)

        var fieldList []Field
        for _, field := range fields {
            fieldList = append(fieldList, Field{Name: field[1], Type: field[2]})
        }

        entities = append(entities, Entity{Name: structName, Fields: fieldList, File: file})
    }
}
```

**Ruby:**

**API Endpoints (Rails):**
```ruby
# Read routes.rb
routes_file = 'config/routes.rb'
content = File.read(routes_file)

# Extract resource routes
resource_matches = content.scan(/resources?\s+:(\w+)/)

resource_matches.each do |resource|
  # Standard RESTful routes
  %w[GET POST PUT PATCH DELETE].each do |method|
    endpoints << {
      method: method,
      path: "/#{resource}",
      resource: resource,
      file: routes_file
    }
  end
end

# Extract custom routes
custom_matches = content.scan(/(get|post|put|patch|delete)\s+['"](.+?)['"],\s*to:\s*['"](.+?)['"]/)

custom_matches.each do |method, path, controller_action|
  endpoints << {
    method: method.upcase,
    path: path,
    handler: controller_action,
    file: routes_file
  }
end
```

**Entities (ActiveRecord):**
```ruby
# Glob app/models/*.rb
model_files = Dir.glob('app/models/**/*.rb')[0..20]

model_files.each do |file|
  content = File.read(file)

  # Extract class name
  class_match = content.match(/class\s+(\w+)\s+<\s+(?:Application)?Record/)

  next unless class_match

  entity_name = class_match[1]

  # Extract associations
  associations = content.scan(/(belongs_to|has_many|has_one)\s+:(\w+)/)

  entities << {
    name: entity_name,
    associations: associations.map { |type, name| {type: type, target: name} },
    file: file
  }
end
```

**Rust:**

**API Endpoints (Actix):**
```rust
// Read handler files
let handler_files: Vec<_> = glob("**/handlers/**/*.rs").unwrap().take(15).collect();

for file in handler_files {
    let content = fs::read_to_string(file).unwrap();

    // Extract routes using regex
    let route_regex = Regex::new(r#"#\[(get|post|put|delete|patch)\("(.+?)"\)\]\s+async\s+fn\s+(\w+)"#).unwrap();

    for cap in route_regex.captures_iter(&content) {
        endpoints.push(Endpoint {
            method: cap[1].to_uppercase(),
            path: cap[2].to_string(),
            handler: cap[3].to_string(),
            file: file.to_string(),
        });
    }
}
```

**Entities (Diesel):**
```rust
// Read schema.rs and models.rs
let schema = fs::read_to_string("src/schema.rs").ok();
let models = fs::read_to_string("src/models.rs").ok();

if let Some(schema_content) = schema {
    // Extract table definitions
    let table_regex = Regex::new(r"table!\s*\{\s*(\w+)").unwrap();

    for cap in table_regex.captures_iter(&schema_content) {
        entities.push(Entity {
            name: cap[1].to_string(),
            source: "schema.rs".to_string(),
        });
    }
}
```

### 0.3.5 Security Pattern Detection

**Scan for security patterns across all languages:**

**Authentication:**
- JWT libraries: `jsonwebtoken`, `@nestjs/jwt`, `pyjwt`, `jjwt`, etc.
- Session libraries: `express-session`, `django.contrib.sessions`
- OAuth libraries: `passport`, `authlib`, `spring-security-oauth2`
- Password hashing: `bcrypt`, `argon2`, `password_hash` (PHP)

**Validation:**
- `class-validator`, `joi`, `zod` (Node.js)
- `pydantic`, `marshmallow` (Python)
- Laravel validation rules (PHP)
- Bean Validation/Hibernate Validator (Java)
- Data Annotations (.NET)

**Rate Limiting:**
- `express-rate-limit`, `@nestjs/throttler`
- `django-ratelimit`, `slowapi`
- Bucket4j (Java)

**CORS:**
- `cors` package (Node.js)
- `django-cors-headers` (Python)
- Spring CORS configuration (Java)

**Security Headers:**
- `helmet` (Node.js)
- `django-csp`
- OWASP Java Encoder

**Output:**

```
🔒 Security Analysis Results:

Authentication:
  ✅ JWT detected: [@nestjs/jwt v10.1.0]
  ✅ Password hashing: [bcrypt v5.1.0]
  ❌ Refresh tokens: Not detected

Validation:
  ✅ Input validation: [class-validator, class-transformer]
  ✅ DTOs detected: [23 DTO files]

Rate Limiting:
  ⚠️  Not detected - Recommend adding @nestjs/throttler

CORS:
  ⚠️  Configuration not found in main.ts

Security Headers:
  ⚠️  helmet not detected - Recommend adding for production
```

### 0.3.6 Progress Tracking

**Show real-time progress during analysis:**

```
🔬 Deep Analysis Progress:

[████████████████░░░░] 80% - API Endpoints
  ✅ Analyzed 24/30 controller files
  ✅ Found 127 endpoints
  ⏱️  Elapsed: 75s
  💾 Tokens: 8,200

[████████████████████] 100% - Entity Relationships
  ✅ Analyzed 18/18 entity files
  ✅ Mapped 45 relationships
  ⏱️  Elapsed: 45s
  💾 Tokens: 4,500

[████████████░░░░░░░░] 60% - Security Patterns
  ⏸️  Context budget warning at 90%
  ✅ Partial analysis: JWT auth, validation, bcrypt
  ℹ️  Remaining checks deferred
  ⏱️  Elapsed: 20s
  💾 Tokens: 1,800

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Total: 2m 20s | 14,500 tokens used
Remaining context: 155,500 tokens
```

### 0.3.7 Output Layer 3 Results

```
✅ Layer 3 Complete (2m 30s)

📡 API Endpoints: [127 detected]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
By Method:
  GET: 58 endpoints
  POST: 32 endpoints
  PUT: 18 endpoints
  DELETE: 12 endpoints
  PATCH: 7 endpoints

By Module:
  /users: 23 endpoints
  /products: 18 endpoints
  /orders: 15 endpoints
  /payments: 8 endpoints
  /auth: 12 endpoints
  [+7 more modules]

Sample Endpoints:
  • GET /api/users/:id → UsersController.findOne
  • POST /api/products → ProductsController.create
  • PUT /api/orders/:id → OrdersController.update
  [View full list in analysis.json]

🗄️  Database Entities: [18 detected]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Core Entities:
  • User (8 fields, 3 relationships)
    - Relationships: OneToMany → Orders, OneToMany → Reviews
  • Product (12 fields, 2 relationships)
    - Relationships: ManyToOne → Category, OneToMany → OrderItems
  • Order (10 fields, 4 relationships)
    - Relationships: ManyToOne → User, OneToMany → OrderItems, etc.

  [+15 more entities - see analysis.json for full schema]

🔒 Security Patterns:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ✅ Authentication: JWT with bcrypt
  ✅ Validation: class-validator + DTOs
  ⚠️  Rate Limiting: Not detected
  ⚠️  CORS: Not configured
  ⚠️  Security Headers: helmet not found

💾 Context Used: ~14,500 tokens (total: ~18,700)
⏱️  Time Elapsed: 3m 45s

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**Context Usage:** ~5,000-25,000 tokens (cumulative: ~8,000-31,500)

---

## 0.4 Proactive Improvement Suggestions

```
💡 PROACTIVE SUGGESTIONS

Based on my analysis, I found opportunities for improvement:

🔴 HIGH PRIORITY (Security):

1. ⚠️  Rate Limiting Not Implemented
   Action: Add @nestjs/throttler middleware to protect against abuse
   Impact: Prevents DDoS attacks, ensures fair resource usage
   Estimated effort: 30 minutes

2. 🔐 CORS Not Configured
   Action: Configure CORS with explicit allowed origins in main.ts
   Impact: Prevents unauthorized cross-origin requests
   Estimated effort: 15 minutes

3. ⚠️  No Refresh Token Pattern
   Action: Implement refresh tokens alongside access tokens
   Impact: Improved security, better session management
   Estimated effort: 2-3 hours

🟡 MEDIUM PRIORITY (Architecture):

4. 📐 No Global Error Handler Detected
   Action: Implement centralized exception filter
   Impact: Consistent error responses, better debugging
   Estimated effort: 1 hour

5. 📊 Missing API Documentation
   Action: Add @nestjs/swagger for auto-generated API docs
   Impact: Better developer experience, easier testing
   Estimated effort: 2 hours

🟢 LOW PRIORITY (Performance):

6. ⚡ No Caching Strategy Detected
   Action: Add Redis for query result caching
   Impact: Faster response times, reduced database load
   Estimated effort: 4-6 hours

7. 📄 Pagination Not Detected in List Endpoints
   Action: Implement cursor-based or offset pagination
   Impact: Better performance with large datasets
   Estimated effort: 2-3 hours

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Would you like to:

A) ✅ Address these during bootstrap (I'll integrate into relevant phases)
   - Security suggestions → Phase 4 (Security & Authentication)
   - Architecture suggestions → Phase 3 (System Architecture)
   - Performance suggestions → Phase 7 (Operations & Deployment)

B) 💾 Save suggestions to suggestions.md file for later

C) ❌ Skip suggestions and continue with standard bootstrap

Your choice: __
```

**If user selects A:**
- Mark suggestions to be addressed in relevant phases
- When reaching those phases, reference: "Earlier analysis detected X, let's configure it now"

**If user selects B:**
- Create `suggestions.md` with all recommendations formatted for reference

**If user selects C:**
- Continue without suggestions

---

## 0.5 Export Analysis Results

```
💾 Export Analysis to JSON?

This creates .ai-bootstrap/analysis.json with all detected information:
• Project metadata and tech stack
• Complete endpoint list with methods, paths, handlers
• Full entity schemas with relationships
• Architecture patterns detected
• Security analysis results
• Improvement suggestions

Benefits:
✅ Skip re-analysis on future bootstrap runs
✅ Share with team members
✅ Track project evolution over time
✅ Use for automation/CI/CD
✅ Reference during development

A) ✅ Yes - Export full analysis (Recommended)
B) ❌ No - Keep in memory only

Your choice: __
```

**If A, create comprehensive JSON:**

```json
{
  "version": "2.0",
  "analyzedAt": "2024-01-20T10:30:00Z",
  "layers": {
    "layer1": {
      "completedAt": "2024-01-20T10:30:15Z",
      "tokensUsed": 1200
    },
    "layer2": {
      "completedAt": "2024-01-20T10:31:30Z",
      "tokensUsed": 3500
    },
    "layer3": {
      "completedAt": "2024-01-20T10:34:00Z",
      "tokensUsed": 14500,
      "areasAnalyzed": ["endpoints", "entities", "security"]
    }
  },
  "project": {
    "name": "ecommerce-api",
    "language": "TypeScript",
    "languageVersion": "5.3.0",
    "packageManager": "pnpm",
    "framework": {
      "name": "NestJS",
      "version": "10.2.0"
    },
    "orm": {
      "name": "Prisma",
      "version": "5.7.0"
    }
  },
  "structure": {
    "pattern": "feature-based",
    "fileCounts": {
      "controllers": 12,
      "services": 18,
      "entities": 18,
      "dto": 45,
      "tests": 38
    },
    "testCoverage": "medium"
  },
  "endpoints": [
    {
      "method": "GET",
      "path": "/api/users/:id",
      "controller": "UsersController",
      "handler": "findOne",
      "file": "src/users/users.controller.ts",
      "line": 42
    }
    // ... 126 more
  ],
  "entities": [
    {
      "name": "User",
      "source": "prisma",
      "file": "prisma/schema.prisma",
      "fields": [
        {"name": "id", "type": "String", "required": true, "primary": true},
        {"name": "email", "type": "String", "required": true, "unique": true},
        {"name": "password", "type": "String", "required": true}
      ],
      "relationships": [
        {"type": "OneToMany", "target": "Order", "field": "orders"},
        {"type": "OneToMany", "target": "Review", "field": "reviews"}
      ]
    }
    // ... 17 more
  ],
  "security": {
    "authentication": {
      "method": "JWT",
      "library": "@nestjs/jwt@10.1.0",
      "passwordHashing": "bcrypt@5.1.0"
    },
    "validation": {
      "libraries": ["class-validator", "class-transformer"],
      "dtoCount": 45
    },
    "rateLimiting": null,
    "cors": null,
    "securityHeaders": null
  },
  "documentation": {
    "maturity": "basic",
    "filesFound": ["README.md", "docs/architecture.md", "docs/api.md"]
  },
  "suggestions": [
    {
      "id": 1,
      "type": "security",
      "severity": "high",
      "title": "Rate Limiting Not Implemented",
      "description": "No rate limiting middleware detected",
      "recommendation": "Add @nestjs/throttler",
      "estimatedEffort": "30 minutes",
      "phase": 4
    }
    // ... more suggestions
  ],
  "filesAnalyzed": {
    "count": 87,
    "paths": [
      "src/users/users.controller.ts",
      "src/products/products.controller.ts",
      // ... all analyzed files
    ],
    "timestamps": {
      "src/users/users.controller.ts": "2024-01-19T15:22:00Z",
      "package.json": "2024-01-20T09:15:00Z"
      // ... all file timestamps for change detection
    }
  }
}
```

```
✅ Analysis exported to .ai-bootstrap/analysis.json

File size: 142 KB
Contains:
  • 127 endpoints
  • 18 entities with full schemas
  • 7 improvement suggestions
  • 87 files analyzed with timestamps

You can view/edit this file anytime or share with your team.
```

---

## 0.6 Load Detected Context & Pre-populate Answers

**If user selected "Use detected information":**

```
✅ Loading detected project context...

I'll pre-populate answers from analysis and only ask what's missing.

📋 PRE-POPULATED INFORMATION:

Phase 1 (Business):
  ✅ Project Name: ecommerce-api
  ✅ Description: [from package.json]
  ❓ Business Objectives: [NEED TO ASK]
  ❓ Target Users: [NEED TO ASK]
  ❓ Success Metrics: [NEED TO ASK]

Phase 2 (Data Architecture):
  ✅ Database: PostgreSQL (detected via Prisma)
  ✅ ORM: Prisma v5.7.0
  ✅ Entities: 18 detected (User, Product, Order, Payment, etc.)
  ✅ Relationships: 45 mapped
  ⚠️  Need validation: Are all entities documented?
  ❓ Data retention policies: [NEED TO ASK]

Phase 3 (System Architecture):
  ✅ Framework: NestJS v10.2.0
  ✅ Language: TypeScript v5.3.0
  ✅ Package Manager: pnpm
  ✅ Architecture Pattern: Feature-based modules
  ❓ Caching Strategy: [NEED TO ASK]
  ❓ Background Jobs: [NEED TO ASK]
  ❓ File Storage: [NEED TO ASK]

Phase 4 (Security):
  ✅ Authentication: JWT with bcrypt
  ✅ Validation: class-validator + DTOs
  ⚠️  Rate Limiting: Not configured (will ask to add)
  ⚠️  CORS: Not configured (will ask to add)
  ❓ Authorization strategy: [NEED TO ASK]
  ❓ Compliance requirements: [NEED TO ASK]

Phase 5 (Code Standards):
  ✅ Validation approach: DTOs with class-validator
  ❓ Linting: [NEED TO ASK]
  ❓ Formatting: [NEED TO ASK]
  ❓ Naming conventions: [NEED TO ASK]

Phase 6 (Testing):
  ✅ Test files: 38 detected
  ✅ Coverage: Medium (~30-60%)
  ❓ Testing strategy: [NEED TO ASK]
  ❓ CI/CD integration: [NEED TO ASK]

Phase 7 (Operations):
  ❓ Deployment target: [NEED TO ASK]
  ❓ Environment setup: [NEED TO ASK]
  ❓ Monitoring: [NEED TO ASK]
  ❓ Logging: [NEED TO ASK]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 Analysis Summary:
  • Pre-populated: ~45% of answers
  • Need to ask: ~55% (gaps in documentation)
  • Estimated time savings: 40-50 minutes

Ready to proceed to Project Scope Selection?

Type 'yes' to continue: __
```

---

## 0.7 Error Handling & Recovery

**If any layer fails:**

```
❌ Layer [X] Analysis Failed

Error: [description]
File: [problematic file if applicable]
Reason: [Syntax error / Parse error / File not found / etc.]

Impact:
  ✅ Layers 0-[X-1]: Completed successfully
  ❌ Layer [X]: Partially completed (45% done)
  ⏭️  Layers [X+1]+: Not started

What I was able to detect:
  • [List successful detections so far]

Would you like to:

A) 📊 Continue with partial analysis (Recommended)
   Use what was successfully detected, proceed to questionnaire

B) 🔄 Retry Layer [X] with reduced scope
   Try again with smaller file sample

C) ⏭️  Skip to questionnaire without analysis
   Answer all questions manually (no pre-population)

D) 🛠️  Show error details for debugging

Your choice: __
```

**If individual file parsing fails:**

```
⚠️  Skipped file: src/legacy/old-controller.ts
Reason: Syntax error (malformed decorator)
Impact: This file won't be included in endpoint analysis
Action: Continuing with remaining files...

Progress: 24 of 30 files analyzed (80% success rate)
```

**Error recovery strategies:**

1. **Parse errors:** Skip file, continue with others
2. **File not found:** Mark as deleted, update cache
3. **Out of memory:** Reduce sample size, retry
4. **Context limit:** Stop analysis, use partial results
5. **Network timeout:** (if remote files) Retry with backoff

---

## 🎯 Summary: Phase 0 Complete

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ CONTEXT DISCOVERY COMPLETE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 Project: ecommerce-api
🛠️  Stack: TypeScript 5.3 + NestJS 10.2 + Prisma 5.7 + PostgreSQL
📈 Maturity: Basic documentation
🎯 Recommended Scope: Production-Ready

Analysis Results:
  ✅ 127 API endpoints detected across 6 modules
  ✅ 18 database entities with 45 relationships
  ✅ Security patterns analyzed
  ✅ 7 improvement suggestions generated
  ✅ Analysis exported to .ai-bootstrap/analysis.json

Pre-population Status:
  • 45% of questionnaire answers populated
  • 55% questions still needed (business logic, ops, etc.)
  • Estimated time savings: 40-50 minutes

Performance:
  ⏱️  Total time: 3m 45s
  💾 Context used: 18,700 tokens (~9% of budget)
  📊 Remaining: 181,300 tokens for phases 1-7

Next Step: Project Scope Selection
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Press Enter to continue to Project Scope Selection...
```

---

**After Phase 0 completes, ALWAYS proceed to Project Scope Selection before Phase 1.**

---
## PHASE 1: Discovery & Business (15-20 min)
