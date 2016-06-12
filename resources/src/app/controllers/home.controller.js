(function() {

  'use strict';
  var controllers = angular.module('AppControllers');
  controllers.controller('HomeController',
    function($scope, PlayerService, $location) {
      var player = new PlayerService();
      player.$get(function(data) {
          $scope.player = data;
          console.log(data);
        },
        function(err) {
          console.log(err);
        }
      );


    });
})();
