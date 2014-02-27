var typeArt = (function(){
    var dims = getViewportDimensions();
    var width = dims.width;
    var height = dims.height;
    var current   = 0;
    var max_iters = 30;
    var info_box = document.getElementById('info');
    var canvas_elem = document.querySelector('#canvas-art');
    var canvas;
    canvas_elem.width  = width;
    canvas_elem.height = height;
    canvas = new fabric.Canvas(canvas_elem);
    canvas.selection = false;

    function generate(attrs) {
        if(current === max_iters) {
            canvas.clear();
            current = 0;
        } else {
            current += 1;
        }
        canvas.add(new fabric.Rect({
            height: attrs.height * 2,
            width: attrs.width * 2,
            top: height / 2 + attrs.y,
            left: width / 2 + attrs.x,
            angle: attrs.angle * 10,
            selectable: false,
            fill: randomColor(255)
        }));
        canvas.renderAll();
    }

    function init() {
        var video_input = document.getElementById('video');
        var canvas_input = document.getElementById('canvas-video');
        var htracker = new headtrackr.Tracker({
            calcAngles: true,
            smoothing: true,
            fadeVideo: true,
            headPosition: false
        });
        bootstrapCanvas(null, true, '#canvas-art');
        htracker.init(video_input, canvas_input);
        htracker.start();
        document.addEventListener('facetrackingEvent', processFaceTracking);
    }

    function updateText(event) {
        info_box.innerHTML = [
            'x: ' + event.x,
            'y: ' + event.y,
            '<br />',
            'angle: ' + event.angle,
            '<br />',
            'width: ' + event.width,
            'height: ' + event.height,
        ].join(' ');
    }

    function processFaceTracking(event) {
        generate(event);
        updateText(event);
    }

    return {
        init: init
    };

})();

window.onload = typeArt.init;
