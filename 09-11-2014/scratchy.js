var dims      = getViewportDimensions();
var canvas_el = document.querySelector('canvas');
var height    = dims.height;
var width     = dims.width;

function addImage(x, ctxFunc) {
    fabric.Image.fromURL('imgs/' + rando(13) + '.png', function(img) {
        canvas.add(img);
        img.set({
            left: x,
            opacity: rando(10) * 0.1,
            top: height / 4 - rando(40),
            selectable: false,
            clipTo: ctxFunc
        });
    });
    canvas.renderAll();
}

function init() {
    canvas_el.width  = width;
    canvas_el.height = height;
    canvas           = new fabric.Canvas('canvas');
    canvas.selection = false;
    var PIECE_WIDTH  = 400;
    var MAX_PIECES   = 10;

    for(var i = 1; i < PIECE_WIDTH * MAX_PIECES; i += PIECE_WIDTH / 4) {
        addImage(i, function(ctx){
            ctx.strokeStyle = 'transparent';
            ctx.beginPath();
            ctx.moveTo(0, height);
            for(var i = 1; i < 20; i++) {
                ctx.lineTo(rando(width), rando(height));
                ctx.lineTo(i * 10 - rando(50), 0);
                ctx.lineTo(rando(width), rando(height));
            }
            ctx.stroke();
        });
        addImage(i, function(ctx){
            ctx.beginPath();
            ctx.moveTo(0, height);
            for(var i = 1; i < 20; i++) {
                ctx.lineTo(rando(width), rando(height));
                ctx.lineTo(0, i * 10 - rando(50));
                ctx.lineTo(rando(width), rando(height));
            }
            ctx.stroke();
        });
    }
}

$(document).ready(init);

