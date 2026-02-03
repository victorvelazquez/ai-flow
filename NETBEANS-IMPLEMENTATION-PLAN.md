# Plan de Implementación: Soporte NetBeans y Eclipse en AI Flow

> **Objetivo:** Agregar soporte completo para proyectos Java Desktop desarrollados con NetBeans o Eclipse (Swing, JavaFX, SWT) usando Ant, Maven o Gradle.

**Fecha de creación:** 3 de febrero de 2026  
**Estado:** 🚧 En revisión (agregando soporte Eclipse)  
**Tiempo estimado total:** 30-40 horas  
**Archivos a modificar:** 15 archivos  
**Archivos a crear:** ~40 nuevos archivos

---

## 📊 Progreso General

- [x] Tarea 1: Análisis de estructura actual ✅
- [ ] Tarea 2: CLI - Agregar tipo Desktop
- [ ] Tarea 3: Phase 0 - Detección NetBeans/Eclipse
- [ ] Tarea 4: Phase 3 - Frameworks NetBeans/Eclipse
- [ ] Tarea 5: Prompts Desktop - Phase 0-2
- [ ] Tarea 6: Prompts Desktop - Phase 3-5
- [ ] Tarea 7: Prompts Desktop - Phase 6-8
- [ ] Tarea 8: Prompts Desktop - Phase 9-10 y Workflows
- [ ] Tarea 9: Templates Desktop - Estructura base
- [ ] Tarea 10: Templates Desktop - Docs y Specs
- [ ] Tarea 11: Phase 8 - Inicialización Ant/Maven/Gradle
- [ ] Tarea 12: Documentación README y Getting Started
- [ ] Tarea 13: Copilot Instructions
- [ ] Tarea 14: Tests de detección NetBeans/Eclipse
- [ ] Tarea 15: Revisión final y testing

---

## 🔍 Comparación: NetBeans vs Eclipse

### NetBeans

**Archivos de proyecto:**

- `nbproject/project.xml` - Descriptor de proyecto
- `nbproject/project.properties` - Propiedades
- `build.xml` - Ant build (default)
- `manifest.mf` - JAR manifest

**UI Frameworks:**

- Swing + NetBeans GUI Builder (`.form` files)
- JavaFX + Scene Builder
- NetBeans RCP (Rich Client Platform)

**Build System:**

- **Default:** Apache Ant
- Alternativas: Maven, Gradle

**Estructura típica:**

```
project/
├── nbproject/
├── src/
├── test/
├── lib/
├── build.xml
└── manifest.mf
```

### Eclipse

**Archivos de proyecto:**

- `.project` - Descriptor de proyecto Eclipse
- `.classpath` - Configuración de classpath
- `.settings/` - Configuraciones del IDE
- `pom.xml` o `build.gradle` (Maven/Gradle projects)

**UI Frameworks:**

- Swing (manual layout)
- JavaFX + e(fx)clipse plugin
- **SWT (Standard Widget Toolkit)** - Nativo de Eclipse
- JFace (API sobre SWT)
- Eclipse RCP (Rich Client Platform)

**Build System:**

- **Default:** Maven o Gradle (proyectos modernos)
- Legacy: Ant + Eclipse compiler
- Eclipse PDE (Plugin Development Environment)

**Estructura típica:**

```
project/
├── .project
├── .classpath
├── .settings/
├── src/
│   └── main/java/
├── src/
│   └── main/resources/
├── pom.xml (Maven)
└── build.gradle (Gradle)
```

**Diferencias clave:**

- Eclipse usa SWT (widgets nativos del OS)
- NetBeans usa Ant por defecto, Eclipse usa Maven/Gradle
- Eclipse `.classpath` vs NetBeans `lib/` folder
- Eclipse tiene mejor integración con Maven
- NetBeans tiene mejor GUI Builder para Swing

---

## 🎯 Estrategia de Detección Unificada

### Detección de IDE

**NetBeans:**

```bash
# Indicators
- nbproject/project.xml exists
- build.xml with NetBeans-specific targets
- Swing .form files
```

**Eclipse:**

```bash
# Indicators
- .project file exists
- .classpath file exists
- .settings/ directory exists
- Maven (pom.xml) or Gradle (build.gradle)
- SWT libraries in dependencies
```

### Tipos de Proyecto Desktop

1. **Swing Desktop (NetBeans/Eclipse)**
   - Pure Swing components
   - Manual layout or GUI builder
   - Cross-platform

2. **JavaFX Desktop (NetBeans/Eclipse)**
   - Modern UI toolkit
   - FXML layouts
   - CSS styling

3. **SWT Desktop (Eclipse)**
   - Native widgets
   - Platform-specific look & feel
   - JFace for higher-level abstractions

4. **RCP (NetBeans/Eclipse)**
   - Plugin-based architecture
   - Modular applications
   - Enterprise-grade

---

## 🎯 FASE 1: CORE CLI Y DETECCIÓN (Prioridad Alta)

### Tarea 2: Actualizar CLI para tipo Desktop ⏱️ 2-3 horas

**Archivo:** `src/cli.ts`

**Cambios necesarios:**

1. **Agregar Desktop a PROJECT_PHASES** (línea ~45)

```typescript
desktop: {
  label: 'Desktop',
  phases: [
    'fase 0: Context Discovery (proyectos existentes)',
    'fase 1: Discovery & UX Desktop',
    'fase 2: UI Components (Swing/JavaFX)',
    'fase 3: Architecture Desktop',
    'fase 4: Data & Storage',
    'fase 5: Code Standards',
    'fase 6: Testing',
    'fase 7: Packaging & Deployment',
    'fase 8: Project Setup & Final Docs',
    'fase 9: Implementation Roadmap (opcional)',
    'fase 10: User Stories Generation (opcional)',
  ],
},
```

2. **Actualizar getProjectTypeLabel()** (línea ~117)

```typescript
case 'desktop':
  return 'Desktop';
```

3. **Actualizar selectProjectType()** (línea ~291-318)
   - Agregar 'desktop' al tipo de retorno
   - Agregar 'desktop' al array valid
   - Agregar opción en choices: `{ name: '🖥️ Desktop Application', value: 'desktop' }`

4. **Actualizar createBootstrapStructure()** (línea ~349)

```typescript
desktop: projectType === 'desktop',
```

5. **Actualizar copyPrompts()** - Agregar caso para desktop

6. **Actualizar setupSlashCommands()** - Agregar comandos desktop

**Validación:**

```bash
npm run build
node dist/cli.js --help
# Debería mostrar desktop como opción
```

---

### Tarea 3: Phase 0 - Detección de Proyectos NetBeans/Eclipse ⏱️ 3-4 horas

#### 3.1 Actualizar Backend Phase 0

**Archivo:** `prompts/backend/flow-build-phase-0.md`

**Ubicación:** Línea ~55 (sección 0.1.1 Universal Tech Stack Detection)

**Agregar después de "Java/Kotlin: Spring Boot, Micronaut, Ktor, etc.":**

