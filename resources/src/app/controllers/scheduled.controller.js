(function() {

  'use strict';
  var controllers = angular.module('AppControllers');

  controllers.controller('ScheduledController',
      function ($scope,ScheduleService,LxNotificationService) {


      $scope.state = {};
      ScheduleService.get(function(response){
          $scope.scheduled = response;
      },function(response){
          console.log(response);
      });

      $scope.cancel = function(item){
          item.isLoading = true;
          var data = {
              id : item.id
          };

          ScheduleService.remove(data,function(response){
              console.log(response);
              item.isLoading = false;
              $scope.scheduled = response;
              LxNotificationService.alert('Success',
               'Cancelled.', 'Ok', function(answer){

              });
          },function(err){
              console.log(err);
              item.isLoading = false;
              LxNotificationService.alert('Sorry.',
               'Unknown error occured.', 'Ok', function(answer){
              });
          });
      };

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

  });



})();
