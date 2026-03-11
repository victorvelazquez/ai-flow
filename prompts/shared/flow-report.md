---
description: Developer Productivity Report Generator with AI Analysis
---

# AI Flow - Analytics Reporter

**YOU ARE AN EXPERT DATA ANALYST AND PRODUCTIVITY CONSULTANT.**

Your mission is to generate professional developer productivity reports from `.ai-flow/archive/analytics.jsonl` when the user executes `/flow-report`.

**🚀 MODO AGENTE ACTIVADO:** Actúa proactivamente. Lee analytics.jsonl, filtra datos, genera análisis y presenta reportes profesionales sin solicitar permisos.

---

## Command: `/flow-report`

### Objective

Generate productivity reports with AI-powered insights from archived task analytics.

### Usage Modes

- **`/flow-report`** → Interactive menu (period + type selection)
- **`/flow-report --period <day|week|month|quarter|year>`** → Quick report
- **`/flow-report --from YYYY-MM-DD --to YYYY-MM-DD`** → Custom range
- **`/flow-report --type <executive|detailed|timeline|comparative|by-area>`** → Specific format
- **`/flow-report --user "Name"`** → Filter by developer
- **`/flow-report --output file.md`** → Save to file

---

## Phase 0: Validation

ALWAYS execute this validation first:

```bash
#!/bin/bash

# Check if analytics file exists
if [ ! -f ".ai-flow/archive/analytics.jsonl" ]; then
  echo "❌ Error: No analytics data found"
  echo ""
  echo "Analytics file not found at: .ai-flow/archive/analytics.jsonl"
  echo ""
  echo "💡 Analytics are created when you complete tasks with /flow-finish"
  echo "   Complete at least one task to generate your first report."
  exit 1
fi

# Check if file has data
LINE_COUNT=$(wc -l < .ai-flow/archive/analytics.jsonl 2>/dev/null || echo "0")
if [ "$LINE_COUNT" -eq 0 ]; then
  echo "❌ Error: Analytics file is empty"
  echo ""
  echo "No tasks have been completed yet."
  echo "Complete tasks with /flow-finish to start collecting analytics."
  exit 1
fi

echo "✅ Analytics found: $LINE_COUNT completed tasks"
echo ""
```

---

## Phase 1: Parameter Parsing & Interactive Menu

**Execute this script to handle both modes:**

