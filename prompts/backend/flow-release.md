---
description: Automated Semantic Versioning and Release Management
---

# AI Flow - Release Automation

**YOU ARE AN EXPERT RELEASE ENGINEER AND VERSION CONTROL SPECIALIST.**

Your mission is to analyze changes, calculate semantic version, update all version files (including Swagger/OpenAPI), generate changelog, create Git tag, and push to remote when the user executes `/flow-release`.

**🚀 MODO AGENTE ACTIVADO:** No solicites permiso para analizar cambios o leer archivos. Actúa proactivamente y solicita confirmación _solo_ antes de ejecutar commit + tag + push.

---

## Command: `/flow-release`

### Objective

Automate release creation with:

- **Automatic version detection** across multiple file formats.
- **Smart diff analysis** to infer Major/Minor/Patch bump.
- **Swagger/OpenAPI update** with version and release date (CRITICAL).
- **CHANGELOG generation** following Keep a Changelog format.
- **Git tag creation** and push to remote.

### Usage Modes

```bash
/flow-release              # Auto-analyze and suggest version
/flow-release --dry-run    # Preview without executing
/flow-release --major      # Force major bump (2.0.0)
/flow-release --minor      # Force minor bump (1.3.0)
/flow-release --patch      # Force patch bump (1.2.4)
/flow-release 1.5.0        # Manual version override
```

---

## Workflow: 8 Steps

### Step 1: Pre-Flight Validations

**🛡️ CRITICAL CHECKS** - Execute before any analysis:

```bash
# Check working directory is clean
git status --porcelain

# Verify current branch
git branch --show-current

# Check remote connectivity
git remote -v
```

**Validation Rules:**

| Check             | Requirement                    | On Failure                     |
| ----------------- | ------------------------------ | ------------------------------ |
| Working directory | Clean (no uncommitted changes) | ❌ Abort with instructions     |
| Current branch    | `main`, `master`, `develop`    | ⚠️ Warn but allow continuation |
| Remote access     | Origin reachable               | ❌ Abort (cannot push)         |
| Last tag exists   | At least one tag               | ⚠️ Default to v0.0.0           |

**Error Messages:**

```
❌ Working directory not clean

   Uncommitted changes detected. Commit or stash before release:
   git status

   Run: git add . && git commit -m "chore: prepare for release"
```

### Step 2: Detect Version System

**Scan project root for version files in priority order:**

| Priority | File Pattern    | Type             | Read Command                                                                            |
| -------- | --------------- | ---------------- | --------------------------------------------------------------------------------------- |
| 1        | `package.json`  | Node.js/Frontend | `cat package.json \| jq -r '.version'`                                                  |
| 2        | `pom.xml`       | Java/Maven       | `xmllint --xpath "/*[local-name()='project']/*[local-name()='version']/text()" pom.xml` |
| 3        | `build.gradle*` | Java/Gradle      | `grep "version = " build.gradle*`                                                       |
| 4        | `pubspec.yaml`  | Flutter/Dart     | `grep "version:" pubspec.yaml`                                                          |
| 5        | `*.csproj`      | .NET             | `xmllint --xpath "//Version/text()" *.csproj`                                           |
| 6        | `setup.py`      | Python           | `grep "version=" setup.py`                                                              |
| 7        | `Cargo.toml`    | Rust             | `grep "version =" Cargo.toml`                                                           |

**Output:**

```json
{
  "system": "node",
  "file": "package.json",
  "currentVersion": "1.2.3"
}
```

**If multiple files found:** Use highest priority, warn about others.

### Step 3: Get Last Release Info

```bash
# Get last Git tag
git describe --tags --abbrev=0 2>/dev/null || echo "v0.0.0"

# Count commits since last tag
git rev-list $(git describe --tags --abbrev=0)..HEAD --count 2>/dev/null || echo "all"

# Get commits for analysis
git log $(git describe --tags --abbrev=0 2>/dev/null || git rev-list --max-parents=0 HEAD)..HEAD --oneline --no-merges
```

**Output:**

```
Last Tag: v1.2.3
Commits Since: 7
```

**If no tags exist:** Treat all commits as Unreleased.

### Step 4: Analyze Changes (Smart Inference)

**Analyze diffs to classify change impact WITHOUT requiring Conventional Commits:**

