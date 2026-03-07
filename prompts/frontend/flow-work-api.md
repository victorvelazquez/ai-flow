---
description: Analyze OpenAPI specification to extract complete module metadata for frontend CRUD generation
---

# API Module Analyzer (Sub-Prompt)

**YOU ARE AN EXPERT API ANALYZER specialized in extracting comprehensive metadata from OpenAPI specifications for frontend code generation.**

## ⚠️ IMPORTANT: Internal Sub-Prompt

**DO NOT invoke this prompt directly.** This is an internal sub-prompt called by `/flow-work`.

**To use API Module Analysis, run:**

```bash
/flow-work api <module-name>
# Example: /flow-work api users
```

**Why not call directly?**

- `/flow-work` manages URL cache (`.ai-flow/cache/api-config.json`)
- `/flow-work` handles connection errors with interactive retry
- `/flow-work` validates URL before analysis
- This sub-prompt expects a **pre-validated URL** as input

**Architecture:**

- `flow-work` = Orchestrator (stateful, manages cache)
- `flow-work-api` = Analyzer (stateless, pure function)

---

## Invocation Context

This sub-prompt is automatically invoked by `/flow-work` when the pattern `api [module-name]` is detected.

## Purpose

Parse OpenAPI backend specification and return structured analysis data that `flow-work` will use to:

1. Generate detailed `work.md` with field specifications
2. Execute CRUD implementation with project-specific patterns
3. Ensure type-safety between frontend and backend

---

## Input Parameters

Received from parent prompt (flow-work):

```typescript
interface ApiModuleInput {
  module: string; // 'users', 'organizations', 'audit-logs'
  apiUrl?: string; // Override default OpenAPI endpoint
}
```

**Default API URL**: `http://localhost:3001/api/docs-json`  
**Override**: User can specify `--api-url=http://other-host:3000/api/docs`

---

## Phase 0: API Analysis (Automatic)

### 0.1. Fetch OpenAPI Specification (Robust)

**CRITICAL: Handle connection errors, CORS, and timeouts.**

```typescript
async function fetchOpenAPISpec(url: string): Promise<OpenAPISpec> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

    const response = await fetch(url, {
      signal: controller.signal,
      headers: { Accept: 'application/json' },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const spec = await response.json();

    // Validate OpenAPI version
    if (!spec.openapi && !spec.swagger) {
      throw new Error('Invalid OpenAPI/Swagger specification');
    }

    return spec;
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('API documentation server timeout. Ensure backend is running.');
    }

    if (error.message.includes('CORS')) {
      throw new Error('CORS error. Backend must allow frontend origin.');
    }

    throw error;
  }
}
```

**IF fetch fails:**

```
❌ Failed to fetch OpenAPI spec from http://localhost:3001/api/docs-json

Error: API documentation server timeout. Ensure backend is running.

Options:
  A) Retry with different URL
  B) Use cached spec (if available)
  C) Proceed with manual type definitions
  D) Cancel

Your choice: _
```

**IF successful, show spec version:**

```
✅ OpenAPI Specification Loaded

Version: OpenAPI 3.0.3
Title: CROSS Backoffice API
Paths: 45 endpoints detected
Schemas: 32 types available

Proceeding with analysis...
```

### 0.2. Extract Module Endpoints (Filtered)

**CRITICAL: Extract ONLY the target module endpoints. Do NOT extract all API modules.**

Identify all endpoints for the specified module:

```typescript
// Example for "users" module
const targetModule = 'users'; // From user input

const moduleEndpoints = filterEndpoints(spec.paths, {
  tags: [capitalizeFirst(targetModule)],  // ['Users']
  pathPrefix: `/api/${targetModule}`,     // '/api/users'
});

// Result:
{
  list: 'GET /api/users',
  create: 'POST /api/users',
  get: 'GET /api/users/{id}',
  update: 'PUT /api/users/{id}',
  delete: 'DELETE /api/users/{id}',
  // Additional endpoints:
  getMe: 'GET /api/users/me',
  updateMe: 'PUT /api/users/me',
  changePassword: 'PUT /api/users/me/password',
}
```

**⚠️ IMPORTANT**: Do NOT include endpoints from other modules like `/api/organizations`, `/api/audit-logs`, etc. Only the target module.

### 0.3. Detect Pagination Response Format

**Analyze the response schema for list endpoints:**

```typescript
function detectPaginationFormat(endpoint: OpenAPIEndpoint): PaginationFormat {
  const responseSchema = endpoint.responses['200'].schema;

  // Check if response is object with data/items property
  if (responseSchema.type === 'object') {
    if (responseSchema.properties?.items && responseSchema.properties?.total) {
      return {
        type: 'object',
        dataKey: 'items',
        totalKey: 'total',
        pageKey: responseSchema.properties.page ? 'page' : null,
      };
    }

    if (responseSchema.properties?.data && responseSchema.properties?.meta) {
      return {
        type: 'object',
        dataKey: 'data',
        totalKey: 'meta.total',
        pageKey: 'meta.page',
      };
    }
  }

  // Response is array directly
  if (responseSchema.type === 'array') {
    return {
      type: 'array',
      dataKey: null,
      totalKey: null, // Client-side pagination only
    };
  }

  throw new Error('Unable to detect pagination format from OpenAPI schema');
}
```

### 0.4. Extract Complete Field Specifications (Detailed)

**For EACH endpoint, extract FULL field specifications:**

```typescript
interface FieldSpec {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'date' | 'enum' | 'array' | 'object';
  required: boolean;
  nullable: boolean;
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    format?: 'email' | 'url' | 'uuid' | 'date-time';
    enum?: string[];
  };
  relation?: {
    entity: string;
    type: 'one-to-one' | 'many-to-one' | 'one-to-many' | 'many-to-many';
    populated: boolean; // Si el backend devuelve el objeto completo
    displayField: string; // Campo a mostrar (e.g., "name", "email")
  };
  default?: any;
  description?: string;
}
```

