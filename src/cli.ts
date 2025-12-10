#!/usr/bin/env node

import { Command } from 'commander';
import inquirer from 'inquirer';
import chalk from 'chalk';
import ora from 'ora';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import ejs from 'ejs';
import { assertDirWritable } from './fs-utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const program = new Command();

interface AIToolChoice {
  name: string;
  value: string;
  description: string;
}

const AI_TOOLS: AIToolChoice[] = [
  {
    name: 'GitHub Copilot',
    value: 'copilot',
    description: '',
  },
  {
    name: 'Claude Code',
    value: 'claude',
    description: '',
  },
  {
    name: 'Cursor',
    value: 'cursor',
    description: '',
  },
  {
    name: 'Gemini',
    value: 'gemini',
    description: '',
  },
  {
    name: 'All AI Tools',
    value: 'all',
    description: '',
  },
];

// Read package.json for version
const packageJsonPath = path.join(__dirname, '..', 'package.json');
const packageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf-8'));
const PKG_VERSION: string = packageJson.version;

const EXIT = {
  OK: 0,
  INVALID_ARGS: 2,
  FS_ERROR: 3,
} as const;

function logVerbose(message: string, verbose?: boolean) {
  if (verbose) console.log(chalk.gray(message));
}

function isValidName(value: string): boolean {
  const v = value.trim();
  if (v.length < 2 || v.length > 100) return false;
  return /^[A-Za-z0-9 _\-\.]+$/.test(v);
}

function isValidDescription(value: string): boolean {
  const v = value.trim();
  if (v.length < 2 || v.length > 500) return false;
  return /^[\p{L}\p{N} \-_,.!?:()]+$/u.test(v);
}

function fsErrorMessage(e: unknown): string {
  const anyErr = e as any;
  const code = anyErr && anyErr.code ? String(anyErr.code) : 'UNKNOWN';
  const msg = anyErr && anyErr.message ? String(anyErr.message) : String(e);
  return `${code}: ${msg}`;
}

async function selectAITool(providedTool?: string): Promise<string[]> {
  if (providedTool) {
    const tool = AI_TOOLS.find((t) => t.value === providedTool);
    if (!tool) {
      console.error(chalk.red(`❌ Invalid AI tool: ${providedTool}`));
      console.log(
        chalk.yellow('Available options: claude, cursor, copilot, gemini, all')
      );
      process.exit(EXIT.INVALID_ARGS);
    }
    return providedTool === 'all'
      ? ['claude', 'cursor', 'copilot', 'gemini']
      : [providedTool];
  }

  // Display banner
  console.log('\n');
  console.log(
    chalk.cyan(
      '    ╔═══════════════════════════════════════════════════════════════════╗'
    )
  );
  console.log(
    chalk.cyan('    ║') +
      '                                                                   ' +
      chalk.cyan('║')
  );
  console.log(
    chalk.cyan('    ║') +
      chalk.bold.cyan(
        '          █████╗ ██╗    ███████╗██╗      ██████╗ ██╗    ██╗'
      ) +
      '        ' +
      chalk.cyan('║')
  );
  console.log(
    chalk.cyan('    ║') +
      chalk.bold.cyan(
        '         ██╔══██╗██║    ██╔════╝██║     ██╔═══██╗██║    ██║'
      ) +
      '        ' +
      chalk.cyan('║')
  );
  console.log(
    chalk.cyan('    ║') +
      chalk.bold.cyan(
        '         ███████║██║    █████╗  ██║     ██║   ██║██║ █╗ ██║'
      ) +
      '        ' +
      chalk.cyan('║')
  );
  console.log(
    chalk.cyan('    ║') +
      chalk.bold.cyan(
        '         ██╔══██║██║    ██╔══╝  ██║     ██║   ██║██║███╗██║'
      ) +
      '        ' +
      chalk.cyan('║')
  );
  console.log(
    chalk.cyan('    ║') +
      chalk.bold.cyan(
        '         ██║  ██║██║    ██║     ███████╗╚██████╔╝╚███╔███╔╝'
      ) +
      '        ' +
      chalk.cyan('║')
  );
  console.log(
    chalk.cyan('    ║') +
      chalk.cyan('         ╚═╝  ╚═╝╚═╝    ╚═╝     ╚══════╝ ╚═════╝  ╚══╝╚══╝') +
      '         ' +
      chalk.cyan('║')
  );
  console.log(
    chalk.cyan('    ║') +
      '                                                                   ' +
      chalk.cyan('║')
  );
  console.log(
    chalk.cyan('    ║') +
      '           ' +
      chalk.white('✨ From Idea to Production with AI Guidance') +
      '             ' +
      chalk.cyan('║')
  );
  console.log(
    chalk.cyan('    ║') +
      '                                                                   ' +
      chalk.cyan('║')
  );
  console.log(
    chalk.cyan(
      '    ╚═══════════════════════════════════════════════════════════════════╝'
    )
  );
  console.log('\n');
  console.log(chalk.white('    📂 Project Setup'));
  console.log(
    chalk.gray(
      '    ────────────────────────────────────────────────────────────────────'
    )
  );
  console.log(chalk.gray(`    Working Directory: ${process.cwd()}`));
  console.log(chalk.gray(`    Version: ${PKG_VERSION}`));
  console.log('\n');
  console.log(chalk.white('    🤖 Select your AI development tool:'));
  console.log(
    chalk.gray(
      '    ────────────────────────────────────────────────────────────────────'
    )
  );

  const { selectedTool } = await inquirer.prompt([
    {
      type: 'rawlist',
      name: 'selectedTool',
      message: 'Select your AI tool:',
      choices: AI_TOOLS.map((tool) => ({
        name: tool.name,
        value: tool.value,
      })),
      default: 1,
    },
  ]);

  return selectedTool === 'all'
    ? ['claude', 'cursor', 'copilot', 'gemini']
    : [selectedTool];
}

