(function () {
    'use strict';
    angular.module('TEGScrum')
        .factory('projectId', function ($resource, Api) {
            var res = $resource(Api.URL + '/project/:id', { id: '@id' });
            return res;
        });
})();