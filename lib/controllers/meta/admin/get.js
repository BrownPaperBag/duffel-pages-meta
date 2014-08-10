var MetaDefault = require('duffel-pages-meta').MetaDefault();

module.exports = function(parameters) {
  var app = parameters.app;

  app.protect.get('/meta/admin', 'view-meta-defaults', function(req, res){

    MetaDefault.getDefaultMeta().then(function(metaDefaults) {
      res.render('/duffel-pages-meta/admin/index.nunjucks', {
        metaDefaults: metaDefaults
      });
    }, function(error) {
      throw error;
    });
  });
};


