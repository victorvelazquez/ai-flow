# AI Flow - Project Initialization

**YOU ARE AN EXPERT DEVOPS ENGINEER AND PROJECT SETUP SPECIALIST.**

Your mission is to initialize the project with the appropriate framework/language tooling when the user executes `/flow-project-init`.

---

## Command: `/flow-project-init`

### Objective

Initialize a clean project in the **current directory** using the framework's official CLI tool based on the tech stack defined in the documentation. Do NOT create subdirectories or manual folder structures.

### Prerequisites

Before executing this command, ensure:

- ✅ `/flow-docs-gen` completed (documentation generated)
- ✅ `ai-instructions.md` exists with tech stack defined
- ✅ Current directory is empty or ready for initialization

### Duration

⏱️ **Estimated Time:** 5-10 minutes

---

## Workflow: 3 Steps

### Step 1: Read Documentation & Prepare Directory (1-2 minutes)

**Read `ai-instructions.md` to identify:**

- Programming language and version
- Framework and version (if any)
- Package manager preference

**Check for conflicting files:**

Most framework CLIs fail if they detect existing files like `README.md`, `package.json`, `.gitignore`, etc.

**Strategy: Temporary move → Initialize → Merge back**

```bash
# 1. Create temporary backup
mkdir -p .ai-flow/temp-backup

# 2. Move AI Flow documentation temporarily (NOT deletion)
mv README.md .ai-flow/temp-backup/ 2>/dev/null || true
mv package.json .ai-flow/temp-backup/ 2>/dev/null || true
mv tsconfig.json .ai-flow/temp-backup/ 2>/dev/null || true
mv .gitignore .ai-flow/temp-backup/ 2>/dev/null || true

# 3. Keep .ai-flow/ directory intact with all documentation
```

**Display summary:**

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 Project Configuration
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📦 Language: {{LANGUAGE}} {{VERSION}}
🚀 Framework: {{FRAMEWORK}} {{VERSION}}
📦 Package Manager: {{PACKAGE_MANAGER}}

Target Directory: {{PWD}}

⚠️  IMPORTANT: 
   • Files temporarily moved to .ai-flow/temp-backup/
   • Will merge AI Flow docs with framework files after init
   • .ai-flow/ directory preserved with all documentation

Continue? (Y/n)
```

**If framework not detected:**

Ask user to specify the framework:

```
⚠️  Framework not specified in ai-instructions.md

Please specify the framework to use:
>
```

---

### Step 2: Execute Initialization Command (5-10 minutes)

**Run the framework's official initialization command in the CURRENT directory:**

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🏗️  Step 2/3: Initialize Project
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**CRITICAL RULES:**

1. ✅ **Initialize in current directory** (use `.` when the CLI supports it)
2. ✅ **Use official CLI tools** (don't create manual folder structures)
3. ✅ **Directory must be clean** (backup existing files first if needed)
4. ❌ **DO NOT create subdirectories** (no `mkdir project-name`)
5. ❌ **DO NOT create manual file structures**

---

**Framework-Specific Commands:**

**Node.js / TypeScript:**

```bash
# NestJS
npx @nestjs/cli new . --package-manager npm --skip-git

# Express + TypeScript
npm init -y
npm install express
npm install -D typescript @types/express @types/node ts-node nodemon
npx tsc --init

# Fastify + TypeScript
npm init -y
npm install fastify
npm install -D typescript @types/node tsx

# Next.js (if applicable)
npx create-next-app@latest . --typescript --tailwind --app --import-alias "@/*"
```

**Python:**

```bash
# Django
python -m venv venv
# Windows: venv\Scripts\activate | Unix: source venv/bin/activate
pip install django djangorestframework
django-admin startproject config .

# FastAPI
python -m venv venv
# Windows: venv\Scripts\activate | Unix: source venv/bin/activate
pip install "fastapi[standard]" uvicorn sqlalchemy

# Flask
python -m venv venv
# Windows: venv\Scripts\activate | Unix: source venv/bin/activate
pip install flask flask-restful flask-sqlalchemy
```

**Go:**

```bash
# Go (any framework)
go mod init {{PROJECT_NAME}}

