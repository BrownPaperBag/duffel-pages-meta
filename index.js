module.exports = {
  initialise: require('./lib/initialise'),
  Meta: function() {
    return require('./lib/models/Meta').model();
  },
  MetaDefault: function() {
    return require('./lib/models/MetaDefault').model();
  }
};
