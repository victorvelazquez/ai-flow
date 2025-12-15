# Documentation Gap Analysis & Auto-Update

Analyze and automatically update project documentation (README.md, GETTING-STARTED.md, CONTRIBUTING.md) to ensure accuracy with source code, templates, and prompts. Focus exclusively on user-facing features.

**Display Behavior:** Show step title (`## Step N/7: Name`) in your response BEFORE executing actions in that step.

---

## Workflow Overview

Execute all steps sequentially to ensure comprehensive documentation validation and automatic updates.

| Step | Action                  | Focus                                         | User Interaction                      |
| ---- | ----------------------- | --------------------------------------------- | ------------------------------------- |
| 0    | **Cache Check**         | Skip analysis if no changes since last run    | Automatic                             |
| 1    | **Inventory CLI**       | Commands, flags, options from source          | Automatic                             |
| 2    | **Inventory Artifacts** | Count templates, prompts, verify package.json | Automatic                             |
| 3    | **Cross-Reference**     | Compare inventory vs all documentation        | Automatic                             |
| 4    | **Identify Gaps**       | Missing, inaccurate, or outdated info         | Automatic                             |
| 5    | **Generate Report**     | Prioritized recommendations with exact fixes  | Automatic                             |
| 6    | **Apply Updates**       | Show all changes, single approval for all     | Automatic start, approve once for all |
| 7    | **Validate Changes**    | Re-analyze to confirm gaps resolved           | Automatic after Step 6                |

---

## ⚡ Step 0/7: Cache Check

Skip expensive analysis if source files haven't changed since last run.

### Actions

**Check cache file:**

```bash
# Read cache timestamp
cat cache/docs-analysis.json
```

**Cache structure:**

```json
{
  "timestamp": "2025-12-11T10:30:00Z",
  "files": {
    "src/cli.ts": "2025-12-11T09:15:00Z",
    "package.json": "2025-12-10T14:20:00Z",
    "templates/": "2025-12-09T08:00:00Z",
    "prompts/": "2025-12-09T08:00:00Z"
  }
}
```

**Decision logic:**

```
IF cache exists AND all files unchanged:
  → Skip to Step 7 (validation only)
ELSE:
  → Continue to Step 1 (full analysis)
```

**Files to monitor:**

- `src/cli.ts` - CLI interface changes
- `package.json` - Version, engines, files array
- `templates/**/*.template.md` - Generated file changes
- `prompts/**/*.md` - Slash command changes

**Time savings:** 3-5 minutes → 10-30 seconds on unchanged projects

---

## 🔍 Step 1/7: Inventory CLI Interface

Analyze source code to extract all user-facing CLI elements.

### Actions

**Read `src/cli.ts` completely:**

```typescript
// Extract programmatically (don't use grep):
- program.command() calls
- .option() definitions
- .argument() specifications
- Option descriptions
- Default values
```

**Read `package.json`:**

```json
{
  "name": "...",
  "version": "...",      // Current version
  "bin": { ... },        // CLI entry point
  "engines": { ... },    // Node.js requirements
  "files": [ ... ]       // What gets published to npm
}
```

**Inventory to Extract:**

1. **CLI Commands:**
   - `init <path>` with all options
   - `check` command
   - Any other commands

2. **Flags (all of them):**
   - `--ai <tool>` - description, required/optional
   - `--type <type>` - description, required/optional
   - `--name <name>` - description, required/optional
   - `--description <desc>` - description, required/optional
   - `--verbose` - description
   - `--dry-run` - description
   - Any new flags added

3. **Requirements:**
   - Node.js version from `engines.node`
   - Package version for cross-reference

4. **Published artifacts:**
   - List from `files` array in package.json

**Example Output:**

```
CLI Commands Found:
✓ init <path> [options]
✓ check

Flags Found:
✓ --ai <tool> (optional, prompts if missing)
✓ --type <type> (optional, prompts if missing)
✓ --name <name> (optional)
✓ --description <desc> (optional)
✓ --verbose (optional)
✓ --dry-run (optional)

Requirements:
✓ Node.js: >=20.0.0
✓ Version: 2.0.0

Published to npm:
✓ dist, prompts, templates, README.md, LICENSE
```

---

## 📦 Step 2/7: Inventory Generated Artifacts

Count and verify templates, prompts, and generated structures programmatically.

### Actions

**Count templates by project type:**

