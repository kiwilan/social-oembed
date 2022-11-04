# **Social oEmbed** <!-- omit in toc -->

[![nodejs](https://img.shields.io/static/v1?label=Node.js&message=v16.x&color=339933&style=flat-square&logo=node.js&logoColor=ffffff)](https://nodejs.org/en)
[![fastify](https://img.shields.io/static/v1?label=Fastify&message=v4.x&color=000000&style=flat-square&logo=fastify&logoColor=ffffff)](https://www.fastify.io)

![pipeline](https://gitlab.com/ewilan-riviere/social-oembed/badges/main/pipeline.svg)

![logo](/public/logo.svg)

> *VERY EXPERIMENTAL*  
> In early development, not stable.  

API to offer [OpenGraph](https://ogp.me/) meta or [oEmbed](https://oembed.com/) media.

> OpenGraph example: <https://social-oembed.git-projects.xyz/api?url=https://github.com&format=opengraph>

## Why ?

[OpenGraph](https://ogp.me/) protocol offer a way to get meta data from a website to display a nice preview in social media and [oEmbed](https://oembed.com/) offer to display an iframe from another website like social network. To get OpenGraph data from any website, you have to crawl it to extract metadata, for oEmbed, each social network have their own API to get the iframe.

With OpenGraph, from JavaScript application, on client side, you can't parse a website, you have to call an API to get these data, some services offer this API, but mostly aren't open source. About these services, you can find [opengraph.io](https://www.opengraph.io/) (free with API limit requests) or [iframely](https://iframely.com/) (with own hosted solution).

With oEmbed, it's really complicated, each social network have their own API, with some limitations (Instagram or Facebook for example), some services offer to get these data but you have to pay for it, and it's really expensive ([smashballoon](https://smashballoon.com/), [embedsocial](https://embedsocial.com/)...). Only [iframely](https://iframely.com/) offer a free plan with some limitations, with own hosted, but you can't access to Instagram or Facebook cause by [Meta limitations](https://www.nosto.com/blog/instagram-api-limit/).

**This project is an attempt to offer a free (with own hosted solution) and open source API to get OpenGraph and oEmbed data.**

## Roadmap

- [x] OpenGraph
  - [ ] All meta
  - [ ] Twitter Cards
- [ ] oEmbed
  - [ ] Major social networks support
    - [ ] Providers system
- [ ] Host your own instance
- [ ] Documentation
- [ ] Use Mongo to cache data
- [ ] Use [Bun](https://bun.sh/) when it will be stable

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

| Variable | Description | Default |
| --- | --- | --- |
| `API_PORT` | Port used by your application | `3000` |
| `API_HOST` | Host of your application | `localhost` |
| `API_HTTPS` | Enable https for you application | `false` |
| `API_KEY` | API key if you want to set it, if `undefined`, API key protection is disabled | `undefined` |
| `API_DOMAINS` | Domains allowed to use the API, seperated by commans, use `*` to allow all domains | `localhost:3000,localhost:8000,127.0.0.1:3000,127.0.0.1:8000,127.0.0.1:5173` |

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

// TODO deploy docs

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

## Docs

Based on [Fastify](https://www.fastify.io/) and [TypeScript](https://www.typescriptlang.org/), with [ESBuild](https://esbuild.github.io/) for bundling.

From template [fastify-esbuild](https://github.com/davipon/fastify-esbuild) by [davipon](https://davipon.hashnode.dev/better-backend-dx-fastify-esbuild).

## License

[BSD 2-Clause](LICENSE)

## Credits

- [Iframely](https://iframely.com/) for concept
- [Fastify](https://www.fastify.io/) for framework
- [davipon](https://davipon.hashnode.dev/better-backend-dx-fastify-esbuild) for fastify template
