import type { ISocialRegex } from '~/types/social'

export default abstract class SocialModule {
  protected url: string
  protected regexp?: RegExp
  protected matches: string[] = []

  public constructor(url: string) {
    this.url = url
  }

  public static regex: RegExp
  abstract make(): ISocialRegex

  protected setMatches(): string[] {
    if (!this.regexp)
      return []

    const regExp = new RegExp(this.regexp)
    const matches = this.url.matchAll(regExp)
    const raw = [...matches]
    const matchList = raw[0] ?? []

    return matchList
  }
}
