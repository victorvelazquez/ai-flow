## PHASE 6: Testing (10-15 min)

> **Order for this phase:** 6.1 → 6.2 → 6.3 → 6.4 → 6.5

### Objective

Define the testing strategy for desktop applications, including unit, integration, and UI tests.

---

## 6.1 Testing Levels

```
Which testing levels will you implement?

A) 🧪 Unit Tests - Test individual methods/classes
   - Framework: JUnit 5 (recommended) or TestNG
   - Mocking: Mockito, EasyMock
   - Coverage goal: 70%+
   - Fast, isolated, repeatable

B) 🔗 Integration Tests - Test component interactions
   - Database tests (H2 in-memory)
   - File I/O tests
   - Service integration tests
   - Coverage goal: 50%+

C) 🖥️ UI Tests - Test user interface
   - Swing: AssertJ-Swing, Fest-Swing
   - JavaFX: TestFX
   - SWT: SWTBot
   - Coverage goal: 30%+ (critical flows)

D) 🏁 End-to-End Tests - Full application flow
   - User scenarios
   - Test from UI to database
   - Manual or automated

E) 🚀 Performance Tests - Measure performance
   - Startup time
   - Memory usage
   - Response time
   - JMH benchmarks

Your testing levels: __
```

---

## 6.2 Unit Testing Strategy

```
Unit testing approach:

**Test Framework:**
A) ⭐ JUnit 5 (Jupiter) - Modern, recommended
   - @Test, @BeforeEach, @AfterEach
   - Assertions, assumptions
   - Parameterized tests

B) TestNG - Alternative framework
   - More features, more complex
   - Popular in enterprise

Your choice: __

**Mocking Framework:**
A) ⭐ Mockito - Most popular
   - Mock objects, verify interactions
   - @Mock, @InjectMocks annotations

B) EasyMock - Alternative
C) PowerMock - For static methods (use sparingly)
D) No mocking - Real objects only

Your choice: __

**Assertion Library:**
A) JUnit Assertions - Built-in
B) ⭐ AssertJ - Fluent assertions (recommended)
   - assertThat(user.getName()).isEqualTo("John")
C) Hamcrest - Matcher-based assertions

Your choice: __

**Test Organization:**
- Test class naming: [ClassName]Test or Test[ClassName]?
  A) UserServiceTest (suffix)
  B) TestUserService (prefix)

- Test package: Same as source or separate?
  A) Same package as source (src/test/java/com/company/app/service/)
  B) Separate test package (src/test/java/test/service/)

Your choices: __
```

---

## 6.3 UI Testing Strategy

**For Swing:**

```
UI testing for Swing applications:

**Framework:**
A) ⭐ AssertJ-Swing - Fluent API (recommended)
   - FrameFixture, DialogFixture
   - Component lookups
   - User interaction simulation

B) Fest-Swing - Legacy (predecessor of AssertJ-Swing)
C) Jemmy - NetBeans testing library
D) Manual testing only

Your choice: __

**Test Approach:**
A) Headless testing - Run without display (CI/CD)
   - System.setProperty("java.awt.headless", "true")
B) Full UI testing - Real display required
C) Hybrid - Headless for CI, full for local

**Test Coverage:**
- Critical flows: Login, main operations
- Error scenarios: Invalid input, exceptions
- Edge cases: Empty data, boundaries
```

**For JavaFX:**

```
UI testing for JavaFX applications:

**Framework:**
A) ⭐ TestFX - Official JavaFX testing (recommended)
   - FxRobot for interactions
   - Lookup API for components
   - Headless mode support

Your choice: __

**Test Approach:**
A) Headless testing - Monocle headless platform
   - System.setProperty("testfx.robot", "glass")
   - System.setProperty("testfx.headless", "true")
B) Full UI testing - Real display

**Test Coverage:**
- Scene graph testing
- Property binding validation
- CSS styling tests
```

**For SWT:**

