# Phase 7: Performance & Deployment

**Duration:** 10-15 minutes
**Questions:** ~10 questions
**Output:** docs/performance.md, docs/operations.md, specs/configuration.md

---

## 🎯 Objective

Define performance targets and deployment strategy:

1. What Core Web Vitals targets?
2. What optimization strategies?
3. Where will you deploy?
4. What monitoring/analytics tools?

---

## 📋 Questions

### Question 7.1: Core Web Vitals Targets

**What performance targets will you aim for?**

Core Web Vitals:
- **LCP (Largest Contentful Paint):** Largest element render time
- **FID (First Input Delay):** Time to interactive
- **CLS (Cumulative Layout Shift):** Visual stability

A) ⭐ **"Good" Rating (Recommended)**
   - LCP: < 2.5s
   - FID: < 100ms
   - CLS: < 0.1
   - Best for: Most apps, SEO, user experience

B) **"Needs Improvement" (Acceptable)**
   - LCP: < 4.0s
   - FID: < 300ms
   - CLS: < 0.25
   - Best for: MVPs, internal tools

C) **Aggressive Targets**
   - LCP: < 1.5s
   - FID: < 50ms
   - CLS: < 0.05
   - Best for: Performance-critical apps, e-commerce

D) **No specific targets**
   - Not recommended

**Your answer:**

---

### Question 7.2: Bundle Size Target

**What bundle size will you target?**

A) ⭐ **< 200KB gzipped (initial load)** (Recommended)
   - Best for: Most apps, good mobile experience

B) **< 100KB gzipped**
   - Best for: Performance-critical apps

C) **< 300KB gzipped**
   - Best for: Feature-rich apps

D) **No target**
   - Best for: Internal tools only

**Your answer:**

**Monitor bundle size in CI?**
A) Yes - Fail if bundle exceeds target
B) Yes - Warn if bundle grows
C) No

**Tool for bundle analysis:**
- `webpack-bundle-analyzer`
- `rollup-plugin-visualizer`
- `vite-plugin-bundle-analyzer`
- Manual

---

### Question 7.3: Code Splitting Strategy

**How will you split your code?**

A) ⭐ **Route-based splitting** (Recommended)
   - Split by page/route
   - Example: `/dashboard` → `Dashboard.chunk.js`
   - Best for: Multi-page apps, SPAs

B) **Component-based splitting**
   - Lazy load heavy components
   - Example: Modals, charts, editors
   - Best for: Apps with heavy components

C) **Vendor splitting**
   - Separate vendor code from app code
   - Best for: Long-term caching

D) **Combined approach**
   - Route + Component + Vendor splitting
   - Best for: Large apps, optimal caching

E) **No code splitting**
   - Best for: Very small apps (<100KB)

**Your answer:**

**Dynamic imports for:**
- [ ] Routes
- [ ] Modals/Dialogs
- [ ] Heavy libraries (charts, editors)
- [ ] Third-party widgets
- [ ] Images above the fold (lazy loading)

---

### Question 7.4: Image Optimization

**How will you optimize images?**

A) ⭐ **Next-gen formats + Lazy loading** (Recommended)
   - WebP/AVIF with PNG/JPG fallback
   - Lazy load below-the-fold images
   - Responsive images (srcset)
   - Best for: Image-heavy apps

B) **Lazy loading only**
   - Native lazy loading: `<img loading="lazy" />`
   - Best for: Simple optimization

C) **CDN + Image service**
   - Use Cloudinary, Imgix, etc.
   - Automatic optimization
   - Best for: Large image libraries

D) **No optimization**
   - Best for: Minimal images

**Your answer:**

**Image formats supported:**
- [ ] WebP
- [ ] AVIF
- [ ] PNG/JPG fallback

**Image CDN:**
- Cloudinary
- Imgix
- Vercel Image Optimization
- Self-hosted
- No CDN

---

### Question 7.5: Caching Strategy

**What caching strategy will you use?**

