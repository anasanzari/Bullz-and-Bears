(function() {

  'use strict';

  var services = angular.module('AppServices');
  services.factory('PortfolioService',
    function($resource) {
      return $resource('./api/:type', {}, {
        getBought: {
          method: 'POST',
          params: {
            type: 'bought'
          },
          cache: false,
          isArray: true
        },
        getShorted: {
          method: 'POST',
          params: {
            type: 'shorted'
          },
          cache: false,
          isArray: true
        },
        getHistory: {
          method: 'POST',
          params: {
            type: 'history'
          },
          cache: false,
          isArray: true
        }


      });

    });


})();
