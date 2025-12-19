# Phase 1: Platform & Framework Selection

**Duration:** 20-25 minutes
**Questions:** ~17 questions
**Output:** project-brief.md, parts of AGENT.md, parts of ai-instructions.md
---
## 🎯 Objective

Determine the **business goal and technical foundation** for your mobile application:

1. What is the core goal and purpose of the project?
2. What platforms will you target?
3. What framework will you use?
4. What minimum OS versions will you support?
5. What development tools and languages?
---
## 📋 Questions

### Question 1.1: Project Name & Description (with Smart Refinement)

> **🧠 Intelligent Refinement System**: This question detects vague descriptions and guides the developer to enrich them. It only asks what's missing and responds in the developer's language.

```
What is the project name?

Provide an initial description of your project.
(Don't worry about perfection - we'll refine it together if needed!)

Example: "A native iOS app for tracking wildlife sightings in the Amazon"
```

**🔍 AI Internal: Ambiguity Analysis**

After receiving the description, silently analyze for these criteria:

| Criterion | Check For | Score +1 if present |
|-----------|-----------|---------------------|
| **WHO** | Specific user type mentioned (not just "users") | "tourists", "researchers", "drivers" |
| **WHAT** | Specific action/function (not just "app", "system") | "scan barcodes", "record audio", "track GPS" |
| **WHY** | Purpose or value mentioned | "to protect species", "to optimize routes" |
| **DOMAIN** | Industry/vertical indicated | "environmental", "logistics", "social" |
| **DETAIL** | Description has 10+ meaningful words | Not counting articles |

**Scoring Rules:**
- Score 4-5: ✅ Accept immediately → Proceed to 1.2
- Score 0-3: ⚠️ Enter refinement loop → Ask ONLY missing criteria

---

**🔄 Conditional Refinement Loop (only if score < 4)**

> **CRITICAL**: Only ask about criteria that are MISSING. Do NOT repeat questions already answered. Respond in the SAME LANGUAGE the developer used.

```
[LANGUAGE: Match the developer's language]

🔍 I'd like to understand your project better.

Your description: "[original description]"

[ONLY show questions for MISSING criteria:]

[If WHO is missing:]
1️⃣ WHO will use this mobile app?
   A) End consumers (App Store/Play Store)
   B) Internal employees (Enterprise)
   C) Partners/Contractors
   D) Other: __

[If WHAT is missing:]
2️⃣ WHAT is the core mobile action users will perform?
   A) Transactional (Buy/Sell)
   B) Utility (Tools/Monitoring)
   C) Social (Chat/Share)
   D) Media (Photo/Video)
   E) Informational (News/Content)
   F) Other: __

[If WHY is missing:]
3️⃣ WHY is this mobile project needed?
   A) New product launch
   B) Companion to web app
   C) Offline-first requirement
   D) Better mobile performance
   E) Other: __

[If DOMAIN is missing:]
4️⃣ What INDUSTRY/DOMAIN is this for?
   A) E-commerce/Retail
   B) Fitness/Health
   C) Finance/Payments
   D) Education/Learning
   E) Social/Community
   F) Business tools (CRM, ERP)
   G) Other: __

Your answers: __
```

---

**✨ Generate Professional Description Options**

After gathering missing info, generate 3 polished versions:

```
[LANGUAGE: Match the developer's language]

✨ Based on your input, here are 3 professional descriptions:

A) Concise (for App Store subtitle):
   "[Generated 1-line description]"

B) Descriptive (for README.md):
   "[Generated 2-3 line description with Mobile focus]"

C) User-centric (for Marketing):
   "[Generated benefit-driven description]"

Which do you prefer? (1-3, or 4 to edit, 5 to start over)
```

**Your choice:**

---

### Question 1.2: Project Overview (Confirmation + Expansion)

> **📌 Smart Skip**: If 1.1 already captured WHO/WHAT/WHY completely, this becomes a quick confirmation.

```
[If 1.1 refinement was complete (score >= 4), show:]

✅ Based on your description, I understand:
   • Users: [WHO from 1.1]
   • Goal: [WHAT from 1.1]
   • Need: [WHY from 1.1]

Is this correct? (Y) Or would you like to add more context? (N)

---

[If 1.1 was NOT refined OR missing elements, ask:]

Briefly describe the core problem this app solves:
- Who are the primary users?
- What is the main benefit?
- Why build a mobile app instead of a web app?
```