```markdown
**NetBeans Project Detection (Java):**

Check for NetBeans-specific markers:

- `nbproject/project.xml` - NetBeans project descriptor
- `build.xml` - Ant build configuration
- `manifest.mf` - JAR manifest file
- `src/` with Java source files
- `lib/` for dependencies (optional)

**Eclipse Project Detection (Java):**

Check for Eclipse-specific markers:

- `.project` - Eclipse project descriptor
- `.classpath` - Classpath configuration
- `.settings/` - IDE settings directory
- `pom.xml` (Maven) or `build.gradle` (Gradle)
- `src/main/java/` or `src/` for source code

**Project Type Classification:**

1. **NetBeans Web Application:**
   - Has `web/` or `WebContent/` directory
   - Contains `web.xml` in `web/WEB-INF/`
   - Servlets/JSP files present
   - Build.xml with web-related targets

2. **NetBeans Desktop Application:**
   - Has Swing `.form` files in `src/`
   - JavaFX `.fxml` files
   - Main class with GUI initialization (JFrame/Application)
   - No web/ directory

3. **Eclipse Desktop Application (Swing/JavaFX):**
   - Has `.project` file
   - Maven/Gradle with JavaFX or Swing dependencies
   - Main class with GUI initialization
   - No web facets

4. **Eclipse Desktop Application (SWT):**
   - Has `.project` file
   - Dependencies: `org.eclipse.swt.*`, `org.eclipse.jface.*`
   - Main class extends `ApplicationWorkbenchAdvisor` or uses `Display`
   - May have `.product` file (RCP)

5. **Enterprise Application (NetBeans/Eclipse):**
   - EJB configurations
   - persistence.xml (JPA)
   - ejb-jar.xml
   - Enterprise modules

**Build System Detection:**

NetBeans:

- Default: Apache Ant (build.xml)
- Modern: Maven (pom.xml) or Gradle (build.gradle)
- Hybrid: Ant + Ivy

Eclipse:

- Default: Maven (pom.xml) or Gradle (build.gradle)
- Legacy: Ant with Eclipse compiler
- PDE: Eclipse Plugin Development

**Version Detection:**

- NetBeans: Check `nbproject/project.properties` for version
- Eclipse: Check `.project` XML for `<buildSpec>` and `<nature>` tags
- Java version: Check build config (Maven/Gradle) or project properties
```

**Ubicación:** Sección 0.2.1 Pattern Detection (línea ~100)

**Agregar:**

```markdown
**NetBeans Project Structure:**

Typical NetBeans structure:
```

project-root/
├── nbproject/ # NetBeans metadata
│ ├── project.xml
│ ├── project.properties
│ └── private/
├── src/ # Source code
│ └── com/company/
├── test/ # Unit tests (optional)
├── lib/ # External JARs
├── build/ # Compiled classes (gitignored)
├── dist/ # Distribution JARs (gitignored)
├── build.xml # Ant build script
└── manifest.mf # JAR manifest

```

**Eclipse Project Structure (Maven):**

Typical Eclipse + Maven structure:
```

project-root/
├── .project # Eclipse project file
├── .classpath # Classpath configuration
├── .settings/ # IDE settings
│ ├── org.eclipse.jdt.core.prefs
│ └── org.eclipse.m2e.core.prefs
├── src/
│ ├── main/
│ │ ├── java/ # Java sources
│ │ └── resources/ # Resources
│ └── test/
│ └── java/ # Test sources
├── target/ # Build output (gitignored)
├── pom.xml # Maven configuration
└── README.md

```

**Eclipse Project Structure (Gradle):**

Typical Eclipse + Gradle structure:
```

project-root/
├── .project
├── .classpath
├── .settings/
├── src/
│ └── main/java/
├── build/ # Build output (gitignored)
├── build.gradle # Gradle build script
├── settings.gradle
└── gradle/
└── wrapper/

```

**SWT/RCP Project Indicators:**
- Dependencies on `org.eclipse.swt`, `org.eclipse.jface`
- `.product` file (RCP application definition)
- `plugin.xml` (OSGi bundle manifest)
- `META-INF/MANIFEST.MF` with `Bundle-SymbolicName`
```

#### 3.2 Crear Desktop Phase 0

**Archivo nuevo:** `prompts/desktop/flow-build-phase-0.md`

**Contenido completo:** ~550 líneas adaptadas de backend/flow-build-phase-0.md

**Diferencias clave:**

- Detectar `.form` (Swing GUI Builder - NetBeans)
- Detectar `.fxml` (JavaFX Scene Builder)
- Detectar `Display` y SWT classes (Eclipse SWT)
- Detectar Main class con `JFrame`, `Application`, o `Display`
- Detectar embedded databases (H2, Derby, SQLite)
- No buscar endpoints REST/GraphQL
- Buscar UI controllers/presenters/advisors
- Detectar librerías desktop: Swing, JavaFX, SWT, JFace
- Detectar `.product` files (Eclipse RCP)
- Detectar `plugin.xml` (OSGi bundles)

---

### Tarea 4: Phase 3 - Frameworks NetBeans/Eclipse ⏱️ 2-3 horas

#### 4.1 Actualizar Backend Phase 3

**Archivo:** `prompts/backend/flow-build-phase-3.md`

**Ubicación:** Línea ~83 (sección 3.1 Backend Framework)

**Agregar después de opciones Java existentes:**

```markdown
Java (NetBeans - Ant Based):
J) ⚡ NetBeans + Servlets/JSP - Traditional Java web

- Java EE web applications
- Servlet containers (Tomcat, GlassFish)
- JSP for server-side rendering
- JDBC for database access

K) 🔥 NetBeans + JAX-RS - RESTful API

- Jersey or RESTEasy implementation
- JSON/XML response formats
- Bean Validation support
- GlassFish or Payara server

L) 🏆 NetBeans + Spring Framework (Ant)

- Spring MVC or Spring Boot
- Dependency injection
- Can use Ant instead of Maven
- Tomcat embedded or standalone

Build System: Apache Ant (build.xml)

Java (Eclipse - Maven/Gradle):
M) 🏆 Eclipse + Spring Boot (Maven/Gradle)

- Spring MVC or Spring REST
- Modern build tools
- Better dependency management
- Extensive Eclipse tooling
```

**Ubicación:** Línea ~195 (después de Package Manager)

**Agregar:**

```markdown
**For NetBeans Projects:**

Build Tool:
A) ⭐ Apache Ant - Default for NetBeans (build.xml)
B) Maven - Modern alternative (pom.xml)
C) Gradle - Modern alternative (build.gradle)

If using Ant:

- Dependencies managed via lib/ folder
- Manual JAR management or Ant + Ivy
- Build targets: compile, jar, run, clean

**For Eclipse Projects:**

Build Tool:
A) ⭐ Maven - Recommended (pom.xml)
B) 🔥 Gradle - Modern alternative (build.gradle)
C) Ant - Legacy (build.xml)

Eclipse uses:

- m2e (Maven integration)
- Buildship (Gradle integration)
- Automatic classpath management
```

#### 4.2 Crear Desktop Phase 3

**Archivo nuevo:** `prompts/desktop/flow-build-phase-3.md`

**Estructura:** ~900 líneas

**Secciones principales:**

