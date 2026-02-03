## PHASE 2: UI Components (Swing/JavaFX/SWT) (15-20 min)

> **Order for this phase:** 2.1 → 2.2 → 2.3 → 2.4 → 2.5 → 2.6

### Objective

Define the UI component structure, layouts, and interaction patterns specific to the chosen framework.

---

## 2.1 UI Framework Selection

```
Which UI framework are you using?

A) ☕ Swing - Traditional Java desktop UI
   - Pros: Mature, widely supported, many libraries
   - Cons: Older API, less modern look
   - Tools: NetBeans GUI Builder, IntelliJ Designer

B) 🎨 JavaFX - Modern Java UI framework
   - Pros: Modern design, CSS styling, FXML
   - Cons: Requires separate runtime (Java 11+)
   - Tools: Scene Builder, e(fx)clipse

C) 🪟 SWT (Eclipse) - Native widget toolkit
   - Pros: Native look, fast, Eclipse ecosystem
   - Cons: Eclipse-specific, platform-dependent
   - Tools: WindowBuilder, Eclipse RCP

D) 🔀 Hybrid - Mix of frameworks
   - Example: Swing main UI + JavaFX for media

Your choice: __
```

---

## 2.2 Layout Strategy

**For Swing:**

```
Which layout managers will you use?

A) BorderLayout - Simple 5-region layout (North, South, East, West, Center)
B) GridBagLayout - Flexible grid with constraints
C) MigLayout - Third-party, powerful and intuitive
D) GroupLayout - NetBeans GUI Builder default
E) BoxLayout - Horizontal or vertical stacking
F) CardLayout - Switching between panels
G) FormLayout (JGoodies) - Form-based layouts
H) Custom - Null layout with absolute positioning (not recommended)

Primary layout: __
Secondary layouts: __
```

**For JavaFX:**

```
Which JavaFX layouts will you use?

A) BorderPane - 5-region layout (top, bottom, left, right, center)
B) HBox/VBox - Horizontal/vertical stacking
C) GridPane - Grid-based layout
D) StackPane - Layered components
E) FlowPane - Flowing elements (like CSS flexbox)
F) TilePane - Uniform tiles
G) AnchorPane - Anchor to edges
H) SplitPane - Resizable dividers

Primary layout: __
Secondary layouts: __

Will you use FXML?
A) Yes - Scene Builder + FXML files
B) No - Pure Java code
```

**For SWT:**

```
Which SWT layouts will you use?

A) GridLayout - Simple grid
B) FillLayout - Fill available space
C) RowLayout - Horizontal/vertical rows
D) FormLayout - Form-based with FormAttachment
E) GridData - Grid with spanning and alignment

Primary layout: __
```

---

## 2.3 Component Library

**For Swing:**

```
Which component libraries will you use?

Look and Feel:
A) ⭐ FlatLaf - Modern flat design (recommended)
B) Darcula - Dark theme
C) Substance - Advanced skinnable LAF
D) Nimbus - Built-in modern LAF
E) Metal - Default Java LAF
F) System - Native OS LAF (Windows, macOS)

Additional Libraries:
G) JGoodies - Forms, validation, binding
H) SwingX - Extended Swing components
I) JIDE - Advanced docking, tables
J) MigLayout - Layout manager
K) RSyntaxTextArea - Code editor
L) JFreeChart - Charts and graphs

Your choices: __
```

**For JavaFX:**

```
Which JavaFX libraries will you use?

UI Components:
A) ⭐ ControlsFX - Extended controls (recommended)
B) JFoenix - Material Design components
C) TilesFX - Dashboard tiles
D) FormsFX - Form generation
E) ValidatorFX - Form validation
F) Ikonli - Icon packs (FontAwesome, Material)

Charts & Media:
G) JFreeChart (JavaFX wrapper)
H) MediaPlayer - Built-in video/audio
I) WebView - Embedded browser

Your choices: __
```

**For SWT:**

```
Which SWT/Eclipse libraries will you use?

A) JFace - High-level UI framework
B) Nebula - Extended SWT widgets
C) Opal - Additional widgets
D) RCP (Rich Client Platform) - Full application framework
E) E4 - Eclipse 4 application model
F) EMF (Eclipse Modeling Framework) - Data models

Your choices: __
```

---

## 2.4 Component Inventory

```
List the main UI components for each window:

For each window from Phase 1, specify:

**Window Name:** [e.g., Main Window]

**Layout:** [BorderLayout, BorderPane, GridLayout, etc.]

**Components:**
- Menu bar: [File, Edit, View, Help]
- Toolbar: [New, Open, Save, Cut, Copy, Paste]
- Main area: [Table, Tree, Canvas, Editor]
- Sidebar: [Navigation tree, Property inspector]
- Status bar: [Progress bar, Status label]

**Custom Components:**
- [Name]: [Description]
- Example: MusicWaveform - Custom painted audio waveform

Repeat for each window...
```

---

## 2.5 Interaction Patterns

```
How will users interact with your UI?

**Navigation:**
A) 🗂️ Menu-driven - Main actions in menu bar
B) 🔧 Toolbar-driven - Quick access buttons
C) ⌨️ Keyboard shortcuts - Power user shortcuts
D) 🖱️ Context menus - Right-click actions
E) 🎯 Wizard - Step-by-step guided flow

**Data Input:**
A) 📝 Forms - Text fields, combos, checkboxes
B) 📋 Dialogs - Modal input dialogs
C) 🗂️ Inline editing - Edit directly in table/tree
D) 🎨 Drag & drop - Visual manipulation
E) 📂 File picker - Choose files/folders

**Feedback:**
A) 🔔 Dialog boxes - Modal alerts/confirmations
B) 🎨 Toast notifications - Non-intrusive messages
C) 📊 Progress bars - Long-running operations
D) 🎯 Status bar - Current state messages
E) 🔴 Validation errors - Inline field validation

Your patterns: __
```

---

## 2.6 Responsive Design

```
How will your UI adapt to different screen sizes and resolutions?

A) 🖥️ Fixed size - Minimum window size enforced
B) 📏 Resizable - Components scale with window
C) 🎨 Responsive - Layout changes based on size
D) 📱 Adaptive - Different layouts for small/large screens

Window constraints:
- Minimum size: __ x __ pixels
- Default size: __ x __ pixels
- Maximum size: __ (unconstrained / __ x __)
- Resizable: Yes / No

HiDPI/Retina support:
A) ✅ Yes - Scale UI for high-DPI displays
B) ❌ No - Fixed pixel sizes

Multi-monitor support:
A) ✅ Yes - Remember window positions per monitor
B) ❌ No - Single monitor only
```

---

### Phase 2 Output

```
📋 PHASE 2 SUMMARY:

UI Framework: [Swing/JavaFX/SWT]
Layout Strategy: [Primary layout + secondary layouts]
Component Libraries: [FlatLaf, ControlsFX, etc.]
Main Windows: [List with layouts and components]
Interaction Patterns: [Menu-driven, keyboard shortcuts, etc.]
Responsive Design: [Resizable, HiDPI support, etc.]

Is this correct? (Yes/No)
```

---

### 📄 Update Documents

Update `docs/ARCHITECTURE.md` with:

- UI framework and version
- Layout strategies
- Component libraries
- UI component hierarchy
- Interaction patterns

---

**Next Phase:** Phase 3 - Architecture Desktop (15-20 min)

Read: `.ai-flow/prompts/desktop/flow-build-phase-3.md`

---

**Last Updated:** 2025-02-03
**Version:** 1.0.0
