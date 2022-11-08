import ProviderModule from '~/providers/social/ProviderModule'
import type { ISocialIdentifier, IframeSize, Social } from '~/types/social'

export default class ProviderYoutube extends ProviderModule {
  protected type: Social = 'youtube'
  // /(?:https?:\/\/)?(?:www\.)?youtu\.be\/([a-zA-Z0-9]+)/ig,
  protected regex = /^(?:http(?:s)?:\/\/)?(?:www\.)?(?:m\.)?(?:youtu\.be\/|youtube\.com\/(?:(?:watch)?\?(?:.*&)?v(?:i)?=|(?:embed|v|vi|user|shorts)\/))([^\?&\"'>]+)/g
  protected endpoint: string | undefined
  protected iframeSize: IframeSize = { width: '100%', height: 450 }

  protected providerMatch(): ISocialIdentifier {
    const id = this.matches[1] ?? undefined

    return {
      url: this.matches[0] ?? undefined,
      id,
      embedUrl: id ? `https://www.youtube.com/embed/${id}` : undefined
    }
  }

  protected providerApi(): Promise<this> {
    // throw new Error('Method not implemented.')

    return Promise.resolve(this)
  }
}
