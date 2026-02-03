## PHASE 1: Discovery & UX Desktop (15-20 min)

> **Order for this phase:** 1.1 → 1.2 → 1.3 → 1.4 → 1.5 → 1.6 → 1.7 → 1.8 → 1.9 → 1.10

> **📌 Scope-based behavior:**
>
> - **MVP/Basic Scope:** Focus only on core windows and user flows
> - **Production-Ready Scope:** In-depth exploration of accessibility, platform integration, and polish

### Objective

Define the desktop application's core purpose, user interface structure, and desktop-specific requirements.

---

## 🔍 Pre-Flight Check (Smart Skip Logic)

**Execute Pre-Flight Check for Phase 1:**

- **Target File**: `project-brief.md`
- **Phase Name**: "DESKTOP UX CONTEXT"
- **Key Items**: Application type, target platform, main windows, user flows, desktop features
- **Typical Gaps**: Platform integration, native features, installation requirements

---

## Phase 1 Questions (Full Mode)

**1.1 Application Name & Description**

```
What is your desktop application name?

Provide a description of your desktop application:
(Don't worry about perfection - we'll refine it together!)

Example: "A music player with library management and playlist features for Windows/Mac"
```

**1.2 Target Platforms**

```
Which platforms will your application support? (Select all that apply)

A) 🪟 Windows (10/11)
B) 🍎 macOS (Intel + Apple Silicon)
C) 🐧 Linux (Debian/Ubuntu, Fedora/RHEL, Arch)
D) ☕ Cross-platform (Write once, run anywhere - Java JAR)

Your choice: __

Platform-specific considerations:
- Windows: File paths (C:\\), registry, native notifications
- macOS: .app bundles, keychain, Dock integration
- Linux: .desktop files, package managers, themes
```

**1.3 Application Type**

```
What type of desktop application are you building?

A) 🎨 Single-window tool - Simple utility (Calculator, Clock, Notes)
B) 📊 MDI (Multiple Document Interface) - Multiple documents in one window (Office apps)
C) 🪟 Multi-window application - Multiple independent windows (GIMP, IDE)
D) 🎛️ Wizard/Assistant - Step-by-step guided process
E) 🖼️ Media player/viewer - Image/video/audio player
F) 📁 File manager/browser - Directory navigation and file operations
G) 🎮 Game - Desktop game application
H) 💼 Business tool - CRM, POS, Inventory, etc.
I) Other: __

Your choice: __
```

**1.4 Main Windows/Screens**

```
List the main windows or screens your application will have:

For each window, provide:
- Name: e.g., "Main Window", "Settings Dialog", "About Window"
- Type: Main window, Dialog, Wizard, Splash screen
- Purpose: Brief description

Example:
1. Main Window - Primary interface with menu bar, toolbar, and content area
2. Preferences Dialog - Application settings
3. About Dialog - Version info and credits
4. Login Window - User authentication (if required)

Your windows:
1.
2.
3.
...
```

**1.5 Main UI Components**

```
What are the main UI components in your application? (Select all that apply)

Standard Components:
A) 📋 Menu bar - File, Edit, View, Help
B) 🔧 Toolbar - Quick access buttons
C) 📊 Status bar - Progress, notifications
D) 🗂️ Tabs/Panels - Multiple views in one window
E) 🌳 Tree view - Hierarchical navigation
F) 📑 Table/List view - Data display
G) 📄 Text editor - Rich or plain text
H) 📈 Charts/Graphs - Data visualization
I) 🖼️ Canvas/Drawing area - Custom graphics
J) 🎚️ Form inputs - Text fields, combo boxes, checkboxes

Advanced Components:
K) 🔍 Search/Filter bar
L) 🎛️ Sidebar navigation
M) 📌 Dockable panels
N) 🖱️ Context menus (right-click)
O) 🎨 Custom painted components
P) 📹 Embedded media player

Your components: __
```

**1.6 Desktop-Specific Features**

