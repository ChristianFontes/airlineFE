(function () {
    'use strict';
    angular.module('TEGScrum')
        .controller('centralTripulacionController', controller);

      function controller($stateParams, $rootScope, $scope, $window, $state, $sessionStorage, 
        tripulacion, tripulacionEnviar, tripulacionActualizar, tripulacionEliminar,
        tripulacionTrabajadorEliminar, tripulacionTrabajadorEnviar, tripulacionTrabajadorActualizar,
        $ionicModal) {
        $scope.centralTripulacion = {};
        $scope.data = {};
        $scope.go = go;
        $scope.registrar = registrar;
        $scope.actualizar = actualizar;
        $scope.eliminar = eliminar;

        
        $scope.registrarTrabajador = registrarTrabajador;
        $scope.actualizarTrabajador = actualizarTrabajador;
        $scope.eliminarTrabajador = eliminarTrabajador;

        $scope.$on('$ionicView.beforeEnter', function(){
            var centralTripulacion = tripulacion.get(function(){
                $scope.listTripulacion = centralTripulacion.tableTripulacion;
                $scope.listTripulacionTrabajadores = centralTripulacion.tableTripulacionTrabajador;
            });
        });    

        function go(path){
            $state.go(path);
        }

        // Tripulacion
        function registrar(form) {
            if (!form.$invalid) {
                var registro = new tripulacionEnviar($scope.data);
                registro.$save(function(response) {
                    $state.reload(true);
                    $scope.data = {};
                    $scope.closeModal();
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

        // Tripulacion
        function actualizar(form) {
            console.log(form)
            if (!form.$invalid) {
                var registro = new tripulacionActualizar($scope.data);
                registro.$save(function(response) {
                }, function(error) {
                    $state.reload(true);
                    $scope.data = {};
                    $scope.closeModalUpdate();
                });
            } else {
                angular.forEach(form.$error, function(field) {
                    angular.forEach(field, function(errorField) {
                        errorField.$setTouched();
                    });
                });
            }
        }

        // Tripulacion
        function eliminar(id) {
            var numero = { codigoTripulacion: id };
            var registro = new tripulacionEliminar(numero);
            registro.$save(function(response) {
                $state.reload(true);
                $scope.data = {};
            }, function(error) {
                console.log("Error ");
            });
        }

        /* *********************** */

         // Tripulacion Trabajador
        function registrarTrabajador(form) {
            console.log($scope.data, "Call function");
            if (!form.$invalid) {
                var registro = new tripulacionTrabajadorEnviar($scope.data);
                registro.$save(function(response) {
                    $state.reload(true);
                    $scope.data = {};
                    $scope.closeModalTrabajadorCreate();
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

        // Tripulacion Trabajador
        function actualizarTrabajador(form) {
            console.log($scope.data, "actualizarTrabajador");
            if (!form.$invalid) {
                var registro = new tripulacionTrabajadorActualizar($scope.data);
                registro.$save(function(response) {
                }, function(error) {
                    $state.reload(true);
                    $scope.data = {};
                    $scope.closeModalTrabajadorUpdate();
                });
            } else {
                angular.forEach(form.$error, function(field) {
                    angular.forEach(field, function(errorField) {
                        errorField.$setTouched();
                    });
                });
            }
        }

        // Tripulacion Trabajador
        function eliminarTrabajador(id) {
            console.log(id);
            var numero = { codigoPersonal: id };
            var registro = new tripulacionTrabajadorEliminar(numero);
            registro.$save(function(response) {
                $state.reload(true);
                $scope.data = {};
            }, function(error) {
                console.log("Error ");
            });
        }

        // Modal añadir tripulacion 
        $ionicModal.fromTemplateUrl('tripulacion-create.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
        });

        $scope.openModal = function() {
            $scope.modal.show();
        };

        $scope.closeModal = function() {
            $scope.modal.hide();
        };

        // Modal editar tripulacion
        $ionicModal.fromTemplateUrl('tripulacion-update.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modalUpdate) {
            $scope.modalUpdate = modalUpdate;
        });

        $scope.openModalUpdate = function(data) {
            $scope.data = data;
            $scope.modalUpdate.show(data);
            console.log(data);
        };

        $scope.closeModalUpdate = function() {
            $scope.modalUpdate.hide();
        };

        // Modal Añadir tripulacion Trabajador
        $ionicModal.fromTemplateUrl('trabajador-create.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modalTrabajadorCreate) {
            $scope.modalTrabajadorCreate = modalTrabajadorCreate;
        });

        $scope.openModalTrabajadorCreate = function() {
            $scope.modalTrabajadorCreate.show();
        };

        $scope.closeModalTrabajadorCreate = function() {
            $scope.modalTrabajadorCreate.hide();
        };

        // Modal editar tripulacion Trabajador
        $ionicModal.fromTemplateUrl('trabajador-update.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modalTrabajadorUpdate) {
            $scope.modalTrabajadorUpdate = modalTrabajadorUpdate;
        });

        $scope.openModalTrabajadorUpdate = function(data) {
            $scope.data = data;
            $scope.modalTrabajadorUpdate.show(data);
        };

        $scope.closeModalTrabajadorUpdate = function() {
            $scope.modalTrabajadorUpdate.hide();
        };
      }
})();