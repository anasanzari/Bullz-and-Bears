(function() {

	'use strict';

  var services = angular.module('AppServices');

	services.factory('StockUtils',
    function(StockService, $timeout){
        var timer;
        var callback;

        var update = function(){
            console.log('keepOnUpdating');
            StockService.getStocks(function(data){
              callback(data);
            },function(err){
              console.log(err);
            });
            timer = $timeout(update,10000); //call every 2 seconds
        };

        var keepOnUpdating = function(cb){
            callback = cb;
            update();
        };
        var cancel = function(){
            $timeout.cancel(timer);
        };

        return {
            keepOnUpdating: keepOnUpdating,
            cancel: cancel
        };

    });


})();
