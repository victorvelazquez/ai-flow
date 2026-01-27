# AGENT.md

> Universal AI Assistant Configuration
>
> This file provides context for ALL AI development tools (Claude, Copilot, Cursor, Gemini, etc.)

---

## 📋 About This Project

**Project Name:** {{PROJECT_NAME}}

**Description:** {{PROJECT_DESCRIPTION}}

**Problem We're Solving:** {{PROBLEM_STATEMENT}}

**Target Users:** {{TARGET_USERS}}

### Technical Context

**Project Type:** Backend API/Service
**Architecture:** {{ARCHITECTURE_PATTERN}}
**Primary Language:** {{LANGUAGE}} {{LANGUAGE_VERSION}}
**Framework:** {{FRAMEWORK}}
**Database:** {{DATABASE}} with {{ORM}}

**Key Characteristics:**

- Authentication: {{AUTH_METHOD}}
- API Style: {{API_STYLE}}
- Deployment: {{DEPLOYMENT_PLATFORM}}
- Current Phase: {{PROJECT_PHASE}}

> This project uses AI-assisted development with comprehensive documentation.
> All files below provide context to AI assistants for consistent, high-quality code generation.

---

## 🏗️ Documentation Architecture

This project follows **AI-assisted development** with comprehensive documentation.
All documentation is structured to guide AI assistants in understanding the project deeply.

### 📚 Core Documentation (Read in Order)

1. **`ai-instructions.md`** ⭐ **START HERE**
   - Tech stack and versions
   - NEVER/ALWAYS rules
   - Development workflow
   - Priorities

2. **`project-brief.md`**
   - Business context
   - Objectives and scope
   - Constraints and success metrics

3. **`README.md`**
   - Quick start
   - Installation and commands
   - Project directory tour

4. **`docs/architecture.md`**
   - System architecture pattern
   - Component structure
   - Request/response flow

5. **`docs/data-model.md`**
   - Database schema
   - Entity relationships
   - Data patterns

6. **`docs/code-standards.md`**
   - Naming conventions
   - Code quality rules
   - Error handling patterns

7. **`docs/testing.md`**
   - Testing strategy
   - Coverage requirements
   - Test patterns

8. **`docs/operations.md`**
   - Deployment procedures
   - Monitoring and alerts
   - Scaling strategy

9. **`docs/business-flows.md`**
   - End-to-end business processes
   - Key actors and systems
   - Flow diagrams

10. **`docs/api.md`**
    - Endpoint conventions
    - Authentication and pagination rules
    - Request/response examples

11. **`docs/contributing.md`**
    - Development setup
    - Contribution guidelines
    - Code review process

12. **`specs/security.md`**
    - Authentication/Authorization
    - Security policies
    - Compliance requirements

13. **`specs/configuration.md`**
    - Environment variables
    - External services
    - Configuration by environment

14. **`.env.example`**
    - Required environment variables
    - Default/local values
    - Secrets handling guidance

---

## ⚡ Quick Reference

### Tech Stack

**Backend:**

- Framework: {{FRAMEWORK}}
- Language: {{LANGUAGE}} {{LANGUAGE_VERSION}}
- Database: {{DATABASE}}
- ORM: {{ORM}}
- Authentication: {{AUTH_METHOD}}
- Caching: {{CACHE_STRATEGY}}

**Infrastructure:**

- Deployment: {{DEPLOYMENT_PLATFORM}}
- CI/CD: {{CICD_PLATFORM}}
- Monitoring: {{MONITORING_TOOLS}}

### Critical Rules

**❌ NEVER:**
{{NEVER_RULES}}

**✅ ALWAYS:**
{{ALWAYS_RULES}}

---

## 🤖 AI Assistant Workflow

When working on this project:

1. **🚀 Proactive Execution (MANDATORY):**
   - When any command starting with `/flow-` is detected (e.g., `/flow-build`, `/flow-work`, `/flow-check`), **IMMEDIATELY enter AGENT/EXECUTION MODE**.
   - **Do NOT ask for permission** to read files, write documents, or execute shell commands that are part of the interactive flow.
   - These flows already include their own internal planning and confirmation steps. Proactivity is key to efficiency.

