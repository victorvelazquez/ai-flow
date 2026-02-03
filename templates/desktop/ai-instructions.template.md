# AI Instructions

> **CRITICAL:** Every AI assistant MUST read and follow this document before any work on this desktop application.

---

## 🎯 Project Overview

**Name:** {{PROJECT_NAME}}

**Description:** {{PROJECT_DESCRIPTION}}

**Purpose:** {{PROBLEM_STATEMENT}}

**Application Type:** {{APPLICATION_TYPE}}

---

## 🏗️ Tech Stack

### Desktop Platform

- **IDE:** {{IDE}} (NetBeans / Eclipse / IntelliJ)
- **Language:** Java {{JAVA_VERSION}}
- **Build Tool:** {{BUILD_TOOL}} (Maven / Gradle / Ant)
- **JDK Distribution:** {{JDK_DISTRIBUTION}} (Oracle / OpenJDK / AdoptOpenJDK)

### UI Framework

- **Framework:** {{UI_FRAMEWORK}} (Swing / JavaFX / SWT)
- **Layout Managers:** {{LAYOUT_MANAGERS}}
- **Look and Feel:** {{LOOK_AND_FEEL}}
- **UI Libraries:** {{UI_LIBRARIES}}

### Data Layer

- **Storage Type:** {{STORAGE_TYPE}} (Embedded DB / File-based / External DB)
  {{#IF_DATABASE}}- **Database:** {{DATABASE}} {{DATABASE_VERSION}}
- **ORM/Data Access:** {{ORM_TYPE}}{{/IF_DATABASE}}
  {{#IF_FILE_STORAGE}}- **File Formats:** {{FILE_FORMATS}}{{/IF_FILE_STORAGE}}

### Architecture

- **Pattern:** {{ARCHITECTURE_PATTERN}} (MVC / MVP / MVVM / Layered)
- **Package Structure:** {{PACKAGE_BASE}}

### Key Libraries

{{KEY_LIBRARIES}}

---

## 🏛️ Architecture

**Pattern:** {{ARCHITECTURE_PATTERN}}

{{ARCHITECTURE_DESCRIPTION}}

**Package Organization:**

```
{{PACKAGE_BASE}}/
├── model/           # Data entities
├── view/            # UI components ({{UI_FRAMEWORK}})
├── controller/      # Event handlers, presenters
├── service/         # Business logic
├── dao/             # Data access layer
└── util/            # Utilities
```

---

## ❌ NEVER Rules

**YOU MUST NEVER:**

### UI Thread Safety

- ❌ **Block UI thread** - Always use background tasks for long operations
- ❌ **Update UI from background thread** - Use SwingUtilities.invokeLater / Platform.runLater / Display.asyncExec
- ❌ **Ignore progress indicators** - Show feedback for operations > 1 second
- ❌ **Use Thread.sleep() on UI thread** - Blocks the entire UI

### Code Quality

- ❌ **Hardcode file paths** - Use user.home, System.getProperty("user.dir")
- ❌ **Hardcode UI strings** - Use ResourceBundle for i18n
- ❌ **Use null layouts** - Always use proper layout managers
- ❌ **Leave System.out.println in production** - Use proper logging (SLF4J/Log4j)
- ❌ **Ignore exceptions** - Always handle or log exceptions

### Security

- ❌ **Store passwords in plaintext** - Use BCrypt/PBKDF2
- ❌ **Store sensitive data unencrypted** - Use Keychain/Credential Manager/Encrypted files
- ❌ **Skip input validation** - Validate all user input
- ❌ **Trust file paths from users** - Validate and sanitize paths

### Architecture

- ❌ **Put business logic in UI components** - Keep views thin
- ❌ **Access database from UI classes** - Use DAO/Repository pattern
- ❌ **Create circular dependencies** - Design proper dependency flow
- ❌ **Mix concerns** - Respect layer boundaries (Model-View-Controller/Presenter)

### Data

- ❌ **Query database in loops (N+1)** - Use batch queries
- ❌ **Forget database transactions** - Use transactions for multi-step operations
- ❌ **Ignore resource cleanup** - Always close Connections, Streams, ResultSets
- ❌ **Use string concatenation for SQL** - Use PreparedStatement (prevent SQL injection)

### Testing

- ❌ **Skip tests for UI logic** - Use TestFX/AssertJ-Swing/SWTBot
- ❌ **Mock UI components** - Only mock business logic and data access
- ❌ **Commit failing tests** - All tests must pass before commit

{{CUSTOM_NEVER_RULES}}

---

## ✅ ALWAYS Rules

**YOU MUST ALWAYS:**

### UI Thread Safety

- ✅ **Use SwingWorker** (Swing) for background tasks
- ✅ **Use Task/Service** (JavaFX) for background operations
- ✅ **Use Display.asyncExec** (SWT) for UI updates from background
- ✅ **Show progress indicators** for operations > 1 second
- ✅ **Handle UI thread exceptions** globally with UncaughtExceptionHandler

### Code Quality

- ✅ **Follow Java naming conventions** - camelCase methods, PascalCase classes
- ✅ **Keep methods under {{MAX_METHOD_LENGTH}} lines** (default: 30)
- ✅ **Use final for immutable variables**
- ✅ **Prefer composition over inheritance**
- ✅ **Write Javadoc for public API**

### Security

- ✅ **Hash passwords with BCrypt** (work factor: 12)
- ✅ **Validate all inputs** with Bean Validation or custom validators
- ✅ **Use Preferences API** for non-sensitive settings
- ✅ **Use Keychain/Credential Manager** for sensitive data
- ✅ **Log security events** (failed logins, permission denials)

### Architecture

- ✅ **Follow {{ARCHITECTURE_PATTERN}} pattern strictly**
- ✅ **Use Dependency Injection** (Constructor injection preferred)
- ✅ **Keep UI classes thin** (delegate to controllers/presenters)
- ✅ **Separate concerns** (Model-View-Controller/Presenter)
- ✅ **Use EventBus** for loosely coupled communication

### Data

- ✅ **Use PreparedStatement** (prevent SQL injection)
- ✅ **Implement transactions** for multi-table operations
- ✅ **Add created_at/updated_at timestamps** to entities
- ✅ **Use connection pooling** (HikariCP recommended)
- ✅ **Close resources** with try-with-resources

### Testing

- ✅ **Write unit tests for services** (target: {{UNIT_TEST_COVERAGE}}%+ coverage)
- ✅ **Write UI tests for critical flows** (TestFX/AssertJ-Swing)
- ✅ **Use H2 in-memory** for database tests
- ✅ **Mock external dependencies** (APIs, email, file system)
- ✅ **Run tests before every commit**

### Packaging & Deployment

- ✅ **Use Maven/Gradle** for dependency management
- ✅ **Create executable JAR** with manifest Main-Class
- ✅ **Include JRE** for native packaging (jpackage)
- ✅ **Sign executables** (Windows .exe, macOS .app)
- ✅ **Provide installers** for production releases

{{CUSTOM_ALWAYS_RULES}}

---

## 📁 Project Structure

### Maven (Recommended)

```
project-root/
├── pom.xml
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── {{PACKAGE_BASE}}/
│   │   │       ├── Main.java
│   │   │       ├── model/
│   │   │       ├── view/
│   │   │       ├── controller/
│   │   │       ├── service/
│   │   │       └── dao/
│   │   └── resources/
│   │       ├── application.properties
│   │       ├── fxml/ (JavaFX)
│   │       ├── forms/ (Swing .form)
│   │       └── icons/
│   └── test/
│       └── java/
└── target/ (build output)
```

### Gradle

```
project-root/
├── build.gradle
├── src/
│   └── (same as Maven)
└── build/ (build output)
```

### Ant (NetBeans)

```
project-root/
├── nbproject/
│   ├── project.xml
│   └── project.properties
├── build.xml
├── src/
│   └── {{PACKAGE_BASE}}/
├── lib/ (dependencies)
├── build/ (compiled classes)
└── dist/ (JAR output)
```

---

## 🎨 UI Component Naming

**Follow these conventions:**

- **Windows:** `MainWindow`, `SettingsDialog`, `AboutWindow`
- **Panels:** `LoginPanel`, `DashboardPanel`
- **Controllers:** `MainController`, `LoginController`
- **Services:** `UserService`, `ProjectService`
- **DAOs:** `UserDAO`, `ProjectDAO`
- **Models:** `User`, `Project`, `Task`

---

## 🔄 Common Patterns

### Background Task (Swing)

```java
SwingWorker<Result, Void> worker = new SwingWorker<>() {
    @Override
    protected Result doInBackground() throws Exception {
        return performLongOperation();
    }

    @Override
    protected void done() {
        try {
            Result result = get();
            updateUI(result);
        } catch (Exception e) {
            showError(e);
        }
    }
};
worker.execute();
```

### Background Task (JavaFX)

```java
Task<Result> task = new Task<>() {
    @Override
    protected Result call() throws Exception {
        return performLongOperation();
    }
};
task.setOnSucceeded(e -> updateUI(task.getValue()));
task.setOnFailed(e -> showError(task.getException()));
new Thread(task).start();
```

### Database Connection (JDBC)

```java
try (Connection conn = dataSource.getConnection();
     PreparedStatement stmt = conn.prepareStatement(sql)) {
    stmt.setString(1, value);
    try (ResultSet rs = stmt.executeQuery()) {
        while (rs.next()) {
            // Process results
        }
    }
} catch (SQLException e) {
    logger.error("Database error", e);
    throw new DataAccessException("Failed to query database", e);
}
```

---

## 📚 Documentation

**Read these files for detailed guidelines:**

- `docs/ARCHITECTURE.md` - Architecture and design patterns
- `docs/DATABASE.md` - Database schema and migrations
- `docs/DEVELOPMENT.md` - Setup and development guide
- `docs/DEPLOYMENT.md` - Packaging and deployment
- `specs/UI.md` - UI components and flows
- `specs/DATA.md` - Data models and validation

---

## 🔧 Development Commands

### Maven

```bash
mvn clean compile              # Compile source code
mvn test                       # Run unit tests
mvn package                    # Create JAR
mvn javafx:run                 # Run JavaFX app (if applicable)
java -jar target/myapp.jar     # Run JAR
```

### Gradle

```bash
gradle clean build             # Build project
gradle test                    # Run tests
gradle run                     # Run application
```

### Ant (NetBeans)

```bash
ant clean                      # Clean build
ant compile                    # Compile source
ant jar                        # Create JAR
ant run                        # Run application
```

---

## 🚀 Next Steps

1. **Read all docs/ files** before making changes
2. **Follow naming conventions** strictly
3. **Write tests** before or alongside code
4. **Run tests** before every commit
5. **Update documentation** when adding features

---

_Generated by AI Flow - Desktop Edition_
_Last Updated: {{GENERATION_DATE}}_
