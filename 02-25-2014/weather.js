function toggleWeather(type) {
	$('.weather').hide();
	var scene;
	weather = $('#' + type);
	weather.show().parallax();
}

function switchWeather(event) {
	event.preventDefault();
	var weather;
	var type = $(this).data('weather-type');
	$('.weather-icon').removeClass('active');
	$(this).addClass('active');
	toggleWeather(type);
}

function init() {
	var dims = getViewportDimensions();
	var fullheight = $('.weather, .bg, .bg > img');

	fullheight.height(dims.height);
	$('.bg > img').width(dims.width);

	$('.weather-icon')
	.on('click.weather', switchWeather);
	$('[data-weather-type="snow"]').click();
}

$(document).ready(init);
