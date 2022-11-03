import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import type { FastifySchema } from 'fastify'
import Fastify from 'fastify'
import fastifyEnv from '@fastify/env'
import { fastifyAutoload } from '@fastify/autoload'
import cors from '@fastify/cors'
import { Type } from '@sinclair/typebox'
import DotEnv from '~/utils/DotEnv'
import config from '~/plugins/config'
import type { LogLevel, NodeEnv } from '~/types/dotenv'
import InstanceConfig from '~/utils/InstanceConfig'
import type { Instance, ResponseContent } from '~/types'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const fastify = Fastify({
  ignoreTrailingSlash: true
})

const start = async () => {
  try {
    await fastify.register(fastifyAutoload, {
      dir: join(__dirname, 'plugins'),
      forceESM: true
    })
    await fastify.register(fastifyAutoload, {
      dir: join(__dirname, 'routes'),
      forceESM: true
    })
    // const schema: FastifySchema = {
    //   response: {
    //     200: {
    //       data: Type.Unsafe<Instance>(),
    //     }
    //   }
    // }

    // const instance = InstanceConfig.make()

    // fastify.route({
    //   method: 'GET',
    //   url: '/api', // TODO Route helper method with Endpoint type
    //   schema,
    //   async handler() {
    //     return {
    //       data: instance.config,
    //     } as ResponseContent
    //   },
    // })
    await fastify.register(fastifyEnv, config)
    await fastify.after()

    await fastify.register(cors, {
      origin: DotEnv.make().config.API_DOMAINS_PARSED,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Accept', 'Origin', 'Authorization'],
      credentials: true,
      maxAge: 86400
    })

    const port = Number(fastify.config.API_PORT)
    await fastify.listen({ port })

    const address = (fastify.config.API_HOST).toString()

    // eslint-disable-next-line no-console
    console.log(`Server listening on http://${address}:${port}`)
  }
  catch (error) {
    fastify.log.error(error)
    console.error(error)
    process.exit(1)
  }
}
start()

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
