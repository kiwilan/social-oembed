// import { IncomingMessage, Server, ServerResponse } from 'http'
// import type { FastifyInstance } from 'fastify'
import Fastify from 'fastify'
// import { fastifyEnv } from '@fastify/env'
// import { options } from '@/plugins/config'
// import { createRouter } from '@/router'

const server = Fastify({})

const start = async () => {
  try {
    // server.register(fastifyEnv, options)
    // server = createRouter(server)
    server.get('/', {}, async () => {
      return { pong: 'it worked!' }
    })
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

// import Fastify from 'fastify'
// import FastifyVite from '@fastify/vite'

// const server = Fastify()

// await server.register(FastifyVite, {
//   dev: process.argv.includes('--dev'),
//   root: import.meta.url,
//   createRenderFunction() {
//     // Covered further below in this README
//   }
// })

// await server.vite.ready()
// await server.listen({ port: 3000 })
