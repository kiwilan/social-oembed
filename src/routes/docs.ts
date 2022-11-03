import type { FastifyInstance, FastifySchema } from 'fastify'
import { Type } from '@sinclair/typebox'
import type { Instance, ResponseContent } from '~/types'
import InstanceConfig from '~/utils/InstanceConfig'

const docs = async (fastify: FastifyInstance) => {
  const schema: FastifySchema = {
    response: {
      200: {
        data: Type.Unsafe<Instance>(),
      }
    }
  }

  const instance = InstanceConfig.make()

  fastify.route({
    method: 'GET',
    url: '/docs', // TODO Route helper method with Endpoint type
    schema,
    async handler() {
      return {
        data: instance.config,
      } as ResponseContent
    },
  })
}

export default docs
