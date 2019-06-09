const proxy = require('http-proxy-middleware');

module.exports = app => {
  app.use(
    proxy('/api/', {
      target: 'http://dev.hn-zm.com:9015/',
    })
  );
};