```bash
# Don't use ls -R manually, count programmatically:

templates/backend/
  ├── *.template.md (root files)
  ├── docs/*.template.md
  └── specs/*.template.md

templates/frontend/
  ├── *.template.md (root files)
  ├── docs/*.template.md
  └── specs/*.template.md

templates/mobile/
  ├── *.template.md (root files)
  ├── docs/*.template.md
  └── specs/*.template.md

templates/fullstack/
  └── *.template.md
```

**Count prompts by project type:**

```bash
prompts/backend/
  ├── flow-build.md
  ├── flow-build-phase-*.md (0-9)
  └── flow-dev-*.md, flow-docs-*.md

prompts/frontend/
  ├── flow-build.md
  └── flow-build-phase-*.md (0-8)

prompts/mobile/
  ├── flow-build.md
  └── flow-build-phase-*.md (0-8)
```

**Inventory to Extract:**

1. **Template counts (exact numbers):**
   - Backend: X files (Y root + Z docs + W specs)
   - Frontend: X files (Y root + Z docs + W specs)
   - Mobile: X files (Y root + Z docs + W specs)
   - Fullstack: X files

2. **Prompt counts (exact numbers):**
   - Backend: X commands (.md files)
   - Frontend: X commands (.md files)
   - Mobile: X commands (.md files)

3. **Slash commands structure:**
   - What gets copied to `.claude/`, `.cursor/`, `.github/prompts/`, `.gemini/`
   - File naming convention per tool (e.g., Copilot uses `.prompt.md`)

**Example Output:**

```
Templates Counted:
✓ Backend: 18 files (8 root + 8 docs + 2 specs)
✓ Frontend: 12 files (4 root + 5 docs + 3 specs)
✓ Mobile: 10 files (4 root + 4 docs + 2 specs)
✓ Fullstack: 4 files

Prompts Counted:
✓ Backend: 17 commands
✓ Frontend: 9 commands
✓ Mobile: 9 commands

Slash Commands Installed To:
✓ .claude/ (*.md)
✓ .cursor/ (*.md)
✓ .github/prompts/ (*.prompt.md for Copilot)
✓ .gemini/ (*.md)
```

---

## 🔎 Step 3/7: Cross-Reference Documentation

Compare inventory against README.md, GETTING-STARTED.md, and CONTRIBUTING.md.

### Checks for Each Document

#### **README.md Checks:**

**CLI Commands:**

- ✅ All commands from `src/cli.ts` are documented
- ✅ All flags have descriptions
- ✅ Examples show correct syntax
- ✅ Version number matches `package.json`

**Generated Artifacts:**

- ✅ Template counts match actual files
- ✅ Prompt counts match actual files
- ✅ Project types documented (backend/frontend/mobile/fullstack)

**Requirements:**

- ✅ Node.js version matches `package.json`
- ✅ Installation steps are correct

**Cross-references:**

- ✅ Links to GETTING-STARTED.md exist
- ✅ Links are not broken

#### **GETTING-STARTED.md Checks:**

**CLI Flags Reference:**

- ✅ All flags from `src/cli.ts` are listed
- ✅ Descriptions match source code
- ✅ Examples are provided

**Commands Cheat Sheet:**

- ✅ All commands listed
- ✅ Syntax is correct

**Cross-references:**

- ✅ Links back to README.md exist
- ✅ Links are not broken

**Version Consistency:**

- ✅ Version matches `package.json` and README.md

#### **CONTRIBUTING.md Checks:**

**Requirements:**

- ✅ Node.js version matches `package.json`
- ✅ Development setup is accurate

### Validation Rules

**Version Consistency (CRITICAL):**

```
package.json version === README.md version === GETTING-STARTED.md version
```

**Template Count Consistency:**

```
README.md "Backend (X docs)" === actual count in templates/backend/
README.md "Frontend (Y docs)" === actual count in templates/frontend/
```

**Cross-references Bidirectional:**

```
README.md → GETTING-STARTED.md (link exists)
GETTING-STARTED.md → README.md (link exists)
```

**Example Verification:**

```markdown
✅ PASS: Version consistency

- package.json: 2.0.0
- README.md: 2.0.0
- GETTING-STARTED.md: 2.0.0

❌ FAIL: Template count mismatch

- README.md says: "Backend (15 docs)"
- Actual count: 18 files
- Gap: Update README.md

✅ PASS: Cross-references

- README.md → GETTING-STARTED.md ✓
- GETTING-STARTED.md → README.md ✓

❌ FAIL: Missing flag in GETTING-STARTED

- src/cli.ts has: --dry-run
- GETTING-STARTED.md: Not documented
- Gap: Add to CLI Flags Reference
```

