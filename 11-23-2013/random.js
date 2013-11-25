var body = $('body');
var title = $('h3').find('span');

function randomWord(){
	var len = body.find('p').length;
	title.text(len);
	body.append('<p>' + randomFixedString(rando(20)) + '</p>').find('p').last().hide().fadeIn(1000);
	return;
}

function pruneWords() {
	var len = body.find('p').length;
	title.text(len);
	body.find('p').remove();
	return;
}

setInterval(randomWord, 10);
setInterval(pruneWords, 4000);
