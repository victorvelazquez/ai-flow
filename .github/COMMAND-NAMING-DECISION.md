# Command Naming Convention - Technical Decision Document

**Date:** December 4, 2025  
**Status:** ✅ APPROVED - Pending Implementation  
**Version:** 2.0 (Final)  
**Breaking Change:** Yes (v2.0.0)

---

## 📋 Executive Summary

Standardize all slash commands with a structured naming convention to improve:
- Discoverability through autocomplete
- Logical grouping by functionality
- Consistent user experience
- Scalability for future commands

---

## 🎯 Naming Structure

```
/{PREFIX}-{GROUP}-{ACTION}[-NUMBER]
```

### Components:

1. **PREFIX** - Tool identifier
   - Current: `aibs` (from "ai-flow")
   - Future: Subject to change if tool is renamed
   - Purpose: Unique namespace, prevents collision with other tools

2. **GROUP** - Functional category (2 groups total)
   - `docs` - Documentation generation and synchronization
   - `dev` - Complete development workflow

3. **ACTION** - What the command does
   - Descriptive verb or noun
   - Keep short but clear (3-6 letters preferred)

4. **NUMBER** - Sequential order (optional)
   - Used only for ordered sequences
   - Format: `-phase-N` where N = 0-7

---

## ✅ Final Approved Nomenclature

### **GROUP 1: DOCS** (12 commands)
Documentation generation and maintenance

#### Generation Commands (9)
| Old Command | New Command | Description |
|-------------|-------------|-------------|
| `/bootstrap` | `/aibs-docs-gen` | Generate all documentation (8-phase bootstrap) |
| `/bootstrap-phase0-context` | `/aibs-docs-gen-phase-0` | Phase 0: Context Discovery (existing projects) |
| `/bootstrap-phase1-business` | `/aibs-docs-gen-phase-1` | Phase 1: Discovery & Business |
| `/bootstrap-phase2-data` | `/aibs-docs-gen-phase-2` | Phase 2: Data Architecture / Components |
| `/bootstrap-phase3-architecture` | `/aibs-docs-gen-phase-3` | Phase 3: System Architecture |
| `/bootstrap-phase4-security` | `/aibs-docs-gen-phase-4` | Phase 4: Security & Auth / Styling |
| `/bootstrap-phase5-standards` | `/aibs-docs-gen-phase-5` | Phase 5: Code Standards |
| `/bootstrap-phase6-testing` | `/aibs-docs-gen-phase-6` | Phase 6: Testing Strategy |
| `/bootstrap-phase7-operations` | `/aibs-docs-gen-phase-7` | Phase 7: Operations & Deployment |

**Rationale:**
- `gen` = Generate (3 letters, concise)
- `-phase-N` = Clear sequential order
- Numbers 0-7 map to bootstrap phases

#### Synchronization Commands (3)
| Old Command | New Command | Description |
|-------------|-------------|-------------|
| `/docs-update` | `/aibs-docs-sync` | Sync docs with code changes |
| `/backend-docs-update` | `/aibs-docs-sync-be` | Backend only (fullstack projects) |
| `/frontend-docs-update` | `/aibs-docs-sync-fe` | Frontend only (fullstack projects) |

**Rationale:**
- `sync` = Synchronize (4 letters, more descriptive than "update")
- Clear semantic difference: `gen` (create new) vs `sync` (update existing)
- `-be`/`-fe` = Short suffixes for backend/frontend

---

### **GROUP 2: DEV** (5 commands)
Complete development workflow (feature development, fixes, refactoring, review, work management)

| Old Command | New Command | Description |
|-------------|-------------|-------------|
| `/feature` | `/aibs-dev-feature` | Feature workflow (interactive: new/change/refactor) |
| `/fix` | `/aibs-dev-fix` | Fix bugs (adaptive complexity detection) |
| `/refactor-quick` | `/aibs-dev-refactor` | Quick refactorings without overhead |
| `/review` | `/aibs-dev-review` | Multi-aspect code review (5 perspectives) |
| `/work` | `/aibs-dev-work` | Work management (list/show/resume/archive) |

