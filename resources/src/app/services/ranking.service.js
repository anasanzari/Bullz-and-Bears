(function() {

  'use strict';

  var services = angular.module('AppServices');
  services.factory('RankingService',
    function($resource) {
      return $resource('./api/rankings/:type', {}, {
        get: {
          method: 'GET',
          cache: false,
          isArray: false
        },
        loadmore: {
          method: 'GET',
          params: {
            type: '@type',
            page: '@page'
          },
          cache: false,
          isArray: true
        }
      });
    });

})();
