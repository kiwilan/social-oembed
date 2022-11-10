import type { FastifyInstance, FastifySchema } from 'fastify'
import { Type } from '@sinclair/typebox'
import type { ApiResponseMeta } from '~/types/route'
import ApiService from '~/services/ApiService'

const docs = async (fastify: FastifyInstance) => {
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
    url: '/api',
    schema,
    async handler(req) {
      const api = ApiService.make(req)
      const response = api.get()

      return response
    },
  })
}

export default docs
