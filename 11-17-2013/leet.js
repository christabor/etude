$(document).ready(function(){
	var output = $('#words');
	$.getJSON('quotes.json', function(data){
		var obj = data[rando(data.length)];
		var text = obj.content[rando(obj.content.length)].content.text;
		output.html(text || 'No quote available... try again.').hide().fadeIn(1000);
		return;
	});
});
