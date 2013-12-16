$(document).ready(function(){
    var dimensions  = getDocumentDimensions();
    var height      = dimensions.height;
    var width       = dimensions.width;
    var canvas_elem = document.querySelector('canvas');
    var prefix      = 'imgs/';
    var repeat_type = [
    'repeat',
    'no-repeat',
    'repeat-x',
    'repeat-y'
    ];
    var textures    = [
    'az_subtle.png',
    'dimension.png',
    'escheresque_ste.png',
    'geometry.png',
    'notebook.png',
    'pw_pattern.png',
    'pyramid.png',
    'subtle_dots.png',
    'tree_bark.png',
    'wet_snow.png',
    'wild_oliva.png'
    ];
    var loader      = {
        msg: 'Generating Art...',
        css: {
            'background-color': 'orange',
            'color': '#fff',
            'z-index': '9999',
            'font-size': '40px'
        }
    };

    globalLoader.load(loader);

    function addImage(file) {
        fabric.Image.fromURL(file, function(img) {
            var pattern;
            var rect;
            pattern = new fabric.Pattern({
                source: function() {
                    patternSourceCanvas.setDimensions({
                        width: img.getWidth() + padding,
                        height: img.getHeight() + padding
                    });
                    return patternSourceCanvas.getElement();
                },
                repeat: 'repeat'
            });
            rect = new fabric.Rect({
                top: rando(height),
                left: rando(width),
                angle: rando(360),
                selectable: false,
                width: rando(width) / 4,
                outline: true,
                opacity: rando(10) * 0.5,
                stroke: randomColor(40),
                strokeWidth: 1,
                height: rando(height) / 4,
                fill: pattern
            });
            img.set({
                angle: rando(360),
                selectable: false,
                top: rando(height),
                repeat: textures[getKey(repeat_type)],
                left: rando(width),
                opacity: rando(10) * 0.1,
                width: rando(width) / 2,
                height: rando(height) / 2,
                clipTo: function (ctx) {
                    ctx.arc(rando(width) / 2, rando(height) / 2, rando(width) / 2, rando(height) / 2, Math.PI * 2);
                }
            });
            pattern.offsetY  = rando(100);
            pattern.offsetX  = rando(100);
            pattern.setAngle = rando(100);
            img.scaleToWidth = rando(100);
            canvas.add(img);
            canvas.renderAll();
        });
return;
}

function addSequence() {
    canvas.clear();
    canvas.backgroundColor = randomColor(200);

    // add a bunch of random images
    doSomethingABunch(function(){
        addImage(prefix + textures[getKey(textures)]);
    }, 100);
    return;
}

function init() {
    canvas_elem.width = width;
    canvas_elem.height = height;
    canvas = new fabric.Canvas('canvas', {
        backgroundColor: '#EEE'
    });
    canvas.selectable = false;
    addSequence();
    return;
}

init();
globalLoader.unload();

$(document).on('click', function(){
    addSequence();
});
});
