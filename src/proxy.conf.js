const PROXY_CONFIG = {
  '/rest': {
    // target: location.host,
    target: "http://localhost:8080/",
    changeOrigin: true,
    secure: false,
    logLevel: 'debug'
  }

};

module.exports = PROXY_CONFIG;
