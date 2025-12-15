# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## 🎯 RESUMEN EJECUTIVO (Quick Context)

**Qué es:** CLI de Node.js/TypeScript que genera 15 documentos de backend profesionales mediante cuestionario interactivo de 7 fases

**Flujo principal:**

1. Usuario instala globalmente: `npm install -g ai-flow`
2. Ejecuta: `ai-flow init .` → Crea `.ai-flow/` con templates, prompts, slash commands
3. Abre AI tool (Claude/Cursor/Copilot/Gemini) → Ejecuta `/flow-build`
4. AI lee `prompts/backend/flow-build.md` → Hace 9 fases de preguntas
5. AI genera 15 archivos .md llenando placeholders `{{VARIABLE}}` en templates

**Arquitectura clave:**

- `src/cli.ts` (329 líneas) - Toda la lógica CLI (Commander.js + Inquirer)
- `templates/*.template.md` (15 archivos) - Templates con placeholders
- `prompts/backend/flow-build.md` - Cuestionario maestro de 9 fases
- `dist/cli.js` - Punto de entrada npm bin (usa `__dirname` para copiar assets)

**Para desarrollo:** `npm run dev init test --ai claude` (ts-node, no build)

**Reglas críticas:**

- SIEMPRE leer archivos antes de editar (Read → Edit, nunca Write sobre existentes)
- Templates usan `{{PLACEHOLDER_FORMAT}}`
- Path resolution: `__dirname` relativo a `dist/` para copiar assets desde package instalado
- TypeScript strict mode habilitado
- Comandos slash se copian de `prompts/backend/` a `.{tool}/commands/`

**Si necesitas más detalle:** Lee secciones específicas abajo ↓

---

## 📋 About This Project

**AI Flow** is a CLI tool that generates comprehensive backend documentation through interactive questionnaires.

**Purpose:** Transform project ideas into production-ready backends with professional AI-ready documentation in 90-120 minutes.

**Target Users:** Backend developers starting new projects who want to work efficiently with AI assistants.

---

## 🏗️ Project Structure

```
ai-flow/
├── src/
│   └── cli.ts                 # Main CLI application
├── prompts/
│   └── backend/
│       └── flow-build.md       # 9-phase master questionnaire
├── templates/                 # 15 document templates
│   ├── AGENT.template.md
│   ├── ai-instructions.template.md
│   ├── copilot-instructions.template.md
│   ├── project-brief.template.md
│   ├── docs/                  # 8 templates
│   ├── specs/                 # 2 templates
│   ├── README.template.md
│   └── .env.example.template
├── prompts/backend/           # slash commands (build*.md, docs-update.md)
│   ├── claude/
│   ├── cursor/
│   └── copilot/
├── package.json
├── tsconfig.json
├── README.md                  # Project documentation
└── CLAUDE.md                  # This file
```

---

## ⚙️ Common Commands

### Development

```bash
# Development mode with ts-node (no build required)
npm run dev init . --ai claude

# Build TypeScript to dist/
npm run build

# Run built CLI
npm start init .

# Run tests
npm test
```

### Testing Changes Locally

```bash
# Build first
npm run build

# Test init command in a test directory
npm run dev init test-folder --ai claude

# Verify created structure
ls test-folder/.ai-flow
ls test-folder/.claude/commands

# Test check command
cd test-folder && npm run dev check

# Clean up
rm -rf test-folder
```

### Package Distribution

```bash
# Prepare for publishing (runs build automatically)
npm run prepare

# The CLI is globally accessible as 'ai-flow' via bin config in package.json
```

---

## 🎯 Development Philosophy

### Core Principles

1. **AI-Agnostic Design** - Works with all AI tools (Claude, Copilot, Cursor, Gemini)
2. **Template-Based Generation** - Use placeholders, fill from questionnaire responses
3. **Documentation as Code** - Documents guide AI assistants like config guides compilers
4. **Interactive Experience** - Guide users, don't assume
5. **Professional Quality** - Generated docs should be production-ready

### AGENT.md Standard

- Universal configuration file all AI tools can read
- Acts as aggregator pointing to detailed docs
- Single source of truth across AI tools

---

## 🏛️ Architecture

### CLI Architecture

**Framework:** Commander.js (command parsing) + Inquirer (interactive prompts)

**Entry Point:** `src/cli.ts` (shebang for CLI execution)

**Module System:**

