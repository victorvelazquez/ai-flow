# Component Architecture

> Component organization, patterns, and best practices for {{PROJECT_NAME}}

---

## 📐 Component Pattern

**Pattern:** {{COMPONENT_PATTERN}}

{{COMPONENT_PATTERN_DESCRIPTION}}

---

## 🏗️ Component Hierarchy

### Atomic Design (if using)

```
Atoms (primitives)
  ↓
Molecules (simple combinations)
  ↓
Organisms (complex components)
  ↓
Templates (page layouts)
  ↓
Pages (instances with real data)
```

### Feature-Based (if using)

```
features/
  auth/
    components/
    hooks/
    services/
  dashboard/
    components/
    hooks/
    services/
```

---

## 📁 File Structure

### Component File Organization

```
{{COMPONENT_FILE_STRUCTURE}}
```

**Example:**
```
src/
├── components/           # Shared components
│   ├── atoms/           # Basic building blocks
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.module.css  (or .scss, .styled.ts)
│   │   │   ├── Button.test.tsx
│   │   │   ├── Button.stories.tsx (optional)
│   │   │   └── index.ts
│   │   └── Input/
│   ├── molecules/       # Simple composites
│   │   ├── SearchBar/
│   │   └── FormField/
│   ├── organisms/       # Complex components
│   │   ├── Header/
│   │   ├── UserCard/
│   │   └── DataTable/
│   └── templates/       # Page layouts
│       ├── MainLayout/
│       └── AuthLayout/
├── pages/               # Route components
│   ├── Home/
│   ├── Dashboard/
│   └── Profile/
├── features/            # Feature-specific code
│   ├── auth/
│   └── posts/
├── hooks/               # Custom hooks/composables
├── services/            # API services
├── utils/               # Utility functions
└── types/               # TypeScript types
```

---

## 🧩 Component Types

### 1. Presentational Components (Atoms/Molecules)

**Purpose:** Pure UI components, no business logic

**Characteristics:**
- Receive all data via props
- No side effects or API calls
- Highly reusable
- Easy to test

**Example ({{UI_FRAMEWORK}}):**
```typescript
// Button.tsx
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick
}) => {
  return (
    <button
      className={`btn btn-${variant} btn-${size}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
```

### 2. Container Components (Organisms/Pages)

**Purpose:** Handle logic, data fetching, state management

**Characteristics:**
- Fetch data from APIs
- Manage local state
- Coordinate child components
- Handle business logic

**Example ({{UI_FRAMEWORK}}):**
```typescript
// UserDashboard.tsx
export const UserDashboard: React.FC = () => {
  const { data, isLoading, error } = useUserData();
  const { updateProfile } = useUpdateProfile();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <DashboardLayout>
      <UserProfile user={data.user} />
      <ActivityFeed activities={data.activities} />
      <StatsOverview stats={data.stats} />
    </DashboardLayout>
  );
};
```

### 3. Layout Components (Templates)

**Purpose:** Define page structure and composition

**Characteristics:**
- Provide slots for content
- Handle responsive layout
- Manage navigation structure

**Example ({{UI_FRAMEWORK}}):**
```typescript
// MainLayout.tsx
interface MainLayoutProps {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  sidebar
}) => {
  return (
    <div className="main-layout">
      <Header />
      <div className="content-wrapper">
        {sidebar && <Sidebar>{sidebar}</Sidebar>}
        <main className="main-content">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};
```

---

## 🎯 Component Design Principles

### 1. Single Responsibility

Each component should do **one thing well**.

```typescript
// ❌ Bad - Too many responsibilities
const UserDashboard = () => {
  // Fetches data, handles auth, renders UI, manages forms
};

// ✅ Good - Separated concerns
const UserDashboard = () => {
  const user = useAuth();
  const data = useUserData(user.id);

  return <DashboardView data={data} />;
};
```

### 2. Composition Over Inheritance

Build complex UIs by composing simple components.

```typescript
// ✅ Composition
<Card>
  <CardHeader>
    <CardTitle>User Profile</CardTitle>
  </CardHeader>
  <CardContent>
    <UserInfo user={user} />
  </CardContent>
</Card>
```

### 3. Props Over Context

Use props for explicit data flow, context for truly global data.

```typescript
// ✅ Props for component-specific data
<UserProfile user={user} onSave={handleSave} />

// ✅ Context for global app state
const theme = useTheme();
const auth = useAuth();
```

### 4. Keep It Simple

Avoid premature abstraction. Extract only when pattern emerges 3+ times.

---

## 🔧 Component Patterns

### Pattern: Compound Components

Allow flexible composition while maintaining internal logic.

```typescript
// Tabs.tsx
export const Tabs = ({ children, defaultTab }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="tabs">{children}</div>
    </TabsContext.Provider>
  );
};

Tabs.List = ({ children }) => <div className="tabs-list">{children}</div>;
Tabs.Tab = ({ id, children }) => {
  const { activeTab, setActiveTab } = useTabsContext();
  return (
    <button
      className={activeTab === id ? 'active' : ''}
      onClick={() => setActiveTab(id)}
    >
      {children}
    </button>
  );
};
Tabs.Panel = ({ id, children }) => {
  const { activeTab } = useTabsContext();
  return activeTab === id ? <div>{children}</div> : null;
};

