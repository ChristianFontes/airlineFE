(function () {
    'use strict';
    angular.module('TEGScrum')
        .controller('createTaskController', controller);

      function controller($stateParams, $scope, $window, $state, $sessionStorage, User, projectId, Task, Api) {
        
        $scope.data = {};
        $scope.data.member = $sessionStorage.sessionUser.user.id;
        $scope.data.rol = 'admin';
        // CAMBIAR EL PROJECT_NAME POR PROJECT CUANDO SE CAMBIEN EN EL MODELO
        $scope.data.project_name = $stateParams.id;
        $scope.newTask = newTask;
        
        function newTask(form) {
            if (!form.$invalid) {
                var task = new Task($scope.data);
                task.$save(function(response) {
                    $state.go('tab.selectedProject', {id: $stateParams.id});
                }, function(error) {
                    $scope.err = error;
                });
            } else {
                angular.forEach(form.$error, function(field) {
                    angular.forEach(field, function(errorField) {
                        errorField.$setTouched();
                    });
                });
            }
        }
      }
})();
