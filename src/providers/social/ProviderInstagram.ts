import ProviderModule from '~/providers/social/ProviderModule'
import type { ISocialIdentifier, IframeSize, Social } from '~/types/social'

export default class ProviderInstagram extends ProviderModule {
  protected type: Social = 'instagram'
  protected regex = /(?:https?:\/\/)?(?:www\.)?instagram\.com\/p\/([a-zA-Z0-9]+)/ig
  protected endpoint: string | undefined
  protected iframeSize: IframeSize = { width: 550, height: 500 }

  protected providerMatch(): ISocialIdentifier {
    const id = this.matches[1] ?? undefined
    const embedUrl = id ? `http://instagram.com/p/${id}/embed?utm_source=ig_embed&utm_campaign=loading` : undefined

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
