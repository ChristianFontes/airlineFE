(function () {
    'use strict';
    angular.module('TEGScrum')
        .controller('tasksProjectController', controller);

    function controller($stateParams, $scope, $window, $state, $sessionStorage, $http, projectId, Api, $ionicPopover, Task, Action) {

        $scope.go = go;
        $scope.creatingTask = false;
        $scope.createTask = createTask;
        $scope.currentProject = angular.copy($sessionStorage.currentProject);
        $scope.setTasks = setTasks;
        $scope.setAction = setAction;
        $scope.updateTaskStatus = updateTaskStatus;
        $scope.data = {
            task: {
                project: $scope.currentProject.id,
            }
        };
        $scope.currentSprint = {};

        function go(path) {
            $state.go(path);
        }
        
        //SETTING NEEDED DATA
        $scope.$on('$ionicView.beforeEnter', function () {
            if ($scope.currentProject) {
                // GET POPULATED PROJECT
                $http.get(Api.URL + '/project/' + $sessionStorage.currentProject.id + '/sprints/')
                    .success(function (project) {
                        //POPULATE USER STORIES ON SPRINTS
                        $scope.currentProject = project;
                        $scope.currentSprint = project.sprints[0];
                        $scope.setTasks($scope.currentSprint);
                    });
                
                    
            } else {
                $state.go('tab.projectsDashboard');
            }
        });


        function setTasks(sprint) {
            $scope.droppedToDo = [];
            $scope.droppedDoing = [];
            $scope.droppedDone = [];
            var tasks = [];
            for (var userStory in sprint.userStories) {
                for (var task in sprint.userStories[userStory].tasks) {
                    tasks.push(sprint.userStories[userStory].tasks[task]);
                }
            }
            angular.forEach(tasks, function (task, key) {
                if(task.status == "new")
                $scope.droppedToDo.push(task);
                if(task.status == "doing")
                $scope.droppedDoing.push(task);
                if(task.status == "done")
                $scope.droppedDone.push(task);
            });
        }

        function createTask(form) {
            if (!$scope.data.task.member || !$scope.data.task.userStory) {
                form.$invalid = true;
            }
            if (!form.$invalid) {
                $scope.data.task.actions = {
                    type: 'New',
                    user: angular.copy($sessionStorage.sessionUser.user.id)
                }
                $scope.data.task.sprint = $scope.currentSprint.id;
                $scope.data.task.status = 'new';
                var task = new Task($scope.data.task);
                task.$save(function (response) {
                    console.log(angular.toJson(response, true));
                    $state.reload(true);
                }, function (err) {
                    console.log(angular.toJson(err, true));
                });                
            } else {
                //ERRORS MANAGEMENT
                angular.forEach(form.$error, function (field) {
                    angular.forEach(field, function (errorField) {
                        errorField.$setTouched();
                    });
                });
            }
        }
        
        
        function setAction(type,message,taskId){
            var action = new Action({
                type: type,
	            user: $sessionStorage.sessionUser.user.id,
	            message: message,
	            task: taskId
            });
            action.$save(function(response){
                console.log(response);
            },function(err){
                console.log(err);
            }); 
        }
        
        function updateTaskStatus(task, status){
            task.status = status;
            var updatedTask = new Task(task);
            updatedTask.$update(function(response){
                console.log(response);
            },function(err){
                console.log(err);
            })
        }
        
        $ionicPopover.fromTemplateUrl('templates/pop-over-tasks-to-do.html', {
            scope: $scope
        }).then(function (popover) {
            $scope.popoverToDo = popover;
        })

        $ionicPopover.fromTemplateUrl('templates/pop-over-tasks-doing.html', {
            scope: $scope
        }).then(function (popover) {
            $scope.popoverDoing = popover;
        })

        $ionicPopover.fromTemplateUrl('templates/pop-over-tasks-done.html', {
            scope: $scope
        }).then(function (popover) {
            $scope.popoverDone = popover;
        })

        $scope.onDropToDo = function (data, evt) {
            setAction('New','Move this task to new',data.id);
            updateTaskStatus(data,'new');
            var index = $scope.droppedToDo.indexOf(data);
            if (index == -1 && data != null)
                $scope.droppedToDo.push(data);
        }
        $scope.onDragToDo = function (data, evt) {
            var index = $scope.droppedToDo.indexOf(data);
            if (index > -1) {
                $scope.droppedToDo.splice(index, 1);
            }
        }

        $scope.onDropDoing = function (data, evt) {
            setAction('Doing','Move this task to doing',data.id);
            updateTaskStatus(data,'doing');
            var index = $scope.droppedDoing.indexOf(data);
            if (index == -1 && data != null)
                $scope.droppedDoing.push(data);
        }
        $scope.onDragDoing = function (data, evt) {
            var index = $scope.droppedDoing.indexOf(data);
            if (index > -1) {
                $scope.droppedDoing.splice(index, 1);
            }
        }

        $scope.onDropDone = function (data, evt) {
            setAction('Done','Move this task to done',data.id);
            updateTaskStatus(data,'done');
            var index = $scope.droppedDone.indexOf(data);
            if (index == -1 && data != null)
                $scope.droppedDone.push(data);
        }
        $scope.onDragDone = function (data, evt) {
            var index = $scope.droppedDone.indexOf(data);
            if (index > -1) {
                $scope.droppedDone.splice(index, 1);
            }
        }

        var inArray = function (array, obj) {
            var index = array.indexOf(obj);
        }

        $scope.openPopoverToDo = function ($event, data) {
            $scope.popoverToDo.show($event);

            $scope.delete = function () {
                $scope.onDragToDo(data);
                $scope.popoverToDo.hide();
            }
            $scope.moveToDoing = function () {
                $scope.onDragToDo(data);
                $scope.onDropDoing(data);
                $scope.popoverToDo.hide();
            }

            $scope.moveToDone = function () {
                $scope.onDragToDo(data);
                $scope.onDropDone(data);
                $scope.popoverToDo.hide();
            }
        }

        $scope.openPopoverDoing = function ($event, data) {
            $scope.popoverDoing.show($event);

            $scope.delete = function () {
                $scope.onDragDoing(data);
                $scope.popoverDoing.hide();
            }
            $scope.moveToDo = function () {
                $scope.onDragDoing(data);
                $scope.onDropToDo(data);
                $scope.popoverDoing.hide();
            }

            $scope.moveToDone = function () {
                $scope.onDragDoing(data);
                $scope.onDropDone(data);
                $scope.popoverDoing.hide();
            }
        }

        $scope.openPopoverDone = function ($event, data) {
            $scope.popoverDone.show($event);

            $scope.delete = function () {
                $scope.onDragDone(data);
                $scope.popoverDone.hide();
            }
            $scope.moveToDoing = function () {
                $scope.onDragDone(data);
                $scope.onDropDoing(data);
                $scope.popoverDone.hide();
            }

            $scope.moveToDo = function () {
                $scope.onDragDone(data);
                $scope.onDropToDo(data);
                $scope.popoverDone.hide();
            }
        }

    }
})();