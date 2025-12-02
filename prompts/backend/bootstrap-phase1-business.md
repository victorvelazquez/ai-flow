## PHASE 1: Discovery & Business (15-20 min)

> **Order for this phase:** 1.1 → 1.2 → 1.3 → 1.4 → 1.5 → 1.6 → 1.7 → 1.8 → 1.9 → 1.10

> **📌 Note:** If Phase 0 was executed, some questions may already be answered. Skip those and only ask what's missing.

**1.1 Project Name & Description**

```
[If detected from Phase 0, show:]
✅ Project Name: [detected name]
✅ Description: [detected description]

Is this correct? (Y/N)
If no, please provide correct values.

[If NOT detected, ask:]
What is the project name?

Provide a short description (1 sentence) for README and package.json
```

**1.2 Project Overview**

```
What problem does this backend system solve?

Describe in 2-3 sentences:
- Who are the users?
- What is the core value proposition?
- What makes this project necessary?

Example:
"A backend for a fitness tracking mobile app used by gym-goers (users). It allows users to log workouts, track progress over time, and share achievements with friends (value). This project is necessary to replace our legacy spreadsheet-based system and support our new iOS app launch."
```

**1.3 Target Users**

```
Who will use this system? Select all that apply:

A) 🌐 External end-users (B2C) - Public-facing application
B) 🏢 Internal employees (B2B/Enterprise) - Company internal tool
C) 🔌 Other systems/services (API consumers) - Integration platform
D) 👥 Partners/Third-parties - Partner ecosystem
E) 📱 Mobile/Web apps - Backend for frontend

(Can select multiple)
```

**1.4 Business Objectives**

```
What are the top 3 measurable objectives for this project?

Examples:
- Process 10,000 transactions/day
- Reduce customer onboarding time by 50%
- Support 1M active users
- Achieve 99.9% uptime SLA

Your objectives:
1.
2.
3.
```

**1.5 System Type**

```
What type of system are you building? (This helps suggest common features)

A) 🛒 E-commerce/Marketplace
B) 📱 SaaS/B2B Platform
C) 📊 CRM/ERP/Business Tool
D) 🎮 Social/Community Platform
E) 📋 Content Management
F) 🏦 FinTech/Payment
G) 🏥 Healthcare/Booking
H) 📚 Education/Learning
I) 🔧 DevTools/API Platform
J) Other: __

Your choice: __
```

**1.6 Core Features**

```
What are the main functionalities your system needs?

Think about what your users will be able to do with your system. You can list them freely, or select from common features suggested below based on your system type.

🛒 E-commerce common features:
□ User authentication (register/login)
□ Product catalog with search/filters
□ Shopping cart
□ Checkout and payment processing
□ Order management
□ Inventory tracking
□ Admin dashboard

📱 SaaS common features:
□ User authentication with SSO
□ Multi-tenant organization/workspace management
□ Role-based access control (RBAC)
□ Subscription and billing
□ Dashboard and analytics
□ API access
□ Admin panel

📊 CRM/Business Tool common features:
□ User/team management
□ Contact/customer database
□ Activity tracking and logging
□ Reporting and analytics
□ Integrations (email, calendar, etc.)
□ Search and filters
□ Export functionality

🎮 Social/Community common features:
□ User profiles
□ Posts/content creation
□ Feed/timeline
□ Comments and reactions
□ Follow/friend system
□ Notifications
□ Moderation tools

⭐ Your specific features (add any custom functionalities):
-
-
-

List all functionalities your system needs (select from above or add your own):
```

**1.7 Scope Definition**

