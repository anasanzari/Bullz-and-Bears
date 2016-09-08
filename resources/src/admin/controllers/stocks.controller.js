(function() {

  'use strict';
  var controllers = angular.module('AppControllers');
  controllers.controller('StocksController',
    function($scope, $location, AdminService,LxDialogService) {

        $scope.scrollconfig = {
              autoHideScrollbar: false,
              theme: 'light',
              advanced:{
                  updateOnContentResize: true
              },
              setHeight: '60vh',
              scrollInertia: 500,
              mouseWheel:{
                  scrollAmount: 250
              }

        };
        $scope.state = {};
        $scope.edit = {id:'edit'};
        $scope.deleteStock = {id:'delete_stock'};

        $scope.openEdit = function(stock){
            $scope.edit.stock = stock;
            $scope.edit.newname = stock.name;
            LxDialogService.open($scope.edit.id);
        };
        $scope.save = function(){

            var data = {
                symbol : $scope.edit.stock.symbol,
                name : $scope.edit.newname
            };

            AdminService.editStock(data,function(response){
                console.log(response);
                LxDialogService.close($scope.edit.id);
                update();
            },function(err){
                console.log(err);
            });
        };

        $scope.openDelete = function(stock){
            $scope.deleteStock.stock = stock;
            LxDialogService.open($scope.deleteStock.id);
        };
        $scope.delStock = function(){

            var data = {
                symbol : $scope.deleteStock.stock.symbol,
            };

            AdminService.deleteStock(data,function(response){
                console.log(response);
                LxDialogService.close($scope.deleteStock.id);
                update();
            },function(err){
                console.log(err);
            });
        };

        var update = function(){
            AdminService.getStocks(function(data) {
                $scope.stocks = data;
                console.log(data);
              },
              function(err) {
                console.log(err);
              }
            );
        };
        update();


    });
})();
