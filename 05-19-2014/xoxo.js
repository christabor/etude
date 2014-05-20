var xoxo = (function(){
    'use strict';

    var dims = getViewportDimensions();

    function addLove(e) {
        var classes = ['bounce', 'pulse', 'rubberBand',
                       'shake', 'swing', 'tada', 'wobble', 'flip',
                       'flipInX', 'flipInY', 'lightSpeedIn', 'rotateIn',
                       'slideInLeft', 'slideInRight', 'slideInTop',
                       'slideInBottom', 'rollin'];
        var type = rando(10) > 5 ? 'x' : 'o';
        var el = $('<span class="love animated ' + randomArrayValue(classes) + '"></span>');
        el.css({
            'fontSize': rando(30) + 'px',
            'top': e.clientY - 30,
            'left': e.clientX
        });
        el.text(type);
        $('body').append(el);
    }

    function init() {
        $(document).on('mousemove', addLove);
    }

    return {
        init: init
    };

})();

$(document).ready(xoxo.init);