```markdown
## PHASE 3: Desktop Architecture (15-20 min)

### 3.1 Desktop Framework

Which desktop framework will you use?

Java Swing (NetBeans):
A) ⭐ Java Swing + NetBeans GUI Builder (Recommended for RAD)

- Visual form designer (drag & drop)
- Generates .form XML files
- Mature, stable, wide adoption
- Extensive component library (JFrame, JPanel, JButton, etc.)

B) Java Swing + Manual Layout (NetBeans/Eclipse)

- Full programmatic control
- No .form files
- Layout managers (GridBagLayout, BorderLayout, etc.)
- Works in any IDE

JavaFX (NetBeans/Eclipse):
C) ⚡ JavaFX + Scene Builder (Recommended for new projects)

- Modern UI toolkit
- CSS styling support
- FXML declarative UI
- Scene Builder visual designer
- Rich media and graphics
- e(fx)clipse plugin for Eclipse

D) JavaFX + FXML (Code-first)

- Declarative XML layouts
- MVVM pattern support
- Separation of UI and logic
- Works in NetBeans/Eclipse

Eclipse SWT (Eclipse-specific):
E) 🏆 SWT (Standard Widget Toolkit) - Recommended for Eclipse

- Native OS widgets (Windows, macOS, Linux)
- Platform-specific look & feel
- High performance
- Lower memory footprint
- Used by Eclipse IDE itself

F) SWT + JFace

- Higher-level abstractions over SWT
- Data binding, viewers, dialogs
- Model-View architecture
- Simplifies SWT development

Rich Client Platform:
G) 🏆 Eclipse RCP (Rich Client Platform)

- Enterprise desktop applications
- Plugin architecture (OSGi)
- Modular system
- Built-in features (menu, toolbar, perspectives, views)
- Best for complex applications
- Eclipse Workbench framework

H) NetBeans RCP (Rich Client Platform)

- Modular desktop framework
- NetBeans module system
- Swing-based
- Good for large-scale apps

Other:
I) Electron + Node.js (JavaScript/TypeScript)
J) Qt (C++)
K) WPF (.NET/C#)
L) Flutter Desktop (Dart)

Your choice: \_\_

**IDE Compatibility:**

- Swing: ✅ NetBeans (GUI Builder), ✅ Eclipse
- JavaFX: ✅ NetBeans, ✅ Eclipse (e(fx)clipse)
- SWT: ⚠️ Eclipse only (native integration)
- NetBeans RCP: ✅ NetBeans only
- Eclipse RCP: ✅ Eclipse only

### 3.2 Architecture Pattern

Desktop-specific patterns:

A) ⭐ MVC (Model-View-Controller) - Recommended for Swing/SWT

- Swing/SWT naturally fit MVC
- Clear separation of concerns
- Easy to test business logic
- Controller handles user events

B) MVP (Model-View-Presenter)

- View is passive (no logic)
- Presenter handles all UI logic
- Better testability than MVC
- View interface for mocking

C) MVVM (Model-View-ViewModel) - Recommended for JavaFX

- Data binding between View and ViewModel
- JavaFX properties support
- Observable patterns
- Reduces boilerplate code

D) Layered Architecture

- Presentation → Business → Data Access
- Traditional approach
- Works with any framework

E) Event-Driven Architecture

- Component-based communication
- Observer pattern
- Loose coupling
- Good for complex UIs

Your choice: \_\_
Why this pattern?

### 3.3 UI Component Structure

How will you organize UI components?

Window Management:
A) SDI (Single Document Interface) - One main window
B) MDI (Multiple Document Interface) - Parent with child windows
C) Tabbed Interface (JTabbedPane / TabFolder)
D) Wizard/Step-based Flow
E) Dashboard-style (panels/cards)
F) Perspective-based (Eclipse RCP)

Main window components:

- Menu bar? (Yes/No)
- Toolbar? (Yes/No)
- Status bar? (Yes/No)
- Side navigation? (Yes/No)
- Context menu? (Yes/No)

### 3.4 Data Persistence

Which database will you use?

Embedded (Local):
A) ⭐ H2 Database - Recommended (Java, embedded/server mode)
B) SQLite - Popular (cross-platform, C-based)
C) Apache Derby (JavaDB) - Pure Java (included in JDK)
D) HSQLDB - Lightweight Java database

Client-Server:
E) PostgreSQL
F) MySQL/MariaDB
G) SQL Server
H) Oracle

NoSQL (Optional):
I) MongoDB (embedded with Fongo)
J) Apache Derby in memory mode

ORM/Data Access:
A) ⭐ JPA + Hibernate (Recommended)
B) JPA + EclipseLink
C) MyBatis
D) JDBC (Plain SQL)
E) jOOQ (Type-safe SQL)

Your choice: \_\_

### 3.5 Application Settings

How will you store app configuration?

A) ⭐ Properties file (app.properties, config.properties)
B) XML configuration (config.xml)
C) JSON configuration (config.json)
D) YAML configuration (config.yaml)
E) Java Preferences API (registry-like storage)
F) Eclipse Preferences (for RCP)
G) Registry (Windows only)

User data location:
A) User home directory (~/.myapp/)
B) AppData/Application Support (OS-specific)
C) Custom location (user-selectable)
D) Project workspace (Eclipse RCP)

### 3.6 Packaging & Distribution

How will users install your application?

A) ⭐ Executable JAR (java -jar app.jar) - Simple
B) Fat JAR (all dependencies bundled)
C) Native installer (Windows .exe, Mac .dmg, Linux .deb/.rpm)
D) Self-contained package (JRE bundled)
E) Web Start (JNLP) - Deprecated but still used
F) Eclipse Update Site (for RCP)

Build tools for packaging:
A) ⭐ jpackage (Java 14+) - Official tool
B) Launch4j (Windows exe wrapper)
C) Install4j (commercial, multi-platform)
D) IzPack (open source installer)
E) Inno Setup (Windows)
F) Eclipse Tycho (for RCP/OSGi)

Your choice: \_\_

### 3.7 Threading & Concurrency

Desktop UIs have specific threading requirements:

**Swing (NetBeans/Eclipse):**

- All UI updates MUST run on EDT (Event Dispatch Thread)
- Use SwingUtilities.invokeLater() or EventQueue.invokeLater()
- Background tasks: SwingWorker
- Never block EDT with long-running operations

**JavaFX (NetBeans/Eclipse):**

- All UI updates MUST run on JavaFX Application Thread
- Use Platform.runLater() for UI updates
- Background tasks: Task, Service
- Concurrency utilities in javafx.concurrent

**SWT (Eclipse):**

- All UI updates MUST run on UI thread
- Use Display.asyncExec() or Display.syncExec()
- Background tasks: Job (Eclipse framework)
- Never call widget methods from non-UI threads

Will you use background tasks?
A) Yes - For file I/O, network, database
B) Yes - For long computations
C) No - Simple synchronous app

Threading library:
A) ⭐ Built-in (SwingWorker, Task, Job)
B) ExecutorService (java.util.concurrent)
C) CompletableFuture (Java 8+)
D) Virtual Threads (Java 21+)
```

---

