# **Social oEmbed** <!-- omit in toc -->

[![nodejs](https://img.shields.io/static/v1?label=Node.js&message=v16.x&color=339933&style=flat-square&logo=node.js&logoColor=ffffff)](https://nodejs.org/en)
[![fastify](https://img.shields.io/static/v1?label=Fastify&message=v4.x&color=000000&style=flat-square&logo=fastify&logoColor=ffffff)](https://www.fastify.io)
![pipeline](https://gitlab.com/ewilan-riviere/social-oembed/badges/main/pipeline.svg)

![logo](/public/logo.svg)

> *VERY EXPERIMENTAL*  
> In early development, and this application is not stable.  

API to offer [OpenGraph](https://ogp.me/) meta or [oEmbed](https://oembed.com/) media.

> OpenGraph example: <https://social-oembed.git-projects.xyz/api?url=https://github.com&format=opengraph>

## Features

- [x] OpenGraph meta

### Roadmap

- [x] OpenGraph
- [ ] Twitter Cards
- [ ] oEmbed
  - [ ] Major social networks support
- [ ] Host your own instance
- [ ] Documentation

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

Execute `start`

```bash
pnpm dev
```

Server is available on <http://localhost:3000>.

### Production

```bash
pnpm build # Build application
```

```bash
bun start # Start application from `dist`
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

- <https://github.com/oven-sh/bun>
- <https://bun.sh>
- <https://blog.logrocket.com/bun-javascript-runtime-taking-node-js-deno>
- <https://blog.logrocket.com/configuring-nodemon-with-typescript>
- <https://www.digitalocean.com/community/tutorials/typescript-running-typescript-ts-node>
- <https://www.fastify.io/docs/latest/Reference/TypeScript>
- <https://blog.logrocket.com/how-to-set-up-node-typescript-express>
- <https://stackoverflow.com/questions/37979489/how-to-watch-and-reload-ts-node-when-typescript-files-change>
- <https://tsh.io/blog/fastify-practical-overview>

### ES6

- <https://blog.logrocket.com/es-modules-in-node-today>
