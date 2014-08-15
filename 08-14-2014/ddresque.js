$(document).ready(function(){
    var dims        = getViewportDimensions();
    var container   = $('#container');
    var WIDTH       = dims.width;
    var positions_x = [WIDTH / 5, WIDTH / 4, WIDTH / 3, WIDTH / 2];
    var directions  = ['up', 'down', 'left', 'right'];

    function render() {
        var direction = randomArrayValue(directions);
        var prop = getBorderType(direction);
        var el = $('<img src="img/' + direction + '.png" class="arrow">');
        var css = {
            'left': randomArrayValue(positions_x) + 'px'
        };
        css[prop] = randomColor(255);
        el.css(css);
        container.append(el).find(el);
    }

    function getBorderType(direction) {
        var _direction = '';
        switch(direction) {
            case 'up':
                _direction = 'top';
                break;
            case 'down':
                _direction = 'bottom';
                break;
            case 'right':
                _direction = 'left';
                break;
            case 'left':
                _direction = 'right';
                break;
        }
        // return proper string.
        return 'border-' + _direction + '-color';
    }

    function cleanup() {
        // periodic cleanup of hidden dom nodes
        container.find('.arrow').each(function(k, arrow){
            if($(arrow).offset().top <= 10) {
                $(this).remove();
            }
        });
    }

    function init() {
        var DELAY = 400;
        setInterval(cleanup, DELAY / 2);
        setInterval(render, DELAY); // must be slower than cleanup
        container.width(WIDTH);
        // force max height only,
        // for use with absolutely positioned elements.
        $('html, body').height(dims.height);
    }

    init();
});
