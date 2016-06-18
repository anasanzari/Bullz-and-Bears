(function() {

	'use strict';

	var app = angular.module('moments');
  app.config(function($stateProvider, $urlRouterProvider, $authProvider, $httpProvider, $provide, config) {

	  /*{ name: 'base', state: { abstract: true, url: '', templateUrl: 'views/base.html', data: {text: "Base", visible: false } } },
	  { name: 'login', state: { url: '/login', parent: 'base', templateUrl: 'views/login.html', controller: 'LoginCtrl', data: {text: "Login", visible: false } } },
	  { name: 'dashboard', state: { url: '/dashboard', parent: 'base', templateUrl: 'views/dashboard.html', controller: 'DashboardCtrl', data: {text: "Dashboard", visible: false } } },
	  { name: 'overview', state: { url: '/overview', parent: 'dashboard', templateUrl: 'views/dashboard/overview.html', data: {text: "Overview", visible: true } } },
	  { name: 'reports', state: { url: '/reports', parent: 'dashboard', templateUrl: 'views/dashboard/reports.html', data: {text: "Reports", visible: true } } },
	  { name: 'logout', state: { url: '/login', data: {text: "Logout", visible: true }} }*/

    $stateProvider
	  .state('app',{
		  abstract: true,
		  url: '',
		  templateUrl: './templates/base.html'
	  })
      .state('login', {
        url: '/login',
		parent: 'app',
        templateUrl: './templates/login.html',
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
        templateUrl: './templates/game/view.home.html',
        controller: 'HomeController'
      })
      .state('portfolio', {
        url: '/portfolio',
		parent: 'game',
        templateUrl: './templates/game/view.portfolio.html',
        controller: 'PortfolioController'
      })
      .state('trade', {
        url: '/trade',
		parent: 'game',
        templateUrl: './templates/game/view.trade.html',
        controller: 'TradeController'
      })
      .state('schedule', {
        url: '/schedule',
		parent: 'game',
        templateUrl: './templates/game/view.schedule.html',
        controller: 'ScheduleController'
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
      });

  });

})();
