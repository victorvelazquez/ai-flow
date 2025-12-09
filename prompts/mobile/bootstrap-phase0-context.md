# Phase 0: Context Discovery (Mobile)

**⚡ AUTOMATED ANALYSIS - Minimal User Input Required**

This phase automatically analyzes your existing mobile codebase to pre-populate answers for the bootstrap questionnaire.

---

## 🎯 Objective

Detect the current mobile stack, architecture patterns, and configuration from existing code to:

1. **Skip redundant questions** - Don't ask what can be detected
2. **Validate assumptions** - Confirm detected patterns with user
3. **Save time** - Reduce questionnaire from ~100 min to ~50 min
4. **Maintain accuracy** - User can override any detection

---

## 📋 Detection Layers (Progressive)

### Layer 0: Cache Check (0-2 seconds)

Check if `.ai-flow/cache/mobile-context.json` exists and is fresh (<7 days old).

**If found:**
```json
{
  "platform": "iOS + Android",
  "framework": "React Native",
  "frameworkVersion": "0.72.0",
  "typescript": true,
  "navigation": "React Navigation",
  "stateManagement": "Redux Toolkit",
  "storage": "AsyncStorage",
  "lastAnalyzed": "2025-01-20T10:30:00Z"
}
```

**Action:** Ask user: "Found cached analysis from X days ago. Use it? (Y/n)"

**If yes:** Skip to validation step

**If no or cache doesn't exist:** Proceed to Layer 1

---

### Layer 1: Fast Metadata Scan (10-20 seconds)

**Purpose:** Detect framework, platform, build tool, TypeScript

#### Files to Check

1. **package.json** (REQUIRED)
2. **pubspec.yaml** (Flutter)
3. **Podfile** (iOS - React Native)
4. **build.gradle** (Android)
5. **tsconfig.json** (TypeScript)
6. **app.json / app.config.js** (React Native)

#### Detection Logic

```typescript
// 1. Read package.json or pubspec.yaml
const pkg = await detectPackageFile();

// 2. Detect Mobile Framework
const framework =
  pkg.dependencies?.['react-native'] ? 'React Native' :
  await fs.exists('pubspec.yaml') ? 'Flutter' :
  await fs.exists('ios/') && await fs.exists('android/') ? 'Native (iOS + Android)' :
  await fs.exists('ios/') ? 'Native iOS (Swift)' :
  await fs.exists('android/') ? 'Native Android (Kotlin)' :
  pkg.dependencies?.['@ionic/core'] ? 'Ionic' :
  pkg.dependencies?.['@capacitor/core'] ? 'Capacitor' :
  null;

// 3. Detect Platform Support
const platforms = [];
if (await fs.exists('ios/')) platforms.push('iOS');
if (await fs.exists('android/')) platforms.push('Android');

// 4. Detect Navigation Library
const navigation =
  pkg.dependencies?.['@react-navigation/native'] ? 'React Navigation' :
  pkg.dependencies?.['react-native-navigation'] ? 'React Native Navigation' :
  pkg.dependencies?.['go_router'] ? 'GoRouter' :
  pkg.dependencies?.['auto_route'] ? 'AutoRoute' :
  null;

// 5. Detect State Management
const stateManagement =
  pkg.dependencies?.['@reduxjs/toolkit'] ? 'Redux Toolkit' :
  pkg.dependencies?.zustand ? 'Zustand' :
  pkg.dependencies?.mobx ? 'MobX' :
  pkg.dependencies?.provider ? 'Provider' :
  pkg.dependencies?.['flutter_riverpod'] ? 'Riverpod' :
  pkg.dependencies?.['flutter_bloc'] ? 'Bloc' :
  null;

// 6. Detect Storage Solution
const storage =
  pkg.dependencies?.['@react-native-async-storage/async-storage'] ? 'AsyncStorage' :
  pkg.dependencies?.['react-native-mmkv'] ? 'MMKV' :
  pkg.dependencies?.['@nozbe/watermelondb'] ? 'WatermelonDB' :
  pkg.dependencies?.realm ? 'Realm' :
  pkg.dependencies?.hive ? 'Hive' :
  await fs.exists('ios/DataModel.xcdatamodeld') ? 'Core Data' :
  await fs.exists('android/app/src/main/java/**/RoomDatabase.kt') ? 'Room' :
  null;

// 7. Detect TypeScript/Dart
const typescript = await fs.exists('tsconfig.json');
const dart = await fs.exists('pubspec.yaml');

// 8. Detect Testing Framework
const unitTest =
  pkg.devDependencies?.jest ? 'Jest' :
  pkg.devDependencies?.vitest ? 'Vitest' :
  await fs.exists('test/') && dart ? 'Flutter Test' :
  null;

const e2eTest =
  pkg.devDependencies?.['detox'] ? 'Detox' :
  pkg.devDependencies?.['@maestrohq/cli'] ? 'Maestro' :
  pkg.devDependencies?.appium ? 'Appium' :
  null;
```

