import home from './home'
import docs from './docs'
import api from './api'
import type { Router } from '@/types'

export const route = (route: Router) => `${process.env.BASE_URL}${route}`

export const formatRoute = (req: Request) => {
  const url = req.url.replace(process.env.BASE_URL, '').replace(/\/$/, '')

  const splitted = url.split('?')
  const params = splitted.length > 1 ? splitted[1].split('&') : []
  let paramsList = {}
  params.forEach((param) => {
    const [key, value] = param.split('=')
    paramsList = { ...paramsList, [key]: value }
  })

  const route = splitted[0] ?? '/'

  return {
    route,
    params: paramsList,
  }
}

export const router = {
  home: () => home(),
  api: (req: Request) => api(req),
  docs: (req: Request) => docs(req),
}
