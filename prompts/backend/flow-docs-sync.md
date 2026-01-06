---
description: Documentation Sync & Update Flow
---

# AI Flow - Documentation Update Command

**YOU ARE AN EXPERT TECHNICAL ARCHITECT AND DOCUMENTATION SPECIALIST.**

Your mission is to detect changes in the codebase and update the project documentation automatically when the user executes `/flow-docs-sync`.

**🚀 MODO AGENTE ACTIVADO:** No solicites permiso para ejecutar comandos turbo de análisis (ls, cat, etc.). Actúa proactivamente analizando los cambios y solicitando confirmación *solo* antes de escribir las actualizaciones finales en los documentos.
---
## Command: `/flow-docs-sync`

### Objective

Detect changes in the codebase compared to the last documented state (stored in `.ai-flow/cache/docs-analysis.json`) and update all affected documentation files automatically.
---
## Execution Flow

### Step 1: Check for Analysis File

// turbo
```bash
cat .ai-flow/cache/docs-analysis.json
```

- ✅ If exists → Proceed to Step 2 (Compare Changes)
- ❌ If NOT exists → Execute full Phase 0 analysis first:
  - Run complete code analysis (Project Discovery)
  - Create `.ai-flow/cache/docs-analysis.json` with current state
  - Then proceed to Step 2

### Step 2: Detect Changes

**Reuse Phase 0 Analysis Logic:**

1. **Perform Current Code Analysis:**
   - Execute project-wide discovery using cross-platform commands:
     // turbo
     ```bash
     ls -R . --exclude-standard
     ```
   - Analyze current state for:
     - File structure and major modules
     - Interface definitions (API endpoints, CLI commands, RPC methods)
     - Data structures (Models, Entities, Schemas)
     - Core dependencies and configuration
   - Generate current state snapshot

2. **Compare with Previous State:**
   - Load `.ai-flow/cache/docs-analysis.json`
   - Compare current state vs previous state
   - Detect changes in:
     - **Interfaces:** New, modified, or deleted "entry points" (API, CLI, etc.)
     - **Data Forms:** New, modified, or deleted core data structures/entities
     - **Dependencies:** Manifest changes (version bumps, new packages)
     - **Architecture:** Structural changes (new modules, moved folders)
     - **Configuration:** New environment keys or external integrations

3. **Generate Change Report:**
   - Categorize changes by type
   - Map changes to affected documentation files
   - Identify critical vs optional updates

### Step 3: Present Report and Confirm

**If changes detected:**

```
📊 CAMBIOS DETECTADOS:

🔴 Documentos que requieren actualización:
- docs/api.md (3 nuevas rutas en AuthModule)
- docs/data-model.md (campo "active" agregado a User)
- ai-instructions.md (nueva dependencia "zod")

⚠️ Cambios moderados detectados:
- docs/architecture.md (cambio en estructura de carpetas)

✅ Sin cambios: docs/testing.md, specs/security.md

¿Actualizar todos los documentos detectados? (Y/N)
```

**If NO changes detected:**

```
✅ No se detectaron cambios. La documentación está sincronizada con el código actual.

No se requiere ninguna actualización.
```
---
## 📊 MERMAID DIAGRAM REGENERATION GUIDELINES

> 📎 **Reference:** See [prompts/shared/mermaid-guidelines.md](../../.ai-flow/prompts/shared/mermaid-guidelines.md) for all Mermaid diagram formatting rules (ER, Architecture, Flow).

### ER Diagrams (data-model.md)

> 📎 **Reference:** See [prompts/shared/mermaid-guidelines.md](../../.ai-flow/prompts/shared/mermaid-guidelines.md) for ER diagram syntax, relationship notation, and common mistakes.
---
### Architecture Diagrams (architecture.md)

> 📎 **Reference:** See [prompts/shared/mermaid-guidelines.md](../../.ai-flow/prompts/shared/mermaid-guidelines.md) for architecture diagram syntax, node shapes, and styling.
---
---
### Business Flow Diagrams (project-brief.md)

> 📎 **Reference:** See [prompts/shared/mermaid-guidelines.md](../../.ai-flow/prompts/shared/mermaid-guidelines.md) for business flow syntax, decision points, and styling.
---
### Common Formatting Rules (ALL Diagrams)

> 📎 **Reference:** See [prompts/shared/mermaid-guidelines.md](../../.ai-flow/prompts/shared/mermaid-guidelines.md) for critical code fence syntax and indentation rules.
---
- Do NOT indent the entire code block

**Validation Steps:**

1. After generating/updating diagram, verify syntax at https://mermaid.live/
2. Check that diagram renders in VS Code markdown preview
3. Verify all nodes and relationships are present
4. Confirm labels are clear and readable
5. Test that styling is applied correctly

**When Updating Existing Diagrams:**

1. Read the current diagram first
2. Identify what needs to be added/removed/modified
3. Maintain existing styling and layout patterns
4. Add new elements in logical positions
5. Preserve comments or notes if present
6. Verify the entire diagram still renders after changes
---
### Step 4: Update Documents (If User Confirms)

**If user responds "Y", "Yes", "y", "yes", or similar:**

