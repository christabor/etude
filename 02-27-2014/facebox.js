var funky = (function(){
    var normalization_factor = 0.6;
    var draw_count           = 0;
    var max_width            = 0;
    var max_height           = 0;
    var info_container       = document.getElementById('speed');

    function processFaceTracking(event) {
        clearCanvas();
        var speed = event.width + event.height;
        max_width = event.width;
        max_height = event.height;
        info_container.innerHTML = 'Speed: ' + speed * normalization_factor;
        draw_count = speed * normalization_factor;
        doSomethingABunch(drawItem, draw_count);
    }

    function drawItem() {
        ctx.fillStyle = randomColor(255);
        ctx.fillRect(rando(width), rando(height), max_width, max_height);
        ctx.fill();
    }

    function init() {
        var video_input    = document.getElementById('video');
        var canvas_input   = document.getElementById('canvas-video');
        var htracker       = new headtrackr.Tracker({
            calcAngles: false,
            fadeVideo: true,
            // ui: false,
            smoothing: false,
            headPosition: false
        });
        bootstrapCanvas(null, false, '#canvas-art');
        htracker.init(video_input, canvas_input);
        htracker.start();
        document.addEventListener('facetrackingEvent', processFaceTracking);
    }

    return {
        'init': init
    };
})();

window.onload = funky.init();
