const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/estudiantes',
    createProxyMiddleware({
      target: 'https://test-deploy-12.onrender.com',
      changeOrigin: true,
    })
  );
};
