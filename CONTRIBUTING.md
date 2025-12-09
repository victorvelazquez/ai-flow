# Contributing to AI Flow

Thank you for your interest in contributing to AI Flow! This document provides guidelines and instructions for contributing to the project.

## 🌟 Ways to Contribute

- 🐛 Report bugs and issues
- 💡 Suggest new features or improvements
- 📝 Improve documentation
- 🧪 Add or improve tests
- 🔧 Fix bugs or implement features
- 🌍 Add translations or improve existing ones
- 📦 Create templates for other frameworks/languages

## 📋 Code of Conduct

### Our Standards

- Be respectful and inclusive
- Accept constructive criticism gracefully
- Focus on what's best for the community
- Show empathy towards others
- Use welcoming and inclusive language

### Unacceptable Behavior

- Harassment, trolling, or insulting comments
- Publishing others' private information
- Any conduct inappropriate in a professional setting

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- Git
- A GitHub account

### Setup Development Environment

1. **Fork the repository** on GitHub

2. **Clone your fork:**

   ```bash
   git clone https://github.com/YOUR_USERNAME/ai-flow.git
   cd ai-flow
   ```

3. **Add upstream remote:**

   ```bash
   git remote add upstream https://github.com/victorvelazquez/ai-flow.git
   ```

4. **Install dependencies:**

   ```bash
   npm install
   ```

5. **Build the project:**

   ```bash
   npm run build
   ```

6. **Run tests:**
   ```bash
   npm test
   ```

## 🔄 Development Workflow

### 1. Create a Branch

Always create a new branch for your work:

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-description
```

**Branch naming conventions:**

- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `test/` - Test additions or modifications
- `refactor/` - Code refactoring
- `chore/` - Maintenance tasks

### 2. Make Your Changes

#### Code Style

- **TypeScript**: Use strict mode, explicit types
- **Formatting**: Follow existing code style
- **Naming**:
  - Files: `kebab-case.ts`
  - Classes/Interfaces: `PascalCase`
  - Functions/Variables: `camelCase`
  - Constants: `UPPER_SNAKE_CASE`

#### Best Practices

- Write self-documenting code
- Add JSDoc comments for exported functions
- Keep functions small and focused
- Follow SOLID principles
- Prefer composition over inheritance
- Use async/await over promises

### 3. Write Tests

**All new features must include tests:**

```bash
# Create test file alongside your code
__tests__/your-feature.test.js
```

**Test requirements:**

- Unit tests for business logic
- Integration tests for CLI commands
- Maintain or improve coverage
- Tests must pass before submitting PR

**Run tests:**

```bash
npm test                 # Run all tests
npm run test:watch      # Watch mode
```

### 4. Update Documentation

If your changes affect user-facing features:

- Update `README.md`
- Update `CLAUDE.md` if changing architecture
- Update relevant templates in `templates/`
- Add/update JSDoc comments

### 5. Commit Your Changes

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```bash
git commit -m "type(scope): description"
```

**Types:**

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `style`: Code style (formatting, semicolons, etc.)
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `perf`: Performance improvement
- `ci`: CI/CD changes

**Examples:**

```bash
git commit -m "feat(cli): add --verbose flag for detailed output"
git commit -m "fix(templates): correct placeholder syntax in AGENT.md"
git commit -m "docs(readme): update installation instructions"
git commit -m "test(cli): add integration tests for init command"
```

**Commit message guidelines:**

- Use present tense ("add feature" not "added feature")
- Use imperative mood ("move cursor to..." not "moves cursor to...")
- First line max 72 characters
- Reference issues: "fix: resolve template bug (#123)"

### 6. Keep Your Branch Updated

```bash
git fetch upstream
git rebase upstream/main
```

### 7. Run Quality Checks

Before submitting, ensure:

```bash
# Lint code
npm run lint

# Run all tests
npm test

# Build successfully
npm run build

