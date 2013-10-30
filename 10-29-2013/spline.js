$(document).ready(function(){
    $.fn.spline = function(options){
        var phrase = $('.spline-loader'),
        defaults = {
            delay: 1000,
            transition: 1000,
            loop: true
        },
        opts = $.extend(defaults, options),
        phrases = phrase.find('li'),
        count = phrases.length,
        advance,
        current = 0;

        phrase.css({
            'padding': '0',
            'margin': '0 0 0 -50%',
            'left': '50%',
            'height': parseInt(phrase.css('font-size').replace('px', ''), 10) + 10 + 'px',
            'width': '100%',
            'position': 'relative'
        });
        phrases.hide().css({
            'list-style-type': 'none',
            'width': '100%',
            'position': 'absolute'
        });
        advance = setInterval(function(){
            phrases.eq(current).fadeIn(opts.transition);
            phrases.eq(current).prevAll().fadeOut(opts.transition);
            current += 1;
        }, opts.delay);

        if(count === current) {
            clearInterval(advance);
        }
        return;
    };

    // init
    $('body').spline({
        transition: 100,
        delay: 2000
    });
});
