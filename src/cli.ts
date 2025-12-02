#!/usr/bin/env node

import { Command } from 'commander';
import inquirer from 'inquirer';
import chalk from 'chalk';
import ora from 'ora';
import * as fs from 'fs-extra';
import * as path from 'path';
import ejs from 'ejs';
import { assertDirWritable } from './fs-utils';

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
    description: ''
  },
  {
    name: 'Claude Code',
    value: 'claude',
    description: ''
  },
  {
    name: 'Cursor',
    value: 'cursor',
    description: ''
  },
  {
    name: 'Gemini',
    value: 'gemini',
    description: ''
  },
  {
    name: 'All AI Tools',
    value: 'all',
    description: ''
  }
];

const PKG_VERSION: string = fs.readJSONSync(path.join(__dirname, '..', 'package.json')).version as string;

const EXIT = {
  OK: 0,
  INVALID_ARGS: 2,
  FS_ERROR: 3
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
    const tool = AI_TOOLS.find(t => t.value === providedTool);
    if (!tool) {
      console.error(chalk.red(`❌ Invalid AI tool: ${providedTool}`));
      console.log(chalk.yellow('Available options: claude, cursor, copilot, gemini, all'));
      process.exit(EXIT.INVALID_ARGS);
    }
    return providedTool === 'all'
      ? ['claude', 'cursor', 'copilot', 'gemini']
      : [providedTool];
  }

  // Display banner
  console.log('\n');
  console.log(chalk.cyan('    ╔═══════════════════════════════════════════════════════════════════╗'));
  console.log(chalk.cyan('    ║') + '                                                                   ' + chalk.cyan('║'));
  console.log(chalk.cyan('    ║') + chalk.bold.cyan('          █████╗ ██╗    ██████╗  ██████╗  ██████╗ ████████╗') + '        ' + chalk.cyan('║'));
  console.log(chalk.cyan('    ║') + chalk.bold.cyan('         ██╔══██╗██║    ██╔══██╗██╔═══██╗██╔═══██╗╚══██╔══╝') + '        ' + chalk.cyan('║'));
  console.log(chalk.cyan('    ║') + chalk.bold.cyan('         ███████║██║    ██████╔╝██║   ██║██║   ██║   ██║') + '           ' + chalk.cyan('║'));
  console.log(chalk.cyan('    ║') + chalk.bold.cyan('         ██╔══██║██║    ██╔══██╗██║   ██║██║   ██║   ██║') + '           ' + chalk.cyan('║'));
  console.log(chalk.cyan('    ║') + chalk.bold.cyan('         ██║  ██║██║    ██████╔╝╚██████╔╝╚██████╔╝   ██║') + '           ' + chalk.cyan('║'));
  console.log(chalk.cyan('    ║') + chalk.cyan('         ╚═╝  ╚═╝╚═╝    ╚═════╝  ╚═════╝  ╚═════╝    ╚═╝') + '           ' + chalk.cyan('║'));
  console.log(chalk.cyan('    ║') + '                                                                   ' + chalk.cyan('║'));
  console.log(chalk.cyan('    ║') + '               ' + chalk.white('✨ AI-Ready Documentation in Minutes') + '                ' + chalk.cyan('║'));
  console.log(chalk.cyan('    ║') + '                                                                   ' + chalk.cyan('║'));
  console.log(chalk.cyan('    ╚═══════════════════════════════════════════════════════════════════╝'));
  console.log('\n');
  console.log(chalk.white('    📂 Project Setup'));
  console.log(chalk.gray('    ────────────────────────────────────────────────────────────────────'));
  console.log(chalk.gray(`    Working Directory: ${process.cwd()}`));
  console.log(chalk.gray(`    Version: ${PKG_VERSION}`));
  console.log('\n');
  console.log(chalk.white('    🤖 Select your AI development tool:'));
  console.log(chalk.gray('    ────────────────────────────────────────────────────────────────────'));

  const { selectedTool } = await inquirer.prompt([
    {
      type: 'list',
      name: 'selectedTool',
      message: '\u200B', // invisible char para ocultar el ?
      choices: AI_TOOLS.map(tool => ({
        name: '    ' + tool.name, // 4 espacios para alinear
        value: tool.value
      })),
      pageSize: 10
    }
  ]);

  return selectedTool === 'all'
    ? ['claude', 'cursor', 'copilot', 'gemini']
    : [selectedTool];
}

