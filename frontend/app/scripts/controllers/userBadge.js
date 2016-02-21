'use strict';

angular.module('bucketlistApp')
	.controller('UserBadgeCtrl', ['$scope', 'SessionService', function ($scope, $sessionS){
		this.user_info = $sessionS.getUser();
		$scope.info = this.user_info;

		$scope.activeSession = $scope.info === null ? true : false;
	}]);