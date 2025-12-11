# README User-Facing Gap Analysis

Analyze the project to verify if README.md accurately documents all user-facing features and requires updates. Focus exclusively on end-user experience, not internal development details.

**Display Behavior:** Show step title (`## Step N/6: Name`) in your response BEFORE executing actions in that step.

---

## Workflow Overview

Execute all steps sequentially to ensure comprehensive README validation and apply approved changes.

| Step | Action                  | Focus                                    | Requires Approval |
| ---- | ----------------------- | ---------------------------------------- | ----------------- |
| 1    | **Inventory CLI**       | Commands, flags, options from source     | No                |
| 2    | **Inventory Artifacts** | Generated files, slash commands, configs | No                |
| 3    | **Cross-Reference**     | Compare inventory vs README content      | No                |
| 4    | **Identify Gaps**       | Missing, inaccurate, or outdated info    | No                |
| 5    | **Generate Report**     | Prioritized recommendations with content | No                |
| 6    | **Apply Updates**       | Ask confirmation and apply each change   | Yes (per change)  |

---

## 🔍 Step 1/6: Inventory CLI Interface

Analyze source code to extract all user-facing CLI elements.

### Actions

**Read `src/cli.ts`:**

```bash
# Extract all commands
grep -E "(\.command\(|\.option\(|\.argument\()" src/cli.ts

# Find all flags and their descriptions
grep -E "\.option\(" src/cli.ts
```

**Read `package.json`:**

```json
{
  "bin": { ... },        // CLI entry point
  "version": "...",      // Current version
  "engines": { ... }     // Node.js requirements
}
```

**Inventory to Extract:**

- All CLI commands (init, check, etc.)
- All flags (--ai, --type, --name, --description, --verbose, --dry-run)
- Required vs optional parameters
- Node.js version requirement
- Current package version

**Example Output:**

```
CLI Commands Found:
- init <path> --ai <tool> [--type <type>] [--name <name>] [--description <desc>] [--verbose] [--dry-run]
- check

Flags Found:
- --ai: Select AI tool (optional, prompts if not provided)
- --type: Project type - backend or frontend (optional, prompts if not provided)
- --name: Project name (optional)
- --description: Project description (optional)
- --verbose: Enable verbose logging (optional)
- --dry-run: Simulate without writing files (optional)

Requirements:
- Node.js: >=20.0.0
- Version: 1.0.6
```

---

## 📦 Step 2/6: Inventory Generated Artifacts

Analyze what files and structures are created for users.

### Actions

**Check templates directory:**

```bash
ls -R templates/
```

**Check prompts directory:**

```bash
ls -R prompts/
```

**Check package.json "files" array:**

```json
"files": [
  "dist",
  "prompts",
  "templates",
  "README.md",
  "LICENSE"
]
```

**Inventory to Extract:**

- Count of template files in `templates/`
- Slash command files per AI tool
- Project structure created by `init` command
- Configuration files generated

**Example Output:**

```
Templates Found:
- Backend: 15 files (AGENT, ai-instructions, project-brief, README, docs/*, specs/*)
- Frontend: 8 files (AGENT, ai-instructions, project-brief, README, docs/*, specs/*)
- Shared: 1 file (AGENT.template.md)

Prompts:
- Backend: 9 files (flow-build.md + 8 phase files)
- Frontend: 9 files (flow-build.md + 8 phase files)

Slash Commands Created:
- claude/: 9 files per project type
- cursor/: 9 files per project type
- copilot/: 9 files per project type (.prompt.md)
- gemini/: 9 files per project type

Published to npm: dist, prompts, templates, README.md, LICENSE
```

---

## 🔎 Step 3/6: Cross-Reference README

Compare discovered elements against README.md documentation.

### Checks

**For each CLI command:**

- ✅ Is it mentioned in "CLI Commands" section?
- ✅ Are all flags documented?
- ✅ Are examples provided?

**For generated artifacts:**

