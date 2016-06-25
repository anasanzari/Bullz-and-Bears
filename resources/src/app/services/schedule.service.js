(function() {

  'use strict';

  var services = angular.module('AppServices');

  services.factory('ScheduleService', function($resource) {
    return $resource('./api/scheduled', {}, {
      get: {
        method: 'POST',
        cache: false,
        isArray: true
      },
      remove: {
        method: 'POST',
        cache: false,
        isArray: true,
        url: './api/cancelschedule'
      },
      add: {
        method: 'POST',
        url: './api/doschedule'
      }
    });
  });


})();
