'use strict';

angular.module('bucketlistApp')
  .controller('ProfileCtrl', ['$scope','$routeParams', '$timeout','API', 'SessionService', function ($scope, $routeParams, $timeout, $api, $sessionS) {
  	var foreign = true;

  	$scope.waitingForBucketList = true;
    $scope.waitingForHistory = true;

  	if( $routeParams.id ) {
  		$api.getUserProfile($routeParams.id)
  			.then(function(res){
  				$scope.userInfo = res;
  				console.log(res);
  			}, function(err){
  				window.alert(err.status +": "+err.data);
  				$scope.userInfo = $sessionS.getUser();
  				$timeout(api_fetch, 1);
  			});

	  	foreign = true;
  	}
  	else {
  		$scope.userInfo = $sessionS.getUser();
  		$timeout(api_fetch, 1);
  		foreign = false;
  	}

    function api_fetch(){ 
	    // GET bucket list from BD
	  	$api.getUserWishes($scope.userInfo.id)
	      .then (
	        function success (data){

	          $scope.userInfo.bucketList = data;
	         
	          if(!foreign) {
	          	$sessionS.setUser($scope.userInfo);
	          }
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
	          $scope.waitingForBucketList = false;
	        });

		// GET history from bd
		$api.getUserHistory($scope.userInfo.id)
			.then (
			function success (data){

			  $scope.userInfo.history = data;          
			  if(!foreign) {
	          	$sessionS.setUser($scope.userInfo);
	          }          
			  $scope.waitingForHistory = false;
			},
			function error (err){
			  console.error(err);
			  $scope.waitingForHistory = false;
			});
	}

  }]);



  