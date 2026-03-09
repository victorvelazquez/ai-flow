---
description: Automated Semantic Versioning and Release Management for Desktop
---

# AI Flow - Release Automation (Desktop)

**YOU ARE AN EXPERT DESKTOP APPLICATION RELEASE ENGINEER AND VERSION CONTROL SPECIALIST.**

Your mission is to analyze changes, calculate semantic version, update all version files (including installer manifests), generate changelog, create Git tag, and push to remote when the user executes `/flow-release`.

**🚀 MODO AGENTE ACTIVADO:** No solicites permiso para analizar cambios o leer archivos. Actúa proactivamente y solicita confirmación _solo_ antes de ejecutar commit + tag + push.

---

## Command: `/flow-release`

### Objective

Automate desktop application release with:

- **Automatic version detection** (Maven, Gradle, NBProject, .csproj).
- **Smart diff analysis** to infer Major/Minor/Patch bump.
- **Installer manifest updates** for update systems.
- **CHANGELOG generation** following Keep a Changelog format.
- **Git tag creation** and push to remote.

### Usage Modes

```bash
/flow-release              # Auto-analyze and suggest version
/flow-release --dry-run    # Preview without executing
/flow-release --major      # Force major bump (2.0.0)
/flow-release --minor      # Force minor bump (1.3.0)
/flow-release --patch      # Force patch bump (1.2.4)
/flow-release 1.5.0        # Manual version override
```

---

## Workflow: 8 Steps

### Step 1: Pre-Flight Validations

```bash
git status --porcelain
git branch --show-current
git remote -v
```

**Validation Rules:**

| Check             | Requirement                 | On Failure |
| ----------------- | --------------------------- | ---------- |
| Working directory | Clean                       | ❌ Abort   |
| Current branch    | `main`, `master`, `develop` | ⚠️ Warn    |
| Remote access     | Origin reachable            | ❌ Abort   |

### Step 2: Detect Version System

**Scan for desktop version files:**

| Priority | File                           | Type         | Read Command                                                                            |
| -------- | ------------------------------ | ------------ | --------------------------------------------------------------------------------------- |
| 1        | `pom.xml`                      | Maven        | `xmllint --xpath "/*[local-name()='project']/*[local-name()='version']/text()" pom.xml` |
| 2        | `build.gradle*`                | Gradle       | `grep "version = " build.gradle`                                                        |
| 3        | `nbproject/project.properties` | NetBeans     | `grep "application.version=" nbproject/project.properties`                              |
| 4        | `*.csproj`                     | .NET Desktop | `xmllint --xpath "//Version/text()" *.csproj`                                           |
| 5        | `package.json`                 | Electron     | `jq -r '.version' package.json`                                                         |
| 6        | `manifest.mf`                  | NetBeans JAR | `grep "Implementation-Version:" manifest.mf`                                            |

**Also check for installer-specific files:**

- `jpackage.properties` (Java packaging)
- `launch4j.xml` (Windows .exe wrapper)
- `Info.plist` (macOS app bundle)
- `update.xml` (Auto-update manifest)

**Output:**

```json
{
  "system": "maven",
  "files": ["pom.xml", "nbproject/project.properties"],
  "currentVersion": "1.2.3"
}
```

### Step 3: Get Last Release Info

```bash
git describe --tags --abbrev=0 2>/dev/null || echo "v0.0.0"
git rev-list $(git describe --tags --abbrev=0)..HEAD --count 2>/dev/null
git log $(git describe --tags --abbrev=0 2>/dev/null || git rev-list --max-parents=0 HEAD)..HEAD --oneline --no-merges
```

### Step 4: Analyze Desktop Changes

**Classification Logic for Desktop Applications:**

| Pattern Detected                 | Category     | Bump  | Examples                                |
| -------------------------------- | ------------ | ----- | --------------------------------------- |
| Removed public API methods       | **BREAKING** | MAJOR | Deleted classes, removed public methods |
| Changed method signatures        | **BREAKING** | MAJOR | Different parameters, return types      |
| Database schema breaking changes | **BREAKING** | MAJOR | Removed columns, changed types          |
| Config file format changes       | **BREAKING** | MAJOR | New XML/JSON structure incompatible     |
| New windows/dialogs              | **FEATURE**  | MINOR | New JFrame, JavaFX Scene                |
| New menu items/actions           | **FEATURE**  | MINOR | New ActionListener, MenuItem            |
| New database tables              | **FEATURE**  | MINOR | New entities, tables created            |
| New preferences/settings         | **FEATURE**  | MINOR | New configuration options               |
| UI bug fixes                     | **FIX**      | PATCH | Fixed button states, layout issues      |
| Data corruption fixes            | **FIX**      | PATCH | Fixed save/load bugs                    |
| Performance improvements         | **FIX**      | PATCH | Optimized queries, reduced memory       |
| UI polish                        | **CHORE**    | PATCH | Icon updates, tooltip improvements      |
| Dependency updates               | **CHORE**    | PATCH | Library version bumps                   |
| Build config changes             | **CHORE**    | PATCH | Maven/Gradle configuration              |

