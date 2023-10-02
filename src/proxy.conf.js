const PROXY_CONFIG = {
  '/rest': {
    target: location.host,

    changeOrigin: true,
    secure: false,
    logLevel: 'debug'
  }

};

module.exports = PROXY_CONFIG;
