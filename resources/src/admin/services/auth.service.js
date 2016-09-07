(function() {

	'use strict';

  var services = angular.module('AppServices');

  services.factory('AuthService', function($rootScope,$auth,$state,$http){

	var isLogggedOut = false;

    var watchLoginChange = function() {
      FB.Event.subscribe('auth.authResponseChange', function(res) {
        if (res.status === 'connected') {
          console.log('connected');
		  getUserInfo(function(res,token){

			var credentials = {
					 fb_token: token
			 };

			$auth
			 .login(credentials)
			 .then(function(response) {

					isLogggedOut = false;
					var data = response.data;
					console.log(data.token);
					$auth.setToken(data.token);
					console.log(data.token);
					$http.defaults.headers.common.Authorization = 'Bearer '+data.token;
					$rootScope.authenticated = true;
					$rootScope.user = data.user;

					$rootScope.$broadcast('onLoginComplete',{});

				 }, function(error) {
					 console.log(error);
					 $rootScope.authenticated = false;
					 $rootScope.user = null;
					 $auth.removeToken();
			 });

		  });

        }else {
          //not logged
          //console.log('not logged');

        }
      });
    };

	var sdkLoaded = function(){
		$rootScope.$broadcast('onSdkLoad',{});
	};

	var getLoginStatus = function(callback){
		var data = {};
		data.status = false;
		FB.getLoginStatus(function(response) {
		  if (response.status === 'connected') {
		    	data.userid = response.authResponse.userID;
		    	data.accessToken = response.authResponse.accessToken;
				data.status = true;
				callback(data);
		  } else if (response.status === 'not_authorized') {
			    callback(data);
		  } else {
			    callback(data);
		  }
		 });
	};

    var getUserInfo = function(callback) {
      FB.api('/me', function(res) {
        var token =  FB.getAuthResponse().accessToken;
        $rootScope.$apply(function() {
          $rootScope.user = res;
          callback(res,token);
        });
      });
    };

	var login = function(cb){
		FB.login(function(response) {
		    //let event system take care of login flow.
		});
	};

    var logout = function(cb) {

      FB.logout(function(response) {
        $rootScope.$apply(function() {
		  isLogggedOut = true;
		  $http.defaults.headers.common.Authorization = '';
		  $rootScope.authenticated = false;
  		  $rootScope.user = null;
  		  $auth.removeToken();
		  cb();
        });
      });
    };

	var getIsLoggedOut = function(){
		return isLogggedOut;
	};

    return {
      watchLoginChange: watchLoginChange,
      getUserInfo: getUserInfo,
	  getLoginStatus:getLoginStatus,
      logout: logout,
	  login: login,
	  sdkLoaded: sdkLoaded,
	  getIsLoggedOut : getIsLoggedOut
    };
  });


})();
