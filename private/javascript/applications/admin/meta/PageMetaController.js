(function() {
  'use strict';

  angular.module('admin-page-meta.controllers')
  .controller('PageMetaController', [
    '$scope', '$resource', 'ngTableParams', 'Meta', 'MetaTypes',
    function IndexController($scope, $resource, NgTableParams, Meta, MetaTypes) {

      var Request = $resource('/duffel-requests/api/requests/:id', {}, {
        query: {
          isArray: false
        }
      });

      $scope.blockingPromises = [];
      $scope.adminPageMetaTableParams = new NgTableParams({
        page: 1,
        count: 10,
        sorting: {
          name: 'asc'
        }
      }, {
        total: 0,
        getData: function($defer, params) {
          $scope.blockingPromises.push(Meta.query($.extend({}, params.url(), {
            page_id: $scope.page_id
          }), function(data) {
            params.total(data.total);
            $defer.resolve(data.result);
          }));
        }
      });

      $scope.metaTypes = MetaTypes;
      $scope.addMeta = function() {
        $scope.adminPageMetaTableParams.data.unshift({
          name: '',
          property: '',
          content: '',
          editing: true,
          new: true
        });
      };

      $scope.propertySelected = function($item, $model, $label, meta) {
        meta.property = $item.name;
      };

      $scope.metaPropertyHasDefault = function(meta) {
        if (!meta.property) {
          return false;
        }
        var hasDefault = false;
        $scope.metaTypes.forEach(function(metaType) {
          if (metaType.name !== meta.property) {
            return;
          }
          hasDefault = metaType.hasDefault;
        });

        return hasDefault;
      };

      $scope.deleteMeta = function(meta, index) {
        $scope.adminPageMetaTableParams.data.splice(index, 1);

        meta.editing = false;
        if (meta.new) {
          return;
        }

        (new Meta(meta)).$destroy();
      };

      $scope.saveMeta = function(meta, index) {
        meta.editing = false;
        meta.page_id = $scope.page_id;
        $scope.blockingPromises.push((new Meta(meta)).$save({}, function() {
          $scope.adminPageMetaTableParams.reload();
        }));
      };
    }
  ]);
})();