**Your answer:**

---
### Question 1.3: Target Platforms

**What platforms will your app support?**

A) ⭐ **iOS Only**

- Apple App Store only
- Swift or React Native iOS
- Best for: Apple-focused products, faster initial launch

B) ⭐ **Android Only**

- Google Play Store only
- Kotlin or React Native Android
- Best for: Android-focused products, wider market reach

C) 🔥 **iOS + Android (Cross-Platform)** (Recommended)

- Both App Store and Play Store
- React Native, Flutter, or Ionic
- Best for: Maximum reach, shared codebase

D) **iOS + Android + Web (Universal)**

- Mobile apps + web version
- React Native Web, Flutter Web, or PWA
- Best for: Multi-platform presence

**Your answer:**
---
### Question 1.4: Mobile Framework

**What framework will you use to build your mobile app?**

**If iOS Only:**

- A) ⭐ **Native iOS (Swift)** - Best performance, full native features
- B) **Native iOS (Objective-C)** - Legacy support
- C) **React Native** - Cross-platform, JavaScript
- D) **Flutter** - Cross-platform, Dart

**If Android Only:**

- A) ⭐ **Native Android (Kotlin)** - Best performance, full native features
- B) **Native Android (Java)** - Legacy support
- C) **React Native** - Cross-platform, JavaScript
- D) **Flutter** - Cross-platform, Dart

**If Cross-Platform:**

- A) ⭐ **React Native** (Recommended)
  - JavaScript/TypeScript
  - Large ecosystem
  - Hot reload
  - Best for: Teams familiar with React

- B) 🔥 **Flutter** (Popular)
  - Dart language
  - Excellent performance
  - Beautiful UI out of the box
  - Best for: Teams wanting native-like performance

- C) **Ionic**
  - Web technologies (HTML/CSS/JS)
  - Capacitor for native features
  - Best for: Web developers transitioning to mobile

- D) **Xamarin / .NET MAUI**
  - C# language
  - Microsoft ecosystem
  - Best for: .NET teams

**Your answer:**

**If React Native selected, ask:**

- What React Native version? (Latest stable recommended)
- Will you use Expo? (Y/n)
  - Expo: Faster development, managed workflow
  - Bare React Native: More control, custom native code

**If Flutter selected, ask:**

- What Flutter version? (Latest stable recommended)
- Will you use Flutter for Web/Desktop too? (Y/n)
---
### Question 1.5: Minimum OS Versions

**What minimum OS versions will you support?**

**For iOS:**

- A) ⭐ **iOS 15+** (Recommended)
  - Covers ~95% of active devices
  - Modern APIs available
  - Best for: Most apps

- B) **iOS 14+**
  - Covers ~98% of active devices
  - Some older APIs needed
  - Best for: Maximum compatibility

- C) **iOS 16+**
  - Covers ~85% of active devices
  - Latest features only
  - Best for: New apps, modern features

- D) **iOS 17+**
  - Covers ~60% of active devices
  - Cutting-edge features
  - Best for: Premium apps, latest tech

**For Android:**

- A) ⭐ **Android 8.0 (API 26)+** (Recommended)
  - Covers ~95% of active devices
  - Modern APIs available
  - Best for: Most apps

- B) **Android 7.0 (API 24)+**
  - Covers ~98% of active devices
  - Some older APIs needed
  - Best for: Maximum compatibility

- C) **Android 10 (API 29)+**
  - Covers ~85% of active devices
  - Latest features only
  - Best for: New apps, modern features

- D) **Android 12 (API 31)+**
  - Covers ~70% of active devices
  - Cutting-edge features
  - Best for: Premium apps, latest tech

**Your answer:**
---
### Question 1.6: Programming Language

**What programming language will you use?**

**If React Native:**

- A) ⭐ **TypeScript** (Recommended)
  - Type safety
  - Better IDE support
  - Industry standard

- B) **JavaScript**
  - Faster initial development
  - Less boilerplate
  - Best for: Small projects, rapid prototyping

**If Flutter:**

