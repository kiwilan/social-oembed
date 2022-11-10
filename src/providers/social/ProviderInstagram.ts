import ProviderModule from '~/providers/social/ProviderModule'
import type { IOpenGraph } from '~/types/api'
import type { IProviderModule, ISocialIdentifier, Social } from '~/types/social'

export default class ProviderInstagram extends ProviderModule {
  protected init(): IProviderModule {
    return {
      social: 'instagram' as Social,
      regex: /(?:https?:\/\/)?(?:www\.)?instagram\.com\/p\/([a-zA-Z0-9]+)/ig,
      endpoint: '',
      iframe: { width: 550, height: 500 },
    }
  }

  protected setIdentifiers(): ISocialIdentifier {
    const id = this.params.matches[1] ?? undefined
    const embedUrl = id ? `http://instagram.com/p/${id}/embed?utm_source=ig_embed&utm_campaign=loading` : undefined

    return {
      url: this.params.matches[0] ?? undefined,
      id,
      embedUrl
    }
  }

  protected async setResponse(): Promise<IOpenGraph> {
    return {}
  }
}