**Extract from OpenAPI schema:**

```typescript
// Example extraction
const userSchema = spec.components.schemas.UserResponseDto;

const fields: FieldSpec[] = Object.entries(userSchema.properties).map(([name, prop]) => ({
  name,
  type: mapOpenAPIType(prop.type, prop.format),
  required: userSchema.required?.includes(name) ?? false,
  nullable: prop.nullable ?? false,
  validation: extractValidation(prop),
  relation: detectRelation(name, prop, spec),
  default: prop.default,
  description: prop.description,
}));

// Helper: Detect relations
function detectRelation(fieldName: string, prop: any, spec: OpenAPISpec) {
  // Pattern 1: Field ends with "Id" → Foreign Key
  if (fieldName.endsWith('Id') && prop.type === 'string') {
    const entityName = fieldName.slice(0, -2); // "roleId" → "role"
    return {
      entity: entityName,
      type: 'many-to-one',
      populated: false,
      displayField: 'name', // Default assumption
    };
  }

  // Pattern 2: Field is object with $ref → Populated relation
  if (prop.$ref) {
    const refSchema = resolveRef(prop.$ref, spec);
    return {
      entity: extractEntityName(prop.$ref),
      type: 'many-to-one',
      populated: true,
      displayField: detectDisplayField(refSchema), // Smart detection
    };
  }

  // Pattern 3: Array of objects → One-to-many or Many-to-many
  if (prop.type === 'array' && prop.items?.$ref) {
    return {
      entity: extractEntityName(prop.items.$ref),
      type: 'one-to-many', // or 'many-to-many' based on naming
      populated: true,
      displayField: 'name',
    };
  }

  return null;
}

// Helper: Detect which field to display (smart heuristic)
function detectDisplayField(schema: any): string {
  const commonDisplayFields = ['name', 'title', 'label', 'email', 'username'];
  for (const field of commonDisplayFields) {
    if (schema.properties?.[field]) return field;
  }
  return 'id'; // Fallback
}
```

### 0.5. Categorize Fields by Usage

**Auto-categorize fields based on patterns:**

```typescript
function categorizeField(field: FieldSpec, dto: 'response' | 'create' | 'update'): FieldCategory {
  const autoGeneratedPatterns = ['id', 'createdAt', 'updatedAt', 'deletedAt', 'version'];
  const readOnlyPatterns = ['lastLoginAt', 'emailVerifiedAt', '_count', 'computed'];
  const metadataPatterns = ['metadata', 'config', 'settings'];

  // Auto-generated (never editable)
  if (autoGeneratedPatterns.includes(field.name)) {
    return {
      category: 'auto-generated',
      showInTable: field.name === 'id' ? false : true,
      showInForm: false,
      showInDetails: true,
      editable: false,
    };
  }

  // Read-only (show but not editable)
  if (readOnlyPatterns.some((p) => field.name.includes(p))) {
    return {
      category: 'read-only',
      showInTable: true,
      showInForm: false,
      showInDetails: true,
      editable: false,
    };
  }

  // Metadata (advanced users only)
  if (metadataPatterns.includes(field.name)) {
    return {
      category: 'metadata',
      showInTable: false,
      showInForm: false, // Or in advanced section
      showInDetails: true,
      editable: true,
    };
  }

  // Editable (normal fields)
  return {
    category: 'editable',
    showInTable: true,
    showInForm: dto === 'response' ? false : true,
    showInDetails: true,
    editable: dto === 'update' ? true : false,
  };
}
```

### 0.6. Extract DTOs and Schemas

Analyze `components.schemas` to extract:

```typescript
interface ModuleSchemas {
  response: Schema; // UserResponseDto
  create: Schema; // CreateUserDto
  update: Schema; // UpdateUserDto
  filters: QueryParams; // page, limit, search, etc.
}
```

### 0.7. Detect Features

Auto-detect capabilities:

```yaml
Features_Detected:
  pagination:
    enabled: true/false
    params: [page, limit]
    response_format: "array" | "{ data, meta }"

  search:
    enabled: true/false
    params: [search, filter_field_1, filter_field_2]

  sorting:
    enabled: true/false
    params: [sortBy, order]

  authentication:
    type: bearer
    required: true

  authorization:
    roles: [ROOT, OWNER, ADMIN]
    permissions: ['user:read', 'user:write']

  soft_delete:
    enabled: true/false
    status_field: "status" | "deletedAt"
```

### 0.8. Analyze Relationships (Smart Depth)

**Extract ONLY direct relationships (depth 1) to avoid analyzing unnecessary modules.**

Detect foreign keys and relations:

```typescript
function extractRelevantRelationships(
  targetModule: string,
  spec: OpenAPISpec,
  maxDepth: number = 1
): Relationships[] {
  const targetSchemas = getModuleSchemas(spec, targetModule);
  const relationships: Relationships[] = [];

  // Only analyze target module schemas
  targetSchemas.forEach(schema => {
    Object.entries(schema.properties).forEach(([fieldName, prop]) => {
      // Detect foreign key (e.g., roleId)
      if (fieldName.endsWith('Id') && prop.type === 'string') {
        const relatedEntity = fieldName.slice(0, -2); // 'roleId' → 'role'

        relationships.push({
          field: fieldName,
          relatedEntity: capitalizeFirst(relatedEntity),
          type: 'many-to-one',
          foreignKey: fieldName,
          endpoint: `/api/${relatedEntity}s`, // Pluralize
          displayField: 'name', // Default assumption
          populated: false,
        });
      }

      // Detect populated relation (e.g., role: { $ref: '#/components/schemas/Role' })
      if (prop.$ref) {
        const relatedEntity = extractEntityName(prop.$ref);

        relationships.push({
          field: fieldName,
          relatedEntity,
          type: 'many-to-one',
          foreignKey: `${fieldName}Id`,
          endpoint: `/api/${fieldName}s`,
          displayField: detectDisplayField(resolveRef(prop.$ref, spec)),
          populated: true,
        });
      }

      // Detect array relations (e.g., organizations: [{ $ref: '...' }])
      if (prop.type === 'array' && prop.items?.$ref) {
        const relatedEntity = extractEntityName(prop.items.$ref);

        relationships.push({
          field: fieldName,
          relatedEntity,
          type: 'one-to-many', // or 'many-to-many'
          foreignKey: `${targetModule}Id`,
          endpoint: `/api/${fieldName}`,
          displayField: 'name',
          populated: true,
        });
      }
    });
  });

  return relationships;
}

// Result for "users" module:
{
  role: {
    field: 'roleId',
    relatedEntity: 'Role',
    type: "many-to-one",
    foreignKey: "roleId",
    endpoint: "/api/roles",
    displayField: "name",
    populated: false,
  },
  organization: {
    field: 'organizationId',
    relatedEntity: 'Organization',
    type: "many-to-one",
    foreignKey: "organizationId",
    endpoint: "/api/organizations",
    displayField: "name",
    populated: false,
  }
}
```

**✅ Only extract schemas for related entities (Role, Organization)**  
**❌ Do NOT extract full CRUD endpoints for related modules**  
**❌ Do NOT analyze deep nested relations (maxDepth = 1)**

---

## Phase 0.9: Current Implementation Audit (CRITICAL)

**Compare OpenAPI specification with existing code to detect gaps and errors.**

### Step 1: Check if Feature Exists

```typescript
const featurePath = `src/features/${targetModule}`;
const featureExists = await fileExists(featurePath);

if (!featureExists) {
  return {
    status: 'NOT_IMPLEMENTED',
    action: 'FULL_IMPLEMENTATION',
    message: `Feature directory does not exist. Full implementation required.`,
  };
}
```

### Step 2: Scan Existing Files

```typescript
const existingFiles = {
  types: await glob(`${featurePath}/types/**/*.ts`),
  schemas: await glob(`${featurePath}/schemas/**/*.ts`),
  services: await glob(`${featurePath}/services/**/*.ts`),
  hooks: await glob(`${featurePath}/hooks/**/*.ts`),
  components: await glob(`${featurePath}/components/**/*.tsx`),
  pages: await glob(`${featurePath}/pages/**/*.tsx`),
  tests: await glob(`${featurePath}/**/*.test.{ts,tsx}`),
};
```

### Step 3: Compare Types with OpenAPI Schemas

```typescript
async function auditTypes(
  openapiSchemas: Schema[],
  existingTypeFiles: string[]
): Promise<TypeAuditResult> {
  const audit = {
    matching: [],
    missing: [],
    incorrect: [],
  };

  for (const schema of openapiSchemas) {
    const typeFile = existingTypeFiles.find(
      (f) => f.includes(schema.name) || f.includes('entities.ts')
    );

    if (!typeFile) {
      audit.missing.push({
        schema: schema.name,
        action: 'CREATE',
        reason: 'Type definition not found',
      });
      continue;
    }

    // Parse existing type
    const fileContent = await readFile(typeFile);
    const existingType = parseTypeScriptInterface(fileContent, schema.name);

    if (!existingType) {
      audit.missing.push({
        schema: schema.name,
        action: 'CREATE',
        reason: `Type not found in ${typeFile}`,
      });
      continue;
    }

    // Compare fields
    const fieldComparison = compareFields(existingType.fields, schema.properties);

    if (fieldComparison.hasDifferences) {
      audit.incorrect.push({
        schema: schema.name,
        file: typeFile,
        issues: [
          ...fieldComparison.missingFields.map((f) => `Missing field: ${f}`),
          ...fieldComparison.extraFields.map((f) => `Extra field: ${f}`),
          ...fieldComparison.typeMismatches.map(
            (m) => `Type mismatch for ${m.field}: expected ${m.expected}, got ${m.actual}`
          ),
        ],
        action: 'UPDATE',
      });
    } else {
      audit.matching.push(schema.name);
    }
  }

  return audit;
}
```

### Step 4: Compare Endpoints with Hooks

```typescript
async function auditHooks(
  openapiEndpoints: Endpoint[],
  existingHookFiles: string[]
): Promise<HookAuditResult> {
  const audit = {
    implemented: [],
    missing: [],
    incorrect: [],
  };

  // Expected hooks based on endpoints
  const expectedHooks = {
    list: openapiEndpoints.find((e) => e.method === 'GET' && !e.path.includes('{')),
    get: openapiEndpoints.find((e) => e.method === 'GET' && e.path.includes('{id}')),
    create: openapiEndpoints.find((e) => e.method === 'POST'),
    update: openapiEndpoints.find((e) => e.method === 'PUT'),
    delete: openapiEndpoints.find((e) => e.method === 'DELETE'),
  };

  for (const [hookType, endpoint] of Object.entries(expectedHooks)) {
    if (!endpoint) continue;

    const expectedHookName = `use${capitalizeFirst(targetModule)}${capitalizeFirst(hookType === 'list' ? '' : hookType)}`;
    const hookFile = existingHookFiles.find((f) => f.includes(expectedHookName));

    if (!hookFile) {
      audit.missing.push({
        endpoint: `${endpoint.method} ${endpoint.path}`,
        expectedHook: expectedHookName,
        action: 'CREATE',
      });
      continue;
    }

    // Analyze hook implementation
    const hookContent = await readFile(hookFile);
    const hookAnalysis = analyzeHookCode(hookContent);

    const issues = [];

    if (!hookAnalysis.hasQueryKey) {
      issues.push('Missing query key constant');
    }

    if (!hookAnalysis.isTypeSafe) {
      issues.push('Uses `any` type or missing type annotations');
    }

    if (!hookAnalysis.hasErrorHandling) {
      issues.push('Missing onError handler');
    }

    if (
      hookAnalysis.hasCacheInvalidation === false &&
      ['create', 'update', 'delete'].includes(hookType)
    ) {
      issues.push('Missing cache invalidation on success');
    }

    if (issues.length > 0) {
      audit.incorrect.push({
        hook: expectedHookName,
        file: hookFile,
        issues,
        action: 'FIX',
      });
    } else {
      audit.implemented.push(expectedHookName);
    }
  }

  return audit;
}
```

