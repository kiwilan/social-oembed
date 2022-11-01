import { dirname, join } from 'path'
// Import plugins

export default {
  root: join(dirname(new URL(import.meta.url).pathname), 'client'),
  plugins: [
    // Register plugins
  ]
}
