(function() {

  'use strict';

  var services = angular.module('AppServices');

  services.factory('AdminService', function($resource) {
    return $resource('./admin', {}, {
      getStocks: {
        method: 'POST',
        cache: false,
        isArray: true,
        url : './api/admin/stocks'
      },
      editStock: {
        method: 'POST',
        isArray: true,
        url: './api/admin/stocks/edit'
    },
    deleteStock: {
      method: 'POST',
      isArray: false,
      url: './api/admin/stocks/delete'
    },
     getUsers: {
        method: 'POST',
        cache: false,
        isArray: true,
        url: './api/admin/users'
    },
     getOverview: {
        method: 'POST',
        url: './api/admin/overview'
    },
    getState: {
      method: 'POST',
      url: './api/admin/state'
  },
  putState: {
    method: 'POST',
    url: './api/admin/state/edit'
  }
    });
  });


})();
