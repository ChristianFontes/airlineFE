(function () {
    'use strict';
    angular.module('TEGScrum')
        .factory('Task', function ($resource, Api) {
            var res = $resource(Api.URL + '/task/:id', { id: '@id' },
                {
                    update: { method: 'PUT'}
                });
            return res;
        });
})();