async function checkIfInitialized(targetPath: string): Promise<boolean> {
  const bootstrapPath = path.join(targetPath, '.ai-bootstrap');
  return await fs.pathExists(bootstrapPath);
}

async function createBootstrapStructure(targetPath: string, aiTools: string[], dryRun?: boolean, verbose?: boolean): Promise<void> {
  const spinner = ora('Creating .ai-bootstrap structure...').start();

  try {
    const bootstrapPath = path.join(targetPath, '.ai-bootstrap');

    // Create core directories
    if (dryRun) {
      spinner.succeed('Created .ai-bootstrap structure (dry-run)');
      return;
    }
    await assertDirWritable(targetPath);
    await fs.ensureDir(path.join(bootstrapPath, 'core'));
    await fs.ensureDir(path.join(bootstrapPath, 'prompts'));
    await fs.ensureDir(path.join(bootstrapPath, 'templates', 'docs'));
    await fs.ensureDir(path.join(bootstrapPath, 'templates', 'specs'));
    await fs.ensureDir(path.join(bootstrapPath, 'scripts'));

    // Create config file
    const config = {
      version: PKG_VERSION,
      aiTools: aiTools,
      createdAt: new Date().toISOString(),
      backend: true,
      frontend: false
    };

    await fs.writeJSON(path.join(bootstrapPath, 'core', 'config.json'), config, { spaces: 2 });
    logVerbose(`Wrote ${path.join(bootstrapPath, 'core', 'config.json')}`, verbose);

    spinner.succeed('Created .ai-bootstrap structure');
  } catch (error) {
    spinner.fail(fsErrorMessage(error));
    throw error;
  }
}

async function renderTemplates(targetPath: string, projectData: { name: string; description: string }, dryRun?: boolean, verbose?: boolean): Promise<void> {
  const spinner = ora('Generating documentation from templates...').start();
  try {
    const templatesSource = path.join(ROOT_DIR, 'templates');
    const templatesTarget = path.join(targetPath, '.ai-bootstrap', 'templates');
    if (dryRun) {
      spinner.succeed('Documentation generated from templates (dry-run)');
      return;
    }
    await assertDirWritable(templatesTarget);
    await fs.ensureDir(templatesTarget);

    // Find all .template.md files in templates and subfolders
    const walk = async (dir: string): Promise<string[]> => {
      let files: string[] = [];
      for (const entry of await fs.readdir(dir)) {
        const fullPath = path.join(dir, entry);
        const stat = await fs.stat(fullPath);
        if (stat.isDirectory()) {
          files = files.concat(await walk(fullPath));
        } else if (entry.endsWith('.template.md')) {
          files.push(fullPath);
        }
      }
      return files;
    };
    const templateFiles = await walk(templatesSource);

    for (const templateFile of templateFiles) {
      const relPath = path.relative(templatesSource, templateFile).replace('.template.md', '.md');
      const destPath = path.join(templatesTarget, relPath);
      await fs.ensureDir(path.dirname(destPath));
      const templateContent = await fs.readFile(templateFile, 'utf8');
      // Render with EJS, leaving {{PLACEHOLDER}} for everything except name/description
      const rendered = ejs.render(templateContent, {
        PROJECT_NAME: projectData.name,
        PROJECT_DESCRIPTION: projectData.description,
        PLACEHOLDER: '{{PLACEHOLDER}}'
      }, { delimiter: '?' });
      await fs.writeFile(destPath, rendered, 'utf8');
      logVerbose(`Rendered ${destPath}`, verbose);
    }
    spinner.succeed('Documentation generated from templates');
  } catch (error) {
    spinner.fail(fsErrorMessage(error));
    throw error;
  }
}