// Usage
<Tabs defaultTab="profile">
  <Tabs.List>
    <Tabs.Tab id="profile">Profile</Tabs.Tab>
    <Tabs.Tab id="settings">Settings</Tabs.Tab>
  </Tabs.List>
  <Tabs.Panel id="profile"><ProfileForm /></Tabs.Panel>
  <Tabs.Panel id="settings"><SettingsForm /></Tabs.Panel>
</Tabs>
```

### Pattern: Render Props

Share logic with flexible rendering.

```typescript
// DataLoader.tsx
interface DataLoaderProps<T> {
  url: string;
  children: (data: T, isLoading: boolean, error: Error | null) => React.ReactNode;
}

export const DataLoader = <T,>({ url, children }: DataLoaderProps<T>) => {
  const { data, isLoading, error } = useFetch<T>(url);
  return <>{children(data, isLoading, error)}</>;
};

// Usage
<DataLoader url="/api/users">
  {(users, loading, error) => {
    if (loading) return <Spinner />;
    if (error) return <Error message={error.message} />;
    return <UserList users={users} />;
  }}
</DataLoader>
```

### Pattern: Custom Hooks (Logic Extraction)

Extract reusable logic from components.

```typescript
// useDebounce.ts
export const useDebounce = <T,>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};

// Usage in component
const SearchInput = () => {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (debouncedQuery) {
      searchAPI(debouncedQuery);
    }
  }, [debouncedQuery]);

  return <input value={query} onChange={e => setQuery(e.target.value)} />;
};
```

---

## 🎨 Styling Strategy

**Approach:** {{STYLING_APPROACH}}

{{STYLING_DESCRIPTION}}

### Component Styling Example

```typescript
// Using {{STYLING_APPROACH}}
{{STYLING_EXAMPLE}}
```

---

## 🧪 Component Testing

### What to Test

1. **Component renders correctly** with different props
2. **User interactions** trigger expected behaviors
3. **Conditional rendering** shows/hides correctly
4. **Accessibility** works with keyboard and screen readers

### Testing Example

```typescript
// Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('applies correct variant class', () => {
    render(<Button variant="danger">Delete</Button>);
    expect(screen.getByRole('button')).toHaveClass('btn-danger');
  });
});
```

---

## 📦 Component Library

{{#IF_COMPONENT_LIBRARY}}
**Using:** {{COMPONENT_LIBRARY}}

### When to Use Library Components

- ✅ Complex components (datepickers, modals, dropdowns)
- ✅ Accessibility-critical components
- ✅ Time-saving for standard UI patterns

### When to Build Custom

- ✅ Brand-specific designs
- ✅ Simple components (Button, Input)
- ✅ Performance-critical components
{{/IF_COMPONENT_LIBRARY}}

---

## 🚀 Performance Optimization

### Code Splitting

```typescript
// Route-level code splitting
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Profile = lazy(() => import('./pages/Profile'));

// Component-level (for large components)
const HeavyChart = lazy(() => import('./components/HeavyChart'));
```

### Memoization

```typescript
// React
const MemoizedComponent = React.memo(ExpensiveComponent);
const memoizedValue = useMemo(() => computeExpensive(a, b), [a, b]);
const memoizedCallback = useCallback(() => doSomething(a), [a]);

// Vue
const computed Value = computed(() => expensiveComputation());
```

### Virtualization (Long Lists)

```typescript
// React
import { FixedSizeList } from 'react-window';

<FixedSizeList
  height={600}
  itemCount={items.length}
  itemSize={50}
>
  {({ index, style }) => (
    <div style={style}>{items[index].name}</div>
  )}
</FixedSizeList>
```

---

## ♿ Accessibility Guidelines

### Semantic HTML

```typescript
// ❌ Bad
<div onClick={handleClick}>Submit</div>

// ✅ Good
<button onClick={handleClick}>Submit</button>
```

### ARIA Attributes

```typescript
<button
  aria-label="Close dialog"
  aria-pressed={isPressed}
  aria-expanded={isExpanded}
>
  <CloseIcon />
</button>
```

### Keyboard Navigation

```typescript
const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Enter' || e.key === ' ') {
    handleAction();
  }
  if (e.key === 'Escape') {
    handleClose();
  }
};
```

---

## 📚 Component Documentation

### JSDoc Comments

```typescript
/**
 * Primary button component for user actions
 *
 * @component
 * @example
 * <Button variant="primary" onClick={handleSubmit}>
 *   Submit Form
 * </Button>
 */
export const Button: React.FC<ButtonProps> = ({ ... }) => { ... };
```

### README per Feature

Each feature directory should have a README explaining:
- Purpose of the feature
- Key components
- Data flow
- API dependencies

---

## 🔗 Related Documents

- [AI Instructions](../ai-instructions.md) - Development guidelines
- [State Management](state-management.md) - State patterns
- [Styling Guide](styling.md) - Styling conventions
- [Testing Strategy](testing.md) - Testing approach
- [Performance](performance.md) - Optimization techniques

---

**Last Updated:** {{GENERATION_DATE}}

**Pattern:** {{COMPONENT_PATTERN}}

**Framework:** {{UI_FRAMEWORK}} {{UI_FRAMEWORK_VERSION}}
