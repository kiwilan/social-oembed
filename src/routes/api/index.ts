// import type { FastifyInstance, FastifySchema } from 'fastify'
// import { Type } from '@sinclair/typebox'
// import type { ApiResponseMeta } from '~/types/route'
// import ApiService from '~/services/ApiService'
// import { getRoute } from '~/utils/Route'

import { Router } from '@kiwilan/fastify-utils'
import { metaRoutes } from '~/services'

// async function apiRoute(fastify: FastifyInstance) {
//   const schema: FastifySchema = {
//     response: {
//       200: {
//         data: Type.Any(), // TODO type data
//         meta: Type.Unsafe<ApiResponseMeta>()
//       }
//     }
//   }

//   fastify.route({
//     method: 'GET',
//     url: getRoute('/api'),
//     schema,
//     async handler(req) {
//       const api = ApiService.make(req)
//       const response = api.get()

//       return response
//     },
//   })
// }

// export default apiRoute

export default Router.newRoute({
  endpoint: '/api',
  action: async () => {
    return {
      meta: metaRoutes()
    }
  }
})
