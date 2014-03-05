var flrs = (function(){
    var dims         = getViewportDimensions();
    var height       = dims.height;
    var width        = dims.width;
    var canvas_elem  = document.querySelector('canvas');
    var max_iters    = 5;
    var is_drawing   = false;
    var brush_width  = 0;

    function generate(event) {
        var x = event.x;
        var y = event.y;
        var padding = clamp(brush_width * 4, 30, 300);
        var points = [x, y, x + padding, y + padding];
        doSomethingABunch(function(){
            canvas.add(new fabric.Line(points, {
                stroke: 'black',
                selectable: false,
                strokeWidth: 1,
                angle: rando(90) + 45,
                opacity: 0.2,
                left: event.x,
                top: event.y,
            }));
            x += 5;
            y += 5;
        }, max_iters);
    }

    function init() {
        bootstrapCanvas(null, true);
        addCanvasUI();
        canvas.isDrawingMode = true;
        canvas.on('mouse:down', function(){
            is_drawing = true;
        });
        canvas.on('mouse:up', function(){
            brush_width = rando(20) + 2;
            canvas.freeDrawingBrush.width = brush_width;
            is_drawing = false
        });
        canvas.on('mouse:move', function(e){
            if(is_drawing) {
                generate(e.e);
            }
        });
    }

    return {
        init: init
    };

})();

$(document).ready(flrs.init);
