import type { ApiQueryFormat, FetchMeta } from './route'

export * from './api'
export * from './dotenv'
export * from './html'
export * from './http'
export * from './oembed'
export * from './route'
export * from './social'

export interface Instance {
  name: string
  version?: string
  apiKeyEnabled?: boolean
  instance?: string
  options?: {
    query?: {
      [key: string]: string
    }
  }
  examples?: {
    opengraph?: {
      github?: string
    }
    oembed?: {
      youtube?: string
    }
  }
}

export interface RouterItem {
  [key: string]: (req: Request) => Response
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

export interface FormatResponse {
  response?: {
    [key: string]: any
    render?: string
  }
  fetchMeta?: FetchMeta
  format?: ApiQueryFormat
}
