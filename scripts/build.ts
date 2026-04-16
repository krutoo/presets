import { exec } from 'node:child_process';
import fs from 'node:fs/promises';
import { promisify } from 'node:util';

const $ = promisify(exec);

// cleanup
await fs.rm('dist', { recursive: true, force: true });

// compile
await $('tsc -p tsconfig.build.json');

// format
await $('npx prettier "dist/**/*.{js,ts}" -w --log-level=error --ignore-path=./.nonexistent');
