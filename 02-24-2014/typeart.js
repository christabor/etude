var typeArt = (function(){
    var dims         = getViewportDimensions();
    var height       = dims.height;
    var width        = dims.width;
    var info         = $('#info');
    var canvas_elem  = document.querySelector('canvas');
    var current      = 0;
    var max_iters    = 20;

    function addAll(seed) {
        doSomethingABunch(function(){
            var startx = rando(seed);
            var starty = rando(seed);
            var path = [
                'M' + startx / 4,
                starty / 4,
                'C',
                width,
                height,
                ',',
                startx / rando(4),
                starty / rando(4),
                ',',
                startx,
                starty
            ].join(' ');
            // 'M130 110 C 120 140, 180 140, 170 110'
            addPath(path);
            seed += 10;
        }, 5);
    }

    function addText(text) {
        addShiftedText({
            text: text,
            left: rando(width),
            vertical: true,
            top: rando(height),
            opacity: 0.7,
            fontFamily: randomArrayValue(global_config.basic_fonts),
            shadow: '0 10px 10px ' + randomColor(255, 0.4),
            fontSize: rando(width / 4),
            fill: randomColor(255)
        });
    }

    function generate(seed, text) {
        if(current === max_iters) {
            canvas.clear();
            current = 0;
        } else {
            current += 1;
        }
        canvas.backgroundColor = randomColor(255);
        addAll(seed);
        addText(text);
        canvas.renderAll();
    }

    function init() {
        bootstrapCanvas(null, true);
        addCanvasUI();
        $(document).on('keypress', function(event){
            var code = String.fromCharCode(event.keyCode);
            generate(event.keyCode, code);
        });
    }

    return {
        init: init
    };

})();

$(document).ready(typeArt.init);
