(function () {
    'use strict';
    angular.module('TEGScrum')
        .factory('Sprint', function ($resource, Api) {
            var res = $resource(Api.URL + '/sprints/:id', { id: '@id' });
            return res;
        });
})();