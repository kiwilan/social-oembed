import type { FastifyRequest } from 'fastify'
import { route, routeBuilder } from '~/utils/Route'
import packageJson from '@/package.json'
import type { Format, Instance, ResponseMeta, Route } from '~/types'
import type { DotEnvConfig, } from '~/types/dotenv'
import DotEnv from '~/utils/DotEnv'

export default class ApiService {
  private route?: Route
  private dotenv: DotEnvConfig
  public url?: string
  public format: Format = 'opengraph'
  public apiKey?: string
  public apiKeyEnable = false
  public instance?: Instance
  public meta: ResponseMeta

  protected constructor(meta: ResponseMeta, dotenv: DotEnvConfig) {
    this.meta = meta
    this.dotenv = dotenv
  }

  public static make(req: FastifyRequest): ApiService {
    const dotenv = DotEnv.make()
    const api = new ApiService({
      docs: 'init',
      fetch: {
        message: 'init',
        ok: false,
        status: 500,
        type: 'unknown',
      },
      format: 'oembed',
      url: 'init',
    }, dotenv.config)

    const route = routeBuilder(req)
    api.route = route

    api.url = api.route.query?.url || undefined
    api.format = api.route.query?.format as Format || 'opengraph'
    api.apiKey = api.route.query?.api_key || undefined
    api.apiKeyEnable = api.dotenv.API_KEY_ENABLED

    api.instance = api.setInstance()
    api.meta = api.setMeta()

    return api
  }

  private setInstance(): Instance {
    return {
      name: packageJson.name,
      version: packageJson.version,
      apiKeyEnable: this.apiKeyEnable,
      instance: this.dotenv?.API_URL,
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
      docs: '/docs', // TODO route()
      fetch: {
        message: 'Fetching data',
        ok: false,
        status: 500,
        type: 'unknown',
      },
    }
  }
}
