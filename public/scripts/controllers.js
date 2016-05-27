(function() {

	'use strict';

	var controllers = angular.module('AppControllers',[]);

	/*** Auth Controller **/
	controllers.controller('AuthController', function($scope, $auth, $state,$http,$routeScope) {

		$scope.login = function() {

			var credentials = {
				email: $scope.email,
				password: $scope.password
			}

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
		}

	});

	/** Users Controller **/

	controllers.controller('UserController',function($scope,$http) {

		$scope.getUsers = function() {
			$http.get('api/authenticate').success(function(users) {
				$scope.users = users;
			}).error(function(error) {
				$scope.error = error;
			});
		}
	});



})();
