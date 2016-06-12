(function() {

  'use strict';

  var services = angular.module('AppServices');

  services.factory('ScheduleService', function($resource) {
    return $resource('./api/scheduled', {}, {
      get: {
        method: 'GET',
        params: {
          id: '@id'
        },
        cache: false,
        isArray: true
      },
      remove: {
        method: 'POST',
        cache: false,
        isArray: false,
        url: './api/cancelschedule'
      },
      add: {
        method: 'POST',
        url: './api/doschedule'
      }
    });
  });


})();
