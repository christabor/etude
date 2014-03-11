var uiTools = (function(){
	return {
		load: function() {
			NProgress.start();
		},
		unload: function() {
			NProgress.done();
		}
	};
})();
