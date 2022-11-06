import ApiModule from '~/models/ApiModule'
import SocialService from '~/services/SocialService'
import type { ApiRouteQueryFormat } from '~/types/route'
import type { IApiData } from '~/types/api'
import OEmbedService from '~/services/OEmbedService'

export default class OEmbed extends ApiModule {
  public model: IApiData = {}

  public static async make(query: ApiRouteQueryFormat): Promise<OEmbed> {
    const oembed = new OEmbed(query)
    if (!oembed.query.url)
      return oembed

    // const og = await OpenGraph.make(oembed.query)

    const social = SocialService.make(oembed.query.url)
    const service = await OEmbedService.make(oembed.query, social.type)

    if (service)
      console.log('OEmbed: Using OEmbed service')
    else
      console.log('OEmbed: Using OpenGraph service')

    oembed.social = social.type

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
