import ApiModule from '~/models/ApiModule'
import SocialService from '~/services/SocialService'
import type { IApiRouteQuery } from '~/types/route'
import type { IApiData } from '~/types/api'
import RenderService from '~/services/RenderService'

export default class OEmbed extends ApiModule {
  protected model: IApiData = {}
  protected isOpenGraph = false

  public static async make(query: IApiRouteQuery): Promise<OEmbed> {
    const social = await SocialService.make(query, query.oembed)
    const provider = social.getProvider()

    const oembed = new OEmbed(query)

    oembed.model = {
      ...provider.openGraph,
      embedUrl: provider.identifiers.embedUrl
    }
    oembed.fetchMeta = provider.fetchMeta

    const render = RenderService.make(query)
    oembed.render = provider.module.type === 'opengraph'
      ? render.toOpenGraph({
        og: provider.openGraph,
      })
      : render.toOEmbed({
        embedUrl: provider.identifiers.embedUrl,
        model: provider.openGraph,
        provider,
      })

    return oembed
  }

  public getModel(): IApiData {
    return this.model
  }

  public getIsOpenGraph(): boolean {
    return this.isOpenGraph
  }
}
