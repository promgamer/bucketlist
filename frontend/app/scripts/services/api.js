'use strict';

angular.module('bucketlistApp')
  .service('API', [ '$http', '$q', 'SessionService', function ($http, $q, $sessionS) {
    var serverURL = "http://169.45.223.21:1337";
    var self = this;


    this.login = function(email, password){
    	var deferred = $q.defer();

    	$http.get(serverURL + '/person?where={"email":"' + email + '","password":"' + password + '"}')
    		.then(
    			function success(user_info){
    				if(user_info.data.length === 1 ){
	    				$sessionS.setUser(user_info.data[0]);
	    				deferred.resolve(user_info.data[0]);
	    			}
	    			else {
	    				deferred.reject("Authentication failed!");
	    			}
    			},
    			function error(err){
    				deferred.reject(err);
    			});

		return deferred.promise;
    };

    this.getUserProfile = function(userID){
    	var deferred = $q.defer();

    	$http.get(serverURL + "/person/"+ userID)
    		.then(
    			function success(user_info){
    				//$sessionS.setUser(user_info.data);
    				deferred.resolve(user_info.data);
    			},
    			function error(err){
     				deferred.reject(err);
    			});

		return deferred.promise;
    };

    this.getUserWishes = function(userID){
    	var deferred = $q.defer();

    	$http.get( serverURL + '/wish?where={"owner":' + userID +"}")
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

    	$http.get( serverURL + '/fullhistory/' + userID )
    		.then(
    			function success(data){
    				deferred.resolve(data.data);
    			},
    			function error(err){
    				deferred.reject(err);
    			});

    	return deferred.promise;
    };

    this.getCommunintyWishes = function(){
    	var deferred = $q.defer();

    	$http.get( serverURL + "/communitywish")
    		.then(
    			function success(data){
    				deferred.resolve(data.data);
    			},
    			function error(err){
    				deferred.reject(err);
    			});

    	return deferred.promise;
    };

    this.registerUser = function(user){
    	/* User: {
			name,
			email,
			password,
			photoURL
    	}*/
    	var deferred = $q.defer();

    	$http.post( serverURL + '/person', angular.extend({}, {name: user.name, email: user.email, password: user.password, photoURL: user.photoURL? user.photoURL : null}))
    		.then(
    			function success(data){
    				$sessionS.setUser(data.data);
    				deferred.resolve(data.data);
    			},
    			function error(err){
    				deferred.reject(err);
    			});

    	return deferred.promise;
    };

    this.addUserWish = function(userID, mainWishID){
    	var deferred = $q.defer();

    	$http.post(serverURL + "/wish", angular.extend({}, {MainWish: mainWishID, owner: userID, accepted: true}))
    		.then(
    			function success(data){
    				deferred.resolve(data.data);
    			},
    			function error(err){
    				deferred.reject(err);
    			});

    	return deferred.promise;
    };

    this.addNewWish = function(userID, wish){
    	var deferred = $q.defer();

    	$http.post(serverURL + "/communitywish", angular.extend({}, {name: wish.name, description: wish.description}))
    		.then(
    			function success(data){
    		    	self.addUserWish(userID, data.data.id)
    		    		.then( function( res ){
    		    			deferred.resolve(res.data);
    		    		},
    		    		function(e){
    		    			deferred.reject(e);
    		    		});
    			},
    			function error(err){
    				deferred.reject(err);
    			});

    	return deferred.promise;
    };

    this.removeUserWish = function(wishID){
    	var deferred = $q.defer();

    	$http.delete(serverURL + "/wishDelete/" + wishID)
    		.then(
    			function success(data){
    				deferred.resolve(data.data);
    			},
    			function error(err){
    				deferred.reject(err);
    			});

    	return deferred.promise;
    };

    this.suggestWish = function(userFrom, userTo, mainWishID){
    	var deferred = $q.defer();

    	$http.post(serverURL + "/wish", angular.extend({}, {MainWish: mainWishID, owner: userTo, suggestedBy: userFrom}))
    		.then(
    			function success(data){
    				deferred.resolve(data.data);
    			},
    			function error(err){
    				deferred.reject(err);
    			});

    	return deferred.promise;
    };

    this.finishWish = function(wishID){
    	var deferred = $q.defer();

    	$http.put(serverURL + "/finishWish/"+wishID)
    		.then(
    			function success(data){
    				deferred.resolve(data.data);
    			},
    			function error(err){
    				deferred.reject(err);
    			});

    	return deferred.promise;
    };

    this.mySuggestions = function(userID){
        var deferred = $q.defer();

        $http.get(serverURL + "/mySuggestions/"+userID)
            .then(
                function success(data){
                    deferred.resolve(data.data);
                },
                function error(err){
                    deferred.reject(err);
                });

        return deferred.promise;
    };

    this.mostUsedWish = function(userID){
        var deferred = $q.defer();

        $http.get(serverURL + "/mostUsedWish")
            .then(
                function success(data){
                    deferred.resolve(data.data);
                },
                function error(err){
                    deferred.reject(err);
                });

        return deferred.promise;
    };

  }]
 );
