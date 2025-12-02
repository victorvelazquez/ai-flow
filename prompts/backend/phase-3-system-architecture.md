## PHASE 3: System Architecture (15-20 min)

> **Order for this phase:** 3.1 → 3.2 → 3.3 → 3.4 → 3.5 → 3.6 → 3.7 → 3.8 → 3.9 → 3.10 → 3.11 → 3.12

> **📌 Scope-based behavior:**
>
> - **MVP:** Ask 3.1-3.6 (tech stack essentials) and 3.12 (API structure), skip 3.7-3.11 (advanced features), mark as "TBD"
> - **Production-Ready:** Ask all questions 3.1-3.12
> - **Enterprise:** Ask all questions 3.1-3.12 with emphasis on scalability and integrations

> **📌 Note:** If Phase 0 detected framework/language/dependencies, those will be pre-filled. Review and confirm.

### Objective

Define the technical stack, architecture patterns, and system design.

> **Note:** At the end of this phase, the AI will automatically generate a system architecture diagram in mermaid format, based on your answers. This diagram will be included in the docs/architecture.md document.

**3.1 Backend Framework**

```
[If detected from Phase 0, show:]
✅ Framework Detected: [NestJS/FastAPI/Spring Boot/etc.]
✅ Language: [TypeScript 5.3/Python 3.11/Java 21/etc.]
✅ Runtime: [Node 20/Python 3.11/JVM 21/etc.]

Is this correct? (Y/N)
If no, please specify the correct framework and language.

[If NOT detected, ask:]
Which backend framework will you use?

Node.js (JavaScript):
A) 🔥 Express.js - Popular (minimal, flexible, lightweight)
B) Hapi.js - Enterprise (configuration-driven)

TypeScript (Node.js):
C) ⭐ NestJS - Recommended (structured, enterprise-ready, decorators)
D) ⚡ Fastify - Modern (high performance, schema validation)

Python:
E) ⭐ FastAPI - Recommended (modern, fast, auto-docs)
F) 🔥 Django - Popular (batteries included, admin panel)
G) Flask - Minimal (micro-framework, flexible)

Java:
H) 🏆 Spring Boot - Enterprise standard
I) Quarkus - Modern (cloud-native, fast startup)

Go:
J) ⚡ Gin - Popular (fast, minimalist)
K) Echo - Feature-rich (middleware, routing)
L) Fiber - Express-like (high performance)

Rust:
M) ⚡ Actix-web - High performance (async, type-safe)
N) Rocket - Developer-friendly (macros, type-safe)
O) Axum - Modern (tokio-based, ergonomic)

Kotlin:
P) Ktor - Native Kotlin (coroutines, DSL)
Q) Spring Boot - Java interop (Kotlin support)

Other:
R) Ruby (Rails)
S) PHP (Laravel)
T) C# (.NET Core)

Your choice: __
Why?
```

**3.2 Language & Version**

```
Primary programming language and version:

Language: **
Version: ** (e.g., Node 20, Python 3.11, Java 21)

Type system:
A) ⭐ Strongly typed - TypeScript, Java, Go (Recommended for large projects)
B) Dynamically typed - JavaScript, Python, Ruby
C) Gradually typed - Python with type hints

Package Manager:
A) ⭐ npm - Standard, comes with Node
B) 🔥 pnpm - Fast, disk efficient
C) ⚡ yarn - Popular alternative
D) 🚀 bun - Ultra fast (if using Bun runtime)
E) 🐍 pip/poetry (Python)
F) ☕ Maven/Gradle (Java)
```

**3.3 Architecture Pattern**

```
What architecture pattern will you follow?

A) ⭐ Layered Architecture (Recommended for most projects)
   - Presentation → Business Logic → Data Access
   - Easy to understand and maintain

B) 🏆 Hexagonal/Clean Architecture (Enterprise)
   - Core domain isolated from infrastructure
   - Highly testable and flexible

C) 🔥 MVC (Popular, traditional)
   - Model-View-Controller separation
   - Good for traditional web apps

D) 📦 Modular Monolith (Modern, scalable)
   - Single deployment with independent modules
   - Easier than microservices, more structured than monolith
   - Good middle ground for growing applications

E) ⚡ Microservices (Modern, complex)
   - Multiple independent services
   - Best for large-scale distributed systems

F) Other: __

Your choice: __
Why this pattern?
```

**3.4 API Style**

```
What API style will you expose?

A) ⭐ REST API - Recommended (HTTP/JSON, standard, well-understood)
B) 🔥 GraphQL - Popular (flexible queries, single endpoint)
C) ⚡ gRPC - Modern (high performance, protobuf, microservices)
D) Mixed - REST + GraphQL or REST + gRPC

Your choice: __

API versioning strategy:
A) URL versioning (/v1/users, /v2/users)
B) Header versioning (Accept: application/vnd.api.v1+json)
C) No versioning yet (will add when needed)
```