async function selectProjectType(
  providedType?: string
): Promise<'backend' | 'frontend' | 'fullstack' | 'mobile'> {
  // v1.4.0: Backend, Frontend, Fullstack, and Mobile supported
  if (providedType) {
    const valid = ['backend', 'frontend', 'fullstack', 'mobile'];
    if (!valid.includes(providedType)) {
      console.error(chalk.red(`❌ Invalid project type: ${providedType}`));
      console.log(
        chalk.yellow('Available options: backend, frontend, fullstack, mobile')
      );
      process.exit(EXIT.INVALID_ARGS);
    }
    return providedType as 'backend' | 'frontend' | 'fullstack' | 'mobile';
  }

  // If no TTY available (non-interactive mode, e.g., in tests), default to backend
  // This maintains backward compatibility with existing tests and scripts
  if (!process.stdin.isTTY) {
    return 'backend';
  }

  // v1.4.0: Interactive selection for backend/frontend/fullstack/mobile
  const answer = await inquirer.prompt([
    {
      type: 'rawlist',
      name: 'projectType',
      message: 'What type of project are you bootstrapping?',
      choices: [
        { name: '🔧 Backend API/Service', value: 'backend' },
        { name: '🎨 Frontend Application', value: 'frontend' },
        { name: '🚀 Full Stack Application', value: 'fullstack' },
        { name: '📱 Mobile Application', value: 'mobile' },
      ],
      default: 1,
    },
  ]);
  return answer.projectType;
}

async function checkIfInitialized(targetPath: string): Promise<boolean> {
  const bootstrapPath = path.join(targetPath, '.ai-flow');
  return await fs.pathExists(bootstrapPath);
}

async function createBootstrapStructure(
  targetPath: string,
  aiTools: string[],
  projectType: 'backend' | 'frontend' | 'fullstack' | 'mobile' = 'backend',
  dryRun?: boolean,
  verbose?: boolean
): Promise<void> {
  const spinner = ora('Creating .ai-flow structure...').start();

  try {
    const bootstrapPath = path.join(targetPath, '.ai-flow');

    // Create core directories
    if (dryRun) {
      spinner.succeed('Created .ai-flow structure (dry-run)');
      return;
    }
    await assertDirWritable(targetPath);
    await fs.ensureDir(path.join(bootstrapPath, 'core'));
    await fs.ensureDir(path.join(bootstrapPath, 'prompts'));
    await fs.ensureDir(path.join(bootstrapPath, 'templates', 'docs'));
    await fs.ensureDir(path.join(bootstrapPath, 'templates', 'specs'));

    // Create config file with new projectType field
    const config = {
      version: PKG_VERSION,
      aiTools: aiTools,
      createdAt: new Date().toISOString(),
      projectType: projectType,
      // Deprecated fields for backward compatibility
      backend: projectType === 'backend' || projectType === 'fullstack',
      frontend: projectType === 'frontend' || projectType === 'fullstack',
      mobile: projectType === 'mobile',
    };

    await fs.writeJSON(
      path.join(bootstrapPath, 'core', 'config.json'),
      config,
      { spaces: 2 }
    );
    logVerbose(
      `Wrote ${path.join(bootstrapPath, 'core', 'config.json')}`,
      verbose
    );

    spinner.succeed('Created .ai-flow structure');
  } catch (error) {
    spinner.fail(fsErrorMessage(error));
    throw error;
  }
}