- TypeScript compiles to CommonJS (`module: "commonjs"` in tsconfig.json)
- Uses `__dirname`-based path resolution to copy assets
- Target: ES2022 with Node.js >=20.0.0

**Commands:**

- `init [path] [--ai <tool>]` - Initialize AI Flow in project
- `check` - Verify if project is initialized and show config

**Dependencies:**

- `commander` - CLI framework
- `inquirer` - Interactive prompts
- `chalk` - Terminal colors
- `ora` - Loading spinners
- `fs-extra` - Enhanced file operations

**CLI Flow:**

1. User runs `ai-flow init .`
2. Check if already initialized (`.ai-flow/` exists)
3. Prompt for AI tool selection if not provided via `--ai` flag
4. Create `.ai-flow/` structure with core/, prompts/, templates/
5. Write config.json with version, aiTools, timestamps
6. Copy templates from package to project
7. Copy Master prompts (backend/flow-build.md and phase files)
8. Set up slash commands in tool-specific directories:
   - Claude → `.claude/commands/`
   - Cursor → `.cursor/commands/`
   - Copilot → `.github/copilot-commands/`
   - Gemini → `.gemini/commands/`
9. Display next steps and available commands

**Package Structure:**

- Binary entry point: `dist/cli.js` (from `src/cli.ts`)
- Files included in npm package: `dist/`, `prompts/`, `templates/`
- Users install globally: `npm install -g ai-flow`

### Template System

**Location:** `templates/` (13 markdown templates)

**Templates Overview:**

- `AGENT.template.md` - Universal AI config
- `ai-instructions.template.md` - Tech stack & rules
- `project-brief.template.md` - Business context
- `docs/` (6 templates) - architecture, data-model, code-standards, testing, operations, contributing
- `specs/` (2 templates) - security, configuration
- `README.template.md` - Project readme
- `copilot-instructions.template.md` - Copilot-specific
- `.env.example.template` - Environment variables

**Placeholder Format:** `{{VARIABLE_NAME}}`

- Examples: `{{PROJECT_NAME}}`, `{{PROJECT_DESCRIPTION}}`, `{{TARGET_USERS}}`

**Advanced Placeholders (Not currently implemented but documented):**

- Conditionals: `{{#IF_CONDITION}}...{{/IF_CONDITION}}`
- Loops: `{{#EACH ITEM}}{{ITEM_PROPERTY}}{{/EACH}}`

**Generation Process:**

1. AI assistant reads `prompts/backend/flow-build.md` (9-phase questionnaire)
2. Collects user responses across all phases
3. Reads template files from `.ai-flow/templates/`
4. Performs string replacement on placeholders with gathered data
5. Writes generated files to project root and subdirectories

---

## 🔄 Workflow System (v2.0)

### Overview

AI Flow 2.0 introduces structured workflow commands for backend development, inspired by Spec-Kit, OpenSpec, and BMAD-METHOD. These workflows provide:

- ✅ Structured development process (spec → plan → implementation → archive)
- ✅ Work-in-progress management with resume capability
- ✅ Automatic documentation updates
- ✅ Auditable history in archive/
- ✅ 60-70% time savings on typical development

### Architecture

**Directory Structure:**

```
.ai-flow/
├── work/                    # Active work-in-progress
│   ├── feature-[name]/
│   │   ├── spec.md         # Requirements
│   │   ├── plan.md         # Technical approach
│   │   ├── tasks.md        # Task list with ✅
│   │   └── status.json     # Metadata
│   └── fix-[name]/
│       ├── analysis.md     # Root cause analysis
│       ├── solution.md     # Fix details
│       └── tasks.md        # Fix steps
├── archive/                 # Completed work (YYYY-MM/)
│   └── 2025-01/
│       ├── feature-[name]/
│       └── fix-[name]/
└── reviews/                 # Code review reports
    └── YYYY-MM-DD-HH-MM/
        ├── report.md
        ├── security.md
        └── performance.md
```

### Workflow Commands

**7 Core Commands** (~2,700+ lines total):

