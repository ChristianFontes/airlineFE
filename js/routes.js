(function () {
  'use strict';
  angular.module('TEGScrum')
  .config(config);

  function config($stateProvider, $urlRouterProvider, $ionicConfigProvider){
    $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'modules/login/login.html',
      controller: 'loginController',
      data: {
        access: 'public'
      }
    })
    .state('signup', {
      url: '/signup',
      templateUrl: 'modules/signup/signup.html',
      controller: 'signupController',
      data: {
        access: 'public'
      }
    })
    // setup an abstract state for the tabs directive
    .state('tab', {
      url: '/tab',
      abstract: true,
      templateUrl: 'templates/tabs.html',
      data: {
        access: 'protected'
      }
    })
    // Each tab has its own nav history stack:
    .state('tab.projectsDashboard', {
      url: '/projects-dashboard',
      views: {
        'tab-projects': {
          templateUrl: 'modules/tabs/projects/dashboard/tab-projects-dashboard.html',
          controller: 'projectsDashboardController'
        }
      }
    })
    .state('tab.centralVuelo', {
      url: '/central-vuelo',
      views: {
        'tab-projects': {
          templateUrl: 'modules/tabs/projects/centralVuelo/centralVuelo.html',
          controller: 'centralVueloController'
        }
      }
    })
    .state('tab.centralTripulacion', {
      url: '/central-tripulacion',
      views: {
        'tab-projects': {
          templateUrl: 'modules/tabs/projects/centralTripulacion/centralTripulacion.html',
          controller: 'centralTripulacionController'
        }
      }
    })
    .state('tab.pasajero', {
      url: '/pasajero',
      views: {
        'tab-projects': {
          templateUrl: 'modules/tabs/projects/pasajero/pasajero.html',
          controller: 'pasajeroController'
        }
      }
    })
    .state('tab.newProject', {
      url: '/new-project',
      views: {
        'tab-projects': {
          templateUrl: 'modules/tabs/projects/create/tab-create-project.html',
          controller: 'createProjectController'
        }
      }
    })
    .state('tab.planningProject', {
      url: '/planning',
      views: {
        'tab-planning': {
          templateUrl: 'modules/tabs/projects/project/tab-project-selected.html',
          controller: 'selectedProjectController'
        }
      }
    })
    .state('tab.tasks', {
      url: '/tasks',
      views: {
        'tab-tasks': {
          templateUrl: 'modules/tabs/projects/project/tasks/tab-project-tasks.html',
          controller: 'tasksProjectController'
        }
      }
    })
    .state('tab.newTask', {
      url: '/project/:id/new-task',
      views: {
        'tab-projects': {
          templateUrl: 'modules/tabs/projects/project/tasks/create/tab-create-task.html',
          controller: 'createTaskController'
        }
      }
    })
    .state('tab.newSprint', {
      url: '/project/:id/new-sprint',
      views: {
        'tab-projects': {
          templateUrl: 'modules/tabs/projects/project/create/tab-create-sprint.html',
          controller: 'createSprintController'
        }
      }
    })
    .state('tab.account', {
      url: '/my-account',
      views: {
        'tab-account': {
          templateUrl: 'modules/tabs/account/profile/account.html',
          controller: 'accountController'
        }
      }
    });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login');
  }
})();
