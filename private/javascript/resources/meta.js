angular.module('meta', ['ngResource'])
  .factory('Meta', [
    '$resource', '$http',
    function($resource, $http) {

    return $resource('/duffel-pages-meta/api/meta/:id:command', {
      id : '@id'
    }, {
      query: { method: 'GET' },
      save: { method: 'PUT' },
      create: { method: 'POST' },
      destroy: { method: 'DELETE' }
    });
}]);

