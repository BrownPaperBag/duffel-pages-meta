var loopbackPaginate = require('loopback-datasource-juggler-paginate');

var Meta = null;

function initialiseSchema(database) {
  Meta = database.connections.main.define('pages_meta', {
    name: String,
    property: String,
    content: String,
    created: {
      type: Date,
      default: Date.now
    },
    updated: Date
  });

  var Page = require('duffel-pages').Page();

  Page.hasMany(Meta, {
    as: 'meta',
    foreignKey: 'page_id'
  });
  Meta.belongsTo(Page, {
    as: 'meta',
    foreignKey: 'page_id'
  });

  Meta.beforeSave = function preSave(next, data) {
    this.updated = new Date();
    next();
  };

  loopbackPaginate.addPaginateFunction(Page);
}

module.exports = {
  initialise: function(database) {
    initialiseSchema(database);
  },
  model: function() {
    return Meta;
  }
};

