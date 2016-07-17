(function () {
    'use strict';
    angular.module('TEGScrum')
        .controller('pasajeroController', controller);

      function controller($stateParams, $rootScope, $scope, $window, $state, $sessionStorage, 
        CentralVuelo, pasajero, pasajeroEnviar, pasajeroEliminar, pasajeroActualizar,
        $ionicModal) {
        $scope.listPasajeros = {};
        $scope.listVuelos = {};
        $scope.data = {};
        $scope.go = go;
        $scope.registrar = registrar;
        $scope.eliminar = eliminar;
        $scope.actualizar = actualizar;

        $scope.$on('$ionicView.beforeEnter', function(){
            var listPasajeros = pasajero.query(function(){
                $scope.listPasajeros = listPasajeros;
                console.log(listPasajeros);
            });

            var listVuelos = CentralVuelo.query(function(){
                $scope.listVuelos = listVuelos;
                console.log(listVuelos);
            });
            
        });    

        function go(path){
            $state.go(path);
        }

        $scope.clases = {
            primera : "Primera",
            economica : "Economica",
            negocio : "Negocio"
        }

        function registrar(form) {
            if($scope.data.lealtad){
                $scope.data.lealtad = 1;
            }else{
                $scope.data.lealtad = 0;
            }
            console.log($scope.data);
            if (!form.$invalid) {
                var registro = new pasajeroEnviar($scope.data);
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

        function eliminar(id) {
            var numero = { id: id };
            var registro = new pasajeroEliminar(numero);
            registro.$save(function(response) {
                $state.reload(true);
                $scope.data = {};
            }, function(error) {
                console.log("Error ");
            });
        }

        function actualizar(form) {
            if($scope.data.lealtad){
                $scope.data.lealtad = 1;
            }else{
                $scope.data.lealtad = 0;
            }
            if (!form.$invalid) {
                var registro = new pasajeroActualizar($scope.data);
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

        $ionicModal.fromTemplateUrl('pasajero-update.html', {
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