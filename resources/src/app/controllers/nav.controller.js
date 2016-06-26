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
				{name:'Portfolio', link: 'portfolio', img: 'mdi-account'},
				{name:'Trade', link: 'trade', img: 'mdi-rotate-3d'},
				{name:'Schedule', link: 'schedule', img: 'mdi-calendar-clock'},
				{name:'Look Up', link: 'lookup', img: 'mdi-magnify'},
				{name:'Market', link: 'market', img: 'mdi-chart-line'},
				{name:'Rankings', link: 'rankings', img: 'mdi-trophy'},
				{name:'Help', link: 'help', img: 'mdi-help-circle'}

		];

		$scope.navigate = function(loc){
				$location.path(loc);
		};

		$scope.logout = function() {

			AuthService.logout(function(){
				$state.go('login');
			});

        };

	});

})();
