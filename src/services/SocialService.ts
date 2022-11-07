import ProviderTwitter from '~/providers/social/ProviderTwitter'
import type ProviderModule from '~/providers/social/ProviderModule'
import ProviderDailymotion from '~/providers/social/ProviderDailymotion'
import ProviderYoutube from '~/providers/social/ProviderYoutube'
import ProviderFacebook from '~/providers/social/ProviderFacebook'
import ProviderFlickr from '~/providers/social/ProviderFlickr'
import ProviderInstagram from '~/providers/social/ProviderInstagram'
import ProviderGiphy from '~/providers/social/ProviderGiphy'
import ProviderImgur from '~/providers/social/ProviderImgur'
import ProviderKickstarter from '~/providers/social/ProviderKickstarter'
import ProviderLinkedin from '~/providers/social/ProviderLinkedin'
import ProviderPinterest from '~/providers/social/ProviderPinterest'
import ProviderReddit from '~/providers/social/ProviderReddit'
import ProviderSnapchat from '~/providers/social/ProviderSnapchat'
import ProviderSoundcloud from '~/providers/social/ProviderSoundcloud'
import ProviderSpotify from '~/providers/social/ProviderSpotify'
import ProviderTiktok from '~/providers/social/ProviderTiktok'
import ProviderTed from '~/providers/social/ProviderTed'
import ProviderTumblr from '~/providers/social/ProviderTumblr'
import ProviderTwitch from '~/providers/social/ProviderTwitch'
import ProviderVimeo from '~/providers/social/ProviderVimeo'
import ProviderUnknown from '~/providers/social/ProviderUnknown'
import { SocialEnum } from '~/types/social'
import type { ISocial, ISocialIdentifier, Social } from '~/types/social'
import type { IApiRouteQuery } from '~/types/route'

export default class SocialService {
  protected constructor(
    protected type: Social,
    protected provider: ProviderModule,
    protected identifiers?: ISocialIdentifier
  ) {}

  public static make(query: IApiRouteQuery): SocialService {
    const type = SocialService.find(query.url)

    const providers: ISocial<() => ProviderModule> = {
      dailymotion: () => new ProviderDailymotion(query),
      facebook: () => new ProviderFacebook(query),
      flickr: () => new ProviderFlickr(query),
      instagram: () => new ProviderInstagram(query),
      giphy: () => new ProviderGiphy(query),
      imgur: () => new ProviderImgur(query),
      kickstarter: () => new ProviderKickstarter(query),
      linkedin: () => new ProviderLinkedin(query),
      pinterest: () => new ProviderPinterest(query),
      reddit: () => new ProviderReddit(query),
      snapchat: () => new ProviderSnapchat(query),
      soundcloud: () => new ProviderSoundcloud(query),
      tiktok: () => new ProviderTiktok(query),
      spotify: () => new ProviderSpotify(query),
      ted: () => new ProviderTed(query),
      tumblr: () => new ProviderTumblr(query),
      twitch: () => new ProviderTwitch(query),
      twitter: () => new ProviderTwitter(query),
      vimeo: () => new ProviderVimeo(query),
      youtube: () => new ProviderYoutube(query),
      unknown: () => new ProviderUnknown(query),
    }

    const provider = providers[type as keyof typeof providers] as unknown as () => ProviderModule
    const instance = provider()

    const service = new SocialService(type, instance)

    return service
  }

  public getIdentifiers(): ISocialIdentifier | undefined {
    return this.provider?.onlyIdentifiers()
  }

  public async getOembed(): Promise<ProviderModule> {
    // TODO if API reject request, create iframe from identifiers or openGraph
    const instance = await this.provider.make()

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
