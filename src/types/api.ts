export interface IOpenGraph {
  title?: string
  description?: string
  image?: string
  siteUrl?: string
  type?: string
  siteName?: string
  locale?: string
  themeColor?: string
  twitter?: boolean
}

export interface IOEmbed {
  embedUrl?: string
  isMobile?: boolean
}

export interface IApiData extends IOpenGraph, IOEmbed {}