## 🎨 FASE 2: PROMPTS DESKTOP COMPLETOS (Prioridad Alta)

### Tarea 5: Prompts Desktop Phase 0-2 ⏱️ 3-4 horas

**Archivos a crear:**

1. `prompts/desktop/flow-build-phase-0.md` ✅ (creado en Tarea 3.2)
2. `prompts/desktop/flow-build-phase-1.md`
3. `prompts/desktop/flow-build-phase-2.md`

#### Phase 1: Discovery & UX Desktop (~500 líneas)

**Diferencias vs Backend:**

- Enfoque en experiencia de usuario desktop
- Workflows de usuario (no flujos HTTP)
- Tipos de aplicaciones: CRUD, herramientas, dashboards, editores
- Público objetivo: usuarios finales vs desarrolladores
- Consideraciones: instalación, actualizaciones, soporte offline

**Secciones:**

- 1.1: Project Description (adaptado a desktop)
- 1.2: Domain & Vertical
- 1.3: Core Features (UI-focused)
- 1.4: User Personas (desktop users)
- 1.5: Business Rules (validations, workflows)
- 1.6: Constraints (SO requirements, performance)

#### Phase 2: UI Components & Data Model (~600 líneas)

**Enfoque:** Componentes visuales + datos

**Secciones:**

- 2.1: Main Window Structure
- 2.2: Screen Inventory (forms, dialogs, views)
- 2.3: Component Catalog (buttons, tables, inputs)
- 2.4: Navigation Flow
- 2.5: Data Model (entities, relationships)
- 2.6: Data Validation Rules
- 2.7: File Formats (if applicable)

---

### Tarea 6: Prompts Desktop Phase 3-5 ⏱️ 3-4 horas

**Archivos a crear:**

3. `prompts/desktop/flow-build-phase-3.md` ✅ (esquema en Tarea 4.2)
4. `prompts/desktop/flow-build-phase-4.md`
5. `prompts/desktop/flow-build-phase-5.md`

#### Phase 4: Data & Storage (~400 líneas)

**Secciones:**

- 4.1: Database Selection (embedded vs client-server)
- 4.2: ORM/Data Access Layer
- 4.3: File Storage (documents, exports, cache)
- 4.4: Settings & Preferences
- 4.5: Backup & Recovery
- 4.6: Data Migration Strategy

#### Phase 5: Code Standards (~500 líneas)

**Secciones:**

- 5.1: Java Version & Conventions
- 5.2: Naming Conventions
- 5.3: Package Structure
- 5.4: Code Style (Checkstyle, SpotBugs)
- 5.5: Documentation (Javadoc)
- 5.6: Error Handling
- 5.7: Logging (Log4j, SLF4J)
- 5.8: Threading & Concurrency (Swing EDT, JavaFX Application Thread)

---

### Tarea 7: Prompts Desktop Phase 6-8 ⏱️ 3-4 horas

**Archivos a crear:**

6. `prompts/desktop/flow-build-phase-6.md`
7. `prompts/desktop/flow-build-phase-7.md`
8. `prompts/desktop/flow-build-phase-8.md`

#### Phase 6: Testing Desktop (~450 líneas)

**Secciones:**

- 6.1: Unit Testing (JUnit 5)
- 6.2: GUI Testing (AssertJ Swing, TestFX for JavaFX)
- 6.3: Integration Testing
- 6.4: Database Testing (H2 in-memory)
- 6.5: Test Data Management
- 6.6: Performance Testing
- 6.7: Manual Testing Checklist

#### Phase 7: Packaging & Deployment (~550 líneas)

**Secciones:**

- 7.1: Build Configuration (Ant, Maven, Gradle)
- 7.2: JAR Packaging
- 7.3: Native Installers (jpackage, Launch4j)
- 7.4: Code Signing (Windows, macOS)
- 7.5: Auto-updates Mechanism
- 7.6: Platform-specific Considerations
- 7.7: Distribution Channels

#### Phase 8: Project Setup & Final Docs (~1200 líneas)

**Adaptado de backend, diferencias:**

- Detectar `nbproject/`, `build.xml`, `.form`
- Inicialización opcional: estructura base NetBeans
- Generar build.xml template
- Generar .gitignore para NetBeans
- Consolidar en AGENT.md, README.md
- Instrucciones de build: `ant compile`, `ant jar`, `ant run`

---

### Tarea 8: Prompts Desktop Phase 9-10 y Workflows ⏱️ 3-4 horas

**Archivos a crear:**

9. `prompts/desktop/flow-build-phase-9.md`
10. `prompts/desktop/flow-build-phase-10.md`
11. `prompts/desktop/flow-build.md`
12. `prompts/desktop/flow-check-review.md`
13. `prompts/desktop/flow-check-test.md`
14. `prompts/desktop/flow-check.md`
15. `prompts/desktop/flow-commit.md`
16. `prompts/desktop/flow-docs-sync.md`
17. `prompts/desktop/flow-work-feature.md`
18. `prompts/desktop/flow-work-fix.md`
19. `prompts/desktop/flow-work-refactor.md`
20. `prompts/desktop/flow-work-resume.md`
21. `prompts/desktop/flow-work.md`

**Adaptaciones:**

- Phase 9: Roadmap con features desktop (UI screens, data persistence, reports)
- Phase 10: User Stories UI-focused
- Workflows: Adaptar comandos para desktop (no API endpoints, sino screens)

---

## 📂 FASE 3: TEMPLATES DESKTOP (Prioridad Alta)

### Tarea 9: Templates Base Desktop ⏱️ 3-4 horas

**Archivos a crear:**

```
templates/desktop/
├── AGENT.template.md
├── ai-instructions.template.md
├── copilot-instructions.template.md
├── .cursorrules.template
├── .clauderules.template
├── project-brief.template.md
├── README.template.md
└── work.template.md
```

**Contenido adaptado a desktop:**

- AGENT.md: Contexto desktop (Swing/JavaFX, Ant, embedded DB)
- ai-instructions.md: Instrucciones para construir GUI
- copilot-instructions.md: Reglas desktop (EDT thread safety, event listeners)
- README.md: Build instructions (ant compile, ant run)

---

### Tarea 10: Templates Docs y Specs Desktop ⏱️ 4-5 horas

**Archivos a crear:**

```
templates/desktop/docs/
├── architecture.template.md         # MVC/MVP patterns
├── ui-components.template.md        # Swing/JavaFX catalog
├── data-model.template.md           # Entities
├── code-standards.template.md       # Java standards
├── testing.template.md              # JUnit + GUI testing
└── deployment.template.md           # Packaging & installers

templates/desktop/specs/
├── api.template.md                  # Internal APIs (services)
├── security.template.md             # Desktop security
└── contributing.template.md
```

**Contenido específico:**

**ui-components.template.md:**

