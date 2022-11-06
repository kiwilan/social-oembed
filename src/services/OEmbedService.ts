import OEmbedTwitter from './OEmbedService/OEmbedTwitter'
import type OEmbedModule from '~/services/interfaces/OEmbedModule'
import type { ApiRouteQueryFormat } from '~/types/route'
import type { SocialOEmbed } from '~/types/social'

export default class OEmbedService {
  protected query: ApiRouteQueryFormat
  protected social: SocialOEmbed

  constructor(query: ApiRouteQueryFormat, social: SocialOEmbed) {
    this.query = query
    this.social = social
  }

  public static async make(query: ApiRouteQueryFormat, social: SocialOEmbed): Promise<OEmbedModule<any>> {
    const modules = {
      twitter: new OEmbedTwitter(query),
    }

    const current = modules[social].make()

    return current
  }
}
