---
description: Release Workflow
---

# Release Workflow

Automate version publishing following semantic versioning, syncing package.json, git tags, and npm registry.

**Display Behavior:** Show step title (`## Step N/6: Name`) in your response BEFORE executing commands in that step.

// turbo-all
Automate version publishing and registry syncing.

---

## ⚠️ Step 0/6: Check Documentation Freshness

Verify documentation is synchronized before releasing.

// turbo

```bash
cat cache/docs-analysis.json
```

**Decision:** Warn if cache older than 7 days. Recommend `/flow-docs-sync` first.

---

## 📋 Step 1/6: Determine Version

Read current version from `package.json` and determine next version using semver.

// turbo

```bash
node -p "require('./package.json').version"
```

---

## ✏️ Step 2/6: Update Version References

Update version string in 6 files:

- `package.json`
- `src/cli.ts` (3 locations)
- `README.md` (Line ~143)
- `GETTING-STARTED.md` (Line ~2198)
- `AGENT.md` (Line ~183)
- `CLAUDE.md` (Line ~162)

---

## ✅ Step 3/6: Commit and Tag

Stage 6 modified files, create version commit, tag, and push. (Requires approval)

// turbo

```bash
git add package.json src/cli.ts README.md GETTING-STARTED.md AGENT.md CLAUDE.md && git commit -m "chore: bump version to X.X.X" && git tag vX.X.X && git push origin main --tags
```

---

## 📦 Step 4/6: Publish to npm

Publish package to npm registry. (Requires approval)

// turbo

```bash
npm publish --access public
```

---

## ✅ Step 5/6: Verify

Confirm successful release across platforms.

---

## Workflow Integration

**Typical Release Process:**

```bash
# 1. Sync documentation (weekly or before release)
/flow-docs-sync

# 2. Release new version (quick, docs already fresh)
/flow-release
```

**Benefits:**

- ✅ flow3.docs detects ALL gaps (not just versions)
- ✅ flow4.release stays fast (3-5 min)
- ✅ Warning system prevents stale docs

---

**Last Updated:** 2026-03-10
