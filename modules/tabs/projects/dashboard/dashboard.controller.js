(function () {
    'use strict';
    angular.module('TEGScrum')
        .controller('projectsDashboardController', controller);

      function controller($stateParams, $rootScope, $scope, $window, $state, $sessionStorage, User, Project, Api) {
        $scope.user = {};
        $scope.projects = [];
        $scope.go = go;
        $scope.setCurrentProject = setCurrentProject;
        $scope.selected = {};
        $scope.sprintProgress = sprintProgress;

        $scope.$on('$ionicView.beforeEnter', function(){
            var user = User.get({
                    id: $sessionStorage.sessionUser.user.id
                }, function(){
                    $scope.user = user;
                    if(!$sessionStorage.currentProject)
                        $sessionStorage.currentProject = user.projects[0];
                    $scope.selected = $sessionStorage.currentProject.id;
            });
            var projects = Project.query(function(){
                $scope.projects = projects;
            });
        });

        function sprintProgress(sprint){
            console.log(angular.toJson(sprint,true));
        }        

        function go(path){
            $state.go(path);
        }

        $scope.goProject = function(project){
            $state.go('tab.selectedProject', {id: project.id})
        }

        function setCurrentProject(project){
            $sessionStorage.currentProject = project;
            $scope.selected = $sessionStorage.currentProject.id;
        }
      }
})();
