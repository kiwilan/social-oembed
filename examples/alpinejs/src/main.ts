import './style.css'

interface OpenGraphData {
  title?: string
  description?: string
  image?: string
  siteUrl?: string
  type?: string
  siteName?: string
  locale?: string
  themeColor?: string
}

const apiLocal = 'http://localhost:3000'
// const apiProd = 'https://social-oembed.git-projects.xyz'

const fetchOpenGraph = async (url: string) => {
  const api = `${apiLocal}/api`

  const params = new URLSearchParams()
  params.append('url', url)
  params.append('format', 'opengraph')
  const res = await fetch(`${api}?${params.toString()}`)
  const body = await res.json()

  const og = body.data as OpenGraphData

  return JSON.stringify(og, null, 2)
}

const openGraphHtml = (openGraph: OpenGraphData) => {
  const { title, description, image, siteUrl, siteName, themeColor } = openGraph

  const html = `
  <div class="mx-auto max-w-md">
  <a
    href="${siteUrl}"
    target="_blank"
    rel="noopener noreferrer"
    class="relative block rounded-md border border-gray-200 bg-gray-50 p-3 text-gray-900 no-underline dark:border-gray-700 dark:bg-gray-800 dark:text-gray-50"
  >
    <div
      style="background-color: ${themeColor};"
      class="absolute inset-y-0 left-0 h-full w-1 rounded-md"
    ></div>
    <div class="px-2">
      <div class="text-sm">${siteName}</div>
      <div class="font-semibold text-xl mt-2">
        ${title}
      </div>
      <div class="text-sm mt-2">
        ${description}
      </div>
      <img
        src="${image}"
        class="mt-3 w-full h-32 object-cover object-center"
        alt=""
      />
    </div>
  </a>
</div>
  `

  return html
}

const openGraphExample = async (url: string) => {
  const content = await fetchOpenGraph(url)
  const pre = `
  <div>
    <div class="m-3">
      <div class="p-3">
        <div class="text-center">${url}</div>
        <pre class="w-96 overflow-auto mx-auto mt-5">${content}</pre>
        <div class="mt-5">${openGraphHtml(JSON.parse(content))}</div>
      </div>
    </div>
  </div>
  `

  const app = document.querySelector<HTMLDivElement>('#app')
  if (app) {
    const child = document.createElement('div')
    child.innerHTML = pre
    app.appendChild(child)
  }
}

openGraphExample('https://github.com')
openGraphExample('https://open.spotify.com')
openGraphExample('https://www.netflix.com')
