# Testing Strategy

> Testing approach and best practices for {{PROJECT_NAME}}

---

## 🎯 Testing Philosophy

**Goal:** Ship with confidence through comprehensive automated testing

**Principles:**
1. **Test user behavior, not implementation** - Tests should reflect how users interact with the app
2. **Write tests that give confidence** - Focus on tests that catch real bugs
3. **Avoid testing implementation details** - Refactors shouldn't break tests
4. **Fast feedback loops** - Unit tests run in milliseconds, E2E in seconds

---

## 🏗️ Testing Pyramid

```
        /\
       /E2E\        ← Few (Critical user journeys)
      /------\
     /Integration\  ← Some (Component interaction, API calls)
    /------------\
   /  Unit Tests  \ ← Many (Business logic, utilities)
  /----------------\
```

**Distribution:**
- **70%** Unit Tests (fast, isolated)
- **20%** Integration Tests (component + hooks + API)
- **10%** E2E Tests (full user flows)

---

## 🧪 Testing Stack

### Test Frameworks

**Unit & Integration:** {{UNIT_TEST_FRAMEWORK}}
**Component Testing:** {{COMPONENT_TEST_LIBRARY}}
**E2E Testing:** {{E2E_FRAMEWORK}}

### Supporting Libraries

- **Mocking:** {{MOCKING_LIBRARY}}
- **Code Coverage:** {{COVERAGE_TOOL}}
- **Visual Regression:** {{VISUAL_REGRESSION_TOOL}}

---

## 📦 Unit Testing

### What to Unit Test

✅ **DO test:**
- Pure functions (utilities, helpers)
- Business logic (validation, calculations)
- Custom hooks (isolated)
- Reducers/stores (state logic)

❌ **DON'T test:**
- Third-party libraries
- Framework internals
- Trivial code (getters/setters)

### Unit Test Patterns

#### Testing Pure Functions

```typescript
// utils/formatCurrency.ts
export const formatCurrency = (amount: number, currency = 'USD'): string => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
};

// utils/formatCurrency.test.ts
import { formatCurrency } from './formatCurrency';

describe('formatCurrency', () => {
  it('formats USD correctly', () => {
    expect(formatCurrency(1234.56)).toBe('$1,234.56');
  });

  it('formats EUR correctly', () => {
    expect(formatCurrency(1234.56, 'EUR')).toBe('€1,234.56');
  });

  it('handles zero', () => {
    expect(formatCurrency(0)).toBe('$0.00');
  });

  it('handles negative values', () => {
    expect(formatCurrency(-100)).toBe('-$100.00');
  });
});
```

#### Testing Custom Hooks

```typescript
// hooks/useCounter.ts
import { useState } from 'react';

export const useCounter = (initialValue = 0) => {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount(c => c + 1);
  const decrement = () => setCount(c => c - 1);
  const reset = () => setCount(initialValue);

  return { count, increment, decrement, reset };
};

// hooks/useCounter.test.ts
import { renderHook, act } from '@testing-library/react';
import { useCounter } from './useCounter';

describe('useCounter', () => {
  it('initializes with default value', () => {
    const { result } = renderHook(() => useCounter());
    expect(result.current.count).toBe(0);
  });

  it('increments count', () => {
    const { result } = renderHook(() => useCounter());

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });

  it('resets to initial value', () => {
    const { result } = renderHook(() => useCounter(10));

    act(() => {
      result.current.increment();
      result.current.reset();
    });

    expect(result.current.count).toBe(10);
  });
});
```

---

## 🔗 Integration Testing

### What to Integration Test

✅ **DO test:**
- Component + hooks interaction
- API calls + data fetching
- Form submission flows
- Navigation between views
- State management integration

### Integration Test Patterns

#### Testing Components with API Calls

