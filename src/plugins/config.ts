const schema = {
  type: 'object',
  required: [
    'NODE_ENV',
    'LOG_LEVEL',
    'API_PORT',
    'API_HOST',
    'API_KEY_ENABLED',
    'API_DOMAINS',
  ],
  properties: {
    NODE_ENV: {
      type: 'string',
      default: 'development',
    },
    LOG_LEVEL: {
      type: 'string',
      default: 'info',
    },
    API_PORT: {
      type: 'number',
      default: 3000,
    },
    API_HOST: {
      type: 'string',
      default: 'localhost',
    },
    API_KEY: {
      type: 'string',
      default: null,
    },
    API_KEY_ENABLED: {
      type: 'boolean',
      default: false,
    },
    API_DOMAINS: {
      type: 'string',
      default: 'localhost',
    },
  }
}

export const options = {
  confKey: 'config',
  schema,
  data: process.env,
  dotenv: true
}

type NodeEnv = 'development' | 'test' | 'production'
type LogLevel = 'debug' | 'info'

declare module 'fastify' {
  interface FastifyInstance {
    config: {
      NODE_ENV: NodeEnv
      LOG_LEVEL: LogLevel
      API_PORT: number
      API_HOST: string
      API_KEY: string
      API_KEY_ENABLED: boolean
      API_DOMAINS: string
    }
  }
}
