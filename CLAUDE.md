# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Quick Context

**What:** Node.js/TypeScript CLI that generates professional documentation (15-17 docs) for backend/frontend/mobile/fullstack projects through interactive questionnaires.

**Flow:**
1. User installs: `npm install -g ai-flow-dev`
2. Runs: `ai-flow init .` → Creates `.ai-flow/` with templates, prompts, slash commands
3. Opens AI tool → Executes `/flow-build`
4. AI guides through 8-10 phases → Generates docs filling `{{PLACEHOLDER}}` tokens

**Key files:**
- `src/cli.ts` - All CLI logic (Commander.js + Inquirer)
- `templates/*.template.md` - Document templates with placeholders
- `prompts/backend/` - Phase prompts and workflow commands
- `dist/cli.js` - Compiled entry point (uses `__dirname` for asset resolution)

## Commands

```bash
# Development (uses tsx, no build needed)
npm run dev init test-folder --ai claude --type backend

# Build & test
npm run build          # Compile TypeScript
npm test               # Run Jest tests
npm run lint           # ESLint
npm run format         # Prettier
npm run format:check   # Check formatting

# Test CLI changes
npm run dev init test-folder --ai claude
ls test-folder/.ai-flow
ls test-folder/.claude/commands
rm -rf test-folder
```

## Architecture

**Module System:** ES modules (`"type": "module"` in package.json), TypeScript strict mode

**CLI Commands:**
- `init [path]` - Initialize project with flags: `--ai`, `--type`, `--name`, `--description`, `--verbose`, `--dry-run`
- `check` - Verify initialization status

**Init flow:** `createBuildStructure()` → `copyTemplates()` → `copyPrompts()` → `setupSlashCommands()`

**AI Tool → Slash Command Location:**
- `claude` → `.claude/commands/`
- `cursor` → `.cursor/commands/`
- `copilot` → `.github/prompts/`
- `gemini` → `.gemini/commands/`

**Project Types:** backend, frontend, mobile, fullstack (each has different template sets)

**Two Questionnaire Modes:**
- Interactive: Full control, all questions (90-120 min)
- Smart Auto-Suggest: 6 critical questions, AI suggests rest (15-25 min)

## Template System

Templates use `{{PLACEHOLDER}}` format. They are copied to `.ai-flow/templates/` during init; Phase 8 renders them to project root.

**Critical:** Never modify placeholders when editing templates. Downstream AI agents expand them.

## Workflow Commands (Backend Only)

Located in `prompts/backend/`:
- `flow-dev-feature.md` - Create/modify features with Story Points
- `flow-dev-fix.md` - Bug fixes (adaptive complexity)
- `flow-dev-commit.md` - Conventional commits automation
- `flow-dev-work.md` - Work-in-progress management
- `flow-dev-review.md` - Multi-aspect code review
- `flow-dev-refactor.md` - Quick refactoring

Work artifacts stored in `.ai-flow/work/` with `status.json` for resume capability.

## Cache Contexts (Important)

**This repo:** `cache/docs-analysis.json` at root level - tracks this project's docs
**User projects:** `.ai-flow/cache/docs-analysis.json` - tracks user's docs

These are separate contexts; don't confuse them.

## Code Standards

**Naming:**
- Files: `kebab-case.ts`
- Functions: `camelCase`
- Classes/Interfaces: `PascalCase`
- Constants: `UPPER_SNAKE_CASE`

**Logging:** Use `chalk` (info=cyan/white, warnings=yellow, errors=red)

**Error handling:** Try-catch around I/O, `ora` spinners for progress, user-friendly messages

## Commit Format

```
<type>(<scope>): <subject>

Types: feat, fix, docs, style, refactor, test, chore
Scopes: cli, templates, prompts, commands, docs
```

## Before Committing

```bash
npm run build
npm test
npm run lint
npm run dev init test-project --ai all
ls test-project/.claude/commands
ls test-project/.cursor/commands
ls test-project/.github/prompts
rm -rf test-project
```

## Key Implementation Details

**Path resolution:** CLI uses `__dirname` relative to `dist/cli.js` to locate bundled assets:
```typescript
const ROOT_DIR = path.resolve(__dirname, '..');
const templatesSource = path.join(ROOT_DIR, 'templates');
```

**Config location:** `.ai-flow/core/config.json`
```json
{
  "version": "2.1.3",
  "aiTools": ["claude"],
  "projectType": "backend",
  "createdAt": "..."
}
```

## Extending

**Add AI tool:**
1. Add to `AI_TOOLS` array in `src/cli.ts`
2. Add case in `setupSlashCommands()` for folder mapping
3. Update README.md

**Add phase:**
1. Create `prompts/backend/flow-build-phase-N.md`
2. Update flow-build.md to reference it
3. Add any new template placeholders

**Add template:**
1. Create `templates/{name}.template.md` with `{{PLACEHOLDERS}}`
2. Update prompts to gather values for new placeholders
3. Update AGENT.template.md to reference new doc
