import { LogLevel, NodeEnv } from './dotenv'
import type { FetchType } from './http'

export interface MetaValue {
  property: string
  content: string
}

export interface MetaValues {
  title?: string
  description?: string
  image?: string
  siteUrl?: string
  type?: string
  siteName?: string
  locale?: string
  themeColor?: string
}

export interface Meta {
  title: MetaNode[]
  description: MetaNode[]
  image: MetaNode[]
  siteUrl: MetaNode[]
  type: MetaNode[]
  siteName: MetaNode[]
  locale: MetaNode[]
  themeColor: MetaNode[]
}

export interface MetaNode {
  query: string
  type: 'attr' | 'text'
  value?: string
}

export interface FetchMeta {
  ok?: boolean
  status?: number
  message?: string
  type?: FetchType
}

export interface Instance {
  name: string
  version?: string
  apiKeyEnable?: boolean
  instance?: string
  options?: {
    query?: {
      [key: string]: string
    }
  }
  examples?: {
    [key: string]: string
  }
}

export type Format = 'oembed' | 'opengraph'

export interface ResponseMeta {
  url: string
  format: Format
  docs: string
  fetch: FetchMeta
}

export interface RouterItem {
  [key: string]: (req: Request) => Response
}

export type Endpoint = '/' | '/docs' | '/api'
export type RouteQueryKey = 'url' | 'format' | 'api_key' | 'dark'
export type RouteQuery = Record<RouteQueryKey, string | undefined> | undefined
export interface Route {
  endpoint: Endpoint
  query?: RouteQuery
}

interface ResponseContent {
  data: object
  meta?: ResponseMeta
}

export interface RouteResponse {
  content?: ResponseContent
  status?: number
  redirect?: Endpoint
}

export interface DataResponse {
  ok: boolean
  message?: string
  error?: string
  response?: OpenGraphResponse
}

export interface OpenGraphResponse {
  title?: string
  description?: string
  image?: string
  siteUrl?: string
  type?: string
  siteName?: string
  locale?: string
  themeColor?: string
  dark?: boolean
}

export interface Renderer {
  render?: any
}
