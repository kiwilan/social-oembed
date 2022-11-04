import glob from 'tiny-glob'
import { build } from 'esbuild'
// import esbuildPluginPino from 'esbuild-plugin-pino'

const config = async () => {
  // Get all ts files
  const entryPoints = await glob('src/**/*.ts')

  return build({
    entryPoints,
    logLevel: 'info',
    outdir: 'build',
    bundle: true,
    minify: true,
    platform: 'node',
    target: 'esnext',
    format: 'esm',
    outExtension: { '.js': '.mjs' },
    sourcemap: true,
    banner: {
      js: `
import { createRequire } from 'module';
import path from 'path';
import { fileURLToPath } from 'url';
const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
`,
    },
    // plugins: [esbuildPluginPino({ transports: ['pino-pretty'] })]
  })
}
config()
