export interface OEmbedApi {
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

export interface OEmbedApiParams {
  height?: number
  width?: number
  color?: string
}
