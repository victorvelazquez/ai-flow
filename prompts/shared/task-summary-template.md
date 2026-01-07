# Task Summary Template - Universal Format

**Purpose**: Generate standardized task summaries compatible with ClickUp, Jira, Linear, Asana, Trello, GitHub Projects, Azure DevOps, and any ticket management system.

**Usage**: This template is automatically populated by `/flow-work` after archiving completed work.

---

## 📋 Resumen de Tarea Completada

> **Compatibilidad**: ClickUp, Jira, Linear, Asana, Trello, GitHub Projects, Azure DevOps  
> **Formato**: Markdown (copiar/pegar directo)

---

### 📌 Título

**[Type]: [Descriptive Feature Name]**

**Ejemplos:**

- `Feature: Bulk Mark as Read con PENDING→READ y subscriber_id opcional`
- `Refactor: Aplicar SRP a bulkMarkAsRead (110→50 líneas)`
- `Fix: Corregir race condition en notificaciones móviles`

---

### 📝 Descripción

[Párrafo 1: Contexto y problema - 2-3 líneas]  
[Párrafo 2: Solución implementada - 2-3 líneas]

**Implementado:**

- [Feature/Fix 1 con detalles técnicos]
- [Feature/Fix 2 con detalles técnicos]
- [Feature/Fix 3 con detalles técnicos]

**Validación:**

- ✅ Tests: [X/X] passing ([Y] nuevos, [Z]% coverage)
- ✅ Lint: [N] errors, [M] warnings
- ✅ TypeCheck: passed/failed
- ✅ Docs: [N] archivos actualizados

---

### 📊 Métricas

| Campo                | Valor                                  |
| -------------------- | -------------------------------------- |
| **Duración**         | [X]h [Y]min                            |
| **Esfuerzo**         | [X.X] Story Points                     |
| **Commits**          | [N] commits                            |
| **Branch**           | `[feature/branch-name]`                |
| **Archivos**         | [N] modificados (+[XXX]/-[YYY] líneas) |
| **Breaking Changes** | ✅ No / ⚠️ Sí ([descripción])          |

---

### 🏷️ Labels/Tags

**Copiar según plataforma:**

- **ClickUp**: `Backend`, `API`, `[Scope]`, `Enhancement`
- **Jira**: Separar por comas en campo Labels
- **Linear**: Asignar a Team + Project correspondiente
- **GitHub**: Usar labels existentes del repo

**Tags generados:**

- **Tipo**: [Backend/Frontend/API/Database/Infrastructure]
- **Scope**: [módulo principal - ej: Deliveries, Auth, Subscribers]
- **Categoría**: [Enhancement/Bug Fix/Refactoring/Documentation/Security/Performance]
- **Prioridad**: [Critical/High/Medium/Low]

---

### 💡 Impacto

| Área                | Impacto                                  | Detalles                       |
| ------------------- | ---------------------------------------- | ------------------------------ |
| **UX**              | [↑ Mejora / → Sin cambios / ↓ Regresión] | [descripción breve]            |
| **Security**        | [↑ Mejora / → Sin cambios / ⚠️ Atención] | [descripción breve]            |
| **Performance**     | [↑ Mejora / → Sin cambios / ↓ Regresión] | [descripción breve]            |
| **Maintainability** | [↑ +X%]                                  | [reducción complejidad/líneas] |

---

### 🔧 Tech Debt

**[Si aplica]:**

- ✅ Resuelto: TECH-DEBT #[N] - [descripción]
- 💰 Ahorro estimado: ~[X] horas futuras
- 📈 Métricas mejoradas: [complejidad ciclomática, líneas de código, etc.]

**[Si no aplica]:** _No hay tech debt asociado a esta tarea_

---

### 🔗 Referencias

