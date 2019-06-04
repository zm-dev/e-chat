const proxy = require('http-proxy-middleware');

module.exports = app => {
  app.use(
    proxy('/api/', {
      target: 'http://192.168.1.71:9003/',
    })
  );
};
