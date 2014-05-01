var lamp = (function(){
	'use strict';

	var MAX_BEFORE_STOP = 100;
	var TIME_DELAY      = 100;
	var prev_timestep   = 1;
	var timestep        = 1;
	var current_iter    = 1;
	var on              = false;
	var total           = 1;
	var $timetable      = $('#timetable').find('tbody');
	var $play           = $('#play');
	var $state          = $('#state');
	var $time           = $('#time');
	var $reset          = $('#reset');
	var $lamp_on        = $('#lamp-on');
	var $lamp_off       = $('#lamp-off');

	function addTimeStep() {
		var html = [
			'<tr>',
			'<td>',
			(total === 2 ? '2 ... JS, you cheater!' : total),
			'<br /><span class="subdued">(', prev_timestep, '+', timestep, ')</span>',
			'</td><td class="' + (on ? 'on' : 'off') +  '">',
			(on ? 'On': 'Off'),
			'</td></tr>'
		].join('');
		$time.html(timestep + ' of 2:00, <br /> <span class="subdued">Running iteration ' + current_iter + ' of ' + MAX_BEFORE_STOP + '</span>');
		$state.toggleClass('on off').text(on ? 'OFF' : 'ON');
		$timetable.append(html);
		toggleLamp();
		prev_timestep = timestep;
		timestep = (prev_timestep * 0.5);
		total += timestep;
		on = !on;
		if(current_iter < MAX_BEFORE_STOP) {
			setTimeout(addTimeStep, total * TIME_DELAY);
		}
		current_iter += 1;
	}

	function toggleLamp() {
		$lamp_off.toggle();
		$lamp_on.toggle();
	}

	function resetAll(e) {
		if(e) {
			e.preventDefault();
		}
		$timetable.empty();
		$time.empty();
		toggleLamp();
		current_iter = 1;
		timestep = 1;
		total = 1;
	}

	function start(e) {
		e.preventDefault();
		// kick off first step
		resetAll();
		setTimeout(addTimeStep, total * TIME_DELAY);
	}

	function init() {
		$play.on('click', start);
		$reset.on('click', resetAll);
	}

	return {
		init: init
	};
})();

$(document).ready(lamp.init);
