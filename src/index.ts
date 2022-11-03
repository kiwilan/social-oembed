import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import Fastify from 'fastify'
import fastifyEnv from '@fastify/env'
import { fastifyAutoload } from '@fastify/autoload'
import cors from '@fastify/cors'
import DotEnv from './utils/DotEnv'
import config from './config'
import router from './router'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const fastify = Fastify({
  logger: false,
  ignoreTrailingSlash: true
})

const start = async () => {
  try {
    // https://github.com/fastify/fastify-autoload
    // await fastify.register(fastifyAutoload, {
    //   dir: join(__dirname, 'plugins'),
    //   forceESM: true
    // })
    // await fastify.register(fastifyAutoload, {
    //   dir: join(__dirname, 'routes'),
    //   // forceESM: true
    // })
    await fastify.register(fastifyEnv, config)
    await fastify.register(router.root)
    await fastify.register(router.docs)
    await fastify.register(router.api)
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

