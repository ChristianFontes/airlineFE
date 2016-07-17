(function () {
    'use strict';
    angular.module('TEGScrum')
        .factory('pasajero', function ($resource, Api) {
            var res = $resource(Api.URL + '/Pasajero/:id', { id: '@id' });
            return res;
        })

        .factory('pasajeroEnviar', function ($resource, Api) {
            var res = $resource(Api.URL + '/Pasajero/insert');
            return res;
        })

        .factory('pasajeroActualizar', function ($resource, Api) {
            var res = $resource(Api.URL + '/Pasajero/update/:id', { id: '@id' },
                {
                    update: { method: 'PUT'}
                });
            return res;
        })

        .factory('pasajeroEliminar', function ($resource, Api) {
            var res = $resource(Api.URL + '/Pasajero/delete', { id: '@id' },
                {
                    delete: { method: 'DELETE'}
                });
            return res;
        });
})();