```bash
# Get diff stats from last tag
git diff $(git describe --tags --abbrev=0 2>/dev/null || git rev-list --max-parents=0 HEAD)..HEAD --stat

# Get detailed diff for critical analysis
git diff $(git describe --tags --abbrev=0 2>/dev/null || git rev-list --max-parents=0 HEAD)..HEAD
```

**Classification Logic:**

| Pattern Detected                     | Category     | Bump Type | Examples                                               |
| ------------------------------------ | ------------ | --------- | ------------------------------------------------------ |
| Removed endpoints/routes             | **BREAKING** | MAJOR     | `@DeleteMapping`, `router.delete`, removed controllers |
| Changed request/response schemas     | **BREAKING** | MAJOR     | DTOs modified, GraphQL schema changes                  |
| Database schema breaking changes     | **BREAKING** | MAJOR     | Column drops, type changes, FK removals                |
| Authentication/authorization changes | **BREAKING** | MAJOR     | Auth middleware modified, token format changed         |
| New endpoints/routes                 | **FEATURE**  | MINOR     | New `@PostMapping`, new REST routes                    |
| New entities/models                  | **FEATURE**  | MINOR     | New database tables, new domain objects                |
| New services/modules                 | **FEATURE**  | MINOR     | New business logic classes                             |
| Bug fixes in existing code           | **FIX**      | PATCH     | Fix conditionals, null checks, error handling          |
| Refactoring (no behavior change)     | **CHORE**    | PATCH     | Rename variables, extract methods                      |
| Documentation updates                | **DOCS**     | PATCH     | README, comments, Swagger annotations                  |
| Dependency updates                   | **CHORE**    | PATCH     | package.json, pom.xml dependencies                     |
| Test additions                       | **TEST**     | PATCH     | New test files, test improvements                      |

**Decision Priority:**

1. **IF any BREAKING → MAJOR** (X.0.0)
2. **ELSE IF any FEATURE → MINOR** (X.Y.0)
3. **ELSE → PATCH** (X.Y.Z)

**Output:**

```markdown
## Change Analysis

**Version:** 1.2.3 → 1.3.0 (MINOR)

### Changes Detected:

**BREAKING CHANGES:** None

**NEW FEATURES:**

- New endpoint: POST /api/orders/validate (OrderController.java)
- New entity: CreditLimit (models/CreditLimit.js)
- New service: NotificationService (services/notification.service.ts)

**FIXES & IMPROVEMENTS:**

- Fixed null pointer in AuthService.validateToken()
- Improved error handling in PaymentController
- Updated dependencies: express 4.18.0 → 4.18.2

### Justification:

3 new features detected (new endpoints, entities, services).
No breaking changes identified.
Several bug fixes and dependency updates.

Recommended: **MINOR bump** (1.2.3 → 1.3.0)
```

### Step 5: Calculate New Version

**Apply SemVer rules:**

```
Current: 1.2.3
Analysis: MINOR bump

New Version: 1.3.0
```

**Override handling:**

- `--major`: Force X.0.0 (reset MINOR and PATCH)
- `--minor`: Force X.Y.0 (reset PATCH)
- `--patch`: Force X.Y.Z
- `1.5.0`: Use exact version (validate format)

**Version format validation:**

```regex
^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$
```

Valid: `1.3.0`, `2.0.0`, `1.2.4`  
Invalid: `v1.3.0` (remove 'v'), `1.3` (missing PATCH)

### Step 6: Update Swagger/OpenAPI Specification

**🚨 CRITICAL STEP - Required for Swagger UI display**

**Detect Swagger/OpenAPI configuration:**

| Framework        | Detection                               | Update Location                       |
| ---------------- | --------------------------------------- | ------------------------------------- |
| **Spring Boot**  | `@OpenAPI` annotation                   | Java annotation + `application.yml`   |
| **NestJS**       | `@nestjs/swagger` import                | `main.ts` SwaggerModule config        |
| **FastAPI**      | `from fastapi import FastAPI`           | `app = FastAPI(version=)` constructor |
| **Express**      | `swagger-jsdoc` or `swagger-ui-express` | `swagger.js` config file              |
| **ASP.NET**      | `Swashbuckle` reference                 | `Startup.cs` or `Program.cs`          |
| **Django REST**  | `drf-yasg` or `drf-spectacular`         | `settings.py` + `urls.py`             |
| **Static files** | `swagger.json`, `openapi.json`          | Direct JSON/YAML edit                 |

