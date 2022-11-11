import ProviderModule from '~/providers/social/ProviderModule'
import type { IOpenGraph } from '~/types/api'
import type { IProviderModule, ISocialIdentifier, Social } from '~/types/social'

export default class ProviderUnknown extends ProviderModule {
  protected init(): IProviderModule {
    return {
      social: 'unknown' as Social,
      regex: undefined,
      endpoint: undefined,
      iframe: { width: 500, height: 500 },
    }
  }

  protected setIdentifiers(): ISocialIdentifier {
    return {}
  }

  protected async setResponse(): Promise<IOpenGraph> {
    return {}
  }
}
