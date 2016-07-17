(function () {
    'use strict';
    angular.module('TEGScrum')
        .factory('UserStory', function ($resource, Api) {
            var res = $resource(Api.URL + '/user_story/:id', { id: '@id' },
                {
                    update: { method: 'PUT'}
                });
            return res;
        });
})();