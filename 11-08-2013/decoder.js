$(document).ready(function(){
	var result_html = $('#result').find('p');
	var play_btn = $('#play-music');
	var matches = {};
	var timeline = [];
	var sound_root = 'sounds/';
	var music = {
		'bap': new Howl({ urls: [sound_root + 'bap.mp3']}),
		'bep': new Howl({ urls: [sound_root + 'bep.mp3']}),
		'bip': new Howl({ urls: [sound_root + 'bip.mp3']}),
		'bop': new Howl({ urls: [sound_root + 'bop.mp3']}),
		'bup': new Howl({ urls: [sound_root + 'buup.mp3']}),
		'baap': new Howl({ urls: [sound_root + 'baap.mp3']}),
		'beep': new Howl({ urls: [sound_root + 'beep.mp3']}),
		'biip': new Howl({ urls: [sound_root + 'biip.mp3']}),
		'boop': new Howl({ urls: [sound_root + 'boop.mp3']})
	};
	var grammars = {
		'bap': 'if\\(', // if statement
		'bep': 'else if\\(', // else if
		'bip': 'else\\(', // else
		'bop': 'for\\(', // for loop
		'BUP': 'while\\(', // while loop
		'baap': 'return', // return
		'beep': 'var', // variable
		'biip': 'switch\\(', // switch
		'boop': 'function\\(' // function()
	};

	function createTimeline() {
		// take original array, translate to new array,
		// then flatten, preserving quantity and order
		for(var match in matches) {
			timeline.push(matches[match]);
		}
		timeline = _.flatten(timeline);
		return;
	}

	function resetAll() {
		// reset matches and timeline
		timeline = [];
		matches = {};

		// reset html
		$('form').find('button').show();
		result_html.html('');
		play_btn.hide();
		return;
	}

	function playMusic() {
		// loop through timeline and
		// play corresponding audio files
		$(timeline).each(function(k, note){
			setTimeout(function(){
				music[note].play();
			}, k * 100);
		});
		resetAll();
	}

	function createSequence() {
		// add note indicators for
		// visual correspondence to sound
		for(var match in matches) {
			for(var seq in match) {
				result_html.append('<span class="match ' + match + '">' + match + '</span>');
			}
		}

		// unload
		triggerLoading(false);
		return;
	}

	function matchGrammar(code) {
		// loop through grammar,
		// looking for matches
		for(var grammar in grammars) {

			// create regex from object
			var regex = new RegExp(grammars[grammar], 'gi');
			var match = code.match(regex);
			if(match) {
				matches[grammar] = multiCopyToArray(match.length, grammar);
			}
		}
		return;
	}

	play_btn.on('click', function(e){
		e.preventDefault();
		e.stopImmediatePropagation();
		createTimeline();
		playMusic();
	}).hide();

	$('form').on('submit', function(e){
		triggerLoading(true);
		var code = $(this).find('textarea').val().toLowerCase();
		$(this).find('button').hide();
		e.preventDefault();
		e.stopImmediatePropagation();
		matchGrammar(code);
		createSequence();
		play_btn.show();
	});
});
