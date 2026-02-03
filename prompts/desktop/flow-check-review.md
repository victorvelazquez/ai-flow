---
description: Internal logic for Code Review within flow-check
---

# AI Flow - Review Logic

Performs professional multi-aspect code review.

---
## 🔍 Review Aspects
1. **Security**: OWASP patterns, secrets, auth.
2. **Performance**: N+1, leaks, async blocking.
3. **Tests**: Edge cases, quality, coverage.
4. **Architecture**: SOLID, DRY, Patterns.
5. **Quality**: Naming, complexity, linting.

---
## 📊 Reporting
- Prioritize: 🔴 Critical, 🟡 Warning, 🟢 Suggestion.
- Save report to `.ai-flow/reviews/`.
