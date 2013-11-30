(function(){
	var api_url    = 'http://query.yahooapis.com/v1/public/';
	var yql_beg    = 'yql?q=SELECT%20*%20FROM%20answers.search%20WHERE%20query%3D%22';
	var yql_end    = '%22&format=json';
	var word_ajax  = {url: 'http://randomword.setgetgo.com/get.php',dataType: 'jsonp'};
	var translated = $('#translated');
	var info       = $('#info');
	var word_url   = 'http://randomword.setgetgo.com/get.php';
	var word       = $.ajax(word_ajax);
	var query      = '';
	var url        = '';
	var answers;
	var subject;
	var loader     = {
		msg: 'Loading yahoo answer',
		css: {
			'background-color': 'black',
			'font-size': '40px'
		}
	};


	function loadAnswer(key, answer) {
		subject = answer.Subject;
		translated.find('h4').html(subject);
		translated.find('p').html('Created by: ' + answer.UserNick + ' in ' + answer.Category.content + ' <a target="_blank" href="' + answer.Link + '">Link</a>');
		return;
	}

	function refreshPage() {
		window.location.href = window.location.href;
		return;
	}

	function loadAnswers(answers) {
		if(answers.query.results) {
			$(answers.query.results.Question).each(loadAnswer);
		} else {
			var fail_msg = 'Awww, No answers... please try again.';
			translated.find('h4').html(fail_msg);
			translated.find('p').empty();
		}
		globalLoader.unload();
		return;
	}

	function triggerForm() {
		$('form').on('submit', function(e){
			globalLoader.load(loader);
			e.preventDefault();
			var val = $(this).find('input').val();
			query = $.trim(val);
			loadWord(query);
			return;
		});
		return;
	}

	function loadWord(query) {
		url     = [api_url, yql_beg, query, yql_end].join('');
		word    = $.ajax(word_ajax);
		answers = $.getJSON(url);

		$.when(answers).done(loadAnswers);
		return;
	}

	function loadWordFromRandom() {
		globalLoader.load(loader);
		$.when(word).done(function(word){
			loadWord(word.Word);
		});
		return;
	}

	loadWordFromRandom();
	triggerForm();
	return;
})();
