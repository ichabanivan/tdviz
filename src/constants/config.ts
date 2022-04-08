
const config = {
  DEBUG: process.env.REACT_APP_DEBUG === String(true),

  BE_URL: process.env.REACT_APP_BE_URL,
  BE_HOST: process.env.REACT_APP_BE_HOST,
  BE_PORT: process.env.REACT_APP_BE_PORT,
  BE_PROTOCOL: process.env.REACT_APP_BE_PROTOCOL,

  AUTH_BASIC_TITLE: process.env.REACT_APP_AUTH_BASIC_TITLE,
  AUTH_BASIC_VALUE: process.env.REACT_APP_AUTH_BASIC_VALUE,

  AUTH_BEARER_TITLE: process.env.REACT_APP_AUTH_BEARER_TITLE,
  AUTH_BEARER_VALUE: process.env.REACT_APP_AUTH_BEARER_VALUE,
};

// Ability to TURN ON debug mode fon production using url params
config.DEBUG = config.DEBUG ? true : /show_DEBUG/.test(window.location.href);

config.DEBUG
&& console.info('%c CONFIG ', 'background: #EC1B24; color: #000; font-weight: bolder; font-size: 30px;'
  , '\n config:', config
  , '\n full ENV:', process.env
  , '\n NODE_ENV:', process.env.NODE_ENV
  , '\n REACT_APP_ENV:', process.env.REACT_APP_ENV
);

export default config;
