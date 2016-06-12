(function() {

  'use strict';
  var controllers = angular.module('AppControllers');

  controllers.controller('TradeController',
      function($scope,$routeParams) {
/*
          if(!FacebookService.getIsLoggedIn()){
              $location.path('/');
          }

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

        $scope.$watch('tradeAmount', function(){

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
