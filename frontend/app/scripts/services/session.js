'use strict';

angular.module('bucketlistApp')
	.service('SessionService', ['$localStorage', function($localStorage){
		console.log($localStorage);
		this.setUser = function ( user ) {
			$localStorage.userInfo = user;
			$localStorage.$apply();
      console.log("set userid");
		};

		this.getUser = function () {
			return $localStorage.userInfo;
		};

		this.logout = function () {
			$localStorage.$reset();
			$localStorage.$apply();
		};

	}]);
