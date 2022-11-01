// import { IncomingMessage, Server, ServerResponse } from 'http'
import type { FastifyInstance } from 'fastify'
import Fastify from 'fastify'
import fastifyEnv from '@fastify/env'
import { options } from './plugins/config.js'
import { createRouter } from './router/index.js'

let server: FastifyInstance = Fastify({})

const start = async () => {
  try {
    server.register(fastifyEnv, options)
    server = createRouter(server)
    await server.after()

    const port = Number(server.config.API_PORT)
    await server.listen({ port })

    const address = server.config.API_HOST
    console.warn(`Server listening on http://${address}:${port}`)
  }
  catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}
start()