| Command                 | Lines  | Purpose                                           | Time                   |
| ----------------------- | ------ | ------------------------------------------------- | ---------------------- |
| `/project-scaffold`     | ~1,060 | Generate complete project structure               | 90-120 min (automated) |
| `/flow-project-roadmap` | ~1,130 | Create implementation roadmap with Story Points   | 15-30 min (automated)  |
| `/feature`              | ~1,320 | Create/modify/refactor features with Story Points | 15-20 min              |
| `/fix`                  | ~100   | Fix bugs (auto-detects complexity)                | 3-15 min               |
| `/work`                 | ~80    | Manage work in progress                           | Instant                |
| `/review`               | ~120   | Multi-aspect code review                          | 5 min                  |
| `/refactor-quick`       | ~80    | Quick refactoring without spec                    | 3-5 min                |

### File Locations

**Prompt Files:**

- `prompts/backend/project-scaffold.md` - Complete project structure generation (0→1)
- `prompts/backend/flow-project-roadmap.md` - Implementation roadmap with Story Points (Fibonacci scale)
- `prompts/backend/feature.md` - Feature workflow with Story Points estimation
- `prompts/backend/fix.md` - Bug fix workflow
- `prompts/backend/work.md` - Work management
- `prompts/backend/review.md` - Code review
- `prompts/backend/refactor-quick.md` - Quick refactoring

**Installation:** Commands are automatically copied to `.{tool}/commands/` via `setupSlashCommands()` function in `src/cli.ts`.

### Key Features

**Project Scaffold (`/project-scaffold`):**

- 6-phase automated setup: Context → Framework Init → Clean Architecture → Testing → Quality → DevOps
- Generates 40-60 source files with TODO comments
- Creates 20-30 test file skeletons
- Full Docker + CI/CD configuration
- 90-120 minutes automated (vs 2-3 weeks manual)

**Project Roadmap (`/flow-project-roadmap`):**

- 5-phase breakdown: Doc Analysis → Epic Definition → Feature Breakdown → Dependencies → Document Generation
- Story Points using Fibonacci scale (1, 2, 3, 5, 8, 13, 21)
- Time estimates for 1, 2, or 3 developers
- Mermaid dependency graphs
- Production readiness checklist (50+ items)
- Output: `docs/roadmap.md`

**Feature Workflow (`/feature`):**

- 4-phase process: Spec → Plan → Implementation → Archive
- Story Points estimation with Fibonacci scale
- Auto-generates spec.md, plan.md, tasks.md with checkbox format
- Simple features: ~3 SP (~15-20 min), Complex features: ~34 SP (~2-3 hours)
- Security check before archiving
- Updates affected docs automatically

**Bug Fix Workflow (`/fix`):**

- Adaptive complexity detection (simple vs complex)
- Simple: 3-5 min (direct fix + test)
- Complex: 10-15 min (root cause analysis + comprehensive fix)
- Archives with summary or full analysis

**Work Management (`/work`):**

- List active tasks with progress
- Resume interrupted work without context loss
- Archive completed work with doc updates
- Status tracking via status.json

**Code Review (`/review`):**

- 5-perspective analysis: Security, Performance, Testing, Architecture, Quality
- Prioritized report: 🔴 Critical, 🟡 Warnings, 🟢 Suggestions
- Reviews current changes, specific features, or full modules

**Quick Refactoring (`/refactor-quick`):**

- No spec/plan overhead (vs `/feature refactor`)
- Extract methods, rename, move logic
- 3-5 minutes vs 15-20 minutes

### status.json Schema

```json
{
  "name": "feature-notifications",
  "type": "feature",
  "subtype": "new" | "change" | "refactor",
  "status": "in_progress" | "completed",
  "phase": "spec" | "plan" | "implementation" | "done",
  "progress": {
    "completed": 12,
    "total": 18,
    "percentage": 67
  },
  "created": "2025-01-20T10:00:00Z",
  "updated": "2025-01-20T15:30:00Z",
  "filesCreated": ["src/entities/Notification.entity.ts"],
  "filesModified": ["src/app.ts"],
  "affectedDocs": ["docs/api.md", "docs/data-model.md"]
}
```

### Development Workflow Example

**Complete 0→1→N Flow (New Project):**

