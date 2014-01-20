var dims          = getDocumentDimensions();
var width         = dims.width;
var height        = dims.height;
var menu          = $('#plain-menu');
var active_effect;
var effects       = {};
var camera;
var unreasonable_shift;
var INTERVAL_STEP = 1000;


function errorCallback(error) {
    $('body').append('<p class="error">Sorry, something went wrong. Please refresh.</p>');
    return log('navigator.getUserMedia error: ', error);
}

function addMenu(funcs) {
    $.each(funcs, function(key, func){
        menu.append('<li><a href="#" id="' + key + '">' + (key.split('_').join(' ')) + '</a></li>');
    });
    menu.on('click', 'li > a', function(e){
        e.preventDefault();
        var fn = $(this).attr('id');

        // disable previous effect, pass callback
        // so it works properly
        camera.off('draw', active_effect);

        // re-assign to new effect
        // after disabling event, to prevent
        // piling more on top.
        active_effect = effects[fn];

        // call it again
        camera.on('draw', active_effect);
    });
}

function init() {
    effects = {
        // i = rgba (i=r, i+1=g, i+2=b, i+3=a)
        normal: function(image, callback) {
            var data = image.data;
            for(var i = 0, len = data.length; i <= len; i += 4) {
                data[i] = data[i];
                data[i + 1] = data[i + 1];
                data[i + 2] = data[i + 2];
                data[i + 3] = data[i + 3];
            }
            callback();
        },
        invertscan: function(image, callback) {
            var data = image.data;
            for(var i = 0, len = data.length; i <= len; i += 20) {
                data[i] = data[i + 2];
                data[i + 1] = data[i + 4];
                data[i + 2] = data[i + 6];
                data[i + 3] = data[i + 3];
            }
            callback();
        },
        samplescan: function(image, callback) {
            var data = image.data;
            for(var i = 0, len = data.length; i <= len; i += 100) {
                data[i] = data[i + 2];
                data[i + 1] = data[i + i];
                data[i + 2] = data[i + i];
                data[i + 3] = data[i + i];
            }
            callback();
        },
        shift: function(image, callback) {
            var data = image.data;
            var shift_level = 10;
            for(var i = 0, len = data.length; i <= len; i += 4) {
                data[i] = data[i + 10];
                data[i + 1] = data[i + 2 * shift_level];
                data[i + 2] = data[i + 3 * shift_level];
                data[i + 3] = data[i + 4 * shift_level] + 50;
            }
            callback();
        },
        unreasonable: function(image, callback) {
            var data = image.data;
            var shift_level = rando(width / 10);
            for(var i = 0, len = data.length; i <= len; i += 5) {
                data[i] = data[i + 10];
                data[i + 1] = data[i + 2 * shift_level];
                data[i + 2] = data[i + 3 * shift_level];
                data[i + 3] = data[i + 4 * shift_level] + 50;
            }
            callback();
        },
        green_dots: function(image, callback) {
            var data = image.data;
            var shift_level = 10;
            var rnd = width / 20;
            for(var i = 0, len = data.length; i <= len; i += rnd) {
                data[i] = data[i + 10];
                data[i + 1] = data[i + 2 + shift_level];
                data[i + 2] = data[i + 3 + shift_level];
                data[i + 3] = data[i + 4 + shift_level] + 50;
            }
            callback();
        },
        lolwut: function(image, callback) {
            var data = image.data;
            var shift_level
            var w = width / (width / 10);
            for(var i = 0, len = data.length; i <= len; i += w) {
                data[i] = Math.abs(data[i] - 255);
                data[i + 1] = Math.abs(data[i + 1] - 255);
                data[i + 2] = Math.abs(data[i + 2] - 255);
                data[i + 3] = rando(150);
            }
            callback();
        },
        solarize: function(image, callback) {
            var data = image.data;
            for(var i = 0, len = data.length; i <= len; i += 4) {
                data[i] = 100;
                data[i + 1] = Math.abs(data[i + 1] - 85);
                data[i + 2] = Math.abs(data[i + 2] - 85);
                data[i + 3] = rando(50) + 200;
            }
            callback();
        },
        omgawd: function(image, callback) {
            var data = image.data;
            for(var i = 0, len = data.length; i <= len; i += 4) {
                data[i] = data[Math.abs(data[i] - data[width/2])];
                data[i] = data[Math.abs(data[i + 1] - data[width/2 - 1])];
                data[i] = data[Math.abs(data[i + 2] - data[width/2 - 2])];
                data[i + 3] = data[i + 3];
            }
            callback();
        },
        threshold: function(image, callback) {
            var data = image.data;
            var pivot = 100;
            var amt = pivot / 2;
            for(var i = 0, len = data.length; i <= len; i += 4) {
                data[i] = (data[i] > pivot ? Math.abs(data[i] - amt) : data[i]);
                data[i + 1] = (data[i + 1] > pivot ? Math.abs(data[i + 1] - amt) : data[i + 1]);
                data[i + 2] = (data[i + 2] > pivot ? Math.abs(data[i + 2] - amt) : data[i + 2]);
                data[i + 3] = data[i + 3];
            }
            callback();
        },
        alien_threshold: function(image, callback) {
            var data = image.data;
            var divider = width / 40;
            for(var i = 0, len = data.length; i <= len; i += 4) {
                data[i] = data[i + divider];
                data[i + 1] = (data[i + 1] > 40 ? Math.abs(data[i + 1] - 180) : data[i + 1]);
                data[i + 2] = (data[i + 2] > 40 ? Math.abs(data[i + 2] - 180) : data[i + 2]);
                data[i + 3] = data[i + 3];
            }
            callback();
        },
        reflex: function(image, callback) {
            var data = image.data;
            var divider = width / 2;
            for(var i = 0, len = data.length; i <= len; i += 3) {
                data[i] = data[i + divider];
                data[i + 1] = data[i + 1 + divider];
                data[i + 2] = data[i + 2 + divider];
                data[i + 3] = data[i + 3 + divider];
            }
            callback();
        }
    };

    // add all the menu buttons
    addMenu(effects);
    camera = new funky('clarge');
    camera.on('error', errorCallback);

    // active the first effect, which is plain
    menu.find('#normal').click();
}

$(document).ready(init);