#### Layer 1 Output

```
✅ DETECTED:

Platform: iOS + Android
Framework: React Native 0.72.0
TypeScript: Yes
Navigation: React Navigation 6.0.0
State Management: Redux Toolkit 1.9.0
Storage: AsyncStorage 1.19.0
Testing: Jest + Detox

Continue to Layer 2 for structural analysis? (Y/n)
```

---

### Layer 2: Structural Analysis (30-90 seconds)

**Purpose:** Analyze navigation structure, component organization, and architecture patterns

#### Files to Analyze

- **Navigation files:** `src/navigation/**`, `src/routes/**`, `lib/router/**`
- **Screen files:** `src/screens/**`, `src/pages/**`, `lib/presentation/pages/**`
- **Component files:** `src/components/**`, `lib/presentation/widgets/**`
- **Store files:** `src/store/**`, `lib/domain/**`

#### Detection Patterns

```typescript
// 1. Navigation Pattern Detection
const navigationPattern = detectNavigationPattern(srcFiles);

function detectNavigationPattern(files: string[]): string {
  const hasStack = files.some(f => f.includes('Stack') || f.includes('createStackNavigator'));
  const hasTab = files.some(f => f.includes('Tab') || f.includes('createBottomTabNavigator'));
  const hasDrawer = files.some(f => f.includes('Drawer') || f.includes('createDrawerNavigator'));
  
  if (hasTab && hasStack) return 'Tab + Stack Navigation';
  if (hasDrawer && hasStack) return 'Drawer + Stack Navigation';
  if (hasStack) return 'Stack Navigation';
  if (hasTab) return 'Tab Navigation';
  return 'Unknown';
}

// 2. Architecture Pattern
const architecturePattern = detectArchitecture(srcFiles);

function detectArchitecture(files: string[]): string {
  const hasFeatures = files.some(f => f.includes('/features/'));
  const hasDomains = files.some(f => f.includes('/domain/'));
  const hasPresentation = files.some(f => f.includes('/presentation/'));
  const hasClean = files.some(f => f.includes('/data/') && f.includes('/domain/'));
  
  if (hasClean) return 'Clean Architecture';
  if (hasFeatures) return 'Feature-based';
  if (hasDomains) return 'Domain-driven';
  if (hasPresentation) return 'Layered (Presentation/Domain/Data)';
  return 'Flat';
}

// 3. Component Organization
const componentPattern = detectComponentPattern(srcFiles);

function detectComponentPattern(files: string[]): string {
  const hasAtomic = files.some(f =>
    f.includes('/atoms/') || f.includes('/molecules/') || f.includes('/organisms/')
  );
  const hasScreens = files.some(f => f.includes('/screens/'));
  const hasWidgets = files.some(f => f.includes('/widgets/'));
  
  if (hasAtomic) return 'Atomic Design';
  if (hasScreens && hasWidgets) return 'Screens + Widgets';
  if (hasScreens) return 'Screens-based';
  return 'Flat';
}
```

#### Layer 2 Output

```
✅ ARCHITECTURE DETECTED:

Navigation Pattern: Tab + Stack Navigation
  - Bottom tabs: 4 tabs
  - Stack navigators: 8 screens

Architecture: Feature-based
  - features/: 6 features
  - Each feature: screens/, components/, hooks/, store/

Component Pattern: Screens + Components
  - screens/: 12 screens
  - components/: 45 components

Continue to Layer 3 for deep analysis? (Y/n)
```

---

