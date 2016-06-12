(function() {

	'use strict';

	var controllers = angular.module('AppControllers');

	controllers.controller('UserController',function($scope,$http) {

		$scope.getUsers = function() {
			$http.get('api/authenticate').success(function(users) {
				$scope.users = users;
			}).error(function(error) {
				$scope.error = error;
			});
		};
	});

})();
