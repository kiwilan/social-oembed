import type { FastifyRequest } from 'fastify'
import type { DotEnvConfig, LogLevel, NodeEnv } from '~/types/dotenv'

export default class DotEnv {
  public config: DotEnvConfig

  protected constructor(config: DotEnvConfig) {
    this.config = config
  }

  public static make(): DotEnv {
    const port = parseInt(process.env.API_PORT ?? '3000') || 3000
    const host = process.env.API_HOST || 'localhost'
    const https = process.env.API_HTTPS === 'true' || false
    let key = process.env.API_KEY || undefined

    const dotenv = new DotEnv({
      NODE_ENV: process.env.NODE_ENV as NodeEnv || 'development',
      LOG_LEVEL: process.env.LOG_LEVEL as LogLevel || 'info',
      API_PORT: port,
      API_HOST: host,
      API_HTTPS: https,
      API_URL: `${https ? 'https' : 'http'}://${host}:${port}`,
      API_KEY: key,
      API_KEY_ENABLED: typeof key === 'string',
      API_DOMAINS: [],
      API_DOMAINS_PARSED: [],
    })

    dotenv.config.API_DOMAINS = dotenv.domainsDotenv()
    dotenv.config.API_DOMAINS_PARSED = dotenv.domainsParsed()

    return dotenv
  }

  public static checkApiKey(req: FastifyRequest) {
    const config = DotEnv.make().config
    const query = req.query as any
    const key = query?.api_key
    if (config.API_KEY_ENABLED && config.API_KEY !== key) {
      // TODO redirect
      // const meta = api.meta

      // if (!meta.fetch)
      //   meta.fetch = {}

      // meta.fetch.ok = false
      // meta.fetch.status = 401
      // meta.fetch.message = 'Invalid API key with query param `api_key`'

      // const response: RouteResponse = {
      //   content: {
      //     data: {},
      //     meta,
      //   },
      //   status: 401,
      // }

      // return response
    }
  }

  public static checkUrl() {
    // TODO check url
    // if (!api.url) {
    //   const meta = api.meta

    //   if (!meta.fetch)
    //     meta.fetch = {}

    //   meta.fetch.ok = false
    //   meta.fetch.status = 401
    //   meta.fetch.message = 'Invalid query with query param `url`'

    //   const response: RouteResponse = {
    //     content: {
    //       data: {},
    //       meta,
    //     },
    //     status: 401,
    //   }

    //   return response
    // }
  }

  private domainsDotenv(): string[] {
    let domains: string[] = []
    if (process.env.API_DOMAINS)
      domains = process.env.API_DOMAINS?.split(',')

    return domains
  }

  private domainsParsed(): string[] {
    const domains: string[] = []
    this.domainsDotenv().forEach(domain => {
      domains.push(`http://${domain}`)
      domains.push(`https://${domain}`)
    })

    return domains
  }
}
