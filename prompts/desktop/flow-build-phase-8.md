## PHASE 8: Project Setup & Final Documentation (10-15 min)

> **🎯 SPECIAL PHASE:** This phase MUST be executed differently depending on project state.

### Objective

Initialize the project structure (if new) or finalize documentation (if existing).

---

## 8.0 Project State Detection

**CRITICAL FIRST STEP - Detect Project State:**

```
Scan the project root for:

A) ✅ EXISTING Project Markers:
   - NetBeans: nbproject/project.xml, build.xml
   - Eclipse: .project, .classpath
   - Maven: pom.xml with <dependencies>
   - Gradle: build.gradle with dependencies
   - Source code: src/ with .java files
   - If ANY exist → EXISTING PROJECT

B) ❌ NEW Project Markers:
   - Only .ai-flow/ directory exists
   - No build files or source code
   - Empty project directory
   - If NONE of above exist → NEW PROJECT

DETECTED STATE: [EXISTING / NEW]
```

---

## 8.1 EXISTING Project Path

**If project is EXISTING, execute this section:**

```
✅ Existing Desktop Project Detected

I've analyzed your existing Java desktop project and gathered all the documentation.

Now I'll finalize the documentation:
1. Validate all documentation is complete
2. Generate missing sections
3. Create final README.md
4. Generate .gitignore
```

### 8.1.1 Validate Documentation

Check that all required documents exist:

- ✅ project-brief.md
- ✅ docs/ARCHITECTURE.md
- ✅ docs/DATABASE.md (if applicable)
- ✅ docs/DEVELOPMENT.md
- ✅ docs/DEPLOYMENT.md

### 8.1.2 Generate .gitignore

```
# Generated .gitignore for Desktop Java Project

# Build outputs
/target/
/build/
/dist/
/out/

# IDE
.idea/
*.iml
.vscode/
.settings/
.classpath
.project
nbproject/private/
build/

# NetBeans
nbproject/private/
nbbuild/
nbdist/
.nb-gradle/

# Eclipse
.metadata
bin/
tmp/
*.tmp
*.bak

# Package Files
*.jar
*.war
*.nar
*.ear
*.zip
*.tar.gz
*.rar

# Logs
*.log
logs/

# OS
.DS_Store
Thumbs.db
*~

# Database
*.db
*.sqlite
*.h2.db

# Keep .ai-flow but ignore work
.ai-flow/work/
.ai-flow/archive/
.ai-flow/cache/
```

### 8.1.3 Generate README.md

Generate comprehensive README with:

- Project name and description
- Prerequisites (Java version, IDE)
- Build instructions (Maven/Gradle/Ant)
- Running the application
- Testing instructions
- Packaging instructions
- Contributing guidelines
- License

### 8.1.4 Final Validation

```
✅ Documentation complete!

Generated/Updated files:
- README.md
- .gitignore
- docs/ARCHITECTURE.md
- docs/DATABASE.md
- docs/DEVELOPMENT.md
- docs/DEPLOYMENT.md

Next steps:
1. Review the generated documentation
2. Optionally run Phase 9 for Implementation Roadmap
3. Optionally run Phase 10 for User Stories

Type "continue" to proceed to Phase 9, or "done" to finish.
```

---

## 8.2 NEW Project Path

**If project is NEW, execute this section:**

```
✅ New Desktop Project Initialization

I'll set up a complete Java desktop project structure for you.

Based on your answers from previous phases:
- IDE: [NetBeans / Eclipse]
- UI Framework: [Swing / JavaFX / SWT]
- Build Tool: [Maven / Gradle / Ant]
- Java Version: [17]

Proceeding with project initialization...
```

### 8.2.1 Detect Framework & Build Tool

```
Based on Phase 2 and Phase 3:
- UI Framework: [Swing / JavaFX / SWT]
- Build Tool: [Maven / Gradle / Ant]
- Architecture: [MVC / MVP / MVVM]
```

### 8.2.2 Generate Project Structure

