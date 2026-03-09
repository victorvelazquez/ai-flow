---
description: Automated Semantic Versioning and Release Management for Mobile
---

# AI Flow - Release Automation (Mobile)

**YOU ARE AN EXPERT MOBILE APPLICATION RELEASE ENGINEER AND VERSION CONTROL SPECIALIST.**

Your mission is to analyze changes, calculate semantic version, update all version files (including platform-specific build numbers), generate changelog, create Git tag, and push to remote when the user executes `/flow-release`.

**🚀 MODO AGENTE ACTIVADO:** No solicites permiso para analizar cambios o leer archivos. Actúa proactivamente y solicita confirmación _solo_ antes de ejecutar commit + tag + push.

---

## Command: `/flow-release`

### Objective

Automate mobile app release with:

- **Automatic version detection** (pubspec.yaml, package.json, platform files).
- **Smart diff analysis** to infer Major/Minor/Patch bump.
- **Build number auto-increment** (CRITICAL for iOS/Android).
- **Platform-specific file updates** (Info.plist, build.gradle).
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
/flow-release 1.5.0+42     # Manual version + build number (Flutter)
```

---

## Workflow: 9 Steps

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

**Scan for mobile version files:**

| Priority | File                       | Type           | Read Command                                                         |
| -------- | -------------------------- | -------------- | -------------------------------------------------------------------- |
| 1        | `pubspec.yaml`             | Flutter        | `grep "version:" pubspec.yaml`                                       |
| 2        | `package.json`             | React Native   | `jq -r '.version' package.json`                                      |
| 3        | `ios/Runner/Info.plist`    | iOS Native     | `plutil -p ios/Runner/Info.plist \| grep CFBundleShortVersionString` |
| 4        | `android/app/build.gradle` | Android Native | `grep "versionName" android/app/build.gradle`                        |
| 5        | `app.json`                 | Expo           | `jq -r '.expo.version' app.json`                                     |

**Platform-specific build number files:**

- **Flutter:** `pubspec.yaml` (version: 1.3.0+42)
- **iOS:** `ios/Runner/Info.plist` (CFBundleVersion)
- **Android:** `android/app/build.gradle` (versionCode)
- **React Native:** `ios/MyApp/Info.plist` + `android/app/build.gradle`

**Output:**

```json
{
  "system": "flutter",
  "files": ["pubspec.yaml", "ios/Runner/Info.plist", "android/app/build.gradle"],
  "currentVersion": "1.2.3",
  "currentBuildNumber": 41
}
```

### Step 3: Get Last Release Info

```bash
git describe --tags --abbrev=0 2>/dev/null || echo "v0.0.0"
git rev-list $(git describe --tags --abbrev=0)..HEAD --count 2>/dev/null
git log $(git describe --tags --abbrev=0 2>/dev/null || git rev-list --max-parents=0 HEAD)..HEAD --oneline --no-merges
```

### Step 4: Analyze Mobile Changes

**Classification Logic for Mobile Apps:**

| Pattern Detected                | Category     | Bump  | Examples                                    |
| ------------------------------- | ------------ | ----- | ------------------------------------------- |
| Removed public APIs             | **BREAKING** | MAJOR | Deleted exported functions, removed screens |
| Changed navigation structure    | **BREAKING** | MAJOR | Routes removed, deep links changed          |
| Minimum OS version increased    | **BREAKING** | MAJOR | iOS 12 → 13, Android 21 → 23                |
| Changed data persistence format | **BREAKING** | MAJOR | SQLite schema breaking, storage format      |
| New screens/pages               | **FEATURE**  | MINOR | New Flutter screens, React Native pages     |
| New bottom tabs/navigation      | **FEATURE**  | MINOR | New tab in TabNavigator                     |
| New features/capabilities       | **FEATURE**  | MINOR | Camera, location, push notifications        |
| New API integrations            | **FEATURE**  | MINOR | New REST endpoints consumed                 |
| UI bug fixes                    | **FIX**      | PATCH | Fixed rendering issues, button states       |
| Crash fixes                     | **FIX**      | PATCH | Fixed null pointer, index out of bounds     |
| Performance improvements        | **FIX**      | PATCH | Optimized lists, reduced memory             |
| UI polish                       | **CHORE**    | PATCH | Icon updates, color tweaks                  |
| Dependency updates              | **CHORE**    | PATCH | Package upgrades (non-breaking)             |
| Build config changes            | **CHORE**    | PATCH | Gradle, Xcode settings                      |

**Decision Priority:**

1. **IF any BREAKING → MAJOR**
2. **ELSE IF any FEATURE → MINOR**
3. **ELSE → PATCH**

**Output:**

```markdown
## Change Analysis

