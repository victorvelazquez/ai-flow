# Getting Started with AI Flow

> Complete guide from installation to advanced workflows

## 📖 Table of Contents

- [Quick Links](#-quick-links) - For experienced users
- [Part 1: First-Time Setup](#-part-1-first-time-setup) - For beginners (10 minutes)
- [Part 2: Core Workflows](#-part-2-core-workflows) - For regular users
- [Part 3: Advanced Usage](#-part-3-advanced-usage) - For power users
- [Reference](#-reference) - Command index & troubleshooting

---

## 🎯 Quick Links

**Already familiar with AI Flow?** Jump directly to:

| Link                                          | Description                                                        |
| --------------------------------------------- | ------------------------------------------------------------------ |
| [Build Modes](#15-understanding-build-modes)  | Interactive vs Smart Auto-Suggest                                  |
| [CLI Flags Reference](#cli-flags-reference)   | All `init` command flags                                           |
| [Commands Cheat Sheet](#commands-cheat-sheet) | All 16+ commands organized                                         |
| [Workflow Commands](#33-workflow-commands)    | `/flow-work`, `/flow-check`, `/flow-commit` (unified orchestrator) |
| [Troubleshooting](#troubleshooting)           | Common issues and solutions                                        |
| [Best Practices](#best-practices)             | Expert tips and recommendations                                    |

---

## 🚀 Part 1: First-Time Setup

> **Target Audience:** Beginners, first-time users  
> **Time Required:** 10 minutes  
> **Goal:** Get AI Flow running and create your first AI-ready documentation

### 1.1 Prerequisites

Before starting, ensure you have:

- **Node.js:** 20.0.0 or higher ([Download](https://nodejs.org/))
- **npm:** Included with Node.js
- **An AI tool:** Claude, Cursor, GitHub Copilot, or Gemini

### 1.2 Installation

Install AI Flow globally via npm:

```bash
npm install -g ai-flow-dev
```

Or using uv (Python tool manager):

```bash
uv tool install ai-flow-dev
```

Verify installation:

```bash
ai-flow --version
# Output: 2.4.5
```

_Note: Package name is `ai-flow-dev`, but the CLI command remains `ai-flow`_

### 1.3 Your First Project (5-Minute Walkthrough)

Let's create your first AI-ready project step by step.

#### Step 1: Create Project Folder

```bash
mkdir my-awesome-api
cd my-awesome-api
```

#### Step 2: Initialize AI Flow

```bash
ai-flow init .
```

You'll be asked:

1. **Which AI tool will you use?**
   - Select: `claude`, `cursor`, `copilot`, `gemini`, `antigravity`, or `all`
   - This configures tool-specific files (`.clauderules`, `.cursorrules`, etc.)

2. **What type of project?**
   - Select: `backend`, `frontend`, `fullstack`, or `mobile`
   - Each type generates different documentation sets

3. **Project name?** (optional)
   - Press Enter to use folder name, or type custom name

**What happens next:**

- ✅ Creates `.ai-flow/` hidden folder
- ✅ Copies Master prompts to `.ai-flow/prompts/`
- ✅ Copies document templates to `.ai-flow/templates/`
- ✅ Installs slash commands (`.claude/commands/`, `.cursor/commands/`, `.agent/workflows/`, etc.)
- ✅ Creates configuration file `.ai-flow/core/config.json`

**Time:** ~30 seconds

#### Step 3: Run the Build Process

Open your AI tool (Claude, Cursor, Copilot, or Gemini) in your project folder and type:

```
/flow-build
```

**First, choose your mode:**

```
🚀 Welcome to AI Flow!

How would you like to proceed?

A) ⭐ Interactive Mode (Recommended)
   • You answer each question step-by-step
   • Full control over every decision
   • Takes 90-120 min for new projects, 35-70 min for existing
   • Best for: Custom requirements, specific needs

B) ⚡ Smart Auto-Suggest Mode
   • AI suggests best practices for most questions
   • You only answer 6 critical business questions
   • Takes 15-25 minutes
   • Best for: MVPs, standard projects, quick setup

Your choice (A/B): __
```

**Mode A - Interactive (8-phase questionnaire):**

- **Phase 0:** Context Discovery (existing projects only - analyzes your code)
- **Phase 1:** Discovery & Business (Smart Description Refinement: WHO, WHAT, WHY, DOMAIN)
- **Phase 2:** Data Architecture or Components (database design or UI components)
- **Phase 3:** System Architecture (tech stack, patterns)
- **Phase 4:** Security & Authentication (auth strategy, compliance)
- **Phase 5:** Code Standards (quality rules, conventions)
- **Phase 6:** Testing Strategy (test types, coverage)
- **Phase 7:** Operations & Deployment (CI/CD, monitoring)
- **Phase 8:** Project Setup & Final Documentation (framework init, AGENT.md, README.md)
- **Phase 9:** Implementation Roadmap (Optional - Story Points, Epics, Features)
- **Phase 10:** User Stories (Optional - Acceptance Criteria, Test Cases, DoD)

**Mode B - Smart Auto-Suggest (6 critical questions only):**

1. Project Name & Description
2. What problem does this solve?
3. Top 3 business objectives
4. System Type (E-commerce/SaaS/CRM/etc.)
5. Core entities/models
6. Backend framework

**Time:**

- **Interactive Mode:** 90-120 min (new), 35-70 min (existing)
- **Smart Auto-Suggest:** 15-25 minutes (any project type)

#### Step 4: Answer Questions

**If you chose Interactive Mode (A):**

The AI assistant will guide you through each phase with questions like:

```
---
📋 Phase 1: Discovery & Business  |  Question 1/8  |  Phase Progress: 12%
---
What core business problem does your API solve?

Examples:
- User authentication and authorization
- E-commerce product catalog management
- Real-time notifications system
- Payment processing gateway
```

**Tips:**

- ⭐🔥⚡🏆 markers indicate **recommended choices**
- The more detail you provide, the better your documentation
- For **existing projects**, many answers are pre-filled from code analysis
- You can always refine documentation later

**If you chose Smart Auto-Suggest Mode (B):**

You'll only answer 6 critical questions, then the AI will auto-suggest best practices for everything else:

```
⚡ Smart Auto-Suggest Mode  |  Question 1/6  |  Progress: 17%

1. What is the project name?
2. What problem does this solve? (2-3 sentences)
3. Top 3 measurable objectives?
4. System type? (E-commerce/SaaS/CRM/etc.)
5. Core entities? (User, Product, Order, etc.)
6. Backend framework? (NestJS/FastAPI/Spring Boot/etc.)
```

After answering, you'll see:

- ✅ **Quick Summary** (1 paragraph) - Fast overview
- 📋 **Extended Report** (organized by phase) - Detailed breakdown
- Choose to accept suggestions, customize, or switch to Interactive Mode

#### Step 5: Generated Documentation ✅

After completion, you'll have professional documentation:

**Backend projects** (14 documents):

```
my-awesome-api/
├── AGENT.md                    # ⭐ Universal AI configuration
├── .clauderules               # Claude-specific config
├── ai-instructions.md         # AI development rules
├── project-brief.md           # Business context
├── docs/
│   ├── architecture.md        # System design
│   ├── data-model.md          # Entity catalog
│   ├── code-standards.md      # Quality rules
│   ├── testing.md             # Test strategy
│   ├── operations.md          # Deployment
│   ├── business-flows.md      # Workflows
│   ├── api.md                 # API conventions
│   └── contributing.md        # Dev setup
├── specs/
│   ├── security.md           # Auth & compliance
│   └── configuration.md      # Environment config
└── README.md                 # Project overview
```

**Backend projects** (14 documents), **Frontend projects** (15 documents), **Mobile projects** (13 documents), **Fullstack projects** (4 documents) - see [Project Type Comparison](#project-type-comparison) for details.

#### Step 6: Phase 8 - Project Setup (Automatic)

**Phase 8 is now INTEGRATED** into `/flow-build` - it automatically runs after Phase 7!

**What Phase 8 does:**

1. 🔍 **Detects project state** - Checks if framework already initialized
2. 🚀 **Offers framework initialization** - For new projects, asks if you want to run framework CLI
3. 📝 **Generates final documentation:**
   - `docs/business-flows.md` - Business process flows with Mermaid diagrams
   - `docs/api.md` - Complete API reference (auto-generated from entities)
   - `docs/contributing.md` - Git workflow and contribution guidelines
4. 📖 **Creates AGENT.md** - Master documentation index (single source of truth for AI)
5. 📄 **Generates README.md** - Comprehensive project overview (merges with framework README if exists)
6. 🤖 **Creates AI tool configs** - `.clauderules`, `.cursorrules`, `.github/copilot-instructions.md`, `.antigravityrules`
7. 🗺️ **Offers Phase 9** - Optional: Generate implementation roadmap with Story Points

**Time:** 10-15 minutes (automated)

**Framework initialization:**

- If **new project**: Offers to run official CLI (NestJS, Django, FastAPI, etc.)
- If **existing project**: Skips initialization, generates docs only
- **Smart merge**: If framework creates README.md, merges it with AI Flow's comprehensive version

**Output after Phase 8:**

```
my-awesome-api/
├── AGENT.md              ⭐ Master index (start here!)
├── README.md             📄 Project overview
├── docs/
│   ├── business-flows.md
│   ├── api.md
│   └── contributing.md
├── specs/
│   ├── security.md
│   └── configuration.md
├── .clauderules         🤖 AI tool configs
├── .cursorrules
├── .antigravityrules
└── .ai-flow/            📦 Templates and prompts (internal)
```

**Note:** Framework initialization does NOT create your architecture layers - those are built incrementally with `/flow-dev-feature` commands.

#### Step 7: Phase 9 - Implementation Roadmap (Optional)

**Phase 9 is OPTIONAL** - offered at the end of Phase 8!

**What Phase 9 does:**

- ✅ Analyzes ALL documentation (entities, endpoints, flows, security)
- ✅ Defines Epics organized by domain
- ✅ Breaks down Features with Story Point estimations (Fibonacci scale: 1, 2, 3, 5, 8, 13, 21)
- ✅ Creates Task breakdown with dependencies
- ✅ Calculates time estimates (1 dev, 2 devs, 3 devs)
- ✅ Generates dependency graph (Mermaid)
- ✅ Identifies optimal execution order and parallelization opportunities
- ✅ Creates ready-to-execute `/flow-dev-feature` commands

**Time:** 15-30 minutes (automated)

**Output:** `planning/roadmap.md` with complete implementation plan (strategic level)

**When to use:**

- ✅ You want a high-level implementation plan before starting
- ✅ You need time/cost estimates for stakeholders
- ✅ You're working with a team and need task distribution
- ❌ Skip if you prefer to start coding immediately

---

#### Step 8: Phase 10 - User Stories Generation (Optional)

**Phase 10 is OPTIONAL** - requires Phase 9 (roadmap) to be completed!

**What Phase 10 does:**

- ✅ Reads planning/roadmap.md Features and converts them to detailed User Stories
- ✅ Generates Gherkin-style acceptance criteria (Given/When/Then)
- ✅ Creates technical task breakdown (Backend/Frontend/Testing)
- ✅ Derives QA test cases from acceptance criteria
- ✅ Adds Definition of Done checklist
- ✅ Links back to Epic and Feature

**Time:**

- All Epics: 30-60 minutes
- One Epic: 5-10 minutes
- One User Story: 2-3 minutes

**Output:** `planning/user-stories/EP-XXX/HU-XXX-XXX.md` files

**3 execution modes:**

```bash
# Generate all User Stories (or Sprint 1 selection)
/flow-build fase 10

# Generate User Stories for specific Epic
/flow-build fase 10 EP-001

# Generate/regenerate specific User Story
/flow-build fase 10 HU-001-001
```

**When to use:**

- ✅ You want detailed User Stories with acceptance criteria before coding
- ✅ You're working with QA and need test case specifications
- ✅ You follow Scrum/Agile with User Story format
- ❌ Skip if planning/roadmap.md is enough for your workflow

**Example User Story structure:**

```markdown
# 📖 Historia de Usuario: HU-001-001 - Login básico

## Epic

EP-001: Autenticación y Seguridad

## Historia de Usuario

**ID:** HU-001-001  
**Título:** Sistema de login básico con email y contraseña  
**Prioridad:** Alta (P0)  
**Sprint:** 1  
**Story Points:** 5 SP  
**Estimación:** 6-8h

**Como:** Usuario registrado  
**Quiero:** Iniciar sesión con email y contraseña  
**Para:** Acceder a mi cuenta de forma segura

---

## Criterios de Aceptación

### Escenario 1: Login exitoso

**Dado que** el usuario tiene credenciales válidas  
**Cuando** ingresa email y contraseña correctos  
**Entonces** recibe JWT token y accede al sistema

### Escenario 2: Credenciales inválidas

**Dado que** el usuario ingresa credenciales incorrectas  
**Cuando** intenta iniciar sesión  
**Entonces** recibe error 401 con mensaje claro

### Escenario 3: Rate limiting

**Dado que** el usuario falla login 5 veces en 15 minutos  
**Cuando** intenta login nuevamente  
**Entonces** recibe error 429 (Too Many Requests)

---

## Tareas Técnicas

### Backend

- [ ] **T-001-001:** Write User entity tests • 1 SP (~1-2h)
      File: tests/unit/User.spec.ts
      Dependencies: None

- [ ] **T-001-002:** Create User entity • 1 SP (~1-2h)
      File: src/domain/entities/User.ts
      Dependencies: T-001-001

### Testing

- [ ] **T-001-005:** Write integration tests • 2 SP (~3-4h)
      File: tests/integration/auth.spec.ts
      Dependencies: T-001-003

**Total Tasks:** 5  
**Total SP:** 5 Story Points

---

## Casos de Prueba (QA)

### TC-001-001: Login exitoso (Happy Path)

- **Precondición:** Usuario registrado con email=test@example.com, password=SecureP@ss123
- **Pasos:**
  1. POST /api/auth/login con credenciales válidas
  2. Verificar status 200
  3. Verificar JWT token en response
- **Resultado Esperado:** Token JWT válido con exp, user_id, role
- **Prioridad:** Alta
- **Tipo:** Funcional

### TC-001-002: Credenciales inválidas (Error Case)

- **Precondición:** Usuario registrado
- **Pasos:**
  1. POST /api/auth/login con password incorrecta
  2. Verificar status 401
- **Resultado Esperado:** {"error": "Invalid credentials"}
- **Prioridad:** Alta
- **Tipo:** Funcional

---

## Estimación

- **Story Points:** 5 SP (from roadmap)
- **Tiempo Estimado:** 6-8h
- **Complejidad:** Media

---

## Dependencias

- **Requiere:** Ninguna (feature foundational)
- **Bloquea:** HU-001-002 (OAuth login), HU-002-001 (User CRUD)

---

## Definición de Done (DoD)

- [ ] Código implementado siguiendo ai-instructions.md
- [ ] Code review aprobado (mín 1 revisor)
- [ ] Tests unitarios escritos (cobertura > 80%)
- [ ] Tests de integración pasando
- [ ] Casos de prueba QA ejecutados y aprobados (8/8)
- [ ] Documentación técnica actualizada (docs/api.md)
- [ ] Sin errores de lint ni formateo
- [ ] Deploy a staging exitoso
- [ ] Product Owner aprobó la funcionalidad
```

**Folder structure after Phase 10:**

```
planning/user-stories/
├── EP-001/              (Authentication)
│   ├── HU-001-001.md   (Login básico)
│   ├── HU-001-002.md   (OAuth login)
│   └── HU-001-003.md   (Password recovery)
└── EP-002/              (User Management)
    ├── HU-002-001.md   (CRUD usuarios)
    └── HU-002-002.md   (Perfiles y roles)
```

---

#### Step 9: Start Implementing with Workflows

**After completing Phase 8 (or optionally Phases 9-10), start building!**

**With roadmap only (Phase 9):**

```bash
# Use Feature names from planning/roadmap.md
/flow-dev-feature Base application configuration
```

**With User Stories (Phase 10):**

```bash
# Use User Story IDs for guided implementation
/flow-dev-feature HU-001-001

# AI agent will:
# 1. Read HU-001-001.md (acceptance criteria, tasks, test cases)
# 2. Implement code following DoD checklist
# 3. Generate tests from QA test cases
# 4. Verify all acceptance criteria met
```

**Key benefits:**

- ✅ **100% Coverage:** Every entity, endpoint, and requirement included
- ✅ **Realistic Estimates:** Based on complexity analysis, not guesswork
- ✅ **Optimal Order:** Dependencies analyzed, features sequenced correctly
- ✅ **Production Checklist:** 50+ items to verify before deployment

### 1.4 Understanding the Output

#### Key Files Explained

**`AGENT.md`** - Universal AI configuration file

- Acts as the **entry point** for all AI tools
- Aggregates and references all other documentation
- Contains quick reference for AI assistants
- Read this file to understand the entire project structure

**`ai-instructions.md`** - AI development rules

- Tech stack and dependencies
- NEVER/ALWAYS rules (what to avoid, what to enforce)
- Architecture patterns and conventions
- Project-specific guidelines

**`project-brief.md`** - Business context

- Problem statement and goals
- Target users and use cases
- Success metrics
- Project scope and constraints

**`docs/*.md`** - Technical documentation

- Detailed specs for each architectural concern
- Interconnected (they reference each other)
- Updated as project evolves

**`.ai-flow/`** - Tool foundation (hidden folder)

- `prompts/` - Master prompt files for build and workflows
- `templates/` - Document templates with placeholders
- `core/config.json` - build configuration metadata

### 1.5 Understanding Build Modes

AI Flow offers two modes to fit your workflow and time constraints.

#### Mode A: Interactive (Recommended for Custom Projects)

**Time:** 90-120 minutes (new projects) | 35-70 minutes (existing projects)
**Questions:** 71 total across 8 phases
**Control:** Full control over every decision

**Best for:**

- ✅ Custom requirements and specific needs
- ✅ Complex projects with unique architecture
- ✅ Teams that want to discuss every decision
- ✅ Learning about project architecture in depth

**Example flow:**

```

/flow-build → Mode A → Phase 1 (10 questions) → Phase 2 (7 questions) → ... → Phase 7 (11 questions)
→ Phase 8 (project setup + final docs) → Quick Summary + Extended Report → Documentation Generated

```

#### Mode B: Smart Auto-Suggest (Fast Setup)

**Time:** 15-25 minutes (any project type)
**Questions:** Only 6 critical business questions
**Control:** Review and customize AI suggestions

**Best for:**

- ⚡ MVPs and quick prototypes
- ⚡ Standard projects (E-commerce, SaaS, CRM)
- ⚡ Solo developers who want speed
- ⚡ Projects following industry best practices

**What the AI auto-suggests:**

Based on your 6 answers, the AI automatically suggests:

- Database and ORM (e.g., PostgreSQL + Prisma for Node.js)
- Architecture pattern (Clean Architecture)
- Security best practices (JWT auth, RBAC, password policies)
- Code standards (Prettier, ESLint, naming conventions)
- Testing strategy (Jest, 60-80% coverage)
- Deployment platform (Heroku for MVP, AWS for production)

**Example flow:**

```

/flow-build → Mode B → 6 critical questions → AI generates suggestions
→ Quick Summary + Extended Report → Review (Accept/Customize/Change Mode)
→ Documentation Generated

```

**Example Smart Auto-Suggest Summary:**

```

✅ Configuration Complete - Quick Summary

Your E-commerce backend will use NestJS (TypeScript 5.3) with PostgreSQL 15
and Prisma, following Clean Architecture with 8 entities (User, Product, Cart,
Order, Payment). Security includes JWT auth with RBAC, bcrypt passwords, and
rate limiting. Deployment to Heroku with Sentry for MVP.

📋 Extended Report available below with full details by phase.

Would you like to:
A) ✅ Accept all suggestions (Generate docs now)
B) 📝 Review & customize specific sections
C) ❌ Switch to Interactive Mode

```

#### Comparison Table

| Feature     | Interactive Mode | Smart Auto-Suggest   |
| ----------- | ---------------- | -------------------- |
| Time        | 90-120 min (new) | 15-25 min            |
| Phases      | 8-11 Phases      | 6 Critical Questions |
| Description | Smart Refinement | Smart Refinement     |
| Control     | Full control     | Review & customize   |
| Learning    | Deep dive        | Quick overview       |
| Flexibility | Maximum          | High (can customize) |

#### Using Slash Commands

After initialization, you have access to **16+ slash commands**:

**Basic commands:**

```

/flow-build # Run full process (choose mode)
/flow-build fase 1 # Run only Phase 1
/flow-docs-sync # Update docs when code changes

```

**Workflow commands** (all project types):

```

/flow-work   # Unified orchestrator: Features/Refactors/Fixes with smart detection
/flow-check  # Combined validation: Tests + Code Review
/flow-commit # Automate commits with Conventional Commits (3-5 min)

```

> **Automatic Completion Tracking:** When you complete work with `/flow-work`, the system automatically updates `planning/roadmap.md` (marks Feature checkboxes) and `planning/user-stories/` files (marks DoD checklist items). This keeps your documentation synchronized with actual implementation progress.

> **Consolidated Planning:** `/flow-work` generates a single consolidated `work.md` file (~30-40 lines) that includes context, objectives, documentation constraints, approach, tasks, and validation. This reduces context window usage and makes it easier to review and resume work.

**Generated Project Structure:**

After running `/flow-build`, your project will have:

- `docs/` - Descriptive documentation (architecture, data-model, api, testing)
- `specs/` - Technical specifications (security.md, configuration.md)
- `planning/` - Requirements (roadmap.md, user-stories/)
- `.ai-flow/` - Workflow state (work/, archive/analytics.jsonl) - can be gitignored
  - `.ai-flow/cache/` - Analysis cache (docs-analysis.json, audit-data.json)

> **Cache Location:**
>
> - In **your projects**: `.ai-flow/cache/` stores analysis data
> - In **AI Flow repo**: `cache/` at root (for self-analysis only)

## See [Commands Cheat Sheet](#commands-cheat-sheet) for the complete list.

## 📚 Part 2: Core Workflows

> **Target Audience:** Regular users, project maintainers
> **Goal:** Master everyday AI Flow workflows

### 1.4 Agent Mode: Proactive Execution 🚀

Starting with v2.2.3, AI Flow enforces **Agent Mode** across all workflows. This means:

- **No more planning loops:** Assistants won't ask "Would you like me to start Step 1?". They will just do it.
- **Tool-First:** Assistants are strictly instructed to use tools (`read_file`, `write_file`, `run_command`) immediately.
- **Workflow-Driven:** The interaction is driven by our master prompts, ensuring the AI stays on track without human micro-management.

---

### Part 2: Working with Existing Projects 🔍

AI Flow adapts to your project state with **3-layer smart detection**.

#### New Projects: Full Build

For brand-new projects, AI Flow guides you through all phases with no assumptions:

- ✅ You answer every question from scratch
- ✅ You design architecture, data models, and standards
- ✅ Time: **90-120 minutes** for production-ready docs
- ✅ Generates: 13-17 documents depending on project type

**Best for:** Greenfield projects, MVPs, new microservices

#### Existing Projects: Smart Detection

For existing codebases, AI Flow analyzes your project first (**Phase 0: Context Discovery**):

**Layer 0: Cache Check (2-5 seconds)**

- Checks `.ai-flow/cache/docs-analysis.json` for previous analysis
- Detects file changes by comparing timestamps
- **Result:** 0 seconds on re-runs if nothing changed

**Layer 1: Fast Metadata Scan (10-20 seconds)**

- Detects language from `package.json`, `composer.json`, `pom.xml`, `go.mod`, etc.
- Identifies framework and version (60+ frameworks supported)
- Detects ORM and database (35+ ORMs supported)
- Scans for existing documentation files
- **Uses:** ~1,500 tokens

**Layer 2: Structural Analysis (30-90 seconds)**

- Analyzes directory structure and patterns
- Counts files by category (controllers, services, entities)
- Detects architecture pattern (feature-based, layer-based, modular)
- Extracts entity names from schema files
- Estimates test coverage
- **Uses:** ~4,000 tokens

**Layer 3: Selective Deep Analysis (1-5 minutes, optional)**

- **User-controlled:** Choose which areas to analyze deeply
- Parses code to extract API endpoints with methods/paths
- Maps entity relationships and fields
- Detects security patterns (auth, validation)
- **Smart sampling:** Stratified file selection
- **Uses:** Variable tokens (stops before limits)

**Benefits:**

- ⚡ **50-94% faster** setup time
- 💾 **50-94% less tokens** used (saves API costs)
- 📝 **40-60% of answers pre-filled** from code analysis
- 🔄 **Instant re-runs** with intelligent caching

**Time:** 35-70 minutes vs 90-120 for new projects

**Example detection output:**

```

🔍 ANALYSIS COMPLETE

✅ Language: Node.js/TypeScript 18.x
✅ Framework: NestJS 10.3.0
✅ ORM: Prisma 5.7.0
✅ Database: PostgreSQL
✅ Architecture: Feature-based (modular)
✅ Entities detected: 8 (User, Product, Order, Payment, etc.)
✅ API endpoints: 24 routes across 6 controllers
✅ Security: JWT auth, class-validator, helmet
✅ Testing: Jest, 67% coverage
✅ Documentation: README.md only (needs expansion)

📝 Pre-populated answers: 47/82 (57%)
⏱️ Estimated time: 42 minutes (vs 95 minutes from scratch)

```

### 2.2 Running the Build Process

#### Full Build Command

The `/flow-build` command orchestrates all 8 phases:

```

/flow-build

```

**For new projects:**

- Starts directly at Phase 1 (Discovery & Business)
- Walks through all phases sequentially
- 90-120 minutes total

**For existing projects:**

- Starts with Phase 0 (Context Discovery)
- Analyzes code first (3-layer detection)
- Pre-fills answers based on analysis
- 35-70 minutes total

#### Individual Phase Commands

You can also run phases individually:

**Backend projects:**

```

/flow-build fase 0 # Context discovery (existing only)
/flow-build fase 1 # Discovery & Business
/flow-build fase 2 # Data Architecture
/flow-build fase 3 # System Architecture
/flow-build fase 4 # Security & Auth
/flow-build fase 5 # Code Standards
/flow-build fase 6 # Testing Strategy
/flow-build fase 7 # Operations & Deployment
/flow-build fase 8 # Project Setup & Final Docs
/flow-build fase 9 # Implementation Roadmap (optional)
/flow-build fase 10 # User Stories (optional)

```

**Frontend projects:**

```

/flow-build fase 0 # Context discovery
/flow-build fase 1 # Discovery & UX
/flow-build fase 2 # Components & Framework
/flow-build fase 3 # State Management
/flow-build fase 4 # Styling & Design
/flow-build fase 5 # Code Standards
/flow-build fase 6 # Testing Strategy
/flow-build fase 7 # Deployment

```

**Mobile projects:**

```

/flow-build fase 0 # Context discovery
/flow-build fase 1 # Platform & Framework
/flow-build fase 2 # Navigation & Architecture
/flow-build fase 3 # State & Data Management
/flow-build fase 4 # Permissions & Native Features
/flow-build fase 5 # Code Standards
/flow-build fase 6 # Testing Strategy
/flow-build fase 7 # Deployment

```

**When to use individual phases:**

- 🔄 Update specific documentation area (e.g., security policies changed)
- 🚀 Onboard new team members to one aspect (e.g., testing strategy)
- 🎯 Deep dive into complex phase (e.g., data architecture for large schemas)

### 2.3 Working with Different AI Tools

AI Flow supports 5 AI tools with tool-specific configurations.

#### Claude Code

**Setup:**

```bash
ai-flow init . --ai claude
```

**Generated files:**

- `.clauderules` - Claude-specific configuration
- `.claude/commands/*.md` - Slash commands (26+ commands)
- `AGENT.md` - Universal config (referenced by `.clauderules`)

**Features:**

- ✅ Plan mode optimized workflow
- ✅ Structured task execution
- ✅ Long-form code generation

**Usage:**

```
/flow-build                    # In Claude chat
/flow-dev-feature "real-time notifications"
/flow-dev-review
```

#### Cursor

**Setup:**

```bash
ai-flow init . --ai cursor
```

**Generated files:**

- `.cursorrules` - Cursor-specific configuration
- `.cursor/commands/*.md` - Slash commands
- `AGENT.md` - Universal config

**Features:**

- ✅ Fast iteration support
- ✅ Inline code editing
- ✅ Multi-file refactoring

**Usage:**

```
/flow-build                    # In Cursor chat
Ctrl+K → /flow-dev-feature "user authentication"
```

#### GitHub Copilot

**Setup:**

```bash
ai-flow init . --ai copilot
```

**Generated files:**

- `.github/copilot-instructions.md` - Copilot workspace instructions
- `.github/prompts/*.prompt.md` - Slash commands (Copilot format)
- `AGENT.md` - Universal config

**Features:**

- ✅ Copilot workspace instructions integration
- ✅ GitHub workflow integration
- ✅ Inline suggestions

**Usage:**

```
/flow-build                    # In Copilot chat (or GitHub Web)
/flow-dev-feature "payment processing"
```

#### Gemini

**Setup:**

```bash
ai-flow init . --ai gemini
```

**Generated files:**

- `.gemini/commands/*.md` - Slash commands
- `AGENT.md` - Universal config

**Features:**

- ✅ AI-optimized documentation structure
- ✅ Google AI workflow integration
- ✅ Multi-modal support

**Usage:**

```
/flow-build
/flow-dev-work resume feature-notifications
```

#### Antigravity

**Setup:**

```bash
ai-flow init . --ai antigravity
```

**Generated files:**

- `.antigravityrules` - Antigravity-specific configuration
- `.agent/workflows/*.md` - Slash commands (workflow format)
- `AGENT.md` - Universal config

**Features:**

- ✅ Workflow-based automation
- ✅ Agentic task execution
- ✅ Multi-step command chains

**Usage:**

```
/flow-build                    # In Antigravity chat
/flow-dev-feature "notification system"
```

#### All AI Tools (Maximum Compatibility)

```bash
ai-flow init . --ai all
```

Sets up configuration for **all 5 AI tools** simultaneously. Perfect for:

- 🤝 Teams using different AI tools
- 🔄 Experimenting with multiple tools
- 📦 Open-source projects with diverse contributors

### 2.4 Understanding Generated Documentation

The number and type of documents varies by project type.

#### Backend Projects (17 documents)

**Core Documents (4):**

- `AGENT.md` - Universal AI config, aggregator
- `ai-instructions.md` - Tech stack, NEVER/ALWAYS rules
- `project-brief.md` - Business context, objectives
- `README.md` - Project overview, setup

**Technical Docs (8):**

- `docs/architecture.md` - System architecture, design patterns
- `docs/data-model.md` - Entity catalog, ownership rules, relationships
- `docs/code-standards.md` - Naming conventions, quality rules
- `docs/testing.md` - Testing strategy, coverage requirements
- `docs/operations.md` - Deployment, monitoring, runbooks
- `docs/business-flows.md` - Business workflows, process diagrams
- `docs/api.md` - API conventions, CRUD endpoints, contracts
- `docs/contributing.md` - Development setup, workflow

**Specifications (2):**

- `specs/security.md` - Authentication, authorization, compliance
- `specs/configuration.md` - Environment variables, external services

**Configuration (4):**

- `.env.example` - Environment variable template
- Tool-specific configs (`.clauderules`, `.cursorrules`, `copilot-instructions.md`, `.antigravityrules`)

#### Frontend Projects (15 documents)

**Core Documents (4):**

- `AGENT.md`, `ai-instructions.md`, `project-brief.md`, `README.md`

**Technical Docs (9):**

- `docs/components.md` - Component architecture and patterns
- `docs/state-management.md` - State patterns (Redux, Zustand, Context, etc.)
- `docs/styling.md` - Styling guidelines, design system
- `docs/api-integration.md` - API client, data fetching patterns
- `docs/testing.md` - Testing strategy (unit, integration, e2e)
- `docs/operations.md` - Build, deployment, performance
- `docs/error-handling.md` - Error strategy
- `docs/pwa.md` - PWA configuration
- `docs/performance.md` - Performance optimization

**Specifications (3):**

- `specs/configuration.md` - Environment config
- `specs/accessibility.md` - A11y requirements
- `specs/security.md` - Security specs

#### Mobile Projects (13 documents)

**Core Documents (4):**

- `AGENT.md`, `ai-instructions.md`, `project-brief.md`, `README.md`

**Technical Docs (8):**

- `docs/architecture.md` - App architecture patterns
- `docs/navigation.md` - Navigation structure (React Navigation, etc.)
- `docs/state-management.md` - State patterns
- `docs/offline-strategy.md` - Offline sync, caching
- `docs/permissions.md` - Runtime permissions handling
- `docs/native-features.md` - Native modules integration
- `docs/testing.md` - Testing strategy
- `docs/app-store.md` - App store configuration

**Specifications (2):**

- `specs/build-configuration.md` - Build configs, CI/CD
- `specs/deployment.md` - Deployment procedures

#### Fullstack Projects (4 documents)

Combines backend + frontend documentation with fullstack-specific templates for shared files.

**Core Documents (4):**

- Combined tech stack in `ai-instructions.md`
- Combined business context in `project-brief.md`
- Unified `AGENT.md` and `README.md`

**Specifications (1):**

- `specs/configuration.md` - Environment config

**Backend + Frontend Docs:**

- All backend technical docs (8 files)
- All frontend technical docs (5 files)
- Shared specifications (2 files)
- Combined `.env.example`

#### Document Interconnections

All documents reference each other for consistency:

```
AGENT.md
├── References: ai-instructions.md, project-brief.md
├── Links to: docs/*, specs/*
│
ai-instructions.md
├── Imports patterns from: docs/code-standards.md
├── References: docs/architecture.md, docs/testing.md
│
docs/api.md
├── Uses entities from: docs/data-model.md
├── Follows patterns from: docs/architecture.md
├── Security rules from: specs/security.md
│
docs/testing.md
├── Aligns with: docs/code-standards.md
├── Tests entities from: docs/data-model.md
```

## **Result:** Changing one document triggers relevant updates in others.

## ⚡ Part 3: Advanced Usage

> **Target Audience:** Power users, team leads  
> **Goal:** Leverage advanced features and optimize workflows

### 3.1 CLI Flags Reference

The `ai-flow init` command accepts multiple flags for automation and customization.

#### Complete Flags Table

| Flag                   | Type    | Required | Description              | Example                    |
| ---------------------- | ------- | -------- | ------------------------ | -------------------------- |
| `--ai <tool>`          | String  | Yes\*    | AI tool selection        | `--ai claude`              |
| `--type <type>`        | String  | No       | Project type             | `--type backend`           |
| `--name <name>`        | String  | No       | Project name             | `--name "My API"`          |
| `--description <desc>` | String  | No       | Project description      | `--description "REST API"` |
| `--verbose`            | Boolean | No       | Enable detailed logging  | `--verbose`                |
| `--dry-run`            | Boolean | No       | Simulate without writing | `--dry-run`                |

\* If omitted, CLI will prompt interactively.

#### Flag Values

**`--ai` values:**

- `claude` - Claude Code only
- `cursor` - Cursor only
- `copilot` - GitHub Copilot only
- `gemini` - Gemini only
- `all` - All tools (maximum compatibility)

**`--type` values:**

- `backend` - Backend API/Service (17 docs)
- `frontend` - Frontend Application (12 docs)
- `mobile` - Mobile Application (15 docs)
- `fullstack` - Fullstack Application (~20 docs)

#### Usage Examples

**Basic initialization:**

```bash
# Interactive (prompts for missing values)
ai-flow init .

# Specify AI tool only
ai-flow init . --ai claude

# Specify AI tool and project type
ai-flow init . --ai cursor --type backend
```

**Full automation (no prompts):**

```bash
ai-flow init . \
  --ai copilot \
  --type backend \
  --name "Payment API" \
  --description "Stripe integration service"
```

**Debugging and testing:**

```bash
# Verbose logging (see all internal operations)
ai-flow init . --ai claude --verbose

# Dry run (simulate without creating files)
ai-flow init . --ai all --dry-run

# Combine both
ai-flow init . --ai gemini --verbose --dry-run
```

**Different directories:**

```bash
# Relative paths
ai-flow init ../my-project --ai claude
ai-flow init ./backend --ai cursor --type backend

# Absolute paths
ai-flow init /absolute/path/to/project --ai copilot --type fullstack
```

**CI/CD integration:**

```bash
# GitHub Actions example
- name: Initialize AI Flow
  run: |
    npm install -g ai-flow
    ai-flow init . --ai copilot --type backend --name "${{ github.event.repository.name }}"
```

### 3.2 Individual Phase Commands

Run specific Build Phases independently for targeted updates.

#### When to Use Individual Phases

**Scenario 1: Update specific documentation**

```
# Security policies changed
/flow-build fase 4

# New testing requirements
/flow-build fase 6
```

**Scenario 2: Onboard team members**

```
# New backend developer joins
/flow-build fase 3
/flow-build fase 5

# New DevOps engineer joins
/flow-build fase 7
```

**Scenario 3: Deep dive into complex areas**

```
# Large data model redesign
/flow-build fase 2

# Architecture refactoring
/flow-build fase 3
```

#### Phase Command Reference

**All project types:**

```
/flow-build fase 0          # Context Discovery (existing projects)
```

**Backend-specific:**

```
/flow-build fase 1         # Discovery & Business (15-20 min)
/flow-build fase 2             # Data Architecture (15-20 min)
/flow-build fase 3     # System Architecture (15-20 min)
/flow-build fase 4         # Security & Auth (15-20 min)
/flow-build fase 5        # Code Standards (15-20 min)
/flow-build fase 6          # Testing Strategy (15-25 min)
/flow-build fase 7       # Operations & Deployment (10 min)
/flow-build fase 8                  # Project Setup & Final Docs (10-15 min)
```

**Frontend-specific:**

```
/flow-build fase 1        # Discovery & UX
/flow-build fase 2       # Components & Framework
/flow-build fase 3            # State Management
/flow-build fase 4          # Styling & Design
/flow-build fase 5        # Code Standards
/flow-build fase 6          # Testing Strategy
/flow-build fase 7       # Deployment
/flow-build fase 8                  # Project Setup & Final Docs (10-15 min)
```

**Mobile-specific:**

```
/flow-build fase 1         # Platform & Framework
/flow-build fase 2       # Navigation & Architecture
/flow-build fase 3            # State & Data Management
/flow-build fase 4      # Permissions & Native Features
/flow-build fase 5        # Code Standards
/flow-build fase 6          # Testing Strategy
/flow-build fase 7       # Deployment
/flow-build fase 8                  # Project Setup & Final Docs (10-15 min)
```

#### Phase Dependencies

Some phases depend on others. Recommended order:

```
Phase 0 (Context Discovery) → Always run first for existing projects
    ↓
Phase 1 (Business/Discovery) → Defines goals and scope
    ↓
Phase 2 (Data/Components) → Defines entities or UI building blocks
    ↓
Phase 3 (Architecture) → System design (depends on Phase 2)
    ↓
Phase 4 (Security/Styling) → Security rules or design system
    ↓
Phase 5 (Standards) → Code quality rules
    ↓
Phase 6 (Testing) → Test strategy (depends on Phases 2-5)
    ↓
Phase 7 (Operations/Deployment) → CI/CD (depends on all previous)
    ↓
Phase 8 (Project Setup & Final Docs) → Framework init, AGENT.md, README.md
    ↓
Phase 9 (Implementation Roadmap) → Optional (Backend only) - Story Points, Epics, Features
    ↓
Phase 10 (User Stories) → Optional (Backend only, requires Phase 9) - Acceptance Criteria, Test Cases
```

**Example: Updating only architecture and testing**

```bash
# 1. Update architecture decisions
/flow-build fase 3

# 2. Update testing to match new architecture
/flow-build fase 6

# 3. Update operations for new deployment pattern
/flow-build fase 7

# 4. Regenerate final docs and README
/flow-build fase 8
```

### 3.3 Workflow Commands

**Backend projects only** - Structured workflows for feature development, bug fixes, code review, and refactoring.

#### 3.3.1 `/flow-dev-feature` - Feature Development

**Time:** 15-20 minutes  
**Purpose:** Create new features, modify existing ones, or refactor code with full specification and planning.

**Usage Modes:**

```bash
/flow-dev-feature                      # Interactive (asks: new/change/refactor)
/flow-dev-feature new                  # New feature from scratch
/flow-dev-feature change               # Modify existing feature
/flow-dev-feature refactor             # Refactor existing code

# With User Story ID (requires Phase 10):
/flow-dev-feature HU-001-001           # Implement specific User Story
/flow-dev-feature HU-002-003           # AI reads acceptance criteria, tasks, test cases
```

**Workflow:**

1. **Spec Creation** - Define feature requirements
   - User stories and acceptance criteria (or read from HU-XXX-XXX.md)
   - API contracts and data structures
   - Dependencies and risks

2. **Planning** - Break down into tasks
   - Technical approach
   - Step-by-step implementation plan
   - Testing strategy (or use test cases from User Story)

3. **Implementation** - Execute tasks
   - Write code following specs
   - Add tests for each task (validates acceptance criteria)
   - Update documentation

4. **Auto-Archive** - Save work history
   - Moves to `.ai-flow/archive/`
   - Updates relevant documentation
   - Preserves context for future reference

**Generated Structure:**

```
.ai-flow/flow-dev-work/flow-dev-feature-[name]/
├── spec.md           # Feature specification
├── plan.md           # Implementation plan
└── tasks.md          # Task checklist
```

**Example:**

```
/flow-dev-feature new

[AI] What feature would you like to build?

User: Real-time notifications API with WebSocket support

[AI creates spec.md with requirements]
[AI creates plan.md with 8 tasks]
[AI implements tasks one by one]
[AI writes tests for each task]
[AI updates docs/api.md and docs/architecture.md]
[AI archives to .ai-flow/archive/flow-dev-feature-notifications/]

✅ Feature complete: Real-time notifications API
📝 Documentation updated: docs/api.md, docs/architecture.md
🧪 Tests added: 12 test cases, 98% coverage
⏱️ Time: 18 minutes
```

#### 3.3.2 `/flow-dev-fix` - Bug Fixes

**Time:** 3-15 minutes (adaptive)  
**Purpose:** Fix bugs with automatic complexity detection and appropriate workflow.

**Usage:**

```bash
/flow-dev-fix                          # Interactive (describe the bug)
/flow-dev-fix "Login returns 500 when email not found"
```

**Adaptive Workflow:**

The command **automatically detects complexity** and adjusts:

**Simple bugs (3-5 minutes):**

- Single file, single function
- Clear root cause
- No architecture changes

**Workflow:**

1. Locate bug
2. Quick fix
3. Add test case
4. Done

**Complex bugs (10-15 minutes):**

- Multiple files or layers
- Unclear root cause
- Requires investigation

**Workflow:**

1. Deep analysis
2. Root cause identification
3. Comprehensive fix
4. Multiple test cases
5. Documentation update

**Example (Simple):**

```
/flow-dev-fix "Validation allows empty email"

[AI] Analyzing bug...
🔍 Complexity: Simple (single validator function)
⏱️ Estimated time: 3 minutes

[AI locates validator in src/validators/user.validator.ts]
[AI fixes validation rule]
[AI adds test case]

✅ Fixed: src/validators/user.validator.ts
🧪 Test added: src/validators/__tests__/user.validator.test.ts
⏱️ Actual time: 4 minutes
```

**Example (Complex):**

```
/flow-dev-fix "Race condition in payment processing"

[AI] Analyzing bug...
🔍 Complexity: Complex (concurrency, multi-layer)
⏱️ Estimated time: 12 minutes

[AI investigates payment flow across 4 files]
[AI identifies race condition in transaction handling]
[AI implements pessimistic locking]
[AI adds integration test with concurrent requests]
[AI updates docs/architecture.md with concurrency notes]

✅ Fixed: 4 files across service + repository layers
🧪 Tests added: 3 unit tests, 1 integration test
📝 Updated: docs/architecture.md
⏱️ Actual time: 14 minutes
```

#### 3.3.3 `/flow-dev-commit` - Commit Automation

**Time:** 3-5 minutes  
**Purpose:** Automatically analyze changes, group them intelligently, and create atomic commits following Conventional Commits standard.

**Usage:**

```bash
/flow-dev-commit                       # Full auto workflow (detect → group → commit → push)
```

**Workflow (4 Automatic Steps):**

**Step 1: Detect Changes (Automatic)**

- Scans all staged and unstaged changes
- Analyzes file types and patterns
- No user confirmation needed

**Step 2: Intelligent Grouping (Automatic)**

Groups files by functional relationship:

- **Feature Complete** - Entity + Service + Controller + Tests + Docs
- **Refactoring** - Helper + Tests + Files using it
- **Configuration** - Docker, env, CI/CD files
- **Tests/Docs** - Only if independent from features

**Step 3: Generate Commits (Requires Allow per commit)**

Creates commits following Conventional Commits:

```
<type>(<scope>): <description>

Types: feat, fix, docs, style, refactor, perf, test, chore, ci
Scope: Detected dynamically (users, products, auth, core, etc.)
Description: Imperative mood, English, max 72 chars
```

**Step 4: Finalize**

- Shows `git log` automatically
- Prepares `git push` (requires Allow)

**Key Features:**

- ✅ **Framework-agnostic** - Works with any backend stack (NestJS, Django, Go, ASP.NET, etc.)
- ✅ **Dynamic scopes** - Detects entity/module names from project structure
- ✅ **Atomic commits** - One logical change per commit
- ✅ **Zero friction** - No menus or prompts (except git command confirmations)
- ✅ **Dependency detection** - Groups related files automatically

**Example (NestJS):**

```
/flow-dev-commit
---
🔍 Step 1/4: Detecting Changes
---
✅ Changes detected:
- Source code: 8 files
- Tests: 3 files
- Documentation: 1 file
---
⚡ Step 2/4: Intelligent Grouping
---
📦 Group 1: Feature Complete
   Type: feat
   Scope: products
   Description: implement product management with CRUD operations
   Files (7):
   ✓ src/modules/products/entities/product.entity.ts
   ✓ src/modules/products/dto/create-product.dto.ts
   ✓ src/modules/products/products.service.ts
   ✓ src/modules/products/products.controller.ts
   ✓ src/modules/products/__tests__/products.service.spec.ts
   ✓ docs/api.md

📦 Group 2: Configuration
   Type: chore
   Scope: docker
   Description: update database connection settings
   Files (2):
   ✓ docker-compose.yml
   ✓ .env.template
---
✅ Step 3/4: Creating Commits
---
Commit 1/2: Feature Complete

git add src/modules/products/entities/product.entity.ts ... && git commit -m "feat(products): implement product management with CRUD operations"

Click "Allow" to execute →

✅ Commit created: feat(products): implement product management with CRUD operations

Commit 2/2: Configuration

git add docker-compose.yml .env.template && git commit -m "chore(docker): update database connection settings"

Click "Allow" to execute →

✅ Commit created: chore(docker): update database connection settings
---
🚀 Step 4/4: Summary & Push
---
✅ 2 commits created following Conventional Commits

📋 Commit History:
* a3b4c5d feat(products): implement product management with CRUD operations
* f6g7h8i chore(docker): update database connection settings

🚀 Ready to push to remote

git push origin main

Click "Allow" to execute →

⏱️ Total time: 4 minutes
```

**Example (Multi-Framework Support):**

```
// Django/Python
apps/products/models.py
apps/products/serializers.py
apps/products/views.py
→ Commit: feat(products): add product CRUD endpoints

// Go
internal/domain/product.go
internal/service/product_service.go
internal/handler/product_handler.go
→ Commit: feat(products): implement product management

// ASP.NET Core/C#
Domain/Entities/Product.cs
Application/Services/ProductService.cs
API/Controllers/ProductController.cs
→ Commit: feat(products): implement product management system
```

**Grouping Intelligence:**

The command automatically detects:

1. **Entity relationships** - Finds service, controller, DTOs for an entity
2. **Dependencies** - Groups helper with files that import it
3. **Test coverage** - Includes tests in feature commits
4. **Documentation** - Includes related docs in feature commits
5. **Configuration** - Separates config changes from features

**When to use:**

- ✅ After completing a feature
- ✅ After fixing multiple bugs
- ✅ Before creating a pull request
- ✅ When you have multiple unrelated changes
- ✅ To maintain clean commit history

**Benefits:**

- 🎯 **Consistent commit messages** across team
- 📊 **Better changelog generation** with conventional commits
- 🔍 **Easier code review** with atomic commits
- 📚 **Clear project history** with descriptive messages
- ⚡ **Time saved** - No manual grouping or message writing

#### 3.3.4 `/flow-dev-work` - Work Management

**Purpose:** Manage work in progress, resume interrupted tasks, archive completed work.

**Subcommands:**

```bash
/flow-dev-work                         # List active tasks with progress
/flow-dev-work show [name]            # Show task details
/flow-dev-work resume [name]          # Resume interrupted work
/flow-dev-work archive [name]         # Archive completed work and update docs
```

**Structure:**

```
.ai-flow/
├── work/                    # Active work
│   ├── feature-notifications/
│   ├── feature-auth/
│   └── fix-payment-bug/
└── archive/
    └── analytics.jsonl      # Completed work history (1 line per task)
```

**Example: List Active Work**

```
/flow-dev-work

📋 ACTIVE WORK:

1. feature-notifications
   Status: In Progress (Task 5/8)
   Started: 2h ago
   Files: 12 modified

2. feature-auth
   Status: Planning
   Started: 1 day ago
   Files: 3 modified

3. fix-payment-bug
   Status: In Progress (Task 2/3)
   Started: 45 min ago
   Files: 4 modified
```

**Example: Resume Work**

```
/flow-dev-work resume feature-notifications

📂 RESUMING: feature-notifications

✅ Completed tasks (4):
  [x] Create WebSocket server module
  [x] Implement connection management
  [x] Add authentication middleware
  [x] Create notification queue

⏳ Current task (5/8):
  [ ] Implement room-based broadcasting

📝 Context loaded from: .ai-flow/flow-dev-work/flow-dev-feature-notifications/
📄 Files in progress: 12
🎯 Next step: Complete broadcasting logic

Ready to continue! What would you like me to do?
```

**Example: Completed Work History**

When work is finalized, metadata is logged to `.ai-flow/archive/analytics.jsonl`:

```jsonl
{"task":"user-auth","type":"feature","src":"HU-001-002","dur":125,"start":"2025-01-05T10:00:00-03:00","end":"2025-01-05T12:05:00-03:00","tasks":8,"sp":5,"commits":3,"valid":true}
{"task":"fix-login-bug","type":"fix","src":"manual","dur":22,"start":"2025-01-05T14:30:00-03:00","end":"2025-01-05T14:52:00-03:00","tasks":2,"commits":1,"valid":true}
{"task":"refactor-auth-service","type":"refactor","src":"roadmap-2.3","dur":180,"start":"2025-01-05T15:00:00-03:00","end":"2025-01-05T18:00:00-03:00","tasks":12,"sp":8,"commits":5,"valid":true}
```

**Fields:** `task` (name), `type` (feature/fix/refactor), `src` (source), `dur` (duration in minutes), `start`/`end` (timestamps), `tasks` (total), `sp` (Story Points), `commits` (count), `valid` (tests passed).

> **Note:** This file enables future analytics commands like `/flow-stats` to calculate velocity, average duration, and success rates.

#### 3.3.5 `/flow-dev-review` - Code Review

**Time:** 5 minutes  
**Purpose:** Professional multi-aspect code review with prioritized findings.

**Usage:**

```bash
/flow-dev-review                       # Review current uncommitted changes
/flow-dev-review feature-[name]       # Review specific feature work
/flow-dev-review --full               # Review entire codebase
```

**Analysis Perspectives (5):**

1. **🔒 Security**
   - SQL injection, XSS, CSRF vulnerabilities
   - Authentication/authorization issues
   - Secrets in code
   - Input validation gaps

2. **⚡ Performance**
   - N+1 query problems
   - Missing database indexes
   - Memory leaks
   - Inefficient algorithms

3. **🧪 Testing**
   - Test coverage gaps
   - Missing edge cases
   - Untested error paths
   - Integration test needs

4. **📐 Architecture**
   - SOLID principles violations
   - DRY violations
   - High coupling
   - Poor separation of concerns

5. **🎨 Code Quality**
   - Naming conventions
   - Code complexity
   - Documentation gaps
   - Code smells

**Prioritized Report:**

```
/flow-dev-review

🔍 CODE REVIEW REPORT
---
🔴 CRITICAL ISSUES (Fix Immediately)
---
🔒 SECURITY - SQL Injection Risk
File: src/repositories/user.repository.ts:45
Issue: Raw SQL with string interpolation
Fix: Use parameterized queries

⚡ PERFORMANCE - N+1 Query Problem
File: src/services/order.service.ts:78
Issue: Loading relations in loop (100+ queries)
Fix: Use eager loading or batch fetching
---
🟡 WARNINGS (Should Fix Soon)
---
🧪 TESTING - Missing Edge Case Tests
File: src/validators/email.validator.ts
Issue: No tests for invalid formats
Fix: Add test cases for edge cases

📐 ARCHITECTURE - Service Layer Violation
File: src/controllers/payment.controller.ts:23
Issue: Direct database access from controller
Fix: Move logic to service layer
---
🟢 SUGGESTIONS (Nice to Have)
---
🎨 CODE QUALITY - Complex Function
File: src/utils/price-calculator.ts:15
Issue: Cyclomatic complexity: 12 (threshold: 10)
Suggestion: Extract helper functions

🎨 CODE QUALITY - Magic Numbers
File: src/services/subscription.service.ts:34
Issue: Hard-coded 30, 90, 365 days
Suggestion: Use named constants
---
📊 SUMMARY
---
Files reviewed: 8
Critical issues: 2 🔴
Warnings: 2 🟡
Suggestions: 2 🟢

Overall score: 7/10 (Good, but fix critical issues)

⏱️ Review time: 5 minutes
```

#### 3.3.6 `/flow-dev-refactor` - Quick Refactorings

**Time:** 3-5 minutes  
**Purpose:** Small refactorings without the overhead of full feature workflow.

**When to use:**

- ✅ Extract methods/functions
- ✅ Rename variables/classes
- ✅ Move logic between layers
- ✅ Extract to utility modules
- ✅ Simplify complex conditionals
- ❌ Large architectural changes (use `/flow-dev-feature refactor`)

**vs `/flow-dev-feature refactor`:**

| Aspect        | `/flow-dev-refactor` | `/flow-dev-feature refactor` |
| ------------- | -------------------- | ---------------------------- |
| Time          | 3-5 min              | 15-20 min                    |
| Spec required | ❌ No                | ✅ Yes                       |
| Plan required | ❌ No                | ✅ Yes                       |
| Documentation | Auto-update          | Full rewrite                 |
| Best for      | Small changes        | Architectural changes        |

**Usage:**

```bash
/flow-dev-refactor "Extract validation logic to utility"
/flow-dev-refactor "Rename getUserById to findUserById"
/flow-dev-refactor "Move email sending to service layer"
```

**Example:**

```
/flow-dev-refactor "Extract price calculation to utility"

[AI] Analyzing target code...
🎯 Target: src/services/order.service.ts (calculateTotal method)
📊 Complexity: Medium (45 lines, 3 nested ifs)
⏱️ Estimated: 4 minutes

[AI creates src/utils/price-calculator.ts]
[AI extracts calculation logic]
[AI updates order.service.ts to use utility]
[AI adds unit tests for price-calculator.ts]

✅ REFACTORING COMPLETE

Files changed:
  - Created: src/utils/price-calculator.ts (67 lines)
  - Modified: src/services/order.service.ts (-42, +8 lines)
  - Created: src/utils/__tests__/price-calculator.test.ts (45 lines)

Benefits:
  ✅ Reduced complexity: 45 → 8 lines in service
  ✅ Reusable utility function
  ✅ Better test coverage (isolated logic)

⏱️ Actual time: 4 minutes
```

### 3.4 Documentation Updates

Keep documentation synchronized with code changes using `/flow-docs-sync`.

#### Command: `/flow-docs-sync`

**Purpose:** Detect code changes and automatically update affected documentation.

**How it works:**

1. Compares current code with last documented state (`.ai-flow/cache/docs-analysis.json`)
2. Detects changes based on project type
3. Shows report of documents needing updates
4. Asks for confirmation
5. Updates documents incrementally

**Changes detected:**

**Backend:**

- API endpoints (new routes, changed methods)
- Database entities (new fields, relationships)
- Dependencies (new packages)
- Architecture patterns (structural changes)
- Configuration (new environment variables)

**Frontend:**

- Components (new components, prop changes)
- State management (new stores, hooks)
- Styling approach (design tokens changes)
- Dependencies (new packages)
- Architecture (structural changes)

**Mobile:**

- Screens (new screens, navigation changes)
- Permissions (new runtime permissions)
- Native features (new native modules)
- Build configuration (new build settings)
- Dependencies (new packages)

**Usage:**

```bash
# For backend, frontend, or mobile projects
/flow-docs-sync

# For fullstack projects (separate commands)
/backend-docs-update
/frontend-docs-update
```

**Example (Backend):**

```
/flow-docs-sync

🔍 ANALYZING CODE CHANGES...

Last analysis: 2 days ago (Dec 2, 2025)
Files changed: 47
New files: 8
---
📊 CHANGES DETECTED
---
🔴 Documents requiring updates (4):

1. docs/api.md
   - 3 new endpoints (POST /notifications, GET /notifications/:id, DELETE /notifications/:id)
   - 1 endpoint modified (PUT /users/:id now accepts 'preferences' field)

2. docs/data-model.md
   - New entity: Notification (6 fields)
   - Modified entity: User (added 'preferences' JSONB field)
   - New relationship: User.notifications (OneToMany)

3. docs/architecture.md
   - New module: NotificationModule
   - New service: WebSocketGateway
   - Modified: Added event-driven architecture notes

4. specs/configuration.md
   - 4 new environment variables (REDIS_URL, WEBSOCKET_PORT, etc.)
---
¿Actualizar todos los documentos detectados? (Y/N)

> Y

⏳ Updating documentation...

✅ docs/api.md updated
   - Added 3 new endpoints
   - Updated 1 endpoint documentation

✅ docs/data-model.md updated
   - Added Notification entity
   - Updated User entity
   - Added relationship diagram

✅ docs/architecture.md updated
   - Added NotificationModule to system diagram
   - Added WebSocket communication section
   - Updated event flow diagram

✅ specs/configuration.md updated
   - Added 4 new environment variables with descriptions

✅ .ai-flow/cache/docs-analysis.json updated
   - Saved new baseline for future comparisons
---
✅ DOCUMENTATION UPDATE COMPLETE
---
Documents updated: 4
Lines added: 127
Lines modified: 43
Time: 6 minutes

💡 Tip: Run /flow-docs-sync weekly to keep docs synchronized!
```

**When to run:**

- ⚡ **After major features** - New endpoints, entities, or modules
- 🔄 **Weekly/monthly** - Catch incremental drift
- 📝 **Before releases** - Ensure docs match production code
- 👥 **When onboarding** - Verify docs reflect current state

### 3.5 Project Scopes

AI Flow adapts documentation depth to your project maturity needs.

#### Scope Comparison

| Aspect              | MVP (Basic Tests) | Production-Ready   | Enterprise           |
| ------------------- | ----------------- | ------------------ | -------------------- |
| **Time (New)**      | 50-70 min         | 90-120 min         | 120-150 min          |
| **Time (Existing)** | 25-40 min         | 35-70 min          | 50-90 min            |
| **Testing**         | Basic unit tests  | Unit + integration | Full test pyramid    |
| **Documentation**   | Essential docs    | Comprehensive      | + Compliance         |
| **Security**        | Basic auth        | Full security      | + Audit trails       |
| **Operations**      | Simple deploy     | CI/CD pipeline     | + Monitoring         |
| **Best For**        | Prototypes, MVPs  | Production apps    | Enterprise/regulated |

#### MVP Scope (Basic Tests)

**Goal:** Get to market fast with essential quality

**Includes:**

- ✅ Basic architecture documentation
- ✅ Essential API/component docs
- ✅ Unit tests (60%+ coverage)
- ✅ Basic authentication
- ✅ Simple deployment guide
- ⚠️ No integration tests
- ⚠️ No comprehensive monitoring

**Time:** 50-70 min (new) / 25-40 min (existing)

**When to choose:**

- 🚀 Prototypes and proof of concepts
- 💡 Testing market fit
- 🏃 Speed is critical
- 👥 Small team (<5 people)

#### Production-Ready Scope

**Goal:** Robust production system with confidence

**Includes:**

- ✅ Comprehensive architecture docs
- ✅ Full API/component documentation
- ✅ Unit tests (80%+ coverage)
- ✅ Integration tests (key flows)
- ✅ Full authentication + authorization
- ✅ CI/CD pipeline
- ✅ Basic monitoring
- ⚠️ No compliance documentation

**Time:** 90-120 min (new) / 35-70 min (existing)

**When to choose:**

- 🎯 Production applications
- 👥 Growing teams (5-20 people)
- 💼 Business-critical systems
- 🔄 Need maintainability

#### Enterprise Scope

**Goal:** Enterprise-grade with compliance and audit

**Includes:**

- ✅ Full test pyramid (unit + integration + e2e)
- ✅ 90%+ test coverage
- ✅ Complete compliance documentation
- ✅ Security audit trails
- ✅ Comprehensive monitoring + alerting
- ✅ Disaster recovery plans
- ✅ Performance benchmarks
- ✅ Multi-environment strategy

**Time:** 120-150 min (new) / 50-90 min (existing)

**When to choose:**

- 🏢 Enterprise organizations
- 📋 Regulated industries (finance, healthcare)
- 🔐 Security-critical systems
- 👥 Large teams (20+ people)
- 🌍 Multi-region deployments

#### Changing Scope Later

You can upgrade scope after initial build:

```bash
# Initially chose MVP, now need Production-Ready
/flow-build fase 6    # Expand testing strategy
/flow-build fase 7 # Add CI/CD and monitoring

# Upgrading to Enterprise
/flow-build fase 4   # Add compliance docs
/flow-build fase 6   # Add e2e tests
/flow-build fase 7   # Add disaster recovery
```

---

## 📖 Reference

### Commands Cheat Sheet

Complete list of all available commands organized by category.

#### CLI Commands (2)

```bash
ai-flow init [path] [options]   # Initialize project
ai-flow check                    # Verify initialization
ai-flow --version               # Show version (2.4.5)
ai-flow --help                  # Show help
```

#### Build Commands - Backend (2)

```
/flow-build                      # Flujo completo (9 fases en orden)
/flow-build fase N               # Fase específica (0-9)
```

#### Build Commands - Frontend (9)

```
/flow-build                           # Full 8-phase process
/flow-build fase 0           # Context discovery
/flow-build fase 1         # Discovery & UX
/flow-build fase 2        # Components & Framework
/flow-build fase 3             # State Management
/flow-build fase 4           # Styling & Design
/flow-build fase 5         # Code Standards
/flow-build fase 6           # Testing Strategy
/flow-build fase 7        # Deployment
```

#### Build Commands - Mobile (9)

```
/flow-build                           # Full 8-phase process
/flow-build fase 0           # Context discovery
/flow-build fase 1          # Platform & Framework
/flow-build fase 2        # Navigation & Architecture
/flow-build fase 3             # State & Data Management
/flow-build fase 4       # Permissions & Native Features
/flow-build fase 5         # Code Standards
/flow-build fase 6           # Testing Strategy
/flow-build fase 7        # Deployment
```

#### Workflow Commands - Backend Only (5)

```
/flow-dev-feature [new|change|refactor]      # Feature development (15-20 min)
/flow-dev-fix                                 # Bug fixes (3-15 min, adaptive)
/flow-dev-work [show|resume|archive]         # Work management
/flow-dev-review [--full]                    # Multi-aspect code review (5 min)
/flow-dev-refactor                     # Quick refactorings (3-5 min)
```

#### Documentation Update Commands (3)

```
/flow-docs-sync                         # Backend/Frontend/Mobile
/backend-docs-update                # Fullstack: backend only
/frontend-docs-update               # Fullstack: frontend only
```

**Total Commands:** 25+ (varies by project type)

### Project Type Comparison

| Feature                 | Backend        | Frontend       | Mobile       | Fullstack   |
| ----------------------- | -------------- | -------------- | ------------ | ----------- |
| **Documents Generated** | 17             | 15             | 13           | ~20         |
| **Build Phases**        | 8 (0-8)        | 8 (0-8)        | 8 (0-8)      | 16 (both)   |
| **Workflow Commands**   | ✅ 5           | ❌ None        | ❌ None      | ✅ 5        |
| **Context Detection**   | ✅ 3-layer     | ✅ 3-layer     | ✅ 3-layer   | ✅ 3-layer  |
| **Languages Supported** | 12             | JavaScript/TS  | Native/Cross | Both        |
| **Frameworks Detected** | 60+            | 10+            | 8+           | 60+         |
| **Time (New)**          | 90-120 min     | 80-100 min     | 90-110 min   | 150-200 min |
| **Time (Existing)**     | 35-70 min      | 30-50 min      | 35-60 min    | 60-100 min  |
| **Best For**            | APIs, Services | Web Apps, SPAs | iOS, Android | Full Apps   |

### CLI Flags Reference

| Flag            | Type    | Required | Values                                                        | Description                    |
| --------------- | ------- | -------- | ------------------------------------------------------------- | ------------------------------ |
| `--ai`          | String  | Yes\*    | `claude`, `cursor`, `copilot`, `gemini`, `antigravity`, `all` | AI tool selection              |
| `--type`        | String  | No       | `backend`, `frontend`, `mobile`, `fullstack`                  | Project type                   |
| `--name`        | String  | No       | Any string                                                    | Project name                   |
| `--description` | String  | No       | Any string                                                    | Project description            |
| `--verbose`     | Boolean | No       | -                                                             | Enable detailed logging        |
| `--dry-run`     | Boolean | No       | -                                                             | Simulate without writing files |

\* If omitted, CLI prompts interactively.

### Supported Languages & Frameworks

**Languages (12):** Node.js/TypeScript, Python, PHP, Java, C#/.NET, Go, Ruby, Kotlin, Rust, Elixir, Scala, Swift

**Frameworks (60+):** NestJS, Express, Fastify, Django, FastAPI, Laravel, Spring Boot, ASP.NET Core, Gin, Rails, and 50+ more

**ORMs (35+):** Prisma, TypeORM, Sequelize, SQLAlchemy, Eloquent, Hibernate, Entity Framework, GORM, and 27+ more

**Market Coverage:** ~98%

See [README.md](README.md#-supported-languages--frameworks) for complete tables.

### Troubleshooting

#### Node.js Version Error

**Error:** `Error: Node.js version must be >=20.0.0`

**Solution:**

```bash
# Check current version
node --version

# Install Node.js 20+ from https://nodejs.org/
# Or use nvm:
nvm install 20
nvm use 20
```

#### Insufficient Permissions

**Error:** `EACCES: permission denied, mkdir '.ai-flow'`

**Solution:**

```bash
# Check folder permissions
ls -la

# Fix permissions (Unix/macOS)
chmod 755 .

# Or run with correct user (avoid sudo)
```

#### Slash Commands Not Working

**Problem:** `/flow-build` command not recognized in AI tool

**Solution:**

1. **Verify initialization:**

   ```bash
   ai-flow check
   ```

2. **Check command files exist:**

   ```bash
   # For Claude
   ls .claude/commands/

   # For Antigravity
   ls .agent/workflows/
   ```

   # For Cursor

   ls .cursor/commands/

   # For Copilot

   ls .github/prompts/

   ```

   ```

3. **Reinstall slash commands:**

   ```bash
   ai-flow init . --ai [your-tool]
   ```

4. **Manual invocation:**
   ```
   Read .ai-flow/prompts/backend/flow-build.md and execute
   ```

#### AI Tool Not Detecting Config

**Problem:** Claude/Cursor not reading `.clauderules` or `.cursorrules`

**Solution:**

1. **Verify file exists:**

   ```bash
   ls -a | grep -E '\.(claude|cursor)rules'
   ```

2. **Check file content:**

   ```bash
   cat .clauderules
   # Should reference AGENT.md
   ```

3. **Restart AI tool** - Config files loaded at startup

4. **Force reload:**
   - Claude: Create new project
   - Cursor: Reload window (Cmd/Ctrl + R)
   - Copilot: Reload VS Code

#### Documentation Not Generated

**Problem:** `/flow-build` completes but files missing

**Solution:**

1. **Check AI tool permissions:**
   - Verify AI can write files in project directory
   - Check for file system restrictions

2. **Verify templates exist:**

   ```bash
   ls .ai-flow/templates/
   ```

3. **Run with verbose logging:**

   ```bash
   ai-flow init . --verbose
   ```

4. **Check AI tool output** for error messages

#### docs-analysis.json Issues

**Problem:** `/flow-docs-sync` says "no changes" but code changed

**Solution:**

1. **Delete analysis cache:**

   ```bash
   rm .ai-flow/cache/docs-analysis.json
   ```

2. **Run docs-update again:**

   ```
   /flow-docs-sync
   ```

3. **Force full re-analysis:**
   ```
   /flow-build fase 0
   ```

### Best Practices

#### Before Build

1. ✅ **Have a clear problem statement** - Understand what you're building
2. ✅ **Know your tech stack** - Framework, database, deployment target
3. ✅ **Understand your users** - Who will use the product?
4. ✅ **Choose appropriate scope** - MVP vs Production-Ready vs Enterprise
5. ✅ **Set aside time** - Block 90-120 min (new) or 35-70 min (existing)
6. ✅ **Gather requirements** - Business goals, constraints, compliance needs

#### During Build

1. ✅ **Take your time** - Don't rush through questions
2. ✅ **Be specific** - More detail = better documentation
3. ✅ **Use recommendations** - ⭐🔥⚡🏆 markers guide best choices
4. ✅ **Confirm each phase** - Review before moving to next phase
5. ✅ **Save progress** - Work saved automatically in `.ai-flow/flow-dev-work/`
6. ✅ **Ask for clarification** - AI can explain terms or options

#### After Build

1. ✅ **Review all documents** - Read generated docs thoroughly
2. ✅ **Customize as needed** - Templates are starting points, not final
3. ✅ **Share with team** - Share `AGENT.md` and `README.md` with developers
4. ✅ **Update regularly** - Run `/flow-docs-sync` weekly or after major changes
5. ✅ **Archive completed work** - Use `/flow-dev-work archive` to maintain history
6. ✅ **Leverage workflows** - Use `/flow-dev-feature`, `/flow-dev-fix`, `/flow-dev-review` for daily work

#### Team Collaboration

1. ✅ **Commit `.ai-flow/`** to version control - Team needs templates
2. ✅ **Commit generated docs** - Share knowledge across team
3. ✅ **Update docs in PRs** - Use `/flow-docs-sync` before merging
4. ✅ **Use same AI tool** - Or use `--ai all` for compatibility
5. ✅ **Review together** - Use `/flow-dev-review` for pair programming

#### Documentation Maintenance

1. ✅ **Weekly updates** - Run `/flow-docs-sync` to catch drift
2. ✅ **Version documentation** - Tag docs with releases
3. ✅ **Link from code** - Reference docs in comments
4. ✅ **Update on architecture changes** - Re-run relevant phases
5. ✅ **Keep AGENT.md current** - It's the single source of truth
6. ✅ **Archive old work** - Move completed features to archive

#### Performance Optimization

1. ✅ **Use caching** - Let Layer 0 cache work (don't delete `docs-analysis.json`)
2. ✅ **Selective deep analysis** - Choose Layer 3 targets wisely
3. ✅ **Incremental updates** - Use individual phase commands
4. ✅ **Quick refactors** - Use `/flow-dev-refactor` for small changes
5. ✅ **Review regularly** - Catch issues early with `/flow-dev-review`

---

## 🎓 Learning Resources

- **[README.md](README.md)** - Project overview, features, installation
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - Contribution guidelines
- **[GitHub Issues](https://github.com/victorvelazquez/ai-flow/issues)** - Support and bug reports
- **[GitHub Discussions](https://github.com/victorvelazquez/ai-flow/discussions)** - Community Q&A

---

## 💡 Tips for Success

### Quick Wins

1. **Start with existing projects** - See 50-94% time savings immediately
2. **Use workflow commands** - `/flow-dev-feature`, `/flow-dev-fix`, `/flow-dev-review` save 60-70% time
3. **Leverage caching** - Re-run `/flow-docs-sync` in 0 seconds with no changes
4. **Choose right scope** - MVP for speed, Enterprise for compliance

### Common Mistakes to Avoid

1. ❌ **Rushing through questions** - Take time, provide details
2. ❌ **Ignoring recommendations** - ⭐🔥⚡🏆 markers are research-backed
3. ❌ **Not updating docs** - Code evolves, docs should too
4. ❌ **Deleting `.ai-flow/`** - You lose templates and workflows
5. ❌ **Skipping Phase 0** - Context detection saves 50-60% time

### Power User Shortcuts

```bash
# Automated initialization
ai-flow init . --ai all --type backend --name "My API" --description "REST API" --verbose

# Quick feature iteration
/flow-dev-feature new → Build → /flow-dev-review → /flow-dev-work archive

# Emergency bug fix
/flow-dev-fix "Critical bug description" → Test → Deploy

# Weekly maintenance
/flow-docs-sync → Review changes → Commit

# Team onboarding
/flow-build-phase-3-architecture → Share with new dev
```

---

**🚀 Ready to transform your development workflow with AI Flow!**

For questions or support, visit [GitHub Issues](https://github.com/victorvelazquez/ai-flow/issues).
