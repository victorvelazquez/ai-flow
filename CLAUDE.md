# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## 📋 About This Project

**AI Bootstrap** is a CLI tool that generates comprehensive backend documentation through interactive questionnaires.

**Purpose:** Transform project ideas into production-ready backends with professional AI-ready documentation in 90-120 minutes.

**Target Users:** Backend developers starting new projects who want to work efficiently with AI assistants.

---

## 🏗️ Project Structure

```
ai-bootstrap/
├── src/
│   └── cli.ts                 # Main CLI application
├── prompts/
│   └── backend.md             # 7-phase master questionnaire
├── templates/                 # 13 document templates
│   ├── AGENT.template.md
│   ├── ai-instructions.template.md
│   ├── project-brief.template.md
│   ├── docs/                  # 6 templates
│   ├── specs/                 # 2 templates
│   ├── README.template.md
│   └── .env.example.template
├── slash-commands/            # Commands for AI tools
│   ├── claude/
│   ├── cursor/
│   └── copilot/
├── scripts/
│   ├── init.sh                # Initialization script
│   └── setup-ai.sh            # AI tool setup
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
ls test-folder/.ai-bootstrap
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

# The CLI is globally accessible as 'ai-bootstrap' via bin config in package.json
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
- Uses `import.meta.url` with `fileURLToPath` to resolve paths in ES module style
- Target: ES2020 with Node.js >=18.0.0

**Commands:**
- `init [path] [--ai <tool>]` - Initialize AI Bootstrap in project
- `check` - Verify if project is initialized and show config

**Dependencies:**
- `commander` - CLI framework
- `inquirer` - Interactive prompts
- `chalk` - Terminal colors
- `ora` - Loading spinners
- `fs-extra` - Enhanced file operations
- `yaml` - YAML parsing (for potential future configs)

**CLI Flow:**
1. User runs `ai-bootstrap init .`
2. Check if already initialized (`.ai-bootstrap/` exists)
3. Prompt for AI tool selection if not provided via `--ai` flag
4. Create `.ai-bootstrap/` structure with core/, prompts/, templates/, scripts/
5. Write config.json with version, aiTools, timestamps
6. Copy templates from package to project
7. Copy master prompts (backend.md)
8. Copy scripts (init.sh, setup-ai.sh) and chmod on Unix
9. Setup slash commands in tool-specific directories:
   - Claude → `.claude/commands/`
   - Cursor → `.cursor/commands/`
   - Copilot → `.github/copilot-commands/`
   - Gemini → `.gemini/commands/`
10. Display next steps and available commands

**Package Structure:**
- Binary entry point: `dist/cli.js` (from `src/cli.ts`)
- Files included in npm package: `dist/`, `prompts/`, `templates/`, `slash-commands/`, `scripts/`
- Users install globally: `npm install -g ai-bootstrap`

### Template System

**Location:** `templates/` (13 markdown templates)

**Templates Overview:**
- `AGENT.template.md` - Universal AI config
- `ai-instructions.template.md` - Tech stack & rules
- `project-brief.template.md` - Business context
- `docs/` (6 templates) - architecture, data-architecture, code-standards, testing, operations, contributing
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
1. AI assistant reads `prompts/backend.md` (7-phase questionnaire)
2. Collects user responses across all phases
3. Reads template files from `.ai-bootstrap/templates/`
4. Performs string replacement on placeholders with gathered data
5. Writes generated files to project root and subdirectories

---

## 📝 Master Prompt (`prompts/backend.md`)

### Structure

**7 Phases:**
1. Discovery & Business (15-20 min)
2. Data Architecture (15-20 min)
3. System Architecture (15-20 min)
4. Security & Auth (15-20 min)
5. Code Standards (15-20 min)
6. Testing (10 min)
7. Operations + Tools (10 min)

**Each Phase:**
- Clear objective
- Interactive questions
- Recommendations (⭐🔥⚡🏆 markers)
- Multiple choice options
- Phase summary for confirmation

**Final Step:**
- Generate all 13 documents
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
   - Master prompt in `prompts/backend.md`
   - Slash commands in `slash-commands/{tool}/`
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
ls -la .ai-bootstrap
ls -la .claude/commands
cat .ai-bootstrap/core/config.json
cd ..
rm -rf test-folder
```

