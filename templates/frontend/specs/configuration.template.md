# Configuration Specification

> Environment variables, feature flags, and configuration management for {{PROJECT_NAME}}

---

## 🎯 Configuration Strategy

**Approach:** {{CONFIGURATION_APPROACH}}

**Key Principles:**
1. **Separation of Concerns** - Build-time vs runtime config
2. **Security First** - Never expose secrets to client
3. **Type Safety** - Validate and type all config
4. **Environment Parity** - Consistent config across environments

---

## 📁 Configuration Files

### File Structure

```
{{PROJECT_NAME}}/
├── .env.local              # Local overrides (gitignored)
├── .env.development        # Development defaults
├── .env.production         # Production defaults
├── .env.example            # Template for new developers
└── src/
    └── config/
        ├── index.ts        # Configuration loader
        ├── schema.ts       # Validation schema
        └── constants.ts    # Static constants
```

### Environment File Priority

```
.env.local          # Highest priority (never commit)
.env.[mode]         # Mode-specific (.env.development, .env.production)
.env                # Base config
```

**Note:** {{BUILD_TOOL}} automatically loads these files in priority order.

---

## 🔐 Environment Variables

### .env.example Template

```bash
#####################################
# {{PROJECT_NAME}} - Configuration
#####################################

#----------------------------------
# Application
#----------------------------------
VITE_APP_NAME={{PROJECT_NAME}}
VITE_APP_VERSION=1.0.0
VITE_APP_ENV=development

#----------------------------------
# API Configuration
#----------------------------------
VITE_API_BASE_URL=http://localhost:3000/api
VITE_API_TIMEOUT=30000

{{#IF_GRAPHQL}}
#----------------------------------
# GraphQL
#----------------------------------
VITE_GRAPHQL_URL=http://localhost:3000/graphql
VITE_GRAPHQL_WS_URL=ws://localhost:3000/graphql
{{/IF_GRAPHQL}}

{{#IF_AUTH}}
#----------------------------------
# Authentication
#----------------------------------
VITE_AUTH_DOMAIN={{AUTH_DOMAIN}}
VITE_AUTH_CLIENT_ID={{AUTH_CLIENT_ID}}
VITE_AUTH_REDIRECT_URI=http://localhost:5173/callback
{{/IF_AUTH}}

{{#IF_ANALYTICS}}
#----------------------------------
# Analytics & Monitoring
#----------------------------------
VITE_GOOGLE_ANALYTICS_ID=
VITE_SENTRY_DSN=
VITE_SENTRY_ENVIRONMENT=development
{{/IF_ANALYTICS}}

{{#IF_FEATURE_FLAGS}}
#----------------------------------
# Feature Flags
#----------------------------------
VITE_FEATURE_NEW_DASHBOARD=true
VITE_FEATURE_BETA_UI=false
{{/IF_FEATURE_FLAGS}}

#----------------------------------
# Build Configuration
#----------------------------------
VITE_PUBLIC_URL=/
VITE_SOURCE_MAPS=true
```

### Variable Naming Convention

**Format:** `VITE_[CATEGORY]_[NAME]`

**Categories:**
- `VITE_APP_*` - Application metadata
- `VITE_API_*` - API endpoints
- `VITE_AUTH_*` - Authentication config
- `VITE_FEATURE_*` - Feature flags
- `VITE_ANALYTICS_*` - Analytics services

