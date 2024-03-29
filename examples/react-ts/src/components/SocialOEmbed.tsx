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

function SocialOEmbed(props: {
  url: string
  oembed?: boolean
  dark?: boolean
}) {
  const [openGraph, setOpenGraph] = useState<OpenGraphData>({})

  const fetchData = async (url: string, oembed?: boolean, dark = false) => {
    const endpoint =
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      (import.meta.env.VITE_SOCIAL_OEMBED_API as string) ??
      'https://social-oembed.git-projects.xyz'
    const api = `${endpoint}/api`

    const params = new URLSearchParams()
    params.append('url', url)
    params.append('format', oembed ? 'oembed' : 'opengraph')
    params.append('dark', dark ? 'true' : 'false')
    params.append('hide_media', 'true')
    params.append('theme', dark ? 'dark' : 'light')
    const res = await fetch(`${api}?${params.toString()}`)
    const body = await res.json()

    return body.data as OpenGraphData
  }

  useEffect(() => {
    fetchData(props.url, props.oembed, props.dark ?? false).then((data) => {
      setOpenGraph(data)
    })
  }, [])

  return !openGraph ? (
    <div>Loading...</div>
  ) : (
    <div
      className="not-prose"
      dangerouslySetInnerHTML={{ __html: openGraph.render ?? '' }}
    ></div>
  )
}

export default SocialOEmbed