# Check for security vulnerabilities
npm audit
```

Or use the built-in pre-PR check:

```bash
# After building, you can test the CLI
node dist/cli.js init test-project --ai all --name "Test" --description "Test"
```

## 📤 Submitting a Pull Request

### Pre-submission Checklist

- [ ] Code follows project style guidelines
- [ ] All tests pass (`npm test`)
- [ ] No linting errors (`npm run lint`)
- [ ] Build succeeds (`npm run build`)
- [ ] Documentation updated (if needed)
- [ ] Commits follow Conventional Commits format
- [ ] Branch is up to date with `main`
- [ ] No merge conflicts

### Creating the PR

1. **Push your branch:**

   ```bash
   git push origin feature/your-feature-name
   ```

2. **Open a Pull Request** on GitHub

3. **Fill out the PR template:**

   - Clear description of changes
   - Reference related issues
   - Screenshots (if UI changes)
   - Breaking changes (if any)

4. **PR Title Format:**
   ```
   feat: add new feature
   fix: resolve bug in CLI
   docs: improve README examples
   ```

### PR Review Process

- Maintainers will review your PR
- Address any requested changes
- Keep discussions respectful and constructive
- Once approved, maintainers will merge

### After Your PR is Merged

1. **Delete your branch:**

   ```bash
   git branch -d feature/your-feature-name
   git push origin --delete feature/your-feature-name
   ```

2. **Update your fork:**
   ```bash
   git checkout main
   git pull upstream main
   git push origin main
   ```

## 🐛 Reporting Bugs

### Before Submitting

- Check existing issues to avoid duplicates
- Update to latest version
- Test in a clean environment

### Bug Report Template

```markdown
**Description:**
Clear description of the bug

**Steps to Reproduce:**

1. Run command...
2. Enter input...
3. See error...

**Expected Behavior:**
What should happen

**Actual Behavior:**
What actually happens

**Environment:**

- OS: [e.g., Windows 11, macOS 14, Ubuntu 22.04]
- Node.js version: [e.g., 18.20.0]
- ai-flow version: [e.g., 0.0.1]

**Additional Context:**
Error messages, screenshots, logs
```

## 💡 Suggesting Features

### Feature Request Template

```markdown
**Problem:**
What problem does this solve?

**Proposed Solution:**
How should it work?

**Alternatives Considered:**
Other approaches you've thought about

**Additional Context:**
Examples, mockups, references
```

## 📚 Project Structure

```
ai-flow/
├── src/
│   └── cli.ts              # Main CLI application
├── __tests__/              # Test files
│   ├── cli.test.js
│   ├── helpers.test.js
│   └── bootstrap.test.js
├── templates/              # Document templates
│   ├── AGENT.template.md
│   ├── docs/
│   └── specs/
├── prompts/                # Master prompts
│   └── backend/
│       └── bootstrap.md    # Master prompt + phase files
│   ├── claude/
│   ├── cursor/
│   ├── copilot/
│   └── gemini/
└── scripts/                # Setup scripts
```

## 🧪 Testing Guidelines

### Test Structure

```javascript
describe("Feature Name", () => {
  beforeEach(() => {
    // Setup
  });

  afterEach(() => {
    // Cleanup
  });

  it("should do something specific", () => {
    // Arrange
    const input = "test";

    // Act
    const result = someFunction(input);

    // Assert
    expect(result).toBe("expected");
  });
});
```

### Coverage Requirements

- Minimum 80% overall coverage
- All new features must have tests
- Critical paths require 100% coverage

## 🔐 Security

### Reporting Security Issues

**DO NOT** open public issues for security vulnerabilities.

Email: victorvelazqueza@gmail.com

Include:

- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

### Security Best Practices

- Never commit secrets or API keys
- Use environment variables for sensitive data
- Validate all user input
- Keep dependencies updated
- Follow OWASP guidelines

## 📦 Release Process

(For maintainers)

1. Update version in `package.json`
2. Update `CHANGELOG.md`
3. Create git tag: `git tag v0.0.2`
4. Push tag: `git push origin v0.0.2`
5. Publish to npm: `npm publish`
6. Create GitHub release

## 🎯 Areas Needing Contribution

### High Priority

- [ ] E2E test suite
- [ ] Frontend bootstrap support
- [ ] Performance optimizations
- [ ] Additional language translations

### Medium Priority

- [ ] VS Code extension
- [ ] Interactive web UI
- [ ] More template examples
- [ ] Video tutorials

### Documentation

- [ ] More usage examples
- [ ] Architecture diagrams
- [ ] API documentation
- [ ] Contributing guides

## 💬 Community

- **Issues**: [GitHub Issues](https://github.com/victorvelazquez/ai-flow/issues)
- **Email**: victorvelazqueza@gmail.com

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 🙏 Recognition

Contributors will be:

- Listed in `CONTRIBUTORS.md`
- Mentioned in release notes
- Credited in documentation

## ❓ Questions?

- Check [README.md](README.md)
- Check [CLAUDE.md](CLAUDE.md) for architecture
- Open an [Issue](https://github.com/victorvelazquez/ai-flow/issues)
- Ask in your PR or issue

---

**Thank you for contributing to AI Flow!** 🚀

Every contribution, no matter how small, makes a difference. We appreciate your time and effort in making this project better.
