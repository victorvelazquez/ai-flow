# Analytics Enhancement Plan - Developer Reports

**Fecha:** 10 de marzo de 2026  
**Objetivo:** Mejorar `.ai-flow/archive/analytics.jsonl` para generar reportes de productividad del desarrollador

---

## � Resumen Rápido (TL;DR)

### ¿Qué es esto?

Sistema de reportes de productividad para desarrolladores basado en datos de `analytics.jsonl`.

### ¿Cómo funciona?

```
Usuario → /flow-report (sin parámetros)
   ↓
Menú interactivo:
  📅 ¿Período? → Día/Semana/Mes/Trimestre/Año
  📊 ¿Tipo? → Ejecutivo/Detallado/Timeline/Comparativo/Por área
   ↓
Script filtra datos + IA genera reporte (siempre)
   ↓
Output: Markdown profesional con insights
```

### ¿Cuánto cuesta?

- **Por reporte:** ~$0.01-0.03 (con IA siempre)
- **Anual:** <$2/año (uso típico)
- **Análisis inteligente incluido** en todos los reportes

### ¿Qué necesito cambiar?

**Fase 1 (Esencial - RECOMENDADO):**
Agregar 5 campos críticos:

- `user` - Nombre del desarrollador
- `summary` - Descripción legible de 1 línea
- `complexity` - SIMPLE/MEDIUM/COMPLEX
- `branch` - Nombre del branch
- `tags` - Áreas de impacto ["API", "Backend"]

**Fase 2 (Completo - OPCIONAL):**
Agregar 10 campos más de calidad/volumen:

- Métricas de testing: `tests_run`, `tests_passed`, `tests_failed`, `lint_run`
- Métricas de volumen: `files_changed`, `lines_added`, `lines_deleted`, `net_lines`
- Extras: `deviation`, `completed_tasks`

### ¿Cuándo está listo?

- **Fase 1:** 1 día de implementación → Reportes útiles inmediatamente
- **Fase 2:** +1 día adicional → Métricas avanzadas y análisis profundo

---

## �📊 Estado Actual

### Estructura Actual de `analytics.jsonl`

**Campos existentes:**

```json
{
  "task": "organizations-api-sync",
  "type": "feature",
  "src": "HU-001-002",
  "dur": 1016,
  "start": "2026-03-09T03:00:00Z",
  "end": "2026-03-09T19:56:10Z",
  "tasks": 16,
  "sp": 11,
  "commits": 10,
  "valid": true
}
```

**Tamaño por registro:** ~180 caracteres (~45 tokens)

### Problemas Identificados

1. ❌ **No identifica al desarrollador** - No hay campo `user`
2. ❌ **Descripción no legible** - Solo `task: "HU-001-002"`, no sabes qué es
3. ❌ **Orden de campos inconsistente** - Varía entre líneas
4. ❌ **Timestamps mixtos** - Algunos UTC (`Z`), otros con zona (`-03:00`)
5. ❌ **Sin categorización** - No hay tags ni área de impacto
6. ❌ **Sin nivel de complejidad** - No distingue SIMPLE vs COMPLEX

---

## 🎯 Propuesta de Mejora

### 5 Campos Esenciales (Nada Más)

1. **`user`** - Quién trabajó
   - Origen: `git config user.name`
   - Ejemplo: `"Victor Rodriguez"`

2. **`summary`** - Qué hizo (en 1 línea)
   - Origen: Primera línea de `work.md`
   - Ejemplo: `"Implement Organizations API sync"`

3. **`complexity`** - Qué tan difícil fue
   - Origen: Existe `status.json`? → COMPLEX, si no → MEDIUM
   - Valores: `"MEDIUM"` o `"COMPLEX"`

4. **`branch`** - En qué branch
   - Origen: `git branch --show-current`
   - Ejemplo: `"feature/organizations-api"`

5. **`tags`** - En qué área trabajó
   - Origen: Primera palabra del folder en `src/` modificado
   - Ejemplo: `["API", "Backend"]`

---

### Estructura Propuesta (Simple y Directa)

```json
{
  "task": "organizations-api-sync",
  "type": "feature",
  "src": "HU-001-002",
  "start": "2026-03-09T03:00:00Z",
  "end": "2026-03-09T19:56:10Z",
  "dur": 1016,
  "sp": 11,
  "tasks": 16,
  "commits": 10,
  "valid": true,
  "user": "Victor Rodriguez",
  "summary": "Implement Organizations API synchronization",
  "complexity": "COMPLEX",
  "branch": "feature/organizations-api-sync",
  "tags": ["API", "Backend"]
}
```

**Tamaño por registro:** ~305 caracteres (~76 tokens)  
**Incremento:** +70% en tamaño → **Aceptable** para habilitar reportes útiles

---

## ❓ Preguntas Esenciales

### ¿Qué responde el reporte?

1. **¿Qué hizo?** Lista legible de tareas completadas
2. **¿Cuánto hizo?** Story Points y número de tareas
3. **¿En cuánto tiempo?** Horas trabajadas por tarea/período
4. **¿Productividad?** Velocidad (SP/hora) y comparativa
5. **¿En qué área?** Distribución por tags (API, Backend, etc.)

### ¿Qué períodos soporta?

**Los 3 esenciales:**

- **Día** → Stand-ups diarios (~$0.003)
- **Semana** → Sprint reviews (~$0.012)
- **Mes** → 1-on-1s con manager (~$0.023)

### ¿Qué formatos hay?

**Solo 2 (simple y práctico):**

**1. RÁPIDO** - Para lectura rápida (3-4 líneas):

```
📊 ESTA SEMANA
---
✅ 8 tareas (32 SP)
⏱️  28h 30min
📈 1.12 SP/hora
```

**2. DETALLADO** - Para compartir con manager (1-2 páginas):

```markdown
# 📊 Reporte Semanal

## Productividad

• 8 tareas (32 SP) en 28h 30min
• Velocidad: 1.12 SP/hora

## Distribución

• 5 Features (20 SP)
• 2 Fixes (8 SP)
• 1 Refactor (4 SP)

## Áreas

• API - 5 tareas
• Backend - 3 tareas

## Tareas

1. Organizations API (11 SP, 16h)
2. User Import (8 SP, 2h 15m)
   ...

## Análisis

Velocidad estable. Balance adecuado.
```

