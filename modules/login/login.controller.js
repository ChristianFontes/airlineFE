(function () {
    'use strict';
    angular.module('TEGScrum')
        .controller('loginController', controller);

    function controller($stateParams, $scope, $window, $state, AuthService, ngTranslation,
        $ionicSlideBoxDelegate, User, $sessionStorage) {

      $scope.data = {};
      $scope.err = '';

      $scope.go = go;
      $scope.login = login;
      $scope.signup = signup;
      $scope.language = 'es';
      $scope.changeLanguage = changeLanguage;

      $scope.listState = {
        "AL": "Anzoategui",
        "AK": "Amazonas",
        "AS": "Apure",
        "AZ": "Barinas",
        "AR": "Aragua",
        "CA": "Carabobo",
        "CO": "Bolivar",
        "CT": "Cojedes",
        "DE": "Delta Amacuro",
        "DC": "Falcon",
        "FM": "Distrito Capital",
        "FL": "Guarico",
        "GA": "Merida",
        "GU": "Monagas",
        "HI": "Miranda",
        "ID": "Nueva Esparta",
        "IL": "Portuguesa",
        "IN": "Sucre",
        "IA": "Tachira",
        "KS": "Trujillo",
        "KY": "Yaracuy",
        "LA": "Vargas",
        "ME": "Zulia"
      }

    $scope.nextSlide = function() {
        $ionicSlideBoxDelegate.next();
    };

    $scope.previousSlide = function() {
        $ionicSlideBoxDelegate.previous();
    }

    function go(path){
        $state.go(path);
    }
      
    function changeLanguage(langKey) {
        $scope.language = langKey;
        ngTranslation.use(langKey);
    }
    
    function login(form) {
        if (!form.$invalid) {
            var credentials = {};

            if($scope.data.toggle){
                credentials.toggle = 1;
            }else{
                credentials.toggle = 0;
            }
            credentials.email = $scope.data.emailLogin;
            credentials.password = $scope.data.passwordLogin;
            
            var login = AuthService.login(credentials)
                .success(function (response) {
                    var estado = response;
                    console.log(estado.response.privilegio);
                    $state.go('tab.projectsDashboard');
                })
                .error(function (response, status) {
                    if(response.responseMsg){
                      $scope.err = response.responseMsg;
                      $scope.showErr = true;
                      $scope.data.email = "";
                      $scope.data.password = "";
                    }
                });
        } else {
            angular.forEach(form.$error, function (field) {
                angular.forEach(field, function (errorField) {
                    errorField.$setTouched();
                });
            });
        }
    }

    function signup(form) {
        console.log($scope.data);
        if (!form.$invalid) {
            var user = new User($scope.data);
            console.log("User tiene ", user);
            user.$save(function(response) {
                console.log("Entro al response");
                $sessionStorage.sessionUser = response;
                $state.go('tab.projectsDashboard');
            }, function(error) {
                console.log("Error ");
            });
        } else {
            angular.forEach(form.$error, function(field) {
                angular.forEach(field, function(errorField) {
                    errorField.$setTouched();
                });
            });
            console.log("Error ");
        }
    }

    }
})();
