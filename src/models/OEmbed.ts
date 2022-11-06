import ApiModule from '~/models/ApiModule'
import SocialService from '~/services/SocialService'
import type { IApiRouteQuery } from '~/types/route'
import type { IApiData } from '~/types/api'

export default class OEmbed extends ApiModule {
  public model: IApiData = {}

  public static async make(query: IApiRouteQuery): Promise<OEmbed> {
    const oembed = new OEmbed(query)
    if (!oembed.query.url)
      return oembed

    const social = await SocialService.make(oembed.query)
    console.log(social)

    if (social) {
      oembed.model = {
        ...social.getOpenGraph(),
        embedUrl: social.getIdentifiers().embedUrl
      }
      oembed.fetchMeta = social.getFetchMeta()
    }

    return oembed
  }
}
