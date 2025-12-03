# Styling & Design System

> CSS architecture, theming, and design patterns for {{PROJECT_NAME}}

---

## 🎨 Styling Approach

**Solution:** {{STYLING_APPROACH}}

{{STYLING_DESCRIPTION}}

**Key Decisions:**
- **Design Tokens:** {{DESIGN_TOKENS}}
- **Theme Support:** {{THEME_SUPPORT}}
- **Responsive Strategy:** {{RESPONSIVE_STRATEGY}}

---

## 📐 CSS Architecture

### Styling Solutions Comparison

| Approach | Best For | Pros | Cons |
|----------|----------|------|------|
| **Tailwind CSS** | Rapid prototyping, consistent design | Utility-first, small bundle, no naming | Learning curve, HTML verbosity |
| **CSS Modules** | Component isolation | Local scope, type-safe (TS), simple | Setup required, no runtime theming |
| **Styled Components** | Dynamic theming, React | CSS-in-JS, props-based, SSR support | Runtime cost, bundle size |
| **Emotion** | Flexibility, performance | Faster than SC, both runtime/compile | More boilerplate |
| **Sass/SCSS** | Traditional projects | Mature, powerful features | Global scope, manual optimization |

### Current Approach: {{STYLING_APPROACH}}

```{{STYLING_EXAMPLE_LANG}}
{{STYLING_EXAMPLE_CODE}}
```

**Why this approach:**
{{STYLING_RATIONALE}}

---

## 🎨 Design Tokens

