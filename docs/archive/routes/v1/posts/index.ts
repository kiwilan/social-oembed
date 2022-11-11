import type { FastifyInstance } from 'fastify'
import {
  deletePostsSchema,
  getOnePostSchema,
  getPostsSchema,
  postNotFoundSchema,
  postPostsSchema,
  postSchema,
  putPostsSchema,
} from './schema'
import {
  deletePostsHandler,
  getOnePostHandler,
  getPostsHandler,
  postPostsHandler,
  putPostsHandler,
} from './handler'

export default async (fastify: FastifyInstance) => {
  fastify.addSchema(postSchema)
  fastify.addSchema(postNotFoundSchema)
  fastify.get('/', { schema: getPostsSchema }, getPostsHandler)
  fastify.get('/:postid', { schema: getOnePostSchema }, getOnePostHandler)
  fastify.post('/', { schema: postPostsSchema }, postPostsHandler)
  fastify.put('/:postid', { schema: putPostsSchema }, putPostsHandler)
  fastify.delete('/:postid', { schema: deletePostsSchema }, deletePostsHandler)
}
