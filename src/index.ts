import { join } from 'path'
import Fastify from 'fastify'
import fastifyEnv from '@fastify/env'
import { fastifyAutoload } from '@fastify/autoload'
import { options } from '~/plugins/config'

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
