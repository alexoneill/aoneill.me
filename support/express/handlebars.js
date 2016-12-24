// handlebars.js
// aoneill - 10/14/16

var handlebars = require('express-handlebars'),
    helpers = require('handlebars-helpers'),
    path = require('path');

var config = require(path.join('..', 'config.js'));

function otherHelpers(hbs) {
  hbs.registerHelper('not', function(args, options) {
    if(!args) {
      return options.fn(this);
    }

    return options.inverse(this);
  });
}

module.exports = function(server) {
  // Setup the templating engine
  var hbs = handlebars.create({
    extname: '.hbs',
    partialsDir: path.join(config.root.views, 'partials'),
  });

  // Insert the helpers
  otherHelpers(hbs.handlebars);
  var extra = helpers({
    hanldebars: hbs.handlebars,
  });

  // Register as the engine
  server.engine('hbs', hbs.engine);

  // Views
  server.set('view engine', 'hbs');
  server.set('views', config.root.views);

  return server;
}
