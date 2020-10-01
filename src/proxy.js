const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(config) {
  const exampleProxy = createProxyMiddleware(['/test'], {
    target: `${config.scheme}://${config.examplePrefix}.${config.domain}`,
    changeOrigin: true,
  });

  return {
    exampleProxy,
  };
};
