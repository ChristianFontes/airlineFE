(function () {
    'use strict';
    angular.module('TEGScrum')
        .factory('User', function ($resource, Api) {
            var res = $resource(Api.URL + '/Register/:id', { id: '@id' },
                {
                    update: {
                        method: 'PUT'
                    }
                });
            return res;
        });
})();
