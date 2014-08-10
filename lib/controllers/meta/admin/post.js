var MetaDefault = require('duffel-pages-meta').MetaDefault(),
  Promise = require('bluebird');

module.exports = function(parameters) {
  var app = parameters.app;

  app.protect.post('/meta/admin', 'edit-meta-defaults', function(req, res){

    Promise.map(req.body.meta_default, function(metaDefault) {
      return new Promise(function(resolve, reject) {
        MetaDefault.upsert(metaDefault, function(error) {
          if (error) {
            return reject(error);
          }
          resolve();
        });
      });
    }).then(function() {
      req.flash('success', 'Meta defaults updated');
      res.redirect('/meta/admin');
    }).catch(function(error) {
      throw error;
    });
  });
};