**Important:** Only variables prefixed with `VITE_` (or your build tool's prefix) are exposed to the client.

---

## ⚙️ Configuration Loader

### src/config/index.ts

```typescript
import { z } from 'zod';
import { configSchema } from './schema';

/**
 * Load and validate environment configuration
 */
function loadConfig() {
  const rawConfig = {
    // Application
    app: {
      name: import.meta.env.VITE_APP_NAME,
      version: import.meta.env.VITE_APP_VERSION,
      env: import.meta.env.VITE_APP_ENV || import.meta.env.MODE,
    },

    // API
    api: {
      baseUrl: import.meta.env.VITE_API_BASE_URL,
      timeout: parseInt(import.meta.env.VITE_API_TIMEOUT || '30000', 10),
    },

    // Authentication
    auth: {
      domain: import.meta.env.VITE_AUTH_DOMAIN,
      clientId: import.meta.env.VITE_AUTH_CLIENT_ID,
      redirectUri: import.meta.env.VITE_AUTH_REDIRECT_URI,
    },

    // Feature Flags
    features: {
      newDashboard: import.meta.env.VITE_FEATURE_NEW_DASHBOARD === 'true',
      betaUi: import.meta.env.VITE_FEATURE_BETA_UI === 'true',
    },

    // Analytics
    analytics: {
      googleAnalyticsId: import.meta.env.VITE_GOOGLE_ANALYTICS_ID,
      sentryDsn: import.meta.env.VITE_SENTRY_DSN,
      sentryEnvironment: import.meta.env.VITE_SENTRY_ENVIRONMENT,
    },
  };

  // Validate configuration
  try {
    return configSchema.parse(rawConfig);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('❌ Configuration validation failed:');
      error.errors.forEach(err => {
        console.error(`  - ${err.path.join('.')}: ${err.message}`);
      });
    }
    throw new Error('Invalid configuration. Please check your .env file.');
  }
}

export const config = loadConfig();

// Helper to check environment
export const isDevelopment = config.app.env === 'development';
export const isProduction = config.app.env === 'production';
export const isTest = config.app.env === 'test';
```

### src/config/schema.ts

```typescript
import { z } from 'zod';

/**
 * Configuration schema with validation
 */
export const configSchema = z.object({
  app: z.object({
    name: z.string().min(1, 'App name is required'),
    version: z.string().regex(/^\d+\.\d+\.\d+$/, 'Invalid version format'),
    env: z.enum(['development', 'production', 'test']),
  }),

  api: z.object({
    baseUrl: z.string().url('Invalid API base URL'),
    timeout: z.number().min(1000).max(60000),
  }),

  auth: z.object({
    domain: z.string().min(1, 'Auth domain is required'),
    clientId: z.string().min(1, 'Auth client ID is required'),
    redirectUri: z.string().url('Invalid redirect URI'),
  }).optional(),

  features: z.object({
    newDashboard: z.boolean(),
    betaUi: z.boolean(),
  }),

  analytics: z.object({
    googleAnalyticsId: z.string().optional(),
    sentryDsn: z.string().url().optional(),
    sentryEnvironment: z.string().optional(),
  }),
});

export type Config = z.infer<typeof configSchema>;
```

---

## 🏗️ Build-Time vs Runtime Config

### Build-Time Configuration

**Replaced at build time** - Baked into bundle

```typescript
// ✅ Build-time - Replaced with actual value
const apiUrl = import.meta.env.VITE_API_BASE_URL;
// Becomes: const apiUrl = "https://api.example.com";

// ✅ Dead code elimination
if (import.meta.env.VITE_FEATURE_BETA === 'true') {
  // This entire block removed if false
  console.log('Beta features enabled');
}
```

**Use for:**
- Feature flags (code splitting)
- API endpoints
- Third-party keys (public)
- Build optimizations

### Runtime Configuration

**Fetched at runtime** - Not in bundle

```typescript
// public/config.json (generated at deploy time)
{
  "apiUrl": "https://api.staging.example.com",
  "features": {
    "betaUi": true
  }
}

// src/config/runtime.ts
export async function loadRuntimeConfig() {
  const response = await fetch('/config.json');
  return response.json();
}
```

**Use for:**
- Multi-tenant deployments
- Dynamic feature flags
- A/B testing variants
- Per-customer configs

---

## 🚩 Feature Flags

### Implementation Strategies

#### 1. Environment Variable Flags (Simple)

```typescript
// src/config/features.ts
export const features = {
  newDashboard: import.meta.env.VITE_FEATURE_NEW_DASHBOARD === 'true',
  betaUi: import.meta.env.VITE_FEATURE_BETA_UI === 'true',
  analyticsV2: import.meta.env.VITE_FEATURE_ANALYTICS_V2 === 'true',
} as const;

// Usage
import { features } from './config/features';

function Dashboard() {
  if (features.newDashboard) {
    return <NewDashboard />;
  }
  return <LegacyDashboard />;
}
```

#### 2. LaunchDarkly / Similar Service (Advanced)

```typescript
// src/config/featureFlags.ts
import { LDProvider, useFlags } from 'launchdarkly-react-client-sdk';

export const FeatureFlagProvider = ({ children }) => (
  <LDProvider
    clientSideID={import.meta.env.VITE_LAUNCHDARKLY_CLIENT_ID}
    user={{ key: 'user-id', anonymous: true }}
  >
    {children}
  </LDProvider>
);

// Usage
function Dashboard() {
  const { newDashboard } = useFlags();

  if (newDashboard) {
    return <NewDashboard />;
  }
  return <LegacyDashboard />;
}
```

#### 3. Percentage Rollouts

```typescript
// src/utils/rollout.ts
export function isFeatureEnabled(
  featureName: string,
  userId: string,
  rolloutPercentage: number
): boolean {
  // Hash user ID to get deterministic random
  const hash = simpleHash(`${featureName}-${userId}`);
  const bucket = hash % 100;

  return bucket < rolloutPercentage;
}

// Usage
const showNewFeature = isFeatureEnabled('new-dashboard', user.id, 25); // 25% rollout
```

---

## 🔒 Security Best Practices

### 1. Never Expose Secrets

```bash
# ❌ WRONG - These should NOT be in frontend code
VITE_DATABASE_URL=postgres://...       # Backend only!
VITE_API_SECRET_KEY=abc123...          # Backend only!
VITE_STRIPE_SECRET_KEY=sk_live_...     # Backend only!

# ✅ CORRECT - Public keys only
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_...
VITE_GOOGLE_MAPS_API_KEY=AIza...
```

### 2. Sanitize Error Messages

```typescript
// ❌ Bad - Exposes config in production
if (!config.api.baseUrl) {
  throw new Error(`Missing API URL: ${import.meta.env.VITE_API_BASE_URL}`);
}

// ✅ Good - Generic message in production
if (!config.api.baseUrl) {
  const message = isDevelopment
    ? `Missing API URL: ${import.meta.env.VITE_API_BASE_URL}`
    : 'Configuration error. Please contact support.';
  throw new Error(message);
}
```

### 3. Validate All Inputs

```typescript
// Always validate environment variables
const port = parseInt(import.meta.env.VITE_PORT || '3000', 10);

if (isNaN(port) || port < 1 || port > 65535) {
  throw new Error('Invalid port number');
}
```

---

## 🌍 Environment-Specific Config

### Development (.env.development)

```bash
VITE_API_BASE_URL=http://localhost:3000/api
VITE_LOG_LEVEL=debug
VITE_SOURCE_MAPS=true
VITE_ENABLE_DEVTOOLS=true
```

### Staging (.env.staging)

```bash
VITE_API_BASE_URL=https://api.staging.example.com
VITE_LOG_LEVEL=info
VITE_SOURCE_MAPS=true
VITE_ENABLE_DEVTOOLS=true
VITE_SENTRY_ENVIRONMENT=staging
```

### Production (.env.production)

```bash
VITE_API_BASE_URL=https://api.example.com
VITE_LOG_LEVEL=error
VITE_SOURCE_MAPS=false
VITE_ENABLE_DEVTOOLS=false
VITE_SENTRY_ENVIRONMENT=production
```

---

## 🧪 Testing Configuration

### Mocking Config in Tests

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

// Or mock in individual tests
vi.stubEnv('VITE_FEATURE_BETA', 'true');

test('feature flag enabled', () => {
  expect(features.betaUi).toBe(true);
});

vi.unstubAllEnvs();
```

---

## 📊 Configuration Monitoring

### Log Config on Startup (Development Only)

```typescript
// src/main.tsx
if (isDevelopment) {
  console.group('🔧 Configuration');
  console.table({
    'App Name': config.app.name,
    'Environment': config.app.env,
    'API URL': config.api.baseUrl,
    'Features': Object.entries(config.features)
      .filter(([, enabled]) => enabled)
      .map(([name]) => name)
      .join(', '),
  });
  console.groupEnd();
}
```

### Sentry Context (Production)

```typescript
import * as Sentry from '@sentry/react';

if (isProduction && config.analytics.sentryDsn) {
  Sentry.init({
    dsn: config.analytics.sentryDsn,
    environment: config.app.env,
    release: config.app.version,
  });

  Sentry.setContext('config', {
    apiUrl: config.api.baseUrl,
    features: config.features,
  });
}
```

---

## 🔗 Related Documents

- [AI Instructions](../ai-instructions.md) - Configuration rules
- [Security Specification](security.md) - Security requirements
- [Deployment Guide](../docs/operations.md) - Environment setup

---

**Last Updated:** {{GENERATION_DATE}}

**Configuration Approach:** {{CONFIGURATION_APPROACH}}
