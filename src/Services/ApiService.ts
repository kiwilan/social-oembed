export default class ApiService {
  public static queryParams(req: Request): URLSearchParams {
    const queryParams = req.url.split('?')
    const query = queryParams[1] || ''
    const params = new URLSearchParams(query)

    return params
  }
}