---

## 📋 Comparativa de Capacidades

| ¿Qué muestra?          | Actual (10 campos) | Con 5 campos nuevos |
| ---------------------- | ------------------ | ------------------- |
| Tiempo total trabajado | ✅                 | ✅                  |
| Story Points           | ✅                 | ✅                  |
| Número de tareas       | ✅                 | ✅                  |
| **Quién trabajó**      | ❌                 | ✅                  |
| **Qué hizo (legible)** | ❌                 | ✅                  |
| **Complejidad**        | ❌                 | ✅                  |
| **Áreas de trabajo**   | ❌                 | ✅                  |
| **Velocidad por área** | ❌                 | ✅                  |

**En resumen:** Sin los 5 campos nuevos, solo ves números sin contexto. Con ellos, entiendes QUÉ, QUIÉN, CÓMO y DÓNDE.

---

## � Cómo Usar `/flow-report`

**Uso simple (interactivo):**

### Comparativa de Capacidades por Fase

| Insight / Métrica                      | Actual (10 campos) | Fase 1 (+5) | Fase 2 (+15) |
| -------------------------------------- | ------------------ | ----------- | ------------ |
| **Básicos**                            |                    |             |              |
| Tiempo trabajado por período           | ✅                 | ✅          | ✅           |
| Story Points completados               | ✅                 | ✅          | ✅           |
| Número de tareas y commits             | ✅                 | ✅          | ✅           |
| **Identidad y Contexto**               |                    |             |              |
| Filtrar por desarrollador              | ❌                 | ✅          | ✅           |
| Descripción legible de tareas          | ❌                 | ✅          | ✅           |
| Nivel de complejidad del trabajo       | ❌                 | ✅          | ✅           |
| Trazabilidad por branch                | ❌                 | ✅          | ✅           |
| Agrupación por área/expertise          | ❌                 | ✅          | ✅           |
| **Calidad del Código**                 |                    |             |              |
| Cobertura de testing                   | ❌                 | ❌          | ✅           |
| Tasa de éxito de tests                 | ❌                 | ❌          | ✅           |
| Cumplimiento de estándares (lint)      | ❌                 | ❌          | ✅           |
| **Productividad Avanzada**             |                    |             |              |
| Volumen de código por tarea            | ❌                 | ❌          | ✅           |
| Ratio agregado/eliminado (refactoring) | ❌                 | ❌          | ✅           |
| Alcance de cambios (files changed)     | ❌                 | ❌          | ✅           |
| Detección de scope creep (deviation)   | ❌                 | ❌          | ✅           |
| **Análisis de Patrones**               |                    |             |              |
| Tendencias de velocidad                | ⚠️ Parcial         | ✅          | ✅           |
| Distribución por tipo de trabajo       | ✅                 | ✅          | ✅           |
| Expertise y especialización            | ❌                 | ✅          | ✅           |
| Calidad vs velocidad (trade-offs)      | ❌                 | ❌          | ✅           |
| Impacto de complejidad en duración     | ❌                 | ✅          | ✅           |
| Correlación tests/SP/líneas            | ❌                 | ❌          | ✅           |

---

### Ejemplos de Insights por Fase

**Con Campos Actuales (10 campos):**

```
📊 Última semana
• Trabajaste 28.5 horas
• 8 tareas completadas (58 SP)
• 42 commits realizados
```

**Con Fase 1 (+5 campos críticos):**

```
📊 Última semana - Victor Rodriguez

🎯 Productividad
• 8 tareas completadas en 28.5 horas (58 SP)
• Promedio: 3.5h por tarea, 7.25 SP/tarea

📈 Distribución
• 5 Features (62%) - COMPLEX: 3, MEDIUM: 2
• 2 Fixes (25%)
• 1 Refactor (13%)

🏆 Áreas de Impacto
• API (5 tareas) ← Tu expertise principal
• Backend (3 tareas)
• Frontend (2 tareas)

💡 Insight: Esta semana te enfocaste en COMPLEX features de API.
   Velocidad normal para ese nivel de complejidad.
```

**Con Fase 2 (+15 campos completos):**

```
📊 Última semana - Victor Rodriguez

🎯 Productividad
• 8 tareas completadas en 28.5 horas (58 SP)
• Promedio: 3.5h por tarea, 7.25 SP/tarea
• Código: +2,340 líneas / -580 líneas = +1,760 neto
• Alcance: 48 archivos modificados

📈 Distribución
• 5 Features (62%) - COMPLEX: 3, MEDIUM: 2
• 2 Fixes (25%)
• 1 Refactor (13%)

🏆 Calidad
• 248 tests ejecutados (95% success rate)
• 100% tareas con linting
• 1 tarea con desvío de alcance detectado

🏆 Áreas de Impacto
• API (5 tareas, +1,200 líneas) ← Tu expertise principal
• Backend (3 tareas, +800 líneas)
• Frontend (2 tareas, +340 líneas)

💡 Insights Avanzados:
   • Features COMPLEX: 5.2h promedio, 428 líneas/tarea
   • Features MEDIUM: 2.1h promedio, 156 líneas/tarea
   • Ratio agregado/eliminado: 4:1 (típico para features nuevas)
   • Tests: 31 tests/tarea (excelente cobertura)
   • Velocidad: 2.03 SP/hora (dentro del rango normal 1.5-2.5)

   ⚠️ Nota: 1 tarea con scope creep detectado (fix-auth-validation)
```

---

### ¿Qué Fase Elegir?

**Elige FASE 1 si:**

- ✅ Solo necesitas reportes básicos para stand-ups y 1-on-1s
- ✅ Quieres implementación rápida (1 día)
- ✅ Tu equipo no mide métricas de calidad rigurosamente

**Elige FASE 2 si:**

- ✅ Necesitas métricas de calidad para performance reviews
- ✅ Quieres detectar patrones de productividad avanzados
- ✅ Buscas correlaciones (velocidad vs calidad, complejidad vs líneas)
- ✅ Tienes cultura de testing y linting establecida

