module.exports = function(app) {
  var collector = app.get('visor');
  collector.add('Settings', {
    name: 'Settings',
    permission: 'view-settings',
    children: [
      {
        name: 'Meta',
        permission: 'view-meta',
        uri: '/meta/admin'
      }
    ]
  });
};

