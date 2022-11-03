import fs from 'fs'
import path from 'path'
import esbuild from 'esbuild'
import { load, transformSource } from './loader.js'

const env = process.argv[2]

const fileArray = []
const getFilesRecursively = (dir) => {
  const files = fs.readdirSync(dir)
  files.forEach((file) => {
    const filePath = path.join(dir, file)
    if (fs.statSync(filePath).isDirectory())
      getFilesRecursively(filePath)

    else
      fileArray.push(filePath)
  })
}
getFilesRecursively('src')

const entryPoints = fileArray.filter((file) => file.endsWith('.ts'))

esbuild.build({
  entryPoints,
  logLevel: 'info',
  // outdir: env === 'dev' ? 'dist' : 'build',
  outdir: 'dist',
  bundle: env !== 'dev',
  platform: 'node',
  format: 'esm',
  target: 'node18',
  outbase: 'src',
  sourcemap: true,
  outExtension: { '.js': '.mjs' },
  tsconfig: 'tsconfig.json',
  resolveExtensions: ['.ts', '.js'],
})
