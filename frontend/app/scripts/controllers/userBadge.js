'use strict';

angular.module('bucketlistApp')
	.controller('UserBadgeCtrl', ['$rootScope','$scope', '$location', 'SessionService', function ($rootScope, $scope, $location, $sessionS){
		this.user_info = $sessionS.getUser();
		$scope.info = this.user_info;

    $rootScope.$on('user-updated', function(){
      this.user_info = $sessionS.getUser();
      $scope.info = this.user_info;
    });

		$scope.activeSession = $scope.info === null ? true : false;

		this.logout = function(){
			$sessionS.logout();
			$location.path('/');
			this.user_info = null;
			$scope.info = null;
		};
	}]);