**Mi recomendación:** Implementar FASE 1 primero, evaluar por 2-4 semanas, luego decidir si FASE 2 agrega valor.

---

### 1️⃣ **¿Usamos Prompt o Script para generar reportes?**

**Respuesta: Prompt (con script de soporte híbrido)**

**Flujo de ejecución:**

```
Usuario → /flow-report
    ↓
Script bash (gratis):
  • Filtra datos por período con jq
  • Calcula métricas básicas
  • Prepara contexto optimizado
    ↓
Prompt IA (Claude):
  • Genera análisis inteligente
  • Identifica patrones y tendencias
  • Crea narrativa profesional
    ↓
Output → Reporte en markdown
```

**Ventajas del enfoque híbrido:**

- ✅ Script hace trabajo pesado (filtrado, cálculos) → **Gratis**
- ✅ IA hace análisis y narrativa → **Barato (~1-2 centavos)**
- ✅ Flexibilidad máxima sin mantener múltiples scripts
- ✅ Costo total anual: **<$2/año**

### 2️⃣ **¿Qué períodos soporta el reporte?**

**Respuesta: Todos los períodos relevantes**

| Período           | Comando            | Tareas Típicas | Uso Recomendado         | Costo    |
| ----------------- | ------------------ | -------------- | ----------------------- | -------- |
| **Día**           | `--period day`     | 1-3            | Stand-up diario         | $0.003   |
| **Semana**        | `--period week`    | 5-10           | Sprint review, Viernes  | $0.012   |
| **Mes**           | `--period month`   | 20-30          | 1-on-1 con manager      | $0.023   |
| **Trimestre**     | `--period quarter` | 60-90          | Performance review      | $0.038   |
| **Año**           | `--period year`    | 240-360        | Reporte anual ejecutivo | $0.090   |
| **Personalizado** | `--from X --to Y`  | Variable       | Sprints específicos     | Variable |

**Ejemplos de uso:**

```bash
# Reporte de hoy (para stand-up)
/flow-report --period day

# Última semana (más común)
/flow-report --period week

# Último mes (para 1-on-1)
/flow-report --period month --format executive

# Sprint de 2 semanas
/flow-report --from 2026-02-01 --to 2026-02-15
```

### 3️⃣ **¿Qué tipos de reportes están disponibles?**

**Respuesta: 5 tipos principales + personalizado**

| Tipo               | Descripción                         | Cuándo usarlo                    | Output       |
| ------------------ | ----------------------------------- | -------------------------------- | ------------ |
| **1. Ejecutivo**   | Overview rápido con métricas clave  | Diario, para ti mismo            | Texto breve  |
| **2. Detallado**   | Lista completa + análisis profundo  | Semanal/mensual, para manager    | Markdown     |
| **3. Timeline**    | Vista día por día de actividades    | Retrospectivas, auditoría        | Visual       |
| **4. Comparativo** | Vs período anterior, tendencias     | Mensual, mejora continua         | Tablas       |
| **5. Por Área**    | Agrupado por tags (API, Backend...) | Entender distribución de trabajo | Categorizado |
| **Personalizado**  | Según tu prompt específico          | Ad-hoc, necesidades especiales   | Flexible     |

**Ejemplos de cada tipo:**

#### Tipo 1: Ejecutivo (breve)

```
📊 RESUMEN - 10 Mar 2026
---
✅ 2 tareas (8 SP)
⏱️  5h 30min
📈 1.45 SP/h
```

#### Tipo 2: Detallado (completo)

```markdown
# 📊 Reporte Semanal Detallado

**Período:** 03-10 Mar 2026

## Resumen

• 12 tareas completadas
• 53 Story Points
• 42h 35min trabajados
• Velocity: 1.24 SP/h (+8% vs anterior)

## Tareas Completadas

1. **[Feature] Organizations API Sync** - 11 SP (16h 56m)
   - Branch: feature/org-api-sync
   - Tags: API, Backend, Organizations
2. **[Feature] User Import Flow** - 8 SP (2h 15m)
   - Branch: feature/user-import
   - Tags: Backend, Users

## Análisis

• Velocidad mejoró 8% vs semana anterior
• Features COMPLEX tomaron 30% menos tiempo
• Mantén balance actual de complejidad
```

#### Tipo 3: Timeline (visual)

```
📅 TIMELINE SEMANAL (03-10 Mar)

Lun 04  ████████████░░ 6h 45m  • Organizations API (COMPLEX)
Mar 05  ████░░░░░░░░░░ 3h 15m  • User Import (MEDIUM)
Mié 06  ░░░░░░░░░░░░░░ 0h 00m  (Sin actividad)
Jue 07  ███████████████ 7h 30m  • QA Fixes (SIMPLE)
                                • Session Restore (MEDIUM)
Vie 08  ████████░░░░░░ 4h 10m  • Auth Refactor (MEDIUM)
Sáb 09  ░░░░░░░░░░░░░░ 0h 00m  (Fin de semana)
Dom 10  ░░░░░░░░░░░░░░ 0h 00m  (Fin de semana)

📊 Total: 21h 40min (5.4h/día promedio)
```

#### Tipo 4: Comparativo (tendencias)

```
📊 COMPARATIVA MENSUAL

Métrica      Feb 2026    Mar 2026    Δ
---
Tareas         23          12       -48%
SP             89          53       -40%
Tiempo         74h         43h      -42%
Velocity      1.20        1.24     +3.3% ✅

📈 TENDENCIA: Velocity en aumento
💡 INSIGHT: Menos tareas pero más eficientes
```

#### Tipo 5: Por Área (distribución)

```
📊 DISTRIBUCIÓN POR ÁREA (Última semana)

API (45%)            ████████████░░  24h 15min
  • Organizations API Sync
  • User Import Flow
  • External integrations

Backend (30%)        ████████░░░░░░  16h 30min
  • Auth refactoring
  • Database optimization

Testing (25%)        ██████░░░░░░░░  13h 20min
  • Unit tests nuevos
  • E2E coverage
```

