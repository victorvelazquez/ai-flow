# Data Model

> Structured view of the entities, relationships, and data contracts that power {{PROJECT_NAME}}

---

## 📘 Overview

**Database Type:** {{DATABASE_TYPE}}

**Primary Storage Layer:** {{DATABASE_PRIMARY_STORAGE}}

**Secondary Storage / Caches:** {{DATABASE_SECONDARY_STORAGE}}

**Data Access Layer:** {{DATA_ACCESS_LAYER}}

## **Data Ownership:** {{DATA_OWNERSHIP}}

## 📊 Entity Catalog

{{#EACH ENTITIES}}

### {{NAME}}

**Purpose:** {{PURPOSE}}

**Table / Collection:** `{{TABLE_NAME}}`

**Primary Key:** {{PRIMARY_KEY}}

**Description:** {{DESCRIPTION}}

#### Attributes

| Field | Type | Nullable | Default | Description |
| ----- | ---- | -------- | ------- | ----------- |

{{#EACH ATTRIBUTES}}
| {{FIELD}} | {{TYPE}} | {{NULLABLE}} | {{DEFAULT}} | {{DESCRIPTION}} |
{{/EACH}}

#### Validation Rules

{{#IF VALIDATION_RULES}}
{{#EACH VALIDATION_RULES}}

- {{RULE_DESCRIPTION}}
  {{/EACH}}
  {{ELSE}}
- No additional validation rules defined.
  {{/IF}}

#### Derived Fields

{{#IF DERIVED_FIELDS}}
| Field | Source | Logic |
|-------|--------|-------|
{{#EACH DERIVED_FIELDS}}
| {{FIELD}} | {{SOURCE}} | {{LOGIC}} |
{{/EACH}}
{{ELSE}}

- No derived fields defined.
  {{/IF}}

---

{{/EACH}}

## 🔗 Relationships & Contracts

### Cardinality Map

{{#EACH RELATIONSHIPS}}

- **{{FROM_ENTITY}} → {{TO_ENTITY}}**: {{TYPE}}
  - Join Condition: `{{JOIN_CONDITION}}`
  - Ownership: {{OWNERSHIP_MODEL}}
  - Cascade Rules: {{CASCADE_RULES}}
    {{/EACH}}

### Integrity Constraints

{{#EACH INTEGRITY_CONSTRAINTS}}

- **{{NAME}}**: {{DESCRIPTION}}
  - Enforced By: {{ENFORCED_BY}}
  - Failure Handling: {{FAILURE_HANDLING}}
    {{/EACH}}

---

## 📇 Database Indexes

### Index Strategy

{{#IF INDEXES_DEFINED}}
{{#EACH INDEX}}

#### {{INDEX_NAME}}

**Table:** `{{TABLE_NAME}}`

**Columns:** {{INDEX_COLUMNS}}

**Type:** {{INDEX_TYPE}} ({{#IF UNIQUE}}Unique{{ELSE}}Non-unique{{/IF}})

**Purpose:** {{INDEX_PURPOSE}}

**Query Patterns:** {{INDEX_QUERY_PATTERNS}}

{{/EACH}}

{{ELSE}}

- No indexes explicitly defined yet. Indexes will be created based on query patterns and foreign keys.
  {{/IF}}

### Index Guidelines

- ✅ Index all foreign keys
- ✅ Index frequently queried columns
- ✅ Index columns used in WHERE, JOIN, ORDER BY clauses
- ✅ Consider composite indexes for multi-column queries
- ❌ Don't over-index (each index slows writes)
- ❌ Don't index low-cardinality columns (unless frequently filtered)

---

## 🔄 Transaction Management

### Transaction Isolation Level

**Default Level:** {{TRANSACTION_ISOLATION_LEVEL}}

**Supported Levels:**
{{#EACH ISOLATION_LEVEL}}

- **{{LEVEL_NAME}}**: {{LEVEL_DESCRIPTION}}
  {{/EACH}}

### Transaction Strategy

**When to use transactions:**

- ✅ Multi-step operations that must succeed or fail together
- ✅ Updates affecting multiple tables
- ✅ Operations requiring consistency guarantees
- ❌ Single-row operations (usually handled by database)

**Transaction Patterns:**

{{#IF TRANSACTION_PATTERNS}}
{{#EACH TRANSACTION_PATTERN}}

#### {{PATTERN_NAME}}

**Use Case:** {{PATTERN_USE_CASE}}

**Implementation:**

```{{LANGUAGE}}
{{PATTERN_EXAMPLE}}
```

**Consistency Guarantees:** {{CONSISTENCY_GUARANTEES}}

{{/EACH}}
{{ELSE}}

- Transaction patterns to be defined based on business requirements.
  {{/IF}}

### Transaction Boundaries (Atomic Operations)

{{#IF TRANSACTION_BOUNDARIES}}
{{#EACH TRANSACTION_BOUNDARY}}

#### {{OPERATION_NAME}}

**Description:** {{DESCRIPTION}}

**Steps (all or nothing):**
{{#EACH STEP}}
{{STEP_NUMBER}}. {{STEP_DESCRIPTION}} {{#IF IN_TRANSACTION}}✅ In transaction{{ELSE}}⚡ Outside (async){{/IF}}
{{/EACH}}

**Rollback Trigger:** {{ROLLBACK_TRIGGER}}

**Compensating Actions:** {{COMPENSATING_ACTIONS}}

{{/EACH}}
{{ELSE}}

- No explicit transaction boundaries defined. Individual operations are atomic by default.
  {{/IF}}

### Consistency Model

**Consistency Strategy:** {{CONSISTENCY_STRATEGY}}

{{#IF EVENTUAL_CONSISTENCY}}
**Eventual Consistency:**

- Acceptable delay: {{CONSISTENCY_DELAY}}
- Replication lag tolerance: {{REPLICATION_LAG}}
- Conflict resolution: {{CONFLICT_RESOLUTION}}
  {{/IF}}

{{#IF STRONG_CONSISTENCY}}
**Strong Consistency:**

- All reads see latest writes
- Synchronous replication required
- Higher latency, lower throughput
  {{/IF}}

---

## 🔧 Schema Migrations

### Migration Tool

**Tool:** {{MIGRATION_TOOL}}

{{#IF PRISMA_MIGRATE}}
**Prisma Migrate:**

- Location: `prisma/migrations/`
- Generate migration: `npx prisma migrate dev --name migration_name`
- Apply migration: `npx prisma migrate deploy`
  {{/IF}}

{{#IF TYPEORM_MIGRATIONS}}
**TypeORM Migrations:**

- Location: `src/migrations/`
- Generate migration: `npm run migration:generate -- -n MigrationName`
- Run migration: `npm run migration:run`
- Revert migration: `npm run migration:revert`
  {{/IF}}

{{#IF ALEMBIC}}
**Alembic (Python):**

- Location: `alembic/versions/`
- Generate migration: `alembic revision --autogenerate -m "migration_name"`
- Apply migration: `alembic upgrade head`
- Rollback: `alembic downgrade -1`
  {{/IF}}

### Migration Strategy

**Versioning:** {{MIGRATION_VERSIONING}}

**Rollback Strategy:** {{MIGRATION_ROLLBACK_STRATEGY}}

**Zero-Downtime Migrations:** {{#IF ZERO_DOWNTIME_MIGRATIONS}}Yes{{ELSE}}No{{/IF}}

{{#IF ZERO_DOWNTIME_MIGRATIONS}}
**Zero-Downtime Approach:**
{{#EACH ZERO_DOWNTIME_STEP}}
{{STEP_NUMBER}}. {{STEP_DESCRIPTION}}
{{/EACH}}
{{/IF}}

### Migration Guidelines

- ✅ Always review generated migrations before applying
- ✅ Test migrations on staging before production
- ✅ Keep migrations small and focused
- ✅ Never edit applied migrations (create new ones)
- ✅ Document breaking changes
- ❌ Don't run migrations manually in production
- ❌ Don't mix data migrations with schema migrations

### Migration History

{{#IF MIGRATION_HISTORY}}
| Version | Description | Applied | Rollback Available |
|---------|-------------|---------|-------------------|
{{#EACH MIGRATION}}
| {{VERSION}} | {{DESCRIPTION}} | {{APPLIED_DATE}} | {{#IF ROLLBACK_AVAILABLE}}Yes{{ELSE}}No{{/IF}} |
{{/EACH}}
{{ELSE}}

- Migration history will be tracked by the migration tool.
  {{/IF}}

---

## 🧩 Domain Logic & Aggregates

### Aggregate Roots

{{#EACH AGGREGATE_ROOTS}}

#### {{NAME}}

**Bounded Context:** {{CONTEXT}}

**Responsibilities:** {{RESPONSIBILITIES}}

**Entities Included:** {{ENTITIES_INCLUDED}}

**Consistency Rules:** {{CONSISTENCY_RULES}}

{{/EACH}}

### Domain Events

{{#IF DOMAIN_EVENTS}}
| Event | Trigger | Payload | Consumers |
|-------|---------|---------|-----------|
{{#EACH DOMAIN_EVENTS}}
| {{NAME}} | {{TRIGGER}} | {{PAYLOAD}} | {{CONSUMERS}} |
{{/EACH}}
{{ELSE}}

- No domain events defined.
  {{/IF}}

---

## �️ Soft Delete & Data Lifecycle

### Deletion Strategy

**Soft Delete Field:** `{{SOFT_DELETE_FIELD}}` ({{SOFT_DELETE_TYPE}})

**Default Query Behavior:** {{SOFT_DELETE_QUERY_DEFAULT}}

### Entity Deletion Rules

| Entity | Delete Type | Field | Cleanup Policy |
| ------ | ----------- | ----- | -------------- |

{{#EACH ENTITY_DELETE_RULE}}
| {{ENTITY}} | {{DELETE_TYPE}} | {{FIELD}} | {{CLEANUP_POLICY}} |
{{/EACH}}

### Permanent Cleanup Schedule

**Policy:** {{CLEANUP_POLICY}}
**Schedule:** {{CLEANUP_SCHEDULE}}
**Retention Period:** {{RETENTION_DAYS}} days

### Cascade Delete Behavior

{{#EACH CASCADE_DELETE}}

- **{{PARENT_ENTITY}}** → **{{CHILD_ENTITY}}**: {{BEHAVIOR}}
  {{/EACH}}

---

## 🔄 State Machines

{{#IF STATE_MACHINES}}
{{#EACH STATE_MACHINE}}

### {{ENTITY_NAME}} State Machine

**States:** {{STATES}}

**Initial State:** {{INITIAL_STATE}}

**Terminal States:** {{TERMINAL_STATES}}

```mermaid
stateDiagram-v2
    {{STATE_DIAGRAM}}
```

#### Valid Transitions

| From | To  | Action | Guards | Side Effects |
| ---- | --- | ------ | ------ | ------------ |

{{#EACH TRANSITION}}
| {{FROM}} | {{TO}} | {{ACTION}} | {{GUARDS}} | {{SIDE_EFFECTS}} |
{{/EACH}}

#### Invalid Transitions (Explicitly Forbidden)

{{#EACH INVALID_TRANSITION}}

- `{{FROM}}` → `{{TO}}`: {{REASON}}
  {{/EACH}}

{{/EACH}}
{{ELSE}}

- No state machines defined. Entities use simple status fields without formal transition rules.
  {{/IF}}

---

## �📦 Serialization Contracts

### API Representations

{{#EACH API_CONTRACTS}}

#### {{NAME}}

**Endpoint:** `{{ENDPOINT}}`

**Method:** {{METHOD}}

**Request Schema:**

```json
{{REQUEST_SCHEMA}}
```

**Response Schema:**

```json
{{RESPONSE_SCHEMA}}
```

## **Notes:** {{NOTES}}

{{/EACH}}

### Message Queue Payloads

{{#IF MESSAGE_PAYLOADS}}
{{#EACH MESSAGE_PAYLOADS}}

- **{{TOPIC}}**
  - Producer: {{PRODUCER}}
  - Consumers: {{CONSUMERS}}
  - Schema:
    `json
{{SCHEMA}}
`
    {{/EACH}}
    {{ELSE}}
- No asynchronous payloads defined.
  {{/IF}}

---

## 🗂️ Reference Data & Seed Values

{{#IF REFERENCE_DATA}}
| Name | Source | Format | Refresh Strategy |
|------|--------|--------|------------------|
{{#EACH REFERENCE_DATA}}
| {{NAME}} | {{SOURCE}} | {{FORMAT}} | {{REFRESH_STRATEGY}} |
{{/EACH}}
{{ELSE}}

- No reference datasets recorded.
  {{/IF}}

---

## 🔐 Data Governance

**Data Sensitivity Classification:** {{DATA_SENSITIVITY}}

**PII Handling:** {{PII_HANDLING}}

**Audit Strategy:** {{AUDIT_STRATEGY}}

**Retention Policy:** {{RETENTION_POLICY}}

## **Compliance Scope:** {{COMPLIANCE_SCOPE}}

## 🧪 Testing & Quality Gates

### Test Coverage by Entity

{{#IF TEST_COVERAGE}}
| Entity | Unit Tests | Integration Tests | Notes |
|--------|------------|-------------------|-------|
{{#EACH TEST_COVERAGE}}
| {{ENTITY}} | {{UNIT_TESTS}} | {{INTEGRATION_TESTS}} | {{NOTES}} |
{{/EACH}}
{{ELSE}}

- Test coverage not yet documented.
  {{/IF}}

### Fixtures & Factories

{{#IF FIXTURE_DETAILS}}

- Location: `{{FIXTURE_LOCATION}}`
- Generation Tooling: {{GENERATION_TOOLING}}
- TTL / Reset Strategy: {{RESET_STRATEGY}}
  {{ELSE}}
- Fixtures and factories to be defined.
  {{/IF}}

---

## 🚀 Future Enhancements

{{#IF ROADMAP_ITEMS}}
{{#EACH ROADMAP_ITEMS}}

- **{{TITLE}}**: {{DESCRIPTION}}
  - Priority: {{PRIORITY}}
  - Target Release: {{TARGET_RELEASE}}
    {{/EACH}}
    {{ELSE}}
- No future enhancements planned yet.
  {{/IF}}

---

**Document Version:** 1.0

**Last Updated:** {{GENERATION_DATE}}

**Generated by:** AI Flow v1.0.0
