import ProviderModule from '~/providers/social/ProviderModule'
import type { ISocialIdentifier, Social } from '~/types/social'

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

/**
 * @see https://developer.twitter.com/en/docs/twitter-for-websites/oembed-api
 */
export default class ProviderTwitter extends ProviderModule {
  protected type: Social = 'twitter'
  // /^https?:\/\/twitter\.com\/(?:#!\/)?(\w+)\/status?\/(\d+)/g
  protected regex = /(?:https?:\/\/)?(?:www\.)?twitter\.com\/([a-zA-Z0-9]+)\/status\/([a-zA-Z0-9]+)/ig
  protected endpoint = 'https://publish.twitter.com/oembed'

  protected providerMatch(): ISocialIdentifier {
    const id = this.matches[2] ?? undefined

    return {
      url: this.matches[0] ?? undefined,
      user: this.matches[1] ?? undefined,
      id,
    }
  }

  protected async providerApi(): Promise<this> {
    this.params = {
      url: this.query.url ?? '',
      align: this.query.align ?? 'center',
      hide_media: this.query.hide_media ? 'true' : 'false',
      lang: this.query.lang ?? 'en',
      theme: this.query.theme ?? 'light',
      omit_script: this.query.omit_script ? 'true' : 'false',
    }

    const body = await this.fetchOembed<TwitterApi>()

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
