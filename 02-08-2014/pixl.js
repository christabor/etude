var dims          = getDocumentDimensions();
var canvas        = document.getElementById('canvas');
var size          = 1;
var height        = dims.height / size;
var width         = dims.width / size;
var ctx           = canvas.getContext('2d');
var x_ratio       = 0.5;
var y_ratio       = 0.5;
var max_iteration = 10;
var size_division = 2;
var multiplier    = 4;
var x_multiplier  = 2;
var y_multiplier  = 3;
var complexity    = 100;
var sharpness     = 100;
var green         = 10;
var blue          = 105;
var x_divider     = width;
var y_divider     = height;
var canvas_data;
var types         = {
    'pi': Math.PI,
    'tau': Math.PI * 2,
    'normal': 0,
    'tan': Math.tan(width + height),
    'atan': Math.atan(width),
    'cos': Math.cos(width),
    'sin': Math.sin(width)
};
var active_type   = types.normal;

// original Mandelbrot implementation:
// http://hacks.mozilla.org/2009/06/pushing-pixels-with-canvas/


function computeColor(x, y) {
    // 2 * 100 / 1200 - 0.5;
    // 2 * 230 / 900 - 0.5;
    x = x_multiplier * (x / x_divider - x_ratio);
    y = y_multiplier * (y / y_divider - y_ratio);
    var xtemp;
    var x0 = x;
    var y0 = y;
    var iteration = 0;

    // 100 * 100 + 230 * 230
    while (x * x + y * y <= complexity && (iteration < max_iteration)) {
        xtemp = x * x - y * y + x0 * active_type;
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
            canvas_data.data[idx + 1] = green;
            canvas_data.data[idx + 2] = blue;
            canvas_data.data[idx + 3] = color * sharpness;
        }
    }
}

function redraw() {
    // a hackish way to clear the canvas
    canvas.width = canvas.width;
    canvas_data = ctx.createImageData(width, height);
    updatePixels();
    ctx.putImageData(canvas_data, 0, 0);
}

function init() {
    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);
    $('#divider').slider({
        min: 1,
        max: width + height,
        slide: function(e, ui) {
            x_divider = ui.value;
            y_divider = ui.value;
            redraw();
        }
    })
    $('#xstretch').slider({
        min: 10,
        max: width,
        slide: function(e, ui) {
            x_multiplier = ui.value * 0.001;
            redraw();
        }
    })
    $('#ystretch').slider({
        min: 10,
        max: height * 4,
        slide: function(e, ui) {
            y_multiplier = ui.value * 0.001;
            redraw();
        }
    })
    $('#threshold').slider({
        min: 10,
        max: 1000,
        slide: function(e, ui) {
            sharpness = ui.value * 0.01;
            redraw();
        }
    });
    $('#complexity').slider({
        min: 1,
        max: 1000,
        slide: function(e, ui) {
            complexity = ui.value * 0.05;
            redraw();
        }
    });
    $('#iterations').slider({
        min: 1,
        max: 500,
        slide: function(e, ui) {
            max_iteration = ui.value;
            redraw();
        }
    });
    $('#multiplier').slider({
        min: -500,
        max: 500,
        step: 0.001,
        slide: function(e, ui) {
            multiplier = ui.value;
            redraw();
        }
    });
    $('#green').slider({
        min: 0,
        max: 255,
        slide: function(e, ui) {
            green = ui.value;
            redraw();
        }
    });
    $('#blue').slider({
        min: 0,
        max: 255,
        slide: function(e, ui) {
            blue = ui.value;
            redraw();
        }
    });
    $('input:radio').on('click', function(){
        active_type = types[$(this).val()];
        redraw();
    });
    redraw();
}

init();
