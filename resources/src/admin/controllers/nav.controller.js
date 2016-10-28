(function() {

	'use strict';

	var controllers = angular.module('AppControllers');

	controllers.controller('NavController', function($scope, $timeout, $auth, AuthService, $state, $http, $rootScope){

		$scope.isOpen = true;
		$scope.toggle = function(){
			$scope.isOpen = !$scope.isOpen;
			//animation is for .6s
			$timeout(function () {
                    window.dispatchEvent(new Event('resize'));
            }, 700);
		};

		$scope.go = function(item){
			console.log(item);
			$state.go(item.link);
			$scope.toggle();
		};

		$scope.menu = [
				{name:'Home', link: 'home', img: 'mdi-home'},
				{name:'Stocks', link: 'stocks', img: 'mdi-account'},
				{name:'Leaderboard', link: 'users', img: 'mdi-rotate-3d'}

		];

		$scope.navigate = function(loc){
				$location.path(loc);
		};

		$scope.logout = function() {

			AuthService.logout(function(){
				$state.go('login');
			});

        };

		$scope.share = function(){
			FB.ui({
			 method: 'share',
			 href: 'http://bullsnbears.tathva.org'
			 }, function(response){});
		};

	});

})();
