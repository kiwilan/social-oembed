import glob from 'tiny-glob'
import { build } from 'esbuild'
// import esbuildPluginPino from 'esbuild-plugin-pino'

const config = async () => {
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
    define: {
      'process.env.NODE_ENV_LOG': '"production"'
    },
    outExtension: { '.js': '.mjs' },
    sourcemap: false,
    // plugins: [esbuildPluginPino({ transports: ['pino-pretty'] })]
  })
}
config()