**For Maven (recommended):**

```
project-root/
├── pom.xml
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/company/app/
│   │   │       ├── Main.java
│   │   │       ├── model/
│   │   │       ├── view/
│   │   │       ├── controller/
│   │   │       ├── service/
│   │   │       └── util/
│   │   └── resources/
│   │       ├── application.properties
│   │       ├── fxml/ (JavaFX)
│   │       ├── forms/ (Swing .form)
│   │       └── icons/
│   └── test/
│       ├── java/
│       │   └── com/company/app/
│       └── resources/
├── docs/
│   ├── ARCHITECTURE.md
│   ├── DATABASE.md
│   ├── DEVELOPMENT.md
│   └── DEPLOYMENT.md
├── scripts/
│   ├── build.sh
│   └── build.bat
├── README.md
├── .gitignore
├── CONTRIBUTING.md
└── LICENSE
```

**For Gradle:**

```
Similar structure with:
├── build.gradle (or build.gradle.kts)
├── settings.gradle
└── gradle/
```

**For Ant (NetBeans):**

```
project-root/
├── nbproject/
│   ├── project.xml
│   ├── project.properties
│   └── build-impl.xml
├── build.xml
├── manifest.mf
├── src/
│   └── com/company/app/
│       ├── Main.java
│       └── ...
├── lib/ (dependencies)
├── test/
├── dist/ (build output)
└── build/ (compiled classes)
```

### 8.2.3 Generate pom.xml (Maven)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
                             http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.company</groupId>
    <artifactId>myapp</artifactId>
    <version>1.0.0</version>
    <packaging>jar</packaging>

    <name>MyApp</name>
    <description>My Desktop Application</description>

    <properties>
        <maven.compiler.source>17</maven.compiler.source>
        <maven.compiler.target>17</maven.compiler.target>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>

        <!-- Dependencies versions -->
        <javafx.version>21.0.1</javafx.version>
        <flatlaf.version>3.3</flatlaf.version>
        <h2.version>2.2.224</h2.version>
        <hibernate.version>6.4.1.Final</hibernate.version>
        <junit.version>5.10.1</junit.version>
    </properties>

    <dependencies>
        <!-- UI Framework (conditional on Phase 2 choice) -->
        [IF JavaFX:]
        <dependency>
            <groupId>org.openjfx</groupId>
            <artifactId>javafx-controls</artifactId>
            <version>${javafx.version}</version>
        </dependency>
        <dependency>
            <groupId>org.openjfx</groupId>
            <artifactId>javafx-fxml</artifactId>
            <version>${javafx.version}</version>
        </dependency>

        [IF Swing + FlatLaf:]
        <dependency>
            <groupId>com.formdev</groupId>
            <artifactId>flatlaf</artifactId>
            <version>${flatlaf.version}</version>
        </dependency>

        [IF SWT:]
        <dependency>
            <groupId>org.eclipse.platform</groupId>
            <artifactId>org.eclipse.swt.win32.win32.x86_64</artifactId>
            <version>3.125.0</version>
        </dependency>

        <!-- Database (if Phase 4 specified) -->
        [IF H2:]
        <dependency>
            <groupId>com.h2database</groupId>
            <artifactId>h2</artifactId>
            <version>${h2.version}</version>
        </dependency>

        [IF JPA + Hibernate:]
        <dependency>
            <groupId>org.hibernate.orm</groupId>
            <artifactId>hibernate-core</artifactId>
            <version>${hibernate.version}</version>
        </dependency>

        <!-- Testing -->
        <dependency>
            <groupId>org.junit.jupiter</groupId>
            <artifactId>junit-jupiter</artifactId>
            <version>${junit.version}</version>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>org.mockito</groupId>
            <artifactId>mockito-core</artifactId>
            <version>5.8.0</version>
            <scope>test</scope>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <version>3.11.0</version>
            </plugin>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-jar-plugin</artifactId>
                <version>3.3.0</version>
                <configuration>
                    <archive>
                        <manifest>
                            <mainClass>com.company.app.Main</mainClass>
                        </manifest>
                    </archive>
                </configuration>
            </plugin>
            [IF JavaFX:]
            <plugin>
                <groupId>org.openjfx</groupId>
                <artifactId>javafx-maven-plugin</artifactId>
                <version>0.0.8</version>
                <configuration>
                    <mainClass>com.company.app.Main</mainClass>
                </configuration>
            </plugin>
        </plugins>
    </build>
