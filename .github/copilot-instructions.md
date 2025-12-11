# GitHub Copilot Playbook

- **Project focus:** Ship an npm-distributed CLI that scaffolds AI-ready documentation for backend projects.
- **Authoritative docs:** Start with `README.md` for product flow and `templates/AGENT.template.md` for global AI conventions; mirror them when updating outputs.
- **Runtime expectations:** Node.js 18+, TypeScript sources in `src/` compiled to `dist/`; CLI entry is `src/cli.ts`.
- **Deliverable shape:** `.ai-flow/` tree plus AI-tool specific configs (`.claude`, `.cursor`, `.github/copilot-commands`, etc.) copied from repo templates.

## Architecture & Flow

- `src/cli.ts` is the only executable source today; it wires Commander CLI commands (`init`, `check`) to filesystem tasks with `fs-extra`, progress feedback via `ora`, and prompts through `inquirer`.
- `init` composes helper steps: `createBuildStructure` → `copyTemplates` → `copyPrompts` → `setupSlashCommands`; stay consistent with that order when extending.
- Tool selection lives in `AI_TOOLS`; adding a tool requires new slash-command directory, script branch, and inclusion in `.ai-flow/core/config.json` generation.
- The generated `.ai-flow/templates/**` files are copied verbatim; preserve `{{PLACEHOLDER}}` tokens because downstream AI agents expand them.

## Build & Test Workflow

- Install deps with `npm install`; build the distributable via `npm run build` (invokes `tsc` with `tsconfig.json`).
- Local iteration uses `npm run dev` (`ts-node src/cli.ts`); ensure Commander commands still resolve relative paths correctly when running from source.
- Jest is configured but no tests ship yet; if you add specs, match CommonJS output or adjust `ts-jest` setup before running `npm test`.
- Publishable assets are controlled by the `files` array in `package.json`; include new template/shell directories there to expose them on npm.

## Project Practices

- **Documentation structure:** `README.md` is overview and installation, `GETTING-STARTED.md` is complete tutorial with 3-tier approach (beginner/regular/power user). Keep them consistent.
- **Documentation-first ethos:** Every new feature should surface in `templates/` and, if user-facing, in both `README.md` (brief mention) and `GETTING-STARTED.md` (detailed tutorial).
- **Cross-references:** Always add links between README ↔ GETTING-STARTED when introducing new features or commands.
- Prefer ASCII in code/templates unless updating files that already rely on emoji (most prompts intentionally include them).
- When touching prompts (`prompts/backend.md`) keep phase ordering, emoji markers (⭐🔥⚡🏆), and markdown fences intact so slash commands stay valid.
- Copilot slash prompts are copied from `prompts/` to `.github/prompts/` during init; any rename must propagate to docs that reference `/build*` commands.
- **Workflow commands** (`/flow-dev-feature`, `/flow-dev-fix`, `/flow-dev-commit`, `/flow-dev-work`, `/flow-dev-review`, `/flow-dev-refactor`) are backend-only and provide structured development workflows.

## Research Checklist for Agents

- Read `README.md` for project overview and high-level features.
- Read `GETTING-STARTED.md` for user-facing tutorials, command workflows, and complete usage examples.
- Read `templates/copilot-instructions.template.md` to understand expected output format for generated projects.
- Review `templates/docs/*.template.md` and `templates/specs/*.template.md` before editing; they enforce the doc structure AI Flow guarantees downstream.
- Check `.ai-flow/core/config.json` schema when modifying initialization metadata; consumers expect keys `version`, `aiTools`, `createdAt`, `backend`, `frontend`.
- Validate cross-platform behavior: Windows keeps script perms untouched, so avoid Unix-only workflows inside the CLI.
- Review `prompts/backend/flow-build-phase-8.md` for project initialization logic (detects state, initializes framework, generates final docs).
- Review `prompts/backend/flow-build-phase-9.md` for roadmap generation (creates implementation plan with Story Points, Epics, Features).
- Check `prompts/backend/feature.md` for Story Points integration using Fibonacci scale (1, 2, 3, 5, 8, 13, 21); format is "Task • X SP" with checkbox lists.
- Use `flow3.docs.md` (Cursor) or `flow3.docs.prompt.md` (Copilot) to validate and auto-update README.md, GETTING-STARTED.md, and CONTRIBUTING.md against source code, templates, and prompts.

## Collaboration Tips

- Keep logging consistent with `chalk` semantics used in `src/cli.ts` (info = cyan/white, warnings = yellow, failures = red) to ensure CLI feedback stays predictable.
- After structural changes, run `ai-flow init ./tmp` locally to smoke-test that templates, prompts, and slash commands land in the right paths.
- Surface notable behavioral changes in `README.md` “Features” or “Quick Start” sections so downstream AI agents inherit accurate guidance.
