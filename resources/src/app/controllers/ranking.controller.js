(function() {

  'use strict';
  var controllers = angular.module('AppControllers');

  controllers.controller('RankingController',
      function RankingCtrl($scope,$location,RankingService){

        $scope.ranking = {};
        var dailypage, weeklypage, overallpage;
        dailypage = weeklypage = overallpage = 1;

	  	RankingService.load({type:'daily',page:dailypage},function(response){
            console.log(response);
            $scope.daily = response.data;
        },function(err){
            console.log(err);
        });

        /* if(!FacebookService.getIsLoggedIn()){
              $location.path('/');
          }

          RankingService.updateRankings();
          $scope.rankings = RankingService.rankings;

          $scope.loadMoreData = function (val){

              RankingService.loadMore(val);
          }

          $scope.data = {
              selectedIndex: 0,
              secondLocked:  true,
              secondLabel:   "Item Two",
              bottom:        false
          };*/


      }
  );



})();
