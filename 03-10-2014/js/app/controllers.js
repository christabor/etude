angular.module('ChemApp.controllers', []).
controller('HomeCtrl', function() {
    uiTools.load();
    uiTools.unload();
})
.controller('ProductsCtrl', function($scope, $http, $routeParams) {
    uiTools.load();
    $http.get('fixtures/products.json').success(function(data) {
        $scope.products = data.products;
        uiTools.unload();
    });
})
.controller('ProductsDetailCtrl', function($scope, $http, $routeParams) {
    uiTools.load();
    $http.get('fixtures/products.json').success(function(data) {
        $scope.product = data.products[$routeParams.product_id];
        console.log($scope.product);
        uiTools.unload();
    });
})
.controller('DesignerCtrl', function($scope) {
    uiTools.load();
    uiTools.unload();
})
.controller('AboutCtrl', function($scope) {
    uiTools.load();
    uiTools.unload();
})
.controller('CareersCtrl', function($scope, $http, $routeParams) {
    uiTools.load();
    $http.get('fixtures/jobs.json').success(function(data) {
        $scope.jobs = data.jobs;
        uiTools.unload();
    });
})
.controller('CareersDetailCtrl', function($scope, $http, $routeParams) {
    uiTools.load();
    // lame but works for now...
    // preferably memoize and cache all calculations/results
    $http.get('fixtures/jobs.json').success(function(data){
        $scope.job = data.jobs[$routeParams.career_id];
        uiTools.unload();
    });
});
