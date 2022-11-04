import fp from 'fastify-plugin'
import type { FastifyDynamicSwaggerOptions } from '@fastify/swagger'
import swagger from '@fastify/swagger'

export default fp<FastifyDynamicSwaggerOptions>(async (fastify) => {
  fastify.register(swagger, {
    openapi: {
      info: {
        title: 'Fastify REST API',
        description: 'Use JSON Schema & TypeScript for better DX',
        version: '0.1.0',
      },
      servers: [
        {
          url: 'http://localhost',
        },
      ],
    },
    hideUntagged: true,
    // exposeRoute: true
  })
})
