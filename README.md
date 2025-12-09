# AI Flow

[![CI Status](https://github.com/victorvelazquez/ai-flow/actions/workflows/nodejs.yml/badge.svg?branch=main)](https://github.com/victorvelazquez/ai-flow/actions/workflows/nodejs.yml)

## English

Transform your idea into a production-ready, AI-documented project (backend, frontend, fullstack, or mobile) in minutes.

AI Flow is an interactive CLI that creates comprehensive professional documentation and provides an AI-powered development workflow from idea to production. Compatible with Claude, Copilot, Cursor, Gemini, and any AI assistant.

**Key Features:**

- 🚀 Complete professional documentation (12-17 docs per project type)
- ⚡ **Two modes:** Interactive (90-120 min, full control) or Smart Auto-Suggest (15-25 min, 6 questions)
- 🌍 Universal support - 12 languages, 60+ frameworks, 35+ ORMs (98% coverage)
- 🤖 Multi-AI support with slash commands
- 🔍 Smart 3-layer detection for existing projects (50-94% faster)
- ⏱️ Save 10-20 hours per project

**Quick Start:**

```bash
npm install -g ai-flow
ai-flow init .
# Then open your AI tool and run: /bootstrap
```

📚 **[Complete Guide →](GETTING-STARTED.md)**

---

## Español

Transforma tu idea en un proyecto listo para producción y documentado para IA en minutos (backend, frontend, fullstack o mobile).

**Características:**

- 🚀 Documentación profesional completa (12-17 docs por tipo)
- ⚡ **Dos modos:** Interactivo (90-120 min, control total) o Auto-Sugerido (15-25 min, 6 preguntas)
- 🌍 Soporte universal - 12 lenguajes, 60+ frameworks, 35+ ORMs
- 🤖 Compatible con Claude, Copilot, Cursor, Gemini
- 🔍 Detección inteligente para proyectos existentes (50-94% más rápido)
- ⏱️ Ahorra 10-20 horas por proyecto

**Inicio rápido:**

```bash
npm install -g ai-flow
ai-flow init .
# Luego en tu AI tool: /bootstrap
```

📚 **[Guía Completa →](GETTING-STARTED.md)**

---

## Português

Transforme sua ideia em um projeto pronto para produção e documentado para IA em minutos.
**Características:**

- 🚀 Documentação profissional completa (12-17 docs por tipo)
- ⚡ **Dois modos:** Interativo (90-120 min, controle total) ou Auto-Sugestão (15-25 min, 6 perguntas)
- 🌍 Suporte universal - 12 linguagens, 60+ frameworks, 35+ ORMs
- 🤖 Compatível com Claude, Copilot, Cursor, Gemini
- 🔍 Detecção inteligente para projetos existentes (50-94% mais rápido)
- ⏱️ Economize 10-20 horas por projetos existentes (50-94% mais rápido)
- ⏱️ Economize 10-20 horas por projeto

**Início rápido:**

```bash
npm install -g ai-flow
ai-flow init .
# Depois na sua ferramenta de IA: /bootstrap
```

📚 **[Guia Completo →](GETTING-STARTED.md)**

---

## 🎯 What is AI Flow?

AI Flow is an interactive CLI tool that generates comprehensive professional documentation and provides an AI-powered development workflow throughout your project lifecycle (backend, frontend, fullstack, or mobile). It creates the foundation for AI-assisted development with any AI tool, from initial setup to feature development and maintenance.

**The Problem:** Starting a project requires hours of documentation setup. Existing projects lack proper AI-ready documentation. Without proper docs, AI assistants work inefficiently.
**The Solution:**

- **Interactive Mode:** Full control, all questions (90-120 min new, 35-70 min existing)
- **Smart Auto-Suggest Mode:** Only 6 critical questions, AI suggests the rest (15-25 min)
- **Smart Detection:** Analyzes existing projects to pre-populate answers (50-60% faster)

The result is interconnected documentation that guides AI assistants and human developers throughout your project lifecycle.
The result is interconnected documentation that guides AI assistants and human developers throughout your project lifecycle.

---

- 🌍 **Universal Support** - 12 languages, 60+ frameworks, 35+ ORMs (98% coverage)
- 🤖 **AI-Agnostic** - Claude, Copilot, Cursor, Gemini, any AI tool
- 📚 **Professional Documentation** - 12-17 docs per project type
- ⚡ **Two Questionnaire Modes:**
  - **Interactive Mode:** Full control, 71 questions (90-120 min)
  - **Smart Auto-Suggest:** Only 6 critical questions, AI suggests best practices (15-25 min)
- 🔍 **Smart 3-Layer Detection** - Analyzes existing projects in 15s-5min
- 💾 **Intelligent Caching** - 0 seconds on re-runs with no changes
- 💡 **Slash Commands** - Easy execution with `/bootstrap`, `/feature`, `/fix`
- ⏱️ **Time Efficient** - Save 10-20 hours per projectth no changes
- 💡 **Slash Commands** - Easy execution with `/bootstrap`, `/feature`, `/fix`
- ⏱️ **Time Efficient** - Save 10-20 hours per project

---

## 📋 Prerequisites

- **Node.js:** 18.0.0 or higher ([Download](https://nodejs.org/))
- **npm:** Included with Node.js

---

## 📦 Installation

```bash
npm install -g ai-flow
```

Or using uv (Python tool manager):

```bash
uv tool install ai-flow
```

**Current version:** 1.1.1

---

## 🚀 Quick Start

```bash
# 1. Create project folder
mkdir my-awesome-project
cd my-awesome-project

# 2. Initialize AI Flow
ai-flow init .

# 3. Open your AI tool and run:
/bootstrap
```

That's it! The AI will guide you through an interactive questionnaire to generate all documentation.

**📚 For detailed tutorials, see [GETTING-STARTED.md](GETTING-STARTED.md)**

---

## 🛠️ CLI Commands

```bash
ai-flow init [path]     # Initialize project
ai-flow check           # Verify initialization
ai-flow --version       # Show version
ai-flow --help          # Show help
```

### Common Flags

```bash
--ai <tool>              # claude, cursor, copilot, gemini, all (interactive if omitted)
--type <type>            # backend, frontend, mobile, fullstack (interactive if omitted)
--name <name>            # Project name (interactive if omitted)
--description <desc>     # Project description (interactive if omitted)
--verbose                # Detailed logging
--dry-run                # Simulate without writing
```

**Examples:**

```bash
# Non-interactive mode (all flags provided)
ai-flow init . --ai claude --type backend --name "My API" --description "REST API"

# Interactive mode (will prompt for missing values)
ai-flow init .

# Hybrid mode (some flags, some prompts)
ai-flow init . --ai claude
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

---

## 📋 Available Commands

After initialization, use these slash commands in your AI tool:

**Documentation & Bootstrap:**

- `/bootstrap` - Full 8-phase documentation generation
- `/bootstrap-phase0-context` - Context discovery (existing projects)
- `/bootstrap-phase1-business` - Business requirements
- `/bootstrap-phase2-data` - Data architecture
- `/bootstrap-phase3-architecture` - Technical architecture
- `/bootstrap-phase4-security` - Security & compliance
- `/bootstrap-phase5-standards` - Code standards
- `/bootstrap-phase6-testing` - Testing strategy
- `/bootstrap-phase7-operations` - Deployment & operations
- `/docs-update` - Update documentation when code changes

**Project Setup (Backend only):**

- `/project-init` - Initialize project with framework (5-10 min, auto-executed by /bootstrap)
- `/project-roadmap` - Create implementation roadmap with Story Points (15-30 min)

**Workflows (Backend only):**

- `/feature` - Create/modify features (15-20 min)
- `/fix` - Fix bugs (3-15 min, adaptive)
- `/work` - Manage work in progress
- `/review` - Multi-aspect code review (5 min)
- `/refactor-quick` - Quick refactorings (3-5 min)

**📚 See [GETTING-STARTED.md](GETTING-STARTED.md) for complete command reference**

---

## 💡 How It Works

1. **Smart Detection** - Analyzes existing projects in 3 layers (15s to 5min)
2. **Interactive Questionnaire** - Guides you through 8 phases (choose mode)
3. **Template Generation** - Creates 12-17 professional documents
4. **AI Integration** - Configures your AI tool with project context
5. **Slash Command Setup** - Installs prompts to tool-specific paths (.github/prompts/, .claude/commands/, etc.)

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

**Backend** (17 docs): AGENT.md, ai-instructions.md, project-brief.md, README.md, 9 technical docs, 2 specs, .env.example

**Frontend** (12 docs): AGENT.md, ai-instructions.md, project-brief.md, README.md, 6 technical docs, 2 specs

**Mobile** (15 docs): AGENT.md, ai-instructions.md, project-brief.md, README.md, 9 technical docs, 2 specs

**Fullstack** (~20 docs): Combines backend + frontend with merged templates

---

## 🌍 Supported Languages & Frameworks

AI Bootstrap provides **universal support** with automatic detection for 98% of the market:

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

**See [GETTING-STARTED.md](GETTING-STARTED.md) for automatic detection details and examples.**

---

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

- ✅ Backend/frontend/mobile developers starting new projects
- ✅ Teams with existing codebases needing AI-ready documentation
- ✅ Projects requiring comprehensive documentation
- ✅ Teams adopting AI-assisted development
- ✅ Multi-language teams (12 languages supported)

**Not ideal for:**

- ❌ Projects with zero documentation needs
- ❌ Quick prototypes that won't be maintained

---

## 🚀 Roadmap

- [x] Backend, frontend, mobile, fullstack support ✅
- [ ] Template customization
- [ ] VS Code extension
- [ ] Interactive web UI

---

## 🛠️ Troubleshooting

**Common issues:**

- Node.js version must be ≥18.0.0
- Check folder permissions if CLI can't write files
- Verify slash command files exist for your AI tool

**📚 See [GETTING-STARTED.md](GETTING-STARTED.md#troubleshooting) for detailed troubleshooting guide**

## 🤝 Contributing

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---

## 📝 License

MIT License - See [LICENSE](LICENSE) for details.

---

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
