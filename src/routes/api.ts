import type { FastifyInstance, FastifySchema } from 'fastify'
import { Type } from '@sinclair/typebox'
import type { ApiResponseMeta } from '~/types/route'
import ApiService from '~/services/ApiService'
import { getRoute } from '~/utils/Route'

const apiRoute = async (fastify: FastifyInstance) => {
  const schema: FastifySchema = {
    response: {
      200: {
        data: Type.Any(), // TODO type data
        meta: Type.Unsafe<ApiResponseMeta>()
      }
    }
  }

  fastify.route({
    method: 'GET',
    url: getRoute('/api'),
    schema,
    async handler(req, reply) {
      reply.header('content-type', 'application/json')
      reply.header('Access-Control-Allow-Origin', '*')

      console.log(req.headers)
      const api = ApiService.make(req)
      const response = api.get()

      return response
    },
  })
}

export default apiRoute
