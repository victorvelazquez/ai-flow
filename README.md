# AI Flow

[![CI Status](https://github.com/victorvelazquez/ai-flow/actions/workflows/nodejs.yml/badge.svg)](https://github.com/victorvelazquez/ai-flow/actions/workflows/nodejs.yml)

## English

Transform your idea into a production-ready, AI-documented project (backend, frontend, fullstack, mobile, or desktop) in minutes.

AI Flow is an interactive CLI that creates comprehensive professional documentation and provides an AI-powered development workflow from idea to production. Compatible with Claude, Copilot, Cursor, Gemini, Antigravity, and any AI assistant.

**Key Features:**

- 🚀 Complete professional documentation (Backend: 17 files, Frontend: 15 files, Mobile: 13 files, Desktop: 16 files, Fullstack: 30+ files)
- 🧠 **Smart Description Refinement:** Detects ambiguity and iteratively guides you to a professional project definition.
- ⚡ **Two modes:** Interactive (90-120 min, full control) or Smart Auto-Suggest (15-25 min, 6 questions)
- 🌍 Universal support - 12 languages, 60+ frameworks, 35+ ORMs (98% coverage)
- 🤖 Multi-AI support with slash commands
- 🔍 Smart 3-layer detection for existing projects (50-94% faster)
- 🎯 **Smart Skip Logic:** Intelligently skips documentation phases for existing projects (15-20 min vs 90 min for ≥95% consistency).
- 🚀 **Agent Mode Enforcement:** AI assistants now prioritize proactive tool usage and immediate execution for all `/flow-` commands (No more redundant planning).
- ⏱️ Save 10-20 hours per project

**Quick Start:**

**Requirements:** Node.js ≥20.0.0

```bash
npm install -g ai-flow-dev
ai-flow init .
# Then open your AI tool and run:
# /flow-build  - To generate all documentation
# /flow-work   - To start building features
```

## 📚 **[Complete Guide →](GETTING-STARTED.md)**

## Español

Transforma tu idea en un proyecto listo para producción y documentado para IA en minutos (backend, frontend, fullstack, mobile o desktop).

**Características:**

- 🚀 Documentación profesional completa (Backend: 14 archivos, Frontend: 15 archivos, Mobile: 13 archivos, Desktop: 14 archivos, Fullstack: 30+ archivos)
- 🧠 **Refinamiento Inteligente:** Detecta ambigüedad y te guía iterativamente hacia una descripción profesional.
- ⚡ **Dos modos:** Interactivo (90-120 min, control total) o Auto-Sugerido (15-25 min, 6 preguntas)
- 🌍 Soporte universal - 12 lenguajes, 60+ frameworks, 35+ ORMs
- 🤖 Compatible with Claude, Copilot, Cursor, Gemini, Antigravity
- 🔍 Detección inteligente para proyectos existentes (50-94% más rápido)
- 🚀 **Modo Agente:** Los asistentes de IA ahora priorizan la ejecución proactiva para todos los comandos `/flow-`.
- ⏱️ Ahorra 10-20 horas por proyecto

**Inicio rápido:**

**Requisitos:** Node.js ≥20.0.0

```bash
npm install -g ai-flow-dev
ai-flow init .
# Luego en tu herramienta IA:
# /flow-build  - Para generar toda la documentación
# /flow-work   - Para comenzar a construir funcionalidades
```

## 📚 **[Guía Completa →](GETTING-STARTED.md)**

## Português

Transforme sua ideia em um projeto pronto para produção e documentado para IA em minutos (backend, frontend, fullstack, mobile ou desktop).
**Características:**

- 🚀 Documentação profissional completa (Backend: 14 arquivos, Frontend: 15 arquivos, Mobile: 13 arquivos, Desktop: 14 arquivos, Fullstack: 30+ arquivos)
- 🚀 **Modo Agente:** Os assistentes de IA agora priorizam a execução proativa para todos os comandos `/flow-`.
- 🧠 **Refinamento Inteligente:** Detecta ambiguidade e guia você para uma descrição profissional.
- ⚡ **Dois modos:** Interactivo (90-120 min, controle total) ou Auto-Sugestão (15-25 min, 6 perguntas)
- 🌍 Suporte universal - 12 linguagens, 60+ frameworks, 35+ ORMs
- 🤖 Compatível com Claude, Copilot, Cursor, Gemini, Antigravity
- 🔍 Detecção inteligente para projetos existentes (50-94% mais rápido)
- ⏱️ Economize 10-20 horas por projeto

**Início Rápido:**

**Requisitos:** Node.js ≥20.0.0

```bash
npm install -g ai-flow-dev
ai-flow init .
# Em seguida, na sua ferramenta de IA:
# /flow-build  - Para gerar toda a documentação
# /flow-work   - Para começar a construir funcionalidades
```

## 📚 **[Guia Completo →](GETTING-STARTED.md)**

## 🎯 What is AI Flow?

AI Flow is an interactive CLI tool that generates comprehensive professional documentation and provides an AI-powered development workflow throughout your project lifecycle (backend, frontend, fullstack, mobile, or desktop). It creates the foundation for AI-assisted development with any AI tool, from initial setup to feature development and maintenance.

**The Problem:** Starting a project requires hours of documentation setup. Existing projects lack proper AI-ready documentation. Without proper docs, AI assistants work inefficiently.
**The Solution:**

- **Interactive Mode:** Full control, all questions (90-120 min new, 35-70 min existing)
- **Smart Auto-Suggest Mode:** Only 6 critical questions, AI suggests the rest (15-25 min)
- **Smart Detection:** Analyzes existing projects to pre-populate answers (50-60% faster)

The result is interconnected documentation that guides AI assistants and human developers throughout your project lifecycle.

---

- 🌍 **Universal Support** - 12 languages, 60+ frameworks, 35+ ORMs (98% coverage)
- 🤖 **AI-Agnostic** - Claude, Copilot, Cursor, Gemini, Antigravity, any AI tool
- 📚 **Professional Documentation** - Backend: 17 files, Frontend: 15 files, Mobile: 13 files, Desktop: 16 files, Fullstack: 30+ files
- 🧠 **Smart Description Refinement** - AI detects vague inputs and helps you rich the context (WHO, WHAT, WHY).
- ⚡ **Two Questionnaire Modes:**
  - **Interactive Mode:** Full control, all phases (90-120 min)
  - **Smart Auto-Suggest:** Only 6 critical questions, AI suggests best practices (15-25 min)
- 🔍 **Smart 3-Layer Detection** - Analyzes existing projects in 15s-5min
- 💾 **Intelligent Caching** - 0 seconds on re-runs with no changes
- 🚀 **Agent Mode** - Immediate, proactive execution for all AI workflows
- 💡 **Slash Commands** - Easy execution with `/flow-build`, `/flow-work`, `/flow-check`, `/flow-commit`
- ⏱️ **Time Efficient** - Save 10-20 hours per project

---

## 📋 Prerequisites

- **Node.js:** 20.0.0 or higher ([Download](https://nodejs.org/))
- **npm:** Included with Node.js

---

## 📦 Installation

```bash
npm install -g ai-flow-dev
```

Or using uv (Python tool manager):

```bash
uv tool install ai-flow-dev
```

## **Current version:** 2.6.0

## 🚀 Quick Start

```bash
# 1. Create project folder
mkdir my-awesome-project
cd my-awesome-project

# 2. Initialize AI Flow
ai-flow init .

# 3. Open your AI tool and run:
/flow-build
```

That's it! The AI will guide you through an interactive questionnaire to generate all documentation.

## **📚 For detailed tutorials, see [GETTING-STARTED.md](GETTING-STARTED.md)**

## 🛠️ CLI Commands

```bash
ai-flow init [path]     # Initialize project
ai-flow check           # Verify initialization
ai-flow --version       # Show version
ai-flow --help          # Show help
```

**Example `check` output:**

```bash
$ ai-flow check

✓ .ai-flow/core/config.json found
✓ AI tools configured: antigravity
✓ Project Type: Backend (backend)
✓ Documentation complete: 17 files
✓ Slash commands installed: .agent/workflows/

✅ All checks passed! Your project is ready for AI-assisted development.
```

### Common Flags

```bash
--ai <tool>              # claude, cursor, copilot, gemini, antigravity, all (interactive if omitted)
--type <type>            # backend, frontend, mobile, desktop, fullstack (interactive if omitted)
--name <name>            # Project name (interactive if omitted)
--description <desc>     # Project description (interactive if omitted)
--verbose                # Detailed logging (init only)
--dry-run                # Simulate without writing (init only)
```

**Examples:**

```bash
# Non-interactive mode (all flags provided)
ai-flow init . --ai claude --type backend --name "My API" --description "REST API"

# Interactive mode (will prompt for missing values)
ai-flow init .

# Hybrid mode (some flags, some prompts)
ai-flow init . --ai claude

# Specify project type directly
ai-flow init . --type backend

# Combine type with AI tool
ai-flow init . --ai claude --type fullstack

# Mobile project example
ai-flow init . --ai claude --type mobile

# Desktop project example (NetBeans/Eclipse)
ai-flow init . --ai claude --type desktop

# Enable verbose output (detailed logging) - only for init command
ai-flow init . --verbose

# Simulate initialization without writing files (dry-run)
ai-flow init . --dry-run --verbose

# Show detailed help with all commands and options
ai-flow --help

# Show help for specific command
ai-flow init --help
ai-flow check --help
```

---

## 🤖 AI Tool Support

AI Flow works with any AI tool. Select during initialization:

```bash
ai-flow init . --ai claude      # Claude Code
ai-flow init . --ai cursor      # Cursor
ai-flow init . --ai copilot     # GitHub Copilot
ai-flow init . --ai gemini      # Gemini
ai-flow init . --ai all         # All tools (maximum compatibility)
ai-flow init . --ai antigravity   # Antigravity tool
```

Each tool gets:

- Tool-specific configuration files
- Slash commands optimized for that tool
- Integration with `AGENT.md` (universal config)

**Slash command locations:**

- **GitHub Copilot:** `.github/prompts/*.prompt.md`
- **Claude:** `.claude/commands/*.md`
- **Cursor:** `.cursor/commands/*.md`
- **Gemini:** `.gemini/commands/*.md`
- **Antigravity:** `.agent/workflows/*.md`

---

## 📋 Available Commands

After initialization, use these slash commands in your AI tool:

> **Note:** Command prefix may vary by AI tool. Examples use `/flow-` (GitHub Copilot), but Claude may use `/` alone, Cursor may use `@`, etc. Check your tool's documentation.

**Backend Projects:** 22 prompts (/flow-build with phases 0-10, /flow-work, /flow-check, /flow-commit, /flow-docs-sync)  
**Frontend Projects:** 22 prompts (same structure tailored for frontend)  
**Mobile Projects:** 22 prompts (same structure tailored for mobile apps)  
**Fullstack Projects:** Combined backend + frontend commands

**Documentation & Build:**

- `/flow-build` - Flujo completo: todas las fases en orden (11 fases backend, 11 frontend/mobile/desktop)
- `/flow-build fase N` - Ejecutar fase específica (ver lista de fases abajo)
- `/flow-work` - Development orchestrator (feature, refactor, fix, resume)
- `/flow-check` - Combined code review & testing workflow
- `/flow-commit` - Atomic commits (Conventional Commits)
- `/flow-docs-sync` - Update documentation when code changes

**Fases disponibles (Backend):**

- `/flow-build fase 0` - Context Discovery (solo proyectos existentes)
- `/flow-build fase 1` - Discovery & Business
- `/flow-build fase 2` - Data Architecture
- `/flow-build fase 3` - System Architecture
- `/flow-build fase 4` - Security & Authentication
- `/flow-build fase 5` - Code Standards
- `/flow-build fase 6` - Testing Strategy
- `/flow-build fase 7` - Operations & Deployment
- `/flow-build fase 8` - Project Setup & Final Documentation
- `/flow-build fase 9` - Implementation Roadmap (opcional)
- `/flow-build fase 10` - User Stories Generation (opcional, requiere Fase 9)

**Fases disponibles (Frontend/Mobile/Desktop):**

- `/flow-build fase 0` - Context Discovery (solo proyectos existentes)
- `/flow-build fase 1` - Discovery & UX / Platform Selection
- `/flow-build fase 2` - Components & Framework / Navigation
- `/flow-build fase 3` - State Management
- `/flow-build fase 4` - Styling & Design / Permissions
- `/flow-build fase 5` - Code Standards
- `/flow-build fase 6` - Testing Strategy
- `/flow-build fase 7` - Performance & Deployment / Store Deployment
- `/flow-build fase 8` - Project Setup & Final Documentation
- `/flow-build fase 9` - Implementation Roadmap (opcional)
- `/flow-build fase 10` - User Stories Generation (opcional)

**Workflows (All project types):**

- `/flow-work` - **Unified orchestrator** for Features/Refactors/Fixes with smart detection, automatic completion tracking, and consolidated planning
- `/flow-check` - **Combined validation**: Tests + Code Review in one command
- `/flow-commit` - Automate commits with Conventional Commits (3-5 min)
- `/flow-docs-sync` - **Sync documentation** when code changes occur

> **Note:** `/flow-work` automatically marks tasks as complete in `planning/roadmap.md` and user story DoD checklists when implementation finishes. It generates a consolidated `work.md` file for efficient planning and context management.

## **📚 See [GETTING-STARTED.md](GETTING-STARTED.md) for complete command reference**

---

## 📁 Project Structure

AI Flow organizes your project with clear separation of concerns:

### Documentation & Specifications

- **`docs/`** - Descriptive documentation (WHAT the project IS)
  - `architecture.md` - System architecture and design patterns
  - `data-model.md` - Entities, relationships, database schema
  - `api.md` - Available endpoints and contracts
  - `testing.md` - Testing strategy and guidelines

- **`specs/`** - Technical specifications (HOW to IMPLEMENT)
  - `security.md` - Security rules and constraints (MUST/NEVER)
  - `configuration.md` - Environment variables and settings

### Planning & Requirements

- **`planning/`** - Requirements and roadmap (WHAT to DO)
  - `roadmap.md` - Technical implementation roadmap with Story Points
  - `user-stories/` - Agile user stories with acceptance criteria

### Development State

- **`.ai-flow/`** - AI workflow state (temporary, can be gitignored)
  - `work/` - Active development tasks
  - `archive/` - Completed tasks (organized by month)

> **Note on Cache Directory:**
>
> **In projects using AI Flow:**
>
> - Cache is stored in `.ai-flow/cache/` (analysis data for your project)
> - Contains: `docs-analysis.json`, `audit-data.json`, `docs-snapshot.json`
>
> **In the AI Flow repository itself:**
>
> - Cache is stored in `cache/` at root (self-analysis data)
> - Used by `/flow3-docs` to track documentation accuracy
>
> These are two different caches with different purposes.

## 💡 How It Works

1. **Smart Detection** - Analyzes existing projects in 3 layers (15s to 5min)
2. **Interactive Questionnaire** - Guides you through 8-9 phases (choose mode)
3. **Template Generation** - Creates 13-17 professional documents per project type
4. **Implementation Roadmap** - Optional Phase 9 generates Story Point estimates
5. **AI Integration** - Configures your AI tool with project context
6. **Slash Command Setup** - Installs prompts to tool-specific paths (.github/prompts/, .claude/commands/, etc.)

**For existing projects:**

- Layer 0: Cache check (0-5s)
- Layer 1: Metadata scan (10-20s)
- Layer 2: Structural analysis (30-90s)
- Layer 3: Deep analysis (1-5min, optional)

**Benefits:**

- 50-94% faster for existing projects
- 40-60% of answers pre-filled
- Intelligent caching (0s re-runs)

---

## 🎯 Generated Documentation

**Backend** (17 files): AGENT.md, ai-instructions.md, copilot-instructions.md, project-brief.md, README.md, plus 8 docs (in docs/) and 4 specs/configs.

**Frontend** (15 files): AGENT.md, ai-instructions.md, project-brief.md, plus 12 technical docs/specs.

**Mobile** (13 files): AGENT.md, ai-instructions.md, project-brief.md, plus 10 technical docs/specs.

**Fullstack** (30+ files): Combined Backend + Frontend documentation structures.

**Slash Commands/Prompts** (72 total):

- Backend: 22 prompts (/flow-build with phases 0-10, /flow-work variants, /flow-check, /flow-commit, /flow-docs-sync)
- Frontend: 22 prompts (same structure tailored for frontend)
- Mobile: 22 prompts (same structure tailored for mobile apps)
- Shared: 6 prompts (task-format.md, story-points.md, task-summary-template.md, etc.)
- **Total: 72 prompts** across all project types

Each project type gets workflow commands optimized for its technology stack.

### 📁 Generated Structure

After running `ai-flow init`, your project will have:

```
project-root/
├── AGENT.md                    # Universal AI entry point (all tools)
├── README.md                   # Project documentation
├── docs/                       # Technical documentation
│   ├── architecture.md
│   ├── api.md                 # (Backend only)
│   ├── database.md            # (Backend only)
│   ├── deployment.md
│   ├── security.md
│   └── ...
├── specs/                      # Specifications
│   ├── features.md
│   ├── requirements.md
│   └── ...
├── .ai-flow/                   # Internal metadata
│   └── core/
│       └── config.json        # AI Flow configuration
├── .github/prompts/            # GitHub Copilot commands
├── .claude/commands/           # Claude commands (if selected)
├── .cursor/commands/           # Cursor commands (if selected)
├── .gemini/commands/           # Gemini commands (if selected)
├── .agent/workflows/           # Antigravity commands (if selected)
└── ... (your project files)
```

**Key locations:**

- Documentation lives at **project root** (`docs/`, `specs/`, `AGENT.md`)
- `.ai-flow/` is internal metadata (don't edit manually)
- Slash commands are tool-specific (`.github/prompts/`, `.claude/commands/`, etc.)

---

## 🌍 Supported Languages & Frameworks

AI Flow provides **universal support** with automatic detection for 98% of the market:

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

## **See [GETTING-STARTED.md](GETTING-STARTED.md) for automatic detection details and examples.**

## 🎓 Why Use AI Flow?

**Without AI Flow:**

- ⏱️ 10-20 hours creating docs manually
- 🤔 AI assistants lack context, make assumptions
- 🐛 More bugs due to unclear standards

**With AI Flow:**

- ⏱️ 90-120 min (new) or 35-70 min (existing)
- 🤖 AI assistants work with full context and continuous workflow
- ✅ Consistent quality, fewer bugs
- 💾 Save 10-20 hours per project

---

## 📚 Documentation Philosophy

AI Flow follows: **Documentation as Executable Code**

- Documents guide AI assistants (like config files guide compilers)
- `AGENT.md` is the universal entry point
- All documents are interconnected
- Documents evolve with your project
- Single source of truth for all AI tools

---

## 🎯 Who Should Use This?

**Perfect for:**

- ✅ Backend/frontend/mobile/desktop developers starting new projects
- ✅ Teams with existing codebases needing AI-ready documentation
- ✅ Projects requiring comprehensive documentation
- ✅ Teams adopting AI-assisted development
- ✅ Multi-language teams (12 languages supported)

**Not ideal for:**

- ❌ Projects with zero documentation needs
- ❌ Quick prototypes that won't be maintained

---

## 🚀 Roadmap

- [x] Backend, frontend, mobile, desktop, fullstack support ✅
- [ ] Template customization
- [ ] VS Code extension
- [ ] Interactive web UI

---

## 🛠️ Troubleshooting

**Common issues:**

- Node.js version must be ≥20.0.0
- Check folder permissions if CLI can't write files
- Verify slash command files exist for your AI tool:
  - **GitHub Copilot:** `.github/prompts/*.prompt.md`
  - **Claude:** `.claude/commands/*.md`
  - **Cursor:** `.cursor/commands/*.md`
  - **Gemini:** `.gemini/commands/*.md`
  - **Antigravity:** `.agent/workflows/*.md`
  - If missing, re-run: `ai-flow init . --ai <your-tool>`

**📚 See [GETTING-STARTED.md](GETTING-STARTED.md#troubleshooting) for detailed troubleshooting guide**

## 🤝 Contributing

## We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## 📝 License

## MIT License - See [LICENSE](LICENSE) for details.

## 💬 Support

- **Issues:** [GitHub Issues](https://github.com/victorvelazquez/ai-flow/issues)
- **Email:** support@ai-flow.dev (if applicable)

---

## 🙏 Acknowledgments

- Inspired by [GitHub Spec-Kit](https://github.com/github/spec-kit)
- Built for the AI-assisted development era
- Community feedback and contributions

---

**Transform your idea into a production-ready project with AI Flow** 🚀

**Made with ❤️ for the developer community**
