import type { IOpenGraphExtends } from './api'

export interface MetaValue {
  property: string
  content: string
}

export interface MetaNode {
  query: string
  type: 'attr' | 'text'
  value?: string
}

export interface OpenGraphMeta<T = MetaNode[]> extends IOpenGraphExtends<T> {}
export interface MetaValues<T = string> extends IOpenGraphExtends<T> {}
