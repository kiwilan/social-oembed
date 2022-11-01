import { join } from 'path'
import fastify from 'fastify'
import { fastifyEnv } from '@fastify/env'
import { fastifyAutoload } from '@fastify/autoload'
import { options } from '~/plugins/config'

const server = fastify()

const start = async () => {
  try {
    await server.register(fastifyAutoload, {
      dir: join(__dirname, 'plugins')
    })
    await server.register(fastifyAutoload, {
      dir: join(__dirname, 'routes')
    })
    await server.register(fastifyEnv, options)
    await server.after()

    const port = Number(server.config.API_PORT)
    await server.listen({ port })

    const address = (server.config.API_HOST).toString()

    console.warn(`Server listening on http://${address}:${port}`)
  }
  catch (error) {
    server.log.error(error)
    console.error(error)
    process.exit(1)
  }
}
start()

// server.listen({ port: 8080 }, (err, address) => {
//   if (err) {
//     console.error(err)
//     process.exit(1)
//   }
//   console.warn(`Server listening at ${address}`)
// })
