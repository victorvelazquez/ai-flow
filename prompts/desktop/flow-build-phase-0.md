## PHASE 0: Context Discovery (2-5 min)

> **Order for this phase:** ALWAYS executed FIRST if an existing project is detected. Skip ONLY for new projects.

> **📌 Scope-based behavior:**
>
> - **Interactive Mode:** Ask user for permission to scan files layer by layer.
> - **Autonomous Mode:** Scan all layers automatically and present the final report.

### Objective

Efficiently analyze existing desktop Java projects (NetBeans/Eclipse) using a **layered, incremental approach**.

---

## 🚫 Critical Exclusion Rules

To avoid false-positive detections, **IGNORE** the following folders and files during all detection steps:

- `.ai-flow/work/` (contains active development tasks)
- `.ai-flow/archive/` (contains completed tasks)
- `.agent/` (contains AI workflows)
- `docs/` and `specs/` (if they contain AI Flow generated documentation)
- `planning/` (if it contains AI Flow generated roadmap and user stories)
- `project-brief.md`, `ai-instructions.md`, `AGENT.md`

**A project is considered "Existing" only if it contains functional source code or framework configuration files OUTSIDE these excluded paths.**

---

## 0.0 Check for Existing Analysis (Layer 0)

Check if `.ai-flow/cache/docs-analysis.json` exists and is fresh.

**If found:**
Ask user to use cached analysis or re-analyze.

**If not found:**
Proceed to Layer 1.

---

// turbo

## ⚡ Layer 1: Fast Metadata Scan (10-20 seconds)

**Purpose:** Detect IDE (NetBeans/Eclipse), UI framework (Swing/JavaFX/SWT), build tool, and existing AI configurations.

⭐ **Context Links:**

