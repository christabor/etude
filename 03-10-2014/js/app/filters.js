angular.module('ChemApp.filters', []).
filter('interpolate', ['version', function(version) {
	return function(text) {
		return String(text).replace(/\%VERSION\%/mg, version);
	};
}])
.filter('simpledate', function() {
	return function() {
		var date = new Date();
		return date.getFullYear();
	};
});
