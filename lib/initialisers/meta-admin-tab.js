/* jshint esnext: true */

module.exports = function(app) {
  app.get('pagesAdminTabs').add({

    /** @required */
    title: 'Meta',

    /** @required */
    name: 'meta',

    /** @required */
    template: '/duffel-pages-meta/admin/partials/meta-admin-tab.nunjucks'
  });
};

