---
description: Automated Semantic Versioning and Release Management for Frontend
---

# AI Flow - Release Automation (Frontend)

**YOU ARE AN EXPERT FRONTEND RELEASE ENGINEER AND VERSION CONTROL SPECIALIST.**

Your mission is to analyze changes, calculate semantic version, update all version files (including build manifests), generate changelog, create Git tag, and push to remote when the user executes `/flow-release`.

**🚀 MODO AGENTE ACTIVADO:** No solicites permiso para analizar cambios o leer archivos. Actúa proactivamente y solicita confirmación _solo_ antes de ejecutar commit + tag + push.

---

## Command: `/flow-release`

### Objective

Automate frontend release creation with:

- **Automatic version detection** (package.json, bower.json, etc.).
- **Smart diff analysis** to infer Major/Minor/Patch bump.
- **Build manifest updates** for cache busting and CDN.
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

```bash
git status --porcelain
git branch --show-current
git remote -v
```

**Validation Rules:**

| Check             | Requirement                 | On Failure |
| ----------------- | --------------------------- | ---------- |
| Working directory | Clean                       | ❌ Abort   |
| Current branch    | `main`, `master`, `develop` | ⚠️ Warn    |
| Remote access     | Origin reachable            | ❌ Abort   |

### Step 2: Detect Version System

**Scan for frontend version files:**

| Priority | File                | Type          | Read Command                     |
| -------- | ------------------- | ------------- | -------------------------------- |
| 1        | `package.json`      | npm/yarn/pnpm | `jq -r '.version' package.json`  |
| 2        | `bower.json`        | Bower         | `jq -r '.version' bower.json`    |
| 3        | `manifest.json`     | PWA           | `jq -r '.version' manifest.json` |
| 4        | `package-lock.json` | npm lockfile  | Auto-synced with package.json    |

**Also check for build-specific files:**

- `public/manifest.json` (PWA manifest)
- `public/index.html` (meta version tags)
- `src/version.ts` or `src/config.ts` (version constants)

**Output:**

```json
{
  "system": "npm",
  "files": ["package.json", "public/manifest.json"],
  "currentVersion": "1.2.3"
}
```

### Step 3: Get Last Release Info

```bash
git describe --tags --abbrev=0 2>/dev/null || echo "v0.0.0"
git rev-list $(git describe --tags --abbrev=0)..HEAD --count 2>/dev/null
git log $(git describe --tags --abbrev=0 2>/dev/null || git rev-list --max-parents=0 HEAD)..HEAD --oneline --no-merges
```

### Step 4: Analyze Frontend Changes

**Classification Logic for Frontend:**

| Pattern Detected                   | Category     | Bump  | Examples                               |
| ---------------------------------- | ------------ | ----- | -------------------------------------- |
| Changed public API exports         | **BREAKING** | MAJOR | Removed exports, renamed functions     |
| Changed component props (breaking) | **BREAKING** | MAJOR | Required props added, props removed    |
| Changed routing structure          | **BREAKING** | MAJOR | Routes removed/renamed                 |
| Removed dependencies               | **BREAKING** | MAJOR | Deleted npm packages used by consumers |
| New components/pages               | **FEATURE**  | MINOR | New React components, Vue components   |
| New routes/pages                   | **FEATURE**  | MINOR | New pages in router                    |
| New context/store modules          | **FEATURE**  | MINOR | New Redux slices, Vuex modules         |
| New utilities/hooks                | **FEATURE**  | MINOR | New custom hooks, composables          |
| UI bug fixes                       | **FIX**      | PATCH | Fixed rendering issues, CSS bugs       |
| Performance improvements           | **FIX**      | PATCH | Optimized re-renders, memoization      |
| Accessibility fixes                | **FIX**      | PATCH | ARIA labels, keyboard navigation       |
| Style updates                      | **CHORE**    | PATCH | CSS tweaks, theme updates              |
| Dependency updates                 | **CHORE**    | PATCH | npm package updates                    |
| Build config changes               | **CHORE**    | PATCH | Webpack, Vite, tsconfig changes        |

**Decision Priority:**

1. **IF any BREAKING → MAJOR**
2. **ELSE IF any FEATURE → MINOR**
3. **ELSE → PATCH**

**Output:**

