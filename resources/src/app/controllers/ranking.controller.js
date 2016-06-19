(function() {

  'use strict';
  var controllers = angular.module('AppControllers');

  controllers.controller('RankingController',
      function RankingCtrl($scope,$location,RankingService, ScrollBarUtils){

        $scope.ranking = {};
        var dailypage, weeklypage, overallpage;
        dailypage = weeklypage = overallpage = 1;

        $scope.dailyconfig = ScrollBarUtils.getCallBackConfig('70vh',function(){
            load('daily',dailypage,function(response){
                console.log('daily total');
                $scope.daily = $scope.daily.concat(response.data);
                if(response.data.length>0){
                    dailypage++;
                }
            });
        });

        $scope.weeklyconfig = ScrollBarUtils.getCallBackConfig('70vh',function(){
            load('weekly',weeklypage,function(response){
                $scope.weekly = $scope.weekly.concat(response.data);
                if(response.data.length>0){
                    weeklypage++;
                }
            });
        });

        $scope.overallconfig = ScrollBarUtils.getCallBackConfig('70vh',function(){
            load('overall',overallpage,function(response){
                $scope.overall = $scope.overall.concat(response.data);
                if(response.data.length>0){
                    overallpage++;
                }
            });
        });

        var load = function(type, page, cb){
            RankingService.load({type:type,page:page},function(response){
                console.log(response);
                cb(response);
            },function(err){
                console.log(err);
            });
        };

        load('daily',dailypage,function(response){
            $scope.daily = response.data;
            dailypage++;
        });

        load('weekly',weeklypage,function(response){
            $scope.weekly = response.data;
            weeklypage++;
        });

        load('overall',overallpage,function(response){
            $scope.overall = response.data;
            overallpage++;
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
