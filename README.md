# **Social oEmbed** <!-- omit in toc -->

<p align="center">
  <a href="https://github.com/kiwilan/social-oembed" target="_blank">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/kiwilan/social-oembed/main/public/logo.svg">
      <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/kiwilan/social-oembed/main/public/logo.svg">
      <img alt="Social oEmbed" src="https://raw.githubusercontent.com/kiwilan/social-oembed/main/public/logo.svg" width="350" height="150" style="max-width: 100%;">
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

> *VERY EXPERIMENTAL*
> In early development, not stable.

## Why ?

[OpenGraph](https://ogp.me/) protocol offer a way to get meta data from a website to display a nice preview in social media and [oEmbed](https://oembed.com/) offer to display an iframe from another website like social network. To get OpenGraph data from any website, you have to crawl it to extract metadata, for oEmbed, each social network have their own API to get the iframe.

With OpenGraph, from JavaScript application, on client side, you can't parse a website, you have to call an API to get these data, some services offer this API, but mostly aren't open source. About these services, you can find [opengraph.io](https://www.opengraph.io/) (free with API limit requests) or [iframely](https://iframely.com/) (with own hosted solution).

With oEmbed, it's really complicated, each social network have their own API, with some limitations (Instagram or Facebook for example), some services offer to get these data but you have to pay for it, and it's really expensive ([smashballoon](https://smashballoon.com/), [embedsocial](https://embedsocial.com/)...). Only [iframely](https://iframely.com/) offer a free plan with some limitations, with own hosted, but you can't access to Instagram or Facebook cause by [Meta limitations](https://www.nosto.com/blog/instagram-api-limit/)*.

**This project is an attempt to offer a free (with own hosted solution) and open source API to get OpenGraph and oEmbed data.**

**: to get Instagram or Facebook data, with iframely or with Meta API, you have to register your application on Meta, with many validations. Social oEmbed offer another solution without any key from Meta.*

### Features/Roadmap

- [x] OpenGraph
  - [x] `og:title`, `og:description`, `og:image`, `og:url`, `og:type`, `og:site_name`, `og:locale`
  - [x] Color `theme-color`
  - [x] Fallback to `twitter:title`, `twitter:description`, `twitter:image`, `twitter:url`, `twitter:card`, `twitter:site`, `twitter:creator`
  - [ ] All meta
  - [ ] `twitter` query for card
  - [x] Opiniated render
- [x] oEmbed
  - [ ] Major social networks support
    - [x] Dailymotion
    - [ ] Instagram
    - [ ] Facebook
    - [ ] Flickr
    - [ ] Giphy
    - [ ] Imgur
    - [ ] Kickstarter
    - [ ] LinkedIn
    - [ ] Pinterest
    - [ ] Reddit
    - [ ] Snapchat
    - [ ] Soundcloud
    - [x] Spotify
    - [ ] TED
    - [ ] Tumblr
    - [x] TikTok
    - [ ] Twitch
    - [x] Twitter
    - [x] Vimeo
    - [x] YouTube
  - [x] Providers system
  - [ ] metadata query to get OpenGraph
  - [ ] smart queries for each social network
  - [ ] queries for iframe
- [ ] Host your own instance
- [ ] Auth middleware <https://github.com/fastify/middie>
  - [ ]Domains allow `*` or `*.domain.com`
  - [ ] API key as query or header
- [ ] Documentation
  - [ ] Usage from JS client side with fetch, from PHP with Guzzle
  - [ ] Usage response example, typescript interfaces
  - [ ] Usage oembed
  - [ ] Social networks providers specs
  - [ ] examples alpinejs/react/vuejs
  - [ ] Deploy nginx and pm2 docs
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
GET /docs
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

Coming soon...

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

## License

[BSD 2-Clause](LICENSE)

## Credits

- [Iframely](https://iframely.com/) for concept
- [Fastify](https://www.fastify.io/) for framework
- [davipon](https://davipon.hashnode.dev/better-backend-dx-fastify-esbuild) for fastify template