**Rationale:**
- All development-related commands grouped together
- Unified workflow: develop → review → manage
- Shorter than previous 3-group structure (`dev-`, `review-`, `work-`)
- Natural autocomplete grouping

---

## 📊 Command Inventory

### Summary by Group

| Group | Commands | Purpose |
|-------|----------|---------|
| **docs** | 12 | Documentation generation + sync |
| **dev** | 5 | Development workflow |
| **TOTAL** | **17** | Down from 26+ (consolidated) |

### Full Command List

```bash
# DOCS (12 commands)
/aibs-docs-gen
/aibs-docs-gen-phase-0
/aibs-docs-gen-phase-1
/aibs-docs-gen-phase-2
/aibs-docs-gen-phase-3
/aibs-docs-gen-phase-4
/aibs-docs-gen-phase-5
/aibs-docs-gen-phase-6
/aibs-docs-gen-phase-7
/aibs-docs-sync
/aibs-docs-sync-be
/aibs-docs-sync-fe

# DEV (5 commands)
/aibs-dev-feature
/aibs-dev-fix
/aibs-dev-refactor
/aibs-dev-review
/aibs-dev-work
```

---

## 🚫 Backward Compatibility Decision

**Decision:** NO backward compatibility

**Rationale:**
1. Clean break for better long-term maintainability
2. Tool in early adoption phase (v1.1.1)
3. Avoids confusion with deprecated commands
4. Simplified codebase (no alias logic)
5. Clear migration path in v2.0.0

**Migration Strategy:**
- Release as v2.0.0 (major version bump)
- Comprehensive migration guide in CHANGELOG.md
- Update all documentation immediately
- No support for old command names

---

## 💡 Design Rationale

### Why These Changes?

#### Problem Statement (Before)
- 26+ commands with inconsistent naming
- No clear grouping or discovery pattern
- Mixed prefixes (some with `/bootstrap-`, some with `/`)
- Difficult to remember all commands
- Poor autocomplete experience

#### Solution (After)
- 17 commands with consistent structure
- 2 logical groups (docs, dev)
- Unique prefix (`/aibs-`) for all commands
- Clear semantic distinction (gen vs sync)
- Excellent autocomplete experience

### Autocomplete Experience

**User types:** `/aibs-docs-`

```
Autocomplete shows:
  /aibs-docs-gen
  /aibs-docs-gen-phase-0
  /aibs-docs-gen-phase-1
  /aibs-docs-gen-phase-2
  /aibs-docs-gen-phase-3
  /aibs-docs-gen-phase-4
  /aibs-docs-gen-phase-5
  /aibs-docs-gen-phase-6
  /aibs-docs-gen-phase-7
  /aibs-docs-sync
  /aibs-docs-sync-be
  /aibs-docs-sync-fe
```

**User types:** `/aibs-dev-`

```
Autocomplete shows:
  /aibs-dev-feature
  /aibs-dev-fix
  /aibs-dev-refactor
  /aibs-dev-review
  /aibs-dev-work
```

### Benefits

1. ✅ **Unique Namespace** - `/aibs-` prevents collisions
2. ✅ **Logical Grouping** - Commands grouped by purpose
3. ✅ **Sequential Order** - Numbers indicate phase progression
4. ✅ **Brevity** - Short actions (gen, sync, feature, fix, etc.)
5. ✅ **Semantic Clarity** - gen (create) vs sync (update)
6. ✅ **Scalability** - Easy to add new groups
7. ✅ **Consistency** - Same pattern across all commands

---

## 🔮 Future Considerations

### If Tool is Renamed

**Current:** ai-flow → PREFIX: `aibs`

**Example rename scenarios:**

| New Name | New Prefix | Example Commands |
|----------|------------|------------------|
| DevDocs AI | `dd` or `ddai` | `/dd-docs-gen`, `/dd-dev-feature` |
| CodeGen Pro | `cgp` or `codegen` | `/cgp-docs-gen`, `/cgp-dev-feature` |
| DocForge | `df` or `forge` | `/df-docs-gen`, `/df-dev-feature` |

