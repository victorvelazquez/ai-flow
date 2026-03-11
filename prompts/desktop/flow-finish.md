---
description: Finalization Workflow - Archive, Generate Descriptions, and Push
---

# AI Flow - Finish Workflow

**YOU ARE AN EXPERT DEVELOPMENT WORKFLOW AUTOMATION SPECIALIST.**

Your mission is to finalize completed work by archiving metrics, generating professional PR/Jira descriptions with AI analysis, and optionally pushing changes when the user executes `/flow-finish`.

**🚀 MODO AGENTE ACTIVADO:** Actúa proactivamente, ejecuta validaciones y commits automáticamente si es necesario. Solicita confirmación solo antes del push final.

---

## Command: `/flow-finish`

### Objective

Automate the complete finalization of development work with:

- **Smart validation** (only if needed - skip if already executed)
- **Smart commit** (only if uncommitted changes exist)
- **Automatic archiving** (metrics to analytics.jsonl)
- **AI-powered descriptions** (professional PR and Jira descriptions with optimized token usage)
- **Optional push** (always ask for confirmation)
- **Cleanup** (remove work folder after success)

---

## Workflow: 5 Steps

### Step 0: Pre-Flight Checks & State Detection

**🔍 CRITICAL VALIDATION** - Detect complete state BEFORE any costly operations:

```bash
# 1. Verify active work exists
if [ ! -d ".ai-flow/work" ] || [ -z "$(ls -A .ai-flow/work)" ]; then
  echo "❌ No hay trabajo activo en .ai-flow/work/"
  echo "💡 Inicia trabajo con: /flow-work"
  exit 1
fi

# 2. Detect work folder (should be only one)
TASK_FOLDER=$(ls .ai-flow/work/ | head -n 1)
TASK_PATH=".ai-flow/work/$TASK_FOLDER"

# 3. Check if already PAUSED
if [ -f "$TASK_PATH/PAUSED" ]; then
  echo "⏸️  Esta tarea está pausada."
  echo "💡 Reanuda con: /flow-work"
  exit 1
fi

# 4. Check if already archived
if [ ! -f "$TASK_PATH/work.md" ]; then
  echo "✅ Esta tarea ya fue archivada."
  exit 0
fi

# 5. Detect current branch
CURRENT_BRANCH=$(git branch --show-current)

# 6. Verify branch protection
PROTECTED_BRANCHES="main|master|develop|development"
if [[ "$CURRENT_BRANCH" =~ ^($PROTECTED_BRANCHES)$ ]]; then
  echo "⚠️  ERROR: No puedes finalizar trabajo en branch protegido: $CURRENT_BRANCH"
  echo "💡 Crea un feature branch primero con: git checkout -b feature/[nombre]"
  exit 1
fi

# 7. Detect uncommitted changes
UNCOMMITTED=$(git status --porcelain)
HAS_UNCOMMITTED_CHANGES=false
if [ -n "$UNCOMMITTED" ]; then
  HAS_UNCOMMITTED_CHANGES=true
fi

# 8. Read validation state (if status.json exists)
if [ -f "$TASK_PATH/status.json" ]; then
  TESTS_EXECUTED=$(jq -r '.validation.tests.executed' "$TASK_PATH/status.json")
  TESTS_PASSED=$(jq -r '.validation.tests.passed' "$TASK_PATH/status.json")
  TESTS_FAILED=$(jq -r '.validation.tests.failed' "$TASK_PATH/status.json")
  LINT_EXECUTED=$(jq -r '.validation.lint.executed' "$TASK_PATH/status.json")
  LAST_VALIDATION_TIMESTAMP=$(jq -r '.validation.lastExecuted' "$TASK_PATH/status.json" 2>/dev/null || echo "0")
else
  TESTS_EXECUTED=false
  TESTS_PASSED=0
  TESTS_FAILED=0
  LINT_EXECUTED=false
  LAST_VALIDATION_TIMESTAMP="0"
fi

# 9. Detect if there are changes since last validation
LAST_COMMIT_TIMESTAMP=$(git log -1 --format=%ct 2>/dev/null || echo "0")
NEEDS_REVALIDATION=false
if [ "$TESTS_EXECUTED" = "true" ] && [ "$LAST_COMMIT_TIMESTAMP" -gt "$LAST_VALIDATION_TIMESTAMP" ]; then
  NEEDS_REVALIDATION=true
fi

# 10. Show current state summary
echo ""
echo "---"
echo "📊 Estado Actual del Trabajo"
echo "---"
echo "📂 Tarea: $TASK_FOLDER"
echo "🌿 Branch: $CURRENT_BRANCH"
echo "📝 Uncommitted changes: $([ "$HAS_UNCOMMITTED_CHANGES" = true ] && echo "⚠️  Sí" || echo "✅ No")"
echo "🧪 Tests ejecutados: $([ "$TESTS_EXECUTED" = "true" ] && echo "✅ Sí ($TESTS_PASSED passed, $TESTS_FAILED failed)" || echo "❌ No")"
echo "🔍 Lint ejecutado: $([ "$LINT_EXECUTED" = "true" ] && echo "✅ Sí" || echo "❌ No")"
echo "♻️  Requiere re-validación: $([ "$NEEDS_REVALIDATION" = true ] && echo "⚠️  Sí" || echo "✅ No")"
echo ""
```

---

### Step 1: Smart Validation

**Only execute `/flow-check` if:**

- `TESTS_EXECUTED == false` (never executed), **OR**
- `NEEDS_REVALIDATION == true` (commits after last validation)

```bash
SHOULD_RUN_CHECK=false

if [ "$TESTS_EXECUTED" = "false" ]; then
  echo "🧪 Tests no ejecutados. Ejecutando /flow-check..."
  SHOULD_RUN_CHECK=true
elif [ "$NEEDS_REVALIDATION" = "true" ]; then
  echo "🔄 Cambios detectados desde última validación. Ejecutando /flow-check..."
  SHOULD_RUN_CHECK=true
else
  echo "✅ Validación previa OK. Saltando /flow-check"
fi

if [ "$SHOULD_RUN_CHECK" = "true" ]; then
  # INVOKE /flow-check HERE
  # Execute the complete /flow-check workflow
  # This will update status.json with results

  # After execution, re-read validation results
  TESTS_PASSED=$(jq -r '.validation.tests.passed' "$TASK_PATH/status.json" 2>/dev/null || echo "0")
  TESTS_FAILED=$(jq -r '.validation.tests.failed' "$TASK_PATH/status.json" 2>/dev/null || echo "0")

  # If tests FAIL → STOP EVERYTHING
  if [ "$TESTS_FAILED" -gt 0 ]; then
    echo ""
    echo "❌ TESTS FALLIDOS"
    echo "---"
    echo "$TESTS_FAILED test(s) fallaron."
    echo ""
    echo "🛑 WORKFLOW DETENIDO"
    echo "💡 Arregla los tests y vuelve a ejecutar /flow-finish"
    exit 1
  fi
fi
```

---

### Step 2: Smart Commit

