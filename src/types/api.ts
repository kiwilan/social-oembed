import type { Social } from './social'

enum OpenGraphEnum {
  title = 'title',
  description = 'description',
  image = 'image',
  siteUrl = 'siteUrl',
  type = 'type',
  siteName = 'siteName',
  locale = 'locale',
  audio = 'audio',
  video = 'video',
  determiner = 'determiner',
  'article:author' = 'article:author',
  themeColor = 'themeColor',
  icon = 'icon',
}

export type OpenGraphType = keyof typeof OpenGraphEnum
export type IOpenGraphExtends<T> = Partial<Record<OpenGraphEnum, T>>
export interface IOpenGraph<T = string> extends IOpenGraphExtends<T> {
  social?: Social
}

export interface IOEmbed {
  embedUrl?: string
  isMobile?: boolean
}

export interface IApiData extends IOpenGraph, IOEmbed {}
