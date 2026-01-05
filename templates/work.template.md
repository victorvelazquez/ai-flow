# [Type]: [Feature/Fix/Refactor Name]

## Context
**Source**: HU-XXX-XXX | Roadmap X.X | Manual
**SP**: X | **Branch**: [type]/[slug] | **Deps**: None | TXXX

## Objective
[1-2 clear paragraphs describing WHAT will be implemented/fixed/refactored]

## Documentation Constraints
**Read**: ai-instructions.md, architecture.md, code-standards.md

**Key Rules**:
- ✅ ALWAYS: [List specific rules that apply]
- ❌ NEVER: [List specific prohibitions]
- 📐 Pattern: [Architectural pattern from docs]
- 📁 Location: [File structure from architecture.md]

## Approach
**Layer**: [Data | Business Logic | API | UI]
**Files**: [List files to create/modify]
**Reference**: [Existing file to follow as pattern]

**Phases**:
1. [Phase 1 description]
2. [Phase 2 description]
3. [Phase 3 description]
4. [Phase 4 description]

## Tasks
**Source**: [Manual | Roadmap X.X (expanded) | HU-XXX-XXX (expanded) | HU-XXX-XXX (reference)]

- [ ] T001 [D] [Description] → [file path] • X SP
  - [Pattern/constraint details]
- [ ] T002 [L] [Description] → [file path] • X SP
  - [Pattern/constraint details] (deps: T001)
- [ ] T003 [A] [Description] → [file path] • X SP
  - [Pattern/constraint details] (deps: T002)
- [ ] T004 [T] [Description] → [file path] • X SP
  - [Pattern/constraint details] (deps: T002)

## Validation
- [ ] All NEVER/ALWAYS rules followed
- [ ] Tests pass (coverage per docs/testing.md)
- [ ] No hardcoded secrets
- [ ] Follows existing patterns
- [ ] [Add specific validations based on type]