### 4️⃣ **¿Hay menú interactivo si no paso parámetros?**

**Respuesta: SÍ, absolutamente**

**Comportamiento sin parámetros:**

```bash
# Usuario ejecuta sin parámetros
/flow-report

# Sistema muestra menú interactivo:

┌────────────────────────────────────────────┐
│  AI Flow - Generador de Reportes          │
└────────────────────────────────────────────┘

👤 Usuario detectado: Victor Rodriguez

📅 Selecciona el período:
  1) Hoy
  2) Última semana ⭐ Recomendado
  3) Último mes
  4) Último trimestre
  5) Último año
  6) Personalizado (ingresar fechas)

Opción [1-6]: 2

📊 Selecciona el tipo de reporte:
  1) Resumen ejecutivo (texto breve)
  2) Detallado con análisis (markdown) ⭐ Recomendado
  3) Timeline visual (día por día)
  4) Comparativo (vs período anterior)
  5) Por área (agrupado por tags)

Opción [1-5]: 2

⏳ Generando reporte detallado de última semana...
   └─ Filtrando datos (2026-03-03 a 2026-03-10)...
   └─ Encontradas 8 tareas (32 SP)
   └─ Enviando a Claude (1,200 tokens)...
   └─ ✅ Completado en 2.3s (costo: $0.012)

📄 Reporte generado:
---
[Aquí va el reporte completo en markdown]
---

💾 ¿Guardar en archivo?
  [S]í - Guardar en .ai-flow/reports/weekly-2026-03-10.md
  [N]o - Solo mostrar en pantalla

[S/n]: S

✅ Reporte guardado en: .ai-flow/reports/weekly-2026-03-10.md
```

**Implementación del menú (código de referencia):**

```bash
#!/bin/bash
# prompts/shared/flow-report.md

if [ $# -eq 0 ]; then
  # MODO INTERACTIVO

  echo "┌────────────────────────────────────────────┐"
  echo "│  AI Flow - Generador de Reportes          │"
  echo "└────────────────────────────────────────────┘"
  echo ""

  USER=$(git config user.name)
  echo "👤 Usuario detectado: $USER"
  echo ""

  # Menú 1: Período
  echo "📅 Selecciona el período:"
  echo "  1) Hoy"
  echo "  2) Última semana ⭐"
  echo "  3) Último mes"
  echo "  4) Último trimestre"
  echo "  5) Último año"
  echo "  6) Personalizado"
  read -p "Opción [1-6]: " period_opt

  case $period_opt in
    1) PERIOD="day" ;;
    2) PERIOD="week" ;;
    3) PERIOD="month" ;;
    4) PERIOD="quarter" ;;
    5) PERIOD="year" ;;
    6)
      read -p "Desde (YYYY-MM-DD): " FROM_DATE
      read -p "Hasta (YYYY-MM-DD): " TO_DATE
      ;;
  esac

  # Menú 2: Tipo
  echo ""
  echo "📊 Selecciona el tipo:"
  echo "  1) Ejecutivo"
  echo "  2) Detallado ⭐"
  echo "  3) Timeline"
  echo "  4) Comparativo"
  echo "  5) Por área"
  read -p "Opción [1-5]: " type_opt

  case $type_opt in
    1) TYPE="executive" ;;
    2) TYPE="detailed" ;;
    3) TYPE="timeline" ;;
    4) TYPE="comparative" ;;
    5) TYPE="by-area" ;;
  esac

  # IA siempre habilitada (costo bajo, análisis valioso)
  USE_AI=true

  # Generar reporte con IA...

else
  # MODO CLI (con parámetros)
  # Parsear flags...
  ...
fi
```

---

### 5️⃣ **¿Fase 1 (5 campos) o Fase 2 (15 campos)?**

**Respuesta: Depende de tus necesidades de análisis**

**FASE 1 (Esencial) - RECOMENDADO PARA EMPEZAR:**

| Campo        | Valor Agregado                    | Disponibilidad  |
| ------------ | --------------------------------- | --------------- |
| `user`       | ⭐⭐⭐ Filtrado por desarrollador | Inmediata       |
| `summary`    | ⭐⭐⭐ Reportes legibles          | Inmediata       |
| `complexity` | ⭐⭐⭐ Análisis de esfuerzo       | Inmediata       |
| `branch`     | ⭐⭐ Trazabilidad                 | Inmediata       |
| `tags`       | ⭐⭐⭐ Expertise y agrupación     | Requiere lógica |

**Tiempo de implementación:** 1 día  
**Insights habilitados:** Identificación, contexto, distribución por área

---

**FASE 2 (Completo) - PARA MÉTRICAS AVANZADAS:**

| Campo             | Valor Agregado                  | Disponibilidad |
| ----------------- | ------------------------------- | -------------- |
| `tests_run`       | ⭐⭐ Cobertura de testing       | Inmediata      |
| `tests_passed`    | ⭐⭐ Tasa de éxito              | Inmediata      |
| `tests_failed`    | ⭐⭐ Detección de problemas     | Inmediata      |
| `lint_run`        | ⭐ Cumplimiento de estándares   | Inmediata      |
| `files_changed`   | ⭐⭐ Alcance de cambios         | Inmediata      |
| `lines_added`     | ⭐⭐⭐ Volumen y productividad  | Inmediata      |
| `lines_deleted`   | ⭐⭐ Refactoring                | Inmediata      |
| `net_lines`       | ⭐⭐ Crecimiento de código base | Calculado      |
| `deviation`       | ⭐ Scope creep                  | Inmediata      |
| `completed_tasks` | ⭐ Progreso (redundante)        | Inmediata      |

**Tiempo de implementación:** +1 día adicional  
**Insights habilitados:** Calidad, volumen, correlaciones avanzadas

---

**Decisión simplificada:**

```
¿Necesitas saber SI estás trabajando efectivamente?
  → FASE 1 es suficiente

¿Necesitas saber CÓMO estás trabajando y optimizar?
  → FASE 2 agrega valor
```

**Estrategia recomendada:**

1. Implementar FASE 1 ahora
2. Usar por 2-4 semanas
3. Evaluar si necesitas métricas avanzadas
4. Si sí → Implementar FASE 2

