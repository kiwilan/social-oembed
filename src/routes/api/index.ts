import { Router } from '@kiwilan/fastify-utils'
import ApiService from '~/services/ApiService'
import InstanceConfig from '~/utils/InstanceConfig'

export default Router.newRoute({
  endpoint: '/api',
  action: async (req) => {
    const api = ApiService.make(req)
    const instance = InstanceConfig.make()

    let data = {}
    const query = req.query as Record<string, string>

    if (query.url)
      data = await api.get()

    return {
      ...data,
      docs: instance.config,
    }
  }
})
