(function() {

	'use strict';

  var app = angular.module('bnb');
  app.config(function($stateProvider, $urlRouterProvider, $authProvider, $httpProvider, $provide, config) {

    $stateProvider
	  .state('app',{
		  abstract: true,
		  url: '',
		  templateUrl: './templates/base.html'
	  })
      .state('login', {
        url: '/login',
		parent: 'app',
        templateUrl: './templates/admin/admin_login.html',
        controller: 'AuthController'
      })
	  .state('game',{
		  url: '',
		  abstract: true,
		  parent: 'app',
		  templateUrl: './templates/dashboard.html',
		  controller: 'NavController'
	  })
      .state('home', {
        url: '/home',
		parent: 'game',
        templateUrl: './templates/admin/admin_home.html',
        controller: 'HomeController'
	})
      .state('stocks', {
        url: '/stocks',
		parent: 'game',
        templateUrl: './templates/admin/admin_stocks.html',
        controller: 'StocksController'
	})
      .state('users', {
        url: '/users',
		parent: 'game',
        templateUrl: './templates/admin/admin_users.html',
        controller: 'UserController'
	});
      /*.state('schedule', {
        url: '/schedule',
		parent: 'game',
        templateUrl: './templates/game/view.schedule.html',
        controller: 'ScheduleController'
      })
	  .state('scheduled', {
        url: '/scheduled',
		parent: 'game',
        templateUrl: './templates/game/view.scheduled.html',
        controller: 'ScheduledController'
      })
      .state('lookup', {
        url: '/lookup',
		parent: 'game',
        templateUrl: './templates/game/view.lookup.html',
        controller: 'LookUpController'
      })
      .state('market', {
        url: '/market',
		parent: 'game',
        templateUrl: './templates/game/view.market.html',
        controller: 'MarketController'
      })
      .state('rankings', {
        url: '/rankings',
		parent: 'game',
        templateUrl: './templates/game/view.ranking.html',
        controller: 'RankingController'
      })
      .state('help', {
        url: '/help',
		parent: 'game',
        templateUrl: './templates/game/view.help.html',
        controller: 'HelpController'
	});*/

  });

})();
