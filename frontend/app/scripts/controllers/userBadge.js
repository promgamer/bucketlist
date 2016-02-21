'use strict';

angular.module('bucketlistApp')
	.controller('UserBadgeCtrl', ['$scope', 'SessionService', function ($scope, $sessionS){
		$scope.info = $sessionS.getUser();

		$scope.activeSession = $scope.info === null ? true : false;

		console.log($scope);
	}]);