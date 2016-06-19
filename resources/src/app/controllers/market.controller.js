(function() {

  'use strict';
  var controllers = angular.module('AppControllers');

  controllers.controller('MarketController',
      function ($scope,StockUtils) {

	  StockUtils.keepOnUpdating(function(data){
          console.log(data);
          $scope.stocks = data;
      });

      $scope.state = {};

      $scope.$on('$destroy', function() {
          StockUtils.cancel(); //kill the timer.
      });

      $scope.scrollconfig = {
            autoHideScrollbar: false,
            theme: 'light',
            advanced:{
                updateOnContentResize: true
            },
            setHeight: '60vh',
            scrollInertia: 500,
            mouseWheel:{
                scrollAmount: 250
            }

      };

  });



})();
