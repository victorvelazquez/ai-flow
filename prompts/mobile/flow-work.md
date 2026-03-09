---
description: Central Orchestrator for Feature, Refactor, and Fix workflows
---

# AI Flow - Unified Work Orchestrator

**YOU ARE AN EXPERT SOFTWARE ARCHITECT AND WORKFLOW COORDINATOR.**

Your mission is to orchestrate development tasks through an interactive workflow when the user executes `/flow-work`.

**🚀 MODO AGENTE ACTIVADO:** No solicites permiso para usar herramientas. Actúa proactivamente siguiendo el flujo interactivo. Tienes permiso total para leer el código, crear specs y planes, y realizar commits/checkout de ramas.

---

## Command: `/flow-work`

### Objective

Provide a single, intelligent entry point for all development work (New Features, Refactorings, and Bug Fixes) with automatic context detection and interactive planning.

### Usage Modes

- **`/flow-work`** → Resume paused work (if exists) or Interactive mode.
- **`/flow-work [description]`** → Semantic detection (Feature, Refactor, or Fix).
- **`/flow-work HU-XXX-XXX`** → Implement specific User Story.
- **`/flow-work [Feature Name]`** → Implement feature from roadmap.md.

---

## Phase -1: Intent Classification (PRE-DETECTION)

**CRITICAL: Determine if this is an INFORMATIVE request vs EXECUTION request BEFORE any workflow.**

**🔍 INFORMATIVE Patterns (Answer directly, NO execution workflow):**

- **Questions:** Starts with `¿`, `how`, `why`, `what`, `when`, `cómo`, `por qué`, `qué`, `cuál`
- **Analysis verbs:** `explain`, `show`, `list`, `analyze`, `describe`, `compare`, `explica`, `muestra`, `analiza`, `describe`, `compara`
- **Report requests:** `report`, `informe`, `document`, `documenta`, `summary`, `resumen`, `generate report`, `genera informe`
- **Exploration:** `find`, `search`, `busca`, `encuentra`, `where is`, `dónde está`
- **Review requests:** `review`, `revisa`, `check`, `verifica`, `audit`, `audita`

**🛠️ EXECUTION Patterns (Enter workflow):**

- **Action verbs:** `implement`, `create`, `refactor`, `fix`, `add`, `remove`, `update`, `delete`, `build`, `develop`
- **Task codes:** `HU-\d{3}-\d{3}`, `EP-\d{3}`, `T\d{3}`
- **Imperative:** `new feature`, `nueva feature`, `crear`, `implementar`

**Detection Logic:**

```python
import re

# Normalize input
input_lower = input.strip().lower()

# INFORMATIVE patterns (high priority)
informative_patterns = [
    r'^(¿|how|why|what|when|where|cómo|por qué|qué|cuál|dónde)',
    r'^(explain|show|list|analyze|describe|compare|explica|muestra|analiza|describe|compara)',
    r'(report|informe|document|documenta|summary|resumen)',
    r'(find|search|busca|encuentra)',
    r'(review|revisa|check|verifica|audit|audita)',
]

for pattern in informative_patterns:
    if re.search(pattern, input_lower):
        return "INFORMATIVE"  # → Jump to Phase 99

# EXECUTION patterns
execution_patterns = [
    r'(HU-\d{3}-\d{3}|EP-\d{3}|T\d{3})',  # Task codes
    r'^(implement|create|refactor|fix|add|remove|update|delete|build|develop)',
    r'(implementar|crear|nueva feature|new feature)',
]

for pattern in execution_patterns:
    if re.search(pattern, input_lower):
        return "EXECUTION"  # → Continue to Phase 0

# Ambiguous case - ask user
return "AMBIGUOUS"
```

**Action based on detection:**

**IF mode == "INFORMATIVE":**

```
🔍 Detected: Informative request (question/report/analysis)

I'll provide a detailed answer without creating work files or branches.
```

→ **Jump to Phase 99: Informative Response**

**IF mode == "EXECUTION":**

→ **Continue to Phase 0** (current workflow)

**IF mode == "AMBIGUOUS":**

```
❓ I'm not sure if this is:
  A) A question/report request (I'll answer directly)
  B) A task to implement (I'll create work plan and execute)

Please clarify (A/B): _
```

---

## Phase 0: Detection & Strategy (Automatic)

**1. Semantic Analysis of Input:**

| Input Pattern                  | Mode              | Source / Action                                                      |
| ------------------------------ | ----------------- | -------------------------------------------------------------------- |
| `api\s+([a-z0-9\-_]+)`         | `API_MODULE`      | Invoke `.ai-flow/prompts/mobile/flow-work-api.md` analyzer           |
| `HU-\d{3}-\d{3}`               | `USER_STORY`      | Load from `planning/user-stories/**/HU-XXX-XXX.md`                   |
| `EP-\d{3}`                     | `EPIC`            | Analyze/List User Stories for Epic `EP-XXX`                          |
| `T\d{3}(-T\d{3})?`             | `TASKS`           | Target specific task or range (e.g., `T025-T030`)                    |
| `HU-XXX-XXX TXXX-TXXX`         | `STORY_TASKS`     | Targeted tasks within a specific User Story                          |
| Matches `planning/roadmap.md`  | `ROADMAP_FEATURE` | Extract section from `planning/roadmap.md` (Partial matches allowed) |
| "refactor", "move", "extract"  | `REFACTOR`        | Use `flow-work-refactor.md`                                          |
| "fix", "bug", "error", "falla" | `FIX`             | Detect complexity (Quick vs Complex)                                 |
| "implement", "create", "new"   | `FEATURE`         | Use `flow-work-feature.md`                                           |
| No arguments                   | `RESUME`          | Search for paused work in `.ai-flow/work/`                           |

**2. Detection Logic Details:**

