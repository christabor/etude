angular.module('ChemApp.directives', []).
directive('appVersion', ['version', function(version) {
	return function(scope, elem, attrs) {
		elem.text(version);
	};
}]);