async function renderTemplates(
  targetPath: string,
  projectData: { name: string; description: string },
  projectType: 'backend' | 'frontend' | 'fullstack' | 'mobile' = 'backend',
  aiTools: string[] = [],
  dryRun?: boolean,
  verbose?: boolean
): Promise<void> {
  const spinner = ora('Generating documentation from templates...').start();
  try {
    const templatesTarget = path.join(targetPath, '.ai-flow', 'templates');
    if (dryRun) {
      spinner.succeed('Documentation generated from templates (dry-run)');
      return;
    }
    await assertDirWritable(templatesTarget);
    await fs.ensureDir(templatesTarget);

    // Find all .template.md and .template files in a directory and subfolders
    const walk = async (dir: string): Promise<string[]> => {
      let files: string[] = [];
      for (const entry of await fs.readdir(dir)) {
        const fullPath = path.join(dir, entry);
        const stat = await fs.stat(fullPath);
        if (stat.isDirectory()) {
          files = files.concat(await walk(fullPath));
        } else if (
          entry.endsWith('.template.md') ||
          entry.endsWith('.template')
        ) {
          files.push(fullPath);
        }
      }
      return files;
    };

    // Collect template files from shared and project-type-specific directories
    const templateSources: { source: string; base: string }[] = [];

    // Always include shared templates (e.g., AGENT.md)
    const sharedSource = path.join(ROOT_DIR, 'templates', 'shared');
    templateSources.push({ source: sharedSource, base: sharedSource });

    // Include project-type-specific templates
    if (projectType === 'backend') {
      const backendSource = path.join(ROOT_DIR, 'templates', 'backend');
      templateSources.push({ source: backendSource, base: backendSource });
    } else if (projectType === 'frontend') {
      const frontendSource = path.join(ROOT_DIR, 'templates', 'frontend');
      templateSources.push({ source: frontendSource, base: frontendSource });
    } else if (projectType === 'fullstack') {
      // v1.3.0: Copy both backend and frontend templates
      // Priority: fullstack-specific templates > backend templates > frontend templates
      const fullstackSource = path.join(ROOT_DIR, 'templates', 'fullstack');
      const backendSource = path.join(ROOT_DIR, 'templates', 'backend');
      const frontendSource = path.join(ROOT_DIR, 'templates', 'frontend');

      // Check if fullstack templates directory exists
      const fullstackExists = await fs.pathExists(fullstackSource);
      if (fullstackExists) {
        templateSources.push({
          source: fullstackSource,
          base: fullstackSource,
        });
      }
      // Backend templates (used as base for conflicts)
      templateSources.push({ source: backendSource, base: backendSource });
      // Frontend templates (will overwrite only if not in fullstack and not conflicting with backend)
      templateSources.push({ source: frontendSource, base: frontendSource });
    } else if (projectType === 'mobile') {
      // v1.4.0: Copy mobile templates
      const mobileSource = path.join(ROOT_DIR, 'templates', 'mobile');
      templateSources.push({ source: mobileSource, base: mobileSource });
    }

    // Walk all source directories and collect template files
    // For fullstack, use a Map to track processed files (priority: fullstack > backend > frontend)
    const processedFiles = new Map<string, { file: string; base: string }>();

    for (const { source, base } of templateSources) {
      const files = await walk(source);
      for (const file of files) {
        const relPath = path
          .relative(base, file)
          .replace('.template.md', '.md')
          .replace('.template', '');
        // Only add if not already processed (first occurrence wins)
        if (!processedFiles.has(relPath)) {
          processedFiles.set(relPath, { file, base });
        }
      }
    }

    // Render each template
    for (const [relPath, { file: templateFile }] of processedFiles) {
      // Skip AI tool-specific config files if the tool is not selected
      const fileName = path.basename(relPath);
      if (
        fileName === '.clauderules' &&
        !aiTools.includes('claude') &&
        !aiTools.includes('all')
      ) {
        logVerbose(`Skipping ${relPath} (Claude not selected)`, verbose);
        continue;
      }
      if (
        fileName === '.cursorrules' &&
        !aiTools.includes('cursor') &&
        !aiTools.includes('all')
      ) {
        logVerbose(`Skipping ${relPath} (Cursor not selected)`, verbose);
        continue;
      }

      const destPath = path.join(templatesTarget, relPath);
      await fs.ensureDir(path.dirname(destPath));
      const templateContent = await fs.readFile(templateFile, 'utf8');
      // Render with EJS, leaving {{PLACEHOLDER}} for everything except name/description
      const rendered = ejs.render(
        templateContent,
        {
          PROJECT_NAME: projectData.name,
          PROJECT_DESCRIPTION: projectData.description,
          PROJECT_TYPE: projectType,
          GENERATION_DATE: new Date().toISOString().split('T')[0],
          PLACEHOLDER: '{{PLACEHOLDER}}',
        },
        { delimiter: '?' }
      );
      await fs.writeFile(destPath, rendered, 'utf8');
      logVerbose(`Rendered ${destPath}`, verbose);
    }
    spinner.succeed('Documentation generated from templates');
  } catch (error) {
    spinner.fail(fsErrorMessage(error));
    throw error;
  }
}

