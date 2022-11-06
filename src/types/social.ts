export interface TwitterApi {
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

export interface ISocialRegex {
  url?: string
  user?: string
  type?: string
  id?: string
  embedUrl?: string
}

export enum SocialEnum {
  dailymotion = 'dailymotion',
  instagram = 'instagram',
  facebook = 'facebook',
  flickr = 'flickr',
  giphy = 'giphy',
  imgur = 'imgur',
  kickstarter = 'kickstarter',
  linkedin = 'linkedin',
  pinterest = 'pinterest',
  reddit = 'reddit',
  snapchat = 'snapchat',
  soundcloud = 'soundcloud',
  spotify = 'spotify',
  ted = 'ted',
  tumblr = 'tumblr',
  tiktok = 'tiktok',
  twitch = 'twitch',
  twitter = 'twitter',
  vimeo = 'vimeo',
  youtube = 'youtube',
  unknown = 'unknown',
}

// https://bobbyhadz.com/blog/typescript-convert-enum-to-union
export type Social = `${SocialEnum}` // or keyof typeof SocialEnum
export type SocialOEmbed = `${SocialEnum.twitter}`

type SocialExtends<T> = Partial<Record<SocialEnum, T>>
export interface ISocial<T> extends SocialExtends<T> {}
