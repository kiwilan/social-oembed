import { useEffect, useState } from 'react'

interface OpenGraphData {
  title?: string
  description?: string
  image?: string
  siteUrl?: string
  type?: string
  siteName?: string
  locale?: string
  themeColor?: string
  render?: string
  embedUrl?: string
}

const SocialOEmbed = (props: { url: string; oembed?: boolean }) => {
  const [openGraph, setOpenGraph] = useState<OpenGraphData>({})

  const fetchData = async (url: string, oembed?: boolean) => {
    const endpoint = 'http://localhost:3000'
    // const endpoint = 'https://social-oembed.git-projects.xyz'
    const api = `${endpoint}/api`

    const params = new URLSearchParams()
    params.append('url', url)
    params.append('format', oembed ? 'oembed' : 'opengraph')
    params.append('dark', 'true')
    params.append('hide_media', 'true')
    params.append('theme', 'dark')
    const res = await fetch(`${api}?${params.toString()}`)
    const body = await res.json()

    return body.data as OpenGraphData
  }

  useEffect(() => {
    fetchData(props.url, props.oembed).then((data) => {
      setOpenGraph(data)
    })
  }, [])

  return !openGraph ? (
    <div>Loading...</div>
  ) : (
    <div dangerouslySetInnerHTML={{ __html: openGraph.render ?? '' }}></div>
  )
}

export default SocialOEmbed
