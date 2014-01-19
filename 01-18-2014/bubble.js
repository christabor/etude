var animate;
var dims        = getViewportDimensions();
var canvas_elem = document.querySelector('canvas');
var height      = dims.height;
var width       = dims.width;
var buttons     = $('#plain-menu');
var radius      = 4;
var tau         = Math.PI * 2;
var step        = 0.2;
var shapes      = [];
var duration    = 1000;
var w           = width * 0.4;
var h           = height * 0.1;
var funcs       = {};
var easings     = [
    'easeInQuad',
    'easeOutQuad',
    'easeInOutQuad',
    'easeInCubic',
    'easeOutCubic',
    'easeInOutCubic',
    'easeInQuart',
    'easeOutQuart',
    'easeInOutQuart',
    'easeInQuint',
    'easeOutQuint',
    'easeInOutQuint',
    'easeInSine',
    'easeOutSine',
    'easeInOutSine',
    'easeInExpo',
    'easeOutExpo',
    'easeInOutExpo',
    'easeInCirc',
    'easeOutCirc',
    'easeInOutCirc',
    'easeInElastic',
    'easeOutElastic',
    'easeInOutElastic',
    'easeInBack',
    'easeOutBack',
    'easeInOutBack',
    'easeInBounce',
    'easeOutBounce',
    'easeInOutBounce'
];

function addIt(x, y) {
    var shape = new fabric.Circle({
        radius: rando(50) + 10,
        fill: 'white',
        opacity: 0.4,
        selectable: false,
        left: x,
        top: y
    });
    shapes.push(shape);
    canvas.add(shape);
}

function addStuff() {
    funcs.tau(rando(3));
}

function animate() {
    $.each(shapes, function(k, shape){
        var size = shape.radius;
        setInterval(function(){
            shape.animate('radius', 2, {
                duration: duration,
                onChange: canvas.renderAll.bind(canvas),
                onComplete: function() {
                    shape.animate('radius', rando(size), {
                        duration: duration,
                        onChange: canvas.renderAll.bind(canvas),
                        easing: fabric.util[randomArrayValue(easings)]
                    });
                    duration = rando(1000);
                },
                easing: fabric.util[randomArrayValue(easings)]
            });
        }, duration * 2 + 100);
    });
}

function init() {
    var func;
    var seed           = 0;
    canvas_elem.width  = width;
    canvas_elem.height = height;
    canvas             = new fabric.Canvas('canvas');
    canvas.selection   = false;
    funcs = {
        tau: function(count) {
            if(count > 0) {
                var angle = 0.0;
                while(angle < tau) {
                    addIt(w * Math.cos(angle) + width / 2, (h * 2) * Math.sin(angle) + height / 2);
                    angle += step;
                }
                return funcs.tau(count - 1);
            }
        }
    };
    addStuff();
    animate();
}

$(document).ready(init);

