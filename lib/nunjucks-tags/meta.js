/* jshint supernew: true */
var Meta = require('duffel-pages-meta').Meta(),
  MetaDefault = require('duffel-pages-meta').MetaDefault(),
  DOMBuilder = require('DOMBuilder');

module.exports = function(app) {
  return new function() {
    this.tags = ['meta'];

    this.parse = function(parser, nodes) {
      var tok = parser.nextToken();
      var args = parser.parseSignature(null, true);
      parser.advanceAfterBlockEnd(tok.value);

      var body = parser.parseUntilBlocks('endmeta');
      parser.advanceAfterBlockEnd();

      return new nodes.CallExtensionAsync(this, 'run', args, [body]);
    };

    this.run = function(context, options, body, callback) {
      body(function(error, html) {
        if (error) throw error;
        if (!options.page) {
          return callback(null, '');
        }

        Meta.getMetaForPage(options.page).then(function(metas) {
          var metaHtml = metas.map(function(meta) {
            var attributes = {};

            if (meta.property) {
              attributes.property = meta.property;
            }
            if (meta.name) {
              attributes.name = meta.name;
            }

            if (meta.is_default) {
              attributes.content = meta.content || MetaDefault.getContentFromPage(options.page, meta, app.get('rootUrl'));
            } else {
              attributes.content = meta.content;
            }

            Object.keys(attributes).forEach(function(attributeName) {
              if (typeof attributes[attributeName] == 'undefined') {
                delete attributes[attributeName];
              }
            });

            return DOMBuilder.build([
              'meta', attributes, DOMBuilder.html.markSafe(html)
            ], 'html').toString();
          });
          callback(null, metaHtml.join('\n'));
        }, function(error) {
          throw error;
        });
      });
    };
  };
};


