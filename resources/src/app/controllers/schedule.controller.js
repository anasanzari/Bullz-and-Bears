(function() {

  'use strict';
  var controllers = angular.module('AppControllers');

  controllers.controller('ScheduleController',
      function($scope,config, $location,StockUtils,ScheduleService,stocksFilter,LxNotificationService,ChartService) {


      $scope.total = 0;
      $scope.state = {}; // inputs

      StockUtils.keepOnUpdating(function(data){
          console.log(data);
          $scope.stocks = data;
          if($scope.selectedTradeOption){
              $scope.filteredStocks = stocksFilter($scope.stocks,$scope.selectedTradeOption.option);
          }
      });

      $scope.$on('$destroy', function() {
          StockUtils.cancel(); //kill the timer.
      });

      $scope.options = [{
        option: config.buy
      },{
        option: config.sell
      },{
        option: config.short_sell
      },{
        option: config.cover
      }];

      $scope.typeChange = function(){
          console.log('Type Change');
          $scope.noStocks = true;
          $scope.selectedStock = null;
          $scope.filteredStocks = stocksFilter($scope.stocks,$scope.selectedTradeOption.option);
          console.log($scope.filteredStocks);
      };

      $scope.changeStock = function(){

         if(!$scope.selectedStock) return;
         switch($scope.selectedTradeOption.option){
              case config.buy: $scope.maxAmount = $scope.selectedStock.max_buy;
                          break;
              case config.short_sell: $scope.maxAmount = $scope.selectedStock.max_short;
                           break;
              case config.cover: $scope.maxAmount = $scope.selectedStock.shorted_amount;
                            break;
              case config.sell: $scope.maxAmount = $scope.selectedStock.bought_amount;
                            break;
              default:
                  console.log($scope.transationType+"error");
              break;
          }
        $scope.value = $scope.selectedStock.value;
        $scope.tAmount = 0;
      };

      var priceUpdate = function(){
    	  if($scope.state.tAmount> $scope.maxAmount){
              $scope.state.tAmount = $scope.maxAmount;
          }

          $scope.total = $scope.state.tAmount * $scope.state.sPrice;
          $scope.total = $scope.total ? $scope.total : 0;
      };

      $scope.$watch('state.tAmount', priceUpdate);
      $scope.$watch('state.sPrice',  priceUpdate);





      var reset = function(){
          $scope.typeChange();
          $scope.tAmount = 0;
      };


      $scope.doTrade = function(){

          var data = {
              type : $scope.selectedTradeOption.option,
              symbol : $scope.selectedStock.symbol,
              amount : $scope.state.tAmount,
              scheduledPrice: $scope.state.sPrice
          };

          console.log(data);

          ScheduleService.add(data,function(response){
              console.log(response);
              loadChart();
              LxNotificationService.alert('Success',
               'Trade is scheduled.', 'Ok', function(answer){

              });
              reset();
          },function(err){
              console.log(err);
              //error logic here.
              LxNotificationService.alert('Sorry.',
               'Unknown error occured.', 'Ok', function(answer){

              });
              reset();
          });
      };

      $scope.chartOptions = {
          /*segmentShowStroke: false,*/
          segmentStrokeWidth: 0,
          segmentStrokeColor: 'rgba(255,255,255,.2)',
          animation:{
              duration: 2500
          }
      };

      $scope.colors = config.pieColors;

      var loadChart = function(){
          ChartService.stats({type:'schedule'},function(response){
             $scope.labels = response.types;
             $scope.piedata = response.data;
             $scope.chartDataLoaded = true;
          },function(err) {
              console.log(err);
          });
      };
      loadChart();



  });

})();
