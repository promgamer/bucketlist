'use strict';

angular.module('bucketlistApp')
  .controller('ProfileCtrl', ['$scope','$routeParams', '$timeout', '$location','API', 'SessionService', function ($scope, $routeParams, $timeout, $location, $api, $sessionS) {
  	if( $sessionS.getUser() === undefined ){
  		$location.path('/');
  	}

  	var foreign = true;

  	function api_fetch(){
	    // GET bucket list from BD


	  	$api.getUserWishes($scope.userInfo.id)
	      .then (
	        function success (data){

	          $scope.userInfo.bucketList = data;

	          if(!foreign) {

	          }
	          $scope.totalBucketListItems = 0;

	          $scope.numberCompleted = 0;
	          for (var i = 0; i < $scope.userInfo.bucketList.length; i++) {

                if($scope.userInfo.bucketList[i].active)
                {
                    $scope.totalBucketListItems++;
                    if(null !== $scope.userInfo.bucketList[i].doneAt )
                    {

                      $scope.numberCompleted++;
                    }
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

	          }
			  $scope.waitingForHistory = false;
			},
			function error (err){
			  console.error(err);
			  $scope.waitingForHistory = false;
			});
	}

  	$scope.waitingForBucketList = true;
    $scope.waitingForHistory = true;

  	if( $routeParams.id ) {
  		$api.getUserProfile($routeParams.id)
  			.then(function(res){
  				$scope.userInfo = res;
          $scope.mypage = false;
  				api_fetch();
  			}, function(err){
  				window.alert(err.status +": "+err.data);
  				$scope.userInfo = $sessionS.getUser();
  				api_fetch();
  			});

	  	foreign = true;
  	}
  	else {
  		$scope.userInfo = $sessionS.getUser();
      $scope.mypage = true;
  		api_fetch();
  		foreign = false;
  	}

    $scope.add = function (wishID) {
      $api.addUserWish($scope.userInfo.id,wishID)
        .then(function success(data) {

          }

        );
    }

  }]);

