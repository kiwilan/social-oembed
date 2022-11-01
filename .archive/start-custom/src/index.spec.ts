import tap from 'tap'
import server from './index.js'

tap.only('Server', (t) => {
  t.plan(1)
  t.test('Should return server instance', async (t) => {
    t.match(typeof server, 'object')
    await server.close()
  })
})
