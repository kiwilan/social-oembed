import type { FetchMeta } from '~/types'

export default abstract class Module {
  protected meta: FetchMeta

  protected constructor(meta: FetchMeta) {
    this.meta = meta
  }

  public setMeta(meta: FetchMeta): void {
    this.meta = meta
  }

  public getMeta(): FetchMeta {
    return this.meta || {
      ok: false,
      status: 404,
      message: 'Not Found',
    }
  }
}
