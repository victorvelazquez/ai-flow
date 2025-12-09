const fs = require('fs');
const path = require('path');

describe('ai-flow helpers', () => {
  it('should create a directory if it does not exist', () => {
    const testDir = path.resolve(__dirname, 'tmp-helper-test');
    if (fs.existsSync(testDir)) fs.rmSync(testDir, { recursive: true, force: true });
    fs.mkdirSync(testDir);
    expect(fs.existsSync(testDir)).toBe(true);
    fs.rmSync(testDir, { recursive: true, force: true });
  });

  it('should write and read a JSON file', () => {
    const testFile = path.resolve(__dirname, 'tmp-helper.json');
    const data = { foo: 'bar' };
    fs.writeFileSync(testFile, JSON.stringify(data));
    const read = JSON.parse(fs.readFileSync(testFile, 'utf8'));
    expect(read.foo).toBe('bar');
    fs.rmSync(testFile);
  });
});
