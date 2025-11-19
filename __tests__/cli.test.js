const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');

const PROJECT_ROOT = path.resolve(__dirname, '..');
const CLI_PATH = path.resolve(PROJECT_ROOT, 'dist', 'cli.js');
const TSC_PATH = path.resolve(PROJECT_ROOT, 'node_modules', 'typescript', 'bin', 'tsc');

const createTempDir = () => fs.mkdtempSync(path.join(os.tmpdir(), 'ai-bootstrap-test-'));

const removeDir = (dir) => {
  fs.rmSync(dir, { recursive: true, force: true });
};

describe('ai-bootstrap CLI', () => {
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

  it('initializes the bootstrap structure when an AI tool is supplied', () => {
    execFileSync('node', [
      CLI_PATH, 'init', tempDir, 
      '--ai', 'copilot',
      '--name', 'Test Project',
      '--description', 'Test Description'
    ], {
      cwd: PROJECT_ROOT,
      stdio: 'pipe'
    });

    const configPath = path.join(tempDir, '.ai-bootstrap', 'core', 'config.json');
    expect(fs.existsSync(configPath)).toBe(true);

    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    expect(config.aiTools).toEqual(['copilot']);
    expect(config.backend).toBe(true);
    expect(config.frontend).toBe(false);
  });

  it('reports initialized status via the check command', () => {
    execFileSync('node', [
      CLI_PATH, 'init', tempDir, 
      '--ai', 'claude',
      '--name', 'Test Project',
      '--description', 'Test Description'
    ], {
      cwd: PROJECT_ROOT,
      stdio: 'pipe'
    });

    expect(() => {
      execFileSync('node', [CLI_PATH, 'check'], {
        cwd: tempDir,
        stdio: 'pipe'
      });
    }).not.toThrow();
  });
});