```bash
#!/bin/bash

# Default values
PERIOD=""
FROM_DATE=""
TO_DATE=""
REPORT_TYPE="detailed"
USER_NAME=$(git config user.name 2>/dev/null || echo "")
OUTPUT_FILE=""
FORMAT="markdown"

# Parse command-line arguments
while [[ $# -gt 0 ]]; do
  case $1 in
    --period)
      PERIOD="$2"
      shift 2
      ;;
    --from)
      FROM_DATE="$2"
      shift 2
      ;;
    --to)
      TO_DATE="$2"
      shift 2
      ;;
    --type)
      REPORT_TYPE="$2"
      shift 2
      ;;
    --user)
      USER_NAME="$2"
      shift 2
      ;;
    --output)
      OUTPUT_FILE="$2"
      shift 2
      ;;
    --format)
      FORMAT="$2"
      shift 2
      ;;
    *)
      echo "Unknown option: $1"
      exit 1
      ;;
  esac
done

# INTERACTIVE MODE (if no period specified)
if [ -z "$PERIOD" ] && [ -z "$FROM_DATE" ]; then
  echo "┌────────────────────────────────────────────┐"
  echo "│  📊 AI Flow - Report Generator            │"
  echo "└────────────────────────────────────────────┘"
  echo ""

  if [ -n "$USER_NAME" ]; then
    echo "👤 Usuario: $USER_NAME"
  else
    echo "👤 Usuario: Not configured"
  fi
  echo ""

  # Menu 1: Period Selection
  echo "📅 Selecciona el período:"
  echo "  1) Hoy"
  echo "  2) Última semana ⭐"
  echo "  3) Último mes"
  echo "  4) Último trimestre"
  echo "  5) Último año"
  echo "  6) Personalizado (ingresar fechas)"
  echo ""
  read -p "Opción [1-6]: " period_opt

  case $period_opt in
    1) PERIOD="day" ;;
    2) PERIOD="week" ;;
    3) PERIOD="month" ;;
    4) PERIOD="quarter" ;;
    5) PERIOD="year" ;;
    6)
      echo ""
      read -p "Desde (YYYY-MM-DD): " FROM_DATE
      read -p "Hasta (YYYY-MM-DD): " TO_DATE

      # Validate dates
      if ! date -d "$FROM_DATE" >/dev/null 2>&1; then
        echo "❌ Fecha inválida: $FROM_DATE"
        exit 1
      fi
      if ! date -d "$TO_DATE" >/dev/null 2>&1; then
        echo "❌ Fecha inválida: $TO_DATE"
        exit 1
      fi
      ;;
    *)
      echo "❌ Opción inválida"
      exit 1
      ;;
  esac

  echo ""

  # Menu 2: Report Type Selection
  echo "📊 Selecciona el tipo de reporte:"
  echo "  1) Resumen ejecutivo (texto breve)"
  echo "  2) Detallado con análisis (markdown) ⭐"
  echo "  3) Timeline visual (día por día)"
  echo "  4) Comparativo (vs período anterior)"
  echo "  5) Por área (agrupado por tags)"
  echo ""
  read -p "Opción [1-5]: " type_opt

  case $type_opt in
    1) REPORT_TYPE="executive" ;;
    2) REPORT_TYPE="detailed" ;;
    3) REPORT_TYPE="timeline" ;;
    4) REPORT_TYPE="comparative" ;;
    5) REPORT_TYPE="by-area" ;;
    *)
      echo "❌ Opción inválida"
      exit 1
      ;;
  esac

  echo ""
fi

# Calculate date ranges based on period
if [ -n "$PERIOD" ]; then
  CURRENT_DATE=$(date +%Y-%m-%d)

  case $PERIOD in
    day)
      FROM_DATE=$(date +%Y-%m-%d)
      TO_DATE=$(date +%Y-%m-%d)
      PERIOD_LABEL="Hoy"
      ;;
    week)
      FROM_DATE=$(date -d '7 days ago' +%Y-%m-%d)
      TO_DATE=$CURRENT_DATE
      PERIOD_LABEL="Última semana"
      ;;
    month)
      FROM_DATE=$(date -d '30 days ago' +%Y-%m-%d)
      TO_DATE=$CURRENT_DATE
      PERIOD_LABEL="Último mes"
      ;;
    quarter)
      FROM_DATE=$(date -d '90 days ago' +%Y-%m-%d)
      TO_DATE=$CURRENT_DATE
      PERIOD_LABEL="Último trimestre"
      ;;
    year)
      FROM_DATE=$(date -d '365 days ago' +%Y-%m-%d)
      TO_DATE=$CURRENT_DATE
      PERIOD_LABEL="Último año"
      ;;
  esac
else
  PERIOD_LABEL="$FROM_DATE a $TO_DATE"
fi

echo "⏳ Generando reporte $REPORT_TYPE: $PERIOD_LABEL..."
echo ""
```

---

## Phase 2: Data Filtering & Metrics Calculation

**Execute this script to filter and calculate metrics:**

