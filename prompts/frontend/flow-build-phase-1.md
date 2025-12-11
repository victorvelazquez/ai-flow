# Phase 1: Discovery & UX Requirements

**Duration:** 15-20 minutes
**Questions:** ~10 questions
**Output:** project-brief.md, parts of AGENT.md

---

## 🎯 Objective

Understand the **user-facing aspects** of the application:

1. What type of application is being built?
2. Who are the target users?
3. What are the key user journeys?
4. What devices and browsers must be supported?
5. What are the UX priorities?

---

## 📋 Questions

### Question 1.1: Application Type

**What type of frontend application are you building?**

A) ⭐ **Single Page Application (SPA)**
   - Example: Gmail, Notion, Figma
   - Characteristics: Client-side routing, dynamic updates, minimal page reloads
   - Best for: Web apps, dashboards, admin panels

B) 🔥 **Multi-Page Application (MPA)**
   - Example: E-commerce sites, blogs, marketing sites
   - Characteristics: Server-rendered pages, traditional navigation
   - Best for: Content-heavy sites, SEO-critical apps

C) ⚡ **Progressive Web App (PWA)**
   - Example: Twitter Lite, Starbucks PWA
   - Characteristics: Offline support, installable, push notifications
   - Best for: Mobile-first apps, offline-first experiences

D) 🏆 **Server-Side Rendered (SSR) App**
   - Example: Next.js apps, Nuxt apps
   - Characteristics: Initial server render, hydration, SEO-friendly
   - Best for: Hybrid apps, dynamic content with SEO needs

E) **Static Site (SSG)**
   - Example: Documentation sites, portfolios
   - Characteristics: Pre-rendered at build time, fast, CDN-friendly
   - Best for: Blogs, documentation, landing pages

**Your answer:**

---

### Question 1.2: Target Users

**Who are your primary target users?**

Describe your user personas (3-5 bullet points):
- Demographics (age, tech-savviness, etc.)
- Use cases / goals
- Device preferences
- Accessibility needs

**Example:**
```
- Small business owners (30-50 years old, moderate tech skills)
- Goal: Manage inventory and track sales
- Devices: Desktop (70%), Mobile (30%)
- Accessibility: WCAG 2.1 AA compliance required
```

**Your answer:**

---

### Question 1.3: Key User Journeys

**What are the 3-5 most critical user flows?**

List the core journeys users will take through your app.

**Example:**
```
1. Sign up → Email verification → Onboarding wizard → Dashboard
2. Create new project → Add team members → Set up integrations
3. Browse products → Add to cart → Checkout → Payment confirmation
4. Search for content → Filter results → View details → Save favorite
```

**Your answer:**

---

### Question 1.4: Device & Browser Support

**What devices and browsers must you support?**

A) ⭐ **Modern Browsers Only** (Last 2 versions)
   - Chrome, Firefox, Safari, Edge
   - Mobile: iOS Safari 14+, Chrome Android
   - Pros: Use latest web features, smaller bundle size
   - Cons: May exclude <5% of users

B) 🔥 **Broad Compatibility** (Last 3-4 years)
   - Include IE11, older Safari versions
   - Requires polyfills and transpilation
   - Pros: Wider audience reach
   - Cons: Larger bundle, limited features

C) **Mobile-First**
   - Prioritize iOS Safari and Chrome Android
   - Responsive design for desktop
   - Best for: Consumer apps, e-commerce

D) **Desktop-First**
   - Optimize for desktop browsers
   - Mobile as secondary experience
   - Best for: Admin panels, dashboards, B2B tools

**Your answer:**

---

### Question 1.5: Responsive Strategy

**How will you handle different screen sizes?**

A) ⭐ **Mobile-First Responsive** (Recommended)
   - Design for mobile first, scale up for desktop
   - Breakpoints: 640px (mobile), 768px (tablet), 1024px (desktop)
   - Best for: Most modern apps

B) **Desktop-First Responsive**
   - Design for desktop, scale down for mobile
   - Best for: Complex dashboards with dense data

C) **Adaptive (Multiple Designs)**
   - Separate designs for mobile vs desktop
   - Example: Different layouts/features per breakpoint
   - Best for: Apps with very different mobile/desktop experiences

D) **Fixed Width (Desktop Only)**
   - No mobile optimization
   - Best for: Internal tools, admin panels (desktop-only users)

**Your answer:**

---

### Question 1.6: Internationalization (i18n)

**Do you need multi-language support?**

A) ⭐ **Single Language Only**
   - No i18n needed
   - Fastest development

B) **Multi-Language (Static)**
   - Support 2-5 languages
   - Translations managed in code (JSON files)
   - Example: English, Spanish, French

C) 🌍 **Multi-Language (Dynamic)**
   - Support 10+ languages
   - CMS-driven translations or API-based
   - Example: Crowdin, Phrase integration

D) **Right-to-Left (RTL) Support**
   - Include Arabic, Hebrew, etc.
   - Requires bidirectional layout support

**Your answer:**

**If multi-language selected, list target languages:**

---

### Question 1.7: Authentication Requirements

**What authentication method will you use?**

A) ⭐ **Email/Password (Traditional)**
   - Users sign up with email and password
   - Requires password reset flow
   - Best for: Most apps

B) 🔥 **Social Login (OAuth)**
   - Google, GitHub, Facebook, etc.
   - Faster signup, lower friction
   - Best for: Consumer apps

C) **Magic Link / Passwordless**
   - Email-based login link
   - No password management
   - Best for: B2B SaaS, low-security apps

