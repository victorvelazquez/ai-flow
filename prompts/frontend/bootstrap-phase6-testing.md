# Phase 6: Testing Strategy

**Duration:** 15-25 minutes
**Questions:** ~12 questions
**Output:** docs/testing.md, parts of ai-instructions.md

---

## 🎯 Objective

Define your testing strategy:

1. What testing frameworks will you use?
2. What types of tests will you write?
3. What coverage targets?
4. How will tests run in CI/CD?

---

## 📋 Questions

### Question 6.1: Unit Testing Framework

**What unit test framework will you use?**

A) ⭐ **Vitest** (Recommended for most)
   - Features: Fast, Vite-native, compatible with Jest API
   - Best for: Vite projects, modern apps
   - Speed: Very fast (ESM native)
   - Bundle: N/A (dev dependency)

B) 🔥 **Jest**
   - Features: Mature, widely used, snapshot testing
   - Best for: React apps, large ecosystem
   - Speed: Fast (with SWC/ESBuild)
   - Bundle: N/A (dev dependency)

C) **Testing Library + Node Test Runner**
   - Features: Node.js built-in test runner (Node 18+)
   - Best for: Zero-dependency testing
   - Speed: Fast

D) **Mocha + Chai**
   - Features: Flexible, BDD-style
   - Best for: Legacy projects

**Your answer:**

---

### Question 6.2: Component Testing Library

**How will you test components?**

#### React

A) ⭐ **React Testing Library** (Recommended)
   - Philosophy: Test user behavior, not implementation
   - Features: Accessible queries, user-centric
   - Best for: All React apps

B) **Enzyme**
   - Features: Shallow rendering, instance testing
   - Best for: Legacy React apps
   - Note: Not recommended for new projects

#### Vue

A) ⭐ **Vue Test Utils** (Official)
   - Features: Vue-specific testing utilities
   - Best for: All Vue apps

#### Angular

A) ⭐ **Angular Testing Utilities** (Built-in)
   - Features: TestBed, ComponentFixture
   - Best for: All Angular apps

#### Svelte

A) ⭐ **Svelte Testing Library**
   - Features: User-centric testing
   - Best for: All Svelte apps

#### Solid

A) ⭐ **Solid Testing Library**
   - Features: Similar to React Testing Library
   - Best for: All Solid apps

**Your answer:**

---

### Question 6.3: E2E Testing Framework

**What E2E testing tool will you use?**

A) ⭐ **Playwright** (Recommended)
   - Features: Cross-browser, fast, modern API, auto-waiting
   - Browsers: Chromium, Firefox, WebKit
   - Best for: Most apps, CI/CD friendly
   - Speed: Very fast

B) 🔥 **Cypress**
   - Features: Great DX, time-travel debugging, visual testing
   - Browsers: Chrome, Firefox, Edge, Electron
   - Best for: Developer experience, visual regression
   - Speed: Fast

C) **Puppeteer**
   - Features: Chrome/Chromium only, powerful API
   - Best for: Chrome-only testing, scraping

D) **WebDriverIO**
   - Features: WebDriver protocol, cross-platform
   - Best for: Mobile testing, Appium integration

E) **No E2E tests**
   - Best for: MVPs, small apps

**Your answer:**

---

### Question 6.4: Testing Pyramid Distribution

**What test distribution will you target?**

A) ⭐ **Standard Pyramid** (Recommended)
   - 70% Unit tests
   - 20% Integration tests
   - 10% E2E tests
   - Best for: Most apps, balanced approach

B) **Heavy Unit**
   - 85% Unit tests
   - 10% Integration tests
   - 5% E2E tests
   - Best for: Logic-heavy apps, libraries

C) **Heavy Integration**
   - 50% Unit tests
   - 40% Integration tests
   - 10% E2E tests
   - Best for: UI-heavy apps, component libraries

D) **Testing Trophy** (Kent C. Dodds)
   - 30% Unit tests
   - 50% Integration tests
   - 20% E2E tests
   - Best for: User-centric apps

**Your answer:**

---

### Question 6.5: Code Coverage Targets

**What coverage percentage will you target?**

A) ⭐ **80% / 75% / 80% / 80%** (Recommended)
   - Statements: 80%
   - Branches: 75%
   - Functions: 80%
   - Lines: 80%
   - Best for: Most production apps

B) **100% / 100% / 100% / 100%** (Strict)
   - All coverage at 100%
   - Best for: Critical apps (finance, healthcare)
   - Note: May be impractical

