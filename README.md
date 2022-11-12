# **Social oEmbed** <!-- omit in toc -->

<p align="center">
  <a href="https://github.com/kiwilan/social-oembed" target="_blank">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/kiwilan/social-oembed/main/public/social-oembed.svg">
      <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/kiwilan/social-oembed/main/public/social-oembed.svg">
      <img alt="Social oEmbed" src="https://raw.githubusercontent.com/kiwilan/social-oembed/main/public/social-oembed.svg" width="350" height="120" style="max-width: 100%;">
    </picture>
  </a>
</p>

<p align="center">
  <strong>API to offer OpenGraph meta or oEmbed media.</strong>
</p>

<p align="center">
  <a href="https://nodejs.org/en"><img src="https://img.shields.io/static/v1?label=Node.js&message=v16.x&color=339933&style=flat-square&logo=node.js&logoColor=ffffff" alt="Node.js"></a>
  <a href="https://www.fastify.io"><img src="https://img.shields.io/static/v1?label=Fastify&message=v4.x&color=000000&style=flat-square&logo=fastify&logoColor=ffffff" alt="Fastify"></a>
  <a href="https://www.typescriptlang.org"><img src="https://img.shields.io/static/v1?label=TypeScript&message=v4.8.x&color=3178C6&style=flat-square&logo=typescript&logoColor=ffffff" alt="TypeScript"></a>
</p>
<p align="center">
  <a href="https://esbuild.github.io"><img src="https://img.shields.io/static/v1?label=esbuild&message=ESM&color=FFCF00&style=flat-square&logo=esbuild&logoColor=ffffff" alt="esbuild"></a>
  <a href="https://gitlab.com/ewilan-riviere/social-oembed/-/pipelines"><img src="https://gitlab.com/ewilan-riviere/social-oembed/badges/main/pipeline.svg" alt="Pipeline"></a>
</p>

------

> **Warning**  
> In early development, not stable.

## Why ?

