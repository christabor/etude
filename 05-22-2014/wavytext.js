var wavytext = (function(){
    'use strict';

    function funkifyWord(el) {
        var word = el.text().split('');
        el.empty();
        for(var i = 0; i < word.length; i++) {
            var delay = i * 0.1;
            el.append('<span class="funk" style="-webkit-animation-delay:' + delay + 's;">' + word[i] + '</span>');
        }
    }

    function init() {
        $('h1, h2').on('mouseover', function(e){
            var self = $(this);
            funkifyWord(self);
            $(this).toggleClass('animated rubberBand');
        }).on('mouseout', function(e){
            if($(this).hasClass('active')) {
                return;
            }
            // reset text
            $(this).html($(this).text());
            $(this).toggleClass('animated rubberBand');
        });
    }

    return {
        init: init
    };

})();

$(document).ready(wavytext.init);
