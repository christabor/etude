window.onload = function() {

    /*
    original tutorial from:
    http://beej.us/blog/data/html5s-canvas-2-pixel/
    */
alert();

    var loader = {
        msg: 'Calculating',
        css: {
            'background': '#ff0000',
            'color': '#6d014b',
            'z-index': '9999',
            'font-size': '40px'
        }
    };
    var dims   = getDocumentDimensions();
    var height = dims.height;
    var width  = dims.width;
    var canvas = document.getElementById('canvas');
    var ctx;


    function init() {
        canvas.setAttribute('width', width);
        canvas.setAttribute('height', height);
        ctx = canvas.getContext('2d');
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
        var total = rando(999);
        var x, y, r, g, b;
        var opacity = rando(255);
        for (i = 0; i < total; i++) {
            x = Math.random() * width | 0;
            y = Math.random() * height | 0;
            r = Math.random() * rando(100) | 0;
            g = Math.random() * rando(100) | 0;
            b = Math.random() * rando(100) | 0;
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
    setInterval(drawImage, 400);
    return;
};
