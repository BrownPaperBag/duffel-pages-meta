var Promise = require('bluebird');

var MetaDefault = null;

function initialiseSchema(database) {
  MetaDefault = database.connections.main.define('pages_meta_defaults', {
    name: {
      type: String,
      unique: true
    },
    property: {
      type: String,
      unique: true
    },
    content: {
      type: String
    },
    is_default: {
      type: Boolean,
      default: true
    },
    created: {
      type: Date,
      default: Date.now
    },
    updated: Date
  });

  MetaDefault.beforeSave = function preSave(next, data) {
    this.updated = new Date();
    next();
  };

  MetaDefault.OG = {
    TITLE: 'og:title',
    DESCRIPTION: 'og:description',
    IMAGE: 'og:image',
    URL: 'og:url'
  };

  var minimumDefaults = [
    MetaDefault.OG.TITLE,
    MetaDefault.OG.DESCRIPTION,
    MetaDefault.OG.IMAGE,
    MetaDefault.OG.URL
  ];

  MetaDefault.getMinimumDefaults = function() {
    return minimumDefaults;
  };

  MetaDefault.getContentFromPage = function(page, metaDefault, rootUrl) {
    switch (metaDefault.property) {

      case MetaDefault.OG.URL:
        return rootUrl + page.uri;

      case MetaDefault.OG.TITLE:
        return page.title;

    }

    return metaDefault.content;
  };

  MetaDefault.getDefaultMeta = function() {
    return new Promise(function(resolve, reject) {
      MetaDefault.find(function(error, metaDefaults) {
        if (error) {
          return reject(error);
        }

        metaDefaults.forEach(function(metaDefault) {
          var index = minimumDefaults.indexOf(metaDefault.property);
          if (index > -1) {
            minimumDefaults.splice(index, 1);
          }
        });

        if (!minimumDefaults.length) {
          return resolve(metaDefaults);
        }

        // Ensure minimum defaults are present
        Promise.map(minimumDefaults, function(minimumDefault) {
          return new Promise(function(minimumResolve, minimumReject) {
            MetaDefault.create({
              property: minimumDefault
            }, function(error, metaDefault) {
              if (error) {
                return minimumReject(error);
              }
              metaDefaults.push(metaDefault);
              minimumResolve(metaDefault);
            });
          });
        }).catch(function(error) {
          reject(error);
        }).finally(function() {
          resolve(metaDefaults);
        });
      });
    });
  };
}

module.exports = {
  initialise: function(database) {
    initialiseSchema(database);
  },
  model: function() {
    return MetaDefault;
  }
};


