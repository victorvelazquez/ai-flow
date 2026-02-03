# Testing Strategy

> Testing approach, standards, and quality requirements for {{PROJECT_NAME}}
---
## 🎯 Testing Philosophy

{{TESTING_PHILOSOPHY}}

**Quality Gates:**
- Minimum {{MIN_COVERAGE}}% code coverage
- All tests must pass before merge
- No skipped tests in main branch
- Critical paths require integration tests
---
## 🧪 Testing Framework

**Primary Framework:** {{TEST_FRAMEWORK}}

**Assertion Library:** {{ASSERTION_LIBRARY}}

**Mocking Library:** {{MOCKING_LIBRARY}}

**Test Runner:** {{TEST_RUNNER}}
---
## 📊 Test Types

### Unit Tests ({{UNIT_TEST_PERCENTAGE}}% of tests)

**Purpose:** Test individual functions/methods in isolation

**Characteristics:**
- Fast execution (milliseconds)
- No external dependencies
- Mock all dependencies
- Test single responsibility

**Coverage Target:** {{UNIT_COVERAGE_TARGET}}%+

**What to test:**
- ✅ Services and business logic
- ✅ Utilities and helpers
- ✅ Pure functions
- ✅ Validation logic
- ✅ Transformations and calculations

**What NOT to test:**
- ❌ Framework code
- ❌ Third-party libraries
- ❌ Simple getters/setters
- ❌ DTOs without logic

**Example:**
```{{LANGUAGE}}
{{UNIT_TEST_EXAMPLE}}
```

### Integration Tests ({{INTEGRATION_TEST_PERCENTAGE}}% of tests)

**Purpose:** Test multiple components working together

