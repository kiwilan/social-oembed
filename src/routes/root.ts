import type { FastifyPluginAsync } from 'fastify'
import type { Endpoint } from '~/types/route'

const root: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.get('/', async (req, res) => {
    const api = '/api' as Endpoint
    res.redirect(301, api) // TODO route()
    // return { root: true }
  })
}

export default root
