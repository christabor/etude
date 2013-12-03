(function(){
	$.kuklos = function(opts) {
		var css_elem     = $(document).find('[data-kuklos]');
		var indicator    = null;
		var time_am      = {
			'1': '01',
			'2': '02',
			'3': '03',
			'4': '04',
			'5': '05',
			'6': '06',
			'7': '07',
			'8': '08',
			'9': '09',
			'10': '10',
			'11': '11',
			'12': '00'
		};
		var time_pm      = {
			'1': '13',
			'2': '14',
			'3': '15',
			'4': '16',
			'5': '17',
			'6': '18',
			'7': '19',
			'8': '20',
			'9': '21',
			'10': '22',
			'11': '23',
			'12': '24'
		};
		var current_time = newTime();
		var curr_href    = getClosestTimeMatch();

		function newTime() {
			var d = new Date();
			return parseInt([d.getHours(), d.getMinutes()].join(''), 10);
		}

		function convertTo24(time) {
			var hour;
			var minute;
			var meridian;

			// clean data
			time = $.trim(time).toLowerCase().split(':');
			hour = time[0];
			minute = time[1];
			meridian = time[2];

			// match to key, instead of subtracting/adding
			// 12, which is the common way to do it.
			// this removes any errors with number length,
			// such as 900 vs. 0900 -- which produces different
			// results when subtracted/added.
			if(meridian.match(/pm/)) {
				time = time_pm[hour] + minute;
			} else if(meridian.match(/am/)) {
				time = time_am[hour] + minute;
			} else {
				return time;
			}
			return parseInt(time, 10);
		}

		function getClosestTimeMatch() {
			// loop through all times
			// get the delta of each, reassign
			// the lowest, until finished,
			// leaving the closest
			var closest;
			var curr_delta;
			var time_delta = 2400;

			for(var time in opts.times) {
				curr_delta = Math.abs(convertTo24(time) - current_time);
				if(curr_delta < time_delta) {
					closest = opts.times[time];
					time_delta = curr_delta;
				}
			}
			// replace colon just in case
			return closest.replace(':', '');
		}

		function updateDomTime() {
			indicator = $(opts.show_current_time);
			indicator.html('<span>The current time is: ' + new Date() + ' <br> and the stylesheet is: ' + curr_href + '</span>');
			return;
		}

		if(opts.show_current_time) {
			updateDomTime();
		}

		css_elem.attr('href', curr_href);
	};
})();
