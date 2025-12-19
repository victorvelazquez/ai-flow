# Phase 1: Discovery & UX Requirements

**Duration:** 15-20 minutes
**Questions:** ~11 questions
**Output:** project-brief.md, parts of AGENT.md
---
## 🎯 Objective

Understand the **user-facing aspects** and core goal of the application:

1. What is the core goal and purpose of the project?
2. What type of application is being built?
3. Who are the target users?
4. What are the key user journeys?
5. What devices and browsers must be supported?
6. What are the UX priorities?
---
## 📋 Questions

### Question 1.1: Project Name & Description (with Smart Refinement)

> **🧠 Intelligent Refinement System**: This question detects vague descriptions and guides the developer to enrich them. It only asks what's missing and responds in the developer's language.

```
What is the project name?

Provide an initial description of your project.
(Don't worry about perfection - we'll refine it together if needed!)

Example: "A frontend dashboard for managing inventory in real-time"
```

**🔍 AI Internal: Ambiguity Analysis**

After receiving the description, silently analyze for these criteria:

| Criterion | Check For | Score +1 if present |
|-----------|-----------|---------------------|
| **WHO** | Specific user type mentioned (not just "users") | "store managers", "traders", "students" |
| **WHAT** | Specific action/function (not just "view", "show") | "compare prices", "edit profiles", "visualize data" |
| **WHY** | Purpose or value mentioned | "to increase conversion", "to save time", "to improve UX" |
| **DOMAIN** | Industry/vertical indicated | "fintech", "e-commerce", "social media" |
| **DETAIL** | Description has 10+ meaningful words | Not counting articles |

**Scoring Rules:**
- Score 4-5: ✅ Accept immediately → Proceed to 1.2
- Score 0-3: ⚠️ Enter refinement loop → Ask ONLY missing criteria

---

**🔄 Conditional Refinement Loop (only if score < 4)**

> **CRITICAL**: Only ask about criteria that are MISSING. Do NOT repeat questions already answered. Respond in the SAME LANGUAGE the developer used.

```
[LANGUAGE: Match the developer's language]

🔍 I'd like to understand your project better.

Your description: "[original description]"

[ONLY show questions for MISSING criteria:]

[If WHO is missing:]
1️⃣ WHO will use this application?
   A) End consumers (B2C)
   B) Business users (B2B)
   C) Internal team / Admin
   D) Other: __

[If WHAT is missing:]
2️⃣ WHAT is the core UX action users will perform?
   A) Browse & Shop
   B) Manage & Configure
   C) Read & Consume
   D) Create & Publish
   E) Analyze & Visualize
   F) Other: __

[If WHY is missing:]
3️⃣ WHY is this project needed?
   A) Launch new product
   B) Replace legacy UI
   C) Better mobile experience
   D) Specific new feature
   E) Other: __

[If DOMAIN is missing:]
4️⃣ What INDUSTRY/DOMAIN is this for?
   A) E-commerce/Retail
   B) Fitness/Health
   C) Finance/Payments
   D) Education
   E) Social/Community
   F) Business tools (CRM, ERP)
   G) Other: __

Your answers: __
```

---

**✨ Generate Professional Description Options**

After gathering missing info, generate 3 polished versions:

```
[LANGUAGE: Match the developer's language]

✨ Based on your input, here are 3 professional descriptions:

A) Concise (for package.json):
   "[Generated 1-line description]"

B) Descriptive (for README.md):
   "[Generated 2-3 line description with UX focus]"

C) Creative (for Marketing/Landing):
   "[Generated catchy description]"

Which do you prefer? (1-3, or 4 to edit, 5 to start over)
```

**Your choice:**

---

### Question 1.2: Application Type

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
### Question 1.3: Target Users (Confirmation + Expansion)

```
[If WHO was captured in 1.1, show:]

✅ Based on your description, your target users are: [WHO from 1.1]

Describe your user personas more deeply (3-5 bullet points):

- Demographics (age, tech-savviness, etc.)
- Use cases / goals
- Device preferences
- Accessibility needs

---

[If WHO was NOT captured in 1.1, ask normally:]

Who are your primary target users?

Describe your user personas (3-5 bullet points):

- Demographics (age, tech-savviness, etc.)
- Use cases / goals
- Device preferences
- Accessibility needs
```

**Example:**

```
- Small business owners (30-50 years old, moderate tech skills)
- Goal: Manage inventory and track sales
- Devices: Desktop (70%), Mobile (30%)
- Accessibility: WCAG 2.1 AA compliance required
```

**Your answer:**
---
### Question 1.4: Key User Journeys (Confirmation + Expansion)

```
[If WHAT was captured in 1.1, show:]

✅ Based on your description, a core journey is: [WHAT from 1.1]

What are the 3-5 most critical user flows?

---

[If WHAT was NOT captured in 1.1, ask normally:]

What are the 3-5 most critical user flows?
```

**Example:**

```
1. Sign up → Email verification → Onboarding wizard → Dashboard
2. Create new project → Add team members → Set up integrations
3. Browse products → Add to cart → Checkout → Payment confirmation
4. Search for content → Filter results → View details → Save favorite
```

**Your answer:**
---
### Question 1.5: Device & Browser Support

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
### Question 1.6: Responsive Strategy

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
### Question 1.7: Internationalization (i18n)

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
### Question 1.8: Authentication Requirements

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
### Question 1.9: Data Privacy & Compliance

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
### Question 1.10: Offline Support

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
### Question 1.11: Performance Priorities

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
---
📋 PHASE 1 SUMMARY: DISCOVERY & UX
---
Project Name: [Answer from 1.1]
Project Description: [Answer from 1.1]
Application Type: [Answer from 1.2]
Target Users: [Answer from 1.3]
Key User Journeys: [Answer from 1.4]
Device/Browser Support: [Answer from 1.5]
Responsive Strategy: [Answer from 1.6]
Internationalization: [Answer from 1.7]
Authentication: [Answer from 1.8]
Data Privacy: [Answer from 1.9]
Offline Support: [Answer from 1.10]
Performance Priorities: [Answer from 1.11]

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
**Last Updated:** 2025-12-XX

**Version:** 1.3.0