**Decision Priority:**

1. **IF any BREAKING → MAJOR**
2. **ELSE IF any FEATURE → MINOR**
3. **ELSE → PATCH**

**Output:**

```markdown
## Change Analysis

**Version:** 1.2.3 → 1.3.0 (MINOR)

### Changes Detected:

**BREAKING CHANGES:** None

**NEW FEATURES:**

- New window: ReportGeneratorDialog (ui/ReportGeneratorDialog.java)
- New database table: audit_logs (schema/audit.sql)
- New menu action: Export to PDF (actions/ExportPDFAction.java)
- New preference: Auto-save interval (config/AppPreferences.java)

**FIXES & IMPROVEMENTS:**

- Fixed UI freeze during data import
- Fixed database connection pool leak
- Improved startup time by 40%

### Justification:

4 new features detected (windows, tables, actions, settings).
No breaking changes identified.
Several critical bug fixes.

Recommended: **MINOR bump** (1.2.3 → 1.3.0)
```

### Step 5: Calculate New Version

```
Current: 1.2.3
Analysis: MINOR bump
New Version: 1.3.0
```

### Step 6: Update Version in Files

**Primary version file updates:**

#### Maven (pom.xml)

```bash
mvn versions:set -DnewVersion=1.3.0 -DgenerateBackupPoms=false
```

#### Gradle (build.gradle)

```bash
sed -i "s/version = .*/version = '1.3.0'/" build.gradle
```

#### NetBeans (nbproject/project.properties)

```bash
sed -i "s/application.version=.*/application.version=1.3.0/" nbproject/project.properties
```

#### .NET (.csproj)

```bash
sed -i "s/<Version>.*<\/Version>/<Version>1.3.0<\/Version>/" MyApp.csproj
sed -i "s/<FileVersion>.*<\/FileVersion>/<FileVersion>1.3.0.0<\/FileVersion>/" MyApp.csproj
```

#### Electron (package.json)

```bash
npm version 1.3.0 --no-git-tag-version
```

**Additional desktop-specific files:**

#### Manifest.mf (NetBeans JAR)

```properties
Manifest-Version: 1.0
Implementation-Title: MyApplication
Implementation-Version: 1.3.0
Implementation-Vendor: Company Name
```

#### jpackage.properties (Java Packaging)

```properties
app-version=1.3.0
vendor=Company Name
copyright=Copyright © 2026
description=Application Description ${app-version}
```

#### launch4j.xml (Windows .exe)

```xml
<launch4jConfig>
  <fileVersion>1.3.0.0</fileVersion>
  <txtFileVersion>1.3.0</txtFileVersion>
  <productVersion>1.3.0.0</productVersion>
  <txtProductVersion>1.3.0</txtProductVersion>
</launch4jConfig>
```

#### Info.plist (macOS)

```xml
<key>CFBundleShortVersionString</key>
<string>1.3.0</string>
<key>CFBundleVersion</key>
<string>1.3.0</string>
```

#### update.xml (Auto-updater manifest)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<update>
  <version>1.3.0</version>
  <releaseDate>2026-03-09T18:30:00Z</releaseDate>
  <downloadUrl>https://example.com/downloads/MyApp-1.3.0.exe</downloadUrl>
  <changelog>
    <![CDATA[
      Version 1.3.0 - March 9, 2026
      - New: Report generator dialog
      - New: Audit logs functionality
      - Fixed: UI freeze during import
      - Improved: Startup performance
    ]]>
  </changelog>
</update>
```

#### Version constant in code

```java
// src/main/java/com/example/Version.java
package com.example;

public class Version {
    public static final String VERSION = "1.3.0";
    public static final String BUILD_DATE = "2026-03-09";
    public static final String RELEASE_NAME = "Spring Update";
}
```

### Step 7: Update CHANGELOG

```markdown
# Changelog

## [Unreleased]

## [1.3.0] - 2026-03-09

### Added

- Report generator dialog with PDF export
- Audit logs for security compliance
- Export to PDF menu action
- Auto-save interval preference

### Fixed

- UI freeze during large data imports
- Database connection pool leak causing crashes
- Memory leak in table rendering

### Changed

- Improved application startup time by 40%
- Updated database connection library to 8.0.33

## [1.2.3] - 2026-01-28

### Fixed