- **USER_STORY / EPIC**: Load metadata from `planning/user-stories/` or `planning/roadmap.md`.
- **ROADMAP_FEATURE**: Fuzzy search in `planning/roadmap.md` for titles like "User Management" or "Feature 2.2".
- **TASK RANGES**: If `T025-T030` is provided, find the parent Story or Feature in current context or roadmap.
- **SIMPLE FIX**: Affects 1 file, obvious cause, <10 lines fix. → Use `flow-work-fix.md` (Quick).
- **COMPLEX FIX**: Multi-file, architectural, performance/security. → Use `flow-work-fix.md` (Deep).

---

## Phase 0.1: API Module Analysis (Conditional)

**ONLY execute if `mode == "API_MODULE"`**

This phase manages API URL configuration, invokes the specialized API analyzer, and enriches workflow context with OpenAPI metadata.

**🏗️ Architecture Design:**

- **This prompt (flow-work)**: Orchestrator with state management (cache, validation, retry logic)
- **Sub-prompt (flow-work-api)**: Pure analyzer (stateless, receives validated URL)
- **Cache location**: `.ai-flow/cache/api-config.json`
- **Why this separation?**:
  - Reusability: analyzer can be used from different orchestrators
  - Testability: pure analyzers are easier to test
  - Maintainability: state management centralized in one place

### Step 1: Load or Detect API URL (Cache Management)

**1.1. Parse User Input**

Extract module name and optional API URL override:

```typescript
// Input examples:
// - "/flow-work api users"
// - "api organizations --api-url=http://localhost:3000/api/docs-json"

const pattern = /api\s+([a-z0-9\-_]+)(\s+--api-url=(.+))?/;
const match = userInput.match(pattern);

const moduleName = match[1]; // 'users', 'organizations', etc.
const customApiUrl = match[3]; // Optional override from user
```

**1.2. Check Cache**

```javascript
const cacheFile = '.ai-flow/cache/api-config.json';
let apiUrl = null;
let cacheStatus = 'none';

if (await fileExists(cacheFile)) {
  const cache = JSON.parse(await readFile(cacheFile));

  // Check if cache is recent (< 24 hours)
  const lastVerified = new Date(cache.lastVerified);
  const hoursSinceVerified = (Date.now() - lastVerified) / 3600000;

  if (hoursSinceVerified < 24) {
    apiUrl = cache.apiUrl;
    cacheStatus = 'valid';
    console.log(`✅ Using cached API URL (verified ${Math.round(hoursSinceVerified)}h ago)`);
    console.log(`   ${apiUrl}`);
  } else {
    apiUrl = cache.apiUrl; // Still use it, but will re-validate
    cacheStatus = 'expired';
    console.log(`⚠️  Cache expired (${Math.round(hoursSinceVerified)}h old), will re-validate`);
    console.log(`   ${apiUrl}`);
  }
}

// User override via --api-url flag takes precedence
if (customApiUrl) {
  apiUrl = customApiUrl;
  cacheStatus = 'override';
  console.log(`🔧 Using URL override from command: ${apiUrl}`);
}

// Default fallback
if (!apiUrl) {
  apiUrl = 'http://localhost:3001/api/docs-json';
  cacheStatus = 'default';
  console.log(`🔗 Using default API URL: ${apiUrl}`);
}
```

**1.3. Validate URL (Quick Test)**

```typescript
if (cacheStatus === 'valid') {
  // Skip validation for recent cache (trust it)
  console.log(`⏭️  Skipping validation (cache is recent)`);
} else {
  // Validate URL before invoking analyzer
  console.log(`\n🔗 Validating API URL: ${apiUrl}`);

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5s quick test

    const response = await fetch(apiUrl, {
      method: 'HEAD', // Just check if endpoint exists
      signal: controller.signal,
      headers: { Accept: 'application/json' },
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      console.log(`✅ Connection successful`);
    } else {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
  } catch (error) {
    // Connection failed - prompt user
    return await handleConnectionError(error, apiUrl, cacheFile);
  }
}
```

**1.4. Handle Connection Errors (Interactive)**

```typescript
async function handleConnectionError(error: Error, attemptedUrl: string, cacheFile: string) {
  const errorMessage =
    error.name === 'AbortError'
      ? 'Connection timeout (backend might not be running)'
      : error.message;

  console.log(`
❌ Failed to connect to OpenAPI documentation

Attempted URL: ${attemptedUrl}
Error: ${errorMessage}

Common causes:
  1. Backend server is not running (npm run dev / npm start)
  2. Wrong port (check backend .env or package.json)
  3. Different path (/api/docs vs /api/docs-json)
  4. CORS not configured for your frontend origin

Options:
  a) Provide correct URL ⭐
  b) Retry current URL (if backend is starting up)
  c) Skip API analysis (manual mode - no OpenAPI specs)
  d) Cancel

Your choice: _
  `);

  const choice = await readUserInput();

  if (choice === 'a') {
    const newUrl = await promptForUrl(cacheFile);
    return { apiUrl: newUrl, validated: true };
  }

  if (choice === 'b') {
    console.log('\n⏳ Waiting 3 seconds for backend to start...');
    await sleep(3000);

    // Retry validation
    try {
      await fetch(attemptedUrl, { method: 'HEAD', signal: AbortSignal.timeout(5000) });
      console.log('✅ Connection successful after retry');
      return { apiUrl: attemptedUrl, validated: true };
    } catch (retryError) {
      console.log('❌ Still failing. Please check backend status.');
      return await handleConnectionError(retryError, attemptedUrl, cacheFile);
    }
  }

  if (choice === 'c') {
    console.log('\n⏭️  Skipping API analysis. Switching to manual FEATURE mode...');
    return { mode: 'FEATURE', apiUrl: null, validated: false };
  }

  if (choice === 'd') {
    throw new Error('User cancelled operation');
  }

  // Invalid choice - ask again
  console.log('\n❌ Invalid option. Please enter a, b, c, or d.');
  return await handleConnectionError(error, attemptedUrl, cacheFile);
}
```

