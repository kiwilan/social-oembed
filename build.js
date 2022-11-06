import fs from 'fs'
import { join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

const configPath = (dir) => join(__dirname, `./${dir}/package.json`)

const getPackageJson = () => {
  const path = join(fileURLToPath(import.meta.url), '../package.json')
  const content = fs.readFileSync(path, 'utf8')
  const contentJson = JSON.parse(content)
  const json = {
    name: contentJson.name,
    version: contentJson.version,
  }

  fs.rmSync(configPath('src'), { force: true })
  fs.writeFileSync(configPath('src'), JSON.stringify(json, null, 2))

  fs.rmSync(configPath('build'), { force: true })
  fs.mkdirSync('build', { recursive: true })
  fs.writeFileSync(configPath('build'), JSON.stringify(json, null, 2), {})
}
getPackageJson()