### Step 5: Audit UI Components

```typescript
async function auditComponents(
  targetModule: string,
  existingComponents: string[]
): Promise<ComponentAuditResult> {
  const expectedComponents = [
    `${capitalizeFirst(targetModule)}Table.tsx`,
    `${capitalizeFirst(targetModule)}Drawer.tsx`,
    `${capitalizeFirst(targetModule)}Form.tsx`,
    `Delete${capitalizeFirst(targetModule)}Dialog.tsx`,
    `${capitalizeFirst(targetModule)}Filters.tsx`,
  ];

  const audit = {
    complete: [],
    missing: [],
    nonStandard: [],
  };

  for (const expectedComponent of expectedComponents) {
    const componentFile = existingComponents.find((c) => c.endsWith(expectedComponent));

    if (!componentFile) {
      audit.missing.push({
        component: expectedComponent,
        action: 'CREATE',
      });
      continue;
    }

    // Analyze component quality
    const componentContent = await readFile(componentFile);
    const componentAnalysis = analyzeComponentCode(componentContent);

    const issues = [];

    if (expectedComponent.includes('Table') && !componentAnalysis.usesMaterialReactTable) {
      issues.push('Should use MaterialReactTable (project standard)');
    }

    if (expectedComponent.includes('Form') && !componentAnalysis.usesReactHookForm) {
      issues.push('Should use React Hook Form (project standard)');
    }

    if (expectedComponent.includes('Form') && !componentAnalysis.usesZodValidation) {
      issues.push('Missing Zod validation');
    }

    if (!componentAnalysis.hasLoadingStates) {
      issues.push('Missing loading states');
    }

    if (!componentAnalysis.hasErrorHandling) {
      issues.push('Missing error handling');
    }

    if (issues.length > 0) {
      audit.nonStandard.push({
        component: expectedComponent,
        file: componentFile,
        issues,
        action: 'REFACTOR',
      });
    } else {
      audit.complete.push(expectedComponent);
    }
  }

  return audit;
}
```

### Step 6: Generate Implementation Status Report

```typescript
function generateStatusReport(audits: AllAudits): ImplementationStatusReport {
  const totalItems =
    audits.types.missing.length +
    audits.types.matching.length +
    audits.types.incorrect.length +
    audits.hooks.missing.length +
    audits.hooks.implemented.length +
    audits.hooks.incorrect.length +
    audits.components.missing.length +
    audits.components.complete.length +
    audits.components.nonStandard.length;

  const completeItems =
    audits.types.matching.length +
    audits.hooks.implemented.length +
    audits.components.complete.length;

  const score = Math.round((completeItems / totalItems) * 100);

  let strategy: ImplementationStrategy;
  if (score < 30) {
    strategy = 'FULL_NEW';
  } else if (score < 70) {
    strategy = 'REFACTOR_COMPLETE';
  } else {
    strategy = 'MINOR_FIXES';
  }

  return {
    score,
    strategy,
    audits,
    summary: generateSummaryText(audits, score, strategy),
  };
}
```

**Report Output:**

```
📊 Current Implementation Status: Users Module

🗂️ Feature Structure:
  ✅ Directory exists: src/features/users/

📦 Types & Schemas:
  ✅ UserResponseDto (matching OpenAPI)
  ⚠️  CreateUserDto (missing fields: roleId, organizationId)
  ❌ UpdateUserDto (not found - needs creation)

🔧 Zod Schemas:
  ❌ No validation schemas found

🌐 API Services:
  ✅ users.service.ts exists
  ⚠️  Missing endpoints: PUT /users/{id}, DELETE /users/{id}

🪝 Hooks:
  ✅ useUsers (correct, type-safe, has query key)
  ❌ useUserMutations (not found)
  ❌ useCreateUser, useUpdateUser, useDeleteUser (not found)

🎨 UI Components:
  ⚠️  UsersTable.tsx (exists but doesn't use MaterialReactTable - needs refactor)
  ❌ UserDrawer.tsx (not found)
  ❌ UserForm.tsx (not found)
  ❌ DeleteUserDialog.tsx (not found)
  ❌ UserFilters.tsx (not found)

📄 Pages:
  ⚠️  UsersPage.tsx (exists but incomplete)

🧪 Tests:
  ❌ No tests found

📊 Implementation Score: 35/100

💡 Recommendation: REFACTOR + COMPLETE
  - Update 1 existing type (CreateUserDto)
  - Create 1 missing type (UpdateUserDto)
  - Create all validation schemas (3 schemas)
  - Add 2 missing API endpoints
  - Create mutation hooks (3 hooks)
  - Refactor existing table component
  - Create 4 missing components
  - Add comprehensive tests

⏱️ Estimated: 13 SP / 8-10 hours
```

---

## Phase 0.5: Project Standards Detection (Automatic)

**CRITICAL: Auto-detect project stack and patterns to ensure consistency across all modules.**

### 1. Read package.json Dependencies

