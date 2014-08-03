var Meta = require('duffel-pages-meta').Meta();

module.exports = function(parameters) {
  var app = parameters.app;

  app.protect.get('/duffel-pages-meta/api/meta', 'view-meta', function(req, res){

    Meta.findPaginate(req.query, {
      where: {
        status: {
          neq: 'Deleted'
        },
        page_id: req.query.page_id
      }
    }).then(function(metas) {
      res.json(metas);
    });

  });
};

