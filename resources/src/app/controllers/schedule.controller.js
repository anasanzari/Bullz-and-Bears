(function() {

  'use strict';
  var controllers = angular.module('AppControllers');

  controllers.controller('ScheduleController',
      function($scope,$location,StockUtils,ScheduleService,stocksFilter,LxNotificationService) {


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
        option: 'Buy'
      },{
        option: 'Sell'
      },{
        option: 'Short Sell'
      },{
        option: 'Cover'
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
              case "Buy": $scope.maxAmount = $scope.selectedStock.max_buy;
                          break;
              case "Short Sell":$scope.maxAmount = $scope.selectedStock.max_short;
                           break;
              case "Cover":$scope.maxAmount = $scope.selectedStock.shorted_amount;
                            break;
              case "Sell": $scope.maxAmount = $scope.selectedStock.bought_amount;
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

        /*

        StockService.updateStocks(FacebookService.user.id);
        $scope.stocks = StockService.stocks;
        $scope.total = 0;
        $scope.isScheduling = false;
        $scope.noStocks = false;

        $scope.filterStocks = function(stock,index){
            if($scope.transactionType=='Buy'&&stock.max_buy !=0){
               $scope.noStocks = false;
               return true;
            }

            if($scope.transactionType=='Short'&&stock.max_short !=0){
               $scope.noStocks = false;
               return true;
            }

            if($scope.transactionType=='Sell'&&stock.bought_amount!=0){
                $scope.noStocks = false;
                return true;
            }
            if($scope.transactionType=='Cover'&&stock.shorted_amount!=0){
                $scope.noStocks = false;
                return true;
            }
            return false;
        }


        $scope.$watch('scheduledAmount', function(){
            if($scope.scheduledAmount> $scope.maxAmount){
                $scope.scheduledAmount = $scope.maxAmount;
            }
            $scope.total = $scope.scheduledAmount* $scope.scheduledPrice;
        });

         $scope.$watch('scheduledPrice', function(){
            $scope.total = $scope.scheduledAmount* $scope.scheduledPrice;
        });

        $scope.navigateToScheduled =function(){
            $location.path('scheduled');
        }

        $scope.scheduleTransaction = function(){

             $scope.isScheduling = true;

              var sched = new StockFactory();
              sched.id = FacebookService.user.id;
              sched.accessToken = FacebookService.user.accessToken;
              sched.type = $scope.transactionType;
              sched.symbol = $scope.selectedStock.symbol;
              sched.amount = $scope.scheduledAmount;
              sched.scheduledPrice = $scope.scheduledPrice;

              sched.$addsch(
                      function success(response, res){
                           $scope.isScheduling = false;
                           console.log("What:"+JSON.stringify(response)+res);

                           var status,msg;
                           if(response.status == "success"){
                               status = 'Success';
                               msg = "Job is successfully scheduled."
                               StockService.update(response.data);
                           }else{
                               status = "Error";
                               msg = response.error;
                           }

                           $mdDialog.show(
                              $mdDialog.alert()
                                .parent(angular.element(document.body))
                                .title(status)
                                .content(msg)
                                .ariaLabel('Schedule Transaction.')
                                .ok('Close!')

                            ).finally(function(){
                                $scope.typeChange();
                                $scope.scheduledAmount = 0;
                                $scope.scheduledPrice = 0;

                            });
                      },
                      function error(res){
                          $scope.isScheduling = false;
                          $mdDialog.show(
                              $mdDialog.alert()
                                .parent(angular.element(document.body))
                                .title('Error')
                                .content('Connection Lost.')
                                .ariaLabel('Error Message.')
                                .ok('Close!')

                            ).finally(function(){
                                $scope.typeChange();
                            });
                      });

        };

        $scope.changeStock = function(){
           if(!$scope.selectedStock) return;
           switch($scope.transactionType){
                case "Buy": $scope.maxAmount = $scope.selectedStock.max_buy;
                            break;
                case "Short":$scope.maxAmount = $scope.selectedStock.max_short;
                             break;
                case "Cover":$scope.maxAmount = $scope.selectedStock.shorted_amount;
                              break;
                case "Sell": $scope.maxAmount = $scope.selectedStock.bought_amount;
                              break;
                default:console.log($scope.transationType+"error");break;
            }
          $scope.value = $scope.selectedStock.value;
        };



        $scope.typeChange = function(){
            $scope.selectedStock = null;
            $scope.noStocks = true;
        };

        */
  });

})();
