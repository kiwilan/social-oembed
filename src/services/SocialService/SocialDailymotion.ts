import SocialModule from '~/services/interfaces/SocialModule'
import type { ISocialRegex, Social } from '~/types/social'

export default class SocialDailymotion extends SocialModule {
  type: Social = 'dailymotion'
  // /(?:https?:\/\/)?(?:www\.)?(?:dai\.ly|dailymotion\.com)\/(?:video|hub)\/([a-zA-Z0-9]+)_?/i
  regex = /(?:https?:\/\/)?(?:www\.)?dai\.?ly(motion)?(?:\.com)?\/?.*(?:video|embed)?(?:.*v=|v\/|\/)([a-z0-9]+)/ig

  public get(): ISocialRegex {
    const id = this.matches[2] ?? undefined
    const embedUrl = id ? `https://www.dailymotion.com/embed/video/${id}` : undefined

    return {
      url: this.matches[0] ?? undefined,
      embedUrl
    }
  }
}