**Costo diferencial:** $0.003 adicionales por reporte (~+25% tokens) → No es factor decisorio.

---

## 📋 Tipos de Reportes

### 1. Reporte Semanal (Uso Principal)

**Qué muestra:**

- Tareas completadas en la semana
- Tiempo total trabajado
- Story Points completados
- Distribución por tipo de tarea
- Lista detallada de tareas

**Ejemplo de output:**

```
╔══════════════════════════════════════════════════════════════╗
║        REPORTE SEMANAL - Victor Rodriguez                    ║
║        Período: 03-10 Mar 2026                               ║
╚══════════════════════════════════════════════════════════════╝

📊 RESUMEN GENERAL
---
✅ Tareas completadas:        12
⏱️  Tiempo total:             42h 35min
⚡ Story Points:              53 SP
📈 Velocidad promedio:        1.24 SP/hora

📋 DISTRIBUCIÓN POR TIPO
---
Features:    8 tareas  (35 SP, 28h 15min)  ████████░░
Fixes:       3 tareas  (12 SP,  8h 45min)  ███░░░░░░░
Refactors:   1 tarea   ( 6 SP,  5h 35min)  ██░░░░░░░░

📝 TAREAS COMPLETADAS
---
1. [Feature] Organizations API Sync           11 SP  16h 56min  ✅
   └─ Branch: feature/org-api-sync

2. [Feature] User Import Flow                   8 SP   2h 15min  ✅
   └─ Branch: feature/user-import

3. [Fix] Critical QA Issues                     4 SP   0h 30min  ✅
   └─ Branch: fix/qa-critical
```

### 2. Comparativa Mensual

**Qué muestra:**

- Evolución mes a mes
- Comparativa con períodos anteriores
- Tendencias de productividad

**Ejemplo:**

```
Mes         Tareas  SP    Tiempo    Velocity  Δ vs anterior
---
Ene 2026      18    67    56h 30m    1.19     -
Feb 2026      23    89    74h 15m    1.20     ↑ 0.8%
Mar 2026      12    53    42h 35m    1.24     ↑ 3.3%

📈 TENDENCIA: Velocidad en aumento (+4.2% desde Enero)
```

### 3. Timeline Diario

**Qué muestra:**

- Actividad día por día
- Gaps (días sin commits)
- Horas efectivas por día

**Ejemplo:**

```
Lun 04/03  ████████████░░░░ 6h 45min  • Organizations API (COMPLEX)
Mar 05/03  ██████░░░░░░░░░░ 3h 15min  • User Import Flow (MEDIUM)
Mié 06/03  ░░░░░░░░░░░░░░░░ 0h 00min  (Sin actividad)
Jue 07/03  ███████████████░ 7h 30min  • Critical QA Fix (SIMPLE)
```

### 4. Análisis por Complejidad

**Qué muestra:**

- Distribución SIMPLE/MEDIUM/COMPLEX
- Tiempo promedio por complejidad
- Balance de trabajo

**Ejemplo:**

```
Complejidad    Tareas    SP Total    Tiempo Prom    % Total
---
SIMPLE            4         8 SP       45min         17%
MEDIUM           12        35 SP       92min         52%
COMPLEX           7        46 SP      278min         31%
```

---

## 🤖 Estrategia de Reportes: Híbrido (Scripts + IA)

### Nivel 1: Scripts (Gratis, Rápido)

**Uso:** Consultas diarias, métricas básicas, dashboards

**Ventajas:**

- ✅ Gratis (0 tokens)
- ✅ Instantáneo (<1s)
- ✅ Determinístico
- ✅ No requiere internet

**Desventajas:**

- ❌ No genera narrativas
- ❌ No identifica patrones complejos
- ❌ Formato fijo

**Ejemplo de comando:**

```bash
ai-flow report --period week --format text
```

**Output:**

```
📊 RESUMEN SEMANAL (03-10 Mar 2026)
✅ Tareas: 8
⚡ Story Points: 32 SP
⏱️  Tiempo: 24h 15min
📈 Velocity: 1.32 SP/h
```

### Nivel 2: IA con Insights (Barato, Inteligente)

**Uso:** Reportes semanales/mensuales con análisis

**Ventajas:**

- ✅ Genera narrativas profesionales
- ✅ Identifica patrones y tendencias
- ✅ Recomendaciones accionables
- ✅ Formato flexible

**Desventajas:**

- ⚠️ Costo (1-3 centavos por reporte)
- ⚠️ Requiere internet
- ⚠️ Latencia 2-3s

**Ejemplo de comando:**

```bash
ai-flow report --period week
```

**Output:**

```
📊 RESUMEN SEMANAL CON ANÁLISIS

Esta semana completaste 8 tareas (32 SP) en 24h 15min,
alcanzando una velocidad de 1.32 SP/h (+8% vs promedio).

INSIGHTS:
✨ Tu velocidad mejoró 8% esta semana
⚡ Las features COMPLEX están tomando menos tiempo
🎯 Mantén el balance actual de complejidad

RECOMENDACIÓN:
Considera documentar el approach de Organizations API
para futuras integraciones similares.
```

---

## 💰 Análisis de Costos (IA)

### Consumo por Período (Claude 3.5 Sonnet)

| Período      | Tareas Estimadas\* | Tokens Input | Tokens Output | Costo USD       | Frecuencia | Costo Anual |
| ------------ | ------------------ | ------------ | ------------- | --------------- | ---------- | ----------- |
| **1 semana** | ~5-10              | ~500         | ~700          | $0.012          | 52/año     | $0.62       |
| **1 mes**    | ~20-30             | ~1,800       | ~1,200        | $0.023          | 12/año     | $0.28       |
| **3 meses**  | ~60-90             | ~5,500       | ~1,500        | $0.038          | 4/año      | $0.15       |
| **1 año**    | ~240-360           | ~22,000      | ~2,000        | $0.090          | 1/año      | $0.09       |
|              |                    |              |               | **TOTAL ANUAL** |            | **~$1.14**  |

\* _Estimaciones basadas en desarrollador promedio. El sistema procesa TODAS las tareas del período sin límite._

