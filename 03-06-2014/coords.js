var griddle = (function(){
    var dims         = getViewportDimensions();
    var height       = dims.height;
    var width        = dims.width;
    var canvas_elem  = document.querySelector('canvas');
    var color;
    var complements;

    function create(top, left) {
        var zigzag = zigZag({
            top: top,
            left: left,
            fill: randomArrayValue(complements).toHexString()
        });
        animate(zigzag, 1000);
        canvas.add(zigzag);
    }

    function animate(el, speed) {
        el.animate({
            opacity: 0.7,
            left: rando(width),
            angle: 90
        }, {
            onChange: canvas.renderAll.bind(canvas),
            duration: speed,
            easing: fabric.util.ease.easeIn,
        });
    }

    function generate() {
        var left = rando(width);
        var top = rando(height);
        create(left, top);
    }

    function generateAll() {
        var counter    = 0;
        var increments = Math.floor(width / 80);
        var left       = width / 2;
        var top        = height / 2;
        color          = randomColor(255);
        complements    = tinycolor.analogous(color, increments);
        canvas.clear();
        canvas.backgroundColor = randomColor(clamp(255, 200, 255));
        doSomethingABunch(function(){
            setTimeout(generate, counter * 100);
            counter += 1;
        }, increments);
        canvas.renderAll();
    }

    function init() {
        bootstrapCanvas(null, true);
        addCanvasUI(generateAll);
        generateAll();
    }

    return {
        init: init
    };

})();

$(document).ready(griddle.init);
