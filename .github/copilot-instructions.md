# GitHub Copilot Playbook

- **Project focus:** Ship an npm-distributed CLI that scaffolds AI-ready documentation for backend, frontend, mobile, and desktop projects.
- **Authoritative docs:** Start with `README.md` for product flow and `templates/AGENT.template.md` for global AI conventions; mirror them when updating outputs.
- **Runtime expectations:** Node.js 18+, TypeScript sources in `src/` compiled to `dist/`; CLI entry is `src/cli.ts`.
- **Deliverable shape:** `.ai-flow/` tree plus AI-tool specific configs (`.claude`, `.cursor`, `.github/copilot-commands`, etc.) copied from repo templates.

## Architecture & Flow

- `src/cli.ts` is the only executable source today; it wires Commander CLI commands (`init`, `check`) to filesystem tasks with `fs-extra`, progress feedback via `ora`, and prompts through `inquirer`.
- `init` composes helper steps: `createBuildStructure` → `copyTemplates` → `copyPrompts` → `setupSlashCommands`; stay consistent with that order when extending.
- Templates are copied WITHOUT rendering to `.ai-flow/templates/` during init; Phase 8 renders them to project root.
- Tool selection lives in `AI_TOOLS`; adding a tool requires new slash-command directory, script branch, and inclusion in `.ai-flow/core/config.json` generation.
- The templates in `.ai-flow/templates/**` are copied verbatim with `{{PLACEHOLDER}}` tokens; Phase 8 AI agents render and expand them.

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

## Cache Files Structure (CRITICAL - Do NOT confuse contexts)

**TWO SEPARATE CONTEXTS exist for `.ai-flow/cache/` files:**

### Context 1: This Repository (`ai-flow`)

- **Location:** `ai-flow/cache/docs-analysis.json`
- **Purpose:** Cache for maintaining THIS project's documentation (README.md, GETTING-STARTED.md)
- **Used by:** `/flow3.docs.prompt` command executed ON this repo
- **Git tracking:** YES - committed to track documentation state of AI Flow itself

### Context 2: User Projects (after installing ai-flow)

- **Location:** `user-project/.ai-flow/cache/docs-analysis.json`
- **Purpose:** Cache for maintaining USER's project documentation
- **Used by:** `/flow.docs.sync.prompt` Commands executed by USERS in THEIR projects
- **Git tracking:** User decides (typically .gitignored)

**Key difference:**

- This repo uses `cache/docs-analysis.json` (root level, no .ai-flow/)
- User projects use `.ai-flow/cache/docs-analysis.json` (inside .ai-flow/ structure)
- Both use same filename now: `docs-analysis.json`

## Research Checklist for Agents

- Read `README.md` for project overview and high-level features.
- Read `GETTING-STARTED.md` for user-facing tutorials, command workflows, and complete usage examples.
- Read `templates/copilot-instructions.template.md` to understand expected output format for generated projects.
- Review `templates/docs/*.template.md` and `templates/specs/*.template.md` before editing; they enforce the doc structure AI Flow guarantees downstream.
- Check `.ai-flow/core/config.json` schema when modifying initialization metadata; consumers expect keys `version`, `aiTools`, `createdAt`, `backend`, `frontend`, `mobile`, `desktop`.
- Validate cross-platform behavior: Windows keeps script perms untouched, so avoid Unix-only workflows inside the CLI.
- Review `prompts/backend/flow-build-phase-8.md` for project initialization logic (detects state, initializes framework, generates final docs).
- Review `prompts/backend/flow-build-phase-9.md` for roadmap generation (creates implementation plan with Story Points, Epics, Features).
- Check `prompts/backend/feature.md` for Story Points integration using Fibonacci scale (1, 2, 3, 5, 8, 13, 21); format is "Task • X SP" with checkbox lists.
- Use `flow3.docs.md` (Cursor) or `flow3.docs.prompt.md` (Copilot) to validate and auto-update README.md, GETTING-STARTED.md, and CONTRIBUTING.md against source code, templates, and prompts.

