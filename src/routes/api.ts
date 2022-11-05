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

      // const rejectApiKey = API.checkApiKey(api)
      // if (rejectApiKey)
      //   return rejectApiKey.content

      // const rejectUrl = API.checkUrl(api)
      // if (rejectUrl)
      //   return rejectUrl.content

      // if (api.url && api.format === 'opengraph') {
      //   const og = await OpenGraphService.make(api)
      //   if (response.content) {
      //     response.content.data = og.getOpenGraph()
      //     response.content.meta.fetch = og.getFetchMeta()
      //   }
      // }

      // if (api.url && api.format === 'oembed') {
      //   if (response.content) {
      //     response.content.meta.fetch.message = 'oEmbed format is not implemented yet'
      //     response.content.meta.fetch.ok = false
      //   }
      // }

      return response
    },
  })
}

export default docs
