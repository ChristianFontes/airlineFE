(function () {
    'use strict';
    angular.module('TEGScrum')
        .factory('Project', function ($resource, Api) {
            var res = $resource(Api.URL + '/project/:id', { id: '@id' },
                {
                    update: { method: 'PUT' }
                });
            return res;
        });
})();