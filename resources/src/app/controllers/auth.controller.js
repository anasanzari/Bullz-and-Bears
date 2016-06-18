(function() {

  'use strict';
  var controllers = angular.module('AppControllers');

  controllers.controller('AuthController', function($scope, $timeout, $auth, $state, $http, $rootScope, AuthService) {

      $scope.loading = true;

      if(AuthService.getIsLoggedOut()){
          //came here by logging out.
          $scope.loading = false;
      }

      $scope.$on('onSdkLoad',function(){
          AuthService.getLoginStatus(function(data){

              if(!data.status){
                  console.log(data);
                  $scope.loading = false;
                  $scope.$apply();
              }
          });
      });

      $scope.$on('onLoginComplete',function(e,args) {
          $state.go('home');
      });


      $scope.login = function() {
          AuthService.login(function(){
              //event would take care of flow.
          });
      };

  });

})();
