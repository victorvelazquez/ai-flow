# AI Instructions - Frontend

> **CRITICAL:** Every AI assistant MUST read and follow this document before any work.

---

## 🎯 Project Overview

**Name:** {{PROJECT_NAME}}

**Description:** {{PROJECT_DESCRIPTION}}

**Purpose:** {{PROBLEM_STATEMENT}}

**Target Users:** {{TARGET_USERS}}

---

## 🏗️ Tech Stack

### Frontend

- **UI Framework:** {{UI_FRAMEWORK}} {{UI_FRAMEWORK_VERSION}}
- **Meta Framework:** {{META_FRAMEWORK}}
- **Language:** {{LANGUAGE}} {{LANGUAGE_VERSION}}
- **Build Tool:** {{BUILD_TOOL}}
- **Package Manager:** {{PACKAGE_MANAGER}}

### UI & Components

- **Component Pattern:** {{COMPONENT_PATTERN}}
- **Component Library:** {{COMPONENT_LIBRARY}}
- **Form Management:** {{FORM_LIBRARY}}
- **Icon System:** {{ICON_SYSTEM}}

### State Management

- **State Solution:** {{STATE_MANAGEMENT}}
- **Data Fetching:** {{DATA_FETCHING}}
- **Cache Strategy:** {{CACHE_STRATEGY}}

### Styling

- **Styling Approach:** {{STYLING_APPROACH}}
- **CSS Preprocessor:** {{CSS_PREPROCESSOR}}
- **Design Tokens:** {{DESIGN_TOKENS}}
- **Theme Support:** {{THEME_SUPPORT}}

### Routing

- **Router:** {{ROUTING_LIBRARY}}
- **Route Strategy:** {{ROUTE_STRATEGY}}

### Testing

- **Unit Testing:** {{UNIT_TEST_FRAMEWORK}}
- **Component Testing:** {{COMPONENT_TEST_LIBRARY}}
- **E2E Testing:** {{E2E_FRAMEWORK}}
- **Coverage Target:** {{TEST_COVERAGE_TARGET}}

### Build & Deployment

- **Deployment:** {{DEPLOYMENT_PLATFORM}}
- **CI/CD:** {{CICD_PLATFORM}}
- **CDN:** {{CDN_PROVIDER}}
- **Analytics:** {{ANALYTICS_TOOL}}

---

## 🏛️ Architecture

**Component Pattern:** {{COMPONENT_PATTERN}}

{{ARCHITECTURE_DESCRIPTION}}

**File Organization:** {{FILE_ORGANIZATION}}

**Folder Structure:**
```
{{FOLDER_STRUCTURE}}
```

---

## ❌ NEVER Rules

**YOU MUST NEVER:**

### Performance

- ❌ Import entire libraries - Use tree-shaking friendly imports
  ```typescript
  // Bad
  import _ from 'lodash';
  // Good
  import debounce from 'lodash/debounce';
  ```

- ❌ Render large lists without virtualization - Use react-window, vue-virtual-scroller
- ❌ Forget to memoize expensive computations - Use useMemo, computed
- ❌ Load all routes upfront - Use code splitting and lazy loading
- ❌ Use inline function props in render - Define outside or use useCallback (React)
- ❌ Skip image optimization - Use next/image, nuxt/image, or optimize manually
- ❌ Ignore bundle size - Monitor and optimize regularly
- ❌ Fetch data in loops - Batch requests or use GraphQL

### Accessibility (WCAG {{A11Y_COMPLIANCE}})

- ❌ Use divs for buttons - Use semantic HTML (`<button>`, `<a>`)
- ❌ Forget alt text on images - Every `<img>` needs descriptive alt
- ❌ Skip keyboard navigation support - All interactive elements must be keyboard accessible
- ❌ Ignore color contrast ratios - Minimum 4.5:1 for text (WCAG AA)
- ❌ Remove focus outlines without replacement - Provide visible focus indicators
- ❌ Skip ARIA labels on icon buttons - Use aria-label or sr-only text
- ❌ Use placeholder as label - Labels must be visible, not just placeholder
- ❌ Forget to test with screen readers - Test with NVDA, JAWS, or VoiceOver

### Security

