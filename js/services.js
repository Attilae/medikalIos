'use strict';

/* Services */
mediaApp.factory('MediaService', function($resource, $q) {
    /*var product = $resource('http://medikal.hu/hu/search/:action',
            {action: "mobilname", callback: 'JSON_CALLBACK'},
    {'get': {method: 'JSONP'}});*/
    var product = $resource('https://itunes.apple.com/:action',
        { action: "search", callback: 'JSON_CALLBACK'},
        { 'get':  {method: 'JSONP'} });


    return {
        search: function(query) {
            console.log("lefut")
            var q = $q.defer();

            product.get({
                term: query,
                limit: 50
            }, function(resp) {
                q.resolve(resp);
            }, function(err) {
                console.log(err);                
                q.reject(err);
            })

            return q.promise;
        }
    }
})


mediaApp.factory('ProductListService', function($resource, $q) {
    var productList = $resource('list.json',
            {
                //action: "mobilname", 
                callback: 'JSON_CALLBACK'
            },
    {'get': {method: 'JSON'}});


    return {
        search: function(query) {
            console.log("lefut")
            var q = $q.defer();

            productList.get({
                term: query,
                limit: 50
            }, function(resp) {
                q.resolve(resp);
            }, function(err) {
                console.log(err);                
                q.reject(err);
            })

            return q.promise;
        }
    }
})

// Shared data from settings needed by different controllers
mediaApp.service('SettingsService', function() {
    var _variables = {};

    return {
        get: function(varname) {
            return (typeof _variables[varname] !== 'undefined') ? _variables[varname] : false;
        },
        set: function(varname, value) {
            _variables[varname] = value;
        }
    };
});




