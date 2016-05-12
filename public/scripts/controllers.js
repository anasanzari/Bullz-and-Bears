(function() {

	'use strict';

	var controllers = angular.module('AppControllers',[]);

	/*** Auth Controller **/
	controllers.controller('AuthController', function($scope, $auth, $state) {

		$scope.login = function() {

			var credentials = {
				email: $scope.email,
				password: $scope.password
			}

			// Use Satellizer's $auth service to login
			$auth.login(credentials).then(function(data) {
				//login successful
				$state.go('users');
			}, function(error) {
				console.log(error);
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
