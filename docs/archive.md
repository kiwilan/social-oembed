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
- <https://davipon.hashnode.dev/better-backend-dx-fastify-esbuild>

### ES6

- <https://blog.logrocket.com/es-modules-in-node-today>
- <https://github.com/TypeStrong/ts-node/pull/1585>: ts-node support esm
- <https://github.com/TypeStrong/ts-node/discussions/1450#discussioncomment-1806115>: ts-node use loader
- <https://github.com/felipeplets/esm-examples>
- <https://stackoverflow.com/a/39436580/11008206>: --experimental-modules, module, .mjs
- <https://github.com/microsoft/TypeScript/issues/18442#issuecomment-1073060190>: swc rust compiler
  - <https://github.com/swc-project/swc>

#### Repositories

- <https://github.com/yonathan06/fastify-typescript-starter>
- <https://github.com/hmake98/fastify-typescript>
- <https://github.com/matschik/fastify-typescript-starter>
- <https://github.com/ManUtopiK/vite-fastify-boilerplate>
- <https://github.com/axe-me/vite-plugin-node>

#### Notes

```bash
node --loader ts-node/esm ./my-script.ts
```

```bash
ts-node --esm ./my-script.ts
```

```bash
nodemon -e ts,js --exec ts-node -r tsconfig-paths/register ./src/server.ts
```

#### Rust with SWC

```bash
pnpm add concurrently -D
```

```json
{
  "scripts": {
    "dev:rust": "nodemon",
    "build:rust": "rimraf dist && swc src -w --out-dir dist",
    "start:rust": "pnpm build:go && npm run start",
    "dev:go": "nodemon",
    "build:go": "rimraf build && node esbuild.js",
    "start:go": "pnpm build:go && npm run start",
    "swc:dev": "concurrently \"npm run swc:watch-compile\" \"npm run swc:watch-dev\"",
    "swc:watch-compile": "swc src -w --out-dir dist",
    "swc:watch-dev": "nodemon --watch \"dist/**/*\" -e js ./dist/main.js",
    "swc:build": "swc src -d dist",
    "swc:start": "NODE_ENV=production node dist/main.js",
    "swc:clean": "rm -rf dist"
  }
}
```
