var animate;
var dims        = getViewportDimensions();
var canvas_elem = document.querySelector('canvas');
var height      = dims.height;
var width       = dims.width;
var imgs        = [
'astronomy.jpg',
'berry.jpg',
'bird.jpg',
'flower1.jpg',
'geo.jpg',
'harry.jpg',
'octo.jpg',
'squid.jpg',
'orchid.jpg'
];
var fonts = [
'Lato',
'Georgia',
'Consolas',
'Arial',
'Helvetica',
'Lucida',
'Courier New'
];
var sayings = [
'Two roads diverged in a yellow wood...',
'I want you to know \none thing.',
'I have almost forgotten my dream.',
'Hold fast to dreams',
'I wandered lonely as a cloud',
'Do not go gentle into that good night',
'Do not stand at my grave and weep \nI am not there. I do not sleep.',
'All the world\'s a stage, \nAnd all the men and women merely players',
'ye olde sweet summer',
'fin.',
'Oh!'
];


function addCircleGroupY(fill, size, outlined) {
    var x = rando(width);
    var y = rando(height);
    doSomethingABunch(function(){
        var shape = new fabric.Circle({
            radius: size,
            fill: fill,
            stroke: (outlined ? 'none' : fill),
            strokeWidth: (outlined ? 1 : 0),
            opacity: 0.8,
            selectable: false,
            left: x,
            top: y
        });
        y += size * 2 + size;
        canvas.add(shape);
    }, 10);
}

function addCircleGroupX(fill, size) {
    var x = rando(width);
    var y = rando(height);
    doSomethingABunch(function(){
        var shape = new fabric.Circle({
            radius: size,
            fill: fill,
            opacity: 0.8,
            selectable: false,
            left: x,
            top: y
        });
        x += size * 2 + size;
        canvas.add(shape);
    }, 10);
}

function addRandomImage() {
    fabric.Image.fromURL('imgs/' + randomArrayValue(imgs), function(img) {
        canvas.add(img);
        img.set({
            top: rando(height),
            left: rando(width),
            selectable: false,
            opacity: 0.3,
            clipTo: function (ctx) {
                ctx.arc(rando(100), rando(100), rando(width / 2), 0, Math.PI * 2);
            }
        });
        canvas.renderAll();
    });
}

function smartPath(seed) {
    var data = [];
    data.push(randomSVGMoveTo(seed));

    for (var i = 0; i < seed; i++) {
        data.push(randomSVGCurveTo(i));
        data.push(randomSVGLineTo(i));
        data.push(randomSVGArcTo(i));
    }
    data.push(',z');
    return data.join(',');
}

function addLines() {
    line = new fabric.Line([0, 0, width / 4, height / 4], {
        stroke: randomColor(100),
        selectable: false,
        strokeWidth: rando(10),
        angle: rando(360),
        opacity: 0.5,
        top: rando(height),
        left: rando(width)
    });
    canvas.add(line);
}

function addPath() {
    var pathdata = smartPath(rando(100));
    path = new fabric.Path(pathdata);
    path.set({
        opacity: rando(10) * 0.2,
        fill: randomColor(100),
        left: rando(dims.width / 2),
        top: rando(dims.height / 2),
        selectable: false
    });
    canvas.add(path);
}

function makeArt() {
    doSomethingABunch(function(){
        addText(randomStringLength(10), rando(20));
    }, 40);

    doSomethingABunch(addLines, 10);
    doSomethingABunch(addPath, 4);
    doSomethingABunch(addRandomImage, 2);

    doSomethingABunch(function(){
        var r = rando(100);
        addText(randomArrayValue(sayings), r);
        addText(randomArrayValue(sayings), r / 2);
    }, rando(5));

    doSomethingABunch(function(){
        var r = rando(40);
        addCircleGroupY(randomColor(100), r, false);
        addCircleGroupY(randomColor(255), r / 2, true);
    }, rando(5));

    doSomethingABunch(function(){
        var r = rando(40);
        addCircleGroupX(randomColor(255), r, false);
        addCircleGroupX(randomColor(255), r / 2, false);
    }, rando(5));
}

function addText(text, fontsize) {
    var x = rando(width);
    var y = rando(height);
    var block = new fabric.Text(text, {
        left: x,
        selectable: false,
        fill: randomColor(100),
        top: y,
        fontFamily: randomArrayValue(fonts),
        fontSize: fontsize
    });
    canvas.add(block);
}

function init() {
    var func;
    var seed           = 0;
    globalLoader.load({
        css: {
            'background-color': '#222',
            'font-size': '40px'
        },
        msg: 'Loading new image...'
    });
    canvas_elem.width  = width;
    canvas_elem.height = height;
    canvas             = new fabric.Canvas('canvas');
    canvas.selection   = false;
    canvas.backgroundColor = randomColor(40);
    makeArt();

    canvas.on('mouse:down', function(){
        canvas.backgroundColor = 'black';
        canvas.renderAll();
        exportCanvas(canvas);
    });
    setTimeout(globalLoader.unload, 100);
}

$(document).ready(init);

