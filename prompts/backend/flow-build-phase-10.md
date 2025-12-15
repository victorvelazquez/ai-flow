# AI Flow - Phase 10: User Stories Generation 📖

**YOU ARE AN EXPERT PRODUCT OWNER AND AGILE SPECIALIST.**

Your mission in Phase 10 is to generate detailed, actionable User Stories with acceptance criteria, technical tasks, and test cases from the roadmap generated in Phase 9.

---

## 🎯 Phase 10 Objective

Generate executable User Stories following agile best practices with:

- **Gherkin-style acceptance criteria** (Given/When/Then)
- **Technical task breakdown** (Backend/Frontend/Testing)
- **QA test cases** derived from acceptance criteria
- **Definition of Done** checklist
- **Story Points** inherited from roadmap

---

## Command Modes

- **`/flow-build fase 10`** → Generate all User Stories (or Sprint 1 selection)
- **`/flow-build fase 10 EP-XXX`** → Generate User Stories for specific Epic
- **`/flow-build fase 10 HU-XXX-XXX`** → Generate/regenerate specific User Story

---

## Prerequisites

Before executing Phase 10, verify:

- ✅ Phase 9 completed (`docs/roadmap.md` exists)
- ✅ All Phase 1-8 documentation exists
- ✅ Roadmap contains Epics, Features, and Tasks

---

## Duration

⏱️ **Estimated Time:**

- All Epics: 30-60 minutes
- One Epic: 5-10 minutes
- One User Story: 2-3 minutes

---

## Workflow: 4 Steps

### Step 10.1: Mode Detection & Context Loading (Automatic)

**Parse command arguments:**

```typescript
const args = getArguments(); // From /flow-build fase 10 [args]

if (!args || args.length === 0) {
  mode = 'ALL'; // Generate all or prompt for selection
} else if (args[0].match(/^EP-\d{3}$/)) {
  mode = 'EPIC';
  targetId = args[0]; // e.g., EP-001
} else if (args[0].match(/^HU-\d{3}-\d{3}$/)) {
  mode = 'STORY';
  targetId = args[0]; // e.g., HU-001-001
} else {
  showError(`Invalid format: ${args[0]}`);
  showHelp(`
    Usage:
      /flow-build fase 10              → Generate all (or Sprint 1)
      /flow-build fase 10 EP-001       → Generate Epic 001 User Stories
      /flow-build fase 10 HU-001-001   → Generate specific User Story
    
    Output location: docs/user-stories/
  `);
  exit();
}
```

**Display mode:**

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📖 Phase 10: User Stories Generation
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Mode: [ALL | EPIC: EP-001 | STORY: HU-001-001]
```

**Load required documentation:**

```
Loading project context...

✅ docs/roadmap.md (5 Epics, 18 Features, 89 SP)
✅ project-brief.md (business context)
✅ ai-instructions.md (tech stack, patterns)
✅ docs/data-model.md (entities, relationships)
✅ docs/architecture.md (system design)
✅ docs/api.md (endpoints)
✅ specs/security.md (auth, validation)
✅ docs/testing.md (test strategy)
```

**If docs/roadmap.md NOT found:**

```
❌ Error: docs/roadmap.md not found

Phase 10 requires docs/roadmap.md from Phase 9.

Options:
1. ✅ Generate roadmap first: /flow-build fase 9
2. ⏭️ Exit and run Phase 9 manually

Your choice (1): _
```

---

### Step 10.2: Execute Based on Mode

---

#### **Mode 1: ALL (No parameters)**

**Show scope selection:**

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 Scope Selection
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Found 5 Epics with 18 Features in docs/roadmap.md

Total Story Points: 89 SP (~4-5 weeks for 1 dev)

Generate User Stories for:

A) ✅ All Epics (18 User Stories) - Complete backlog
   Epics: EP-001, EP-002, EP-003, EP-004, EP-005
   Time: ~40-50 minutes

B) 📋 Sprint 1 Epics only (Priority P0/P1) - Quick start
   Epics: EP-001 (5 stories), EP-002 (3 stories)
   Total: 8 User Stories
   Time: ~15-20 minutes

C) 🎯 Specific Epics (select which ones)
   Choose from: EP-001, EP-002, EP-003, EP-004, EP-005

D) ⏭️ Cancel (run specific Epic later)
   Example: /flow-build fase 10 EP-001

Your choice (B): _
```

