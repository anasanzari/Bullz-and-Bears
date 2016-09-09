(function() {

	'use strict';

  var config = angular.module('AppConfig',[]);
  config.constant('config',{
	sell: 'Sell',
	buy: 'Buy',
	short_sell : 'Short Sell',
	cover: 'Cover',
	pieColors: [ '#545588', '#536491', '#678FA9', '#86C1BF', '#FDB45C', '#949FB1', '#4D5360'],
	appId:  '882961331768341' //'551333468325789' !
  });

})();
