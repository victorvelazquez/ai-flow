# System Architecture

> Technical architecture and design patterns for {{PROJECT_NAME}}

---

## 🏗️ Architecture Pattern

**Pattern:** {{ARCHITECTURE_PATTERN}}

### Why This Pattern?

{{ARCHITECTURE_RATIONALE}}

---

## 🧱 System Components

### High-Level Architecture

```
{{ARCHITECTURE_DIAGRAM}}
```

### Component Overview

{{#EACH COMPONENT}}
#### {{COMPONENT_NAME}}

**Purpose:** {{COMPONENT_PURPOSE}}

**Responsibilities:**
{{#EACH RESPONSIBILITY}}
- {{RESPONSIBILITY_DESCRIPTION}}
{{/EACH}}

**Dependencies:**
{{#EACH DEPENDENCY}}
- {{DEPENDENCY_NAME}}
{{/EACH}}

{{/EACH}}

---

## 📊 Layer Structure

{{#IF LAYERED_ARCHITECTURE}}
### Presentation Layer
**Location:** `{{PRESENTATION_LAYER_PATH}}`

**Responsibilities:**
- HTTP request/response handling
- Input validation
- Route definitions
- Middleware integration

**Rules:**
- ❌ No business logic
- ❌ No direct database access
- ✅ Thin controllers
- ✅ Delegate to services

### Business Logic Layer
**Location:** `{{BUSINESS_LAYER_PATH}}`

**Responsibilities:**
- Core business rules
- Use case orchestration
- Transaction management
- Domain logic

**Rules:**
- ❌ No HTTP concerns
- ❌ No database-specific code
- ✅ Framework-agnostic
- ✅ Testable in isolation

### Data Access Layer
**Location:** `{{DATA_LAYER_PATH}}`

**Responsibilities:**
- Database operations
- Query construction
- Data mapping
- Cache management

**Rules:**
- ❌ No business logic
- ✅ Repository pattern
- ✅ ORM abstraction
- ✅ Transaction support

{{/IF}}

---

## 🔄 Request Flow

### Typical Request Lifecycle

```
{{REQUEST_FLOW_DIAGRAM}}
```

### Flow Steps

{{#EACH FLOW_STEP}}
{{STEP_NUMBER}}. **{{STEP_NAME}}**
   - Component: {{COMPONENT}}
   - Action: {{ACTION_DESCRIPTION}}
   - Output: {{OUTPUT}}
{{/EACH}}

---

## 🎯 Design Patterns

{{#EACH DESIGN_PATTERN}}
### {{PATTERN_NAME}}

**Purpose:** {{PATTERN_PURPOSE}}

**Used In:** {{PATTERN_USAGE}}

**Example:**
```{{LANGUAGE}}
{{PATTERN_EXAMPLE}}
```

{{/EACH}}

---

## 📁 Project Structure

```
{{PROJECT_STRUCTURE_DETAILED}}
```

### Directory Descriptions

{{#EACH DIRECTORY}}
- **`{{DIR_PATH}}`** - {{DIR_DESCRIPTION}}
{{/EACH}}

---

## 🔌 Module Organization

**Strategy:** {{MODULE_ORGANIZATION_STRATEGY}}

{{#IF FEATURE_BASED}}
### Feature Modules

Each feature is self-contained:

```
src/
  {{FEATURE_EXAMPLE}}/
    {{FEATURE_EXAMPLE}}.controller.ts
    {{FEATURE_EXAMPLE}}.service.ts
    {{FEATURE_EXAMPLE}}.repository.ts
    {{FEATURE_EXAMPLE}}.dto.ts
    {{FEATURE_EXAMPLE}}.entity.ts
    {{FEATURE_EXAMPLE}}.module.ts
    {{FEATURE_EXAMPLE}}.spec.ts
```

**Benefits:**
- Clear boundaries
- Easy to find related code
- Supports team ownership
- Facilitates microservices extraction

{{/IF}}

{{#IF LAYER_BASED}}
### Layer-Based Organization

Organized by technical layer:

```
src/
  controllers/
    {{ENTITY_EXAMPLE}}.controller.ts
  services/
    {{ENTITY_EXAMPLE}}.service.ts
  repositories/
    {{ENTITY_EXAMPLE}}.repository.ts
```

{{/IF}}

---

## 🔗 Dependency Management

### Dependency Injection

**Container:** {{DI_CONTAINER}}

**Registration:**
```{{LANGUAGE}}
{{DI_REGISTRATION_EXAMPLE}}
```

**Usage:**
```{{LANGUAGE}}
{{DI_USAGE_EXAMPLE}}
```

### Dependency Rules

```
High-level modules should not depend on low-level modules.
Both should depend on abstractions.

Allowed: Controller → Service → Repository
Not Allowed: Controller → Repository (bypasses service)
```

---

## 🌐 API Structure

**Style:** {{API_STYLE}}

**Versioning:** {{API_VERSIONING_STRATEGY}}

### Endpoint Patterns

{{#IF REST_API}}
#### REST Conventions

| Resource | Method | Endpoint | Description |
|----------|--------|----------|-------------|
| {{RESOURCE_NAME}} | GET | /{{API_VERSION}}/{{RESOURCE_PLURAL}} | List all |
| {{RESOURCE_NAME}} | GET | /{{API_VERSION}}/{{RESOURCE_PLURAL}}/:id | Get one |
| {{RESOURCE_NAME}} | POST | /{{API_VERSION}}/{{RESOURCE_PLURAL}} | Create |
| {{RESOURCE_NAME}} | PUT/PATCH | /{{API_VERSION}}/{{RESOURCE_PLURAL}}/:id | Update |
| {{RESOURCE_NAME}} | DELETE | /{{API_VERSION}}/{{RESOURCE_PLURAL}}/:id | Delete |

{{/IF}}

{{#IF GRAPHQL}}
#### GraphQL Schema

```graphql
{{GRAPHQL_SCHEMA_EXAMPLE}}
```

{{/IF}}

---

## 📦 External Dependencies

### Core Libraries

{{#EACH CORE_LIBRARY}}
- **{{LIBRARY_NAME}}** ({{LIBRARY_VERSION}})
  - Purpose: {{LIBRARY_PURPOSE}}
  - Critical: {{IS_CRITICAL}}
{{/EACH}}

### External Services

{{#EACH EXTERNAL_SERVICE}}
- **{{SERVICE_NAME}}**
  - Purpose: {{SERVICE_PURPOSE}}
  - Integration: {{INTEGRATION_METHOD}}
  - Fallback: {{FALLBACK_STRATEGY}}
{{/EACH}}

---

## 🔐 Security Architecture

### Authentication Flow

```
{{AUTH_FLOW_DIAGRAM}}
```

### Authorization Model

**Type:** {{AUTHORIZATION_MODEL}}

**Implementation:** See `specs/security.md` for details.

---

## 💾 Data Flow

### Create Operation

```
{{CREATE_FLOW_DIAGRAM}}
```

### Read Operation

```
{{READ_FLOW_DIAGRAM}}
```

### Update Operation

```
{{UPDATE_FLOW_DIAGRAM}}
```

### Delete Operation

```
{{DELETE_FLOW_DIAGRAM}}
```

---

## ⚡ Performance Considerations

### Caching Strategy

{{#IF CACHING_ENABLED}}
**Cache Type:** {{CACHE_TYPE}}

**What We Cache:**
{{#EACH CACHED_ITEM}}
- {{ITEM_DESCRIPTION}} (TTL: {{TTL}})
{{/EACH}}

**Invalidation:**
{{CACHE_INVALIDATION_STRATEGY}}

{{ELSE}}
No caching implemented yet.
{{/IF}}

### Database Optimization

{{#EACH DB_OPTIMIZATION}}
- {{OPTIMIZATION_DESCRIPTION}}
{{/EACH}}

---

## 🔧 Configuration Management

**Strategy:** {{CONFIG_STRATEGY}}

**Configuration Loaded From:**
{{#EACH CONFIG_SOURCE}}
- {{CONFIG_SOURCE_DESCRIPTION}}
{{/EACH}}

**Per Environment:**
- Development: {{DEV_CONFIG}}
- Staging: {{STAGING_CONFIG}}
- Production: {{PROD_CONFIG}}

---

## 📝 Error Handling Architecture

### Error Hierarchy

```{{LANGUAGE}}
{{ERROR_HIERARCHY_EXAMPLE}}
```

### Error Flow

```
{{ERROR_FLOW_DIAGRAM}}
```

---

## 🧪 Testing Architecture

**Strategy:** See `docs/testing.md`

**Testability Features:**
- Dependency injection enables mocking
- Services isolated from framework
- Repository pattern abstracts database
- DTOs validate at boundaries

---

## 📈 Scalability

### Horizontal Scaling

{{HORIZONTAL_SCALING_STRATEGY}}

### Vertical Scaling

{{VERTICAL_SCALING_STRATEGY}}

### Bottlenecks

{{#EACH BOTTLENECK}}
- **{{BOTTLENECK_NAME}}**: {{MITIGATION_STRATEGY}}
{{/EACH}}

---

## 🚀 Deployment Architecture

See `docs/operations.md` for full deployment details.

**Deployment Model:** {{DEPLOYMENT_MODEL}}

**Infrastructure:** {{INFRASTRUCTURE}}

---

## 📚 Architecture Decision Records (ADRs)

{{#IF ADR_ENABLED}}
Location: `specs/adr/`

{{#EACH ADR}}
- [ADR-{{ADR_NUMBER}}: {{ADR_TITLE}}](../specs/adr/{{ADR_FILE}})
{{/EACH}}

{{ELSE}}
ADRs will be added as significant architectural decisions are made.
{{/IF}}

---

## 🔄 Future Considerations

{{#EACH FUTURE_CONSIDERATION}}
### {{CONSIDERATION_TITLE}}

{{CONSIDERATION_DESCRIPTION}}

**When:** {{CONSIDERATION_TIMELINE}}

{{/EACH}}

---

**Document Version:** 1.0

**Last Updated:** {{GENERATION_DATE}}

**Generated by:** AI Bootstrap v1.0.0