async function copyPrompts(targetPath: string, dryRun?: boolean, verbose?: boolean): Promise<void> {
  const spinner = ora('Copying master prompts...').start();

  try {
    const promptsSource = path.join(ROOT_DIR, 'prompts');
    const promptsTarget = path.join(targetPath, '.ai-bootstrap', 'prompts');

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

async function setupSlashCommands(targetPath: string, aiTools: string[], dryRun?: boolean, verbose?: boolean): Promise<void> {
  const spinner = ora('Setting up slash commands...').start();

  try {
    // Copy slash commands directly from prompts/backend/ directory
    const promptsSource = path.join(ROOT_DIR, 'prompts', 'backend');
    const allFiles = await fs.readdir(promptsSource);
    // Filter only files that match slash command pattern (bootstrap*.md or docs-update.md)
    const files = allFiles.filter(file => 
      file.endsWith('.md') && (file.startsWith('bootstrap') || file === 'docs-update.md')
    );

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
          const destFile = path.join(promptsTarget, `${base}.prompt.md`);
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
          const destFile = path.join(commandsTarget, file);
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
          const destFile = path.join(commandsTarget, file);
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
          const destFile = path.join(commandsTarget, file);
          if (!dryRun) await fs.copyFile(srcFile, destFile);
          logVerbose(`Installed ${destFile}`, verbose);
        }
      }
    }

    spinner.succeed(`Slash commands set up for: ${aiTools.join(', ')}`);
  } catch (error) {
    spinner.fail(fsErrorMessage(error));
    throw error;
  }
}

async function initializeProject(targetPath: string, aiTool?: string, projectName?: string, projectDescription?: string, flags?: { dryRun?: boolean; verbose?: boolean }): Promise<void> {
  try {
    // Check if already initialized
    const isInitialized = await checkIfInitialized(targetPath);
    if (isInitialized) {
      console.log(chalk.yellow('\n⚠️  Project already initialized with AI Bootstrap'));
      const { reinitialize } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'reinitialize',
          message: 'Do you want to reinitialize?',
          default: false
        }
      ]);
      if (!reinitialize) {
        console.log(chalk.blue('Initialization cancelled'));
        return;
      }
    }

    // Select AI tools
    const aiTools = await selectAITool(aiTool);

    // Infer project name from directory
    const inferredName = path.basename(targetPath)
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
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
    let finalProjectDescription = projectDescription || 'TBD - Run /bootstrap to define';

    if (!finalProjectName) {
      const answers = await inquirer.prompt([
        {
          type: 'input',
          name: 'projectName',
          message: 'Project name (you can refine it in /bootstrap):',
          default: inferredName,
          validate: (input: string) => isValidName(input) || 'Enter 2-100 chars: letters, numbers, space, - _ .'
        }
      ]);
      finalProjectName = answers.projectName;
    }

    console.log(chalk.cyan('\n📦 Initializing AI Bootstrap...\n'));

    // Create structure
    await createBootstrapStructure(targetPath, aiTools, flags?.dryRun, flags?.verbose);
    await renderTemplates(targetPath, { name: finalProjectName!, description: finalProjectDescription! }, flags?.dryRun, flags?.verbose);
    await copyPrompts(targetPath, flags?.dryRun, flags?.verbose);
    await setupSlashCommands(targetPath, aiTools, flags?.dryRun, flags?.verbose);

    const modeText = flags?.dryRun ? 'DRY-RUN' : 'WRITE';
    console.log(chalk.green('\n✅ AI Bootstrap initialized successfully!'));
    console.log(chalk.white('\nSummary:'));
    console.log(chalk.gray(`  Project: ${finalProjectName}`));
    console.log(chalk.gray(`  Version: ${PKG_VERSION}`));
    console.log(chalk.gray(`  Directory: ${targetPath}`));
    console.log(chalk.gray(`  Tools: ${aiTools.join(', ')}`));
    console.log(chalk.gray(`  Mode: ${modeText}`));
    console.log(chalk.white('\nNext steps:\n'));

    const toolsText = aiTools.length === 1 ? aiTools[0] : `${aiTools.slice(0, -1).join(', ')} and ${aiTools[aiTools.length - 1]}`;

    if (aiTools.includes('claude')) {
      console.log(chalk.cyan('  1. Open Claude Code'));
      console.log(chalk.cyan('  2. Run: /bootstrap'));
      console.log(chalk.gray('     This will start the 7-phase interactive setup\n'));
    } else if (aiTools.includes('cursor')) {
      console.log(chalk.cyan('  1. Open Cursor'));
      console.log(chalk.cyan('  2. Run: /bootstrap'));
      console.log(chalk.gray('     This will start the 7-phase interactive setup\n'));
    } else {
      console.log(chalk.cyan(`  1. Open your AI tool (${toolsText})`));
      console.log(chalk.cyan('  2. Run: /bootstrap'));
      console.log(chalk.gray('     This will start the 7-phase interactive setup\n'));
    }

    console.log(chalk.white('Available slash commands:'));
    console.log(chalk.gray('  /bootstrap                    - Full 7-phase documentation generation'));
    console.log(chalk.gray('  /bootstrap-phase0-context     - Context Discovery (existing projects)'));
    console.log(chalk.gray('  /bootstrap-phase1-business    - Discovery & Business'));
    console.log(chalk.gray('  /bootstrap-phase2-data        - Data Architecture'));
    console.log(chalk.gray('  /bootstrap-phase3-architecture - System Architecture'));
    console.log(chalk.gray('  /bootstrap-phase4-security    - Security & Auth'));
    console.log(chalk.gray('  /bootstrap-phase5-standards    - Code Standards'));
    console.log(chalk.gray('  /bootstrap-phase6-testing     - Testing'));
    console.log(chalk.gray('  /bootstrap-phase7-operations  - Operations + Tools'));
    console.log(chalk.gray('  /docs-update                  - Update documentation when code changes\n'));

    if (flags?.dryRun) {
      console.log(chalk.yellow('⚠️ Dry-run: no files were written. Run again without --dry-run to apply changes.\n'));
    }
    console.log(chalk.yellow('💡 Tip: You can run individual phases if you want to work step-by-step\n'));

  } catch (error) {
    console.error(chalk.red('\n❌ Initialization failed:'), fsErrorMessage(error));
    process.exit(EXIT.FS_ERROR);
  }
}