- **Dart** (Required - Flutter uses Dart)

**If Native iOS:**

- A) ⭐ **Swift** (Recommended)
  - Modern, safe language
  - Apple's preferred language

- B) **Objective-C**
  - Legacy support
  - Best for: Maintaining existing apps

**If Native Android:**

- A) ⭐ **Kotlin** (Recommended)
  - Modern, concise language
  - Google's preferred language

- B) **Java**
  - Legacy support
  - Best for: Maintaining existing apps

**Your answer:**
---
### Question 1.7: Development Environment

**What development tools will you use?**

**For iOS Development:**

- A) ⭐ **Xcode** (Required for iOS)
  - Version: Latest stable (15.x)
  - Includes iOS Simulator
  - Interface Builder, Instruments

**For Android Development:**

- A) ⭐ **Android Studio** (Required for Android)
  - Version: Latest stable
  - Includes Android Emulator
  - Gradle build system

**For Cross-Platform:**

- **VS Code** or **Android Studio** / **Xcode** (for native modules)

**Additional Tools:**

- **Flipper** - Debugging tool (React Native)
- **React Native Debugger** - Debugging (React Native)
- **Dart DevTools** - Debugging (Flutter)

**Your answer:**
---
### Question 1.8: Package Manager

**What package manager will you use?**

**If React Native:**

- A) ⭐ **npm** (Recommended)
- B) **yarn**
- C) **pnpm**

**If Flutter:**

- **pub** (Flutter's built-in package manager)

**If Native iOS:**

- **CocoaPods** or **Swift Package Manager**

**If Native Android:**

- **Gradle** (built-in)

**Your answer:**
---
### Question 1.9: Build Tools & CI/CD

**What build and deployment tools will you use?**

A) ⭐ **Fastlane** (Recommended for iOS/Android)

- Automates builds, screenshots, deployment
- Works with React Native, Flutter, Native
- Best for: Most projects

B) **Codemagic**

- Cloud-based CI/CD for Flutter/React Native
- Easy setup, good for small teams

C) **GitHub Actions**

- Flexible, free for public repos
- Custom workflows

D) **Bitrise**

- Mobile-focused CI/CD
- Good for complex workflows

E) **Manual Builds**

- Build locally, upload manually
- Best for: Learning, small projects

**Your answer:**
---
### Question 1.10: Code Signing Strategy

**How will you handle code signing?**

**For iOS:**

- A) ⭐ **Automatic Signing** (Recommended)
  - Xcode manages certificates
  - Easier for most developers

- B) **Manual Signing**
  - More control
  - Required for enterprise apps

**For Android:**

- A) ⭐ **Automatic Signing** (Recommended)
  - Gradle manages keystores
  - Easier for most developers

- B) **Manual Signing**
  - More control
  - Required for some enterprise scenarios

**Your answer:**
---
### Question 1.11: App Store Accounts

**Do you have App Store accounts set up?**

**For iOS:**

- A) ✅ **Yes, Apple Developer Account** ($99/year)
- B) ❌ **No, will set up later**
- C) **Enterprise Account** ($299/year)

**For Android:**

- A) ✅ **Yes, Google Play Developer Account** ($25 one-time)
- B) ❌ **No, will set up later**

**Your answer:**
---
### Question 1.12: Beta Testing Strategy

**How will you handle beta testing?**

A) ⭐ **TestFlight (iOS) + Firebase App Distribution (Android)**

- Free, easy to use
- Best for: Most projects

B) **TestFlight (iOS) + Google Play Internal Testing (Android)**

- Official store channels
- Best for: Store-focused testing

C) **HockeyApp / App Center**

- Microsoft's solution
- Good for enterprise

D) **No Beta Testing**

- Direct to production
- Best for: MVPs, internal apps

**Your answer:**
---
### Question 1.13: Analytics & Crash Reporting

**What analytics and crash reporting will you use?**

A) ⭐ **Firebase Analytics + Crashlytics** (Recommended)

- Free, comprehensive
- Works with iOS and Android
- Best for: Most projects

B) **Sentry**

- Excellent error tracking
- Good for: Production apps

C) **Mixpanel / Amplitude**

- Advanced analytics
- Best for: Product analytics focus

D) **No Analytics**

