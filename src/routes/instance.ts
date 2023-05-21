// import type { FastifyInstance, FastifySchema } from 'fastify'
// import { Type } from '@sinclair/typebox'
// import type { Instance } from '~/types'
// import InstanceConfig from '~/utils/InstanceConfig'
// import { getRoute } from '~/utils/Route'

import { Router } from '@kiwilan/fastify-utils'
import { metaRoutes } from '~/services'

// async function instanceRoute(fastify: FastifyInstance) {
//   const schema: FastifySchema = {
//     response: {
//       200: {
//         data: Type.Unsafe<Instance>(),
//       }
//     }
//   }

//   const instance = InstanceConfig.make()

//   fastify.route({
//     method: 'GET',
//     url: getRoute('/instance'),
//     schema,
//     async handler() {
//       return {
//         data: instance.config,
//       }
//     },
//   })
// }

// export default instanceRoute

export default Router.newRoute({
  endpoint: '/instance',
  action: async () => {
    return {
      meta: metaRoutes()
    }
  }
})
