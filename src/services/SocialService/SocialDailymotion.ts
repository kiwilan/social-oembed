import SocialModule from '~/services/SocialService/SocialModule'
import type { ISocialIdentifier, Social } from '~/types/social'

export default class SocialDailymotion extends SocialModule {
  protected type: Social = 'dailymotion'
  // /(?:https?:\/\/)?(?:www\.)?(?:dai\.ly|dailymotion\.com)\/(?:video|hub)\/([a-zA-Z0-9]+)_?/i
  protected regex = /(?:https?:\/\/)?(?:www\.)?dai\.?ly(motion)?(?:\.com)?\/?.*(?:video|embed)?(?:.*v=|v\/|\/)([a-z0-9]+)/ig
  protected endpoint: string | undefined

  protected parseMatches(): ISocialIdentifier {
    const id = this.matches[2] ?? undefined
    const embedUrl = id ? `https://www.dailymotion.com/embed/video/${id}` : undefined

    return {
      url: this.matches[0] ?? undefined,
      embedUrl
    }
  }

  protected fetchApi(): Promise<this> {
    throw new Error('Method not implemented.')
  }
}