**Conclusión:** Menos de $2/año para reportes ilimitados con IA 🎉

### Precios de Referencia

**Claude 3.5 Sonnet:**

- Input: $3 / 1M tokens
- Output: $15 / 1M tokens

**Cálculo ejemplo (reporte mensual con 25 tareas):**

- Input: 1,800 tokens × $3 / 1M = $0.0054
- Output: 1,200 tokens × $15 / 1M = $0.0180
- **Total: $0.023** (~2.3 centavos)

---

## 🛠️ Comandos CLI

### Sintaxis General

```bash
# Modo interactivo (menú guiado)
/flow-report

# Modo CLI (parámetros directos)
/flow-report [OPTIONS]
```

### Opciones Disponibles

```
--period <day|week|month|quarter|year>   Período predefinido
--from <YYYY-MM-DD>                      Fecha inicio personalizada
--to <YYYY-MM-DD>                        Fecha fin personalizada
--user <name>                            Usuario (default: git config user.name)
--type <executive|detailed|timeline|     Tipo de reporte
        comparative|by-area>
--output <file>                          Guardar en archivo
--format <text|markdown>                 Formato del archivo (solo con --output)
```

> **Nota:** Los reportes SIEMPRE se generan con IA (análisis + insights). Costo: ~1-2¢ por reporte.

### Ejemplos de Uso

**Modo Interactivo (Recomendado para empezar):**

```bash
# Sin parámetros → Menú guiado
/flow-report
```

**Modo CLI (Rápido cuando ya sabes qué quieres):**

```bash
# 1. Reporte diario para stand-up (~1 centavo, 2-3s)
/flow-report --period day

# 2. Reporte semanal estándar (~1 centavo, 2-3s)
/flow-report --period week

# 3. Reporte mensual detallado (para manager, ~2 centavos)
/flow-report --period month --type detailed

# 4. Reporte ejecutivo guardado (para presentación)
/flow-report --period month --type executive --output feb-2026.md

# 5. Timeline de sprint específico
/flow-report --from 2026-02-01 --to 2026-02-15 --type timeline

# 6. Comparativa trimestral
/flow-report --period quarter --type comparative

# 7. Distribución por áreas (última semana)
/flow-report --period week --type by-area

# 8. Reporte de otro desarrollador
/flow-report --period week --user "Juan Perez"

# 9. Reporte anual completo (año fiscal)
/flow-report --from 2026-01-01 --to 2026-12-31 --type detailed
```

### Valores por Defecto

Si no especificas algunos parámetros, se usan estos defaults:

| Parámetro  | Default                | Razón                         |
| ---------- | ---------------------- | ----------------------------- |
| `--period` | `week`                 | Uso más común                 |
| `--type`   | `detailed`             | Balance entre info y brevedad |
| `--user`   | `git config user.name` | Tu usuario actual             |
| `--format` | `markdown`             | Más portable                  |

> **Nota:** La IA siempre está activa (~1-2¢ por reporte).

**Ejemplo con defaults:**

```bash
# Esto:
/flow-report

# Equivale a:
/flow-report --period week --type detailed --user "$(git config user.name)"
```

---

## 📝 Plan de Implementación

### Fase 1: Mejorar analytics.jsonl (PRIORITARIO)

**Archivos a modificar:**

- `prompts/backend/flow-finish.md` (línea 259)
- `prompts/frontend/flow-finish.md` (línea 259)
- `prompts/mobile/flow-finish.md` (línea 259)
- `prompts/desktop/flow-finish.md` (línea 259)

**Cambios:**

1. **Agregar extracción de `user`:**

```bash
USER_NAME=$(git config user.name)
```

2. **Agregar extracción de `summary`:**

```bash
SUMMARY=$(grep -A 1 "^## Objective" "$TASK_PATH/work.md" | tail -1 | sed 's/^[[:space:]]*//' | cut -c 1-80)
```

3. **Agregar detección de `complexity`:**

```bash
if [ -f "$TASK_PATH/status.json" ]; then
  COMPLEXITY="COMPLEX"
else
  COMPLEXITY="MEDIUM"
fi
```

4. **Agregar `branch`:**

```bash
BRANCH_NAME=$(git branch --show-current)
```

5. **Agregar inferencia de `tags`:**

```bash
# Detectar áreas de impacto desde git diff
CHANGED_PATHS=$(git diff --name-only main..HEAD | head -10)
TAGS=()

if echo "$CHANGED_PATHS" | grep -qiE 'controller|route|endpoint'; then
  TAGS+=("API")
fi
if echo "$CHANGED_PATHS" | grep -qiE 'service|module|core'; then
  TAGS+=("Backend")
fi
if echo "$CHANGED_PATHS" | grep -qiE 'component|page|view'; then
  TAGS+=("Frontend")
fi

TAGS_JSON=$(printf '%s\n' "${TAGS[@]}" | jq -R . | jq -s .)
```

6. **Modificar construcción de JSON:**

```bash
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
```

**Beneficio:** Orden consistente de campos, tipos correctos (números como números)

### Fase 2: Scripts de Reportes (Bash)

**Crear archivo:** `scripts/report.sh`

**Funcionalidad:**

- Filtrado por período (week/month/quarter/year)
- Filtrado por usuario
- Cálculo de métricas agregadas
- Múltiples formatos de salida (text/markdown)

**Ejemplo de estructura:**

```bash
#!/bin/bash

function weekly_report() {
  local user=$1
  local start_date=$(date -d '7 days ago' +%Y-%m-%d)

  jq -r --arg user "$user" --arg start "$start_date" \
    'select(.user == $user and .start >= $start) |
     [.task, .type, .sp, .dur, .summary] | @tsv' \
    .ai-flow/archive/analytics.jsonl | \
    awk -F'\t' '
      BEGIN { print "📊 REPORTE SEMANAL\n" }
      {
        tasks++; sp+=$3; dur+=$4;
        printf "%d. [%s] %s - %d SP (%dh %02dm)\n",
          tasks, $2, $5, $3, int($4/60), int($4%60);
      }
      END {
        printf "\n✅ Total: %d tareas, %d SP, %dh %02dm\n",
          tasks, sp, int(dur/60), int(dur%60);
      }'
}
```

