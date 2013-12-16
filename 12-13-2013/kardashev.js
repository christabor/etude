$(document).ready(function () {
	skrollr.init();
	$(window).on('scroll', function(e){
		console.log($(window).scrollTop());
	});
});
