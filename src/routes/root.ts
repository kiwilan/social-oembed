import type { FastifyPluginAsync } from 'fastify'
import { getRoute } from '~/utils/Route'

const root: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.get('/', async (req, res) => {
    res.redirect(301, getRoute('/api'))
  })
}

export default root