async function copyPrompts(
  targetPath: string,
  dryRun?: boolean,
  verbose?: boolean
): Promise<void> {
  const spinner = ora('Copying master prompts...').start();

  try {
    const promptsSource = path.join(ROOT_DIR, 'prompts');
    const promptsTarget = path.join(targetPath, '.ai-flow', 'prompts');

    if (dryRun) {
      spinner.succeed('Master prompts copied (dry-run)');
      return;
    }
    await assertDirWritable(promptsTarget);
    await fs.copy(promptsSource, promptsTarget);
    logVerbose(`Copied prompts to ${promptsTarget}`, verbose);

    spinner.succeed('Master prompts copied');
  } catch (error) {
    spinner.fail(fsErrorMessage(error));
    throw error;
  }
}

async function setupSlashCommands(
  targetPath: string,
  aiTools: string[],
  projectType: 'backend' | 'frontend' | 'fullstack' | 'mobile' = 'backend',
  dryRun?: boolean,
  verbose?: boolean
): Promise<void> {
  const spinner = ora('Setting up slash commands...').start();

  try {
    // Determine which prompt directories to copy from
    const promptSources: Array<{ dir: string; prefix?: string }> = [];

    if (projectType === 'backend') {
      promptSources.push({ dir: 'backend' });
    } else if (projectType === 'frontend') {
      promptSources.push({ dir: 'frontend' });
    } else if (projectType === 'fullstack') {
      // For fullstack, copy both with prefixes
      promptSources.push({ dir: 'backend', prefix: 'backend-' });
      promptSources.push({ dir: 'frontend', prefix: 'frontend-' });
    } else if (projectType === 'mobile') {
      promptSources.push({ dir: 'mobile' });
    }

    for (const { dir, prefix } of promptSources) {
      const promptsSource = path.join(ROOT_DIR, 'prompts', dir);
      const allFiles = await fs.readdir(promptsSource);
      // Filter all markdown files (all prompts are valid slash commands)
      const files = allFiles.filter((file) => file.endsWith('.md'));

      for (const tool of aiTools) {
        if (tool === 'copilot') {
          // Copilot: prompts in .github/prompts with .prompt.md suffix
          const promptsTarget = path.join(targetPath, '.github', 'prompts');
          if (!dryRun) {
            await assertDirWritable(promptsTarget);
            await fs.ensureDir(promptsTarget);
          }
          for (const file of files) {
            const srcFile = path.join(promptsSource, file);
            const base = file.replace(/\.md$/, '');
            const destName = prefix
              ? `${prefix}${base}.prompt.md`
              : `${base}.prompt.md`;
            const destFile = path.join(promptsTarget, destName);
            if (!dryRun) await fs.copyFile(srcFile, destFile);
            logVerbose(`Installed ${destFile}`, verbose);
          }
        } else if (tool === 'claude') {
          const commandsTarget = path.join(targetPath, '.claude', 'commands');
          if (!dryRun) {
            await assertDirWritable(commandsTarget);
            await fs.ensureDir(commandsTarget);
          }
          for (const file of files) {
            const srcFile = path.join(promptsSource, file);
            const destName = prefix ? `${prefix}${file}` : file;
            const destFile = path.join(commandsTarget, destName);
            if (!dryRun) await fs.copyFile(srcFile, destFile);
            logVerbose(`Installed ${destFile}`, verbose);
          }
        } else if (tool === 'cursor') {
          const commandsTarget = path.join(targetPath, '.cursor', 'commands');
          if (!dryRun) {
            await assertDirWritable(commandsTarget);
            await fs.ensureDir(commandsTarget);
          }
          for (const file of files) {
            const srcFile = path.join(promptsSource, file);
            const destName = prefix ? `${prefix}${file}` : file;
            const destFile = path.join(commandsTarget, destName);
            if (!dryRun) await fs.copyFile(srcFile, destFile);
            logVerbose(`Installed ${destFile}`, verbose);
          }
        } else if (tool === 'gemini') {
          const commandsTarget = path.join(targetPath, '.gemini', 'commands');
          if (!dryRun) {
            await assertDirWritable(commandsTarget);
            await fs.ensureDir(commandsTarget);
          }
          for (const file of files) {
            const srcFile = path.join(promptsSource, file);
            const destName = prefix ? `${prefix}${file}` : file;
            const destFile = path.join(commandsTarget, destName);
            if (!dryRun) await fs.copyFile(srcFile, destFile);
            logVerbose(`Installed ${destFile}`, verbose);
          }
        }
      }
    }

    spinner.succeed(`Slash commands set up for: ${aiTools.join(', ')}`);
  } catch (error) {
    spinner.fail(fsErrorMessage(error));
    throw error;
  }
}