```
Which desktop-specific features does your application need? (Select all that apply)

System Integration:
A) 🔔 System notifications/toasts
B) 🎯 System tray icon (minimize to tray)
C) 📂 File associations (open .xyz files)
D) 🔗 URL protocol handler (myapp://...)
E) 🚀 Auto-start on login
F) 🖨️ Printing support
G) 📋 Clipboard integration (copy/paste)
H) 🎤 Microphone/webcam access
I) 🖱️ Global hotkeys/shortcuts

File System:
J) 📁 File picker dialogs (open/save)
K) 📂 Directory watching (auto-reload on file changes)
L) 🗄️ Recent files list
M) 🔐 Secure file storage (encrypted)
N) 📦 File bundling/archiving

Native UI:
O) 🎨 Native look and feel (platform-specific UI)
P) 🌓 Dark/Light mode support
Q) ♿ Accessibility (screen reader support)
R) 🌍 Multi-language (i18n)
S) ⌨️ Keyboard navigation
T) 🖱️ Drag & drop support

Your features: __
```

**1.7 Data Storage**

```
How will your application store data?

A) 💾 Local files (JSON, XML, Properties)
B) 🗄️ Embedded database (H2, Derby, SQLite)
C) 🏢 External database (MySQL, PostgreSQL)
D) ☁️ Cloud sync (Firebase, AWS, custom API)
E) 📝 User preferences (Preferences API, Registry)
F) 🔐 Secure storage (Keychain/Credential Manager)
G) No persistent storage needed

Your choice: __

If using database, specify:
- Schema: Auto-generated or manual?
- Migration: Flyway, Liquibase, or custom?
- Backup: Automatic backup strategy?
```

**1.8 Network Features**

```
Does your application need network connectivity?

A) ✅ Yes - Required for core functionality
B) 🔄 Optional - Works offline, syncs when online
C) ❌ No - Fully offline application

If yes, what network features:
A) 🌐 REST API calls (HTTP client)
B) 🔌 WebSocket (real-time updates)
C) 📧 Email sending (SMTP)
D) 📦 Auto-updates (check for new versions)
E) 🔐 Authentication (OAuth, JWT)
F) ☁️ Cloud storage sync
G) 📊 Analytics/telemetry

Your features: __
```

**1.9 User Flows**

```
Describe the main user flows in your application:

Example (Music Player):
1. Launch application
2. Import music library (drag & drop folder)
3. Browse songs by artist/album/genre
4. Create playlist
5. Play songs with controls (play/pause/skip)
6. Edit metadata (tags)
7. Export playlist

Your flows:
1.
2.
3.
...

For each flow, you can optionally specify the steps. If not specified, the AI will deduce typical steps.
```

**1.10 Success Metrics**

```
How will you measure success?

1. Performance Targets:
   - Startup time: < __ seconds
   - Memory usage: < __ MB
   - CPU usage: < __ % (idle)

2. User Experience:
   - UI responsiveness: < __ ms for actions
   - File load time: < __ seconds for typical file
   - Installation size: < __ MB

⭐ Standard for Desktop MVP:
- Startup: < 5 seconds
- Memory: < 100 MB
- UI response: < 100 ms
- Install size: < 50 MB

🏆 Standard for Production:
- Startup: < 2 seconds
- Memory: < 50 MB (optimized)
- UI response: < 50 ms
- Install size: < 20 MB (compressed)
```

---

### Phase 1 Output

```
📋 PHASE 1 SUMMARY:

Application: [name]
Description: [1 sentence]
Target Platforms: [Windows/macOS/Linux]
Application Type: [Single-window/MDI/Multi-window]
Main Windows: [list]
UI Components: [list]
Desktop Features: [list]
Data Storage: [method]
Network Features: [list/none]
User Flows: [list of main flows]
Success Metrics: [performance targets]

Is this correct? (Yes/No)
```

---

### 📄 Generate Phase 1 Documents

**Generate `project-brief.md` automatically:**

- Use template: `.ai-flow/templates/desktop/project-brief.template.md`
- Fill with all Phase 1 information
- Write to project root: `project-brief.md`

---

**Next Phase:** Phase 2 - UI Components (15-20 min)

Read: `.ai-flow/prompts/desktop/flow-build-phase-2.md`

---

**Last Updated:** 2025-02-03
**Version:** 1.0.0
