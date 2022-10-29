import './style.css'
import Alpine from 'alpinejs'
import typescriptLogo from './typescript.svg'
import { setupCounter } from './counter'

window.Alpine = Alpine

Alpine.data('social', () => ({
  api: 'http://localhost:3000',
  apiProd: 'https://social-oembed.git-projects.xyz',
  url: 'https://github.com',

  init() {
    console.log('Social oEmbed component initialized')
    this.api = `${this.api}/api`
    this.getOpenGraph()
  },
  async getOpenGraph() {
    const params = new URLSearchParams()
    params.append('url', this.url)
    params.append('format', 'opengraph')
    const res = await fetch(`${this.api}?${params.toString()}`)
    console.log(res)
  },
}))

Alpine.start()

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
  </div>
`

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
