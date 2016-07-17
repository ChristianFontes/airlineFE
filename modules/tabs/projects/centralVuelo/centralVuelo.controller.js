(function () {
    'use strict';
    angular.module('TEGScrum')
        .controller('centralVueloController', controller);

      function controller($stateParams, $rootScope, $scope, $window, $state, $sessionStorage, 
        CentralVuelo, CentralVueloEnviar, CentralVueloActualizar, CentralVueloEliminar,
        $ionicModal) {
        $scope.centralVuelos = {};
        $scope.data = {};
        $scope.go = go;
        $scope.registrar = registrar;
        $scope.actualizar = actualizar;
        $scope.eliminar = eliminar;

        $scope.$on('$ionicView.beforeEnter', function(){
            var centralVuelos = CentralVuelo.query(function(){
                $scope.listVuelo = centralVuelos;
                console.log(centralVuelos);
            });
            
        });    

        function go(path){
            $state.go(path);
        }

        function registrar(form) {
            console.log($scope.data);
            if($scope.data.disponible){
                $scope.data.disponible = "Disponible";
            }else{
                $scope.data.disponible = "No Disponible";
            }
            if (!form.$invalid) {
                var registro = new CentralVueloEnviar($scope.data);
                registro.$save(function(response) {
                    $state.reload(true);
                    $scope.data = {};
                }, function(error) {
                    console.log("Error al registrar");
                });
            } else {
                angular.forEach(form.$error, function(field) {
                    angular.forEach(field, function(errorField) {
                        errorField.$setTouched();
                    });
                });
            }
        }

        function actualizar(form) {
            if($scope.data.disponible){
                $scope.data.disponible = "Disponible";
            }else{
                $scope.data.disponible = "No Disponible";
            }
            if (!form.$invalid) {
                var registro = new CentralVueloActualizar($scope.data);
                registro.$save(function(response) {
                }, function(error) {
                    $state.reload(true);
                    $scope.data = {};
                    $scope.closeModal();
                });
            } else {
                angular.forEach(form.$error, function(field) {
                    angular.forEach(field, function(errorField) {
                        errorField.$setTouched();
                    });
                });
            }
        }

        function eliminar(id) {
            var numero = { numVuelo: id };
            var registro = new CentralVueloEliminar(numero);
            registro.$save(function(response) {
                $state.reload(true);
                $scope.data = {};
            }, function(error) {
                console.log("Error ");
            });
        }

        $ionicModal.fromTemplateUrl('my-modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
        });

        $scope.openModal = function(data) {
            $scope.data = data;
            if($scope.data.disponible == "Disponible"){
                $scope.data.disponible = true;
            }else{
                $scope.data.disponible = false;
            }
            $scope.modal.show(data);
        };

        $scope.closeModal = function() {
            $scope.modal.hide();
        };

      }
})();