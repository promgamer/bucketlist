'use strict';

angular.module('bucketlistApp')
	.controller('UserBadgeCtrl', ['$scope', '$location', 'SessionService', function ($scope, $location, $sessionS){
		this.user_info = $sessionS.getUser();
		$scope.info = this.user_info;

		$scope.activeSession = $scope.info === null ? true : false;

		this.logout = function(){
			$sessionS.logout();
			$location.path('/');
		};
	}]);