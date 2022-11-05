import { join } from 'path'
import { fileURLToPath } from 'url'
import Fastify from 'fastify'
import { fastifyAutoload } from '@fastify/autoload'
import fastifyEnv from '@fastify/env'
import cors from '@fastify/cors'
import DotEnv from '~/utils/DotEnv'
import config from '~/config'

// const __filename = url.fileURLToPath(import.meta.url)
const __dirname = fileURLToPath(new URL('.', import.meta.url))
const dotenvConfig = DotEnv.dotEnvRaw(join(__dirname, '../.env'))

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

const fastify = Fastify({
  logger
})

const start = async () => {
  try {
    await fastify.register(fastifyEnv, config)
    await fastify.register(fastifyAutoload, {
      dir: join(__dirname, 'plugins'),
    })

    await fastify.register(fastifyAutoload, {
      dir: join(__dirname, 'routes'),
    })

    await fastify.after()

    const dotenv = DotEnv.make().config
    await fastify.register(cors, {
      origin: dotenv.API_DOMAINS_PARSED,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Accept', 'Origin', 'Authorization'],
      credentials: true,
      maxAge: 86400
    })

    const port = dotenv.API_PORT
    await fastify.listen({ port })

    console.warn(`Server listening on ${dotenv.API_URL}`)
  }
  catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()