**Only execute `/flow-commit` if:**

- `HAS_UNCOMMITTED_CHANGES == true`

```bash
if [ "$HAS_UNCOMMITTED_CHANGES" = "true" ]; then
  echo "📝 Cambios sin commitear detectados. Ejecutando /flow-commit..."

  # INVOKE /flow-commit HERE
  # Execute the complete /flow-commit workflow
  # This will update status.json with new commits
else
  echo "✅ No hay cambios sin commitear. Saltando /flow-commit"
fi

# Verify working directory is clean
FINAL_STATUS=$(git status --porcelain)
if [ -n "$FINAL_STATUS" ]; then
  echo "⚠️  Aún hay cambios sin commitear después de /flow-commit"
  echo "$FINAL_STATUS"
  echo ""
  echo "🛑 WORKFLOW DETENIDO"
  echo "💡 Commitea manualmente o revisa los cambios"
  exit 1
fi
```

---

### Step 3: Archive, Cleanup & Commit

**Execute ALWAYS, before asking for push:**

```bash
echo ""
echo "📦 Archivando y limpiando trabajo..."
echo ""

# 1. Extract metadata for analytics
if [ -f "$TASK_PATH/status.json" ]; then
  # COMPLEX: has status.json
  TASK_TYPE=$(jq -r '.type' "$TASK_PATH/status.json")
  TASK_SOURCE=$(jq -r '.source' "$TASK_PATH/status.json")
  CREATED_AT=$(jq -r '.timestamps.created' "$TASK_PATH/status.json")
  COMPLETED_AT=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

  # Calculate duration in minutes
  CREATED_TS=$(date -d "$CREATED_AT" +%s 2>/dev/null || date -j -f "%Y-%m-%dT%H:%M:%SZ" "$CREATED_AT" +%s 2>/dev/null || echo "0")
  COMPLETED_TS=$(date +%s)
  DURATION_MIN=$(( ($COMPLETED_TS - $CREATED_TS) / 60 ))

  TOTAL_TASKS=$(jq -r '.progress.totalTasks' "$TASK_PATH/status.json")
  COMMIT_COUNT=$(jq -r '.git.commits | length' "$TASK_PATH/status.json")
  VALIDATION_PASSED=$( [ "$TESTS_FAILED" -eq 0 ] && echo "true" || echo "false" )
else
  # MEDIUM: only work.md + git
  TASK_TYPE="unknown"
  # Detect type from folder name patterns
  if echo "$TASK_FOLDER" | grep -qiE '^(feature|feat)'; then
    TASK_TYPE="feature"
  elif echo "$TASK_FOLDER" | grep -qiE '^(fix|bugfix)'; then
    TASK_TYPE="fix"
  elif echo "$TASK_FOLDER" | grep -qiE '^refactor'; then
    TASK_TYPE="refactor"
  fi

  TASK_SOURCE="manual"

  # First commit timestamp
  FIRST_COMMIT=$(git log --reverse --format=%ct --all -- "$TASK_PATH/work.md" 2>/dev/null | head -n 1)
  CREATED_AT=$(date -u -d "@$FIRST_COMMIT" +"%Y-%m-%dT%H:%M:%SZ" 2>/dev/null || date -u +"%Y-%m-%dT%H:%M:%SZ")
  COMPLETED_AT=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

  CREATED_TS=$FIRST_COMMIT
  COMPLETED_TS=$(date +%s)
  DURATION_MIN=$(( ($COMPLETED_TS - $CREATED_TS) / 60 ))

  # Count checkboxes in work.md
  TOTAL_TASKS=$(grep -c '^\- \[ \]' "$TASK_PATH/work.md" 2>/dev/null || echo "0")

  # Count commits in branch
  COMMIT_COUNT=$(git log --oneline "$CURRENT_BRANCH" ^main 2>/dev/null | wc -l | tr -d ' ')

  VALIDATION_PASSED="true"
fi

# Extract Story Points from work.md
STORY_POINTS=$(grep -oP '• \K\d+(?= SP)' "$TASK_PATH/work.md" 2>/dev/null | awk '{sum+=$1} END {print sum}')
STORY_POINTS=${STORY_POINTS:-0}

# Calculate hours and minutes
DURATION_HOURS=$(( DURATION_MIN / 60 ))
DURATION_MINS=$(( DURATION_MIN % 60 ))

# Extract new analytics fields (Phase 1)
# 1. User name
USER_NAME=$(git config user.name 2>/dev/null || echo "Unknown")

# 2. Task summary (first line after ## Objective in work.md)
if [ -f "$TASK_PATH/work.md" ]; then
  SUMMARY=$(grep -A 1 "^## Objective" "$TASK_PATH/work.md" | tail -1 | sed 's/^[[:space:]]*//' | cut -c 1-80)
  SUMMARY=${SUMMARY:-"No description"}
else
  SUMMARY="No description"
fi

# 3. Complexity (COMPLEX if status.json exists, otherwise MEDIUM)
if [ -f "$TASK_PATH/status.json" ]; then
  COMPLEXITY="COMPLEX"
else
  COMPLEXITY="MEDIUM"
fi

# 4. Branch name
BRANCH_NAME=$(git branch --show-current 2>/dev/null || echo "unknown")

# 5. Tags (infer from changed files)
CHANGED_PATHS=$(git diff --name-only main..HEAD 2>/dev/null | head -10)
TAGS=()

if echo "$CHANGED_PATHS" | grep -qiE 'controller|route|endpoint|api'; then
  TAGS+=("API")
fi
if echo "$CHANGED_PATHS" | grep -qiE 'service|module|core|backend'; then
  TAGS+=("Backend")
fi
if echo "$CHANGED_PATHS" | grep -qiE 'component|view|form|ui|swing|javafx'; then
  TAGS+=("UI")
fi
if echo "$CHANGED_PATHS" | grep -qiE 'test|spec'; then
  TAGS+=("Testing")
fi
if echo "$CHANGED_PATHS" | grep -qiE 'database|migration|schema|model|dao'; then
  TAGS+=("Database")
fi

# Convert tags array to JSON
if [ ${#TAGS[@]} -eq 0 ]; then
  TAGS_JSON="[]"
else
  TAGS_JSON=$(printf '%s\n' "${TAGS[@]}" | jq -R . | jq -s .)
fi

# 2. Build JSON analytics using jq for proper structure
ANALYTICS_JSON=$(jq -n \
  --arg task "$TASK_FOLDER" \
  --arg type "$TASK_TYPE" \
  --arg src "$TASK_SOURCE" \
  --arg start "$CREATED_AT" \
  --arg end "$COMPLETED_AT" \
  --argjson dur "$DURATION_MIN" \
  --argjson sp "$STORY_POINTS" \
  --argjson tasks "$TOTAL_TASKS" \
  --argjson commits "$COMMIT_COUNT" \
  --argjson valid "$VALIDATION_PASSED" \
  --arg user "$USER_NAME" \
  --arg summary "$SUMMARY" \
  --arg complexity "$COMPLEXITY" \
  --arg branch "$BRANCH_NAME" \
  --argjson tags "$TAGS_JSON" \
  '{task, type, src, start, end, dur, sp, tasks, commits, valid, user, summary, complexity, branch, tags}')

# 3. Append to analytics.jsonl
mkdir -p .ai-flow/archive
echo "$ANALYTICS_JSON" >> .ai-flow/archive/analytics.jsonl

echo "✅ Métricas archivadas en analytics.jsonl"

# 4. Delete work folder
rm -rf "$TASK_PATH"
echo "✅ Carpeta de trabajo eliminada"

# 5. Commit analytics
git add .ai-flow/archive/analytics.jsonl

# Check if there's something to commit
if git diff --cached --quiet; then
  echo "✅ Analytics ya commiteado previamente"
else
  git commit -m "chore: archive $TASK_TYPE task '$TASK_FOLDER' (${DURATION_HOURS}h ${DURATION_MINS}min, ${STORY_POINTS} SP)"
  echo "✅ Analytics commiteado"
fi

echo ""
echo "---"
echo "📊 Resumen del Trabajo Completado"
echo "---"
echo "📂 Tarea: $TASK_FOLDER"
echo "🏷️  Tipo: $TASK_TYPE"
echo "⏱️  Duración: ${DURATION_HOURS}h ${DURATION_MINS}min"
echo "📊 Story Points: $STORY_POINTS SP"
echo "💾 Commits: $COMMIT_COUNT"
echo "🧪 Validación: $([ "$VALIDATION_PASSED" = "true" ] && echo "✅ Passed" || echo "⚠️  With warnings")"
echo "🌿 Branch: $CURRENT_BRANCH"
echo ""
```

