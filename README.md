# AI Bootstrap

[![CI Status](https://github.com/victorvelazquez/ai-bootstrap/actions/workflows/nodejs.yml/badge.svg?branch=main)](https://github.com/victorvelazquez/ai-bootstrap/actions/workflows/nodejs.yml)

## English

Transform your idea into a production-ready, AI-documented project (backend, frontend, fullstack, or mobile) in minutes.

AI Bootstrap is an interactive CLI that generates comprehensive professional documents for backend, frontend, fullstack, and mobile projects (new or existing), guiding users (or AI agents) through 8 phases (7 core phases + Phase 0 context discovery): business, architecture, security, standards, testing, and operations. Compatible with Claude, Copilot, Cursor, Gemini, and any AI assistant.

- 🚀 Complete, interconnected documentation
- 🌍 Universal Support - 12 languages, 60+ frameworks, 35+ ORMs (98% market coverage!)
- 🤖 Multi-AI support and slash commands
- ⚡ Easy installation and usage
- 🔍 Smart 3-layer detection for existing projects (50-94% faster!)
- 🛡️ Quality, security, and best practices by default
- ⏱️ Save 10-20 hours per project

Quick Start:

```bash
npm install -g ai-bootstrap
ai-bootstrap init .
```

Open your favorite AI tool (Claude, Copilot, Cursor, Gemini, etc.) and type the command `/bootstrap` as a message or slash command.
This will start an interactive questionnaire: when finished, you will have all your project's professional, connected documentation generated automatically in minutes.

---

## Español

Transforma tu idea en un proyecto listo para producción y documentado para IA en minutos (backend, frontend, fullstack o mobile).

AI Bootstrap es un CLI interactivo que genera documentos profesionales completos para proyectos backend, frontend, fullstack y mobile (nuevos o existentes), guiando al usuario (o agente AI) por 8 fases (7 fases principales + Fase 0 descubrimiento de contexto): negocio, arquitectura, seguridad, estándares, testing y operaciones. Compatible con Claude, Copilot, Cursor, Gemini y cualquier asistente AI.

- 🚀 Documentación completa y conectada
- 🌍 Soporte Universal - 12 lenguajes, 60+ frameworks, 35+ ORMs (¡98% cobertura!)
- 🤖 Soporte multi-AI y comandos slash
- ⚡ Instalación y uso en 2 pasos
- 🔍 Detección inteligente en 3 capas para proyectos existentes (50-94% más rápido!)
- 🛡️ Calidad, seguridad y buenas prácticas garantizadas
- ⏱️ Ahorra 10-20 horas por proyecto

Guía rápida:

```bash
npm install -g ai-bootstrap
ai-bootstrap init .
```

Abre tu herramienta AI favorita (Claude, Copilot, Cursor, Gemini, etc.) y escribe el comando `/bootstrap` como mensaje o slash command.
Esto iniciará un cuestionario interactivo: al finalizar, tendrás toda la documentación profesional y conectada de tu proyecto generada automáticamente en minutos.

---

## Português

Transforme sua ideia em um backend pronto para produção e documentado para IA em minutos.

AI Bootstrap é uma CLI interativa que gera 15 documentos profissionais para projetos backend (novos ou existentes), guiando o usuário (ou agente de IA) por 7 fases-chave: negócios, arquitetura, segurança, padrões, testes e operações. Compatível com Claude, Copilot, Cursor, Gemini e qualquer assistente de IA.

- 🚀 Documentação completa e interconectada
- 🌍 Suporte Universal - 12 linguagens, 60+ frameworks, 35+ ORMs (98% cobertura!)
- 🤖 Suporte multi-IA e comandos slash
- ⚡ Instalação e uso em 2 passos
- 🔍 Detecção inteligente em 3 camadas para projetos existentes (50-94% mais rápido!)
- 🛡️ Qualidade, segurança e melhores práticas garantidas
- ⏱️ Economize 10-20 horas por projeto

Guia rápido:

```bash
npm install -g ai-bootstrap
ai-bootstrap init .
```

Abra sua ferramenta de IA favorita (Claude, Copilot, Cursor, Gemini, etc.) e digite o comando `/bootstrap` como mensagem ou slash command.
Isso iniciará um questionário interativo: ao finalizar, toda a documentação profissional e conectada do seu backend será gerada automaticamente em minutos.

---

## 🎯 What is AI Bootstrap?

AI Bootstrap is an interactive CLI tool that generates comprehensive professional documentation files for your project (backend, frontend, fullstack, or mobile) through a guided 8-phase questionnaire (7 core phases + Phase 0 context discovery). It creates the foundation for AI-assisted development with any AI tool (Claude, Copilot, Cursor, Gemini, etc.).

**The Problem:** Starting a new backend project requires hours of documentation setup. Existing projects often lack proper AI-ready documentation. Without proper docs, AI assistants work inefficiently and make inconsistent decisions.

**The Solution:**

- **New Projects:** AI Bootstrap asks you the right questions and generates professional documentation from scratch.
- **Existing Projects:** AI Bootstrap analyzes your code, README, and configs to pre-populate answers, saving 50-60% of time.

The result is interconnected documentation that guides AI assistants (and human developers) throughout your project lifecycle.

---

## ✨ Features

- 🌍 **Universal Language Support** - 12 languages (Node.js, Python, PHP, Java, C#, Go, Ruby, Kotlin, Rust, Elixir, Scala, Swift)
- 🔧 **60+ Frameworks Detected** - NestJS, Express, Laravel, Spring Boot, Django, FastAPI, and 54+ more
- 🗄️ **35+ ORMs Supported** - Prisma, TypeORM, Eloquent, Hibernate, Entity Framework, GORM, and 29+ more
- 📊 **98% Market Coverage** - Works with virtually any backend stack
- 🤖 **AI-Agnostic** - Works with Claude, Copilot, Cursor, Gemini, any AI tool
- 📚 **15 Professional Documents** - Complete documentation architecture
- ⚡ **3-Layer Smart Detection** - Layer 1 (15s), Layer 2 (60s), Layer 3 (optional deep analysis)
- 🔍 **Intelligent Caching** - Instant re-runs with change detection (0 seconds on unchanged projects)
- 🎯 **Flexible Scope Selection** - MVP with basic tests (50-70 min), Production-Ready (90-120 min), or Enterprise (120-150 min)
- 📋 **AGENT.md Standard** - Universal AI configuration file
- 💡 **Slash Commands** - Easy execution with `/bootstrap`
- 🎓 **Educational** - Learn best practices while building
- ⏱️ **Time Efficient** - Adapts to your needs, from quick MVP to comprehensive enterprise docs
- 💾 **50-94% Less Context** - Optimized token usage saves API costs

---

## 📋 Prerequisites

- **Node.js:** 18.0.0 or higher ([Download](https://nodejs.org/))
- **npm:** Included with Node.js

---

## 📦 Installation

### npm (Global)

```bash
npm install -g ai-bootstrap
```

### uv (Python Tool Manager)

```bash
uv tool install ai-bootstrap
```

**Versión actual:** 1.1.1

**Archivos publicados en npm:**

- dist/
- prompts/
- templates/
- README.md
- LICENSE

---

## 🚀 Quick Start

### 1. Create Your Project Folder

```bash
mkdir my-awesome-api
cd my-awesome-api
```

### 2. Initialize AI Bootstrap

```bash
ai-bootstrap init .
```

**This will:**

- Ask you which AI tool you'll use (Claude/Cursor/Copilot/Gemini/All)
- Ask for project type (Backend API/Service, Frontend Application, Fullstack Application, or Mobile Application)
- Ask for project name (inferred from directory, press Enter to accept)
- Create `.ai-bootstrap/` hidden folder with templates
- Copy master prompts and templates
- Install slash commands for your AI tool
- Set up the foundation (takes ~30 seconds)

**Or specify project type directly:**

```bash
# For backend projects
ai-bootstrap init . --type backend

# For frontend projects
ai-bootstrap init . --type frontend

# For fullstack projects
ai-bootstrap init . --type fullstack

# For mobile projects
ai-bootstrap init . --type mobile
```

### 3. Run the Bootstrap Process

**Option A: Using Slash Command (Recommended)**

Open your AI tool and run:

```
/bootstrap
```

**Option B: Manual**

Tell your AI assistant:

```
# For backend projects
Read .ai-bootstrap/prompts/backend/bootstrap.md and execute the 7-phase questionnaire

# For frontend projects
Read .ai-bootstrap/prompts/frontend/bootstrap.md and execute the 7-phase questionnaire

# For mobile projects
Read .ai-bootstrap/prompts/mobile/bootstrap.md and execute the 7-phase questionnaire
```

## 🛠️ CLI Commands

### Command: `init`

Initialize a new project with AI-ready documentation.

**Syntax:**

```bash
ai-bootstrap init [path] [options]
```

**Arguments:**

- `[path]` - Target directory (defaults to current directory `.`)

### CLI Flags

| Flag                 | Type     | Descripción                                                            |
| -------------------- | -------- | ---------------------------------------------------------------------- |
| --ai <tool>          | REQUIRED | Selecciona la herramienta de IA (claude, cursor, copilot, gemini, all) |
| --type <type>        | Optional | Tipo de proyecto (backend, frontend, fullstack, mobile)                |
| --name <name>        | Optional | Nombre del proyecto (omite prompt interactivo)                         |
| --description <desc> | Optional | Descripción del proyecto (omite prompt interactivo)                    |
| --verbose            | Optional | Activa logging detallado                                               |
| --dry-run            | Optional | Simula sin escribir archivos                                           |

> Requiere Node.js >=18.0.0 para ejecutar todos los comandos.

### Ejemplos de uso

```bash
# Inicializar con herramienta de IA y tipo de proyecto
ai-bootstrap init . --ai claude --type backend

# Inicializar con nombre y descripción personalizados
ai-bootstrap init . --name "Mi API" --description "API para gestión de usuarios"

# Simular sin crear archivos
ai-bootstrap init . --dry-run

# Activar logging detallado
ai-bootstrap init . --verbose

# Usar todos los flags juntos
ai-bootstrap init ./my-project --ai copilot --type fullstack --name "Mi App" --description "App completa" --verbose

# Inicializar en directorios específicos
ai-bootstrap init ../another-project --ai claude --type backend
ai-bootstrap init /absolute/path/to/project --ai cursor --type frontend
```

### Command: `check`

Verify if your project is properly initialized with AI Bootstrap.

**Syntax:**

```bash
ai-bootstrap check
```

### Getting Help

View the CLI help and version information:

```bash
# Show help and available commands
ai-bootstrap

# Show version
ai-bootstrap --version

# Show help for specific command
ai-bootstrap init --help
```

---

### 4. Answer Questions

**For Existing Projects:**
The AI will first analyze your project (Phase 0) and pre-populate answers from:

- AI instruction files (copilot-instructions.md, .clauderules, AGENT.md, etc.)
- README.md, package.json, and code structure
- Detected frameworks, entities, and dependencies

You'll only answer what's missing or needs confirmation. **Time: 35-70 minutes** (50-60% faster!)

**For New Projects:**
The AI will guide you through 8 phases:

0. **Context Discovery** (optional, existing projects only) - Analyze existing code and docs
1. **Discovery & Business** (15-20 min) - What problem are you solving?
2. **Data Architecture** (15-20 min) - Database design and entities
3. **System Architecture** (15-20 min) - Tech stack and patterns
4. **Security & Authentication** (15-20 min) - Authentication and compliance
5. **Code Standards** (15-20 min) - Quality rules and conventions
6. **Testing Strategy** (15-25 min) - Testing strategy and coverage (all scopes include tests)
7. **Operations & Deployment** (10 min) - Deployment and monitoring

**Time: 90-120 minutes**

### 5. Generated Documents ✅

After completion, you'll have comprehensive documentation ready (number varies by project type):

```
my-awesome-api/
├── AGENT.md                    # Universal AI config
├── .clauderules               # Claude-specific (if selected)
├── .cursorrules               # Cursor-specific (if selected)
├── ai-instructions.md         # AI development rules
├── project-brief.md           # Business context
├── docs/
│   ├── architecture.md        # System architecture
│   ├── data-model.md          # Entity catalog & data contracts
│   ├── code-standards.md      # Code quality rules
│   ├── testing.md             # Testing strategy
│   ├── operations.md          # Deployment procedures
│   ├── business-flows.md      # Core workflows & diagrams
│   ├── api.md                 # API conventions & endpoints
│   └── contributing.md        # Contribution guidelines
├── specs/
│   ├── security.md           # Security policies
│   └── configuration.md      # Environment config
├── README.md                 # Project overview
└── .env.example              # Environment variables
```

---

## 🎯 Generated Documentation

The number and type of documents generated depends on your project type:

### Backend Projects (16 documents)

**Core Documents (4):**

- `AGENT.md` - Universal AI configuration, aggregator
- `ai-instructions.md` - Tech stack, NEVER/ALWAYS rules
- `project-brief.md` - Business context, objectives, scope
- `README.md` - Project overview, setup instructions

**Technical Docs (9):**

- `docs/architecture.md` - System architecture, design patterns
- `docs/data-model.md` - Detailed entity catalog, ownership rules
- `docs/code-standards.md` - Naming conventions, quality rules
- `docs/testing.md` - Testing strategy, coverage requirements
- `docs/operations.md` - Deployment, monitoring, runbooks
- `docs/business-flows.md` - Business workflows, process diagrams
- `docs/api.md` - API conventions, CRUD endpoints, contracts
- `docs/contributing.md` - Development setup, workflow

**Specifications (2):**

- `specs/security.md` - Authentication, authorization, compliance
- `specs/configuration.md` - Environment variables, external services

**Configuration (1):**

- `.env.example` - Environment variable template

### Frontend Projects (11 documents)

**Core Documents (4):**

- `AGENT.md` - Universal AI configuration, aggregator
- `ai-instructions.md` - Tech stack, NEVER/ALWAYS rules
- `project-brief.md` - Business context, objectives, scope
- `README.md` - Project overview, setup instructions

**Technical Docs (6):**

- `docs/architecture.md` - System architecture, design patterns
- `docs/components.md` - Component architecture and patterns
- `docs/state-management.md` - State management patterns
- `docs/styling.md` - Styling guidelines and design system
- `docs/testing.md` - Testing strategy, coverage requirements

**Specifications (1):**

- `specs/configuration.md` - Environment variables, external services

### Mobile Projects (15 documents)

**Core Documents (4):**

- `AGENT.md` - Universal AI configuration, aggregator
- `ai-instructions.md` - Tech stack, NEVER/ALWAYS rules
- `project-brief.md` - Business context, objectives, scope
- `README.md` - Project overview, setup instructions

**Technical Docs (10):**

- `docs/architecture.md` - System architecture, design patterns
- `docs/navigation.md` - Navigation patterns and setup
- `docs/state-management.md` - State management patterns
- `docs/offline-strategy.md` - Offline and sync strategy
- `docs/permissions.md` - Permissions handling
- `docs/native-features.md` - Native features integration
- `docs/code-standards.md` - Code standards and conventions
- `docs/testing.md` - Testing strategy
- `docs/app-store.md` - App Store configuration

**Specifications (2):**

- `specs/build-configuration.md` - Build and CI/CD configuration
- `specs/deployment.md` - Deployment procedures

### Fullstack Projects

Fullstack projects combine documentation from both backend and frontend, with fullstack-specific templates for common files (README, ai-instructions, project-brief, configuration) that merge both perspectives.

**Core Documents (4):**

- `AGENT.md` - Universal AI configuration, aggregator
- `ai-instructions.md` - Combined tech stack (backend + frontend), NEVER/ALWAYS rules
- `project-brief.md` - Combined business context (backend + frontend)
- `README.md` - Combined project overview (backend + frontend)

**Backend Technical Docs (8):**

- `docs/architecture.md` - Backend system architecture
- `docs/data-model.md` - Backend entity catalog
- `docs/code-standards.md` - Backend code quality rules
- `docs/testing.md` - Backend testing strategy
- `docs/operations.md` - Backend deployment procedures
- `docs/business-flows.md` - Backend workflows
- `docs/api.md` - Backend API conventions
- `docs/contributing.md` - Backend development setup

**Frontend Technical Docs (5):**

- `docs/components.md` - Frontend component architecture
- `docs/state-management.md` - Frontend state patterns
- `docs/styling.md` - Frontend styling guidelines
- `docs/testing.md` - Frontend testing strategy (may merge with backend)
- `docs/architecture.md` - Frontend architecture (may merge with backend)

**Specifications (2):**

- `specs/security.md` - Backend security policies
- `specs/configuration.md` - Combined environment config (backend + frontend)

**Configuration (1):**

- `.env.example` - Combined environment variables

**Total:** ~20 documents (varies based on merge strategy)

---

## 🔄 Keeping Documentation Updated

As your project evolves, your code changes but your documentation may become out of sync. Use the `/docs-update` command to keep documentation synchronized.

### Command: `/docs-update`

**Purpose:** Detect code changes and automatically update affected documentation files.

**How it works:**

1. Compares current code with last documented state (`.ai-bootstrap/analysis.json`)
2. Detects changes based on project type:
   - **Backend:** endpoints, entities, dependencies, architecture, configuration
   - **Frontend:** components, state management, styling, dependencies, architecture, configuration
   - **Mobile:** screens, navigation, permissions, native features, state management, build configuration, dependencies, architecture
   - **Fullstack:** Uses `/backend-docs-update` and `/frontend-docs-update` commands separately
3. Shows report of documents that need updating
4. Asks for confirmation to update all detected documents
5. Updates documents incrementally (only changed sections)

**When to use:**

**Backend:**

- After adding new API endpoints
- After modifying database entities
- After adding new dependencies
- After changing project structure

**Frontend:**

- After adding new components
- After modifying state management (stores, hooks)
- After changing styling approach or design tokens
- After adding new dependencies
- After changing project structure

**Mobile:**

- After adding new screens
- After modifying navigation structure
- After requesting new permissions
- After adding native modules or features
- After modifying build configuration
- After adding new dependencies
- After changing project structure

**Fullstack:**

- Run `/backend-docs-update` for backend changes
- Run `/frontend-docs-update` for frontend changes

**Periodically:** Weekly/monthly to catch any drift

**Usage:**

```
# For backend, frontend, or mobile projects
/docs-update

# For fullstack projects
/backend-docs-update
/frontend-docs-update
```

**Example (Backend):**

```
/docs-update

📊 CAMBIOS DETECTADOS:

🔴 Documentos que requieren actualización:
- docs/api.md (3 nuevos endpoints)
- docs/data-model.md (nuevo campo agregado)

¿Actualizar todos los documentos detectados? (Y/N)

> Y

✅ DOCUMENTACIÓN ACTUALIZADA:
📝 docs/api.md - Agregados 3 nuevos endpoints
📝 docs/data-model.md - Actualizado con nuevo campo
✅ analysis.json actualizado
```

**Example (Frontend):**

```
/docs-update

📊 CHANGES DETECTED:

🔴 Documents that require updating:
- docs/components.md (2 new components)
- docs/state-management.md (new Zustand store)

¿Actualizar todos los documentos detectados? (Y/N)

> Y

✅ DOCUMENTATION UPDATED:
📝 docs/components.md - Added 2 new components
📝 docs/state-management.md - Added new store
✅ analysis.json updated
```

**Example (Mobile):**

```
/docs-update

📊 CHANGES DETECTED:

🔴 Documents that require updating:
- docs/navigation.md (1 new screen)
- docs/permissions.md (new permission: Camera)

¿Actualizar todos los documentos detectados? (Y/N)

> Y

✅ DOCUMENTATION UPDATED:
📝 docs/navigation.md - Added 1 new screen
📝 docs/permissions.md - Added new permission
✅ analysis.json updated
```

**Note:** The `/docs-update` command reuses the same analysis logic from Phase 0 to detect changes. If `.ai-bootstrap/analysis.json` doesn't exist, it will run a full analysis first.

---

## 🤖 AI Tool Support

### Claude Code

```bash
ai-bootstrap init . --ai claude
```

**Features:**

- `.clauderules` configuration
- Slash commands in `.claude/commands/`
- Plan mode optimized workflow

### Cursor

```bash
ai-bootstrap init . --ai cursor
```

**Features:**

- `.cursorrules` configuration
- Slash commands in `.cursor/commands/`
- Fast iteration support

### GitHub Copilot

```bash
ai-bootstrap init . --ai copilot
```

**Features:**

- `.github/copilot-instructions.md` configuration
- Slash commands in `.github/prompts/*.prompt.md`
- Copilot workspace instructions
- GitHub workflow integration

### Gemini

```bash
ai-bootstrap init . --ai gemini
```

**Features:**

- Slash commands in `.gemini/commands/`
- AI-optimized documentation structure
- Google AI workflow integration

### All AI Tools

```bash
ai-bootstrap init . --ai all
```

Sets up configuration for all AI tools - maximum compatibility.

---

## 📋 Available Slash Commands

After initialization, you can use these commands in your AI tool:

**Documentation Generation:**

- `/bootstrap` - Full 8-phase documentation generation

**Backend Projects:**

- `/bootstrap-phase0-context` - Context Discovery (existing projects only)
- `/bootstrap-phase1-business` - Discovery & Business only
- `/bootstrap-phase2-data` - Data Architecture only
- `/bootstrap-phase3-architecture` - System Architecture only
- `/bootstrap-phase4-security` - Security & Auth only
- `/bootstrap-phase5-standards` - Code Standards only
- `/bootstrap-phase6-testing` - Testing only
- `/bootstrap-phase7-operations` - Operations + Tools only

**Frontend Projects:**

- `/bootstrap-phase0-context` - Context Discovery (existing projects only)
- `/bootstrap-phase1-discovery` - Discovery & UX only
- `/bootstrap-phase2-components` - Components & Framework only
- `/bootstrap-phase3-state` - State Management only
- `/bootstrap-phase4-styling` - Styling & Design only
- `/bootstrap-phase5-standards` - Code Standards only
- `/bootstrap-phase6-testing` - Testing Strategy only
- `/bootstrap-phase7-deployment` - Deployment only

**Mobile Projects:**

- `/bootstrap-phase0-context` - Context Discovery (existing projects only)
- `/bootstrap-phase1-platform` - Platform & Framework Selection only
- `/bootstrap-phase2-navigation` - Navigation & Architecture only
- `/bootstrap-phase3-state` - State & Data Management only
- `/bootstrap-phase4-permissions` - Permissions & Native Features only
- `/bootstrap-phase5-standards` - Code Standards only
- `/bootstrap-phase6-testing` - Testing Strategy only
- `/bootstrap-phase7-deployment` - Deployment only

**Documentation Maintenance:**

- `/docs-update` - Detect code changes and update documentation automatically (backend, frontend, mobile)
- `/backend-docs-update` - Backend-specific docs update (fullstack projects)
- `/frontend-docs-update` - Frontend-specific docs update (fullstack projects)
- `/mobile-docs-update` - Mobile-specific docs update

---

## 🔄 Workflow Commands (Backend Projects)

AI-Bootstrap includes workflow commands for structured backend development inspired by best practices from Spec-Kit, OpenSpec, and BMAD-METHOD:

### Feature Development

**`/feature`** - Create/modify/refactor complete features (15-20 min)

- **Modes:**
  - `/feature` - Interactive (asks: new/change/refactor)
  - `/feature new` - New feature from scratch
  - `/feature change` - Modify existing feature
  - `/feature refactor` - Refactor existing code

- **Workflow:** Spec → Plan → Implementation → Auto-Archive
- **Generates:** `.ai-bootstrap/work/feature-[name]/` with spec.md, plan.md, tasks.md
- **Output:** Working code + tests + updated documentation

### Bug Fixes

**`/fix`** - Fix bugs with automatic complexity detection (3-15 min)

- **Adaptive workflow:**
  - Simple bugs: 3-5 minutes (quick fix + test)
  - Complex bugs: 10-15 minutes (deep analysis + comprehensive fix)
- **Auto-detects complexity** based on scope and root cause
- **Generates:** Fix + test case + documentation

### Work Management

**`/work`** - Manage work in progress

- **Subcommands:**
  - `/work` - List active tasks with progress
  - `/work show [name]` - Show task details
  - `/work resume [name]` - Resume interrupted work without context loss
  - `/work archive [name]` - Archive completed work and update docs

- **Structure:** `.ai-bootstrap/work/` (active) → `.ai-bootstrap/archive/` (completed)

### Code Review

**`/review`** - Professional code review with multi-aspect analysis (5 min)

- **Analyzes 5 perspectives:**
  - 🔒 Security (SQL injection, XSS, auth issues)
  - ⚡ Performance (N+1 queries, missing indexes)
  - 🧪 Testing (coverage, edge cases)
  - 📐 Architecture (SOLID, DRY, coupling)
  - 🎨 Code Quality (naming, complexity)

- **Prioritized report:** 🔴 Critical, 🟡 Warnings, 🟢 Suggestions
- **Modes:** `/review` (current changes), `/review feature-[name]`, `/review --full`

### Quick Refactoring

**`/refactor-quick`** - Small refactorings without overhead (3-5 min)

- **Use cases:**
  - Extract methods/functions
  - Rename variables/classes
  - Move logic between layers
  - Extract to utility modules

- **vs `/feature refactor`:** No spec/plan required, 3x faster

### Benefits

- ✅ Structured workflow with auditable history
- ✅ Automatic documentation updates
- ✅ Resume work without context loss
- ✅ 60-70% time savings on typical development
- ✅ Works with Claude, Cursor, Copilot, Gemini

**Example workflow:**
```bash
# Morning: Start new feature
/feature "Real-time notifications API"
# → 18 minutes later: Complete feature with tests + docs

# Bug reported
/fix "Login returns 500 when email not found"
# → 4 minutes later: Fixed with test case

# Meeting interruption
# Work saved automatically in .ai-bootstrap/work/

# After meeting: Resume
/work resume feature-notifications
# → Continues from exact task without context loss
```

---

## 💡 How It Works

### 1. Smart 3-Layer Context Detection (Phase 0)

For existing projects, AI Bootstrap uses an intelligent, incremental analysis system:

**Layer 0: Cache Check (2-5 seconds)**

- Checks for previous analysis in `.ai-bootstrap/analysis.json`
- Detects changes by comparing file timestamps
- Instantly reuses cached results if project unchanged
- **Result: 0 seconds on re-runs with no changes**

**Layer 1: Fast Metadata Scan (10-20 seconds, ~1,500 tokens)**

- Detects language from package managers (package.json, composer.json, pom.xml, go.mod, Cargo.toml, etc.)
- Identifies framework and version (60+ frameworks supported)
- Detects ORM and database (35+ ORMs supported)
- Scans for existing documentation files
- **No code reading** - only metadata analysis

**Layer 2: Structural Analysis (30-90 seconds, ~4,000 tokens)**

- Analyzes directory structure and organization patterns
- Counts files by category (controllers, services, entities, etc.)
- Detects architecture pattern (feature-based, layer-based, modular)
- Extracts entity names from schema files
- Estimates test coverage
- Assesses documentation maturity

**Layer 3: Selective Deep Analysis (1-5 minutes, optional)**

- **User-controlled**: Choose which areas to analyze deeply
- Parses code to extract API endpoints with methods and paths
- Maps entity relationships and fields
- Detects security patterns (auth, validation, rate limiting)
- Analyzes testing infrastructure
- **Smart sampling**: Stratified file selection for better representation
- **Context budget management**: Stops before token limits

**Benefits:**

- ✅ 50-94% faster depending on project state
- ✅ 50-94% less context usage
- ✅ Intelligent caching with change detection
- ✅ Pre-populates 40-60% of questionnaire answers
- ✅ Supports 12 languages, 60+ frameworks, 35+ ORMs

### 2. Master Prompt System

The `.ai-bootstrap/prompts/backend/bootstrap.md` file contains a comprehensive 8-phase questionnaire that guides AI assistants through gathering all necessary information.

### 3. Template-Based Generation

Templates in `.ai-bootstrap/templates/` use placeholders (e.g., `{{PROJECT_NAME}}`) that get filled based on your answers or detected information.

### 4. AGENT.md Aggregator

The `AGENT.md` file acts as a universal entry point that all AI tools can read. It points to detailed documentation and provides quick reference.

### 5. Tool-Specific Configs

Each AI tool gets its specific config (`.clauderules`, `.cursorrules`, etc.) that references `AGENT.md` as the source of truth.

---

## 🌍 Supported Languages & Frameworks

AI Bootstrap provides **universal backend support** with automatic detection for 98% of the market:

### Languages Supported (12)

| Language               | Market Share | Frameworks                                                               | ORMs                                                          | Status  |
| ---------------------- | ------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------- | ------- |
| **Node.js/TypeScript** | ~35%         | NestJS, Express, Fastify, Koa, Hapi, AdonisJS, Next.js, Remix, tRPC      | Prisma, TypeORM, Sequelize, Mongoose, Drizzle, MikroORM, Knex | ✅ Full |
| **Python**             | ~25%         | FastAPI, Django, Django REST Framework, Flask, Tornado, Sanic, Starlette | SQLAlchemy, Django ORM, Tortoise ORM, Peewee, SQLModel        | ✅ Full |
| **PHP**                | ~15%         | Laravel, Symfony, CodeIgniter, Slim, Lumen, Yii                          | Eloquent, Doctrine, Propel                                    | ✅ Full |
| **Java**               | ~15%         | Spring Boot, Micronaut, Quarkus, Vert.x, Dropwizard                      | Hibernate/JPA, MyBatis, jOOQ                                  | ✅ Full |
| **C#/.NET**            | ~8%          | ASP.NET Core, Minimal APIs, Nancy                                        | Entity Framework Core, Dapper, NHibernate                     | ✅ Full |
| **Go**                 | ~5%          | Gin, Echo, Fiber, Chi, Buffalo                                           | GORM, Ent, sqlx, sqlc                                         | ✅ Full |
| **Ruby**               | ~3%          | Ruby on Rails, Sinatra, Hanami, Grape                                    | ActiveRecord, Sequel, ROM                                     | ✅ Full |
| **Kotlin**             | ~2%          | Ktor, Spring Boot, Javalin, http4k                                       | Exposed, Hibernate                                            | ✅ Full |
| **Rust**               | ~1%          | Actix-web, Rocket, Axum, Warp                                            | Diesel, SeaORM, sqlx                                          | ✅ Full |
| **Elixir**             | <1%          | Phoenix                                                                  | Ecto                                                          | ✅ Full |
| **Scala**              | <1%          | Play Framework, Akka HTTP                                                | Slick, Quill                                                  | ✅ Full |
| **Swift**              | <1%          | Vapor                                                                    | Fluent                                                        | ✅ Full |

### What Gets Detected Automatically?

For each supported stack, AI Bootstrap automatically detects:

✅ **Language & Version** - From package managers and config files
✅ **Framework & Version** - Pattern matching in dependencies
✅ **ORM & Version** - Database library detection
✅ **Package Manager** - npm, composer, maven, gradle, pip, cargo, etc.
✅ **Project Structure** - Feature-based, layer-based, modular patterns
✅ **Entities/Models** - From schema files and code
✅ **API Endpoints** - Routes, controllers, methods, paths
✅ **Architecture Pattern** - MVC, layered, hexagonal, etc.
✅ **Security Patterns** - Auth, validation, rate limiting, CORS
✅ **Testing Setup** - Test files, frameworks, coverage estimation
✅ **Documentation** - Existing docs and maturity level

### Example: Node.js/TypeScript Detection

```typescript
// Automatically detects from package.json:
{
  "dependencies": {
    "@nestjs/core": "^10.0.0",     // ✅ Framework: NestJS
    "prisma": "^5.0.0",             // ✅ ORM: Prisma
    "@nestjs/jwt": "^10.0.0",       // ✅ Auth: JWT
    "class-validator": "^0.14.0"    // ✅ Validation: class-validator
  }
}

// Then analyzes code structure:
@Controller('users')              // ✅ Controller detected
export class UsersController {
  @Get(':id')                     // ✅ Endpoint: GET /users/:id
  findOne(@Param('id') id: string) {...}
}

// And schema:
model User {                      // ✅ Entity: User
  id        String   @id         // ✅ Field: id (primary)
  email     String   @unique     // ✅ Field: email (unique)
  posts     Post[]               // ✅ Relationship: OneToMany
}
```

### Example: PHP/Laravel Detection

```php
// Automatically detects from composer.json:
{
  "require": {
    "laravel/framework": "^10.0",  // ✅ Framework: Laravel
    "doctrine/orm": "^2.14"        // ✅ ORM: Doctrine
  }
}

// Then analyzes routes:
Route::get('/users/{id}', [UserController::class, 'show']);
// ✅ Endpoint: GET /users/{id}

// And models:
class User extends Model {         // ✅ Entity: User
  protected $fillable = ['name', 'email'];
}
```

### Example: Python/FastAPI Detection

```python
# Automatically detects from requirements.txt:
fastapi==0.104.1       # ✅ Framework: FastAPI
sqlalchemy==2.0.0      # ✅ ORM: SQLAlchemy

# Then analyzes routes:
@app.get("/users/{user_id}")  # ✅ Endpoint: GET /users/{user_id}
async def get_user(user_id: int):
    ...

# And models:
class User(Base):          # ✅ Entity: User
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    email = Column(String, unique=True)
```

### Coverage Comparison

| Before (v1.0)                 | After (v1.0.7+) | Improvement       |
| ----------------------------- | --------------- | ----------------- |
| 2 languages (Node.js, Python) | 12 languages    | **6x more**       |
| 4 frameworks                  | 60+ frameworks  | **15x more**      |
| 3 ORMs                        | 35+ ORMs        | **11x more**      |
| ~35% market                   | ~98% market     | **2.8x coverage** |

---

## 🎓 Why Use AI Bootstrap?

### Traditional Approach (❌ Without AI Bootstrap)

- ⏱️ 10-20 hours creating documentation manually
- 📝 Inconsistent documentation across projects
- 🤔 AI assistants lack context, make wrong assumptions
- 🔄 Constant repetition of architecture decisions
- 🐛 More bugs due to unclear standards

### AI Bootstrap Approach (✅ With AI Bootstrap)

**New Projects:**

- ⏱️ 50-150 minutes interactive setup (scope-based)
- 📚 15 interconnected professional documents
- 🤖 AI assistants work with full context
- 🎯 Consistent architecture and code quality
- ✅ Fewer bugs, faster development

**Existing Projects:**

- ⏱️ 25-90 minutes (50-94% faster with smart 3-layer detection!)
- 📚 Same 11-16 professional documents (varies by project type)
- 🔍 Automatic 3-layer analysis of existing code/docs
- 💾 Intelligent caching: 0 seconds on re-runs
- 📝 Only answer what's missing (40-60% pre-populated)
- 🚀 Get AI-ready documentation for legacy projects
- 🌍 Works with 12 languages, 60+ frameworks

### ROI Calculation

**New Projects:**

- **Investment:** 2 hours (one-time)
- **Savings per feature:** 30-60 minutes
- **Break-even:** After 2-4 features
- **10 features:** Save 5-10 hours
- **Entire project:** Save 20-50+ hours

**Existing Projects:**

- **Investment:** 30-90 minutes (one-time, depending on project size)
- **Immediate benefit:** Professional AI-ready documentation
- **Context savings:** 50-94% less tokens (reduces API costs)
- **Caching benefit:** 0 seconds on subsequent runs
- **Ongoing savings:** Same as new projects (10-20 hours)
- **Universal:** Works with any of 12 supported languages

---

## 📚 Documentation Philosophy

AI Bootstrap follows the principle: **Documentation as Executable Code**

- Documents guide AI assistants (like config files guide compilers)
- AGENT.md is the "entry point"
- All documents are interconnected
- Documents evolve with the project
- Single source of truth for all AI tools

---

## 🛠️ CLI Commands

```bash
# Initialize in current directory
ai-bootstrap init .

# Initialize with specific AI tool
ai-bootstrap init . --ai claude
ai-bootstrap init . --ai cursor
ai-bootstrap init . --ai copilot
ai-bootstrap init . --ai gemini
ai-bootstrap init . --ai all

# Initialize with project details (skip prompts)
ai-bootstrap init . --ai claude --name "My API" --description "REST API for my app"

# Initialize with verbose logging (for debugging)
ai-bootstrap init . --verbose

# Simulate initialization without writing files
ai-bootstrap init . --dry-run

# Check if initialized
ai-bootstrap check
```

---

## 🌟 Best Practices

### Before Bootstrap

1. Have a clear problem statement
2. Know your approximate tech stack
3. Understand your users
4. Choose your scope (MVP/Production-Ready/Enterprise)
5. Set aside time based on your scope:
   - **MVP (with basic tests):** 50-70 min (new) or 25-40 min (existing)
   - **Production-Ready:** 90-120 min (new) or 35-70 min (existing)
   - **Enterprise:** 120-150 min (new) or 50-90 min (existing)

### During Bootstrap

1. Take your time with each question
2. Use recommendations (⭐🔥⚡🏆) as guides
3. Be specific - more detail = better docs
4. Confirm each phase before proceeding

### After Bootstrap

1. Review all generated documents
2. Customize as needed
3. Share AGENT.md with your team
4. Update documents as project evolves

---

## 🎯 Who Should Use This?

### Perfect For

- ✅ Backend developers starting new projects (any of 12 languages)
- ✅ Frontend developers building React, Vue, Angular, Svelte, or Solid applications
- ✅ Teams with existing codebases needing AI-ready documentation
- ✅ Legacy projects lacking proper documentation (60+ frameworks supported)
- ✅ Teams adopting AI-assisted development
- ✅ Projects requiring comprehensive documentation
- ✅ Developers who want to learn best practices
- ✅ Anyone building APIs, backend services, or frontend applications
- ✅ Multi-language teams (Node.js, Python, PHP, Java, Go, Ruby, etc.)
- ✅ Enterprise projects requiring compliance documentation

### Not Ideal For

- ❌ Projects with zero documentation needs
- ❌ Quick prototypes that won't be maintained

---

## 🔄 Project Structure

After running `ai-bootstrap init .`:

```
your-project/
├── .ai-bootstrap/              # Bootstrap tool (hidden)
│   ├── core/
│   │   └── config.json        # Bootstrap configuration
│   ├── prompts/
│   │   └── backend/
│   │       ├── bootstrap.md                      # 7-phase master prompt (orchestrator)
│   │       ├── bootstrap-phase0-context.md      # Context Discovery
│   │       ├── bootstrap-phase1-business.md     # Discovery & Business
│   │       ├── bootstrap-phase2-data.md         # Data Architecture
│   │       ├── bootstrap-phase3-architecture.md # System Architecture
│   │       ├── bootstrap-phase4-security.md     # Security & Auth
│   │       ├── bootstrap-phase5-standards.md    # Code Standards
│   │       ├── bootstrap-phase6-testing.md      # Testing
│   │       ├── bootstrap-phase7-operations.md   # Operations & Deployment
│   │       └── docs-update.md                   # Documentation update command
│   ├── templates/             # 15 document templates
│   ├── scripts/               # Setup scripts
│   └── slash-commands/        # Commands for each AI tool
│
├── .claude/commands/          # If Claude selected
│   ├── bootstrap.md
│   ├── bootstrap-phase0-context.md
│   ├── bootstrap-phase1-business.md
│   ├── bootstrap-phase2-data.md
│   ├── bootstrap-phase3-architecture.md
│   ├── bootstrap-phase4-security.md
│   ├── bootstrap-phase5-standards.md
│   ├── bootstrap-phase6-testing.md
│   ├── bootstrap-phase7-operations.md
│   └── docs-update.md
│
├── .gemini/commands/          # If Gemini selected
│   ├── bootstrap.md
│   ├── bootstrap-phase0.md
│   ├── bootstrap-phase1.md
│   ├── ... (phases 2-7)
│   └── docs-update.md
│
├── AGENT.md                   # Generated after /bootstrap
├── .clauderules              # Generated after /bootstrap
├── ai-instructions.md        # Generated after /bootstrap
└── ... (other 10 docs)
```

---

## 🚀 Roadmap

- [x] Backend bootstrap (v1.0)
- [x] Frontend bootstrap (v1.2.0) ✅
- [x] Fullstack bootstrap (v1.3.0) ✅
- [x] Mobile bootstrap (v1.4.0) ✅
- [ ] Template customization
- [ ] Multiple language support
- [ ] VS Code extension
- [ ] Interactive web UI

---

## 🛠️ Troubleshooting

### Node.js Version Error

If you see an error related to the Node.js version, make sure you have Node.js >=18.0.0 installed.

### Insufficient Permissions

If the CLI cannot write files, check the permissions of the target folder.

### Error Publishing to npm

Make sure you are authenticated with `npm login` and that the version does not already exist in the registry.

### Slash Command Issues

Check that the command files are in the correct path for your AI tool.

### Other Issues

See [GitHub Issues](https://github.com/victorvelazquez/ai-bootstrap/issues) for support.

## 🤝 Contributing

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---

## 📝 License

MIT License - See [LICENSE](LICENSE) for details.

---

## 💬 Support

- **Issues:** [GitHub Issues](https://github.com/victorvelazquez/ai-bootstrap/issues)
- **Email:** support@ai-bootstrap.dev (if applicable)

---

## 🙏 Acknowledgments

- Inspired by [GitHub Spec-Kit](https://github.com/github/spec-kit)
- Built for the AI-assisted development era
- Community feedback and contributions

---

**Transform your idea into a production-ready backend with AI Bootstrap** 🚀

**Made with ❤️ for the developer community**
