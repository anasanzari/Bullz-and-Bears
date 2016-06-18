(function() {

	'use strict';

  var config = angular.module('AppConfig',[]);
  config.constant('config',{
	sell: 'Sell',
	buy: 'Buy',
	short_sell : 'Short Sell',
	cover: 'Cover'
  });

})();
