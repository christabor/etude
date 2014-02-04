window.onload = function() {
    var dims        = getDocumentDimensions();
    var height      = dims.height;
    var width       = dims.width;
    var canvas_elem = document.querySelector('canvas');
    var total       = 100;
    var current     = 0;

    function addGroup(seed_x, seed_y) {
        if(current === total) {
            var objs = canvas._objects;
            for(var obj in objs) {
                var j = objs[obj];
                j.animate({
                    opacity: 0,
                    radius: 0,
                    duration: 100,
                    onChange: canvas.renderAll.bind(canvas)
                });
            }
            setTimeout(canvas.clear, objs.length * 100 + 100);
            current = 0;
        } else {
            current += 1;
            var circ = new fabric.Circle({
                radius: seed_x / seed_y,
                fill: randomColor(255),
                selectable: false,
                opacity: 0.5,
                top: rando(height) + current * current,
                left: rando(width) + current * current
            });
            canvas.add(circ);
            circ.animate({
                radius: rando(width / 10),
                duration: 40,
                onChange: canvas.renderAll.bind(canvas)
            });
        }
    }

    function init() {
        canvas_elem.width  = width;
        canvas_elem.height = height;
        canvas             = new fabric.Canvas('canvas');
        canvas.selection   = false;
        canvas.backgroundColor = 'black';
        setInterval(function(){
            addGroup(rando(width), rando(height));
        }, 5);
    }
    init();
};
