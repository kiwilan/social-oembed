import type { FastifyPluginAsync } from 'fastify'
import fp from 'fastify-plugin'
import sensible from '@fastify/sensible'

/**
 * This plugins adds some utilities to handle http errors
 *
 * @see https://github.com/fastify/fastify-sensible
 * @see https://www.fastify.io/docs/latest/Reference/TypeScript/#plugin
 */
const myPluginAsync: FastifyPluginAsync = async (fastify, options) => {
  fastify.register(sensible)
}

export default fp(myPluginAsync, '4.x')