**For Template Changes:**
1. Make changes to template files
2. Rebuild: `npm run build`
3. Initialize in test project
4. Run `/bootstrap` in AI tool
5. Verify generated documents look correct

**For Prompt Changes:**
1. Edit `prompts/backend.md`
2. Rebuild and initialize test project
3. Run through full 7-phase questionnaire
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

| File | Lines | Purpose | When to Edit |
|------|-------|---------|--------------|
| `src/cli.ts` | ~329 | CLI entry point, all commands, file operations | Adding commands, changing initialization logic |
| `prompts/backend.md` | Large | 7-phase master questionnaire | Improving questions, adding phases, changing flow |
| `templates/*.template.md` | 13 files | Document templates with placeholders | Enhancing generated docs, changing structure |
| `templates/AGENT.template.md` | Core | Universal AI config aggregator | Changing AI tool integration |
| `slash-commands/{tool}/*.md` | 8/tool | Bootstrap command definitions | Modifying command behavior for specific AI tools |
| `scripts/init.sh` | Bash | Initialization script | Changing setup automation |
| `scripts/setup-ai.sh` | Bash | AI tool setup script | Adding new AI tool support |
| `package.json` | Config | Dependencies, scripts, bin config | Changing commands, adding dependencies |
| `tsconfig.json` | Config | TypeScript compilation settings | Changing target, module system |
| `README.md` | Docs | User-facing documentation | User-facing changes, features |

### Key Functions in src/cli.ts

| Function | Purpose | Parameters |
|----------|---------|------------|
| `selectAITool()` | Interactive AI tool selection or validate --ai flag | `providedTool?: string` |
| `checkIfInitialized()` | Check if .ai-bootstrap exists | `targetPath: string` |
| `createBootstrapStructure()` | Create folders and config.json | `targetPath: string, aiTools: string[]` |
| `copyTemplates()` | Copy templates/ to project | `targetPath: string` |
| `copyPrompts()` | Copy prompts/ to project | `targetPath: string` |
| `setupSlashCommands()` | Install slash commands for selected tools | `targetPath: string, aiTools: string[]` |
| `copyScripts()` | Copy scripts and chmod | `targetPath: string` |
| `initializeProject()` | Main init orchestration | `targetPath: string, aiTool?: string` |

---

## 🔍 Implementation Details

### Path Resolution Strategy

**Challenge:** CLI is installed globally but needs to copy files from package
**Solution:** Use `import.meta.url` and `fileURLToPath` to find package location

```typescript
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const templatesSource = path.join(__dirname, '..', 'templates');
```

This works because:
1. `dist/cli.js` is compiled output
2. `__dirname` points to `dist/`
3. `..` navigates to package root
4. Package includes `templates/`, `prompts/`, etc. in npm bundle

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

**Location:** `.ai-bootstrap/core/config.json`

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

This enables future frontend/full-stack bootstrap support.

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

Every change should be tested with the **full bootstrap flow**:
1. Initialize a test project
2. Run `/bootstrap` command in AI tool
3. Verify generated documents are correct
4. Check all placeholders are filled
5. Ensure documentation is coherent

### Extensibility Considerations

**Adding a new AI tool:**
1. Add to `AI_TOOLS` array in `src/cli.ts`
2. Add case in `setupSlashCommands()` for folder mapping
3. Create `slash-commands/{tool}/` with 8 command files
4. Update README.md with tool-specific instructions

**Adding a new phase:**
1. Add phase to `prompts/backend.md`
2. Create `/bootstrap-phase{N}.md` for each AI tool
3. Update template placeholders if needed
4. Test full questionnaire flow

**Adding a new template:**
1. Create `templates/{name}.template.md`
2. Add placeholders like `{{VARIABLE}}`
3. Update `prompts/backend.md` to gather needed info
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
# (requires AI tool to run /bootstrap)

# Update questionnaire
vim prompts/backend.md

# Update commands
vim slash-commands/claude/bootstrap.md
npm run dev init test --ai claude
cat test/.claude/commands/bootstrap.md
```

---

**Last Updated:** 2025-01-19