2. **Before starting ANY task:**
   - Read `ai-instructions.md` for project-wide rules
   - Check relevant documentation for the area you're working on
   - Understand the business context from `project-brief.md`

3. **When implementing features:**
   - Follow architecture patterns from `docs/architecture.md`
   - Respect data models from `docs/data-model.md`
   - Apply code standards from `docs/code-standards.md`
   - Add tests according to `docs/testing.md`

4. **When handling security:**
   - Consult `specs/security.md` for auth/authz
   - Never hardcode secrets (use `specs/configuration.md`)
   - Follow security headers and encryption requirements

5. **When deploying:**
   - Follow procedures in `docs/operations.md`
   - Update configuration per environment
   - Check health endpoints

---

## 🛠️ Tool-Specific Configurations

Different AI tools have specific configuration files that extend this AGENT.md:

### Claude Code

- **File:** `.clauderules`
- **Purpose:** Claude-specific instructions and preferences
- **References:** This AGENT.md + project docs

### Cursor

- **File:** `.cursorrules`
- **Purpose:** Cursor-specific context and rules
- **References:** This AGENT.md + project docs

### GitHub Copilot

- **File:** `.github/copilot-instructions.md`
- **Purpose:** Copilot workspace instructions
- **References:** This AGENT.md + project docs

## **All tool-specific configs reference this AGENT.md as the source of truth.**

## 📊 Project Status

**Current Phase:** {{PROJECT_PHASE}}

**Architecture:** {{ARCHITECTURE_PATTERN}}

## **Compliance:** {{COMPLIANCE_REQUIREMENTS}}

## 🚀 Getting Started

### For AI Assistants

1. Read this AGENT.md completely
2. Read `ai-instructions.md` for critical rules
3. Familiarize with `docs/architecture.md`
4. Review `docs/code-standards.md` for coding patterns
5. Check `specs/security.md` before handling auth/sensitive data

### For Developers

## See `README.md` for installation and setup instructions.

## 📝 Document Update Policy

- Documents are **living artifacts** - update as project evolves
- Breaking changes to architecture → Update `docs/architecture.md`
  **Architecture:** {{ARCHITECTURE_PATTERN}}
  **Primary Language:** {{LANGUAGE}} {{LANGUAGE_VERSION}}
  **Framework:** {{FRAMEWORK}}
  **Database:** {{DATABASE}} with {{ORM}}

**Key Characteristics:**

- Authentication: {{AUTH_METHOD}}
- API Style: {{API_STYLE}}
- Deployment: {{DEPLOYMENT_PLATFORM}}
- Current Phase: {{PROJECT_PHASE}}

> This project uses AI-assisted development with comprehensive documentation.
> All files below provide context to AI assistants for consistent, high-quality code generation.

---

## 🏗️ Documentation Architecture

This project follows **AI-assisted development** with comprehensive documentation.
All documentation is structured to guide AI assistants in understanding the project deeply.

### 📚 Core Documentation (Read in Order)

1. **`ai-instructions.md`** ⭐ **START HERE**
   - Tech stack and versions
   - NEVER/ALWAYS rules
   - Development workflow
   - Priorities

2. **`project-brief.md`**
   - Business context
   - Objectives and scope
   - Constraints and success metrics

3. **`README.md`**
   - Quick start
   - Installation and commands
   - Project directory tour

4. **`docs/architecture.md`**
   - System architecture pattern
   - Component structure
   - Request/response flow

5. **`docs/data-model.md`**
   - Database schema
   - Entity relationships
   - Data patterns

6. **`docs/code-standards.md`**
   - Naming conventions
   - Code quality rules
   - Error handling patterns

7. **`docs/testing.md`**
   - Testing strategy
   - Coverage requirements
   - Test patterns

8. **`docs/operations.md`**
   - Deployment procedures
   - Monitoring and alerts
   - Scaling strategy

9. **`docs/business-flows.md`**
   - End-to-end business processes
   - Key actors and systems
   - Flow diagrams

