window.onload = function() {
    var dims               = getDocumentDimensions();
    var height             = dims.height;
    var width              = dims.width;
    var canvas_elem        = document.querySelector('canvas');
    var export_button      = document.querySelector('#export-canvas');
    var POINT_COMPLEXITY   = 20;
    var INTERVAL           = 1000;
    var MAX_ITERATIONS     = 5;
    var curr_iterations    = 0;
    var path;

    function smartPath(seed) {
        var data = [];
        data.push(randomSVGMoveTo(seed));

        for (var i = 0; i < seed; i++) {
            data.push(randomSVGCurveTo(i));
            data.push(randomSVGLineTo(i));
            data.push(randomSVGArcTo(i));
        }
        data.push(',z');
        return data.join(',');
    }

    function addPath() {
        var pathdata = randomPrecisePath(rando(dims.width));
        path = new fabric.Path(pathdata);
        path.set({
            opacity: rando(10) * 0.1,
            fill: randomColor(255),
            left: rando(dims.width / 2),
            top: rando(dims.height / 2),
            selectable: false
        });
        canvas.add(path);
    }

    function checkIterations() {
        // clear for performance each 'cycle'
        // after MAX_ITERATIONS is reached
        if(curr_iterations === MAX_ITERATIONS) {
            canvas.clear();
            curr_iterations = 0;
            return;
        }
        curr_iterations+=1;
    }

    function init() {
        canvas_elem.width  = width;
        canvas_elem.height = height;
        canvas             = new fabric.Canvas('canvas');
        canvas.selectable  = false;
        export_button.addEventListener('click', function(){
            exportCanvas(canvas);
        });

        setInterval(function(){
            log(curr_iterations);
            checkIterations();

            // add a random amount
            // of paths
            doSomethingABunch(addPath, rando(POINT_COMPLEXITY));
        }, INTERVAL);
    }

    init();
};