C) **60% / 60% / 60% / 60%** (Lenient)
   - Best for: MVPs, startups

D) **No coverage targets**
   - Best for: Prototypes only

**Your answer:**

**Enforce coverage in CI?**
A) Yes - Fail CI if below threshold
B) No - Report only, no enforcement

---

### Question 6.6: Snapshot Testing

**Will you use snapshot testing?**

Snapshot testing = Capture component output, detect unexpected changes

A) ⭐ **Yes, for components**
   - Test component output snapshots
   - Best for: Preventing regressions
   - Tools: Jest/Vitest snapshots

B) **Yes, for components + visual regression**
   - Add visual snapshot testing (screenshot comparison)
   - Best for: UI-critical apps
   - Tools: Percy, Chromatic, Playwright screenshots

C) **No snapshot testing**
   - Best for: Avoiding brittle tests

**Your answer:**

---

### Question 6.7: Test Data & Fixtures

**How will you manage test data?**

A) ⭐ **Factory functions** (Recommended)
   ```typescript
   const createUser = (overrides = {}) => ({
     id: '1',
     name: 'John Doe',
     email: 'john@example.com',
     ...overrides
   });
   ```
   - Best for: Flexible, reusable test data

B) **Static fixtures**
   ```typescript
   // fixtures/users.json
   {
     "user1": { "id": "1", "name": "John Doe" }
   }
   ```
   - Best for: Consistent test data

C) **Faker.js / @faker-js/faker**
   - Generate random realistic data
   - Best for: Large datasets, avoiding hardcoding

D) **Inline data**
   - Define data directly in tests
   - Best for: Simple tests

**Your answer:**

---

### Question 6.8: Mocking Strategy

**How will you mock dependencies?**

A) ⭐ **Mock Service Worker (MSW)** (Recommended for API mocking)
   - Features: Intercept network requests, works in tests and browser
   - Best for: API mocking, realistic tests
   - Example:
     ```typescript
     rest.get('/api/users', (req, res, ctx) => {
       return res(ctx.json({ users: [...] }));
     });
     ```

B) **Vitest/Jest mocks**
   - Features: `vi.mock()` / `jest.mock()` for modules
   - Best for: Module/function mocking
   - Example:
     ```typescript
     vi.mock('./api', () => ({
       fetchUser: vi.fn(() => Promise.resolve({ id: '1' }))
     }));
     ```

C) **Manual mocks**
   - Features: Create mock implementations manually
   - Best for: Full control

D) **No mocking**
   - Test against real APIs
   - Best for: Integration tests only

**Your answer:**

---

### Question 6.9: Test Organization

**How will you organize tests?**

A) ⭐ **Collocated with source** (Recommended)
   ```
   components/
   ├── Button/
   │   ├── Button.tsx
   │   ├── Button.test.tsx
   │   └── Button.stories.tsx
   ```
   - Best for: Modularity, easy to find tests

B) **Separate __tests__ folder**
   ```
   components/
   ├── Button/
   │   ├── Button.tsx
   │   └── __tests__/
   │       └── Button.test.tsx
   ```
   - Best for: Jest convention

C) **Mirrored test folder**
   ```
   src/
   ├── components/Button.tsx
   tests/
   ├── components/Button.test.tsx
   ```
   - Best for: Separation of concerns

**Your answer:**

**E2E test location:**
- `e2e/` folder at root
- `tests/e2e/` folder
- `__e2e__/` folders throughout

---

### Question 6.10: CI/CD Test Execution

**How will tests run in CI?**

A) ⭐ **All tests on every PR** (Recommended)
   - Unit + Integration + E2E
   - Best for: Most apps, catch regressions early

B) **Unit/Integration on PR, E2E on merge to main**
   - Faster PR feedback, comprehensive on main
   - Best for: Slow E2E suites

C) **Unit on PR, full suite nightly**
   - Best for: Very large test suites

D) **Manual test runs**
   - Not recommended

**Your answer:**

**Parallel test execution:**
A) Yes - Run tests in parallel (faster)
B) No - Sequential execution

**Retry failed tests:**
A) Yes - Retry flaky tests (specify retries: ___)
B) No - Fail immediately

---

### Question 6.11: Visual Regression Testing

**Will you do visual regression testing?**

Visual regression = Screenshot comparison to detect unintended UI changes

A) ⭐ **Yes, with Percy / Chromatic**
   - Features: Cloud-based, visual diffs, review UI
   - Best for: Design-critical apps, component libraries

