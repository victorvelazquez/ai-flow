import fs from 'fs-extra';
import path from 'path';

export async function assertDirWritable(dir: string): Promise<void> {
  await fs.ensureDir(dir);
  await fs.access(dir, fs.constants.W_OK);
  const probe = path.join(dir, `.probe-${Date.now()}`);
  await fs.writeFile(probe, 'x');
  await fs.remove(probe);
}
