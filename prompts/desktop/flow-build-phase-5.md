## PHASE 5: Code Standards (10-15 min)

> **Order for this phase:** 5.1 → 5.2 → 5.3 → 5.4 → 5.5

### Objective

Define coding conventions, style guides, and best practices for Java desktop development.

---

## 5.1 Java Version & Features

```
Which Java version are you targeting?

A) ☕ Java 8 (LTS) - Legacy support
   - Lambda expressions, Streams
   - java.time package
   - End of free support: 2030

B) ☕ Java 11 (LTS) - Current minimum
   - Modules, var keyword
   - HTTP Client
   - End of support: 2026

C) ☕ Java 17 (LTS) - Modern standard (recommended)
   - Records, sealed classes
   - Pattern matching
   - End of support: 2029

D) ☕ Java 21 (LTS) - Latest LTS
   - Virtual Threads (Project Loom)
   - Sequenced Collections
   - End of support: 2031

E) ☕ Java 22/23+ - Cutting edge
   - Latest features, shorter support

Your choice: __

Modern Java features to use:
- ✅ Records (data classes)
- ✅ var keyword (local variables)
- ✅ Switch expressions
- ✅ Text blocks (multi-line strings)
- ✅ Pattern matching
- ✅ Virtual Threads (Java 21+)
```

---

## 5.2 Code Style

```
Which coding style guide will you follow?

A) 🏆 Google Java Style Guide
   - 2 spaces indentation
   - 100 char line length
   - Enforced by Checkstyle

B) ☕ Oracle Java Conventions
   - 4 spaces indentation
   - Traditional Java style

C) 🎯 Sun Code Conventions
   - Classic Java style
   - Widely adopted

D) 🔧 Custom - Your own rules

Your choice: __

IDE Formatter:
A) Eclipse Formatter (Eclipse, NetBeans)
B) IntelliJ Formatter (IntelliJ IDEA)
C) google-java-format plugin
D) Spotless (Gradle/Maven plugin)

Your choice: __
```

---

## 5.3 Naming Conventions

```
Naming conventions (confirm or customize):

**Classes:**
- PascalCase: MainWindow, UserController
- Interfaces: IService or ServiceInterface?
  A) IService (prefix)
  B) ServiceInterface (suffix)
  C) Service (no prefix/suffix)

**Methods:**
- camelCase: getUserById(), calculateTotal()
- Getters/Setters: getName(), setName()
- Boolean getters: isActive(), hasPermission()

**Variables:**
- camelCase: userName, projectList
- Constants: UPPER_SNAKE_CASE: MAX_SIZE, DEFAULT_TIMEOUT
- Private fields: _fieldName or fieldName?
  A) fieldName (no prefix)
  B) _fieldName (underscore prefix)
  C) mFieldName (m prefix, Android style)

**Packages:**
- lowercase: com.company.app.model
- Singular or plural? model or models?
  A) Singular: model, controller
  B) Plural: models, controllers

Your choices: __
```

---

## 5.4 Code Organization

```
Code organization rules:

**Class Structure Order:**
1. Static fields (constants)
2. Instance fields
3. Constructors
4. Static methods
5. Instance methods
6. Inner classes

**Method Organization:**
A) By functionality (all user-related methods together)
B) By access level (public → protected → private)
C) By alphabetical order

Your preference: __

**Imports:**
A) ✅ Organize imports - Remove unused
B) ✅ Group imports - java.*, javax.*, org.*, com.*
C) ✅ No wildcard imports - Explicit imports only
D) 🔄 Allow wildcards - import java.util.*

**Comments:**
A) ✅ Javadoc for public API
B) ✅ Inline comments for complex logic
C) ✅ TODO/FIXME markers
D) ❌ Avoid obvious comments

**File Organization:**
- One public class per file?
  A) ✅ Yes - Standard practice
  B) ❌ No - Allow multiple classes

- Inner classes?
  A) ✅ Yes - For closely related classes
  B) ❌ No - Separate files always
```

---

## 5.5 Best Practices

```
Which best practices will you enforce?

**General:**
A) ✅ Immutability - Prefer final variables and immutable objects
B) ✅ Null safety - Use Optional, avoid null returns
C) ✅ Exception handling - Try-with-resources, specific exceptions
D) ✅ Resource management - Close streams, connections
E) ✅ Logging - Use logging framework, not System.out

**UI Thread Safety:**
A) ✅ Never block UI thread - Use background tasks
B) ✅ Update UI on UI thread only - invokeLater, Platform.runLater
C) ✅ Progress indicators - Show progress for long operations

**Performance:**
A) ✅ Lazy initialization - Create objects when needed
B) ✅ Object pooling - Reuse expensive objects
C) ✅ Cache results - Avoid redundant calculations
D) ✅ Efficient collections - Choose right data structure

**Security:**
A) ✅ Input validation - Validate all user input
B) ✅ SQL injection prevention - Use PreparedStatement
C) ✅ Secure storage - Encrypt sensitive data
D) ✅ Dependency scanning - Check for vulnerabilities

**Testing:**
A) ✅ Unit tests - Test business logic
B) ✅ UI tests - TestFX (JavaFX), AssertJ-Swing (Swing)
C) ✅ Integration tests - Database, file operations
D) ✅ Code coverage - Aim for 70%+ coverage

**Static Analysis:**
A) ✅ Checkstyle - Code style enforcement
B) ✅ PMD - Code quality rules
C) ✅ SpotBugs - Bug detection
D) ✅ SonarQube - Comprehensive analysis

Your choices: __
```

---

### Phase 5 Output

```
📋 PHASE 5 SUMMARY:

Java Version: [Java 17 LTS]
Code Style: [Google Java Style Guide]
IDE Formatter: [Eclipse Formatter]
Naming Conventions:
- Classes: PascalCase
- Methods: camelCase
- Variables: camelCase
- Constants: UPPER_SNAKE_CASE
- Interfaces: [IService / Service]
Best Practices:
- Immutability, null safety
- UI thread safety
- Performance optimization
- Security measures
- Testing strategy
Static Analysis:
- Checkstyle, PMD, SpotBugs

Is this correct? (Yes/No)
```

---

### 📄 Generate Configuration Files

**Generate Checkstyle configuration:**

- `.checkstyle.xml` with Google style rules

**Generate PMD configuration:**

- `.pmd.xml` with code quality rules

**Generate EditorConfig:**

- `.editorconfig` for consistent formatting across IDEs

**Update `docs/DEVELOPMENT.md`:**

- Code style guide
- Naming conventions
- Best practices
- Static analysis setup

---

**Next Phase:** Phase 6 - Testing (10-15 min)

Read: `.ai-flow/prompts/desktop/flow-build-phase-6.md`

---

**Last Updated:** 2025-02-03
**Version:** 1.0.0
