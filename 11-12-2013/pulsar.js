$(document).ready(function(){
    var deg = -360;
    var last_direction;
    var notice = $('#notice').find('p');
    var pulsar = $('h1');

    $(window).on('mousemove', function(e){
        // get direction of mousemovement,
        // determine if increasing or decreasing
        if(e.clientX > last_direction) {
            deg += 4;
        } else {
            deg -= 4;
        }

        // set value after comparison for next time
        last_direction = e.clientX;
        changeRotation(deg);
    });

    function pulse() {
        // closer to comparator as random value is,
        // the lower the odds,
        // so this won't happen as often
        if(rando(10) > 8) {
            $('body').addClass('inverted');
            setTimeout(function(){
                $('body').removeClass('inverted');
            }, 100);
        }
        return;
    }

    function changeRotation(deg) {
        notice.html('Pulsar rotation: ' + deg);
        pulse();
        pulsar.css('transform', 'perspective(20px) rotateY(' + deg + 'deg)');
        deg = deg + 1;
        return;
    }

});
