$(document).ready(function(){

    // testing/demo
    var timer = $('#timer');
    var time = 0;
    var titles = $('#sequences [data-succession]');

    // update for demo
    setInterval(function(){
        timer.text(time);
        time +=1;
    }, 10);

    // the real magic
    titles.each(function(k, text){
        var _text = $(text);
        var speed = 100;
        var start = _text.data('start').replace(':', '');
        var end = _text.data('stop').replace(':', '');

        // set timeout for starting point
        setTimeout(function(){
            _text.fadeIn(speed).html('<span>start: ' + start + ' / end: ' + end + '</span>' + _text.text());
        }, start * 1000);

        // set timeout for ending point
        setTimeout(function(){
            _text.fadeOut(speed);
        }, end * 1000);
    });
});
