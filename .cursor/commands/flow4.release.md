# Release Workflow

Automate version publishing following semantic versioning, syncing package.json, git tags, and npm registry.

## **Display Behavior:** Show step title (`## Step N/6: Name`) in your response BEFORE executing commands in that step.

## ⚠️ Step 0/6: Check Documentation Freshness

Verify that documentation is synchronized before releasing.

### Actions

**Read cache file:**

```bash
cat cache/docs-analysis.json
```

**Check last sync timestamp:**

```json
{
  "timestamp": "2025-12-11T10:30:00Z",
  "files": { ... }
}
```

**Decision logic:**

```
IF cache older than 7 days OR doesn't exist:
  ⚠️ WARNING: Documentation may be outdated
  📝 Recommendation: Run /flow-docs-sync first

  Continue with release anyway? [Yes/No]
ELSE:
  ✅ Docs recently synced - Safe to proceed
```

**Why this matters:**

- npm displays README.md on package page
- Outdated docs can show wrong version, missing features, or incorrect counts
- flow3.docs.prompt detects gaps that release workflow doesn't

**If docs are stale:**

- **Recommended:** Cancel release, run `/flow-docs-sync`, then retry `/flow-release`
- **Alternative:** Continue anyway (only version numbers will be updated)

---

## 📋 Step 1/6: Determine Version

Read current version from `package.json` and determine next version using semver:

### Semver Rules

| Type      | Pattern   | Use Case                         | Example           |
| --------- | --------- | -------------------------------- | ----------------- |
| **Patch** | `X.Y.Z+1` | Bug fixes, minor improvements    | `1.0.5` → `1.0.6` |
| **Minor** | `X.Y+1.0` | New backward-compatible features | `1.0.6` → `1.1.0` |
| **Major** | `X+1.0.0` | Breaking changes                 | `1.1.0` → `2.0.0` |

**Decision criteria:**

- Breaking API changes → Major
- New features, no breaking changes → Minor
- Bug fixes, docs, refactors → Patch

---

## ✏️ Step 2/6: Update Version References

Update version string in all relevant files to ensure consistency across code and documentation.

### Files to Modify (6 files total)

**1. package.json** (Line ~2)

```json
{
  "version": "X.X.X"
}
```

**2. src/cli.ts** (3 locations)

```typescript
// Location 1: ASCII banner
const banner = `AI Flow v${version}`;

// Location 2: Config object
const config = { version: 'X.X.X' };

// Location 3: Commander version
program.version('X.X.X');
```

**3. README.md** (Line ~143)

```markdown
## **Current version:** X.X.X
```

**4. GETTING-STARTED.md** (Line ~2198)

```bash
ai-flow --version               # Show version (X.X.X)
```

**5. AGENT.md** (Line ~183)

```markdown
**Version:** X.X.X
```

**6. CLAUDE.md** (Line ~162)

```json
{
  "version": "X.X.X",
  "aiTools": ["claude"],
  "projectType": "backend",
  "createdAt": "..."
}
```

**Why these files:**

- **package.json** → Source of truth, parsed by npm
- **src/cli.ts** → User sees version in CLI output
- **README.md** → Displayed on npm package page and GitHub
- **GETTING-STARTED.md** → User documentation reference
- **AGENT.md** → AI agent instructions metadata
- **CLAUDE.md** → Development guide examples

**Update Strategy:**

## Update all 6 files programmatically to match the new version determined in Step 1.

## ✅ Step 3/6: Commit and Tag

Stage modified files, create version commit, tag, and push.

### Commands (User must approve)

```bash
git add package.json src/cli.ts README.md GETTING-STARTED.md AGENT.md CLAUDE.md
git commit -m "chore: bump version to X.X.X"
git tag vX.X.X
git push origin main --tags
```

**Tag format:** `vX.X.X` (lowercase 'v' prefix)

**Commit message:** Must follow pattern `chore: bump version to X.X.X`

## **Files staged:** 6 files (package.json, src/cli.ts, README.md, GETTING-STARTED.md, AGENT.md, CLAUDE.md)

## 📦 Step 4/6: Publish to npm

Publish package to npm registry.

```bash
npm publish --access public
```

**Prerequisites:**

- User authenticated via `npm login`
- Package name `ai-flow` available
- No existing version X.X.X in registry

**If publish fails:**

- Check npm authentication: `npm whoami`
- Verify version doesn't exist: `npm view ai-flow versions`

---

## ✅ Step 5/6: Verify

Confirm successful release across platforms:

### Verification Checklist

- [ ] **npm registry:** Version visible at [npmjs.com/package/ai-flow](https://npmjs.com/package/ai-flow)
- [ ] **GitHub tags:** Tag `vX.X.X` present in [repository tags](https://github.com/victorvelazquez/ai-flow/tags)
- [ ] **GitHub releases:** Release notes published (optional)
- [ ] **Installation test:** `npm install -g ai-flow@X.X.X` works

### Success Output

```
## Release vX.X.X Complete

✅ Version updated in all files
✅ Commit created: abc1234
✅ Tag created: vX.X.X
✅ Pushed to GitHub
✅ Published to npm
✅ Verified on npmjs.com

🎉 Release successful!
```

---

## Execution Model

| Step | Commands             | User Interaction           |
| ---- | -------------------- | -------------------------- |
| 0    | Check docs freshness | Automatic (warns if stale) |
| 1    | Determine version    | Automatic                  |
| 2    | Update 6 files       | Automatic (editing)        |
| 3    | Commit, tag, push    | Approve                    |
| 4    | npm publish          | Approve                    |
| 5    | Verify               | Automatic                  |

## Constraints

**Prohibited:**

- Publishing without testing
- Skipping version updates in any file
- Using non-standard tag format
- Publishing with uncommitted changes

**Required:**

- Semver compliance
- All version references updated
- Clean working directory
- Conventional commit message format

## **Estimated Time:** 3-5 minutes (if docs already synced)

## Workflow Integration

**Typical Release Process:**

```bash
# 1. Sync documentation (weekly or before release)
/flow-docs-sync

# 2. Release new version (quick, docs already fresh)
/flow-release
```

**Benefits of this approach:**

- ✅ flow3.docs detects ALL documentation gaps (not just versions)
- ✅ flow4.release stays fast and focused (3-5 min)
- ✅ Separation of concerns: Docs sync vs version bump
- ✅ Warning system prevents releasing with stale docs

---

**Reference:** [Semantic Versioning 2.0.0](https://semver.org/)  
**Last Updated:** 2026-03-10
