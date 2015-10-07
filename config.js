// config.js
// aoneill - 05/09/15

var fs = require('fs');

module.exports = {
  'httpPort':    process.env.HTTPPORT || 80,
  'httpsPort':   process.env.HTTPSPORT || 443,
  'credentials': {
    key:  fs.readFileSync('assets/ssl/ssl.key'),
    cert: fs.readFileSync('assets/ssl/ssl.crt')
  },
  'src':         '/config',
  'views':       '/views',
  'subdomains':  '/subdomains',
  'sass':        '/assets/sass',
  'static':      '/static',
  'css':         '/css'
};
