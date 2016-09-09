(function() {

	'use strict';

	var app = angular.module('bnb', [
			'ui.router',
			'satellizer',
			'lumx',
			'AppControllers',
			'AppConfig',
			'AppServices',
			'AppFilters',
			'AppDirectives',
			'ngAnimate',
			'ngResource',
			'ngScrollbars',
			'chart.js'
		]);

	angular.module('AppControllers',[]);
	angular.module('AppDirectives',[]); /*er*/
	angular.module('AppServices',['ngResource']);
	angular.module('AppFilters',[]);

	app.config(function($stateProvider, $urlRouterProvider, $authProvider, $httpProvider, $provide, config, ChartJsProvider) {

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
			/* check */
			$provide.factory('redirectWhenLoggedOut', redirectWhenLoggedOut);
			$httpProvider.interceptors.push('redirectWhenLoggedOut');
			$authProvider.baseUrl = './';
			$authProvider.loginUrl = 'api/admin/authenticate';

			$urlRouterProvider.otherwise('/home');

			Chart.defaults.global.colors =  [ '#D9534F', '#F0AD4E', '#5CB85C', '#5BC0DE', '#FDB45C', '#949FB1', '#4D5360'];


		})

		.run(function($rootScope, $state,$auth,config, $window, AuthService) {

			  $rootScope.user = {};

			  $window.fbAsyncInit = function() {

			    FB.init({
			      appId: config.appId,
			      status: true,
			      cookie: true,
			      xfbml: true
			    });
			    AuthService.watchLoginChange();
				AuthService.sdkLoaded();

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

				console.log(toState);

				if($rootScope.authenticated){

					if(toState.name === 'login') {
						event.preventDefault();
						$state.go('home');
					}
				}else{
					if(toState.name !== 'login'){
						event.preventDefault();
						$state.go('login');
					}
				}

			});




		});
})();