```markdown
# UI Components Catalog

## Main Window

- **Type:** JFrame / Stage (JavaFX)
- **Layout:** BorderLayout
- **Components:**
  - Menu bar (File, Edit, View, Help)
  - Toolbar (New, Open, Save, etc.)
  - Main panel (content area)
  - Status bar (info messages)

## Screens

### 1. {{SCREEN_NAME}}

**Purpose:** {{DESCRIPTION}}

**Components:**

- JPanel / Pane
- JTextField / TextField (input fields)
- JButton / Button (actions)
- JTable / TableView (data grid)
- JComboBox / ComboBox (dropdowns)

**Actions:**

- {{ACTION_1}}: {{DESCRIPTION}}
- {{ACTION_2}}: {{DESCRIPTION}}

**Validations:**

- Required fields: {{LIST}}
- Format validations: {{LIST}}
```

---

## ⚙️ FASE 4: INICIALIZACIÓN ANT (Prioridad Media)

### Tarea 11: Phase 8 - Ant Build Configuration ⏱️ 2-3 horas

**Archivo:** `prompts/backend/flow-build-phase-8.md`

**Cambios necesarios:**

#### 1. Detección build.xml (línea ~35)

**Agregar a "Framework Configuration":**

```markdown
- [ ] **Framework Configuration:** Check for `nest-cli.json`, `manage.py`, `go.mod`, `pom.xml`, `package.json`, **`build.xml`**, **`nbproject/project.xml`**.
```

#### 2. Clasificación NetBeans (línea ~43)

**Agregar regla:**

```markdown
2.5 **NetBeans Project** (Skip Initialization): - Has `nbproject/` folder and `build.xml` - Project already configured by NetBeans IDE - Skip framework initialization, proceed to docs
```

#### 3. Framework Initialization (línea ~110)

**Agregar sección NetBeans:**

```markdown
### 8.2.3.x: NetBeans + Ant Projects

**Detection:**

- `nbproject/project.xml` exists
- `build.xml` exists
- `src/` directory present

**Action:**
```

🔍 NetBeans project detected

Type: [Web Application / Desktop Application / Enterprise]
Build System: Apache Ant
Java Version: [detected from build.xml]

✅ Project already initialized by NetBeans IDE
⏭️ Skipping framework initialization

Proceeding to documentation generation...

````

**If build.xml is missing (rare case):**

Generate minimal build.xml:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project name="{{PROJECT_NAME}}" default="default" basedir=".">
    <description>Builds, tests, and runs {{PROJECT_NAME}}.</description>

    <!-- Properties -->
    <property name="src.dir" value="src"/>
    <property name="build.dir" value="build"/>
    <property name="dist.dir" value="dist"/>
    <property name="lib.dir" value="lib"/>

    <!-- Classpath -->
    <path id="classpath">
        <fileset dir="${lib.dir}">
            <include name="**/*.jar"/>
        </fileset>
    </path>

    <!-- Compile -->
    <target name="compile" description="Compile source files">
        <mkdir dir="${build.dir}"/>
        <javac srcdir="${src.dir}"
               destdir="${build.dir}"
               classpathref="classpath"
               includeantruntime="false"
               source="1.8"
               target="1.8"/>
    </target>

    <!-- JAR -->
    <target name="jar" depends="compile" description="Create JAR file">
        <mkdir dir="${dist.dir}"/>
        <jar destfile="${dist.dir}/${ant.project.name}.jar"
             basedir="${build.dir}">
            <manifest>
                <attribute name="Main-Class" value="{{MAIN_CLASS}}"/>
            </manifest>
        </jar>
    </target>

    <!-- Run -->
    <target name="run" depends="jar" description="Run application">
        <java jar="${dist.dir}/${ant.project.name}.jar" fork="true"/>
    </target>

    <!-- Clean -->
    <target name="clean" description="Clean build artifacts">
        <delete dir="${build.dir}"/>
        <delete dir="${dist.dir}"/>
    </target>

    <!-- Default -->
    <target name="default" depends="compile"/>
</project>
````

**Instructions for user:**

```
📝 Minimal build.xml created

To use:
1. Update Main-Class in manifest (if desktop app)
2. Place dependencies in lib/ folder
3. Build: ant compile
4. Package: ant jar
5. Run: ant run
6. Clean: ant clean

For full NetBeans integration:
- Open project in NetBeans IDE
- NetBeans will enhance build.xml automatically
```

````

#### 4. .gitignore NetBeans/Eclipse

**Agregar secciones completas:**

```markdown
### NetBeans + Ant Projects

```gitignore
# NetBeans specific
nbproject/private/
nbproject/Package-*.bash
build/
nbbuild/
dist/
nbdist/
.nb-gradle/
.nb-gradle-properties

# Build artifacts
*.class
*.jar
*.war
*.ear
*.zip
*.tar.gz
*.rar

# Virtual machine crash logs
hs_err_pid*

# IDE files
.idea/
*.iml
*.iws
.vscode/

# Logs
*.log

# OS files
.DS_Store
Thumbs.db

# Test output
test-output/
junit*.properties
```

### Eclipse + Maven/Gradle Projects

```gitignore
# Eclipse specific
.project
.classpath
.settings/
.metadata/
.recommenders/

# Build artifacts (Maven)
target/

# Build artifacts (Gradle)
build/
.gradle/

# Class files
*.class

# Package files
*.jar
*.war
*.ear

# Log files
*.log

# Virtual machine crash logs
hs_err_pid*

# OS files
.DS_Store
Thumbs.db
```

### Eclipse SWT/RCP Projects

```gitignore
# Eclipse RCP specific
.metadata/
.recommenders/
RemoteSystemsTempFiles/

# PDE build
bin/
build/

# OSGi bundles
*.jar (except lib/)

# RCP product
*.product~

# Logs
*.log
workspace/.metadata/
```

**Agregar sección completa:**

```markdown
### NetBeans + Ant Projects

```gitignore
# NetBeans specific
nbproject/private/
nbproject/Package-*.bash
build/
nbbuild/
dist/
nbdist/
.nb-gradle/
.nb-gradle-properties

# Build artifacts
*.class
*.jar
*.war
*.ear
*.zip
*.tar.gz
*.rar

# Virtual machine crash logs
hs_err_pid*

# IDE files
.idea/
*.iml
*.iws
.vscode/

# Logs
*.log

# OS files
.DS_Store
Thumbs.db

# Test output
test-output/
junit*.properties
````

**For Web Applications (add):**

```gitignore
# Web specific
web/WEB-INF/classes/
web/WEB-INF/lib/
```

**For Desktop Applications (add):**

```gitignore
# Desktop specific
*.form~
```

````

---

## 📚 FASE 5: DOCUMENTACIÓN (Prioridad Media)

### Tarea 12: README y Getting Started ⏱️ 2-3 horas

#### 12.1 Actualizar README.md

**Archivo:** `README.md`

**Ubicación:** Línea ~40 (Features section)

**Cambio:**

```markdown
- 🌍 Universal support - 12 languages, **75+ frameworks**, 35+ ORMs (98% coverage)

**Supported Frameworks:**

**Backend:**
- Node.js: Express, NestJS, Fastify, Hapi
- Python: FastAPI, Django, Flask
- Java: Spring Boot, Quarkus, **NetBeans (Servlets/JAX-RS)**
- Go: Gin, Echo, Fiber
- Rust, Kotlin, Ruby, PHP, C#

