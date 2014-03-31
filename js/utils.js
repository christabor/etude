// Some reusable functions that have
// been abstracted from individual days

var global_config = {

    // only works on my domain, throttled.
    GOOGLE_API_KEY: 'AIzaSyAM4K04yxd6F2-M6w8rEm4p97PMN6y2r0w',
    is_mobile: /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()),
    basic_fonts: [
    'Lato',
    'Georgia',
    'Consolas',
    'Verdana',
    'Tahoma',
    'Arial',
    'Helvetica',
    'Lucida Sans',
    'Lucida Console',
    'Lucida',
    'Big Caslon',
    'Book Antiqua',
    'Palatino Linotype',
    'Bodoni MT',
    'Didot',
    'Didot LT STD',
    'Hoefler Text',
    'Garamond',
    'Calisto MT',
    'Bookman Old Style',
    'Bookman',
    'Goudy Old Style',
    'Bitstream Charter',
    'Optima',
    'Segoe',
    'Candara',
    'Geneva',
    'Futura',
    'Trebuchet MS',
    'Franklin Gothic Medium',
    'ITC Franklin Gothic',
    'Gill Sans',
    'Calibri',
    'Baskerville old face',
    'Courier New'
    ]
};

var globalLoader = {
    load_speed: 200,
    load: function(opts) {
        var loader = $('<div id="global-loader"><span class="text fade"></span></div>');
        loader
        .css(opts.css)
        .find('.text').text(opts.msg || 'Loading...');

        $('body')
        .prepend(loader)
        .hide()
        .fadeIn(globalLoader.load_speed);
    },
    unload: function(opts) {
        setTimeout(function(){
            $('body')
            .find('#global-loader')
            .fadeOut(globalLoader.load_speed, function(){
                $(this).remove();
            });
        }, opts.delay || 0);
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

/* UI / DOM related */

function setActiveFn(els, funcs, el, active_fn) {
    // allows a map of functions to
    // work with a map of DOM elements
    // removing some boilerplate of setting
    // up event handlers and setting/getting the right functions.
    // @els: the DOM elements that need events bound to them.
    // @funcs: the map of functions to reference
    // @el: the scope of the element to call from (e.g: this)
    els.removeClass('active');
    // requires the text to be used as function name
    // so it must match the map key name.
    var fn = el.text();
    el.addClass('active');
    // assign the func
    active_fn = funcs[fn];
    return active_fn;
}

function populateMenu(list, menu, el, use_both) {
    // populates a menu with an array
    // or object, into another dom element
    // also allows you to pass in an el,
    // so it can be used for anything,
    // e.g. <li> or <select> or <p>.
    // @use_both: Boolean - allows both
    // k and v to be added with a colon
    $.each(list, function(k, v) {
        var value = ($.isArray(list) ? v : k);
        var item = $(el);
        value = use_both ? (list[k] + ' ' + value) : value;
        item.html(value);
        menu.append(item);
    });
}

function addCanvasUI(generate) {
    var export_btn;
    var generate_btn;
    // adds some common reusable
    // elements to the DOM
    // expects the ids to exist;
    // expects a reference to the generating
    // function to be passed in
    try {
        export_btn   = $('#export-btn');
        generate_btn = $('#generate-btn');
        export_btn.on('click', function(){
            exportCanvas(canvas || canvas_elem);
        });
        generate_btn.on('click', generate);
    } catch(e) {
        // ReferenceError
        export_btn   = document.getElementById('export-btn');
        generate_btn = document.getElementById('generate-btn');
        if(export_btn) {
            export_btn.addEventListener('click', function(){
                exportCanvas(canvas || canvas_elem);
            });
        }
        if (generate_btn) {
            generate_btn.addEventListener('click', generate);
        }
    }
}

function getLastOf(input) {
    // returns the last char
    // of a given string
    if(typeof input !== 'string') {
        return input;
    }
    return input.substr(input.length - 1, input.length);
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
    // @opts.callback [Function] a callback to execute
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
    if(opts.callback) {
        // add a callback that
        // finishes after all loops
        setTimeout(opts.callback, len * opts.timing);
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

/********************* Misc. *********************/

function randomArrayValue(arr) {
    return arr[getKey(arr)];
}

function randomObjValue(obj) {
    if(!Object.keys) return;

    // get the random "key" as integer
    var counter = 0;
    var rand    = rando(Object.keys(obj).length);
    var el      = {};
    $.each(obj, function(k, v){
        // see if the current key
        // matches the random integer
        if(counter === rand) {
            el[k] = v;
        }
        counter += 1;
    });
    if(!el) return obj;
    return el;
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

function convertPxToNum(str) {
    return parseInt(str.replace('px', ''), 10);
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

function randomSVGMoveTo(max) {
    // M = absolute, m = relative
    // produces something like:
    // M100,50
    var pathdata = '';
    if(rando(10) > 5) {
        pathdata += 'M';
    } else {
        pathdata += 'm';
    }
    pathdata += rando(max) + ',' + rando(max);
    return pathdata;
}

function randomSVGLineTo(max) {
    // L = absolute, l = relative
    // produces something like:
    // L50,50
    var pathdata = '';
    if(rando(10) > 5) {
        pathdata += 'L';
    } else {
        pathdata += 'l';
    }
    pathdata += rando(max) + ',' + rando(max);
    return pathdata;
}

function randomSVGCurveTo(max) {
    // Q = absolute, q = relative
    // produces something like:
    // Q cx,cy x,y" or "q dcx,dcy, dx, dy"
    var pathdata = '';
    var cx = rando(max);
    var cy = rando(max);
    var x  = rando(max);
    var y  = rando(max);
    if(rando(10) > 5) {
        pathdata += 'Q';
    } else {
        pathdata += 'q';
    }
    pathdata += [cx, cy, x, y].join(',');
    return pathdata;
}

function randomSVGArcTo(max) {
    // A = absolute, a = relative
    // produces something like:
    // A rx,ry xAxisRotate LargeArcFlag, SweepFlag x,y
    var pathdata    = '';
    var rx          = rando(max);
    var ry          = rando(max);
    var axis_rotate = rando(360);
    var x           = rando(max);
    var y           = rando(max);
    var arc_flag    = (rando(10) > 5 ? 1: 0);
    var sweep_flag  = (rando(10) > 5 ? 1: 0);

    if(rando(10) > 5) {
        pathdata += 'A';
    } else {
        pathdata += 'a';
    }
    pathdata += [rx, ry, axis_rotate, arc_flag, sweep_flag, x, y].join(',');
    return pathdata;
}

function randomPrecisePath(max) {
    // Combine all effects
    // in a relatively normal order
    // with more precise formatting than
    // randomPath() produces something like
    // "M73,4,l26,70,q29,22,97,6,a2,42,88,1,0,43,67"
    return [
    randomSVGMoveTo(max),
    randomSVGLineTo(max),
    randomSVGCurveTo(max),
    randomSVGArcTo(max)
    ].join(',');
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

function randomAlternatingString(chars, max) {
    // @chars: an array of values
    // @max: number of times to run
    var str = '';
    doSomethingABunch(function(){
        str += randomArrayValue(chars);
    }, max);
    return str;
}

function randomStringLength(max) {
    // Returns a random string using
    // separate method, of random (MAX) characters
    return randomFixedString(rando(max));
}

function randomSentence(word_count, max_length, delimiter) {
    var words = [];
    for(var i = 0; i <= word_count; i++) {
        words.push(randomStringLength(max_length));
    }
    if(!delimiter) {
        delimiter = ' ';
    }
    return words.join(delimiter);
}

function randomColor(max, opacity) {
    // return a random color,
    // in rgba format
    if(isNaN(max)) {
        max = 255;
    }
    if(opacity) {
        return ['rgba(', rando(max), ',', rando(max), ',', rando(max), ',', clamp(opacity, 0, 1), ')'].join('');
    } else {
        return ['rgb(', rando(max), ',', rando(max), ',', rando(max), ')'].join('');
    }
}

function randomRGBA(max) {
    return randomColor(max);
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

function bootstrapCanvas(callback, is_fabric, canvas_el) {
    // a reusable function for bootstrapping
    // some common canvas inits. Also provides
    // a callback so everything is defined in order.
    window.dims        = getViewportDimensions();
    window.height      = dims.height;
    window.width       = dims.width;
    window.canvas_elem = document.querySelector(canvas_el || 'canvas');
    canvas_elem.width  = width;
    canvas_elem.height = height;
    if(is_fabric) {
        canvas = new fabric.Canvas(canvas_el || 'canvas');
        canvas.selection = false;
    } else {
        window.ctx = canvas_elem.getContext('2d');
    }
    if(callback) {
        callback();
    }
}

function setCanvasSize(canvas, factor) {
    // sets canvas based on existing
    // width or height attributes
    canvas.height = height * factor;
    canvas.width  = width * factor;
}

function clearCanvas() {
    // a simple clearing fn
    // -- assumes a global variable "ctx"
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, width, height);
}

function getDocumentDimensions() {
    // return a simple dimensions object
    // of the screen width and height
    return {
        'height': window.screen.availHeight,
        'width': window.screen.width
    };
}

function getViewportDimensions() {
    return {
        'height': document.documentElement.clientHeight,
        'width': document.documentElement.clientWidth
    };
}

function exportCanvas(canvas) {
    if(!canvas) return;
    try {
        if(fabric) {
            // remove outlines
            // and select boxes
            canvas.deactivateAll()
            .renderAll();
        }
    } catch(e) {}
    window.open(canvas.toDataURL());
}

function log(msg) {
    return console.log(msg);
}

function uuid() {
    // random unique identifier in the form 0000-0000-0000-0000
    var uid = function(){ return rando(9999); };
    return [uid(), uid(), uid(), uid()].join('-');
}

function makeHTMLTag(el, content) {
    return ['<', el, '>', content, '</', el, '>'].join('');
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

function clamp(number, min, max) {
    return Math.min(Math.max(number, min), max);
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

function hasGetUserMedia() {
    // http://www.html5rocks.com/en/tutorials/getusermedia/intro/
    return !!(navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia);
}

window.requestAnimFrame = (function(){
    return window.requestAnimationFrame ||
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
