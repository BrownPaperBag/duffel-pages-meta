var path = require('path');

module.exports = function(app) {
  var assetManager = app.get('assetManager');

  var privateDirectory = path.join(__dirname, '/../../private/');

  assetManager.addFiles({
    permission: 'view-meta',
    profile: 'duffel-pages-meta-admin',
    after: [
      'angular', 'ng-table'
    ],
    before: 'ng-application-bootstrap',
    js: [
      path.join(privateDirectory, '/javascript/applications/admin/meta/application.js'),
      path.join(privateDirectory, '/javascript/applications/admin/meta/controllers.js'),
      path.join(privateDirectory, '/javascript/applications/admin/meta/PageMetaController.js'),
      path.join(privateDirectory, '/javascript/resources/meta.js'),
      path.join(privateDirectory, '/javascript/services/meta-types.js')
    ]
  });
};

