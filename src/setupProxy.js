const proxy = require('http-proxy-middleware');

process.on('uncaughtException', err => {
  console.log(err);
  console.log(err.stack);
});

module.exports = app => {
  app.use(
    proxy('/api/', {
      target: 'http://dev.hn-zm.com:9015/',
      ws: true,
      // changeOrigin: true,
      secure: false,
    })
  );
};