**Update Instructions by Framework:**

#### Spring Boot (Java)

```java
// File: src/main/java/.../Application.java or OpenAPIConfig.java
@OpenAPIDefinition(
    info = @Info(
        title = "Api Name",
        version = "1.3.0",  // ← UPDATE THIS
        description = "API Description"
    )
)

// Also update application.yml if present
springdoc:
  api-docs:
    version: '1.3.0'  // ← UPDATE THIS
```

#### NestJS (TypeScript)

```typescript
// File: src/main.ts
const config = new DocumentBuilder()
  .setTitle('API Name')
  .setVersion('1.3.0') // ← UPDATE THIS
  .setDescription('API Description')
  .build();
```

#### FastAPI (Python)

```python
# File: main.py or app/__init__.py
app = FastAPI(
    title="API Name",
    version="1.3.0",  # ← UPDATE THIS
    description="API Description"
)
```

#### Express (JavaScript/TypeScript)

```javascript
// File: swagger.js or src/config/swagger.ts
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API Name',
    version: '1.3.0', // ← UPDATE THIS
    description: 'API Description',
  },
};
```

#### .NET (C#)

```csharp
// File: Program.cs or Startup.cs
services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "API Name",
        Version = "1.3.0"  // ← UPDATE THIS
    });
});
```

#### Static Swagger JSON/YAML

```json
{
  "openapi": "3.0.0",
  "info": {
    "title": "API Name",
    "version": "1.3.0",
    "description": "API Description"
  }
}
```

**Release Date Format (ISO 8601 UTC):**

```javascript
// Generate timestamp
const releaseDate = new Date().toISOString();
// Example: "2026-03-09T18:30:00.000Z"

// For display in Swagger (if supported):
"x-release-date": "2026-03-09T18:30:00.000Z"
```

**Validation:**

After updating, verify Swagger file is parseable:

```bash
# For JSON files
cat swagger.json | jq '.info.version'

# For YAML files
grep "version:" swagger.yaml
```

### Step 7: Update Version in Primary File

**Execute update based on detected system:**

#### Node.js (package.json)

```bash
npm version 1.3.0 --no-git-tag-version
```

#### Java Maven (pom.xml)

```bash
mvn versions:set -DnewVersion=1.3.0 -DgenerateBackupPoms=false
```

#### Java Gradle (build.gradle)

```bash
sed -i "s/version = .*/version = '1.3.0'/" build.gradle
```

#### Flutter (pubspec.yaml)

```bash
# Format: version: 1.3.0+buildNumber
sed -i "s/version: .*/version: 1.3.0+$BUILD_NUMBER/" pubspec.yaml
```

#### .NET (\*.csproj)

```bash
sed -i "s/<Version>.*<\/Version>/<Version>1.3.0<\/Version>/" MyProject.csproj
```

#### Python (setup.py or pyproject.toml)

```bash
sed -i "s/version=.*/version='1.3.0',/" setup.py
```

**Verify update:**

```bash
# Read version again to confirm
cat package.json | jq -r '.version'
# Expected output: 1.3.0
```

### Step 8: Generate/Update CHANGELOG

**CHANGELOG.md format (Keep a Changelog standard):**

```markdown
# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.3.0] - 2026-03-09

### Added

- New endpoint POST /api/orders/validate for credit validation
- New CreditLimit entity with automated checks
- Notification service for real-time alerts

### Fixed

- Null pointer exception in AuthService.validateToken()
- Improved error handling in PaymentController

### Changed

- Updated express from 4.18.0 to 4.18.2
- Refactored OrderService for better maintainability

## [1.2.3] - 2026-01-28

### Fixed

- Security vulnerability in JWT validation

## [1.2.2] - 2026-01-15

### Added

- Initial API implementation
```

**If CHANGELOG.md doesn't exist:** Create it with template above.

**If CHANGELOG.md exists:** Insert new version section after `## [Unreleased]`.

**Categories to use:**

- `### Added` - New features
- `### Changed` - Changes in existing functionality
- `### Deprecated` - Soon-to-be removed features
- `### Removed` - Removed features (BREAKING)
- `### Fixed` - Bug fixes
- `### Security` - Security fixes

### Step 9: Interactive Confirmation

**Display comprehensive preview:**

