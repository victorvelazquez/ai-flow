# AGENT.md

> Universal AI Assistant Configuration
>
> This file provides context for ALL AI development tools (Claude, Copilot, Cursor, Gemini, etc.) when working with the ai-flow project.

---

## 📋 About This Project

**Project Name:** AI Flow

**Description:** Interactive CLI tool to build AI-ready projects with comprehensive documentation. Generates 15 professional documents for backend and frontend projects (new or existing) through a guided 9-phase questionnaire.

**Problem We're Solving:** Starting a new project requires hours of documentation setup. Existing projects often lack proper AI-ready documentation. Without proper docs, AI assistants work inefficiently and make inconsistent decisions.

**Target Users:** Backend and frontend developers starting new projects who want to work efficiently with AI assistants.

### Technical Context

**Project Type:** CLI Tool (npm package)
**Architecture:** Single-file CLI with modular helper functions
**Primary Language:** TypeScript (strict mode)
**Runtime:** Node.js >=20.0.0
**Module System:** CommonJS
**Framework:** Commander.js (CLI) + Inquirer (prompts)
**Build Tool:** TypeScript Compiler (tsc)
**Testing:** Jest

**Key Characteristics:**

- Authentication: N/A (CLI tool)
- API Style: Command-line interface
- Deployment: npm registry
- Current Phase: Active development (v1.0.8)

> This project uses AI-assisted development with comprehensive documentation.
> All files below provide context to AI assistants for consistent, high-quality code generation.

---

## 🏗️ Documentation Architecture

This project follows **AI-assisted development** with comprehensive documentation.
All documentation is structured to guide AI assistants in understanding the project deeply.

### 📚 Core Documentation (Read in Order)

1. **`.cursorrules`** ⭐ **START HERE FOR CURSOR**

   - Cursor-specific configuration
   - Development workflow
   - Code standards and rules

2. **`CLAUDE.md`**

   - Detailed project architecture
   - Implementation details
   - Development principles
   - Key functions reference

3. **`.github/copilot-instructions.md`**

   - GitHub Copilot playbook
   - Architecture and flow
   - Build and test workflow
   - Project practices

4. **`README.md`**

   - User-facing documentation
   - Installation and usage
   - Features and capabilities
   - Quick start guide

5. **`CONTRIBUTING.md`**

   - Contribution guidelines
   - Development setup
   - Code style standards
   - Testing requirements

6. **`package.json`**

   - Dependencies and versions
   - Scripts and commands
   - Package configuration
   - npm metadata

7. **`src/cli.ts`**
   - Main CLI implementation
   - All commands and logic
   - Helper functions
   - Entry point

---

## 🎯 Project Structure

```
ai-flow/
├── src/
│   ├── cli.ts                 # Main CLI application (~589 lines)
│   └── fs-utils.ts            # File system utilities
├── dist/                      # Compiled output (CommonJS)
│   ├── cli.js
│   └── *.js, *.d.ts, *.map
├── prompts/                   # build prompts (for user projects)
│   ├── backend/               # Backend build prompts
│   │   ├── flow-build.md       # 9-phase master questionnaire
│   │   ├── flow-build-phase-*.md
│   │   └── docs-update.md
│   └── frontend/              # Frontend build prompts
│       ├── flow-build.md
│       └── flow-build-phase-*.md
├── templates/                 # Document templates (for user projects)
│   ├── backend/               # Backend templates
│   ├── frontend/              # Frontend templates
│   └── shared/                # Shared templates (AGENT.md)
├── __tests__/                 # Test files
│   ├── cli.test.js
│   ├── build.test.js
│   └── ...
├── .github/
│   ├── copilot-instructions.md # Copilot playbook
│   └── prompts/               # Development workflow commands
│       ├── flow1.commit.prompt.md
│       ├── flow2.check.prompt.md
│       ├── flow3.release.prompt.md
│       └── flow4.readme.prompt.md
├── .cursor/                    # Cursor configuration (this project)
│   └── commands/              # Cursor slash commands
├── package.json               # Dependencies and scripts
├── tsconfig.json              # TypeScript configuration
├── README.md                  # User-facing documentation
├── CLAUDE.md                  # Detailed architecture guide
├── CONTRIBUTING.md            # Contribution guidelines
├── .cursorrules               # Cursor-specific rules
└── AGENT.md                   # This file
```

---

## 🎯 Critical Rules

### ❌ NEVER

- Hardcode secrets or API keys
- Use `any` types without explicit justification
- Skip reading files before editing (Read → Edit, never Write over existing)
- Modify templates without understanding their purpose (they generate docs for users, not for this project)
- Break the Conventional Commits format
- Commit without running tests (`npm test`)
- Use ESM-only packages in this CommonJS project
- Skip TypeScript strict mode checks
- Change path resolution strategy (`__dirname` relative to `dist/`)

### ✅ ALWAYS

