import type { FastifyPluginAsync } from 'fastify'
import { getRoute, route } from '~/utils/Route'

const root: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.route({
    method: 'GET',
    url: getRoute('/'),
    async handler() {
      return {
        meta: {
          routes: {
            api: route('/api'),
            docs: route('/docs'),
          }
        }
      }
    },
  })
}

export default root
