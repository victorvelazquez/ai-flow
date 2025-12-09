const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');

const PROJECT_ROOT = path.resolve(__dirname, '..');
const CLI_PATH = path.resolve(PROJECT_ROOT, 'dist', 'cli.js');
const TSC_PATH = path.resolve(PROJECT_ROOT, 'node_modules', 'typescript', 'bin', 'tsc');

const createTempDir = () => fs.mkdtempSync(path.join(os.tmpdir(), 'ai-flow-check-'));
const removeDir = (dir) => fs.rmSync(dir, { recursive: true, force: true });

describe('check command output', () => {
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

  it('prints configuration with version and AI tools', () => {
    execFileSync('node', [
      CLI_PATH, 'init', tempDir,
      '--ai', 'claude',
      '--name', 'Test',
      '--description', 'Desc'
    ], {
      cwd: PROJECT_ROOT,
      stdio: 'pipe'
    });

    const output = execFileSync('node', [CLI_PATH, 'check'], {
      cwd: tempDir,
      stdio: 'pipe'
    }).toString();

    expect(output).toMatch(/✅ Project is initialized with AI Flow/);
    expect(output).toMatch(/Configuration:/);
    const pkg = JSON.parse(fs.readFileSync(path.join(PROJECT_ROOT, 'package.json'), 'utf8'));
    expect(output).toMatch(new RegExp(`Version: ${pkg.version}`));
    expect(output).toMatch(/AI Tools: claude/);
  });
});

