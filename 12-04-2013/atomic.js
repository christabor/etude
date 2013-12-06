$(document).ready(function(){
    var timer = $('h1');
    var video = $('iframe');
    var countdown = 100;
    var reverse = 0;
    var speed = 50;

    timer.hide();

    function updateCountdown() {
        var size = reverse * 2;
        if(countdown >= 0) {
            timer.text(countdown)
            .css('font-size', size + 'px');
            reverse++;
            countdown--;
            return;
        }
        return;
    }

    function init() {
        timer.show();
        for(var i = 0; i <= countdown; i++) {
            (function(i){
                setTimeout(updateCountdown, i * speed);
            })(i);
        }
        return;
    }

    setTimeout(init, 1400);
});