```typescript
// UserProfile.tsx
import { useQuery } from '@tanstack/react-query';
import { fetchUser } from './api';

export const UserProfile = ({ userId }: { userId: string }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId)
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.email}</p>
    </div>
  );
};

// UserProfile.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { UserProfile } from './UserProfile';

const server = setupServer(
  rest.get('/api/users/:id', (req, res, ctx) => {
    return res(ctx.json({
      id: '1',
      name: 'Alice Johnson',
      email: 'alice@example.com'
    }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } }
  });
  return ({ children }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

describe('UserProfile', () => {
  it('displays user data', async () => {
    render(<UserProfile userId="1" />, { wrapper: createWrapper() });

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Alice Johnson')).toBeInTheDocument();
      expect(screen.getByText('alice@example.com')).toBeInTheDocument();
    });
  });

  it('displays error message on failure', async () => {
    server.use(
      rest.get('/api/users/:id', (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    render(<UserProfile userId="1" />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });
  });
});
```

#### Testing Forms

```typescript
// LoginForm.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoginForm } from './LoginForm';

describe('LoginForm', () => {
  it('submits form with valid data', async () => {
    const onSubmit = vi.fn();
    const user = userEvent.setup();

    render(<LoginForm onSubmit={onSubmit} />);

    await user.type(screen.getByLabelText(/email/i), 'test@example.com');
    await user.type(screen.getByLabelText(/password/i), 'password123');
    await user.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123'
      });
    });
  });

  it('displays validation errors', async () => {
    const user = userEvent.setup();

    render(<LoginForm onSubmit={vi.fn()} />);

    // Submit without filling fields
    await user.click(screen.getByRole('button', { name: /sign in/i }));

    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/password is required/i)).toBeInTheDocument();
  });

  it('disables submit button while loading', async () => {
    const onSubmit = vi.fn(() => new Promise(resolve => setTimeout(resolve, 100)));
    const user = userEvent.setup();

    render(<LoginForm onSubmit={onSubmit} />);

    await user.type(screen.getByLabelText(/email/i), 'test@example.com');
    await user.type(screen.getByLabelText(/password/i), 'password123');

    const submitButton = screen.getByRole('button', { name: /sign in/i });
    await user.click(submitButton);

    expect(submitButton).toBeDisabled();
  });
});
```

---

## 🌐 E2E Testing

### What to E2E Test

✅ **DO test:**
- Critical user journeys (signup, checkout)
- Cross-page flows
- Authentication flows
- Payment processing
- Real browser interactions

❌ **DON'T test:**
- Every feature (too slow)
- Edge cases (use integration tests)
- Visual details (use visual regression)

### E2E Test Patterns ({{E2E_FRAMEWORK}})

#### User Journey Test

```typescript
// e2e/checkout.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Checkout Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Login before each test
    await page.goto('/login');
    await page.fill('[name="email"]', 'test@example.com');
    await page.fill('[name="password"]', 'password123');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL('/dashboard');
  });

  test('completes purchase successfully', async ({ page }) => {
    // Add item to cart
    await page.goto('/products');
    await page.click('[data-testid="product-1"]');
    await page.click('button:has-text("Add to Cart")');

    // Verify cart badge
    await expect(page.locator('[data-testid="cart-badge"]')).toHaveText('1');

    // Go to checkout
    await page.click('[data-testid="cart-icon"]');
    await page.click('button:has-text("Checkout")');

    // Fill shipping info
    await page.fill('[name="address"]', '123 Main St');
    await page.fill('[name="city"]', 'New York');
    await page.fill('[name="zipCode"]', '10001');
    await page.click('button:has-text("Continue to Payment")');

    // Fill payment info (test mode)
    await page.fill('[name="cardNumber"]', '4242424242424242');
    await page.fill('[name="expiry"]', '12/25');
    await page.fill('[name="cvc"]', '123');
    await page.click('button:has-text("Place Order")');

    // Verify success
    await expect(page).toHaveURL(/\/order\/[a-z0-9]+/);
    await expect(page.locator('h1')).toHaveText('Order Confirmed!');
  });

  test('validates payment information', async ({ page }) => {
    await page.goto('/checkout');

    // Try to submit with invalid card
    await page.fill('[name="cardNumber"]', '1234');
    await page.click('button:has-text("Place Order")');

    await expect(page.locator('.error')).toContainText('Invalid card number');
  });
});
```