- Privacy-focused
- Best for: Privacy-critical apps

**Your answer:**
---
### Question 1.14: UI/UX Framework

**What UI/UX framework or design system will you use?**

**If React Native:**

- A) ⭐ **React Native Paper** (Material Design)
  - Material Design components
  - Best for: Android-first apps
- B) **React Native Elements**
  - Cross-platform components
  - Best for: Customizable UI
- C) **NativeBase**
  - Component library
  - Best for: Rapid development
- D) **Custom UI Components**
  - Build your own components
  - Best for: Brand-specific design

**If Flutter:**

- A) ⭐ **Material Design 3** (Default)
  - Google's Material Design
  - Best for: Most apps
- B) **Cupertino Design**
  - iOS-style components
  - Best for: iOS-first apps
- C) **Custom Theme**
  - Custom design system
  - Best for: Brand-specific design

**If Native iOS:**

- A) ⭐ **UIKit** (Standard)
- B) **SwiftUI** (Modern)

**If Native Android:**

- A) ⭐ **Material Design Components**
- B) **Jetpack Compose**

**Your answer:**

**If cross-platform, ask:**

- Will you use platform-specific UI? (iOS uses Cupertino, Android uses Material)
- Or unified design across platforms?
---
### Question 1.15: Theme & Dark Mode

**Will your app support dark mode?**

A) ⭐ **Yes - System Theme** (Recommended)

- Follows system dark/light mode
- Best for: Most apps

B) **Yes - Manual Toggle**

- User can toggle dark/light mode
- Best for: Apps with theme customization

C) **No Dark Mode**

- Light mode only
- Best for: Simple apps

**Your answer:**
---
### Question 1.16: Internationalization (i18n)

**Will your app support multiple languages?**

A) ⭐ **Yes - Multiple Languages** (Recommended)

- Support 2+ languages
- Best for: Global apps

B) **Yes - English Only (for now)**

- Single language, but i18n-ready
- Best for: MVPs planning expansion

C) **No Internationalization**

- Single language only
- Best for: Local apps

**Your answer:**

**If multiple languages selected, ask:**

- What i18n library?
  - React Native: react-i18next, react-native-localize
  - Flutter: intl, easy_localization
  - Native: NSLocalizedString (iOS), Resources (Android)
---
### Question 1.17: Image & Asset Management

**How will you handle images and assets?**

A) ⭐ **Local Assets + Remote Images** (Recommended)

- Local assets for icons/logos
- Remote images for content
- Best for: Most apps

B) **All Local Assets**

- All images bundled with app
- Best for: Small apps, offline-first

C) **All Remote Images**

- All images from CDN/server
- Best for: Content-heavy apps

**Your answer:**

**If remote images selected, ask:**

- What image optimization library?
  - React Native: react-native-fast-image, react-native-image-caching
  - Flutter: cached_network_image
  - Native: SDWebImage (iOS), Glide (Android)
---
## ✅ Phase 1 Completion

After answering all questions, summarize:

```
---
✅ Phase 1 Complete: Platform & Framework Selection
---
Project Name: [Answer from 1.1]
Project Description: [Answer from 1.1]
Selected Stack:
- Platforms: [Answer from 1.3]
- Framework: [Answer from 1.4]
- Language: [Answer from 1.6]
- Minimum iOS: [Answer from 1.5]
- Minimum Android: [Answer from 1.5]
- Package Manager: [Answer from 1.8]
- Build Tools: [Answer from 1.9]
- Analytics: [Answer from 1.13]
- UI Framework: [Answer from 1.14]
- Dark Mode: [Answer from 1.15]
- Internationalization: [Answer from 1.16]
- Image Management: [Answer from 1.17]

Proceed to Phase 2 (Navigation & Architecture)? (Y/n)
```
---
## 📝 Generated Documents

After Phase 1, generate/update:

- `project-brief.md` - Add project goal, platforms, and framework information
- `AGENT.md` - Update technical context section
- `ai-instructions.md` - Add framework-specific rules and setup
---
**Next Phase:** Phase 2 - Navigation & Architecture

Read: `.ai-flow/prompts/mobile/flow-build-phase-2-navigation.md`
---
**Last Updated:** 2025-12-XX

**Version:** 1.5.0
