import type { FastifyInstance, FastifySchema } from 'fastify'
import { Type } from '@sinclair/typebox'
import type { Instance } from '~/types'
import InstanceConfig from '~/utils/InstanceConfig'
import type { Endpoint } from '~/types/route'

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
    url: '/docs' as Endpoint,
    schema,
    async handler() {
      return {
        data: instance.config,
      }
    },
  })
}

export default docs
