import type { FetchType } from './http'
import type { ProviderFetch } from './social'

export type Endpoint = '/' | '/instance' | '/api'

enum ApiQueryFormatEnum {
  opengraph = 'opengraph',
  oembed = 'oembed',
}

export type ApiQueryFormat = keyof typeof ApiQueryFormatEnum
type IApiQueryFormatExtends<T> = Partial<Record<ApiQueryFormatEnum, T>>
export interface IApiQueryFormat<T> extends IApiQueryFormatExtends<T> {}

export type ApiRouteQueryKey = 'url' | 'format' | 'opengraph' | 'oembed' | 'api_key' | 'dark' | 'align' | 'conversation' | 'hide_media' | 'lang' | 'theme' | 'omit_script' | 'width' | 'height' | 'is_mobile'
export type ApiRouteQuery = Record<ApiRouteQueryKey, string | undefined> | undefined
// export type ApiRouteQuery = Record<Partial<ApiRouteQueryKey>, string>

export type QueryOpenGraph = 'all' | 'twitter'
export type TwitterAlign = 'left' | 'center' | 'right'
export type TwitterConversation = 'none' | 'all'
export type TwitterTheme = 'light' | 'dark'

export interface IApiRouteQuery {
  url: string
  format: ApiQueryFormat
  api_key?: string | boolean
  dark?: boolean
  // open graph
  opengraph?: QueryOpenGraph
  // oembed
  oembed?: ProviderFetch
  // twitter api
  align?: TwitterAlign
  conversation?: TwitterConversation
  hide_media?: boolean
  lang?: string
  theme?: TwitterTheme
  omit_script?: boolean
  // iframe
  width?: string
  height?: string
  is_mobile?: boolean
}

export interface Route {
  endpoint: Endpoint
  query?: Record<string, string | undefined>
}

export type Format = 'oembed' | 'opengraph'

export interface FetchMeta {
  ok?: boolean
  status?: number
  message?: string
  type?: FetchType
}

export type ApiResponseData = object

export interface ApiResponseMeta {
  url: string
  format: Format
  message?: string
  instance: string
  fetch: FetchMeta
}

export interface ApiResponse {
  data?: ApiResponseData | undefined
  meta?: ApiResponseMeta | undefined
}
