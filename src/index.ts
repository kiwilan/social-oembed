import Fastify from 'fastify'
import { logger, start } from '~/config'

const fastify = Fastify({
  logger: false,
  ignoreTrailingSlash: true
})

await start(fastify)
