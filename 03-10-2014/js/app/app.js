var appConfig = {};
appConfig.templates = 'templates/';
appConfig.sections = appConfig.templates + 'sections/';
appConfig.partials = appConfig.templates + 'partials/';

angular.module('ChemApp', [
    'ngRoute',
    'ChemApp.filters',
    'ChemApp.services',
    'ChemApp.directives',
    'ChemApp.controllers'
])
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: appConfig.sections + 'home.html',
        controller: 'HomeCtrl'
    });
    $routeProvider.when('/products', {
        templateUrl: appConfig.sections + 'products.html',
        controller: 'ProductsCtrl'
    });
    $routeProvider.when('/products/:product_id', {
        templateUrl: appConfig.sections + 'products-detail.html',
        controller: 'ProductsDetailCtrl'
    });
    $routeProvider.when('/designer', {
        templateUrl: appConfig.sections + 'designer.html',
        controller: 'DesignerCtrl'
    });
    $routeProvider.when('/about', {
        templateUrl: appConfig.sections + 'about.html',
        controller: 'AboutCtrl'
    });
    $routeProvider.when('/careers', {
        templateUrl: appConfig.sections + 'careers.html',
        controller: 'CareersCtrl'
    });
    $routeProvider.when('/careers/:career_id', {
        templateUrl: appConfig.sections + 'careers-detail.html',
        controller: 'CareersDetailCtrl'
    });
    $routeProvider.otherwise({
        redirectTo: '/'
    });
}]);
