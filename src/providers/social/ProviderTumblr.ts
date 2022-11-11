import ProviderModule from '~/providers/social/ProviderModule'
import type { IOpenGraph } from '~/types/api'
import type { IProviderModule, ISocialIdentifier, Social } from '~/types/social'

export default class ProviderTumblr extends ProviderModule {
  protected init(): IProviderModule {
    return {
      social: 'tumblr' as Social,
      regex: /(?:https?:\/\/)?(?:www\.)?tumblr\.com\/post\/([a-zA-Z0-9]+)/ig,
      endpoint: '',
      iframe: { width: 550, height: 500 },
    }
  }

  protected setIdentifiers(): ISocialIdentifier {
    const id = this.params.matches[2] ?? undefined

    return {
      url: this.params.matches[0] ?? undefined,
      user: this.params.matches[1] ?? undefined,
      id,
    }
  }

  protected async setResponse(): Promise<IOpenGraph> {
    return {}
  }
}
