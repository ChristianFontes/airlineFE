(function () {
    'use strict';
    angular.module('TEGScrum')
        .factory('tripulacion', function ($resource, Api) {
            var res = $resource(Api.URL + '/Tripulacion/:id', { id: '@id' });
            return res;
        })

        .factory('tripulacionEnviar', function ($resource, Api) {
            var res = $resource(Api.URL + '/Tripulacion/insert_tripulacion');
            return res;
        })

        .factory('tripulacionActualizar', function ($resource, Api) {
            var res = $resource(Api.URL + '/Tripulacion/update_tripulacion/:id', { id: '@id' },
                {
                    update: { method: 'PUT'}
                });
            return res;
        })

        .factory('tripulacionEliminar', function ($resource, Api) {
            var res = $resource(Api.URL + '/Tripulacion/delete_tripulacion', { id: '@id' },
                {
                    delete: { method: 'DELETE'}
                });
            return res;
        })

        .factory('tripulacionTrabajadorEnviar', function ($resource, Api) {
            var res = $resource(Api.URL + '/Tripulacion/insert_trabajador');
            return res;
        })

        .factory('tripulacionTrabajadorActualizar', function ($resource, Api) {
            var res = $resource(Api.URL + '/Tripulacion/update_trabajador/:id', { id: '@id' },
                {
                    update: { method: 'PUT'}
                });
            return res;
        })

        .factory('tripulacionTrabajadorEliminar', function ($resource, Api) {
            var res = $resource(Api.URL + '/Tripulacion/delete_trabajador', { id: '@id' },
                {
                    delete: { method: 'DELETE'}
                });
            return res;
        });
})();