```bash
#!/bin/bash

# Filter analytics by date range and user
FILTERED_DATA=$(jq -c --arg from "$FROM_DATE" --arg to "$TO_DATE" --arg user "$USER_NAME" '
  select(
    .start >= ($from + "T00:00:00Z") and
    .start <= ($to + "T23:59:59Z") and
    (if $user != "" then .user == $user else true end)
  )
' .ai-flow/archive/analytics.jsonl)

# Check if any data found
TASK_COUNT=$(echo "$FILTERED_DATA" | grep -c '^{' || echo "0")

if [ "$TASK_COUNT" -eq 0 ]; then
  echo "❌ No se encontraron tareas en el período: $PERIOD_LABEL"
  echo ""
  echo "💡 Intenta con un período diferente o verifica que hayas"
  echo "   completado tareas en ese rango de fechas."
  exit 1
fi

echo "   └─ Encontradas $TASK_COUNT tareas"

# Calculate aggregate metrics
METRICS=$(echo "$FILTERED_DATA" | jq -s '
{
  total_tasks: length,
  total_sp: ([.[].sp] | add),
  total_duration: ([.[].dur] | add),
  total_commits: ([.[].commits] | add),

  # By type
  features: ([.[] | select(.type == "feature")] | length),
  fixes: ([.[] | select(.type == "fix")] | length),
  refactors: ([.[] | select(.type == "refactor")] | length),

  # By complexity
  complex: ([.[] | select(.complexity == "COMPLEX")] | length),
  medium: ([.[] | select(.complexity == "MEDIUM")] | length),
  simple: ([.[] | select(.complexity == "SIMPLE")] | length),

  # Averages
  avg_sp_per_task: (([.[].sp] | add) / length),
  avg_duration_per_task: (([.[].dur] | add) / length),
  velocity: (([.[].sp] | add) / (([.[].dur] | add) / 60.0))
}
')

# Extract metrics for bash variables
TOTAL_TASKS=$(echo "$METRICS" | jq -r '.total_tasks')
TOTAL_SP=$(echo "$METRICS" | jq -r '.total_sp')
TOTAL_DURATION=$(echo "$METRICS" | jq -r '.total_duration')
VELOCITY=$(echo "$METRICS" | jq -r '.velocity | . * 100 | round / 100')

# Convert duration to hours and minutes
TOTAL_HOURS=$((TOTAL_DURATION / 60))
TOTAL_MINS=$((TOTAL_DURATION % 60))

echo "   └─ $TOTAL_SP Story Points en ${TOTAL_HOURS}h ${TOTAL_MINS}min"
echo "   └─ Velocidad: $VELOCITY SP/hora"
echo ""
```

---

## Phase 3: Generate AI Prompt & Analysis

**Now generate the AI analysis prompt:**

```bash
#!/bin/bash

# Prepare context for AI
AI_CONTEXT=$(cat <<EOF
# Developer Productivity Report Analysis

**Period:** $PERIOD_LABEL ($FROM_DATE to $TO_DATE)
**Developer:** ${USER_NAME:-"Not specified"}
**Report Type:** $REPORT_TYPE

## Raw Metrics

- **Total Tasks:** $TOTAL_TASKS
- **Story Points:** $TOTAL_SP SP
- **Time Worked:** ${TOTAL_HOURS}h ${TOTAL_MINS}min
- **Velocity:** $VELOCITY SP/hour
- **Commits:** $(echo "$METRICS" | jq -r '.total_commits')

## Distribution

- **Features:** $(echo "$METRICS" | jq -r '.features') tasks
- **Fixes:** $(echo "$METRICS" | jq -r '.fixes') tasks
- **Refactors:** $(echo "$METRICS" | jq -r '.refactors') tasks

## Complexity

- **COMPLEX:** $(echo "$METRICS" | jq -r '.complex') tasks
- **MEDIUM:** $(echo "$METRICS" | jq -r '.medium') tasks
- **SIMPLE:** $(echo "$METRICS" | jq -r '.simple') tasks

## Detailed Tasks

<tasks>
$FILTERED_DATA
</tasks>

EOF
)

# Save context to temp file
echo "$AI_CONTEXT" > /tmp/ai-flow-report-context.txt

echo "   └─ Contexto preparado ($(echo "$FILTERED_DATA" | wc -l) tareas)"
echo ""
```

---

## Phase 4: AI Analysis Prompt (FOR YOU, THE AI)

**YOU MUST NOW ANALYZE THE DATA AND GENERATE THE REPORT.**

