'use strict';

angular.module('bucketlistApp')
	.service('SessionService', ['$localStorage', '$location', function($localStorage, $location){

		this.setUser = function ( user ) {
			$localStorage.userInfo = user;
		};

		this.getUser = function () {
			return $localStorage.userInfo;
		};

		this.logout = function () {
			$localStorage.$reset();
		};

	}]);