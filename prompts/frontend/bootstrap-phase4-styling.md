# Phase 4: Styling & Design System

**Duration:** 15-20 minutes
**Questions:** ~11 questions
**Output:** docs/styling.md, parts of ai-instructions.md

---

## 🎯 Objective

Define your styling architecture and design system:

1. What CSS approach will you use?
2. Do you need design tokens?
3. Will you support theming?
4. What's your responsive strategy?
5. How will you organize styles?

---

## 📋 Questions

### Question 4.1: Styling Approach

**What CSS architecture will you use?**

A) ⭐ **Tailwind CSS** (Recommended for most)
   - Features: Utility-first, rapid development, small production bundle
   - Pros: Fast prototyping, consistent design, great DX
   - Cons: Verbose HTML, learning curve
   - Best for: Most modern apps
   - Bundle: ~10KB (purged)

B) 🔥 **CSS Modules**
   - Features: Scoped CSS, traditional CSS syntax
   - Pros: Familiar, type-safe (TypeScript), no runtime
   - Cons: More manual work, no design system out of box
   - Best for: Teams preferring traditional CSS
   - Bundle: Variable (your CSS only)

C) **Styled Components**
   - Features: CSS-in-JS, component-scoped styles
   - Pros: Dynamic styling, props-based theming, scoped by default
   - Cons: Runtime cost, larger bundle
   - Best for: Component libraries, dynamic themes
   - Bundle: ~16KB

D) **Emotion**
   - Features: CSS-in-JS, faster than Styled Components
   - Pros: Better performance than SC, both runtime and compile-time
   - Cons: Still has runtime overhead
   - Best for: Performance-critical CSS-in-JS
   - Bundle: ~11KB

E) **Sass/SCSS**
   - Features: CSS preprocessor, variables, mixins
   - Pros: Mature, powerful, compile-time
   - Cons: Global scope (without modules), manual optimization
   - Best for: Legacy projects, traditional workflows
   - Bundle: Variable

F) **Vanilla Extract**
   - Features: Zero-runtime CSS-in-TS
   - Pros: Type-safe, no runtime, great DX
   - Cons: Newer, smaller ecosystem
   - Best for: Type safety + performance
   - Bundle: 0KB runtime

G) **UnoCSS**
   - Features: Atomic CSS engine, faster than Tailwind
   - Pros: Extremely fast, flexible, smaller bundle
   - Cons: Newer, smaller community
   - Best for: Performance-critical apps
   - Bundle: ~5KB

**Your answer:**

---

### Question 4.2: Component Library / UI Kit

**Will you use a pre-built component library?**

#### React Options

A) ⭐ **None (Custom Components)**
   - Build everything from scratch
   - Best for: Full design control, unique designs

B) 🔥 **shadcn/ui** (Unstyled, customizable)
   - Features: Copy-paste components, Radix UI primitives
   - Best for: Tailwind users, full customization

C) **Material UI (MUI)**
   - Features: Material Design, comprehensive, mature
   - Best for: Google Material Design aesthetic
   - Bundle: ~90KB

D) **Chakra UI**
   - Features: Accessible, composable, themeable
   - Best for: Rapid development, accessibility
   - Bundle: ~50KB

E) **Ant Design**
   - Features: Enterprise-focused, comprehensive
   - Best for: Admin panels, dashboards, Chinese market
   - Bundle: ~120KB

F) **Mantine**
   - Features: Modern, hooks-based, feature-rich
   - Best for: Developer experience, rapid prototyping
   - Bundle: ~40KB

#### Vue Options

A) **None (Custom Components)**
B) 🔥 **Vuetify** - Material Design for Vue
C) **Quasar** - Full framework with components
D) **PrimeVue** - Rich component library
E) **Element Plus** - Enterprise UI library

#### Angular Options

A) **None (Custom Components)**
B) ⭐ **Angular Material** - Official Material Design
C) **PrimeNG** - Rich component library
D) **NG-ZORRO** - Ant Design for Angular

**Your answer:**

---

### Question 4.3: Design Tokens

**Will you use design tokens?**

Design tokens = Single source of truth for colors, spacing, typography, etc.

A) ⭐ **Yes, comprehensive design tokens** (Recommended)
   - Define colors, spacing, typography, shadows, etc.
   - Best for: Design consistency, theming support
   - Example: Tailwind config, CSS variables, TypeScript constants

B) **Yes, basic tokens only**
   - Just colors and spacing
   - Best for: Simple apps

C) **No tokens**
   - Hardcoded values
   - Best for: Prototypes, MVPs

**Your answer:**

