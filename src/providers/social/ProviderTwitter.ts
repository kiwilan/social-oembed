import ProviderModule from '~/providers/social/ProviderModule'
import type { IOpenGraph } from '~/types/api'
import type { IProviderModule, ISocialIdentifier, Social } from '~/types/social'

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
  protected init(): IProviderModule {
    return {
      social: 'twitter' as Social,
      regex: /(?:https?:\/\/)?(?:www\.)?twitter\.com\/([a-zA-Z0-9]+)\/status\/([a-zA-Z0-9]+)/ig,
      endpoint: 'https://publish.twitter.com/oembed',
      iframe: { width: 550, height: 500 },
      forceFetch: true,
    }
  }

  protected setIdentifiers(): ISocialIdentifier {
    const id = this.params.matches[2] ?? undefined

    return {
      url: this.params.matches[0] ?? undefined,
      user: this.params.matches[1] ?? undefined,
      id,
    }
  }

  protected async setResponse(): Promise<IOpenGraph> {
    const query = this.params.query
    this.module.apiParams = {
      url: query.url,
      align: query.align ?? 'center',
      hide_media: query.hide_media ? 'true' : 'false',
      lang: query.lang ?? 'en',
      theme: query.theme ?? 'light',
      omit_script: query.omit_script ? 'true' : 'false',
    }

    const body = await this.fetchApi<TwitterApi>()

    // From https://joshuatz-twitter-iframe-generator.glitch.me
    this.identifiers.embedUrl = this.generateIframeSrc(body.html)

    return {
      siteName: body?.provider_name,
      title: body?.author_name,
      siteUrl: body?.url,
      description: body?.html ? body.html.replace(/<[^>]*>?/gm, '') : undefined,
      social: this.module.social,
    }
  }
}