---

### Step 4: AI-Powered Description Generation

**Generate professional descriptions using AI with optimized token consumption:**

```bash
echo "---"
echo "📋 Generando descripciones para PR y Jira con IA..."
echo "---"
echo ""

# ============================================
# LAYER 1: Bash Extraction (0 tokens)
# ============================================

# Extract objective from work.md
function extract_objective_from_work_md() {
  if [ ! -f ".ai-flow/work/$TASK_FOLDER/work.md" ]; then
    # Work folder already deleted, try to reconstruct from commits
    git log "$CURRENT_BRANCH" --format="%B" -1 | head -n 3 | tr '\n' ' ' | sed 's/  */ /g'
    return
  fi

  # Extract Objective section
  awk '/^## Objective$/,/^## [^O]/' ".ai-flow/work/$TASK_FOLDER/work.md" 2>/dev/null | \
    grep -v '^##' | sed '/^$/d' | head -n 3 | tr '\n' ' ' | sed 's/  */ /g' | sed 's/^ *//;s/ *$//'
}

# Extract completed tasks
function extract_completed_tasks() {
  if [ ! -f ".ai-flow/work/$TASK_FOLDER/work.md" ]; then
    echo "Tareas completadas (ver commits)"
    return
  fi

  awk '/^## Tasks$/,/^## [^T]/' ".ai-flow/work/$TASK_FOLDER/work.md" 2>/dev/null | \
    grep '^\- \[x\]' | sed 's/^\- \[x\] /✅ /' | head -n 8
}

# Categorize changed files
function categorize_changed_files() {
  local all_files=$(git diff --name-only main..HEAD 2>/dev/null || git diff --name-only --staged)

  local backend_count=$(echo "$all_files" | grep -icE '(controller|service|repository|handler|route|api)' 2>/dev/null || echo 0)
  local frontend_count=$(echo "$all_files" | grep -icE '(component|view|page|screen|widget)' 2>/dev/null || echo 0)
  local db_count=$(echo "$all_files" | grep -icE '(migration|entity|model|schema|\.sql)' 2>/dev/null || echo 0)
  local test_count=$(echo "$all_files" | grep -icE '(test|spec|e2e)' 2>/dev/null || echo 0)
  local doc_count=$(echo "$all_files" | grep -icE '\.md$' 2>/dev/null || echo 0)
  local config_count=$(echo "$all_files" | grep -icE '(\.json|\.yaml|\.yml|\.env|docker|k8s)' 2>/dev/null || echo 0)

  cat <<EOF
- Backend: $backend_count files
- Frontend: $frontend_count files
- Database: $db_count files
- Tests: $test_count files
- Documentation: $doc_count files
- Configuration: $config_count files
EOF
}

# Detect file purpose
function detect_file_purpose() {
  local file=$1

  case "$file" in
    *controller*|*route*|*handler*) echo "API endpoint" ;;
    *service*|*repository*) echo "Business logic" ;;
    *entity*|*model*|*schema*) echo "Data model" ;;
    *test*|*spec*) echo "Tests" ;;
    *migration*) echo "Database migration" ;;
    *.md) echo "Documentation" ;;
    *) echo "Source code" ;;
  esac
}

# Show top 3 files by impact
function show_top_3_files_summary() {
  local top_files=$(git diff --stat main..HEAD 2>/dev/null | sort -rn -k3 | head -n 3 | awk '{print $1}')

  echo "### Most Impacted Files"
  for file in $top_files; do
    local lines_changed=$(git diff --stat main..HEAD -- "$file" 2>/dev/null | tail -n 1 | awk '{print $4}')
    local file_type=$(detect_file_purpose "$file")
    echo "- \`$file\` ($lines_changed lines) - $file_type"
  done
}

# Detect deployment requirements
function detect_deployment_requirements() {
  local changed_files=$(git diff --name-only main..HEAD 2>/dev/null || echo "")

  # Migrations (universal)
  HAS_MIGRATIONS=false
  MIGRATION_FILES=""
  if echo "$changed_files" | grep -qiE '(migration|migrate|schema|upgrade|\.sql$)'; then
    HAS_MIGRATIONS=true
    MIGRATION_FILES=$(echo "$changed_files" | grep -iE '(migration|migrate)' | wc -l | tr -d ' ')
  fi

  # Environment variables (universal)
  NEW_ENV_VARS=""
  ENV_FILES=$(echo "$changed_files" | grep -iE '(\.env\.example|\.env\.template|\.env\.sample|env\.example|env\.sample)')
  if [ -n "$ENV_FILES" ]; then
    NEW_ENV_VARS=$(git diff main..HEAD -- $ENV_FILES 2>/dev/null | grep -E '^\+[A-Z_0-9]+=' | sed 's/^+//' | cut -d'=' -f1 | sort -u)
  fi

  # Dependencies (language-agnostic)
  HAS_NEW_DEPS=false
  INSTALL_CMD=""

  if echo "$changed_files" | grep -qE 'package\.json'; then
    HAS_NEW_DEPS=true
    INSTALL_CMD="npm install"
  elif echo "$changed_files" | grep -qE '(requirements\.txt|pyproject\.toml|Pipfile)'; then
    HAS_NEW_DEPS=true
    INSTALL_CMD="pip install -r requirements.txt"
  elif echo "$changed_files" | grep -qE 'composer\.json'; then
    HAS_NEW_DEPS=true
    INSTALL_CMD="composer install"
  elif echo "$changed_files" | grep -qE 'Gemfile'; then
    HAS_NEW_DEPS=true
    INSTALL_CMD="bundle install"
  elif echo "$changed_files" | grep -qE 'go\.(mod|sum)'; then
    HAS_NEW_DEPS=true
    INSTALL_CMD="go mod download"
  elif echo "$changed_files" | grep -qE 'Cargo\.(toml|lock)'; then
    HAS_NEW_DEPS=true
    INSTALL_CMD="cargo build"
  elif echo "$changed_files" | grep -qE '\.csproj'; then
    HAS_NEW_DEPS=true
    INSTALL_CMD="dotnet restore"
  elif echo "$changed_files" | grep -qE 'pom\.xml'; then
    HAS_NEW_DEPS=true
    INSTALL_CMD="mvn install"
  elif echo "$changed_files" | grep -qE 'build\.gradle'; then
    HAS_NEW_DEPS=true
    INSTALL_CMD="gradle build"
  fi

  # Determine if showing deployment section
  SHOW_DEPLOYMENT_NOTES=false
  if [ "$HAS_MIGRATIONS" = "true" ] || [ -n "$NEW_ENV_VARS" ] || [ "$HAS_NEW_DEPS" = "true" ]; then
    SHOW_DEPLOYMENT_NOTES=true
  fi

  # Export variables
  export HAS_MIGRATIONS
  export MIGRATION_FILES
  export NEW_ENV_VARS
  export HAS_NEW_DEPS
  export INSTALL_CMD
  export SHOW_DEPLOYMENT_NOTES
}

# Detect area of impact
function detect_impact_area() {
  local changed_files=$(git diff --name-only main..HEAD 2>/dev/null || echo "")
  local area="General"
  local module=""

  # Backend API (framework-agnostic)
  if echo "$changed_files" | grep -qiE '(controller|service|repository|handler|route|api|endpoint)'; then
    area="Backend API"

    # Module by subdirectory or filename
    if echo "$changed_files" | grep -qiE '(auth|login|jwt|user|session)'; then
      module="Authentication"
    elif echo "$changed_files" | grep -qiE '(payment|billing|stripe|paypal)'; then
      module="Payments"
    elif echo "$changed_files" | grep -qiE '(notification|email|sms|push)'; then
      module="Notifications"
    elif echo "$changed_files" | grep -qiE '(report|analytics|dashboard)'; then
      module="Analytics"
    fi

  # Frontend (framework-agnostic)
  elif echo "$changed_files" | grep -qiE '(component|view|page|screen|widget|template)'; then
    area="Frontend"

    if echo "$changed_files" | grep -qiE '(auth|login)'; then
      module="Authentication UI"
    elif echo "$changed_files" | grep -qiE '(dashboard|home)'; then
      module="Dashboard"
    elif echo "$changed_files" | grep -qiE '(profile|account|settings)'; then
      module="User Profile"
    fi

  # Mobile (agnostic: React Native, Flutter, Native)
  elif echo "$changed_files" | grep -qiE '(ios/|android/|mobile/|\.swift|\.kt|\.dart)'; then
    area="Mobile"

  # Database (agnostic)
  elif echo "$changed_files" | grep -qiE '(migration|schema|seed|model|entity|\.sql)'; then
    area="Database"
    module="Schema"

  # Infrastructure (agnostic)
  elif echo "$changed_files" | grep -qiE '(docker|k8s|kubernetes|terraform|ansible|\.yaml|\.yml|ci|cd|\.github|\.gitlab)'; then
    area="Infrastructure"
    module="DevOps"

  # Testing (agnostic)
  elif echo "$changed_files" | grep -qiE '(test|spec|\.test\.|\.spec\.|e2e|integration)'; then
    area="Testing"

  # Documentation
  elif echo "$changed_files" | grep -qiE '(\.md$|docs?/|README)'; then
    area="Documentation"
  fi

  # Final format
  if [ -n "$module" ]; then
    echo "$area - $module"
  else
    echo "$area"
  fi
}

# Detect Git platform and generate commit URLs
function get_commit_urls() {
  local remote_url=$(git config --get remote.origin.url 2>/dev/null)

  if [ -z "$remote_url" ]; then
    echo "⚠️  No se detectó remote origin, commits sin links"
    COMMIT_URL_PATTERN=""
    PLATFORM="Unknown"
    return 1
  fi

  # Normalize URL (SSH -> HTTPS)
  local base_url=""

  # GitHub
  if echo "$remote_url" | grep -qE 'github\.com'; then
    base_url=$(echo "$remote_url" | sed -E 's|git@github.com:(.*)|https://github.com/\1|' | sed 's|\.git$||')
    COMMIT_URL_PATTERN="${base_url}/commit/"
    PLATFORM="GitHub"

  # GitLab
  elif echo "$remote_url" | grep -qE 'gitlab\.com'; then
    base_url=$(echo "$remote_url" | sed -E 's|git@gitlab.com:(.*)|https://gitlab.com/\1|' | sed 's|\.git$||')
    COMMIT_URL_PATTERN="${base_url}/-/commit/"
    PLATFORM="GitLab"

  # Bitbucket
  elif echo "$remote_url" | grep -qE 'bitbucket\.org'; then
    base_url=$(echo "$remote_url" | sed -E 's|git@bitbucket.org:(.*)|https://bitbucket.org/\1|' | sed 's|\.git$||')
    COMMIT_URL_PATTERN="${base_url}/commits/"
    PLATFORM="Bitbucket"

  # Azure DevOps
  elif echo "$remote_url" | grep -qE 'dev\.azure\.com'; then
    base_url=$(echo "$remote_url" | sed -E 's|git@ssh\.dev\.azure\.com:v3/(.*)|https://dev.azure.com/\1|' | sed 's|\.git$||')
    COMMIT_URL_PATTERN="${base_url}/commit/"
    PLATFORM="Azure DevOps"

  # GitLab Self-Hosted
  elif echo "$remote_url" | grep -qE 'gitlab'; then
    base_url=$(echo "$remote_url" | sed -E 's|git@([^:]+):(.*)|https://\1/\2|' | sed 's|\.git$||')
    COMMIT_URL_PATTERN="${base_url}/-/commit/"
    PLATFORM="GitLab (Self-Hosted)"

  # GitHub Enterprise
  elif echo "$remote_url" | grep -qE 'github'; then
    base_url=$(echo "$remote_url" | sed -E 's|git@([^:]+):(.*)|https://\1/\2|' | sed 's|\.git$||')
    COMMIT_URL_PATTERN="${base_url}/commit/"
    PLATFORM="GitHub Enterprise"

  else
    echo "⚠️  Plataforma Git no reconocida, commits sin links"
    COMMIT_URL_PATTERN=""
    PLATFORM="Unknown"
    return 1
  fi

  echo "✅ Detectado: $PLATFORM"
  export COMMIT_URL_PATTERN
  export PLATFORM
}

# Generate commit list with links
function generate_commit_links() {
  local max_commits=${1:-5}
  local commits=$(git log main..HEAD --format="%h" -${max_commits} 2>/dev/null)
  local total_commits=$(git log main..HEAD --format="%h" 2>/dev/null | wc -l | tr -d ' ')

  # For summary line (first 5 hashes)
  COMMIT_HASHES_SUMMARY=""
  local count=0

  for hash in $commits; do
    if [ $count -lt 5 ]; then
      if [ -n "$COMMIT_HASHES_SUMMARY" ]; then
        COMMIT_HASHES_SUMMARY+=", "
      fi

      if [ -n "$COMMIT_URL_PATTERN" ]; then
        # Build markdown link in parts to avoid VSCode link detection
        COMMIT_HASHES_SUMMARY+="["
        COMMIT_HASHES_SUMMARY+="$hash"
        COMMIT_HASHES_SUMMARY+="]("
        COMMIT_HASHES_SUMMARY+="$COMMIT_URL_PATTERN"
        COMMIT_HASHES_SUMMARY+="$hash"
        COMMIT_HASHES_SUMMARY+=")"
      else
        COMMIT_HASHES_SUMMARY+='`'"${hash}"'`'
      fi
    fi
    count=$((count + 1))
  done

  # Add indicator if more commits
  if [ $total_commits -gt 5 ]; then
    COMMIT_HASHES_SUMMARY="${COMMIT_HASHES_SUMMARY}, ... (${total_commits} total)"
  elif [ $total_commits -gt 0 ]; then
    COMMIT_HASHES_SUMMARY="${COMMIT_HASHES_SUMMARY} (${total_commits} total)"
  else
    COMMIT_HASHES_SUMMARY="No commits"
  fi

  export COMMIT_HASHES_SUMMARY
  export TOTAL_COMMITS=$total_commits
}

# ============================================
# LAYER 2: Smart Summary (0 tokens)
# ============================================

WORK_OBJECTIVE=$(extract_objective_from_work_md)
WORK_TASKS=$(extract_completed_tasks)
COMMIT_SUBJECTS=$(git log main..HEAD --format="%s" 2>/dev/null | head -10)
COMMIT_BREAKING=$(git log main..HEAD --grep="BREAKING CHANGE:" --format="%s" 2>/dev/null)
HAS_BREAKING_CHANGES=false
if [ -n "$COMMIT_BREAKING" ]; then
  HAS_BREAKING_CHANGES=true
fi

FILES_BY_CATEGORY=$(categorize_changed_files)
TOP_FILES=$(show_top_3_files_summary)
detect_deployment_requirements
IMPACT_AREA=$(detect_impact_area)
get_commit_urls
generate_commit_links 5

# File statistics
FILES_STAT=$(git diff --stat main..HEAD 2>/dev/null | tail -n 1)
FILES_COUNT=$(echo "$FILES_STAT" | awk '{print $1}' | tr -d ' ')
LINES_ADDED=$(echo "$FILES_STAT" | grep -oP '\d+(?= insertion)' 2>/dev/null || echo "0")
LINES_DELETED=$(echo "$FILES_STAT" | grep -oP '\d+(?= deletion)' 2>/dev/null || echo "0")

# Test metrics (from status.json or default)
TESTS_TOTAL="N/A"
TESTS_PASSED="N/A"
TESTS_NEW="0"
COVERAGE="N/A"

if [ -f "$TASK_PATH/status.json" ]; then
  TESTS_PASSED=$(jq -r '.validation.tests.passed // "N/A"' "$TASK_PATH/status.json" 2>/dev/null)
  TESTS_FAILED=$(jq -r '.validation.tests.failed // 0' "$TASK_PATH/status.json" 2>/dev/null)
  TESTS_TOTAL=$((TESTS_PASSED + TESTS_FAILED))
  TESTS_NEW=$(jq -r '.validation.tests.new // 0' "$TASK_PATH/status.json" 2>/dev/null)
  COVERAGE=$(jq -r '.validation.tests.coverage // "N/A"' "$TASK_PATH/status.json" 2>/dev/null)
fi

# Create structured summary for AI
cat > /tmp/ai-context-summary.md <<EOF
# Context Summary for AI Analysis

## Work Overview
Objective: $WORK_OBJECTIVE
Completed Tasks:
$WORK_TASKS
Type: $TASK_TYPE
Story Points: $STORY_POINTS

## Changes Made
Commits (subjects only):
$COMMIT_SUBJECTS

Breaking Changes: $([ "$HAS_BREAKING_CHANGES" = true ] && echo "YES" || echo "NO")

Files Changed by Category:
$FILES_BY_CATEGORY

## Technical Metrics
- Duration: ${DURATION_HOURS}h ${DURATION_MINS}min
- Commits: $TOTAL_COMMITS
- Files: $FILES_COUNT (+$LINES_ADDED/-$LINES_DELETED)
- Tests: $TESTS_PASSED/$TESTS_TOTAL passing ($TESTS_NEW new)
- Coverage: $COVERAGE%
- Branch: $CURRENT_BRANCH

## Deployment Requirements
$([ "$HAS_MIGRATIONS" = "true" ] && echo "Migrations: YES ($MIGRATION_FILES files)" || echo "Migrations: NO")
$([ -n "$NEW_ENV_VARS" ] && echo "Env Vars: $NEW_ENV_VARS" || echo "Env Vars: None")
$([ "$HAS_NEW_DEPS" = "true" ] && echo "Dependencies: YES (install: $INSTALL_CMD)" || echo "Dependencies: NO")

$TOP_FILES
EOF

# ============================================
# LAYER 3: AI Generation (~800-1200 tokens)
# ============================================

echo "🤖 Analizando contexto y generando descripciones profesionales..."
echo ""
```

