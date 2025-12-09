# Phase 4: Permissions & Native Features

**Duration:** 15-20 minutes
**Questions:** ~10 questions
**Output:** docs/permissions.md, docs/native-features.md, parts of ai-instructions.md

---

## 🎯 Objective

Define what **native features and permissions** your app will use:

1. What permissions will you request?
2. What native features will you integrate?
3. How will you handle permission requests?
4. What third-party SDKs will you use?

---

## 📋 Questions

### Question 4.1: Camera Permission

**Will your app use the camera?**

A) ⭐ **Yes - Photo Capture**
   - Take photos within app
   - Requires: Camera permission
   - Best for: Social apps, productivity apps

B) **Yes - Video Recording**
   - Record videos
   - Requires: Camera + Microphone permissions
   - Best for: Video apps, social media

C) **Yes - QR Code Scanning**
   - Scan QR codes
   - Requires: Camera permission
   - Best for: Payment apps, utilities

D) **No Camera Access**
   - No camera features
   - Best for: Most apps

**Your answer:**

**If camera selected, ask:**
- What library will you use?
  - React Native: react-native-camera, react-native-vision-camera
  - Flutter: camera, image_picker
  - Native: AVFoundation (iOS), Camera2 (Android)

---

### Question 4.2: Location Permission

**Will your app use location services?**

A) ⭐ **Yes - When In Use** (Recommended)
   - Location only when app is active
   - Requires: Location When In Use permission
   - Best for: Most location-based apps

B) **Yes - Always**
   - Location even when app is backgrounded
   - Requires: Always permission (harder to get approved)
   - Best for: Navigation, fitness tracking

C) **Yes - Approximate Location**
   - Approximate location only (less privacy-invasive)
   - Best for: Location-based content

D) **No Location Access**
   - No location features
   - Best for: Most apps

**Your answer:**

**If location selected, ask:**
- What library will you use?
  - React Native: @react-native-community/geolocation, react-native-maps
  - Flutter: geolocator, google_maps_flutter
  - Native: CoreLocation (iOS), Location Services (Android)

---

### Question 4.3: Push Notifications

**Will your app send push notifications?**

A) ⭐ **Yes - User Notifications** (Recommended)
   - Notify users of important events
   - Requires: Notification permission
   - Best for: Most apps

B) **Yes - Background Notifications**
   - Notify even when app is closed
   - Requires: Background modes
   - Best for: Real-time apps

C) **No Push Notifications**
   - No notifications
   - Best for: Simple apps, privacy-focused apps

**Your answer:**

**If notifications selected, ask:**
- What service will you use?
  - Firebase Cloud Messaging (FCM)
  - OneSignal
  - Pusher
  - Custom backend

---

### Question 4.4: Photo Library Access

**Will your app access the photo library?**

A) ⭐ **Yes - Read Only**
   - Select photos from library
   - Requires: Photo Library Read permission
   - Best for: Most apps that need photos

B) **Yes - Read & Write**
   - Save photos to library
   - Requires: Photo Library Write permission
   - Best for: Photo editing apps

C) **No Photo Library Access**
   - No photo library features
   - Best for: Apps that don't need photos

**Your answer:**

---

### Question 4.5: Contacts Access

**Will your app access contacts?**

A) ⭐ **Yes - Read Contacts**
   - Import contacts
   - Requires: Contacts Read permission
   - Best for: Social apps, messaging apps

B) **Yes - Read & Write**
   - Add contacts
   - Requires: Contacts Write permission
   - Best for: Contact management apps

C) **No Contacts Access**
   - No contact features
   - Best for: Most apps

**Your answer:**

---

### Question 4.6: Biometric Authentication

**Will your app use biometric authentication?**

A) ⭐ **Yes - Face ID / Touch ID / Fingerprint** (Recommended)
   - Secure authentication
   - Requires: Face ID / Touch ID permission
   - Best for: Secure apps, banking apps

B) **No Biometric Auth**
   - Traditional password/PIN only
   - Best for: Simple apps

**Your answer:**

