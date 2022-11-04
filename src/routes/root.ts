import type { FastifyPluginAsync } from 'fastify'

const root: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.get('/', async (req, res) => {
    res.redirect(301, '/api') // TODO route()
    // return { root: true }
  })
}

export default root