**If choice B (Sprint 1):**

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📖 Generating Sprint 1 User Stories
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Selected Epics:
- EP-001: Autenticación (5 stories, 13 SP)
- EP-002: Gestión Usuarios (3 stories, 21 SP)

Total: 8 User Stories, 34 SP

Generating...

[████████████████████] EP-001 (5/5) ✅
  ✅ HU-001-001.md - Login básico (5 SP)
  ✅ HU-001-002.md - Login OAuth (3 SP)
  ✅ HU-001-003.md - Recuperación contraseña (3 SP)
  ✅ HU-001-004.md - Refresh tokens (1 SP)
  ✅ HU-001-005.md - Logout (1 SP)

[████████████████████] EP-002 (3/3) ✅
  ✅ HU-002-001.md - CRUD usuarios (8 SP)
  ✅ HU-002-002.md - Perfiles y roles (8 SP)
  ✅ HU-002-003.md - Admin dashboard (5 SP)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Sprint 1 User Stories Generated
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Created:
📁 .ai-flow/user-stories/
  ├── EP-001/
  │   ├── HU-001-001.md ✅
  │   ├── HU-001-002.md ✅
  │   ├── HU-001-003.md ✅
  │   ├── HU-001-004.md ✅
  │   └── HU-001-005.md ✅
  └── EP-002/
      ├── HU-002-001.md ✅
      ├── HU-002-002.md ✅
      └── HU-002-003.md ✅

Total: 8 User Stories (34 SP)

🚀 Ready to start Sprint 1!

Next steps:
1. Review User Stories in .ai-flow/user-stories/ folder
2. Start implementing: /flow-dev-feature HU-001-001
3. Generate more Epics later: /flow-build fase 10 EP-003
```

---

#### **Mode 2: EPIC (e.g., /flow-build fase 10 EP-001)**

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📖 Generating User Stories for EP-001
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Loading Epic from docs/roadmap.md...

Epic: EP-001 - Autenticación y Seguridad
Priority: P0 (Critical)
Story Points: 13 SP
Features: 5

Features in this Epic:
  1. Feature 1.1: Login básico (5 SP)
  2. Feature 1.2: Login OAuth (3 SP)
  3. Feature 1.3: Recuperación contraseña (3 SP)
  4. Feature 1.4: Refresh tokens (1 SP)
  5. Feature 1.5: Logout (1 SP)

User Stories to generate: 5

Generating...

[████████████████████] (5/5) ✅

✅ HU-001-001.md created (Login básico)
✅ HU-001-002.md created (Login OAuth)
✅ HU-001-003.md created (Recuperación contraseña)
✅ HU-001-004.md created (Refresh tokens)
✅ HU-001-005.md created (Logout)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ EP-001 User Stories Generated
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Location: .ai-flow/user-stories/EP-001/

Files created:
- HU-001-001.md (5 SP, 6 tasks, 8 test cases)
- HU-001-002.md (3 SP, 4 tasks, 5 test cases)
- HU-001-003.md (3 SP, 5 tasks, 6 test cases)
- HU-001-004.md (1 SP, 2 tasks, 3 test cases)
- HU-001-005.md (1 SP, 2 tasks, 2 test cases)

Total: 5 User Stories, 13 SP, 19 tasks, 24 test cases

Next: Start implementing with /flow-dev-feature HU-001-001
```

---

#### **Mode 3: STORY (e.g., /flow-build fase 10 HU-001-001)**

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📖 Generating User Story: HU-001-001
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Checking if file exists...

⚠️ .ai-flow/user-stories/EP-001/HU-001-001.md already exists

File size: 4.2 KB
Last modified: 2025-12-10 15:30

Options:
1. 🔄 Regenerate (overwrite completely)
2. 📝 Update (merge new content, preserve manual edits)
3. 👀 View current (show existing content)
4. ❌ Cancel

Your choice (2): _

[If user chooses 1: Regenerate]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔄 Regenerating HU-001-001
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠️ WARNING: This will overwrite all manual changes!

