import ProviderModule from '~/providers/social/ProviderModule'
import type { ISocialIdentifier, Social } from '~/types/social'

export default class ProviderTumblr extends ProviderModule {
  type: Social = 'tumblr'
  regex = /(?:https?:\/\/)?(?:www\.)?tumblr\.com\/post\/([a-zA-Z0-9]+)/ig

  public get(): ISocialIdentifier {
    const id = this.matches[2] ?? undefined

    return {
      url: this.matches[0] ?? undefined,
      user: this.matches[1] ?? undefined,
      id,
    }
  }
}