#### API Mocking in E2E

```typescript
// e2e/dashboard.spec.ts
import { test, expect } from '@playwright/test';

test('displays dashboard with mocked data', async ({ page }) => {
  // Mock API response
  await page.route('/api/stats', route => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        totalSales: 15420,
        orders: 234,
        customers: 1250
      })
    });
  });

  await page.goto('/dashboard');

  await expect(page.locator('[data-testid="total-sales"]')).toHaveText('$15,420');
  await expect(page.locator('[data-testid="total-orders"]')).toHaveText('234');
});
```

---

## 🎨 Visual Regression Testing

### Strategy: {{VISUAL_REGRESSION_TOOL}}

```typescript
// Using Playwright
import { test, expect } from '@playwright/test';

test('homepage looks correct', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveScreenshot('homepage.png');
});

test('button variants', async ({ page }) => {
  await page.goto('/storybook/button');
  await expect(page.locator('.button-primary')).toHaveScreenshot('button-primary.png');
  await expect(page.locator('.button-secondary')).toHaveScreenshot('button-secondary.png');
});
```

---

## 🧩 Testing Best Practices

### 1. Query Priorities (Testing Library)

**Priority order:**

1. **Accessible by everyone:** `getByRole`, `getByLabelText`, `getByPlaceholderText`, `getByText`
2. **Semantic queries:** `getByAltText`, `getByTitle`
3. **Test IDs (last resort):** `getByTestId`

```typescript
// ✅ Good - Accessible queries
screen.getByRole('button', { name: /submit/i });
screen.getByLabelText(/email address/i);

// ❌ Bad - Fragile test IDs
screen.getByTestId('submit-btn');
```

### 2. Async Utilities

```typescript
// ✅ Good - waitFor for async changes
await waitFor(() => {
  expect(screen.getByText('Success!')).toBeInTheDocument();
});

// ✅ Good - findBy for async queries (combines getBy + waitFor)
const element = await screen.findByText('Success!');

// ❌ Bad - Manual timeout
await new Promise(resolve => setTimeout(resolve, 1000));
expect(screen.getByText('Success!')).toBeInTheDocument();
```

### 3. User Interactions

```typescript
import userEvent from '@testing-library/user-event';

// ✅ Good - userEvent (realistic)
const user = userEvent.setup();
await user.type(input, 'hello');
await user.click(button);

// ❌ Bad - fireEvent (synthetic)
fireEvent.change(input, { target: { value: 'hello' } });
fireEvent.click(button);
```

### 4. Test Organization

```typescript
describe('UserDashboard', () => {
  // Setup
  let mockUser: User;

  beforeEach(() => {
    mockUser = { id: '1', name: 'Alice' };
  });

  describe('when logged in', () => {
    it('displays welcome message', () => {
      // Test
    });

    it('shows user statistics', () => {
      // Test
    });
  });

  describe('when logged out', () => {
    it('redirects to login', () => {
      // Test
    });
  });
});
```

---

## 📊 Code Coverage

### Coverage Targets

- **Statements:** {{COVERAGE_STATEMENTS}}%
- **Branches:** {{COVERAGE_BRANCHES}}%
- **Functions:** {{COVERAGE_FUNCTIONS}}%
- **Lines:** {{COVERAGE_LINES}}%

### Running Coverage

```bash
# Generate coverage report
{{PACKAGE_MANAGER}} run test:coverage

# View HTML report
open coverage/index.html
```

### Coverage Configuration

```typescript
// vitest.config.ts
export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/**/*.test.{ts,tsx}',
        'src/**/*.spec.{ts,tsx}',
        'src/**/*.stories.{ts,tsx}',
        'src/types/**'
      ],
      thresholds: {
        statements: 80,
        branches: 75,
        functions: 80,
        lines: 80
      }
    }
  }
});
```

