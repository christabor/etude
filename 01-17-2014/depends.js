var container;
var counting;
var count       = 0;
var shapes      = [];
var dims        = getViewportDimensions();
var canvas_elem = document.querySelector('canvas');
var height      = dims.height;
var width       = dims.width;
var container;
var shape;
var shape_text;
var shape2;
var seed;
var DURATION;
var normal_mode;


function getSize(size) {
    return size * 2;
}

function addNewShape() {
    // add new shapes which
    // get deleted, for more fun effects
    var new_shape = new fabric.Circle({
        radius: getSize(count),
        selectable: false,
        opacity: 0.2,
        fill: randomColor(100),
        top: rando(height),
        left: rando(width)
    });
    shapes.push(new_shape);
    canvas.add(new_shape);
    new_shape.sendToBack();
}

function updateSize() {
    // update the size, which gets called
    // on an interval which keeps going
    // until the mouse is no longer being pressed
    count += 1;
    shape_text.setOpacity(count);
    shape_text.setFontSize(getSize(count) / 2);
    shape_text.setText(String(getSize(count)));
    shape.setRadius(getSize(count));
    addNewShape();
    canvas.renderAll();
}

function addShapes() {
    // add the initial shapes
    shape_text = new fabric.Text(String(count), {
        fontSize: 0,
        selectable: false,
        fill: 'white',
        fontFamily: 'Homenaje',
        opacity: 0.8,
        top: height / 2,
        left: width / 2
    });
    shape = new fabric.Circle({
        radius: 0,
        selectable: false,
        opacity: 0.5,
        fill: 'black',
        top: height / 2,
        left: width / 2
    });
    canvas.add(shape);
    canvas.add(shape_text);
    canvas.renderAll();
}

function startCounting() {
    // start up counting interval
    // and appropriate effects
    counting = setInterval(updateSize, 10);
}

function stopCounting() {
    // clear everything out, animate it back
    clearInterval(counting);
    $.each(shapes, function(k, shape){

        // remove each shape
        // in succession,
        // pretty fast
        setTimeout(function(){
            shape.remove();
        }, k * 4);
    });

    // animate the circle
    // and text "back" to a small shape
    shape.animate('radius', 0, {
        duration: DURATION,
        onChange: canvas.renderAll.bind(canvas),
        easing: fabric.util.easeInOut
    });
    shape_text.animate('fontSize', 1, {
        duration: DURATION / 1.2,
        onComplete: function() {
            shape_text.setOpacity(0);
            count = 0;
        },
        onChange: function(){
            count = count - 1;
            shape_text.setText(String(count));
            canvas.renderAll.bind(canvas)
        },
        easing: fabric.util.easeInOut
    });
}

function init() {
    canvas_elem.width  = width;
    canvas_elem.height = height;
    canvas             = new fabric.Canvas('canvas');
    canvas.selection   = false;
    seed               = 20;
    size               = seed * seed - (seed / seed);
    DURATION           = 1000;
    normal_mode        = true;
    container          = $('#overlay');

    // add the magic events
    container.on('mousedown', startCounting);
    container.on('mouseup', stopCounting);

    // seed the canvas
    // with the initial shapes
    addShapes(10);
}

$(document).ready(init);
