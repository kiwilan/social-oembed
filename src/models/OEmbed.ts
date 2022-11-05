import ApiModule from '~/models/ApiModule'
import SocialRegex from '~/services/ApiService/SocialRegex'
import type { ApiRouteQueryFormat } from '~/types/route'
import type { IApiData } from '~/types/api'

export default class OEmbed extends ApiModule {
  public model: IApiData = {}

  public static async make(query: ApiRouteQueryFormat): Promise<OEmbed> {
    const oembed = new OEmbed(query)
    if (!oembed.query.url)
      return oembed

    // const og = await OpenGraph.make(oembed.query)

    const social = SocialRegex.make(oembed.query.url)

    oembed.model = {
      // ...og.model,
      embedUrl: social.model?.embedUrl,
    }

    oembed.fetchMeta = {
      // message: og.response?.statusText,
      // ok: og.response?.ok,
      // status: og.response?.status,
      // type: og.response?.type
    }

    return oembed
  }
}
