const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  // Add target address for api proxy
  app.use(proxy('/api', {
    target: 'https://www.viveport.com',
    changeOrigin: true,
  }));
};
