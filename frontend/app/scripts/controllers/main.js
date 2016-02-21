'use strict';

/**
 * @ngdoc function
 * @name bucketlistApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the bucketlistApp
 */
angular.module('bucketlistApp')
  .controller('MainCtrl', ['$scope','API', 'SessionService', function ($scope, $api, $sessionS) {
    $scope.userInfo = $sessionS.getUser();
    $scope.waitingForBucketList = true;



    $api.getUserWishes($scope.userInfo.id)
      .then (
        function success (data){
        	console.log(data);
          $scope.userInfo.bucketList = data;
          $sessionS.setUser($scope.userInfo);
          $scope.waitingForBucketList = false;
        },
        function error (err){
          $scope.waitingForBucketList = false;
          console.error(err);
        });
  }]);
