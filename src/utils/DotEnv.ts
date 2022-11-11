import fs from 'fs'
import type { IDotEnvFormat, IDotEnvRaw, LogLevel, NodeEnv } from '~/types/dotenv'

export default class Dotenv {
  protected constructor(
    public raw: IDotEnvRaw,
    public config: IDotEnvFormat,
    public origin?: string | string[]
  ) {
  }

  public static make(): Dotenv {
    const port = parseInt(process.env.API_PORT ?? '3000') || 3000
    const host = process.env.API_HOST || 'localhost'
    const https = process.env.API_HTTPS === 'true' || false
    let key = process.env.API_KEY || undefined
    if (key === 'false')
      key = undefined

    const nodeEnv = process.env.NODE_ENV as NodeEnv || 'development'
    let apiUrl = `${https ? 'https' : 'http'}://${host}`
    if (nodeEnv === 'development')
      apiUrl = `${apiUrl}:${port}`

    const raw: IDotEnvRaw = {
      NODE_ENV: process.env.NODE_ENV,
      LOG_LEVEL: process.env.LOG_LEVEL,
      API_PORT: process.env.API_PORT,
      API_HOST: process.env.API_HOST,
      API_HTTPS: process.env.API_HTTPS,
      API_KEY: process.env.API_KEY,
      API_DOMAINS: process.env.API_DOMAINS,
    }

    const config: IDotEnvFormat = {
      NODE_ENV: nodeEnv,
      LOG_LEVEL: process.env.LOG_LEVEL as LogLevel || 'info',
      API_PORT: port,
      API_HOST: host,
      API_HTTPS: https,
      API_URL: apiUrl,
      API_KEY: key,
      API_KEY_ENABLED: typeof key === 'string',
      API_DOMAINS: [],
      API_DOMAINS_PARSED: [],
      API_DOMAINS_ALL: false,
    }

    const dotenv = new Dotenv(raw, config)

    dotenv.config.API_DOMAINS = dotenv.domainsDotenv()
    dotenv.config.API_DOMAINS_PARSED = dotenv.domainsParsed()
    if (dotenv.config.API_DOMAINS_PARSED.includes('*'))
      dotenv.config.API_DOMAINS_ALL = true

    dotenv.origin = dotenv.config.API_DOMAINS_ALL
      ? '*'
      : dotenv.config.API_DOMAINS_PARSED

    return dotenv
  }

  public static dotEnvRaw(path: string): IDotEnvRaw {
    const dotenvRaw = fs.readFileSync(path).toString().split('\n')
    const dotenvConfig: IDotEnvRaw = {}
    dotenvRaw.forEach(el => {
      if (el) {
        const config = el.split('=')
        const key = config[0]
        let value = config[1]
        if (value.includes('#'))
          value = value.split('#')[0].trim()

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        dotenvConfig[key] = value
      }
    })

    return dotenvConfig
  }

  private domainsDotenv(): string[] {
    let domains: string[] = []
    if (process.env.API_DOMAINS)
      domains = process.env.API_DOMAINS?.split(',')

    return domains
  }

  private domainsParsed(): string[] {
    const dotenvDomains = this.domainsDotenv()
    const domains: string[] = []
    let allow = false

    if (dotenvDomains && dotenvDomains[0] === '*')
      allow = true

    if (allow) {
      domains.push('*')
    }
    else {
      dotenvDomains.forEach(domain => {
        if (domain.startsWith('*')) {
          const domainParsed = domain.replace('*.', '')
          domains.push(`http://${domainParsed}`)
          domains.push(`https://${domainParsed}`)
        }

        domains.push(`http://${domain}`)
        domains.push(`https://${domain}`)
      })
    }

    return domains
  }
}