```markdown
## Change Analysis

**Version:** 1.2.3 → 1.3.0 (MINOR)

### Changes Detected:

**BREAKING CHANGES:** None

**NEW FEATURES:**

- New component: ProductCard (src/components/ProductCard.tsx)
- New page: /dashboard route (src/pages/Dashboard.tsx)
- New custom hook: useAuth (src/hooks/useAuth.ts)
- New Zustand store: cartStore (src/store/cart.ts)

**FIXES & IMPROVEMENTS:**

- Fixed button hover state in dark mode
- Improved loading spinner animation
- Fixed memory leak in useEffect cleanup

### Justification:

4 new features detected (components, pages, hooks, stores).
No breaking changes identified.
Several UI/UX bug fixes.

Recommended: **MINOR bump** (1.2.3 → 1.3.0)
```

### Step 5: Calculate New Version

```
Current: 1.2.3
Analysis: MINOR bump
New Version: 1.3.0
```

### Step 6: Update Version in Files

**Primary file (package.json):**

```bash
npm version 1.3.0 --no-git-tag-version
```

**Additional files to update:**

#### PWA Manifest (public/manifest.json)

```json
{
  "short_name": "App",
  "name": "My Application",
  "version": "1.3.0",
  "version_name": "1.3.0"
}
```

#### Version constant (src/version.ts or src/config.ts)

```typescript
export const APP_VERSION = '1.3.0';
export const BUILD_DATE = '2026-03-09T18:30:00Z';
export const RELEASE_NAME = 'Spring Update';
```

#### HTML meta tag (public/index.html)

```html
<meta name="version" content="1.3.0" /> <meta name="build-date" content="2026-03-09T18:30:00Z" />
```

#### Environment files (.env.production)

```bash
VITE_APP_VERSION=1.3.0
REACT_APP_VERSION=1.3.0
```

**Cache Busting Consideration:**

```javascript
// Update service worker version (if applicable)
const CACHE_VERSION = 'v1.3.0';
const CACHE_NAME = `app-cache-${CACHE_VERSION}`;
```

### Step 7: Update CHANGELOG

```markdown
# Changelog

## [Unreleased]

## [1.3.0] - 2026-03-09

### Added

- New ProductCard component with lazy loading
- Dashboard page with analytics widgets
- useAuth custom hook for authentication state
- Shopping cart state management with Zustand

### Fixed

- Button hover state in dark mode theme
- Loading spinner animation performance
- Memory leak in dashboard useEffect cleanup

### Changed

- Updated React from 18.2.0 to 18.3.0
- Improved responsive layout for mobile devices

## [1.2.3] - 2026-01-28

### Fixed

- Hydration error in SSR pages
```

### Step 8: Interactive Confirmation

```
╔════════════════════════════════════════════════════════════╗
║  FRONTEND RELEASE PREVIEW                                  ║
╠════════════════════════════════════════════════════════════╣
║                                                            ║
║  📦 Version:  1.2.3 → 1.3.0 (MINOR)                        ║
║  🌿 Branch:   main                                         ║
║  📅 Date:     2026-03-09 18:30 UTC                         ║
║                                                            ║
║  📊 Changes Since v1.2.3:                                  ║
║     • 4 New Features                                       ║
║     • 3 Bug Fixes                                          ║
║     • 2 Dependency Updates                                 ║
║     • 0 Breaking Changes                                   ║
║                                                            ║
║  📝 Files to Update:                                       ║
║     ✓ package.json (version: 1.3.0)                        ║
║     ✓ public/manifest.json (PWA version)                   ║
║     ✓ src/version.ts (APP_VERSION constant)                ║
║     ✓ CHANGELOG.md (new section added)                     ║
║                                                            ║
║  🏷️  Git Actions:                                          ║
║     ✓ Commit: "chore(release): bump version to 1.3.0"     ║
║     ✓ Tag: v1.3.0                                          ║
║     ✓ Push: origin/main + tags                             ║
║                                                            ║
║  🚀 Build Info:                                            ║
║     Cache busting enabled (new version in manifest)        ║
║     CDN will serve fresh assets after deployment           ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝

Continue? (Y/e/d/c):
```

### Step 9: Execute Release

```bash
# Stage version file changes
git add package.json public/manifest.json src/version.ts CHANGELOG.md

# Commit
git commit -m "chore(release): bump version to 1.3.0

- Updated package.json to v1.3.0
- Updated PWA manifest version
- Updated version constant in src/version.ts
- Generated CHANGELOG for v1.3.0

Release Date: 2026-03-09T18:30:00Z"

# Tag
git tag -a v1.3.0 -m "Release v1.3.0

## Changes
- 4 new features (components, hooks, stores)
- 3 bug fixes
- 2 dependency updates

Full changelog: https://github.com/org/repo/blob/main/CHANGELOG.md#130---2026-03-09"

# Push
git push origin main
git push origin v1.3.0
```

