import type { FastifyRequest } from 'fastify'
import { route, routeBuilder } from '../utils/Route'
import DotEnv from '../utils/DotEnv'
import type { Format, ResponseMeta, Route } from '~/types'
import type { DotEnvConfig, } from '~/types/dotenv'

export default class ApiService {
  private route?: Route
  private dotenv: DotEnvConfig
  public url?: string
  public format: Format = 'opengraph'
  public apiKey?: string
  public apiKeyEnable = false
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

    api.meta = api.setMeta()

    return api
  }

  private setMeta(): ResponseMeta {
    return {
      url: this.url ? this.url : 'query param `url` is required',
      format: this.format,
      docs: route('/docs'), // TODO route()
      fetch: {
        message: 'Fetching data',
        ok: false,
        status: 500,
        type: 'unknown',
      },
    }
  }
}
