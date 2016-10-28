(function() {

  'use strict';

  var services = angular.module('AppServices');
  services.factory('ScrollBarUtils',
    function() {

        var getConfig = function(height){
            return {
                  autoHideScrollbar: false,
                  theme: 'light',
                  advanced:{
                      updateOnContentResize: true
                  },
                  setHeight: height,
                  scrollInertia: 500,
                  mouseWheel:{
                      scrollAmount: 250
                  }
            };
        };


        var getCallBackConfig = function(height,callback){
            return {
                  autoHideScrollbar: false,
                  theme: 'light',
                  advanced:{
                      updateOnContentResize: true
                  },
                  setHeight: height,
                  scrollInertia: 500,
                  mouseWheel:{
                      scrollAmount: 250
                  },
                  callbacks:{
                    onTotalScroll: callback
                  }
            };
        };

        return {
            getCallBackConfig: getCallBackConfig,
            getConfig: getConfig
        };

    });

})();
