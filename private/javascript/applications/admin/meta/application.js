(function() {
  'use strict';

  angular.module('admin-page-meta', [
    'meta', 'metaTypes',
    'ui.bootstrap',
    'admin-page-meta.controllers',
    'ngTable', 'cgBusy'
  ]);

  angular.module('admin-page-meta').value('cgBusyDefaults',{
      message: 'Please wait...',
      templateUrl: '/bower/angular-busy/angular-busy.html',
      minDuration: 700
  });

})();
