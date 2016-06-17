(function() {

  'use strict';
  var controllers = angular.module('AppControllers');

  controllers.controller('LookUpController',
      function($scope,StockUtils,$location) {

		  StockUtils.keepOnUpdating(function(data){
	          console.log(data);
	          $scope.stocks = data;
	          $scope.filteredStocks = stocksFilter($scope.stocks,$scope.selectedTradeOption.option);
	      });
	      
	      $scope.$on('$destroy', function() {
	          StockUtils.cancel(); //kill the timer.
	      });

      });

})();
