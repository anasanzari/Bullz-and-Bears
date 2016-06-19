(function() {

  'use strict';

  var services = angular.module('AppServices');
  services.factory('RankingService',
    function($resource) {
      return $resource('./api/rankings/:type?page=:page', {}, {
        get: {
          method: 'GET',
          cache: false,
          isArray: false
        },
        load: {
          method: 'POST',
          params: {
            type: '@type',
            page: '@page'
          },
          cache: false,
          isArray: false
        }
      });
    });

})();
