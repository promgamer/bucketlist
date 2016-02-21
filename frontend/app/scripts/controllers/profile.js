'use strict';

angular.module('bucketlistApp')
  .controller('ProfileCtrl', ['$scope','API', 'SessionService', function ($scope, $api, $sessionS) {
    $scope.userInfo = $sessionS.getUser();
    $scope.waitingForBucketList = true;
    $scope.waitingForHistory = true;
    

      // GET bucket list from BD
  	$api.getUserWishes($scope.userInfo.id)
      .then (
        function success (data){

          $scope.userInfo.bucketList = data;
         
          $sessionS.setUser($scope.userInfo);
          $scope.totalBucketListItems = $scope.userInfo.bucketList.length;
          
          $scope.numberCompleted = 0;
          for (var i = 0; i < $scope.totalBucketListItems; i++) {
              
              if(null !== $scope.userInfo.bucketList[i].doneAt)
              {

                $scope.numberCompleted++;
              }
            
            }
          
          $scope.numberToDo = $scope.totalBucketListItems - $scope.numberCompleted;
          $scope.waitingForBucketList = false;
        },
        function error (err){
          console.error(err);
        });

      // GET history from bd
      $api.getUserHistory($scope.userInfo.id)
      .then (
        function success (data){

          $scope.userInfo.history = data;          
          $sessionS.setUser($scope.userInfo);          
          $scope.waitingForHistory = false;
        },
        function error (err){
          console.error(err);
        });

  }]);



  