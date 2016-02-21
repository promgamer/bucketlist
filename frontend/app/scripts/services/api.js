'use strict';

angular.module('bucketlistApp')
  .service('API', [ '$http', '$q', 'SessionService', function ($http, $q, $sessionS) {
    var serverURL = "http://169.45.223.21:1337";

    this.login = function(email, password){
    	var deferred = $q.defer();

    	$http.get(serverURL + "/person", angular.extend({},{email: email, password: password}))
    		.then(
    			function success(user_info){
    				$sessionS.setUser(user_info.data[0]);
    				deferred.resolve(user_info.data[0]);
    			},
    			function error(err){
    				deferred.reject(err);
    			});

		return deferred.promise;
    };

    this.getUserWishes = function(userID){
    	var deferred = $q.defer();

    	$http.get( serverURL + "/wish" , angular.extend({},{ where: { owner: userID} }))
    		.then(
    			function success(data){
    				deferred.resolve(data.data);
    			},
    			function error(err){
    				deferred.reject(err);
    			});

    	return deferred.promise;
    };

    this.getUserHistory = function(userID){
    	var deferred = $q.defer();

    	$http.get( serverURL + "/history" , angular.extend({},{ where: { owner: userID} }))
    		.then(
    			function success(data){
    				deferred.resolve(data);
    			},
    			function error(err){
    				deferred.reject(err);
    			});

    	return deferred.promise;
    };

  }]
 );
