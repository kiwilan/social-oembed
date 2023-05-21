import { Router } from '@kiwilan/fastify-utils'

function metaRoutes() {
  return {
    home: Router.route('/api'),
    posts: Router.route('/instance'),
  }
}

export {
  metaRoutes,
}
