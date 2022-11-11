import { join } from 'path'
import { fileURLToPath } from 'url'
import { fastifyAutoload } from '@fastify/autoload'
import fastifyEnv from '@fastify/env'
import cors from '@fastify/cors'
import middie from '@fastify/middie'
import type { FastifyInstance } from 'fastify'
import Middleware from './utils/Middleware'
import type { IDotEnvRaw } from '~/types/dotenv'
import Dotenv from '~/utils/DotEnv'

const schema = {
  type: 'object',
  required: [
    'NODE_ENV',
    'LOG_LEVEL',
    'API_PORT',
    'API_HOST',
    'API_HTTPS',
    'API_KEY',
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
    API_HTTPS: {
      type: 'boolean',
      default: false,
    },
    API_KEY: {
      type: 'string',
      default: null,
    },
    API_DOMAINS: {
      type: 'string',
      default: 'localhost:3000',
    },
  }
}

const options = {
  confKey: 'config',
  schema,
  data: process.env,
  dotenv: true
}

// const __filename = url.fileURLToPath(import.meta.url)
const __dirname = fileURLToPath(new URL('.', import.meta.url))
const dotenvConfig = Dotenv.dotEnvRaw(join(__dirname, '../.env'))

const logger = process.env.NODE_ENV_LOG === 'production' ? { level: dotenvConfig.LOG_LEVEL } : {
  level: dotenvConfig.LOG_LEVEL,
  transport: {
    target: 'pino-pretty',
    options: {
      destination: 1,
      colorize: true,
      translateTime: 'HH:MM:ss.l',
      ignore: 'pid,hostname'
    },
  }
}
const start = async (fastify: FastifyInstance) => {
  try {
    await fastify.register(fastifyEnv, options)
    await fastify.register(fastifyAutoload, {
      dir: join(__dirname, 'plugins'),
    })

    await fastify.register(fastifyAutoload, {
      dir: join(__dirname, 'routes'),
    })

    await fastify.register(middie, {
      hook: 'onRequest'
    })

    fastify.addHook('onRequest', async (request, reply) => {
      const instance = Middleware.make(request, reply)

      if (instance.abort) {
        reply.type('application/json')
          .code(instance.code)
          .send(JSON.stringify({
            status: instance.code,
            message: instance.message
          }))
      }
    })

    await fastify.after()

    const dotenv = Dotenv.make()

    await fastify.register(cors, {
      // origin: dotenv.origin,
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Accept', 'Origin', 'Authorization', 'X-Requested-With', 'Access-Control-Allow-Origin'],
      credentials: true,
      maxAge: 86400
    })

    const port = dotenv.config.API_PORT
    await fastify.listen({ port })

    console.warn(`Server listening on ${dotenv.config.API_URL}`)
  }
  catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

declare module 'fastify' {
  interface FastifyInstance {
    config: IDotEnvRaw
  }
}

export {
  logger,
  start
}
