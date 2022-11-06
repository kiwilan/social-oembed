import type { Social } from '~/types/social'
import OEmbedModule from '~/services/interfaces/OEmbedModule'

interface TiktokApi {
  version?: string
  type?: string
  title?: string
  author_url?: string
  author_name?: string
  width?: string
  height?: string
  html?: string
  thumbnail_width?: number
  thumbnail_height?: number
  thumbnail_url?: string
  provider_url?: string
  provider_name?: string
}

export default class OEmbedTiktok extends OEmbedModule<TiktokApi> {
  type: Social = 'tiktok'
  endpoint = 'https://www.tiktok.com/oembed'

  public async make(): Promise<OEmbedTiktok> {
    this.params = {
      url: this.query.url ?? '',
    }

    const body = await this.fetch()

    this.html = body?.html
    this.openGraph = {
      'siteName': body?.provider_name,
      'title': `${body?.title} ${body?.author_name}`,
      'siteUrl': this.query.url,
      'description': body?.html ? body.html.replace(/<[^>]*>?/gm, '') : undefined,
      'themeColor': '#000000',
      'image': body?.thumbnail_url,
      'type': body?.type,
      'social': this.type,
      'article:author': body?.author_name,
    }

    return this
  }
}