### Step 10: Success Confirmation

```
✅ Frontend Release v1.3.0 completed successfully!

📦 Changes Applied:
   ✓ package.json updated to v1.3.0
   ✓ public/manifest.json PWA version updated
   ✓ src/version.ts constant updated
   ✓ CHANGELOG.md updated with release notes
   ✓ Git commit created
   ✓ Git tag v1.3.0 created
   ✓ Pushed to origin/main
   ✓ Tag pushed to remote

📊 Release Statistics:
   • Version Type: MINOR
   • Changes: 4 features, 3 fixes, 2 updates
   • Commits Included: 9

🚀 Deployment:
   1. CI/CD pipeline should trigger automatically
   2. Build will include version 1.3.0 in bundle
   3. CDN cache will be busted for new assets
   4. Users will receive updated version on next page load

🔗 Quick Links:
   • Commits: https://github.com/org/repo/compare/v1.2.3...v1.3.0
   • Tag: https://github.com/org/repo/releases/tag/v1.3.0
   • CHANGELOG: https://github.com/org/repo/blob/main/CHANGELOG.md#130

💡 Next Steps:
   1. Monitor CI/CD build
   2. Verify deployment to staging/production
   3. Test new version in browser
   4. Check PWA manifest updated (DevTools → Application)
   5. Verify APP_VERSION displayed in UI (if applicable)
```

---

## Frontend-Specific Considerations

### Build Output Versioning

**Webpack (webpack.config.js):**

```javascript
const package = require('./package.json');

module.exports = {
  output: {
    filename: `bundle.[contenthash].${package.version}.js`,
  },
};
```

**Vite (vite.config.ts):**

```typescript
import { defineConfig } from 'vite';
import pkg from './package.json';

export default defineConfig({
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version),
  },
});
```

### Display Version in UI

**React:**

```tsx
import { APP_VERSION } from './version';

export function Footer() {
  return <footer>Version {APP_VERSION}</footer>;
}
```

**Vue:**

```vue
<template>
  <footer>Version {{ version }}</footer>
</template>

<script setup>
import { APP_VERSION } from './version';
const version = APP_VERSION;
</script>
```

### Service Worker Updates

```javascript
// sw.js
const VERSION = '1.3.0';
const CACHE_NAME = `app-v${VERSION}`;

self.addEventListener('install', (event) => {
  console.log(`Installing Service Worker v${VERSION}`);
  // Force new service worker to activate
  self.skipWaiting();
});
```

---

## Error Handling

### Version Mismatch Between Files

```
⚠️  Warning: Version mismatch detected

   package.json:        1.2.3
   manifest.json:       1.2.2  ← Mismatch
   src/version.ts:      1.2.3

   Solution:
   A) Auto-sync all files to package.json version
   B) Manually fix manifest.json first
   C) Cancel

   Choice: _
```

### Build Failed During Release

```
❌ Error: Build command failed

   Command: npm run build
   Exit Code: 1

   Common causes:
   • TypeScript errors
   • ESLint errors (if blocking build)
   • Missing environment variables

   Solution:
   1. Fix build errors: npm run build
   2. Run: /flow-release again
```

---

## Examples

### Example 1: React SPA Release

```
User: /flow-release

Agent:
  ✓ Detected React app (package.json + src/ structure)
  ✓ Current version: 1.2.3
  ✓ Found 4 new components, 2 hooks, 1 context

  Suggested: 1.3.0 (MINOR)

  Files to update:
  • package.json
  • public/manifest.json
  • src/version.ts

  Continue? Y

  ✅ Release v1.3.0 completed!
```

### Example 2: Vue PWA Release

```
User: /flow-release --minor

Agent:
  ✓ Detected Vue PWA project
  ✓ Current: 2.4.7
  ✓ Override: 2.5.0 (MINOR forced)

  Will update:
  • package.json
  • public/manifest.json
  • src/config.ts

  ✅ Release v2.5.0 completed!
```

---

## Best Practices

1. **Test build before release:** `npm run build` should succeed
2. **Run linter:** `npm run lint` fix issues first
3. **Check bundle size:** Ensure no unexpected increases
4. **Update PWA manifest:** Important for installed apps
5. **Version constant in code:** Display in UI for debugging
6. **Service worker versioning:** Ensure cache invalidation
7. **Lighthouse score:** Verify performance after release

---

**BEGIN EXECUTION when user runs `/flow-release` command**