async function initializeProject(
  targetPath: string,
  aiTool?: string,
  projectType?: string,
  projectName?: string,
  projectDescription?: string,
  flags?: { dryRun?: boolean; verbose?: boolean }
): Promise<void> {
  try {
    // Check if already initialized
    const isInitialized = await checkIfInitialized(targetPath);
    if (isInitialized) {
      console.log(
        chalk.yellow('\n⚠️  Project already initialized with AI Flow')
      );
      const { reinitialize } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'reinitialize',
          message: 'Do you want to reinitialize?',
          default: false,
        },
      ]);
      if (!reinitialize) {
        console.log(chalk.blue('Initialization cancelled'));
        return;
      }
    }

    // Select AI tools
    const aiTools = await selectAITool(aiTool);

    // Select project type (v1.2.0: backend or frontend)
    const selectedProjectType = await selectProjectType(projectType);

    // Infer project name from directory
    const inferredName = path
      .basename(targetPath)
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    // Request minimal project data only if not provided
    if (projectName && !isValidName(projectName)) {
      console.error(chalk.red('Invalid project name'));
      process.exit(EXIT.INVALID_ARGS);
    }
    if (projectDescription && !isValidDescription(projectDescription)) {
      console.error(chalk.red('Invalid project description'));
      process.exit(EXIT.INVALID_ARGS);
    }
    let finalProjectName = projectName;
    let finalProjectDescription =
      projectDescription || 'TBD - Run /flow-bootstrap to define';

    if (!finalProjectName) {
      const answers = await inquirer.prompt([
        {
          type: 'input',
          name: 'projectName',
          message: 'Project name (you can refine it in /bootstrap):',
          default: inferredName,
          validate: (input: string) =>
            isValidName(input) ||
            'Enter 2-100 chars: letters, numbers, space, - _ .',
        },
      ]);
      finalProjectName = answers.projectName;
    }

    console.log(chalk.cyan('\n📦 Initializing AI Flow...\n'));

    // Create structure
    await createBootstrapStructure(
      targetPath,
      aiTools,
      selectedProjectType,
      flags?.dryRun,
      flags?.verbose
    );
    await renderTemplates(
      targetPath,
      { name: finalProjectName!, description: finalProjectDescription! },
      selectedProjectType,
      aiTools,
      flags?.dryRun,
      flags?.verbose
    );
    await copyPrompts(targetPath, flags?.dryRun, flags?.verbose);
    await setupSlashCommands(
      targetPath,
      aiTools,
      selectedProjectType,
      flags?.dryRun,
      flags?.verbose
    );

    const modeText = flags?.dryRun ? 'DRY-RUN' : 'WRITE';
    console.log(chalk.green('\n✅ AI Flow initialized successfully!'));
    console.log(chalk.white('\nSummary:'));
    console.log(chalk.gray(`  Project: ${finalProjectName}`));
    console.log(chalk.gray(`  Version: ${PKG_VERSION}`));
    console.log(chalk.gray(`  Directory: ${targetPath}`));
    console.log(chalk.gray(`  Tools: ${aiTools.join(', ')}`));
    console.log(chalk.gray(`  Mode: ${modeText}`));
    console.log(chalk.white('\nNext steps:\n'));

    const toolsText =
      aiTools.length === 1
        ? aiTools[0]
        : `${aiTools.slice(0, -1).join(', ')} and ${
            aiTools[aiTools.length - 1]
          }`;

    if (selectedProjectType === 'fullstack') {
      if (aiTools.includes('claude')) {
        console.log(chalk.cyan('  1. Open Claude Code'));
        console.log(
          chalk.cyan('  2. Run: /backend-flow-bootstrap (for backend documentation)')
        );
        console.log(
          chalk.cyan(
            '  3. Run: /frontend-flow-bootstrap (for frontend documentation)'
          )
        );
        console.log(chalk.gray('     Each will guide you through 7 phases\n'));
      } else if (aiTools.includes('cursor')) {
        console.log(chalk.cyan('  1. Open Cursor'));
        console.log(
          chalk.cyan('  2. Run: /backend-flow-bootstrap (for backend documentation)')
        );
        console.log(
          chalk.cyan(
            '  3. Run: /frontend-flow-bootstrap (for frontend documentation)'
          )
        );
        console.log(chalk.gray('     Each will guide you through 7 phases\n'));
      } else {
        console.log(chalk.cyan(`  1. Open your AI tool (${toolsText})`));
        console.log(
          chalk.cyan('  2. Run: /backend-flow-bootstrap (for backend documentation)')
        );
        console.log(
          chalk.cyan(
            '  3. Run: /frontend-flow-bootstrap (for frontend documentation)'
          )
        );
        console.log(chalk.gray('     Each will guide you through 7 phases\n'));
      }

      console.log(chalk.white('Available slash commands:'));
      console.log(chalk.gray('  Backend commands:'));
      console.log(
        chalk.gray(
          '    /backend-flow-bootstrap                    - Backend 7-phase documentation generation'
        )
      );
      console.log(
        chalk.gray(
          '    /backend-flow-bootstrap-phase-0-context     - Backend context discovery'
        )
      );
      console.log(
        chalk.gray(
          '    /backend-flow-bootstrap-phase-1-business    - Backend discovery & business'
        )
      );
      console.log(
        chalk.gray(
          '    /backend-flow-bootstrap-phase-2-data        - Backend data architecture'
        )
      );
      console.log(
        chalk.gray(
          '    /backend-flow-bootstrap-phase-3-architecture - Backend system architecture'
        )
      );
      console.log(
        chalk.gray(
          '    /backend-flow-bootstrap-phase-4-security    - Backend security & auth'
        )
      );
      console.log(
        chalk.gray(
          '    /backend-flow-bootstrap-phase-5-standards    - Backend code standards'
        )
      );
      console.log(
        chalk.gray(
          '    /backend-flow-bootstrap-phase-6-testing     - Backend testing'
        )
      );
      console.log(
        chalk.gray(
          '    /backend-flow-bootstrap-phase-7-operations  - Backend operations + tools'
        )
      );
      console.log(
        chalk.gray(
          '    /backend-flow-docs-sync                  - Update backend documentation\n'
        )
      );
      console.log(chalk.gray('  Frontend commands:'));
      console.log(
        chalk.gray(
          '    /frontend-flow-bootstrap                    - Frontend 7-phase documentation generation'
        )
      );
      console.log(
        chalk.gray(
          '    /frontend-flow-bootstrap-phase-0-context    - Frontend context discovery'
        )
      );
      console.log(
        chalk.gray(
          '    /frontend-flow-bootstrap-phase-1-discovery  - Frontend discovery & UX'
        )
      );
      console.log(
        chalk.gray(
          '    /frontend-flow-bootstrap-phase-2-components  - Frontend components & framework'
        )
      );
      console.log(
        chalk.gray(
          '    /frontend-flow-bootstrap-phase-3-state       - Frontend state management'
        )
      );
      console.log(
        chalk.gray(
          '    /frontend-flow-bootstrap-phase-4-styling     - Frontend styling & design'
        )
      );
      console.log(
        chalk.gray(
          '    /frontend-flow-bootstrap-phase-5-standards  - Frontend code standards'
        )
      );
      console.log(
        chalk.gray(
          '    /frontend-flow-bootstrap-phase-6-testing    - Frontend testing'
        )
      );
      console.log(
        chalk.gray(
          '    /frontend-flow-bootstrap-phase-7-deployment - Frontend deployment'
        )
      );
      console.log(
        chalk.gray(
          '    /frontend-flow-docs-sync                  - Update frontend documentation\n'
        )
      );
    } else if (selectedProjectType === 'mobile') {
      if (aiTools.includes('claude')) {
        console.log(chalk.cyan('  1. Open Claude Code'));
        console.log(chalk.cyan('  2. Run: /bootstrap'));
        console.log(
          chalk.gray('     This will start the 7-phase interactive setup\n')
        );
      } else if (aiTools.includes('cursor')) {
        console.log(chalk.cyan('  1. Open Cursor'));
        console.log(chalk.cyan('  2. Run: /bootstrap'));
        console.log(
          chalk.gray('     This will start the 7-phase interactive setup\n')
        );
      } else {
        console.log(chalk.cyan(`  1. Open your AI tool (${toolsText})`));
        console.log(chalk.cyan('  2. Run: /bootstrap'));
        console.log(
          chalk.gray('     This will start the 7-phase interactive setup\n')
        );
      }

      console.log(chalk.white('Available slash commands:'));
      console.log(
        chalk.gray(
          '  /flow-bootstrap                    - Full 7-phase documentation generation'
        )
      );
      console.log(
        chalk.gray(
          '  /flow-bootstrap-phase-0-context     - Context Discovery (existing projects)'
        )
      );
      console.log(
        chalk.gray(
          '  /flow-bootstrap-phase-1-platform    - Platform & Framework Selection'
        )
      );
      console.log(
        chalk.gray(
          '  /flow-bootstrap-phase-2-navigation  - Navigation & Architecture'
        )
      );
      console.log(
        chalk.gray('  /flow-bootstrap-phase-3-state       - State & Data Management')
      );
      console.log(
        chalk.gray(
          '  /flow-bootstrap-phase-4-permissions  - Permissions & Native Features'
        )
      );
      console.log(
        chalk.gray('  /flow-bootstrap-phase-5-standards   - Code Standards')
      );
      console.log(
        chalk.gray('  /flow-bootstrap-phase-6-testing     - Testing Strategy')
      );
      console.log(
        chalk.gray('  /flow-bootstrap-phase-7-deployment  - Store Deployment')
      );
      console.log(
        chalk.gray(
          '  /flow-docs-sync                  - Update documentation when code changes\n'
        )
      );
    } else {
      if (aiTools.includes('claude')) {
        console.log(chalk.cyan('  1. Open Claude Code'));
        console.log(chalk.cyan('  2. Run: /bootstrap'));
        console.log(
          chalk.gray('     This will start the 7-phase interactive setup\n')
        );
      } else if (aiTools.includes('cursor')) {
        console.log(chalk.cyan('  1. Open Cursor'));
        console.log(chalk.cyan('  2. Run: /bootstrap'));
        console.log(
          chalk.gray('     This will start the 7-phase interactive setup\n')
        );
      } else {
        console.log(chalk.cyan(`  1. Open your AI tool (${toolsText})`));
        console.log(chalk.cyan('  2. Run: /bootstrap'));
        console.log(
          chalk.gray('     This will start the 7-phase interactive setup\n')
        );
      }

      console.log(chalk.white('Available slash commands:'));
      console.log(
        chalk.gray(
          '  /flow-bootstrap                    - Full 7-phase documentation generation'
        )
      );
      console.log(
        chalk.gray(
          '  /flow-bootstrap-phase-0-context     - Context Discovery (existing projects)'
        )
      );
      if (selectedProjectType === 'backend') {
        console.log(
          chalk.gray('  /flow-bootstrap-phase-1-business    - Discovery & Business')
        );
        console.log(
          chalk.gray('  /flow-bootstrap-phase-2-data        - Data Architecture')
        );
        console.log(
          chalk.gray('  /flow-bootstrap-phase-3-architecture - System Architecture')
        );
        console.log(
          chalk.gray('  /flow-bootstrap-phase-4-security    - Security & Auth')
        );
        console.log(
          chalk.gray('  /flow-bootstrap-phase-5-standards    - Code Standards')
        );
        console.log(chalk.gray('  /flow-bootstrap-phase-6-testing     - Testing'));
        console.log(
          chalk.gray('  /flow-bootstrap-phase-7-operations  - Operations + Tools')
        );
      } else {
        console.log(
          chalk.gray('  /flow-bootstrap-phase-1-discovery   - Discovery & UX')
        );
        console.log(
          chalk.gray('  /flow-bootstrap-phase-2-components - Components & Framework')
        );
        console.log(
          chalk.gray('  /flow-bootstrap-phase-3-state      - State Management')
        );
        console.log(
          chalk.gray('  /flow-bootstrap-phase-4-styling     - Styling & Design')
        );
        console.log(
          chalk.gray('  /flow-bootstrap-phase-5-standards   - Code Standards')
        );
        console.log(chalk.gray('  /flow-bootstrap-phase-6-testing     - Testing'));
        console.log(chalk.gray('  /flow-bootstrap-phase-7-deployment - Deployment'));
      }
      console.log(
        chalk.gray(
          '  /flow-docs-sync                  - Update documentation when code changes\n'
        )
      );
    }

    if (flags?.dryRun) {
      console.log(
        chalk.yellow(
          '⚠️ Dry-run: no files were written. Run again without --dry-run to apply changes.\n'
        )
      );
    }
    console.log(
      chalk.yellow(
        '💡 Tip: You can run individual phases if you want to work step-by-step\n'
      )
    );
  } catch (error) {
    console.error(
      chalk.red('\n❌ Initialization failed:'),
      fsErrorMessage(error)
    );
    process.exit(EXIT.FS_ERROR);
  }
}

