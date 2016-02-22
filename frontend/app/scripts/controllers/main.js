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

    $scope.wishes = ["merda","marmelada", "moveis", "armas"];
    $scope.removeUserWish = function (idWish) {
    	$scope.waitingForBucketList = true;
		$api.removeUserWish(idWish)
		.then(function success(data) {
			updateUserWishes();
			}

		);
		
	};

	$scope.completedWish = function (idWish) {
    	$scope.waitingForBucketList = true;
		$api.finishWish(idWish)
		.then(function success(data) {
			updateUserWishes();
			}

		);
		
	};
	

	$scope.tryAdd = function () {
		var wishID = getWishID($scope.wishName, $scope.wishes);
		if( wishID !== -1 )
		{
			$scope.waitingForBucketList = true;
			$api.addUserWish($scope.userInfo.id,wishID)
			.then(function success(data) {
				updateUserWishes();
				}

			);
			
		}
		else 
			{
				console.log("criar nova");
			}
	};

	$scope.add = function (wishID) {
			$scope.waitingForBucketList = true;
			$api.addUserWish($scope.userInfo.id,wishID)
			.then(function success(data) {
				updateUserWishes();
				}

			);
	}
    

	function updateUserWishes() {
		console.log("updating bucketList");
		$scope.waitingForBucketList = true;
		$api.getUserWishes($scope.userInfo.id)
	      .then (
	        function success (data){
	        	//console.log(data);
	          $scope.waitingForBucketList = false;
	          $scope.userInfo.bucketList = data;
	          //$sessionS.setUser($scope.userInfo);
	          
	          //$scope.$apply();
	        },
	        function error (err){
	          $scope.waitingForBucketList = false;
	          console.error(err);
	        });
	}
    
   

      $api.getCommunintyWishes()
      .then (
        function success (data){
        	//console.log(data);
          $scope.wishes = data;
          
        },
        function error (err){
          $scope.waitingForBucketList = false;
          console.error(err);
        });

       updateUserWishes();
  }]);

function getWishID(obj,a) { // -1 if not exists
    for (var i = 0; i < a.length; i++) {
        if (a[i].name === obj) {
            return a[i].id;
        }
    }
    return -1;
}