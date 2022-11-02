import { Type } from '@sinclair/typebox'
import type { LogLevel, NodeEnv } from '~/types/dotenv'

const schema = {
  type: 'object',
  required: [
    'NODE_ENV',
    'LOG_LEVEL',
    'API_PORT',
    'API_HOST',
    'API_HTTPS_ENABLED',
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
    API_HTTPS_ENABLED: {
      type: 'boolean',
      default: false,
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
      default: 'localhost:3000',
    },
  }
}

export const options = {
  confKey: 'config',
  schema,
  data: process.env,
  dotenv: true
}

declare module 'fastify' {
  interface FastifyInstance {
    config: {
      NODE_ENV: NodeEnv
      LOG_LEVEL: LogLevel
      API_PORT: number
      API_HOST: string
      API_HTTPS_ENABLED: boolean
      API_KEY: string
      API_KEY_ENABLED: boolean
      API_DOMAINS: string
    }
  }
}
