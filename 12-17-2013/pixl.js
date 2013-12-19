window.onload = function() {

    /*
    original tutorial from:
    http://beej.us/blog/data/html5s-canvas-2-pixel/
    */

    var dims   = getDocumentDimensions();
    var height = dims.height;
    var width  = dims.width;
    var canvas = document.getElementById('canvas');
    var title  = $('h1');
    var seq    = $('<div id="timer">0</div>');
    var text   = 'This is not the end. 12-17-2013';
    var ctx;


    function init() {
        canvas.setAttribute('width', width);
        canvas.setAttribute('height', height);
        ctx = canvas.getContext('2d');

        // add letter effect
        simpleLetterSequence({
            container: title,
            word: text.split(''),
            len: text.length - 1,
            fade: 100,
            css_before: {
                'text-decoration': 'line-through',
                'border-bottom': '1px solid red'
            },
            css_after: {
                'text-decoration': 'none',
                'border-bottom': '1px solid black'
            },
            timing: 200
        });

        // add countdown timer effect
        addTimer();
        return;
    }

    function addTimer() {
        $('body').prepend(seq);
        setInterval(function(){
            var val = parseInt(seq.text().replace(/\:/g, ''), 10) + 10;
            var updated = String(val).split('').join('::');
            seq.text(updated);
        }, 20);
        return;
    }

    function setPixel(image_data, x, y, r, g, b, opacity) {
        var index = (x + y * image_data.width) * 4;
        image_data.data[index + 0] = r;
        image_data.data[index + 1] = g;
        image_data.data[index + 2] = b;
        image_data.data[index + 3] = opacity;
        return;
    }

    function drawDots() {
        var total = rando(999999);
        var x, y, r, g, b;
        var opacity = rando(255);
        for (i = 0; i < total; i++) {
            x = Math.random() * width | 0;
            y = Math.random() * height | 0;
            r = Math.random() * rando(255) | 0;
            g = Math.random() * rando(255) | 0;
            b = Math.random() * rando(255) | 0;
            setPixel(image_data, x, y, r, g, b, opacity);
        }
        return;
    }

    function drawImage() {
        // create a new pixel array
        image_data = ctx.createImageData(width, height);
        drawDots();

        // copy the image data back onto the canvas
        ctx.putImageData(image_data, 0, 0);
        return;
    }

    init();
    setInterval(drawImage, 100);
    return;
};
