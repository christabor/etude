window.onload = function() {
    var dims        = getDocumentDimensions();
    var height      = dims.height;
    var width       = dims.width;
    var canvas_elem = document.querySelector('canvas');
    var formula     = [];
    var total       = 100;
    var current     = 0;

    function addGroup(seed_x, seed_y) {
        if(current === total) {
            canvas.clear();
            current = 0;
        }
        for(var i = 0; i <= 8; i++) {
            log(i);
            canvas.add(new fabric.Rect({
                width: i / 2,
                height: (seed_x / seed_y) * 50,
                fill: randomColor(255),
                selectable: false,
                angle: 360 / i,
                opacity: i * 0.1,
                top: seed_y + i,
                left: seed_x + i
            }));
        }
        current += 1;
    }

    function addRandomGroup() {
        var x = rando(width);
        var y = rando(height)
        addGroup(x, y);
        canvas.renderAll();
    }

    function init() {
        canvas_elem.width  = width;
        canvas_elem.height = height;
        canvas             = new fabric.Canvas('canvas');
        canvas.selection   = false;
        setInterval(addRandomGroup, 50);
    }
    init();
};