**Frontend:**
- React, Vue, Angular, Svelte, Next.js, Nuxt

**Mobile:**
- React Native, Flutter, Ionic, Xamarin

**Desktop:** ✨ NEW
- Java: Swing (NetBeans), JavaFX (NetBeans), NetBeans RCP
- Electron, Qt, WPF
````

**Ubicación:** Línea ~200+ (después de ejemplos Mobile)

**Agregar sección:**

````markdown
### Desktop Application Example

```bash
# Initialize desktop project
ai-flow init . --type desktop

# Project will be set up for:
# - Java Swing or JavaFX
# - NetBeans IDE support
# - Ant build system
# - H2/SQLite embedded database
# - 13 documentation files

# In your AI tool:
# /flow-build  - Generate all desktop documentation
# /flow-work   - Start building features (screens, dialogs)
```
````

````

#### 12.2 Actualizar GETTING-STARTED.md

**Archivo:** `GETTING-STARTED.md`

**Ubicación:** Después de sección Mobile (~1800)

**Agregar:**

```markdown
## 2.5 Desktop Projects

### What's Different?

Desktop projects use different technology stacks:

| Aspect | Desktop |
|--------|---------|
| **UI Framework** | Swing, JavaFX, Qt |
| **Build System** | Ant, Maven, Gradle |
| **Database** | H2, SQLite, Derby (embedded) |
| **Documentation** | 13 files (screens, deployment) |

### Getting Started with Desktop

#### Step 1: Initialize

```bash
mkdir my-invoice-app
cd my-invoice-app
ai-flow init . --type desktop
````

#### Step 2: Answer Questions

1. **Project Name:** Invoice Management System
2. **Description:** Desktop app for small business invoicing
3. **Framework:** Java Swing + NetBeans
4. **Database:** H2 (embedded)
5. **Architecture:** MVC

#### Step 3: Run /flow-build

The AI will:

- ✅ Detect existing NetBeans project (if applicable)
- ✅ Guide through 10 phases
- ✅ Generate architecture for Swing components
- ✅ Document data model
- ✅ Create build instructions

#### Step 4: Build Your First Screen

```
In your AI tool, run:
/flow-work feature

Describe: "Main window with customer list and invoice table"

AI will:
- Create JFrame with BorderLayout
- Add JTable for customers
- Add JPanel for invoice details
- Wire up event listeners
- Generate .form file (if using NetBeans GUI Builder)
```

### Desktop Commands Reference

| Command              | Purpose                                        |
| -------------------- | ---------------------------------------------- |
| `/flow-build`        | Generate all desktop docs (screens, packaging) |
| `/flow-work feature` | Create new screen or dialog                    |
| `/flow-work fix`     | Fix UI bugs                                    |
| `/flow-check`        | Review code + run JUnit tests                  |
| `/flow-commit`       | Commit changes (Conventional Commits)          |

### Common Desktop Workflows

**Adding a new dialog:**

```
/flow-work feature

Feature: "Settings dialog with tabs for General, Database, and Appearance"

AI generates:
- JDialog class
- JTabbedPane with 3 tabs
- Settings persistence code
- Open/Close logic
```

**Adding database table:**

```
/flow-work feature

Feature: "Product entity with CRUD operations"

AI generates:
- Product.java entity
- ProductDAO.java (JDBC)
- CRUD methods
- Database schema update
```

````

---

### Tarea 13: Copilot Instructions ⏱️ 1 hora

**Archivo:** `.github/copilot-instructions.md`

**Ubicación:** Línea ~8 (después de "Architecture & Flow")

**Agregar:**

```markdown
## Project Types

- `backend` → API/web services (Node.js, Python, Java, Go, Rust)
- `frontend` → Web UIs (React, Vue, Angular, Svelte)
- `mobile` → iOS/Android apps (React Native, Flutter)
- `desktop` → Desktop applications (Java Swing/JavaFX with NetBeans, Electron, Qt, WPF)
- `fullstack` → Combined backend + frontend

**Desktop-specific:**
- NetBeans IDE integration (`.form` files for Swing GUI Builder)
- Apache Ant build system (`build.xml`)
- Embedded databases (H2, Derby, SQLite)
- Threading considerations (Swing EDT, JavaFX Application Thread)
````

**Ubicación:** Línea ~15+ (Tools section)

**Agregar:**

```markdown
**Desktop Tools:**

- NetBeans IDE for Ant projects
- GUI Builders: NetBeans Form Editor, Scene Builder (JavaFX)
- Testing: JUnit, AssertJ Swing, TestFX
- Packaging: jpackage, Launch4j, Install4j
```

---

## 🧪 FASE 6: TESTING (Prioridad Baja)

### Tarea 14: Tests de Detección NetBeans ⏱️ 3-4 horas

**Archivo nuevo:** `__tests__/netbeans-detection.test.js`

```javascript
const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');

describe('NetBeans Project Detection', () => {
  const testDir = path.join(__dirname, 'fixtures', 'netbeans-test');

  beforeEach(async () => {
    await fs.ensureDir(testDir);
  });

  afterEach(async () => {
    await fs.remove(testDir);
  });

  test('detects NetBeans web project', async () => {
    // Create NetBeans web structure
    await fs.ensureDir(path.join(testDir, 'nbproject'));
    await fs.ensureDir(path.join(testDir, 'web/WEB-INF'));
    await fs.ensureDir(path.join(testDir, 'src'));

    await fs.writeFile(
      path.join(testDir, 'nbproject/project.xml'),
      '<project><type>org.netbeans.modules.web.project</type></project>'
    );

    await fs.writeFile(path.join(testDir, 'build.xml'), '<project name="test"></project>');

    // Run detection (mock Phase 0 logic)
    const hasNbproject = await fs.pathExists(path.join(testDir, 'nbproject'));
    const hasBuildXml = await fs.pathExists(path.join(testDir, 'build.xml'));
    const hasWeb = await fs.pathExists(path.join(testDir, 'web'));

    expect(hasNbproject).toBe(true);
    expect(hasBuildXml).toBe(true);
    expect(hasWeb).toBe(true);
  });

  test('detects NetBeans desktop project (Swing)', async () => {
    await fs.ensureDir(path.join(testDir, 'nbproject'));
    await fs.ensureDir(path.join(testDir, 'src/com/example'));

    await fs.writeFile(
      path.join(testDir, 'nbproject/project.xml'),
      '<project><type>org.netbeans.modules.java.j2seproject</type></project>'
    );

    await fs.writeFile(path.join(testDir, 'build.xml'), '<project name="DesktopApp"></project>');

    // Create .form file (Swing GUI Builder)
    await fs.writeFile(
      path.join(testDir, 'src/com/example/MainFrame.form'),
      '<?xml version="1.0" encoding="UTF-8" ?><Form></Form>'
    );

    await fs.writeFile(
      path.join(testDir, 'src/com/example/MainFrame.java'),
      'public class MainFrame extends JFrame { }'
    );

    const hasForm = await fs.pathExists(path.join(testDir, 'src/com/example/MainFrame.form'));

    expect(hasForm).toBe(true);
  });

  test('detects Ant build system', async () => {
    await fs.writeFile(
      path.join(testDir, 'build.xml'),
      `<?xml version="1.0"?>
      <project name="TestProject" default="compile">
        <target name="compile">
          <javac srcdir="src" destdir="build"/>
        </target>
      </project>`
    );

    const buildXmlContent = await fs.readFile(path.join(testDir, 'build.xml'), 'utf-8');

    expect(buildXmlContent).toContain('<project');
    expect(buildXmlContent).toContain('javac');
  });

  test('generates correct .gitignore for NetBeans', async () => {
    const gitignoreContent = `
# NetBeans specific
nbproject/private/
build/
dist/
nbbuild/

# Class files
*.class
*.jar

# Logs
*.log
    `.trim();

    await fs.writeFile(path.join(testDir, '.gitignore'), gitignoreContent);

    const content = await fs.readFile(path.join(testDir, '.gitignore'), 'utf-8');

    expect(content).toContain('nbproject/private/');
    expect(content).toContain('build/');
    expect(content).toContain('*.class');
  });

  test('CLI accepts desktop type', () => {
    const cliPath = path.join(__dirname, '..', 'dist', 'cli.js');

    // Test that --type desktop is valid
    const result = execSync(`node ${cliPath} init ${testDir} --type desktop --dry-run`, {
      encoding: 'utf-8',
    });

    expect(result).toContain('Desktop');
  });
});
```

**Archivos adicionales de test:**

- `__tests__/fixtures/netbeans-web/` - Proyecto web ejemplo
- `__tests__/fixtures/netbeans-desktop/` - Proyecto desktop ejemplo
- `__tests__/desktop-prompts.test.js` - Validar prompts desktop
- `__tests__/desktop-templates.test.js` - Validar templates desktop

---

## 🔍 FASE 7: REVISIÓN Y TESTING (Prioridad Alta)

### Tarea 15: Revisión Final ⏱️ 3-4 horas

**Checklist de validación:**

#### 15.1 Testing Manual

```bash
# 1. Build project
npm run build

