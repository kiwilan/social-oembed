import SocialTwitter from './SocialService/SocialTwitter'
import type SocialModule from './SocialService/SocialModule'
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
import type { ISocial, Social } from '~/types/social'
import type { IApiRouteQuery } from '~/types/route'

export default class SocialService {
  public static async make(query: IApiRouteQuery): Promise<SocialModule | undefined> {
    const type = SocialService.find(query.url)

    const providers: ISocial<() => SocialModule> = {
      dailymotion: () => new SocialDailymotion(query),
      facebook: () => new SocialFacebook(query),
      flickr: () => new SocialFlickr(query),
      instagram: () => new SocialInstagram(query),
      giphy: () => new SocialGiphy(query),
      imgur: () => new SocialImgur(query),
      kickstarter: () => new SocialKickstarter(query),
      linkedin: () => new SocialLinkedin(query),
      pinterest: () => new SocialPinterest(query),
      reddit: () => new SocialReddit(query),
      snapchat: () => new SocialSnapchat(query),
      soundcloud: () => new SocialSoundcloud(query),
      tiktok: () => new SocialTiktok(query),
      spotify: () => new SocialSpotify(query),
      ted: () => new SocialTed(query),
      tumblr: () => new SocialTumblr(query),
      twitch: () => new SocialTwitch(query),
      twitter: () => new SocialTwitter(query),
      vimeo: () => new SocialVimeo(query),
      youtube: () => new SocialYoutube(query),
      unknown: () => new SocialUnknown(query),
    }

    const provider = providers[type as keyof typeof providers]

    if (!provider) {
      console.error(`No provider found for ${type}`)
      return undefined
    }

    // TODO if API reject request, create iframe from identifiers or openGraph
    const instance = await provider().make()
    return instance
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