```
╔════════════════════════════════════════════════════════════╗
║  RELEASE PREVIEW                                           ║
╠════════════════════════════════════════════════════════════╣
║                                                            ║
║  📦 Version:  1.2.3 → 1.3.0 (MINOR)                        ║
║  🌿 Branch:   main                                         ║
║  📅 Date:     2026-03-09 18:30 UTC                         ║
║                                                            ║
║  📊 Changes Since v1.2.3:                                  ║
║     • 3 New Features                                       ║
║     • 2 Bug Fixes                                          ║
║     • 1 Dependency Update                                  ║
║     • 0 Breaking Changes                                   ║
║                                                            ║
║  📝 Files to Update:                                       ║
║     ✓ package.json (version: 1.3.0)                        ║
║     ✓ src/main.ts (Swagger version: 1.3.0)                 ║
║     ✓ CHANGELOG.md (new section added)                     ║
║                                                            ║
║  🏷️  Git Actions:                                          ║
║     ✓ Commit: "chore(release): bump version to 1.3.0"     ║
║     ✓ Tag: v1.3.0                                          ║
║     ✓ Push: origin/main + tags                             ║
║                                                            ║
║  🌐 Swagger UI:                                            ║
║     Version 1.3.0 will appear in Swagger after deploy      ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝

Changelog Preview:
---

## [1.3.0] - 2026-03-09

### Added
- New endpoint POST /api/orders/validate
- CreditLimit entity with automated checks
- Notification service for real-time alerts

### Fixed
- Null pointer in AuthService.validateToken()
- Error handling in PaymentController

### Changed
- Updated express 4.18.0 → 4.18.2

---

Options:
  [Y] Continue with release 1.3.0
  [E] Edit version manually
  [D] Dry-run output (show commands without executing)
  [C] Cancel

Continue? (Y/e/d/c):
```

**Response Handling:**

- **Y** or Enter → Proceed with release
- **E** → Ask for custom version input, recalculate, show preview again
- **D** → Show all commands that would run (see Dry-Run Mode section)
- **C** → Cancel and exit

### Step 10: Execute Release

**Sequence of Git commands:**

```bash
# Stage all version file changes
git add package.json src/main.ts CHANGELOG.md

# Create release commit
git commit -m "chore(release): bump version to 1.3.0

- Updated package.json to v1.3.0
- Updated Swagger API version
- Generated CHANGELOG for v1.3.0

Release Date: 2026-03-09T18:30:00Z"

# Create annotated Git tag
git tag -a v1.3.0 -m "Release v1.3.0

## Changes
- 3 new features
- 2 bug fixes
- 1 dependency update

Full changelog: https://github.com/org/repo/blob/main/CHANGELOG.md#130---2026-03-09"

# Push commit and tags
git push origin main
git push origin v1.3.0
```

**Error handling during push:**

```bash
# If push fails, provide manual instructions
if [ $? -ne 0 ]; then
  echo "❌ Push failed. Manual execution required:"
  echo "   git push origin main"
  echo "   git push origin v1.3.0"
  exit 1
fi
```

### Step 11: Success Confirmation

```
✅ Release v1.3.0 completed successfully!

📦 Changes Applied:
   ✓ package.json updated to v1.3.0
   ✓ src/main.ts Swagger version updated
   ✓ CHANGELOG.md updated with release notes
   ✓ Git commit: chore(release): bump version to 1.3.0
   ✓ Git tag: v1.3.0 created
   ✓ Pushed to origin/main
   ✓ Tag pushed to remote

📊 Release Statistics:
   • Version Type: MINOR
   • Changes: 3 features, 2 fixes, 1 update
   • Commits Included: 7

🌐 Swagger Access:
   After deployment, version 1.3.0 will appear in Swagger UI:
   Example: http://your-api.com/swagger

   Expected display:
   ┌─────────────────────────────┐
   │ Api Name       v1.3.0       │
   │ Release Date: 2026-03-09    │
   └─────────────────────────────┘

🔗 Quick Links:
   • Commits: https://github.com/org/repo/compare/v1.2.3...v1.3.0
   • Tag: https://github.com/org/repo/releases/tag/v1.3.0
   • CHANGELOG: https://github.com/org/repo/blob/main/CHANGELOG.md#130

🚀 Next Steps:
   1. Verify CI/CD pipeline triggered
   2. Monitor deployment to production
   3. Check Swagger UI shows v1.3.0
   4. Notify team in Slack/Discord
```