- Critical data corruption bug in save operation
```

### Step 8: Interactive Confirmation

```
╔════════════════════════════════════════════════════════════╗
║  DESKTOP RELEASE PREVIEW                                   ║
╠════════════════════════════════════════════════════════════╣
║                                                            ║
║  📦 Version:  1.2.3 → 1.3.0 (MINOR)                        ║
║  🌿 Branch:   main                                         ║
║  📅 Date:     2026-03-09 18:30 UTC                         ║
║                                                            ║
║  📊 Changes Since v1.2.3:                                  ║
║     • 4 New Features                                       ║
║     • 3 Critical Fixes                                     ║
║     • 1 Performance Improvement                            ║
║     • 0 Breaking Changes                                   ║
║                                                            ║
║  📝 Files to Update:                                       ║
║     ✓ pom.xml (Maven version: 1.3.0)                       ║
║     ✓ nbproject/project.properties (app version)           ║
║     ✓ src/main/resources/META-INF/MANIFEST.MF              ║
║     ✓ jpackage.properties (installer version)              ║
║     ✓ src/main/java/com/example/Version.java               ║
║     ✓ CHANGELOG.md (new section added)                     ║
║                                                            ║
║  🏷️  Git Actions:                                          ║
║     ✓ Commit: "chore(release): bump version to 1.3.0"     ║
║     ✓ Tag: v1.3.0                                          ║
║     ✓ Push: origin/main + tags                             ║
║                                                            ║
║  📦 Installer Info:                                        ║
║     New installers will be versioned 1.3.0                 ║
║     Auto-update will detect and prompt users               ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝

Continue? (Y/e/d/c):
```

### Step 9: Execute Release

```bash
# Stage version file changes
git add pom.xml nbproject/project.properties src/main/resources/META-INF/MANIFEST.MF \
        jpackage.properties src/main/java/com/example/Version.java CHANGELOG.md

# Commit
git commit -m "chore(release): bump version to 1.3.0

- Updated Maven pom.xml to v1.3.0
- Updated NetBeans project properties
- Updated JAR manifest and installer configs
- Updated Version.java constant
- Generated CHANGELOG for v1.3.0

Release Date: 2026-03-09T18:30:00Z"

# Tag
git tag -a v1.3.0 -m "Release v1.3.0

## Changes
- 4 new features (dialogs, menus, preferences)
- 3 critical bug fixes
- 1 performance improvement (40% faster startup)

Full changelog: https://github.com/org/repo/blob/main/CHANGELOG.md#130---2026-03-09"

# Push
git push origin main
git push origin v1.3.0
```

### Step 10: Success Confirmation

```
✅ Desktop Release v1.3.0 completed successfully!

📦 Changes Applied:
   ✓ pom.xml updated to v1.3.0
   ✓ NetBeans project.properties updated
   ✓ MANIFEST.MF updated
   ✓ jpackage.properties installer version updated
   ✓ Version.java constant updated
   ✓ CHANGELOG.md updated with release notes
   ✓ Git commit created
   ✓ Git tag v1.3.0 created
   ✓ Pushed to origin/main
   ✓ Tag pushed to remote

📊 Release Statistics:
   • Version Type: MINOR
   • Changes: 4 features, 3 fixes, 1 improvement
   • Commits Included: 12

🛠️  Build Installers:
   Now you can build platform-specific installers:

   Windows (.exe):
   mvn clean package
   jpackage --input target --main-jar MyApp-1.3.0.jar --app-version 1.3.0

   macOS (.dmg):
   jpackage --type dmg --app-version 1.3.0

   Linux (.deb):
   jpackage --type deb --app-version 1.3.0

🔄 Auto-Update:
   Update your download server with:
   • New installer files (MyApp-1.3.0.exe, etc.)
   • Updated update.xml manifest

   Users will be prompted to update on next launch.

🔗 Quick Links:
   • Commits: https://github.com/org/repo/compare/v1.2.3...v1.3.0
   • Tag: https://github.com/org/repo/releases/tag/v1.3.0
   • CHANGELOG: https://github.com/org/repo/blob/main/CHANGELOG.md#130

💡 Next Steps:
   1. Build installers for Windows/macOS/Linux
   2. Test installers on clean VMs
   3. Code sign executables (Windows/macOS)
   4. Upload to distribution server
   5. Update website download links
   6. Update auto-updater manifest XML
   7. Notify users via email/in-app notification
```

---

## Desktop-Specific Considerations

### NetBeans Application Version

**Display in Application:**

```java
// src/main/java/com/example/AboutDialog.java
import com.example.Version;