---

## ❌ Step 4/7: Identify Gaps & Issues

Categorize all discrepancies found across all documents.

### Gap Categories

**1. Missing Documentation (Not in docs)**

- CLI commands/flags without documentation
- Template/prompt counts not listed
- Features implemented but not mentioned
- Missing cross-references

**2. Inaccurate Information (Wrong in docs)**

- Incorrect file paths
- Wrong command syntax
- Outdated version numbers
- Wrong template/prompt counts
- Broken examples

**3. Incomplete Documentation (Partial coverage)**

- Commands listed but some flags missing
- Features mentioned but no usage examples
- No troubleshooting for common issues

### Priority Levels

**CRITICAL:** User cannot use the tool without this info

- Missing required flags
- Incorrect installation steps
- Wrong command syntax
- Version mismatch across docs

**IMPORTANT:** User experience degraded

- Missing optional flags
- Wrong template counts
- No examples for common scenarios
- Incomplete feature descriptions
- Broken cross-references

**NICE-TO-HAVE:** Improves usability

- Additional examples
- Troubleshooting tips
- Advanced use cases

### Output Format

For each gap:

````markdown
### Gap: [Name]

**Priority:** CRITICAL | IMPORTANT | NICE-TO-HAVE
**Category:** Missing | Inaccurate | Incomplete
**File:** [README.md | GETTING-STARTED.md | CONTRIBUTING.md]
**Section:** [Section name or "Not Present"]

**Current State:**

```markdown
[What document currently says, or "Not documented"]
```

**Should Be:**

```markdown
[What it should say based on source code/templates/prompts]
```

**User Impact:**
[Why users need this information]

**Recommended Fix:**

```markdown
[Exact markdown content, ready to replace/insert]
```

**Location:** [Line range or "After section X"]
````

**Example Gaps:**

````markdown
### Gap: Version Mismatch in README

**Priority:** CRITICAL
**Category:** Inaccurate
**File:** README.md
**Section:** Badge section (line ~5)

**Current State:**

```markdown
![Version](https://img.shields.io/badge/version-1.0.6-blue)
```

**Should Be:**

```markdown
![Version](https://img.shields.io/badge/version-2.0.0-blue)
```

**User Impact:**
Users see outdated version, may install wrong package version.

**Recommended Fix:**

```markdown
![Version](https://img.shields.io/badge/version-2.0.0-blue)
```

**Location:** Line 5

---

### Gap: Backend Template Count Wrong

**Priority:** IMPORTANT
**Category:** Inaccurate
**File:** README.md
**Section:** Features - Generated Documents

**Current State:**

```markdown
**Backend** (15 docs): AGENT.md, ai-instructions.md...
```

**Should Be:**

```markdown
**Backend** (18 docs): AGENT.md, ai-instructions.md...
```

**User Impact:**
Users expect 15 files but get 18, causing confusion.

**Recommended Fix:**

```markdown
**Backend** (18 docs): AGENT.md, ai-instructions.md, copilot-instructions.md, project-brief.md, README.md, plus 8 detailed docs (architecture, api, data-model, etc.) and 2 specs.
```

**Location:** Line 342 (in Features section)

---

### Gap: Missing --dry-run Flag in GETTING-STARTED

**Priority:** IMPORTANT
**Category:** Missing
**File:** GETTING-STARTED.md
**Section:** CLI Flags Reference

**Current State:**

```markdown
Not documented
```

**Should Be:**

```markdown
| `--dry-run` | Simulate initialization without writing files | Optional |
```

**User Impact:**
Users don't know they can test without creating files.

**Recommended Fix:**

```markdown
| `--dry-run` | Simulate initialization without writing files (useful for testing) | Optional |
```

**Location:** After line 45 (in CLI Flags Reference table)
````

---

## 📊 Step 5/7: Generate Report

Compile findings into actionable report.

### Report Structure