D) **SSO / SAML (Enterprise)**
   - Okta, Auth0, Azure AD integration
   - Best for: Enterprise B2B apps

E) **Multi-Factor Authentication (MFA)**
   - SMS, authenticator app, WebAuthn
   - Best for: High-security apps (finance, healthcare)

F) **No Authentication**
   - Public app, no user accounts
   - Best for: Marketing sites, public tools

**Your answer:**

---

### Question 1.8: Data Privacy & Compliance

**What data privacy requirements do you have?**

A) ⭐ **Standard (No Special Requirements)**
   - Basic privacy policy
   - No regulated data

B) **GDPR Compliance (EU)**
   - Cookie consent banner
   - Right to be forgotten
   - Data export capabilities

C) **CCPA Compliance (California)**
   - "Do Not Sell" option
   - Data deletion requests

D) 🏆 **HIPAA Compliance (Healthcare)**
   - Encrypted data transmission
   - Audit logs
   - Strict access controls

E) **SOC 2 / ISO 27001 (Enterprise)**
   - Security audit requirements
   - Detailed logging and monitoring

F) **Multiple Regulations**
   - Combine GDPR + CCPA + others
   - Most restrictive controls apply

**Your answer:**

---

### Question 1.9: Offline Support

**Do users need offline access?**

A) ⭐ **Online Only**
   - Requires internet connection
   - Simplest implementation

B) **Basic Offline (Read-Only)**
   - Cache data for offline viewing
   - No offline editing
   - Example: News apps, documentation

C) 🔥 **Full Offline (Sync)**
   - Offline editing with sync when online
   - Requires conflict resolution
   - Example: Note apps, task managers
   - Technologies: Service Workers, IndexedDB

D) **Offline-First**
   - Works offline by default
   - Syncs in background
   - Best for: Mobile apps, unreliable networks

**Your answer:**

---

### Question 1.10: Performance Priorities

**What are your performance priorities?** (Select top 3)

A) ⭐ **Fast Initial Load (LCP < 2.5s)**
   - Optimize Core Web Vitals
   - Code splitting, lazy loading
   - Best for: SEO, user retention

B) **Smooth Interactions (FID < 100ms)**
   - Debounce inputs, optimize re-renders
   - Best for: Interactive apps, dashboards

C) **Visual Stability (CLS < 0.1)**
   - Prevent layout shifts
   - Reserve space for dynamic content
   - Best for: Content-heavy sites

D) **Low Bundle Size**
   - Minimize JavaScript payload
   - Tree shaking, compression
   - Best for: Mobile users, slow networks

E) **Fast Time to Interactive (TTI)**
   - Hydration optimization
   - Critical CSS inlining
   - Best for: SSR apps

F) **Perceived Performance**
   - Skeleton screens, optimistic UI
   - Best for: User experience

**Your answer (top 3):**

---

## 📊 Phase 1 Summary

Before proceeding to Phase 2, confirm the following:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 PHASE 1 SUMMARY: DISCOVERY & UX
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Application Type: [Answer from 1.1]
Target Users: [Answer from 1.2]
Key User Journeys: [Answer from 1.3]
Device/Browser Support: [Answer from 1.4]
Responsive Strategy: [Answer from 1.5]
Internationalization: [Answer from 1.6]
Authentication: [Answer from 1.7]
Data Privacy: [Answer from 1.8]
Offline Support: [Answer from 1.9]
Performance Priorities: [Answer from 1.10]

Is this correct? (Y/n)
```

If **Yes:** Proceed to Phase 2

If **No:** Allow user to correct specific answers

---

## 📝 Document Generation (Partial)

At the end of Phase 1, generate or update:

### 1. project-brief.md (Partial)

```markdown
# {{PROJECT_NAME}} - Project Brief

## Overview

{{PROJECT_DESCRIPTION}}

## Application Type

{{APPLICATION_TYPE}}

## Target Users

{{TARGET_USERS}}

## Key User Journeys

1. {{USER_JOURNEY_1}}
2. {{USER_JOURNEY_2}}
3. {{USER_JOURNEY_3}}
4. {{USER_JOURNEY_4}}
5. {{USER_JOURNEY_5}}

## Technical Requirements

### Browser Support

{{BROWSER_SUPPORT}}

### Responsive Strategy

{{RESPONSIVE_STRATEGY}}

### Internationalization

{{I18N_SUPPORT}}

### Authentication

{{AUTH_METHOD}}

### Data Privacy

{{DATA_PRIVACY_COMPLIANCE}}

### Offline Support

{{OFFLINE_SUPPORT}}

### Performance Priorities

{{PERFORMANCE_PRIORITIES}}
```

### 2. AGENT.md (Partial)

```markdown
# AGENT.md

## About This Project

**Project Name:** {{PROJECT_NAME}}

**Type:** {{APPLICATION_TYPE}}

**Target Users:** {{TARGET_USERS}}

## Key Features

{{KEY_USER_JOURNEYS}}

## Requirements

- Browser Support: {{BROWSER_SUPPORT}}
- Responsive: {{RESPONSIVE_STRATEGY}}
- i18n: {{I18N_SUPPORT}}
- Authentication: {{AUTH_METHOD}}
- Compliance: {{DATA_PRIVACY_COMPLIANCE}}
```

---

## 🚀 Next Steps

```
✅ Phase 1 Complete!

Documents Generated:
  - project-brief.md (partial)
  - AGENT.md (partial)

Next: Phase 2 - Components & Framework

Read: .ai-flow/prompts/frontend/flow-build-phase-2-components.md
```

---

**Last Updated:** 2025-01-XX

**Version:** 1.2.0



