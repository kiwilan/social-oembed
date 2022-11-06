import OEmbedTwitter from './OEmbedService/OEmbedTwitter'
import OEmbedTiktok from './OEmbedService/OEmbedTiktok'
import type OEmbedModule from '~/services/interfaces/OEmbedModule'
import type { ApiRouteQueryFormat } from '~/types/route'
import type { ISocial, SocialOEmbed } from '~/types/social'

export default class OEmbedService {
  protected query: ApiRouteQueryFormat
  protected social: SocialOEmbed

  constructor(query: ApiRouteQueryFormat, social: SocialOEmbed) {
    this.query = query
    this.social = social
  }

  public static async make(query: ApiRouteQueryFormat, social: SocialOEmbed): Promise<OEmbedModule | undefined> {
    const modules: ISocial<OEmbedModule> = {
      twitter: new OEmbedTwitter(query),
      tiktok: new OEmbedTiktok(query),
    }

    const current = modules[social]
    if (current)
      current.make()

    return current
  }
}
