import SocialModule from '~/services/SocialService/SocialModule'
import type { ISocialIdentifier, Social } from '~/types/social'

export default class SocialTwitch extends SocialModule {
  protected endpoint: string | undefined
  protected parseMatches(): ISocialIdentifier {
    throw new Error('Method not implemented.')
  }

  protected fetchApi(): Promise<this> {
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