- ❌ Trust user input - Sanitize everything to prevent XSS
  ```typescript
  // Bad - XSS vulnerability
  div.innerHTML = userInput;
  // Good - sanitized
  div.textContent = userInput;
  ```

- ❌ Store sensitive data in localStorage - Use httpOnly cookies for tokens
- ❌ Expose API keys in frontend code - Use environment variables + backend proxy
- ❌ Skip CSRF protection for forms - Use CSRF tokens
- ❌ Allow dangerous HTML in user content - Use DOMPurify or similar
- ❌ Log sensitive user data - Sanitize logs and avoid PII
- ❌ Use eval() or Function() constructor - Major security risk
- ❌ Ignore Content Security Policy - Configure CSP headers

### Code Quality

- ❌ Use inline styles (except dynamic values) - Use {{STYLING_APPROACH}}
- ❌ Create massive components (>300 lines) - Split into smaller components
- ❌ Mutate state directly - Use immutable updates
  ```typescript
  // Bad (React)
  state.items.push(newItem);
  // Good
  setState({ items: [...state.items, newItem] });
  ```

- ❌ Use `any` type in TypeScript - Always use proper types
- ❌ Nest ternary operators - Use if-else or early returns
- ❌ Put business logic in components - Extract to hooks, composables, or services
- ❌ Skip error boundaries - Wrap component trees with error handlers
- ❌ Leave console.log in production - Use proper logging or remove

### State Management

- ❌ Prop drill more than 2-3 levels - Use context, provide/inject, or state management
- ❌ Store derived data in state - Compute on the fly
- ❌ Forget to clean up subscriptions - Unsubscribe in useEffect cleanup, onUnmounted
- ❌ Use global state for everything - Keep state as local as possible
- ❌ Update state during render - Use effects or event handlers

### API Integration

- ❌ Make API calls directly in components - Use custom hooks, composables, or services
- ❌ Forget loading and error states - Always handle both
- ❌ Skip request cancellation - Cancel pending requests on unmount
- ❌ Expose backend errors to users - Show user-friendly messages
- ❌ Ignore rate limiting - Debounce/throttle frequent requests

### Styling

- ❌ Use !important unless absolutely necessary - Fix specificity instead
- ❌ Hardcode pixel values everywhere - Use design tokens, CSS variables
- ❌ Forget responsive design - Mobile-first approach
- ❌ Ignore dark mode support (if {{THEME_SUPPORT}} includes dark mode)
- ❌ Use RGB hex colors directly - Use CSS variables or design tokens

---

## ✅ ALWAYS Rules

**YOU MUST ALWAYS:**

### Component Design

- ✅ Keep components focused on one responsibility
- ✅ Use TypeScript for type safety
- ✅ Write PropTypes or TypeScript interfaces for props
- ✅ Provide default props where sensible
- ✅ Document complex components with JSDoc
- ✅ Use meaningful, descriptive component names (PascalCase)

### Performance

- ✅ Implement code splitting for routes
  ```typescript
  // React
  const Dashboard = lazy(() => import('./Dashboard'));
  // Vue
  const Dashboard = defineAsyncComponent(() => import('./Dashboard.vue'));
  ```

- ✅ Optimize images (WebP format, lazy loading)
- ✅ Monitor Core Web Vitals: {{WEB_VITALS_TARGETS}}
- ✅ Use production builds for deployment
- ✅ Implement proper caching strategies
- ✅ Debounce search inputs and expensive operations

### Accessibility

- ✅ Use semantic HTML elements
- ✅ Add ARIA attributes when needed
- ✅ Ensure keyboard navigation works
- ✅ Test with keyboard only (Tab, Enter, Escape)
- ✅ Provide text alternatives for non-text content
- ✅ Use proper heading hierarchy (h1 → h2 → h3)
- ✅ Announce dynamic content changes to screen readers

### State Management

- ✅ Keep state as close as possible to where it's used
- ✅ Use {{STATE_MANAGEMENT}} for global state
- ✅ Normalize complex nested state
- ✅ Use {{DATA_FETCHING}} for server state
- ✅ Implement optimistic updates for better UX

### Error Handling

