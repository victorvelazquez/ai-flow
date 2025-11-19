# AI Bootstrap

> Transform your project idea into a comprehensive, AI-ready backend with professional documentation in 90 minutes.

---

## 🎯 What is AI Bootstrap?

AI Bootstrap is an interactive CLI tool that generates **13 comprehensive documentation files** for your backend project through a guided 7-phase questionnaire. It creates the foundation for AI-assisted development with any AI tool (Claude, Copilot, Cursor, Gemini, etc.).

**The Problem:** Starting a new backend project requires hours of documentation setup. Without proper docs, AI assistants work inefficiently and make inconsistent decisions.

**The Solution:** AI Bootstrap asks you the right questions and generates professional, interconnected documentation that guides AI assistants (and human developers) throughout your project lifecycle.

---

## ✨ Features

- 🤖 **AI-Agnostic** - Works with Claude, Copilot, Cursor, Gemini, any AI tool
- 📚 **13 Professional Documents** - Complete documentation architecture
- ⚡ **Interactive Questionnaires** - 7 phases with smart recommendations
- 🎯 **AGENT.md Standard** - Universal AI configuration file
- 💡 **Slash Commands** - Easy execution with `/bootstrap`
- 🔧 **Backend-Focused** - Optimized for backend/API projects
- 🎓 **Educational** - Learn best practices while building
- ⏱️ **90-120 Minutes** - One-time investment, 10-20 hours saved

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
- Create `.ai-bootstrap/` hidden folder
- Copy master prompts and templates
- Install slash commands for your AI tool
- Set up the foundation

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

### 4. Answer Questions (90-120 minutes)

The AI will guide you through 7 phases:

1. **Discovery & Business** (15-20 min) - What problem are you solving?
2. **Data Architecture** (15-20 min) - Database design and entities
3. **System Architecture** (15-20 min) - Tech stack and patterns
4. **Security & Auth** (15-20 min) - Authentication and compliance
5. **Code Standards** (15-20 min) - Quality rules and conventions
6. **Testing** (10 min) - Testing strategy and coverage
7. **Operations** (10 min) - Deployment and monitoring

### 5. Generated Documents ✅

After completion, you'll have:

```
my-awesome-api/
├── AGENT.md                    # Universal AI config
├── .clauderules               # Claude-specific (if selected)
├── .cursorrules               # Cursor-specific (if selected)
├── ai-instructions.md         # AI development rules
├── project-brief.md           # Business context
├── docs/
│   ├── architecture.md        # System architecture
│   ├── data-architecture.md   # Database design
│   ├── code-standards.md      # Code quality rules
│   ├── testing.md            # Testing strategy
│   ├── operations.md         # Deployment procedures
│   └── contributing.md       # Contribution guidelines
├── specs/
│   ├── security.md           # Security policies
│   └── configuration.md      # Environment config
├── README.md                 # Project overview
└── .env.example              # Environment variables
```

---

## 🎯 Generated Documentation

### Core Documents (4)

| Document | Purpose | Read By |
|----------|---------|---------|
| `AGENT.md` | Universal AI configuration, aggregator | All AI tools |
| `ai-instructions.md` | Tech stack, NEVER/ALWAYS rules | All AI assistants |
| `project-brief.md` | Business context, objectives, scope | AI + stakeholders |
| `README.md` | Project overview, setup instructions | Developers |

### Technical Docs (6)

| Document | Purpose |
|----------|---------|
| `docs/architecture.md` | System architecture, design patterns |
| `docs/data-architecture.md` | Database schema, relationships |
| `docs/code-standards.md` | Naming conventions, quality rules |
| `docs/testing.md` | Testing strategy, coverage requirements |
| `docs/operations.md` | Deployment, monitoring, runbooks |
| `docs/contributing.md` | Development setup, workflow |

### Specifications (2)

| Document | Purpose |
|----------|---------|
| `specs/security.md` | Authentication, authorization, compliance |
| `specs/configuration.md` | Environment variables, external services |

### Configuration (1)

| File | Purpose |
|------|---------|
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
- Copilot workspace instructions
- GitHub workflow integration

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

### 1. Master Prompt System

The `.ai-bootstrap/prompts/backend.md` file contains a comprehensive questionnaire that guides AI assistants through gathering all necessary information.

### 2. Template-Based Generation

Templates in `.ai-bootstrap/templates/` use placeholders (e.g., `{{PROJECT_NAME}}`) that get filled based on your answers.

### 3. AGENT.md Aggregator

The `AGENT.md` file acts as a universal entry point that all AI tools can read. It points to detailed documentation and provides quick reference.

### 4. Tool-Specific Configs

Each AI tool gets its specific config (`.clauderules`, `.cursorrules`, etc.) that references `AGENT.md` as the source of truth.

---

## 🎓 Why Use AI Bootstrap?

### Traditional Approach (❌ Without AI Bootstrap)

- ⏱️ 10-20 hours creating documentation manually
- 📝 Inconsistent documentation across projects
- 🤔 AI assistants lack context, make wrong assumptions
- 🔄 Constant repetition of architecture decisions
- 🐛 More bugs due to unclear standards

### AI Bootstrap Approach (✅ With AI Bootstrap)

- ⏱️ 90-120 minutes interactive setup
- 📚 13 interconnected professional documents
- 🤖 AI assistants work with full context
- 🎯 Consistent architecture and code quality
- ✅ Fewer bugs, faster development

### ROI Calculation

- **Investment:** 2 hours (one-time)
- **Savings per feature:** 30-60 minutes
- **Break-even:** After 2-4 features
- **10 features:** Save 5-10 hours
- **Entire project:** Save 20-50+ hours

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
ai-bootstrap init . --ai all

# Check if initialized
ai-bootstrap check
```

---

## 🌟 Best Practices

### Before Bootstrap

1. Have a clear problem statement
2. Know your approximate tech stack
3. Understand your users
4. Set aside 2 hours of focused time

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

- ✅ Backend developers starting new projects
- ✅ Teams adopting AI-assisted development
- ✅ Projects requiring comprehensive documentation
- ✅ Developers who want to learn best practices
- ✅ Anyone building APIs or backend services

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
│   ├── templates/             # 13 document templates
│   ├── scripts/               # Setup scripts
│   └── slash-commands/        # Commands for each AI tool
│
├── .claude/commands/          # If Claude selected
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

- **Issues:** [GitHub Issues](https://github.com/yourusername/ai-bootstrap/issues)
- **Discussions:** [GitHub Discussions](https://github.com/yourusername/ai-bootstrap/discussions)
- **Email:** support@ai-bootstrap.dev (if applicable)

---

## 🙏 Acknowledgments

- Inspired by [GitHub Spec-Kit](https://github.com/github/spec-kit)
- Built for the AI-assisted development era
- Community feedback and contributions

---

**Transform your idea into a production-ready backend with AI Bootstrap** 🚀

**Made with ❤️ for the developer community**