**Action Required:**
- Update PREFIX in all command files
- Keep GROUP-ACTION-NUMBER structure unchanged
- Update documentation to reflect new prefix
- This decision document remains valid for structure

### Adding New Commands

**Pattern to follow:**

```bash
# New command in existing group
/{PREFIX}-{EXISTING_GROUP}-{NEW_ACTION}

# New group (if absolutely necessary)
/{PREFIX}-{NEW_GROUP}-{ACTION}
```

**Examples:**

```bash
# Add test runner to dev group
/aibs-dev-test

# Add deployment group (if needed)
/aibs-deploy-staging
/aibs-deploy-production
```

---

## 📝 Implementation Checklist

### Phase 1: Rename Command Files (prompts/)
- [ ] `prompts/backend/*.md` (9 bootstrap + 5 workflow files)
- [ ] `prompts/frontend/*.md` (9 bootstrap files)
- [ ] `prompts/mobile/*.md` (9 bootstrap files)
- [ ] `prompts/fullstack/*.md` (if separate files exist)

**Files to rename:**
```
prompts/backend/bootstrap.md → bootstrap-gen.md
prompts/backend/bootstrap-phase0-context.md → bootstrap-gen-phase-0.md
prompts/backend/bootstrap-phase1-business.md → bootstrap-gen-phase-1.md
... (continue for all phases)
prompts/backend/docs-update.md → docs-sync.md
prompts/backend/feature.md → dev-feature.md
prompts/backend/fix.md → dev-fix.md
prompts/backend/refactor-quick.md → dev-refactor.md
prompts/backend/review.md → dev-review.md
prompts/backend/work.md → dev-work.md
```

### Phase 2: Update Slash Command Directories
- [ ] `slash-commands/claude/*.md`
- [ ] `slash-commands/cursor/*.md`
- [ ] `slash-commands/copilot/*.md` (or `.github/prompts/*.prompt.md`)
- [ ] `slash-commands/gemini/*.md`

**Pattern:**
```
Old: slash-commands/claude/bootstrap.md
New: slash-commands/claude/aibs-docs-gen.md

Old: slash-commands/claude/feature.md
New: slash-commands/claude/aibs-dev-feature.md
```

### Phase 3: Update CLI Code (src/)
- [ ] Update `src/cli.ts` command references
- [ ] Update file copy logic for new filenames
- [ ] Update any hardcoded command strings
- [ ] Update path mappings

**Key areas in src/cli.ts:**
```typescript
// Update command file paths
const promptFiles = {
  bootstrap: 'bootstrap-gen.md',  // was 'bootstrap.md'
  phase0: 'bootstrap-gen-phase-0.md',  // was 'bootstrap-phase0-context.md'
  // ... etc
}
```

### Phase 4: Update Documentation
- [ ] `README.md` - Update all command examples
- [ ] `GETTING-STARTED.md` - Update entire command reference section
- [ ] `.github/copilot-instructions.md` - Update command references
- [ ] Create `MIGRATION-v2.md` - Comprehensive migration guide
- [ ] Update `CHANGELOG.md` - Document breaking changes

**Key sections to update:**
- Quick Start examples
- Command reference tables
- Workflow examples
- Troubleshooting sections

### Phase 5: Update Templates
- [ ] `templates/AGENT.template.md`
- [ ] `templates/ai-instructions.template.md`
- [ ] `templates/copilot-instructions.template.md`
- [ ] All `templates/docs/*.template.md`
- [ ] All `templates/specs/*.template.md`

**Pattern:**
```markdown
Old: Use `/bootstrap` to generate documentation
New: Use `/aibs-docs-gen` to generate documentation

Old: Run `/feature` to create new features
New: Run `/aibs-dev-feature` to create new features
```

### Phase 6: Testing & Validation
- [ ] Test all renamed commands in Claude
- [ ] Test all renamed commands in Cursor
- [ ] Test all renamed commands in Copilot
- [ ] Test all renamed commands in Gemini
- [ ] Verify autocomplete works correctly
- [ ] Test `ai-flow init` generates correct filenames
- [ ] Test `ai-flow check` verifies new structure
- [ ] Validate all documentation links work

