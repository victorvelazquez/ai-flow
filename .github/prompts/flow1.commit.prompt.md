# Conventional Commits Automation

Automate atomic commits following Conventional Commits standard. Execute steps sequentially without user interaction except where explicitly required.

**Display Behavior:** Show step title (`## Step N/5: Name`) in your response BEFORE executing commands in that step.

---

## 🛡️ Step 0/5: Branch Protection Check

**CRITICAL VALIDATION** - Execute BEFORE any commit operation:

```bash
git branch --show-current
```

**Protected branches:** `main`, `master`, `develop`, `development`

**If current branch is protected:**

1. **Inform user:**

   ```
   ⚠️  Working on protected branch. Creating a new branch for your changes...
   ```

2. **Analyze changes** (automatic - no user interaction):

   ```bash
   git status --porcelain
   git diff --stat
   ```

   - Detect branch type from changes (feature/fix/refactor/chore)

3. **Generate branch name:**
   - Extract slug from changed files
   - Format: `[type]/[descriptive-slug]`

4. **Create and switch:**

   ```bash
   git checkout -b [type]/[slug]
   ```

5. **Confirm and continue to Step 1**

**If branch is NOT protected:** Continue to Step 1.

## 🔍 Step 1/5: Detect Changes

Use native git commands via `run_in_terminal` with `isBackground: false`. Execute all commands automatically (read-only operations):

```bash
git reset
git status --porcelain
git diff --stat
git diff --unified=1
git ls-files --others --exclude-standard
git diff --cached --stat
```

**If no changes detected:** Stop execution and inform user "No changes to commit."

## ⚡ Step 2/5: Group Changes

Analyze modified files and group by functional relationship. Create atomic commits per group.

### Grouping Rules (Priority Order)

**1. Dependencies** → `chore(deps)`

- `package.json` + `package-lock.json` always together

**2. Configuration** → `chore(config)`

- `tsconfig.json`, config files

**3. Feature Implementation** → `feat(cli)`

- `src/cli.ts` + related templates/prompts/slash-commands/docs

**4. Refactoring** → `refactor(cli|config)`

- `src/utils/*.ts` + usage sites

**5. Templates** → `docs(templates)`

- `templates/*.md` (each independent unless functionally related)

**6. Prompts** → `docs(prompts)`

- `prompts/*.md`, `slash-commands/**`, `.github/prompts/*.md`

**7. Documentation** → `docs(readme|docs)`

- `README.md`, standalone docs

### Scope Mapping

| File Pattern                                                | Scope       |
| ----------------------------------------------------------- | ----------- |
| `src/cli.ts`, `src/utils/*.ts`                              | `cli`       |
| `package.json`, `package-lock.json`                         | `deps`      |
| `tsconfig.json`                                             | `config`    |
| `templates/*.md`                                            | `templates` |
| `prompts/*.md`, `slash-commands/**`, `.github/prompts/*.md` | `prompts`   |
| `README.md`                                                 | `readme`    |

## ✅ Step 3/5: Generate Commits

For each group from Step 2, execute via `run_in_terminal`. **User must click Allow for each commit.**

### Command Pattern

```bash
git add <files> && git commit -m "<type>(<scope>): <description>"
```

### Message Format

`<type>(<scope>): <description>`

**Valid Types:** `feat|fix|docs|style|refactor|perf|test|chore|ci|revert`

**Valid Scopes:** `cli|deps|config|templates|prompts|readme`

### Validation Rules

| Rule           | Valid                  | Invalid                     |
| -------------- | ---------------------- | --------------------------- |
| Mood           | `add`, `update`, `fix` | `added`, `updated`, `fixed` |
| Language       | English only           | Spanish, mixed              |
| Capitalization | lowercase start        | Uppercase start             |
| Punctuation    | No period at end       | Ends with `.`               |
| Length         | Max 72 chars           | 73+ chars                   |

**Regex:** `^(feat|fix|docs|style|refactor|perf|test|chore|ci|revert)\([a-z-]+\):\s[a-z].{1,68}[^.]$`

### Examples

```bash
git add package.json package-lock.json && git commit -m "chore(deps): upgrade chalk to v5.6.2"
git add templates/README.template.md && git commit -m "docs(templates): improve list formatting"
git add .github/prompts/flow1.commit.prompt.md && git commit -m "docs(prompts): refactor commit automation"
```

## 🚀 Step 4/5: Finalize

### Show commit history (automatic)

```bash
git log --oneline --graph --decorate -n <count>
```

### Push to remote (requires Allow)

```bash
git push origin [current-branch]
```

**⚠️ NEVER suggest:** `git push origin main` or `git push origin master` or `git push origin develop` or `git push origin development`

**If push fails:** Show error and suggest resolution (e.g., pull first if behind remote).

---

## Execution Model

| Step   | Commands                                              | User Action            |
| ------ | ----------------------------------------------------- | ---------------------- |
| Step 0 | `git branch --show-current`                           | Automatic (validation) |
| Step 1 | `git reset`, `git status`, `git diff`, `git ls-files` | Automatic (read-only)  |
| Step 2 | Analysis and grouping                                 | Automatic              |
| Step 3 | `git add` + `git commit`                              | Click Allow per commit |
| Step 4 | `git log`                                             | Automatic (read-only)  |
| Step 4 | `git push`                                            | Click Allow            |

## Constraints

**Prohibited:**

- Interactive prompts or menus
- Generic scopes ("any", "multiple", "various")
- Mixed types in one commit (`feat` + `fix`)
- Periods at end of descriptions
- Spanish language in commit messages
- VS Code API tools for git operations

**Required:**

- Native git commands via `run_in_terminal`
- Atomic commits (one logical change per commit)
- Imperative mood in descriptions
- English-only messages
- Conventional Commits compliance

---

**Reference:** `docs/contributing.md` § 5.2 | Conventional Commits Spec  
**Last Updated:** 2025-11-27
