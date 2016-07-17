(function () {
    'use strict';
    angular.module('TEGScrum')
        .controller('selectedProjectController', controller);

    function controller($stateParams, $scope, $http, $window, $state, $sessionStorage, $q, User, Api, UserStory, Sprint, $ionicPopup) {

        $scope.go = go;
        $scope.data = {};

        $scope.createStory = createStory;
        $scope.createSprint = createSprint;

        $scope.$on('$ionicView.beforeEnter', function () {
            if ($sessionStorage.currentProject) {
                $scope.creatingUserStory = false;
                $scope.creatingSprint = false;
                $scope.showCreatingSprint = false;
                // GET POPULATED PROJECT
                $scope.getPopulatedProject = $http.get(Api.URL + '/project/' + $sessionStorage.currentProject.id + '/sprints/')
                    .success(function (project) {
                        $scope.project = project;
                        listBacklog();
                        validate();
                    });
            } else {
                $state.go('tab.projectsDashboard');
                showAlert();
            }
        });

        function go(path) {
            $state.go(path);
        }

        function validate() {
            var today = new Date();
            $scope.year = today.getFullYear();
        }

        function showAlert() {
            var alertPopup = $ionicPopup.alert({
                title: 'No Project!',
                template: 'Please create a new project'
            });
        };

        function showAlertCheckbox() {
            var alertPopup = $ionicPopup.alert({
                title: 'Error al procesar!',
                template: 'Por favor seleccione las historias de usuario'
            });
        };

        function listBacklog() {
            $scope.listUserStories = [];
            for (var userStory in $scope.project.userStories) {
                if (!$scope.project.userStories[userStory].sprinted) {
                    $scope.listUserStories.push($scope.project.userStories[userStory]);
                    $scope.showCreatingSprint = true;
                }
            }
            $scope.listUserStories.sort(function(userStory){
                return userStory.priority;
            })
        };

        $scope.moveItem = function (userStory, fromIndex, toIndex) {
            $scope.listUserStories.splice(fromIndex, 1);
            $scope.listUserStories.splice(toIndex, 0, userStory);
            for (var userStory in $scope.listUserStories) {
                $scope.listUserStories[userStory].priority = userStory;
                var priority = new UserStory($scope.listUserStories[userStory]);
                priority.$update(function (response) {
                    console.log(response);
                }, function (err) { });
            }
        }


        function createStory(userStoryForm) {
            if (!userStoryForm.$invalid) {
                console.log("valid");
                // SETTING SOME DEFAULT ATTRS
                $scope.data.userStory.project = $scope.project.id;
                $scope.data.userStory.sprinted = false;
                // CREATING THE USER STORY
                var userStory = new UserStory($scope.data.userStory);
                //console.log(angular.toJson(userStory, true));
                userStory.$save(function (response) {
                    $scope.creatingUserStory = false;
                    $scope.data.userStory = {};
                    $state.reload(true);
                }, function (error) {
                    $scope.err = error;
                });
            } else {
                //ERRORS MANAGEMENT
                angular.forEach(userStoryForm.$error, function (field) {
                    angular.forEach(field, function (errorField) {
                        errorField.$setTouched();
                    });
                });
            }
        }

        function createSprint(sprintForm) {
            var userStories = [];
            // GETTING THE SELECTED USER STORIES (FROM CHECKBOX)
            for (var userStory in $scope.listUserStories) {
                if ($scope.listUserStories[userStory].selected) {
                    // UPDATING THE VALUE SPRINTED (BECAUSE NOW THEY ARE ON A SPRINT)
                    console.log($scope.listUserStories[userStory]);
                    $scope.listUserStories[userStory].sprinted = true;
                    $scope.listUserStories[userStory].selected = false;
                    UserStory.update({ id: $scope.listUserStories[userStory].id }, $scope.listUserStories[userStory]);
                    UserStory.update({ priority: userStory }, $scope.listUserStories[userStory]);
                    userStories.push($scope.listUserStories[userStory]);
                }
            }
            if (userStories.length < 1) {
                sprintForm.$invalid = true;
            }
            if (!sprintForm.$invalid) {
                // SETTING SOME DEFAULT ATTRS
                $scope.data.sprint.userStories = userStories;
                $scope.data.sprint.project = $scope.project.id;
                // CREATING THE SPRINT
                console.log(angular.toJson($scope.data.sprint, true));
                var sprint = new Sprint($scope.data.sprint);
                sprint.$save(function (response) {
                    $scope.creatingSprint = false;
                    //console.log(angular.toJson(response,true));
                    $scope.data.sprint = {};
                    $state.reload(true);
                }, function (error) {
                    $scope.err = error;
                });
            } else {
                showAlertCheckbox();
                // ERRORS MANAGEMENT
                angular.forEach(sprintForm.$error, function (field) {
                    angular.forEach(field, function (errorField) {
                        errorField.$setTouched();
                    });
                });
            }

        }
    }
})();