## Desktop Project Support (NetBeans/Eclipse)

**AI Flow now supports Java desktop applications** with comprehensive detection and documentation for NetBeans and Eclipse projects:

### Supported IDEs & Frameworks

**NetBeans IDE:**

- **Build System:** Apache Ant (default), Maven, Gradle
- **UI Frameworks:** Swing (GUI Builder with .form files), JavaFX (FXML + Scene Builder)
- **Detection Markers:** `nbproject/project.xml`, `build.xml`, `manifest.mf`, `.form` files
- **Project Types:** Desktop (Swing), Desktop (JavaFX), Web Applications (Servlets/JSP)

**Eclipse IDE:**

- **Build System:** Maven (default), Gradle, Ant
- **UI Frameworks:** Swing (WindowBuilder), JavaFX (e(fx)clipse), SWT/JFace (Eclipse RCP)
- **Detection Markers:** `.project`, `.classpath`, `.settings/`, `pom.xml`/`build.gradle`
- **Project Types:** Desktop (Swing), Desktop (JavaFX), Eclipse RCP (SWT), Web Applications

### Desktop Architecture Patterns

Desktop projects support these patterns (defined in Phase 3):

- **MVC** (Model-View-Controller) - Classic Swing pattern
- **MVP** (Model-View-Presenter) - Testable UI pattern
- **MVVM** (Model-View-ViewModel) - JavaFX with property binding
- **Layered** - Traditional N-tier architecture

### Desktop-Specific Features

**Data Storage:**

- Embedded databases: H2, Derby, SQLite
- File-based storage: JSON, XML, Properties
- External databases: MySQL, PostgreSQL
- Secure storage: Keychain (macOS), Credential Manager (Windows)

**Packaging & Deployment:**

- Executable JAR with dependencies
- Native installers: jpackage (Java 14+), Launch4j, exe4j
- Platform-specific: .exe (Windows), .app/.dmg (macOS), .deb/.rpm (Linux)
- Code signing for Windows and macOS

**UI Thread Safety:**

- Swing: `SwingUtilities.invokeLater()`, `SwingWorker`
- JavaFX: `Platform.runLater()`, `Task`/`Service`
- SWT: `Display.asyncExec()`, `Display.syncExec()`

### Detection Logic (Phase 0)

Desktop project detection follows this priority:

1. **NetBeans Desktop (Swing):** Has `.form` files + `nbproject/` + Swing imports
2. **NetBeans Desktop (JavaFX):** Has `.fxml` files + `nbproject/` + JavaFX imports
3. **Eclipse Desktop (Swing):** Has `.project` + Swing imports + no web facets
4. **Eclipse Desktop (JavaFX):** Has `.project` + `.fxml` + e(fx)clipse nature
5. **Eclipse RCP (SWT):** Has `.product` file + SWT/JFace imports + plugin dependencies

**Build System Detection:**

- Ant: `build.xml` present (NetBeans default)
- Maven: `pom.xml` present (Eclipse default)
- Gradle: `build.gradle` or `build.gradle.kts` present

**Java Version Detection:**

- NetBeans: `nbproject/project.properties` → `javac.source`/`javac.target`
- Eclipse: `.classpath` → `org.eclipse.jdt.launching.JRE_CONTAINER`
- Maven: `pom.xml` → `maven.compiler.source`/`target`
- Gradle: `build.gradle` → `sourceCompatibility`/`targetCompatibility`

### Desktop Prompts Structure

Desktop projects generate 22 prompts in `prompts/desktop/`:

- **11 Build Phases:** flow-build-phase-0.md (Context Discovery) through phase-10.md (User Stories)
- **11 Workflows:** flow-build.md, flow-work.md, flow-commit.md, flow-check.md, flow-docs-sync.md, flow-work-feature.md, flow-work-fix.md, flow-work-refactor.md, flow-work-resume.md, flow-check-test.md, flow-check-review.md

