import SocialModule from '~/services/interfaces/SocialModule'
import type { ISocialRegex, Social } from '~/types/social'

export default class SocialTwitch extends SocialModule {
  type: Social = 'twitch'
  regex = /(?:https?:\/\/)?(?:www\.)?twitch\.tv\/([a-zA-Z0-9]+)/ig

  public get(): ISocialRegex {
    const id = this.matches[2] ?? undefined

    return {
      url: this.matches[0] ?? undefined,
      user: this.matches[1] ?? undefined,
      id,
    }
  }
}
