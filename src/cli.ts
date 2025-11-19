#!/usr/bin/env node

import { Command } from 'commander';
import inquirer from 'inquirer';
import chalk from 'chalk';
import ora from 'ora';
import * as fs from 'fs-extra';
import * as path from 'path';
import ejs from 'ejs';

const ROOT_DIR = path.resolve(__dirname, '..');

const program = new Command();

interface AIToolChoice {
  name: string;
  value: string;
  description: string;
}

const AI_TOOLS: AIToolChoice[] = [
  {
    name: '🤖 Claude Code (Recommended)',
    value: 'claude',
    description: 'Anthropic Claude - Best for comprehensive development with plan mode'
  },
  {
    name: '✨ Cursor',
    value: 'cursor',
    description: 'AI-powered code editor - Popular for fast iteration'
  },
  {
    name: '🐙 GitHub Copilot',
    value: 'copilot',
    description: 'GitHub native AI assistant - Great for existing GitHub workflows'
  },
  {
    name: '🔮 Gemini',
    value: 'gemini',
    description: 'Google Gemini - Good for multi-modal tasks'
  },
  {
    name: '🌐 All (AI-Agnostic)',
    value: 'all',
    description: 'Set up for all AI tools - Maximum compatibility'
  }
];

async function selectAITool(providedTool?: string): Promise<string[]> {
  if (providedTool) {
    const tool = AI_TOOLS.find(t => t.value === providedTool);
    if (!tool) {
      console.error(chalk.red(`❌ Invalid AI tool: ${providedTool}`));
      console.log(chalk.yellow('Available options: claude, cursor, copilot, gemini, all'));
      process.exit(1);
    }
    return providedTool === 'all'
      ? ['claude', 'cursor', 'copilot', 'gemini']
      : [providedTool];
  }

  console.log(chalk.cyan('\n🚀 AI Bootstrap - Interactive Project Setup\n'));
  console.log(chalk.white('Select your primary AI development tool:\n'));

  const { selectedTool } = await inquirer.prompt([
    {
      type: 'list',
      name: 'selectedTool',
      message: 'Which AI tool will you use?',
      choices: AI_TOOLS.map(tool => ({
        name: `${tool.name}\n   ${chalk.gray(tool.description)}`,
        value: tool.value,
        short: tool.name
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

async function createBootstrapStructure(targetPath: string, aiTools: string[]): Promise<void> {
  const spinner = ora('Creating .ai-bootstrap structure...').start();

  try {
    const bootstrapPath = path.join(targetPath, '.ai-bootstrap');

    // Create core directories
    await fs.ensureDir(path.join(bootstrapPath, 'core'));
    await fs.ensureDir(path.join(bootstrapPath, 'prompts'));
    await fs.ensureDir(path.join(bootstrapPath, 'templates', 'docs'));
    await fs.ensureDir(path.join(bootstrapPath, 'templates', 'specs'));
    await fs.ensureDir(path.join(bootstrapPath, 'scripts'));

    // Create config file
    const config = {
      version: '1.0.0',
      aiTools: aiTools,
      createdAt: new Date().toISOString(),
      backend: true,
      frontend: false
    };

    await fs.writeJSON(path.join(bootstrapPath, 'core', 'config.json'), config, { spaces: 2 });

    spinner.succeed('Created .ai-bootstrap structure');
  } catch (error) {
    spinner.fail('Failed to create structure');
    throw error;
  }
}

async function renderTemplates(targetPath: string, projectData: { name: string; description: string }): Promise<void> {
  const spinner = ora('Generando documentación desde templates...').start();
  try {
    const templatesSource = path.join(ROOT_DIR, 'templates');
    const templatesTarget = path.join(targetPath, '.ai-bootstrap', 'templates');
    await fs.ensureDir(templatesTarget);

    // Buscar todos los .template.md en templates y subcarpetas
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
      // Renderizar con EJS, dejando {{PLACEHOLDER}} para todo lo que no sea name/description
      const rendered = ejs.render(templateContent, {
        PROJECT_NAME: projectData.name,
        PROJECT_DESCRIPTION: projectData.description,
        PLACEHOLDER: '{{PLACEHOLDER}}'
      }, { delimiter: '?' });
      await fs.writeFile(destPath, rendered, 'utf8');
    }
    spinner.succeed('Documentación generada desde templates');
  } catch (error) {
    spinner.fail('Error al generar documentación');
    throw error;
  }
}

async function copyPrompts(targetPath: string): Promise<void> {
  const spinner = ora('Copying master prompts...').start();

  try {
    const promptsSource = path.join(ROOT_DIR, 'prompts');
    const promptsTarget = path.join(targetPath, '.ai-bootstrap', 'prompts');

    await fs.copy(promptsSource, promptsTarget);

    spinner.succeed('Master prompts copied');
  } catch (error) {
    spinner.fail('Failed to copy prompts');
    throw error;
  }
}

async function setupSlashCommands(targetPath: string, aiTools: string[]): Promise<void> {
  const spinner = ora('Setting up slash commands...').start();

  try {
    const slashCommandsSource = path.join(ROOT_DIR, 'slash-commands');

    for (const tool of aiTools) {
      const commandsSource = path.join(slashCommandsSource, tool);
      let commandsTarget: string;

      switch (tool) {
        case 'claude':
          commandsTarget = path.join(targetPath, '.claude', 'commands');
          break;
        case 'cursor':
          commandsTarget = path.join(targetPath, '.cursor', 'commands');
          break;
        case 'copilot':
          commandsTarget = path.join(targetPath, '.github', 'copilot-commands');
          break;
        case 'gemini':
          commandsTarget = path.join(targetPath, '.gemini', 'commands');
          break;
        default:
          continue;
      }

      if (await fs.pathExists(commandsSource)) {
        await fs.ensureDir(commandsTarget);
        await fs.copy(commandsSource, commandsTarget);
      }
    }

    spinner.succeed(`Slash commands set up for: ${aiTools.join(', ')}`);
  } catch (error) {
    spinner.fail('Failed to set up slash commands');
    throw error;
  }
}

async function copyScripts(targetPath: string): Promise<void> {
  const spinner = ora('Copying setup scripts...').start();

  try {
    const scriptsSource = path.join(ROOT_DIR, 'scripts');
    const scriptsTarget = path.join(targetPath, '.ai-bootstrap', 'scripts');

    await fs.copy(scriptsSource, scriptsTarget);

    // Make scripts executable on Unix-like systems
    if (process.platform !== 'win32') {
      const files = await fs.readdir(scriptsTarget);
      for (const file of files) {
        if (file.endsWith('.sh')) {
          await fs.chmod(path.join(scriptsTarget, file), 0o755);
        }
      }
    }

    spinner.succeed('Setup scripts copied');
  } catch (error) {
    spinner.fail('Failed to copy scripts');
    throw error;
  }
}

async function initializeProject(targetPath: string, aiTool?: string, projectName?: string, projectDescription?: string): Promise<void> {
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

    // Pedir datos mínimos del proyecto solo si no fueron proporcionados
    let finalProjectName = projectName;
    let finalProjectDescription = projectDescription;
    
    if (!finalProjectName || !finalProjectDescription) {
      const answers = await inquirer.prompt([
        {
          type: 'input',
          name: 'projectName',
          message: 'Nombre del proyecto:',
          default: 'Mi Proyecto AI',
          when: !finalProjectName
        },
        {
          type: 'input',
          name: 'projectDescription',
          message: 'Descripción breve:',
          default: 'Proyecto inicializado con AI Bootstrap',
          when: !finalProjectDescription
        }
      ]);
      finalProjectName = finalProjectName || answers.projectName;
      finalProjectDescription = finalProjectDescription || answers.projectDescription;
    }

    console.log(chalk.cyan('\n📦 Initializing AI Bootstrap...\n'));

    // Create structure
    await createBootstrapStructure(targetPath, aiTools);
    await renderTemplates(targetPath, { name: finalProjectName!, description: finalProjectDescription! });
    await copyPrompts(targetPath);
    await copyScripts(targetPath);
    await setupSlashCommands(targetPath, aiTools);

    // Success message
    console.log(chalk.green('\n✅ AI Bootstrap initialized successfully!\n'));
    console.log(chalk.white('Next steps:\n'));

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
    console.log(chalk.gray('  /bootstrap              - Full 7-phase documentation generation'));
    console.log(chalk.gray('  /bootstrap-phase1       - Discovery & Business'));
    console.log(chalk.gray('  /bootstrap-phase2       - Data Architecture'));
    console.log(chalk.gray('  /bootstrap-phase3       - System Architecture'));
    console.log(chalk.gray('  /bootstrap-phase4       - Security & Auth'));
    console.log(chalk.gray('  /bootstrap-phase5       - Code Standards'));
    console.log(chalk.gray('  /bootstrap-phase6       - Testing'));
    console.log(chalk.gray('  /bootstrap-phase7       - Operations + Tools\n'));

    console.log(chalk.yellow('💡 Tip: You can run individual phases if you want to work step-by-step\n'));

  } catch (error) {
    console.error(chalk.red('\n❌ Initialization failed:'), error);
    process.exit(1);
  }
}

// CLI Commands
program
  .name('ai-bootstrap')
  .description('Interactive CLI tool to bootstrap AI-ready projects with comprehensive documentation')
  .version('1.0.0');

program
  .command('init')
  .description('Initialize AI Bootstrap in current directory')
  .argument('[path]', 'Target directory (defaults to current directory)', '.')
  .option('--ai <tool>', 'AI tool to use (claude, cursor, copilot, gemini, all)')
  .option('--name <name>', 'Project name (skip interactive prompt)')
  .option('--description <desc>', 'Project description (skip interactive prompt)')
  .action(async (targetPath: string, options: { ai?: string; name?: string; description?: string }) => {
    const absolutePath = path.resolve(targetPath);
    await initializeProject(absolutePath, options.ai, options.name, options.description);
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
    } else {
      console.log(chalk.yellow('⚠️  Project is not initialized'));
      console.log(chalk.white('Run: ai-bootstrap init .'));
    }
  });

program.parse();
