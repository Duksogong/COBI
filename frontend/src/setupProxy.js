// https://create-react-app.dev/docs/proxying-api-requests-in-development 참고
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      // 프론트에서 서버로 타겟을 줄 때 5000으로 바꿔서 주겠다는 의미
      target: 'http://localhost:5000',
      changeOrigin: true,
    })
  );
};