**Characteristics:**
- Slower than unit tests (seconds)
- Real database {{#IF_TEST_DB}}({{TEST_DB_TYPE}}){{/IF_TEST_DB}}
- Real external service connections (or reliable mocks)
- Test data flow through layers

**Coverage Target:** {{INTEGRATION_COVERAGE_TARGET}}%+

**What to test:**
- ✅ Controller → Service → Repository flow
- ✅ Database queries and transactions
- ✅ Authentication/Authorization flows
- ✅ Critical business workflows
- ✅ External API integrations

**Example:**
```{{LANGUAGE}}
{{INTEGRATION_TEST_EXAMPLE}}
```

### End-to-End Tests ({{E2E_TEST_PERCENTAGE}}% of tests)

**Purpose:** Test complete user flows from API request to response

**Characteristics:**
- Slowest (seconds to minutes)
- Full application stack
- Real database
- Real HTTP requests

**Coverage Target:** {{E2E_COVERAGE_TARGET}}%+

**What to test:**
- ✅ Critical user journeys
- ✅ Authentication flows (login, signup, password reset)
- ✅ Core business processes
- ✅ Payment flows
- ✅ Data export/import

**Tool:** {{E2E_TOOL}}

**Example:**
```{{LANGUAGE}}
{{E2E_TEST_EXAMPLE}}
```

{{#IF CONTRACT_TESTS}}
### Contract Tests

**Purpose:** Verify API contracts between services/consumers

**Tool:** {{CONTRACT_TEST_TOOL}}

**When to use:**
- Microservices architecture
- External API consumers
- Frontend/Backend contracts

**Strategy:**
- Consumer-driven contracts (CDC)
- Provider contracts verification
- Contract versioning

**Example:**
```{{LANGUAGE}}
{{CONTRACT_TEST_EXAMPLE}}
```

**Contract Management:**
- Contract storage: {{CONTRACT_STORAGE}}
- Versioning: {{CONTRACT_VERSIONING}}
- Breaking changes: {{CONTRACT_BREAKING_CHANGES}}

{{/IF}}

{{#IF PERFORMANCE_TESTS}}
### Performance Tests

**Purpose:** Verify system performance under load

**Tool:** {{PERFORMANCE_TEST_TOOL}}

**Test Types:**
- **Load Testing**: Normal expected load
- **Stress Testing**: Beyond normal capacity
- **Spike Testing**: Sudden load increases
- **Endurance Testing**: Sustained load over time

**Metrics:**
- Response time (p50, p95, p99)
- Throughput (requests/second)
- Error rate
- Resource usage (CPU, memory, disk, network)

**Thresholds:**
{{#EACH PERFORMANCE_THRESHOLD}}
- {{METRIC_NAME}}: {{THRESHOLD_VALUE}}
{{/EACH}}

**Test Scenarios:**
{{#EACH PERFORMANCE_SCENARIO}}
#### {{SCENARIO_NAME}}

- Load: {{SCENARIO_LOAD}}
- Duration: {{SCENARIO_DURATION}}
- Expected: {{SCENARIO_EXPECTED}}
- Actual: {{SCENARIO_ACTUAL}}

{{/EACH}}

**Example:**
```{{LANGUAGE}}
{{PERFORMANCE_TEST_EXAMPLE}}
```

{{/IF}}

{{#IF CHAOS_ENGINEERING}}
### Chaos Engineering

**Purpose:** Test system resilience to failures

**Tool:** {{CHAOS_TOOL}}

**Chaos Experiments:**
{{#EACH CHAOS_EXPERIMENT}}
#### {{EXPERIMENT_NAME}}

**Type:** {{EXPERIMENT_TYPE}}

**Hypothesis:** {{EXPERIMENT_HYPOTHESIS}}

**Method:**
{{#EACH EXPERIMENT_STEP}}
{{STEP_NUMBER}}. {{STEP_DESCRIPTION}}
{{/EACH}}

**Expected Behavior:** {{EXPERIMENT_EXPECTED}}

**Results:** {{EXPERIMENT_RESULTS}}

{{/EACH}}

**Common Scenarios:**
- Network latency injection
- Service failures
- Database connection failures
- CPU/memory exhaustion
- Disk space issues

**Safety Rules:**
- ✅ Run in staging first
- ✅ Have rollback plan ready
- ✅ Monitor metrics during experiments
- ✅ Limit blast radius
- ❌ Never run in production without approval

{{/IF}}
---
## 📁 Test Organization

### File Structure

**Pattern:** {{TEST_FILE_PATTERN}}

{{#IF COLOCATED}}
### Co-located Tests

```
src/
  users/
    user.service.ts
    user.service.spec.ts      ← Unit tests
    user.controller.ts
    user.controller.spec.ts
    user.integration.spec.ts  ← Integration tests
```

{{ELSE}}
### Separate Test Directory

```
src/
  users/
    user.service.ts
    user.controller.ts

tests/
  unit/
    users/
      user.service.test.ts
  integration/
    users/
      user.integration.test.ts
  e2e/
    users/
      user.e2e.test.ts
```

{{/IF}}

### Naming Conventions

**Test Files:**
```
{{TEST_FILE_NAMING_EXAMPLES}}
```

**Test Descriptions:**
```{{LANGUAGE}}
describe('{{DESCRIBE_EXAMPLE}}', () => {
  describe('{{METHOD_NAME}}', () => {
    it('should {{EXPECTED_BEHAVIOR}} when {{CONDITION}}', () => {
      // test implementation
    });
  });
});
```
---
## 🎭 Mocking Strategy

### What to Mock

✅ **Always mock:**
- External APIs (third-party services)
- Payment gateways
- Email/SMS services
- File system operations (in unit tests)
- Time/Date functions
- Random number generators

❌ **Never mock:**
- Internal business logic
- Domain models
- Value objects
- Simple utilities

### Mocking Patterns

#### Database Mocking (Unit Tests)

```{{LANGUAGE}}
{{DATABASE_MOCK_EXAMPLE}}
```

#### External API Mocking

```{{LANGUAGE}}
{{EXTERNAL_API_MOCK_EXAMPLE}}
```

#### Time Mocking

```{{LANGUAGE}}
{{TIME_MOCK_EXAMPLE}}
```
---
## 🗄️ Test Database

### Strategy

{{TEST_DB_STRATEGY}}

{{#IF IN_MEMORY_DB}}
### In-Memory Database

**Type:** {{IN_MEMORY_DB_TYPE}}

**Benefits:**
- Fast test execution
- Isolated tests
- No cleanup needed

**Limitations:**
- Different DB from production
- Some features may not work identically

{{/IF}}

{{#IF DOCKER_TEST_DB}}
### Docker Test Database

**Image:** {{TEST_DB_IMAGE}}

**Tool:** {{TEST_CONTAINER_TOOL}}

**Benefits:**
- Same database as production
- Realistic testing
- Isolated per test run

**Setup:**
```bash
{{TEST_DB_SETUP_COMMAND}}
```

{{/IF}}

### Database Seeding

**Strategy:** {{DB_SEED_STRATEGY}}

```{{LANGUAGE}}
{{DB_SEED_EXAMPLE}}
```

### Database Cleanup

**When:** {{DB_CLEANUP_WHEN}}

```{{LANGUAGE}}
{{DB_CLEANUP_EXAMPLE}}
```
---
## 🏭 Test Data Factories

**Library:** {{FACTORY_LIBRARY}}

**Location:** `{{FACTORY_LOCATION}}`

### Factory Example

```{{LANGUAGE}}
{{FACTORY_EXAMPLE}}
```

### Usage

```{{LANGUAGE}}
{{FACTORY_USAGE_EXAMPLE}}
```

### Factory Rules

- ✅ Use factories for all test entities
- ✅ Provide sensible defaults
- ✅ Allow overrides for specific tests
- ✅ Keep factories DRY
- ❌ Don't hardcode test data in tests
---
## ✅ Test Structure

### AAA Pattern (Arrange, Act, Assert)

```{{LANGUAGE}}
{{AAA_PATTERN_EXAMPLE}}
```

### Given-When-Then (BDD)

```{{LANGUAGE}}
{{GIVEN_WHEN_THEN_EXAMPLE}}
```
---
## 🎯 Testing Best Practices

### General

- ✅ Tests should be independent (no test order dependency)
- ✅ Tests should be deterministic (same result every time)
- ✅ Tests should be fast (especially unit tests)
- ✅ Test names should clearly describe what they test
- ✅ One assertion per test (when possible)
- ✅ Test edge cases and error conditions
- ❌ Don't test implementation details
- ❌ Don't write tests that depend on each other
- ❌ Don't test external libraries

### Test Coverage

**Minimum Requirements:**
- Overall: {{MIN_COVERAGE}}%
- Services: {{SERVICE_COVERAGE}}%
- Controllers: {{CONTROLLER_COVERAGE}}%
- Repositories: {{REPOSITORY_COVERAGE}}%
- Utilities: {{UTILITY_COVERAGE}}%

**Exceptions (don't need 100% coverage):**
- Configuration files
- DTOs without logic
- Simple CRUD operations
- Type definitions

### What to Test

✅ **Do test:**
- Happy path (expected behavior)
- Error cases (validation, not found, unauthorized)
- Edge cases (empty arrays, null values, boundaries)
- Security (authentication, authorization)
- Business rules
- Data transformations

❌ **Don't test:**
- Framework behavior
- External libraries
- Getters/setters without logic
- Auto-generated code
---
## 🔧 Test Configuration

### Jest Configuration

**File:** `{{JEST_CONFIG_FILE}}`

```javascript
{{JEST_CONFIG_EXAMPLE}}
```

### Test Scripts

```json
{
  "scripts": {
    "test": "{{TEST_COMMAND}}",
    "test:unit": "{{TEST_UNIT_COMMAND}}",
    "test:integration": "{{TEST_INTEGRATION_COMMAND}}",
    "test:e2e": "{{TEST_E2E_COMMAND}}",
    "test:watch": "{{TEST_WATCH_COMMAND}}",
    "test:coverage": "{{TEST_COVERAGE_COMMAND}}",
    "test:debug": "{{TEST_DEBUG_COMMAND}}"
  }
}
```
---
## 🚀 Running Tests

### Local Development

```bash
# Run all tests
{{RUN_ALL_TESTS}}

# Run tests in watch mode
{{RUN_TESTS_WATCH}}

# Run specific test file
{{RUN_SPECIFIC_TEST}}

# Run tests matching pattern
{{RUN_TESTS_PATTERN}}

# Run with coverage
{{RUN_TESTS_COVERAGE}}

# Debug tests
{{DEBUG_TESTS}}
```

### CI/CD

**Platform:** {{CICD_PLATFORM}}

**When tests run:**
{{#EACH TEST_TRIGGER}}
- {{TRIGGER_DESCRIPTION}}
{{/EACH}}

**Pipeline configuration:**
```yaml
{{CICD_TEST_CONFIG}}
```
---
## 📊 Coverage Reports

### Viewing Coverage

```bash
{{COVERAGE_COMMAND}}
```

**Coverage Report Location:** `{{COVERAGE_OUTPUT_DIR}}`

**Formats:**
- HTML: `{{COVERAGE_HTML_PATH}}`
- LCOV: `{{COVERAGE_LCOV_PATH}}`
- Text: Console output

### Coverage Thresholds

```javascript
{
  "coverageThreshold": {
    "global": {
      "branches": {{BRANCH_COVERAGE}},
      "functions": {{FUNCTION_COVERAGE}},
      "lines": {{LINE_COVERAGE}},
      "statements": {{STATEMENT_COVERAGE}}
    }
  }
}
```

**Enforcement:** Tests fail if coverage drops below thresholds
---
## 🧬 Test Examples

### Service Test

```{{LANGUAGE}}
{{SERVICE_TEST_FULL_EXAMPLE}}
```

### Controller Test

```{{LANGUAGE}}
{{CONTROLLER_TEST_FULL_EXAMPLE}}
```

### Repository Test

```{{LANGUAGE}}
{{REPOSITORY_TEST_FULL_EXAMPLE}}
```

### E2E Test

```{{LANGUAGE}}
{{E2E_TEST_FULL_EXAMPLE}}
```
---
## 🔒 Testing Security

### Authentication Tests

```{{LANGUAGE}}
{{AUTH_TEST_EXAMPLE}}
```

### Authorization Tests

```{{LANGUAGE}}
{{AUTHZ_TEST_EXAMPLE}}
```

### Input Validation Tests

```{{LANGUAGE}}
{{INPUT_VALIDATION_TEST_EXAMPLE}}
```
---
## 🐛 Debugging Tests

### Debug Configuration

**VS Code:**
```json
{{VSCODE_DEBUG_CONFIG}}
```

### Debug Commands

```bash
# Debug specific test
{{DEBUG_SPECIFIC_TEST}}

# Debug with breakpoints
{{DEBUG_WITH_BREAKPOINTS}}
```
---
## 📝 Test Documentation

### When to Document Tests

- ✅ Complex test setups
- ✅ Non-obvious mocking strategies
- ✅ Performance test configurations
- ✅ Flaky test explanations

### Example

```{{LANGUAGE}}
/**
 * Tests the order calculation logic with multiple edge cases.
 *
 * This test verifies:
 * 1. Basic order total calculation
 * 2. Tax application
 * 3. Discount code validation
 * 4. Edge case: zero-price items
 * 5. Edge case: 100% discount
 *
 * Mock strategy:
 * - DiscountService is mocked to avoid external API calls
 * - TaxService uses real implementation for accuracy
 */
describe('Order Total Calculation', () => {
  // tests...
});
```
---
## 🚨 Continuous Testing

### Pre-commit Hooks

```bash
{{PRE_COMMIT_HOOK_CONFIG}}
```

**Runs:**
- Linting
- Unit tests
- Type checking

### Pre-push Hooks

```bash
{{PRE_PUSH_HOOK_CONFIG}}
```

**Runs:**
- Full test suite
- Coverage check
---
## 📈 Test Metrics

### Tracked Metrics

- Test count (unit, integration, e2e)
- Test execution time
- Code coverage (overall, per type)
- Flaky test rate
- Test failure rate

### Goals

{{#EACH TEST_GOAL}}
- **{{GOAL_NAME}}**: {{GOAL_TARGET}}
{{/EACH}}
---
## 🔄 Test Maintenance

### Regular Tasks

- ✅ Update tests when code changes
- ✅ Remove obsolete tests
- ✅ Fix flaky tests immediately
- ✅ Refactor tests alongside code
- ✅ Update test data periodically

### Code Review Checklist

- [ ] New code has tests
- [ ] Tests are meaningful (not just for coverage)
- [ ] Tests pass locally
- [ ] Coverage meets threshold
- [ ] No skipped/disabled tests (without reason)
- [ ] Test names are descriptive
---
## 📚 Resources

{{#EACH TESTING_RESOURCE}}
- [{{RESOURCE_NAME}}]({{RESOURCE_URL}})
{{/EACH}}
---
**Document Version:** 1.0

**Last Updated:** {{GENERATION_DATE}}

**Generated by:** AI Flow v1.0.0


