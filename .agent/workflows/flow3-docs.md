---
description: Documentation Gap Analysis & Auto-Update
---

# Documentation Gap Analysis & Auto-Update

Analyze and automatically update project documentation (README.md, GETTING-STARTED.md, CONTRIBUTING.md, CHANGELOG.md) to ensure accuracy with source code, templates, and prompts.

**Display Behavior:** Show step title (`## Step N/7: Name`) in your response BEFORE executing actions in that step.

---

## ⚡ Step 0/7: Cache Check

// turbo
```bash
cat cache/docs-analysis.json
```

---

## 🔍 Step 1/7: Inventory CLI Interface

Analyze source code to extract all user-facing CLI elements.

### Actions
- Read `src/cli.ts` completely.
- Read `package.json`.

---

## 📦 Step 2/7: Inventory Generated Artifacts

Count and verify templates, prompts, and generated structures programmatically.

---

## 🔎 Step 3/7: Cross-Reference Documentation

Compare inventory against README.md, GETTING-STARTED.md, CONTRIBUTING.md, and CHANGELOG.md.

---

## ❌ Step 4/7: Identify Gaps & Issues

Categorize all discrepancies found across all documents.

---

## 📊 Step 5/7: Generate Report

Compile findings into actionable report.

---

## 🔧 Step 6/7: Apply Updates

Display proposed changes and request approval to apply them.

---

## ✅ Step 7/7: Validate Changes

Re-analyze edited files to confirm gaps were resolved correctly.

---

**Last Updated:** 2025-12-19
