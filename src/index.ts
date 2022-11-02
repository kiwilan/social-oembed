import { join } from 'path'
import Fastify from 'fastify'
import fastifyEnv from '@fastify/env'
import { fastifyAutoload } from '@fastify/autoload'
import cors from '@fastify/cors'
import DotEnv from './utils/DotEnv'
import { options } from '~/plugins/config'
import Cors from '~/utils/Cors'

const fastify = Fastify({
  ignoreTrailingSlash: true
})

const start = async () => {
  try {
    await fastify.register(fastifyAutoload, {
      dir: join(__dirname, 'plugins')
    })
    await fastify.register(fastifyAutoload, {
      dir: join(__dirname, 'routes')
    })
    await fastify.register(fastifyEnv, options)
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
