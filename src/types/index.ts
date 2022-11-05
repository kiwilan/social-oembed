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

export interface RouterItem {
  [key: string]: (req: Request) => Response
}

// export interface RouteResponse {
//   content?: ResponseContent
//   status?: number
//   redirect?: Endpoint
// }

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
