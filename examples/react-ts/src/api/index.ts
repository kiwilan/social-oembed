export interface OpenGraphData {
  title?: string
  description?: string
  image?: string
  siteUrl?: string
  type?: string
  siteName?: string
  locale?: string
  themeColor?: string
  render?: string
}

const apiLocal = 'http://localhost:3000'
// const apiProd = 'https://social-oembed.git-projects.xyz'

export const fetchData = async (url: string) => {
  const api = `${apiLocal}/api`

  const params = new URLSearchParams()
  params.append('url', url)
  params.append('format', 'opengraph')
  params.append('dark', 'true')
  const res = await fetch(`${api}?${params.toString()}`)
  const body = await res.json()

  const og = body.data as OpenGraphData

  return og
}