// CLI Commands
program
  .name('ai-bootstrap')
  .description('Interactive CLI tool to bootstrap AI-ready projects with comprehensive documentation')
  .version(PKG_VERSION);

program
  .command('init')
  .description('Initialize AI Bootstrap in current directory')
  .argument('[path]', 'Target directory (defaults to current directory)', '.')
  .option('--ai <tool>', 'AI tool to use (claude, cursor, copilot, gemini, all)')
  .option('--name <name>', 'Project name (skip interactive prompt)')
  .option('--description <desc>', 'Project description (skip interactive prompt)')
  .option('--verbose', 'Enable verbose logging')
  .option('--dry-run', 'Simulate without writing files')
  .action(async (targetPath: string, options: { ai?: string; name?: string; description?: string }) => {
    const absolutePath = path.resolve(targetPath);
    const flags = { dryRun: (options as any).dryRun === true, verbose: (options as any).verbose === true };
    await initializeProject(absolutePath, options.ai, options.name, options.description, flags);
  });

program
  .command('check')
  .description('Check if current directory is initialized')
  .action(async () => {
    const isInitialized = await checkIfInitialized(process.cwd());
    if (isInitialized) {
      console.log(chalk.green('✅ Project is initialized with AI Bootstrap'));

      const configPath = path.join(process.cwd(), '.ai-bootstrap', 'core', 'config.json');
      const config = await fs.readJSON(configPath);

      console.log(chalk.white('\nConfiguration:'));
      console.log(chalk.gray(`  Version: ${config.version}`));
      console.log(chalk.gray(`  AI Tools: ${config.aiTools.join(', ')}`));
      console.log(chalk.gray(`  Created: ${new Date(config.createdAt).toLocaleString()}`));
      console.log(chalk.gray(`  Working Dir: ${process.cwd()}`));
      console.log(chalk.gray(`  Prompts: ${path.join(process.cwd(), '.ai-bootstrap', 'prompts', 'backend', 'bootstrap.md')}`));
      console.log(chalk.white('\nNext steps:'));
      if (config.aiTools.includes('claude')) {
        console.log(chalk.cyan('  1. Open Claude Code'));
        console.log(chalk.cyan('  2. Run: /bootstrap'));
      } else if (config.aiTools.includes('cursor')) {
        console.log(chalk.cyan('  1. Open Cursor'));
        console.log(chalk.cyan('  2. Run: /bootstrap'));
      } else {
        const toolsText = config.aiTools.length === 1 ? config.aiTools[0] : `${config.aiTools.slice(0, -1).join(', ')} and ${config.aiTools[config.aiTools.length - 1]}`;
        console.log(chalk.cyan(`  1. Open your AI tool (${toolsText})`));
        console.log(chalk.cyan('  2. Run: /bootstrap'));
      }
    } else {
      console.log(chalk.yellow('⚠️  Project is not initialized'));
      console.log(chalk.white('Run: ai-bootstrap init .'));
    }
  });

program.parse();
