import type { FastifyInstance, FastifySchema } from 'fastify'
import { Type } from '@sinclair/typebox'
import type { ResponseContent, ResponseMeta } from '~/types'
import ApiService from '~/services/ApiService'

const docs = async (fastify: FastifyInstance) => {
  const schema: FastifySchema = {
    response: {
      200: {
        data: Type.Object({}),
        meta: Type.Unsafe<ResponseMeta>()
      }
    }
  }

  fastify.route({
    method: 'GET',
    url: '/docs',
    schema,
    async handler(req) {
      const api = ApiService.make(req)

      return {
        data: {},
        meta: api.meta
      } as ResponseContent
    },
  })
}

export default docs