**Version:** 1.2.3+41 → 1.3.0+42 (MINOR)

### Changes Detected:

**BREAKING CHANGES:** None

**NEW FEATURES:**

- New screen: ProfileEditScreen (lib/screens/profile_edit_screen.dart)
- New feature: Camera image picker (packages: image_picker)
- New navigation: Settings tab in BottomNavigationBar
- New API: User preferences endpoint integration

**FIXES & IMPROVEMENTS:**

- Fixed crash on logout with null user
- Fixed infinite loading on network timeout
- Improved list scroll performance (ListView.builder)

### Justification:

4 new features detected (screens, capabilities, navigation).
No breaking changes identified.
Several critical bug fixes.

Recommended: **MINOR bump** (1.2.3 → 1.3.0)
Build Number: 41 → 42 (auto-incremented)
```

### Step 5: Calculate New Version and Build Number

```
Current Version: 1.2.3
Current Build Number: 41

Analysis: MINOR bump

New Version: 1.3.0
New Build Number: 42 (auto-incremented)
```

**Build Number Rules:**

- **Always increment** (even for PATCH), required by stores
- Platform-specific:
  - **Flutter:** Single build number in `pubspec.yaml`
  - **iOS:** CFBundleVersion (integer: 42)
  - **Android:** versionCode (integer: 42)
  - **React Native:** Separate for iOS and Android

**Build Number Strategies:**

1. **Simple increment:** 1, 2, 3, 4... (recommended)
2. **Date-based:** YYYYMMDDNN (2026030901)
3. **Separate per platform:** iOS=42, Android=84

### Step 6: Update Version in Files

**Flutter (pubspec.yaml):**

```yaml
name: my_app
description: My Flutter Application
version: 1.3.0+42 # ← version+buildNumber

environment:
  sdk: '>=3.0.0 <4.0.0'
```

**Command:**

```bash
# Update version in pubspec.yaml
sed -i "s/version: .*/version: 1.3.0+42/" pubspec.yaml
```

**React Native (package.json + platform files):**

```bash
# Update package.json
npm version 1.3.0 --no-git-tag-version

# Update iOS Info.plist
/usr/libexec/PlistBuddy -c "Set :CFBundleShortVersionString 1.3.0" ios/MyApp/Info.plist
/usr/libexec/PlistBuddy -c "Set :CFBundleVersion 42" ios/MyApp/Info.plist

# Update Android build.gradle
sed -i "s/versionName .*/versionName \"1.3.0\"/" android/app/build.gradle
sed -i "s/versionCode .*/versionCode 42/" android/app/build.gradle
```

**Expo (app.json):**

```json
{
  "expo": {
    "name": "MyApp",
    "version": "1.3.0",
    "android": {
      "versionCode": 42
    },
    "ios": {
      "buildNumber": "42"
    }
  }
}
```

### Step 7: Update Platform-Specific Files

#### iOS (ios/Runner/Info.plist or ios/MyApp/Info.plist)

```xml
<key>CFBundleShortVersionString</key>
<string>1.3.0</string>
<key>CFBundleVersion</key>
<string>42</string>
```

**Command:**

```bash
# macOS/Linux with plutil
plutil -replace CFBundleShortVersionString -string "1.3.0" ios/Runner/Info.plist
plutil -replace CFBundleVersion -string "42" ios/Runner/Info.plist