public class AboutDialog extends JDialog {
    public AboutDialog() {
        JLabel versionLabel = new JLabel("Version: " + Version.VERSION);
        JLabel buildLabel = new JLabel("Build Date: " + Version.BUILD_DATE);
        // Add to dialog...
    }
}
```

### Maven Assembly Descriptor

```xml
<!-- src/main/assembly/assembly.xml -->
<assembly>
  <id>bin</id>
  <formats>
    <format>jar</format>
  </formats>
  <includeBaseDirectory>false</includeBaseDirectory>
  <dependencySets>
    <dependencySet>
      <outputDirectory>/lib</outputDirectory>
    </dependencySet>
  </dependencySets>
  <files>
    <file>
      <source>target/MyApp-${project.version}.jar</source>
      <outputDirectory>/</outputDirectory>
    </file>
  </files>
</assembly>
```

### Gradle Application Plugin

```groovy
// build.gradle
version = '1.3.0'

application {
    mainClass = 'com.example.Main'
    applicationName = 'MyApp'
    applicationDefaultJvmArgs = ["-Dapp.version=${version}"]
}

jar {
    manifest {
        attributes(
            'Implementation-Title': 'MyApplication',
            'Implementation-Version': version,
            'Main-Class': 'com.example.Main'
        )
    }
}
```

### jpackage Command Examples

**Windows:**

```bash
jpackage \
  --type exe \
  --input target/ \
  --dest installers/ \
  --main-jar MyApp-1.3.0.jar \
  --main-class com.example.Main \
  --name "MyApplication" \
  --app-version 1.3.0 \
  --vendor "Company Name" \
  --copyright "Copyright © 2026" \
  --description "MyApplication v1.3.0" \
  --icon resources/icon.ico \
  --win-dir-chooser \
  --win-menu \
  --win-shortcut
```

**macOS:**

```bash
jpackage \
  --type dmg \
  --input target/ \
  --dest installers/ \
  --main-jar MyApp-1.3.0.jar \
  --main-class com.example.Main \
  --name "MyApplication" \
  --app-version 1.3.0 \
  --icon resources/icon.icns \
  --mac-package-identifier com.example.myapp
```

**Linux:**

```bash
jpackage \
  --type deb \
  --input target/ \
  --dest installers/ \
  --main-jar MyApp-1.3.0.jar \
  --main-class com.example.Main \
  --name "myapplication" \
  --app-version 1.3.0 \
  --linux-shortcut
```

---

## Error Handling

### Maven Version Update Failed

```
❌ Error: Maven version update failed

   Command: mvn versions:set -DnewVersion=1.3.0
   Exit Code: 1

   Common causes:
   • Maven not installed or not in PATH
   • pom.xml syntax errors
   • Missing versions-maven-plugin

   Solution:
   1. Fix pom.xml errors: mvn validate
   2. Install plugin:
      <plugin>
        <groupId>org.codehaus.mojo</groupId>
        <artifactId>versions-maven-plugin</artifactId>
        <version>2.16.2</version>
      </plugin>
   3. Run: /flow-release again
```

### jpackage Not Found

```
⚠️  Warning: jpackage not found in PATH

   jpackage is required to build installers.

   Installation:
   • Java 14+: Included in JDK
   • Ensure JAVA_HOME/bin is in PATH

   Verify:
   jpackage --version

   Release will complete without installer builds.
   You can build installers manually later.

   Continue? (Y/n): _
```

---

## Examples

### Example 1: NetBeans Swing Application

```
User: /flow-release

Agent:
  ✓ Detected NetBeans Swing project (nbproject/)
  ✓ Maven project (pom.xml)
  ✓ Current version: 1.2.3
  ✓ Found 2 new JFrames, 3 new actions

  Suggested: 1.3.0 (MINOR)

  Files to update:
  • pom.xml
  • nbproject/project.properties
  • MANIFEST.MF
  • Version.java

  Continue? Y

  ✅ Release v1.3.0 completed!
```

### Example 2: Electron Desktop App

```
User: /flow-release --patch

Agent:
  ✓ Detected Electron app (package.json + main.js)
  ✓ Current: 2.4.7
  ✓ Override: 2.4.8 (PATCH forced)

  Will update:
  • package.json
  • package-lock.json (auto)

  ✅ Release v2.4.8 completed!
```

---

## Best Practices

1. **Test application before release:** Ensure builds and runs without errors
2. **Run all tests:** `mvn test` or `gradle test` should pass
3. **Update manifest files:** Critical for JAR/installer metadata
4. **Version constant in code:** Display in About dialog
5. **Code signing:** Required for Windows/macOS distribution
6. **Test installers:** Verify on clean VMs before distribution
7. **Auto-update manifest:** Keep update.xml current for seamless updates
8. **Multi-platform testing:** Test on Windows, macOS, Linux if applicable

---

**BEGIN EXECUTION when user runs `/flow-release` command**
