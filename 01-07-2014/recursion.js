window.onload = function() {
    var dims        = getViewportDimensions();
    var canvas_elem = document.querySelector('canvas');
    var coords      = document.querySelector('#coords');
    var height      = dims.height;
    var width       = dims.width;

    function recursionDraw(amount, seed) {
        var color = randomColor(255);
        if(amount === 0) {
            // wait till recursion is
            // completed to render for performance
            canvas.renderAll();
            return;
        }

        // add new circle
        canvas.add(new fabric.Circle({
            radius: seed,
            fill: color,
            opacity: 0.4,
            selectable: false,
            top: seed + 50,
            left: width * 0.25
        }));
        canvas.add(new fabric.Rect({
            width: seed,
            height: seed,
            fill: color,
            opacity: 0.4,
            selectable: false,
            top: seed + 50,
            left: width * 0.75
        }));
        return recursionDraw(amount - 1, seed / 1.5);
    }

    function init() {
        canvas_elem.width  = width;
        canvas_elem.height = height;
        canvas             = new fabric.Canvas('canvas');
        canvas.selection   = false;

        canvas.on('mouse:move', function(data){
            canvas.clear();
            var pos_y = data.e.clientY;
            var pos_x = data.e.clientX;
            var pos = Math.round((pos_y / pos_x) * 200);
            var amt = rando(20);
            coords.innerText = ['Amount: ', amt, 'Position:', pos, 'X: ', pos_y, 'Y:', pos_x].join(' ');
            recursionDraw(amt, pos);
        });
    }

    init();
};
