var loopbackPaginate = require('loopback-datasource-juggler-paginate'),
  Promise = require('bluebird');

var Meta = null,
  MetaDefault = null;

function getMetaDefault() {
  return MetaDefault || require('duffel-pages-meta').MetaDefault();
}

function initialiseSchema(database) {
  Meta = database.connections.main.define('pages_meta', {
    name: String,
    property: String,
    content: String,
    status: {
      type: String,
      default: 'Active'
    },
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

  Meta.getMetaForPage = function(page) {
    return new Promise(function(resolve, reject) {
      page.meta(null, function(error, pageMetas) {
        if (error) {
          return reject(error);
        }

        pageMetaProperties = [];
        pageMetas.forEach(function(pageMeta) {
          pageMetaProperties.push(pageMeta.property);
        });

        getMetaDefault().find({
          where: {
            property: {
              nin: pageMetaProperties
            }
          }
        }, function(error, metaDefaults) {
          if (error) {
            return reject(error);
          }

          resolve(pageMetas.concat(metaDefaults));
        });
      });
    });
  };

  loopbackPaginate.addPaginateFunction(Meta);
}

module.exports = {
  initialise: function(database) {
    initialiseSchema(database);
  },
  model: function() {
    return Meta;
  }
};

