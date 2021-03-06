'use strict';

var app = angular.module('app');

function getContextPath() {
    var contextPath = '/' + window.location.pathname.split('/')[1]; // "/demo"
    return contextPath;
}

var _config = {
    contextPath: getContextPath(),
    service: {
        offline: true,
        proxy: {
            enabled: true,
            path: 'proxy' // "http://localhost:8080/demo/proxy"
        },
        metadata: {
            online: {
                url: 'http://127.0.0.1:8080/demo/rest',
                username: 'SYSTEM',
                password: 'Abcd1234'
            },
            offline: {
                url: 'data'
            }
        },
        api: {
            'items': {
                online: {
                    path: 'odata.xsodata/Items',
                    type: 'odata'
                },
                offline: {
                    path: 'items.json',
                    type: 'json'
                }
            }
        }
    },
    map: {
        location: {
            lat: 43.2964,
            lng: 5.37
        },
        zoom: 5
    }
};

app.constant('config', _config);


// Configuring $routeProvider
app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'HomeCtrl'
        })
        .when('/about', {
            templateUrl: 'views/about.html',
            controller: 'AboutCtrl'
        })
        .when('/contact', {
            templateUrl: 'views/contact.html',
            controller: 'ContactCtrl'
        })
        .otherwise({
            redirectTo: '/'
        })
}]);


// Configuring $translateProvider
app.config(['$translateProvider', 'config', function($translateProvider, config) {
    var i18nPath = config.contextPath + '/i18n';

    // configures staticFilesLoader
    $translateProvider.useStaticFilesLoader({
        prefix: i18nPath + '/locale-',
        suffix: '.json'
    });

    // load 'en' table on startup
    $translateProvider.preferredLanguage('en');
    $translateProvider.fallbackLanguage('en');
    //$translateProvider.useLocalStorage();
}]);