```
UI testing for SWT applications:

**Framework:**
A) ⭐ SWTBot - Eclipse SWT testing (recommended)
   - Widget finders
   - User action simulation
   - Eclipse integration

Your choice: __

**Test Approach:**
- Eclipse workbench testing
- Plugin testing
- RCP application testing
```

---

## 6.4 Test Data & Fixtures

````
How will you manage test data?

**Test Database:**
A) ⭐ H2 in-memory - Fast, isolated (recommended)
   - jdbc:h2:mem:testdb
   - Reset between tests

B) Test database instance - Separate test DB
C) Docker containers - Testcontainers
D) No database - Mock DAO layer

Your choice: __

**Test Data:**
A) ✅ In-code test data - Small datasets
   ```java
   User user = new User("John", "john@example.com");
````

B) ✅ Test fixtures - Shared setup

```java
@BeforeEach
void setUp() {
    testData = createTestData();
}
```

C) ✅ External files - JSON, CSV, SQL

- src/test/resources/test-data.json

D) ✅ Builders/Factories - Fluent test data creation

```java
User user = UserBuilder.aUser()
                .withName("John")
                .withEmail("john@example.com")
                .build();
```

Your choices: \_\_

```

---

## 6.5 CI/CD Integration

```

Will you run tests in CI/CD?

A) ✅ Yes - Automated testing on commit

- GitHub Actions
- GitLab CI
- Jenkins
- Travis CI

B) ❌ No - Manual testing only

If yes, specify:

**Build Tool:**
A) Maven - mvn test
B) Gradle - gradle test
C) Ant - ant test

**Test Reports:**
A) ✅ JUnit XML reports
B) ✅ HTML reports (Surefire, Gradle)
C) ✅ Code coverage reports (JaCoCo)
D) ✅ SonarQube integration

**Headless Mode:**

- Run UI tests headless in CI?
  A) ✅ Yes - Xvfb (Linux), Headless mode
  B) ❌ No - Skip UI tests in CI

**Fail on:**
A) ✅ Test failures
B) ✅ Coverage below threshold (e.g., 70%)
C) ✅ Static analysis violations

Your choices: \_\_

```

---

### Phase 6 Output

```

📋 PHASE 6 SUMMARY:

Testing Levels:

- Unit Tests: JUnit 5 + Mockito (70% coverage)
- Integration Tests: H2 in-memory DB (50% coverage)
- UI Tests: [AssertJ-Swing/TestFX/SWTBot] (30% coverage)

Test Framework: [JUnit 5]
Mocking: [Mockito]
Assertions: [AssertJ]
UI Testing: [AssertJ-Swing / TestFX / SWTBot]
Test Database: [H2 in-memory]
Test Data: [Builders, in-code, fixtures]
CI/CD: [Yes - GitHub Actions / No]
Build Tool: [Maven / Gradle / Ant]

Is this correct? (Yes/No)

````

---

### 📄 Generate Test Configuration

**Generate Maven Surefire configuration:**
```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-surefire-plugin</artifactId>
    <version>3.0.0</version>
</plugin>
````

**Generate JaCoCo configuration:**

```xml
<plugin>
    <groupId>org.jacoco</groupId>
    <artifactId>jacoco-maven-plugin</artifactId>
    <version>0.8.10</version>
    <executions>
        <execution>
            <goals>
                <goal>prepare-agent</goal>
            </goals>
        </execution>
        <execution>
            <id>report</id>
            <phase>test</phase>
            <goals>
                <goal>report</goal>
            </goals>
        </execution>
    </executions>
</plugin>
```

**Update `docs/DEVELOPMENT.md`:**

- Testing strategy
- How to run tests
- Test coverage goals
- CI/CD integration

---

**Next Phase:** Phase 7 - Packaging & Deployment (15-20 min)

Read: `.ai-flow/prompts/desktop/flow-build-phase-7.md`

---

**Last Updated:** 2025-02-03
**Version:** 1.0.0
