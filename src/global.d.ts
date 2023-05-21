declare global {
  declare namespace Route {
    export type Endpoint = '/api' | '/' | '/instance'
  }
}

export {};