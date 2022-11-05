export type NodeEnv = 'development' | 'test' | 'production'
export type LogLevel = 'debug' | 'error' | 'fatal' | 'info' | 'trace' | 'warn' | 'silent'

export interface IDotEnvRaw {
  NODE_ENV?: string
  LOG_LEVEL?: string
  API_PORT?: string
  API_HOST?: string
  API_HTTPS?: string
  API_KEY?: string
  API_DOMAINS?: string
}

export interface IDotEnvFormat {
  NODE_ENV: NodeEnv
  LOG_LEVEL: LogLevel
  API_PORT: number
  API_HOST: string
  API_HTTPS: boolean
  API_URL: string
  API_KEY: string | undefined
  API_KEY_ENABLED: boolean
  API_DOMAINS: string[]
  API_DOMAINS_PARSED: string[]
}
