import SocialTwitter from './SocialService/SocialTwitter'
import type SocialModule from './Interfaces/SocialModule'
import SocialDailymotion from './SocialService/SocialDailymotion'
import SocialYoutube from './SocialService/SocialYoutube'
import SocialFacebook from './SocialService/SocialFacebook'
import SocialFlickr from './SocialService/SocialFlickr'
import SocialInstagram from './SocialService/SocialInstagram'
import SocialGiphy from './SocialService/SocialGiphy'
import SocialImgur from './SocialService/SocialImgur'
import SocialKickstarter from './SocialService/SocialKickstarter'
import SocialLinkedin from './SocialService/SocialLinkedin'
import SocialPinterest from './SocialService/SocialPinterest'
import SocialReddit from './SocialService/SocialReddit'
import SocialSnapchat from './SocialService/SocialSnapchat'
import SocialSoundcloud from './SocialService/SocialSoundcloud'
import SocialSpotify from './SocialService/SocialSpotify'
import SocialTiktok from './SocialService/SocialTiktok'
import SocialTed from './SocialService/SocialTed'
import SocialTumblr from './SocialService/SocialTumblr'
import SocialTwitch from './SocialService/SocialTwitch'
import SocialVimeo from './SocialService/SocialVimeo'
import SocialUnknown from './SocialService/SocialUnknown'
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
    const type = SocialService.find(url)
    const social = new SocialService(url, type)
    const providers: ISocial<() => SocialModule> = {
      dailymotion: () => new SocialDailymotion(url),
      facebook: () => new SocialFacebook(url),
      flickr: () => new SocialFlickr(url),
      instagram: () => new SocialInstagram(url),
      giphy: () => new SocialGiphy(url),
      imgur: () => new SocialImgur(url),
      kickstarter: () => new SocialKickstarter(url),
      linkedin: () => new SocialLinkedin(url),
      pinterest: () => new SocialPinterest(url),
      reddit: () => new SocialReddit(url),
      snapchat: () => new SocialSnapchat(url),
      soundcloud: () => new SocialSoundcloud(url),
      tiktok: () => new SocialTiktok(url),
      spotify: () => new SocialSpotify(url),
      ted: () => new SocialTed(url),
      tumblr: () => new SocialTumblr(url),
      twitch: () => new SocialTwitch(url),
      twitter: () => new SocialTwitter(url),
      vimeo: () => new SocialVimeo(url),
      youtube: () => new SocialYoutube(url),
      unknown: () => new SocialUnknown(url),
    }

    const provider = providers[type as keyof typeof providers]
    if (provider)
      social.model = provider().make()

    if (social.model?.id)
      social.isValid = true

    return social
  }

  public static find(url: string): Social {
    let type: Social = 'unknown'

    for (const social in SocialEnum) {
      if (url.includes(social))
        type = social as Social
    }
    if (url.includes('youtu'))
      type = 'youtube'

    if (url.includes('flic.kr'))
      type = 'flickr'

    return type
  }
}
