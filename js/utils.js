// Some reusable functions that have
// been abstracted from individual days

var global_config = {

    // only works on my domain, throttled.
    GOOGLE_API_KEY: 'AIzaSyAM4K04yxd6F2-M6w8rEm4p97PMN6y2r0w',
    is_mobile: /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase())
};

var globalLoader = {
    load_speed: 200,
    load: function(opts) {
        var loader = $('<div id="global-loader"></div>');
        loader
        .css(opts.css)
        .text(opts.msg || 'Loading...');

        $('body')
        .prepend(loader)
        .hide()
        .fadeIn(globalLoader.load_speed);
        return;
    },
    unload: function() {
        $('body')
        .find('#global-loader')
        .fadeOut(globalLoader.load_speed, function(){
            $(this).remove();
        });
        return;
    }
};

function successionPlugin(container, advance_speed, callback) {
    // move to plugin format
    // at some point
    var successions = $(container).find('[data-succession]');

    successions
    .hide()
    .each(function(k, succession){
        var _text = $(succession);
        var speed = _text.data('fade-speed');
        var start = _text.data('start');
        var end   = _text.data('stop');

        // set timeout for starting point
        setTimeout(function(){
            _text.fadeIn(speed);
        }, start * advance_speed);

        // set timeout for ending point
        setTimeout(function(){
            _text.fadeOut(speed, function(){
                if(callback) {
                    callback();
                }
            });
        }, end * advance_speed);
    });
    return;
}

function simpleLetterSequence(opts) {
    // animate a sequence of letters,
    // allow for transition from one css state
    // to another, which allows for all
    // kinds of possibilities
    // Parameters:
    // @opts.container [DOM element]
        // the container to append items to
    // @opts.word
    // @opts.css_before [Object] initial css state
    // @opts.css_after [Object] final css state
    // @opts.len [Number] indicating length (optional)
    // @opts.fade [Number] fade speed
    // @opts.timing [Number] delay timeout
    var len = opts.len || (opts.word.length - 1);
    for(var i = 0; i <= len; i++) {
        (function(i){
            setTimeout(function(){
                var letter = opts.word[i];
                var block  = '<span>' + letter + '</span>';
                opts.container
                .append(block)
                .find('span')
                .last()
                .hide()
                .css(opts.css_before)
                .fadeIn(opts.fade, function(){
                    $(this).css(opts.css_after);
                });
            }, i * opts.timing);
        })(i);
    }
    return;
}

function initGoogleFonts() {
    // defters to type library:
    // github.com/christabor/typey
    window.myTypeLibrary = fonTypey({

        // public, limited access only
        // for github.com/christabor
        api_key: global_config.GOOGLE_API_KEY
    });
    myTypeLibrary.initAllFeatures('body');
    return;
}

function disableForMobile() {
    // disable all scripts
    // before they load
    var html = [
    '<h1>Sorry, but this page does not work well in mobile browsers.</h1>',
    '<p>Please try again with a desktop device. <333</p>'
    ].join('');

    // add message to dom
    // replace original content
    document
    .querySelector('body')
    .innerHTML = html;
    return;
}

function hasJS() {
    // remove no-js classes for
    // compatibility and enhancement
    $('body').removeClass('no-js');
    return;
}

/********************* Random *********************/

function randomArrayValue(arr) {
    return arr[getKey(arr)];
}

function getKey(arr) {
    // get a random key by the length
    // of a given array
    return Math.floor(Math.random() * arr.length);
}

function rando(max) {
    return Math.floor(Math.random() * max);
}

function randomFixedString(count) {
    // generate a random string
    // of fixed length
    var tokens = 'abcdefghijklmopqrstuvwxyz'.split('');
    var str = '';
    for(var i = 0; i <= count; i++) {
        str += tokens[rando(tokens.length)];
    }
    return str;
}

function randomCSSColorAttr(elem, props, color_max) {
    // only works on color related
    // css properties
    var multiple = $.isArray(props);
    var multi_map = {};

    if(multiple) {
        for (var i = 0, len = props.length; i < len; i++) {
            multi_map[props[i]] = randomColor(color_max);
            elem.css(multi_map);
        }
    } else {
        elem.css(props, randomColor(color_max));
    }
    return;
}

/********************* Fabric.JS *********************/

function randomCommandValues(iterations, max) {
    // generates the numerical
    // values separate of a given command type
    var values = [];
    for (var i = 0; i < iterations; i++) {
        values.push(rando(max));
    }
    return values.join('-');
}

function randomCommandPair(iterations, max) {
    // adds command type and numerical combination
    return randomCommand() + randomCommandValues(iterations, max);
}

function randomCommand() {
    // M = moveto
    // L = lineto
    // H = horizontal lineto
    // V = vertical lineto
    // C = curveto
    // S = smooth curveto
    // Q = quadratic Bézier curve
    // T = smooth quadratic Bézier curveto
    // A = elliptical Arc
    // Z = closepath
    var commands = ['M', 'L', 'H', 'V', 'C', 'S', 'Q', 'T', 'A', 'Z'];

    // adds random the command type
    return randomArrayValue(commands);
}

function randomPath(max, max_size) {
    var paths = [];
    for (var i = 0; i < max; i++) {
        paths.push(randomCommandPair(i, max_size));
    }
    return paths.join('');
}

function randomHTMLInput() {
    var inputs = ['type', 'radio', 'text', 'number', 'date', 'range'];
    return '<input type="' + inputs[rando(inputs.length)] + '">';
}

