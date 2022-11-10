import ProviderModule from '~/providers/social/ProviderModule'
import type { IOpenGraph } from '~/types/api'
import type { IProviderModule, ISocialIdentifier, Social } from '~/types/social'

export default class ProviderVimeo extends ProviderModule {
  protected init(): IProviderModule {
    return {
      social: 'vimeo' as Social,
      regex: /(?:https?:\/\/)?(?:www\.)?vimeo\.com\/([a-zA-Z0-9]+)/ig,
      endpoint: '',
      iframe: { width: '100%', height: 400 },
    }
  }

  protected setIdentifiers(): ISocialIdentifier {
    const id = this.params.matches[1] ?? undefined
    const embedUrl = id ? `https://player.vimeo.com/video/${id}` : undefined

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
