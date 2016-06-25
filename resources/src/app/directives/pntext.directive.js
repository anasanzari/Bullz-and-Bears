(function()
{
    'use strict';

    angular
        .module('AppDirectives')
        .directive('pnText', function(){
            return {
                restrict: 'AEC',
                scope:{
                    value: '=',
                    isPercent: '=',
                    isCurrency: '='
                },
                template: '<span ng-class="{red:value<0,green:value>=0}">'+
                          '{{value>0? \' &#8593 \' : \' &#8595 \' }}'+
                          '{{isCurrency? \'&#8377\' : \'\'}}'+
                          '{{value}}'+
                         '{{isPercent?\'%\':\'\'}}'+
                         '</span>'
            };
        });

})();