- ✅ Wrap component trees with error boundaries
- ✅ Show user-friendly error messages
- ✅ Log errors to monitoring service ({{MONITORING_TOOL}})
- ✅ Provide fallback UI for errors
- ✅ Handle network failures gracefully

### Testing

- ✅ Write tests for critical user paths
- ✅ Test component behavior, not implementation
- ✅ Mock external dependencies (API calls)
- ✅ Test accessibility (screen reader compatibility)
- ✅ Achieve {{TEST_COVERAGE_TARGET}} coverage minimum
- ✅ Run tests before committing

### Code Organization

- ✅ Follow {{COMPONENT_PATTERN}} structure
- ✅ Co-locate related files (component + styles + tests)
- ✅ Use absolute imports for cleaner code
- ✅ Extract reusable logic to custom hooks/composables
- ✅ Keep files under 300 lines

### Styling

- ✅ Use {{STYLING_APPROACH}} consistently
- ✅ Follow mobile-first responsive design
- ✅ Use CSS variables / design tokens for theming
- ✅ Ensure dark mode compatibility (if enabled)
- ✅ Test on multiple screen sizes

### Forms

- ✅ Use {{FORM_LIBRARY}} for complex forms
- ✅ Validate on blur and submit
- ✅ Show validation errors inline
- ✅ Disable submit during submission
- ✅ Provide clear error messages
- ✅ Use proper input types (email, tel, number)

### API Integration

- ✅ Use {{DATA_FETCHING}} for server data
- ✅ Handle loading, success, and error states
- ✅ Implement proper error messages
- ✅ Cache responses when appropriate
- ✅ Cancel requests on component unmount

---

## 🎨 Code Style

### Naming Conventions

- **Components:** PascalCase (`UserProfile.tsx`)
- **Hooks/Composables:** camelCase with prefix (`useAuth`, `useCounter`)
- **Utilities:** camelCase (`formatDate`, `validateEmail`)
- **Constants:** UPPER_SNAKE_CASE (`API_BASE_URL`)
- **CSS Classes:** {{CSS_NAMING_CONVENTION}}

### File Structure

```
{{FILE_STRUCTURE_EXAMPLE}}
```

### Import Order

1. External libraries (react, vue, etc.)
2. Internal libraries (@/components, @/hooks)
3. Relative imports (./Button, ../utils)
4. Styles
5. Types (if separate file)

---

## 🚀 Development Workflow

### Before Starting Any Task

1. Read this document completely
2. Check `docs/components.md` for component patterns
3. Review `docs/state-management.md` for state patterns
4. Check `docs/styling.md` for styling guidelines

### When Creating Components

1. Start with TypeScript interface for props
2. Implement component logic
3. Add styles using {{STYLING_APPROACH}}
4. Write component tests
5. Update Storybook/documentation (if applicable)

### When Adding Features

1. Design component hierarchy
2. Identify state needs (local vs global)
3. Plan API integration
4. Implement with tests
5. Test accessibility
6. Check performance impact

### Before Committing

- ✅ Run linter: `npm run lint`
- ✅ Run tests: `npm test`
- ✅ Build succeeds: `npm run build`
- ✅ No console.log statements
- ✅ No commented code

---

## 📊 Performance Targets

**Core Web Vitals:**
- LCP (Largest Contentful Paint): {{LCP_TARGET}}
- FID (First Input Delay): {{FID_TARGET}}
- CLS (Cumulative Layout Shift): {{CLS_TARGET}}

**Bundle Size:**
- Initial bundle: {{INITIAL_BUNDLE_TARGET}}
- Route bundles: {{ROUTE_BUNDLE_TARGET}}

---

## 🔗 Related Documents

- [Component Architecture](docs/components.md) - Component patterns and structure
- [State Management](docs/state-management.md) - State management guidelines
- [Styling Guide](docs/styling.md) - Styling conventions
- [Testing Strategy](docs/testing.md) - Testing approach
- [API Integration](docs/api-integration.md) - API communication patterns
- [Performance](docs/performance.md) - Performance optimization
- [Accessibility](specs/accessibility.md) - WCAG compliance details

---

**Last Updated:** {{GENERATION_DATE}}

**Framework:** {{UI_FRAMEWORK}} {{UI_FRAMEWORK_VERSION}}