### Fase 3: Integración con IA (Opcional)

**Crear archivo:** `scripts/ai-report.sh`

**Funcionalidad:**

- Pre-filtrado con jq (ahorro de tokens)
- Generación de prompt optimizado
- Llamada a Claude API
- Post-procesamiento de salida

**Prompt template:**

```markdown
Genera un reporte profesional de desarrollo:

<period>
{período y rango de fechas}
</period>

<analytics>
{datos filtrados en formato JSON}
</analytics>

<format>
{text|markdown|executive}
</format>

Instrucciones:

1. Analiza todas las tareas sin límite de cantidad
2. Calcula métricas agregadas
3. Identifica patrones y tendencias
4. Genera insights accionables
5. Si >20 tareas, agrupa por categorías

Formato: [según --format]
Máximo: 500 palabras si <20 tareas, 800 si >20 tareas
```

### Fase 4: Documentación

**Actualizar archivos:**

- `README.md` - Agregar sección de reportes
- `GETTING-STARTED.md` - Tutorial de uso de `ai-flow report`
- `CHANGELOG.md` - Documentar cambios en analytics.jsonl

---

## 🔄 Migración de Datos Existentes

### Script para Normalizar analytics.jsonl Antiguo

```bash
#!/bin/bash
# scripts/migrate-analytics.sh

# Backup
cp .ai-flow/archive/analytics.jsonl .ai-flow/archive/analytics.jsonl.bak

# Agregar campos faltantes con valores default
jq -c '. + {
  user: (.user // "Unknown"),
  summary: (.summary // .task),
  complexity: (.complexity // "MEDIUM"),
  branch: (.branch // "unknown"),
  tags: (.tags // [])
}' .ai-flow/archive/analytics.jsonl.bak > .ai-flow/archive/analytics.jsonl

echo "✅ Migración completada"
echo "📊 Backup guardado en: analytics.jsonl.bak"
```

---

## 🎯 Decisiones Clave

### ✅ Confirmado:

1. **Ejecución: Prompt con script híbrido** ⭐ NUEVO
   - Script bash pre-filtra y calcula (gratis)
   - IA genera análisis y narrativa (barato)
   - Comando único: `/flow-report`

2. **Períodos soportados: Todos** ⭐ NUEVO
   - Día, semana, mes, trimestre, año, personalizado
   - Sin límite de cantidad de tareas por período
   - Filtrado solo por rango de fechas

3. **Tipos de reporte: 5 principales** ⭐ NUEVO
   - Ejecutivo (breve, para ti)
   - Detallado (completo, para manager)
   - Timeline (visual, día por día)
   - Comparativo (tendencias vs anterior)
   - Por área (distribución por tags)

4. **Menú interactivo: SÍ** ⭐ NUEVO
   - Sin parámetros → Menú guiado con 2 pasos (periodo + tipo)
   - Con parámetros → CLI directo
   - Defaults inteligentes (week, detailed)

5. **Enfoque híbrido** - Scripts + IA siempre
   - Bash/jq para filtrado (gratis)
   - Claude 3.5 Sonnet para análisis (siempre, ~1-2¢)
   - Costo tan bajo que no vale la pena preguntar

6. **Estructura de campos: 2 fases** ⭐ NUEVO
   - **Fase 1 (Esencial)**: `user`, `summary`, `complexity`, `branch`, `tags`
   - **Fase 2 (Completo)**: Métricas de calidad + volumen (10 campos más)
   - Implementar Fase 1 primero, evaluar si Fase 2 agrega valor

7. **Costos aceptables** - <$2/año para reportes ilimitados con IA

### ❌ Descartado:

1. **Integración con Jira** - No es prioridad
2. **Límite de 10 tareas** - Innecesario, procesamos todas del período
3. **Múltiples scripts por tipo** - Un solo comando `/flow-report` con opciones

### ⏸️ Evaluar Después (No descartado, pero no prioritario):

1. **Fase 2 (métricas avanzadas)** - Solo si Fase 1 no es suficiente
   - Métricas de calidad: tests_run, tests_passed, tests_failed, lint_run
   - Métricas de volumen: files_changed, lines_added, lines_deleted
   - Decisión: Después de usar Fase 1 por 2-4 semanas

---

## � Diagrama de Flujo Completo

```
┌─────────────────────────────────────────────────────────────────┐
│                    FLUJO DE REPORTES                            │
└─────────────────────────────────────────────────────────────────┘

┌─────────────┐
│   Usuario   │
└──────┬──────┘
       │
       ├─ Opción 1: Sin parámetros (MODO INTERACTIVO)
       │     └→ /flow-report
       │         ↓
       │     ┌─────────────────────────┐
       │     │  Menú Interactivo       │
       │     │  1. Período (día→año)   │
       │     │  2. Tipo (5 opciones)   │
       │     └──────────┬──────────────┘
       │                ↓
       │
       └─ Opción 2: Con parámetros (MODO CLI)
             └→ /flow-report --period week --type detailed
                 ↓

       ┌────────────────────────────────┐
       │  Script Bash (Pre-procesamiento)│
       ├────────────────────────────────┤
       │ 1. Lee analytics.jsonl         │
       │ 2. Filtra por fecha con jq     │
       │ 3. Filtra por usuario          │
       │ 4. Calcula métricas básicas    │
       │ 5. Cuenta tareas/SP/tiempo     │
       └────────────┬───────────────────┘
                    ↓

       ┌────────────────────────────────┐
       │  Decisión: ¿Usar IA?           │
       └────────┬───────────┬───────────┘
                │           │
       NO (gratis)        SÍ (~$0.01)
                │           │
                ↓           ↓
    ┌───────────────┐   ┌──────────────────────┐
    │ Script genera │   │  Prompt Template     │
    │ reporte texto │   │  + Datos filtrados   │
    │               │   │        ↓             │
    │ • Métricas    │   │  Claude 3.5 Sonnet   │
    │ • Listas      │   │  (2-3 segundos)      │
    │ • Tablas      │   │        ↓             │
    │               │   │  • Análisis          │
    │               │   │  • Insights          │
    │               │   │  • Recomendaciones   │
    │               │   │  • Narrativa         │
    └───────┬───────┘   └──────────┬───────────┘
            │                      │
            └──────────┬───────────┘
                       ↓
            ┌──────────────────────┐
            │   Output Final       │
            ├──────────────────────┤
            │ • Formato Markdown   │
            │ • Profesional        │
            │ • Con métricas       │
            │ • Con insights (IA)  │
            └──────────┬───────────┘
                       │
            ┌──────────┴───────────┐
            │                      │
            ↓                      ↓
    ┌───────────────┐      ┌─────────────────┐
    │ Mostrar en    │      │ Guardar archivo │
    │ pantalla      │      │ .ai-flow/       │
    │               │      │ reports/        │
    └───────────────┘      └─────────────────┘


LEYENDA:
---
📊 Datos:     analytics.jsonl (mejorado con 5 campos nuevos)
🔧 Proceso:   Script bash + jq (filtrado y cálculos)
🤖 IA:        Claude 3.5 Sonnet (análisis + insights)
💰 Costo:     $0.01-0.03 por reporte (siempre usa IA)
⏱️  Tiempo:    2-3 segundos
```

