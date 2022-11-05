import SocialTwitter from './SocialService/SocialTwitter'
import type SocialModule from './SocialService/SocialModule'
import type { ISocial, ISocialRegex, Social } from '~/types/social'
import { SocialEnum } from '~/types/social'

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

    const socialList = Object.keys(SocialEnum).filter((item) => {
      return isNaN(Number(item))
    })

    for (const social of socialList) {
      if (url.includes(social))
        type = social as Social
    }
    if (url.includes('youtu'))
      type = 'youtube'

    if (url.includes('flic.kr'))
      type = 'flickr'

    const social = new SocialService(url, type)
    // social.regexp = social.setRegExp()
    // social.model = social.findMatches()
    const providers: ISocial = {
      twitter: new SocialTwitter(url),
    }

    const provider = providers[type as keyof typeof providers]
    // const current: SocialModule = new Provider(url)
    if (!provider)
      return social

    social.model = provider.make()

    if (social.model?.id)
      social.isValid = true

    return social
  }
}
