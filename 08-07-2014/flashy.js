var flashy = (function(){
    var dims = getViewportDimensions();

    function init() {
        var PADDING = 4;
        var word    = 'welcome';
        var len     = word.length;

        for(var i = 0; i < len; i++) {
            $('#container').append('<span class="light">' + word[i] + '</span>');
        }

        // set sizing dynamically
        var size = clamp((dims.width / len) - (PADDING * len), 40, 200);
        $('.light').css({
            'line-height': size / 1.1 + 'px',
            'font-size': size / 2  + 'px',
            'width': size,
            'height': size
        });
        setInterval(alternate, 600);
    }

    function alternate() {
        var bgcolor = randomColor(255);
        var color = randomColor(150);
        $('.light').each(function(k, light){
            (function(k){
                setTimeout(function(){
                    $(light).css({
                        'color': color,
                        'background-color': bgcolor,
                        'box-shadow': '0 10px 10px ' + color
                    });
                }, k * 100);
            })(k);
        });
    }

    return {
        'init': init
    };

})();

$(document).ready(flashy.init);
