# State Management

> State management patterns and best practices for {{PROJECT_NAME}}

---

## 🎯 State Management Solution

**Solution:** {{STATE_MANAGEMENT}}

{{STATE_MANAGEMENT_DESCRIPTION}}

---

## 📊 State Categories

### 1. Server State (Remote Data)

**Managed by:** {{DATA_FETCHING}}

**Characteristics:**
- Fetched from APIs
- Cached and synchronized
- May be stale
- Shared across components

**Examples:**
- User data from `/api/user`
- Product listings
- Blog posts

**Pattern:**
```typescript
// Using {{DATA_FETCHING}}
const { data, isLoading, error, refetch } = useQuery({
  queryKey: ['users', userId],
  queryFn: () => fetchUser(userId)
});

if (isLoading) return <Spinner />;
if (error) return <Error message={error.message} />;

return <UserProfile user={data} />;
```

---

### 2. Client State (Local UI State)

**Managed by:** {{STATE_MANAGEMENT}}

**Characteristics:**
- Exists only in frontend
- Controls UI behavior
- Not persisted to server (usually)

**Examples:**
- Modal open/closed
- Theme (dark/light mode)
- Current tab selected
- Form validation errors

**Pattern:**
```typescript
// Using {{STATE_MANAGEMENT}}
{{CLIENT_STATE_EXAMPLE}}
```

---

### 3. URL State (Query Params & Routes)

**Managed by:** Router + URL

**Characteristics:**
- Persisted in URL
- Shareable via link
- Browser back/forward works

**Examples:**
- Search query: `?q=react`
- Filters: `?category=tech&sort=date`
- Pagination: `?page=3`
- Selected item: `/posts/123`

**Pattern:**
```typescript
// React Router
const [searchParams, setSearchParams] = useSearchParams();
const query = searchParams.get('q') || '';

// Vue Router
const route = useRoute();
const query = route.query.q || '';
```

---

### 4. Form State

**Managed by:** {{FORM_LIBRARY}}

**Characteristics:**
- Temporary, component-scoped
- Validation logic
- Reset on submit

**Pattern:**
```typescript
// Using {{FORM_LIBRARY}}
{{FORM_STATE_EXAMPLE}}
```

---

## 🏗️ State Architecture

### State Location Decision Tree

```
Is data from server?
├─ YES → Use {{DATA_FETCHING}} (server state)
└─ NO → Is it global/shared?
    ├─ YES → Use {{STATE_MANAGEMENT}} (global client state)
    └─ NO → Is it URL-related?
        ├─ YES → Use router/query params (URL state)
        └─ NO → Use local component state
```

---

## 🎨 {{STATE_MANAGEMENT}} Patterns

### Store Structure

```typescript
{{STORE_STRUCTURE_EXAMPLE}}
```

### Reading State

```typescript
{{READ_STATE_EXAMPLE}}
```

### Updating State

```typescript
{{UPDATE_STATE_EXAMPLE}}
```

---

## 🔄 Data Flow

### Unidirectional Data Flow

```
User Action
    ↓
Event Handler
    ↓
Update State (store/API)
    ↓
State Change
    ↓
Component Re-render
    ↓
Updated UI
```

### Example: Todo App

```typescript
// 1. User clicks "Add Todo"
<button onClick={() => addTodo(text)}>Add</button>

// 2. Action dispatched
const addTodo = (text: string) => {
  // Update local state optimistically
  setTodos([...todos, { id: Date.now(), text, done: false }]);

  // Sync to server
  api.createTodo({ text })
    .catch(error => {
      // Rollback on error
      setTodos(todos);
      showError(error);
    });
};

// 3. State updated → Component re-renders
```

---

## 🚀 Performance Optimization

### 1. Avoid Over-Rendering

```typescript
// ❌ Bad - Every field change re-renders entire form
const FormContainer = () => {
  const [formData, setFormData] = useState({ name: '', email: '', bio: '' });

  return <Form data={formData} onChange={setFormData} />;
};

// ✅ Good - Each field independent
const FormContainer = () => {
  return (
    <Form>
      <NameField />
      <EmailField />
      <BioField />
    </Form>
  );
};
```

