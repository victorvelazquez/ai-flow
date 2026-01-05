## PHASE 10: Agile Planning - User Stories (5-10 min)

> **Order for this phase:** OPTIONAL. Executed after Phase 9 or on demand.

> **📌 Scope-based behavior:**
> - **All Scopes:** Generate detailed User Stories for each milestone in the Roadmap.

### Objective
Break down technical roadmap tasks into user-centric Agile requirements (User Stories) to facilitate development, testing, and acceptance criteria definition.

- All Epics: 30-60 minutes
- One Epic: 5-10 minutes
- One User Story: 2-3 minutes

---

## Command Modes

```
/flow-build fase 10              → Generate all (or Sprint 1 selection)
/flow-build fase 10 EP-001       → Generate User Stories for specific Epic
/flow-build fase 10 HU-001-001   → Generate/regenerate specific User Story
```

---

## Workflow: 4 Steps

// turbo
### Step 10.1: Load Context from Roadmap

**Extract from `planning/roadmap.md`:**

```
CONTEXT LOADED
├── Language: {{LANGUAGE}}
├── Framework: {{FRAMEWORK}}
├── Architecture: {{ARCHITECTURE}}
├── Epics: X
├── Features: X
├── Tasks: X
└── Total SP: X
```

**Load additional context from:**
- `project-brief.md` - Business context, target users
- `ai-instructions.md` - Tech stack, patterns
- `docs/api.md` - Endpoints specification
- `specs/security.md` - Security requirements

---

### Step 10.2: Select Scope

**Show options:**

```
SCOPE SELECTION
├── A) All Epics (complete backlog)
├── B) Sprint 1 only (P0/P1 priorities)
├── C) Specific Epics (select which)
└── D) Cancel
```

---

### Step 10.3: Generate User Story Documents

**For each Feature in roadmap, create `planning/user-stories/EP-XXX/HU-XXX-YYY.md`:**

```markdown
# User Story: HU-{{EPIC}}-{{FEATURE}}

**Title:** {{FEATURE_NAME}}
**Priority:** {{PRIORITY}} (Must Have | Should Have | Could Have)
**Story Points:** {{SP}} SP
**Sprint:** {{SPRINT}} or "Backlog"

## Description

**As a** {{USER_TYPE}}
**I want** {{DESIRED_FUNCTIONALITY}}
**So that** {{USER_BENEFIT}}

---

## Acceptance Criteria

> Minimum 5-6 scenarios: Happy path (2-3) + Error cases (2) + Edge/Security (1-2)

1. **Given** {{PRECONDITION}}
   **When** {{ACTION}}
   **Then** {{EXPECTED_RESULT}}

2. **Given** {{PRECONDITION}}
   **When** {{ACTION}}
   **Then** {{EXPECTED_RESULT}}

3. **Given** {{ERROR_PRECONDITION}}
   **When** {{ERROR_ACTION}}
   **Then** {{ERROR_RESULT}}

4. **Given** {{EDGE_PRECONDITION}}
   **When** {{EDGE_ACTION}}
   **Then** {{EDGE_RESULT}}

5. **Given** {{SECURITY_PRECONDITION}}
   **When** {{SECURITY_ACTION}}
   **Then** {{SECURITY_RESULT}}

---

## Technical Notes

> From ai-instructions.md, architecture.md, security.md

- {{IMPLEMENTATION_DETAIL_1}}
- {{IMPLEMENTATION_DETAIL_2}}
- {{SECURITY_REQUIREMENT}}
- {{INTEGRATION_DETAIL}}

---

## Tasks

> Inherited from planning/roadmap.md Feature {{FEATURE_NUMBER}}

{{TASKS_FROM_ROADMAP}}

---

## Dependencies

- **Requires:** {{REQUIRED_STORIES}}
- **Blocks:** {{BLOCKED_STORIES}}
- **Related:** {{RELATED_STORIES}}

---

## Definition of Done

- [ ] Code implemented and peer reviewed
- [ ] Unit tests passing (coverage >= 80%)
- [ ] Integration tests implemented
- [ ] Security requirements verified
- [ ] API documentation updated
- [ ] QA validation completed
- [ ] No lint/format errors

---

## Estimation

- **Story Points:** {{SP}} SP
- **Time Estimate:** {{TIME_RANGE}}
- **Complexity:** {{COMPLEXITY}} (Low | Medium | High)

---

## Assignment

- **Assigned to:** (Unassigned)
- **Start date:** (TBD)
- **Due date:** (TBD)
- **Status:** Draft | Ready | In Progress | Done
```

---

### Step 10.4: Generate Test Cases (Separate Files)

**For each User Story, create `planning/user-stories/EP-XXX/tests/TC-XXX-YYY.md`:**