```markdown
# Documentation Gap Analysis Report

## Executive Summary

- **Status:** [NEEDS UPDATES | ACCURATE | MINOR ISSUES]
- **Documents Analyzed:** README.md, GETTING-STARTED.md, CONTRIBUTING.md
- **Gaps Found:** [X] (Critical: Y, Important: Z, Nice: W)
- **Package Version:** [from package.json]

---

## ✅ Well Documented

README.md:

- ✓ Feature X - comprehensive with examples
- ✓ Installation steps - complete

GETTING-STARTED.md:

- ✓ CLI Flags Reference - mostly complete
- ✓ Commands cheat sheet - accurate

CONTRIBUTING.md:

- ✓ Development setup - correct

---

## ❌ Critical Issues (Fix Immediately)

### 1. [Gap Title]

[Use full gap format from Step 4]

### 2. [Gap Title]

[Use full gap format from Step 4]

---

## ⚠️ Important Issues (Should Fix)

### 3. [Gap Title]

[Use full gap format from Step 4]

### 4. [Gap Title]

[Use full gap format from Step 4]

---

## 💡 Nice-to-Have Improvements

### 5. [Gap Title]

[Use full gap format from Step 4]

---

## 📋 Summary Table

| #   | Gap                  | Priority  | File               | Type       | Est. Impact |
| --- | -------------------- | --------- | ------------------ | ---------- | ----------- |
| 1   | Version mismatch     | CRITICAL  | README.md          | Inaccurate | High        |
| 2   | Wrong template count | IMPORTANT | README.md          | Inaccurate | Medium      |
| 3   | Missing --dry-run    | IMPORTANT | GETTING-STARTED.md | Missing    | Medium      |

---

## 🎯 Recommendations

Will apply CRITICAL and IMPORTANT gaps in Step 6 (with your approval per change).
NICE-TO-HAVE gaps are reported only (can apply manually if desired).

---

## ✅ Validation Checklist

After Step 6 updates, Step 7 will verify:

- [ ] All CLI commands from src/cli.ts are documented
- [ ] All flags documented in both README and GETTING-STARTED
- [ ] Template counts match actual files
- [ ] Prompt counts match actual files
- [ ] Version consistent across all docs
- [ ] Node.js requirement consistent
- [ ] Cross-references are bidirectional and not broken
- [ ] Examples use current syntax

---

## 📝 Next Steps

**Automatically proceeding to Step 6: Apply Updates**

- All CRITICAL + IMPORTANT changes will be shown together
- You approve/reject ALL changes with a single confirmation
- If approved, all changes are applied automatically
- Step 7 then validates all changes worked

---
```

---

## 🔧 Step 6/7: Apply Updates

**This step executes automatically after Step 5.**

Display ALL proposed changes together and request a SINGLE approval to apply them all.

### Process

**Display all CRITICAL and IMPORTANT gaps from Step 5:**

````markdown
## 📝 Proposed Changes Summary

**Total Changes:** [N] (Critical: [X], Important: [Y])

---

### Change 1/N: [Gap Title]

**Priority:** [CRITICAL | IMPORTANT]
**File:** [README.md | GETTING-STARTED.md | CONTRIBUTING.md]
**Section:** [Section name]
**Line:** [Approximate line number]

**Current:**

```markdown
[Current content from file]
```

**New:**

```markdown
[Proposed new content]
```

**Impact:** [Brief explanation]

---

### Change 2/N: [Gap Title]

[... repeat for all changes ...]

---

## ⚠️ Confirmation Required

**Do you want to apply ALL [N] changes listed above?**

- ✅ **Approve All** - Apply all changes automatically and proceed to Step 7 validation
- ❌ **Reject** - Skip all changes and proceed to Step 7 without modifications

[Waiting for your approval...]
````

**If approved:**

1. Apply ALL changes automatically using replace_string_in_file or multi_replace_string_in_file
2. Use sufficient context (5-10 lines) to locate exact sections
3. Log each successful change
4. Automatically proceed to Step 7

**If rejected:**

1. Skip all changes
2. Log that user rejected updates
3. Automatically proceed to Step 7

### Editing Strategy

**Use replace_string_in_file or multi_replace_string_in_file:**

- Include 5-10 lines of context before and after target text
- For multiple changes in same file, use multi_replace_string_in_file
- For changes across different files, call replace_string_in_file sequentially
- Match whitespace and indentation exactly

### Safety Rules

- ✅ Show ALL changes before requesting approval
- ✅ Single approval applies or rejects ALL changes
- ✅ Apply all changes automatically if approved
- ✅ Automatically proceed to Step 7 after applying (or skipping)
- ❌ Do NOT ask for approval per individual change
- ❌ Do NOT apply NICE-TO-HAVE without explicit request

### Post-Application Log

After applying (or rejecting) changes:

```markdown
## 📎 Update Summary

✅ **User Decision:** [Approved All | Rejected All]

**Changes Applied:** [N]/[Total]

1. ✅ Node.js version in CONTRIBUTING.md (line 35) - CRITICAL
2. ✅ Version numbers in GETTING-STARTED.md (lines 62, 1819) - IMPORTANT

**Status:** All changes applied successfully

🔎 **Automatically proceeding to Step 7: Validate Changes...**
```