</project>
```

### 8.2.4 Generate Main.java

**For Swing:**

```java
package com.company.app;

import javax.swing.*;
import com.formdev.flatlaf.FlatLightLaf;

public class Main {
    public static void main(String[] args) {
        // Set Look and Feel
        try {
            UIManager.setLookAndFeel(new FlatLightLaf());
        } catch (Exception ex) {
            System.err.println("Failed to initialize FlatLaf");
        }

        // Launch UI on Event Dispatch Thread
        SwingUtilities.invokeLater(() -> {
            MainWindow window = new MainWindow();
            window.setVisible(true);
        });
    }
}
```

**For JavaFX:**

```java
package com.company.app;

import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Scene;
import javafx.stage.Stage;

public class Main extends Application {
    @Override
    public void start(Stage primaryStage) throws Exception {
        FXMLLoader loader = new FXMLLoader(
            getClass().getResource("/fxml/main.fxml")
        );
        Scene scene = new Scene(loader.load());

        primaryStage.setTitle("MyApp");
        primaryStage.setScene(scene);
        primaryStage.show();
    }

    public static void main(String[] args) {
        launch(args);
    }
}
```

**For SWT:**

```java
package com.company.app;

import org.eclipse.swt.widgets.Display;
import org.eclipse.swt.widgets.Shell;

public class Main {
    public static void main(String[] args) {
        Display display = new Display();
        Shell shell = new Shell(display);

        shell.setText("MyApp");
        shell.setSize(800, 600);
        shell.open();

        while (!shell.isDisposed()) {
            if (!display.readAndDispatch()) {
                display.sleep();
            }
        }
        display.dispose();
    }
}
```

### 8.2.5 Generate Documentation

Generate all documentation files:

- README.md
- docs/ARCHITECTURE.md
- docs/DATABASE.md (if applicable)
- docs/DEVELOPMENT.md
- docs/DEPLOYMENT.md
- CONTRIBUTING.md
- .gitignore

### 8.2.6 Final Steps

```
✅ Project initialization complete!

Created structure:
- Maven/Gradle/Ant project
- Source directories
- Main entry point
- Build configuration
- Documentation

Next steps:
1. Import project in [NetBeans / Eclipse / IntelliJ]
2. Run: mvn clean compile (or gradle build, ant compile)
3. Test: mvn test
4. Run: mvn javafx:run (or java -jar target/myapp.jar)

Optionally:
- Phase 9: Generate Implementation Roadmap
- Phase 10: Generate User Stories

Type "continue" for Phase 9, or "done" to finish.
```

---

### Phase 8 Output

```
📋 PHASE 8 SUMMARY:

Project State: [EXISTING / NEW]
[IF NEW:]
- Project structure created
- Build file generated (pom.xml/build.gradle/build.xml)
- Main class generated
- Dependencies configured

[IF EXISTING:]
- Documentation validated
- .gitignore generated
- README.md updated

All documentation complete:
✅ README.md
✅ project-brief.md
✅ docs/ARCHITECTURE.md
✅ docs/DATABASE.md
✅ docs/DEVELOPMENT.md
✅ docs/DEPLOYMENT.md
✅ .gitignore

Ready to proceed? (Yes/No)
```

---

**Next Phase:** Phase 9 - Implementation Roadmap (optional)

Read: `.ai-flow/prompts/desktop/flow-build-phase-9.md`

---

**Last Updated:** 2025-02-03
**Version:** 1.0.0
