(function() {

	'use strict';

  var services = angular.module('AppServices');

	services.factory('TradeService',
    function($resource){
        return $resource("./api/dotrade",{id:'@id'},
        {
            trade: {method:'POST',cache:false,isArray:false}
        });
    });


})();