A) ⭐ **Cache-first with revalidation** (Recommended)
   - Service Worker cache assets
   - Revalidate in background
   - Best for: PWAs, fast repeat visits

B) **Network-first with cache fallback**
   - Try network, fall back to cache
   - Best for: Dynamic content

C) **Browser caching only**
   - Use HTTP cache headers
   - Best for: Static sites, simple apps

D) **No caching**
   - Best for: Dev environments only

**Your answer:**

**Cache duration for assets:**
- HTML: ____ (e.g., no cache, max-age=3600)
- CSS/JS (versioned): ____ (e.g., max-age=31536000)
- Images: ____ (e.g., max-age=86400)

---

### Question 7.6: Deployment Platform

**Where will you deploy?**

A) ⭐ **Vercel** (Recommended for Next.js/SPA)
   - Features: Zero-config, edge functions, preview deployments
   - Best for: Next.js, React, Vue, Svelte
   - Pricing: Free tier available

B) 🔥 **Netlify**
   - Features: Similar to Vercel, great DX
   - Best for: Static sites, JAMstack
   - Pricing: Free tier available

C) **AWS (S3 + CloudFront)**
   - Features: Full control, scalable
   - Best for: Enterprise, existing AWS infrastructure
   - Pricing: Pay per use

D) **Cloudflare Pages**
   - Features: Edge deployment, fast global CDN
   - Best for: Static sites, edge workers
   - Pricing: Free tier generous

E) **Firebase Hosting**
   - Features: Integrated with Firebase services
   - Best for: Firebase apps
   - Pricing: Free tier available

F) **Docker + VPS (DigitalOcean, Linode, etc.)**
   - Features: Full control, self-hosted
   - Best for: Custom infrastructure
   - Pricing: $5-$20/month

G) **Azure Static Web Apps / Google Cloud Run**
   - Features: Enterprise cloud platforms
   - Best for: Enterprise, existing Azure/GCP infrastructure

**Your answer:**

---

### Question 7.7: CI/CD Pipeline

**What CI/CD platform will you use?**

A) ⭐ **GitHub Actions** (Recommended)
   - Features: Native GitHub integration, free for public repos
   - Best for: GitHub-hosted projects

B) **GitLab CI/CD**
   - Features: Native GitLab integration
   - Best for: GitLab-hosted projects

C) **Vercel/Netlify auto-deploy**
   - Features: Zero-config, automatic on git push
   - Best for: Simple deployments

D) **CircleCI / Travis CI**
   - Features: Mature platforms, good caching
   - Best for: Complex pipelines

E) **No CI/CD**
   - Manual deployments
   - Not recommended

**Your answer:**

**CI/CD steps:**
- [ ] Install dependencies
- [ ] Lint code
- [ ] Run unit tests
- [ ] Run E2E tests
- [ ] Build production bundle
- [ ] Deploy to preview (PR)
- [ ] Deploy to production (merge to main)
- [ ] Run Lighthouse audit
- [ ] Notify team (Slack, Discord)

---

### Question 7.8: Environment Management

**How many environments will you have?**

A) ⭐ **3 environments** (Recommended)
   - Development (local)
   - Staging (preview.yourapp.com)
   - Production (yourapp.com)
   - Best for: Most apps

B) **4+ environments**
   - Development, Staging, QA, Production
   - Best for: Enterprise apps

C) **2 environments**
   - Development, Production
   - Best for: Small teams, MVPs

**Your answer:**

**Environment variables management:**
- `.env.local` (gitignored, local overrides)
- `.env.development`
- `.env.staging`
- `.env.production`
- Secrets stored in: Vercel/Netlify dashboard / GitHub Secrets / Vault

---

### Question 7.9: Monitoring & Analytics

**What monitoring will you use?**

#### Analytics

A) ⭐ **Google Analytics 4**
   - Features: Free, comprehensive, industry standard
   - Best for: Most apps

