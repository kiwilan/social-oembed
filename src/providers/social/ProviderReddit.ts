import ProviderModule from '~/providers/social/ProviderModule'
import type { ISocialIdentifier, IframeSize, Social } from '~/types/social'

export default class ProviderReddit extends ProviderModule {
  protected type: Social = 'reddit'
  protected regex = /(?:https?:\/\/)?(?:www\.)?reddit\.com\/r\/([a-zA-Z0-9]+)/ig
  protected endpoint: string | undefined
  protected iframeSize: IframeSize = { width: 550, height: 500 }

  protected providerMatch(): ISocialIdentifier {
    const id = this.matches[2] ?? undefined

    return {
      url: this.matches[0] ?? undefined,
      user: this.matches[1] ?? undefined,
      id,
    }
  }

  protected providerApi(): Promise<this> {
    throw new Error('Method not implemented.')
  }
}