{{#IF_DESIGN_TOKENS}}

### Token Structure

Design tokens are the single source of truth for design decisions (colors, spacing, typography, etc.).

```typescript
// tokens/colors.ts
export const colors = {
  // Brand
  primary: {
    50: '#e3f2fd',
    100: '#bbdefb',
    // ... up to 900
    DEFAULT: '#1976d2',
  },

  // Semantic
  success: '#4caf50',
  warning: '#ff9800',
  error: '#f44336',
  info: '#2196f3',

  // Neutrals
  gray: {
    50: '#fafafa',
    100: '#f5f5f5',
    // ... up to 900
  }
};

// tokens/spacing.ts
export const spacing = {
  0: '0',
  1: '0.25rem',  // 4px
  2: '0.5rem',   // 8px
  3: '0.75rem',  // 12px
  4: '1rem',     // 16px
  // ... up to 96
};

// tokens/typography.ts
export const typography = {
  fontFamily: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
    mono: ['Fira Code', 'monospace']
  },
  fontSize: {
    xs: ['0.75rem', { lineHeight: '1rem' }],
    sm: ['0.875rem', { lineHeight: '1.25rem' }],
    base: ['1rem', { lineHeight: '1.5rem' }],
    // ... up to 9xl
  }
};
```

### Token Usage

**Tailwind Config:**
```javascript
// tailwind.config.js
import { colors, spacing, typography } from './tokens';

export default {
  theme: {
    extend: {
      colors,
      spacing,
      ...typography
    }
  }
};
```

**CSS Variables:**
```css
/* global.css */
:root {
  /* Colors */
  --color-primary: #1976d2;
  --color-success: #4caf50;

  /* Spacing */
  --spacing-1: 0.25rem;
  --spacing-2: 0.5rem;

  /* Typography */
  --font-sans: 'Inter', system-ui, sans-serif;
  --text-base: 1rem;
}

/* Usage */
.button {
  background-color: var(--color-primary);
  padding: var(--spacing-3) var(--spacing-6);
  font-family: var(--font-sans);
}
```

**Styled Components:**
```typescript
// theme.ts
export const theme = {
  colors: { /* ... */ },
  spacing: { /* ... */ }
};

// Usage
import styled from 'styled-components';

const Button = styled.button`
  background: ${p => p.theme.colors.primary};
  padding: ${p => p.theme.spacing[3]};
`;
```

{{/IF_DESIGN_TOKENS}}

---

## 🌗 Theming

### Theme Implementation: {{THEME_SUPPORT}}

{{#IF_DARK_MODE}}

### Dark Mode Strategy

**Approach:** {{DARK_MODE_STRATEGY}}

#### CSS Variables Approach

```css
/* themes.css */
:root {
  --bg-primary: #ffffff;
  --bg-secondary: #f5f5f5;
  --text-primary: #212121;
  --text-secondary: #757575;
}

[data-theme="dark"] {
  --bg-primary: #121212;
  --bg-secondary: #1e1e1e;
  --text-primary: #ffffff;
  --text-secondary: #b0b0b0;
}

/* Usage */
.card {
  background: var(--bg-primary);
  color: var(--text-primary);
}
```

#### React Context Approach

```typescript
// ThemeContext.tsx
import { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

const ThemeContext = createContext<{
  theme: Theme;
  toggleTheme: () => void;
}>({ theme: 'light', toggleTheme: () => {} });

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme');
    return (saved as Theme) || 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
```

#### System Preference Detection

```typescript
// Detect user's system preference
const getSystemTheme = (): Theme => {
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
};

// Listen for system changes
useEffect(() => {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

  const handler = (e: MediaQueryListEvent) => {
    setTheme(e.matches ? 'dark' : 'light');
  };

  mediaQuery.addEventListener('change', handler);
  return () => mediaQuery.removeEventListener('change', handler);
}, []);
```

{{/IF_DARK_MODE}}

---

## 📱 Responsive Design

### Breakpoint Strategy

```typescript
// breakpoints.ts
export const breakpoints = {
  sm: '640px',   // Mobile landscape
  md: '768px',   // Tablet
  lg: '1024px',  // Desktop
  xl: '1280px',  // Large desktop
  '2xl': '1536px' // Extra large
};
```

### Responsive Patterns

#### Mobile-First Approach (Recommended)

```css
/* Base styles (mobile) */
.container {
  padding: 1rem;
  font-size: 0.875rem;
}

/* Tablet and up */
@media (min-width: 768px) {
  .container {
    padding: 2rem;
    font-size: 1rem;
  }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .container {
    padding: 3rem;
    max-width: 1200px;
    margin: 0 auto;
  }
}
```

#### Tailwind Responsive Classes

```jsx
<div className="
  text-sm md:text-base lg:text-lg
  p-4 md:p-6 lg:p-8
  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
">
  {/* Responsive content */}
</div>
```

#### Container Queries (Modern)

```css
/* Container-based responsive design */
.card-container {
  container-type: inline-size;
  container-name: card;
}

.card-title {
  font-size: 1rem;
}

/* When container is >400px wide */
@container card (min-width: 400px) {
  .card-title {
    font-size: 1.5rem;
  }
}
```

---

## 🧩 Component Styling Patterns

### Pattern 1: Compound Variants (Recommended)

```typescript
// Button.tsx (using class-variance-authority)
import { cva, type VariantProps } from 'class-variance-authority';

const buttonStyles = cva(
  // Base styles
  'rounded font-semibold transition-colors focus:outline-none focus:ring-2',
  {
    variants: {
      intent: {
        primary: 'bg-blue-600 text-white hover:bg-blue-700',
        secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
        danger: 'bg-red-600 text-white hover:bg-red-700'
      },
      size: {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg'
      }
    },
    compoundVariants: [
      {
        intent: 'primary',
        size: 'lg',
        className: 'font-bold shadow-lg'
      }
    ],
    defaultVariants: {
      intent: 'primary',
      size: 'md'
    }
  }
);

export const Button = ({ intent, size, className, ...props }:
  VariantProps<typeof buttonStyles> & React.ButtonHTMLAttributes<HTMLButtonElement>
) => (
  <button className={buttonStyles({ intent, size, className })} {...props} />
);
```

### Pattern 2: CSS Modules with TypeScript

```typescript
// Button.module.css
.button {
  border-radius: 0.25rem;
  font-weight: 600;
  transition: background-color 0.2s;
}

.primary {
  composes: button;
  background: var(--color-primary);
  color: white;
}

.secondary {
  composes: button;
  background: var(--color-gray-200);
  color: var(--color-gray-900);
}

.small { padding: 0.375rem 0.75rem; }
.medium { padding: 0.5rem 1rem; }
.large { padding: 0.75rem 1.5rem; }
```

```typescript
// Button.tsx
import styles from './Button.module.css';

export const Button = ({ variant = 'primary', size = 'medium', ...props }) => (
  <button className={`${styles[variant]} ${styles[size]}`} {...props} />
);
```

### Pattern 3: Styled Components with Props

```typescript
import styled from 'styled-components';

const Button = styled.button<{ $variant?: 'primary' | 'secondary'; $size?: 'sm' | 'md' | 'lg' }>`
  border-radius: 0.25rem;
  font-weight: 600;
  transition: background-color 0.2s;

  /* Variant styles */
  background: ${p => p.$variant === 'primary' ? p.theme.colors.primary : p.theme.colors.gray[200]};
  color: ${p => p.$variant === 'primary' ? 'white' : p.theme.colors.gray[900]};

  /* Size styles */
  padding: ${p => {
    if (p.$size === 'sm') return '0.375rem 0.75rem';
    if (p.$size === 'lg') return '0.75rem 1.5rem';
    return '0.5rem 1rem';
  }};

  &:hover {
    opacity: 0.9;
  }
`;
```

---

## ⚡ Performance Optimization

### 1. Critical CSS

Extract and inline critical CSS for above-the-fold content.

```html
<!-- index.html -->
<head>
  <style>
    /* Critical CSS inlined */
    .header { /* ... */ }
    .hero { /* ... */ }
  </style>

  <!-- Non-critical CSS loaded async -->
  <link rel="preload" href="/styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
</head>
```

### 2. CSS Purging (Tailwind)

Remove unused CSS in production.

```javascript
// tailwind.config.js
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  // Tailwind automatically purges unused classes
};
```

**Result:** 3MB → 10KB CSS bundle

### 3. CSS-in-JS Optimization

```typescript
// ❌ Bad - Creates new styled component on every render
const Button = () => {
  const StyledButton = styled.button`
    background: blue;
  `;
  return <StyledButton>Click</StyledButton>;
};

// ✅ Good - Defined outside component
const StyledButton = styled.button`
  background: blue;
`;

const Button = () => <StyledButton>Click</StyledButton>;
```

### 4. Avoid Layout Thrashing

```typescript
// ❌ Bad - Causes layout recalculation
elements.forEach(el => {
  const height = el.offsetHeight; // Read
  el.style.height = height + 10 + 'px'; // Write
});

// ✅ Good - Batch reads, then writes
const heights = elements.map(el => el.offsetHeight); // Read all
elements.forEach((el, i) => {
  el.style.height = heights[i] + 10 + 'px'; // Write all
});
```

---

## ♿ Accessibility in Styling

### 1. Focus Indicators

```css
/* ❌ Bad - Removes focus indicator */
button:focus {
  outline: none;
}

/* ✅ Good - Custom accessible focus */
button:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
```

### 2. Color Contrast (WCAG {{A11Y_COMPLIANCE}})

**Minimum ratios:**
- Normal text: 4.5:1 (AA), 7:1 (AAA)
- Large text (18pt+): 3:1 (AA), 4.5:1 (AAA)

```typescript
// Validate contrast ratios
import { contrast } from 'wcag-contrast';

const textColor = '#757575';
const bgColor = '#ffffff';

const ratio = contrast(textColor, bgColor);
// 4.6:1 - Passes WCAG AA for normal text
```

### 3. Reduced Motion

```css
/* Respect user's motion preferences */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 🎯 Common Patterns

### Layout Patterns

#### Centered Container

```css
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}
```

#### Flexbox Patterns

```css
/* Center content */
.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Space between items */
.flex-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Responsive stack */
.flex-stack {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

@media (min-width: 768px) {
  .flex-stack {
    flex-direction: row;
  }
}
```

#### Grid Patterns

```css
/* Auto-fit responsive grid */
.grid-auto {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

/* 12-column grid */
.grid-12 {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 1rem;
}

.span-6 { grid-column: span 6; }
.span-4 { grid-column: span 4; }
```

### Animation Patterns

```css
/* Smooth transitions */
.transition-all {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Fade in animation */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.fade-in {
  animation: fadeIn 0.3s ease-out;
}

/* Loading spinner */
@keyframes spin {
  to { transform: rotate(360deg); }
}

.spinner {
  animation: spin 1s linear infinite;
}
```

---

## ⚠️ Common Pitfalls

### 1. Over-Specificity

```css
/* ❌ Bad - Too specific, hard to override */
div.container > ul.list > li.item > a.link {
  color: blue;
}

/* ✅ Good - Use classes */
.nav-link {
  color: blue;
}
```

### 2. Magic Numbers

```css
/* ❌ Bad - Unexplained values */
.box {
  margin-top: 23px;
  padding: 17px;
}

/* ✅ Good - Use design tokens */
.box {
  margin-top: var(--spacing-6);
  padding: var(--spacing-4);
}
```

### 3. Inconsistent Units

```css
/* ❌ Bad - Mixing units */
.element {
  padding: 10px;
  margin: 0.5rem;
  font-size: 14pt;
}

/* ✅ Good - Consistent rem/em */
.element {
  padding: 0.625rem;
  margin: 0.5rem;
  font-size: 0.875rem;
}
```

### 4. Inline Styles

```jsx
{/* ❌ Bad - Hard to maintain, no reusability */}
<div style={{ padding: '10px', background: 'blue', color: 'white' }}>
  Content
</div>

{/* ✅ Good - Use classes or styled components */}
<div className="card-primary">
  Content
</div>
```

---

## 🧪 Testing Styles

### Visual Regression Testing

```typescript
// Using Playwright + Percy
import { test } from '@playwright/test';
import percySnapshot from '@percy/playwright';

test('button variants', async ({ page }) => {
  await page.goto('/storybook/button');
  await percySnapshot(page, 'Button - All Variants');
});
```

### Accessibility Testing

```typescript
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

test('button has no a11y violations', async () => {
  const { container } = render(<Button>Click me</Button>);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

---

## 🔗 Related Documents

- [Component Architecture](components.md) - Component structure
- [AI Instructions](../ai-instructions.md) - Styling rules
- [Accessibility Spec](../specs/accessibility.md) - A11y requirements
- [Testing Strategy](testing.md) - Visual regression tests

---

**Last Updated:** {{GENERATION_DATE}}

**Styling Approach:** {{STYLING_APPROACH}}
