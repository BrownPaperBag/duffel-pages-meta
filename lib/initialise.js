var controllerLoader = require('controller-loader'),
  path = require('path');

module.exports = function(app, callback) {

  require('./models/Meta').initialise(app.get('database'));
  require('./models/MetaDefault').initialise(app.get('database'));

  require('../lib/initialisers/assets')(app);
  require('../lib/initialisers/meta-admin-tab')(app);
  require('../lib/initialisers/visor')(app);

  app.get('nunjucksEnvironment').loaders
    .push(new (app.get('nunjucks')).FileSystemLoader(path.join(__dirname, 'views')));

  app.get('nunjucksEnvironment')
    .addExtension('meta', require('../lib/nunjucks-tags/meta')(app));

  controllerLoader.load(path.resolve(path.join(__dirname, 'controllers')), function(controller) {
    require(controller)({
      app: app
    });
  }, callback);
};

