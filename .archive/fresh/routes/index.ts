import { FastifyInstance, RouteShorthandOptions } from "fastify"

const opts: RouteShorthandOptions = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          pong: {
            type: 'string'
          }
        }
      }
    }
  }
}

export const createRouter = (server: FastifyInstance): FastifyInstance => {
  server.get('/', opts, async () => {
    return { pong: 'it worked!' }
  })

  return server
}
