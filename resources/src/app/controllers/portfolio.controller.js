(function() {

  'use strict';
  var controllers = angular.module('AppControllers');

  controllers.controller('PortfolioController',
    function($scope, $location, PortfolioService,ScrollBarUtils) {

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

      $scope.scrollconfig = ScrollBarUtils.getConfig('70vh');

      var historypage = 1;
      $scope.history = [];
      $scope.historyconfig = ScrollBarUtils.getCallBackConfig('70vh',function(){
          console.log('callback');
          load();
      });
      var load = function(){
          PortfolioService.getHistory({page:historypage},function(response){
            console.log(response);
            $scope.history = $scope.history.concat(response.data);
            if(response.data.length>0){
                historypage++;
            }
          },function(err){
            console.log(err);
          });
      };
      load();



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
