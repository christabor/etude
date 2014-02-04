window.onload = function() {
    var dims        = getDocumentDimensions();
    var height      = dims.height;
    var width       = dims.width;
    var canvas_elem = document.querySelector('canvas');
    var formula     = [];
    var total       = 50;
    var current     = 0;
    var swapped     = false;
    var fg = '';
    var bg = '';

    function swapColors() {
        // swap colors
        if(swapped) {
            fg = '#43B02A';
            bg = '#213D5A';
        } else {
            fg = '#213D5A';
            bg = '#43B02A';
        }
        swapped = !swapped;
    }

    function addGroup(seed_x, seed_y) {
        if(current === total) {
            canvas.clear();
            current = 0;
            addText();
        }
        for(var i = 0; i <= 8; i++) {
            var circ = new fabric.Circle({
                radius: i * 5,
                fill: fg,
                selectable: false,
                opacity: i * 0.5,
                top: seed_y * i,
                left: seed_x * i
            });
            canvas.add(circ);
            circ.animate({
                radius: rando(width / 4),
                duration: 50,
                onChange: canvas.renderAll.bind(canvas),
                onComplete: function() {
                    circ.animate({
                        radius: rando(50),
                        duration: 50,
                        onChange: canvas.renderAll.bind(canvas)
                    });
                }
            });
        }
        canvas.backgroundColor = bg;
        current += 1;
    }

    function addRandomGroup() {
        var x = rando(width);
        var y = rando(height)
        addGroup(x, y);
        swapColors();
        canvas.renderAll();
    }
    function addText() {
        canvas.add(new fabric.Text('Go Seahawks!', {
            top: height / 2 - 100,
            left: width / 2,
            fontSize: 100,
            fill: 'white',
            selectable: false,
            fontFamily: 'Lato'
        }));
    }

    function init() {
        canvas_elem.width  = width;
        canvas_elem.height = height;
        canvas             = new fabric.Canvas('canvas');
        canvas.selection   = false;
        canvas.backgroundColor = bg;
        addText();
        setInterval(addRandomGroup, 100);
    }
    init();
};
