import OEmbedTwitter from './OEmbedService/OEmbedTwitter'
import OEmbedTiktok from './OEmbedService/OEmbedTiktok'
import OEmbedSpotify from './OEmbedService/OEmbedSpotify'
import type OEmbedModule from '~/services/interfaces/OEmbedModule'
import type { ApiRouteQueryFormat } from '~/types/route'
import type { ISocial, Social } from '~/types/social'

export default class OEmbedService {
  protected query: ApiRouteQueryFormat
  protected social: Social

  constructor(query: ApiRouteQueryFormat, social: Social) {
    this.query = query
    this.social = social
  }

  public static async make(query: ApiRouteQueryFormat, social?: Social): Promise<OEmbedModule | undefined> {
    if (!social)
      console.error('OEmbedService: No social provided')

    const modules: ISocial<() => OEmbedModule> = {
      spotify: () => new OEmbedSpotify(query),
      twitter: () => new OEmbedTwitter(query),
      tiktok: () => new OEmbedTiktok(query),
    }

    const current = modules[social ?? 'unknown']

    if (!current) {
      console.error('OEmbedService: No module found')
      return undefined
    }

    return current().make()
  }
}