B) **Yes, with Playwright snapshots**
   - Features: Local screenshot comparison
   - Best for: Self-hosted, free option

C) **No visual regression**
   - Best for: MVPs, non-visual apps

**Your answer:**

**If yes, what to test:**
- [ ] Critical user flows (checkout, signup)
- [ ] All components (Storybook)
- [ ] Responsive breakpoints
- [ ] Dark/light themes

---

### Question 6.12: Accessibility Testing

**How will you test accessibility?**

A) ⭐ **jest-axe / vitest-axe**
   ```typescript
   it('has no a11y violations', async () => {
     const { container } = render(<Button>Click me</Button>);
     const results = await axe(container);
     expect(results).toHaveNoViolations();
   });
   ```
   - Best for: Automated a11y checks in unit tests

B) **@axe-core/playwright / @axe-core/cypress**
   - E2E accessibility testing
   - Best for: Full-page a11y scans

C) **Manual testing**
   - Screen reader testing, keyboard navigation
   - Best for: Comprehensive a11y

D) **No automated a11y testing**
   - Best for: MVPs only (not recommended)

E) **Combined (automated + manual)**
   - Best for: WCAG compliance

**Your answer:**

---

## 📊 Phase 6 Summary

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 PHASE 6 SUMMARY: TESTING STRATEGY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Unit Testing: [Answer from 6.1]
Component Testing: [Answer from 6.2]
E2E Testing: [Answer from 6.3]
Test Distribution: [Answer from 6.4]
Coverage Targets: [Answer from 6.5]
Snapshot Testing: [Answer from 6.6]
Test Data: [Answer from 6.7]
Mocking Strategy: [Answer from 6.8]
Test Organization: [Answer from 6.9]
CI/CD Execution: [Answer from 6.10]
Visual Regression: [Answer from 6.11]
A11y Testing: [Answer from 6.12]

Is this correct? (Y/n)
```

---

## 📝 Document Generation

Generate `docs/testing.md` with these placeholders:

- `{{UNIT_TEST_FRAMEWORK}}` → Vitest / Jest / etc.
- `{{COMPONENT_TEST_LIBRARY}}` → React Testing Library / Vue Test Utils / etc.
- `{{E2E_FRAMEWORK}}` → Playwright / Cypress / etc.
- `{{TEST_DISTRIBUTION}}` → Testing pyramid percentages
- `{{COVERAGE_TARGETS}}` → Coverage thresholds
- `{{SNAPSHOT_TESTING}}` → Yes/No and strategy
- `{{TEST_DATA_STRATEGY}}` → Factory / Fixtures / Faker
- `{{MOCKING_LIBRARY}}` → MSW / Vitest mocks / etc.
- `{{TEST_ORGANIZATION}}` → Collocated / Separate / Mirrored
- `{{CI_STRATEGY}}` → How tests run in CI
- `{{VISUAL_REGRESSION_TOOL}}` → Percy / Playwright / None
- `{{A11Y_TESTING}}` → jest-axe / Manual / Combined

Update `ai-instructions.md`:

```markdown
## Testing

- **Unit Tests:** {{UNIT_TEST_FRAMEWORK}}
- **Component Tests:** {{COMPONENT_TEST_LIBRARY}}
- **E2E Tests:** {{E2E_FRAMEWORK}}
- **Coverage:** {{COVERAGE_TARGETS}}

### Rules

- ✅ ALWAYS write tests for new features
- ✅ ALWAYS test user behavior, not implementation details
- ✅ ALWAYS use accessible queries (getByRole, getByLabelText)
- ❌ NEVER test implementation details (state, props directly)
- ❌ NEVER commit untested code
- ✅ ALWAYS mock external APIs with {{MOCKING_LIBRARY}}
{{#IF_SNAPSHOT_TESTING}}
- ✅ ALWAYS review snapshot changes carefully
{{/IF_SNAPSHOT_TESTING}}
{{#IF_A11Y_TESTING}}
- ✅ ALWAYS include axe accessibility checks in component tests
{{/IF_A11Y_TESTING}}
- ✅ ALWAYS maintain {{COVERAGE_TARGETS}}% code coverage
```

---

## 🚀 Next Steps

```
✅ Phase 6 Complete!

Documents Generated:
  - docs/testing.md
  - ai-instructions.md (updated)

Next: Phase 7 - Performance & Deployment

Read: .ai-bootstrap/prompts/frontend/bootstrap-phase7-deployment.md
```

---

**Last Updated:** 2025-01-XX

**Version:** 1.2.0
