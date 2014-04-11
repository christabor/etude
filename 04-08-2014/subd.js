var subd = (function(){
    var MAX_ITERATIONS = 10;
    var dims           = getViewportDimensions();
    var canvas_elem    = document.querySelector('canvas');
    var height         = dims.height;
    var width          = dims.width;

    function getSubdivisions(max_height) {
        var divisions = [];
        var h = height;
        var current = 0;
        var total = 0;
        while(h >= 0) {
            var division = Math.floor(
                clamp(rando(h), 10, max_height));
            divisions.push(division);
            current += 1;
            h = h - division;
            total += division;
        }
        return divisions;
    }

    function addSubBlock(height, width, top, color) {
        var block = new fabric.Rect({
            height: height,
            width: width || rando(width),
            fill: color || randomColor(255),
            top: top,
            left: 0,
            selectable: false
        });
        block.setGradient('fill', randomFabricGradient({
            x1: 0,
            y1: rando(height),
            x2: rando(width),
            y2: rando(height)
        }, 6));
        canvas.add(block);
    }

    function addAll(height, top) {
        addSubBlock(height, width * 2, top, randomColor(255));
        doSomethingABunch(function(){
            addCross({
                size: rando(10),
                angle: 45,
                color: '#6e1129',
                thickness: rando(10)
            });
            addCross({
                size: rando(10),
                color: '#ff155f',
                thickness: rando(10)
            });
        }, 5);
        addCircleGroup(rando(width), rando(height), null, 20, 'vertical', 3);
        addCircleGroup(rando(width), rando(height), null, 10, null, 10);
    }

    function buildCollage() {
        var subdivisions = getSubdivisions(height / 6);
        var curr_top = 0;
        for (var i = 0, len = subdivisions.length; i < len; i++) {
            var h = subdivisions[i];
            addAll(height, curr_top);
            curr_top += h;
        }
        canvas.renderAll();
    }

    function init() {
        bootstrapCanvas(null, true);
        addCanvasUI(buildCollage);
        buildCollage();
    }

    return {
        init: init
    };

})();
$(document).ready(subd.init);
