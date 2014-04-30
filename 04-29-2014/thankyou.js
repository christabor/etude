$(document).ready(function () {
	if(!global_config.is_mobile) {
		skrollr.init({
			forceHeight: false
		});
	} else {
		$('body').html('Sorry, this project does not work on a mobile phone!');
	}
});
