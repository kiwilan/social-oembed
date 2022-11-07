import ProviderModule from '~/providers/social/ProviderModule'
import type { ISocialIdentifier, Social } from '~/types/social'

export default class ProviderTed extends ProviderModule {
  protected type: Social = 'ted'
  protected regex = /(?:https?:\/\/)?(?:www\.)?ted\.com\/talks\/([a-zA-Z0-9]+)/ig
  protected endpoint: string | undefined

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
