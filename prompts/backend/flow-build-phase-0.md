## PHASE 0: Context Discovery (2-5 min)

> **Order for this phase:** ALWAYS executed FIRST if an existing project is detected. Skip ONLY for new projects.

> **📌 Scope-based behavior:**
> - **Interactive Mode:** Ask user for permission to scan files layer by layer.
> - **Autonomous Mode:** Scan all layers automatically and present the final report.

### Objective
Efficiently analyze existing projects using a **layered, incremental approach**.

---

## 🚫 Critical Exclusion Rules
To avoid false-positive detections, **IGNORE** the following folders and files during all detection steps:
- `.ai-flow/` (contains AI Flow internal cache and prompts)
- `.agent/` (contains AI workflows)
- `docs/` and `specs/` (if they contain AI Flow generated documentation)
- `project-brief.md`, `ai-instructions.md`, `AGENT.md`

**A project is considered "Existing" only if it contains functional source code or framework configuration files OUTSIDE these excluded paths.**

---

## 0.0 Check for Existing Analysis (Layer 0)

Check if `.ai-flow/cache/docs-analysis.json` exists and is fresh.

**If found:**
Ask user to use cached analysis or re-analyze.

**If not found:**
Proceed to Layer 1.

---

// turbo
## ⚡ Layer 1: Fast Metadata Scan (10-20 seconds)

**Purpose:** Detect framework, language, build tool, and existing AI configurations.

⭐ **Context Links:**
- Node.js: [package.json](file:///package.json)
- Python: [requirements.txt](file:///requirements.txt) | [pyproject.toml](file:///pyproject.toml)
- PHP: [composer.json](file:///composer.json)
- Go: [go.mod](file:///go.mod)
- Java: [pom.xml](file:///pom.xml) | [build.gradle](file:///build.gradle)

### 0.1.1 Universal Tech Stack Detection
**Action:** Use your internal knowledge to detect the language and framework by scanning the root configuration files (package.json, pyproject.toml, etc.).

**Detect (but don't be limited to):**
- **Node.js:** NestJS, Express, Fastify, etc.
- **Python:** FastAPI, Django, Flask, etc.
- **PHP:** Laravel, Symfony, etc.
- **Java/Kotlin:** Spring Boot, Micronaut, Ktor, etc.
- **Go:** Gin, Echo, Fiber, etc.
- **C#/.NET, Ruby, Rust, Elixir.**

### 0.1.2 Find AI & Documentation
- Find existing AI configs (`AGENT.md`, `.cursorrules`, etc.)
- Scan for `README.md` and existing `docs/`.

### Layer 1 Output
Show a summary of detected Name, Language, Framework, ORM, and Documentation files.

---

## 0.2 Layer 2: Structural Analysis (30-90 seconds)

**Purpose:** Analyze directory organization and architecture patterns without reading code line-by-line.

### 0.2.1 Pattern Detection
1. **Identify Pattern:** Feature-based, Layer-based, Modular Monolith, or Hybrid.
2. **Entity Detection:** Scan for Schema/Entity files based on the detected ORM (Prisma, TypeORM, Django Models, etc.).
3. **Maturity Check:** Assess documentation and test coverage ratio.

### Layer 2 Output
Summary of Architecture Pattern, Code Structure counts (Controllers, Services, etc.), and Recommended Build Scope (MVP/Production/Enterprise).

---

## 0.3 Layer 3: Selective Deep Analysis (1-5 minutes, OPTIONAL)

**Purpose:** Read and parse representative code files for detailed insights into API endpoints, data relationships, and security patterns.

### 0.3.1 Areas of Analysis
- **API Endpoints:** Parse routes/controllers.
- **Data Model:** Map entity relationships.
- **Security:** Detect auth patterns (JWT, OAuth), validation (Zod, Pydantic), and middleware.

### 0.3.2 Sampling Strategy
Use stratified sampling to read only the most relevant files (e.g., core controllers and entities) to stay within context limits.

---

## ✅ Validation & Synthesis

### Present Findings
Show the final "🔍 BACKEND STACK DETECTED" report and ask for confirmation.

### 💾 Cache & Pre-populate
1. **Export:** Save results to `.ai-flow/cache/docs-analysis.json`.
2. **Pre-populate:** Fill answers for Phases 1-7 based on detected data.

---

## 0.4 Proactive Suggestions
Generate a report of missing critical elements (e.g., "Rate Limiting Not Detected", "CORS Not Configured") and offer to address them in later phases.

---

✅ **Phase 0 Complete: Context Analysis Finalized**

---

### Phase Summary
- Pre-populated detected tech stack values.
- Architectural patterns identified.
- Context cached in `.ai-flow/cache/docs-analysis.json`.

---

**Next Phase:** Phase 1 - Discovery & Business Requirements

Read: `.ai-flow/prompts/backend/flow-build-phase-1.md`

---
_Version: 4.2 (Antigravity Optimized - Ultra-Light Edition)_
_Last Updated: 2025-12-21_
