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

export type Social = 'dailymotion' | 'facebook' | 'flickr' | 'instagram' | 'linkedin' | 'pinterest' | 'reddit' | 'soundcloud' | 'tiktok' | 'twitch' | 'twitter' | 'vimeo' | 'youtube' | 'unknown'

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
  unknown = 'unkown'
}

export interface ISocial {
  dailymotion?: any
  instagram?: any
  facebook?: any
  flickr?: any
  giphy?: any
  imgur?: any
  kickstarter?: any
  linkedin?: any
  pinterest?: any
  reddit?: any
  snapchat?: any
  soundcloud?: any
  spotify?: any
  ted?: any
  tumblr?: any
  tiktok?: any
  twitch?: any
  twitter?: any
  vimeo?: any
  youtube?: any
}
