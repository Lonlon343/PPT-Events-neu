const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'node_modules', 'payload', 'dist', 'bin', 'loadEnv.js');
let content = fs.readFileSync(file, 'utf8');

if (content.includes("import nextEnvImport from '@next/env'")) {
  content = content.replace(
    "import nextEnvImport from '@next/env'",
    "import * as nextEnvImport from '@next/env'"
  );
  fs.writeFileSync(file, content);
  console.log('[patch] Fixed @next/env default import in payload loadEnv.js');
} else {
  console.log('[patch] loadEnv.js already patched or pattern changed');
}
