var canvas = new fabric.Canvas('canvasion');

// get visible window for canvas size
var height = $(window).height();
var width = $(window).width();

// update h/w
$('div, canvas').css({
    'width': width,
    'height': height
});

function createWordFlower(options) {
    canvas.add(new fabric.Circle({
        fill: randomColor(200),
        radius: options.fontSize,
        opacity: 0.6,
        left: options.x,
        top: options.y
    }));

    canvas.add(new fabric.Rect({
        hasControls: false,
        hasBorders: false,
        selectable: false,
        opacity: 0.6,
        fill: '#a4d668',
        width: options.fontSize / 2,
        height: height + 10,
        left: options.x,
        top: height
    }));

    // add elements
    for(var i = 0; i <= 10; i++) {
        var text = new fabric.Text('01101001010', {
            hasControls: false,
            hasBorders: false,
            selectable: false,
            fill: options.color,
            fontSize: options.fontSize,
            shadow: 'green -5px -5px 3px',
            angle: 45 * i,
            left: options.x,
            top: options.y
        });
        canvas.add(text);
    }
    return;
}

// init first flower
createWordFlower({
    x: width / 4,
    y: height / 4,
    fontSize: rando(60),
    petals: rando(8),
    color: randomColor()
});

// adjust on click
canvas.on('mouse:down', function(data){
    createWordFlower({
        x: data.e.clientX,
        y: data.e.clientY,
        fontSize: rando(60),
        petals: rando(8),
        color: randomColor()
    });
    return;
});