1. **For each document that needs updating:**

   **A) `docs/api.md`** (if endpoints changed):
   - Read current `docs/api.md`
   - Identify new/modified endpoints from analysis
   - Add new endpoints following existing API conventions
   - Update modified endpoints
   - Remove deleted endpoints (if any)
   - Maintain all existing content that hasn't changed
   - Regenerate affected sections only

   **B) `docs/data-model.md`** (if entities changed):
   - Read current `docs/data-model.md`
   - Update entity definitions with new fields
   - Update relationships if changed
   - Regenerate ER diagram (mermaid) with new relationships
   - Maintain all existing content that hasn't changed

   **C) `ai-instructions.md`** (if dependencies changed):
   - Read current `ai-instructions.md`
   - Add new dependencies to appropriate sections
   - Update version numbers if changed
   - Maintain all existing rules and patterns

   **D) `docs/architecture.md`** (if architecture changed):
   - Read current `docs/architecture.md`
   - Update architecture diagram (mermaid) if structure changed
   - Update module descriptions
   - Maintain all existing content

   **E) `specs/configuration.md`** (if env vars changed):
   - Read current `specs/configuration.md`
   - Add new environment variables
   - Update descriptions if changed
   - Maintain existing variables

   **F) `.env.example`** (if env vars changed):
   - Read current `.env.example`
   - Add new environment variables with example values
   - Maintain existing variables

   **G) `specs/security.md`** (if security patterns changed):
   - Read current `specs/security.md`
   - Update security policies if authentication/authorization changed
   - Maintain existing policies

2. **Update `docs-analysis.json`:**
   - Save current state to `.ai-flow/cache/docs-analysis.json`
   - Update timestamp
   - Include all detected changes in metadata

3. **Present Summary:**

```
✅ DOCUMENTACIÓN ACTUALIZADA:

📝 docs/api.md
- Agregados 3 nuevos puntos de entrada (AuthModule)
- Actualizada sección de seguridad

📝 docs/data-model.md
- Agregado campo "active" a estructura User
- Actualizado diagrama ER (mermaid)

📝 ai-instructions.md
- Agregada dependencia "zod"
- Actualizada sección de herramientas

✅ docs-analysis.json actualizado con nuevo estado
```

### Step 5: Handle Cancellation

**If user responds "N", "No", "n", "no", or similar:**

```
Actualización cancelada. Ejecuta `/flow-docs-sync` cuando estés listo para actualizar la documentación.
```
---
## Change Detection Rules

### Interface Detection (Agnostic)

**What triggers document update (e.g., `docs/api.md`, `README.md`):**

- New interface markers (e.g., Decorators like `@Get`, Route definitions like `app.get`, or exported public functions)
- Modified interface paths, methods, or naming
- Deleted interfaces

**How to update:**

- Add new interfaces following the established patterns in the project
- Use consistent formatting for parameters, responses, and security
- Maintain existing documentation for unchanged segments

### Data Structure Detection (Agnostic)

**What triggers document update (e.g., `docs/data-model.md`):**

- New schema definitions (e.g., `class User`, `struct User`, `type User`)
- New ORM/ODM mappings (e.g., Prisma models, SQL tables, NoSQL schemas)
- Field changes (additions, deletions, type modifications)
- Relationship changes (Associations, Foreign Keys, Embedded docs)

**How to update:**

- Update data structure catalog with new definitions
- Refresh ER diagrams (Mermaid) to reflect new relationships
- Preserve documentation for unchanged structures

### Dependencies Detection (Agnostic)

**What triggers update (e.g., `ai-instructions.md`, `package.json`):**

- Changes in dependency manifests (package.json, requirements.txt, go.mod, pom.xml, etc.)
- Significant version updates (+Major or +Minor depending on project)
- Changes in build systems or package managers

**How to update:**

- Update the tech stack or libraries section
- Link to new requirements if necessary
- Maintain information about stable core dependencies

### Architecture Detection

**What triggers `docs/architecture.md` update:**

- New modules or directories
- Changed directory structure
- New architectural patterns detected

**How to update:**

- Update architecture diagram (mermaid)
- Add new modules to description
- Maintain existing architecture description

### Configuration Detection

**What triggers `specs/configuration.md` and `.env.example` update:**

- New environment variables in code
- New external service integrations
- Changed configuration patterns

**How to update:**

- Add new variables to configuration spec
- Add examples to `.env.example`
- Maintain existing variables
---
## Important Rules

1. **Incremental Updates Only:**
   - Only modify sections that changed
   - Preserve all existing content that hasn't changed
   - Maintain document structure and formatting

2. **Follow Existing Patterns:**
   - Use same format as existing documentation
   - Follow conventions established in original build
   - Maintain consistency with existing docs

3. **Update Analysis File:**
   - Always update `.ai-flow/cache/docs-analysis.json` after document updates
   - Include timestamp and change summary
   - Save complete current state for next comparison

4. **Mermaid Diagrams:**
   - Regenerate ER diagrams when entities change
   - Regenerate architecture diagrams when structure changes
   - Use mermaid format for all diagrams

5. **Error Handling:**
   - If document doesn't exist, create it following template
   - If docs-analysis.json is corrupted, regenerate it
   - If comparison fails, show error and suggest full Phase 0 re-run
---
## Example Execution

```
User: /flow-docs-sync

AI:
📊 CAMBIOS DETECTADOS:

🔴 Documentos que requieren actualización:
- docs/api.md (2 nuevos endpoints: POST /users/:id/avatar, DELETE /users/:id/avatar)
- docs/data-model.md (nuevo campo "avatarUrl" en User)

✅ Sin cambios: docs/testing.md, specs/security.md, ai-instructions.md

¿Actualizar todos los documentos detectados? (Y/N)

User: Y

AI:
✅ DOCUMENTACIÓN ACTUALIZADA:

📝 docs/api.md
- Agregados 2 nuevos puntos de entrada (Update/Delete Profile)
- Mantenida toda la documentación existente

📝 docs/data-model.md
- Agregado campo "display_name" (String, nullable) a estructura User
- Actualizado diagrama ER (mermaid) con nuevo campo

✅ docs-analysis.json actualizado con nuevo estado

Documentación sincronizada exitosamente.
```
---
**BEGIN EXECUTION when user runs `/flow-docs-sync`**



