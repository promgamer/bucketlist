'use strict';

/**
 * @ngdoc function
 * @name bucketlistApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the bucketlistApp
 */
angular.module('bucketlistApp')
  .controller('MainCtrl', ['$scope', function ($scope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.go = function ( path ) {
	  $location.path( path );
	};
  }]);