### Phase 7: Release Preparation
- [ ] Bump version to `2.0.0` in `package.json`
- [ ] Update `package-lock.json`
- [ ] Create comprehensive `MIGRATION-v2.md` guide
- [ ] Update `CHANGELOG.md` with all breaking changes
- [ ] Prepare release notes for GitHub
- [ ] Update examples in README badges/links

### Phase 8: Release & Communication
- [ ] Publish to npm (`npm publish`)
- [ ] Create GitHub release with migration notes
- [ ] Tag release as `v2.0.0`
- [ ] Update documentation website (if exists)
- [ ] Announce breaking changes in discussions/issues
- [ ] Update any external examples or tutorials

---

## 📖 Migration Guide Template

**For users upgrading from v1.x to v2.0:**

### Command Mapping Quick Reference

```bash
# DOCS - Generation
/bootstrap                    → /aibs-docs-gen
/bootstrap-phase0-context     → /aibs-docs-gen-phase-0
/bootstrap-phase1-business    → /aibs-docs-gen-phase-1
/bootstrap-phase2-data        → /aibs-docs-gen-phase-2
/bootstrap-phase3-architecture → /aibs-docs-gen-phase-3
/bootstrap-phase4-security    → /aibs-docs-gen-phase-4
/bootstrap-phase5-standards   → /aibs-docs-gen-phase-5
/bootstrap-phase6-testing     → /aibs-docs-gen-phase-6
/bootstrap-phase7-operations  → /aibs-docs-gen-phase-7

# DOCS - Sync
/docs-update                  → /aibs-docs-sync
/backend-docs-update          → /aibs-docs-sync-be
/frontend-docs-update         → /aibs-docs-sync-fe

# DEV - Workflows
/feature                      → /aibs-dev-feature
/fix                          → /aibs-dev-fix
/refactor-quick               → /aibs-dev-refactor
/review                       → /aibs-dev-review
/work                         → /aibs-dev-work
```

### Migration Steps

1. **Update AI Flow:**
   ```bash
   npm install -g ai-flow@2.0.0
   ```

2. **Reinitialize Projects:**
   ```bash
   # Backup existing .ai-flow/ folder
   mv .ai-flow .ai-flow.backup

   # Reinitialize with new structure
   ai-flow init . --ai [your-tool]

   # Copy any custom modifications from backup
   ```

3. **Update Workflows:**
   - Replace all old command names in scripts
   - Update team documentation
   - Update CI/CD configurations

---

## ✅ Approval & Sign-off

- **Decided by:** User + AI Agent
- **Date:** December 4, 2025
- **Implementation Status:** PENDING
- **Priority:** HIGH (affects all user-facing commands)
- **Breaking Change:** YES (requires v2.0.0)

---

## 🔗 Related Documents

- [Command Naming Convention Decision](command-naming-decision.md) - This document
- [GETTING-STARTED.md](../GETTING-STARTED.md) - User guide with command reference
- [copilot-instructions.md](copilot-instructions.md) - AI agent instructions
- [MIGRATION-v2.md](MIGRATION-v2.md) - To be created during implementation

---

## 📊 Impact Analysis

### Files Affected
- **Prompt files:** ~50 files (backend, frontend, mobile, fullstack)
- **Slash commands:** ~50 files (claude, cursor, copilot, gemini)
- **CLI code:** 1 file (src/cli.ts)
- **Documentation:** 5 files (README, GETTING-STARTED, copilot-instructions, etc.)
- **Templates:** ~20 files

**Total estimated files:** ~125 files

### Estimated Effort
- Renaming files: 2 hours
- Updating CLI code: 1 hour
- Updating documentation: 3 hours
- Testing: 2 hours
- Migration guide: 1 hour
- **Total:** ~9 hours

### Risk Assessment
- **Low risk:** File renames (automated with scripts)
- **Medium risk:** CLI code updates (need careful testing)
- **Low risk:** Documentation updates (straightforward)
- **High risk:** Breaking user workflows (mitigated by clear migration guide)

---

**END OF TECHNICAL DECISION DOCUMENT**