### Layer 3: Selective Deep Analysis (Optional, 60-120 seconds)

**Purpose:** Extract advanced patterns, permissions, and native integrations

**Only proceed if:**
- User confirms (not automatic)
- Project is large (>20 screens)
- Accuracy is critical

#### Advanced Detection

```typescript
// 1. Permissions Detection
const permissions = detectPermissions(srcFiles, platformFiles);

function detectPermissions(srcFiles: string[], platformFiles: string[]): string[] {
  const detected = [];
  
  // Check Info.plist (iOS)
  const infoPlist = platformFiles.find(f => f.includes('Info.plist'));
  if (infoPlist) {
    const content = fs.readFileSync(infoPlist, 'utf-8');
    if (content.includes('NSCameraUsageDescription')) detected.push('Camera');
    if (content.includes('NSLocationWhenInUseUsageDescription')) detected.push('Location');
    if (content.includes('NSPhotoLibraryUsageDescription')) detected.push('Photo Library');
  }
  
  // Check AndroidManifest.xml (Android)
  const manifest = platformFiles.find(f => f.includes('AndroidManifest.xml'));
  if (manifest) {
    const content = fs.readFileSync(manifest, 'utf-8');
    if (content.includes('android.permission.CAMERA')) detected.push('Camera');
    if (content.includes('android.permission.ACCESS_FINE_LOCATION')) detected.push('Location');
  }
  
  // Check code for permission requests
  srcFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf-8');
    if (content.includes('requestPermission') || content.includes('Permissions.')) {
      // Extract permission type from context
    }
  });
  
  return detected;
}

// 2. Native Module Usage
const nativeModules = detectNativeModules(srcFiles);

function detectNativeModules(files: string[]): string[] {
  const modules = [];
  
  files.forEach(file => {
    const content = fs.readFileSync(file, 'utf-8');
    if (content.includes('react-native-camera')) modules.push('Camera');
    if (content.includes('@react-native-async-storage')) modules.push('AsyncStorage');
    if (content.includes('react-native-maps')) modules.push('Maps');
    if (content.includes('@react-native-firebase')) modules.push('Firebase');
  });
  
  return modules;
}
```

---

## ✅ Validation & Confirmation

### Present Findings

After detection, show user a summary and ask for confirmation:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔍 MOBILE STACK DETECTED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Platform: iOS + Android
✅ Framework: React Native 0.72.0
✅ TypeScript: Yes
✅ Navigation: React Navigation 6.0.0 (Tab + Stack)
✅ State Management: Redux Toolkit 1.9.0
✅ Storage: AsyncStorage 1.19.0
✅ Architecture: Feature-based
✅ Testing: Jest + Detox

Is this correct? (Y/n)
```

### If User Says "Yes"

```
✅ Great! I'll use these detected values.

I'll still ask you questions for:
  - Business requirements (Phase 1)
  - Specific conventions and preferences
  - Permissions and native features
  - Store deployment strategy

This will reduce the questionnaire from ~100 min to ~50 min.

Proceed to Phase 1? (Y/n)
```

---

## 💾 Cache Storage

Save detected context for future use:

```json
{
  "platform": "iOS + Android",
  "framework": "React Native",
  "frameworkVersion": "0.72.0",
  "typescript": true,
  "navigation": "React Navigation",
  "navigationVersion": "6.0.0",
  "navigationPattern": "Tab + Stack",
  "stateManagement": "Redux Toolkit",
  "storage": "AsyncStorage",
  "architecture": "Feature-based",
  "componentPattern": "Screens + Components",
  "permissions": ["Camera", "Location"],
  "nativeModules": ["Camera", "Maps", "Firebase"],
  "unitTest": "Jest",
  "e2eTest": "Detox",
  "lastAnalyzed": "2025-01-20T10:30:00Z",
  "projectPath": "/Users/username/my-mobile-app"
}
```

**Cache invalidation:** 7 days or when package.json/pubspec.yaml is modified

---

## 🚀 Next Steps

After Phase 0 completes:

```
✅ Context analysis complete!

Next: Proceed to Phase 1 (Platform & Framework Selection)

Read: .ai-flow/prompts/mobile/bootstrap-phase1-platform.md
```

---

**Last Updated:** 2025-01-XX

**Version:** 1.4.0