### Ejemplo de Transformación

**Input (analytics.jsonl con campos nuevos):**

```json
{"task":"org-api","type":"feature","dur":1016,"sp":11,"user":"Victor","summary":"Organizations API Sync",...}
{"task":"user-import","type":"feature","dur":135,"sp":8,"user":"Victor","summary":"User Import Flow",...}
{"task":"qa-fixes","type":"fix","dur":30,"sp":4,"user":"Victor","summary":"Critical QA Issues",...}
```

**Proceso:**

```bash
# Filtrar última semana
jq 'select(.start >= "2026-03-03")' analytics.jsonl

# Calcular agregados
# Total: 3 tareas, 23 SP, 20h

# Generar prompt para IA (opcional)
```

**Output (reporte generado):**

```markdown
# 📊 Reporte Semanal - Victor Rodriguez

**Período:** 03-10 Mar 2026

## Resumen

✅ 3 tareas | ⚡ 23 SP | ⏱️ 20h | 📈 1.15 SP/h

## Tareas

1. [Feature] Organizations API Sync - 11 SP (16h 56m)
2. [Feature] User Import Flow - 8 SP (2h 15m)
3. [Fix] Critical QA Issues - 4 SP (0h 30m)

## Insights (generado por IA)

• Velocity estable en comparación con semanas anteriores
• Feature de Organizations tomó más tiempo del estimado
• Respuesta rápida en fixes críticos (<1h)

## Recomendación

Documentar la integración de Organizations API para
futuras referencias similares.
```

---

## �📌 Próximos Pasos

### Para Implementar Fase 1:

1. [ ] Modificar `flow-finish.md` en los 4 tipos de proyecto (backend/frontend/mobile/desktop)
2. [ ] Agregar extracción de campos nuevos (`user`, `summary`, `complexity`, `branch`, `tags`)
3. [ ] Usar `jq -n` para construcción de JSON estructurado
4. [ ] Probar con tarea real: ejecutar `/flow-finish` y verificar output

### Para Implementar Fase 2:

1. [ ] Crear `scripts/report.sh` con funciones básicas
2. [ ] Implementar filtros por período
3. [ ] Agregar formatos de salida (text/markdown)
4. [ ] Documentar en README.md

### Para Implementar Fase 3 (Opcional):

1. [ ] Crear `scripts/ai-report.sh`
2. [ ] Implementar integración con Claude API
3. [ ] Optimizar prompt template
4. [ ] Agregar caché para reducir llamadas

---

## 📚 Referencias

### Archivos Relevantes

- `prompts/backend/flow-finish.md` - Generación de analytics
- `prompts/shared/task-summary-template.md` - Template de resúmenes
- `cache/docs-analysis.json` - No confundir con analytics (contexto diferente)

### Comandos Útiles para Testing

```bash
# Ver últimas 5 líneas de analytics
tail -5 .ai-flow/archive/analytics.jsonl | jq .

# Contar tareas por usuario
jq -r '.user' .ai-flow/archive/analytics.jsonl | sort | uniq -c

# Ver distribución por tipo
jq -r '.type' .ai-flow/archive/analytics.jsonl | sort | uniq -c

# Calcular SP total del mes
jq -r 'select(.start >= "2026-03-01") | .sp' analytics.jsonl | \
  awk '{sum+=$1} END {print sum " SP"}'
```

---

## 🎬 Conclusión

Este plan define una mejora incremental y práctica al sistema de analytics de AI Flow, enfocándose en:

1. **Agregar lo esencial primero (Fase 1)** - 5 campos críticos con impacto inmediato
2. **Evaluar métricas avanzadas después (Fase 2)** - 10 campos adicionales si es necesario
3. **Mantener costos bajos** - <$2/año con IA siempre activa
4. **Simplicidad de UX** - Scripts + IA siempre, sin opciones confusas
5. **Sin límites artificiales** - Procesar todas las tareas del período

### Próximos Pasos

**AHORA (DECIDIR):**

1. ¿Implementar Fase 1 (5 campos esenciales) o Fase 2 (15 campos completos)?
   - **Recomendación:** Fase 1 primero

**SI FASE 1:** 2. Modificar `flow-finish.md` en 4 tipos de proyecto (backend, frontend, mobile, desktop) 3. Agregar extracción de 5 campos: `user`, `summary`, `complexity`, `branch`, `tags` 4. 1 día de implementación

**SI FASE 2:** 2. Modificar `flow-finish.md` para extraer 15 campos 3. Requiere más lógica para git diff stats y métricas de testing 4. 2 días de implementación

**DESPUÉS (AMBAS FASES):** 3. Crear prompt `/flow-report` (script + IA) 4. Implementar menú interactivo 5. Generar primer reporte y validar utilidad

---

**Documento vivo** - Se actualizará conforme se implementen las fases y se descubran nuevos requisitos.

