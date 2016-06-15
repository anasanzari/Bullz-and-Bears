(function() {

  'use strict';

  var services = angular.module('AppServices');

  services.factory('StockService', function($resource) {
    return $resource("./api/stocks", {}, {
      getStocks: {
        method: 'POST',
        cache: false,
        isArray: true
      }
    });
  });


})();
