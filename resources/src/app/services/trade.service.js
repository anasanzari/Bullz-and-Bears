(function() {

	'use strict';

  var services = angular.module('AppServices');

	services.factory('TradeService',
    function($resource){
        return $resource("./api/dotrade",{},
        {
            trade: {method:'POST',cache:false,isArray:true}
        });
    });


})();
