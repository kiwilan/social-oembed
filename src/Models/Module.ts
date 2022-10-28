import type { FetchMeta } from '@/types'

export abstract class Module {
  protected meta: FetchMeta

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