---

## 🔧 Mocking Strategies

### 1. Mock Service Worker (API Mocking)

```typescript
// mocks/handlers.ts
import { rest } from 'msw';

export const handlers = [
  rest.get('/api/users/:id', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ id: req.params.id, name: 'Alice' })
    );
  }),

  rest.post('/api/login', async (req, res, ctx) => {
    const { email, password } = await req.json();

    if (email === 'test@example.com' && password === 'password123') {
      return res(
        ctx.status(200),
        ctx.json({ token: 'fake-jwt-token' })
      );
    }

    return res(
      ctx.status(401),
      ctx.json({ error: 'Invalid credentials' })
    );
  })
];

// mocks/server.ts
import { setupServer } from 'msw/node';
import { handlers } from './handlers';

export const server = setupServer(...handlers);
```

### 2. Module Mocking

```typescript
// vi.mock for Vitest
vi.mock('./api', () => ({
  fetchUser: vi.fn(() => Promise.resolve({ id: '1', name: 'Alice' }))
}));

// jest.mock for Jest
jest.mock('./api', () => ({
  fetchUser: jest.fn(() => Promise.resolve({ id: '1', name: 'Alice' }))
}));
```

### 3. Component Mocking

```typescript
// Mock child component
vi.mock('./ComplexChart', () => ({
  ComplexChart: () => <div>Chart Mock</div>
}));

test('renders dashboard', () => {
  render(<Dashboard />);
  expect(screen.getByText('Chart Mock')).toBeInTheDocument();
});
```

---

## ⚠️ Common Testing Pitfalls

### 1. Testing Implementation Details

```typescript
// ❌ Bad - Tests internal state
const { container } = render(<Counter />);
const button = container.querySelector('.increment-btn');
expect(button.className).toBe('increment-btn active');

// ✅ Good - Tests user-visible behavior
render(<Counter />);
const button = screen.getByRole('button', { name: /increment/i });
await userEvent.click(button);
expect(screen.getByText('Count: 1')).toBeInTheDocument();
```

### 2. Not Cleaning Up

```typescript
// ❌ Bad - State leaks between tests
let component;

test('test 1', () => {
  component = render(<App />);
  // No cleanup
});

// ✅ Good - Automatic cleanup
import { render, cleanup } from '@testing-library/react';

afterEach(() => {
  cleanup();
});
```

### 3. Over-Mocking

```typescript
// ❌ Bad - Mocking everything
vi.mock('./Button', () => ({ Button: () => <div>Button</div> }));
vi.mock('./Input', () => ({ Input: () => <div>Input</div> }));
vi.mock('./Form', () => ({ Form: () => <div>Form</div> }));

// ✅ Good - Only mock external dependencies
vi.mock('./api', () => ({ fetchData: vi.fn() }));
```

---

## 🚀 CI/CD Integration

### GitHub Actions Example

```yaml
# .github/workflows/test.yml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: Install dependencies
        run: npm ci

      - name: Run unit & integration tests
        run: npm run test:coverage

      - name: Upload coverage
        uses: codecov/codecov-action@v3

      - name: Run E2E tests
        run: npm run test:e2e

      - name: Upload E2E artifacts
        if: failure()
        uses: actions/upload-artifact@v3
        with:
          name: playwright-screenshots
          path: test-results/
```

---

## 🔗 Related Documents

- [Component Architecture](components.md) - Component structure to test
- [State Management](state-management.md) - Testing stores and hooks
- [AI Instructions](../ai-instructions.md) - Testing requirements
- [Contributing](contributing.md) - How to write tests

---

**Last Updated:** {{GENERATION_DATE}}

**Testing Stack:** {{UNIT_TEST_FRAMEWORK}} + {{COMPONENT_TEST_LIBRARY}} + {{E2E_FRAMEWORK}}
