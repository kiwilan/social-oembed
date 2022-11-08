import ProviderModule from '~/providers/social/ProviderModule'
import type { ISocialIdentifier, IframeSize, Social } from '~/types/social'

export default class ProviderVimeo extends ProviderModule {
  protected type: Social = 'vimeo'
  protected regex = /(?:https?:\/\/)?(?:www\.)?vimeo\.com\/([a-zA-Z0-9]+)/ig
  protected endpoint: string | undefined
  protected iframeSize: IframeSize = { width: '100%', height: 400 }

  protected providerMatch(): ISocialIdentifier {
    const id = this.matches[1] ?? undefined
    const embedUrl = id ? `https://player.vimeo.com/video/${id}` : undefined

    return {
      url: this.matches[0] ?? undefined,
      id,
      embedUrl
    }
  }

  protected providerApi(): Promise<this> {
    // throw new Error('Method not implemented.')

    return Promise.resolve(this)
  }
}
