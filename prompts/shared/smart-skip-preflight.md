# Smart Skip Pre-Flight Check (Shared Template)

## 🔍 Pre-Flight Check Logic

**This section is automatically included in Phases 1-7 to enable smart skip functionality.**

### How It Works

1. **Read audit data** from Phase 0: `.ai-flow/cache/audit-data.json`
2. **Check consistency score** for the current phase
3. **Execute appropriate scenario** based on score

---

## Execution Flow

```javascript
// Read audit data from Phase 0
const auditData = readJSON('.ai-flow/cache/audit-data.json');
const phaseData = auditData?.phases?.[currentPhase];

if (phaseData?.exists) {
  // Documentation exists, check consistency
  if (phaseData.consistencyScore >= 95) {
    executeScenarioA(); // SKIP
  } else if (phaseData.consistencyScore >= 80) {
    executeScenarioB(); // HYBRID
  } else {
    executeScenarioC(); // FULL
  }
} else {
  // No existing docs, proceed with full phase
  executeScenarioC();
}
```

---

## Scenario A: High Confidence (≥95%) - SKIP

**Display format:**

```
---
✅ [PHASE NAME] ALREADY DOCUMENTED

File: [target-file]
Consistency: [score]%
Status: Complete documentation

Documented Information:
✅ [Key item 1]
✅ [Key item 2]
✅ [Key item 3]
...

---

Use existing documentation? (Y/n) ⭐
> _
```

**User Actions:**
- **Y**: Skip to next phase
- **n**: Proceed with full phase questionnaire

---

## Scenario B: Medium Confidence (80-94%) - HYBRID

**Display format:**

```
---
📚 [PHASE NAME] PARTIALLY DOCUMENTED

File: [target-file]
Consistency: [score]%
Status: Most information present, some gaps

Documented:
✅ [Item 1]
✅ [Item 2]

Missing:
❌ [Gap 1]
❌ [Gap 2]

---

Options:
A) Answer only [N] missing questions ⭐
B) Re-answer everything (full phase)
C) Skip entirely (use docs as-is)

> _
```

**User Actions:**
- **A**: Ask only missing questions, merge with existing docs
- **B**: Full phase questionnaire
- **C**: Skip with warning

---

## Scenario C: Low Confidence (<80%) or No Docs - FULL PHASE

**Display format:**

```
---
⚠️ [PHASE NAME] NEEDS DOCUMENTATION

Reason: [target-file] is outdated or missing
Consistency: [score]% (or N/A if file doesn't exist)

Issues detected:
❌ [Issue 1]
❌ [Issue 2]

Recommendation: Complete full phase questionnaire

Proceeding with full phase...
[Continue to first question]
```

---

## Phase-Specific Configuration

Each phase references this template with specific parameters:

### Phase 1: Discovery & Business
- **Target File**: `project-brief.md`
- **Phase Name**: "BUSINESS CONTEXT"
- **Key Items**: Project name, description, users, objectives, system type, features, scope, constraints, metrics, business flows
- **Typical Gaps**: Business objectives, success metrics, constraints

### Phase 2: Data Architecture
- **Target File**: `docs/data-model.md`
- **Phase Name**: "DATA ARCHITECTURE"
- **Key Items**: Entities, relationships, data patterns, indexes
- **Typical Gaps**: Missing entities, undocumented relationships, missing fields

### Phase 3: System Architecture
- **Target File**: `docs/architecture.md`
- **Phase Name**: "SYSTEM ARCHITECTURE"
- **Key Items**: Framework, architecture pattern, API style, database, caching, background jobs, integrations
- **Typical Gaps**: API versioning, rate limiting, caching strategy

### Phase 4: Security & Authentication
- **Target File**: `specs/security.md`
- **Phase Name**: "SECURITY & AUTHENTICATION"
- **Key Items**: Auth strategy, encryption, security patterns, compliance
- **Typical Gaps**: Compliance requirements, audit logging, security policies

### Phase 5: Code Standards
- **Target File**: `docs/code-standards.md`
- **Phase Name**: "CODE STANDARDS"
- **Key Items**: Linters, formatters, naming conventions, code review process
- **Typical Gaps**: Team-specific conventions, code review workflow

### Phase 6: Testing Strategy
- **Target File**: `docs/testing.md`
- **Phase Name**: "TESTING STRATEGY"
- **Key Items**: Test framework, coverage targets, test types, CI/CD integration
- **Typical Gaps**: E2E strategy, load testing, performance testing

### Phase 7: Operations & Deployment
- **Target File**: `docs/deployment.md`
- **Phase Name**: "OPERATIONS & DEPLOYMENT"
- **Key Items**: CI/CD pipeline, deployment platform, monitoring, logging
- **Typical Gaps**: Incident runbooks, disaster recovery, scaling strategy

---

## Usage in Phase Prompts

**In each phase prompt (1-7), add this reference:**

```markdown
## 🔍 Pre-Flight Check (Smart Skip Logic)

> 📎 **Reference:** See [prompts/shared/smart-skip-preflight.md](../../.ai-flow/prompts/shared/smart-skip-preflight.md) for the complete smart skip logic.

**Execute Pre-Flight Check for this phase:**

- **Phase**: [Phase Number]
- **Target File**: [file path]
- **Phase Name**: [display name]

[Proceed with appropriate scenario based on audit data]

---

## Phase [N] Questions (Full Mode)

[Continue with phase-specific questions...]
```

---

## Benefits of This Approach

✅ **DRY Principle**: Single source of truth for skip logic
✅ **Easy Maintenance**: Update once, applies to all phases
✅ **Consistency**: Same UX across all phases
✅ **Reduced File Size**: Each phase prompt is ~100 lines shorter
✅ **Clear Separation**: Logic vs content

---

**Last Updated:** 2025-12-22
**Version:** 1.0
