(function() {

  'use strict';
  var controllers = angular.module('AppControllers');
  controllers.controller('UserController',
    function($scope, $location, AdminService,LxDialogService,RankingService,ScrollBarUtils) {

     /* AdminService.getUsers(function(data) {
          $scope.users = data;
          console.log(data);
        },
        function(err) {
          console.log(err);
        }
    );*/

      $scope.userDialog = {id:'users'};
      $scope.ranking = {};
      var overallpage = 1;

      $scope.openPlayer = function(player){
          $scope.player = player;
          LxDialogService.open($scope.userDialog.id);
      };

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

      load('overall',overallpage,function(response){
          $scope.overall = response.data;
          overallpage++;
      });


    });
})();
