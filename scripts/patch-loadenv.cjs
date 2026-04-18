const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'node_modules', 'payload', 'dist', 'bin', 'loadEnv.js');
let content = fs.readFileSync(file, 'utf8');

// Replace any variant of the @next/env import with a createRequire call that
// works in both Node ESM and tsx's CJS transpile mode (Node 24 + Payload 3).
const patched = `import { createRequire as __createRequire } from 'node:module';
const { loadEnvConfig } = __createRequire(import.meta.url)('@next/env');`;

const marker = '__createRequire';

if (content.includes(marker)) {
  console.log('[patch] loadEnv.js already uses createRequire — nothing to do');
} else {
  const rx =
    /import (?:\* as )?nextEnvImport from '@next\/env';\s*(?:import \{ findUpSync \} from '\.\.\/utilities\/findUp\.js';\s*)?const \{ loadEnvConfig \} = nextEnvImport;/;
  if (!rx.test(content)) {
    console.log('[patch] loadEnv.js pattern not recognised — skipping');
  } else {
    content = content.replace(rx, (match) => {
      const hasFindUp = match.includes('findUpSync');
      return (
        patched +
        (hasFindUp ? "\nimport { findUpSync } from '../utilities/findUp.js';" : '')
      );
    });
    fs.writeFileSync(file, content);
    console.log('[patch] Replaced @next/env import with createRequire in loadEnv.js');
  }
}
