angular.module('metaTypes', ['ngResource'])
.factory('MetaTypes', [
  function() {

  var types = [
    {
      name: 'og:title',
      hasDefault: true,
      type: 'String'
    },
    {
      name: 'og:description',
      hasDefault: true,
      type: 'String'
    },
    {
      name: 'og:image',
      hasDefault: true,
      type: 'File'
    }
  ];

  return types;
}]);


