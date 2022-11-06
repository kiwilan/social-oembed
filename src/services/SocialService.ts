import SocialTwitter from './SocialService/SocialTwitter'
import type SocialModule from './SocialService/SocialModule'
import SocialDailymotion from './SocialService/SocialDailymotion'
import SocialYoutube from './SocialService/SocialYoutube'
import { SocialEnum } from '~/types/social'
import type { ISocial, ISocialRegex, Social } from '~/types/social'

export default class SocialService {
  private constructor(
    public url: string,
    public type: Social,
    public regexp?: RegExp | string,
    public matches: string[] = [],
    public isValid = false,
    public model?: ISocialRegex
  ) {}

  public static make(url: string): SocialService {
    let type: Social = 'unknown'

    for (const social in SocialEnum) {
      if (url.includes(social))
        type = social as Social
    }
    if (url.includes('youtu'))
      type = 'youtube'

    if (url.includes('flic.kr'))
      type = 'flickr'

    const social = new SocialService(url, type)
    const providers: ISocial<SocialModule> = {
      dailymotion: new SocialDailymotion(url),
      twitter: new SocialTwitter(url),
      youtube: new SocialYoutube(url),
    }

    const provider = providers[type as keyof typeof providers]
    // const current: SocialModule = new Provider(url)
    if (!provider) {
      console.error(`No provider found for ${type}`)
      return social
    }

    social.model = provider
      .setMatches()
      .setSocial()
      .make()

    if (social.model?.id)
      social.isValid = true

    return social
  }
}
