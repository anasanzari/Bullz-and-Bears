(function() {

  'use strict';
  var controllers = angular.module('AppControllers');
  controllers.controller('HomeController',
    function($scope, $location, AdminService, config,LxDialogService) {
      var overview = new AdminService();
      overview.$getOverview(function(data) {
          $scope.overview = data;
          console.log(data);
        },
        function(err) {
          console.log(err);
        }
      );

      $scope.states = config.states;
      $scope.confirmDialog = {id:'confirm'};

      $scope.openConfirm = function(){
          LxDialogService.open($scope.confirmDialog.id);
      };
      $scope.changeState = function(){

          var data = {
              state : $scope.currentstate
          };

          AdminService.putState(data,function(response){
              console.log(response);
              LxDialogService.close($scope.confirmDialog.id);
              $scope.app = response;
          },function(err){
              console.log(err);
          });
      };

      var update = function(){
          AdminService.getState(function(res){
              $scope.app = res;
              console.log(res);
          },function(res){
              console.log(res);
          });
      };
      update();



    });
})();
