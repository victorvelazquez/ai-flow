const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');

const PROJECT_ROOT = path.resolve(__dirname, '..');
const CLI_PATH = path.resolve(PROJECT_ROOT, 'dist', 'cli.js');
const TSC_PATH = path.resolve(PROJECT_ROOT, 'node_modules', 'typescript', 'bin', 'tsc');

const createTempDir = () => fs.mkdtempSync(path.join(os.tmpdir(), 'ai-flow-slash-'));
const removeDir = (dir) => fs.rmSync(dir, { recursive: true, force: true });

describe('slash commands installation', () => {
  let tempDir;

  beforeAll(() => {
    execFileSync(process.execPath, [TSC_PATH], {
      cwd: PROJECT_ROOT,
      stdio: 'pipe'
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

  const runInit = (tool) => {
    execFileSync('node', [
      CLI_PATH, 'init', tempDir,
      '--ai', tool,
      '--name', 'Test',
      '--description', 'Desc'
    ], {
      cwd: PROJECT_ROOT,
      stdio: 'pipe'
    });
  };

  it('installs Copilot prompts with .prompt.md suffix', () => {
    runInit('copilot');
    const file = path.join(tempDir, '.github', 'prompts', 'bootstrap-phase1-business.prompt.md');
    expect(fs.existsSync(file)).toBe(true);
  });

  it('installs Claude commands', () => {
    runInit('claude');
    const file = path.join(tempDir, '.claude', 'commands', 'bootstrap-phase1-business.md');
    expect(fs.existsSync(file)).toBe(true);
  });

  it('installs Cursor commands', () => {
    runInit('cursor');
    const file = path.join(tempDir, '.cursor', 'commands', 'bootstrap-phase1-business.md');
    expect(fs.existsSync(file)).toBe(true);
  });

  it('installs Gemini commands', () => {
    runInit('gemini');
    const file = path.join(tempDir, '.gemini', 'commands', 'bootstrap-phase1-business.md');
    expect(fs.existsSync(file)).toBe(true);
  });
});