**NOW INVOKE AI TO GENERATE DESCRIPTIONS:**

Read the structured summary from `/tmp/ai-context-summary.md` (400-600 words) and generate two professional descriptions:

**AI Prompt:**

```markdown
Genera dos descripciones profesionales (PR y Jira) usando el TEMPLATE OFICIAL en `.ai-flow/templates/pr-description.template.md`.

<context-summary>
$(cat /tmp/ai-context-summary.md)
</context-summary>

<template-variables>
## Core Variables
TASK_TYPE=$TASK_TYPE
TASK_TITLE=[Extrae de WORK_OBJECTIVE]
BRANCH_NAME=$CURRENT_BRANCH
STORY_POINTS=$STORY_POINTS
DURATION=${DURATION_HOURS}h ${DURATION_MINS}min
IMPACT_AREA=$IMPACT_AREA
PLATFORM=$PLATFORM
COMMIT_HASHES_SUMMARY=$COMMIT_HASHES_SUMMARY

## Change Type Detection (marca con 'x' el que aplique)

IS_FEATURE=$([ "$TASK_TYPE" = "feature" ] && echo "x" || echo " ")
IS_FIX=$([ "$TASK_TYPE" = "fix" ] && echo "x" || echo " ")
IS_REFACTOR=$([ "$TASK_TYPE" = "refactor" ] && echo "x" || echo " ")
IS_DOCS=$([ "$TASK_TYPE" = "docs" ] && echo "x" || echo " ")
IS_PERF=$([ "$TASK_TYPE" = "perf" ] && echo "x" || echo " ")
IS_TEST=$([ "$TASK_TYPE" = "test" ] && echo "x" || echo " ")

## Context & Solution (genera desde context-summary)

CONTEXT=[Resume el problema/necesidad en 2-3 líneas del WORK_OBJECTIVE]
SOLUTION=[Resume el enfoque técnico en 2-3 líneas analizando COMMIT_SUBJECTS]
MAIN_CHANGES=[Lista 5-7 cambios como bullets, infiere de COMMIT_SUBJECTS]
TEST_STEPS=[Genera 3-5 pasos específicos para probar, infiere de WORK_TASKS y TASK_TYPE]

## Validation Metrics

TESTS_PASSED=$TESTS_PASSED
TESTS_TOTAL=$TESTS_TOTAL
TESTS_NEW=$TESTS_NEW
COVERAGE=$COVERAGE
DOCS_STATUS=$([ -n "$(git diff --name-only main..HEAD | grep '\.md$')" ] && echo "✅ Actualizada" || echo "⚠️ Revisar")

## Code Metrics

TOTAL_COMMITS=$TOTAL_COMMITS
FILES_COUNT=$FILES_COUNT
LINES_ADDED=$LINES_ADDED
LINES_DELETED=$LINES_DELETED

## Breaking Changes

HAS_BREAKING_CHANGES=$HAS_BREAKING_CHANGES
BREAKING_CHANGES_STATUS=$([ "$HAS_BREAKING_CHANGES" = "true" ] && echo "⚠️ SÍ (ver abajo)" || echo "✅ No")
BREAKING_CHANGES_LIST=$([ "$HAS_BREAKING_CHANGES" = "true" ] && echo "$COMMIT_BREAKING" || echo "")
MIGRATION_GUIDE=$([ "$HAS_BREAKING_CHANGES" = "true" ] && echo "[TODO: Usuario debe completar guía de migración]" || echo "")

## Deployment

SHOW_DEPLOYMENT_NOTES=$SHOW_DEPLOYMENT_NOTES
HAS_MIGRATIONS=$HAS_MIGRATIONS
MIGRATION_FILES=$MIGRATION_FILES
NEW_ENV_VARS=$NEW_ENV_VARS
HAS_NEW_DEPS=$HAS_NEW_DEPS
INSTALL_CMD=$INSTALL_CMD
NEW_DEPENDENCIES=[Lista las dependencias nuevas del diff de package.json/requirements.txt/etc]

## Issues & Screenshots

RELATED_ISSUES=[Busca en commits patrones como "Closes #123", "Fixes #456", extráelos]
HAS_ISSUES=$([ -n "$RELATED_ISSUES" ] && echo "true" || echo "false")
HAS_UI_CHANGES=$(echo "$FILES_BY_CATEGORY" | grep -qi 'frontend' && echo "true" || echo "false")
SCREENSHOTS_SECTION=$([ "$HAS_UI_CHANGES" = "true" ] && echo "## 📸 Screenshots\n\n💡 **Recomendación:** Agrega screenshots mostrando los cambios visuales (antes/después)" || echo "")

## Jira-Specific Variables (para comentario compacto)

BUSINESS_SUMMARY=[Genera 1-2 líneas describiendo el VALOR DE NEGOCIO entregado, no detalles técnicos. Perspectiva de usuario/stakeholder]

# PR Link construction (considera que el PR aún NO existe al ejecutar /flow-finish)

PR_LINK=[SIEMPRE usa este formato exacto: "🔗 PR: [PEGAR_LINK_AQUI]"]
PR_CREATION_COMMANDS=[Genera comandos específicos según $PLATFORM:

- GitHub: "gh pr create --title \"$TASK_TYPE: $TASK_FOLDER\" --body-file <(echo \"Ver PR description arriba\")"
- GitLab: "glab mr create --title \"$TASK_TYPE: $TASK_FOLDER\" --description \"Ver PR description arriba\""
- Bitbucket: "bb pr create --title \"$TASK_TYPE: $TASK_FOLDER\""
- Genérico: "Crear PR manualmente en: ${COMMIT_URL_PATTERN%/commit/\*}/pulls"]

DEPLOYMENT_STATUS=[Detecta: "✅ Disponible en dev" si es local, "⏳ Pendiente staging/prod" si no hay push, "🚀 Distribuido" si tag release]
DEPLOYMENT_NOTES_COMPACT=[Si SHOW_DEPLOYMENT_NOTES=true, versión ultra-compacta: "⚠️ Requiere: reinstalación de aplicación" en 1 línea]
QA_NOTES=[SOLO si hay algo crítico que QA debe saber: breaking changes, configuración especial, comportamiento no obvio. Si no hay nada especial, omitir completamente]
BUILD_INSTRUCTIONS=[Genera comando de build específico: "mvn clean install" para Maven, "gradle build" para Gradle, "ant jar" para Ant. Formato: "`mvn clean install` para generar JAR ejecutable"]

# Screenshots (para desktop con cambios UI - formato simple con espacio para adjuntar)

SCREENSHOTS*REMINDER=$([ "$HAS_UI_CHANGES" = "true" ] && echo "\n## 📸 Screenshots\n\n### Before\n[Adjuntar imagen]\n\n### After\n[Adjuntar imagen]\n\n_Incluir: diferentes ventanas/diálogos modificados, diferentes resoluciones si aplica*" || echo "")

## 2026 Standard Sections (Security, Performance, Observability)

SECURITY_IMPACT=[Analiza el código y evalúa:

- Si hay cambios en auth/permisos → "- ✅ Auth/permissions changes reviewed and validated"
- Si hay exposición de datos → "- ✅ Data exposure risk mitigated with validation"
- Si hay nuevas deps → "- ✅ Dependencies scanned (npm audit / snyk)"
- Si hay endpoints públicos → "- ✅ API rate limiting implemented"
- Si no hay riesgos → "- ✅ No security implications"
  Formato: lista de checkboxes con lo que aplica]

PERFORMANCE_IMPACT=[Analiza si el cambio afecta performance:

- Si es feature/refactor con queries → "**Database:** Query optimized with indexes (+50% faster)\n**Load tested:** ✅ 1000 concurrent requests"
- Si es fix de performance → "**Before:** {{métrica}} ms\n**After:** {{métrica}} ms ({{%}} improvement)"
- Si es UI → "**Bundle size:** +5KB (minified+gzip)\n**Lighthouse:** Performance 95/100"
- Si no hay impacto significativo → "No significant performance impact expected."
  Sé específico con métricas reales si están en work.md]

OBSERVABILITY=[Analiza qué logging/monitoring se agregó o debe considerarse:

- Si hay logs nuevos → "- ✅ Structured logging added for {{feature}}"
- Si hay métricas → "- ✅ Metrics: {{metric_names}}"
- Si debe agregar alerts → "- ⚠️ Consider adding alert for {{condition}}"
- Si no aplica → "- ℹ️ No observability changes ({{reason: refactor/docs/etc}})"
  Enfócate en lo que REALMENTE se agregó o es necesario]

</template-variables>

<instructions>
**Lee el template en `.ai-flow/templates/pr-description.template.md`** y genera DOS descripciones siguiendo EXACTAMENTE esa estructura:

1. **PR Description (GitHub/GitLab/Bitbucket) - TÉCNICO, COMPLETO:**
   - Usa TODAS las secciones del template
   - Renderiza variables con valores reales
   - Audiencia: Desarrolladores y Reviewers
   - Enfoque: "Cómo se implementó" (detalles técnicos)
   - Incluye secciones condicionales SOLO si aplican:
     - Breaking Changes Details (si HAS_BREAKING_CHANGES=true)
     - Deployment Notes (si SHOW_DEPLOYMENT_NOTES=true)
     - Screenshots (si HAS_UI_CHANGES=true)
   - Genera TEST_STEPS específicos del contexto (no genéricos)

2. **Jira Comment (Task Update) - BUSINESS-ORIENTED, COMPACTO:**
   - Audiencia: QA, PM, Stakeholders + Devs
   - Enfoque: "Qué se logró y cómo probarlo" (resultado de negocio)
   - Máximo 20-25 líneas (escaneable en 30 segundos)
   - BUSINESS_SUMMARY es lo MÁS IMPORTANTE: debe explicar el valor sin términos técnicos
   - TEST_STEPS deben incluir cómo ejecutar la aplicación desktop
   - BUILD_INSTRUCTIONS con comando específico de build (Maven/Gradle/Ant)
   - SCREENSHOTS_REMINDER importante para desktop (UI changes)
   - DEPLOYMENT_NOTES_COMPACT solo si es crítico (1 línea máximo)
   - QA_NOTES solo si hay algo no obvio que QA debe saber

**Reglas Importantes:**

- Usa lenguaje profesional pero claro (nivel senior engineer)
- Sé específico con cambios técnicos (usa nombres reales de archivos/módulos)
- Usa los commit links ya formateados en $COMMIT_HASHES_SUMMARY
- Genera TEST_STEPS específicos del tipo de cambio (no pasos genéricos)
- Si MIGRATION_GUIDE está vacío y hay breaking changes, recomienda al usuario completarlo
- Escapa caracteres especiales correctamente para Markdown válido
- Usa separadores `---` (no `━━━━` o caracteres Unicode)
- Si NEW_DEPENDENCIES está vacío pero HAS_NEW_DEPS=true, detecta del diff

**Output Format:**

IMPORTANTE: Responde directamente con este formato EXACTO usando 5 BACKTICKS (máxima robustez):

---

## 📋 PULL REQUEST DESCRIPTION

\`\`\`\`\`markdown

## {{TASK_TYPE}}: {{TASK_TITLE}}

> **Branch:** `{{BRANCH_NAME}}` • **Story Points:** {{STORY_POINTS}} SP • **Duration:** {{DURATION}}

---

## 🎯 Tipo de Cambio

- [{{IS_FEATURE}}] ✨ Feature (nueva funcionalidad)
- [{{IS_FIX}}] 🐛 Fix (corrección de bug)
- [{{IS_REFACTOR}}] ♻️ Refactor (sin cambio funcional)
- [{{IS_DOCS}}] 📝 Docs (solo documentación)
- [{{IS_PERF}}] ⚡ Performance (mejora)
- [{{IS_TEST}}] 🧪 Test (agregar/mejorar tests)

## 🎯 Área de Impacto

**{{IMPACT_AREA}}**

## 💡 Contexto

{{CONTEXT}}

{{RELATED_ISSUES}}

## ✅ Solución Implementada

{{SOLUTION}}

## 🔧 Cambios Principales

{{MAIN_CHANGES}}

## 🧪 Cómo Probar

{{TEST_STEPS}}

{{SCREENSHOTS_SECTION}}

## � Security Impact

{{SECURITY_IMPACT}}

## ⚡ Performance Impact

{{PERFORMANCE_IMPACT}}

## 🔍 Observability

{{OBSERVABILITY}}

## �📊 Validación

| Aspecto | Resultado |
|---------|-----------||
| 🧪 Tests | {{TESTS_PASSED}}/{{TESTS_TOTAL}} passing (+{{TESTS_NEW}} nuevos) |
| 📈 Coverage | {{COVERAGE}}% |
| 🔍 Lint | ✅ Sin errores |
| 📝 Docs | {{DOCS_STATUS}} |

## 📈 Métricas

| Métrica             | Valor                                                                    |
| ------------------- | ------------------------------------------------------------------------ |
| 💾 Commits          | {{TOTAL_COMMITS}} ([ver commits]({{COMMIT_HASHES_SUMMARY}}))             |
| 📁 Archivos         | {{FILES_COUNT}} modificados (+{{LINES_ADDED}}/-{{LINES_DELETED}} líneas) |
| ⚠️ Breaking Changes | {{BREAKING_CHANGES_STATUS}}                                              |
| ⏱️ Duración         | {{DURATION}} ({{STORY_POINTS}} SP)                                       |

{{BREAKING_CHANGES_DETAILS}}

{{DEPLOYMENT_NOTES}}

## 📦 Dependencias

{{DEPENDENCIES_SECTION}}

## 🔗 Referencias

- **Commits:** {{COMMIT_HASHES_SUMMARY}}
- **Platform:** {{PLATFORM}}
  {{ISSUE_LINKS}}

## ✅ Reviewer Checklist

- [ ] El código sigue los estándares del proyecto
- [ ] La lógica es clara y está bien documentada
- [ ] Los tests cubren casos críticos y edge cases
- [ ] No hay riesgos de seguridad o performance
- [ ] La documentación está actualizada
- [ ] Los cambios no introducen breaking changes no documentados
- [ ] El PR es del tamaño adecuado (no demasiado grande)

---

**Generated by AI Flow**
\`\`\`\`\`

---

## 🎫 JIRA COMMENT (Task Update)

\`\`\`\`\`markdown
🚀 {{TASK_TYPE^}}: {{TASK_TITLE}}

---

## 📝 Resumen Ejecutivo

{{BUSINESS_SUMMARY}}

---

## 🔧 Solución Técnica

{{SOLUTION}}

---

## 🧪 Cómo Probar (QA)

{{TEST_STEPS}}

{{SCREENSHOTS_REMINDER}}

---

## 📊 Evidencia Técnica

| Aspecto         | Detalle                                                                  |
| --------------- | ------------------------------------------------------------------------ |
| 🔗 Pull Request | {{PR_LINK}}                                                              |
| 🌿 Branch       | `{{BRANCH_NAME}}`                                                        |
| ✅ Tests        | {{TESTS_PASSED}}/{{TESTS_TOTAL}} passing (+{{TESTS_NEW}} nuevos)         |
| 📈 Coverage     | {{COVERAGE}}%                                                            |
| 💾 Commits      | {{TOTAL_COMMITS}} commits                                                |
| 📁 Archivos     | {{FILES_COUNT}} modificados (+{{LINES_ADDED}}/-{{LINES_DELETED}} líneas) |

---

## 📋 Métricas de Desarrollo

- **Story Points:** {{STORY_POINTS}} SP
- **Tiempo real:** {{DURATION}}
- **Estado:** {{DEPLOYMENT_STATUS}}
- **Build:** {{BUILD_INSTRUCTIONS}}

{{DEPLOYMENT_NOTES_COMPACT}}

{{QA_NOTES}}

---

## 🚀 Siguiente Paso (Crear PR)

{{PR_CREATION_COMMANDS}}

💡 _Después de crear el PR, reemplaza `[PEGAR_LINK_AQUI]` con el link real._

---

_Generado automáticamente por AI Flow • Platform: {{PLATFORM}}_
\`\`\`\`\`

---

**Listo para copiar y pegar** 📋

**Diferencias clave entre los dos formatos:**

| Aspecto | PR Description | Jira Comment |
|---------|----------------|--------------||
| **Audiencia** | Desarrolladores/Reviewers | QA, PM, Stakeholders |
| **Propósito** | Code review técnico | Status update + QA handoff |
| **Longitud** | 40-60 líneas (completo) | 20-25 líneas (compacto) |
| **Enfoque** | "Cómo se implementó" | "Qué se logró" |
| **Uso** | Pegar en GitHub/GitLab PR | Agregar como comentario en Jira |

**CRÍTICO PARA EVITAR CONFLICTOS:**

1. Los encabezados "## 📋 PULL REQUEST DESCRIPTION" y "## 🎫 JIRA COMMENT" deben estar FUERA de los bloques de código
2. USA EXACTAMENTE 5 BACKTICKS (\`\`\`\`\`) para abrir/cerrar cada bloque
3. ¿Por qué 5? Cubre hasta 4 backticks internos (bloques anidados) sin conflictos
4. Renderiza TODAS las variables con valores reales del contexto
5. Secciones condicionales ({{BREAKING_CHANGES_DETAILS}}, {{DEPLOYMENT_NOTES}}, etc.) SOLO si aplican
6. BUSINESS_SUMMARY en Jira debe ser NO-TÉCNICO (lenguaje de negocio)
7. BUILD_INSTRUCTIONS con comandos Maven/Gradle/Ant específicos
8. SCREENSHOTS_REMINDER importante para desktop UI

Analiza el contexto y genera las descripciones óptimas ahora.
```