Backup current file? (Y/n): Y

✅ Backup created: docs/user-stories/EP-001/.backup/HU-001-001.2025-12-12.md

Loading context from docs/roadmap.md...
- Epic: EP-001 Autenticación
- Feature: 1.1 Login básico (5 SP)
- Priority: P0

Generating User Story...

✅ HU-001-001.md regenerated successfully!

Changes:
+ Added 2 new acceptance criteria (password strength, rate limiting)
+ Updated 3 test cases (added edge cases)
+ Refreshed Definition of Done
~ No changes to technical tasks

Location: .ai-flow/user-stories/EP-001/HU-001-001.md
Backup: .ai-flow/user-stories/EP-001/.backup/HU-001-001.2025-12-12.md

[If file doesn't exist - New User Story]

✅ File doesn't exist, creating new User Story...

Context from roadmap:
- Epic: EP-001 Autenticación
- Feature: 1.1 Login básico (5 SP)
- Priority: P0 (Critical)
- Tasks: 6 (from docs/roadmap.md)

Generating User Story with:
✅ User Story format (Como/Quiero/Para)
✅ Acceptance Criteria (Gherkin Given/When/Then)
✅ Technical Tasks (Backend/Frontend/Testing)
✅ QA Test Cases (derived from criteria)
✅ Estimation (Story Points + Time)
✅ Dependencies
✅ Definition of Done

✅ HU-001-001.md created successfully!

Location: .ai-flow/user-stories/EP-001/HU-001-001.md
Size: 4.2 KB
Tasks: 6
Test Cases: 8
Story Points: 5 SP (~6-8h)

Next: Implement with /flow-dev-feature HU-001-001
```

---

### Step 10.3: Generate User Story Document

**For each User Story, generate complete `.md` file with this structure:**

```markdown
# 📖 Historia de Usuario: HU-{{XXX}}-{{YYY}} - {{TÍTULO}}

## Epic

EP-{{XXX}}: {{EPIC_NAME}}

## Historia de Usuario

**ID:** HU-{{XXX}}-{{YYY}}  
**Título:** {{FEATURE_NAME}}  
**Prioridad:** {{PRIORITY}} (Alta | Media | Baja)  
**Sprint:** {{SPRINT_NUMBER}} o "Backlog"  
**Story Points:** {{SP}} SP  
**Estimación:** {{TIME_ESTIMATE}}

**Como:** {{USER_TYPE}}  
**Quiero:** {{DESIRED_FUNCTIONALITY}}  
**Para:** {{USER_BENEFIT}}

---

## Criterios de Aceptación

### Escenario 1: {{SCENARIO_NAME}}

**Dado que** {{PRECONDITION}}  
**Cuando** {{ACTION}}  
**Entonces** {{EXPECTED_RESULT}}

### Escenario 2: {{SCENARIO_NAME}}

**Dado que** {{PRECONDITION}}  
**Cuando** {{ACTION}}  
**Entonces** {{EXPECTED_RESULT}}

### Escenario 3: {{SCENARIO_NAME}}

**Dado que** {{PRECONDITION}}  
**Cuando** {{ACTION}}  
**Entonces** {{EXPECTED_RESULT}}

**[Generate 3-5 scenarios covering: happy path, error cases, edge cases]**

---

## Tareas Técnicas

> **Source:** Inherited from docs/roadmap.md Feature {{FEATURE_NUMBER}}

### Backend

- [ ] **T-{{XXX}}-001:** {{TASK_DESCRIPTION}} • {{SP}} SP (~{{TIME}})
      File: {{FILE_PATH}}
      Dependencies: {{DEPENDENCIES}}

- [ ] **T-{{XXX}}-002:** {{TASK_DESCRIPTION}} • {{SP}} SP (~{{TIME}})
      File: {{FILE_PATH}}
      Dependencies: {{DEPENDENCIES}}

### Frontend (if applicable)

- [ ] **T-{{XXX}}-003:** {{TASK_DESCRIPTION}} • {{SP}} SP (~{{TIME}})
      File: {{FILE_PATH}}
      Dependencies: {{DEPENDENCIES}}

### Testing

- [ ] **T-{{XXX}}-004:** {{TASK_DESCRIPTION}} • {{SP}} SP (~{{TIME}})
      File: {{FILE_PATH}}
      Dependencies: {{DEPENDENCIES}}

**Total Tasks:** {{N}}  
**Total SP:** {{TOTAL_SP}} Story Points

---

## Casos de Prueba (QA)

> **Derived from:** Acceptance Criteria (1 scenario = 1-2 test cases)

### TC-{{XXX}}-001: {{TEST_NAME}} (Happy Path)

- **Precondición:** {{INITIAL_STATE}}
- **Pasos:**
  1. {{STEP_1}}
  2. {{STEP_2}}
  3. {{STEP_3}}
- **Resultado Esperado:** {{EXPECTED_OUTCOME}}
- **Prioridad:** Alta
- **Tipo:** Funcional | Integración | E2E

### TC-{{XXX}}-002: {{TEST_NAME}} (Error Case)

- **Precondición:** {{INITIAL_STATE}}
- **Pasos:**
  1. {{STEP_1}}
  2. {{STEP_2}}
- **Resultado Esperado:** {{ERROR_MESSAGE}}
- **Prioridad:** Alta
- **Tipo:** Funcional

### TC-{{XXX}}-003: {{TEST_NAME}} (Edge Case)

- **Precondición:** {{INITIAL_STATE}}
- **Pasos:**
  1. {{STEP_1}}
  2. {{STEP_2}}
- **Resultado Esperado:** {{EXPECTED_BEHAVIOR}}
- **Prioridad:** Media
- **Tipo:** Límites | Validación

**[Generate 1-2 test cases per acceptance scenario = 3-10 total]**

---

## Estimación

- **Story Points:** {{SP}} SP (from roadmap)
- **Tiempo Estimado:** {{TIME_RANGE}} (e.g., 6-8h, 1-2d)
- **Complejidad:** Baja | Media | Alta

---

## Dependencias

- **Requiere:** {{REQUIRED_STORIES}} (e.g., HU-001-001 completed)
- **Bloquea:** {{BLOCKED_STORIES}} (e.g., HU-002-003 cannot start)
- **Relacionado con:** {{RELATED_STORIES}}

---

## Definición de Done (DoD)

- [ ] Código implementado siguiendo ai-instructions.md
- [ ] Code review aprobado (mín 1 revisor)
- [ ] Tests unitarios escritos (cobertura > 80%)
- [ ] Tests de integración pasando
- [ ] Casos de prueba QA ejecutados y aprobados ({{N}}/{{N}})
- [ ] Documentación técnica actualizada (docs/api.md, etc.)
- [ ] Sin errores de lint ni formateo
- [ ] Deploy a staging exitoso
- [ ] Product Owner aprobó la funcionalidad

---

## Notas Técnicas

> **Context from:**
>
> - ai-instructions.md ({{FRAMEWORK}} patterns)
> - docs/architecture.md ({{ARCHITECTURE_PATTERN}})
> - specs/security.md (authentication, validation)

### Consideraciones de Implementación:

- {{TECHNICAL_NOTE_1}}
- {{TECHNICAL_NOTE_2}}
- {{ARCHITECTURE_DECISION}}

### APIs/Servicios Involucrados:

- **Endpoint:** `{{HTTP_METHOD}} {{ENDPOINT_PATH}}`
- **Servicio externo:** {{EXTERNAL_SERVICE}} (if any)

### Seguridad/Performance:

- {{SECURITY_CONSIDERATION}}
- {{PERFORMANCE_OPTIMIZATION}}

---

## Diseño/Prototipo

🎨 **Diseño:** {{DESIGN_LINK}} (if provided by user)

---

## Historial

- **Creada:** {{DATE}} (Phase 10)
- **Actualizada:** {{DATE}} (if regenerated)
- **Estado:** Draft | Ready | In Progress | Done
```

---

### Step 10.4: Update Roadmap with Links

**After generating User Stories, update docs/roadmap.md to add links:**

```
Updating docs/roadmap.md with User Story links...

✅ Updated Feature 1.1 with link to HU-001-001
✅ Updated Feature 1.2 with link to HU-001-002
✅ Updated Feature 1.3 with link to HU-001-003

docs/roadmap.md updated successfully!
```

**Updated docs/roadmap.md format:**

```markdown
### Feature 1.1: Login básico • 5 SP (~6-8h)

**User Story:** 📖 [HU-001-001](./.ai-flow/user-stories/EP-001/HU-001-001.md)

**Status:** ⚪ Not Started

**Tasks:**

- [ ] T001 Write User entity tests • 1 SP
- [ ] T002 Create User entity • 1 SP
      ...
```

---

## 🎯 Generation Rules

### **1. User Story Format**

- **Como:** Extract from project-brief.md (target users)
- **Quiero:** From Feature name in roadmap
- **Para:** From Feature scope/benefits

### **2. Acceptance Criteria**

- **Minimum 3 scenarios:** Happy path + Error case + Edge case
- **Gherkin format:** Dado/Cuando/Entonces (Given/When/Then)
- **Testable:** Each scenario = executable test
- **Based on:** API docs, business flows, security specs

### **3. Technical Tasks**

- **Inherit from roadmap:** Use Tasks from docs/roadmap.md Feature
- **Add file paths:** Exact location where code goes
- **Add dependencies:** Which tasks block others
- **Keep Story Points:** From roadmap estimation

### **4. Test Cases**

- **Derive from criteria:** 1-2 test cases per acceptance scenario
- **Types:** Funcional, Integración, E2E, Límites
- **Priority:** Alta for happy/error paths, Media for edge cases
- **Format:** Precondición → Pasos → Resultado esperado

### **5. Definition of Done**

**Standard checklist (same for all stories):**

- Code implemented
- Code review passed
- Tests written (unit + integration)
- Tests passing
- QA test cases executed
- Documentation updated
- Lint/format clean
- Staging deploy successful
- PO approval

### **6. Technical Notes**

**Pull from documentation:**

- `ai-instructions.md` → Framework patterns, code conventions
- `docs/architecture.md` → Architecture pattern (Hexagonal, Clean, etc.)
- `docs/data-model.md` → Entity schemas, relationships
- `specs/security.md` → Auth requirements, validations
- `docs/api.md` → Endpoint details

---

## ⚠️ Rules & Constraints

### **NEVER:**

- ❌ Create User Story without roadmap context
- ❌ Duplicate tasks from roadmap (reference, don't copy)
- ❌ Skip acceptance criteria
- ❌ Generate test cases without criteria
- ❌ Use generic DoD (personalize per story if needed)
- ❌ Forget to update docs/roadmap.md with links

### **ALWAYS:**

- ✅ Inherit Story Points from roadmap
- ✅ Generate 3-5 acceptance scenarios (Gherkin)
- ✅ Derive 1-2 test cases per scenario
- ✅ Link back to Epic and Feature
- ✅ Include technical context from docs
- ✅ Update docs/roadmap.md with User Story links
- ✅ Create backup before regenerating

---

## 📊 Summary Format

**After generation, show:**

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ PHASE 10 COMPLETE: USER STORIES GENERATED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Generated: {{N}} User Stories
Total Story Points: {{SP}} SP
Total Tasks: {{TASKS}}
Total Test Cases: {{TC}}

Files created:
📁 docs/user-stories/
  ├── EP-001/ (5 stories, 13 SP)
  ├── EP-002/ (3 stories, 21 SP)
  └── EP-003/ (4 stories, 18 SP)

Updated:
✅ docs/roadmap.md (added User Story links)

🚀 Ready to start development!

Next steps:
1. Review User Stories in docs/user-stories/ folder
2. Start implementing: /flow-dev-feature HU-001-001
3. Track progress: /flow-dev-work
4. Generate more stories: /flow-build fase 10 EP-004

Happy coding! 🎉
```

---

## 🔗 Integration with Phase 9

**Phase 9 provides:**

- Epics structure
- Features with Story Points
- Technical tasks breakdown
- Dependencies

**Phase 10 adds:**

- User Story format (Como/Quiero/Para)
- Acceptance criteria (Gherkin)
- Test cases (derived from criteria)
- Definition of Done
- Technical context from all docs

**Together they form:** Complete backlog ready for execution

---

**EXECUTION:** Execute workflow based on detected mode (ALL | EPIC | STORY)