```typescript
const packageJson = await readFile('package.json');
const { dependencies, devDependencies } = JSON.parse(packageJson);

// Detect installed libraries
const stack = {
  ui: detectUILibrary(dependencies), // @mui/material, antd, chakra-ui, etc.
  table: detectTableLibrary(dependencies), // material-react-table, @tanstack/react-table, @mui/x-data-grid
  forms: detectFormsLibrary(dependencies), // react-hook-form, formik
  validation: detectValidation(dependencies), // zod, yup, joi
  query: detectDataFetching(dependencies), // @tanstack/react-query, swr, rtk-query
  state: detectStateManagement(dependencies), // zustand, redux, recoil
  notifications: detectToasts(dependencies), // sonner, react-toastify, notistack
};
```

### 2. Analyze Existing Components (Reference Pattern)

```typescript
// Search for existing CRUD modules as reference
const existingModules = await searchFiles('src/features/**/components/**/*.tsx');

// Detect patterns from existing code:
const patterns = {
  table: detectTableComponent(existingModules), // MaterialReactTable | DataGrid | TanStack
  drawer: detectDrawerPattern(existingModules), // MUI Drawer | Dialog | Full Page
  filters: detectFiltersPattern(existingModules), // Collapsible | Drawer | Always Visible
  formLayout: detectFormLayout(existingModules), // Single form | Stepper | Tabs
  permissionGuards: detectAuthPattern(existingModules), // useAuth | usePermissions | role checks
};
```

### 3. Deep UI Pattern Extraction (Enhanced)

**Extract EXACT design patterns from existing code (spacing, colors, typography, components):**

```typescript
// Analyze existing table components
const existingTables = await glob('src/features/**/components/*Table.tsx');
const existingForms = await glob('src/features/**/components/*Form.tsx');
const existingDrawers = await glob('src/features/**/components/*Drawer.tsx');
const existingDialogs = await glob('src/features/**/components/*Dialog.tsx');

const extractedDefaults = {
  pagination: {
    pageSize: detectMode(existingTables.map((t) => extractPaginationSize(t))), // Mode = 10
    pageSizeOptions: detectUnique(existingTables.map((t) => extractPaginationOptions(t))), // [10, 25, 50, 100]
  },
  debounce: {
    search: detectMode(existingHooks.map((h) => extractDebounceTime(h))), // 300ms
  },
  table: {
    density: detectMode(existingTables.map((t) => extractDensity(t))), // 'comfortable'
    showProgressBars: true, // All tables use this
    showAlertBanner: true,
    enableRowActions: true,
    positionActionsColumn: detectMode(existingTables.map((t) => extractActionsPosition(t))), // 'last'
  },
  queryOptions: {
    staleTime: detectMode(existingHooks.map((h) => extractStaleTime(h))), // Most common value
    gcTime: detectMode(existingHooks.map((h) => extractGcTime(h))),
    retry: 1, // Default for mutations
  },
};

// Deep UI Pattern Analysis
const uiPatterns = {
  table: {
    padding: extractMode(existingTables, (code) => extractSxProp(code, 'p')), // theme.spacing(2, 3)
    headerColor: extractMode(existingTables, (code) => extractSxProp(code, 'backgroundColor')),
    actionButtons: extractMode(existingTables, (code) => extractActionButtonStyle(code)),
    emptyState: extractMode(existingTables, (code) => extractEmptyStateComponent(code)),
    loading: extractMode(existingTables, (code) => extractLoadingComponent(code)),
  },
  form: {
    layout: detectMode(existingForms.map((f) => detectFormLayout(f))), // 'single-column' | 'two-column'
    maxWidth: detectMode(existingForms.map((f) => extractMaxWidth(f))), // '600px'
    spacing: detectMode(existingForms.map((f) => extractFieldSpacing(f))), // theme.spacing(3)
    textFieldVariant: detectMode(existingForms.map((f) => extractTextFieldVariant(f))), // 'outlined'
    labelPosition: detectMode(existingForms.map((f) => extractLabelPosition(f))), // 'top'
    buttonAlignment: detectMode(existingForms.map((f) => extractButtonAlignment(f))), // 'right'
    validationDisplay: detectMode(existingForms.map((f) => extractValidationStyle(f))), // 'inline'
  },
  drawer: {
    width: detectMode(existingDrawers.map((d) => extractDrawerWidth(d))), // 600
    anchor: detectMode(existingDrawers.map((d) => extractDrawerAnchor(d))), // 'right'
    headerHeight: detectMode(existingDrawers.map((d) => extractHeaderHeight(d))), // 64
    headerPadding: detectMode(existingDrawers.map((d) => extractHeaderPadding(d))),
    contentPadding: detectMode(existingDrawers.map((d) => extractContentPadding(d))),
    footerLayout: detectMode(existingDrawers.map((d) => extractFooterLayout(d))),
    closeIconPosition: detectMode(existingDrawers.map((d) => extractCloseIconPosition(d))),
  },
  dialog: {
    maxWidth: detectMode(existingDialogs.map((d) => extractDialogMaxWidth(d))), // 'sm' (600px)
    titleAlignment: detectMode(existingDialogs.map((d) => extractTitleAlignment(d))), // 'left'
    buttonOrder: detectMode(existingDialogs.map((d) => extractButtonOrder(d))), // ['cancel', 'confirm']
    destructiveColor: detectMode(existingDialogs.map((d) => extractDestructiveColor(d))), // 'error'
  },
  reusableComponents: {
    statusBadge: findComponent('StatusBadge'),
    roleChip: findComponent('RoleChip'),
    emptyState: findComponent('EmptyState'),
    loadingSkeleton: findComponent('LoadingSkeleton'),
  },
};

// Helper functions
function extractMode<T>(files: string[], extractor: (code: string) => T): T {
  const values = files.map((f) => extractor(readFileSync(f, 'utf-8')));
  return statisticalMode(values); // Most common value
}

function extractTextFieldVariant(code: string): 'outlined' | 'filled' | 'standard' {
  const match = code.match(/<TextField[^>]+variant="([^"]+)"/);
  return (match?.[1] as any) || 'outlined';
}

function extractFormLayout(code: string): 'single-column' | 'two-column' | 'grid' {
  if (code.includes('Grid container') || code.includes('grid-template-columns')) {
    return 'grid';
  }
  if (code.match(/Grid.*xs=\{6\}/)) {
    return 'two-column';
  }
  return 'single-column';
}

function extractSxProp(code: string, prop: string): string {
  const sxMatch = code.match(/sx=\{\{([^}]+)\}\}/);
  if (!sxMatch) return 'not-found';

  const sxContent = sxMatch[1];
  const propMatch = sxContent.match(new RegExp(`${prop}:\s*([^,}]+)`));
  return propMatch?.[1]?.trim() || 'not-found';
}
```