[OpenGraph](https://ogp.me/) protocol offer a way to get meta data from a website to display a nice preview in social media and [oEmbed](https://oembed.com/) offer to display an iframe from another website like social network.

With OpenGraph, from JavaScript application, on client side, you can't crawl website to extract metadata, you have to call an API to get these data, some services offer this API, but mostly aren't open source. About these services, you can find [opengraph.io](https://www.opengraph.io/) (free with API limit requests) or [iframely](https://iframely.com/) (with own hosted solution).

With oEmbed, it's really complicated, each social network have their own API, with some limitations, some services offer to get these data but you have to pay for it, and it's really expensive ([smashballoon](https://smashballoon.com/), [embedsocial](https://embedsocial.com/)...). Only [iframely](https://iframely.com/) offer a free plan with some limitations, with own hosted, but with some limitations with Instagram or Facebook cause by [Meta](https://www.nosto.com/blog/instagram-api-limit/)*.

**This project is an attempt to offer a free (with own hosted solution) and open source API to get OpenGraph and oEmbed data.**

**: to get Instagram or Facebook data, with iframely or with Meta API, you have to register your application on Meta, with many validations. Social oEmbed offer another solution without any key from Meta.*

## Features

- OpenGraph
  - Dark mode with `dark=true` query parameter
  - Twitter card query with `opengraph=twitter` query parameter
  - Opiniated HTML render
- oEmbed
  - Social network providers
  - Fallback on OpenGraph if no oEmbed provider
  - HTML render
    - Rebuilt HTML iframe from `url` query parameter (`oembed=nofetch`) : use some rules to find media ID from URL and rebuild HTML iframe without external request
    - Get HTML and metadata from oEmbed API (`oembed=fetch`) : some API have request limit or API key limit, if request is rejected, fallback on OpenGraph
    - Get metadata from website (`oembed=opengraph`) : some social networks use a lot of JavaScript, crawl can be limited
  - Smart queries, customize render for each social network [ ]
- Host your own instance [ ]
  - Docker [ ]
- Middleware
  - auth with `api_key` query parameter or `Bearer token`
  - `url` query parameter

### Social providers

- [x] Dailymotion: regex
- [x] Instagram: regex
- [x] Facebook: regex
- [ ] Flickr
- [ ] Giphy
- [ ] Imgur
- [ ] Kickstarter
- [ ] Linkedin
- [ ] Pinterest
- [ ] Reddit
- [ ] Snapchat
- [ ] Soundcloud
- [x] Spotify: regex, API
- [ ] Ted
- [ ] Tumblr
- [x] Tiktok: regex, API
- [ ] Twitch
- [x] Twitter: regex, API
- [ ] Vimeo
- [x] Youtube: regex

### Roadmap

- [x] OpenGraph
  - [x] `og:title`, `og:description`, `og:image`, `og:url`, `og:type`, `og:site_name`, `og:locale`
  - [x] Color `theme-color`
  - [x] Fallback to `twitter:title`, `twitter:description`, `twitter:image`, `twitter:url`, `twitter:card`, `twitter:site`, `twitter:creator`
  - [ ] All meta
  - [x] `twitter` query for card
  - [x] Opiniated render
- [x] oEmbed
  - [ ] Major social networks support
  - [x] Providers system
  - [ ] smart queries for each social network
  - [x] queries for iframe
  - [x] fallback to OpenGraph if no oEmbed, no provider or oEmbed error
  - [x] oEmbed rebuilt with match
  - [ ] add api key for each provider
- [ ] Host your own instance
- [x] Auth middleware <https://github.com/fastify/middie>
  - [ ] Domains allow `*` or `*.domain.com`
  - [x] API key as query or header
  - [ ] Request limit
  - [ ] helmet with <https://github.com/fastify/fastify-helmet>
- [ ] Documentation
  - [ ] Usage from JS client side with fetch
  - [x] Usage response example, typescript interfaces
  - [x] Usage oembed
  - [ ] Social networks providers specs
  - [ ] examples alpinejs/react/vuejs
  - [ ] Deploy nginx and pm2 docs
- [ ] Vite with <https://github.com/fastify/fastify-dx>
- [ ] Use Mongo to cache data
- [ ] Use [Bun](https://bun.sh/) when it will be stable

## Usage

### API documentation

Demo instance: `https://social-oembed.git-projects.xyz`.

> On this instance, `api_key` is disabled and HTTP header `Access-Control-Allow-Origin` use `localhost:3000,127.0.0.1:3000,localhost:5173,127.0.0.1:5173`, so you can test it from your browser or from any localhost application with port `3000` or `5173`.

```http
GET /api
```

| Parameter | Type                  | Required                            | Description                               |
| --------- | --------------------- | ----------------------------------- | ----------------------------------------- |
| `url`     | `string`              | `true`                              | URL of website like `https://github.com`. |
| `format`  | `opengraph`, `oembed` | `false`                             | Format of data, default is `opengraph`.   |
| `api_key` | `string`              | Depend of `.env` `API_KEY` variable | API key.                                  |

```http
GET /instance
```

Information about API.

### OpenGraph

Example: <https://social-oembed.git-projects.xyz/api?url=https://github.com&format=opengraph>

```bash
curl --request GET \
    --data-urlencode "format=opengraph" \
    --data-urlencode "url=https://github.com" \
    --get "https://social-oembed.git-projects.xyz/api" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"
```

### oEmbed

Example: <https://social-oembed.git-projects.xyz/api?url=https://www.youtube.com/watch?v=fXmAurh012s&format=oembed>

```bash
curl --request GET \
    --data-urlencode "format=oembed" \
    --data-urlencode "url=https://www.youtube.com/watch?v=fXmAurh012s" \
    --get "https://social-oembed.git-projects.xyz/api" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"
```

## How it works ?

### OpenGraph

Social oEmbed will parse `url` website with [cheerio](https://cheerio.js.org/) and extract OpenGraph data from meta tags. If open graph data are not found, it will try to extract Twitter data or meta tags. If no data are found, it won't return an error, will have just an empty result. The response will be available into `data`, another metadata you will find an an opiniated HTML render into `data.render`, you could just display this into your application.

All data about fetch are available into `meta.fetch` object.

### oEmbed

Social oEmbed will try to find a provider from `url`, if exists, it will use it to get oEmbed data from social network API. The API have to return a correct response to display an iframe, but sometimes oEmbed API have limits. If the request failed, the provider will try to rebuild embed url to inject it into an iframe. Like OpenGraph, you will have some metadata (built on OpenGraph type) into `data` and a `data.render` with an iframe. If no provider exists, you will have a fallback to OpenGraph.

All data about fetch are available into `meta.fetch` object.

Note: if Social oEmbed can't find a provider from `url`, your social network could be not supported by Social oEmbed and you can contribute to add it. But if provider exists, it could be the `url` parse bug, you can open an issue.

// TODO contribute and issue

### `data` object

```yaml
title?: string
description?: string
image?: string
siteUrl?: string
type?: string
siteName?: string
locale?: string
audio?: string
video?: string
determiner?: string
article:author?: string
themeColor?: string
icon?: string
width?: string
height?: string
social: Social
embedUrl?: string # oEmbed only
render: string
```

### `meta` object

```yaml
url: string # original url
format: string # opengraph or oembed
message: string # error message
instance: string # documentation url
fetch:
  message: string
  status: number
  ok: boolean
  type: string # json, text or unknown
```

## **Setup**

### Local

Download dependencies

```bash
pnpm i
```

Create `.env`

```bash
cp .env.example .env
```

Execute `dev`

```bash
pnpm dev
```

Server is available on <http://localhost:3000>.

### `.env`

| Variable      | Type                                                   | Default                         | Description                                                                             |
| ------------- | ------------------------------------------------------ | ------------------------------- | --------------------------------------------------------------------------------------- |
| `NODE_ENV`    | `development`,`test`,`production`                      | `development`                   | Current environment.                                                                    |
| `LOG_LEVEL`   | `debug`,`error`,`fatal`,`info`,`trace`,`warn`,`silent` | `debug`                         | Log level for debug.                                                                    |
| `API_PORT`    | `number`                                               | `3000`                          | Port used by your application                                                           |
| `API_HOST`    | `string`                                               | `localhost`                     | Host of your application                                                                |
| `API_HTTPS`   | `boolean`                                              | `false`                         | Enable https for you application                                                        |
| `API_KEY`     | `string`, `undefined`, `false`                         | `false`                         | API key if you want to set it, if `undefined` or `false` API key protection is disabled |
| `API_DOMAINS` | `string`                                               | `localhost:3000,127.0.0.1:3000` | Domains allowed to use the API, seperated by commans, use `*` to allow all domains      |

### Production

Build application

```bash
pnpm build
```

Start application from `build`

```bash
pnpm start
```

You have to serve application with a manager like [pm2](https://pm2.keymetrics.io/). A command offer to start application with pm2.

```bash
pnpm pm2
```

But the best way is to use [Nginx](https://www.nginx.com/) with [pm2](https://pm2.keymetrics.io/).

## Tests

### Linter

Show errors with [ESLint](https://eslint.org/).

```bash
pnpm lint
```

Automatically fix errors.

```bash
pnpm lint:fix
```

## Technical environment

Based on [Fastify](https://www.fastify.io/) and [TypeScript](https://www.typescriptlang.org/), with [ESBuild](https://esbuild.github.io/) for bundling (ESM format).

From template [fastify-esbuild](https://github.com/davipon/fastify-esbuild) by [davipon](https://davipon.hashnode.dev/better-backend-dx-fastify-esbuild).

- `node` >= 16.x
- `pnpm` >= 7.x
- `fastify` 4.x
- `react` 18.x
- `esbuild` 0.15.x

## License

[BSD 2-Clause](LICENSE)

## Credits

- [Iframely](https://iframely.com/) for concept
- [Fastify](https://www.fastify.io/) for framework
- [davipon](https://davipon.hashnode.dev/better-backend-dx-fastify-esbuild) for fastify template
