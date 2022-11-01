import fs from 'fs'
import TsconfigPathsPlugin from '@esbuild-plugins/tsconfig-paths'
import { build } from 'esbuild'
// import tsPaths from 'esbuild-ts-paths'

const files = []

const getFiles = (path, files, extension) => {
  fs.readdirSync(path).forEach((file) => {
    const subpath = `${path}/${file}`
    const isDir = fs.lstatSync(subpath).isDirectory()
    const ext = !isDir
      ? file.split('.').pop()
      : null

    if (isDir)
      getFiles(subpath, files, extension)
    else if (ext === extension)
      files.push(subpath)
  })
}

getFiles('./src', files, 'ts')

// esbuild `find src \\( -name '*.ts' \\)` --platform=node --outdir=dist --resolve-extensions=.js
build({
  entryPoints: files,
  // entryPoints: ['src/index.ts'],
  // entryPoints: [`src/${srcFile}`],
  // outfile: path.join(out, outName),
  outdir: 'dist',
  bundle: false,
  platform: 'node',
  loader: { '.ts': 'ts' },
  resolveExtensions: ['.js'],
  // outExtension: { '.js': '.js' },
  // banner: {
  //   js: 'import { createRequire as topLevelCreateRequire } from \'module\';\n const require = topLevelCreateRequire(import.meta.url);'
  // },
  format: 'esm',
  // plugins: [tsPaths()],
  plugins: [TsconfigPathsPlugin({ tsconfig: './tsconfig.json' })],
})
  .then(() => console.warn('⚡ Done'))
  .catch(() => process.exit(1))
