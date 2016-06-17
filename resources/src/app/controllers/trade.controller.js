(function() {

  'use strict';
  var controllers = angular.module('AppControllers');

  controllers.controller('TradeController',
      function($scope,StockUtils,TradeService,stocksFilter,LxNotificationService) {

        $scope.isLive = true;
        $scope.total = 0;

        $scope.state = {}; // inputs

        StockUtils.keepOnUpdating(function(data){
            console.log(data);
            $scope.stocks = data;
            $scope.filteredStocks = stocksFilter($scope.stocks,$scope.selectedTradeOption.option);
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
          if($scope.tAmount)
              $scope.tAmount= 0;
        };

        $scope.$watch('state.tAmount', function(){

            if($scope.state.tAmount> $scope.maxAmount){
                $scope.state.tAmount = $scope.maxAmount;
            }

            if(!$scope.selectedStock) return;
            $scope.total = $scope.state.tAmount * $scope.selectedStock.value;
            $scope.total = $scope.total ? $scope.total : 0;

        });

        var reset = function(){
            $scope.typeChange();
        };

        $scope.doTrade = function(){

            var data = {
                type : $scope.selectedTradeOption.option,
                symbol : $scope.selectedStock.symbol,
                amount : $scope.state.tAmount
            };

            console.log(data);

            TradeService.trade(data,function(response){
                $scope.stocks = data;
                $scope.filteredStocks = stocksFilter($scope.stocks,$scope.selectedTradeOption.option);
                LxNotificationService.alert('Success',
                 'Transaction has been done successfully.', 'Ok', function(answer){

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
        $scope.isTrading = false;
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

        var isLive = false;
        var checkTime = function(){
             var date = new Date();
             if((date.getHours()==9&&date.getMinutes()>=15) || (date.getHours()>9)){
                  if(date.getHours()==15&&date.getMinutes()<=30 || date.getHours()<15){
                      isLive = true;
                      $scope.isLive = true;
                      return true;
                  }
              }
              return false;
        }
        checkTime();

        $scope.$watch('amount', function(){

            if($scope.tradeAmount> $scope.maxAmount){
                $scope.tradeAmount = $scope.maxAmount;
            }

            $scope.total = $scope.tradeAmount* $scope.selectedStock.value;

        });



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
          if($scope.tradeAmount!=null)
              $scope.tradeAmount= 0;
        };



        $scope.typeChange = function(){
            $scope.noStocks = true;
            $scope.selectedStock = null;
        };


        $scope.doTransaction = function(){

              $scope.isTrading = true;
              var tr = new StockFactory();
              tr.id = FacebookService.user.id;
              tr.accessToken = FacebookService.user.accessToken;
              tr.type = $scope.transactionType;
              tr.symbol = $scope.selectedStock.symbol;
              tr.amount = $scope.tradeAmount;

              tr.$trade(
                      function success(response, res){
                           $scope.isTrading = false;
                           console.log("What:"+JSON.stringify(response)+res);

                           var status,msg;
                           if(response.status == "success"){
                               status = 'Success';
                               msg = "Transaction is successfull.";
                               StockService.update(response.data);
                               //$scope.stocks = StockService.stocks; // reassign for updation

                           }else{
                               status = "Sorry";
                               msg = response.error;
                               if(response.error_code>10){
                                   msg = response.error_msg;
                               }else{
                                   msg = "Unknown Error Occured."
                               }
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
                          $scope.isTrading = false;
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

        };*/
  });



})();