**If biometric selected, ask:**
- What library will you use?
  - React Native: react-native-biometrics, react-native-touch-id
  - Flutter: local_auth
  - Native: LocalAuthentication (iOS), BiometricPrompt (Android)

---

### Question 4.7: File System Access

**Will your app access the file system?**

A) ⭐ **Yes - Document Picker**
   - Let users select files
   - Requires: File access permission
   - Best for: Document apps, file managers

B) **Yes - File Storage**
   - Save files to device
   - Requires: Storage permission
   - Best for: File management apps

C) **No File System Access**
   - No file features
   - Best for: Most apps

**Your answer:**

---

### Question 4.8: Microphone Access

**Will your app use the microphone?**

A) ⭐ **Yes - Audio Recording**
   - Record audio
   - Requires: Microphone permission
   - Best for: Voice notes, recording apps

B) **Yes - Voice Calls**
   - Make voice/video calls
   - Requires: Microphone permission
   - Best for: Communication apps

C) **No Microphone Access**
   - No audio recording
   - Best for: Most apps

**Your answer:**

---

### Question 4.9: Third-Party SDKs

**What third-party SDKs will you integrate?**

**Analytics:**
- A) Firebase Analytics
- B) Mixpanel
- C) Amplitude
- D) None

**Crash Reporting:**
- A) Firebase Crashlytics
- B) Sentry
- C) Bugsnag
- D) None

**Authentication:**
- A) Firebase Auth
- B) Auth0
- C) AWS Cognito
- D) Custom backend

**Maps:**
- A) Google Maps
- B) Mapbox
- C) Apple Maps (iOS only)
- D) None

**Payments:**
- A) Stripe
- B) PayPal
- C) Apple Pay / Google Pay
- D) None

**Social Login:**
- A) Firebase Auth (Google, Facebook, Apple)
- B) Auth0 Social Connections
- C) Custom OAuth
- D) None

**Your answer:** (Select all that apply)

---

### Question 4.10: Permission Request Strategy

**How will you request permissions?**

A) ⭐ **Just-In-Time** (Recommended)
   - Request when feature is needed
   - Explain why permission is needed
   - Best for: Better user experience

B) **On First Launch**
   - Request all permissions upfront
   - Less ideal (can overwhelm users)
   - Best for: Apps that need all permissions

C) **Progressive**
   - Request permissions as features are discovered
   - Best for: Apps with optional features

**Your answer:**

---

### Question 4.11: Permission Denial Handling

**How will you handle denied permissions?**

A) ⭐ **Graceful Degradation** (Recommended)
   - App works without permission
   - Show alternative options
   - Best for: Better UX

B) **Show Settings Prompt**
   - Guide user to enable in settings
   - Best for: Critical permissions

C) **Block Feature**
   - Feature unavailable if permission denied
   - Best for: Core features

**Your answer:**

---

## ✅ Phase 4 Completion

After answering all questions, summarize:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Phase 4 Complete: Permissions & Native Features
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Selected Permissions:
- Camera: Photo capture (react-native-vision-camera)
- Location: When in use (@react-native-community/geolocation)
- Push Notifications: Yes (Firebase Cloud Messaging)
- Photo Library: Read only
- Biometric Auth: Face ID / Touch ID

Third-Party SDKs:
- Analytics: Firebase Analytics
- Crash Reporting: Firebase Crashlytics
- Maps: Google Maps
- Authentication: Firebase Auth

Permission Strategy: Just-In-Time requests with graceful degradation

Proceed to Phase 5 (Code Standards)? (Y/n)
```

---

## 📝 Generated Documents

After Phase 4, generate/update:

- `docs/permissions.md` - Permission handling guide
- `docs/native-features.md` - Native features integration guide
- `ai-instructions.md` - Add permission and native feature rules

---

**Next Phase:** Phase 5 - Code Standards

Read: `.ai-flow/prompts/mobile/bootstrap-phase5-standards.md`

---

**Last Updated:** 2025-01-XX

**Version:** 1.4.0