# Then install dependencies (examples):
# Gin: go get -u github.com/gin-gonic/gin
# Echo: go get github.com/labstack/echo/v4
# Fiber: go get github.com/gofiber/fiber/v2
```

**C# / .NET:**

```bash
# ASP.NET Core Web API
dotnet new webapi -n {{PROJECT_NAME}} -o .
dotnet add package Microsoft.EntityFrameworkCore.Design
dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL
```

**Ruby:**

```bash
# Rails API
rails new . --api --database=postgresql --skip-git
```

**PHP:**

```bash
# Laravel
composer create-project laravel/laravel tmp-laravel
mv tmp-laravel/* . && mv tmp-laravel/.* . 2>/dev/null || true
rm -rf tmp-laravel

# Symfony
composer create-project symfony/skeleton tmp-symfony
mv tmp-symfony/* . && mv tmp-symfony/.* . 2>/dev/null || true
rm -rf tmp-symfony
```

**Java / Kotlin:**

```bash
# Spring Boot (Maven)
curl https://start.spring.io/starter.zip \
  -d type=maven-project \
  -d language=java \
  -d bootVersion=3.2.0 \
  -d dependencies=web,data-jpa \
  -o project.zip
unzip -o project.zip && rm project.zip

# Spring Boot (Gradle + Kotlin)
curl https://start.spring.io/starter.zip \
  -d type=gradle-project-kotlin \
  -d language=kotlin \
  -d bootVersion=3.2.0 \
  -d dependencies=web,data-jpa \
  -o project.zip
unzip -o project.zip && rm project.zip
```

---

+### Step 3: Merge AI Flow Documentation with Framework Files (2-3 minutes)

After framework initialization completes, intelligently merge the documentation:

**3.1 README Strategy:**

```bash
# 1. Rename framework README to preserve it
mv README.md docs/README.framework.md

# 2. Use AI Flow README as main (already linked to all docs)
# The README from ai-flow init already references:
# - ai-instructions.md
# - project-brief.md  
# - All specs/ and docs/ files
# Keep it as the main README.md (it's in .ai-flow/temp-backup/)

# 3. Copy back AI Flow README
cp .ai-flow/temp-backup/README.md .
```

**3.2 Merge package.json (if applicable):**

```bash
# For Node.js projects only:
# Framework created package.json with scripts, dependencies

# Strategy: Keep framework package.json, add AI Flow metadata
# Read both files and merge:
# - Keep framework: scripts, dependencies, devDependencies
# - Add from AI Flow backup: name, description, keywords, author
```

**3.3 Merge tsconfig.json/config files:**

```bash
# Keep framework configuration (optimized for the framework)
# AI Flow backup likely didn't have project-specific config anyway
```

**3.4 Merge .gitignore:**

```bash
# Combine both .gitignore files
cat .gitignore .ai-flow/temp-backup/.gitignore | sort -u > .gitignore.merged
mv .gitignore.merged .gitignore
```

**3.5 Clean up temp backup:**

```bash
# Remove temporary backup (already merged)
rm -rf .ai-flow/temp-backup
```

**Success Output:**

```
✅ Project initialized successfully!

📦 Framework: {{FRAMEWORK}} {{VERSION}}
📂 Files created: {{FILE_COUNT}} files
⏱️  Time: {{DURATION}}

Generated structure:
{{LIST_KEY_FILES}}

📋 Documentation merged:
   ✅ README.md (AI Flow - links to all docs)
   ✅ docs/README.framework.md (Framework reference)
   ✅ package.json (Framework + AI Flow metadata)
   ✅ .gitignore (Combined rules)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Next steps:
1. Review merged files (README.md is your main entry point)
2. Check docs/README.framework.md for framework-specific setup
3. Run /flow-project-roadmap to plan implementation
4. Start development with /feature commands
```

---

## Important Notes

**What this command DOES:**

- ✅ Runs the official framework CLI (npx, django-admin, dotnet new, etc.)
- ✅ Creates base project files in current directory
- ✅ Installs initial dependencies
- ✅ Sets up configuration files (tsconfig.json, package.json, etc.)

**What this command DOES NOT do:**

- ❌ Create custom folder structures (use /feature for that later)
- ❌ Implement Clean Architecture layers manually
- ❌ Create domain entities or use cases
- ❌ Set up database schemas
- ❌ Configure CI/CD pipelines

**Philosophy:**

This command provides a **clean slate** from the official tooling. The architecture, domain logic, and custom structure will be built incrementally using `/feature`, `/fix`, and `/work` commands following the patterns defined in your documentation.

---

**End of /flow-project-init workflow**

**Time:** 5-10 minutes total  
**Output:** Clean framework initialization in current directory  
**Next:** Run `/flow-project-roadmap` to generate implementation plan
