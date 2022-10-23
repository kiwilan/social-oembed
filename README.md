# **Social oEmbed** <!-- omit in toc -->

[![bun](https://img.shields.io/static/v1?label=Bun&message=v0.2&color=000000&style=flat-square&logo=bun&logoColor=ffffff)](https://bun.sh)
![pipeline](https://gitlab.com/ewilan-riviere/social-oembed/badges/main/pipeline.svg)

> *VERY EXPERIMENTAL*
> Bun.sh is still in early development, and this application is not stable.

API to offer [OpenGraph](https://ogp.me/) meta or [oEmbed](https://oembed.com/) media.

> OpenGraph example: <https://social-oembed.git-projects.xyz?url=https://github.com&format=opengraph>

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
bun i
```

Create `.env`

```bash
cp .env.example .env
```

Execute `start`

```bash
bun start
```

Server is available on <http://localhost:3000>.

#### Advanced

You have some options to execute application.

```bash
bun start # Start application
bun watch # Start application with --hot flag (not work for now)
bun nodemon # Start application with nodemon (hot reload works)
```

### Production

```bash
bun build # Build application
```

You have to serve application with a manager like [pm2](https://pm2.keymetrics.io/). A command offer to start application with pm2.

```bash
bun deploy
```

But the best way is to use [Nginx](https://www.nginx.com/) with [pm2](https://pm2.keymetrics.io/).

// TODO deploy docs

## Tests

### Linter

Show errors with [ESLint](https://eslint.org/).

```bash
bun lint
```

Automatically fix errors.

```bash
bun lint:fix
```

## Docs

- <https://github.com/oven-sh/bun>
- <https://bun.sh>
- <https://blog.logrocket.com/bun-javascript-runtime-taking-node-js-deno>