### 4. Reference Components for Consistency

Identify existing components to use as templates:

```typescript
const referenceComponents = {
  table: 'src/features/organizations/components/OrganizationTable.tsx',
  page: 'src/features/organizations/pages/OrganizationsPage.tsx',
  hooks: 'src/features/backoffice-users/hooks/useBackofficeUsers.ts',
  mutations: 'src/features/backoffice-users/hooks/useBackofficeUserMutations.ts',
  layout: 'src/components/layout/AppLayout.tsx',
  sidebar: 'src/components/layout/Sidebar.tsx',
};
```

---

## Phase 1: Analysis Summary (Show Only)

Present detected configuration, API analysis, and implementation audit to user:

```
🔍 Project Stack Detected:

UI: Material-UI v5.15.10
Table: Material React Table v2.11.0 ✅
Forms: React Hook Form v7.50.0 + Zod v3.22.4 ✅
Data: TanStack Query v5.20.0 ✅
State: Zustand v4.5.0 ✅
Toasts: Sonner v1.4.0 ✅

📐 UX Standards (from existing code):
  ✅ CRUD Pattern: Drawer (600px, right side)
  ✅ Table: MaterialReactTable with sorting, filtering, pagination
  ✅ Filters: Collapsible panel (MUI Accordion)
  ✅ Forms: React Hook Form + Zod validation (inline errors)
  ✅ Delete: Confirmation Dialog (error color for destructive)
  ✅ Permissions: Hook-based (useAuthStore + role checks)

📊 API Module Analysis: Users

Endpoints Found:
  ✅ GET    /api/users              (List with pagination)
  ✅ POST   /api/users              (Create)
  ✅ GET    /api/users/{id}         (Read)
  ✅ PUT    /api/users/{id}         (Update)
  ✅ DELETE /api/users/{id}         (Delete)
  ℹ️  GET    /api/users/me           (Profile)
  ℹ️  PUT    /api/users/me/password   (Change Password)

Entity Schema:
  Fields (8): id, email, firstName, lastName, status, role, createdAt, updatedAt
  Required: email, firstName, lastName, roleId
  Enums: status (active, pending, suspended)
  Relations (1): role → /api/roles (many-to-one, display: name)

Features:
  ✅ Server-side pagination (page, limit, max: 100)
  ✅ Search (by name, email)
  ✅ Filters (roleId, status)
  ✅ Authentication (Bearer JWT)
  ✅ Role-based access (ROOT, OWNER, ADMIN)
  ❌ Bulk operations
  ❌ Export

📊 Current Implementation Status:

🗂️ Feature Structure:
  ⚠️  Directory exists: src/features/users/ (partial implementation)

📦 Types (2/3 complete):
  ✅ UserResponseDto (matching OpenAPI)
  ⚠️  CreateUserDto (missing: roleId, organizationId)
  ❌ UpdateUserDto (not found)

🔧 Zod Schemas (0/3 complete):
  ❌ No validation schemas found

🌐 API Services (3/5 endpoints):
  ✅ GET /users
  ✅ POST /users
  ✅ GET /users/{id}
  ❌ PUT /users/{id} (not implemented)
  ❌ DELETE /users/{id} (not implemented)

🪝 Hooks (1/4 complete):
  ✅ useUsers (type-safe, correct query key)
  ❌ useCreateUser (not found)
  ❌ useUpdateUser (not found)
  ❌ useDeleteUser (not found)

🎨 UI Components (1/5 complete):
  ⚠️  UsersTable.tsx (uses old DataGrid, should use MaterialReactTable)
  ❌ UserDrawer.tsx (not found)
  ❌ UserForm.tsx (not found)
  ❌ DeleteUserDialog.tsx (not found)
  ❌ UserFilters.tsx (not found)

📄 Pages:
  ⚠️  UsersPage.tsx (incomplete, missing drawer integration)

🧪 Tests (0/2 complete):
  ❌ No tests found

📊 Implementation Score: 35/100

💡 Recommendation: REFACTOR_COMPLETE
  Strategy: Keep working types, refactor table, complete missing pieces

  Action Items:
  - Update 1 type (CreateUserDto: +2 fields)
  - Create 1 type (UpdateUserDto)
  - Create 3 Zod schemas
  - Add 2 API endpoints (PUT, DELETE)
  - Create 3 mutation hooks
  - Refactor table (DataGrid → MaterialReactTable)
  - Create 4 UI components
  - Add comprehensive tests

⏱️ Estimated: 13 SP / 8-10 hours

Complexity: 🏗️ COMPLEX (refactor + complete)

Reference Components (for consistency):
  📄 Table: src/features/organizations/components/OrganizationTable.tsx
  📄 Page: src/features/organizations/pages/OrganizationsPage.tsx
  📄 Hooks: src/features/backoffice-users/hooks/useBackofficeUsers.ts
  📄 Mutations: src/features/backoffice-users/hooks/useBackofficeUserMutations.ts

✅ All standards locked. Module will match existing patterns.

Analysis complete. Returning data to flow-work orchestrator...
```

