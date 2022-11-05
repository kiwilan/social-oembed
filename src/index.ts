import Fastify from 'fastify'
import { logger, start } from '~/config'

const fastify = Fastify({
  logger
})

await start(fastify)
