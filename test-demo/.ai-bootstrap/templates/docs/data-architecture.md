# Data Architecture

> Database schema, entities, and data patterns for {{PROJECT_NAME}}

---

## 💾 Database Overview

**Type:** {{DATABASE_TYPE}}

**Version:** {{DATABASE_VERSION}}

**ORM:** {{ORM}}

**Migration Tool:** {{MIGRATION_TOOL}}

---

## 🗄️ Database Schema

### Entity Relationship Diagram

```
{{ERD_DIAGRAM}}
```

---

## 📋 Core Entities

{{#EACH ENTITY}}
### {{ENTITY_NAME}}

**Purpose:** {{ENTITY_PURPOSE}}

**Table Name:** `{{TABLE_NAME}}`

#### Schema

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
{{#EACH COLUMN}}
| {{COLUMN_NAME}} | {{COLUMN_TYPE}} | {{COLUMN_CONSTRAINTS}} | {{COLUMN_DESCRIPTION}} |
{{/EACH}}

#### Indexes

{{#EACH INDEX}}
- **{{INDEX_NAME}}**: `{{INDEX_COLUMNS}}` ({{INDEX_TYPE}})
{{/EACH}}

#### Relationships

{{#EACH RELATIONSHIP}}
- {{RELATIONSHIP_TYPE}} with **{{RELATED_ENTITY}}** via `{{FOREIGN_KEY}}`
  - {{RELATIONSHIP_DESCRIPTION}}
{{/EACH}}

#### Example

```{{LANGUAGE}}
{{ENTITY_CODE_EXAMPLE}}
```

---

{{/EACH}}

---

## 🔗 Relationships

### Summary

{{#EACH RELATIONSHIP_SUMMARY}}
- **{{ENTITY_A}}** → **{{ENTITY_B}}**: {{RELATIONSHIP_TYPE}}
  - {{RELATIONSHIP_DESCRIPTION}}
{{/EACH}}

### One-to-Many Relationships

{{#EACH ONE_TO_MANY}}
#### {{PARENT_ENTITY}} → {{CHILD_ENTITY}}

**Description:** {{RELATIONSHIP_DESCRIPTION}}

**Foreign Key:** `{{FOREIGN_KEY_COLUMN}}` in `{{CHILD_TABLE}}`

**Cascade:** {{CASCADE_BEHAVIOR}}

**Example:**
```sql
{{SQL_EXAMPLE}}
```

{{/EACH}}

### Many-to-Many Relationships

{{#EACH MANY_TO_MANY}}
#### {{ENTITY_A}} ↔ {{ENTITY_B}}

**Description:** {{RELATIONSHIP_DESCRIPTION}}

**Junction Table:** `{{JUNCTION_TABLE}}`

**Schema:**
```sql
{{JUNCTION_TABLE_SCHEMA}}
```

**Example:**
```{{LANGUAGE}}
{{CODE_EXAMPLE}}
```

{{/EACH}}

---

## 📊 Data Patterns

{{#EACH DATA_PATTERN}}
### {{PATTERN_NAME}}

**Purpose:** {{PATTERN_PURPOSE}}

**Entities Using This:** {{ENTITIES_USING}}

**Implementation:**
{{PATTERN_IMPLEMENTATION_DESCRIPTION}}

{{#IF PATTERN_CODE_EXAMPLE}}
**Example:**
```{{LANGUAGE}}
{{PATTERN_CODE_EXAMPLE}}
```
{{/IF}}

{{/EACH}}

---

## 🕐 Temporal Patterns

{{#IF SOFT_DELETES}}
### Soft Deletes

**Enabled:** Yes

**Implementation:**
- All entities include `deleted_at` timestamp column
- `deleted_at` is NULL for active records
- Queries automatically filter out soft-deleted records

**Example:**
```{{LANGUAGE}}
{{SOFT_DELETE_EXAMPLE}}
```

{{/IF}}

{{#IF AUDIT_TRAIL}}
### Audit Trail

**Enabled:** Yes

**Tracked Fields:**
- `created_at` - Record creation timestamp
- `created_by` - User who created (ID)
- `updated_at` - Last modification timestamp
- `updated_by` - User who last modified (ID)

**Implementation:**
{{AUDIT_IMPLEMENTATION}}

{{/IF}}

{{#IF VERSIONING}}
### Versioning

**Strategy:** {{VERSIONING_STRATEGY}}

**Implementation:** {{VERSIONING_IMPLEMENTATION}}

{{/IF}}

---

## 🌍 Multi-Tenancy

{{#IF MULTI_TENANT}}
**Enabled:** Yes

**Strategy:** {{MULTI_TENANT_STRATEGY}}

**Implementation:**
{{MULTI_TENANT_IMPLEMENTATION}}

**Tenant Isolation:**
{{TENANT_ISOLATION_DESCRIPTION}}

**Example:**
```{{LANGUAGE}}
{{MULTI_TENANT_EXAMPLE}}
```

{{ELSE}}
**Enabled:** No - Single tenant application

{{/IF}}

---

## 🔍 Indexes

### Index Strategy

{{INDEX_STRATEGY_DESCRIPTION}}

### Important Indexes

{{#EACH IMPORTANT_INDEX}}
#### {{INDEX_NAME}}

**Table:** `{{TABLE_NAME}}`

**Columns:** `{{INDEX_COLUMNS}}`

**Type:** {{INDEX_TYPE}}

**Purpose:** {{INDEX_PURPOSE}}

**Created By:**
```sql
{{INDEX_SQL}}
```

{{/EACH}}

---

## 📏 Data Constraints

### Unique Constraints

{{#EACH UNIQUE_CONSTRAINT}}
- **{{TABLE_NAME}}.{{COLUMN_NAME}}** - {{CONSTRAINT_REASON}}
{{/EACH}}

### Check Constraints

{{#EACH CHECK_CONSTRAINT}}
- **{{TABLE_NAME}}.{{CONSTRAINT_NAME}}** - {{CONSTRAINT_DESCRIPTION}}
  ```sql
  {{CONSTRAINT_SQL}}
  ```
{{/EACH}}

### Foreign Key Constraints

{{#EACH FK_CONSTRAINT}}
- **{{TABLE_NAME}}.{{FK_COLUMN}}** → **{{REFERENCE_TABLE}}.{{REFERENCE_COLUMN}}**
  - On Delete: {{ON_DELETE_ACTION}}
  - On Update: {{ON_UPDATE_ACTION}}
{{/EACH}}

---

## 📦 Data Volume Estimates

| Entity | Year 1 Estimate | Growth Rate | Notes |
|--------|-----------------|-------------|-------|
{{#EACH VOLUME_ESTIMATE}}
| {{ENTITY_NAME}} | {{YEAR_1_ESTIMATE}} | {{GROWTH_RATE}}/month | {{NOTES}} |
{{/EACH}}

**Total Storage Estimate (Year 1):** {{TOTAL_STORAGE_ESTIMATE}} GB

---

## 🗂️ Data Retention

{{#EACH RETENTION_POLICY}}
### {{ENTITY_NAME}}

**Policy:** {{RETENTION_POLICY}}

**Retention Period:** {{RETENTION_PERIOD}}

**Archival Strategy:** {{ARCHIVAL_STRATEGY}}

**Compliance:** {{COMPLIANCE_REQUIREMENT}}

{{/EACH}}

---

## 🔄 Data Migration

{{#IF MIGRATION_NEEDED}}
### Migration Strategy

**Source System:** {{SOURCE_SYSTEM}}

**Data Volume:** {{MIGRATION_VOLUME}}

**Approach:** {{MIGRATION_APPROACH}}

**Steps:**
{{#EACH MIGRATION_STEP}}
{{STEP_NUMBER}}. {{STEP_DESCRIPTION}}
{{/EACH}}

**Timeline:** {{MIGRATION_TIMELINE}}

{{ELSE}}
**No data migration needed** - This is a new system.

{{/IF}}

---

## 🔐 Data Security

### Encryption at Rest

{{#IF ENCRYPTION_AT_REST}}
**Enabled:** Yes

**Encrypted Fields:**
{{#EACH ENCRYPTED_FIELD}}
- `{{TABLE_NAME}}.{{FIELD_NAME}}` - {{ENCRYPTION_REASON}}
{{/EACH}}

**Encryption Method:** {{ENCRYPTION_METHOD}}

**Key Management:** {{KEY_MANAGEMENT_STRATEGY}}

{{ELSE}}
**Enabled:** No

**Reasoning:** {{NO_ENCRYPTION_REASONING}}

{{/IF}}

### Data Classification

{{#EACH DATA_CLASSIFICATION}}
#### {{CLASSIFICATION_LEVEL}}

**Fields:**
{{#EACH FIELD}}
- `{{TABLE_NAME}}.{{FIELD_NAME}}`
{{/EACH}}

**Handling Requirements:**
{{#EACH REQUIREMENT}}
- {{REQUIREMENT_DESCRIPTION}}
{{/EACH}}

{{/EACH}}

---

## 🎭 Data Patterns

{{#IF POLYMORPHIC}}
### Polymorphic Relationships

{{#EACH POLYMORPHIC_RELATION}}
#### {{POLYMORPHIC_NAME}}

**Description:** {{DESCRIPTION}}

**Implementation:**
```{{LANGUAGE}}
{{IMPLEMENTATION_EXAMPLE}}
```

{{/EACH}}

{{/IF}}

{{#IF SELF_REFERENTIAL}}
### Self-Referential Relationships

{{#EACH SELF_REFERENTIAL}}
#### {{ENTITY_NAME}}

**Use Case:** {{USE_CASE}}

**Example:** {{EXAMPLE_DESCRIPTION}}

**Implementation:**
```{{LANGUAGE}}
{{IMPLEMENTATION}}
```

{{/EACH}}

{{/IF}}

---

## 📊 Denormalization

{{#IF DENORMALIZATION}}
### Denormalized Data

**Why:** {{DENORMALIZATION_REASON}}

{{#EACH DENORMALIZED_FIELD}}
#### {{FIELD_NAME}} in {{TABLE_NAME}}

**Source:** Calculated from {{SOURCE_DESCRIPTION}}

**Update Strategy:** {{UPDATE_STRATEGY}}

**Trade-off:** {{TRADEOFF_DESCRIPTION}}

{{/EACH}}

{{ELSE}}
**Strategy:** Fully normalized (3NF) - No denormalization yet

{{/IF}}

---

## 🗄️ Partitioning

{{#IF PARTITIONING}}
### Partition Strategy

**Method:** {{PARTITION_METHOD}}

{{#EACH PARTITIONED_TABLE}}
#### {{TABLE_NAME}}

**Partition Key:** {{PARTITION_KEY}}

**Reason:** {{PARTITION_REASON}}

**Example:**
```sql
{{PARTITION_SQL}}
```

{{/EACH}}

{{ELSE}}
**No partitioning** - Table sizes don't require it yet

{{/IF}}

---

## 🔎 Query Patterns

### Common Queries

{{#EACH COMMON_QUERY}}
#### {{QUERY_NAME}}

**Description:** {{QUERY_DESCRIPTION}}

**Frequency:** {{QUERY_FREQUENCY}}

**Performance:** {{QUERY_PERFORMANCE}}

**SQL:**
```sql
{{QUERY_SQL}}
```

**Optimizations:**
{{#EACH OPTIMIZATION}}
- {{OPTIMIZATION_DESCRIPTION}}
{{/EACH}}

{{/EACH}}

---

## 🧪 Test Data Strategy

**Approach:** {{TEST_DATA_STRATEGY}}

{{#IF FACTORIES}}
### Factories

```{{LANGUAGE}}
{{FACTORY_EXAMPLE}}
```

{{/IF}}

{{#IF FIXTURES}}
### Fixtures

Location: `{{FIXTURES_LOCATION}}`

**Usage:**
```{{LANGUAGE}}
{{FIXTURE_USAGE_EXAMPLE}}
```

{{/IF}}

---

## 🔄 Database Migrations

**Tool:** {{MIGRATION_TOOL}}

**Location:** `{{MIGRATIONS_DIRECTORY}}`

### Migration Workflow

```bash
# Create migration
{{CREATE_MIGRATION_COMMAND}}

# Run migrations
{{RUN_MIGRATIONS_COMMAND}}

# Rollback migration
{{ROLLBACK_MIGRATION_COMMAND}}

# Check status
{{MIGRATION_STATUS_COMMAND}}
```

### Migration Rules

- ✅ Always test migrations on staging first
- ✅ Include both up and down migrations
- ✅ Never edit existing migrations in production
- ✅ Backup database before major migrations
- ❌ Never delete columns without data migration path
- ❌ Never change column types without careful planning

---

## 📚 Database Seeding

{{#IF SEEDING}}
**Seed File:** `{{SEED_FILE_LOCATION}}`

**Purpose:** {{SEED_PURPOSE}}

**Usage:**
```bash
{{SEED_COMMAND}}
```

**Seed Data Includes:**
{{#EACH SEED_DATA}}
- {{SEED_DATA_DESCRIPTION}}
{{/EACH}}

{{ELSE}}
No seeding configured yet.

{{/IF}}

---

## 🔧 Database Configuration

### Connection Pool

```{{LANGUAGE}}
{{CONNECTION_POOL_CONFIG}}
```

### Query Logging

**Enabled in:** {{QUERY_LOGGING_ENVIRONMENTS}}

**Log Level:** {{QUERY_LOG_LEVEL}}

---

## 📋 Backup Strategy

See `docs/operations.md` for full backup procedures.

**Frequency:** {{BACKUP_FREQUENCY}}

**Retention:** {{BACKUP_RETENTION}}

**Method:** {{BACKUP_METHOD}}

---

## 🚀 Performance Optimization

### Implemented Optimizations

{{#EACH OPTIMIZATION}}
- **{{OPTIMIZATION_NAME}}**: {{OPTIMIZATION_DESCRIPTION}}
{{/EACH}}

### Future Optimizations

{{#EACH FUTURE_OPTIMIZATION}}
- **{{OPTIMIZATION_NAME}}**: {{OPTIMIZATION_PLAN}}
  - When: {{OPTIMIZATION_TIMELINE}}
{{/EACH}}

---

**Document Version:** 1.0

**Last Updated:** {{GENERATION_DATE}}

**Generated by:** AI Bootstrap v1.0.0
