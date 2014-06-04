var anim = (function(){
    var content     = $('#test-content');
    var dims         = getViewportDimensions();
    var height       = dims.height;
    var width        = dims.width;
    var radius       = width / 4;
    var canvas_elem  = document.querySelector('canvas');
    var color;
    var complements;

    function create(top, left) {
        var points = [];
        var zigzag;
        var x = width;
        var y = height;
        doSomethingABunch(function(){
            points.push(randomCoords(x, y));
            x = x / 1.2;
            y = y / 1.2;
        }, clamp(rando(20), 2, 20));
        zigzag = new fabric.Polyline(points, {
            left: rando(width),
            top: rando(height),
            selectable: false,
            opacity: 0,
            fill: randomArrayValue(complements).toHexString()
        });
        animate(zigzag, 400);
        canvas.add(zigzag);
    }

    function animate(el, speed) {
        el.animate({
            opacity: clamp(rando(8), 2, 8) * 0.1,
            left: rando(width),
            top: rando(height)
        }, {
            onChange: canvas.renderAll.bind(canvas),
            duration: speed,
            easing: fabric.util.ease.easeIn,
        });
    }

    function randomizeCoord(coord) {
        return rando(width / 50);
    }

    function generate() {
        var left = rando(width);
        var top = rando(height);
        create(left, top);
    }

    function generateAll(event) {
        var counter    = 0;
        var increments = Math.floor(width / 80);
        var left       = width / 2;
        var top        = height / 2;
        color          = randomColor(clamp(255, 200, 255));
        complements    = tinycolor.analogous(color, increments);
        canvas.clear();
        if(event) {
            event.stopImmediatePropagation();
            event.preventDefault();
            color = $(this).data('color');
        }
        canvas.backgroundColor = color;
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
        content.find('a').on('mouseover', generateAll);
    }

    return {
        init: init
    };

})();

$(document).ready(anim.init);
