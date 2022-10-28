import type { RouteResponse } from '@/types'

const home = async (): Promise<RouteResponse> => {
  return {
    response: {
      message: 'redirect',
    },
    redirect: '/api',
    status: 302,
  }
}

export default home
