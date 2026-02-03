## PHASE 3: Architecture Desktop (15-20 min)

> **Order for this phase:** 3.1 → 3.2 → 3.3 → 3.4 → 3.5 → 3.6

### Objective

Define the application architecture, design patterns, and code organization for desktop applications.

---

## 3.1 Architecture Pattern

```
Which architectural pattern will you use?

A) 🏗️ MVC (Model-View-Controller) - Classic separation
   - Model: Data and business logic
   - View: UI components (Swing/JavaFX/SWT)
   - Controller: Event handling and coordination
   - Best for: Traditional desktop apps

B) 📱 MVP (Model-View-Presenter) - Testable UI
   - Model: Data layer
   - View: Passive UI interface
   - Presenter: UI logic and testing
   - Best for: Apps requiring extensive UI testing

C) 🎨 MVVM (Model-View-ViewModel) - Data binding
   - Model: Data entities
   - View: UI (FXML, declarative)
   - ViewModel: Observable properties
   - Best for: JavaFX with property binding

D) 🏛️ Layered Architecture - Classic N-tier
   - Presentation Layer (UI)
   - Business Logic Layer (Services)
   - Data Access Layer (DAO/Repository)
   - Best for: Enterprise applications

E) 🔌 Plugin Architecture - Extensible
   - Core application + plugin system
   - Plugins loaded dynamically
   - Best for: IDEs, tools with extensions

F) 🎯 Event-Driven - Reactive
   - Components communicate via events
   - EventBus or Observer pattern
   - Best for: Loosely coupled components

Your choice: __
```

---

## 3.2 Package Structure

```
How will you organize your code packages?

**Classic Structure (MVC/MVP):**
```

com.company.appname/
├── model/ # Data entities
│ ├── User.java
│ └── Project.java
├── view/ # UI components
│ ├── MainWindow.java
│ └── dialogs/
├── controller/ # Controllers/Presenters
│ ├── MainController.java
│ └── LoginController.java
├── service/ # Business logic
│ ├── UserService.java
│ └── ProjectService.java
├── dao/ # Data access
│ ├── UserDAO.java
│ └── ProjectDAO.java
└── util/ # Utilities
├── DateUtil.java
└── FileUtil.java

```

**JavaFX Structure (MVVM):**
```

com.company.appname/
├── model/ # Data models
├── view/ # FXML files (in resources/)
├── viewmodel/ # ViewModels with properties
├── controller/ # FXML controllers
├── service/ # Business services
└── repository/ # Data repositories

```

**Plugin Structure:**
```

com.company.appname/
├── core/ # Core application
│ ├── Application.java
│ └── PluginManager.java
├── plugin/ # Plugin API
│ └── IPlugin.java
├── plugins/ # Plugin implementations
│ ├── pdf/
│ └── excel/
├── ui/ # UI components
└── service/ # Core services

```

Which structure fits your needs? (Or describe custom):
__
```

---

## 3.3 Threading Model

```
Desktop applications must handle UI responsiveness. How will you manage threading?

**UI Thread (Event Dispatch Thread):**
- Swing: SwingUtilities.invokeLater()
- JavaFX: Platform.runLater()
- SWT: Display.asyncExec()

**Background Tasks:**
A) SwingWorker (Swing) - Background task with progress
B) Task/Service (JavaFX) - JavaFX background tasks
C) ExecutorService - Custom thread pools
D) CompletableFuture - Async operations (Java 8+)
E) Virtual Threads - Project Loom (Java 21+)

Your threading strategy:
A) ✅ All long-running operations in background threads
B) 🔄 Progress indicators for tasks > 1 second
C) ❌ Blocking UI (not recommended)

Concurrency patterns:
A) Producer-Consumer (queue-based)
B) Future/Promise (async results)
C) Observer (event notifications)
D) Synchronized collections

Your choices: __
```

---

## 3.4 Event Handling

```
How will components communicate?

**Swing Event Handling:**
A) ActionListener - Button clicks
B) DocumentListener - Text changes
C) PropertyChangeListener - Property changes
D) Custom EventListener - Domain events

**JavaFX Event Handling:**
A) EventHandler<ActionEvent> - Button clicks
B) ChangeListener - Observable property changes
C) InvalidationListener - Observable invalidation
D) Custom events with EventBus

**SWT Event Handling:**
A) SelectionListener - Widget selections
B) ModifyListener - Text modifications
C) FocusListener - Focus changes
D) Custom events

**Event Bus Libraries:**
A) EventBus (Guava) - Simple pub/sub
B) MBassador - High-performance event bus
C) Custom Observer pattern

Your event strategy: __
```

---

## 3.5 Dependency Injection

```
Will you use Dependency Injection?

A) ✅ Yes - Framework-based
   - Spring Framework (Desktop edition)
   - Google Guice
   - CDI (Weld SE)

B) ✅ Yes - Manual
   - Constructor injection
   - Factory pattern
   - Service locator

C) ❌ No - Direct instantiation
   - new MyService()
   - Singleton pattern

Your choice: __

If yes, how will you manage dependencies?
- Scopes: Singleton, Prototype
- Lifecycle: Initialization, cleanup
- Configuration: Annotations vs XML
```

---

## 3.6 Error Handling

```
How will you handle errors and exceptions?

**Global Exception Handler:**
A) ✅ Yes - Catch all uncaught exceptions
   - Swing: Thread.setDefaultUncaughtExceptionHandler()
   - JavaFX: Thread.setDefaultUncaughtExceptionHandler()
   - Show error dialog to user
   - Log to file

B) ❌ No - Handle locally

**Error Dialog Strategy:**
A) 🔴 Error Dialog - Show details, allow reporting
B) 🎨 Toast Notification - Non-intrusive for minor errors
C) 📝 Status Bar - Show error message
D) 📋 Log only - Silent errors, check logs

**Logging:**
A) SLF4J + Logback - Industry standard
B) Log4j2 - Apache logging
C) java.util.logging - Built-in
D) Custom logging

Log levels:
- TRACE - Detailed debug
- DEBUG - Development info
- INFO - General info
- WARN - Warning messages
- ERROR - Error messages

Your choices: __
```

---

### Phase 3 Output

```
📋 PHASE 3 SUMMARY:

Architecture Pattern: [MVC/MVP/MVVM/Layered/Plugin/Event-Driven]
Package Structure: [Described above]
Threading Model: [SwingWorker, Task, ExecutorService]
Event Handling: [ActionListener, EventBus, etc.]
Dependency Injection: [Spring/Guice/Manual/None]
Error Handling: [Global handler, error dialogs, logging strategy]

Is this correct? (Yes/No)
```

---

### 📄 Update Documents

Update `docs/ARCHITECTURE.md` with:

- Architecture pattern diagram
- Package structure
- Threading model and best practices
- Event handling flow
- Dependency injection configuration
- Error handling strategy

---

**Next Phase:** Phase 4 - Data & Storage (15-20 min)

Read: `.ai-flow/prompts/desktop/flow-build-phase-4.md`

---

**Last Updated:** 2025-02-03
**Version:** 1.0.0
