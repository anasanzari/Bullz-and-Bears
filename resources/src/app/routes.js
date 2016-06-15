(function() {

	'use strict';

	var app = angular.module('moments');
  app.config(function($stateProvider, $urlRouterProvider, $authProvider, $httpProvider, $provide, config) {

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
      })
      .state('home', {
        url: '/home',
        templateUrl: './templates/view.home.html',
        controller: 'HomeController'
      })
      .state('portfolio', {
        url: '/portfolio',
        templateUrl: './templates/view.portfolio.html',
        controller: 'PortfolioController'
      })
      .state('trade', {
        url: '/trade',
        templateUrl: './templates/view.trade.html',
        controller: 'TradeController'
      })
      .state('schedule', {
        url: '/schedule',
        templateUrl: './templates/view.schedule.html',
        controller: 'ScheduleController'
      })
      .state('lookup', {
        url: '/lookup',
        templateUrl: './templates/view.lookup.html',
        controller: 'LookUpController'
      })
      .state('market', {
        url: '/market',
        templateUrl: './templates/view.market.html',
        controller: 'MarketController'
      })
      .state('rankings', {
        url: '/rankings',
        templateUrl: './templates/view.ranking.html',
        controller: 'RankingController'
      })
      .state('help', {
        url: '/help',
        templateUrl: './templates/view.help.html',
        controller: 'HelpController'
      });

  });

})();
