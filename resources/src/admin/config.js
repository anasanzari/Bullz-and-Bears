(function() {

	'use strict';

  var config = angular.module('AppConfig',[]);
  config.constant('config',{
	states : [
			'ACTIVE',
			'NOT_LAUNCHED_YET',
			'BACKEND_IN_PROGRESS',
			'GAME_ENDED'
	],
	appId: '882961331768341' //'551333468325789',
  });

})();