B) **Plausible / Fathom**
   - Features: Privacy-focused, simple, no GDPR banner needed
   - Best for: Privacy-conscious apps
   - Pricing: Paid

C) **Mixpanel / Amplitude**
   - Features: Product analytics, event tracking
   - Best for: SaaS products
   - Pricing: Free tier available

D) **No analytics**
   - Best for: Internal tools only

**Your answer:**

#### Error Tracking

A) ⭐ **Sentry** (Recommended)
   - Features: Error tracking, performance monitoring, releases
   - Best for: Most apps
   - Pricing: Free tier available

B) **LogRocket**
   - Features: Session replay, error tracking
   - Best for: User behavior analysis
   - Pricing: Paid

C) **Datadog / New Relic**
   - Features: Full observability platform
   - Best for: Enterprise
   - Pricing: Paid

D) **Console only**
   - Best for: MVPs, dev environments

**Your answer:**

#### Performance Monitoring

A) ⭐ **Web Vitals + Sentry** (Recommended)
   - Track Core Web Vitals automatically
   - Best for: Most apps

B) **Lighthouse CI**
   - Run Lighthouse in CI/CD
   - Best for: Performance budgets

C) **SpeedCurve / Calibre**
   - Features: Continuous performance monitoring
   - Best for: Performance-critical apps
   - Pricing: Paid

D) **No monitoring**
   - Not recommended

**Your answer:**

---

### Question 7.10: SEO & Meta Tags

**How will you manage SEO?**

A) ⭐ **React Helmet / vue-meta / Angular Meta service**
   - Dynamic meta tags per page
   - Best for: SPAs with SEO needs

B) **Next.js / Nuxt / Analog built-in SEO**
   - `<Head>` component, automatic sitemap
   - Best for: SSR frameworks

C) **Static meta tags**
   - Hardcoded in index.html
   - Best for: Simple apps, no SEO focus

D) **No SEO**
   - Best for: Internal tools, auth-protected apps

**Your answer:**

**SEO requirements:**
- [ ] Dynamic meta tags (title, description, OG)
- [ ] Sitemap.xml generation
- [ ] Robots.txt
- [ ] Canonical URLs
- [ ] Structured data (JSON-LD)
- [ ] Social media previews (Open Graph, Twitter Cards)

---

## 📊 Phase 7 Summary

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 PHASE 7 SUMMARY: PERFORMANCE & DEPLOYMENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Core Web Vitals: [Answer from 7.1]
Bundle Size Target: [Answer from 7.2]
Code Splitting: [Answer from 7.3]
Image Optimization: [Answer from 7.4]
Caching Strategy: [Answer from 7.5]
Deployment Platform: [Answer from 7.6]
CI/CD: [Answer from 7.7]
Environments: [Answer from 7.8]
Monitoring: [Answer from 7.9]
SEO: [Answer from 7.10]

Is this correct? (Y/n)
```

---

## 📝 Document Generation

Generate `docs/performance.md` and `docs/operations.md` with these placeholders:

### Performance Placeholders

- `{{WEB_VITALS_TARGETS}}` → LCP/FID/CLS targets
- `{{BUNDLE_SIZE_TARGET}}` → Bundle size limit
- `{{CODE_SPLITTING_STRATEGY}}` → Route/Component/Vendor/Combined
- `{{IMAGE_OPTIMIZATION}}` → Strategy and formats
- `{{CACHING_STRATEGY}}` → Service Worker / Browser / None

### Operations Placeholders

- `{{DEPLOYMENT_PLATFORM}}` → Vercel / Netlify / AWS / etc.
- `{{CI_CD_PLATFORM}}` → GitHub Actions / GitLab CI / etc.
- `{{ENVIRONMENTS}}` → Dev / Staging / Prod
- `{{ERROR_TRACKING}}` → Sentry / LogRocket / etc.
- `{{ANALYTICS}}` → Google Analytics / Plausible / etc.
- `{{PERFORMANCE_MONITORING}}` → Web Vitals / Lighthouse CI / etc.
- `{{SEO_STRATEGY}}` → Dynamic meta tags / Static / None

Update `ai-instructions.md`:

```markdown
## Performance

