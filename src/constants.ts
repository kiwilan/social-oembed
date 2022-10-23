import type { Meta } from '@/types'

export const metaNodes: Meta = {
  title: [
    {
      query: '[property="og:title"]',
      type: 'attr',
      value: 'content',
    },
    {
      query: '[name="twitter:title"]',
      type: 'attr',
      value: 'content',
    },
    {
      query: 'title',
      type: 'text',
    },
  ],
  description: [
    {
      query: '[property="og:description"]',
      type: 'attr',
      value: 'content',
    },
    {
      query: '[name="twitter:description"]',
      type: 'attr',
      value: 'content',
    },
    {
      query: 'description',
      type: 'text',
    },
  ],
  image: [
    {
      query: '[property="og:image"]',
      type: 'attr',
      value: 'content',
    },
    {
      query: '[name="twitter:image"]',
      type: 'attr',
      value: 'content',
    },
  ],
  siteUrl: [
    {
      query: '[property="og:url"]',
      type: 'attr',
      value: 'content',
    },
    {
      query: '[property="twitter:url"]',
      type: 'attr',
      value: 'content',
    },
  ],
  type: [
    {
      query: '[property="og:type"]',
      type: 'attr',
      value: 'content',
    },
    {
      query: '[name="twitter:card"]',
      type: 'attr',
      value: 'content',
    },
  ],
  siteName: [
    {
      query: '[property="og:site_name"]',
      type: 'attr',
      value: 'content',
    },
    {
      query: '[name="twitter:site"]',
      type: 'attr',
      value: 'content',
    },
    {
      query: '[name="twitter:creator"]',
      type: 'attr',
      value: 'content',
    },
  ],
  locale: [
    {
      query: '[property="og:locale"]',
      type: 'attr',
      value: 'content',
    },
    // TODO meta locale
  ],
  themeColor: [
    {
      query: '[name="theme-color"]',
      type: 'attr',
      value: 'content',
    },
  ],
}
