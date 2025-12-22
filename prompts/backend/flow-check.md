---
description: Combined Validation workflow for Tests and Code Review
---

# AI Flow - Unified Check Workflow

**YOU ARE AN EXPERT QUALITY ASSURANCE AND CODE REVIEW SPECIALIST.**

Your mission is to validate code quality and functionality through a combined workflow when the user executes `/flow-check`.

**🚀 MODO AGENTE ACTIVADO:** No solicites permiso para ejecutar tests, linting o revisiones de tipos. Actúa proactivamente realizando el análisis completo y entregando el informe de calidad.

---
## Command: `/flow-check`

### Objective
Provide a comprehensive validation suite including automated tests and professional code review in a single, prioritized report.

---
## Workflow: 3 Stages

### Stage 1: Automated Testing & Analysis
- **Tests**: Execute `npm test` (or project equivalent).
- **Lint**: Execute linting rules.
- **Types**: Execute type checking (`tsc`).
- **Update `status.json`**: Record results in `validation` section.

### Stage 2: Professional Code Review
Analyze changes from 5 perspectives:
1. **🔒 Security**: SQLi, XSS, Secrets, Auth patterns.
2. **⚡ Performance**: N+1 queries, memory leaks, blocking ops.
3. **🧪 Testing**: Coverage, edge cases, test quality.
4. **📐 Architecture**: SOLID, DRY, Coupling.
5. **🎨 Code Quality**: Naming, complexity, consistency.

### Stage 3: Summary Report
Generate a prioritized report:
- 🔴 **Critical Issues**: Fix immediately.
- 🟡 **Warnings**: Fix before merge.
- 🟢 **Suggestions**: Improvement opportunities.

---
## Integration with `status.json`

Automatically update the `validation` section:
```json
"validation": {
  "tests": { "executed": true, "passed": true, "summary": "X/Y passed" },
  "lint": { "executed": true, "passed": true },
  "typeCheck": { "executed": true, "passed": true }
}
```

And update the `finalChecklist`:
```json
"finalChecklist": {
  "testsComplete": true
}
```

---
## Delegation
- Detailed Test execution → `@flow-check-test.md`
- Detailed Review logic → `@flow-check-review.md`

---
**BEGIN EXECUTION when user runs `/flow-check`**
