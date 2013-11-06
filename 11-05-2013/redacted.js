$(document).ready(function(){
	function redact() {
		$('.message').find('p').each(function(){
			// split each paragraph by newline
			var text = $(this).text().split('\n'),
			redacted = '';
			$(text).each(function(k, line){

				// loop through each line, split newlines by spaces
				// to create blocks of text
				var blocks = line.split(' ');
				$(blocks).each(function(k, block){

					// randomly choose if redacted or not
					if(Math.random() * 10 > 5) {
						redacted += '<span class="redacted"> ' + block + ' </span>';
					}
					else {
						redacted += block;
					}
				});
			});

			// update html
			$(this).html(redacted);
			return;
		});
		return;
	}
	$('#redactor').on('click', function(){
		redact();
		$(this).text('Redact it again.');
	});
});
