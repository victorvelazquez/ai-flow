# Security Specifications

> Security policies, authentication, authorization, and compliance for {{PROJECT_NAME}}
---
## 🔐 Authentication

### Method

**Type:** {{AUTH_METHOD}}

{{#IF JWT}}
### JWT Configuration

**Access Token:**
- Algorithm: {{JWT_ALGORITHM}}
- Lifetime: {{ACCESS_TOKEN_LIFETIME}}
- Storage: {{ACCESS_TOKEN_STORAGE}}

**Refresh Token:**
- Lifetime: {{REFRESH_TOKEN_LIFETIME}}
- Storage: {{REFRESH_TOKEN_STORAGE}}
- Rotation: {{REFRESH_TOKEN_ROTATION}}

**Token Claims:**
```json
{
  "sub": "{{TOKEN_CLAIM_SUB}}",
  "email": "{{TOKEN_CLAIM_EMAIL}}",
  "roles": {{TOKEN_CLAIM_ROLES}},
  "iat": 1234567890,
  "exp": 1234571490
}
```

**Example:**
```{{LANGUAGE}}
{{JWT_IMPLEMENTATION_EXAMPLE}}
```
{{/IF}}

{{#IF OAUTH}}
### OAuth 2.0 / OpenID Connect

**Providers:**
{{#EACH OAUTH_PROVIDER}}
- {{PROVIDER_NAME}}
{{/EACH}}

**Flow:** {{OAUTH_FLOW}}

**Scopes:** {{OAUTH_SCOPES}}

{{/IF}}
---
## 🛡️ Authorization

### Model

**Type:** {{AUTHORIZATION_MODEL}}

{{#IF RBAC}}
### Roles

{{#EACH ROLE}}
#### {{ROLE_NAME}}

**Description:** {{ROLE_DESCRIPTION}}

**Permissions:**
{{#EACH PERMISSION}}
- {{PERMISSION_DESCRIPTION}}
{{/EACH}}

{{/EACH}}

### Permission Checking

```{{LANGUAGE}}
{{PERMISSION_CHECK_EXAMPLE}}
```

{{/IF}}

{{#IF ABAC}}
### Attribute-Based Rules

{{#EACH ABAC_RULE}}
- {{RULE_DESCRIPTION}}
{{/EACH}}

{{/IF}}
---
## 🔑 Password Policy

**Requirements:**
- Minimum length: {{PASSWORD_MIN_LENGTH}} characters
- {{#IF PASSWORD_UPPERCASE}}Uppercase letter required{{/IF}}
- {{#IF PASSWORD_LOWERCASE}}Lowercase letter required{{/IF}}
- {{#IF PASSWORD_NUMBER}}Number required{{/IF}}
- {{#IF PASSWORD_SPECIAL}}Special character required{{/IF}}

**Hashing:**
- Algorithm: {{PASSWORD_HASH_ALGORITHM}}
- Rounds/Cost: {{PASSWORD_HASH_ROUNDS}}

**Example:**
```{{LANGUAGE}}
{{PASSWORD_HASHING_EXAMPLE}}
```
---
## 🚦 Rate Limiting

**Strategy:** {{RATE_LIMIT_STRATEGY}}

{{#EACH RATE_LIMIT_RULE}}
### {{ENDPOINT_PATTERN}}

- Limit: {{RATE_LIMIT_COUNT}} requests per {{RATE_LIMIT_WINDOW}}
- Key: {{RATE_LIMIT_KEY}}
- Response: {{RATE_LIMIT_RESPONSE}}

{{/EACH}}

**Implementation:**
```{{LANGUAGE}}
{{RATE_LIMIT_IMPLEMENTATION}}
```
---
## 🌐 CORS Policy

**Allowed Origins:**
{{#EACH CORS_ORIGIN}}
- {{ORIGIN_URL}}
{{/EACH}}

**Allowed Methods:** {{CORS_METHODS}}

**Allowed Headers:** {{CORS_HEADERS}}

**Credentials:** {{CORS_CREDENTIALS}}

**Max Age:** {{CORS_MAX_AGE}} seconds
---
## 🔒 Data Encryption

### In Transit

**Protocol:** TLS {{TLS_VERSION}}+

**Certificate:** {{TLS_CERTIFICATE}}

**HSTS:** {{#IF HSTS}}Enabled (max-age: {{HSTS_MAX_AGE}}){{ELSE}}Disabled{{/IF}}

### At Rest

{{#IF ENCRYPTION_AT_REST}}
**Encrypted Fields:**
{{#EACH ENCRYPTED_FIELD}}
- `{{TABLE_NAME}}.{{FIELD_NAME}}` - {{ENCRYPTION_REASON}}
{{/EACH}}

**Algorithm:** {{ENCRYPTION_ALGORITHM}}

**Key Management:** {{KEY_MANAGEMENT}}

**Example:**
```{{LANGUAGE}}
{{ENCRYPTION_EXAMPLE}}
```

{{ELSE}}
**Status:** Not implemented yet

{{/IF}}
---
## 🛡️ Security Headers

{{#EACH SECURITY_HEADER}}
### {{HEADER_NAME}}

**Value:** `{{HEADER_VALUE}}`

**Purpose:** {{HEADER_PURPOSE}}

{{/EACH}}

**Implementation:**
```{{LANGUAGE}}
{{SECURITY_HEADERS_IMPLEMENTATION}}
```
---
## ✅ Input Validation

**Library:** {{VALIDATION_LIBRARY}}

**Rules:**
- ✅ Validate all user input
- ✅ Whitelist allowed values
- ✅ Sanitize before database queries
- ✅ Use parameterized queries
- ❌ Never trust client data

**Example:**
```{{LANGUAGE}}
{{INPUT_VALIDATION_EXAMPLE}}
```
---
## 🚫 Security Vulnerabilities Prevention

### SQL Injection

```{{LANGUAGE}}
{{SQL_INJECTION_PREVENTION}}
```

### XSS (Cross-Site Scripting)

```{{LANGUAGE}}
{{XSS_PREVENTION}}
```

### CSRF (Cross-Site Request Forgery)

{{CSRF_PREVENTION_STRATEGY}}
---
## 📜 Compliance

{{#EACH COMPLIANCE_REQ}}
### {{COMPLIANCE_NAME}}

**Applicable:** {{IS_APPLICABLE}}

**Requirements:**
{{#EACH REQUIREMENT}}
- {{REQUIREMENT_DESCRIPTION}}
{{/EACH}}

**Implementation:**
{{COMPLIANCE_IMPLEMENTATION}}

{{/EACH}}
---
## 📝 Audit Logging

**What We Log:**
{{#EACH AUDIT_LOG_EVENT}}
- {{EVENT_DESCRIPTION}}
{{/EACH}}

**Retention:** {{AUDIT_LOG_RETENTION}}

**Format:**
```json
{{AUDIT_LOG_FORMAT}}
```
---
## 🔒 Secrets Management

**Tool:** {{SECRETS_MANAGER}}

**Secrets Stored:**
{{#EACH SECRET}}
- {{SECRET_NAME}} - {{SECRET_PURPOSE}}
{{/EACH}}

**Access Policy:** {{SECRETS_ACCESS_POLICY}}

**Rotation:** {{SECRETS_ROTATION}}
---
## 🔑 API Keys Management

{{#IF API_KEYS_ENABLED}}
**Enabled:** Yes

**Use Cases:**
{{#EACH API_KEY_USE_CASE}}
- {{USE_CASE_DESCRIPTION}}
{{/EACH}}

### Key Generation

**Format:** {{API_KEY_FORMAT}}

**Length:** {{API_KEY_LENGTH}} characters

**Prefix:** {{API_KEY_PREFIX}}

**Example:**
```{{LANGUAGE}}
{{API_KEY_GENERATION_EXAMPLE}}
```

### Key Storage

**Location:** {{API_KEY_STORAGE}} ({{#IF HASHED}}Hashed{{ELSE}}Plain text{{/IF}})

**Hashing Algorithm:** {{API_KEY_HASH_ALGORITHM}}

### Key Rotation

**Strategy:** {{API_KEY_ROTATION_STRATEGY}}

**Frequency:** {{API_KEY_ROTATION_FREQUENCY}}

**Process:**
{{#EACH API_KEY_ROTATION_STEP}}
{{STEP_NUMBER}}. {{STEP_DESCRIPTION}}
{{/EACH}}

### Key Revocation

**Revocation Process:**
{{#EACH API_KEY_REVOCATION_STEP}}
{{STEP_NUMBER}}. {{STEP_DESCRIPTION}}
{{/EACH}}

**Revocation Reasons:**
- Compromised key
- Key expiration
- User request
- Security incident

### Rate Limiting by API Key

**Limits:**
{{#EACH API_KEY_RATE_LIMIT}}
- **{{KEY_TIER}}**: {{LIMIT_COUNT}} requests per {{LIMIT_WINDOW}}
{{/EACH}}

{{ELSE}}
**API Keys:** Not used - Authentication via JWT/Sessions only
{{/IF}}
---
## 🔍 Dependency Security

**Scanning Tool:** {{DEPENDENCY_SCANNER}}

**Frequency:** {{SCAN_FREQUENCY}}

**Automated Scanning:** {{#IF AUTO_SCAN}}Enabled{{ELSE}}Manual{{/IF}}

### Vulnerability Management

**Process:**
{{#EACH VULN_MANAGEMENT_STEP}}
{{STEP_NUMBER}}. {{STEP_DESCRIPTION}}
{{/EACH}}

**Severity Levels:**
- **Critical**: Fix within 24 hours
- **High**: Fix within 7 days
- **Medium**: Fix within 30 days
- **Low**: Fix in next release

### Security Audit Commands

```bash
# Check for vulnerabilities
{{SECURITY_AUDIT_COMMAND}}

# Fix automatically fixable issues
{{SECURITY_FIX_COMMAND}}

# Update dependencies
{{DEPENDENCY_UPDATE_COMMAND}}
```

### Dependency Update Policy

- ✅ Review changelogs before updating
- ✅ Test updates in staging first
- ✅ Pin exact versions in production
- ✅ Regular security audits ({{AUDIT_FREQUENCY}})
- ❌ Don't ignore critical vulnerabilities
- ❌ Don't update without testing
---
## 🚨 Security Incident Response

**Contact:** {{SECURITY_CONTACT}}

**Process:**
{{#EACH INCIDENT_STEP}}
{{STEP_NUMBER}}. {{STEP_DESCRIPTION}}
{{/EACH}}
---
**Document Version:** 1.0

**Last Updated:** {{GENERATION_DATE}}

**Generated by:** AI Flow v1.0.0


