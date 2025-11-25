# Bootstrap Documentation Generation

Execute the complete documentation generation for this backend project (new or existing).

## Instructions for the AI Assistant

Guide the user through creating comprehensive, production-ready documentation for their backend project, independientemente de la IA utilizada.

**Master Prompt Location:** `{PROJECT_ROOT}/.ai-bootstrap/prompts/backend.md`

### Your Task

1. **Read the master prompt** from `.ai-bootstrap/prompts/backend.md` completely

2. **PHASE 0 (Existing Projects Only):**

   - Detect if project has existing code/documentation
   - Search for AI instruction files (copilot-instructions.md, .clauderules, AGENT.md, etc.)
   - Analyze README.md, package.json, source code structure
   - Present detected information to user
   - Pre-populate answers where possible
   - **If new project with no existing files, skip Phase 0**

3. **Execute PHASES 1-7** in exact order:

   - Phase 1: Discovery & Business (15-20 min)
   - Phase 2: Data Architecture (15-20 min)
   - Phase 3: System Architecture (15-20 min)
   - Phase 4: Security & Authentication (15-20 min)
   - Phase 5: Code Standards (15-20 min)
   - Phase 6: Testing Strategy (10 min)
   - Phase 7: Operations & Deployment (10 min)

4. **For existing projects:** Skip questions already answered from Phase 0 detection
5. **For new projects:** Ask ALL questions from each phase interactively
6. **Wait for user responses** before proceeding
7. **Provide recommendations** using ⭐🔥⚡🏆 markers
8. **Summarize each phase** for user confirmation
9. **Generate documents incrementally** after each phase with validation

### Critical Requirements

**For Existing Projects:**

- ✅ ALWAYS run Phase 0 detection first
- ✅ Use detected information to pre-populate answers
- ✅ Skip questions already answered from detection
- ✅ Only ask what's missing or needs confirmation

**For New Projects:**

- ✅ Skip Phase 0 (no files to detect)
- ✅ Ask ALL questions from phases 1-7

**For All Projects:**

- ❌ Do NOT skip phases
- ❌ Do NOT assume answers without detection or asking
- ❌ Do NOT leave placeholders in generated documents
- ✅ Ask questions ONE BY ONE within each phase (wait for answer before proceeding)
- ✅ Complete all phases sequentially (Phase 1 → 2 → 3 → 4 → 5 → 6 → 7)
- ✅ Provide multiple choice options when possible
- ✅ Generate documents incrementally after each phase
- ✅ Ask for validation after each document generation
- ✅ Re-read documents before using their information
- ✅ Use templates from `.ai-bootstrap/templates/`

### After Completion

1. Generate all 15 documents (incrementally, not at end)
2. Generate tool-specific configs si aplica (por ejemplo, `.clauderules`, `.cursorrules`, `.github/copilot-instructions.md`)
3. Validate no placeholders remain
4. Provide summary and next steps

### Time Estimate

**New Projects:** 90-120 minutes (investment that saves 10-20 hours later)

**Existing Projects:** 35-70 minutes (50-60% faster with Phase 0 detection!)

---

**BEGIN EXECUTION NOW**

Read the master prompt from `.ai-bootstrap/prompts/backend.md` and:

1. Check if project has existing files (Phase 0)
2. If existing files found, run detection and pre-populate
3. If new project, skip to Phase 1
4. Execute phases with incremental document generation
