import type { FetchType } from './http'

export type Endpoint = '/' | '/docs' | '/api'

export type ApiQueryFormat = 'oembed' | 'opengraph'
export type ApiRouteQueryKey = 'url' | 'format' | 'api_key' | 'dark' | 'align' | 'conversation' | 'hide_media' | 'lang' | 'theme' | 'omit_script'
export type ApiRouteQuery = Record<ApiRouteQueryKey, string | undefined> | undefined

export type TwitterAlign = 'left' | 'center' | 'right'
export type TwitterConversation = 'none' | 'all'
export type TwitterTheme = 'light' | 'dark'

export interface ApiRouteQueryFormat {
  url?: string
  format: ApiQueryFormat
  api_key?: string | boolean
  dark?: boolean
  // twitter api
  align?: TwitterAlign
  conversation?: TwitterConversation
  hide_media?: boolean
  lang?: string
  theme?: TwitterTheme
  omit_script?: boolean
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
  docs: string
  fetch: FetchMeta
}

export interface ApiResponse {
  data?: ApiResponseData | undefined
  meta?: ApiResponseMeta | undefined
}
