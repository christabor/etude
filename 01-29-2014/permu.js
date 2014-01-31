var canvas_elem = document.querySelector('canvas');
var dims        = getViewportDimensions();
var height      = dims.height;
var width       = dims.width;
var controls    = $('#controls');
var funcs       = {
    'Control': [1, 2, 3, 4, 5],
    'TrueRandom': [rando(width / 10), rando(height / 10), rando(width / 10), rando(height / 10), rando(width / 10)],
    'Random': [100, 30, 10, 4, 30],
    'Fibonacci': [1, 1, 2, 3, 5, 8, 13, 21],
    'Square': [1, 4, 9, 16, 25, 36, 49],
    'Triangular': [1, 3, 6, 10, 15, 21, 28, 36],
    'Pentagonal': [1, 5, 12, 22, 35, 51, 70],
    'Hexagonal': [1, 6, 15, 28, 45, 66, 91],
};

function sequenceGiven(title, list) {
    var block;
    var text;
    var key;
    for (var i = 0; i < list.length; i++) {
        log(list[i]);
        (function(i){
            setTimeout(function(){
                var top = list[i] + height / 2;
                var left = list[i] + width / 2;
                block = new fabric.Circle({
                    top: top,
                    left: left,
                    selectable: false,
                    radius: 0,
                    opacity: 0.1,
                    fill: 'red'
                });
                canvas.add(block);
                opts = {
                    opacity: 0.2,
                    radius: list[i] * 4
                };
                block.animate(opts, {
                    duration: 500,
                    onChange: canvas.renderAll.bind(canvas)
                });
                key = new fabric.Text(String(list[i]), {
                    top: top + 10,
                    left: left + list[i] * 4,
                    fontSize: 12,
                    fontFamily: 'Nunito',
                    selectable: false,
                    fill: 'white'
                });
                canvas.add(key);
            }, i * 100);
        })(i);
    }
    text = new fabric.Text(title, {
        top: 140,
        left: width / 2,
        fontFamily: 'Nunito',
        selectable: false,
        fill: 'white'
    });
    canvas.add(text);
}

function init() {
    canvas_elem.width  = width;
    canvas_elem.height = height;
    canvas             = new fabric.Canvas('canvas');
    canvas.selection   = false;
    controls.find('li').on('click', function(e){
        var type = $(this).text();
        canvas.clear();
        sequenceGiven(type, funcs[type]);
    });
}

$(document).ready(init);
