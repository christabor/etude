var animate;
var dims        = getViewportDimensions();
var canvas_elem = document.querySelector('canvas');
var height      = dims.height;
var width       = dims.width;

function addStuff() {
    doSomethingABunch(function(){
        var x = rando(width);
        var y = rando(height);
        var shape = new fabric.Circle({
            radius: rando(20) + 10,
            fill: randomColor(100),
            opacity: 0.4,
            selectable: false,
            left: x,
            top: y
        });
        var text = new fabric.Text(randomStringLength(10), {
            left: x,
            selectable: false,
            fill: randomColor(100),
            top: y,
            fontSize: rando(100)
        });

        canvas.add(shape);
        canvas.add(text);
    }, 30);
}

function init() {
    var func;
    var seed           = 0;
    canvas_elem.width  = width;
    canvas_elem.height = height;
    canvas             = new fabric.Canvas('canvas');
    canvas.selection   = false;
    canvas.on('mouse:move', function(data){
        if(rando(10) > 6) {
            canvas.clear();
            addStuff();
            var objs = canvas._objects;
            $.each(objs, function(e, object){
                if(object.text) {
                    object.animate('fontSize', rando(100), {
                        duration: 500,
                        onChange: canvas.renderAll.bind(canvas),
                        onComplete:function() {
                            object.setRadius(rando(100));
                        },
                        easing: fabric.util.easeInOutQuad
                    });
                } else {
                    object.animate('radius', rando(100), {
                        duration: 500,
                        onChange: canvas.renderAll.bind(canvas),
                        onComplete:function() {
                            object.setRadius(rando(100));
                        },
                        easing: fabric.util.easeInOutQuad
                    });
                }
            });
        }
    });
canvas.on('mouse:down', function(){
    canvas.backgroundColor = 'black';
    canvas.renderAll();
    exportCanvas(canvas);
});
}

$(document).ready(init);