**Phase Highlights:**

- **Phase 0:** Detects IDE (NetBeans/Eclipse), UI framework (Swing/JavaFX/SWT), build tool
- **Phase 1:** Discovery & UX Desktop - Application type, target platforms, main windows
- **Phase 2:** UI Components - Layout managers, component libraries (FlatLaf, ControlsFX, Nebula)
- **Phase 3:** Architecture Desktop - MVC/MVP/MVVM, package structure, threading model
- **Phase 4:** Data & Storage - Embedded DB, file handling, backup strategy
- **Phase 5:** Code Standards - Java version, naming conventions, best practices
- **Phase 6:** Testing - JUnit 5, TestFX/AssertJ-Swing/SWTBot for UI tests
- **Phase 7:** Packaging & Deployment - JAR, native executables, installers, code signing
- **Phase 8:** Project Setup - Maven/Gradle/Ant configuration, Main class generation
- **Phase 9:** Implementation Roadmap - Atomic tasks with Story Points (Fibonacci scale)
- **Phase 10:** User Stories - Feature mapping with acceptance criteria

### Desktop Templates

Desktop templates in `templates/desktop/` include:

- **ai-instructions.template.md:** Desktop-specific AI guidelines (UI thread safety, data access patterns)
- **project-brief.template.md:** Desktop application overview
- **docs/ARCHITECTURE.template.md:** Desktop architecture patterns, package structure
- **docs/DATABASE.template.md:** Embedded DB schema (H2/Derby/SQLite)
- **docs/DEVELOPMENT.template.md:** Setup guide for NetBeans/Eclipse
- **docs/DEPLOYMENT.template.md:** Packaging with jpackage, installers
- **specs/UI.template.md:** UI component specifications, layouts, event handling
- **specs/DATA.template.md:** Data models, DAOs, validation

### Cross-Framework Considerations

When implementing desktop features, be aware of framework differences:

**Layout Management:**

- Swing: BorderLayout, GridBagLayout, MigLayout, GroupLayout (NetBeans GUI Builder)
- JavaFX: BorderPane, HBox/VBox, GridPane, StackPane (FXML-based)
- SWT: GridLayout, FillLayout, FormLayout, RowLayout

**Component Libraries:**

- Swing: FlatLaf (LAF), SwingX, JGoodies, JFreeChart
- JavaFX: ControlsFX, JFoenix, TilesFX, Ikonli
- SWT: Nebula, Opal, JFace (high-level framework)

**Testing Frameworks:**

- Swing: AssertJ-Swing, Fest-Swing (legacy), Jemmy (NetBeans)
- JavaFX: TestFX (official), headless with Monocle
- SWT: SWTBot (Eclipse official), workbench integration

### Backend vs Desktop Detection

In `prompts/backend/flow-build-phase-0.md`, desktop projects are distinguished from backend:

- **Backend:** Has web frameworks (Spring, Express, FastAPI), REST endpoints, database-first
- **Desktop:** Has UI framework imports (Swing/JavaFX/SWT), main GUI class, no web/ directory

**Shared Java Markers:**

- Both use `pom.xml` or `build.gradle`
- Both have `src/` directories
- **Differentiator:** Desktop has `.form`, `.fxml`, or SWT imports; Backend has `@RestController`, `@RequestMapping`, servlet configs

## Collaboration Tips

- Keep logging consistent with `chalk` semantics used in `src/cli.ts` (info = cyan/white, warnings = yellow, failures = red) to ensure CLI feedback stays predictable.
- After structural changes, run `ai-flow init ./tmp` locally to smoke-test that templates, prompts, and slash commands land in the right paths.
- Surface notable behavioral changes in `README.md` “Features” or “Quick Start” sections so downstream AI agents inherit accurate guidance.