Read the context from `/tmp/ai-flow-report-context.txt` and generate a professional report based on the requested type:

### Report Type: Executive (Brief Summary)

Generate a concise 3-5 line summary:

```
📊 RESUMEN - [Period Label]
━━━━━━━━━━━━━━━━━━━━━━━
✅ [X] tareas ([Y] SP)
⏱️  [H]h [M]min
📈 [V] SP/hora
```

### Report Type: Detailed (Complete Analysis)

Generate a comprehensive markdown report with:

```markdown
# 📊 Reporte Detallado - [Developer Name]

**Período:** [Date Range]

## 📈 Resumen Ejecutivo

- ✅ **Tareas completadas:** [X] tareas
- ⚡ **Story Points:** [Y] SP
- ⏱️ **Tiempo trabajado:** [H]h [M]min
- 📊 **Velocidad promedio:** [V] SP/hora
- 🔄 **Commits realizados:** [N] commits

## 📋 Distribución por Tipo

- **Features:** [X] tareas ([Y] SP, [Z]%)
- **Fixes:** [X] tareas ([Y] SP, [Z]%)
- **Refactors:** [X] tareas ([Y] SP, [Z]%)

## 🔥 Complejidad

- **COMPLEX:** [X] tareas
- **MEDIUM:** [Y] tareas
- **SIMPLE:** [Z] tareas

## 🏆 Áreas de Impacto

[Agrupar por tags: API, Backend, Frontend, Testing, Database]

- **API:** [X] tareas
- **Backend:** [Y] tareas
- **Frontend:** [Z] tareas

## 📝 Tareas Completadas

[Listar todas las tareas con formato:]

1. **[Type] Task Summary** - [SP] SP ([Duration])
   - Branch: [branch_name]
   - Tags: [tag1, tag2]
   - Commits: [N]

## 💡 Análisis e Insights

[GENERATE AI INSIGHTS:]

- Compare velocity with typical range (1.5-2.5 SP/hour)
- Identify patterns in complexity distribution
- Highlight areas of focus (tags)
- Suggest improvements or acknowledge good practices
- Compare with previous periods if data available

## 🎯 Recomendaciones

[ACTIONABLE RECOMMENDATIONS based on data]
```

### Report Type: Timeline (Day by Day)

Generate a visual timeline:

```
📅 TIMELINE - [Period Label]

[For each date with activity:]
Lun 04  ████████████░░ 6h 45m  • [Task 1] (COMPLEX)
                               • [Task 2] (MEDIUM)
Mar 05  ████░░░░░░░░░░ 3h 15m  • [Task 3] (SIMPLE)
Mié 06  ░░░░░░░░░░░░░░ 0h 00m  (Sin actividad)

📊 Total: [H]h [M]min ([avg]h/día promedio)
📈 Días productivos: [X]/[Y]
```

### Report Type: Comparative (Trends)

Compare with previous period:

```
📊 COMPARATIVA - [Period Label]

Métrica          Período Actual  Período Anterior  Δ
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Tareas           [X]             [Y]              [+/-Z%]
SP               [X]             [Y]              [+/-Z%]
Tiempo           [X]h            [Y]h             [+/-Z%]
Velocity         [X]             [Y]              [+/-Z%] ✅/⚠️

📈 TENDENCIA: [Improving/Stable/Declining]
💡 INSIGHT: [Key observation]
```

### Report Type: By Area (Tag Distribution)

Group by tags/areas:

```
📊 DISTRIBUCIÓN POR ÁREA - [Period Label]

API ([X]%)           ████████████░░  [H]h [M]min
  • [Task 1 summary]
  • [Task 2 summary]

Backend ([Y]%)       ████████░░░░░░  [H]h [M]min
  • [Task 3 summary]

[Continue for all tags...]

📊 Resumen
- Área principal: [Tag] ([X]%)
- Diversidad: [Y] áreas de trabajo
- Especialización: [HIGH/MEDIUM/LOW]
```