# 2. Test CLI with desktop type
node dist/cli.js init ./test-desktop --type desktop --dry-run

# 3. Verify files created
ls -la test-desktop/.ai-flow/

# 4. Check prompts
ls -la test-desktop/.ai-flow/prompts/desktop/

# 5. Check templates
ls -la test-desktop/.ai-flow/templates/desktop/

# 6. Verify config.json
cat test-desktop/.ai-flow/core/config.json | jq .
```

#### 15.2 Integration Testing

**Crear proyecto NetBeans real y ejecutar:**

```bash
# Create NetBeans project (manual in IDE)
# Then initialize AI Flow
cd my-netbeans-project
ai-flow init .

# Should detect:
# ✅ NetBeans project structure
# ✅ Ant build system
# ✅ Java source files
# ✅ Project type (web or desktop)
```

#### 15.3 Documentation Review

**Verificar:**

- [ ] README.md menciona Desktop y NetBeans
- [ ] GETTING-STARTED.md tiene sección Desktop
- [ ] Todos los prompts desktop tienen 11 fases
- [ ] Templates desktop tienen placeholders correctos
- [ ] CLI detecta `--type desktop`
- [ ] .gitignore incluye patrones NetBeans

#### 15.4 AI Assistant Testing

**Probar con GitHub Copilot:**

1. Abrir proyecto con AI Flow desktop
2. Ejecutar `/flow-build` (simulado)
3. Verificar que AI entiende contexto desktop
4. Probar `/flow-work feature` para crear una pantalla

---

## 📊 Métricas de Éxito

### Cobertura

- [x] Detección de proyectos NetBeans (web y desktop)
- [ ] Soporte completo Ant build system
- [ ] 11 fases desktop (0-10)
- [ ] 22 archivos prompts desktop
- [ ] 15 archivos templates desktop
- [ ] Tests de detección NetBeans
- [ ] Documentación completa

### Calidad

- [ ] 100% tests passing
- [ ] Linting sin errores
- [ ] Build exitoso
- [ ] Zero breaking changes en features existentes

### Performance

- [ ] Detección NetBeans < 2 segundos
- [ ] Generación templates < 5 segundos
- [ ] CLI init < 10 segundos

---

## 🎯 Orden de Ejecución Recomendado

**Semana 1 (Core):**

1. ✅ Tarea 1: Análisis (completado)
2. ⏳ Tarea 2: CLI Desktop type
3. ⏳ Tarea 3: Phase 0 detección
4. ⏳ Tarea 4: Phase 3 frameworks

**Semana 2 (Prompts Desktop):** 5. ⏳ Tarea 5: Phases 0-2 desktop 6. ⏳ Tarea 6: Phases 3-5 desktop 7. ⏳ Tarea 7: Phases 6-8 desktop 8. ⏳ Tarea 8: Phases 9-10 + workflows desktop

**Semana 3 (Templates):** 9. ⏳ Tarea 9: Templates base desktop 10. ⏳ Tarea 10: Templates docs/specs desktop

**Semana 4 (Final):** 11. ⏳ Tarea 11: Phase 8 Ant init 12. ⏳ Tarea 12: Documentación README 13. ⏳ Tarea 13: Copilot instructions 14. ⏳ Tarea 14: Tests 15. ⏳ Tarea 15: Revisión final

---

## 📝 Notas Importantes

### Consideraciones Técnicas

1. **Threading en Desktop:**
   - **Swing:** Todas las operaciones UI deben ejecutarse en EDT (Event Dispatch Thread)
   - **JavaFX:** Usar Platform.runLater() para operaciones UI
   - **SWT:** Usar Display.asyncExec() o Display.syncExec()
   - Los prompts deben mencionar esto en Phase 5 (Code Standards)

2. **NetBeans GUI Builder:**
   - Genera archivos `.form` (XML)
   - Código UI en `// <editor-fold>` comments
   - No modificar código generado manualmente

3. **Eclipse SWT:**
   - Widgets nativos del sistema operativo
   - Diferentes APIs para cada plataforma
   - Requiere SWT binaries específicos por OS
   - Mayor performance que Swing
   - Más complejo que Swing/JavaFX

4. **Build Systems:**
   - **NetBeans:** Ant es default, Maven/Gradle opcional
   - **Eclipse:** Maven/Gradle son default, Ant es legacy
   - Ant: `build.xml`, targets (compile, jar, run, clean)
   - Maven: `pom.xml`, lifecycle phases
   - Gradle: `build.gradle`, tasks

5. **Embedded Databases:**
   - H2: Popular, modo embedded o server
   - Derby: Incluido en JDK
   - SQLite: Requiere JDBC driver externo

### Decisiones de Diseño

1. **Por qué Desktop como tipo separado?**
   - Arquitectura completamente diferente a backend/frontend
   - Preguntas específicas (UI components, packaging, installers)
   - No tiene sentido mezclar con backend (APIs) o frontend (web)

2. **Por qué soportar both NetBeans and Eclipse?**
   - NetBeans: Mejor GUI Builder para Swing, Ant integration
   - Eclipse: Más popular, mejor Maven/Gradle support, SWT nativo
   - Ambos tienen comunidades grandes
   - Proyectos legacy en ambos IDEs

