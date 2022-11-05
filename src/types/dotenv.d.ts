export type NodeEnv = 'development' | 'test' | 'production'
export type LogLevel = 'debug' | 'error' | 'fatal'  | 'info' | 'trace' | 'warn' | 'silent'

export interface DotEnvRawConfig {
  NODE_ENV?: NodeEnv
  LOG_LEVEL?: LogLevel
  API_PORT?: number
  API_HOST?: string
  API_HTTPS?: boolean
  API_KEY?: string
  API_DOMAINS?: string
}

export interface DotEnvConfig {
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