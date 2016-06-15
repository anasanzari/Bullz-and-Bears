(function() {

  'use strict';
  var controllers = angular.module('AppControllers');

  controllers.controller('PortfolioController',
    function($scope, $location, PortfolioService) {

      PortfolioService.getBought(function(data){
        console.log(data);
        $scope.bought = data;
      },function(err){
        console.log(err);
      });

      PortfolioService.getShorted(function(data){
        console.log(data);
        $scope.shorted = data;
      },function(err){
        console.log(err);
      });

      PortfolioService.getHistory(function(response){
        console.log(response.data);
        $scope.history = response.data; /*c*/
      },function(err){
        console.log(err);
      });



      /*var player = new PlayerService();
      player.$get(function(data) {
          $scope.player = data;
          console.log(data);
        },
        function(err) {
          console.log(err);
        }
      );*/

    /*  $scope.bought = PortfolioService.bought;
      $scope.shorted = PortfolioService.shorted;
      $scope.history = PortfolioService.history;*/

      $scope.navigateTo = function() {
        $location.path('/trade');
      };

      /*$scope.loadMoreData = function(val) {
        PortfolioService.loadMoreHistory(FacebookService.user.id);
      }*/
    }

  );

})();
