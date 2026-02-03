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

- **Framework:** {{FRAMEWORK}} {{FRAMEWORK_VERSION}}
- **Language:** {{LANGUAGE}} {{LANGUAGE_VERSION}}
- **Database:** {{DATABASE}}
- **Authentication:** {{AUTH_METHOD}}
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

# Install dependencies
{{INSTALL_COMMAND}}

# Copy environment variables
cp .env.example .env

# Edit .env with your configuration
# See .env.example for required variables

# Setup database
{{DB_SETUP_COMMAND}}

# Run migrations
{{MIGRATION_COMMAND}}

# Start development server
{{DEV_COMMAND}}
```

The application will be available at `{{DEV_URL}}`
---
## 🧪 Testing

```bash
# Run all tests
{{TEST_COMMAND}}

# Run with coverage
{{COVERAGE_COMMAND}}

# Run specific tests
{{TEST_SPECIFIC_COMMAND}}
```
---
## 📦 Building

```bash
# Build for production
{{BUILD_COMMAND}}

# Start production server
{{PROD_COMMAND}}
```
---
## 🔧 Available Scripts

```bash
{{#EACH SCRIPT}}
# {{SCRIPT_DESCRIPTION}}
{{SCRIPT_COMMAND}}

{{/EACH}}
```
---
## 📁 Project Structure

```
{{PROJECT_STRUCTURE}}
```
---
## 📚 Documentation

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

### For AI Assistants

- [AGENT.md](AGENT.md) - Universal AI configuration
- [AI Instructions](ai-instructions.md) - AI development rules and workflow
---
## 🔐 Environment Variables

See `.env.example` for all required environment variables.

Critical variables:
{{#EACH CRITICAL_VAR}}

- `{{VAR_NAME}}` - {{VAR_DESCRIPTION}}
  {{/EACH}}
---
## 🚀 Deployment

See [docs/operations.md](docs/operations.md) for deployment procedures.

**Platform:** {{DEPLOYMENT_PLATFORM}}

**Environments:**

- Development: {{DEV_URL}}
- Staging: {{STAGING_URL}}
- Production: {{PRODUCTION_URL}}
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
**Generated with** [AI Flow](https://github.com/victorvelazquez/ai-flow) | `npm i -g ai-flow-dev` 🚀


