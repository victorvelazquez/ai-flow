# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).


## [2.2.5] - 2025-12-23
### Added
- **Automatic Completion Tracking:** `/flow-work` now automatically marks tasks as complete in `docs/roadmap.md` and user story DoD checklists when implementation finishes
  - Updates Feature checkboxes in roadmap.md when Features are completed
  - Marks Definition of Done items in user story files (.ai-flow/user-stories/)
  - Handles edge cases gracefully (missing files, no roadmap, etc.)
  - Shows completion summary after finalization
- Updated all 15 flow-work prompt files (backend, frontend, mobile) with Phase 4 completion tracking logic

### Changed
- Phase 4 (Finalization) in flow-work now includes automatic documentation updates as Step 1
- Updated README.md and GETTING-STARTED.md to document automatic completion tracking behavior

## [2.2.4] - 2025-12-23
### Changed
- Synchronized Fullstack documentation counts across all guides.
- Formatted source code in `src/cli.ts` for consistency.
- Corrected versioning placeholders in Agent template.

## [2.2.3] - 2025-12-22
### Refactor
- Significant refactoring of `src/cli.ts` for better maintainability and modularity.
- Extracted static data (banner, slash commands, project phases) into centralized constants.
- Modularized `initializeProject` and unified help output logic across commands.
- Removed duplicated code and improved ASCII banner display logic.

## [2.2.2] - 2025-12-22

### Fixed
- **CLI Help Improvements:**
  - Added missing `/flow-work`, `/flow-check`, and `/flow-commit` to help output.
  - Fixed "Fases disponibles" for Mobile applications (previously showed Frontend phases).
  - Grouped slash commands for better readability.
  - Eliminated duplicated `/flow-docs-sync` in help output.

## [2.2.1] - 2025-12-22

### Added
- **Smart Skip Logic:** Intelligent phase skipping for Phases 1-10 with 3 scenarios
  - Shared template system (`prompts/shared/smart-skip-preflight.md`)
  - Phase 0 Layer 4: Documentation audit with consistency scoring
  - `audit-data.json` generation for smart skip decisions
  - SKIP scenario (≥95% consistency): Skip entire phase
  - HYBRID scenario (80-94%): Ask only missing questions
  - FULL scenario (<80%): Complete phase with pre-filled answers
  - Reduces documentation time for existing projects: 90min → 15-20min (≥95% consistency)

### Changed
- Phases 1-8 now support smart skip for existing projects (backend, frontend, mobile)
- Phases 9-10 auto-skip for projects with implemented code
- All 34 phase files updated with Pre-Flight Check references

### Technical Details
- 10 commits implementing Smart Skip Logic system
- Phases 1-7: Full smart skip with Pre-Flight Check
- Phase 8: Final documentation generation (AGENT.md, README.md, api.md, etc.)
- Phases 9-10: Optional for new projects, auto-skip for existing

## [2.2.0] - 2025-12-21

### Added
- **Workflow Automation:** Introduced `// turbo` directive support across all workflows (`flow1-commit`, `flow2-check`, `flow3-docs`, `flow4-release`) to enable seamless, automated execution in agentic AI environments.
- **Automated Verification:** New automated read-only steps in `flow3-docs` and `flow4-release` to programmatically extract project context.

### Changed
- **Synchronization:** Finalized inventory and count synchronization for **Frontend** (15 docs), **Mobile** (13 docs), and **Fullstack** (4 docs) across all main documentation files.
- **Prompt Refinement:** Updated tool-specific slash-commands (Claude, Cursor, Copilot) to include `CHANGELOG.md` in documentation analysis.
- **UX:** Improved project banner and status reporting in the CLI.

## [2.1.9] - 2025-12-21

### Changed

- **Prompt Optimization (Antigravity):** Massive refactor of all Phase 0 prompts (Backend, Frontend, Mobile) to use declarative layer-based project detection and strict exclusion rules (`.ai-flow/`, `.agent/`, etc.)
- **Consolidation of Mode B:** Successfully removed separate `flow-build-phase-b.md` files; "Smart Auto-Suggest" logic is now integrated directly into Master Prompts using declarative instructions
- **Phase Expansion:** Phase 9 (Implementation Roadmap) and Phase 10 (User Stories) are now fully supported for **Frontend** and **Mobile** projects, mirroring Backend capabilities
- **CLI Improvements:** Updated `--help` descriptions and fixed linting in version display logic
- **Version bump:** Synchronized all project components to version 2.1.9

## [2.1.1] - 2025-12-11

### Fixed

- **Templates initialization:** Templates are now correctly copied to `.ai-flow/templates/` during `init` instead of being rendered directly to project root
  - Templates preserve `{{PLACEHOLDER}}` tokens for phase-by-phase rendering
  - Project root remains clean until each `/flow-build` phase generates its corresponding documents
  - Phase 1 generates `project-brief.md`, Phase 2 generates `docs/data-model.md`, etc.
  - Phase 8 generates final documents (business-flows, api, contributing, AGENT, README)
  - Updated tests to verify new template location behavior

### Changed

- Updated version from 2.1.0 to 2.1.1

## [2.1.0] - 2025-01-29

### Added

- **New Workflow Command:** `/flow-dev-commit` - Intelligent commit automation that analyzes changed files, groups them semantically (Feature Complete, Refactoring, Configuration, Tests, Documentation), generates Conventional Commits messages with dynamic scopes, and automates the commit process
  - Framework-agnostic grouping patterns work with any language/stack
  - Built-in Conventional Commits validation with regex enforcement
  - 4-step workflow: Detect changes → Group intelligently → Generate commits → Show log + push
  - Comprehensive documentation in README.md, GETTING-STARTED.md, and copilot-instructions.md

### Changed

- Updated version from 2.0.1 to 2.1.0