```bash
# Day 1: Generate documentation
/build
# → 90-120 minutes: Complete professional documentation (17 docs)

# Day 1-2: Generate project structure
/project-scaffold
# → 90-120 minutes automated: Complete Clean Architecture setup
# → Creates 40-60 source files, 20-30 test files, Docker, CI/CD

# Day 2: Generate implementation roadmap
/flow-project-roadmap
# → 15-30 minutes automated: Complete task breakdown with Story Points
# → Output: docs/roadmap.md with Epics, Features, Dependencies

# Day 3+: Execute features from roadmap
/feature new "Base application configuration"  # From roadmap Epic 1
# → 15-20 minutes: Complete with tests + docs (5 SP)

/feature new "Database connection and migrations"  # From roadmap Epic 1
# → 30-40 minutes: Complete with tests + docs (8 SP)

# Bug reported
/fix "Login returns 500 when email not found"
# → 4 minutes: Fixed with test case

# Meeting interruption
# Work saved in .ai-flow/work/

# After meeting: Resume
/work resume feature-notifications
# → Continues from exact task

# Code review before merge
/review feature-notifications
# → 5 minutes: Multi-aspect analysis with report
```

**Existing Project Flow:**

```bash
# Existing codebase: Generate documentation
/build
# → 35-70 minutes: Smart detection pre-fills 40-60% of answers

# Existing codebase: Generate roadmap for new features
/flow-project-roadmap
# → 15-30 minutes: Creates roadmap based on existing architecture

# Continue with /feature commands as normal
```

### Testing Workflow Commands

```bash
# Test workflow command installation
npm run dev init test-project --ai claude
ls test-project/.claude/commands/

# Verify all workflow commands present
cat test-project/.claude/commands/feature.md
cat test-project/.claude/commands/fix.md
cat test-project/.claude/commands/work.md
cat test-project/.claude/commands/review.md
cat test-project/.claude/commands/refactor-quick.md

# Test in AI tool
cd test-project
# Run: /feature "test feature"
# Verify: .ai-flow/work/ structure created
```

### When to Edit Workflow Files

**Edit workflow prompts when:**

- Improving question flow or clarity
- Adding new workflow phases
- Enhancing validation logic
- Updating examples or output formats

**Workflow files reference each other:**

- `/feature` can trigger `/review` at completion
- `/work` lists all active `/feature` and `/fix` tasks
- `/review` can analyze work from `/feature` or `/fix`

### Benefits vs Traditional Development

**Without Workflows:**

- ⏱️ 60-90 min per feature (coding + tests + docs manual)
- 📝 Documentation drift/inconsistency
- 🔄 Context loss on interruptions
- 🐛 No systematic quality checks

**With Workflows:**

- ⏱️ 15-20 min per feature (automated)
- 📝 Documentation always synchronized
- 🔄 Resume without context loss
- 🐛 Built-in code review + security checks

---

## 📝 Master prompt (`prompts/backend/flow-build.md`)

### Structure

**7 Phases:**

1. Discovery & Business (15-20 min)
2. Data Architecture (15-20 min)
3. System Architecture (15-20 min)
4. Security & Authentication (15-20 min)
5. Code Standards (15-20 min)
6. Testing Strategy (10 min)
7. Operations & Deployment (10 min)

**Each Phase:**

- Clear objective
- Interactive questions
- Recommendations (⭐🔥⚡🏆 markers)
- Multiple choice options
- Phase summary for confirmation

**Final Step:**

- Generate all 15 documents
- Fill templates with gathered information
- Validate completeness
- Provide next steps

---

## ✅ Code Quality Standards

### TypeScript Configuration

**Strict Mode:** Enabled in tsconfig.json

- `strict: true` - All strict type checking options
- `forceConsistentCasingInFileNames: true`
- `skipLibCheck: true` - Skip type checking of declaration files
- `resolveJsonModule: true` - Allow importing JSON files
- `declaration: true` - Generate .d.ts files
- `sourceMap: true` - Generate source maps for debugging

**Type Safety:**

- No `any` types without explicit justification
- Explicit return types for functions
- Interfaces for object shapes
- Avoid type assertions (`as`) unless necessary

### File Organization

- **Single-file CLI:** Currently `src/cli.ts` contains all logic
- **Future structure:** May split into `src/commands/`, `src/utils/`, `src/types/`
- **Co-located tests:** `*.spec.ts` or `*.test.ts`
- **Templates stay separate:** Not part of compiled code

### Naming Conventions

- **Files:** `kebab-case.ts`
- **Classes/Interfaces:** `PascalCase` (e.g., `AIToolChoice`)
- **Functions:** `camelCase` (e.g., `selectAITool`, `checkIfInitialized`)
- **Constants:** `UPPER_SNAKE_CASE` (e.g., `AI_TOOLS`)
- **Private functions:** Prefix with underscore if needed (e.g., `_internal`)

### Error Handling

**Current Patterns:**