- NetBeans: [nbproject/project.xml](file:///nbproject/project.xml) | [build.xml](file:///build.xml)
- Eclipse: [.project](file:///.project) | [.classpath](file:///.classpath)
- Maven: [pom.xml](file:///pom.xml)
- Gradle: [build.gradle](file:///build.gradle) | [build.gradle.kts](file:///build.gradle.kts)
- Java Sources: [src/](file:///src/) | [src/main/java/](file:///src/main/java/)

### 0.1.1 Desktop Project Detection

**Action:** Detect IDE, UI framework, build system, and Java version.

**NetBeans Project Detection:**

Check for NetBeans-specific markers:

- `nbproject/project.xml` - NetBeans project descriptor
- `build.xml` - Ant build configuration
- `manifest.mf` - JAR manifest file
- `src/` with Java source files
- `lib/` for dependencies (Ant-based projects)

**Swing Detection (NetBeans):**

- `.form` files in `src/` (NetBeans GUI Builder)
- Java files with `JFrame`, `JPanel`, `JDialog` imports
- GUI initialization code: `new JFrame()`, `SwingUtilities.invokeLater()`

**JavaFX Detection (NetBeans):**

- `.fxml` files (Scene Builder)
- Java files with `javafx.*` imports
- Main class extends `javafx.application.Application`
- Maven/Gradle dependencies: `org.openjfx:javafx-*`

**Eclipse Project Detection:**

Check for Eclipse-specific markers:

- `.project` - Eclipse project descriptor
- `.classpath` - Classpath configuration
- `.settings/` - IDE settings directory
- `pom.xml` (Maven) or `build.gradle` (Gradle)
- `src/main/java/` or `src/` for source code

**Swing Detection (Eclipse):**

- Java files with `JFrame`, `JPanel`, `JDialog` imports
- WindowBuilder metadata (`.wbp-component-cache`)
- GUI initialization code

**JavaFX Detection (Eclipse):**

- `.fxml` files
- Java files with `javafx.*` imports
- e(fx)clipse project nature in `.project`
- Maven/Gradle dependencies: `org.openjfx:javafx-*`

**SWT/JFace Detection (Eclipse only):**

- Java files with `org.eclipse.swt.*` imports
- Java files with `org.eclipse.jface.*` imports
- Main class uses `Display`, `Shell`, `ApplicationWorkbenchAdvisor`
- `.product` file (Eclipse RCP)
- Maven/Gradle dependencies: `org.eclipse.platform:org.eclipse.swt.*`

**Project Type Classification:**

1. **NetBeans Desktop (Swing):**
   - Has `.form` files
   - Swing imports present
   - No web/ directory
   - Build.xml with desktop-related targets

2. **NetBeans Desktop (JavaFX):**
   - Has `.fxml` files
   - JavaFX imports present
   - Main extends `Application`
   - Maven/Gradle with JavaFX deps

3. **Eclipse Desktop (Swing):**
   - Has `.project` file
   - Swing imports present
   - Maven/Gradle build
   - No web facets

4. **Eclipse Desktop (JavaFX):**
   - Has `.project` file
   - JavaFX imports and `.fxml` files
   - e(fx)clipse nature
   - Maven/Gradle with JavaFX deps

5. **Eclipse RCP (SWT):**
   - Has `.project` and `.product` files
   - SWT/JFace imports
   - Plugin dependencies
   - OSGi manifest

**Build System Detection:**

NetBeans:

- Default: Apache Ant (`build.xml`)
- Modern: Maven (`pom.xml`) or Gradle (`build.gradle`)
- Hybrid: Ant + Ivy

Eclipse:

- Default: Maven (`pom.xml`) or Gradle (`build.gradle`)
- Legacy: Ant with Eclipse compiler
- PDE: Eclipse Plugin Development

**Java Version Detection:**

- NetBeans: Check `nbproject/project.properties` for `javac.source` and `javac.target`
- Eclipse: Check `.classpath` for `org.eclipse.jdt.launching.JRE_CONTAINER`
- Maven: Check `<maven.compiler.source>` and `<maven.compiler.target>`
- Gradle: Check `sourceCompatibility` and `targetCompatibility`

**Packaging Detection:**

- JAR: Standard executable JAR with manifest
- Native: jpackage, launch4j, exe4j
- Installer: NSIS, Inno Setup, WiX
- Mac: .app bundle, .dmg
- Windows: .exe, .msi
- Linux: .deb, .rpm, AppImage

---

## 🔍 Layer 2: Architecture Analysis (30-60 seconds)

**Purpose:** Understand package structure, main entry points, UI components, and design patterns.

### 0.2.1 Source Code Structure

Scan `src/` or `src/main/java/` for:

1. **Package Structure:**
   - Main package: `com.company.app`
   - UI packages: `ui`, `view`, `gui`, `swing`, `javafx`
   - Logic packages: `controller`, `service`, `business`
   - Data packages: `model`, `entity`, `dao`, `repository`
   - Util packages: `util`, `helper`, `common`

2. **Main Entry Point:**
   - NetBeans Swing: Class with `public static void main()` and `SwingUtilities.invokeLater()`
   - JavaFX: Class extends `javafx.application.Application` with `start(Stage)`
   - SWT: Class with `Display.getDefault()` and `Shell`

3. **UI Components:**
   - Forms/Windows: Count of `JFrame`, `JDialog`, `Stage`, `Shell` classes
   - Panels: Count of `JPanel`, `Pane`, `Composite` classes
   - Custom components: Subclasses of UI classes

4. **Design Patterns:**
   - MVC: Separate `model`, `view`, `controller` packages
   - MVP: Presenter classes
   - MVVM: ViewModel classes (JavaFX properties)
   - Observer: EventListeners, PropertyChangeListeners
   - Singleton: Database connections, controllers

### 0.2.2 Data Layer Detection

Check for:

- **JDBC:** `java.sql.*` imports, `Connection`, `PreparedStatement`
- **JPA/Hibernate:** `javax.persistence.*` annotations, `persistence.xml`
- **Embedded DB:** H2, Derby, SQLite dependencies
- **External DB:** MySQL, PostgreSQL, Oracle drivers
- **File Storage:** Serialization, XML, JSON, Properties files
- **Preferences:** `java.util.prefs.Preferences`

### 0.2.3 External Libraries

Check dependencies in:

- Maven: `pom.xml` → `<dependencies>`
- Gradle: `build.gradle` → `dependencies { }`
- Ant: `lib/` folder or `ivy.xml`

Common libraries:

- Swing: Substance, FlatLaf, Darcula LAF
- JavaFX: ControlsFX, JFoenix, TilesFX
- SWT: Nebula, Opal
- HTTP: Apache HttpClient, OkHttp
- JSON: Jackson, Gson, org.json
- Logging: Log4j, SLF4J, Logback
- Testing: JUnit, Mockito, TestFX

---

## 🧩 Layer 3: Detailed Component Inventory (1-2 minutes)

**Purpose:** List all UI screens, controllers, models, and business logic.

### 0.3.1 UI Screens Inventory

For each UI screen, document:

- File name: `MainWindow.java`, `LoginDialog.java`
- Type: JFrame, JDialog, Stage, Shell
- Purpose: Login, Dashboard, Settings, etc.
- Layout: BorderLayout, GridBagLayout, VBox, GridLayout
- Components: Buttons, text fields, tables, trees, etc.

### 0.3.2 Controllers/Presenters

List all controller classes:

- Naming pattern: `*Controller`, `*Presenter`, `*Handler`
- Responsibilities: Business logic, event handling, data binding

### 0.3.3 Models/Entities

List all data models:

- POJOs: Simple Java objects
- JPA Entities: Classes with `@Entity`
- JavaFX Properties: ObservableList, SimpleStringProperty
- Table models: AbstractTableModel, ObservableList

### 0.3.4 Services/Business Logic

List service classes:

- Naming pattern: `*Service`, `*Manager`, `*Facade`
- Responsibilities: Data access, business rules, validation

---

## 📊 Phase 0 Output

After all layers, generate a summary:

```
📋 PHASE 0 SUMMARY: Desktop Project Discovery

**IDE & Build System:**
- IDE: [NetBeans 17 / Eclipse 2024-03]
- Build Tool: [Ant / Maven / Gradle]
- Java Version: [Java 17]

**UI Framework:**
- Framework: [Swing / JavaFX / SWT]
- Layout Manager: [BorderLayout / FXML / GridLayout]
- LAF/Theme: [FlatLaf Dark / Modena / GTK]

**Project Structure:**
- Main Package: com.company.app
- Entry Point: MainApp.java
- UI Screens: 8 windows, 15 dialogs
- Controllers: 12 classes
- Models: 20 entities
- Services: 8 classes

**Data Layer:**
- Database: [H2 embedded / PostgreSQL]
- ORM: [JDBC / JPA + Hibernate]
- Local Storage: Preferences API, JSON files

**Dependencies:**
- UI Libraries: FlatLaf, MigLayout
- Data Libraries: H2, Hibernate
- Utilities: Apache Commons, Jackson

**Packaging:**
- Output: Executable JAR
- Native: jpackage (Windows .exe, Mac .app)
- Installer: NSIS (Windows), DMG (Mac)

Is this correct? (Yes/No)
```

---

### 📄 Cache Results

Save analysis to `.ai-flow/cache/docs-analysis.json`:

```json
{
  "timestamp": "2025-02-03T10:30:00Z",
  "projectType": "desktop",
  "ide": "netbeans",
  "uiFramework": "swing",
  "buildTool": "maven",
  "javaVersion": "17",
  "mainPackage": "com.company.app",
  "entryPoint": "MainApp.java",
  "screens": 8,
  "controllers": 12,
  "models": 20,
  "services": 8,
  "database": "h2",
  "orm": "hibernate",
  "dependencies": ["flatlaf", "miglayout", "h2", "hibernate", "jackson"]
}
```

---

**Next Phase:** Phase 1 - Discovery & UX Desktop (15-20 min)

Read: `.ai-flow/prompts/desktop/flow-build-phase-1.md`

---

**Last Updated:** 2025-02-03
**Version:** 1.0.0