# Or with PlistBuddy
/usr/libexec/PlistBuddy -c "Set :CFBundleShortVersionString 1.3.0" ios/Runner/Info.plist
/usr/libexec/PlistBuddy -c "Set :CFBundleVersion 42" ios/Runner/Info.plist
```

#### Android (android/app/build.gradle)

```groovy
android {
    defaultConfig {
        applicationId "com.example.myapp"
        minSdkVersion 21
        targetSdkVersion 34
        versionCode 42
        versionName "1.3.0"
    }
}
```

**Command:**

```bash
sed -i 's/versionCode [0-9]\+/versionCode 42/' android/app/build.gradle
sed -i 's/versionName "[^"]*"/versionName "1.3.0"/' android/app/build.gradle
```

#### Version constant in code

**Flutter (lib/config/app_config.dart):**

```dart
class AppConfig {
  static const String version = '1.3.0';
  static const int buildNumber = 42;
  static const String releaseDate = '2026-03-09';
  static const String releaseName = 'Spring Update';
}
```

**React Native (src/config/version.ts):**

```typescript
export const APP_VERSION = '1.3.0';
export const BUILD_NUMBER = 42;
export const RELEASE_DATE = '2026-03-09';
```

### Step 8: Update CHANGELOG

```markdown
# Changelog

## [Unreleased]

## [1.3.0] - 2026-03-09

### Added

- Profile edit screen with image picker
- Camera integration for profile photos
- Settings tab in bottom navigation
- User preferences sync with backend

### Fixed

- Crash on logout with null user state
- Infinite loading spinner on network timeout
- List scroll performance issues

### Changed

- Updated dependencies: provider 6.1.1, http 1.2.0

## [1.2.3] - 2026-01-28

### Fixed

- Critical crash on Android 11+ devices
```

### Step 9: Interactive Confirmation

```
╔════════════════════════════════════════════════════════════╗
║  MOBILE RELEASE PREVIEW                                    ║
╠════════════════════════════════════════════════════════════╣
║                                                            ║
║  📱 Platform:   Flutter (iOS + Android)                    ║
║  📦 Version:    1.2.3+41 → 1.3.0+42 (MINOR)                ║
║  🏗️  Build:      41 → 42 (auto-incremented)                ║
║  🌿 Branch:     main                                       ║
║  📅 Date:       2026-03-09 18:30 UTC                       ║
║                                                            ║
║  📊 Changes Since v1.2.3+41:                               ║
║     • 4 New Features                                       ║
║     • 3 Bug Fixes                                          ║
║     • 2 Dependency Updates                                 ║
║     • 0 Breaking Changes                                   ║
║                                                            ║
║  📝 Files to Update:                                       ║
║     ✓ pubspec.yaml (version: 1.3.0+42)                     ║
║     ✓ ios/Runner/Info.plist (iOS version/build)            ║
║     ✓ android/app/build.gradle (Android version/code)      ║
║     ✓ lib/config/app_config.dart (version constant)        ║
║     ✓ CHANGELOG.md (new section added)                     ║
║                                                            ║
║  🏷️  Git Actions:                                          ║
║     ✓ Commit: "chore(release): bump version to 1.3.0+42"  ║
║     ✓ Tag: v1.3.0+42                                       ║
║     ✓ Push: origin/main + tags                             ║
║                                                            ║
║  📲 Store Readiness:                                       ║
║     Ready for App Store Connect (iOS)                      ║
║     Ready for Google Play Console (Android)                ║
║     Build numbers incremented (required)                   ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝

Continue? (Y/e/d/c):
```

### Step 10: Execute Release

```bash
# Stage version file changes
git add pubspec.yaml \
        ios/Runner/Info.plist \
        android/app/build.gradle \
        lib/config/app_config.dart \
        CHANGELOG.md

# Commit
git commit -m "chore(release): bump version to 1.3.0+42

- Updated pubspec.yaml to v1.3.0+42
- Updated iOS bundle version (1.3.0 build 42)
- Updated Android versionName/versionCode (1.3.0/42)
- Updated AppConfig constants
- Generated CHANGELOG for v1.3.0

Release Date: 2026-03-09T18:30:00Z"

# Tag (include build number for mobile)
git tag -a v1.3.0+42 -m "Release v1.3.0+42

## Changes
- 4 new features (screens, camera, navigation)
- 3 bug fixes (crashes, performance)
- 2 dependency updates

