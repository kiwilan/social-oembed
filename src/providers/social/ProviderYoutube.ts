import ProviderModule from '~/providers/social/ProviderModule'
import type { IOpenGraph } from '~/types/api'
import type { IProviderModule, ISocialIdentifier, IframeSize, Social } from '~/types/social'

export default class ProviderYoutube extends ProviderModule {
  protected iframeSize: IframeSize = { width: '100%', height: 450 }

  protected init(): IProviderModule {
    return {
      social: 'youtube' as Social,
      regex: /^(?:http(?:s)?:\/\/)?(?:www\.)?(?:m\.)?(?:youtu\.be\/|youtube\.com\/(?:(?:watch)?\?(?:.*&)?v(?:i)?=|(?:embed|v|vi|user|shorts)\/))([^\?&\"'>]+)/g,
      endpoint: '',
      iframe: { width: '100%', height: 450 },
    }
  }

  protected setIdentifiers(): ISocialIdentifier {
    const id = this.params.matches[1] ?? undefined

    return {
      url: this.params.matches[0] ?? undefined,
      id,
      embedUrl: id
        ? `https://www.youtube.com/embed/${id}`
        : undefined
    }
  }

  protected async setResponse(): Promise<IOpenGraph> {
    return {}
  }
}
