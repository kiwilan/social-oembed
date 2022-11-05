import type { FetchMeta } from '~/types/route'

export default abstract class ApiModule {
  protected constructor(
    protected url: string,
    protected fetchMeta: FetchMeta,
    protected render?: string,
    protected isValid?: boolean,
  ) {
  }

  public setMeta(fetchMeta?: FetchMeta): void {
    if (!fetchMeta) {
      fetchMeta = {
        ok: false,
        status: 404,
        message: 'Not Found',
        type: 'unknown'
      }
    }

    this.fetchMeta = fetchMeta
  }

  public getFetchMeta(): FetchMeta {
    return this.fetchMeta
  }
}
