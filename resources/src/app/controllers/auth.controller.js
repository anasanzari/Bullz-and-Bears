(function() {

  'use strict';
  var controllers = angular.module('AppControllers');

  controllers.controller('AuthController', function($scope, $auth, $state, $http, $rootScope) {

	  $rootScope.authView = true;
      console.log('Auth');
      console.log($rootScope.authView);
	  
	  $scope.login = function() {

      var credentials = {
        email: $scope.email,
        password: $scope.password
      };
      
      $auth.login(credentials).then(function(data) {
        console.log(data);
        return $http.get('api/authenticate/user');

      }, function(error) {

        $scope.loginError = true;
        $scope.loginErrorText = error.data.error;

      }).then(function(response) {

        var user = JSON.stringify(response.data.user);

        localStorage.setItem('user', user);

        $rootScope.authenticated = true;
        $rootScope.currentUser = response.data.user;
        $state.go('users');

      });
    };
  });

})();
