import { Router } from '@kiwilan/fastify-utils'
import { metaRoutes } from '../services'

export default Router.newRoute({
  endpoint: '/',
  action: async () => {
    return {
      meta: metaRoutes()
    }
  }
})