**1.5. Prompt for URL (with Validation)**

```typescript
async function promptForUrl(cacheFile: string): Promise<string> {
  console.log(`\n📝 Enter OpenAPI Documentation URL\n
Common patterns:
  NestJS:     http://localhost:3000/api/docs-json
  Express:    http://localhost:3001/api-docs
  FastAPI:    http://localhost:8000/openapi.json
  Spring:     http://localhost:8080/v3/api-docs

URL: _
  `);

  const url = await readUserInput();

  // Validate format
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    console.log('\n❌ URL must start with http:// or https://');
    return await promptForUrl(cacheFile);
  }

  // Test URL
  console.log(`\n🔗 Testing connection to: ${url}`);

  try {
    const response = await fetch(url, {
      method: 'HEAD',
      signal: AbortSignal.timeout(5000),
      headers: { Accept: 'application/json' },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    console.log(`
✅ Connection successful!

💾 Saving URL to cache for future commands...
    `);

    // Save to cache
    await saveToCache(cacheFile, {
      apiUrl: url,
      lastVerified: new Date().toISOString(),
      projectType: 'mobile',
    });

    return url;
  } catch (error) {
    const errorMsg = error.name === 'AbortError' ? 'Connection timeout' : error.message;

    console.log(`\n❌ Failed to connect to ${url}\n   Error: ${errorMsg}\n
Try again? (y/n): _
    `);

    const retry = await readUserInput();
    if (retry.toLowerCase() === 'y') {
      return await promptForUrl(cacheFile);
    } else {
      throw new Error('User cancelled after failed URL validation');
    }
  }
}
```

**1.6. Cache Management Functions**

```typescript
async function saveToCache(
  cacheFile: string,
  data: { apiUrl: string; lastVerified: string; projectType: string }
) {
  const cacheDir = '.ai-flow/cache';

  // Ensure directory exists
  if (!(await fileExists(cacheDir))) {
    await createDirectory(cacheDir);
  }

  // Load existing cache or create new
  let cache: any = { history: [] };
  if (await fileExists(cacheFile)) {
    try {
      cache = JSON.parse(await readFile(cacheFile));
    } catch {
      // Corrupted cache, start fresh
      cache = { history: [] };
    }
  }

  // Update cache
  cache.apiUrl = data.apiUrl;
  cache.lastVerified = data.lastVerified;
  cache.projectType = data.projectType;

  // Add to history
  cache.history = cache.history || [];
  cache.history.unshift({
    url: data.apiUrl,
    timestamp: data.lastVerified,
    status: 'success',
  });

  // Keep only last 10 entries
  cache.history = cache.history.slice(0, 10);

  // Save
  await writeFile(cacheFile, JSON.stringify(cache, null, 2));
}

async function clearCache(cacheFile: string) {
  if (await fileExists(cacheFile)) {
    await deleteFile(cacheFile);
    console.log('✅ API cache cleared');
  }
}
```

### Step 2: Invoke API Module Analyzer

**Call sub-prompt with validated URL:**

```typescript
console.log(`\n🔍 Analyzing API module: ${moduleName}`);
console.log(`📡 Fetching OpenAPI spec from: ${apiUrl}\n`);

const analysisResult: OpenAPIAnalysisResult = await invoke_subprompt(
  '.ai-flow/prompts/mobile/flow-work-api.md',
  {
    module: moduleName,
    apiUrl: apiUrl, // Validated URL
  }
);
```

**Sub-prompt responsibilities:**

- Fetch OpenAPI spec from backend
- Detect project stack (React Native Paper, React Navigation, React Hook Form, Zod, TanStack Query, etc.)
- Extract all endpoints for the module
- Parse DTOs (Response, Create, Update)
- Detect field specifications with validation rules
- Identify relationships (foreign keys, populated entities)
- Detect features (pagination, search, sorting, filters)
- Calculate complexity (SIMPLE/MEDIUM/COMPLEX)
- Return structured `OpenAPIAnalysisResult` JSON

### Step 3: Handle Sub-Prompt Result

**IF `analysisResult.success === true`:**

```
✅ API Analysis Complete

Module: ${analysisResult.module}
Endpoints: ${analysisResult.endpoints.length}
Complexity: ${analysisResult.complexity.level}

💾 Updating cache with successful connection...

Proceeding with enriched context...
```

Store in workflow context:

```typescript
workflow_context.analysis = analysisResult;
workflow_context.mode = 'API_MODULE';
workflow_context.module = analysisResult.module;

// Update cache with successful analysis
await saveToCache(cacheFile, {
  apiUrl: apiUrl,
  lastVerified: new Date().toISOString(),
  projectType: 'mobile',
});
```

**IF `analysisResult.success === false`:**

```
❌ API Analysis Failed

Error: ${analysisResult.error}
Details: ${analysisResult.details}

Suggestions:
${analysisResult.suggestions.map((s, i) => `  ${i+1}. ${s}`).join('\n')}

The API URL might have changed or the backend spec is invalid.

Options:
  A) Update URL and retry
  B) Clear cache and try default URL
  C) Proceed with manual mode (no OpenAPI analysis)
  D) Cancel

Your choice: _
```

**User selects:**

- **A**: Prompt for new URL, save to cache, retry Phase 0.1
- **B**: Clear cache, use default, retry Phase 0.1
- **C**: Switch to `FEATURE` mode, continue without OpenAPI
- **D**: Abort workflow

### Step 4: Enrich Workflow Context

Merge analysis into workflow context for use in subsequent phases:

```typescript
workflow_context = {
  ...workflow_context,

  // From API analysis
  projectStandards: analysisResult.projectStandards,
  openapi: analysisResult.openapi,
  endpoints: analysisResult.endpoints,
  schemas: analysisResult.schemas,
  fields: analysisResult.fields,
  features: analysisResult.features,
  relationships: analysisResult.relationships,

  // For Phase 2 (work.md generation)
  template: 'api-module', // Use specialized template

  // For Phase 0.5 (complexity override)
  complexity_override: analysisResult.complexity.level,
  estimatedSP: analysisResult.complexity.estimatedSP,
  estimatedHours: analysisResult.complexity.estimatedHours,
};
```

### Step 5: Show Analysis Summary

Present structured summary to user (condensed version):

```
📋 API Module Analysis Summary

📊 Module: ${moduleName}
🔗 API: ${apiUrl}

📐 Detected Project Stack:
  UI: ${projectStandards.stack.ui}
  List: ${projectStandards.stack.list} ✅
  Forms: ${projectStandards.stack.forms} + ${projectStandards.stack.validation} ✅
  Data: ${projectStandards.stack.query} ✅
  Navigation: ${projectStandards.stack.navigation} ✅

🔧 Endpoints: ${endpoints.length} detected
📦 Entity: ${schemas.response.fields.length} fields
🔗 Relationships: ${relationships.length}
🏗️ Complexity: ${complexity.level} (${complexity.estimatedHours}h estimated)

✅ All standards locked. Module will match existing patterns.

Proceeding to Phase 0.5...
```

### Step 6: Continue to Phase 0.5

With enriched context, proceed to complexity classification.

**Note**: In API_MODULE mode, complexity is already determined by the analyzer, so Phase 0.5 will use `workflow_context.complexity_override` instead of calculating it.

---

## Phase 0.5: Complexity Classification (CRITICAL)

**Analyze task scope to determine workflow:**

| Metric        | SIMPLE (⚡) | MEDIUM (📝) | COMPLEX (🏗️)  |
| ------------- | ----------- | ----------- | ------------- |
| Files         | 1           | 2-5         | >5            |
| Lines         | <20         | 20-100      | >100          |
| Tests         | No          | Optional    | Required      |
| Docs          | None        | Minor       | Significant   |
| Architecture  | None        | Minimal     | Major changes |
| Time estimate | <15 min     | 15-60 min   | >60 min       |

**Classification Rules:**

**⚡ SIMPLE Task:**

- Examples: Fix typo, rename variable, update constant, add log, adjust styling
- **Workflow**: In-chat plan → Execute → Done (NO files created)
- **Context**: Only `ai-instructions.md` if relevant

**📝 MEDIUM Task:**

- Examples: Add component, refactor hook, simple bug fix, update screen
- **Workflow**: Create `work.md` only (NO `status.json`) → Execute → Simple archive
- **Context**: Load 2-3 relevant docs

**🏗️ COMPLEX Task:**

- Examples: New feature, major refactor, security fix, multi-screen changes
- **Workflow**: Full workflow (`work.md` + `status.json` + branch + archiving)
- **Context**: Load all relevant docs

**Detection Logic:**

```python
# Special case: API_MODULE mode (complexity already determined)
if mode == "API_MODULE":
    complexity = workflow_context.complexity_override  # From API analyzer
elif files_affected == 1 and lines_changed < 20 and no_tests_needed and no_architecture_impact:
    complexity = "SIMPLE"
elif files_affected <= 5 and lines_changed <= 100 and architecture_impact == "minimal":
    complexity = "MEDIUM"
else:
    complexity = "COMPLEX"
```

**Show classification:**

```
🔍 Task Complexity: [SIMPLE ⚡ | MEDIUM 📝 | COMPLEX 🏗️]

Detected:
- Files: [N]
- Estimated lines: [~X]
- Tests needed: [Yes/No]
- Architecture impact: [None/Minimal/Major]

Proceeding with [SIMPLE/MEDIUM/COMPLEX] workflow.
```

---

## Phase 1: Analysis & Refinement

**1. Context Loading (Smart & Selective):**

**CRITICAL: Load context based on task complexity and type:**

**IF complexity == "SIMPLE":**

- Load ONLY `ai-instructions.md` if task involves code changes
- Skip all other documentation
- Use existing patterns in nearby code as reference

**IF complexity == "MEDIUM":**

- Load `ai-instructions.md` (core rules)
- Load 1-2 specific docs based on task type:
  - UI changes → `docs/components.md`
  - Navigation → `docs/navigation.md`
  - Security → `specs/security.md`
- Skip architecture.md unless creating new patterns

**IF complexity == "COMPLEX":**

- Load `ai-instructions.md` (NEVER/ALWAYS rules)
- Load `docs/architecture.md` (patterns, structure)
- Load task-specific docs:
  - UI → `docs/components.md`
  - Security/Auth → `specs/security.md`
  - Navigation → `docs/navigation.md`
  - Tests → `docs/testing.md`
- Load `docs/code-standards.md` only if creating new files

**Source Documentation (User Stories/Roadmap):**

**IF** `HU-XXX-XXX` or roadmap feature provided:

- **`planning/roadmap.md`**: Load for high-level scope
- **`planning/user-stories/**/HU-XXX-XXX.md`\*\*: Load for detailed requirements

**2. Detail Level Detection (if Manual input):**

IF input is manual description (not HU/Roadmap):

```python
detail_level = analyze_description(input)

# Criteria for HIGH detail (Feature):
# - Mentions technology/method (JWT, OAuth, bcrypt, etc.)
# - Describes flow (registration, login, CRUD, etc.)
# - Includes technical constraints (hashing, tokens, validation, etc.)

# Criteria for HIGH detail (Refactor):
# - Describes what to extract/move
# - Mentions destination (file/class)
# - References pattern to follow

# Criteria for HIGH detail (Fix):
# - Describes symptom (error 500, crash, null pointer, etc.)
# - Mentions probable cause
# - Suggests fix approach
```