10. **`docs/api.md`**
    - Endpoint conventions
    - Authentication and pagination rules
    - Request/response examples

11. **`docs/contributing.md`**
    - Development setup
    - Contribution guidelines
    - Code review process

12. **`specs/security.md`**
    - Authentication/Authorization
    - Security policies
    - Compliance requirements

13. **`specs/configuration.md`**
    - Environment variables
    - External services
    - Configuration by environment

14. **`.env.example`**
    - Required environment variables
    - Default/local values
    - Secrets handling guidance

---

## ⚡ Quick Reference

### Tech Stack

**Backend:**

- Framework: {{FRAMEWORK}}
- Language: {{LANGUAGE}} {{LANGUAGE_VERSION}}
- Database: {{DATABASE}}
- ORM: {{ORM}}
- Authentication: {{AUTH_METHOD}}
- Caching: {{CACHE_STRATEGY}}

**Infrastructure:**

- Deployment: {{DEPLOYMENT_PLATFORM}}
- CI/CD: {{CICD_PLATFORM}}
- Monitoring: {{MONITORING_TOOLS}}

### Critical Rules

**❌ NEVER:**
{{NEVER_RULES}}

**✅ ALWAYS:**
{{ALWAYS_RULES}}

---

## 🤖 AI Assistant Workflow

When working on this project:

1. **🚀 Proactive Execution (MANDATORY):**
   - When any command starting with `/flow-` is detected (e.g., `/flow-build`, `/flow-work`, `/flow-check`), **IMMEDIATELY enter AGENT/EXECUTION MODE**.
   - **Do NOT ask for permission** to read files, write documents, or execute shell commands that are part of the interactive flow.
   - These flows already include their own internal planning and confirmation steps. Proactivity is key to efficiency.

2. **Before starting ANY task:**
   - Read `ai-instructions.md` for project-wide rules
   - Check relevant documentation for the area you're working on
   - Understand the business context from `project-brief.md`

3. **When implementing features:**
   - Follow architecture patterns from `docs/architecture.md`
   - Respect data models from `docs/data-model.md`
   - Apply code standards from `docs/code-standards.md`
   - Add tests according to `docs/testing.md`

4. **When handling security:**
   - Consult `specs/security.md` for auth/authz
   - Never hardcode secrets (use `specs/configuration.md`)
   - Follow security headers and encryption requirements

5. **When deploying:**
   - Follow procedures in `docs/operations.md`
   - Update configuration per environment
   - Check health endpoints

---

## 🛠️ Tool-Specific Configurations

Different AI tools have specific configuration files that extend this AGENT.md:

### Claude Code

- **File:** `.clauderules`
- **Purpose:** Claude-specific instructions and preferences
- **References:** This AGENT.md + project docs

### Cursor

- **File:** `.cursorrules`
- **Purpose:** Cursor-specific context and rules
- **References:** This AGENT.md + project docs

### GitHub Copilot

- **File:** `.github/copilot-instructions.md`
- **Purpose:** Copilot workspace instructions
- **References:** This AGENT.md + project docs

## **All tool-specific configs reference this AGENT.md as the source of truth.**

## 📊 Project Status

**Current Phase:** {{PROJECT_PHASE}}

**Architecture:** {{ARCHITECTURE_PATTERN}}

## **Compliance:** {{COMPLIANCE_REQUIREMENTS}}

## 🚀 Getting Started

### For AI Assistants

1. Read this AGENT.md completely
2. Read `ai-instructions.md` for critical rules
3. Familiarize with `docs/architecture.md`
4. Review `docs/code-standards.md` for coding patterns
5. Check `specs/security.md` before handling auth/sensitive data

### For Developers

## See `README.md` for installation and setup instructions.

## 📝 Document Update Policy

- Documents are **living artifacts** - update as project evolves
- Breaking changes to architecture → Update `docs/architecture.md`
- New security requirements → Update `specs/security.md`
- Stack changes → Update `ai-instructions.md` AND this AGENT.md

**Last Updated:** {{GENERATION_DATE}}

**Generated by:** AI Flow v2.5.4