OR if rejected:

```markdown
## 📎 Update Summary

❌ **User Decision:** Rejected All

**Changes Applied:** 0/[Total]

**Status:** No changes were made to documentation

🔎 **Automatically proceeding to Step 7: Validate Changes...**
```

---

## ✅ Step 7/7: Validate Changes

**This step executes automatically after Step 6, regardless of approval/rejection.**

Re-analyze edited files to confirm gaps were resolved correctly.

### Actions

**Re-run analysis on edited files only:**

1. **Re-read files that were edited:**
   - If README.md was edited → re-inventory and cross-reference README.md
   - If GETTING-STARTED.md was edited → re-inventory and cross-reference GETTING-STARTED.md
   - If CONTRIBUTING.md was edited → re-inventory and cross-reference CONTRIBUTING.md

2. **Check if applied gaps are resolved:**
   - For each gap marked "✅ Applied" in Step 6
   - Verify the fix is now present in the file
   - Verify it matches source code/templates/prompts

3. **Report results:**

### Validation Report

```markdown
## ✅ Validation Results

### Successfully Resolved

✅ **Gap 1: Version Mismatch in README**

- File: README.md (line 5)
- Status: ✅ RESOLVED
- Verification: Badge now shows "2.0.0" matching package.json

✅ **Gap 2: Backend Template Count**

- File: README.md (line 342)
- Status: ✅ RESOLVED
- Verification: Now correctly shows "18 docs" matching templates/backend/

---

### Still Pending

⚠️ **Gap 3: Missing --dry-run Flag**

- File: GETTING-STARTED.md
- Status: ⏭️ SKIPPED (user rejected in Step 6)
- Action: Apply manually if desired

---

### Summary

- ✅ Resolved: 2 gaps
- ⏭️ Skipped: 1 gap (user choice)
- ❌ Failed: 0 gaps

**Documentation Status:** 🟢 IMPROVED (2 critical/important issues fixed)

---

### Cache Update

Writing analysis results to `cache/docs-analysis.json` for next run...
✅ Cache updated

---

### Next Steps

**If all gaps resolved:**

- ✅ Documentation is now accurate
- Commit changes: Use flow1.commit.md for conventional commit
- Review changes: `git diff README.md GETTING-STARTED.md CONTRIBUTING.md`

**If gaps still pending:**

- Skipped gaps can be applied manually
- Or re-run this command and approve them
```

---

## Execution Model

| Step | Action              | Duration    | User Interaction                      |
| ---- | ------------------- | ----------- | ------------------------------------- |
| 0    | Cache check         | 5 seconds   | Automatic                             |
| 1    | Inventory CLI       | 30 seconds  | Automatic                             |
| 2    | Inventory artifacts | 30 seconds  | Automatic                             |
| 3    | Cross-reference     | 1 minute    | Automatic                             |
| 4    | Identify gaps       | 30 seconds  | Automatic                             |
| 5    | Generate report     | 30 seconds  | Automatic                             |
| 6    | Apply updates       | 1-5 minutes | Automatic start, approve once for all |
| 7    | Validate changes    | 30 seconds  | Automatic after Step 6                |

**Total Time:**

- With cache hit: 30 seconds (Step 0 → 7)
- Full analysis + no changes: 3-4 minutes
- Full analysis + apply changes: 4-8 minutes

---

## Constraints

**Focus ONLY on user-facing elements:**

- ✅ CLI commands users execute
- ✅ Files users receive after `ai-flow init`
- ✅ Features users can use
- ✅ Installation/setup steps users follow
- ✅ Template and prompt counts
- ✅ Version consistency

**Do NOT flag as gaps:**

- ❌ Internal development tools (.cursor/commands/flow\*.md)
- ❌ Build/test scripts (unless users run them)
- ❌ Internal dependencies (ESM/CommonJS details)
- ❌ CI/CD pipelines
- ❌ Code architecture details
- ❌ Template placeholder tokens ({{PLACEHOLDER}})

**Required:**

- Provide exact markdown content for each fix
- Use 5-10 lines of context for file edits
- Prioritize by user impact
- Verify against source code, not assumptions
- Count templates/prompts programmatically (no manual ls -R)
- Validate version consistency across all docs
- Check cross-references are bidirectional

---

**Reference:** User-facing documentation standards  
**Last Updated:** 2025-12-11
