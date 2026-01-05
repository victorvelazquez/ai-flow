#!/usr/bin/env node

import { Command } from 'commander';
import { select, input, confirm } from '@inquirer/prompts';
import chalk from 'chalk';
import ora from 'ora';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
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
  { name: 'GitHub Copilot', value: 'copilot', description: '' },
  { name: 'Claude Code', value: 'claude', description: '' },
  { name: 'Cursor', value: 'cursor', description: '' },
  { name: 'Gemini', value: 'gemini', description: '' },
  { name: 'Antigravity', value: 'antigravity', description: '' },
  { name: 'All AI Tools', value: 'all', description: '' },
];

const SLASH_COMMANDS = [
  { name: '/flow-build', desc: 'Full documentation flow' },
  { name: '/flow-work', desc: 'Development orchestrator (feature, refactor, fix, resume)' },
  { name: '/flow-check', desc: 'Combined code review & testing workflow' },
  { name: '/flow-commit', desc: 'Atomic commits (Conventional Commits)' },
  { name: '/flow-docs-sync', desc: 'Sincronización de documentación' },
];

const PROJECT_PHASES: Record<string, { label: string; phases: string[] }> = {
  backend: {
    label: 'Backend',
    phases: [
      'fase 0: Context Discovery (proyectos existentes)',
      'fase 1: Discovery & Business',
      'fase 2: Data Architecture',
      'fase 3: System Architecture',
      'fase 4: Security & Auth',
      'fase 5: Code Standards',
      'fase 6: Testing',
      'fase 7: Operations + Tools',
      'fase 8: Project Setup & Final Docs',
      'fase 9: Implementation Roadmap (opcional)',
      'fase 10: User Stories Generation (opcional)',
    ],
  },
  frontend: {
    label: 'Frontend',
    phases: [
      'fase 0: Context Discovery (proyectos existentes)',
      'fase 1: Discovery & UX',
      'fase 2: Components & Framework',
      'fase 3: State Management',
      'fase 4: Styling & Design',
      'fase 5: Code Standards',
      'fase 6: Testing',
      'fase 7: Deployment',
      'fase 8: Project Setup & Final Docs',
      'fase 9: Implementation Roadmap (opcional)',
      'fase 10: User Stories Generation (opcional)',
    ],
  },
  mobile: {
    label: 'Mobile',
    phases: [
      'fase 0: Context Discovery (proyectos existentes)',
      'fase 1: Platform & Framework Selection',
      'fase 2: Navigation & Architecture',
      'fase 3: State & Data Management',
      'fase 4: Permissions & Native Features',
      'fase 5: Code Standards',
      'fase 6: Testing Strategy',
      'fase 7: Store Deployment',
      'fase 8: Project Setup & Final Documentation',
      'fase 9: Implementation Roadmap (opcional)',
      'fase 10: User Stories Generation (opcional)',
    ],
  },
};

