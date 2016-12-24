// config.js
// aoneill - 12/24/16

var path = require('path');

// Settings
var config = {
  'port':   process.env.PORT || 80,
  'sport':  process.env.SPORT || 443,

  'dev':    (process.env.DEV != ""),

  // GitHub deployment
  'github': {
    script: '/utils/update.sh',
    path: process.env.G_PATH,
    secret: process.env.G_SECRET
  },

  // Web paths (from root)
  'web': {
    'css':    '/css',
    'static': {
      '/':       '/static',
    },
  },

  // Physical paths (from here)
  'paths': {
    'encrypt':     'encrypt/encrypt.js',
    'express':     'express/express.js',
    'github':      'github.js',
    'routes':      'routes/routes.js',
  },

  // Physical paths (from root)
  'root': {
    'docs':      '/static/docs',
    'sass':      '/assets/sass',
    'sass_dest': '/static/css',
    'views':     '/views',
  }
};

// Prepend local paths with __dirname
for(var name in config.paths) {
  config.paths[name] = path.join(__dirname, config.paths[name]);
}

// Prepend root paths with __dirname/..
for(var name in config.root) {
  config.root[name] = path.join(__dirname, '..', config.root[name]);
}

// Prepend the GitHub script with __dirname/..
config.github.script = path.join(__dirname, '..', config.github.script);

module.exports = config;
