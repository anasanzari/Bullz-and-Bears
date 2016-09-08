(function() {

  'use strict';
  var controllers = angular.module('AppControllers');
  controllers.controller('UserController',
    function($scope, $location, AdminService,LxDialogService) {

      AdminService.getUsers(function(data) {
          $scope.users = data;
          console.log(data);
        },
        function(err) {
          console.log(err);
        }
      );

      $scope.userDialog = {id:'users'};

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

    });
})();