// CLI Commands
program
  .name('ai-flow')
  .description(
    'AI-powered development workflow from idea to production. Generate specs, plan features, and build with AI assistance.'
  )
  .version('1.1.2');

program
  .command('init')
  .description('Initialize AI Flow in current directory')
  .argument('[path]', 'Target directory (defaults to current directory)', '.')
  .option(
    '--ai <tool>',
    'AI tool to use (claude, cursor, copilot, gemini, all)'
  )
  .option(
    '--type <type>',
    'Project type (backend, frontend, fullstack, mobile)'
  )
  .option('--name <name>', 'Project name (skip interactive prompt)')
  .option(
    '--description <desc>',
    'Project description (skip interactive prompt)'
  )
  .option('--verbose', 'Enable verbose logging')
  .option('--dry-run', 'Simulate without writing files')
  .action(
    async (
      targetPath: string,
      options: {
        ai?: string;
        type?: string;
        name?: string;
        description?: string;
      }
    ) => {
      const absolutePath = path.resolve(targetPath);
      const flags = {
        dryRun: (options as any).dryRun === true,
        verbose: (options as any).verbose === true,
      };
      await initializeProject(
        absolutePath,
        options.ai,
        options.type,
        options.name,
        options.description,
        flags
      );
    }
  );

program
  .command('check')
  .description('Check if current directory is initialized')
  .action(async () => {
    const isInitialized = await checkIfInitialized(process.cwd());
    if (isInitialized) {
      console.log(chalk.green('✅ Project is initialized with AI Flow'));

      const configPath = path.join(
        process.cwd(),
        '.ai-flow',
        'core',
        'config.json'
      );
      const config = await fs.readJSON(configPath);

      // Detect project type (support both old and new config format)
      const projectType =
        config.projectType ||
        (config.backend && !config.frontend
          ? 'backend'
          : config.frontend && !config.backend
          ? 'frontend'
          : config.mobile
          ? 'mobile'
          : 'backend');
      const projectTypeDisplay =
        projectType === 'backend'
          ? '🔧 Backend'
          : projectType === 'frontend'
          ? '🎨 Frontend'
          : projectType === 'fullstack'
          ? '🚀 Full Stack'
          : projectType === 'mobile'
          ? '📱 Mobile'
          : '🔧 Backend';

      console.log(chalk.white('\nConfiguration:'));
      console.log(chalk.gray(`  Version: ${config.version}`));
      console.log(chalk.gray(`  Project Type: ${projectTypeDisplay}`));
      console.log(chalk.gray(`  AI Tools: ${config.aiTools.join(', ')}`));
      console.log(
        chalk.gray(`  Created: ${new Date(config.createdAt).toLocaleString()}`)
      );
      console.log(chalk.gray(`  Working Dir: ${process.cwd()}`));

      // Show correct prompts path based on project type
      if (projectType === 'fullstack') {
        const backendPromptsPath = path.join(
          process.cwd(),
          '.ai-flow',
          'prompts',
          'backend',
          'bootstrap.md'
        );
        const frontendPromptsPath = path.join(
          process.cwd(),
          '.ai-flow',
          'prompts',
          'frontend',
          'bootstrap.md'
        );
        console.log(chalk.gray(`  Backend Prompts: ${backendPromptsPath}`));
        console.log(chalk.gray(`  Frontend Prompts: ${frontendPromptsPath}`));
      } else {
        const promptsPath = path.join(
          process.cwd(),
          '.ai-flow',
          'prompts',
          projectType,
          'bootstrap.md'
        );
        console.log(chalk.gray(`  Prompts: ${promptsPath}`));
      }

      console.log(chalk.white('\nNext steps:'));
      if (projectType === 'fullstack') {
        if (config.aiTools.includes('claude')) {
          console.log(chalk.cyan('  1. Open Claude Code'));
          console.log(
            chalk.cyan(
              '  2. Run: /backend-flow-bootstrap (for backend documentation)'
            )
          );
          console.log(
            chalk.cyan(
              '  3. Run: /frontend-flow-bootstrap (for frontend documentation)'
            )
          );
        } else if (config.aiTools.includes('cursor')) {
          console.log(chalk.cyan('  1. Open Cursor'));
          console.log(
            chalk.cyan(
              '  2. Run: /backend-flow-bootstrap (for backend documentation)'
            )
          );
          console.log(
            chalk.cyan(
              '  3. Run: /frontend-flow-bootstrap (for frontend documentation)'
            )
          );
        } else {
          const toolsText =
            config.aiTools.length === 1
              ? config.aiTools[0]
              : `${config.aiTools.slice(0, -1).join(', ')} and ${
                  config.aiTools[config.aiTools.length - 1]
                }`;
          console.log(chalk.cyan(`  1. Open your AI tool (${toolsText})`));
          console.log(
            chalk.cyan(
              '  2. Run: /backend-flow-bootstrap (for backend documentation)'
            )
          );
          console.log(
            chalk.cyan(
              '  3. Run: /frontend-flow-bootstrap (for frontend documentation)'
            )
          );
        }
      } else {
        if (config.aiTools.includes('claude')) {
          console.log(chalk.cyan('  1. Open Claude Code'));
          console.log(chalk.cyan('  2. Run: /bootstrap'));
        } else if (config.aiTools.includes('cursor')) {
          console.log(chalk.cyan('  1. Open Cursor'));
          console.log(chalk.cyan('  2. Run: /bootstrap'));
        } else {
          const toolsText =
            config.aiTools.length === 1
              ? config.aiTools[0]
              : `${config.aiTools.slice(0, -1).join(', ')} and ${
                  config.aiTools[config.aiTools.length - 1]
                }`;
          console.log(chalk.cyan(`  1. Open your AI tool (${toolsText})`));
          console.log(chalk.cyan('  2. Run: /bootstrap'));
        }
      }
    } else {
      console.log(chalk.yellow('⚠️  Project is not initialized'));
      console.log(chalk.white('Run: ai-flow init .'));
    }
  });

program.parse();




