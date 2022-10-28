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

export interface DotEnvConfig {
  PORT: string | undefined
  BASE_URL: string | undefined
  API_KEY: string | undefined
  API_KEY_ENABLE: string | undefined
}

export interface Service {
  name: string
  version: string
  apiKeyEnable: boolean
  instance: string
  options: {
    query: {
      [key: string]: string
    }
  }
  examples: {
    [key: string]: string
  }
}

export type Format = 'oembed' | 'opengraph'

export interface ResponseMeta {
  url: string
  format: Format
  docs: string
}

export interface RouterItem {
  [key: string]: (req: Request) => Response
}

export type Endpoint = '/' | '/docs' | '/api'
export type RouteQueryKey = 'url' | 'format' | 'api_key'
export type RouteQuery = Record<RouteQueryKey, string | undefined> | undefined
export interface Route {
  endpoint: Endpoint
  query?: RouteQuery
}

export interface RouteResponse {
  response: object
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
}