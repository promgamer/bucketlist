'use strict';

angular.module('bucketlistApp')
  .service('API', [ '$http', '$q', function ($http, $q) {
    var serverURL = "169.45.223.21:1337";
    this.getUserWishes = function(userID){
    	var deferred = $q.defer();

    	$http.get( serverURL + "/wish" , angular.extend({},{ where: { owner: userID} }))
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
