## PHASE 4: Data & Storage (15-20 min)

> **Order for this phase:** 4.1 → 4.2 → 4.3 → 4.4 → 4.5 → 4.6

### Objective

Define data persistence, database strategy, and file handling for desktop applications.

---

## 4.1 Data Storage Strategy

```
How will your application store data?

A) 📁 File-based - No database
   - JSON files
   - XML files
   - Properties files
   - Binary serialization
   - Best for: Simple apps, configuration

B) 🗄️ Embedded Database - Local DB
   - H2 Database (Java pure, fast)
   - Apache Derby (Java pure, robust)
   - SQLite (C-based, widely used)
   - HSQLDB (Java pure, SQL compliant)
   - Best for: Structured data, queries

C) 🏢 Client-Server Database - External DB
   - MySQL
   - PostgreSQL
   - Oracle
   - SQL Server
   - Best for: Multi-user, shared data

D) ☁️ Hybrid - Local + Cloud
   - Local embedded DB for offline
   - Sync with cloud when online
   - Best for: Offline-first apps

E) 🔐 Secure Storage - Sensitive data
   - Keychain (macOS)
   - Credential Manager (Windows)
   - Secret Service (Linux)
   - Encrypted files

Your primary storage: __
Your secondary storage: __
```

---

## 4.2 Database Configuration

**For Embedded Database (H2/Derby/SQLite):**

```
Database location:
A) User home directory - ~/.myapp/database.db
B) App data directory - AppData/Roaming/MyApp/ (Windows)
C) Application bundle - Resources/ (not recommended for writes)
D) Custom location - User-specified

Your choice: __

Connection mode:
A) Embedded - Runs in-process, single user
B) Server mode - Separate process, multi-user
C) Mixed mode - Both embedded and server

Your choice: __

Schema management:
A) Auto-generate - JPA @Entity annotations
B) Manual SQL scripts - schema.sql, data.sql
C) Migration tool - Flyway, Liquibase
D) No schema - NoSQL approach

Your choice: __
```

**For Client-Server Database:**

```
Connection pooling:
A) HikariCP - Fast, modern (recommended)
B) C3P0 - Mature, widely used
C) Apache DBCP - Apache Commons
D) None - Direct connections

Your choice: __

Connection parameters:
- Host: localhost or remote
- Port: [3306, 5432, etc.]
- Database name: __
- Max connections: __ (10-20 for desktop)
- Timeout: __ seconds
```

---

## 4.3 ORM/Data Access

```
How will you access the database?

A) 🏆 JPA + Hibernate - Full ORM framework
   - Entity mapping with @Entity
   - JPQL queries
   - Automatic CRUD
   - Best for: Complex domain models

B) 🗄️ JPA + EclipseLink - Alternative ORM
   - JPA standard implementation
   - Good performance
   - NetBeans default

C) ⚡ JDBC (raw) - Direct SQL
   - PreparedStatement
   - ResultSet
   - Full control
   - Best for: Simple apps, performance

D) 🔧 jOOQ - Type-safe SQL
   - Code generation from schema
   - Type-safe queries
   - SQL-first approach

E) 🚀 Spring Data JPA - Repository pattern
   - Interface-based repositories
   - Query derivation
   - Best for: Spring-based apps

F) 📋 MyBatis - SQL mapping
   - XML or annotation-based
   - SQL control + object mapping

Your choice: __
```

---

## 4.4 Entity Design

```
List your main data entities:

For each entity, specify:
- Name: e.g., User, Project, Task
- Attributes: id, name, createdDate, etc.
- Relationships: One-to-Many, Many-to-One, Many-to-Many
- Constraints: NOT NULL, UNIQUE, foreign keys

Example:

**Entity: User**
- id: Long (Primary Key, Auto-increment)
- username: String (UNIQUE, NOT NULL)
- email: String (UNIQUE, NOT NULL)
- createdDate: LocalDateTime (NOT NULL)
- projects: List<Project> (One-to-Many)

**Entity: Project**
- id: Long (Primary Key, Auto-increment)
- name: String (NOT NULL)
- description: String
- owner: User (Many-to-One)
- tasks: List<Task> (One-to-Many)

**Entity: Task**
- id: Long (Primary Key, Auto-increment)
- title: String (NOT NULL)
- completed: Boolean (default: false)
- project: Project (Many-to-One)

Your entities:
1.
2.
3.
...
```

---

## 4.5 File Handling

```
Does your application work with files?

A) ✅ Yes - Primary function (editor, viewer, converter)
B) 🔄 Yes - Import/Export functionality
C) ❌ No - Data-only, no file operations

If yes, specify:

**File Types:**
- Supported formats: .txt, .pdf, .xlsx, .json, etc.
- Binary or text?
- Custom format?

**File Operations:**
A) 📂 Open file - Read and display
B) 💾 Save file - Write to disk
C) 📝 Save As - Save with new name
D) 📥 Import - Load data from file
E) 📤 Export - Export data to file
F) 📋 Recent files - MRU list
G) 🔄 Auto-save - Periodic save
H) 🔐 Encryption - Encrypt sensitive files

**File Picker:**
- Native file chooser (JFileChooser, FileChooser, FileDialog)
- Custom file browser?
- Drag & drop support?

**File Associations:**
- Register app for file types? (.myapp files)
- Open files from OS?

Your file handling: __
```

---

## 4.6 Backup & Migration

```
Data backup and migration strategy:

**Backup:**
A) ✅ Automatic backup - Before app closes, periodic
B) 🔄 Manual backup - User-initiated
C) ☁️ Cloud backup - Sync to cloud
D) ❌ No backup - User responsible

Backup location:
- Same directory as database
- User documents folder
- Cloud storage (Dropbox, Google Drive)

**Migration:**
When you release new versions with schema changes:

A) ✅ Automatic migration - Flyway/Liquibase
   - Version-based SQL scripts
   - Rollback support
   - Best for: Production apps

B) 🔄 Manual migration - SQL scripts
   - User runs scripts manually
   - Documentation provided

C) 🏗️ Schema recreation - Drop and recreate
   - Data loss (development only)

Your choices: __
```

---

### Phase 4 Output

```
📋 PHASE 4 SUMMARY:

Primary Storage: [File-based/Embedded DB/Client-Server/Hybrid]
Database: [H2/Derby/SQLite/MySQL/PostgreSQL]
Database Location: [User home/App data]
ORM/Data Access: [JPA+Hibernate/JDBC/jOOQ]
Entities: [List of entities with relationships]
File Handling: [Yes/No, formats, operations]
Backup Strategy: [Automatic/Manual/Cloud]
Migration: [Flyway/Liquibase/Manual]

Is this correct? (Yes/No)
```

---

### 📄 Update Documents

Update `docs/ARCHITECTURE.md` with:

- Data storage architecture
- Database schema (ERD diagram)
- Entity-relationship model
- File handling flow
- Backup and migration strategy

Update `docs/DATABASE.md` (if applicable):

- Schema definition
- Entity descriptions
- SQL scripts
- Migration procedures

---

**Next Phase:** Phase 5 - Code Standards (10-15 min)

Read: `.ai-flow/prompts/desktop/flow-build-phase-5.md`

---

**Last Updated:** 2025-02-03
**Version:** 1.0.0
