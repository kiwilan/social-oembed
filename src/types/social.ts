import type { IApiData, IOpenGraph } from './api'
import type { ApiQueryFormat, IApiRouteQuery } from './route'
import type ProviderModule from '~/providers/social/ProviderModule'

export type ProviderFetch = 'oembed' | 'opengraph' | 'empty'
export interface ProviderParams {
  url: string
  query: IApiRouteQuery
  matches: string[]
  fetch: ProviderFetch
}

export interface IProviderModule {
  social: Social
  regex?: RegExp
  endpoint?: string
  iframe?: {
    height?: number | string
    width?: number | string
  }
  apiParams?: Record<string, string>
  forceFetch?: boolean
  type: ApiQueryFormat
}

export interface ISocialIdentifier {
  url?: string
  user?: string
  type?: string
  id?: string
  embedUrl?: string
}

export interface IframeSize {
  height?: number | string
  width?: number | string
}

export enum SocialEnum {
  dailymotion = 'dailymotion',
  instagram = 'instagram',
  facebook = 'facebook',
  flickr = 'flickr',
  giphy = 'giphy',
  imgur = 'imgur',
  kickstarter = 'kickstarter',
  linkedin = 'linkedin',
  pinterest = 'pinterest',
  reddit = 'reddit',
  snapchat = 'snapchat',
  soundcloud = 'soundcloud',
  spotify = 'spotify',
  ted = 'ted',
  tumblr = 'tumblr',
  tiktok = 'tiktok',
  twitch = 'twitch',
  twitter = 'twitter',
  vimeo = 'vimeo',
  youtube = 'youtube',
  unknown = 'unknown',
}

// https://bobbyhadz.com/blog/typescript-convert-enum-to-union
export type Social = keyof typeof SocialEnum
export type SocialOEmbed = `${SocialEnum.twitter}` | `${SocialEnum.tiktok}`

type SocialExtends<T> = Partial<Record<SocialEnum, T>>
export interface ISocial<T> extends SocialExtends<T> {}

export interface ISocialPlus<T> extends SocialExtends<T> {
  netflix?: T
}

export interface OpenGraphRenderProps {
  og?: IOpenGraph
}

export interface OEmbedRenderProps {
  embedUrl?: string
  model?: IApiData
  provider?: ProviderModule
}
