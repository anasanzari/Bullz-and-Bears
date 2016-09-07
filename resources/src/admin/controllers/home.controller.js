(function() {

  'use strict';
  var controllers = angular.module('AppControllers');
  controllers.controller('HomeController',
    function($scope, PlayerService, $location,ChartService) {
      var player = new PlayerService();
      player.$get(function(data) {
          $scope.player = data;
          console.log(data);
        },
        function(err) {
          console.log(err);
        }
      );

      
      ChartService.fetch({type:'overall'},function(response){
         $scope.labels = response.dates;
         $scope.series = ['Open','High','Low'];
         $scope.data = [
           response.open,
           response.high,
           response.low
         ];
         console.log(response);
      },function(err) {
          console.log(err);
      });


    });
})();
