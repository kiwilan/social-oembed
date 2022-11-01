import type { FastifyInstance, RouteShorthandOptions } from 'fastify'
import { Type } from '@sinclair/typebox'

const root = async (fastify: FastifyInstance) => {
  const opts: RouteShorthandOptions = {
    schema: {
      response: {
        200: Type.Object({
          hello: Type.String(),
          data: Type.Object({})
        }),
      }
    }
  }

  fastify.get('/', opts, async () => {
    return {
      hello: 'world',
      data: {}
    }
  })
}

export default root