**If yes, what will be tokenized?** (Select all that apply)
- Colors
- Spacing (padding, margin, gaps)
- Typography (fonts, sizes, weights)
- Shadows
- Border radius
- Transitions/animations
- Breakpoints

---

### Question 4.4: Color System

**How will you define your color palette?**

A) ⭐ **Tailwind-style scales** (50-900)
   - Example: `gray-50`, `gray-100`, ..., `gray-900`
   - Example: `blue-500`, `blue-600`, etc.
   - Best for: Tailwind CSS, comprehensive palettes
   - Generates: 10 shades per color

B) **Semantic colors**
   - Example: `primary`, `secondary`, `success`, `error`, `warning`
   - Best for: Simple apps, component libraries
   - Generates: 5-7 colors

C) **Custom color system**
   - Your own naming and structure
   - Best for: Unique design systems

**Your answer:**

**Primary brand colors (hex codes):**
- Primary: #______
- Secondary (optional): #______
- Accent (optional): #______

---

### Question 4.5: Typography System

**How will you handle typography?**

A) ⭐ **Type scale (Tailwind-style)**
   - Sizes: xs, sm, base, lg, xl, 2xl, 3xl, 4xl, 5xl, 6xl, 7xl, 8xl, 9xl
   - Best for: Responsive, scalable typography
   - Example: `text-sm`, `text-lg`

B) **Semantic headings**
   - Sizes: h1, h2, h3, h4, h5, h6, body, caption
   - Best for: Content-heavy sites, traditional hierarchy

C) **Custom scale**
   - Your own naming and sizes

**Your answer:**

**Font families:**
- Heading font: _______________ (e.g., Inter, Poppins)
- Body font: _________________ (e.g., Inter, Roboto)
- Mono font (optional): _______ (e.g., Fira Code)

**Font loading strategy:**
A) Google Fonts CDN
B) Self-hosted fonts (better performance)
C) System fonts only (fastest)

---

### Question 4.6: Theming Support

**Do you need theme support (dark mode, multiple themes)?**

A) ⭐ **Dark mode only**
   - Light + Dark themes
   - Best for: Modern apps, user preference
   - Implementation: CSS variables, class toggle

B) **Multiple themes**
   - Example: Default, Dark, High Contrast, Brand A, Brand B
   - Best for: White-label apps, multi-tenant

C) **No theming**
   - Single theme only
   - Best for: MVPs, simpler implementation

**Your answer:**

**If theming selected:**

**Theme switching method:**
A) User preference (toggle button)
B) System preference only (prefers-color-scheme)
C) Both (respect system, allow override)

**Theme persistence:**
A) localStorage
B) User account setting (backend)
C) No persistence (reset on reload)

---

### Question 4.7: Responsive Breakpoints

**What breakpoint strategy will you use?**

A) ⭐ **Tailwind defaults** (Recommended)
   - sm: 640px
   - md: 768px
   - lg: 1024px
   - xl: 1280px
   - 2xl: 1536px

B) **Bootstrap-style**
   - xs: 0px
   - sm: 576px
   - md: 768px
   - lg: 992px
   - xl: 1200px

C) **Custom breakpoints**
   - Define your own

D) **No breakpoints (fluid)**
   - Use relative units only (%, vw, etc.)

**Your answer:**

---

### Question 4.8: Spacing System

**What spacing scale will you use?**

A) ⭐ **4px grid (Tailwind-style)**
   - 0, 1 (4px), 2 (8px), 3 (12px), 4 (16px), 5 (20px), 6 (24px), 8 (32px), etc.
   - Best for: Most apps, consistent spacing

B) **8px grid**
   - 0, 8, 16, 24, 32, 40, 48, 56, 64...
   - Best for: Simpler scale, larger spacing

C) **Custom scale**
   - Your own spacing values

**Your answer:**

---

### Question 4.9: Animation & Transitions

**How will you handle animations?**

A) ⭐ **CSS transitions only**
   - Simple hover effects, state changes
   - Best for: Most apps, good performance
   - Example: `transition-colors`, `transition-all`

B) **CSS transitions + keyframe animations**
   - Add loading spinners, fade-ins, etc.
   - Best for: Modern UX

C) **Animation library** (Framer Motion, GSAP, etc.)
   - Complex animations, gestures, page transitions
   - Best for: Animation-heavy apps, marketing sites
   - Example: Framer Motion for React

D) **Minimal animations**
   - Accessibility-first, respect prefers-reduced-motion
   - Best for: Accessibility-critical apps

**Your answer:**

**If animations used:**