- ✅ Does "Generated Documents" match template count?
- ✅ Are all file purposes explained?
- ✅ Does project structure example match actual output?

**For requirements:**

- ✅ Is Node.js version mentioned in Installation/Prerequisites?
- ✅ Is current version number accurate?

**For AI tools:**

- ✅ Are all supported tools listed?
- ✅ Do slash command locations match implementation?

**For slash commands:**

- ✅ Are all available commands listed?
- ✅ Are command names correct per AI tool?

### Example Verification

```markdown
README says: "15 professional documents"
Templates folder: 15 backend templates + 8 frontend templates
Status: ✅ MATCH (backend), ⚠️ Frontend not fully documented

README says: "Slash commands in `.github/copilot-commands/`"
Actual location: `.github/prompts/*.prompt.md`
Status: ❌ MISMATCH - Incorrect path
```

---

## ❌ Step 4/6: Identify Gaps & Issues

Categorize all discrepancies found.

### Gap Categories

**1. Missing Documentation (Not in README)**

- CLI commands/flags without documentation
- Generated files not listed
- Features implemented but not mentioned

**2. Inaccurate Information (Wrong in README)**

- Incorrect file paths
- Wrong command syntax
- Outdated version numbers
- Broken examples

**3. Incomplete Documentation (Partial coverage)**

- Commands listed but flags missing
- Features mentioned but no usage examples
- No troubleshooting for common issues

### Priority Levels

**CRITICAL:** User cannot use the tool without this info

- Missing required flags
- Incorrect installation steps
- Wrong command syntax

**IMPORTANT:** User experience degraded

- Missing optional flags
- No examples for common scenarios
- Incomplete feature descriptions

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
**Section:** [README section name or "Not Present"]

**Current State:**
[What README currently says, or "Not documented"]

**Should Be:**
[What it should say based on source code]

**User Impact:**
[Why users need this information]

**Recommended Addition:**

```markdown
[Exact markdown content, ready to paste into README]
```
````

**Location:** [After which section/line to add it]

````

---

## 📊 Step 5/6: Generate Report

Compile findings into actionable report.

### Report Structure

```markdown
# README.md Gap Analysis Report

## Executive Summary

- **Status:** [NEEDS UPDATES | ACCURATE | MINOR ISSUES]
- **Gaps Found:** [X] (Critical: Y, Important: Z, Nice: W)
- **Accuracy Issues:** [N]
- **README Version:** [current version in package.json]

---

## ✅ Well Documented

List what README correctly covers:
- ✓ Feature X - comprehensive with examples
- ✓ Installation steps - complete
- ✓ Generated files - accurate count and descriptions

---

## ❌ Critical Issues (Fix Immediately)

### Issue 1: [Title]
[Use gap format above]

### Issue 2: [Title]
[Use gap format above]

---

## ⚠️ Important Issues (Should Fix)

### Issue 3: [Title]
[Use gap format above]

---

## 💡 Nice-to-Have Improvements

### Enhancement 1: [Title]
[Use gap format above]

---

## 📋 Summary Table

| # | Issue | Priority | Type | Section | Est. Lines |
|---|-------|----------|------|---------|------------|
| 1 | Missing --verbose flag | CRITICAL | Missing | CLI Commands | 3 |
| 2 | Wrong Copilot path | CRITICAL | Inaccurate | AI Tool Support | 1 |
| 3 | No troubleshooting | IMPORTANT | Missing | New Section | 40 |

---

## 🎯 Recommendations

### Phase 1: Critical Fixes (30 min)
1. [Action] - [reason] (lines X-Y)
2. [Action] - [reason] (lines X-Y)

### Phase 2: Important Updates (1 hour)
1. [Action] - [reason] (new section)

### Phase 3: Enhancements (optional)
1. [Action] - [reason]

---

## ✅ Validation Checklist

After updates, verify:
- [ ] All CLI commands from src/cli.ts are documented
- [ ] All flags have descriptions
- [ ] Template count matches documentation claims
- [ ] Slash command paths are correct
- [ ] Node.js version requirement is visible
- [ ] Examples use current syntax
- [ ] All AI tools mentioned are actually supported
- [ ] Project structure example matches init output

---

## 📝 Conclusion

[Summary of current state and recommended action priority]
````

---

## Execution Model

| Step | Action              | User Interaction   |
| ---- | ------------------- | ------------------ |
| 1    | Inventory CLI       | Automatic          |
| 2    | Inventory artifacts | Automatic          |
| 3    | Cross-reference     | Automatic          |
| 4    | Identify gaps       | Automatic          |
| 5    | Generate report     | Automatic          |
| 6    | Apply updates       | Approve per change |

## Constraints

**Focus ONLY on user-facing elements:**

- ✅ CLI commands users execute
- ✅ Files users receive after init
- ✅ Features users can use
- ✅ Installation/setup steps users follow

**Do NOT flag as gaps:**

- ❌ Internal development tools (flow1/flow2/flow3/flow4 commands)
- ❌ Build/test scripts (unless users run them)
- ❌ Internal dependencies (ESM/CommonJS details)
- ❌ CI/CD pipelines
- ❌ Code architecture

**Required:**

- Provide exact markdown content for each recommendation
- Specify precise location for additions
- Prioritize by user impact
- Verify against source code, not assumptions
- Use file editing tools with sufficient context (3+ lines)
- Show clear before/after for each change

**Estimated Time:** 3-5 minutes (analysis) + 2-10 minutes (applying changes)

---

## 🔧 Step 6/6: Apply Updates

For each **CRITICAL** and **IMPORTANT** gap, apply changes to README.md with user confirmation.

### Process

**For each gap from Step 5:**

1. **Display the change:**

   ```markdown
   ## Proposed Change [N/Total]

   **Gap:** [Title]
   **Priority:** [CRITICAL/IMPORTANT]
   **Section:** [Where to add]

   **Current:**
   ```

   [Current README content or "Not present"]

   ````

   **New:**
   ```markdown
   [Proposed markdown content]
   ````

   **Apply this change?** [Tool will prompt for approval]

   ```

   ```

2. **Execute if approved:**

   - Use file editing tools to apply the change
   - If adding new content: Use surrounding context as anchor
   - If correcting existing: Replace old with new (preserve context)

3. **Skip NICE-TO-HAVE gaps** (report only, don't apply)

### Change Execution Strategy

**For additions (new sections):**

- Find anchor point (e.g., "## 🛠️ CLI Commands" heading)
- Replace: anchor + old content → anchor + old content + new content

**For corrections (fix existing):**

- Find exact old text (include 3+ lines before/after as context)
- Replace: old incorrect text → new correct text

**For updates (enhance existing):**

- Find section to enhance (full section with surrounding lines)
- Replace: old section → enhanced section

### Safety Rules

- ✅ Apply CRITICAL and IMPORTANT gaps only
- ✅ Show full diff before each change
- ✅ Wait for user approval per change
- ✅ Continue on skip (user can reject individual changes)
- ❌ Do NOT batch multiple changes in one edit
- ❌ Do NOT apply NICE-TO-HAVE without explicit request

### Post-Application Summary

After all changes:

```markdown
## 📊 Update Summary

✅ **Applied:** 2/3 changes

- ✓ Missing --verbose flag (CRITICAL)
- ✓ Wrong Copilot path (CRITICAL)

⏭️ **Skipped:** 1/3 changes

- • Add troubleshooting section (IMPORTANT)

📝 **Next Steps:**

- Review changes: `git diff README.md`
- Test accuracy: Re-read updated sections
- To revert all: `git checkout README.md`
- To commit: Use flow1.commit.md for conventional commit
```

---

**Reference:** User-facing documentation standards  
**Last Updated:** 2025-01-XX