- Try-catch blocks around all I/O operations
- `ora` spinners show success/fail states
- `chalk.red()` for error messages, `chalk.yellow()` for warnings
- `process.exit(1)` for fatal errors
- User-friendly error messages (avoid raw stack traces)
- Validate `--ai` flag against known tools

**Example:**

```typescript
try {
  const spinner = ora('Creating structure...').start();
  await fs.ensureDir(path);
  spinner.succeed('Created structure');
} catch (error) {
  spinner.fail('Failed to create structure');
  throw error;
}
```

---

## 🚀 Development Workflow

### Before Making Changes

1. Read `README.md` for project overview
2. Understand the feature/bug request
3. Review affected code areas (likely `src/cli.ts` or template files)
4. Check if changes require updating:
   - Templates in `templates/`
   - Master prompt in `prompts/backend/flow-build.md`
   - Slash commands copied from `prompts/backend/` to `.{tool}/commands/`
   - README.md if user-facing

### While Coding

1. Follow TypeScript strict mode
2. Add JSDoc comments for exported functions
3. Test locally with `npm run dev`
4. Check compilation with `npm run build`
5. Note: No linter currently configured (consider adding ESLint)

### Testing Changes

**For CLI Changes:**

```bash
npm run build
npm run dev init test-folder --ai claude
cd test-folder
ls -la .ai-flow
ls -la .claude/commands
cat .ai-flow/core/config.json
cd ..
rm -rf test-folder
```

**For Template Changes:**

1. Make changes to template files
2. Rebuild: `npm run build`
3. Initialize in test project
4. Run `/flow-build` in AI tool
5. Verify generated documents look correct

**For Prompt Changes:**

1. Edit `prompts/backend/flow-build.md` or individual phase files
2. Rebuild and initialize test project
3. Run through full 9-phase questionnaire
4. Verify all questions work and flow properly

### Before Committing

```bash
# Build succeeds
npm run build

# Test in clean directory
npm run dev init test-project --ai all

# Verify all AI tools get slash commands
ls test-project/.claude/commands
ls test-project/.cursor/commands
ls test-project/.github/copilot-commands

# Clean up
rm -rf test-project
```

### Commit Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:** feat, fix, docs, style, refactor, test, chore

**Scopes:** cli, templates, prompts, commands, docs

**Example:**

```
feat(cli): add interactive AI tool selection

- Implement inquirer prompts for AI tool choice
- Add validation for tool selection
- Update CLI help text

Closes #42
```

---

## 📚 Key Files Reference

| File                                | Lines    | Purpose                                        | When to Edit                                      |
| ----------------------------------- | -------- | ---------------------------------------------- | ------------------------------------------------- |
| `src/cli.ts`                        | ~329     | CLI entry point, all commands, file operations | Adding commands, changing initialization logic    |
| `prompts/backend/flow-build.md`     | Large    | 9-phase master questionnaire                   | Improving questions, adding phases, changing flow |
| `prompts/backend/feature.md`        | ~150     | Feature workflow (create/modify/refactor)      | Improving feature workflow, adding phases         |
| `prompts/backend/fix.md`            | ~100     | Bug fix workflow (adaptive complexity)         | Improving bug fix process, complexity detection   |
| `prompts/backend/work.md`           | ~80      | Work management (list/resume/archive)          | Improving work management features                |
| `prompts/backend/review.md`         | ~120     | Code review workflow (multi-aspect)            | Adding review perspectives, improving criteria    |
| `prompts/backend/refactor-quick.md` | ~80      | Quick refactoring workflow                     | Adding refactor types, improving speed            |
| `templates/*.template.md`           | 13 files | Document templates with placeholders           | Enhancing generated docs, changing structure      |
| `templates/AGENT.template.md`       | Core     | Universal AI config aggregator                 | Changing AI tool integration                      |
| `slash-commands/{tool}/*.md`        | 13/tool  | Build + workflow command definitions           | Modifying command behavior for specific AI tools  |
| `package.json`                      | Config   | Dependencies, scripts, bin config              | Changing commands, adding dependencies            |
| `tsconfig.json`                     | Config   | TypeScript compilation settings                | Changing target, module system                    |
| `README.md`                         | Docs     | User-facing documentation                      | User-facing changes, features                     |

### Key Functions in src/cli.ts

