(function() {

  'use strict';
  var controllers = angular.module('AppControllers');

  controllers.controller('HelpController',
      function HelpCtrl($scope){
          $scope.scrollconfig = {
                autoHideScrollbar: false,
                theme: 'light',
                advanced:{
                    updateOnContentResize: true
                },
                setHeight: '70vh',
                scrollInertia: 500,
                mouseWheel:{
                    scrollAmount: 250
                }

          };
      }

  );


})();