**Respect prefers-reduced-motion?**
A) Yes (disable/reduce animations for users who prefer it)
B) No

---

### Question 4.10: CSS Organization

**How will you organize your stylesheets?**

A) ⭐ **Component-scoped styles**
   - Each component has its own style file
   - Example: `Button.tsx` + `Button.module.css`
   - Best for: Component libraries, modularity

B) **Utility-first (Tailwind)**
   - No separate stylesheets, classes in JSX
   - Best for: Tailwind CSS users

C) **Global + Component**
   - Global base styles + component styles
   - Best for: Hybrid approach

D) **Feature-based**
   - Styles organized by feature/page
   - Example: `features/auth/styles.css`
   - Best for: Larger apps

**Your answer:**

---

### Question 4.11: Accessibility (A11y) Styling

**What accessibility level will you target?**

A) ⭐ **WCAG 2.1 Level AA** (Recommended)
   - Color contrast ratio: 4.5:1 (normal text), 3:1 (large text)
   - Focus indicators visible
   - Best for: Most apps, legal compliance

B) **WCAG 2.1 Level AAA**
   - Color contrast ratio: 7:1 (normal text), 4.5:1 (large text)
   - More stringent requirements
   - Best for: Government, healthcare, education

C) **Basic accessibility**
   - Semantic HTML, keyboard navigation
   - Best for: MVPs, internal tools

D) **No specific target**
   - Best effort only

**Your answer:**

**A11y features to include:**
- [ ] Focus indicators (outline on keyboard focus)
- [ ] High contrast mode support
- [ ] Text resizing support (up to 200%)
- [ ] Screen reader optimizations
- [ ] Reduced motion support

---

## 📊 Phase 4 Summary

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 PHASE 4 SUMMARY: STYLING & DESIGN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Styling Approach: [Answer from 4.1]
Component Library: [Answer from 4.2]
Design Tokens: [Answer from 4.3]
Color System: [Answer from 4.4]
Typography: [Answer from 4.5]
Theming: [Answer from 4.6]
Breakpoints: [Answer from 4.7]
Spacing System: [Answer from 4.8]
Animations: [Answer from 4.9]
CSS Organization: [Answer from 4.10]
Accessibility: [Answer from 4.11]

Is this correct? (Y/n)
```

---

## 📝 Document Generation

Generate `docs/styling.md` using the template with these placeholders:

- `{{STYLING_APPROACH}}` → Styling solution (e.g., "Tailwind CSS")
- `{{COMPONENT_LIBRARY}}` → UI kit (e.g., "shadcn/ui" or "None")
- `{{DESIGN_TOKENS}}` → Yes/No
- `{{THEME_SUPPORT}}` → Dark mode / Multiple themes / None
- `{{COLOR_SYSTEM}}` → Color palette approach
- `{{TYPOGRAPHY_SYSTEM}}` → Type scale approach
- `{{BREAKPOINTS}}` → Responsive breakpoints
- `{{SPACING_SCALE}}` → Spacing system
- `{{ANIMATION_STRATEGY}}` → Animation approach
- `{{A11Y_COMPLIANCE}}` → WCAG level

Update `ai-instructions.md`:

```markdown
## Styling

- **Approach:** {{STYLING_APPROACH}}
- **Component Library:** {{COMPONENT_LIBRARY}}
- **Design Tokens:** {{DESIGN_TOKENS}}
- **Theming:** {{THEME_SUPPORT}}
- **Accessibility:** {{A11Y_COMPLIANCE}}

### Rules

- ✅ ALWAYS use design tokens for colors and spacing
- ✅ ALWAYS ensure WCAG {{A11Y_COMPLIANCE}} color contrast
- ✅ ALWAYS include focus indicators for keyboard navigation
- ❌ NEVER hardcode colors or spacing values
- ❌ NEVER ignore prefers-reduced-motion
{{#IF_TAILWIND}}
- ✅ ALWAYS use Tailwind utility classes, avoid custom CSS
- ❌ NEVER use arbitrary values excessively (e.g., `w-[127px]`)
{{/IF_TAILWIND}}
{{#IF_DARK_MODE}}
- ✅ ALWAYS test components in both light and dark modes
{{/IF_DARK_MODE}}
```

---

## 🚀 Next Steps

```
✅ Phase 4 Complete!

Documents Generated:
  - docs/styling.md
  - ai-instructions.md (updated)

Next: Phase 5 - Code Standards

Read: .ai-bootstrap/prompts/frontend/bootstrap-phase5-standards.md
```

---

**Last Updated:** 2025-01-XX

**Version:** 1.2.0
