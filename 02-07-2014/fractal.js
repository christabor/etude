var dims            = getDocumentDimensions();
var canvas          = document.getElementById('canvas');
var size            = 1;
var height          = dims.height / size;
var width           = dims.width / size;
var ctx             = canvas.getContext('2d');
var x_ratio         = 0.6;
var y_ratio         = 0.6;
var iteration_count = 0;
var MAX_ITERATIONS  = 100;
var size_division   = 2;
var curr_blue       = rando(255);
var multiplier      = rando(10);
var canvas_data;
var x_multiplier    = 2;
var y_multiplier    = 2;

// original Mandelbrot implementation:
// http://hacks.mozilla.org/2009/06/pushing-pixels-with-canvas/

function computeColor(x, y) {
    x = x_multiplier * (x / width - x_ratio);
    y = y_multiplier * (y / height - y_ratio);
    var xtemp;
    var x0 = x;
    var y0 = y;
    var iteration = 0;
    var max_iteration = iteration_count;

    while (x * x + y * y <= 100 && (iteration < max_iteration)) {
        xtemp = x * x - y * y + x0;
        y = multiplier * x * y + y0;
        x = xtemp;
        iteration++;
    }
    return Math.round(255 * iteration / max_iteration);
}

function updatePixels() {
    var color;
    for (var x = 0; x < width; x++) {
        for (var y = 0; y < height; y++) {
            color = computeColor(x, y);

            // Index of the pixel in the array
            var idx = (x + y * width) * 4;

            // Update the values of the pixel;
            canvas_data.data[idx + 0] = color;
            canvas_data.data[idx + 1] = color;
            canvas_data.data[idx + 2] = curr_blue;
            canvas_data.data[idx + 3] = 255;
        }
    }
}

function updateData() {
    canvas_data = ctx.createImageData(width, height);
    updatePixels();

    // iteratively increase complexity to create animation
    if(iteration_count === MAX_ITERATIONS) {
        iteration_count = 0;
    }
    iteration_count += 1;
    ctx.putImageData(canvas_data, 0, 0);
}

function redraw() {
    var i = 0;
    var max_times = 50;
    var timeout = max_times * 10;
    canvas.width = canvas.width;
    doSomethingABunch(function(){
        setTimeout(updateData, i * 10);
        i += 1;
    }, max_times);
}

function init() {
    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);
    redraw();
}

init();
