'use strict';

angular.module('bucketlistApp')
  .controller('ProfileCtrl', ['$scope','API', 'SessionService', function ($scope, $api, $sessionS) {

  	$api.login("miguelfcunha@gmail.com", "password")
  		.then(
  			function(succ){
  				console.log(succ);
  			},
  			function(err){
  				console.error(err);
  			});
  }]);