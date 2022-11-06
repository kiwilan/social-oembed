import type { Social } from '~/types/social'
import OEmbedModule from '~/services/interfaces/OEmbedModule'

interface TwitterApi {
  url?: string
  author_name?: string
  author_url?: string
  html?: string
  width?: number
  height?: number
  type?: 'rich'
  cache_age?: string
  provider_name?: string
  provider_url?: string
  version?: string
}

export default class OEmbedTwitter extends OEmbedModule<TwitterApi> {
  type: Social = 'twitter'
  endpoint = 'https://publish.twitter.com/oembed'

  public async make(): Promise<OEmbedTwitter> {
    this.params = {
      url: this.query.url ?? '',
      align: this.query.align ?? 'center',
      hide_media: this.query.hide_media ? 'true' : 'false',
      lang: this.query.lang ?? 'en',
      theme: this.query.theme ?? 'light',
      omit_script: this.query.omit_script ? 'true' : 'false',
    }

    const body = await this.fetch()

    this.html = body?.html
    this.openGraph = {
      siteName: body?.provider_name,
      title: body?.author_name,
      siteUrl: body?.url,
      description: body?.html ? body.html.replace(/<[^>]*>?/gm, '') : undefined,
      themeColor: '#1DA1F2',
      social: this.type,
    }

    return this
  }
}