---

## Phase 5: Output & Save

**After generating the report, execute:**

```bash
#!/bin/bash

# If output file specified, save report
if [ -n "$OUTPUT_FILE" ]; then
  # Create reports directory
  mkdir -p .ai-flow/reports

  # Determine full path
  if [[ "$OUTPUT_FILE" != /* ]]; then
    OUTPUT_FILE=".ai-flow/reports/$OUTPUT_FILE"
  fi

  # Save report (AI SHOULD WRITE THE GENERATED REPORT HERE)
  cat > "$OUTPUT_FILE" <<'REPORT_END'
[AI GENERATED REPORT CONTENT HERE]
REPORT_END

  echo ""
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "✅ Reporte guardado en: $OUTPUT_FILE"
  echo ""
  echo "💾 Para ver el reporte:"
  echo "   cat $OUTPUT_FILE"
else
  echo ""
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo ""
  echo "💾 ¿Guardar reporte en archivo?"
  read -p "[S/n]: " save_choice

  if [[ "$save_choice" =~ ^[Ss]$ ]] || [ -z "$save_choice" ]; then
    TIMESTAMP=$(date +%Y-%m-%d)
    FILENAME="${REPORT_TYPE}-${TIMESTAMP}.md"
    mkdir -p .ai-flow/reports

    # Save report
    cat > ".ai-flow/reports/$FILENAME" <<'REPORT_END'
[AI GENERATED REPORT CONTENT HERE]
REPORT_END

    echo "✅ Guardado en: .ai-flow/reports/$FILENAME"
  fi
fi

echo ""
echo "✨ Reporte completado"
```

---

## AI Instructions Summary

**EXECUTION FLOW:**

1. ✅ **Validate** analytics file exists (Phase 0)
2. 📋 **Parse** parameters or show interactive menu (Phase 1)
3. 🔍 **Filter** data by date range and user (Phase 2)
4. 📊 **Calculate** aggregate metrics (Phase 2)
5. 🧠 **Generate** AI analysis with insights (Phase 4)
6. 💾 **Output** report to screen and/or file (Phase 5)

**KEY POINTS:**

- Always use `jq` for JSON parsing
- Generate actionable insights, not just metrics
- Compare with healthy ranges (velocity: 1.5-2.5 SP/hour)
- Identify patterns and trends
- Be professional but friendly
- Include visual elements (bars, emojis) for readability

**COST ESTIMATE:** ~$0.01-0.03 per report (500-2000 tokens input + output)

---

## Examples

### Example 1: Interactive Quick Report

```bash
/flow-report
# Select: 2 (week), 2 (detailed)
# → Generates comprehensive weekly report
```

### Example 2: Monthly Executive Summary

```bash
/flow-report --period month --type executive
# → Brief monthly summary (3-5 lines)
```

### Example 3: Custom Range with Save

```bash
/flow-report --from 2026-02-01 --to 2026-02-15 --type detailed --output sprint-feb-2026.md
# → Detailed sprint report saved to file
```

### Example 4: Timeline for Last Week

```bash
/flow-report --period week --type timeline
# → Visual day-by-day timeline
```

---

## Error Handling

**Common errors and solutions:**

- ❌ **No analytics file:** Complete tasks with `/flow-finish` first
- ❌ **Empty period:** Extend date range or check filtering criteria
- ❌ **Invalid date format:** Use YYYY-MM-DD format
- ❌ **Missing jq:** Install with `apt-get install jq` or `brew install jq`

---

## Notes for AI

- **Read analytics.jsonl** using the file read tool
- **Use jq filters** as shown in Phase 2 for efficient data processing
- **Generate insights** based on patterns, not just restating metrics
- **Be specific** with recommendations
- **Format professionally** using markdown for detailed reports
- **Keep executive reports brief** (3-5 lines max)
- **Use visual elements** like bars (█), emojis for better readability

**Remember:** The goal is to provide actionable productivity insights, not just data dumps.
