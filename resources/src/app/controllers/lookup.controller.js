(function() {

  'use strict';
  var controllers = angular.module('AppControllers');

  controllers.controller('LookUpController',
      function($scope,StockUtils,$location,ChartService) {

		  StockUtils.keepOnUpdating(function(data){
	          console.log(data);
	          $scope.stocks = data;
	      });

	      $scope.$on('$destroy', function() {
	          StockUtils.cancel(); //kill the timer.
	      });
          $scope.not_available = false;
          $scope.changeStock = function(){
              $scope.not_available = false;
              ChartService.fetch({type:$scope.selectedStock.symbol},function(response){
                 $scope.labels = response.dates;
                 $scope.series = ['Open','High','Low'];
                 $scope.data = [
                   response.open,
                   response.high,
                   response.low
                 ];
                 console.log(response);
              },function(err) {
                  $scope.not_available = true;
                  console.log(err);
              });
          };



      });

})();