| Function                 | Purpose                                             | Parameters                              |
| ------------------------ | --------------------------------------------------- | --------------------------------------- |
| `selectAITool()`         | Interactive AI tool selection or validate --ai flag | `providedTool?: string`                 |
| `checkIfInitialized()`   | Check if .ai-flow exists                            | `targetPath: string`                    |
| `createBuildStructure()` | Create folders and config.json                      | `targetPath: string, aiTools: string[]` |
| `copyTemplates()`        | Copy templates/ to project                          | `targetPath: string`                    |
| `setupSlashCommands()`   | Install slash commands for selected tools           | `targetPath: string, aiTools: string[]` |
| `initializeProject()`    | Main init orchestration                             | `targetPath: string, aiTool?: string`   |

---

## 🔍 Implementation Details

### Path Resolution Strategy

**Challenge:** CLI is installed globally but needs to copy files from the package
**Solution:** Use `__dirname` to resolve the packaged assets relative to `dist/cli.js`

```typescript
const ROOT_DIR = path.resolve(__dirname, '..');
const templatesSource = path.join(ROOT_DIR, 'templates');
```

This works because:

1. `dist/cli.js` is compiled output
2. `__dirname` points to `dist/`
3. `ROOT_DIR` normalizes the package root
4. The npm bundle includes `templates/`, `prompts/`, etc.

### File Operations

**Library:** `fs-extra` (enhanced fs with promises)

**Common Patterns:**

- `fs.pathExists(path)` - Check if file/folder exists
- `fs.ensureDir(path)` - Create directory recursively
- `fs.copy(src, dest)` - Copy files/folders
- `fs.writeJSON(path, obj, {spaces: 2})` - Write formatted JSON
- `fs.readJSON(path)` - Read and parse JSON
- `fs.chmod(path, mode)` - Change permissions (Unix)

### AI Tool Mapping

**Tool → Configuration Location:**

- `claude` → `.claude/commands/`
- `cursor` → `.cursor/commands/`
- `copilot` → `.github/copilot-commands/`
- `gemini` → `.gemini/commands/`
- `all` → Expands to array of all tools

**Note:** Gemini support is prepared but not widely documented yet

### Config Structure

**Location:** `.ai-flow/core/config.json`

**Schema:**

```json
{
  "version": "1.0.0",
  "aiTools": ["claude"],
  "createdAt": "2025-01-19T...",
  "backend": true,
  "frontend": false
}
```

This enables future frontend/full-stack build support.

---

## 🎯 Development Principles

### Vision

Transform project ideas into production-ready, AI-assisted development environments through:

1. **Comprehensive documentation** - 13 interconnected documents
2. **AI-agnostic approach** - Works with all AI tools
3. **Interactive experience** - Guide users through decisions
4. **Professional quality** - Generated docs should be production-ready
5. **Single source of truth** - AGENT.md as universal entry point

### Testing Philosophy

Every change should be tested with the **full build flow**:

1. Initialize a test project
2. Run `/flow-build` command in AI tool
3. Verify generated documents are correct
4. Check all placeholders are filled
5. Ensure documentation is coherent

### Extensibility Considerations

**Adding a new AI tool:**

1. Add to `AI_TOOLS` array in `src/cli.ts`
2. Add case in `setupSlashCommands()` for folder mapping
3. Slash commands are automatically copied from `prompts/backend/` to `.{tool}/commands/`
4. Update README.md with tool-specific instructions

**Adding a new phase:**

1. Add phase file to `prompts/backend/` (e.g., `flow-build-phase-10-new.md`)
2. Create `/flow-build-phase-{N}.md` for each AI tool
3. Update template placeholders if needed
4. Test full questionnaire flow

**Adding a new template:**

1. Create `templates/{name}.template.md`
2. Add placeholders like `{{VARIABLE}}`
3. Update `prompts/backend/flow-build.md` to reference new phase
4. Update AGENT.md template to reference new doc

---

## 🚀 Quick Reference

**Most common development tasks:**

```bash
# Make CLI changes
vim src/cli.ts
npm run build
npm run dev init test --ai claude

# Update templates
vim templates/AGENT.template.md
npm run build

# Test template generation
# (requires AI tool to run /flow-build)

# Update questionnaire
vim prompts/backend/flow-build.md

# Update commands
vim prompts/backend/flow-build.md
npm run dev init test --ai claude
cat test/.claude/commands/flow-build.md
```

---

**Last Updated:** 2025-12-04 (Added Workflow System v2.0 documentation)
