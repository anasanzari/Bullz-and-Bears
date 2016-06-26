(function()
{
    'use strict';

    angular
        .module('AppDirectives')
        .directive('loadingButton', function(){
            return {
                restrict: 'AEC',
                scope:{
                    isLoading: '=',
                    disableCriteria: '=',
                    lxType : '@',
                    lxSize : '@',
                    lxDiameter : '@',
                    value : '@'
                },
                link: function(scope, element, attr) {

                },
                templateUrl: './templates/directives/loadingbutton.html'
            };
        });

})();
