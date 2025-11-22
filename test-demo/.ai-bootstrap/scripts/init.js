#!/usr/bin/env node

// AI Bootstrap - Initialization Script (Node.js)
// Portado desde init.sh para máxima compatibilidad

const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');

function showHelp() {
  console.log(`\nAI Bootstrap Init Script (Node.js)

Uso:
  node scripts/init.js [directorio]

Opciones:
  -h, --help    Muestra esta ayuda
`);
}

async function main() {
  const args = process.argv.slice(2);
  if (args.includes('-h') || args.includes('--help')) {
    showHelp();
    process.exit(0);
  }

  const projectRoot = args[0] || '.';
  const bootstrapDir = path.join(projectRoot, '.ai-bootstrap');

  console.log(chalk.cyan(`🚀 Inicializando AI Bootstrap en ${projectRoot}`));

  if (await fs.pathExists(bootstrapDir)) {
    console.log(chalk.yellow('⚠️  El directorio .ai-bootstrap ya existe.'));
    process.exit(1);
  }

  // Crear estructura de directorios
  console.log(chalk.white('📁 Creando estructura de directorios...'));
  await fs.ensureDir(path.join(bootstrapDir, 'core'));
  await fs.ensureDir(path.join(bootstrapDir, 'prompts'));
  await fs.ensureDir(path.join(bootstrapDir, 'templates', 'docs'));
  await fs.ensureDir(path.join(bootstrapDir, 'templates', 'specs'));
  await fs.ensureDir(path.join(bootstrapDir, 'scripts'));

  // Crear configuración
  console.log(chalk.white('⚙️  Creando configuración...'));
  const config = {
    version: '1.0.0',
    createdAt: new Date().toISOString(),
    backend: true,
    frontend: false
  };
  await fs.writeJSON(path.join(bootstrapDir, 'core', 'config.json'), config, { spaces: 2 });

  console.log(chalk.green('✅ Estructura creada correctamente'));
}

main().catch(err => {
  console.error(chalk.red('❌ Error durante la inicialización:'), err);
  process.exit(1);
});
