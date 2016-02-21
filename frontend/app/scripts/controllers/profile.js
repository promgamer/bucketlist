'use strict';

angular.module('bucketlistApp')
  .controller('ProfileCtrl', ['$scope','API', 'SessionService', function ($scope, $api, $sessionS) {
    $scope.userInfo = $sessionS.getUser();
    
    $scope.userInfo.bucketlist = [
                        {
                        MainWish: {
                        name: "Go to Eiffel Tower",
                        description: "And maybe get some dinner up there...",
                        id: 1,
                        createdAt: "2016-02-20T22:52:42.000Z",
                        updatedAt: "2016-02-20T22:52:42.000Z"
                        },
                        owner: {
                        photoURL: "https://scontent.flis1-1.fna.fbcdn.net/hphotos-xpa1/v/t1.0-9/11181849_984802091532539_3862292596095526118_n.jpg?oh=7ef55512a7f5048044eb6b1a7b1795e9&oe=5754E5C9",
                        name: "Miguel Poeira",
                        email: "miguelfcunha@gmail.com",
                        password: "password",
                        id: 1,
                        createdAt: "2016-02-20T22:52:33.000Z",
                        updatedAt: "2016-02-20T22:52:33.000Z"
                        },
                        doneAt: null,
                        accepted: true,
                        acceptedAt: null,
                        private: false,
                        id: 1,
                        createdAt: "2016-02-20T22:52:48.000Z",
                        updatedAt: "2016-02-20T22:52:48.000Z"
                        },

                        {
                        MainWish: {
                                  name: "Climb Everest",
                                  description: "And maybe get some dinner up there...",
                                  id: 3,
                                  createdAt: "2016-02-20T22:52:42.000Z",
                                  updatedAt: "2016-02-20T22:52:42.000Z"
                                  },
                        owner: {
                                  photoURL: "https://scontent.flis1-1.fna.fbcdn.net/hphotos-xpa1/v/t1.0-9/11181849_984802091532539_3862292596095526118_n.jpg?oh=7ef55512a7f5048044eb6b1a7b1795e9&oe=5754E5C9",
                                  name: "Miguel Poeira",
                                  email: "miguelfcunha@gmail.com",
                                  password: "password",
                                  id: 1,
                                  createdAt: "2016-02-20T22:52:33.000Z",
                                  updatedAt: "2016-02-20T22:52:33.000Z"
                                  },
                        doneAt: "2016-02-22T22:52:33.000Z",
                        accepted: true,
                        acceptedAt: null,
                        private: false,
                        id: 2,
                        createdAt: "2016-02-20T22:52:48.000Z",
                        updatedAt: "2016-02-20T22:52:48.000Z"
                        },
                        {
                        MainWish: {
                                  name: "Climb Everest",
                                  description: "And maybe get some dinner up there...",
                                  id: 3,
                                  createdAt: "2016-02-20T22:52:42.000Z",
                                  updatedAt: "2016-02-20T22:52:42.000Z"
                                  },
                        owner: {
                                  photoURL: "https://scontent.flis1-1.fna.fbcdn.net/hphotos-xpa1/v/t1.0-9/11181849_984802091532539_3862292596095526118_n.jpg?oh=7ef55512a7f5048044eb6b1a7b1795e9&oe=5754E5C9",
                                  name: "Miguel Poeira",
                                  email: "miguelfcunha@gmail.com",
                                  password: "password",
                                  id: 1,
                                  createdAt: "2016-02-20T22:52:33.000Z",
                                  updatedAt: "2016-02-20T22:52:33.000Z"
                                  },
                        doneAt: "2016-02-22T22:52:33.000Z",
                        accepted: true,
                        acceptedAt: null,
                        private: false,
                        id: 2,
                        createdAt: "2016-02-20T22:52:48.000Z",
                        updatedAt: "2016-02-20T22:52:48.000Z"
                        },
                        {
                        MainWish: {
                                  name: "Climb Everest",
                                  description: "And maybe get some dinner up there...",
                                  id: 3,
                                  createdAt: "2016-02-20T22:52:42.000Z",
                                  updatedAt: "2016-02-20T22:52:42.000Z"
                                  },
                        owner: {
                                  photoURL: "https://scontent.flis1-1.fna.fbcdn.net/hphotos-xpa1/v/t1.0-9/11181849_984802091532539_3862292596095526118_n.jpg?oh=7ef55512a7f5048044eb6b1a7b1795e9&oe=5754E5C9",
                                  name: "Miguel Poeira",
                                  email: "miguelfcunha@gmail.com",
                                  password: "password",
                                  id: 1,
                                  createdAt: "2016-02-20T22:52:33.000Z",
                                  updatedAt: "2016-02-20T22:52:33.000Z"
                                  },
                        doneAt: "2016-02-22T22:52:33.000Z",
                        accepted: true,
                        acceptedAt: null,
                        private: false,
                        id: 2,
                        createdAt: "2016-02-20T22:52:48.000Z",
                        updatedAt: "2016-02-20T22:52:48.000Z"
                        }
                      ];

    $scope.totalBucketListItems = $scope.userInfo.bucketlist.length;
    
    $scope.numberCompleted = 0;
    for (var i = 0; i < $scope.totalBucketListItems; i++) {
        
        if(null !== $scope.userInfo.bucketlist[i].doneAt)
        {

          $scope.numberCompleted++;
        }
      
      }
    
    $scope.numberToDo = $scope.totalBucketListItems - $scope.numberCompleted;
    console.log("Tamanho: " + $scope.totalBucketListItems + " Conpletos: " + $scope.numberCompleted + " Nao completos: " + $scope.numberToDo);
    




  	/*$api.getUserWishes($scope.userInfo.id)
      .then (
        function success (data){
          $scope.userInfo.bucketList = data;
          $sessionS.setUser($scope.userInfo);

        },
        function error (err){
          console.error(err);
        });*/

  }]);