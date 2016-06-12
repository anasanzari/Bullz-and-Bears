(function() {

	'use strict';

	var controllers = angular.module('AppControllers');

	controllers.controller('NavController', function($scope){
		$scope.isOpen = true;
		$scope.toggle = function(){
			$scope.isOpen = !$scope.isOpen;
			console.log('click');
		};

		$scope.menu = [
				{name:'Home', link: 'home', img: 'mdi-home'},
				{name:'Portfolio', link: 'portfolio', img: 'mdi-account'},
				{name:'Trade', link: 'trade', img: 'mdi-rotate-3d'},
				{name:'Schedule', link: 'schedule', img: 'mdi-calendar-clock'},
				{name:'Look Up', link: 'lookup', img: 'mdi-magnify'},
				{name:'Market', link: 'market', img: 'mdi-chart-line'},
				{name:'Rankings', link: 'rankings', img: 'mdi-trophy'},
				{name:'Help', link: 'help', img: 'mdi-help-circle'},
				{name:'LogOut', link: 'logout', img: 'mdi-logout'}
		];

		$scope.navigate = function(loc){
				if(loc=='logout'){
						FacebookService.logout();
						return;
				}
				$location.path(loc);
		};

	});

})();