### 2. Selector Optimization

```typescript
// ❌ Bad - New array every render (breaks memoization)
const activeUsers = useStore(state => state.users.filter(u => u.active));

// ✅ Good - Memoized selector
const selectActiveUsers = createSelector(
  [(state) => state.users],
  (users) => users.filter(u => u.active)
);
const activeUsers = useStore(selectActiveUsers);
```

### 3. State Normalization

```typescript
// ❌ Bad - Nested, hard to update
const state = {
  posts: [
    { id: 1, title: 'Post 1', author: { id: 10, name: 'Alice' } },
    { id: 2, title: 'Post 2', author: { id: 10, name: 'Alice' } }
  ]
};

// ✅ Good - Normalized
const state = {
  posts: {
    byId: {
      1: { id: 1, title: 'Post 1', authorId: 10 },
      2: { id: 2, title: 'Post 2', authorId: 10 }
    },
    allIds: [1, 2]
  },
  users: {
    byId: {
      10: { id: 10, name: 'Alice' }
    }
  }
};
```

---

## 🔐 State Persistence

### Local Storage

```typescript
// Save state to localStorage
const saveState = (key: string, state: any) => {
  localStorage.setItem(key, JSON.stringify(state));
};

// Load state from localStorage
const loadState = (key: string) => {
  const saved = localStorage.getItem(key);
  return saved ? JSON.parse(saved) : null;
};

// Initialize store with persisted state
const useThemeStore = create(
  persist(
    (set) => ({
      theme: 'light',
      setTheme: (theme) => set({ theme })
    }),
    { name: 'theme-storage' }
  )
);
```

---

## 🧪 Testing State

### Unit Testing Store Logic

```typescript
describe('TodoStore', () => {
  it('adds todo', () => {
    const { result } = renderHook(() => useTodoStore());

    act(() => {
      result.current.addTodo('Buy milk');
    });

    expect(result.current.todos).toHaveLength(1);
    expect(result.current.todos[0].text).toBe('Buy milk');
  });
});
```

### Integration Testing with Components

```typescript
test('displays todos from store', () => {
  const todos = [
    { id: 1, text: 'Todo 1', done: false },
    { id: 2, text: 'Todo 2', done: true }
  ];

  // Setup store state
  useTodoStore.setState({ todos });

  render(<TodoList />);

  expect(screen.getByText('Todo 1')).toBeInTheDocument();
  expect(screen.getByText('Todo 2')).toBeInTheDocument();
});
```

---

## ⚠️ Common Pitfalls

### 1. Storing Derived Data

```typescript
// ❌ Bad - Storing computed value
const state = {
  todos: [...],
  completedCount: 5  // Derived from todos
};

// ✅ Good - Compute on the fly
const state = {
  todos: [...]
};
const completedCount = todos.filter(t => t.done).length;
```

### 2. Mutating State Directly

```typescript
// ❌ Bad - Direct mutation
state.user.name = 'Alice';

// ✅ Good - Immutable update
setState({ user: { ...state.user, name: 'Alice' } });
```

### 3. Over-Using Global State

```typescript
// ❌ Bad - Everything in global store
const globalState = {
  modalOpen: false,  // Should be local
  currentTab: 'home',  // Should be URL
  formErrors: {},  // Should be form state
};

// ✅ Good - Only truly global data
const globalState = {
  user: { ... },
  theme: 'dark',
  notifications: [...]
};
```

---

## 🔗 Related Documents

- [AI Instructions](../ai-instructions.md) - State management rules
- [Component Architecture](components.md) - Component/state interaction
- [API Integration](api-integration.md) - Server state patterns
- [Testing Strategy](testing.md) - Testing state logic

---

**Last Updated:** {{GENERATION_DATE}}

**Solution:** {{STATE_MANAGEMENT}}
