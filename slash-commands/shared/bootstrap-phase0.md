# Bootstrap Phase 0: Context Discovery

Execute Phase 0 of the documentation generation: Automated project analysis for existing projects.

## Instructions for the AI Assistant

Read **Phase 0: Context Discovery** from `.ai-bootstrap/prompts/backend/phase-0-context-discovery.md` and execute the 3-layer incremental analysis, regardless of the AI tool.

**Time Estimate:** 1-5 minutes (automated analysis)

**Phase Objective:** Extract maximum information from existing project code and documentation to pre-populate answers and reduce manual input.

**IMPORTANT: This phase is ONLY for existing projects with code/documentation. Skip if starting a completely new project from scratch.**

**3-Layer Analysis Strategy:**

- **Layer 0: Cache Check** (0-2 seconds) - Check if analysis was run before
- **Layer 1: Fast Metadata Scan** (10-20 seconds) - Detect language, framework, ORM, basic structure
- **Layer 2: Structural Analysis** (30-90 seconds) - Analyze entities, relationships, routes, patterns
- **Layer 3: Selective Deep Analysis** (optional, user-controlled) - Extract detailed implementation patterns

**Universal Support:** 12 languages, 60+ frameworks, 35+ ORMs (98% market coverage)

**After Completion:**
- Present all detected information to user
- Store responses for use in Phases 1-7
- Suggest appropriate project scope based on documentation maturity level
- Proceed to scope selection and Phase 1

---

**BEGIN PHASE 0 ANALYSIS**