function randomBinary(max) {
    // generate some random binary of
    // @max size (e.g. 0101010101)
    var str = '';
    for(var i = 0; i <= max; i++) {
        str += rando(10) > 5 ? '0' : '1';
    }
    return str;
}

function randomStringLength(max) {
    // Returns a random string using
    // separate method, of random (MAX) characters
    return randomFixedString(rando(max));
}

function randomColor(max) {
    // return a random color,
    // in rgba format
    if(isNaN(max)) {
        max = 255;
    }
    return 'rgb(' + rando(max) + ',' + rando(max) + ',' + rando(max) + ')';
}

function randomColorArray(max) {
    // assumed to always be RGB, though since it's
    // random it doesn't matter
    return [rando(max), rando(max), rando(max)];
}

function randomColorHex(is_octal) {
    // Creds: http://www.paulirish.com/2009/random-hex-color-code-snippets/
    var color = Math.floor(Math.random()*16777215).toString(16);

    // added a custom is_octal flag to determine if using
    // octal or not (useful in libraries like THREE.js)
    return is_octal ? '0x'+color : '#'+color;
}

function randomColorObject(max) {
    // return an RGB object
    return {
        r: rando(max),
        g: rando(max),
        b: rando(max)
    };
}

function randomGradientObj(max_stops) {
    var gradients   = [];
    var color_stops = 'bottom, ';
    var step        = '';
    var webkit;
    var o;
    var moz;
    var ms;
    var noprefix;

    // divide each color stop
    // by the max stops and add the color
    for (var i = max_stops; i > 0; i--) {
        if(i === max_stops) {
            // always start at 1%
            step = '1%, ';
        }
        else if(i === 1) {
            // remove trailing
            // comma on last color-step
            step = Math.round(100 / i) + '%';
        } else {
            step = Math.round(100 / i) + '%, ';
        }
        color_stops += randomColorHex() + ' ' + step;
    }
    color_stops += ')';

    // add all color stops and prefixes - ugh
    // pretty ugly, needs reworking
    gradients.push('-webkit-linear-gradient(' + color_stops);
        gradients.push('-ms-linear-gradient(' + color_stops);
            gradients.push('-o-linear-gradient(' + color_stops);
                gradients.push('-moz-linear-gradient(' + color_stops);
                    gradients.push('linear-gradient(' + color_stops);
                        return gradients;
                    }

                    function randomColorScheme(color_count, max) {
    // return an array of random colors @color_count long
    var colors = [];
    for(var i = 0; i <= color_count; i++) {
        colors[i] = randomColor(max);
    }
    return colors;
}

function getDocumentDimensions() {
    // return a simple dimensions object
    // of the screen width and height
    return {
        'height': window.screen.availHeight,
        'width': window.screen.width
    };
}

function exportCanvas(canvas) {
    window.open(canvas.toDataURL());
    return;
}

function log(msg) {
    return console.log(msg);
}

function uuid() {
    // random unique identifier in the form 0000-0000-0000-0000
    var uid = (function(){ return rando(9999); });
    return [uid(), uid(), uid(), uid()].join('-');
}

function stretchCanvas(canvas) {
    // makes canvas stretch across whole window size
    $(canvas)
    .height($(window).height())
    .width($(window).width());
    return;
}

function doSomethingABunch(thing, times, context) {
    // generic repeater
    if(times > 0) {
        thing(context);
        doSomethingABunch(thing, times - 1, context);
    }
    return;
}

function multiCopyToString(times, string, delimiter) {
    // copy a string multiple times
    // - similar to Pythons operator overloading
    // e.g. cat * 3 => catcatcat
    var copied = '';
    for(var i = 1; i <= times; i++) {
        copied += string + delimiter;
    }
    return copied;
}

function multiCopyToArray(times, string) {
    // similar to string copy,
    // but sends to array a number of times
    // e.g. fn(10, 'cat') => [cat, cat]
    var copied = [];
    for(var i = 1; i <= times; i++) {
        copied.push(string);
    }
    return copied;
}

function triggerLoading(on) {
    if(on) {
        $('body').css('cursor', 'progress');
    } else {
        $('body').css('cursor', 'auto');
    }
    return;
}

function getLocation(success, error) {
    // set some options to pass in
    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };

    // check if enabled
    if (navigator.geolocation) {
        coords = navigator
        .geolocation
        .getCurrentPosition(success, error, options);
    }
    else {
        alert('Geolocation is not supported by this browser.');
    }
    return coords;
}

function show(elem) {
    // more human-readable show
    elem.show();

    // make chainable
    return elem;
}

function hide(elem) {
    // more human-readable hide
    elem.hide();

    // make chainable
    return elem;
}

/********************* SHIMS *********************/

window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame    ||
    window.oRequestAnimationFrame      ||
    window.msRequestAnimationFrame     ||
    function(/* function */ callback, /* DOMElement */ element){
        window.setTimeout(callback, 1000 / 60);
    };
})();

navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia);

/********************* THREE.js *********************/

function createTween(opts) {
    if(!TWEEN) return;

    // create tweening classes
    var new_tween = new TWEEN.Tween(opts.from)
    .to(opts.to, opts.duration || 1000)
    .easing(opts.easing)
    .onUpdate(opts.onUpdate)
    .onComplete(opts.onComplete);

    // start
    new_tween.start();
    return;
}

function addTHREEStats() {
    if(!Stats) return;

    // construct new stats
    // obj and add to DOM
    // scope is global, so it has
    // a more unique namespace
    three_stats = new Stats();
    three_stats.domElement.style.position = 'absolute';
    three_stats.domElement.style.top = '0px';
    container.appendChild(three_stats.domElement);
    return;
}