```
Now let's prioritize: What will you build in this first version, and what will you leave for future versions?

This helps us focus the documentation on what you're building now, while noting what comes later.

📋 What will you build in this first version? (Select from the features listed above)

[Show features from question 1.6 and allow selection]

---

⏭️ What will you leave for future versions? (What you're NOT building now)

Common things to defer:
□ Mobile native apps (building web/API first)
□ Advanced analytics/ML features
□ Third-party integrations (v2)
□ White-label/multi-branding
□ Internationalization (i18n)
□ Advanced automation/workflows
□ Video/live streaming features

⭐ Other features to defer (add your own):
-
-
-

💡 Tip: It's okay to start simple! You can always expand later. This helps us create focused documentation for your current needs.
```

**1.8 Constraints**

```
What constraints does this project have? Select all that apply:

A) ⏰ Time - Must launch by specific date
B) 💰 Budget - Limited development resources
C) 📜 Compliance - Regulatory requirements (GDPR, HIPAA, SOC2, etc.)
D) 🔧 Technology - Must use specific tech stack
E) 📊 Scale - Must handle specific traffic/data volume
F) 🔐 Security - High security requirements
G) ⚡ Performance - Strict latency/throughput requirements

For each selected, provide details:

Example:
- Time: Must launch MVP by Q3 2024
- Compliance: Must be GDPR compliant as we serve EU users
```

**1.9 Success Metrics**

```
How will you measure success?

1. Expected Users:
   - Initial launch: __ users
   - Year 1 goal: __ users

2. Performance Targets:
   - Response time: < __ ms
   - Uptime: __ %

3. Business Goals:
   - [Goal 1]
   - [Goal 2]

⭐ Standard for MVP:
- Users: 1,000 initial / 10,000 Year 1
- Response time: < 500ms (API), < 100ms (DB)
- Uptime: 99.9% (Standard cloud SLA)

🏆 Standard for Production/Scale:
- Users: 100,000+ active
- Response time: < 200ms (API), < 50ms (DB)
- Uptime: 99.99% (High Availability)
```

**1.10 Main Business Flows**

> Note: If you omit any common flow or functionality, the AI will suggest and document typical processes relevant to your system type, based on best practices and common use cases.

```
List the main business flows of the system (e.g., sales, inventory update, invoicing, user registration).

For each flow, you can add a brief description (optional).

If you wish, you can specify the main steps of any flow (numbered format). If you do not specify them, the AI will deduce typical steps based on the name and description.

Example:
- Sales: Process of purchasing products by the customer.
  1. Customer selects products
  2. Order is created
  3. Inventory is updated
  4. Invoice is generated
- Inventory: Automatic stock update after each sale.
- Invoicing: Invoice generation after purchase.

The AI will automatically generate flow diagrams (mermaid) for each documented process.
```

### Phase 1 Output

After gathering all information, confirm:

```
📋 PHASE 1 SUMMARY:

Project: [name]
Description: [1 sentence]
Users: [list]
Objectives: [3 objectives]
System Type: [E-commerce/SaaS/etc.]
Core Features: [list of main functionalities]
First Version Features: [what will be built now]
Future Features: [what will be deferred]
Constraints: [list with details]
Success Metrics: [KPIs]
Business Flows: [list of main flows]

Is this correct? (Yes/No)
If corrections needed, specify which section.
```

---

### 📄 Generate Phase 1 Documents

Once confirmed, generate:

**1. `project-brief.md`**

- Use template: `.ai-bootstrap/templates/project-brief.template.md`
- Fill with all Phase 1 information
- Write to project root

```
✅ Generated: project-brief.md

📝 Please review this document. Do you need to make any corrections?

A) ✅ Looks perfect, continue to Phase 2
B) 📝 I'll edit it now (I'll wait)
C) 🔄 Regenerate with changes (tell me what to modify)
```

**If user selects B:**

```
Perfect. Please edit project-brief.md and type "ready" when you're done.
I'll re-read the file to update my context before continuing.
```

Then execute: `read_file('project-brief.md')` to refresh context.

**If user selects C:**
Ask what needs to be changed and regenerate the document.

---

**Proceed to Phase 2 only after document is validated.**

---

## PHASE 2: Data Architecture (15-20 min)
