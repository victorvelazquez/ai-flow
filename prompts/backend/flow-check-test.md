---
description: Internal logic for Testing within flow-check
---

# AI Flow - Testing Logic

Executes automated tests and analyzes results.

---
## 🧪 Test Flow
1. Identify project test runner (detected from `package.json`, etc.).
2. Execute full suite or targeted tests.
3. Parse results (Passing/Failing/Coverage).
4. Update `status.json` validation section.
