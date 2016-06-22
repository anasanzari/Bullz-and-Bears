(function() {

  'use strict';

  var services = angular.module('AppServices');

  services.factory('ChartService', function($resource) {
    return $resource('./api/charts/:type', {}, {
      fetch: {
        params:{
            type:'@type'
        },
        method: 'POST',
        cache: false,
        isArray: false
       },
       stats:{
           url: './api/stats/:type',
           params: {
               type: '@type'
           },
           method: 'POST',
           cache: false,
           isArray: false
       }
    });
  });


})();
