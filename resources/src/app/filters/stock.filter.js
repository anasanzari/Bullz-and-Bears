(function(){

  'use strict';
  var filters = angular.module('AppFilters');

  filters.filter('stocks',function($sce){
      return function(input,option){
          var i,output = [];
          if(!option){
              return input;
          }
          if(option==='Buy'){
              for (i = 0; i < input.length; i++) {
                  if(input[i].max_buy && input[i].max_buy !== 0){
                    output.push(input[i]);
                  }
              }
              console.log(option);
          }

          if(option==='Sell'){
              for (i = 0; i < input.length; i++) {
                  if(input[i].bought_amount && input[i].bought_amount!== 0){
                    output.push(input[i]);
                  }
              }
              console.log(option);
          }

          if(option==='Short Sell'){
              for (i = 0; i < input.length; i++) {

                  if(input[i].max_short && input[i].max_short !== 0){
                    output.push(input[i]);
                  }
              }

          }

          if(option==='Cover'){
              for (i = 0; i < input.length; i++) {
                  if(input[i].shorted_amount && input[i].shorted_amount !== 0){
                    output.push(input[i]);
                  }
              }
              console.log(option);
          }

          return output;
      };
  });


})();
