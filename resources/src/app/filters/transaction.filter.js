(function(){

  'use strict';
  var filters = angular.module('AppFilters');

  filters.filter('transactionFilter',function($sce){
      return function(input){
          var out = "";
          switch(input){
              case "B":out="Buy";break;
              case "S":out="Sell";break;
              case "SS":out="Short Sell";break;
              case "C":out="Cover";break;
              default :out=input;break;
          }

          return out;
      };
  });


})();
