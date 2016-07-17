(function () {
    'use strict';
    angular.module('TEGScrum')
        .factory('Action', function ($resource, Api) {
            var res = $resource(Api.URL + '/actions/:id', { id: '@id' },
                {
                    update: { method: 'PUT'}
                });
            return res;
        });
})();