Full changelog: https://github.com/org/repo/blob/main/CHANGELOG.md#130---2026-03-09"

# Push
git push origin main
git push origin v1.3.0+42
```

### Step 11: Success Confirmation

```
✅ Mobile Release v1.3.0+42 completed successfully!

📦 Changes Applied:
   ✓ pubspec.yaml updated to v1.3.0+42
   ✓ iOS Info.plist updated (version 1.3.0, build 42)
   ✓ Android build.gradle updated (versionName 1.3.0, versionCode 42)
   ✓ AppConfig.dart version constants updated
   ✓ CHANGELOG.md updated with release notes
   ✓ Git commit created
   ✓ Git tag v1.3.0+42 created
   ✓ Pushed to origin/main
   ✓ Tag pushed to remote

📊 Release Statistics:
   • Version Type: MINOR
   • Version: 1.2.3 → 1.3.0
   • Build: 41 → 42
   • Changes: 4 features, 3 fixes, 2 updates
   • Commits Included: 11

📲 Build & Test:
   Flutter:
     flutter clean
     flutter pub get
     flutter build apk --release
     flutter build ios --release

   React Native:
     cd android && ./gradlew clean
     cd .. && npx react-native run-android --variant=release
     cd ios && pod install
     cd .. && npx react-native run-ios --configuration Release

🍎 iOS Deployment (App Store Connect):
   1. Archive in Xcode:
      Product → Archive
   2. Upload to App Store Connect
   3. Set build 42 for TestFlight/Production
   4. Submit for review

🤖 Android Deployment (Google Play Console):
   1. Build release AAB:
      flutter build appbundle --release
      (or: cd android && ./gradlew bundleRelease)
   2. Upload to Google Play Console
   3. Set version 1.3.0 (42) for Internal/Beta/Production
   4. Submit for review

🔗 Quick Links:
   • Commits: https://github.com/org/repo/compare/v1.2.3+41...v1.3.0+42
   • Tag: https://github.com/org/repo/releases/tag/v1.3.0+42
   • CHANGELOG: https://github.com/org/repo/blob/main/CHANGELOG.md#130

💡 Next Steps:
   1. Test on physical devices (iOS + Android)
   2. Run automated tests: flutter test
   3. Build release builds (APK/AAB, iOS)
   4. Upload to TestFlight / Internal Testing
   5. Test in-app version display
   6. Submit to stores once validated
```

---

## Mobile-Specific Considerations

### Display Version in App

**Flutter:**

```dart
import 'package:my_app/config/app_config.dart';

class SettingsScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ListTile(
      title: Text('App Version'),
      subtitle: Text('${AppConfig.version} (${AppConfig.buildNumber})'),
      // Displays: 1.3.0 (42)
    );
  }
}
```

**React Native:**

```tsx
import { APP_VERSION, BUILD_NUMBER } from './config/version';

export function SettingsScreen() {
  return (
    <View>
      <Text>App Version</Text>
      <Text>
        {APP_VERSION} ({BUILD_NUMBER})
      </Text>
    </View>
  );
}
```

**Using package.json dynamically (React Native):**

```tsx
import { version } from '../package.json';

export function SettingsScreen() {
  return <Text>Version {version}</Text>;
}
```

### Build Number Management

**Strategy 1: Single Incremental** (Recommended)

```
Version 1.0.0 → Build 1
Version 1.0.1 → Build 2
Version 1.1.0 → Build 3
```

**Strategy 2: Date-Based**

```
2026-03-09 → Build 2026030901
2026-03-09 (hotfix) → Build 2026030902
```

**Strategy 3: Platform-Specific**

```
iOS: 42
Android: 84 (2x iOS build number)
```

### Store Submission Checklist

**iOS (App Store Connect):**

- [ ] Build number incremented (required)
- [ ] Version follows SemVer (1.3.0)
- [ ] Archive uploaded via Xcode
- [ ] Screenshots updated (if UI changed)
- [ ] Release notes written
- [ ] Pricing & Availability confirmed
- [ ] Submit for review

**Android (Google Play Console):**

- [ ] versionCode incremented (required)
- [ ] versionName updated (1.3.0)
- [ ] AAB/APK uploaded
- [ ] Release notes in all languages
- [ ] Production/Beta/Internal track selected
- [ ] Rollout percentage set (e.g., 10%, 50%, 100%)
- [ ] Submit for review

---

## Error Handling

### Build Number Not Incremented

```
❌ Error: Build number not incremented

   Current build number: 42
   New build number: 42

   Build numbers MUST increment for store submissions.

   Solution:
   A) Auto-increment to 43
   B) Manually specify: /flow-release 1.3.0+43
   C) Cancel

   Choice: _
