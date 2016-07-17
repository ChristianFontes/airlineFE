(function(){
   'use strict';
   
   angular.module('TEGScrum')
        .constant('Api', {
            URL: 'http://localhost:8080/server/index.php' //local sails backend
            ///URL: 'http://192.168.0.127:1337' //local sails backend 
        });
})();