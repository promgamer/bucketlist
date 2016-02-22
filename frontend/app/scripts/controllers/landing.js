'use strict';

angular.module('bucketlistApp')
  .controller('LandingCtrl', ['$rootScope','$scope','$location','API','SessionService', function($rootScope, $scope, $location, $api, $sessionS){
  	if($sessionS.getUser() !== undefined){
  		$location.path('/home');
  	}



  	this.login = function(){
  		$api.login($scope.userData.email, $scope.userData.password)
  			.then(
  				function(info){
  					window.$('#myModal1').modal('hide');
            $rootScope.$broadcast('user-updated');
  					$location.path('/home');

  				},
  				function(err){
  					window.alert(err);
  				});
  	};

  	this.register = function(){
  		$api.registerUser({
  			name: $scope.userData.name,
  			email: $scope.userData.email,
  			password: $scope.userData.password,
  			photoURL: $scope.userData.photoURL === ''? null : $scope.userData.photoURL
  		}).then(
  		function(success){
  			window.$('#myModal2').modal('hide');
  			$location.path('/home');
  		},
  		function(err){
  			window.alert(err.status +": "+err.data);
  		});
  	};
  }]);
