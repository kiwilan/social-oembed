import type { ISocialRegex, Social } from '~/types/social'

export default abstract class SocialModule {
  protected url: string
  protected social: Social = 'unknown'
  protected matches: string[] = []

  public constructor(url: string) {
    this.url = url
  }

  abstract type: Social
  abstract regex: RegExp
  abstract make(): ISocialRegex

  public setMatches(): SocialModule {
    if (!this.regex)
      return this

    const regExp = new RegExp(this.regex)
    const matches = this.url.matchAll(regExp)
    const raw = [...matches]
    this.matches = raw[0] ?? []

    return this
  }

  public setSocial() {
    this.social = this.type

    return this
  }
}
