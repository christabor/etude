var coolArts = (function(){
    var dims         = getViewportDimensions();
    var height       = dims.height;
    var width        = dims.width;
    var canvas_elem  = document.querySelector('canvas');
    var export_btn   = $('#export');
    var generate_btn = $('#generate');

    function addRepeaters() {
        var rep_args = {
            x: rando(width),
            y: rando(height),
            size: rando(400),
            max: rando(20),
            direction: 'vertical',
            angle_magnitude: 0.4,
            stretch: rando(8),
            shape: 'rect',
            stroke: randomColor(255),
            thickness: rando(4)
        };
        rep_args.shape = 'triangle';
        rep_args.angle_magnitude = 0.4;
        spiralRepeater(rep_args);

        rep_args.x = rando(width);
        rep_args.y = rando(height / 2);
        rep_args.stroke = 'fff';
        rep_args.stretch = 4;
        rep_args.shape = 'rect';
        rep_args.angle_magnitude = 0.4;
        rep_args.thickness = rando(4);
        spiralRepeater(rep_args);

        rep_args.y = rando(height / 4);
        rep_args.shape = 'path';
        rep_args.angle_magnitude = 0.2;
        spiralRepeater(rep_args);

        rep_args.shape = 'triangle';
        rep_args.angle_magnitude = 4;
        rep_args.size = rando(height);
        rep_args.stretch = 10;
        spiralRepeater(rep_args);
    }

    function addAll() {
        canvas.clear();
        doSomethingABunch(function(){
            var color         = randomColor(255);
            var size          = 100;
            var times         = 10;
            var distorted     = rando(10) > 5 ? true : false;
            var use_stroke    = rando(10) > 5 ? randomColor(255) : false;
            var ring_args     = {}
            ring_args = {
                x: rando(width),
                y: rando(height),
                max: times,
                radius: rando(400),
                direction: 'vertical',
                magnitude: 0.4,
                stretch: rando(8),
                shape: 'rect',
                color: randomColor(255),
                thickness: rando(4)
            };
            addSporadicUniformRings(ring_args);
            ring_args.magnitude = rando(20);
            addWideGrowingRings(ring_args);
            addRepeaters();
            ring_args.radius = rando(100);
            ring_args.stretch = 1;
            addSporadicUniformRings(ring_args);
        }, 1);
    }

    function generate() {
        canvas.backgroundColor = randomColor(255);
        addAll();
        canvas.renderAll();
    }

    function init() {
        canvas_elem.width  = width;
        canvas_elem.height = height;
        canvas             = new fabric.Canvas('canvas');
        canvas.selection   = false;

        export_btn.on('click', function(){
            exportCanvas(canvas);
        });
        generate_btn.on('click', generate);
        generate();
    }

    return {
        init: init
    };

})();

$(document).ready(coolArts.init);