- **Core Web Vitals:** {{WEB_VITALS_TARGETS}}
- **Bundle Size Target:** {{BUNDLE_SIZE_TARGET}}
- **Code Splitting:** {{CODE_SPLITTING_STRATEGY}}

### Rules

- ✅ ALWAYS lazy load routes and heavy components
- ✅ ALWAYS optimize images (WebP/AVIF, lazy loading)
- ✅ ALWAYS code-split by route
- ❌ NEVER import entire libraries (use tree-shaking)
- ❌ NEVER load all data upfront (paginate, infinite scroll)
- ✅ ALWAYS measure Core Web Vitals in production
- ✅ ALWAYS keep bundle size < {{BUNDLE_SIZE_TARGET}}

## Deployment

- **Platform:** {{DEPLOYMENT_PLATFORM}}
- **CI/CD:** {{CI_CD_PLATFORM}}
- **Monitoring:** {{ERROR_TRACKING}} + {{ANALYTICS}}

### Rules

- ✅ ALWAYS test in staging before production
- ✅ ALWAYS use environment variables for config
- ❌ NEVER commit secrets to git
- ✅ ALWAYS monitor errors with {{ERROR_TRACKING}}
- ✅ ALWAYS track Core Web Vitals in production
```

---

## 🚀 Final Steps: Document Generation

Now that all 7 phases are complete, generate the **complete documentation set**:

### 1. Core Documents

- `AGENT.md` - Universal AI assistant configuration
- `ai-instructions.md` - Complete tech stack and rules
- `project-brief.md` - Full project overview
- `README.md` - Quick start guide
- `.env.example` - Environment variable template

### 2. Documentation

- `docs/architecture.md` - System architecture overview
- `docs/components.md` - Component patterns
- `docs/state-management.md` - State management guide
- `docs/styling.md` - Styling and design system
- `docs/api-integration.md` - API integration patterns
- `docs/code-standards.md` - Code conventions
- `docs/testing.md` - Testing strategy
- `docs/performance.md` - Performance optimization
- `docs/operations.md` - Deployment and monitoring
- `docs/contributing.md` - Contribution guidelines

### 3. Specifications

- `specs/accessibility.md` - A11y requirements
- `specs/configuration.md` - Environment configuration

---

## ✅ Validation Checklist

Before finalizing, ensure:

- [ ] All placeholders replaced with real data
- [ ] Tech stack consistent across all documents
- [ ] No contradictions between documents
- [ ] Framework-specific examples match selected framework
- [ ] Cross-references correct
- [ ] AGENT.md references all other documents
- [ ] ai-instructions.md has NEVER/ALWAYS rules from all phases

---

## 🎉 Completion Message

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎉 FRONTEND BOOTSTRAP COMPLETE!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Generated {{DOCUMENT_COUNT}} professional frontend documentation files:

Core Files:
  ✅ AGENT.md
  ✅ ai-instructions.md
  ✅ project-brief.md
  ✅ README.md
  ✅ .env.example

Documentation:
  ✅ docs/architecture.md
  ✅ docs/components.md
  ✅ docs/state-management.md
  ✅ docs/styling.md
  ✅ docs/api-integration.md
  ✅ docs/code-standards.md
  ✅ docs/testing.md
  ✅ docs/performance.md
  ✅ docs/operations.md
  ✅ docs/contributing.md

Specifications:
  ✅ specs/accessibility.md
  ✅ specs/configuration.md

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📚 Next Steps:

1. Review the generated documentation
2. Customize templates as needed
3. Share AGENT.md with your AI assistant
4. Start building! 🚀

💡 Tip: Run /docs-update to regenerate specific documents later
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

**Last Updated:** 2025-01-XX

**Version:** 1.2.0
