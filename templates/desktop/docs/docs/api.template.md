# API Reference & Conventions

> API standards, endpoint catalogue, and integration rules for {{PROJECT_NAME}}

---

## 🚀 Overview

**API Style:** {{API_STYLE}}

**Primary Audience:** {{API_AUDIENCE}}

**Base URL(s):**
{{#EACH API_BASE_URL}}

- {{ENVIRONMENT}}: `{{URL}}`
  {{/EACH}}

**Versioning Strategy:** {{API_VERSIONING_STRATEGY}}

## **Default Content Type:** `{{DEFAULT_CONTENT_TYPE}}`

## 🔐 Authentication & Authorization

### Authentication Method

**Mechanism:** {{AUTH_MECHANISM}}

**Token/Session Flow:**

```
{{AUTH_FLOW_DIAGRAM}}
```

**Token Structure:**

```json
{{AUTH_TOKEN_EXAMPLE}}
```

### Authorization Model

**Model:** {{AUTHORIZATION_MODEL}}

**Roles:** {{AUTH_ROLES}}

**Role Matrix:**
| Operation | Roles |
|-----------|-------|
{{#EACH AUTH_MATRIX_ROW}}
| {{OPERATION}} | {{ROLES_ALLOWED}} |
{{/EACH}}

---

## 📦 Request Conventions

### Headers

| Header | Required | Description |
| ------ | -------- | ----------- |

{{#EACH REQUEST_HEADER}}
| `{{HEADER_NAME}}` | {{IS_REQUIRED}} | {{HEADER_DESCRIPTION}} |
{{/EACH}}

### Query Parameters

- Pagination: {{PAGINATION_SCHEME}}
- Filters: {{FILTER_DESCRIPTION}}
- Sorting: {{SORTING_DESCRIPTION}}
- Includes/Expansions: {{INCLUDE_DESCRIPTION}}

### Request Format

```json
{{REQUEST_BODY_EXAMPLE}}
```

### Validation Rules

{{#EACH VALIDATION_RULE}}

- {{RULE_DESCRIPTION}}
  {{/EACH}}

---

## 📤 Response Conventions

```json
{{RESPONSE_BODY_EXAMPLE}}
```

### Envelope Structure

| Field | Description |
| ----- | ----------- |

{{#EACH RESPONSE_FIELD}}
| `{{FIELD_NAME}}` | {{FIELD_DESCRIPTION}} |
{{/EACH}}

### Pagination Envelope

```json
{{PAGINATION_RESPONSE_EXAMPLE}}
```

---

## ❗ Error Handling

```json
{{ERROR_RESPONSE_EXAMPLE}}
```

### Error Codes Catalog

| Code | HTTP | Message | Resolution |
| ---- | ---- | ------- | ---------- |

{{#EACH ERROR_CODE}}
| `{{CODE}}` | {{HTTP_STATUS}} | {{MESSAGE}} | {{RESOLUTION}} |
{{/EACH}}

### Error Categories

| Category       | Code Range     | Description                         |
| -------------- | -------------- | ----------------------------------- |
| Validation     | `VALIDATION_*` | Input validation failures           |
| Authentication | `AUTH_*`       | Authentication/authorization errors |
| Resource       | `RESOURCE_*`   | Resource not found, conflict errors |
| Business       | `BIZ_*`        | Business rule violations            |
| System         | `SYS_*`        | Internal system errors              |

**Retry Policy:** {{RETRY_POLICY}}

**Idempotency:** {{IDEMPOTENCY_POLICY}}

### Idempotency Keys

**Header:** `{{IDEMPOTENCY_HEADER}}`
**Storage:** {{IDEMPOTENCY_STORAGE}}
**TTL:** {{IDEMPOTENCY_TTL}}

**Endpoints requiring idempotency:**
{{#EACH IDEMPOTENT_ENDPOINT}}

- `{{METHOD}} {{PATH}}` - {{DESCRIPTION}}
  {{/EACH}}

---

## 📐 Validation Rules Catalog

### Global Field Validation

| Field Type | Rules | Error Message |
| ---------- | ----- | ------------- |

{{#EACH VALIDATION_FIELD_TYPE}}
| `{{TYPE}}` | {{RULES}} | {{ERROR_MESSAGE}} |
{{/EACH}}

### Entity-Specific Validation

{{#EACH ENTITY_VALIDATION}}

#### {{ENTITY_NAME}}

| Field | Rules | Required |
| ----- | ----- | -------- |

{{#EACH FIELD}}
| `{{NAME}}` | {{RULES}} | {{REQUIRED}} |
{{/EACH}}
{{/EACH}}

---

## 📚 Resource Catalogue

{{#EACH RESOURCE}}

### {{RESOURCE_NAME}}

**Base Path:** `{{RESOURCE_BASE_PATH}}`

**Description:** {{RESOURCE_DESCRIPTION}}

#### Standard Endpoints

| Method | Path | Auth | Description |
| ------ | ---- | ---- | ----------- |

{{#EACH RESOURCE_ENDPOINT}}
| {{METHOD}} | `{{PATH}}` | {{AUTH_REQUIRED}} | {{ENDPOINT_DESCRIPTION}} |
{{/EACH}}

#### Request Examples

```{{REQUEST_FORMAT}}
{{RESOURCE_REQUEST_EXAMPLE}}
```

#### Response Example

```json
{{RESOURCE_RESPONSE_EXAMPLE}}
```

#### Business Rules

{{#EACH RESOURCE_RULE}}

- {{RULE_DESCRIPTION}}
  {{/EACH}}

#### Related Entities

{{#EACH RESOURCE_RELATION}}

- {{RELATION_DESCRIPTION}}
  {{/EACH}}

---

{{/EACH}}

## ⚙️ Custom Endpoints & Actions

{{#EACH CUSTOM_ENDPOINT}}

### {{ENDPOINT_NAME}}

- **Method:** {{METHOD}}
- **URL:** `{{URL}}`
- **Purpose:** {{PURPOSE}}
- **Request Schema:**

```json
{{REQUEST_SCHEMA}}
```

- **Response Schema:**

```json
{{RESPONSE_SCHEMA}}
```

- **Special Considerations:** {{CONSIDERATIONS}}

---

{{/EACH}}

## 📈 Rate Limiting

- **Strategy:** {{RATE_LIMIT_STRATEGY}}
- **Limits:**
  {{#EACH RATE_LIMIT}}
  - {{LIMIT_SCOPE}}: {{LIMIT_VALUE}} requests per {{LIMIT_WINDOW}}
    {{/EACH}}
- **Headers:** `{{RATE_LIMIT_HEADERS}}`

---

## 🧪 Testing & Mocking

- **Sandbox URL:** {{SANDBOX_URL}}
- **Mock Strategy:** {{MOCK_STRATEGY}}
- **Contract Tests:** {{CONTRACT_TESTS_STATUS}}

```yaml
{ { OPENAPI_SNIPPET } }
```

---

## 📋 Change Management

- **Versioning Policy:** {{CHANGE_VERSIONING_POLICY}}
- **Deprecation Policy:** {{DEPRECATION_POLICY}}
- **Changelog Location:** {{CHANGELOG_LOCATION}}
- **Consumer Notification:** {{CONSUMER_NOTIFICATION}}

---

## 🛡️ Security Requirements

- **Transport:** {{TRANSPORT_SECURITY}}
- **Data Protection:** {{DATA_PROTECTION_REQUIREMENTS}}
- **Audit Logging:** {{AUDIT_LOGGING_REQUIREMENTS}}
- **Compliance References:** {{COMPLIANCE_REFERENCES}}

---

## 🔧 Tooling & Integration Guides

{{#EACH SDK}}

### {{SDK_NAME}} SDK

- **Language:** {{SDK_LANGUAGE}}
- **Package:** `{{SDK_PACKAGE}}`
- **Installation:** `{{SDK_INSTALL_COMMAND}}`
- **Usage Example:**

```{{SDK_LANGUAGE}}
{{SDK_USAGE_EXAMPLE}}
```

## {{/EACH}}

**Document Version:** 1.0

**Last Updated:** {{GENERATION_DATE}}

**Generated by:** AI Flow v1.0.0
