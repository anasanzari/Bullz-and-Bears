(function() {

  'use strict';
  var controllers = angular.module('AppControllers');

  controllers.controller('LookUpController',
      function($scope,StockService,FacebookService,$location) {

          if(!FacebookService.getIsLoggedIn()){
              $location.path('/');
          }
          StockService.updateStocks(FacebookService.user.id);
          $scope.stocks = StockService.stocks;

      });



})();