## [2.0.1] - 2025-01-29

### Changed

- Updated Node.js requirement to 20.0.0 in prerequisites
- Simplified flow3.docs to single approval for all changes
- Updated Node.js requirement to 20+ and version to 2.0.0
- Updated command syntax to unified flow-build with phase arguments

### Fixed

- Added .ai-flow/cache/ to gitignore
- Verified phase files are not copied as slash commands

## [2.0.0] - 2025-01-28

### Changed

- **BREAKING:** Renamed all bootstrap commands to build across entire codebase
  - `/flow-bootstrap` → `/flow-build`
  - Phase commands now use `/flow-build-phase-N` pattern
- Updated dependencies and version to 2.0.0
- Simplified code and improved readability
- Updated prompt references and command list
- Fixed template counts in documentation

### Added

- Complete frontend flow prompts (Phase 0-7) with renamed structure
- Complete backend flow prompts (Phase 0-9) with renamed structure
- Complete mobile flow prompts (Phase 0-8) with project setup
- Phase 8 project setup for mobile and frontend
- Phase 9 roadmap generation with Story Points using Fibonacci scale
- Automatic feature numbering to development workflow
- Phase detection logic to flow-build commands
- Prettier configuration files

### Removed

- Old renamed prompt files
- Constitution generation from Phase 8

## [1.4.0] - 2025-01-27

### Changed

- Removed templates/shared dependency after AGENT consolidation
- Simplified assumptions system to AI-based suggestions

### Fixed

- Removed templates/shared dependency after AGENT consolidation

## [1.3.0] - 2025-01-26

### Changed

- Updated to use latest stable versions for all framework dependencies
- Improved /fix command for COMPLEX bugs with Spec-Kit format
- Improved /feature command with Spec-Kit task precision
- Enhanced Phase 9 with Spec-Kit task generation strategy

### Fixed

- Fixed template counts and added Node.js version requirements

## [1.2.0] - 2025-01-25

### Changed

- Updated CLI documentation accuracy and examples
- Added default selection (option 1) to AI tool and project type prompts

### Fixed

- Used rawlist for project type selection to fix empty list in PowerShell

## [1.1.2] - 2025-01-24

### Fixed

- Used rawlist instead of list for AI tool selection
- Improved inquirer list rendering with pageSize and loop options
- Resolved empty AI tools list in interactive prompt

## [1.1.1] - 2025-01-23

### Added

- Added --help command examples for improved CLI discoverability

### Removed

- Removed CHANGELOG.md file (reinstated in 2.1.0)

## [1.1.0] - 2025-01-22

### Changed

- Updated Commander version to 1.1.0

## [1.0.4] - 2025-01-21

### Fixed

- Fixed documentation counts for frontend and mobile
- Added CLI examples and improved troubleshooting

### Changed

- Updated Node.js requirement to 20.0.0 across all documentation
- Updated GitHub Actions to Node.js 20.x
- Updated Node.js requirement to >=20.0.0 for ESM dependencies

## [1.0.3] - 2025-01-20

### Fixed

- Improved flow-project-init to merge AI Flow docs with framework files
- Handled existing files in flow-project-init

## [1.0.2] - 2025-01-19

### Fixed

- Removed unnecessary scripts folder creation

### Changed

- Renamed package to ai-flow-dev

## [1.0.1] - 2025-01-18

### Fixed

- Fixed frontend documentation count
- Fixed version and documentation counts

### Changed

- **BREAKING:** Renamed project commands to flow-project-\* prefix
- **BREAKING:** Standardized command naming to /flow- prefix pattern
- Updated banner to display AI FLOW branding

## [1.0.0] - 2025-01-17

### Initial Release

- CLI tool for AI-powered development workflows
- Support for Backend, Frontend, Mobile, and Fullstack projects
- Multi-AI tool support: Claude, Cursor, GitHub Copilot, Gemini
- Complete documentation generation with 40+ templates
- 10+ workflow commands (/flow-build, /flow-dev-feature, /flow-dev-fix, etc.)
- Phase-based project initialization (Phase 0-9)
- Slash command distribution for all AI tools
- Comprehensive testing suite with Jest
- ESM support with Node.js 20+

[2.1.1]: https://github.com/victorvelazquez/ai-flow/compare/v2.1.0...v2.1.1
[2.1.0]: https://github.com/victorvelazquez/ai-flow/compare/v2.0.1...v2.1.0
[2.0.1]: https://github.com/victorvelazquez/ai-flow/compare/v2.0.0...v2.0.1
[2.0.0]: https://github.com/victorvelazquez/ai-flow/compare/v1.4.0...v2.0.0
[1.4.0]: https://github.com/victorvelazquez/ai-flow/compare/v1.3.0...v1.4.0
[1.3.0]: https://github.com/victorvelazquez/ai-flow/compare/v1.2.0...v1.3.0
[1.2.0]: https://github.com/victorvelazquez/ai-flow/compare/v1.1.2...v1.2.0
[1.1.2]: https://github.com/victorvelazquez/ai-flow/compare/v1.1.1...v1.1.2
[1.1.1]: https://github.com/victorvelazquez/ai-flow/compare/v1.1.0...v1.1.1
[1.1.0]: https://github.com/victorvelazquez/ai-flow/compare/v1.0.4...v1.1.0
[1.0.4]: https://github.com/victorvelazquez/ai-flow/compare/v1.0.3...v1.0.4
[1.0.3]: https://github.com/victorvelazquez/ai-flow/compare/v1.0.2...v1.0.3
[1.0.2]: https://github.com/victorvelazquez/ai-flow/compare/v1.0.1...v1.0.2
[1.0.1]: https://github.com/victorvelazquez/ai-flow/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/victorvelazquez/ai-flow/releases/tag/v1.0.0
