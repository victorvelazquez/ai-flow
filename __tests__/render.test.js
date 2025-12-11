const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');

const PROJECT_ROOT = path.resolve(__dirname, '..');
const CLI_PATH = path.resolve(PROJECT_ROOT, 'dist', 'cli.js');
const TSC_PATH = path.resolve(PROJECT_ROOT, 'node_modules', 'typescript', 'bin', 'tsc');

const createTempDir = () => fs.mkdtempSync(path.join(os.tmpdir(), 'ai-flow-render-'));
const removeDir = (dir) => fs.rmSync(dir, { recursive: true, force: true });

describe('template rendering', () => {
  let tempDir;

  beforeAll(() => {
    execFileSync(process.execPath, [TSC_PATH], {
      cwd: PROJECT_ROOT,
      stdio: 'pipe',
    });
  });

  beforeEach(() => {
    tempDir = createTempDir();
  });

  afterEach(() => {
    if (tempDir && fs.existsSync(tempDir)) {
      removeDir(tempDir);
    }
  });

  it('generates templates and preserves handlebars placeholders', () => {
    execFileSync(
      'node',
      [
        CLI_PATH,
        'init',
        tempDir,
        '--ai',
        'copilot',
        '--name',
        'Proyecto N',
        '--description',
        'Descripción con ñ',
      ],
      {
        cwd: PROJECT_ROOT,
        stdio: 'pipe',
      }
    );

    const aiInstructions = path.join(
      tempDir,
      '.ai-flow',
      'templates',
      'ai-instructions.template.md'
    );
    expect(fs.existsSync(aiInstructions)).toBe(true);
    const content = fs.readFileSync(aiInstructions, 'utf8');

    expect(content).toMatch(/\{\{PROJECT_NAME\}\}/);
    expect(content).toMatch(/\{\{LINT_COMMAND\}\}/);
  });
});