- Read `AGENT.md` first for complete context
- Read files before editing (use Read → Edit pattern)
- Follow TypeScript strict mode
- Use explicit return types for functions
- Use interfaces for object shapes
- Run `npm run build` before committing
- Run `npm test` before committing
- Use Conventional Commits format: `<type>(<scope>): <subject>`
- Preserve `{{PLACEHOLDER}}` tokens in templates (downstream AI agents expand them)
- Test CLI changes with: `npm run dev init test-folder --ai cursor`
- Use `chalk` for consistent logging (info=cyan/white, warnings=yellow, failures=red)
- Validate cross-platform behavior (Windows keeps script perms untouched)

---

## 🏗️ Architecture

### CLI Architecture

**Framework:** Commander.js (command parsing) + Inquirer (interactive prompts)

**Entry Point:** `src/cli.ts` (shebang for CLI execution)

**Module System:**

- TypeScript compiles to CommonJS (`module: "commonjs"` in tsconfig.json)
- Uses `__dirname`-based path resolution to copy assets
- Target: ES2022 with Node.js >=20.0.0

**Commands:**

- `init [path] [--ai <tool>] [--type <type>] [--name <name>] [--description <desc>]` - Initialize AI Flow in project
- `check` - Verify if project is initialized and show config

**Dependencies:**

- `commander` - CLI framework
- `inquirer` - Interactive prompts
- `chalk` - Terminal colors
- `ora` - Loading spinners
- `fs-extra` - Enhanced file operations
- `ejs` - Template rendering

**CLI Flow:**

1. User runs `ai-flow init .`
2. Check if already initialized (`.ai-flow/` exists)
3. Prompt for AI tool selection if not provided via `--ai` flag
4. Prompt for project type (backend/frontend) if not provided via `--type` flag
5. Create `.ai-flow/` structure with core/, prompts/, templates/
6. Write config.json with version, aiTools, projectType, timestamps
7. Copy templates from package to project
8. Copy Master prompts (backend/flow-build.md or frontend/flow-build.md and phase files)
9. Set up slash commands in tool-specific directories:
   - Claude → `.claude/commands/`
   - Cursor → `.cursor/commands/`
   - Copilot → `.github/prompts/*.prompt.md`
   - Gemini → `.gemini/commands/`
10. Display next steps and available commands

**Package Structure:**

- Binary entry point: `dist/cli.js` (from `src/cli.ts`)
- Files included in npm package: `dist/`, `prompts/`, `templates/`
- Users install globally: `npm install -g ai-flow`

### Path Resolution Strategy

**Challenge:** CLI is installed globally but needs to copy files from the package

**Solution:** Use `__dirname` to resolve the packaged assets relative to `dist/cli.js`

```typescript
const ROOT_DIR = path.resolve(__dirname, "..");
const templatesSource = path.join(ROOT_DIR, "templates");
```

This works because:

1. `dist/cli.js` is compiled output
2. `__dirname` points to `dist/`
3. `ROOT_DIR` normalizes the package root
4. The npm bundle includes `templates/`, `prompts/`, etc.

### AI Tool Mapping

**Tool → Configuration Location:**

- `claude` → `.claude/commands/`
- `cursor` → `.cursor/commands/`
- `copilot` → `.github/prompts/*.prompt.md`
- `gemini` → `.gemini/commands/`
- `all` → Expands to array of all tools

### Config Structure

**Location:** `.ai-flow/core/config.json`

**Schema:**

```json
{
  "version": "1.0.8",
  "aiTools": ["cursor"],
  "createdAt": "2025-01-XXT...",
  "projectType": "backend",
  "backend": true,
  "frontend": false
}
```

---

## 🚀 Development Workflow

### Common Commands

**Development:**

```bash
npm run dev init . --ai cursor          # Development mode (ts-node, no build)
npm run build                           # Build TypeScript to dist/
npm start init .                        # Run built CLI
npm test                                # Run tests
npm run lint                            # Run linter
```

**Testing Changes Locally:**

```bash
npm run build
npm run dev init test-folder --ai cursor
cd test-folder
ls -la .ai-flow
ls -la .cursor/commands
cd ..
rm -rf test-folder
```

**Package Distribution:**

```bash
npm run prepare                         # Prepare for publishing (runs build)
npm publish --access public             # Publish to npm
```

### Before Making Changes

1. Read `AGENT.md` for project context
2. Read `CLAUDE.md` for architecture details
3. Understand the feature/bug request
4. Review affected code areas (likely `src/cli.ts` or template files)

### While Coding

1. Follow TypeScript strict mode
2. Add JSDoc comments for exported functions
3. Test locally with `npm run dev`
4. Check compilation with `npm run build`
5. Run linter: `npm run lint`

### Before Committing

```bash
npm run build                           # Build succeeds
npm test                                # All tests pass
npm run lint                            # No linting errors
```

### Commit Format

Use Conventional Commits:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `ci`, `perf`, `revert`
**Scopes:** `cli`, `templates`, `prompts`, `commands`, `docs`, `deps`, `config`, `readme`

**Examples:**

- `feat(cli): add frontend project type support`
- `fix(templates): correct placeholder syntax`
- `docs(readme): update installation instructions`
- `chore(deps): upgrade chalk to v5.6.2`

---