**3.5 API Reference (Automated)**

````
The AI will automatically generate standard CRUD endpoints for each entity defined in Phase 2.

Please answer the following questions to define the global API conventions (these will apply to all endpoints unless otherwise specified):

**A) Authentication and Access Control**
1. Do all CRUD endpoints require authentication?
  A) ⭐ Yes, all endpoints require authentication (recommended)
  B) Only some (specify which ones)
  C) No authentication required

2. Which roles can access each CRUD operation?
  - GET (list): [admin, manager, user]
  - GET (detail): [admin, manager, user]
  - POST (create): [admin, manager, user]
  - PUT (update): [admin, manager]
  - DELETE (delete): [admin]
  (Standard example: admin, manager, user. Adjust as needed.)

**B) Listing and Filter Conventions**
3. Which pagination scheme do you prefer?
  A) ⭐ offset/limit (recommended)
  B) cursor-based
  C) No pagination

4. Which filter and sorting fields will be supported by default?
  - Filters: [id, name, date, etc.]
  - Sorting: [field, asc/desc]

5. How will filters be passed for GET list endpoints?
  A) ⭐ Query parameters (recommended for simple filters)
     Example: GET /users?name=John&status=active&page=1&limit=10

  B) POST /search endpoint with body (for complex filters)
     Example: POST /users/search
     Body: { "filters": { "name": "John", "status": "active" }, "page": 1, "limit": 10 }

  C) Both (query params for simple, POST /search for complex)

6. For POST/PUT/PATCH endpoints, will you use DTOs for request validation?
  A) ⭐ Yes, strict DTOs with validation (recommended)
  B) Accept raw JSON without strict schema

  If yes, validation library: [from Phase 3.6 - class-validator, Zod, Pydantic, Joi]

**C) Error and Response Structure**
7. What error response format will be used?
  A) Standard JSON:
  ```json
  {
   "error": "Descriptive message",
   "code": 400,
   "details": {}
  }
  ```

  B) Other (specify)

8. Which fields will be included in the default successful response?
  - data, meta (pagination), links, etc.

**D) Relationships and Expansions**
9. Allow expanding relationships (include/expand)?
  A) ⭐ Yes, support `include` parameter (recommended)
  B) No, flat data only

**E) Custom Endpoint Example**
10. If you want to customize an endpoint (e.g., add special logic, validations, or unique parameters), describe the case here:

- [Brief description, example endpoint, parameters, special logic]

---

The AI will use these conventions to automatically document all CRUD endpoints for each entity in api.md. If you need additional or custom endpoints, you can add them manually later.
````

**3.6 Key Dependencies**

```
What major libraries/tools will you use?

ORM/Database:
A) TypeORM (Node.js)
B) Prisma (Node.js) ⭐
C) Sequelize (Node.js)
D) SQLAlchemy (Python)
E) Hibernate (Java)
F) Other: __

Validation:
A) class-validator + class-transformer (NestJS) ⭐
B) Joi (Node.js)
C) Zod (TypeScript)
D) Pydantic (Python) ⭐
E) Yup (JavaScript)

Authentication:
A) Passport.js (Node.js) 🔥
B) JWT libraries
C) Auth0/Clerk/Supabase Auth (External service)
D) Framework built-in

Other critical libraries:
-
```

**3.7 Caching Strategy**

```
Will you use caching?

A) ⭐ Redis - Recommended (in-memory, fast, pub/sub)
B) Memcached - Simple key-value cache
C) Application-level - In-process caching (node-cache, etc.)
D) Database query cache
E) No caching (simple projects)

If using cache:
- What will be cached? (sessions, query results, computed data)
- Cache invalidation strategy? (TTL, manual, event-driven)
```

**3.8 Background Jobs**

```
Do you need background/async jobs?

A) ⭐ Yes - Using queue system (Bull, BullMQ, Celery, Sidekiq)
B) Yes - Using cron jobs
C) Yes - Using serverless functions (Lambda, Cloud Functions)
D) No - All operations are synchronous

If yes, common job types:
- Email sending
- Report generation
- Data processing
- External API calls
- Cleanup tasks
- Other: __
```

**3.9 File Storage**

```
How will you handle file uploads?

A) ⭐ Cloud storage - S3, Google Cloud Storage, Azure Blob ⭐
B) Local filesystem - Storing on server disk
C) Database - Storing binary data in DB (not recommended for large files)
D) CDN - Cloudflare, CloudFront, etc.
E) Not needed

If storing files:
- File types: [images, PDFs, videos, documents, etc.]
- Max file size: __ MB
- Storage quota estimate: __ GB
```

