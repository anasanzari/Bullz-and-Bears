(function() {

	'use strict';

	var x = 9;

	angular
		.module('moments', ['ui.router', 'satellizer','ui.materialize','AppControllers','AppConfig','AppServices'])
		.config(function($stateProvider, $urlRouterProvider, $authProvider, $httpProvider, $provide, config) {

			function redirectWhenLoggedOut($q, $injector) {
				return {
					responseError: function(rejection) {

						var $state = $injector.get('$state'); //can't inject state else circular dependency
						var rejectionReasons = ['token_not_provided', 'token_expired', 'token_absent', 'token_invalid'];
						angular.forEach(rejectionReasons, function(value, key) {
							if(rejection.data.error === value) {
								localStorage.removeItem('user');
								$state.go('auth');
							}
						});
						return $q.reject(rejection);
					}
				};
			}

			$provide.factory('redirectWhenLoggedOut', redirectWhenLoggedOut);
			$httpProvider.interceptors.push('redirectWhenLoggedOut');

			$authProvider.loginUrl = config.baseUrl + 'api/fbauthenticate';

			$urlRouterProvider.otherwise('/auth');

			$stateProvider
				.state('auth', {
					url: '/auth',
					templateUrl: './templates/authView.html',
					controller: 'AuthController'
				})
				.state('users', {
					url: '/users',
					templateUrl: './templates/userView.html',
					controller: 'UserController'
				});
		})

		.run(function($rootScope, $state,$auth, $window, AuthService) {

			  $rootScope.user = {};

			  $window.fbAsyncInit = function() {

			    FB.init({
			      appId: '882961331768341',
			      status: true,
			      cookie: true,
			      xfbml: true
			    });

			    AuthService.watchLoginChange();

			  };
	   	//sdk
			  (function(d){
			    var js,
			    id = 'facebook-jssdk',
			    ref = d.getElementsByTagName('script')[0];
			    if (d.getElementById(id)) {
			      return;
			    }
			    js = d.createElement('script');
			    js.id = id;
			    js.async = true;
			    js.src = "//connect.facebook.net/en_US/all.js";
			    ref.parentNode.insertBefore(js, ref);
			  }(document));

			$rootScope.$on('$stateChangeStart', function(event, toState) {

				console.log('stateChange:');
				var user = JSON.parse(localStorage.getItem('user'));
				console.log(user);

				if(user){

					$rootScope.authenticated = true;
					$rootScope.currentUser = user;

					if(toState.name === "auth") {

						event.preventDefault();
						//$state.go('users');

					}
				}

			});

		 	$rootScope.logout = function() {

				$auth.logout().then(function() {


					localStorage.removeItem('user');
					$rootScope.authenticated = false;
					$rootScope.currentUser = null;

				});
			};

		});
})();
