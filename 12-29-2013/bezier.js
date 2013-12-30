window.onload = function() {
    var dims        = getDocumentDimensions();
    var height      = dims.height;
    var width       = dims.width;
    var data_output = document.querySelector('#pathdata p');
    var canvas_elem = document.querySelector('canvas');
    var POINT_COMPLEXITY = 10;
    var INTERVAL = 400;
    var ANIMATION_DURATION = INTERVAL * 2;
    var path;

    function addPath() {
        var pathdata = randomPath(30, width / 2);
        data_output.innerHTML = pathdata;

        path = new fabric.Path(pathdata);
        path.set({
            opacity: rando(10) * 0.1,
            stroke: randomColor(255),
            fill: randomColor(255),
            left: rando(dims.width / 2),
            top: rando(dims.height / 2),
            selectable: false
        });
        canvas.add(path);
        animate();
        return;
    }

    function onComplete() {
        path.animate({
            scaleX: rando(10),
            opacity: 1
        }, {
            duration: ANIMATION_DURATION,
            onComplete: onComplete
        });
        return;
    }

    function animate() {
        // animate paths for
        // an extra fun factor
        path.animate({
            scaleX: 1,
            opacity: rando(10) * 0.1 + 0.4
        },
        {
            duration: ANIMATION_DURATION,
            easing: fabric.util.ease.easeOutCubic,
            onChange: canvas.renderAll.bind(canvas),
            onComplete: onComplete
        });
        return;
    }

    function init() {
        canvas_elem.width = width;
        canvas_elem.height = height;
        canvas = new fabric.Canvas('canvas');
        canvas.selectable = false;

        // change shapes
        setInterval(function(){
            // clear for performance
            if(rando(10) > 5) {
                canvas.clear();
                data_output.innerHTML = '';
            }

            // add a random amount
            // of paths every 1 second
            doSomethingABunch(addPath, rando(POINT_COMPLEXITY));
            return;
        }, INTERVAL);
        return;
    }

    init();
    return;
};