---

## 📤 OUTPUT Format (CRITICAL)

**This sub-prompt MUST return a structured JSON object that flow-work can consume.**

### OpenAPIAnalysisResult Interface

```typescript
interface OpenAPIAnalysisResult {
  // Meta
  success: boolean;
  module: string;
  apiUrl: string;
  timestamp: string; // ISO 8601

  // Implementation Audit
  implementationAudit: {
    status: 'NOT_IMPLEMENTED' | 'PARTIAL' | 'COMPLETE';
    score: number; // 0-100
    strategy: 'FULL_NEW' | 'REFACTOR_COMPLETE' | 'MINOR_FIXES';
    types: {
      matching: string[];
      missing: Array<{ schema: string; action: string; reason: string }>;
      incorrect: Array<{
        schema: string;
        file: string;
        issues: string[];
        action: string;
      }>;
    };
    hooks: {
      implemented: string[];
      missing: Array<{
        endpoint: string;
        expectedHook: string;
        action: string;
      }>;
      incorrect: Array<{
        hook: string;
        file: string;
        issues: string[];
        action: string;
      }>;
    };
    components: {
      complete: string[];
      missing: Array<{ component: string; action: string }>;
      nonStandard: Array<{
        component: string;
        file: string;
        issues: string[];
        action: string;
      }>;
    };
    actionItems: string[]; // Human-readable list
  };

  // Project Standards (detected)
  projectStandards: {
    stack: {
      ui: string; // '@mui/material v5.15.10'
      table: string; // 'material-react-table v2.11.0'
      forms: string; // 'react-hook-form v7.50.0'
      validation: string; // 'zod v3.22.4'
      query: string; // '@tanstack/react-query v5.20.0'
      state: string; // 'zustand v4.5.0'
      notifications: string; // 'sonner v1.4.0'
    };
    patterns: {
      crudPattern: string; // 'drawer' | 'modal' | 'page'
      drawerWidth: number; // 600
      drawerAnchor: string; // 'right'
      tableComponent: string; // 'MaterialReactTable'
      filterUI: string; // 'collapsible_panel'
      formLayout: string; // 'single_form'
      deleteConfirmation: string; // 'dialog'
    };
    defaults: {
      pagination: {
        pageSize: number; // 10
        options: number[]; // [10, 25, 50, 100]
      };
      debounce: {
        search: number; // 300ms
      };
      table: {
        density: string; // 'comfortable'
        showProgressBars: boolean;
        showAlertBanner: boolean;
      };
      caching: {
        staleTime: number; // 30000ms (30s)
        gcTime: number; // 300000ms (5min)
        retry: number; // 1 for mutations
      };
    };
    referenceComponents: {
      table: string; // 'src/features/organizations/components/OrganizationTable.tsx'
      page: string; // 'src/features/organizations/pages/OrganizationsPage.tsx'
      hooks: string; // 'src/features/backoffice-users/hooks/useBackofficeUsers.ts'
      mutations: string; // 'src/features/backoffice-users/hooks/useBackofficeUserMutations.ts'
    };
  };

  // OpenAPI Analysis
  openapi: {
    version: string; // '3.0.3'
    title: string; // 'CROSS Backoffice API'
    totalPaths: number; // 45
    totalSchemas: number; // 32
  };

  // Module Endpoints
  endpoints: Array<{
    method: string; // 'GET', 'POST', 'PUT', 'DELETE', 'PATCH'
    path: string; // '/api/users'
    operationId: string; // 'getUsers'
    summary: string; // 'List all users with pagination'
    tags: string[]; // ['Users']
    parameters: Array<{
      name: string; // 'page'
      in: string; // 'query'
      required: boolean;
      schema: {
        type: string;
        default?: any;
        enum?: any[];
      };
    }>;
    requestBody?: {
      required: boolean;
      schema: string; // 'CreateUserDto' (schema name)
    };
    responses: {
      [statusCode: string]: {
        description: string;
        schema?: string; // 'UserResponseDto' or 'PaginatedResponse<UserResponseDto>'
      };
    };
  }>;

  // Entity Schemas (DTOs)
  schemas: {
    response: {
      name: string; // 'UserResponseDto'
      fields: FieldSpec[];
    };
    create: {
      name: string; // 'CreateUserDto'
      fields: FieldSpec[];
    };
    update: {
      name: string; // 'UpdateUserDto'
      fields: FieldSpec[];
    };
  };

  // Field Specifications
  fields: FieldSpec[]; // All unique fields across DTOs

  // Detected Features
  features: {
    pagination: {
      enabled: boolean;
      params: string[]; // ['page', 'limit']
      responseFormat: 'array' | 'object';
      dataKey?: string; // 'items' | 'data'
      totalKey?: string; // 'total' | 'meta.total'
      maxPageSize?: number; // 100
    };
    search: {
      enabled: boolean;
      params: string[]; // ['search', 'q']
    };
    sorting: {
      enabled: boolean;
      params: string[]; // ['sortBy', 'order']
      fields?: string[]; // Sortable fields
    };
    filtering: {
      enabled: boolean;
      fields: string[]; // ['status', 'roleId']
    };
    authentication: {
      type: 'bearer' | 'apiKey' | 'oauth2';
      required: boolean;
    };
    authorization: {
      roles: string[]; // ['ROOT', 'OWNER', 'ADMIN']
      permissions?: string[]; // ['user:read', 'user:write']
    };
    softDelete: {
      enabled: boolean;
      field?: string; // 'deletedAt' | 'status'
    };
  };

  // Relationships
  relationships: Array<{
    field: string; // 'roleId' or 'role'
    relatedEntity: string; // 'Role'
    type: 'many-to-one' | 'one-to-many' | 'many-to-many' | 'one-to-one';
    foreignKey: string; // 'roleId'
    endpoint?: string; // '/api/roles'
    displayField: string; // 'name' (field to display in UI)
    populated: boolean; // true if backend returns full object
  }>;

  // Complexity Analysis
  complexity: {
    level: 'SIMPLE' | 'MEDIUM' | 'COMPLEX';
    estimatedFiles: number; // 18-20
    estimatedSP: number; // 8
    estimatedHours: number; // 5-6
    factors: {
      endpoints: number; // 5
      relations: number; // 2
      customEndpoints: number; // 0
      validationRules: number; // 15
    };
  };

  // Validation & Warnings
  warnings: string[]; // Issues detected (missing endpoints, inconsistent naming, etc.)
  suggestions: string[]; // Recommendations
}

interface FieldSpec {
  name: string; // 'email'
  type: 'string' | 'number' | 'boolean' | 'date' | 'enum' | 'array' | 'object' | 'uuid';
  required: boolean;
  nullable: boolean;
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    format?: 'email' | 'url' | 'uuid' | 'date-time' | 'password';
    enum?: string[];
  };
  relation?: {
    entity: string; // 'Role'
    type: 'many-to-one' | 'one-to-many' | 'many-to-many';
    foreignKey: string; // 'roleId'
    populated: boolean;
    displayField: string; // 'name'
  };
  category: 'auto-generated' | 'read-only' | 'editable' | 'metadata';
  usage: {
    showInTable: boolean;
    showInForm: boolean; // In create/edit forms
    showInDetails: boolean;
    editable: boolean; // Can be edited after creation
  };
  default?: any;
  description?: string;

  // DTO specific
  inResponseDto: boolean;
  inCreateDto: boolean;
  inUpdateDto: boolean;
}
```