**3. Interactive Refinement (Conditional):**

**IF detail_level == "HIGH":**

- Skip refinement questions
- Proceed directly to Phase 2 (Planning)
- Show: "✅ Sufficient detail detected. Proceeding with planning..."

**IF detail_level == "MEDIUM":**

- Ask 1-2 targeted questions (only missing items)
- Use Multiple Choice with defaults (⭐)

**IF detail_level == "LOW":**

- Full refinement flow (3-5 questions)
- Use Multiple Choice with defaults (⭐)
- Focus on: approach, scope, constraints, priorities

**Example Interaction (LOW detail):**

> 📝 I need to clarify some details for this feature:
>
> 1. What authentication provider should we use? [default: A]
>    A) JWT (Local) ⭐
>    B) OAuth2 (Google/GitHub)
>    C) Firebase Auth
> 2. Should we implement audit logs for this? [default: B]
>    A) Yes
>    B) No ⭐
>
> Your answers (or Enter for defaults): \_

**4. Refined Objective Generation (if Manual):**

After refinement, generate clear objective statement:

```
✅ Refined Objective:

[Clear 1-2 paragraph description of WHAT will be implemented]

**Scope**:
- [List in-scope items]

**Out of Scope**:
- [List out-of-scope items]

Is this correct? (Yes/Edit/Cancel): _
```

**5. Documentation Compliance Check:**

Read relevant documentation:

- `ai-instructions.md` (NEVER/ALWAYS rules)
- `docs/architecture.md` (patterns, structure)
- `docs/code-standards.md` (naming, quality)
- IF auth/security: `specs/security.md`
- IF database: `docs/data-model.md`
- IF API: `docs/api.md`

Compare refined objective against documentation:

**IF deviation detected:**

```
🚨 POTENTIAL DEVIATION

From [document]:
❌ NEVER: [rule being violated]
✅ ALWAYS: [rule being ignored]

Your request: [conflicting part]

Options:
A) Modify request to align with documentation
B) Proceed with deviation (requires justification)
C) Cancel

Your choice: _
```

**IF user chooses B (Override):**

```
⚠️ OVERRIDE CONFIRMATION

You are implementing something that deviates from:
- [list violated documents/rules]

Type "I UNDERSTAND THE RISKS" to proceed: _

Provide justification: _
```

---

## Phase 1.5: SIMPLE Task Fast-Track

**IF complexity == "SIMPLE": Execute immediately without creating files**

1. **Show in-chat plan:**

   ```
   ⚡ SIMPLE Task - Fast Execution

   What: [1-line description]
   File: [path]
   Change: [specific modification]
   Lines: ~[N] (estimated)

   Execute now? (y/n): _
   ```

2. **IF user confirms ('y'):**
   - Make the change immediately
   - Show git diff preview
   - Skip to Phase 3 (no branch creation if already on feature branch)
   - Show: "✅ Done. Run `/flow-commit` to commit."
   - **END WORKFLOW** (no archiving needed)

3. **IF user declines ('n'):**
   - Cancel task
   - **END WORKFLOW**

**Note:** SIMPLE tasks don't create work.md, status.json, or archive records.

---

## Phase 2: Planning & Documentation

**⚠️ SKIP THIS PHASE IF complexity == "SIMPLE"**

**1. Read Required Documentation (Based on Complexity)**

**IF complexity == "MEDIUM":**

- `ai-instructions.md` (core rules)
- Load ONLY task-specific docs:
  - UI → `docs/components.md`
  - Navigation → `docs/navigation.md`
  - Security → `specs/security.md`

**IF complexity == "COMPLEX":**

- `ai-instructions.md` (NEVER/ALWAYS rules)
- `docs/architecture.md` (layer, pattern, structure)
- Task-specific docs:
  - UI → `docs/components.md`
  - Security/Auth → `specs/security.md`
  - Navigation → `docs/navigation.md`
  - Tests → `docs/testing.md`
- `docs/code-standards.md` (only if creating new files)

**2. Analyze Existing Codebase (MANDATORY)**

Find similar features/patterns in codebase:

- Identify existing files to use as reference (e.g., ProfileScreen.tsx for SettingsScreen.tsx)
- Check naming conventions in actual code
- Verify architectural consistency
- Look for reusable components/hooks

**3. Generate work.md (Conditional)**

**IF complexity == "MEDIUM":**

- Create simplified `.ai-flow/work/[task-name]/work.md` (~15-20 lines)
- Skip status.json

**IF complexity == "COMPLEX":**

- Create full `.ai-flow/work/[task-name]/work.md` (~30-40 lines)
- Create `status.json` (see step 4)

**Structure for MEDIUM tasks** (~15-20 lines):

```markdown
# [Type]: [Feature Name]

**Source**: [HU-XXX | Roadmap X.X | Manual]
**Files**: [2-5 files listed]
**Estimated**: [20-60 min]

## Objective

[1 clear paragraph]

## Tasks

- [ ] Task 1 → path/file.tsx
- [ ] Task 2 → path/file.ts
- [ ] Task 3 (optional tests)

## Key Rules

- ✅ [1-2 relevant ALWAYS rules]
- ❌ [1-2 relevant NEVER rules]
```

**Structure for COMPLEX tasks** (~30-40 lines):

