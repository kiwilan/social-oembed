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
  width = 'width',
  height = 'height',
  'twitterCard' = 'twitter:card',
  'twitterSiteId' = 'twitter:site:id',
  'twitterSite' = 'twitter:site',
  'twitterUrl' = 'twitter:url',
  'twitterCreator' = 'twitter:creator',
  'twitterCreatorId' = 'twitter:creator:id',
  'twitterDescription' = 'twitter:description',
  'twitterTitle' = 'twitter:title',
  'twitterImage' = 'twitter:image',
  'twitterImageAlt' = 'twitter:image:alt',
  'twitterPlayer' = 'twitter:player',
  'twitterPlayerWidth' = 'twitter:player:width',
  'twitterPlayerHeight' = 'twitter:player:height',
  'twitterPlayerStream' = 'twitter:player:stream',
  'twitterAppNameIphone' = 'twitter:app:name:iphone',
  'twitterAppIdIphone' = 'twitter:app:id:iphone',
  'twitterAppUrlIphone' = 'twitter:app:url:iphone',
  'twitterAppNameIpad' = 'twitter:app:name:ipad',
  'twitterAppIdIpad' = 'twitter:app:id:ipad',
  'twitterAppUrlIpad' = 'twitter:app:url:ipad',
  'twitterAppNameGoogleplay' = 'twitter:app:name:googleplay',
  'twitterAppIdGoogleplay' = 'twitter:app:id:googleplay',
  'twitterAppUrlGoogleplay' = 'twitter:app:url:googleplay',
}

export type OpenGraphType = keyof typeof OpenGraphEnum
export type IOpenGraphExtends<T> = Partial<Record<OpenGraphEnum, T>>
export interface IOpenGraph<T = string> extends IOpenGraphExtends<T> {
  social?: Social
  isValid?: boolean
}

export interface IOEmbed {
  embedUrl?: string
  isMobile?: boolean
}

export interface IApiData extends IOpenGraph, IOEmbed {}
