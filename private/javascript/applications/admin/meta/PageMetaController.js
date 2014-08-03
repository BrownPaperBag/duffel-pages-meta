(function() {
  'use strict';

  angular.module('admin-page-meta.controllers')
  .controller('PageMetaController', [
    '$scope', '$resource', 'ngTableParams', 'Meta',
    function IndexController($scope, $resource, ngTableParams, Meta) {

      var Request = $resource('/duffel-requests/api/requests/:id', {}, {
        query: {
          isArray: false
        }
      });

      $scope.blockingPromises = null;
      $scope.adminPageMetaTableParams = new ngTableParams({
        page: 1,
        count: 10,
        sorting: {
          name: 'asc'
        }
      }, {
        total: 0,
        getData: function($defer, params) {
          var query = params.url();
          query.page_id = $scope.page_id;
          console.log(query);
          $scope.blockingPromises = Meta.query(query, function(data) {
            params.total(data.total);
            $defer.resolve(data.result);
          });
        }
      });
    }
  ]);
})();
