(function(){

  'use strict';

  var services = angular.module('AppServices',[]);

  services.factory('AuthService', function($rootScope,$auth){

    var watchLoginChange = function() {
      FB.Event.subscribe('auth.authResponseChange', function(res) {
        if (res.status === 'connected') {
          console.log('connected');
          getUserInfo(function(res,token){
            console.log('token'+token);
            var credentials = {
      				fb_token: token
      			};
      			$auth.login(credentials).then(function(data) {
      			     console.log(data);
      			}, function(error) {
                 console.log(error);
      			})
          });

        }else {
          //not logged
          console.log('not logged');
        }
      });
    }

    var getUserInfo = function(callback) {
      FB.api('/me', function(res) {
        var token =  FB.getAuthResponse()['accessToken'];
        $rootScope.$apply(function() {
          $rootScope.user = res;
          callback(res,token);
        });
      });
    }

    var logout = function() {
      FB.logout(function(response) {
        $rootScope.$apply(function() {
          $rootScope.user = _self.user = {};
        });
      });
    }

    return{
      watchLoginChange: watchLoginChange,
      getUserInfo: getUserInfo,
      logout: logout
    }
  });

})();
