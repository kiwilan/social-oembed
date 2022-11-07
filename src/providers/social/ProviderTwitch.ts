import ProviderModule from '~/providers/social/ProviderModule'
import type { ISocialIdentifier, Social } from '~/types/social'

export default class ProviderTwitch extends ProviderModule {
  protected endpoint: string | undefined
  protected providerMatch(): ISocialIdentifier {
    throw new Error('Method not implemented.')
  }

  protected providerApi(): Promise<this> {
    throw new Error('Method not implemented.')
  }

  protected type: Social = 'twitch'
  protected regex = /(?:https?:\/\/)?(?:www\.)?twitch\.tv\/([a-zA-Z0-9]+)/ig

  public get(): ISocialIdentifier {
    const id = this.matches[2] ?? undefined

    return {
      url: this.matches[0] ?? undefined,
      user: this.matches[1] ?? undefined,
      id,
    }
  }
}