// Read package.json for version (Sync for top-level usage)
const packageJsonPath = path.join(ROOT_DIR, 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
const PKG_VERSION: string = packageJson.version;

const EXIT = {
  OK: 0,
  INVALID_ARGS: 2,
  FS_ERROR: 3,
} as const;

function isValidName(value: string): boolean {
  const v = value.trim();
  if (v.length < 2 || v.length > 100) return false;
  return /^[A-Za-z0-9 _\-\.]+$/.test(v);
}

function fsErrorMessage(e: unknown): string {
  const anyErr = e as any;
  const code = anyErr && anyErr.code ? String(anyErr.code) : 'UNKNOWN';
  const msg = anyErr && anyErr.message ? String(anyErr.message) : String(e);
  return `${code}: ${msg}`;
}

function getProjectTypeLabel(type: string): string {
  switch (type) {
    case 'backend':
      return 'Backend';
    case 'frontend':
      return 'Frontend';
    case 'fullstack':
      return 'Full Stack';
    case 'mobile':
      return 'Mobile';
    default:
      return type;
  }
}

function printBanner() {
  console.log('\n');
  console.log(
    chalk.cyan('    ╔═══════════════════════════════════════════════════════════════════╗')
  );
  console.log(
    chalk.cyan('    ║') +
      '                                                                   ' +
      chalk.cyan('║')
  );
  console.log(
    chalk.cyan('    ║') +
      chalk.bold.cyan('          █████╗ ██╗    ███████╗██╗      ██████╗ ██╗    ██╗') +
      '        ' +
      chalk.cyan('║')
  );
  console.log(
    chalk.cyan('    ║') +
      chalk.bold.cyan('         ██╔══██╗██║    ██╔════╝██║     ██╔═══██╗██║    ██║') +
      '        ' +
      chalk.cyan('║')
  );
  console.log(
    chalk.cyan('    ║') +
      chalk.bold.cyan('         ███████║██║    █████╗  ██║     ██║   ██║██║ █╗ ██║') +
      '        ' +
      chalk.cyan('║')
  );
  console.log(
    chalk.cyan('    ║') +
      chalk.bold.cyan('         ██╔══██║██║    ██╔══╝  ██║     ██║   ██║██║███╗██║') +
      '        ' +
      chalk.cyan('║')
  );
  console.log(
    chalk.cyan('    ║') +
      chalk.bold.cyan('         ██║  ██║██║    ██║     ███████╗╚██████╔╝╚███╔███╔╝') +
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
    chalk.cyan('    ╚═══════════════════════════════════════════════════════════════════╝')
  );
  console.log('\n');
  console.log(chalk.white('    📂 Project Context'));
  console.log(
    chalk.gray('    ────────────────────────────────────────────────────────────────────')
  );
  console.log(chalk.gray(`    Working Directory: ${process.cwd()}`));
  console.log(chalk.gray(`    Version: ${PKG_VERSION}`));
  console.log('\n');
}

function printAvailableCommands(projectType: string) {
  console.log(chalk.white('Available slash commands:'));
  for (const cmd of SLASH_COMMANDS) {
    console.log(chalk.gray(`  ${cmd.name.padEnd(25)} - ${cmd.desc}`));
  }

  const phasesInfo = PROJECT_PHASES[projectType === 'fullstack' ? 'backend' : projectType];
  if (phasesInfo) {
    console.log(chalk.gray(`\n  Fases disponibles (${phasesInfo.label}):`));
    for (const phase of phasesInfo.phases) {
      console.log(chalk.gray(`    ${phase}`));
    }
  }
}

function printNextSteps(config: { aiTools: string[]; projectType: string }) {
  const toolsText =
    config.aiTools.length === 1
      ? config.aiTools[0]
      : `${config.aiTools.slice(0, -1).join(', ')} and ${config.aiTools[config.aiTools.length - 1]}`;

  console.log(chalk.white('\nNext steps:'));

  if (config.projectType === 'fullstack') {
    const aiToolName = config.aiTools.includes('claude')
      ? 'Claude Code'
      : config.aiTools.includes('cursor')
        ? 'Cursor'
        : toolsText;

    console.log(chalk.cyan(`  1. Open your AI tool (${aiToolName})`));
    console.log(chalk.cyan('  2. Backend Prompts:  /backend-flow-build'));
    console.log(chalk.cyan('  3. Frontend Prompts: /frontend-flow-build'));
    console.log(chalk.gray('     Each will guide you through up to 11 phases (0-10)\n'));
  } else {
    const aiToolName = config.aiTools.includes('claude')
      ? 'Claude Code'
      : config.aiTools.includes('cursor')
        ? 'Cursor'
        : config.aiTools.includes('antigravity')
          ? 'Antigravity'
          : toolsText;

    console.log(chalk.cyan(`  1. Open ${aiToolName}`));
    console.log(chalk.cyan('  2. Run: /flow-build'));
    console.log(chalk.gray('     This will guide you through up to 11 phases (0-10)\n'));
  }

  printAvailableCommands(config.projectType);
}

async function selectAITool(providedTool?: string): Promise<string[]> {
  if (providedTool) {
    const tool = AI_TOOLS.find((t) => t.value === providedTool);
    if (!tool) {
      console.error(chalk.red(`❌ Invalid AI tool: ${providedTool}`));
      console.log(
        chalk.yellow('Available options: claude, cursor, copilot, gemini, antigravity, all')
      );
      process.exit(EXIT.INVALID_ARGS);
    }
    return providedTool === 'all'
      ? ['claude', 'cursor', 'copilot', 'gemini', 'antigravity']
      : [providedTool];
  }

  if (!process.stdin.isTTY) return ['copilot'];

  printBanner();
  console.log(chalk.white('    🤖 Select your AI development tool:'));
  console.log(
    chalk.gray('    ────────────────────────────────────────────────────────────────────')
  );

  const selectedTool = await select({
    message: 'Select your AI tool:',
    choices: AI_TOOLS.map((tool) => ({ name: tool.name, value: tool.value })),
    default: 'copilot',
  });

  return selectedTool === 'all'
    ? ['claude', 'cursor', 'copilot', 'gemini', 'antigravity']
    : [selectedTool];
}

async function selectProjectType(
  providedType?: string
): Promise<'backend' | 'frontend' | 'fullstack' | 'mobile'> {
  if (providedType) {
    const valid = ['backend', 'frontend', 'fullstack', 'mobile'];
    if (!valid.includes(providedType)) {
      console.error(chalk.red(`❌ Invalid project type: ${providedType}`));
      console.log(chalk.yellow('Available options: backend, frontend, fullstack, mobile'));
      process.exit(EXIT.INVALID_ARGS);
    }
    return providedType as 'backend' | 'frontend' | 'fullstack' | 'mobile';
  }

  if (!process.stdin.isTTY) return 'backend';

  const projectType = await select({
    message: 'What type of project are you building?',
    choices: [
      { name: '🔧 Backend API/Service', value: 'backend' },
      { name: '🎨 Frontend Application', value: 'frontend' },
      { name: '🚀 Full Stack Application', value: 'fullstack' },
      { name: '📱 Mobile Application', value: 'mobile' },
    ],
    default: 'backend',
  });
  return projectType as 'backend' | 'frontend' | 'fullstack' | 'mobile';
}

async function checkIfInitialized(targetPath: string): Promise<boolean> {
  return await fs.pathExists(path.join(targetPath, '.ai-flow'));
}

async function createBootstrapStructure(
  targetPath: string,
  aiTools: string[],
  projectType: 'backend' | 'frontend' | 'fullstack' | 'mobile' = 'backend',
  dryRun?: boolean
): Promise<void> {
  const spinner = ora('Creating .ai-flow structure...').start();
  try {
    const bootstrapPath = path.join(targetPath, '.ai-flow');
    if (dryRun) {
      spinner.succeed('Created .ai-flow structure (dry-run)');
      return;
    }
    await assertDirWritable(targetPath);
    await fs.ensureDir(path.join(bootstrapPath, 'core'));
    await fs.ensureDir(path.join(bootstrapPath, 'prompts'));
    await fs.ensureDir(path.join(bootstrapPath, 'templates', 'docs'));
    await fs.ensureDir(path.join(bootstrapPath, 'templates', 'specs'));

    const config = {
      version: PKG_VERSION,
      aiTools,
      createdAt: new Date().toISOString(),
      projectType,
      backend: projectType === 'backend' || projectType === 'fullstack',
      frontend: projectType === 'frontend' || projectType === 'fullstack',
      mobile: projectType === 'mobile',
    };

    await fs.writeJSON(path.join(bootstrapPath, 'core', 'config.json'), config, { spaces: 2 });
    spinner.succeed('Created .ai-flow structure');
  } catch (error) {
    spinner.fail(fsErrorMessage(error));
    throw error;
  }
}

async function copyTemplates(
  targetPath: string,
  projectType: 'backend' | 'frontend' | 'fullstack' | 'mobile' = 'backend',
  aiTools: string[] = [],
  dryRun?: boolean
): Promise<void> {
  const spinner = ora('Copying templates to .ai-flow/templates/...').start();
  try {
    if (dryRun) {
      spinner.succeed('Templates copied (dry-run)');
      return;
    }
    const destTemplatesPath = path.join(targetPath, '.ai-flow', 'templates');
    const walk = async (dir: string): Promise<string[]> => {
      let files: string[] = [];
      for (const entry of await fs.readdir(dir)) {
        const fullPath = path.join(dir, entry);
        const stat = await fs.stat(fullPath);
        if (stat.isDirectory()) files = files.concat(await walk(fullPath));
        else if (entry.endsWith('.template.md') || entry.endsWith('.template'))
          files.push(fullPath);
      }
      return files;
    };

    const templateSources: { source: string; base: string }[] = [];
    const processedFiles = new Map<string, { file: string; base: string }>();

    const rootTemplatesSource = path.join(ROOT_DIR, 'templates');
    for (const item of await fs.readdir(rootTemplatesSource)) {
      const fullPath = path.join(rootTemplatesSource, item);
      if ((await fs.stat(fullPath)).isFile() && item.endsWith('.template.md')) {
        processedFiles.set(item, { file: fullPath, base: rootTemplatesSource });
      }
    }

    if (projectType === 'backend')
      templateSources.push({
        source: path.join(ROOT_DIR, 'templates', 'backend'),
        base: path.join(ROOT_DIR, 'templates', 'backend'),
      });
    else if (projectType === 'frontend')
      templateSources.push({
        source: path.join(ROOT_DIR, 'templates', 'frontend'),
        base: path.join(ROOT_DIR, 'templates', 'frontend'),
      });
    else if (projectType === 'fullstack') {
      const fullstackSource = path.join(ROOT_DIR, 'templates', 'fullstack');
      if (await fs.pathExists(fullstackSource))
        templateSources.push({ source: fullstackSource, base: fullstackSource });
      templateSources.push({
        source: path.join(ROOT_DIR, 'templates', 'backend'),
        base: path.join(ROOT_DIR, 'templates', 'backend'),
      });
      templateSources.push({
        source: path.join(ROOT_DIR, 'templates', 'frontend'),
        base: path.join(ROOT_DIR, 'templates', 'frontend'),
      });
    } else if (projectType === 'mobile')
      templateSources.push({
        source: path.join(ROOT_DIR, 'templates', 'mobile'),
        base: path.join(ROOT_DIR, 'templates', 'mobile'),
      });

    for (const { source, base } of templateSources) {
      for (const file of await walk(source)) {
        const relPath = path.relative(base, file);
        if (!processedFiles.has(relPath)) processedFiles.set(relPath, { file, base });
      }
    }

    for (const [relPath, { file: templateFile }] of processedFiles) {
      const fileName = path.basename(relPath);
      if (
        fileName === '.clauderules.template' &&
        !aiTools.includes('claude') &&
        !aiTools.includes('all')
      )
        continue;
      if (
        fileName === '.cursorrules.template' &&
        !aiTools.includes('cursor') &&
        !aiTools.includes('all')
      )
        continue;
      const destPath = path.join(destTemplatesPath, relPath);
      await fs.ensureDir(path.dirname(destPath));
      await fs.copy(templateFile, destPath);
    }
    spinner.succeed('Templates copied');
  } catch (error) {
    spinner.fail(fsErrorMessage(error));
    throw error;
  }
}

async function copyPrompts(targetPath: string, dryRun?: boolean): Promise<void> {
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
  dryRun?: boolean
): Promise<void> {
  const spinner = ora('Setting up slash commands...').start();
  try {
    const promptSources: Array<{ dir: string; prefix?: string }> = [];
    if (projectType === 'backend') promptSources.push({ dir: 'backend' });
    else if (projectType === 'frontend') promptSources.push({ dir: 'frontend' });
    else if (projectType === 'fullstack') {
      promptSources.push({ dir: 'backend', prefix: 'backend-' });
      promptSources.push({ dir: 'frontend', prefix: 'frontend-' });
    } else if (projectType === 'mobile') {
      promptSources.push({ dir: 'mobile' });
    }

    for (const { dir, prefix } of promptSources) {
      const promptsSource = path.join(ROOT_DIR, 'prompts', dir);
      const allFiles = await fs.readdir(promptsSource);
      const files = allFiles.filter((file) => {
        const isMarkdown = file.endsWith('.md');
        const isInternalPhase = file.match(/^flow-build-phase-\d+.*\.md$/);
        const isInternalWork = file.match(/^flow-work-.+\.md$/);
        const isInternalCheck = file.match(/^flow-check-.+\.md$/);
        return isMarkdown && !isInternalPhase && !isInternalWork && !isInternalCheck;
      });

      for (const tool of aiTools) {
        let commandsTarget = '';
        let extension = '.md';
        if (tool === 'copilot') {
          commandsTarget = path.join(targetPath, '.github', 'prompts');
          extension = '.prompt.md';
        } else if (tool === 'claude') commandsTarget = path.join(targetPath, '.claude', 'commands');
        else if (tool === 'cursor') commandsTarget = path.join(targetPath, '.cursor', 'commands');
        else if (tool === 'gemini') commandsTarget = path.join(targetPath, '.gemini', 'commands');
        else if (tool === 'antigravity')
          commandsTarget = path.join(targetPath, '.agent', 'workflows');

        if (!dryRun && commandsTarget) {
          await assertDirWritable(commandsTarget);
          await fs.ensureDir(commandsTarget);
        }

        for (const file of files) {
          const srcFile = path.join(promptsSource, file);
          const base = file.replace(/\.md$/, '');
          const destName = prefix ? `${prefix}${base}${extension}` : `${base}${extension}`;
          const destFile = path.join(commandsTarget, destName);
          if (!dryRun) await fs.copyFile(srcFile, destFile);
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
    if (await checkIfInitialized(targetPath)) {
      console.log(chalk.yellow('\n⚠️  Project already initialized with AI Flow'));
      let reinitialize = false;
      if (process.stdin.isTTY)
        reinitialize = await confirm({ message: 'Do you want to reinitialize?', default: false });
      if (!reinitialize) {
        console.log(chalk.blue('Initialization cancelled'));
        return;
      }
    }

    const aiTools = await selectAITool(aiTool);
    const selectedProjectType = await selectProjectType(projectType);
    const inferredName = path
      .basename(targetPath)
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    if (projectName && !isValidName(projectName)) {
      console.error(chalk.red('Invalid project name'));
      process.exit(EXIT.INVALID_ARGS);
    }

    let finalProjectName = projectName;
    if (!finalProjectName) {
      if (process.stdin.isTTY) {
        finalProjectName = await input({
          message: 'Project name (you can refine it in /flow-build):',
          default: inferredName,
          validate: (input: string) =>
            isValidName(input) || 'Enter 2-100 chars: letters, numbers, space, - _ .',
        });
      } else finalProjectName = inferredName;
    }

    console.log(chalk.cyan('\n📦 Initializing AI Flow...\n'));

    await createBootstrapStructure(targetPath, aiTools, selectedProjectType, flags?.dryRun);
    await copyTemplates(targetPath, selectedProjectType, aiTools, flags?.dryRun);
    await copyPrompts(targetPath, flags?.dryRun);
    await setupSlashCommands(targetPath, aiTools, selectedProjectType, flags?.dryRun);

    console.log(chalk.green('\n✅ AI Flow initialized successfully!'));
    console.log(chalk.white('\nSummary:'));
    console.log(chalk.gray(`  Project:   ${finalProjectName}`));
    console.log(chalk.gray(`  Version:   ${PKG_VERSION}`));
    console.log(chalk.gray(`  Directory: ${targetPath}`));
    console.log(chalk.gray(`  Tools:     ${aiTools.join(', ')}`));
    console.log(
      chalk.gray(
        `  Type:      ${getProjectTypeLabel(selectedProjectType)} (${selectedProjectType})`
      )
    );
    console.log(chalk.gray(`  Mode:      ${flags?.dryRun ? 'DRY-RUN' : 'WRITE'}`));

    printNextSteps({ aiTools, projectType: selectedProjectType });

    if (flags?.dryRun) {
      console.log(
        chalk.yellow(
          '⚠️ Dry-run: no files were written. Run again without --dry-run to apply changes.\n'
        )
      );
    }
    console.log(
      chalk.yellow('💡 Tip: You can run individual phases if you want to work step-by-step\n')
    );
  } catch (error) {
    console.error(chalk.red('\n❌ Initialization failed:'), fsErrorMessage(error));
    process.exit(EXIT.FS_ERROR);
  }
}

// CLI Commands
program
  .name('ai-flow')
  .description('AI-powered development workflow from idea to production.')
  .version(PKG_VERSION);

program
  .command('init')
  .description('Initialize AI Flow in current directory')
  .argument('[path]', 'Target directory (defaults to current directory)', '.')
  .option('--ai <tool>', 'AI tool to use')
  .option('--type <type>', 'Project type')
  .option('--name <name>', 'Project name')
  .option('--description <desc>', 'Project description')
  .option('--dry-run', 'Simulate without writing files')
  .action(async (targetPath: string, options: any) => {
    await initializeProject(
      path.resolve(targetPath),
      options.ai,
      options.type,
      options.name,
      options.description,
      { dryRun: !!options.dryRun }
    );
  });

program
  .command('check')
  .description('Check if current directory is initialized')
  .action(async () => {
    if (await checkIfInitialized(process.cwd())) {
      console.log(chalk.green('✅ Project is initialized with AI Flow'));
      const configPath = path.join(process.cwd(), '.ai-flow', 'core', 'config.json');
      const config = await fs.readJSON(configPath);
      const projectType =
        config.projectType ||
        (config.backend && !config.frontend
          ? 'backend'
          : config.frontend && !config.backend
            ? 'frontend'
            : config.mobile
              ? 'mobile'
              : 'backend');
      console.log(chalk.white('\nConfiguration:'));
      console.log(chalk.gray(`  Version: ${config.version}`));
      console.log(
        chalk.gray(`  Project Type: ${getProjectTypeLabel(projectType)} (${projectType})`)
      );
      console.log(chalk.gray(`  AI Tools: ${config.aiTools.join(', ')}`));
      console.log(chalk.gray(`  Created: ${new Date(config.createdAt).toLocaleString()}`));
      printNextSteps({ aiTools: config.aiTools, projectType });
    } else {
      console.log(chalk.yellow('⚠️  Project is not initialized'));
      console.log(chalk.white('Run: ai-flow init .'));
    }
  });

program.parse();
