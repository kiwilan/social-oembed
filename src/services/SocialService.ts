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
import type { ISocial, ISocialIdentifier, ProviderFetch, Social } from '~/types/social'
import type { FetchMeta, IApiRouteQuery } from '~/types/route'
import type { IOpenGraph } from '~/types/api'

export default class SocialService {
  protected constructor(
    protected provider: ProviderModule,
  ) {}

  public static async make(query: IApiRouteQuery, fetch: ProviderFetch = 'nofetch'): Promise<SocialService> {
    const type = SocialService.find(query.url)

    const providers: ISocial<() => ProviderModule> = {
      dailymotion: () => new ProviderDailymotion(),
      facebook: () => new ProviderFacebook(),
      flickr: () => new ProviderFlickr(),
      instagram: () => new ProviderInstagram(),
      giphy: () => new ProviderGiphy(),
      imgur: () => new ProviderImgur(),
      kickstarter: () => new ProviderKickstarter(),
      linkedin: () => new ProviderLinkedin(),
      pinterest: () => new ProviderPinterest(),
      reddit: () => new ProviderReddit(),
      snapchat: () => new ProviderSnapchat(),
      soundcloud: () => new ProviderSoundcloud(),
      tiktok: () => new ProviderTiktok(),
      spotify: () => new ProviderSpotify(),
      ted: () => new ProviderTed(),
      tumblr: () => new ProviderTumblr(),
      twitch: () => new ProviderTwitch(),
      twitter: () => new ProviderTwitter(),
      vimeo: () => new ProviderVimeo(),
      youtube: () => new ProviderYoutube(),
      unknown: () => new ProviderUnknown(),
    }

    const provider = providers[type as keyof typeof providers]
    if (!provider)
      throw new Error('Provider not found')

    const Provider = provider()
    const instance = await Provider.make(query, fetch)

    return new SocialService(instance)
  }

  public getProvider(): ProviderModule {
    return this.provider
  }

  public getIdentifiers(): ISocialIdentifier | undefined {
    return this.provider.identifiers
  }

  public getFetchMeta(): FetchMeta {
    return this.provider.fetchMeta
  }

  public getOpenGraph(): IOpenGraph {
    return this.provider.openGraph ?? {}
  }

  public getHtml(): string | undefined {
    return this.provider.html
  }

  public isValid(): boolean {
    return this.provider.isValid
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