---

## Dry-Run Mode

**Usage:** `/flow-release --dry-run`

**Behavior:** Perform all analysis and show commands WITHOUT executing them.

**Output:**

```
🔍 DRY RUN MODE - No changes will be made

═══════════════════════════════════════════════════════════

ANALYSIS RESULTS:

Current Version: 1.2.3 (from package.json)
Last Git Tag: v1.2.3
Commits Since: 7

Suggested Version: 1.3.0 (MINOR bump)

Reason: 3 new features detected, no breaking changes

═══════════════════════════════════════════════════════════

COMMANDS THAT WOULD RUN:

1. Update package.json:
   $ npm version 1.3.0 --no-git-tag-version

2. Update Swagger (src/main.ts):
   $ sed -i "s/.setVersion('.*')/.setVersion('1.3.0')/" src/main.ts

3. Update CHANGELOG.md:
   [Insert new section at line 5]

4. Git commit:
   $ git add package.json src/main.ts CHANGELOG.md
   $ git commit -m "chore(release): bump version to 1.3.0..."

5. Create Git tag:
   $ git tag -a v1.3.0 -m "Release v1.3.0..."

6. Push to remote:
   $ git push origin main
   $ git push origin v1.3.0

═══════════════════════════════════════════════════════════

Run without --dry-run to execute these commands.
```

---

## Error Handling

### Common Errors and Solutions

#### 1. Working Directory Not Clean

```
❌ Error: Uncommitted changes detected

   Files:
   M  src/controllers/OrderController.java
   M  src/services/NotificationService.ts
   ?? temp.txt

   Solution:
   git add .
   git commit -m "chore: prepare for release"

   Then run: /flow-release
```

#### 2. Version File Not Found

```
❌ Error: No version file detected

   Searched for:
   • package.json
   • pom.xml
   • build.gradle
   • pubspec.yaml
   • *.csproj

   None found in project root.

   Solution: Manually create version file for your project type.
```

#### 3. Invalid Current Version

```
❌ Error: Invalid version format in package.json

   Found: "version": "1.2"
   Expected: "1.2.0" (SemVer format: MAJOR.MINOR.PATCH)

   Solution:
   Manually fix package.json:
   "version": "1.2.0"
```

#### 4. No Commits Since Last Tag

```
⚠️  Warning: No new commits since v1.2.3

   Last tag: v1.2.3 (2026-01-28)
   Current HEAD: same commit

   Nothing to release. Options:
   A) Make changes and commit them first
   B) Force new version (not recommended)
   C) Cancel

   Choice: _
```

#### 5. Tag Already Exists

```
❌ Error: Tag v1.3.0 already exists

   Existing tags:
   • v1.3.0 (2026-02-15) ← Conflict
   • v1.2.3 (2026-01-28)
   • v1.2.2 (2026-01-10)

   Solutions:
   A) Use different version: /flow-release 1.3.1
   B) Force new version: /flow-release --minor (creates 1.4.0)
   C) Delete existing tag (DANGER):
      git tag -d v1.3.0
      git push origin :refs/tags/v1.3.0
```

#### 6. Push Failed (Network/Permissions)

```
❌ Error: Failed to push to remote

   Command failed: git push origin main
   Error: Permission denied (publickey)

   Possible causes:
   • No network connection
   • SSH key not configured
   • No push permissions to branch
   • Branch protection rules active

   Manual resolution:
   1. Fix authentication issue
   2. Run manually:
      git push origin main
      git push origin v1.3.0

   Rollback (if needed):
   git tag -d v1.3.0
   git reset --soft HEAD~1
```

#### 7. Swagger File Not Found

```
⚠️  Warning: Swagger/OpenAPI configuration not detected

   Searched for:
   • @OpenAPI annotation (Spring Boot)
   • SwaggerModule (NestJS)
   • FastAPI(version=...) (FastAPI)
   • swagger-jsdoc config (Express)
   • swagger.json / openapi.json

   None found.

   Impact: Swagger UI will NOT show updated version.

   Options:
   A) Continue without Swagger update
   B) Manually specify Swagger file location
   C) Cancel and add Swagger configuration first

   Choice: _
```

---

## Examples

### Example 1: Automatic Release (Recommended)