```markdown
# [Type]: [Feature Name]

## Context

**Source**: HU-001-002 | Roadmap 2.3 | Manual [+ DEVIATION if override]
**SP**: 5 | **Branch**: feature/user-auth | **Deps**: None

## Objective

[1-2 clear paragraphs describing WHAT will be implemented]

## Documentation Constraints

**Read**: ai-instructions.md, architecture.md, code-standards.md, [security.md]

**Key Rules**:

- ✅ ALWAYS: [List specific rules that apply]
- ❌ NEVER: [List specific prohibitions]
- 📐 Pattern: [Architectural pattern from docs]
- 📁 Location: [File structure from architecture.md]

## Approach

**Layer**: [Data | Business Logic | API | UI]
**Files**: [List files to create/modify]
**Reference**: [Existing file to follow as pattern]

**Phases**:

1. [Phase 1 description]
2. [Phase 2 description]
3. [Phase 3 description]
4. [Phase 4 description]

## Tasks

[SEE TASK GENERATION LOGIC BELOW]

## Validation

- [ ] All NEVER/ALWAYS rules followed
- [ ] Tests pass (coverage per docs/testing.md)
- [ ] No hardcoded secrets
- [ ] Follows existing patterns
- [ ] [Add specific validations based on type]
```

**Task Generation Logic:**

**IF source is User Story:**

```python
tasks = read_user_story_tasks()
if tasks.are_detailed():  # Has: path, constraints, SP, deps
    work_md.tasks = """
**Source**: planning/user-stories/EP-XXX/HU-XXX-XXX.md

Tasks already detailed in User Story (see linked file).

**Summary**: [N] tasks, [X] SP total
- [Brief phase breakdown]
"""
else:
    work_md.tasks = generate_detailed_tasks()
```

**IF source is Roadmap:**

```python
feature = read_roadmap_feature()
if feature.has_detailed_tasks():
    work_md.tasks = """
**Source**: planning/roadmap.md Feature X.X

Tasks already detailed in Roadmap (see linked file).

**Summary**: [N] tasks, [X] SP total
"""
else:
    work_md.tasks = generate_detailed_tasks()
```

**IF source is Manual OR tasks need expansion:**

Generate detailed tasks with this format:

```markdown
## Tasks

**Source**: Manual | Roadmap X.X (expanded) | HU-XXX-XXX (expanded)

- [ ] T001 [D] Create User entity → src/entities/User.ts • 1 SP
  - Follow Product.ts pattern, hash passwords (bcrypt)
- [ ] T002 [L] UserService.register() → src/services/ • 2 SP
  - Validate email, hash password, return JWT (deps: T001)
- [ ] T003 [A] POST /users/register → src/controllers/ • 1 SP
  - Return 201, rate limit, follow api.md (deps: T002)
- [ ] T004 [T] Unit tests → tests/services/ • 2 SP
  - 80% coverage, edge cases (deps: T002)
```

**Task Detail Requirements:**

- Specific file path
- Pattern/reference to follow
- Key constraints from docs
- Dependencies (if applicable)
- Story Points

**4. Generate status.json (ONLY for COMPLEX tasks)**

**IF complexity == "COMPLEX":**

Create: `.ai-flow/work/[task-name]/status.json`

```json
{
  "type": "feature|refactor|fix",
  "source": "HU-001-002|roadmap-2.3|manual",
  "deviation": false,
  "progress": {
    "totalTasks": 4,
    "completedTasks": 0,
    "percentage": 0
  },
  "git": {
    "branchName": "feature/user-auth",
    "commits": []
  },
  "timestamps": {
    "created": "2025-12-22T23:00:00-03:00",
    "lastUpdated": "2025-12-22T23:00:00-03:00"
  },
  "validation": {
    "tests": { "executed": false },
    "lint": { "executed": false }
  }
}
```

**5. User Approval**

Show work.md for review:

```
📄 Generated: .ai-flow/work/[task-name]/work.md

Review work.md? (Yes/Edit/No): _
```

- **Yes**: Proceed to Phase 3
- **Edit**: Allow user to modify work.md, then re-read
- **No**: Cancel workflow

---

## Phase 3: Execution (Branch Creation)

**Upon confirmation to start implementation:**

**🛡️ CRITICAL: Protected Branch Check**

```bash
git branch --show-current
git status --porcelain
```

**If current branch is protected** (`main`, `master`, `develop`, `development`):

**A) If there are uncommitted changes:**

1.  **Analyze changes to generate branch name:**

    ```bash
    git status --porcelain
    git diff --stat
    ```

    **Detection rules:**
    - **New screens/features** → `feature/`
    - **Bug fixes** (crash fixes, error handling) → `fix/`
    - **Refactoring/Optimization** (code improvements, performance) → `refactor/`
    - **Native configs** (android/, ios/, dependencies) → `chore/`
    - **Tests only** → `test/`
    - **Documentation only** → `docs/`

    **Naming strategy:**
    - Extract screen/module/feature name
    - Remove extensions (.tsx, .ts, .js)
    - Convert to kebab-case
    - Limit to 3-4 words max

    **Examples:**

    ```
    src/screens/ProfileScreen.tsx (new)         → feature/profile-screen
    src/navigation/AppNavigator.tsx (fix)       → fix/app-navigation
    src/hooks/useAuth.ts (modified)             → refactor/auth-hook
    android/ + ios/ (configs)                   → chore/native-config
    src/screens/Auth* + src/services/auth*      → feature/authentication
    src/components/ (multiple)                  → refactor/ui-components
    ```

2.  **Warn user:**

    ```
    ⚠️  Working on protected branch '[branch-name]' with uncommitted changes.

    Analyzed changes:
    - [file1] (new)
    - [file2] (modified)
    - [file3] (modified)
    ... [N] more files

    Detected type: [feature|fix|refactor|chore]
    Suggested branch: [type]/[descriptive-slug]
    ```

3.  **Offer options:**
    - **A)** Create branch: `[type]/[suggested-name]` ⭐
    - **B)** Edit branch name (user provides custom slug)
    - **C)** Stash changes and continue: `git stash`
    - **D)** Cancel

