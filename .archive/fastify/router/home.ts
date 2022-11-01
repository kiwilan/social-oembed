import type { RouteResponse } from '~/types'

const home = async (): Promise<RouteResponse> => {
  return {
    content: undefined,
    redirect: '/api',
    status: 302,
  }
}

export default home