```
User: /flow-release

Agent:
  [Scanning project...]
  ✓ Detected Node.js project (package.json)
  ✓ Current version: 1.2.3
  ✓ Last tag: v1.2.3 (7 commits ago)

  [Analyzing changes...]
  ✓ Found 3 new features
  ✓ Found 2 bug fixes
  ✓ No breaking changes

  [Calculating version...]
  ✓ Suggested: 1.3.0 (MINOR)

  [Preview shown...]

  Continue? (Y/e/d/c): Y

  [Executing...]
  ✓ Updated package.json to 1.3.0
  ✓ Updated src/main.ts Swagger version
  ✓ Updated CHANGELOG.md
  ✓ Committed changes
  ✓ Created tag v1.3.0
  ✓ Pushed to origin/main

  ✅ Release v1.3.0 completed successfully!
```

### Example 2: Force Patch Release

```
User: /flow-release --patch

Agent:
  [Analysis...]
  Current: 1.2.3
  Suggested: 1.3.0 (MINOR - 3 features found)
  Override: 1.2.4 (PATCH - forced)

  ⚠️  Note: Forcing PATCH despite features detected.

  Continue? (Y/n): Y

  ✅ Release v1.2.4 completed successfully!
```

### Example 3: Manual Version

```
User: /flow-release 2.0.0

Agent:
  [Analysis...]
  Current: 1.2.3
  Requested: 2.0.0 (MAJOR)

  ⚠️  MAJOR version bump requires breaking changes.

  Breaking changes detected: No
  Continue anyway? (y/N): y

  ✅ Release v2.0.0 completed successfully!
```

### Example 4: Dry Run

```
User: /flow-release --dry-run

Agent:
  🔍 DRY RUN MODE

  Current: 1.2.3 → Suggested: 1.3.0

  [Shows all commands that would run...]

  Run without --dry-run to execute.
```

---

## Version Inference Rules (Summary)

| Change Type  | SemVer Impact | Triggers                                   |
| ------------ | ------------- | ------------------------------------------ |
| **BREAKING** | MAJOR (X.0.0) | API removals, schema changes, auth changes |
| **FEATURE**  | MINOR (X.Y.0) | New endpoints, new entities, new modules   |
| **FIX**      | PATCH (X.Y.Z) | Bug fixes, error handling improvements     |
| **CHORE**    | PATCH (X.Y.Z) | Refactoring, docs, deps updates, tests     |

**Priority:** BREAKING > FEATURE > FIX/CHORE

---

## Swagger/OpenAPI Version Display

**After successful release and deployment, Swagger UI will show:**

```
┌─────────────────────────────────────────┐
│ Your API Name                   v1.3.0  │
│ Release Date: 2026-03-09 14:30 UTC      │
│                                         │
│ [Explore API endpoints below]           │
└─────────────────────────────────────────┘
```

**Validation commands:**

```bash
# Check Swagger JSON
curl http://localhost:3000/api-docs | jq '.info.version'
# Expected: "1.3.0"

# Check OpenAPI YAML
curl http://localhost:3000/api-docs-yaml | grep "version:"
# Expected: version: 1.3.0
```

---

## Best Practices

1. **Always run on clean working directory** - commit WIP changes first
2. **Use `--dry-run` for unfamiliar projects** - verify detection first
3. **Review change analysis carefully** - ensure correct bump type
4. **Test Swagger after deployment** - verify version appears correctly
5. **Keep CHANGELOG updated** - manual edits before release if needed
6. **Use protected branches** - require reviews before merging to main
7. **Automate in CI/CD** - integrate with GitHub Actions / GitLab CI
8. **Tag format consistency** - always use `v` prefix (v1.2.3)

---

## Notes

- **Semantic Versioning:** Strict adherence to [SemVer 2.0.0](https://semver.org/)
- **Keep a Changelog:** Format follows [keepachangelog.com](https://keepachangelog.com/)
- **Swagger Update:** CRITICAL for API version visibility
- **Git Tags:** Annotated tags with release notes
- **No breaking changes without MAJOR bump** - prevents accidental API breaks
- **Inference over convention** - works without Conventional Commits
- **Multi-language support** - Node.js, Java, .NET, Python, Flutter, Rust
- **Preview before execution** - user always confirms before push

---

**BEGIN EXECUTION when user runs `/flow-release` command**
