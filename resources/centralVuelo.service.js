(function () {
    'use strict';
    angular.module('TEGScrum')
        .factory('CentralVuelo', function ($resource, Api) {
            var res = $resource(Api.URL + '/CentralVuelos/:id', { id: '@id' });
            return res;
        })

        .factory('CentralVueloEnviar', function ($resource, Api) {
            var res = $resource(Api.URL + '/CentralVuelos/insert');
            return res;
        })

        .factory('CentralVueloActualizar', function ($resource, Api) {
            var res = $resource(Api.URL + '/CentralVuelos/update/:id', { id: '@id' },
                {
                    update: { method: 'PUT'}
                });
            return res;
        })

        .factory('CentralVueloEliminar', function ($resource, Api) {
            var res = $resource(Api.URL + '/CentralVuelos/delete', { id: '@id' },
                {
                    delete: { method: 'DELETE'}
                });
            return res;
        });
})();