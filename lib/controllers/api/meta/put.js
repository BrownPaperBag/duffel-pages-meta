var Meta = require('duffel-pages-meta').Meta();

module.exports = function(parameters) {
  var app = parameters.app;

  app.protect.put('/duffel-pages-meta/api/meta', 'edit-meta', function(req, res){

    (new Meta(req.body)).save(function(error, meta) {
      if (error) throw error;
      res.json(meta);
    });

  });

  app.protect.put('/duffel-pages-meta/api/meta/:id', 'edit-meta', function(req, res){

    Meta.findById(req.params.id, function(error, meta) {
      if (error) throw error;
      meta.name = req.body.name;
      meta.property = req.body.property;
      meta.use_property_default = req.body.use_property_default;
      meta.content = req.body.content;

      meta.save(function(error, meta) {
        if (error) throw error;
        res.json(meta);
      });
    });

  });
};