- **Branch**: `[branch-name]`
- **Commits**: `[hash1]`, `[hash2]`, `[hash3]` ([N] total)
- **PR/MR**: [#XXX] o _Pendiente de crear_
- **Related**: [HU-XXX-XXX] / [Feature X.X] / _N/A_

---

## 📋 Guía de Mapeo por Plataforma

### ClickUp

- **Título** → Task Name
- **Descripción** → Description (Markdown nativo)
- **Tags** → Custom Tags
- **Métricas** → Custom Fields (Time Tracked, Story Points)
- **Estado** → Status (Completado)

### Jira

- **Título** → Summary
- **Descripción** → Description (formato Markdown/Wiki)
- **Tags** → Labels (separados por coma)
- **Story Points** → Story Points field
- **Branch** → Development panel (auto-link)

### Linear

- **Título** → Issue Title
- **Descripción** → Full description
- **Tags** → Labels (auto-crear si no existen)
- **Métricas** → Custom fields o comentarios
- **Branch** → Git integration (auto-detect)

### GitHub Projects

- **Título** → Issue/PR Title
- **Descripción** → Body
- **Tags** → Labels del repositorio
- **Métricas** → Task lists en descripción
- **Branch** → Linked branches

### Azure DevOps

- **Título** → Work Item Title
- **Descripción** → Description (Rich Text)
- **Tags** → Tags field
- **Story Points** → Effort field
- **Branch** → Related Work Items

### Trello

- **Título** → Card Name
- **Descripción** → Card Description
- **Tags** → Labels (colores personalizables)
- **Métricas** → Checklists o comentarios
- **Branch** → Attachments o Power-Ups

### Asana

- **Título** → Task Name
- **Descripción** → Task Description
- **Tags** → Tags (auto-crear)
- **Métricas** → Custom Fields
- **Branch** → Comentarios o subtareas

---

## 🤖 Instrucciones de Población Automática

**Datos a extraer (fuentes):**

1. **status.json**:
   - `type` → Tipo de tarea (feature/refactor/fix)
   - `timestamps.created` y `timestamps.completed` → Calcular duración
   - `git.branchName` → Nombre de branch
   - `git.commits[]` → Lista de commits
   - `validation.*` → Resultados de tests, lint, typeCheck
   - `progress.totalTasks` → Número de tareas

2. **work.md**:
   - Sección "Objective" → Párrafos de descripción
   - Sección "Tasks" → Extraer Story Points (regex: `• (\d+) SP`)
   - Suma total de SP

3. **analytics.jsonl** (última línea):
   - `dur` → Duración en minutos
   - `sp` → Story Points
   - `commits` → Número de commits
   - `valid` → Validación exitosa

4. **TECH-DEBT.md** (si existe antes de eliminar carpeta):
   - Buscar secciones marcadas con ✅
   - Extraer títulos y métricas de mejora

5. **Git commands**:
   - `git diff --stat [first-commit]~1..HEAD` → Archivos modificados (+/-líneas)
   - `git log --oneline [branch]` → Hashes de commits
   - `git log [branch] --grep="BREAKING CHANGE:"` → Detectar breaking changes

**Inferencia automática:**

### Tags/Labels

- **Backend**: Si toca `src/modules/`, `src/core/`, `.service.ts`, `.controller.ts`
- **Frontend**: Si toca `components/`, `pages/`, `.tsx`, `.vue`, `.svelte`
- **API**: Si toca `.controller.ts`, `dto/`, `docs/api.md`
- **Database**: Si toca `entities/`, `migrations/`, `docs/database.md`
- **Security**: Si toca `guards/`, `auth/`, JWT, validation, `docs/security.md`
- **Performance**: Si menciona "optimization", "cache", "query", "N+1", "lazy load"
- **Testing**: Si agrega/modifica `*.spec.ts`, `*.test.ts`, `.e2e-spec.ts`
- **Documentation**: Si modifica `docs/*.md`, `README.md`, JSDoc, comments

### Prioridad

- **Critical**: Si es fix de seguridad, vulnerabilidad, producción caída
- **High**: Si hay breaking changes, afecta usuarios finales, deadline cercano
- **Medium**: Features nuevos, mejoras significativas, refactors importantes
- **Low**: Refactors internos, documentación, tech debt menor

### Scope

- Extraer del path principal modificado (ej: `src/modules/tenants/deliveries/` → Scope: "Deliveries")
- Si múltiples módulos: listar los 2-3 principales
- Patrón común: `src/modules/[global|tenants]/[scope-name]/`

### Impacto

**UX ↑** (Mejora):

- Agrega/mejora endpoints públicos user-facing
- Reduce latencia/tiempo de respuesta
- Mejora mensajes de error/feedback
- Agrega features solicitadas por usuarios

**Security ↑** (Mejora):

- Agrega validaciones/constraints
- Implementa guards/middlewares
- Mejora JWT/auth handling
- Previene inyecciones SQL/XSS
- Agrega rate limiting/throttling

**Performance ↑** (Mejora):

- Reduce número de queries (N+1)
- Agrega cache/memoization
- Optimiza loops/algoritmos
- Implementa lazy loading/pagination

**Maintainability ↑** (Mejora):

- Refactoriza métodos largos (calcular % reducción líneas)
- Reduce complejidad ciclomática (antes vs después)
- Extrae responsabilidades (SRP)
- Mejora naming/estructura
- Agrega tests/documentación

**Cálculo de porcentaje de mejora**:

```
Maintainability = ((líneas_antes - líneas_después) / líneas_antes) * 100
Ejemplo: (110 - 50) / 110 = 54.5% ≈ +55%
```

---

## 📝 Notas de Implementación

- El template se llena automáticamente al ejecutar Phase 4 de `/flow-work`
- Campos opcionales: Si no hay datos, mostrar "_N/A_" o "_No aplica_"
- Breaking Changes: Solo mostrar si se detecta en commits
- Tech Debt: Solo mostrar sección si existe `TECH-DEBT.md`
- Todos los emojis son opcionales (quitar si la plataforma no los soporta)
- Formato Markdown es universal (todas las plataformas lo renderizan)
