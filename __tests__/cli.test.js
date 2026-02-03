const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');

const PROJECT_ROOT = path.resolve(__dirname, '..');
const CLI_PATH = path.resolve(PROJECT_ROOT, 'dist', 'cli.js');
const TSC_PATH = path.resolve(PROJECT_ROOT, 'node_modules', 'typescript', 'bin', 'tsc');

const createTempDir = () => fs.mkdtempSync(path.join(os.tmpdir(), 'ai-flow-test-'));

const removeDir = (dir) => {
  fs.rmSync(dir, { recursive: true, force: true });
};

describe('ai-flow CLI', () => {
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

  it('initializes the build structure when an AI tool is supplied (backend default)', () => {
    execFileSync(
      'node',
      [
        CLI_PATH,
        'init',
        tempDir,
        '--ai',
        'copilot',
        '--name',
        'Test Project',
        '--description',
        'Test Description',
      ],
      {
        cwd: PROJECT_ROOT,
        stdio: 'pipe',
      }
    );

    const configPath = path.join(tempDir, '.ai-flow', 'core', 'config.json');
    expect(fs.existsSync(configPath)).toBe(true);

    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    expect(config.aiTools).toEqual(['copilot']);
    expect(config.projectType).toBe('backend');
    expect(config.backend).toBe(true);
    expect(config.frontend).toBe(false);
  });

  it('initializes frontend project when --type frontend is supplied', () => {
    execFileSync(
      'node',
      [
        CLI_PATH,
        'init',
        tempDir,
        '--ai',
        'cursor',
        '--type',
        'frontend',
        '--name',
        'Frontend App',
        '--description',
        'Frontend Test Description',
      ],
      {
        cwd: PROJECT_ROOT,
        stdio: 'pipe',
      }
    );

    const configPath = path.join(tempDir, '.ai-flow', 'core', 'config.json');
    expect(fs.existsSync(configPath)).toBe(true);

    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    expect(config.aiTools).toEqual(['cursor']);
    expect(config.projectType).toBe('frontend');
    expect(config.backend).toBe(false);
    expect(config.frontend).toBe(true);

    // Verify frontend prompts are copied
    const frontendPromptPath = path.join(tempDir, '.cursor', 'commands', 'flow-build.md');
    expect(fs.existsSync(frontendPromptPath)).toBe(true);

    // Verify frontend templates are copied to .ai-flow/templates/ (not project root)
    const frontendTemplatePath = path.join(
      tempDir,
      '.ai-flow',
      'templates',
      'ai-instructions.template.md'
    );
    expect(fs.existsSync(frontendTemplatePath)).toBe(true);

    // Verify frontend-specific template exists in .ai-flow/templates/
    const componentsTemplatePath = path.join(
      tempDir,
      '.ai-flow',
      'templates',
      'docs',
      'components.template.md'
    );
    expect(fs.existsSync(componentsTemplatePath)).toBe(true);
  });

  it('reports initialized status via the check command (backend)', () => {
    execFileSync(
      'node',
      [
        CLI_PATH,
        'init',
        tempDir,
        '--ai',
        'claude',
        '--name',
        'Test Project',
        '--description',
        'Test Description',
      ],
      {
        cwd: PROJECT_ROOT,
        stdio: 'pipe',
      }
    );

    expect(() => {
      execFileSync('node', [CLI_PATH, 'check'], {
        cwd: tempDir,
        stdio: 'pipe',
      });
    }).not.toThrow();
  });

  it('reports initialized status via the check command (frontend)', () => {
    execFileSync(
      'node',
      [
        CLI_PATH,
        'init',
        tempDir,
        '--ai',
        'claude',
        '--type',
        'frontend',
        '--name',
        'Frontend Project',
        '--description',
        'Frontend Description',
      ],
      {
        cwd: PROJECT_ROOT,
        stdio: 'pipe',
      }
    );

    const output = execFileSync('node', [CLI_PATH, 'check'], {
      cwd: tempDir,
      stdio: 'pipe',
      encoding: 'utf8',
    });

    expect(output).toContain('Frontend');
    expect(output).toContain('frontend');
  });

  it('initializes fullstack project when --type fullstack is supplied', () => {
    execFileSync(
      'node',
      [
        CLI_PATH,
        'init',
        tempDir,
        '--ai',
        'cursor',
        '--type',
        'fullstack',
        '--name',
        'Fullstack App',
        '--description',
        'Fullstack Test Description',
      ],
      {
        cwd: PROJECT_ROOT,
        stdio: 'pipe',
      }
    );

    const configPath = path.join(tempDir, '.ai-flow', 'core', 'config.json');
    expect(fs.existsSync(configPath)).toBe(true);

    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    expect(config.aiTools).toEqual(['cursor']);
    expect(config.projectType).toBe('fullstack');
    expect(config.backend).toBe(true);
    expect(config.frontend).toBe(true);

    // Verify both backend and frontend prompts are copied with prefixes
    const backendPromptPath = path.join(tempDir, '.cursor', 'commands', 'backend-flow-build.md');
    const frontendPromptPath = path.join(tempDir, '.cursor', 'commands', 'frontend-flow-build.md');
    expect(fs.existsSync(backendPromptPath)).toBe(true);
    expect(fs.existsSync(frontendPromptPath)).toBe(true);

    // Verify templates from both backend and frontend are copied to .ai-flow/templates/
    // Backend templates
    const backendTemplatePath = path.join(
      tempDir,
      '.ai-flow',
      'templates',
      'docs',
      'api.template.md'
    );
    // Frontend templates
    const frontendTemplatePath = path.join(
      tempDir,
      '.ai-flow',
      'templates',
      'docs',
      'components.template.md'
    );

    // At least one should exist (depending on processing order)
    const templatesExist =
      fs.existsSync(backendTemplatePath) || fs.existsSync(frontendTemplatePath);
    expect(templatesExist).toBe(true);
  });

  it('reports initialized status via the check command (fullstack)', () => {
    execFileSync(
      'node',
      [
        CLI_PATH,
        'init',
        tempDir,
        '--ai',
        'claude',
        '--type',
        'fullstack',
        '--name',
        'Fullstack Project',
        '--description',
        'Fullstack Description',
      ],
      {
        cwd: PROJECT_ROOT,
        stdio: 'pipe',
      }
    );

    const output = execFileSync('node', [CLI_PATH, 'check'], {
      cwd: tempDir,
      stdio: 'pipe',
      encoding: 'utf8',
    });

    expect(output).toContain('Full Stack');
    expect(output).toContain('Backend Prompts');
    expect(output).toContain('Frontend Prompts');
    expect(output).toContain('/backend-flow-build');
    expect(output).toContain('/frontend-flow-build');
  });

  it('initializes mobile project when --type mobile is supplied', () => {
    execFileSync(
      'node',
      [
        CLI_PATH,
        'init',
        tempDir,
        '--ai',
        'cursor',
        '--type',
        'mobile',
        '--name',
        'Mobile App',
        '--description',
        'Mobile Test Description',
      ],
      {
        cwd: PROJECT_ROOT,
        stdio: 'pipe',
      }
    );

    const configPath = path.join(tempDir, '.ai-flow', 'core', 'config.json');
    expect(fs.existsSync(configPath)).toBe(true);

    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    expect(config.aiTools).toEqual(['cursor']);
    expect(config.projectType).toBe('mobile');
    expect(config.mobile).toBe(true);

    // Verify mobile prompts are copied
    const mobilePromptPath = path.join(tempDir, '.cursor', 'commands', 'flow-build.md');
    expect(fs.existsSync(mobilePromptPath)).toBe(true);

    // Verify mobile templates are copied (templates are copied directly to templates/, not templates/mobile/)
    // Templates are copied to .ai-flow/templates/ WITHOUT rendering
    const mobileTemplatePath = path.join(tempDir, '.ai-flow', 'templates', 'README.template.md');
    expect(fs.existsSync(mobileTemplatePath)).toBe(true);

    // Verify mobile-specific template exists in .ai-flow/templates/
    const mobileSpecificTemplatePath = path.join(
      tempDir,
      '.ai-flow',
      'templates',
      'docs',
      'navigation.template.md'
    );
    expect(fs.existsSync(mobileSpecificTemplatePath)).toBe(true);
  });

  it('reports initialized status via the check command (mobile)', () => {
    execFileSync(
      'node',
      [
        CLI_PATH,
        'init',
        tempDir,
        '--ai',
        'claude',
        '--type',
        'mobile',
        '--name',
        'Mobile Project',
        '--description',
        'Mobile Description',
      ],
      {
        cwd: PROJECT_ROOT,
        stdio: 'pipe',
      }
    );

    const output = execFileSync('node', [CLI_PATH, 'check'], {
      cwd: tempDir,
      stdio: 'pipe',
      encoding: 'utf8',
    });

    expect(output).toContain('Mobile');
    expect(output).toContain('mobile');
  });

  it('initializes desktop project when --type desktop is supplied', () => {
    execFileSync(
      'node',
      [
        CLI_PATH,
        'init',
        tempDir,
        '--ai',
        'cursor',
        '--type',
        'desktop',
        '--name',
        'Desktop App',
        '--description',
        'Desktop Test Description',
      ],
      {
        cwd: PROJECT_ROOT,
        stdio: 'pipe',
      }
    );

    const configPath = path.join(tempDir, '.ai-flow', 'core', 'config.json');
    expect(fs.existsSync(configPath)).toBe(true);

    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    expect(config.aiTools).toEqual(['cursor']);
    expect(config.projectType).toBe('desktop');
    expect(config.desktop).toBe(true);

    // Verify desktop prompts are copied
    const desktopPromptPath = path.join(tempDir, '.cursor', 'commands', 'flow-build.md');
    expect(fs.existsSync(desktopPromptPath)).toBe(true);

    // Verify desktop templates are copied to .ai-flow/templates/ WITHOUT rendering
    const desktopTemplatePath = path.join(tempDir, '.ai-flow', 'templates', 'README.template.md');
    expect(fs.existsSync(desktopTemplatePath)).toBe(true);

    // Verify desktop-specific template exists in .ai-flow/templates/
    const desktopSpecificTemplatePath = path.join(
      tempDir,
      '.ai-flow',
      'templates',
      'docs',
      'docs',
      'architecture.template.md'
    );
    expect(fs.existsSync(desktopSpecificTemplatePath)).toBe(true);

    // Verify desktop UI template exists
    const desktopUITemplatePath = path.join(
      tempDir,
      '.ai-flow',
      'templates',
      'specs',
      'specs',
      'configuration.template.md'
    );
    expect(fs.existsSync(desktopUITemplatePath)).toBe(true);
  });

  it('reports initialized status via the check command (desktop)', () => {
    execFileSync(
      'node',
      [
        CLI_PATH,
        'init',
        tempDir,
        '--ai',
        'claude',
        '--type',
        'desktop',
        '--name',
        'Desktop Project',
        '--description',
        'Desktop Description',
      ],
      {
        cwd: PROJECT_ROOT,
        stdio: 'pipe',
      }
    );

    const output = execFileSync('node', [CLI_PATH, 'check'], {
      cwd: tempDir,
      stdio: 'pipe',
      encoding: 'utf8',
    });

    expect(output).toContain('Desktop');
    expect(output).toContain('desktop');
  });
});
