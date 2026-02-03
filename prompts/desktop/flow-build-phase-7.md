## PHASE 7: Packaging & Deployment (15-20 min)

> **Order for this phase:** 7.1 → 7.2 → 7.3 → 7.4 → 7.5

### Objective

Define how the desktop application will be packaged, distributed, and deployed to end users.

---

## 7.1 Packaging Format

```
How will you package your application?

A) ☕ Executable JAR - Simple distribution
   - java -jar myapp.jar
   - Requires JRE installed
   - Cross-platform
   - Best for: Developers, technical users

B) 🚀 Native Executable - Platform-specific
   - Windows: .exe
   - macOS: .app
   - Linux: binary
   - Includes JRE (self-contained)
   - Tools: jpackage (Java 14+), GraalVM native-image

C) 💼 Installer Package - Professional distribution
   - Windows: .msi, .exe (NSIS, Inno Setup, WiX)
   - macOS: .dmg, .pkg
   - Linux: .deb, .rpm, AppImage, Snap, Flatpak
   - Includes JRE, auto-updates, shortcuts

D) ☁️ Java Web Start (deprecated) - Legacy
   - JNLP files
   - Not recommended for new apps

Your primary packaging: __
Your secondary packaging: __
```

---

## 7.2 Build Configuration

**For Maven:**

```xml
<!-- Maven Assembly Plugin - Fat JAR -->
<plugin>
    <artifactId>maven-assembly-plugin</artifactId>
    <configuration>
        <archive>
            <manifest>
                <mainClass>com.company.app.Main</mainClass>
            </manifest>
        </archive>
        <descriptorRefs>
            <descriptorRef>jar-with-dependencies</descriptorRef>
        </descriptorRefs>
    </configuration>
</plugin>

<!-- Maven Shade Plugin - Fat JAR (alternative) -->
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-shade-plugin</artifactId>
    <executions>
        <execution>
            <phase>package</phase>
            <goals>
                <goal>shade</goal>
            </goals>
        </execution>
    </executions>
</plugin>
```

**For Gradle:**

```groovy
// Fat JAR
jar {
    manifest {
        attributes 'Main-Class': 'com.company.app.Main'
    }
    from {
        configurations.runtimeClasspath.collect {
            it.isDirectory() ? it : zipTree(it)
        }
    }
}

// Or use Shadow plugin
plugins {
    id 'com.github.johnrengelman.shadow' version '8.1.1'
}
```

**For Ant (NetBeans):**

```xml
<target name="jar" depends="compile">
    <jar destfile="dist/myapp.jar" basedir="build/classes">
        <manifest>
            <attribute name="Main-Class" value="com.company.app.Main"/>
            <attribute name="Class-Path" value="lib/dependency.jar"/>
        </manifest>
    </jar>
</target>
```

---

## 7.3 Native Packaging

**Using jpackage (Java 14+):**

```
jpackage --input target/ \
         --name MyApp \
         --main-jar myapp.jar \
         --main-class com.company.app.Main \
         --type [exe|dmg|deb|rpm|app-image] \
         --icon src/main/resources/icon.ico \
         --app-version 1.0.0 \
         --vendor "Company Name" \
         --copyright "Copyright 2025" \
         --description "My Desktop Application"

Platform-specific options:
- Windows: --win-dir-chooser, --win-menu, --win-shortcut
- macOS: --mac-package-identifier com.company.app, --mac-sign
- Linux: --linux-shortcut, --linux-menu-group
```

**Using GraalVM Native Image:**

```bash
native-image -jar myapp.jar \
             --no-fallback \
             -H:Name=myapp \
             -H:+ReportExceptionStackTraces

Benefits:
- Instant startup (no JVM warmup)
- Lower memory footprint
- No JRE required
Limitations:
- Reflection requires configuration
- Dynamic class loading limited
- Build time longer
```

**Third-party tools:**

```
A) Launch4j (Windows .exe wrapper)
   - Wraps JAR in .exe
   - JRE bundling
   - Icon, splash screen

B) exe4j (Commercial Windows wrapper)
   - Professional .exe generation
   - Code signing support

C) install4j (Commercial multi-platform)
   - Windows, macOS, Linux
   - Auto-updates, licensing

Your choice: __
```

---

## 7.4 Distribution & Installation

```
How will users install your application?

A) 📦 Download from website
   - Direct download link
   - Manual installation
   - No auto-updates

B) 🏪 App Store distribution
   - Windows: Microsoft Store
   - macOS: Mac App Store
   - Linux: Snap Store, Flathub
   - Requires app signing, review process

C) 📦 Package managers
   - Windows: Chocolatey, Winget
   - macOS: Homebrew
   - Linux: apt, yum, pacman

D) 🔄 Auto-update system
   - Check for updates on launch
   - Download and install updates
   - Libraries: Update4j, AutoUpdater

Your distribution method: __

Installation options:
- Install for all users vs current user?
- Desktop shortcut?
- Start menu entry?
- Auto-start on login?
- File associations?
```

---

## 7.5 Code Signing & Security

```
Will you sign your application?

**Windows:**
A) ✅ Code signing certificate
   - .pfx/.p12 certificate
   - Prevents "Unknown publisher" warnings
   - Required for SmartScreen reputation
   - Tools: SignTool.exe

B) ❌ No signing (development only)

**macOS:**
A) ✅ Apple Developer ID certificate
   - Required for distribution outside App Store
   - Gatekeeper approval
   - Notarization (macOS 10.15+)
   - Tools: codesign, xcrun altool

B) ❌ No signing (development only)

**Linux:**
- GPG signing for repositories
- AppImage signatures

Your signing strategy: __

**Distribution Security:**
- Provide checksums? (SHA-256)
- HTTPS downloads only?
- Signature verification instructions?
```

---

### Phase 7 Output

```
📋 PHASE 7 SUMMARY:

Packaging Format: [Executable JAR / Native executable / Installer]
Build Tool: [Maven / Gradle / Ant]
Native Packaging: [jpackage / GraalVM / Launch4j / exe4j]
Distribution: [Website download / App Store / Package manager / Auto-update]
Platform Packages:
- Windows: [.exe, .msi]
- macOS: [.app, .dmg, .pkg]
- Linux: [.deb, .rpm, AppImage]
Code Signing: [Yes - Windows/macOS / No]
Installation Options: [Desktop shortcut, Start menu, File associations]

Is this correct? (Yes/No)
```

---

### 📄 Generate Build Scripts

**Generate Maven packaging configuration**
**Generate Gradle packaging configuration**
**Generate jpackage script (shell/bat)**
**Generate distribution README**

Update `docs/DEPLOYMENT.md`:

- Build instructions
- Packaging process
- Distribution methods
- Installation guide
- Code signing procedures

---

**Next Phase:** Phase 8 - Project Setup & Final Docs (10-15 min)

Read: `.ai-flow/prompts/desktop/flow-build-phase-8.md`

---

**Last Updated:** 2025-02-03
**Version:** 1.0.0
