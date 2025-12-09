# {{PROJECT_NAME}}

> {{PROJECT_DESCRIPTION}}

---

## 📋 Overview

{{PROBLEM_STATEMENT}}

**Target Users:** {{TARGET_USERS_SUMMARY}}

---

## ✨ Features

{{#EACH FEATURE}}

- **{{FEATURE_NAME}}**: {{FEATURE_DESCRIPTION}}
  {{/EACH}}

---

## 🏗️ Tech Stack

### Backend

- **Framework:** {{FRAMEWORK}} {{FRAMEWORK_VERSION}}
- **Language:** {{LANGUAGE}} {{LANGUAGE_VERSION}}
- **Database:** {{DATABASE}}
- **Authentication:** {{AUTH_METHOD}}

### Frontend

- **UI Framework:** {{UI_FRAMEWORK}} {{UI_FRAMEWORK_VERSION}}
- **Build Tool:** {{BUILD_TOOL}}
- **Styling:** {{STYLING_APPROACH}}
- **State Management:** {{STATE_MANAGEMENT}}
- **Testing:** {{UNIT_TEST_FRAMEWORK}}, {{E2E_FRAMEWORK}}

---

## 🚀 Getting Started

### Prerequisites

{{#EACH PREREQUISITE}}

- {{PREREQUISITE_NAME}} {{PREREQUISITE_VERSION}}
  {{/EACH}}

### Installation

```bash
# Clone repository
git clone {{REPOSITORY_URL}}
cd {{PROJECT_DIR}}

# Install backend dependencies
cd backend
{{INSTALL_COMMAND}}

# Copy environment variables
cp .env.example .env

# Setup database
{{DB_SETUP_COMMAND}}

# Run migrations
{{MIGRATION_COMMAND}}

# Install frontend dependencies
cd ../frontend
{{PACKAGE_MANAGER}} install

# Copy frontend environment variables
cp .env.example .env
```

### Development

**Backend:**
```bash
cd backend
{{DEV_COMMAND}}
```

The backend API will be available at `{{DEV_URL}}`

**Frontend:**
```bash
cd frontend
{{PACKAGE_MANAGER}} run dev
```

The frontend application will be available at `{{FRONTEND_DEV_URL}}`

---

## 🧪 Testing

**Backend:**
```bash
cd backend
# Run all tests
{{TEST_COMMAND}}

# Run with coverage
{{COVERAGE_COMMAND}}
```

**Frontend:**
```bash
cd frontend
# Run all tests
{{PACKAGE_MANAGER}} run test

# Run with coverage
{{PACKAGE_MANAGER}} run test:coverage

# Run E2E tests
{{PACKAGE_MANAGER}} run test:e2e
```

---

## 📦 Building

**Backend:**
```bash
cd backend
# Build for production
{{BUILD_COMMAND}}

# Start production server
{{PROD_COMMAND}}
```

**Frontend:**
```bash
cd frontend
# Build for production
{{PACKAGE_MANAGER}} run build

# Preview production build
{{PACKAGE_MANAGER}} run preview
```

---

## 🔧 Available Scripts

**Backend:**
```bash
{{#EACH SCRIPT}}
# {{SCRIPT_DESCRIPTION}}
{{SCRIPT_COMMAND}}

{{/EACH}}
```

**Frontend:**
```bash
- {{PACKAGE_MANAGER}} run dev - Start development server
- {{PACKAGE_MANAGER}} run build - Build for production
- {{PACKAGE_MANAGER}} run preview - Preview production build
- {{PACKAGE_MANAGER}} run test - Run tests
- {{PACKAGE_MANAGER}} run lint - Run linter
- {{PACKAGE_MANAGER}} run format - Format code
```

---

## 📁 Project Structure

```
{{PROJECT_STRUCTURE}}
```

---

## 📚 Documentation

### Backend Documentation

- [Architecture](docs/architecture.md) - System architecture and design patterns
- [Data Model](docs/data-model.md) - Database schema and relationships
- [Business Flows](docs/business-flows.md) - Main business processes and flowcharts
- [API Reference](docs/api.md) - Endpoints and conventions
- [Code Standards](docs/code-standards.md) - Coding conventions and quality rules
- [Testing](docs/testing.md) - Testing strategy and requirements
- [Operations](docs/operations.md) - Deployment and operational procedures
- [Security](specs/security.md) - Security policies and compliance
- [Configuration](specs/configuration.md) - Environment configuration
- [Contributing](docs/contributing.md) - How to contribute

### Frontend Documentation

- [Components](docs/components.md) - Component architecture
- [State Management](docs/state-management.md) - State patterns
- [Styling](docs/styling.md) - Styling guidelines
- [Testing](docs/testing.md) - Testing strategy
- [Accessibility](specs/accessibility.md) - A11y requirements

### For AI Assistants

- [AGENT.md](AGENT.md) - Universal AI configuration
- [AI Instructions](ai-instructions.md) - AI development rules and workflow

---

## 🔐 Environment Variables

See `.env.example` files in both `backend/` and `frontend/` directories for all required environment variables.

**Backend Critical Variables:**
{{#EACH CRITICAL_VAR}}

- `{{VAR_NAME}}` - {{VAR_DESCRIPTION}}
  {{/EACH}}

**Frontend Critical Variables:**
{{#EACH FRONTEND_CRITICAL_VAR}}

- `{{VAR_NAME}}` - {{VAR_DESCRIPTION}}
  {{/EACH}}

---

## 🚀 Deployment

See [docs/operations.md](docs/operations.md) for deployment procedures.

**Backend Platform:** {{DEPLOYMENT_PLATFORM}}

**Frontend Platform:** {{FRONTEND_DEPLOYMENT_PLATFORM}}

**Environments:**

- Development: Backend `{{DEV_URL}}` | Frontend `{{FRONTEND_DEV_URL}}`
- Staging: Backend `{{STAGING_URL}}` | Frontend `{{FRONTEND_STAGING_URL}}`
- Production: Backend `{{PRODUCTION_URL}}` | Frontend `{{FRONTEND_PRODUCTION_URL}}`

---

## 🤝 Contributing

See [docs/contributing.md](docs/contributing.md) for contribution guidelines.

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'feat: add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

---

## 📝 License

{{LICENSE}}

---

## 👥 Team

{{#EACH TEAM_MEMBER}}

- **{{MEMBER_NAME}}** - {{MEMBER_ROLE}}
  {{/EACH}}

---

## 📞 Support

{{#IF SUPPORT_EMAIL}}- Email: {{SUPPORT_EMAIL}}{{/IF}}
{{#IF SUPPORT_SLACK}}- Slack: {{SUPPORT_SLACK}}{{/IF}}
{{#IF ISSUE_TRACKER}}- Issues: {{ISSUE_TRACKER}}{{/IF}}

---

**Generated with** [AI Flow](https://github.com/victorvelazquez/ai-flow) 🚀

