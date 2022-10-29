import { route, routeBuilder } from '@/router'
import type { DotEnvConfig, Format, ResponseMeta, Route, RouteResponse, Service } from '@/types'
import Cors from '@/Utils/Cors'
import packageJson from '~/package.json'

export default class ApiService {
  private route?: Route
  private dotenv?: DotEnvConfig
  public url?: string
  public format: Format = 'opengraph'
  public apiKey?: string
  public apiKeyEnable = false
  public service?: Service
  public meta: ResponseMeta

  protected constructor() {
  }

  public static make(req: Request): ApiService {
    const api = new ApiService()

    api.dotenv = api.setDotenvConfig()

    const route = routeBuilder(req)
    api.route = route

    api.url = api.route.query?.url || undefined
    api.format = api.route.query?.format as Format || 'opengraph'
    api.apiKey = api.route.query?.api_key || undefined
    api.apiKeyEnable = api.dotenv.API_KEY_ENABLED

    api.service = api.setService()
    api.meta = api.setMeta()

    return api
  }

  public static checkApiKey(api: ApiService): RouteResponse | void {
    if (api.apiKeyEnable && api.apiKey !== process.env.API_KEY) {
      const meta = api.meta

      if (!meta.fetch)
        meta.fetch = {}

      meta.fetch.ok = false
      meta.fetch.status = 401
      meta.fetch.message = 'Invalid API key with query param `api_key`'

      const response: RouteResponse = {
        content: {
          data: {},
          meta,
        },
        status: 401,
      }

      return response
    }
  }

  public static checkUrl(api: ApiService): RouteResponse | void {
    if (!api.url) {
      const meta = api.meta

      if (!meta.fetch)
        meta.fetch = {}

      meta.fetch.ok = false
      meta.fetch.status = 401
      meta.fetch.message = 'Invalid query with query param `url`'

      const response: RouteResponse = {
        content: {
          data: {},
          meta,
        },
        status: 401,
      }

      return response
    }
  }

  private setDotenvConfig(): DotEnvConfig {
    let enabled = false
    if (typeof process.env.API_KEY_ENABLED === 'boolean')
      enabled = process.env.API_KEY_ENABLED

    const domains = Cors.dotEnvCors()

    return {
      PORT: process.env.PORT || '3000',
      BASE_URL: process.env.BASE_URL || 'http://localhost:3000',
      API_KEY: process.env.API_KEY || undefined,
      API_KEY_ENABLED: enabled || false,
      API_DOMAINS: domains || undefined,
    }
  }

  private setService(): Service {
    return {
      name: packageJson.name,
      version: packageJson.version,
      apiKeyEnable: this.apiKeyEnable,
      instance: this.dotenv?.BASE_URL ?? 'http://localhost:3000',
      options: {
        query: {
          api_key: this.apiKeyEnable ? 'required, type string' : 'disable on this instance',
          url: 'required, type string',
          format: 'optional, type `oembed` | `opengraph`, default `oembed`',
        },
      },
      examples: {
        // TODO: add examples, add query params with `route()` helper
        opengraph: route({
          endpoint: '/api',
          query: { url: 'https://github.com', format: 'opengraph', api_key: this.apiKey },
        }),
      },
    }
  }

  private setMeta(): ResponseMeta {
    return {
      url: this.url ? this.url : 'query param `url` is required',
      format: this.format,
      docs: route('/docs'),
      fetch: {
        message: 'Fetching data',
        ok: false,
        status: 500,
        type: 'unknown',
      },
    }
  }
}
