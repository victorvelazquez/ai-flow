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

# 2. Build JSON analytics
ANALYTICS_JSON="{\"task\":\"$TASK_FOLDER\",\"type\":\"$TASK_TYPE\",\"src\":\"$TASK_SOURCE\",\"dur\":$DURATION_MIN,\"start\":\"$CREATED_AT\",\"end\":\"$COMPLETED_AT\",\"tasks\":$TOTAL_TASKS,\"sp\":$STORY_POINTS,\"commits\":$COMMIT_COUNT,\"valid\":$VALIDATION_PASSED}"

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
        COMMIT_HASHES_SUMMARY+="[${hash}](${COMMIT_URL_PATTERN}${hash})"
      else
        COMMIT_HASHES_SUMMARY+="\`${hash}\`"
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
Genera dos descripciones profesionales (PR y Jira) basándote en este resumen estructurado:

<context-summary>
$(cat /tmp/ai-context-summary.md)
</context-summary>

<commit-links>
Platform: $PLATFORM
Base URL Pattern: $COMMIT_URL_PATTERN
Commit Hashes Summary: $COMMIT_HASHES_SUMMARY
</commit-links>

<formatting-requirements>
- Área de impacto detectada: $IMPACT_AREA
- Mostrar deployment notes: $([ "$SHOW_DEPLOYMENT_NOTES" = "true" ] && echo "SÍ" || echo "NO")
- Breaking changes: $([ "$HAS_BREAKING_CHANGES" = "true" ] && echo "SÍ (resaltar con ⚠️)" || echo "NO")
- Branch: $CURRENT_BRANCH
- Story Points: $STORY_POINTS SP
- Duration: ${DURATION_HOURS}h ${DURATION_MINS}min
</formatting-requirements>

**Requisitos:**

1. **PR Description (GitHub/GitLab/Bitbucket):**
   - Título: ## ${TASK_TYPE^}: [nombre descriptivo basado en objective]
   - Header con branch, SP, duration
   - Sección "Área de Impacto" con valor: $IMPACT_AREA
   - Contexto: Resume el problema/necesidad en 2-3 líneas (extrae de objective)
   - Solución Implementada: Resume enfoque técnico en 2-3 líneas (infiere de commits)
   - Cambios principales: Lista 5-7 cambios significativos (analiza commit subjects)
   - Validación: Tabla con Tests, Coverage, Lint, Docs
   - Métricas: Tabla con Commits, Archivos, Breaking Changes
   - Deployment Notes: Solo SI $SHOW_DEPLOYMENT_NOTES=true, incluir requirements específicos
   - Referencias: Commits con links usando $COMMIT_HASHES_SUMMARY
   - Reviewer checklist

2. **Jira Description (Markdown estándar):**
   - Similar estructura pero más concisa
   - Enfoque en resultado de negocio
   - Métricas en tabla
   - Deployment notes si aplica
   - Referencias con commits

**Reglas Importantes:**

- Usa lenguaje profesional pero claro
- Sé específico con cambios técnicos
- Usa los commit links ya formateados en $COMMIT_HASHES_SUMMARY
- Escapa caracteres especiales para Markdown válido (backticks, pipes, asteriscos)
- Usa separadores `---` (no `━━━━`)
- Si breaking changes, resáltalos con ⚠️ en sección Métricas
- Si deployment notes, sé específico con cada requirement

**Output en formato (CRÍTICO - respetar delimitadores):**

\`\`\`markdown

<!-- PR_DESCRIPTION_START -->

[contenido completo de PR description aquí]

<!-- PR_DESCRIPTION_END -->

<!-- JIRA_DESCRIPTION_START -->

[contenido completo de Jira description aquí]

<!-- JIRA_DESCRIPTION_END -->

\`\`\`

Analiza el contexto y genera las descripciones óptimas ahora.
```

**After AI generates the descriptions, extract and save them:**

```bash
# Extract PR description
sed -n '/<!-- PR_DESCRIPTION_START -->/,/<!-- PR_DESCRIPTION_END -->/p' /tmp/ai-output.md | \
  sed '1d;$d' > /tmp/pr-description.md

# Extract Jira description
sed -n '/<!-- JIRA_DESCRIPTION_START -->/,/<!-- JIRA_DESCRIPTION_END -->/p' /tmp/ai-output.md | \
  sed '1d;$d' > /tmp/jira-description.md

# Display descriptions
echo ""
echo "---"
echo "📋 DESCRIPCIÓN PARA PULL REQUEST (GitHub/GitLab/Bitbucket)"
echo "---"
echo ""
cat /tmp/pr-description.md
echo ""
echo ""
echo "---"
echo "🎫 DESCRIPCIÓN PARA JIRA/CLICKUP/LINEAR (Markdown)"
echo "---"
echo ""
cat /tmp/jira-description.md
echo ""
echo ""
echo "💡 Copia las descripciones de arriba para tus tickets"
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
    echo "🌿 Branch: $CURRENT_BRANCH (pushed)"
    echo ""
    echo "💡 Siguiente paso: Crear Pull Request"
    echo ""
    echo "   GitHub CLI:"
    echo "   gh pr create --title \"$TASK_TYPE: $TASK_FOLDER\" --body-file /tmp/pr-description.md"
    echo ""
    echo "   GitLab CLI:"
    echo "   glab mr create --title \"$TASK_TYPE: $TASK_FOLDER\" --description \"\$(cat /tmp/pr-description.md)\""
    echo ""
    echo "   Bitbucket CLI:"
    echo "   bb pr create --title \"$TASK_TYPE: $TASK_FOLDER\" --description \"\$(cat /tmp/pr-description.md)\""
    echo ""
    echo "   O abre tu repositorio web y crea el PR manualmente"
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
