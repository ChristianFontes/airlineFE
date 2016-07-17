(function () {
    'use strict';
    angular.module('TEGScrum')
        .controller('createProjectController', controller);

    function controller($stateParams, $scope, $window, $state, $sessionStorage, $http, User, Project, Api, $ionicModal) {

        $scope.data = {
            picture: "",
            toInvite: '',
        };

        $scope.newProject = newProject;
        $scope.openPictureModal = openPictureModal;
        $scope.closePictureModal = closePictureModal;
        $scope.setLogo = setLogo;
        $scope.clearLogo = clearLogo;
        $scope.addMember = addMember;
        $scope.members = [];
        $scope.listUsers = [];
        $scope.roles = ["Product Owner", "Scrum Master", "Team Developer"];
        $scope.listPictures = [
            {url: "logo1.png", name:"logoScrum"},
            {url: "logo2.png", name:"logoScrum2"},
            {url: "logo3.png", name:"logoScrum3"},
            {url: "logo4.png", name:"logoScrum4"},
            {url: "logo5.png", name:"logoScrum5"}
        ];

        $scope.$on('$ionicView.beforeEnter', function(){
            var user = User.query(function(){
                    $scope.listUsers = user;
                });
        });

        // Set yourself as a member of the project
        $scope.members.push(angular.copy($sessionStorage.sessionUser.user));

        $ionicModal.fromTemplateUrl('modules/tabs/projects/create/set.logo.modal.html', {
            scope: $scope,
            animation: 'fade-in-scale'
        }).then(function (modal) {
            $scope.pictureModal = modal;
        });

        $scope.$on('$destroy', function () {
            $scope.pictureModal.remove();
        });

        $scope.toggleImage = function(picture) {
            var image = "../img/" + picture.url;
            $scope.data.picture = image;
        };

        $scope.inviteUser = function(user) {
            $scope.searchUser = "";
            $scope.data.toInvite = user.email;
        };

        function openPictureModal() {
            $scope.pictureModal.show();
            $scope.pictureModal.step = 'select-logo';
        }

        function closePictureModal() {
            $scope.pictureModal.hide();
        }

        function clearLogo() {
            $scope.data.picture = '';
        }

        // ngCamera management (for mobile version)
        function setLogo(source) {
            var options = {
                quality: 50,
                destinationType: Camera.DestinationType.DATA_URL,
                allowEdit: false,
                targetWidth: 400,
                targetHeight: 400,
                correctOrientation: true,
                encodingType: Camera.EncodingType.JPEG,
                saveToPhotoAlbum: false,
                sourceType: source == 'camera' ?
                    Camera.PictureSourceType.CAMERA :
                    Camera.PictureSourceType.PHOTOLIBRARY
            };

            navigator.camera.getPicture(function (image) {
                $scope.data.picture = "data:image/jpeg;base64," + image;
                //$scope.pictureModal.step = 'preview-logo';
                $scope.closePictureModal();
            }, function (error) {
                // TODO: handle error
            }, options);
        }


        // Input type file management (for web version)
        var handleFileSelect = function (evt) {
            var file = evt.currentTarget.files[0];
            var reader = new FileReader();
            reader.onload = function (evt) {
                $scope.$apply(function ($scope) {
                    $scope.data.picture = evt.target.result;
                });
            };
            reader.readAsDataURL(file);
        };

        var fileInput = angular.element(document.querySelector('#fileInput'));
        fileInput.on('change', handleFileSelect);


        //Already exists
        function alreadyExists(member) {
            return member.email == $scope.data.toInvite;
        }

        //Add members
        function addMember() {
            var UserService = new User();
            if($scope.data.toInvite){
                $http.post(Api.URL + '/check-existence', { email: $scope.data.toInvite })
                    .then(function (response) {
                        if ($scope.members.filter(alreadyExists).length > 0) {
                            // TODO show message
                            $scope.err = "User Already Exist";
                            $scope.showErr = true;
                            setTimeout(function (){
                                $scope.$apply(function(){
                                $scope.showErr = false;
                                });
                            }, 3000);
                        } else {
                            $scope.members.push(response.data.user);
                            $scope.success = "User Add to Project";
                            $scope.showSuccess = true;
                            $scope.data.toInvite = "";
                            setTimeout(function (){
                                $scope.$apply(function(){
                                $scope.showSuccess = false;
                                });
                            }, 3000);
                        }
                    }, function (err) {
                        //TODO invite to the app
                        $scope.err = "User Not Found";
                        $scope.showErr = true;
                        setTimeout(function (){
                            $scope.$apply(function(){
                            $scope.showErr = false;
                            });
                        }, 3000);
                    });
            }
        }

        var checkRol = function(member){
            return member.rol;
        }

        var membersValid = function(){
            return $scope.members.filter(checkRol).length == $scope.members.length;
        }

        // project creation
        function newProject(form) {
            if(membersValid() && !form.$invalid){
                var members = $scope.members.map(function(member){
                    return member.id;
                });
                $scope.data.members = members;
                if(!$scope.data.picture){
                    $scope.data.picture = "../img/logo5.png"
                }
                var project = new Project($scope.data);
                project.$save(function (response) {
                    $state.go('tab.projectsDashboard');
                }, function (error) {
                    $scope.err = error;
                });
            } else {
                angular.forEach(form.$error, function (field) {
                    angular.forEach(field, function (errorField) {
                        errorField.$setTouched();
                    });
                });
            }
        }
    }
})();
