import type { IOpenGraphExtends } from './api'

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

export interface MetaNode {
  query: string
  type: 'attr' | 'text'
  value?: string
}

export interface OpenGraphMeta<T = MetaNode[]> extends IOpenGraphExtends<T> {}
