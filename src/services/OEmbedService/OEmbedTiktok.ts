import type { Social } from '~/types/social'
import OEmbedModule from '~/services/interfaces/OEmbedModule'

interface TiktokApi {

}

export default class OEmbedTiktok extends OEmbedModule<TiktokApi> {
  type: Social = 'tiktok'
  endpoint = 'https://www.tiktok.com/oembed'

  public async make(): Promise<OEmbedTiktok> {
    this.params = {
      url: this.query.url ?? '',
    }

    const body = await this.fetch()
    console.log(body)

    // this.html = body?.html
    // this.openGraph = {
    //   siteName: body?.provider_name,
    //   title: body?.author_name,
    //   siteUrl: body?.url,
    //   description: body?.html ? body.html.replace(/<[^>]*>?/gm, '') : undefined,
    //   themeColor: '#1DA1F2',
    //   twitter: true
    // }

    return this
  }
}