4.  If user chooses A:

    ```bash
    git checkout -b [type]/[suggested-name]
    ```

    Then show:

    ```
    ✅ Created and switched to '[type]/[suggested-name]'

    Next steps:
    1. Run /flow-commit to commit these changes
    2. Return to protected branch: git checkout [protected-branch]
    3. Continue with /flow-work for new task

    Or continue working on this branch if it's your intended work.
    ```

5.  If user chooses B:
    ```
    Enter branch name (without type prefix): _
    ```
    Then create: `[detected-type]/[user-input]`

**B) If NO uncommitted changes:**

- ✅ Proceed normally - creating work branches FROM protected branches is correct workflow
- Protected branches serve as base for new work

1. **Generate Branch Name**:
   - `feature/[slug]`
   - `refactor/[slug]`
   - `fix/[slug]`
2. **Execute**: `git checkout -b [branch-name]`.
3. **Update `status.json`**: Record branch name and start timestamp.
4. **Implementation**: Proceed according to the selected mode (Auto, Phase-by-phase, Task-by-task).
   - Follow tasks in `work.md`
   - Update task checkboxes as completed
   - Update `status.json` progress

---

## Phase 4: Finalization (User-Controlled)

**⚠️ SKIP THIS PHASE IF complexity == "SIMPLE"** (already handled in Phase 1.5)

**Trigger Options:**

- User types: `/flow-work complete`
- All checkboxes in work.md marked complete
- User explicitly requests finalization

---

### Source Documentation Update (Interactive)

**Detect source references:**

```python
source = extract_from_work_md_or_status_json()
# Returns: "HU-001-002" | "roadmap-2.3" | "manual" | None
```

**IF source exists (HU or roadmap):**

```
📚 Update Source Documentation?

Found:
- planning/roadmap.md → Feature 2.3 "User Authentication"
- planning/user-stories/EP-001/HU-001-002.md

What to update?

a) Update both ⭐
b) Update roadmap only
c) Update user story only
d) Skip (I'll update manually later)

Your choice: _
```

**Execute selected updates:**

- Read files
- Mark checkboxes as complete: `- [ ]` → `- [x]`
- Add timestamp comment: `<!-- Completed: YYYY-MM-DD HH:MM -->`
- Save files

**Show confirmation:**

```
✅ Updated:
- planning/roadmap.md (Feature 2.3)
- planning/user-stories/EP-001/HU-001-002.md (5/5 DoD items)
```

**IF update fails:**

```
❌ Failed to update [file]: [reason]

Options:
1) Retry update
2) Skip this file
3) Cancel finalization

Your choice: _
```

**IF source is "manual" or None:**

```
⏭️ No source documentation to update (manual task)
```

---

## ✅ Development Work Complete

Your code is ready for finalization. You have two options:

### Option A: Run Full Finalization Now (Recommended) ⭐

Execute `/flow-finish` to complete all finalization steps automatically:

- ✅ **Smart Validation** - Runs tests + lint only if needed (or revalidates if requested)
- 📦 **Work Archiving** - Records analytics to `.ai-flow/archive/analytics.jsonl`, cleans workspace
- 🤖 **AI-Powered Summaries** - Generates professional PR/Jira descriptions (~1,200 tokens)
- 🚀 **Optional Push** - Pushes to remote with explicit confirmation

**To proceed:** Type `/flow-finish` in the chat

---

### Option B: Manual Finalization

If you prefer granular control over each step:

1. **Validation:** `/flow-check` - Run comprehensive validation (tests + code review)
2. **Commit:** `/flow-commit` - Create conventional commit with auto-generated message
3. **Archive:** Manually record analytics and clean `.ai-flow/work/[task-name]/`
4. **Push:** `git push origin [branch-name]` when ready

---

**What would you like to do?**

```
a) Run /flow-finish now ⭐ (Recommended - comprehensive automation)
b) I'll handle finalization manually (granular control)
c) Tell me more about what /flow-finish does

Your choice: _
```

**If 'a':** Execute `/flow-finish` immediately

**If 'b':** Show confirmation and end workflow:

```
✅ Understood. Development complete.

📋 Manual finalization checklist:
- [ ] Run validation: /flow-check
- [ ] Commit changes: /flow-commit
- [ ] Archive work folder
- [ ] Push to remote
- [ ] Create PR/MR

💡 Tip: You can run /flow-finish anytime to automate these steps.

🎉 Great work!
```

**If 'c':** Show detailed explanation:

```
📖 About /flow-finish

/flow-finish is an intelligent finalization workflow that:

1️⃣ **Smart Validation (Step 1)**
   - Detects if /flow-check was already run successfully
   - Only re-runs if explicitly requested or validation failed
   - Shows comprehensive test + lint results

2️⃣ **Smart Commit (Step 2)**
   - Detects uncommitted changes automatically
   - Runs /flow-commit only if needed
   - Generates conventional commit messages

3️⃣ **Work Archiving (Step 3)**
   - Extracts analytics: duration, story points, commits
   - Appends to .ai-flow/archive/analytics.jsonl
   - Deletes .ai-flow/work/[task-name]/ folder

4️⃣ **AI Summaries (Step 4)**
   - Reads git diff + commit history
   - Generates professional PR description
   - Generates ticket update (Jira/ClickUp/Linear)
   - ~1,200 tokens, markdown-formatted

5️⃣ **Optional Push (Step 5)**
   - Always asks for confirmation
   - Shows branch name and remote
   - Never pushes without explicit approval

**Would you like to run it now?** (y/n): _
```

**END WORKFLOW**

---

## Orchestration Rules

- **DRY Logic**: This file handles the high-level orchestration.
- **Delegation**:
  - Detailed Feature logic → `@flow-work-feature.md`
  - Detailed Refactor logic → `@flow-work-refactor.md`
  - Detailed Fix logic → `@flow-work-fix.md`
  - Resume logic → `@flow-work-resume.md`
