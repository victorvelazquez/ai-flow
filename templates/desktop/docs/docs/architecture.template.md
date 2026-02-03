# System Architecture

> Technical architecture and design patterns for {{PROJECT_NAME}}

---

## 🏗️ Architecture Pattern

**Pattern:** {{ARCHITECTURE_PATTERN}}

### Why This Pattern?

## {{ARCHITECTURE_RATIONALE}}

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

## {{/EACH}}

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

## {{/IF}}

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

## {{/EACH}}

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

## {{/IF}}

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

### API Gateway

{{#IF API_GATEWAY}}
**Gateway:** {{API_GATEWAY_NAME}}

**Purpose:** {{API_GATEWAY_PURPOSE}}

**Configuration:**

- Rate limiting: {{GATEWAY_RATE_LIMITING}}
- Authentication: {{GATEWAY_AUTHENTICATION}}
- Request routing: {{GATEWAY_ROUTING}}
- Load balancing: {{GATEWAY_LOAD_BALANCING}}

**Routes:**
{{#EACH GATEWAY_ROUTE}}

- **{{ROUTE_PATH}}** → {{TARGET_SERVICE}} ({{ROUTE_METHODS}})
  {{/EACH}}

{{ELSE}}
**API Gateway:** Not used - Direct API access
{{/IF}}

### API Documentation

**Tool:** {{API_DOC_TOOL}}

{{#IF SWAGGER_OPENAPI}}
**Swagger/OpenAPI:**

- Specification: `{{OPENAPI_SPEC_PATH}}`
- UI endpoint: `{{SWAGGER_UI_URL}}`
- Strategy: {{API_DOC_STRATEGY}} ({{#IF CODE_FIRST}}Code-First{{ELSE}}Design-First{{/IF}})

**Auto-generation:** {{#IF AUTO_GENERATE_DOCS}}Enabled{{ELSE}}Manual{{/IF}}

{{#IF AUTO_GENERATE_DOCS}}
**Example:**

```{{LANGUAGE}}
{{API_DOC_EXAMPLE}}
```

{{/IF}}
{{/IF}}

### Endpoint Patterns

{{#IF REST_API}}

#### REST Conventions

| Resource          | Method    | Endpoint                                 | Description |
| ----------------- | --------- | ---------------------------------------- | ----------- |
| {{RESOURCE_NAME}} | GET       | /{{API_VERSION}}/{{RESOURCE_PLURAL}}     | List all    |
| {{RESOURCE_NAME}} | GET       | /{{API_VERSION}}/{{RESOURCE_PLURAL}}/:id | Get one     |
| {{RESOURCE_NAME}} | POST      | /{{API_VERSION}}/{{RESOURCE_PLURAL}}     | Create      |
| {{RESOURCE_NAME}} | PUT/PATCH | /{{API_VERSION}}/{{RESOURCE_PLURAL}}/:id | Update      |
| {{RESOURCE_NAME}} | DELETE    | /{{API_VERSION}}/{{RESOURCE_PLURAL}}/:id | Delete      |

{{/IF}}

{{#IF GRAPHQL}}

#### GraphQL Schema

```graphql
{{GRAPHQL_SCHEMA_EXAMPLE}}
```

## {{/IF}}

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

## ⚙️ Background Processing

{{#IF BACKGROUND_JOBS_ENABLED}}
**Queue System:** {{QUEUE_SYSTEM}}

**Job Types:**
{{#EACH JOB_TYPE}}

### {{JOB_NAME}}

- **Purpose:** {{JOB_PURPOSE}}
- **Trigger:** {{JOB_TRIGGER}}
- **Priority:** {{JOB_PRIORITY}}
- **Retry Strategy:** {{JOB_RETRY_STRATEGY}}
- **Timeout:** {{JOB_TIMEOUT}}

{{/EACH}}

**Dead Letter Queue:** {{#IF DLQ_ENABLED}}Enabled{{ELSE}}Disabled{{/IF}}

**Monitoring:**

- Dashboard: {{QUEUE_DASHBOARD}}
- Alerts: {{QUEUE_ALERTS}}

**Example:**

```{{LANGUAGE}}
{{BACKGROUND_JOB_EXAMPLE}}
```

{{ELSE}}
**Background Processing:** Not implemented - All operations are synchronous
{{/IF}}

---

## 🔌 Real-time Communication

{{#IF REALTIME_ENABLED}}

### WebSockets

**Enabled:** Yes

**Use Cases:**
{{#EACH WEBSOCKET_USE_CASE}}

- {{USE_CASE_DESCRIPTION}}
  {{/EACH}}

**Implementation:**

- Library: {{WEBSOCKET_LIBRARY}}
- Protocol: {{WEBSOCKET_PROTOCOL}}
- Authentication: {{WEBSOCKET_AUTH}}

**Connection Management:**

- Max connections: {{WEBSOCKET_MAX_CONNECTIONS}}
- Heartbeat interval: {{WEBSOCKET_HEARTBEAT}}s
- Reconnection strategy: {{WEBSOCKET_RECONNECTION}}

**Example:**

```{{LANGUAGE}}
{{WEBSOCKET_EXAMPLE}}
```

### Server-Sent Events (SSE)

{{#IF SSE_ENABLED}}
**Enabled:** Yes

**Use Cases:**
{{#EACH SSE_USE_CASE}}

- {{USE_CASE_DESCRIPTION}}
  {{/EACH}}

**Implementation:**

```{{LANGUAGE}}
{{SSE_EXAMPLE}}
```

{{ELSE}}
**Enabled:** No
{{/IF}}

{{ELSE}}
**Real-time Communication:** Not implemented
{{/IF}}

---

## � File Storage

{{#IF FILE_STORAGE_ENABLED}}
**Storage Type:** {{FILE_STORAGE_TYPE}}

**Provider:** {{FILE_STORAGE_PROVIDER}}

**Configuration:**

- Bucket/Container: {{FILE_STORAGE_BUCKET}}
- Region: {{FILE_STORAGE_REGION}}
- CDN: {{FILE_CDN_ENABLED}}

**Allowed File Types:**
{{#EACH ALLOWED_FILE_TYPE}}

- {{FILE_TYPE}} (max: {{MAX_SIZE}})
  {{/EACH}}

**Max File Size:** {{MAX_FILE_SIZE}} MB

**Upload Process:**

1. Client requests presigned URL / upload endpoint
2. File uploaded to {{FILE_STORAGE_PROVIDER}}
3. Metadata stored in database
4. {{#IF FILE_CDN_ENABLED}}CDN URL returned{{ELSE}}Direct URL returned{{/IF}}

**Security:**

- Presigned URLs: {{PRESIGNED_URL_EXPIRY}} expiry
- Access control: {{FILE_ACCESS_CONTROL}}
- Virus scanning: {{VIRUS_SCANNING_ENABLED}}

{{ELSE}}
**File Storage:** Not implemented
{{/IF}}

---

## �📨 Message Broker Patterns

{{#IF MESSAGE_BROKER}}
**Broker:** {{MESSAGE_BROKER_NAME}}

**Patterns Used:**
{{#EACH MESSAGE_PATTERN}}

### {{PATTERN_NAME}}

**Type:** {{PATTERN_TYPE}} ({{#IF PUB_SUB}}Pub/Sub{{ELSE}}Queue{{/IF}})

**Use Case:** {{PATTERN_USE_CASE}}

**Topics/Queues:**
{{#EACH TOPIC_QUEUE}}

- **{{NAME}}**: {{DESCRIPTION}}
  - Producers: {{PRODUCERS}}
  - Consumers: {{CONSUMERS}}
  - Retention: {{RETENTION}}
    {{/EACH}}

**Delivery Guarantees:** {{DELIVERY_GUARANTEES}} ({{#IF AT_LEAST_ONCE}}At-least-once{{ELSE}}{{#IF EXACTLY_ONCE}}Exactly-once{{ELSE}}At-most-once{{/IF}}{{/IF}})

**Implementation:**

```{{LANGUAGE}}
{{PATTERN_EXAMPLE}}
```

{{/EACH}}

**Error Handling:**

- Dead letter queue: {{#IF DLQ_ENABLED}}Enabled{{ELSE}}Disabled{{/IF}}
- Retry strategy: {{RETRY_STRATEGY}}
- Max retries: {{MAX_RETRIES}}

{{ELSE}}
**Message Broker:** Not used
{{/IF}}

---

## 🕸️ Service Mesh

{{#IF SERVICE_MESH}}
**Mesh:** {{SERVICE_MESH_NAME}}

**Purpose:** {{SERVICE_MESH_PURPOSE}}

**Features:**

- Service discovery: {{SERVICE_DISCOVERY}}
- Load balancing: {{MESH_LOAD_BALANCING}}
- Traffic management: {{TRAFFIC_MANAGEMENT}}
- Security: {{MESH_SECURITY}} (mTLS)
- Observability: {{MESH_OBSERVABILITY}}

**Configuration:**

```yaml
{ { SERVICE_MESH_CONFIG_EXAMPLE } }
```

{{ELSE}}
**Service Mesh:** Not used (monolith or simple microservices)
{{/IF}}

---

## 🔐 Security Architecture

### Authentication Flow

```
{{AUTH_FLOW_DIAGRAM}}
```

### Authorization Model

**Type:** {{AUTHORIZATION_MODEL}}

## **Implementation:** See `specs/security.md` for details.

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

## **Infrastructure:** {{INFRASTRUCTURE}}

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

## {{/EACH}}

**Document Version:** 1.0

**Last Updated:** {{GENERATION_DATE}}

**Generated by:** AI Flow v1.0.0
