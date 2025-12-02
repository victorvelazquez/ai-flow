# AI Bootstrap

[![CI Status](https://github.com/victorvelazquez/ai-bootstrap/actions/workflows/nodejs.yml/badge.svg?branch=main)](https://github.com/victorvelazquez/ai-bootstrap/actions/workflows/nodejs.yml)

## English

Transform your idea into a production-ready, AI-documented backend in minutes.

AI Bootstrap is an interactive CLI that generates 15 professional documents for backend projects (new or existing), guiding users (or AI agents) through 7 key phases: business, architecture, security, standards, testing, and operations. Compatible with Claude, Copilot, Cursor, Gemini, and any AI assistant.

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
This will start an interactive questionnaire: when finished, you will have all your backend’s professional, connected documentation generated automatically in minutes.

---

## Español

Transforma tu idea en un backend listo para producción y documentado para IA en minutos.

AI Bootstrap es un CLI interactivo que genera 15 documentos profesionales para proyectos backend (nuevos o existentes), guiando al usuario (o agente AI) por 7 fases clave: negocio, arquitectura, seguridad, estándares, testing y operaciones. Compatible con Claude, Copilot, Cursor, Gemini y cualquier asistente AI.

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
Esto iniciará un cuestionario interactivo: al finalizar, tendrás toda la documentación profesional y conectada de tu backend generada automáticamente en minutos.

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

AI Bootstrap is an interactive CLI tool that generates **15 comprehensive documentation files** for your backend project (new or existing) through a guided 7-phase questionnaire. It creates the foundation for AI-assisted development with any AI tool (Claude, Copilot, Cursor, Gemini, etc.).

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
- Ask for project name (inferred from directory, press Enter to accept)
- Create `.ai-bootstrap/` hidden folder with templates
- Copy master prompts and templates
- Install slash commands for your AI tool
- Set up the foundation (takes ~30 seconds)

### 3. Run the Bootstrap Process

**Option A: Using Slash Command (Recommended)**

Open your AI tool and run:

```
/bootstrap
```

**Option B: Manual**

Tell your AI assistant:

```
Read .ai-bootstrap/prompts/backend.md and execute the 7-phase questionnaire
```

### 4. Answer Questions

**For Existing Projects:**
The AI will first analyze your project (Phase 0) and pre-populate answers from:

- AI instruction files (copilot-instructions.md, .clauderules, AGENT.md, etc.)
- README.md, package.json, and code structure
- Detected frameworks, entities, and dependencies

You'll only answer what's missing or needs confirmation. **Time: 35-70 minutes** (50-60% faster!)

**For New Projects:**
The AI will guide you through 7 phases:

1. **Discovery & Business** (15-20 min) - What problem are you solving?
2. **Data Architecture** (15-20 min) - Database design and entities
3. **System Architecture** (15-20 min) - Tech stack and patterns
4. **Security & Authentication** (15-20 min) - Authentication and compliance
5. **Code Standards** (15-20 min) - Quality rules and conventions
6. **Testing Strategy** (15-25 min) - Testing strategy and coverage (all scopes include tests)
7. **Operations & Deployment** (10 min) - Deployment and monitoring

**Time: 90-120 minutes**

### 5. Generated Documents (15) ✅

After completion, you'll have 15 artifacts ready:

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

### Core Documents (4)

| Document             | Purpose                                | Read By           |
| -------------------- | -------------------------------------- | ----------------- |
| `AGENT.md`           | Universal AI configuration, aggregator | All AI tools      |
| `ai-instructions.md` | Tech stack, NEVER/ALWAYS rules         | All AI assistants |
| `project-brief.md`   | Business context, objectives, scope    | AI + stakeholders |
| `README.md`          | Project overview, setup instructions   | Developers        |

### Technical Docs (8)

| Document                 | Purpose                                    |
| ------------------------ | ------------------------------------------ |
| `docs/architecture.md`   | System architecture, design patterns       |
| `docs/data-model.md`     | Detailed entity catalog, ownership rules   |
| `docs/code-standards.md` | Naming conventions, quality rules          |
| `docs/testing.md`        | Testing strategy, coverage requirements    |
| `docs/operations.md`     | Deployment, monitoring, runbooks           |
| `docs/business-flows.md` | Business workflows, process diagrams       |
| `docs/api.md`            | API conventions, CRUD endpoints, contracts |
| `docs/contributing.md`   | Development setup, workflow                |

### Specifications (2)

| Document                 | Purpose                                   |
| ------------------------ | ----------------------------------------- |
| `specs/security.md`      | Authentication, authorization, compliance |
| `specs/configuration.md` | Environment variables, external services  |

### Configuration (1)

| File           | Purpose                       |
| -------------- | ----------------------------- |
| `.env.example` | Environment variable template |

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

- `/bootstrap` - Full 7-phase documentation generation
- `/bootstrap-phase1` - Discovery & Business only
- `/bootstrap-phase2` - Data Architecture only
- `/bootstrap-phase3` - System Architecture only
- `/bootstrap-phase4` - Security & Auth only
- `/bootstrap-phase5` - Code Standards only
- `/bootstrap-phase6` - Testing only
- `/bootstrap-phase7` - Operations + Tools only

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

The `.ai-bootstrap/prompts/backend.md` file contains a comprehensive questionnaire that guides AI assistants through gathering all necessary information.

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
- 📚 Same 15 professional documents
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

## 🔧 Optional: Spec-Kit Integration

At the end of Phase 7, you can optionally install [GitHub Spec-Kit](https://github.com/github/spec-kit) for structured development workflow:

```bash
uv tool install specify-cli --from git+https://github.com/github/spec-kit.git
```

**Spec-Kit adds:**

- `/constitution` - Load project rules
- `/specify` - Define what to build
- `/plan` - Define how to build
- `/task` - Break into tasks
- `/implement` - Generate code
- `/checklist` - Verify completeness

AI Bootstrap + Spec-Kit = **Complete AI-assisted development workflow**

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
- ✅ Teams with existing codebases needing AI-ready documentation
- ✅ Legacy projects lacking proper documentation (60+ frameworks supported)
- ✅ Teams adopting AI-assisted development
- ✅ Projects requiring comprehensive documentation
- ✅ Developers who want to learn best practices
- ✅ Anyone building APIs or backend services
- ✅ Multi-language teams (Node.js, Python, PHP, Java, Go, Ruby, etc.)
- ✅ Enterprise projects requiring compliance documentation

### Not Ideal For

- ❌ Frontend-only projects (frontend bootstrap coming soon)
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
│   │   └── backend.md         # 7-phase master prompt
│   ├── templates/             # 15 document templates
│   ├── scripts/               # Setup scripts
│   └── slash-commands/        # Commands for each AI tool
│
├── .claude/commands/          # If Claude selected
│   ├── bootstrap.md
│   ├── bootstrap-phase1.md
│   └── ... (7 phase commands)
│
├── .gemini/commands/          # If Gemini selected
│   ├── bootstrap.md
│   ├── bootstrap-phase1.md
│   └── ... (7 phase commands)
│
├── AGENT.md                   # Generated after /bootstrap
├── .clauderules              # Generated after /bootstrap
├── ai-instructions.md        # Generated after /bootstrap
└── ... (other 10 docs)
```

---

## 🚀 Roadmap

- [x] Backend bootstrap (v1.0)
- [ ] Frontend bootstrap (v1.1)
- [ ] Full-stack bootstrap (v1.2)
- [ ] Mobile bootstrap (v1.3)
- [ ] Template customization
- [ ] Multiple language support
- [ ] VS Code extension
- [ ] Interactive web UI

---

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
