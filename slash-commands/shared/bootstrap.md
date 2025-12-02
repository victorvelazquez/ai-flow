# Bootstrap Documentation Generation

Execute the complete documentation generation for this backend project (new or existing).

## Instructions for the AI Assistant

Guide the user through creating comprehensive, production-ready documentation for their backend project, regardless of the AI tool used.

**Master Prompt Location:** `{PROJECT_ROOT}/.ai-bootstrap/prompts/backend.md` (orchestrator file)

**Phase Files Location:** `{PROJECT_ROOT}/.ai-bootstrap/prompts/backend/phase-*.md`

### Your Task

1. **Read the orchestrator** from `.ai-bootstrap/prompts/backend.md` to understand the modular structure

2. **PHASE 0 (Existing Projects Only):**

   - Read `.ai-bootstrap/prompts/backend/phase-0-context-discovery.md`
   - Execute 3-layer incremental analysis:
     - Layer 0: Cache Check (instant re-runs)
     - Layer 1: Fast Metadata Scan (10-20 seconds)
     - Layer 2: Structural Analysis (30-90 seconds)
     - Layer 3: Selective Deep Analysis (optional, user-controlled)
   - Detect project language, framework, ORM, entities, routes
   - Present detected information to user
   - Pre-populate answers where possible
   - **If new project with no existing files, skip Phase 0**

3. **PROJECT SCOPE SELECTION (After Phase 0, Before Phase 1):**

   - Analyze documentation maturity from Phase 0 (if executed)
   - Suggest appropriate scope based on detected documentation level:
     - Minimal docs (README only) → Suggest MVP or Production-Ready
     - Comprehensive docs (5+ files) → Suggest Production-Ready or Enterprise
   - Ask user to select project scope: MVP / Production-Ready / Enterprise
   - Adjust question depth and coverage based on selection:
     - **MVP:** 50-70 min - Core features + basic smoke tests (15-25% coverage)
     - **Production-Ready:** 90-120 min - Comprehensive with 60-80% test coverage
     - **Enterprise:** 120-150 min - Exhaustive with 80-95% coverage + contract/load tests

4. **Execute PHASES 1-7** in exact order (depth based on scope):

   - Phase 1: Discovery & Business (15-20 min)
   - Phase 2: Data Architecture (15-20 min)
   - Phase 3: System Architecture (15-20 min)
   - Phase 4: Security & Authentication (15-20 min)
   - Phase 5: Code Standards (15-20 min)
   - Phase 6: Testing Strategy (15-25 min) - All scopes include testing
   - Phase 7: Operations & Deployment (10 min)

5. **For existing projects:** Skip questions already answered from Phase 0 detection
6. **For new projects:** Ask ALL questions from each phase interactively
7. **Adapt questions based on scope:** Skip or simplify according to MVP/Production/Enterprise selection
8. **Wait for user responses** before proceeding
9. **Provide recommendations** using ⭐🔥⚡🏆 markers
10. **Summarize each phase** for user confirmation
11. **Generate documents incrementally** after each phase with validation

### Critical Requirements

**For Existing Projects:**

- ✅ ALWAYS run Phase 0 detection first
- ✅ Analyze documentation maturity level (minimal/basic/comprehensive/enterprise)
- ✅ Suggest appropriate project scope based on detected docs
- ✅ Use detected information to pre-populate answers
- ✅ Skip questions already answered from detection
- ✅ Only ask what's missing or needs confirmation
- ✅ Validate existing info with user ("I found X, is this still correct?")

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
2. Generate tool-specific configs if applicable (e.g., `.clauderules`, `.cursorrules`, `.github/copilot-instructions.md`)
3. Validate no placeholders remain
4. Provide summary and next steps

### Time Estimate

**MVP Scope (with basic testing):**

- New Projects: 50-70 minutes
- Existing Projects: 25-40 minutes (with Phase 0 detection)

**Production-Ready Scope:**

- New Projects: 90-120 minutes
- Existing Projects: 35-70 minutes (with Phase 0 detection)

**Enterprise Scope:**

- New Projects: 120-150 minutes
- Existing Projects: 50-90 minutes (with Phase 0 detection)

---

**BEGIN EXECUTION NOW**

Read the orchestrator from `.ai-bootstrap/prompts/backend.md` to understand the modular structure, then:

1. Check if project has existing files (Phase 0)
2. If existing files found:
   - Read and execute `.ai-bootstrap/prompts/backend/phase-0-context-discovery.md`
   - Run 3-layer incremental analysis (Layer 0 → 1 → 2 → optional Layer 3)
   - Analyze documentation maturity level
   - Pre-populate answers from existing docs
   - Suggest appropriate scope based on maturity level
3. If new project: Suggest MVP for prototypes, Production-Ready for serious projects
4. Ask user to select project scope (MVP/Production-Ready/Enterprise)
5. Execute Phases 1-7 sequentially by reading individual phase files:
   - `.ai-bootstrap/prompts/backend/phase-1-business.md`
   - `.ai-bootstrap/prompts/backend/phase-2-data-architecture.md`
   - `.ai-bootstrap/prompts/backend/phase-3-system-architecture.md`
   - `.ai-bootstrap/prompts/backend/phase-4-security.md`
   - `.ai-bootstrap/prompts/backend/phase-5-code-standards.md`
   - `.ai-bootstrap/prompts/backend/phase-6-testing.md`
   - `.ai-bootstrap/prompts/backend/phase-7-operations.md`
6. Adjust question depth based on selected scope
7. Skip redundant questions if answers were detected in Phase 0
8. Generate documents incrementally with validation
