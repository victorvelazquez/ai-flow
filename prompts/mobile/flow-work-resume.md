---
description: Internal logic for Resuming work within flow-work
---

# AI Flow - Resume Logic

This file contains the logic for detecting and resuming paused work items, imported by `@flow-work.md`.

---
## ⏸️ Resume Workflow

### 1. Work Detection
- Scan `.ai-flow/work/` for any directories
- Group by type and last updated timestamp

### 2. Selection Menu
- Show active tasks with percentage and current branch
- Identify current Git branch and match with work items (⭐⭐ marker)

### 3. Context Restoration
- Load `work.md` and `status.json`
- Verify Git branch:
  - If mismatch: Prompt to switch to `git.branchName`
- Identify the first incomplete task in `work.md`
- Read Documentation Constraints section to refresh context

### 4. Implementation Continuation
- Resume with the previously saved `implementationMode`
- Continue execution from where it was paused
- Follow remaining tasks in `work.md`

---
## 📦 status.json Persistence
Update `timestamps.lastUpdated` upon resuming.