- **State Persistence**: Always read/write to `.ai-flow/work/[name]/status.json` to maintain state across sessions.

---

## Phase 99: Informative Response

**This phase handles questions, reports, and analysis requests WITHOUT creating work files or branches.**

### 1. Analyze Request Type

**Classify the informative request:**

- **Technical Question:** How does X work? Why do we use Y?
- **Screen/Component Explanation:** Explain this screen/component/hook
- **Architecture Review:** Show me the navigation structure/state management
- **Project Report:** Generate report on dependencies/performance/bundle size
- **File Location:** Where is X screen? Find Y component
- **Comparison:** Compare X vs Y approach (React Native vs Flutter)
- **Best Practices:** What's the best way to handle X in mobile?

### 2. Load Relevant Context

**Based on request type, load specific documentation:**

**IF question about architecture/patterns:**

- Read `ai-instructions.md` (NEVER/ALWAYS rules)
- Read `docs/architecture.md` (navigation, state, native modules)
- Search codebase for examples

**IF question about specific screen/component:**

- Search codebase for screen/component files
- Read relevant specs from `specs/`
- Check navigation flow

**IF report request:**

- Run appropriate analysis (performance, dependencies, native modules)
- Read relevant docs for context
- Generate structured report

**IF file location request:**

- Search codebase with grep/semantic search
- List relevant screens/components with descriptions

### 3. Provide Comprehensive Answer

**Structure your response:**

```markdown
## [Question/Request]

### Answer

[Detailed explanation with code examples if relevant]

### Related Documentation

- [Link to relevant docs]
- [Link to screen/component examples]

### Additional Context

[Architecture decisions, mobile-specific considerations, performance implications]

### Related User Stories/Features

[If applicable, link to planning docs]
```

**Guidelines:**

- **Be comprehensive:** Load all relevant context, don't guess
- **Show examples:** Include actual code from the project
- **Reference docs:** Link to `docs/`, `specs/`, `planning/`
- **Explain trade-offs:** Why was X chosen over Y?
- **Mobile-specific:** Consider iOS vs Android differences
- **Provide sources:** Always cite where information comes from

### 4. Offer Follow-up Actions

**After answering, offer next steps:**

```
✅ Answer provided.

Would you like me to:
  A) Implement changes based on this analysis
  B) Create a work plan for improvements
  C) Generate a spec/doc for this
  D) Nothing, just the answer

Your choice (or just ask another question): _
```

**IF user chooses A or B:**

- Return to Phase 0 with refined objective
- Create appropriate work.md and proceed with execution

**IF user chooses C:**

- Create spec/doc file in appropriate location
- Commit with descriptive message

**IF user chooses D or asks another question:**

- **END WORKFLOW** (no files created, no branches)

### 5. Example Interactions

**Example 1: Technical Question**

````
User: /flow-work ¿cómo funciona la navegación entre screens?

Agent:
🔍 Detected: Informative request (question)

## How Navigation Works in This Project

### Implementation

We use React Navigation v6 with stack and tab navigators:
- Main structure in `src/navigation/AppNavigator.tsx`
- Tab navigator: `TabNavigator.tsx` (Home, Search, Profile)
- Auth stack: `AuthNavigator.tsx` (Login, Register)

[Shows actual code from project]

### Navigation Flow
```typescript
// AppNavigator.tsx
const AppNavigator = () => {
  const { isAuthenticated } = useAuth();

  return (
    <NavigationContainer>
      {isAuthenticated ? <TabNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};
````

### Screen Transitions

- Stack: `navigation.navigate('ScreenName', { params })`
- Modal: `navigation.push('Modal')`
- Go back: `navigation.goBack()`

### Deep Linking

Configured in `linking.ts` for:

- `/home` → HomeScreen
- `/profile/:id` → ProfileScreen
- `/post/:id` → PostDetailScreen

### Platform Differences

- iOS: Native stack with gestures
- Android: Material transitions
- Handled automatically by React Navigation

### Related Documentation

- `docs/architecture.md` - Navigation structure
- `docs/components.md` - Screen components

Would you like me to implement any changes to navigation? (Y/N): \_

```

**Example 2: Report Request**

```

User: /flow-work genera un informe de dependencias nativas

Agent:
🔍 Detected: Informative request (report)

## Native Dependencies Report

[Analyzes package.json and native modules]

### Total Native Modules: 8

| Module                         | Version | Platform | Purpose            |
| ------------------------------ | ------- | -------- | ------------------ |
| react-native-permissions       | 3.8.0   | Both     | Runtime perms      |
| react-native-camera            | 4.2.1   | Both     | Camera access      |
| @react-native-async-storage    | 1.19.0  | Both     | Local storage      |
| react-native-push-notification | 8.1.1   | Both     | Push notifications |
| react-native-geolocation       | 2.1.0   | Both     | GPS location       |
| react-native-biometrics        | 3.0.1   | Both     | Face/Touch ID      |
| react-native-keychain          | 8.1.2   | Both     | Secure storage     |
| react-native-vector-icons      | 9.2.0   | Both     | Icon library       |

### Pod Dependencies (iOS): 15 pods

### Gradle Dependencies (Android): 12 libraries

### Potential Issues

1. ⚠️ `react-native-camera` - Consider migrating to `react-native-vision-camera` (better performance)
2. ✅ All modules support New Architecture
3. ✅ No deprecated packages

### Bundle Impact

- iOS: +2.5 MB (native modules)
- Android: +3.1 MB (native modules)

### Recommendations

1. Migrate camera module for better performance
2. All modules are up to date ✅

Would you like me to create a migration plan for the camera module? (Y/N): \_

```

---

**BEGIN EXECUTION when user runs `/flow-work [args]`**
```