**After AI generates the descriptions:**

```bash
# La IA responde directamente en el chat con las descripciones
# en formato markdown listo para copiar y pegar.
# No requiere post-procesamiento ni archivos temporales.
echo ""
echo "✅ Descripciones generadas correctamente"
echo ""
echo "📋 Dos formatos disponibles arriba:"
echo "   1️⃣  PR Description → Para GitHub/GitLab (completo, técnico)"
echo "   2️⃣  Jira Comment → Para agregar en tarea de Jira (compacto, business-oriented)"
echo ""
echo "📋 Copia directamente el contenido de los bloques markdown."
echo ""
```

---

### Step 5: Git Push (Optional)

**Always ask before pushing:**

```bash
echo "---"
echo "🚀 ¿Realizar push a origin/$CURRENT_BRANCH?"
echo ""
echo "Esto subirá:"
echo "  - $TOTAL_COMMITS commits de trabajo"
echo "  - 1 commit de analytics archivado"
echo ""
read -p "Confirmar push (y/N): " CONFIRM_PUSH

if [[ "$CONFIRM_PUSH" =~ ^[Yy]$ ]]; then
  echo ""
  echo "⬆️  Subiendo cambios a origin/$CURRENT_BRANCH..."
  echo ""

  git push origin "$CURRENT_BRANCH"

  if [ $? -eq 0 ]; then
    echo ""
    echo "---"
    echo "✅ PUSH EXITOSO"
    echo "---"
    echo ""
    echo "📊 Trabajo completado y subido correctamente"
    echo "🌿 Branch: $CURRENT_BRANCH (pushed a origin)"
    echo ""
    echo "📋 Siguiente paso opcional: Crear Pull Request para revisión"
    echo ""
    echo "   GitHub CLI:     gh pr create --title \"$TASK_TYPE: $TASK_FOLDER\""
    echo "   GitLab CLI:     glab mr create --title \"$TASK_TYPE: $TASK_FOLDER\""
    echo "   Bitbucket CLI:  bb pr create --title \"$TASK_TYPE: $TASK_FOLDER\""
    echo "   Web UI:         Abre repositorio → 'New Pull Request'"
    echo ""
    echo "💡 Si creaste el PR, copia el link y actualiza el comentario de Jira"
    echo ""
  else
    echo ""
    echo "❌ ERROR AL HACER PUSH"
    echo ""
    echo "Posibles causas:"
    echo "  - Conflicto con remote"
    echo "  - Branch no tiene upstream configurado"
    echo "  - Permisos insuficientes"
    echo ""
    echo "💡 Comandos útiles:"
    echo "   git pull origin $CURRENT_BRANCH --rebase"
    echo "   git push -u origin $CURRENT_BRANCH"
    echo ""
    exit 1
  fi
else
  echo ""
  echo "⏭️  Push cancelado por el usuario"
  echo ""
  echo "✅ Trabajo archivado y commiteado localmente"
  echo ""
  echo "💡 Puedes hacer push manualmente cuando estés listo:"
  echo "   git push origin $CURRENT_BRANCH"
  echo ""
  echo "⚠️  No olvides crear el PR después del push"
  echo ""
fi
```

---

## Summary

**Token Consumption Estimate:**

- **Step 1 (/flow-check):** ~1,800 tokens (only if needed)
- **Step 2 (/flow-commit):** ~1,000 tokens (only if uncommitted changes)
- **Step 4 (AI Descriptions):** ~1,200 tokens (optimized summary + generation)

**Total:** ~4,000 tokens for full execution with validation and commit  
**Total:** ~1,200 tokens if check/commit already executed  
**Total:** ~0 tokens if no changes detected (smart skip)

**Benefits:**

- ✅ Professional quality descriptions (senior-level)
- ✅ Optimized token usage (66% reduction vs full diff analysis)
- ✅ One command does everything
- ✅ Smart skip for validation/commit
- ✅ Tests are blocking (prevents broken code)
- ✅ Archive before push (guarantees versioning)
- ✅ Commit links (6 Git platforms supported)
- ✅ Language/framework agnostic
- ✅ Deployment notes auto-detection

---

## Notes

- This workflow completes the development cycle started by `/flow-work`
- Always archives analytics to `.ai-flow/archive/analytics.jsonl` before push
- Generates descriptions using AI with optimized context (structured summary, not full diffs)
- Push is always optional (user confirmation required)
- Work folder cleanup only happens after successful archiving
