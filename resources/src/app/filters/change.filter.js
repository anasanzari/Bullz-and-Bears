(function(){

  'use strict';
  var filters = angular.module('AppFilters');

  filters.filter('change',function($sce){
      return function(input,percent,money){
          var out = "";
          if(input>0){
              out+= '<span class="uparrow">&#8593 ';
          }else{
              out+= '<span class="downarrow">&#8595 ';
          }
          if(money){
             out+= ' &#8377 ';
          }
          out+=input;

          if(percent){
              out+='%</span>';
          }

          return $sce.trustAsHtml(out);
      };
  });


})();