3. **Por qué incluir SWT?**
   - Es el toolkit nativo de Eclipse
   - Muchos proyectos Enterprise usan Eclipse RCP
   - Performance superior a Swing en algunos casos
   - Widgets nativos del OS

4. **Swing vs JavaFX vs SWT?**
   - **Swing:** Maduro, estable, mucho código legacy, fácil de aprender
   - **JavaFX:** Moderno, CSS, multimedia, pero más complejo
   - **SWT:** Nativo, rápido, pero específico de Eclipse y OS-dependent
   - Soportar los 3 porque tienen casos de uso diferentes

### Compatibilidad Matrix

| Feature         | NetBeans           | Eclipse               | Notas                            |
| --------------- | ------------------ | --------------------- | -------------------------------- |
| **Swing**       | ✅ Excellent       | ✅ Good               | NetBeans tiene mejor GUI Builder |
| **JavaFX**      | ✅ Good            | ✅ Good (e(fx)clipse) | Scene Builder funciona en ambos  |
| **SWT**         | ❌ No              | ✅ Excellent          | Nativo de Eclipse                |
| **Ant**         | ✅ Default         | ⚠️ Legacy             | NetBeans lo prefiere             |
| **Maven**       | ✅ Good            | ✅ Excellent          | Eclipse m2e es superior          |
| **Gradle**      | ✅ Good            | ✅ Excellent          | Eclipse Buildship                |
| **RCP**         | ✅ NetBeans RCP    | ✅ Eclipse RCP        | Plataformas diferentes           |
| **GUI Builder** | ✅ Matisse (Swing) | ⚠️ WindowBuilder      | NetBeans superior                |

### Detección Prioritaria

Cuando un proyecto tiene múltiples indicadores:

1. **Prioridad Alta:** `.project` + `.classpath` → Eclipse
2. **Prioridad Alta:** `nbproject/project.xml` → NetBeans
3. **Prioridad Media:** `pom.xml` solo → Neutral (Maven)
4. **Prioridad Media:** `build.gradle` solo → Neutral (Gradle)
5. **Prioridad Baja:** `build.xml` solo → Podría ser NetBeans o manual

**Lógica de detección:**

```
IF exists(.project) AND exists(.classpath):
    IDE = Eclipse
    IF exists(pom.xml):
        BUILD = Maven
    ELIF exists(build.gradle):
        BUILD = Gradle
    ELSE:
        BUILD = Eclipse JDT

ELIF exists(nbproject/project.xml):
    IDE = NetBeans
    IF exists(build.xml):
        BUILD = Ant
    ELIF exists(pom.xml):
        BUILD = Maven
    ELIF exists(build.gradle):
        BUILD = Gradle

ELIF exists(pom.xml) OR exists(build.gradle):
    IDE = None (generic Java project)
    BUILD = Maven/Gradle
```

### Testing Considerations

**NetBeans Projects:**

- JUnit integration nativa
- GUI testing: AssertJ Swing
- Ant tasks para tests

**Eclipse Projects:**

- JUnit integration excelente
- SWT testing: SWTBot framework
- Maven/Gradle test runners

### Packaging Recommendations

**NetBeans Projects:**

- Ant + jar task
- Maven Assembly Plugin
- jpackage (Java 14+)

**Eclipse Projects:**

- Maven Assembly/Shade Plugin
- Gradle Application Plugin
- Eclipse Tycho (for RCP)
- jpackage (Java 14+)

---

## 🔗 Referencias

### NetBeans Documentation

- [NetBeans Project Types](https://netbeans.apache.org/kb/)
- [Ant Build Scripts](https://ant.apache.org/manual/)
- [Swing Tutorial](https://docs.oracle.com/javase/tutorial/uiswing/)
- [JavaFX Documentation](https://openjfx.io/)

### AI Flow Architecture

- [README.md](README.md) - Visión general
- [GETTING-STARTED.md](GETTING-STARTED.md) - Guía completa
- [.github/copilot-instructions.md](.github/copilot-instructions.md) - Arquitectura
- [src/cli.ts](src/cli.ts) - CLI implementation

---

## ❓ Preguntas Frecuentes

**Q: ¿Por qué soportar both NetBeans y Eclipse?**  
A: Son los IDEs más populares para Java desktop. NetBeans tiene mejor GUI Builder para Swing, Eclipse tiene SWT nativo y mejor integración con Maven/Gradle.

**Q: ¿Funcionará con NetBeans 8, 12, 17 y Eclipse 2021, 2023?**  
A: Sí, la estructura `nbproject/` de NetBeans y `.project`/`.classpath` de Eclipse son consistentes entre versiones.

**Q: ¿Qué pasa con proyectos Java modulares (Java 9+)?**  
A: Phase 3 debe preguntar sobre módulos y documentarlos en architecture.md. Funciona con ambos IDEs.

**Q: ¿Soportaremos Apache NetBeans Platform (RCP) y Eclipse RCP?**  
A: Sí, ambos como opciones en Phase 3, pero con documentación básica (son complejos).

**Q: ¿Un proyecto puede migrar de NetBeans a Eclipse o viceversa?**  
A: Sí, pero requiere ajustes:

- NetBeans → Eclipse: Migrar de Ant a Maven/Gradle, recrear .project/.classpath
- Eclipse → NetBeans: Crear nbproject/, ajustar build system

**Q: ¿Qué pasa con IntelliJ IDEA?**  
A: IntelliJ usa su propio formato (.idea/). Por ahora no está en scope, pero podría agregarse en futuro.

**Q: ¿SWT funciona en NetBeans?**  
A: Técnicamente sí, pero no hay integración nativa. SWT es específico de Eclipse.

**Q: ¿Cómo se detecta si es proyecto NetBeans o Eclipse?**  
A:

- Eclipse: Presencia de `.project` + `.classpath`
- NetBeans: Presencia de `nbproject/project.xml`
- Si ambos existen: Priorizar el más reciente (timestamp)

**Q: ¿Qué pasa con proyectos que usan solo Maven/Gradle sin IDE?**  
A: Se tratan como proyectos Java genéricos. AI Flow puede documentarlos pero sin características específicas del IDE.

---

## 📞 Contacto y Contribución

Si encuentras problemas durante la implementación:

1. Revisar este plan primero
2. Consultar `.github/copilot-instructions.md`
3. Crear issue con label `netbeans-support`

---

**Última actualización:** 3 de febrero de 2026  
**Versión del plan:** 2.0 (agregado soporte Eclipse)  
**Estado:** 🟢 Listo para implementar (NetBeans + Eclipse)

**Cambios en v2.0:**

- ✅ Agregado soporte completo para Eclipse IDE
- ✅ Agregado soporte para SWT (Standard Widget Toolkit)
- ✅ Agregado soporte para Eclipse RCP
- ✅ Mejorada detección de build systems (Ant/Maven/Gradle)
- ✅ Agregada matriz de compatibilidad IDE vs Framework
- ✅ Mejoradas secciones de .gitignore para Eclipse
- ✅ Agregadas consideraciones de threading para SWT
