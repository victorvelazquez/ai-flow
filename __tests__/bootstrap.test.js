const fs = require('fs');
const path = require('path');

describe('ai-flow templates', () => {
  it('should include AGENT.template.md in templates/shared/', () => {
    const agentTemplate = path.resolve(__dirname, '..', 'templates', 'shared', 'AGENT.template.md');
    expect(fs.existsSync(agentTemplate)).toBe(true);
  });

  it('should include backend templates', () => {
    const backendTemplate = path.resolve(__dirname, '..', 'templates', 'backend', 'ai-instructions.template.md');
    expect(fs.existsSync(backendTemplate)).toBe(true);
  });

  it('should include frontend templates', () => {
    const frontendTemplate = path.resolve(__dirname, '..', 'templates', 'frontend', 'ai-instructions.template.md');
    expect(fs.existsSync(frontendTemplate)).toBe(true);
  });
});