```

### Version Mismatch Across Platforms

```
⚠️  Warning: Version mismatch detected

   pubspec.yaml:              1.3.0+42
   ios/Runner/Info.plist:     1.2.3 (build 41)  ← Mismatch
   android/app/build.gradle:  1.3.0 (code 42)

   Solution:
   A) Auto-sync all to 1.3.0+42
   B) Cancel and fix manually

   Choice: _
```

### Invalid Version Format

```
❌ Error: Invalid Flutter version format

   Found: "version: 1.3.0"
   Expected: "version: 1.3.0+42" (version+buildNumber)

   Solution:
   Add build number to pubspec.yaml:
   version: 1.3.0+42
```

---

## Examples

### Example 1: Flutter App Release

```
User: /flow-release

Agent:
  ✓ Detected Flutter project (pubspec.yaml)
  ✓ Current version: 1.2.3+41
  ✓ Found 4 new screens, 1 new feature

  Suggested: 1.3.0+42 (MINOR)

  Files to update:
  • pubspec.yaml
  • ios/Runner/Info.plist
  • android/app/build.gradle
  • lib/config/app_config.dart

  Continue? Y

  ✅ Release v1.3.0+42 completed!
```

### Example 2: React Native Hotfix

```
User: /flow-release --patch

Agent:
  ✓ Detected React Native project
  ✓ Current: 2.4.7 (iOS build 89, Android versionCode 89)
  ✓ Override: 2.4.8+90 (PATCH forced)

  Will update:
  • package.json
  • ios/MyApp/Info.plist
  • android/app/build.gradle

  ✅ Release v2.4.8+90 completed!
```

### Example 3: Expo App

```
User: /flow-release 3.0.0

Agent:
  ✓ Detected Expo project (app.json)
  ✓ Current: 2.9.5 (build 125)
  ✓ Requested: 3.0.0+126 (MAJOR)

  ⚠️  MAJOR version bump - breaking changes expected

  Continue? Y

  Will update:
  • app.json (expo.version, ios.buildNumber, android.versionCode)

  ✅ Release v3.0.0+126 completed!
```

---

## Best Practices

1. **Always increment build numbers** - Required by Apple and Google
2. **Test on real devices** - Simulators don't catch all issues
3. **Run automated tests** - `flutter test` or `npm test`
4. **Check platform-specific code** - Ensure iOS/Android builds succeed
5. **TestFlight/Internal Testing first** - Validate with beta users
6. **Store screenshots updated** - If UI changed significantly
7. **Release notes** - Clear, user-friendly descriptions
8. **Gradual rollout** - Start with 10-20% on Google Play
9. **Monitor crash reports** - Firebase Crashlytics, Sentry
10. **Version display in app** - Help users verify they have latest

---

## Version Display Tips

### In-App Settings Screen

```dart
// Flutter
ListTile(
  leading: Icon(Icons.info),
  title: Text('Version'),
  subtitle: Text('${AppConfig.version} (${AppConfig.buildNumber})'),
  onTap: () {
    // Show changelog dialog
  },
)
```

### About Dialog

```dart
// Flutter
showAboutDialog(
  context: context,
  applicationName: 'My App',
  applicationVersion: '${AppConfig.version} (${AppConfig.buildNumber})',
  applicationLegalese: '© 2026 Company Name',
);
```

### Debug Banner (Development Only)

```dart
// Flutter
MaterialApp(
  debugShowCheckedModeBanner: true,
  home: Banner(
    message: 'v${AppConfig.version}',
    location: BannerLocation.topEnd,
    child: HomeScreen(),
  ),
)
```

---

**BEGIN EXECUTION when user runs `/flow-release` command**