**3.10 External Integrations**

```
Will you integrate with external services?

Select all that apply:

💳 Payment Providers:
□ Stripe - Credit cards, subscriptions ⭐
□ PayPal - Popular payment method
□ Square - POS and online payments
□ Mercado Pago - Latin America
□ Other: __

📧 Email Services:
□ AWS SES - Cost-effective, scalable ⭐
□ SendGrid - Feature-rich, analytics
□ Mailgun - Developer-friendly
□ Postmark - Transactional focus
□ Resend - Modern, simple API ⚡
□ Other: __

📱 SMS/Messaging:
□ Twilio - SMS, WhatsApp, voice ⭐
□ AWS SNS - Simple notifications
□ MessageBird - Multi-channel
□ Other: __

☁️ Cloud Storage:
□ AWS S3 - Object storage standard ⭐
□ Google Cloud Storage
□ Azure Blob Storage
□ Cloudflare R2 - S3-compatible, no egress fees ⚡
□ Other: __

📊 Analytics:
□ Google Analytics - Web analytics
□ Mixpanel - Product analytics ⭐
□ Segment - Data pipeline
□ PostHog - Open-source analytics ⚡
□ Amplitude - Behavioral analytics
□ Other: __

🔍 Monitoring/Error Tracking:
□ Sentry - Error tracking ⭐
□ Datadog - Full observability 🏆
□ New Relic - APM
□ LogRocket - Session replay
□ Other: __

🗺️ Maps/Location:
□ Google Maps API
□ Mapbox
□ OpenStreetMap
□ Other: __

🔐 Authentication:
□ Auth0 - Identity platform 🏆
□ Clerk - Modern auth ⚡
□ Supabase Auth - Open-source
□ Firebase Auth - Google ecosystem
□ Other: __

🤖 AI/ML Services:
□ OpenAI API - GPT models
□ Anthropic Claude - AI assistant
□ Google Gemini - Multimodal AI
□ AWS Bedrock - Managed AI
□ Other: __

📞 Communication:
□ Slack - Team notifications
□ Discord - Community integration
□ Webhooks - Custom integrations
□ Other: __

🔄 Other Integrations:
□ GitHub/GitLab API
□ Calendar (Google/Outlook)
□ CRM (Salesforce, HubSpot)
□ Accounting (QuickBooks, Xero)
□ Other: __

---

For each selected, briefly describe the use case:

Example:
- Stripe: Process credit card payments for subscriptions
- AWS SES: Send transactional emails (order confirmations, password resets)
- Sentry: Track and alert on production errors
```

### Phase 3 Output

```
📋 PHASE 3 SUMMARY:

Framework: [name + version]
Language: [name + version]
Architecture: [pattern]
API Style: [REST/GraphQL/gRPC]
API Versioning: [strategy]
API Conventions: [auth, pagination, error format, expansions]
Database: [from Phase 2]
ORM: [name]
Validation: [library]
Auth: [method]
Caching: [strategy]
Background Jobs: [yes/no + method]
File Storage: [strategy]
External Services: [list with use cases]

Is this correct? (Yes/No)
```

---

### 📄 Generate Phase 3 Documents

**Before starting generation:**

```
📖 Loading context from previous phases...
✅ Re-reading project-brief.md
✅ Re-reading docs/data-model.md
```

Once confirmed, generate:

**1. `docs/architecture.md`**

- Use template: `.ai-bootstrap/templates/docs/architecture.template.md`
- Fill with system architecture, patterns, tech stack
- Include architecture diagram (mermaid format)

**2. `ai-instructions.md`**

- Use template: `.ai-bootstrap/templates/ai-instructions.template.md`
- Fill with tech stack, framework, language, key dependencies
- Include NEVER/ALWAYS rules specific to chosen stack
- Generate idiomatic code examples for Controller, Service, Repository, DTO and Module placeholders, strictly following the selected Architecture Pattern (e.g., if Hexagonal, show Ports & Adapters).

```
✅ Generated: docs/architecture.md
✅ Generated: ai-instructions.md

📝 Please review these documents. Do you need to make any corrections?

A) ✅ Look perfect, continue to Phase 4
B) 📝 I'll edit them now (I'll wait)
C) 🔄 Regenerate with changes (tell me what to modify)
```

**If user selects B:**

```
Perfect. Please edit the documents and type "ready" when you're done.
I'll re-read all files to update my context before continuing.
```

Then execute: `read_file()` for both documents to refresh context.

---

**Proceed to Phase 4 only after documents are validated.**

---

## PHASE 4: Security & Authentication (15-20 min)