## 📝 Key Files Reference

| File                                      | Purpose                                         | When to Edit                                        |
| ----------------------------------------- | ----------------------------------------------- | --------------------------------------------------- |
| `src/cli.ts`                              | CLI entry point, all commands, file operations  | Adding commands, changing initialization logic      |
| `prompts/backend/flow-build.md`           | 9-phase master questionnaire                    | Improving questions, adding phases, changing flow   |
| `prompts/backend/project-scaffold.md`     | Complete project structure generation (0→1)     | Modifying scaffold phases, adding framework support |
| `prompts/backend/flow-project-roadmap.md` | Implementation roadmap with Story Points        | Changing roadmap format, SP scale, epic structure   |
| `prompts/backend/feature.md`              | Feature workflow with Story Points              | Updating SP estimates, task format, phase structure |
| `prompts/frontend/flow-build.md`          | Frontend 9-phase questionnaire                  | Frontend-specific improvements                      |
| `templates/*.template.md`                 | Document templates with placeholders            | Enhancing generated docs, changing structure        |
| `package.json`                            | Dependencies, scripts, bin config               | Changing commands, adding dependencies              |
| `tsconfig.json`                           | TypeScript compilation settings                 | Changing target, module system                      |
| `README.md`                               | User-facing documentation                       | User-facing changes, features                       |
| `GETTING-STARTED.md`                      | Complete tutorial (beginner/regular/power user) | Adding tutorials, workflow examples                 |
| `CLAUDE.md`                               | Detailed architecture guide                     | Architecture changes, implementation details        |
| `.cursorrules`                            | Cursor-specific configuration                   | Cursor workflow, rules                              |
| `.github/copilot-instructions.md`         | GitHub Copilot playbook                         | Copilot-specific guidance, research checklist       |
| `.github/prompts/*.prompt.md`             | Development workflow commands                   | Development automation                              |

### Key Functions in src/cli.ts

| Function                 | Purpose                                             | Parameters                               |
| ------------------------ | --------------------------------------------------- | ---------------------------------------- |
| `selectAITool()`         | Interactive AI tool selection or validate --ai flag | `providedTool?: string`                  |
| `selectProjectType()`    | Interactive project type selection                  | `providedType?: string`                  |
| `checkIfInitialized()`   | Check if .ai-flow exists                            | `targetPath: string`                     |
| `createBuildStructure()` | Create folders and config.json                      | `targetPath, aiTools, projectType, ...`  |
| `renderTemplates()`      | Copy and render templates to project                | `targetPath, projectData, projectType`   |
| `copyPrompts()`          | Copy prompts/ to project                            | `targetPath: string`                     |
| `setupSlashCommands()`   | Install slash commands for selected tools           | `targetPath, aiTools, projectType`       |
| `initializeProject()`    | Main init orchestration                             | `targetPath, aiTool?, projectType?, ...` |

---

## 🎯 Development Principles

### Core Principles

1. **AI-Agnostic Design** - Works with all AI tools (Claude, Copilot, Cursor, Gemini)
2. **Template-Based Generation** - Use placeholders, fill from questionnaire responses
3. **Documentation as Code** - Documents guide AI assistants like config guides compilers
4. **Interactive Experience** - Guide users, don't assume
5. **Professional Quality** - Generated docs should be production-ready
6. **Single Source of Truth** - AGENT.md as universal entry point

### Code Quality Standards

**TypeScript Configuration:**

- Strict mode enabled
- Explicit return types for functions
- Interfaces for object shapes
- No `any` types without justification

**Naming Conventions:**

- Files: `kebab-case.ts`
- Classes/Interfaces: `PascalCase`
- Functions: `camelCase`
- Constants: `UPPER_SNAKE_CASE`

**Error Handling:**

- Try-catch blocks around all I/O operations
- `ora` spinners show success/fail states
- `chalk.red()` for errors, `chalk.yellow()` for warnings
- User-friendly error messages

---

## 🔍 Important Notes

### Templates vs Project Documentation

**CRITICAL:** The `templates/` directory contains templates for **user projects**, not for documenting this project (ai-flow). These templates are:

- Copied to user projects when they run `ai-flow init`
- Used to generate documentation in user projects
- NOT used to document ai-flow itself

**For documenting ai-flow, use:**

- `README.md` - User-facing docs
- `CLAUDE.md` - Architecture guide
- `AGENT.md` - This file
- `.cursorrules` - Cursor config
- `.github/copilot-instructions.md` - Copilot config

### Testing Philosophy

Every change should be tested with the **full build flow**:

1. Initialize a test project
2. Run `/flow-build` command in AI tool
3. Verify generated documents are correct
4. Check all placeholders are filled
5. Ensure documentation is coherent

---

## 📚 Additional Resources

- **Repository:** https://github.com/victorvelazquez/ai-flow
- **npm Package:** https://www.npmjs.com/package/ai-flow
- **Issues:** https://github.com/victorvelazquez/ai-flow/issues

---

**Always reference this AGENT.md for complete project understanding.**

**Last Updated:** 2025-01-XX
**Version:** 1.0.8
