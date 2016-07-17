(function () {
    'use strict';
    angular.module('TEGScrum')
        .controller('createSprintController', controller);

      function controller($stateParams, $scope, $window, $state, $sessionStorage, User, projectId, Sprints, Api) {
        
        $scope.data = {};
        $scope.data.member = $sessionStorage.sessionUser.user.id;
        $scope.data.rol = 'admin';
        $scope.data.project_id = $stateParams.id;
        $scope.newSprint = newSprint;
        
        function newSprint(form) {
            if (!form.$invalid) {
                var sprint = new Sprints($scope.data);
                sprint.$save(function(response) {
                    console.log(response);
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
