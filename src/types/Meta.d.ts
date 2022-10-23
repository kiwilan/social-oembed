export interface MetaValue {
  property: string
  content: string
}

export interface MetaValues {
  title?: string
  description?: string
  image?: string
  siteUrl?: string
  type?: string
  siteName?: string
  locale?: string
  themeColor?: string
}

export interface Meta {
  title: MetaNode[]
  description: MetaNode[]
  image: MetaNode[]
  siteUrl: MetaNode[]
  type: MetaNode[]
  siteName: MetaNode[]
  locale: MetaNode[]
  themeColor: MetaNode[]
}

export interface MetaNode {
  query: string
  type: 'attr' | 'text'
  value?: string
}