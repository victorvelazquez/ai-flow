# Configuration Specifications

> Environment variables and configuration management for {{PROJECT_NAME}} (Full Stack)

---

## 🎯 Configuration Strategy

**Approach:** {{CONFIGURATION_APPROACH}}

**Key Principles:**
1. **Separation of Concerns** - Backend vs Frontend config
2. **Security First** - Never expose secrets to client
3. **Type Safety** - Validate and type all config
4. **Environment Parity** - Consistent config across environments

---

## 📁 Configuration Files Structure

```
{{PROJECT_NAME}}/
├── backend/
│   ├── .env.local              # Local overrides (gitignored)
│   ├── .env.development        # Development defaults
│   ├── .env.production          # Production defaults
│   └── .env.example            # Template for new developers
├── frontend/
│   ├── .env.local              # Local overrides (gitignored)
│   ├── .env.development        # Development defaults
│   ├── .env.production          # Production defaults
│   ├── .env.example            # Template for new developers
│   └── src/
│       └── config/
│           ├── index.ts        # Configuration loader
│           ├── schema.ts       # Validation schema
│           └── constants.ts    # Static constants
```

---

## 🔐 Backend Environment Variables

### Required Variables

{{#EACH BACKEND_REQUIRED_VAR}}
#### `{{VAR_NAME}}`

**Description:** {{VAR_DESCRIPTION}}

**Type:** {{VAR_TYPE}}

**Example:** `{{VAR_EXAMPLE}}`

{{#IF VAR_VALIDATION}}**Validation:** {{VAR_VALIDATION}}{{/IF}}

{{/EACH}}

### Optional Variables

{{#EACH BACKEND_OPTIONAL_VAR}}
#### `{{VAR_NAME}}`

**Description:** {{VAR_DESCRIPTION}}

**Type:** {{VAR_TYPE}}

**Default:** `{{VAR_DEFAULT}}`

**Example:** `{{VAR_EXAMPLE}}`

{{/EACH}}

---

## 🎨 Frontend Environment Variables

### Required Variables

**Format:** `VITE_[CATEGORY]_[NAME]` (or your build tool's prefix)

{{#EACH FRONTEND_REQUIRED_VAR}}
#### `{{VAR_NAME}}`

**Description:** {{VAR_DESCRIPTION}}

**Type:** {{VAR_TYPE}}

**Example:** `{{VAR_EXAMPLE}}`

{{#IF VAR_VALIDATION}}**Validation:** {{VAR_VALIDATION}}{{/IF}}

{{/EACH}}

### Optional Variables

{{#EACH FRONTEND_OPTIONAL_VAR}}
#### `{{VAR_NAME}}`

**Description:** {{VAR_DESCRIPTION}}

**Type:** {{VAR_TYPE}}

**Default:** `{{VAR_DEFAULT}}`

**Example:** `{{VAR_EXAMPLE}}`

{{/EACH}}

### Variable Naming Convention (Frontend)

**Format:** `VITE_[CATEGORY]_[NAME]`

**Categories:**
- `VITE_APP_*` - Application metadata
- `VITE_API_*` - API endpoints (points to backend)
- `VITE_AUTH_*` - Authentication config
- `VITE_FEATURE_*` - Feature flags
- `VITE_ANALYTICS_*` - Analytics services

**Important:** Only variables prefixed with `VITE_` (or your build tool's prefix) are exposed to the client.

---

## 🌍 Configuration by Environment

### Development

**Backend (.env.development):**
```bash
{{BACKEND_DEV_ENV_CONFIG}}
```

**Frontend (.env.development):**
```bash
{{FRONTEND_DEV_ENV_CONFIG}}
```

### Staging

**Backend (.env.staging):**
```bash
{{BACKEND_STAGING_ENV_CONFIG}}
```

**Frontend (.env.staging):**
```bash
{{FRONTEND_STAGING_ENV_CONFIG}}
```

### Production

**Backend (.env.production):**
```bash
{{BACKEND_PRODUCTION_ENV_CONFIG}}
```

**Frontend (.env.production):**
```bash
{{FRONTEND_PRODUCTION_ENV_CONFIG}}
```

---

## 🔌 External Services

### Backend Services

{{#EACH BACKEND_EXTERNAL_SERVICE}}
### {{SERVICE_NAME}}

**Purpose:** {{SERVICE_PURPOSE}}

**Configuration:**
```bash
{{SERVICE_ENV_VARS}}
```

**Documentation:** {{SERVICE_DOCS_URL}}

{{#IF SERVICE_FALLBACK}}**Fallback:** {{SERVICE_FALLBACK}}{{/IF}}

{{/EACH}}

### Frontend Services

{{#EACH FRONTEND_EXTERNAL_SERVICE}}
### {{SERVICE_NAME}}

**Purpose:** {{SERVICE_PURPOSE}}

**Configuration:**
```bash
{{SERVICE_ENV_VARS}}
```

**Documentation:** {{SERVICE_DOCS_URL}}

{{#IF SERVICE_FALLBACK}}**Fallback:** {{SERVICE_FALLBACK}}{{/IF}}

{{/EACH}}

---

## 💾 Database Configuration (Backend)

```bash
{{DATABASE_CONFIG}}
```

**Connection Pool:**
- Min: {{DB_POOL_MIN}}
- Max: {{DB_POOL_MAX}}
- Idle Timeout: {{DB_IDLE_TIMEOUT}}ms

---

## 🔐 Secrets Management

### Backend Secrets

**Never commit these variables:**

{{#EACH BACKEND_SECRET_VAR}}
- `{{VAR_NAME}}` - {{VAR_PURPOSE}}
{{/EACH}}

**Storage:** {{BACKEND_SECRETS_STORAGE}}

### Frontend Secrets

**Important:** Frontend should NEVER contain secrets. Only public keys and non-sensitive configuration.

**Allowed:**
- Public API keys (e.g., Google Maps API key)
- Public service IDs
- Feature flags
- Analytics IDs

**Never:**
- Database credentials
- API secret keys
- Authentication secrets
- Private keys

---

## 🚩 Feature Flags

### Backend Feature Flags

{{#IF BACKEND_FEATURE_FLAGS}}
{{#EACH BACKEND_FEATURE_FLAG}}
### `{{FLAG_NAME}}`

**Description:** {{FLAG_DESCRIPTION}}

**Default:** {{FLAG_DEFAULT}}

**Environments:** {{FLAG_ENVIRONMENTS}}

{{/EACH}}

{{ELSE}}
Backend feature flags not implemented yet.

{{/IF}}

### Frontend Feature Flags

{{#IF FRONTEND_FEATURE_FLAGS}}
{{#EACH FRONTEND_FEATURE_FLAG}}
### `{{FLAG_NAME}}`

**Description:** {{FLAG_DESCRIPTION}}

**Default:** {{FLAG_DEFAULT}}

**Environments:** {{FLAG_ENVIRONMENTS}}

{{/EACH}}

{{ELSE}}
Frontend feature flags not implemented yet.

{{/IF}}

---

## 🔒 Security Best Practices

### Backend

- ✅ Store all secrets in environment variables
- ✅ Use secrets manager for production (AWS Secrets Manager, Azure Key Vault, etc.)
- ✅ Never log secrets or sensitive data
- ✅ Rotate secrets regularly
- ✅ Use different secrets per environment

### Frontend

- ✅ Never expose secrets to client code
- ✅ Only use public keys and non-sensitive config
- ✅ Sanitize error messages (don't expose config in production)
- ✅ Validate all environment variables
- ✅ Use Content Security Policy headers

### Example: API Key Management

```bash
# ❌ WRONG - Secret key in frontend
VITE_STRIPE_SECRET_KEY=sk_live_...

# ✅ CORRECT - Public key in frontend, secret in backend
# Frontend
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_...

# Backend
STRIPE_SECRET_KEY=sk_live_...
```

---

## 🧪 Testing Configuration

### Backend Test Environment

```bash
# .env.test
NODE_ENV=test
DATABASE_URL=postgresql://test:test@localhost:5432/test_db
LOG_LEVEL=silent
```

### Frontend Test Environment

```typescript
// vitest.config.ts
export default defineConfig({
  test: {
    env: {
      VITE_API_BASE_URL: 'http://localhost:3001/api',
      VITE_APP_ENV: 'test',
    },
  },
});
```

---

## 📊 Configuration Monitoring

### Backend

- Log configuration on startup (development only)
- Monitor secret rotation
- Track configuration changes

### Frontend

- Log config on startup (development only)
- Monitor API endpoint availability
- Track feature flag usage

---

## 🔗 Related Documents

- [AI Instructions](../ai-instructions.md) - Configuration rules
- [Security Specification](security.md) - Security requirements
- [Deployment Guide](../docs/operations.md) - Environment setup

---

**Document Version:** 1.0

**Last Updated:** {{GENERATION_DATE}}

**Generated by:** AI Flow v1.3.0