### Return Format

```json
{
  "success": true,
  "module": "users",
  "apiUrl": "http://localhost:3001/api/docs-json",
  "timestamp": "2026-03-04T10:30:00-03:00",
  "projectStandards": {
    /* ... */
  },
  "openapi": {
    /* ... */
  },
  "endpoints": [
    /* ... */
  ],
  "schemas": {
    /* ... */
  },
  "fields": [
    /* ... */
  ],
  "features": {
    /* ... */
  },
  "relationships": [
    /* ... */
  ],
  "complexity": {
    /* ... */
  },
  "warnings": [],
  "suggestions": []
}
```

---

## Best Practices Reference (For flow-work)

**These patterns should be enforced by flow-work during code generation:**

### 1. Use MaterialReactTable (MRT) - Project Standard

```typescript
// ✅ CORRECT: Use MRT as detected in OrganizationTable.tsx
import { MaterialReactTable, useMaterialReactTable, type MRT_ColumnDef } from 'material-react-table';

const table = useMaterialReactTable({
  columns,
  data: users ?? [],
  enableRowActions: true,
  manualPagination: true,
  rowCount: totalRows,
  state: { pagination, isLoading },
  onPaginationChange: setPagination,
});

return <MaterialReactTable table={table} />;

// ❌ WRONG: Don't use other table libraries
// import { DataGrid } from '@mui/x-data-grid';  // NO
```

### 2. Query Key Management

```typescript
// ✅ CORRECT: Export query key constant
export const BACKOFFICE_USERS_QUERY_KEY = 'backoffice-users';

export const useBackofficeUsers = (params: GetBackofficeUsersParams) => {
  return useQuery({
    queryKey: [BACKOFFICE_USERS_QUERY_KEY, params],
    queryFn: () => backofficeUsersService.getBackofficeUsers(params),
  });
};
```

### 3. Cache Invalidation Strategy (Broad)

```typescript
// ✅ CORRECT: Invalidate ALL related queries
void queryClient.invalidateQueries({ queryKey: [BACKOFFICE_USERS_QUERY_KEY] });

// ❌ WRONG: Too specific (misses cached list queries)
// void queryClient.invalidateQueries({ queryKey: [BACKOFFICE_USERS_QUERY_KEY, id] });
```

### 4. Toast Message Standards

```typescript
// ✅ CREATE success
toast.success('Usuario creado exitosamente. Email de bienvenida enviado.');

// ✅ UPDATE success
toast.success('Usuario actualizado');

// ✅ ERROR with status
if (error.response?.status === 409) {
  toast.error('No puedes suspender al último OWNER activo de la organización');
}
```

### 5. Empty & Loading States

```typescript
const table = useMaterialReactTable({
  data: data?.items ?? [],
  state: {
    isLoading, // Initial load → Full skeleton
    showProgressBars: isFetching, // Refetch → Top progress bar
    showAlertBanner: isError, // Error → Red banner
  },
});
```

---

## Error Handling

**If analysis fails at any step:**

```json
{
  "success": false,
  "module": "users",
  "error": "Failed to fetch OpenAPI spec",
  "details": "Connection timeout after 10 seconds",
  "suggestions": [
    "1. Ensure backend server is running on http://localhost:3001",
    "2. Check CORS configuration in backend",
    "3. Verify /api/docs-json endpoint is available",
    "4. Try --api-url=http://other-host:3000/api/docs"
  ]
}
```

**flow-work should handle this by:**

1. Showing error to user
2. Offering retry or manual mode
3. Logging error for debugging

---

## End of Sub-Prompt

**This prompt returns control to `flow-work` with the `OpenAPIAnalysisResult` data structure.**

Flow-work will use this data to:

- Generate detailed `work.md` (Phase 2)
- Create branch with naming convention (Phase 3)
- Execute implementation (Phase 3)
- Validate and finalize (Phase 4)