```markdown
# Test Cases: HU-{{EPIC}}-{{FEATURE}}

> Derived from Acceptance Criteria (1-2 test cases per scenario)

## TC-001: {{TEST_NAME}} (Happy Path)

- **Precondition:** {{INITIAL_STATE}}
- **Test Data:**
  - Field1: `value1`
  - Field2: `value2`
- **Steps:**
  1. {{STEP_1}}
  2. {{STEP_2}}
  3. {{STEP_3}}
- **Expected Result:** {{EXPECTED_OUTCOME}}
- **Priority:** High
- **Type:** Functional
- **Automatable:** Yes/No

## TC-002: {{TEST_NAME}} (Error Case)

- **Precondition:** {{INITIAL_STATE}}
- **Test Data:**
  - Field1: `invalid_value`
- **Steps:**
  1. {{STEP_1}}
  2. {{STEP_2}}
- **Expected Result:** {{ERROR_MESSAGE}}
- **Priority:** High
- **Type:** Functional

## TC-003: {{TEST_NAME}} (Edge Case)

- **Precondition:** {{INITIAL_STATE}}
- **Test Data:**
  - Field1: `boundary_value`
- **Steps:**
  1. {{STEP_1}}
- **Expected Result:** {{EXPECTED_BEHAVIOR}}
- **Priority:** Medium
- **Type:** Boundary

## TC-004: {{TEST_NAME}} (Security)

- **Precondition:** {{SECURITY_STATE}}
- **Test Data:**
  - Attempts: 5
- **Steps:**
  1. {{SECURITY_STEP}}
- **Expected Result:** {{SECURITY_OUTCOME}}
- **Priority:** High
- **Type:** Security

---

**Total Test Cases:** {{N}}
**Coverage:** {{N}}/{{TOTAL_CRITERIA}} (100%)
```

---

### Step 10.5: Update Roadmap with Links

**After generating, update `planning/roadmap.md`:**

```markdown
### Feature 1.1: {{FEATURE_NAME}} • {{SP}} SP

**User Story:** [HU-001-001](planning/user-stories/EP-001/HU-001-001.md)
**Status:** Not Started

**Tasks:**
{{TASKS}}
```

---

## Generation Rules

### User Story Format
- **Title:** From Feature name in roadmap
- **Priority:** MoSCoW (Must/Should/Could/Won't Have)
- **As a:** From project-brief.md (target users)
- **I want:** From Feature description
- **So that:** User value/benefit

### Acceptance Criteria
- **Minimum 5-6 scenarios**
- **Gherkin format:** Given/When/Then
- **Include:** Happy path, Error cases, Edge cases, Security
- **Each scenario = executable test**

### Technical Notes
- Pull from ai-instructions.md, architecture.md, security.md
- Be specific (e.g., "bcrypt 12 rounds", not "hash passwords")
- Include rate limiting, logging, integrations

### Tasks
- **Inherit from roadmap** (don't duplicate)
- Keep same format: `TXXX [CAT] Desc • N SP → {{path}} | deps: X`
- Keep Story Points from roadmap

### Test Cases
- **Separate file** per User Story
- 1-2 test cases per acceptance scenario
- Include specific test data
- Mark priority and type

---

## DO NOT

- ❌ Create User Story without roadmap context
- ❌ Skip acceptance criteria (minimum 5-6 required)
- ❌ Generate generic test cases without test data
- ❌ Duplicate tasks from roadmap
- ❌ Omit security scenarios
- ❌ Hardcode language-specific details
- ❌ Forget to update roadmap with links

## ALWAYS

- ✅ Inherit context variables from roadmap
- ✅ Generate 5-6 Gherkin acceptance scenarios
- ✅ Include security scenarios
- ✅ Derive test cases from criteria
- ✅ Separate test cases into tests/ folder
- ✅ Update roadmap with User Story links
- ✅ Create backup before regenerating

---

## Summary

```
PHASE 10 COMPLETE
├── Generated: X User Stories
├── Total SP: X SP
├── Test Cases: X
├── Files: planning/user-stories/EP-XXX/
└── Updated: planning/roadmap.md (added links)

Next steps:
1. Review User Stories in planning/user-stories/
2. Start implementing: /flow-dev-feature HU-001-001
3. Generate more: /flow-build fase 10 EP-XXX
```

---

## 📝 Generated Documents

After Phase 10, generate/update:

- `planning/user-stories/*.md` - Detailed Agile requirements
- `planning/roadmap.md` - (updated with story links)

---

**CONGRATULATIONS!** Project documentation and planning are complete. 🚀

---

**Last Updated:** 2025-12-20
**Version:** 2.1.8

