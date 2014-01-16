var dims        = getViewportDimensions();
var canvas_elem = document.querySelector('canvas');
var height      = dims.height;
var width       = dims.width;
var coords      = $('#coords').find('span');
var objs        = [];
var counter     = 0;
var interval;
var seed_x      = rando(width / 2);
var seed_y      = rando(height / 2);
var r_prev_x    = seed_x;
var r_prev_y    = seed_y;

function addShape(x, y) {
    var shape;
    var size = rando(10);
    if(rando(10) > 5) {
        shape = new fabric.Circle({
            radius: size,
            opacity: 0.4,
            selectable: false,
            outline: true,
            fill: 'none',
            stroke: 'white',
            strokeWidth: 1,
            top: y,
            left: x
        });
    } else {
        shape = new fabric.Rect({
            height: size,
            width: size,
            fill: 'none',
            stroke: 'white',
            strokeWidth: 1,
            opacity: 0.4,
            outline: true,
            selectable: false,
            top: y,
            left: x
        });
    }
    canvas.add(shape);
    objs.push(shape);
}

function updateCoords(x, y) {
    coords.text('x: ' + x + ' / y: ' + y);
}

function dotLineEffect(data) {
    var x = data.e.clientX;
    var y = data.e.clientY;
    var curr;
    var prev;
    var dist_x;
    var dist_y;
    var line;

    addShape(x, y);
    updateCoords(x, y);

    if(counter > 2) {
        curr = objs[counter];
        prev = objs[counter - 1];
        dist_x = curr.left + prev.left;
        dist_y = curr.top + prev.top;
        line = new fabric.Line([2, 2, dist_x / 8, dist_x / 4], {
            stroke: 'white',
            fill: 'white',
            selectable: false,
            strokeWidth: rando(10),
            opacity: rando(4) * 0.1,
            angle: (rando(10) > 5 ? -45 : 45),
            top: curr.top,
            left: curr.left + (curr.left - prev.left)
        });
        canvas.add(line);
    }
}

function addEffectAutopilot() {
    dotLineEffect({
        e: {
            clientX: r_prev_x,
            clientY: r_prev_y
        }
    });
    var rand = rando(50);

    if(rand > 25) {
        r_prev_y += rando(500);
        r_prev_x += rando(500);
    } else if(rand > 10) {
        r_prev_y += rando(50);
        r_prev_x += rando(50);
    } else {
        r_prev_y += rando(10);
        r_prev_x += rando(10);
    }

    if(r_prev_x > width) {
        r_prev_x = 10;
    }
    if(r_prev_y > height) {
        r_prev_y = 10;
    }
    counter += 1;
}

function autoFn() {
    canvas.clear();
    interval = setInterval(addEffectAutopilot, 50);
}

function init() {
    canvas_elem.width  = width;
    canvas_elem.height = height;
    canvas             = new fabric.Canvas('canvas');
    canvas.selection   = false;
    autoFn();
}

$(document).ready(init);
