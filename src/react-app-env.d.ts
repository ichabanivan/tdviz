/// <reference types="react-scripts" />
declare namespace NodeJS {
  interface ProcessEnv {
    PUBLIC_URL: string
    NODE_ENV: 'development' | 'production' | 'test'

    DEBUG: 'true' | 'false'

    REACT_APP_BE_URL: string
    REACT_APP_BE_HOST: string
    REACT_APP_BE_PORT: string
    REACT_APP_BE_PROTOCOL: string

    REACT_APP_AUTH_BASIC_TITLE: string
    REACT_APP_AUTH_BEARER_TITLE: string
    REACT_APP_AUTH_BASIC_VALUE: string
    REACT_APP_AUTH_BEARER_VALUE: string
  }
}

interface Window {
  Stripe: any // eslint-disable-line @typescript-eslint/no-explicit-any
}
